import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";


export default defineConfig({
  plugins: [react(), tailwindcss(),visualizer({ filename: "stats.html", template: "treemap" }),],
  server: {
    proxy: {
      "/api": {
        // target: "http://127.0.0.1:8000",
        target: "https://ss.crowka.com", 
        changeOrigin: true,
        secure: false,
      },
    }, 
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          vendor: ["axios", "lodash"], 
        },
      },
    },
  },
});
