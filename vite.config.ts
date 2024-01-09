import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "path";
import Components from 'unplugin-vue-components/vite'
import {BootstrapVueNextResolver} from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true
      }
    }),
    Components({
      resolvers: [BootstrapVueNextResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      '~bootstrap-vue': path.resolve(__dirname, 'node_modules/bootstrap-vue'),
      '~bootstrap-vue-3': path.resolve(__dirname, 'node_modules/bootstrap-vue-3'),
    }
  },
  base: ''
})
