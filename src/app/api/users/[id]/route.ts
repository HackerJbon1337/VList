import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

interface RouteParams {
    params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase.from("profiles").select("*").eq("id", id).single();

    if (error) {
        if (error.code === "PGRST116") {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Return public profile info only
    return NextResponse.json({
        user: {
            id: data.id,
            name: data.name,
            major: data.major,
            gradYear: data.grad_year,
            avatar: data.avatar_url,
            rating: data.rating,
            createdAt: data.created_at,
        },
    });
}
