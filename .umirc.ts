import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index", layout: false },
    // { path: "/docs", component: "docs" },
  ],
  npmClient: 'pnpm',
});
