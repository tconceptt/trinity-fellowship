"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/app/lib/supabase/browser";

export type AuthState = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  memberName: string | null;
  memberFirstName: string | null;
};

const AuthContext = createContext<AuthState>({
  user: null,
  loading: true,
  signOut: async () => {},
  memberName: null,
  memberFirstName: null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [memberName, setMemberName] = useState<string | null>(null);
  const supabase = createClient();

  const fetchMemberName = useCallback(async (u: User) => {
    if (!u.email) return;

    // Try user_metadata first (set at login callback)
    const metaName = u.user_metadata?.full_name;
    if (metaName) {
      setMemberName(metaName);
      return;
    }

    // Fall back to querying the members table
    const { data } = await supabase
      .from("members")
      .select("full_name")
      .eq("email", u.email)
      .eq("is_active", true)
      .single();

    if (data?.full_name) {
      setMemberName(data.full_name);
    }
  }, [supabase]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) fetchMemberName(user);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        fetchMemberName(u);
      } else {
        setMemberName(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase, fetchMemberName]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setMemberName(null);
  }, [supabase]);

  const memberFirstName = memberName?.split(" ")[0] ?? null;

  return (
    <AuthContext.Provider value={{ user, loading, signOut, memberName, memberFirstName }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
