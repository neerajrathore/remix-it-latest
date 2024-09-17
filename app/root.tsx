import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
// root layout will always be processed on the server side so don't import css using ?url  
import MainStyle from '~/styles/main.css?url'
import MainNavigation from "./components/MainNavigation";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

// reserved error page 
// export function ErrorBoundary ({error}: {error: {message: string}}) {
export function ErrorBoundary () {
  const error = useRouteError();
  console.log(error, typeof error,  ".........................");
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>An error occurred in root</title>
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <main className="error">
          <h1>error occurred in root h1</h1>
          {/* <p>{error}</p> */}
          <p><Link to={'/'}>Back</Link></p>
        </main>
        {/* {children} */}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// overall global style that applies to all pages
export function links() {
  return [{ rel: "stylesheet", href: MainStyle }]
}