import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import { env } from "process";

const isDev = env.NODE_ENV === "development";

export default defineConfig({
 plugins: [react()],
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
