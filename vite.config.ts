import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  const env = loadEnv(mode, process.cwd());

  console.log(env);

  return {
    base: '/',
    plugins: [react()],
    build: {
      chunkSizeWarningLimit: 1000,
    },
    css: {
      devSourcemap: true,
      modules: {
        generateScopedName: isDev
          ? '[name]_[local]__[hash:base64:5]'
          : '[hash:base64:4]',
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    server: {
      allowedHosts: ["https://ctf-scoreboard.padev.surf", "https://scoreboard.padev.surf", "ctf-scoreboard.padev.surf", "scoreboard.padev.surf", "ctf-scoreboard.padev.surf/", "scoreboard.padev.surf/"],
      host: '0.0.0.0',
      port: 5173,
      watch: {
        usePolling: true,
      },
    },
  };
});