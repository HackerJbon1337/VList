import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

interface RouteParams {
    params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    const supabase = await createClient();

    // First, get the product without the join
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .eq("is_active", true)
        .single();

    if (error) {
        if (error.code === "PGRST116") {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Try to get seller info separately (optional)
    let seller = { name: "Unknown", rating: 5, major: null, gradYear: null };
    if (data.seller_id) {
        const { data: sellerData } = await supabase
            .from("profiles")
            .select("id, name, rating, major, grad_year")
            .eq("id", data.seller_id)
            .single();

        if (sellerData) {
            seller = {
                name: sellerData.name || "Unknown",
                rating: sellerData.rating || 5,
                major: sellerData.major,
                gradYear: sellerData.grad_year,
            };
        }
    }

    // Transform to match frontend interface
    const product = {
        id: data.id,
        title: data.title,
        description: data.description,
        price: data.price,
        image: data.image_url,
        category: data.category,
        location: data.location,
        condition: data.condition,
        type: data.type,
        seller,
        createdAt: data.created_at,
    };

    return NextResponse.json({ product });
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    const supabase = await createClient();

    // Check authentication
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify ownership
    const { data: existing } = await supabase
        .from("products")
        .select("seller_id")
        .eq("id", id)
        .single();

    if (!existing || existing.seller_id !== user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const body = await request.json();
        const { title, description, price, image, category, location, condition, type, isActive } =
            body;

        const updateData: Record<string, unknown> = {};
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (price !== undefined) updateData.price = price;
        if (image !== undefined) updateData.image_url = image;
        if (category !== undefined) updateData.category = category;
        if (location !== undefined) updateData.location = location;
        if (condition !== undefined) updateData.condition = condition;
        if (type !== undefined) updateData.type = type;
        if (isActive !== undefined) updateData.is_active = isActive;

        const { data, error } = await supabase
            .from("products")
            .update(updateData)
            .eq("id", id)
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ product: data });
    } catch {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    const supabase = await createClient();

    // Check authentication
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify ownership
    const { data: existing } = await supabase
        .from("products")
        .select("seller_id")
        .eq("id", id)
        .single();

    if (!existing || existing.seller_id !== user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Soft delete by setting is_active to false
    const { error } = await supabase.from("products").update({ is_active: false }).eq("id", id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
