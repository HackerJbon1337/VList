import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
        profile: {
            id: data.id,
            name: data.name,
            email: user.email,
            major: data.major,
            gradYear: data.grad_year,
            avatar: data.avatar_url,
            rating: data.rating,
            createdAt: data.created_at,
        },
    });
}

export async function PUT(request: NextRequest) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { name, major, gradYear, avatar } = body;

        const updateData: Record<string, unknown> = {};
        if (name !== undefined) updateData.name = name;
        if (major !== undefined) updateData.major = major;
        if (gradYear !== undefined) updateData.grad_year = gradYear;
        if (avatar !== undefined) updateData.avatar_url = avatar;

        const { data, error } = await supabase
            .from("profiles")
            .update(updateData)
            .eq("id", user.id)
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({
            profile: {
                id: data.id,
                name: data.name,
                email: user.email,
                major: data.major,
                gradYear: data.grad_year,
                avatar: data.avatar_url,
                rating: data.rating,
                createdAt: data.created_at,
            },
        });
    } catch {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
}
