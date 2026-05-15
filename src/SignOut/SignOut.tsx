"use client";

import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const router = useRouter();

  async function signOut() {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signOut();

    router.refresh();
  }

  return (
    <button onClick={signOut} className="p-0 text-muted-foreground">
      Sign Out
    </button>
  );
}
