import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import svgr from "vite-plugin-svgr";
// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api/v2": {
        target: "https://icp0.io",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
      "/backend": {
        target: "https://backend.amplify-icp.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backend/, "/"),
      },
    },
  },
  preview: {
    port: 3000,
    proxy: {
      "/api/v2": {
        target: "https://icp0.io",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
      "/backend": {
        target: "https://backend.amplify-icp.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backend/, "/"),
      },
    },
  },
  build: {
    outDir: "./dist",
    emptyOutDir: true,
  },
  define: { global: "globalThis" },
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve("src"),
      "@widgets": path.resolve("src/widgets"),
      "@features": path.resolve("src/features"),
      "@entities": path.resolve("src/entities"),
      "@public": path.resolve("public"),
    },
  },
});
