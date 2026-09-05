import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const API_PROXY_TARGET = (process.env.API_PROXY_TARGET || "").replace(
  /\/+$/,
  ""
);
if (!API_PROXY_TARGET) {
  throw new Error(
    "API_PROXY_TARGET env var is required, e.g. https://beanaksehat-app.up.railway.app"
  );
}

const app = express();
app.disable("x-powered-by");

// Proxying /api same-origin makes the refresh-token cookie first-party, so
// mobile browsers/in-app webviews that block third-party cookies stop
// dropping the session.
app.use(
  "/api",
  createProxyMiddleware({
    // Express strips the "/api" mount prefix from req.url before this
    // middleware sees it, so it must be added back here to reach the
    // backend's actual /api/* routes.
    target: `${API_PROXY_TARGET}/api`,
    changeOrigin: true,
    xfwd: true,
  })
);

const distDir = path.join(__dirname, "dist");
app.use(express.static(distDir));

// SPA fallback for client-side routing.
app.use((req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `Frontend server listening on port ${PORT}, proxying /api -> ${API_PROXY_TARGET}`
  );
});
