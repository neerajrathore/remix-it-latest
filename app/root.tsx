import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
// Root layout is processed on the server side. 
// Avoid using `?url` for CSS imports in the root layout to ensure proper server-side rendering.
import MainStyle from '~/styles/main.css?url'
import MainNavigation from "./components/MainNavigation";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <Meta /> and <Links /> handle dynamic metadata and CSS inclusion */}
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          {/* Main navigation component will be displayed on all pages */}
          <MainNavigation />
        </header>
        {/* Render child components passed to the Layout */}
        {children}
        {/* ScrollRestoration enables the browser's native scroll restoration */}
        <ScrollRestoration />
        {/* <Scripts /> injects required client-side JavaScript */}
        <Scripts />
      </body>
    </html>
  );
}

// The <Outlet /> component is used to render the appropriate route's component inside the layout.
export default function App() {
  return <Outlet />;
}

// The ErrorBoundary component handles errors that occur within any routes.
// It serves as a fallback UI when an error is encountered, ensuring the app does not crash entirely.
export function ErrorBoundary() {
  const error: any = useRouteError(); // Retrieves the error information from the current route.
  console.log("root errorBoundary", {error}, isRouteErrorResponse(error));
  
  // for handling wrong route handle
  if (isRouteErrorResponse(error)) {
    return (
      <main>
        <p className='info-message'>isRouteErrorResponse true <br />Status: {error.status}</p>
        <p className='info-message'>{error.data}</p>
      </main>
    )
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>{error.statusText} root ErrorBoundary</title>
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <main className="error">
          <h1>{error.message || "something went wrong"}</h1>
          <p>
            <Link to="/">Back to homepage</Link>
          </p>
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// The `links` function is used to apply global styles across all pages of the app.
// It returns an array of link elements that include CSS files.
export function links() {
  return [{ rel: "stylesheet", href: MainStyle }]
}
