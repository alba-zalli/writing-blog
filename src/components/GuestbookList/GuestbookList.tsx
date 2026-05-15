import { createClient } from "@supabase/supabase-js";

export default async function GuestbookList() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from("Guestbook")
    .select("*")
    .order("created_at", { ascending: false });

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <ul className="space-y-4">
      {data?.map((message) => (
        <li key={message.id}>
          <div className="border-2 border-blue-700 flex flex-col gap-4 py-2 px-2 bg-indigo-50">

            

            <div className="justify-between flex items-center gap-4">
              <strong>{message.username}</strong>
              <small>{new Date(message.created_at).toLocaleString()}</small>
            </div>

            {message.message}
          </div>
        </li>
      ))}
    </ul>
  );
}