// Auth store using Zustand with Supabase integration
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser, AuthError } from "@supabase/supabase-js";

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    initialized: boolean;

    // Actions
    initialize: () => Promise<void>;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    clearError: () => void;
}

function mapSupabaseUser(supabaseUser: SupabaseUser): User {
    return {
        id: supabaseUser.id,
        email: supabaseUser.email || "",
        name:
            supabaseUser.user_metadata?.name ||
            supabaseUser.user_metadata?.full_name ||
            supabaseUser.email?.split("@")[0] ||
            "User",
        avatar: supabaseUser.user_metadata?.avatar_url,
    };
}

function getErrorMessage(error: AuthError): string {
    switch (error.message) {
        case "Invalid login credentials":
            return "Invalid email or password";
        case "User already registered":
            return "An account with this email already exists";
        case "Email not confirmed":
            return "Please check your email to confirm your account";
        default:
            return error.message;
    }
}

// Check if Supabase is configured
function isSupabaseConfigured(): boolean {
    return !!(
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
        !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-supabase")
    );
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isLoading: false,
            error: null,
            initialized: false,

            initialize: async () => {
                if (get().initialized) return;

                // If Supabase is not configured, use demo mode
                if (!isSupabaseConfigured()) {
                    set({ initialized: true });
                    return;
                }

                try {
                    const supabase = createClient();
                    const {
                        data: { session },
                    } = await supabase.auth.getSession();

                    if (session?.user) {
                        set({
                            user: mapSupabaseUser(session.user),
                            initialized: true,
                        });
                    } else {
                        set({ initialized: true });
                    }

                    // Listen for auth changes
                    supabase.auth.onAuthStateChange((_event, session) => {
                        if (session?.user) {
                            set({ user: mapSupabaseUser(session.user) });
                        } else {
                            set({ user: null });
                        }
                    });
                } catch {
                    set({ initialized: true });
                }
            },

            login: async (email: string, password: string) => {
                set({ isLoading: true, error: null });

                // Demo mode if Supabase not configured
                if (!isSupabaseConfigured()) {
                    await new Promise((resolve) => setTimeout(resolve, 1000));

                    if (!email || !password) {
                        set({ isLoading: false, error: "Please enter email and password" });
                        return false;
                    }

                    if (password.length < 6) {
                        set({
                            isLoading: false,
                            error: "Password must be at least 6 characters",
                        });
                        return false;
                    }

                    const user: User = {
                        id: Date.now().toString(),
                        email,
                        name: email.split("@")[0],
                    };

                    set({ user, isLoading: false, error: null });
                    return true;
                }

                try {
                    const supabase = createClient();
                    const { data, error } = await supabase.auth.signInWithPassword({
                        email,
                        password,
                    });

                    if (error) {
                        set({ isLoading: false, error: getErrorMessage(error) });
                        return false;
                    }

                    if (data.user) {
                        set({
                            user: mapSupabaseUser(data.user),
                            isLoading: false,
                            error: null,
                        });
                        return true;
                    }

                    set({ isLoading: false, error: "Login failed" });
                    return false;
                } catch (err) {
                    set({
                        isLoading: false,
                        error: err instanceof Error ? err.message : "Login failed",
                    });
                    return false;
                }
            },

            register: async (name: string, email: string, password: string) => {
                set({ isLoading: true, error: null });

                // Demo mode if Supabase not configured
                if (!isSupabaseConfigured()) {
                    await new Promise((resolve) => setTimeout(resolve, 1000));

                    if (!name || !email || !password) {
                        set({ isLoading: false, error: "Please fill in all fields" });
                        return false;
                    }

                    if (password.length < 6) {
                        set({
                            isLoading: false,
                            error: "Password must be at least 6 characters",
                        });
                        return false;
                    }

                    const user: User = {
                        id: Date.now().toString(),
                        name,
                        email,
                    };

                    set({ user, isLoading: false, error: null });
                    return true;
                }

                try {
                    const supabase = createClient();
                    const { data, error } = await supabase.auth.signUp({
                        email,
                        password,
                        options: {
                            data: {
                                name,
                                full_name: name,
                            },
                        },
                    });

                    if (error) {
                        set({ isLoading: false, error: getErrorMessage(error) });
                        return false;
                    }

                    if (data.user) {
                        set({
                            user: mapSupabaseUser(data.user),
                            isLoading: false,
                            error: null,
                        });
                        return true;
                    }

                    set({ isLoading: false, error: "Registration failed" });
                    return false;
                } catch (err) {
                    set({
                        isLoading: false,
                        error: err instanceof Error ? err.message : "Registration failed",
                    });
                    return false;
                }
            },

            logout: async () => {
                if (isSupabaseConfigured()) {
                    const supabase = createClient();
                    await supabase.auth.signOut();
                }
                set({ user: null, error: null });
            },

            clearError: () => {
                set({ error: null });
            },
        }),
        {
            name: "vlist-auth",
            partialize: (state) => ({ user: state.user }),
        }
    )
);
