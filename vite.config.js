import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = {
    ...loadEnv(mode, process.cwd(), ''),
    ...process.env,
  }
  return {
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      proxy: {
        "/api": {
          target: `https://api.hgbrasil.com/finance?key=${env.VITE_HGBRASIL_API_KEY}`,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        "/economia": {
          target: "https://economia.awesomeapi.com.br/json/daily",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/economia/, ""),
        },
      }
    }
  }
})
