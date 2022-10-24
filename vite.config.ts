/// <reference types="vitest" />
/// <reference types="vite-ssg" />

import path from 'path'
import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import { VitePWA } from 'vite-plugin-pwa'
import generateSitemap from 'vite-ssg-sitemap'

import rehypePrettyCode from 'rehype-pretty-code'

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

    vueJsx({
      include: [/\.[jt]sx$/, /\.mdx?$/],
    }),

    mdx({
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: { dark: 'vitesse-dark', light: 'vitesse-light' },
            onVisitLine(node) {
              // Prevent lines from collapsing in `display: grid` mode, and
              // allow empty lines to be copy/pasted
              if (node.children.length === 0)
                node.children = [{ type: 'text', value: ' ' }]
            },
            // Feel free to add classNames that suit your docs
            onVisitHighlightedLine(node) {
              node.properties.className.push('highlighted')
            },
            onVisitHighlightedWord(node) {
              node.properties.className = ['highlighted']
            },
          },
        ],
      ], // <-- You can add other rehype plugins here
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
