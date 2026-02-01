import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "All";
    const location = searchParams.get("location") || "All Campuses";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "8");

    const supabase = await createClient();

    // Build query
    let query = supabase
        .from("products")
        .select(
            `
            *,
            seller:profiles!seller_id (
                id,
                name,
                rating,
                major,
                grad_year
            )
        `,
            { count: "exact" }
        )
        .eq("is_active", true)
        .order("created_at", { ascending: false });

    // Apply filters
    if (search) {
        query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    if (category && category !== "All") {
        query = query.eq("category", category);
    }

    if (location && location !== "All Campuses") {
        query = query.eq("location", location);
    }

    // Pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform data to match frontend Product interface
    const products = data?.map((product) => ({
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.image_url,
        category: product.category,
        location: product.location,
        condition: product.condition,
        type: product.type,
        seller: product.seller
            ? {
                name: product.seller.name,
                rating: product.seller.rating,
                major: product.seller.major,
                gradYear: product.seller.grad_year,
            }
            : { name: "Unknown", rating: 5 },
        createdAt: product.created_at,
    }));

    // Check if we have real products (not mock data)
    const hasRealProducts = (count || 0) > 0;

    return NextResponse.json({
        products: products || [],
        total: count || 0,
        pages: Math.ceil((count || 0) / limit),
        isMockData: !hasRealProducts,
    });
}

export async function POST(request: NextRequest) {
    const supabase = await createClient();

    // Check authentication
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();

        // Validate required fields
        const { title, description, price, image, category, location, condition, type } = body;

        if (!title || !category || !location || !condition) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const { data, error } = await supabase
            .from("products")
            .insert({
                title,
                description: description || "",
                price: price || 0,
                image_url: image || "",
                category,
                location,
                condition,
                type: type || "Sell",
                seller_id: user.id,
            })
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ product: data }, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
}
