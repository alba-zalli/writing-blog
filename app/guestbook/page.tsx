import Link from "next/link";
import GuestbookForm from "@/components/guestbook-form";
import GuestbookList from "@/components/guestbook-list";
import ParagraphSkeleton from "@/components/paragraph-skeleton";
import SignInWithGitHub from "@/components/sign-in-with-github";
import SignOut from "@/components/sign-out";
import { cn, fadeIn } from "@/lib/utils";
import { createClient } from "@/supabase/server";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    submitted?: boolean;
  };
}) {
  const supabaseClient = createClient(cookies());

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

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
            <Search
              onSearch={(value) => {
                window.location.href = `/?search=${value}`;
              }}
            />
          </div>
        </div>

        <h1 className="mb-8 text-8xl">
          Guestbook
        </h1>

        {!user ? (
          <>
            <section
              className={cn(
                fadeIn,
                "animation-delay-200 flex flex-col gap-2"
              )}
            >
              Welcome to my guestbook!

              <div>
                <SignInWithGitHub />
              </div>
            </section>

            <section className={cn(fadeIn, "animation-delay-600")}>
              <Suspense fallback={<ParagraphSkeleton />}>
                <GuestbookList />
              </Suspense>
            </section>
          </>
        ) : (
          <>
            <section className={cn(fadeIn, "animation-delay-200")}>
              <div className="flex items-center gap-2">
                Hi, {user.user_metadata.user_name}!
                <div className="animate animate-wave animation-delay-1000">
                  👋
                </div>

                <SignOut />
              </div>

              {searchParams?.submitted ? (
                <span>
                  Your message has been submitted! Thanks for signing my
                  guestbook.
                </span>
              ) : (
                <GuestbookForm />
              )}
            </section>

            <section className={cn(fadeIn, "animation-delay-600")}>
              <Suspense fallback={<ParagraphSkeleton />}>
                <GuestbookList />
              </Suspense>
            </section>
          </>
        )}
      </section>
    </main>
  );
}