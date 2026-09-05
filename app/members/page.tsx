"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageHero } from "@/app/components/page-hero";
import { createClient } from "@/app/lib/supabase/browser";
import {
  DirectorySkeleton,
  DirectoryView,
  type Member,
} from "./directory-view";
import { LoadFailed, MembersLoading, NotAMember } from "./members-states";

const TITLE = "Church Directory";

export default function MembersPage() {
  const router = useRouter();
  const supabase = createClient();

  const [members, setMembers] = useState<Member[]>([]);
  const [status, setStatus] = useState<
    "loading" | "not-member" | "error" | "success"
  >("loading");
  const [userEmail, setUserEmail] = useState("");
  const [userFirstName, setUserFirstName] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user?.email) {
        router.replace("/members/login");
        return;
      }

      setUserEmail(user.email);

      const { data: memberCheck } = await supabase
        .from("members")
        .select("id, full_name")
        .eq("email", user.email)
        .eq("is_active", true)
        .single();

      if (!memberCheck) {
        setStatus("not-member");
        return;
      }

      setUserFirstName(memberCheck.full_name?.split(" ")[0] ?? null);

      const { data, error } = await supabase
        .from("members")
        .select("id, full_name, email, phone")
        .eq("is_active", true)
        .order("full_name");

      if (error) {
        setStatus("error");
        return;
      }

      setMembers(data ?? []);
      setStatus("success");
    }

    load();
  }, [supabase, router]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (status === "loading") {
    return (
      <MembersLoading title={TITLE} label="Loading the directory…">
        <DirectorySkeleton />
      </MembersLoading>
    );
  }

  if (status === "not-member") {
    return <NotAMember email={userEmail} onSignOut={handleSignOut} />;
  }

  if (status === "error") {
    return (
      <LoadFailed
        title={TITLE}
        message="We could not load the member directory just now. This is usually temporary."
      />
    );
  }

  return (
    <div className="min-h-screen">
      <PageHero
        compact
        title={TITLE}
        lede={
          userFirstName
            ? `Welcome, ${userFirstName}. ${members.length} people belong to this fellowship.`
            : `${members.length} people belong to this fellowship.`
        }
      />
      <DirectoryView
        members={members}
        userEmail={userEmail}
        onSignOut={handleSignOut}
      />
    </div>
  );
}
