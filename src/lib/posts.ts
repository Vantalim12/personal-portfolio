export type PostSummary = {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  image?: string;
  publishedAt?: string;
  updatedAt?: string;
  tags: string[];
  readingTime: string;
  draft: boolean;
  coAuthors?: string[];
  views?: number;
};

export type PostDetail = PostSummary & {
  content: string;
};

const TACOS_API_URL = process.env.TACOS_API_URL ?? "";
const TACOS_API_KEY = process.env.TACOS_API_KEY || "";
const POSTS_REVALIDATE_SECONDS = 600;

type FetchWithApiKeyOptions = {
  tags?: string[];
  revalidateSeconds?: number;
};

const fetchWithApiKey = async (
  url: string,
  options: FetchWithApiKeyOptions = {},
) => {
  const { tags, revalidateSeconds } = options;
  if (!TACOS_API_URL) {
    throw new Error("TACOS_API_URL is not configured");
  }
  const res = await fetch(url, {
    ...(process.env.NODE_ENV === "production"
      ? {
          next: {
            revalidate: revalidateSeconds ?? POSTS_REVALIDATE_SECONDS,
            ...(tags ? { tags } : {}),
          },
        }
      : { cache: "no-store" }),
    headers: {
      "X-TACOS-Key": TACOS_API_KEY,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`);
  }
  return res.json();
};

export async function getPosts(limit?: number): Promise<PostSummary[]> {
  try {
    const posts: unknown = await fetchWithApiKey(
      `${TACOS_API_URL}/posts`,
      { tags: ["posts"] },
    );
    // Posts already sorted by publishedAt desc from the API
    if (!Array.isArray(posts)) {
      return [];
    }
    const summaries = posts as PostSummary[];
    return limit ? summaries.slice(0, limit) : summaries;
  } catch (err) {
    console.error("Error fetching posts:", err);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  try {
    const post: unknown = await fetchWithApiKey(
      `${TACOS_API_URL}/posts/${encodeURIComponent(slug)}`,
      { tags: ["posts", `post:${slug}`] },
    );
    if (!post || Array.isArray(post) || typeof post !== "object") {
      return null;
    }
    return post as PostDetail;
  } catch (err) {
    console.error(`Error fetching post ${slug}:`, err);
    return null;
  }
}
