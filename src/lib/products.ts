// Mock product data for student marketplace
export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
    location: string;
    condition: "New" | "Like New" | "Good" | "Fair" | "Poor";
    type: "Sell" | "Trade" | "Donate";
    seller: {
        name: string;
        rating: number;
        major?: string;
        gradYear?: number;
    };
    createdAt: string;
}

export const categories = [
    "All",
    "Textbooks",
    "Electronics",
    "Dorm Essentials",
    "Clothing",
    "Tutoring",
    "School Supplies",
    "Sports & Gear",
    "Housing (Sublets)",
    "Services",
    "Other",
] as const;

export const locations = [
    "All Campuses",
    "North Campus",
    "South Campus",
    "West Campus",
    "East Campus",
    "University Village",
    "Downtown",
    "Off-Campus",
] as const;

export const mockProducts: Product[] = [
    {
        id: "1",
        title: "Calculus: Early Transcendentals (8th Ed)",
        description: "Used for MATH 101. Good condition, some highlighting.",
        price: 45,
        image: "https://picsum.photos/seed/textbook1/400/300",
        category: "Textbooks",
        location: "North Campus",
        condition: "Good",
        type: "Sell",
        seller: { name: "Alex Chen", rating: 4.9, major: "Engineering", gradYear: 2025 },
        createdAt: "2024-01-20",
    },
    {
        id: "2",
        title: "Mini Fridge - 3.2 Cu Ft",
        description: "Perfect for dorm room. Works great, moving out so need it gone.",
        price: 60,
        image: "https://picsum.photos/seed/fridge/400/300",
        category: "Dorm Essentials",
        location: "South Campus",
        condition: "Like New",
        type: "Sell",
        seller: { name: "Sarah Jones", rating: 4.7, major: "Biology", gradYear: 2024 },
        createdAt: "2024-01-19",
    },
    {
        id: "3",
        title: "Chemistry Tutoring",
        description: "Acing CHEM 101? I can help! $20/hr, first session half off.",
        price: 20,
        image: "https://picsum.photos/seed/tutor/400/300",
        category: "Tutoring",
        location: "University Village",
        condition: "New",
        type: "Sell",
        seller: { name: "Emily Watson", rating: 5.0, major: "Chemistry", gradYear: 2024 },
        createdAt: "2024-01-18",
    },
    {
        id: "4",
        title: "TI-84 Plus CE Graphing Calculator",
        description: "Color screen, rechargeable battery. Includes charging cable.",
        price: 85,
        image: "https://picsum.photos/seed/calc/400/300",
        category: "Electronics",
        location: "West Campus",
        condition: "Like New",
        type: "Sell",
        seller: { name: "David Kim", rating: 4.8, major: "Math", gradYear: 2026 },
        createdAt: "2024-01-17",
    },
    {
        id: "5",
        title: "Futon / Sofa Bed",
        description: "Black faux leather futon. Comfortable for sleeping guests. Free if you pick up!",
        price: 0,
        image: "https://picsum.photos/seed/futon/400/300",
        category: "Dorm Essentials",
        location: "Off-Campus",
        condition: "Fair",
        type: "Donate",
        seller: { name: "Mike Ross", rating: 4.5, major: "Law", gradYear: 2023 },
        createdAt: "2024-01-16",
    },
    {
        id: "6",
        title: "Sony WH-1000XM4 Headphones",
        description: "Active noise cancelling. Great for studying in loud places. Willing to trade for iPad.",
        price: 180,
        image: "https://picsum.photos/seed/headphones/400/300",
        category: "Electronics",
        location: "East Campus",
        condition: "Good",
        type: "Trade",
        seller: { name: "Jessica Suits", rating: 4.9, major: "Business", gradYear: 2025 },
        createdAt: "2024-01-15",
    },
    {
        id: "7",
        title: "Psychology 101 Textbook",
        description: "Paperback. No markings inside.",
        price: 30,
        image: "https://picsum.photos/seed/psych/400/300",
        category: "Textbooks",
        location: "North Campus",
        condition: "Like New",
        type: "Sell",
        seller: { name: "Tom Holland", rating: 4.6, major: "Psychology", gradYear: 2026 },
        createdAt: "2024-01-14",
    },
    {
        id: "8",
        title: "Desk Lamp with USB Port",
        description: "LED lamp with 3 brightness settings.",
        price: 15,
        image: "https://picsum.photos/seed/lamp/400/300",
        category: "Dorm Essentials",
        location: "South Campus",
        condition: "Good",
        type: "Sell",
        seller: { name: "Lisa Kudrow", rating: 4.7, major: "Arts", gradYear: 2024 },
        createdAt: "2024-01-13",
    },
    {
        id: "9",
        title: "Wireless Mouse",
        description: "Logitech pebble mouse. Works with bluetooth.",
        price: 10,
        image: "https://picsum.photos/seed/mouse/400/300",
        category: "Electronics",
        location: "West Campus",
        condition: "Like New",
        type: "Sell",
        seller: { name: "Chandler Bing", rating: 4.8, major: "CS", gradYear: 2025 },
        createdAt: "2024-01-12",
    },
    {
        id: "10",
        title: "Microwave",
        description: "Small microwave, perfect for dorm.",
        price: 25,
        image: "https://picsum.photos/seed/microwave/400/300",
        category: "Dorm Essentials",
        location: "North Campus",
        condition: "Fair",
        type: "Sell",
        seller: { name: "Joey Tribbiani", rating: 4.9, major: "Theater", gradYear: 2026 },
        createdAt: "2024-01-11",
    },
    {
        id: "11",
        title: "Eras Tour T-Shirt (Size M)",
        description: "Official merch, never worn.",
        price: 35,
        image: "https://picsum.photos/seed/shirt/400/300",
        category: "Clothing",
        location: "East Campus",
        condition: "New",
        type: "Sell",
        seller: { name: "Taylor S.", rating: 5.0, major: "Music", gradYear: 2024 },
        createdAt: "2024-01-10",
    },
    {
        id: "12",
        title: "Looking for roommates!",
        description: "2 bedroom apartment in Downtown. $800/month per person.",
        price: 800,
        image: "https://picsum.photos/seed/apt/400/300",
        category: "Housing (Sublets)",
        location: "Downtown",
        condition: "New",
        type: "Sell",
        seller: { name: "Ross Gellar", rating: 4.2, major: "Paleontology", gradYear: 2023 },
        createdAt: "2024-01-09",
    },
];

export function getProducts(filters: {
    search?: string;
    category?: string;
    location?: string;
    page?: number;
    limit?: number;
}): { products: Product[]; total: number; pages: number } {
    let filtered = [...mockProducts];

    // Filter by search
    if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(
            (p) =>
                p.title.toLowerCase().includes(searchLower) ||
                p.description.toLowerCase().includes(searchLower)
        );
    }

    // Filter by category
    if (filters.category && filters.category !== "All") {
        filtered = filtered.filter((p) => p.category === filters.category);
    }

    // Filter by location
    if (filters.location && filters.location !== "All Campuses") {
        filtered = filtered.filter((p) => p.location === filters.location);
    }

    const total = filtered.length;
    const limit = filters.limit || 8;
    const pages = Math.ceil(total / limit);
    const page = filters.page || 1;
    const start = (page - 1) * limit;
    const end = start + limit;

    return {
        products: filtered.slice(start, end),
        total,
        pages,
    };
}
