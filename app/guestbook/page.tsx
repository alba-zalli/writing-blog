import Link from "next/link";
import GuestbookForm from "@/components/GuestbookForm";
import GuestbookList from "@/components/GuestbookList";
import SignInWithGitHub from "@/components/SignInWithGithub";
import SignOut from "@/SignOut/SignOut";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { Suspense } from "react";
import Search from "@/components/Search";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    submitted?: string;
  }>;
}) {
  const params = await searchParams;

  return (
    <main className="relative min-h-screen overflow-hidden bg-indigo-200 text-gray-900">
      <section className="mx-auto max-w-4xl px-6 py-16">

        {/* NAV */}
        <div className="flex justify-between py-2 relative z-10 text-black">
          <Link href="/">
            <h2 className="text-2xl px-2 py-1 hover:underline">
              Home
            </h2>
          </Link>

          <Link href="/about">
            <h2 className="text-2xl px-2 py-1 hover:underline">
              About
            </h2>
          </Link>

          <Link href="/guestbook">
            <h2 className="text-2xl px-2 py-1 hover:underline">
              Guestbook
            </h2>
          </Link>

          <div className="w-64">

          </div>
        </div>

        <h1 className="mb-8 text-8xl">
          Guestbook
        </h1>

        <h2>Leave a message or comment</h2>

        <GuestbookForm submitted={params?.submitted} />

        <div className="mt-6 space-y-4">

        <br></br>

        <GuestbookList />
        </div>
      </section>
    </main>
  );
}