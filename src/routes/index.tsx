import { createFileRoute } from "@tanstack/react-router";

/**
 * The Sahaay website is built as plain HTML, CSS and JavaScript files.
 * The real home page lives at /pages/HomePage.html.
 * This route simply sends visitors of "/" to that page.
 */
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sahaay — Cooperative Gig Services Platform for Verified Workers" },
      {
        name: "description",
        content:
          "Sahaay is a government-owned services marketplace where workers register independently, verify identity and skills, and are paid directly.",
      },
      { property: "og:title", content: "Sahaay — Cooperative Gig Services Platform" },
      {
        property: "og:description",
        content:
          "Register independently, verify your identity and skills, get matched with work and get paid directly into your own bank account.",
      },
    ],
    scripts: [{ children: 'window.location.replace("/pages/HomePage.html");' }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <a href="/pages/HomePage.html" className="text-lg underline">
        Continue to Sahaay
      </a>
    </div>
  );
}
