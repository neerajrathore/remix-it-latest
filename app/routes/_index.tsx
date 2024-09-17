import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import homeStyles from "../styles/home.css?url";

// The `meta` function defines the metadata for the index route.
// This data is used for the page's `<head>` element, including the title and description.
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

// The main component for the index (home) route.
// This displays the landing page with a heading, brief text, and a link to the notes page.
export default function Index() {
  return (
    <main id="content">
      <h1>A better way to keep track of your notes</h1>
      <p>Try it</p>
      <p id="cta">
        {/* Link to navigate the user to the notes page */}
        <Link to="/notes">Try Now!</Link>
      </p>
    </main>
  );
}

// The `links` function is used to apply styles to this specific route.
// This style applies only to the index route, but could potentially clash if other routes 
// have styles with the same class or ID names.
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: homeStyles }];
};
