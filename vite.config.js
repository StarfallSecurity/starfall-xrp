import { defineConfig } from 'vite'
import postcss from './postcss.config.js'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import polyfillNode from 'rollup-plugin-polyfill-node'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  optimizeDeps: {
    esbuildOptions: {

        define: {
          global: 'globalThis',
        },
        plugins: [
            NodeGlobalsPolyfillPlugin({
                process: true,
                buffer: true,
            }),
        ],
    },
  },
  css: {
    postcss,
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, "");
        },
        events: 'events',
        crypto: 'crypto-browserify',
        stream: 'stream-browserify',
        http: 'stream-http',
        https: 'https-browserify',
        ws: 'xrpl/dist/npm/client/WSWrapper',
      },
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      plugins: [
          polyfillNode(),
      ]
    }
  } 
})
