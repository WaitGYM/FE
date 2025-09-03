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
        find: "@comp",
        replacement: path.resolve(__dirname, "src/components"),
      },
      {
        find: "@api",
        replacement: path.resolve(__dirname, "src/services"),
      },
      {
        find: "@stores",
        replacement: path.resolve(__dirname, "src/stores"),
      },
      {
        find: "@styles",
        replacement: path.resolve(__dirname, "src/styles/sass"),
      },
      {
        find: "@types",
        replacement: path.resolve(__dirname, "src/types"),
      },
    ],
  },
});
