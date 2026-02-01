-- VList Database Schema
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard)

-- ============================================
-- PROFILES TABLE
-- Extends Supabase Auth with user profile data
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    major TEXT,
    grad_year INTEGER,
    avatar_url TEXT,
    rating DECIMAL(3,2) DEFAULT 5.0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies: Anyone can read profiles, users can only update their own
CREATE POLICY "Public profiles are viewable by everyone"
    ON profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, name)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- PRODUCTS TABLE
-- Marketplace listings
-- ============================================
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    price INTEGER NOT NULL DEFAULT 0,  -- Price in smallest currency unit (cents/paise)
    image_url TEXT,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    condition TEXT NOT NULL CHECK (condition IN ('New', 'Like New', 'Good', 'Fair', 'Poor')),
    type TEXT NOT NULL DEFAULT 'Sell' CHECK (type IN ('Sell', 'Trade', 'Donate')),
    seller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_location ON products(location);
CREATE INDEX IF NOT EXISTS idx_products_seller ON products(seller_id);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_created ON products(created_at DESC);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Active products are viewable by everyone"
    ON products FOR SELECT
    USING (is_active = true);

CREATE POLICY "Authenticated users can create products"
    ON products FOR INSERT
    WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Users can update their own products"
    ON products FOR UPDATE
    USING (auth.uid() = seller_id);

CREATE POLICY "Users can delete their own products"
    ON products FOR DELETE
    USING (auth.uid() = seller_id);

-- ============================================
-- CART ITEMS TABLE (Optional - for persistent cart)
-- ============================================
CREATE TABLE IF NOT EXISTS cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- Enable RLS
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Policies: Users can only access their own cart
CREATE POLICY "Users can view their own cart"
    ON cart_items FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can add to their own cart"
    ON cart_items FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart"
    ON cart_items FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can remove from their own cart"
    ON cart_items FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================
-- SEED DATA (Optional - for testing)
-- Uncomment and run separately if needed
-- ============================================
/*
-- Insert test products (requires a valid seller_id)
INSERT INTO products (title, description, price, image_url, category, location, condition, type, seller_id)
VALUES 
    ('Calculus Textbook', 'Used for MATH 101. Good condition.', 3500, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c', 'Textbooks', 'North Campus', 'Good', 'Sell', 'YOUR_USER_ID_HERE'),
    ('Sony Headphones', 'Active noise cancelling. Perfect for library.', 24000, 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb', 'Electronics', 'South Campus', 'Like New', 'Sell', 'YOUR_USER_ID_HERE');
*/
