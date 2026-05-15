"use server";

import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export default async function submitGuestbookMessage(formData: FormData) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const message = formData.get("message")?.toString();
  const username = formData.get("username")?.toString();

  if (!message || !username) return;

  const { error } = await supabase.from("Guestbook").insert({
    message,
    username,
  });

  if (error) {
    console.log("INSERT ERROR:", error);
    return;
  }

  redirect("/guestbook?submitted=true");
}