// Centralized API client for VList

const API_BASE = "/api";

interface ApiResponse<T> {
    data?: T;
    error?: string;
}

async function fetchApi<T>(
    endpoint: string,
    options?: RequestInit
): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
            ...options,
        });

        const data = await response.json();

        if (!response.ok) {
            return { error: data.error || "Request failed" };
        }

        return { data };
    } catch (error) {
        return { error: error instanceof Error ? error.message : "Network error" };
    }
}

// =====================
// Products API
// =====================

export interface ProductFilters {
    search?: string;
    category?: string;
    location?: string;
    page?: number;
    limit?: number;
}

export interface ProductsResponse {
    products: Product[];
    total: number;
    pages: number;
}

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

export async function getProducts(filters: ProductFilters = {}): Promise<ApiResponse<ProductsResponse>> {
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.category) params.set("category", filters.category);
    if (filters.location) params.set("location", filters.location);
    if (filters.page) params.set("page", filters.page.toString());
    if (filters.limit) params.set("limit", filters.limit.toString());

    const query = params.toString();
    return fetchApi<ProductsResponse>(`/products${query ? `?${query}` : ""}`);
}

export async function getProductById(id: string): Promise<ApiResponse<{ product: Product }>> {
    return fetchApi<{ product: Product }>(`/products/${id}`);
}

export interface CreateProductInput {
    title: string;
    description?: string;
    price?: number;
    image?: string;
    category: string;
    location: string;
    condition: string;
    type?: string;
}

export async function createProduct(input: CreateProductInput): Promise<ApiResponse<{ product: Product }>> {
    return fetchApi<{ product: Product }>("/products", {
        method: "POST",
        body: JSON.stringify(input),
    });
}

export async function updateProduct(
    id: string,
    input: Partial<CreateProductInput & { isActive?: boolean }>
): Promise<ApiResponse<{ product: Product }>> {
    return fetchApi<{ product: Product }>(`/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(input),
    });
}

export async function deleteProduct(id: string): Promise<ApiResponse<{ success: boolean }>> {
    return fetchApi<{ success: boolean }>(`/products/${id}`, {
        method: "DELETE",
    });
}

// =====================
// Profile API
// =====================

export interface Profile {
    id: string;
    name: string;
    email: string;
    major?: string;
    gradYear?: number;
    avatar?: string;
    rating: number;
    createdAt: string;
}

export async function getProfile(): Promise<ApiResponse<{ profile: Profile }>> {
    return fetchApi<{ profile: Profile }>("/profile");
}

export async function updateProfile(input: {
    name?: string;
    major?: string;
    gradYear?: number;
    avatar?: string;
}): Promise<ApiResponse<{ profile: Profile }>> {
    return fetchApi<{ profile: Profile }>("/profile", {
        method: "PUT",
        body: JSON.stringify(input),
    });
}

// =====================
// Users API (Public profiles)
// =====================

export interface PublicUser {
    id: string;
    name: string;
    major?: string;
    gradYear?: number;
    avatar?: string;
    rating: number;
    createdAt: string;
}

export async function getUserById(id: string): Promise<ApiResponse<{ user: PublicUser }>> {
    return fetchApi<{ user: PublicUser }>(`/users/${id}`);
}
