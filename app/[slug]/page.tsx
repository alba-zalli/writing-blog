import Link from "next/link";
import { getPostBySlug } from "@/lib/wordpress";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-indigo-200 p-10">
        <h1 className="text-3xl">Post not found</h1>
        <Link href="/">Back home</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-indigo-200 text-gray-900">
      <article className="mx-auto max-w-4xl px-6 py-16">
        <Link href="/" className="text-blue-800">
          ← Back home
        </Link>

        <h1
          className="mb-8 mt-6 text-7xl"
          dangerouslySetInnerHTML={{ __html: post.title?.rendered || "Untitled" }}
        />

        <div
          className="mt-3 text-xl font-serif leading-8 text-gray-800"
          dangerouslySetInnerHTML={{
            __html:
              post.content?.rendered ||
              post.excerpt?.rendered ||
              "No story text found",
          }}
        />
      </article>
    </main>
  );
}