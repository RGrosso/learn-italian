import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig, lazyPlugins } from 'vite-plus'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  fmt: {
    singleQuote: true,
    semi: false,
  },
  lint: {
    ignorePatterns: ['dist/**', 'dev-dist/**'],
    plugins: ['react', 'typescript', 'jsx-a11y', 'oxc', 'unicorn', 'promise', 'import'],
    // Categories turn on whole groups of rules at once
    categories: {
      correctness: 'error', // code that is almost certainly wrong
      suspicious: 'warn', // code that is probably wrong
      perf: 'warn', // code that is needlessly slow
    },
    rules: {
      // React: hooks and rendering mistakes
      'react/rules-of-hooks': 'error',
      'react/exhaustive-deps': 'error',
      'react/only-export-components': ['warn', { allowConstantExport: true }],
      'react/jsx-key': 'error',
      'react/no-array-index-key': 'warn',
      'react/jsx-no-useless-fragment': 'warn',
      'react/no-danger': 'error',
      'react/jsx-no-target-blank': 'error',
      'react/button-has-type': 'error',
      'react/jsx-no-constructed-context-values': 'warn',
      'react/no-unstable-nested-components': 'error',
      'react/self-closing-comp': 'warn',
      'react/react-in-jsx-scope': 'off', // not needed with the modern JSX transform

      // TypeScript: keep types honest
      'typescript/no-explicit-any': 'error',
      'typescript/no-non-null-assertion': 'warn',
      'typescript/consistent-type-imports': 'error',
      'typescript/no-floating-promises': 'error',
      'typescript/no-misused-promises': 'error',
      'typescript/await-thenable': 'error',
      'typescript/switch-exhaustiveness-check': 'error',
      'typescript/no-unnecessary-condition': 'warn',
      'typescript/prefer-nullish-coalescing': 'warn',
      'typescript/restrict-template-expressions': 'warn',

      // General JavaScript
      eqeqeq: 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-param-reassign': 'error',
      'no-nested-ternary': 'warn',
      'import/no-cycle': 'error',
      'import/no-duplicates': 'error',
      'import/no-unassigned-import': 'off', // CSS imports are side-effect only

      'vite-plus/prefer-vite-plus-imports': 'error',
    },
    options: {
      typeAware: true,
      typeCheck: true,
    },
    jsPlugins: [
      {
        name: 'vite-plus',
        specifier: 'vite-plus/oxlint-plugin',
      },
    ],
  },
  plugins: lazyPlugins(() => [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    VitePWA({
      registerType: 'autoUpdate', // new versions install silently
      devOptions: { enabled: true }, // test install + offline in dev
      manifest: {
        name: 'Learn Italian',
        short_name: 'Italian',
        description: 'Learn the Italian grammar other apps skip, in short and fun lessons.',
        start_url: '/',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Cache the whole app so lessons work offline
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
      },
    }),
  ]),
})
