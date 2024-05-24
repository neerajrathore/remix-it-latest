import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import homeStyles from "~/styles/home.css";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main id="content">
      <h1>A better way to keep track of your notes</h1>
      <p>Try it</p>
      <p id="cta">
        <Link to="/notes">Try Now!</Link>
      </p>
    </main>
  );
}

// this style only applies to this file but can clash with some other file same names
export const links = () => {
  return [{ rel: "stylesheet", href: homeStyles }]
}