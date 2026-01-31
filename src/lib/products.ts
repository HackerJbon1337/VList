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
        description: "Used for MATH 101. Good condition, some highlighting on first few chapters.",
        price: 3500,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop",
        category: "Textbooks",
        location: "North Campus",
        condition: "Good",
        type: "Sell",
        seller: { name: "Alex Chen", rating: 4.9, major: "Engineering", gradYear: 2025 },
        createdAt: "2024-01-20",
    },
    {
        id: "2",
        title: "Sony WH-1000XM5 Headphones",
        description: "Active noise cancelling. Perfect for library study sessions. Box included.",
        price: 24000,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop",
        category: "Electronics",
        location: "South Campus",
        condition: "Like New",
        type: "Sell",
        seller: { name: "Sarah Jones", rating: 4.7, major: "Music", gradYear: 2024 },
        createdAt: "2024-01-19",
    },
    {
        id: "3",
        title: "Chemistry Tutoring (Organic)",
        description: "Struggling with Orgo? I got an A. First session 50% off.",
        price: 800,
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=600&auto=format&fit=crop",
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
        description: "Color screen. Essential for STAT 202 + calc. Comes with charging cable.",
        price: 7500,
        image: "https://images.unsplash.com/photo-1624969862293-b749659ccc4e?q=80&w=600&auto=format&fit=crop",
        category: "Electronics",
        location: "West Campus",
        condition: "Good",
        type: "Sell",
        seller: { name: "David Kim", rating: 4.8, major: "Math", gradYear: 2026 },
        createdAt: "2024-01-17",
    },
    {
        id: "5",
        title: "Dell 27\" 4K Monitor",
        description: "Great for coding or design. No dead pixels. Moving out sale.",
        price: 18000,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop",
        category: "Electronics",
        location: "Off-Campus",
        condition: "Like New",
        type: "Sell",
        seller: { name: "Mike Ross", rating: 4.5, major: "CS", gradYear: 2025 },
        createdAt: "2024-01-16",
    },
    {
        id: "6",
        title: "Ergonomic Mesh Study Chair",
        description: "Save your back during finals week. Fully adjustable.",
        price: 6500,
        image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=600&auto=format&fit=crop",
        category: "Furniture",
        location: "East Campus",
        condition: "Good",
        type: "Sell",
        seller: { name: "Jessica Suits", rating: 4.9, major: "Business", gradYear: 2025 },
        createdAt: "2024-01-15",
    },
    {
        id: "7",
        title: "Introduction to Psychology (Verified)",
        description: "Paperback. Minimal notes. Cheaper than bookstore.",
        price: 2200,
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop",
        category: "Textbooks",
        location: "North Campus",
        condition: "Like New",
        type: "Sell",
        seller: { name: "Tom Holland", rating: 4.6, major: "Psychology", gradYear: 2026 },
        createdAt: "2024-01-14",
    },
    {
        id: "8",
        title: "LED Desk Lamp with Wireless Charging",
        description: "3 brightness modes + charges your phone. Space saver.",
        price: 1500,
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=600&auto=format&fit=crop",
        category: "Dorm Essentials",
        location: "South Campus",
        condition: "Like New",
        type: "Sell",
        seller: { name: "Lisa Kudrow", rating: 4.7, major: "Arts", gradYear: 2024 },
        createdAt: "2024-01-13",
    },
    {
        id: "9",
        title: "Mechanical Keyboard (60%)",
        description: "Red switches, linear feel. RGB backlit. Great for typing essays.",
        price: 4500,
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=600&auto=format&fit=crop",
        category: "Electronics",
        location: "West Campus",
        condition: "Like New",
        type: "Sell",
        seller: { name: "Chandler Bing", rating: 4.8, major: "CS", gradYear: 2025 },
        createdAt: "2024-01-12",
    },
    {
        id: "10",
        title: "Herschel Retreat Backpack",
        description: "Grey color. Fits 15 inch laptop perfectly. Waterproof.",
        price: 3800,
        image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=600&auto=format&fit=crop",
        category: "Clothing",
        location: "North Campus",
        condition: "Good",
        type: "Sell",
        seller: { name: "Joey Tribbiani", rating: 4.9, major: "Theater", gradYear: 2026 },
        createdAt: "2024-01-11",
    },
    {
        id: "11",
        title: "Eras Tour T-Shirt (Size M)",
        description: "Official merch from the concert. Never worn, tag still on.",
        price: 4000,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600&auto=format&fit=crop",
        category: "Clothing",
        location: "East Campus",
        condition: "New",
        type: "Sell",
        seller: { name: "Taylor S.", rating: 5.0, major: "Music", gradYear: 2024 },
        createdAt: "2024-01-10",
    },
    {
        id: "12",
        title: "Hydro Flask 32oz",
        description: "Black wide mouth bottle. A few small dents but cleans fine.",
        price: 1200,
        image: "https://images.unsplash.com/photo-1602143407151-a111efd420a5?q=80&w=600&auto=format&fit=crop",
        category: "Dorm Essentials",
        location: "Gym",
        condition: "Fair",
        type: "Sell",
        seller: { name: "Dwayne J.", rating: 4.8, major: "Sports Med", gradYear: 2024 },
        createdAt: "2024-01-08",
    },
    {
        id: "13",
        title: "iPad Air 5th Gen (64GB)",
        description: "Blue color. Includes Apple Pencil 2. No scratches.",
        price: 38000,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop",
        category: "Electronics",
        location: "Library",
        condition: "Like New",
        type: "Sell",
        seller: { name: "Steve J.", rating: 5.0, major: "Design", gradYear: 2025 },
        createdAt: "2024-01-09",
    },
    {
        id: "14",
        title: "Study Table / Desk",
        description: "Simple white IKEA desk. Sturdy. Moving out, free pickup.",
        price: 0,
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=600&auto=format&fit=crop",
        category: "Furniture",
        location: "Off-Campus",
        condition: "Fair",
        type: "Donate",
        seller: { name: "Monica G.", rating: 4.9, major: "Culinary", gradYear: 2023 },
        createdAt: "2024-01-07",
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

export function getProductById(id: string): Product | undefined {
    return mockProducts.find((p) => p.id === id);
}
