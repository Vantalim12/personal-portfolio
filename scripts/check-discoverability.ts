import assert from "node:assert/strict";
import { isOffTopicQuestion } from "../src/lib/chatGuardrails";

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
  assert.equal(isOffTopicQuestion("What is BKMElevations LLC?"), false);
  assert.equal(
    isOffTopicQuestion("Write a function for BKMElevations LLC"),
    true,
  );
  assert.equal(isOffTopicQuestion("What is the weather in New York?"), true);
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
      assert.equal(
        profile.mainEntity.jobTitle,
        "Full-Stack Developer & GoHighLevel (GHL) Integrator",
      );
      assert.equal(profile.mainEntity.worksFor.name, "BKMElevations LLC");
      assert.equal(
        profile.mainEntity.worksFor.url,
        "https://bkmelevations.com/",
      );
      assert.equal(
        profile.mainEntity.worksFor.address.addressRegion,
        "New York",
      );
      assert.equal(profile.mainEntity.worksFor.address.addressCountry, "US");
      assert.equal(profile.mainEntity.alumniOf["@type"], "CollegeOrUniversity");
      assert.ok(profile.mainEntity.alumniOf.name.includes("MSU-IIT"));
      assert.equal(profile.mainEntity["@id"], `${publicUrl}/#jasper-gumora`);
      assert.deepEqual(profile.mainEntity.sameAs, [
        "https://github.com/Vantalim12",
        "https://www.linkedin.com/in/jaspergumora/",
      ]);
      assert.ok(html.includes("Hi, I&#x27;m Jasper Gumora. 👋"));
      assert.ok(html.includes("graduated with a BS in Information Technology"));
      assert.ok(html.includes("BKMElevations LLC"));
      assert.ok(html.includes("GoHighLevel (GHL) integrator"));
      assert.ok(html.includes("September 2026"));
      assert.ok(html.includes("Sep 2026"));
      assert.ok(meta.description.includes("MSU-IIT graduate"));
      assert.ok(meta.description.includes("BKMElevations LLC"));
      assert.ok(!html.includes("seeking internships"));
      assert.ok(!html.includes("Open to Internships"));
      assert.ok(!html.includes("undergraduate"));
      for (const href of [
        "https://github.com/Vantalim12",
        "https://www.linkedin.com/in/jaspergumora/",
        "/Gumora-Resume.pdf",
        "https://bkmelevations.com/",
        "https://legacyrides.rentals/",
      ]) {
        assert.ok(html.includes(`href="${href}"`), `${href} must stay linked`);
      }
    }
    if (path === "/projects") {
      for (const label of ["Problem:", "My contribution:", "Result:"]) {
        assert.equal(
          html.split(`<strong>${label}</strong>`).length - 1,
          5,
          `Each project must render its ${label} paragraph`,
        );
      }
      assert.ok(html.includes("BKMElevations LLC"));
      assert.ok(html.includes("GoHighLevel (GHL) integrator"));
      assert.ok(html.includes('href="https://legacyrides.rentals/"'));
      assert.ok(html.includes("3,195 students"));
      assert.ok(html.includes('href="/Gumora-Resume.pdf"'));
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
