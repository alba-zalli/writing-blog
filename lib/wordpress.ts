const WORDPRESS_API_URL = "http://albas-blog.local/wp-json/wp/v2";

export async function getPosts() {
  const res = await fetch(`${WORDPRESS_API_URL}/posts?_embed`);

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export async function getPostBySlug(slug: string) {
  const res = await fetch(`${WORDPRESS_API_URL}/posts?slug=${slug}&_embed`);

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  const posts = await res.json();
  return posts[0];
}

export async function getCategoryBySlug(slug: string) {
  const res = await fetch(`${WORDPRESS_API_URL}/categories?slug=${slug}`);

  if (!res.ok) {
    throw new Error("Failed to fetch category");
  }

  const categories = await res.json();
  return categories[0];
}

export async function getPostsByCategory(categorySlug: string) {
  const category = await getCategoryBySlug(categorySlug);

  if (!category) {
    return [];
  }

  const res = await fetch(
    `${WORDPRESS_API_URL}/posts?categories=${category.id}&_embed`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts by category");
  }

  return res.json();
}