import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";

import indexCss from "./style/index.css";
import flexCss from "./style/flex.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: indexCss },
  { rel: "stylesheet", href: flexCss },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError() ;
  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body className="rooterror flex" style={{
      }}>
        <div
          style={{
          }}
        >
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          padding: "12px",
          paddingTop: "24px",
          width: "100%",
          // backgroundColor: "#623030",
          // border: "1px solid #7f3232",
          // borderRadius: "24px",
        }}>
          <h2 style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
          }} className="noselect">
            {isRouteErrorResponse(error)
              ? `${error.status} ${error.statusText}`
              : error instanceof Error
              ? error.message
              : "Unknown Error"}
          </h2>
          {
            // @ts-expect-error
            error.stack && (
              <pre style={{ whiteSpace: "pre-wrap" }} className="stack">
                {/* @ts-expect-error */}
                { error.stack ?? "No stacktrace available." }
              </pre>
            )
          }
        </div>
        <style>
          {`
            pre {
              overflow-x: auto;
            }
            pre.stack {
              background: #623030;
              padding: 12px;
              border-radius: 12px;
              border: 1px solid #7f3232;
              text-color: #fff;
              overflow-x: auto;
            }

            @media (max-width: 600px) {
              .body {
                display: flex;
                flex-direction: row;
              }
            }
          `}
        </style>
        <Scripts />
      </body>
    </html>
  );
}