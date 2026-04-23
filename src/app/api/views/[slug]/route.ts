import { NextResponse } from "next/server";

// View counter stub — returns a no-op success so ViewCounter renders cleanly.
// Wire this to a real backend (e.g. Upstash Redis, PlanetScale, or your own
// API) when you need accurate per-post view tracking.
export async function POST(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  const { slug } = params;

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  // TODO: replace with real storage (e.g. Upstash Redis incr)
  return NextResponse.json({ views: 0 });
}
