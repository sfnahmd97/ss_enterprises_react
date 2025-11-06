import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      tailwindcss(),
      // Optional: open visualization automatically after build
      visualizer({
        filename: "stats.html",
        template: "treemap",
        gzipSize: true,
        brotliSize: true,
        open: false, // change to true if you want it to open automatically
      }),
    ],

    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },

    build: {
      // ⚙️ 1. Increase limit to silence 500 kB warning
      chunkSizeWarningLimit: 1000, // or higher if you prefer

      // ⚙️ 2. Better chunk splitting for performance
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom"],
            vendor: ["axios", "lodash", "react-select", "react-hot-toast"],
            charts: ["recharts"],
          },
        },
      },
    },
  };
});
