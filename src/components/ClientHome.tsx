"use client";

import Link from "next/link";
import { useState } from "react";
import Search from "@/components/Search";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";


export default function ClientHome({ posts }: { posts: any[] }) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

const cleanExcerpt = (html = "") => {
  const cleaned = html
    .replace(/\[\s*&hellip;\s*\]/gi, "")
    .replace(/\[\s*…\s*\]/g, "")
    .replace(/\[\s*\.\.\.\s*\]/g, "")
    .replace(/&hellip;/g, "")
    .replace(/…/g, "")
    .replace(/<[^>]*>/g, " ") // optional: strip HTML
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[.,!?;:\s]+$/g, ""); // remove trailing punctuation/spaces

  return cleaned + "...";
};

  const getWordCount = (html = "") => {
    const text = html
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/\s+/g, " ")
      .trim();
    return text ? text.split(" ").length : 0;
  };

  const getReadTime = (html = "") => {
    const wordCount = getWordCount(html);
    return Math.ceil(wordCount / 238);
  };

  const printReadTimeMsg = (html = "") => {
    return getReadTime(html) <= 1
      ? "minute to read"
      : "minutes to read";
  };

  /**convert post content into a standardized text output */
  const stripHTML = (html = "") => {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
  };

  const filteredPosts = posts.filter((post) => {
  const search = searchValue.toLowerCase();

  const title = stripHTML(post.title?.rendered);
  const content = stripHTML(post.content?.rendered);
  const excerpt = stripHTML(post.excerpt?.rendered);

  const terms =
    post._embedded?.["wp:term"]?.flat()?.map((t: any) =>
      t.name.toLowerCase()
    ) || [];

  const tags = terms.join(" ");

  const combined = `${title} ${content} ${excerpt} ${tags}`;

  return combined.includes(search);
  });

  return (
    <main className="relative min-h-screen overflow-hidden bg-indigo-200 text-gray-900">
      
      <Image
        src="/stars-big.png"
        width={500}
        height={600}
        alt="a stars design"
        className="
              absolute left-0 top-0
              pointer-events-none
              animate-blink
              hidden xl:block
              "
      />


      <section className="mx-auto max-w-4xl px-6 py-16">
        
        
        {/* NAV */}
        <div className="flex justify-between py-2 relative z-10 relative z-10 text-black">
          <Link href="/">
            <h2 className="text-2xl px-2 py-1 hover:underline">Home</h2>
          </Link>
          <Link href="/about">
            <h2 className="text-2xl px-2 py-1 hover:underline">About</h2>
          </Link>
          <Link href="/guestbook">
          <h2 className="text-2xl px-2 py-1 hover:underline">Guestbook</h2>
          </Link>

          <div className="w-64"> <Search onSearch={handleSearch} /> </div>
        </div>

        {/* HEADER */}
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-8xl DreamerTM-Regular relative z-10">
            Alba&apos;s Blog
          </h1>
        </div>

        <p className="mb-10 relative z-10">The writings of Alba Zalli</p>

        {/* POSTS */}
        <div className="space-y-6">
        {/* animate posts upon each search */}
          {filteredPosts.map((post: any) => (

            <article
              key={post.id}
              className="border-2 border-blue-700 bg-white p-6 drop-shadow-sm animate-fade-in-up"
            >

              <p className="mb-2 text-sm text-blue-700">
                {new Date(post.date).toLocaleDateString("en-CA", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <h2 className="text-2xl font-semibold">
                <Link href={`/${post.slug}`}>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: post.title.rendered,
                    }}
                  />
                </Link>
              </h2>

              <div
                className="mt-3 text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: cleanExcerpt(post.excerpt.rendered),
                }}
              />

              <p className="pt-2 mb-2 text-sm text-blue-700">
                {post._embedded?.["wp:term"]?.[0]?.[0]?.name}
                {" • "}
                {getReadTime(post.content?.rendered)}{" "}
                {printReadTimeMsg(post.content?.rendered)}
                {" • "}
                {getWordCount(post.content?.rendered)} words
              </p>
            </article>
          ))}
          </div>
      </section>
    </main>
  );
}