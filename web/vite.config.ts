import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // 외부 접근 허용
    port: 5173,
  },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      {
        find: "@img",
        replacement: path.resolve(__dirname, "src/assets/images"),
      },
      {
        find: "@styles",
        replacement: path.resolve(__dirname, "src/styles/sass"),
      },
    ],
  },
  build: {
    // 청크 크기 경고 기준 상 (기본 500kB → 1000kB)
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // 큰 라이브러리를 vendor 청크로 분리
        manualChunks: {
          react: ["react", "react-dom"],
          zustand: ["zustand"],
        },
      },
    },
  },
});
