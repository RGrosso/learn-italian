import { defineConfig, minimal2023Preset } from '@vite-pwa/assets-generator/config'

// Pad maskable and Apple icons with the logo's green so they read as one tile
const background = '#00803d'

export default defineConfig({
  headLinkOptions: { preset: '2023' },
  preset: {
    ...minimal2023Preset,
    maskable: { ...minimal2023Preset.maskable, resizeOptions: { background } },
    apple: { ...minimal2023Preset.apple, resizeOptions: { background } },
  },
  images: ['public/logo.svg'],
})
