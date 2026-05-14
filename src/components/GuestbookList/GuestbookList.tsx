import { createClient } from "@/supabase/server";
import { cookies } from "next/headers";

export default async function GuestbookList() {
  const supabaseClient = createClient(cookies());
  const { data } = await supabaseClient.from("Guestbook").select("*");

  return (
    <ul className="flex flex-col gap-6">
      {data
        ?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        ?.map((message) => (
          <li key={message.id} className="flex items-center gap-2">
            {message.username}: {message.message}
          </li>
        ))}
    </ul>
  );
}