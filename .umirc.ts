import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index", layout: false },
  ],
  npmClient: 'pnpm',
});
