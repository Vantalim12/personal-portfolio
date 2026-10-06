import assert from "node:assert/strict";

const baseUrl = process.argv[2] ?? "http://localhost:3000";
const publicUrl = "https://jaspergumora.is-pinoy.dev";
const pages = [
  ["/", "Jasper Gumora | Full-Stack Developer"],
  ["/projects", "Projects | Jasper Gumora"],
  ["/contact", "Contact | Jasper Gumora"],
  ["/privacy", "Privacy | Jasper Gumora"],
];

async function read(path: string) {
  const response = await fetch(new URL(path, baseUrl), {
    headers: { "User-Agent": "Twitterbot/1.0" },
    signal: AbortSignal.timeout(30000),
  });
  assert.equal(response.status, 200, `${path} must return 200`);
  return response.text();
}

async function check() {
  for (const [path, title] of pages) {
    const html = await read(path);
    const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1];
    assert.ok(head, `${path} must render a head`);
    assert.ok(head.includes(`<title>${title}</title>`), `${path} title`);
    const canonicals = [
      ...head.matchAll(/<link rel="canonical" href="([^"]+)"/g),
    ];
    assert.equal(canonicals.length, 1, `${path} must have one canonical`);
    assert.equal(
      new URL(canonicals[0][1]).href,
      new URL(path, publicUrl).href,
      `${path} must canonicalize to itself`,
    );
    const meta = Object.fromEntries(
      [
        ...head.matchAll(
          /<meta (?:name|property)="([^"]+)" content="([^"]*)"/g,
        ),
      ].map((match) => [match[1], match[2]]),
    );
    assert.ok(meta.description.includes("Jasper Gumora"));
    assert.equal(meta["og:title"], title);
    assert.equal(meta["twitter:title"], title);
    assert.equal(meta["og:description"], meta.description);
    assert.equal(meta["twitter:description"], meta.description);
    assert.equal(new URL(meta["og:url"]).href, new URL(path, publicUrl).href);
    assert.equal(meta.author, "Jasper Gumora");
    assert.equal(meta.creator, "Jasper Gumora");
    assert.ok(!meta.robots?.includes("noindex"));
    const schemas = [
      ...html.matchAll(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
      ),
    ];
    assert.equal(schemas.length, path === "/" ? 1 : 0);
    if (path === "/") {
      const profile = JSON.parse(schemas[0][1]);
      assert.equal(profile["@type"], "ProfilePage");
      assert.equal(profile.mainEntity["@type"], "Person");
      assert.equal(profile.mainEntity.name, "Jasper Gumora");
      assert.equal(profile.mainEntity.jobTitle, "Full-Stack Developer");
      assert.equal(profile.mainEntity["@id"], `${publicUrl}/#jasper-gumora`);
      assert.deepEqual(profile.mainEntity.sameAs, [
        "https://github.com/Vantalim12",
        "https://www.linkedin.com/in/jaspergumora/",
      ]);
      assert.ok(html.includes("Hi, I&#x27;m Jasper Gumora. 👋"));
      for (const href of [
        "https://github.com/Vantalim12",
        "https://www.linkedin.com/in/jaspergumora/",
        "/Gumora-Resume.pdf",
      ]) {
        assert.ok(html.includes(`href="${href}"`), `${href} must stay linked`);
      }
    }
  }
  const sitemap = await read("/sitemap.xml");
  assert.deepEqual(
    [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((match) => match[1])
      .sort(),
    pages.map(([path]) => new URL(path, publicUrl).href).sort(),
  );
  assert.ok(!/<(?:lastmod|priority|changefreq)>/.test(sitemap));
  const robots = await read("/robots.txt");
  assert.ok(robots.includes("User-Agent: *\nAllow: /"));
  assert.ok(robots.includes(`Sitemap: ${publicUrl}/sitemap.xml`));
  const manifest = JSON.parse(await read("/manifest.json"));
  assert.equal(manifest.name, "Jasper Gumora");
  assert.equal(manifest.short_name, "Jasper Gumora");
  console.log(
    "Discoverability checks passed for all four pages and crawl files.",
  );
}

check().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
