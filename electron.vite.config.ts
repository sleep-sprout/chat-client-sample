import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    build: {
      lib: {
        entry: resolve('src/main/app/index.ts'),
      },
    },
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    build: {
      lib: {
        entry: resolve('src/main/app/preload.ts'),
        fileName: "index.js"
      },
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer')
      }
    },
    plugins: [react()]
  }
})
