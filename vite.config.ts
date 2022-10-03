/// <reference types="vitest" />

import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import { VitePWA } from 'vite-plugin-pwa'
import generateSitemap from 'vite-ssg-sitemap'

import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  plugins: [
    vue(),
    vueJsx(),
    Unocss(),
    Pages({
      extensions: ['ts', 'js', 'tsx', 'jsx'],
    }),
    Layouts({
      extensions: ['ts', 'js', 'tsx', 'jsx'],
    }),
    VitePWA(),
  ],

  // https://github.com/vitest-dev/vitest
  test: {
    include: ['test/**/*.test.ts'],
    environment: 'jsdom',
    transformMode: {
      web: [/\.[jt]sx$/],
    },
  },

  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    onFinished() { generateSitemap() },
  },

  ssr: {
    noExternal: ['workbox-window'],
  },
})
