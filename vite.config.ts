/// <reference types="vitest" />
/// <reference types="vite-ssg" />

import path from 'path'
import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import { VitePWA } from 'vite-plugin-pwa'
import generateSitemap from 'vite-ssg-sitemap'

import rehypePrism from 'rehype-prism-plus'

import Unocss from 'unocss/vite'
import mdx from 'vite-plugin-vue3-mdx'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  plugins: [
    // vue(),

    // mdx plugin should be put here before jsx plugin
    mdx({
      jsx: true,
      rehypePlugins: [rehypePrism], // <-- You can add other rehype plugins here
    }), // as PluginOption,

    // transform jsx files after mdx transforms markdown(X) files
    vueJsx({
      include: [/\.[jt]sx$/, /\.mdx?$/],
    }),

    Unocss(),

    Pages({
      extensions: ['ts', 'js', 'tsx', 'jsx', 'mdx', 'md'],
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
