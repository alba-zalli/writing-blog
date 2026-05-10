import ClientHome from "@/components/ClientHome";
import { getPosts } from "@/lib/wordpress";

export default async function HomePage() {
  const posts = await getPosts();

  return <ClientHome posts={posts} />;
}