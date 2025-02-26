import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { env } from "process";
import { defineConfig } from "vite";
import dotenv from "dotenv";

dotenv.config();

const isDev = env.NODE_ENV === "development";

export default defineConfig({
 base: isDev ? '/' : process.env.VITE_BASE_URL,
 plugins: [react()],
 build: {
  chunkSizeWarningLimit: 1000,
 },
 css: {
   devSourcemap: true,
   modules: {
     generateScopedName: isDev
       ? "[name]_[local]__[hash:base64:5]"
       : "[hash:base64:4]",
   },
 },
 resolve: {
   alias: {
     "@": resolve(__dirname, "./src"),
   },
 },
 server: {
   host: '0.0.0.0',
   port: 5173,
   watch: {
     usePolling: true,
   },
 },
});
