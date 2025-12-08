import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import preact from '@preact/preset-vite';
import faviconPlugin from 'vite-plugin-favicon-generator';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    faviconPlugin({
      source: 'public/todo.png',  // ← Your logo (512x512+)
      appName: 'The TODO List',
      // appShortName: 'TODOApp',
      // appDescription: 'A simple PWA for managing your tasks',
      theme_color: '#ffffff',
      // background: '#ffffff',
      icons: {
        android: true,
        appleIcon: true,
        favicons: true,
        appleStartup: false,
        windows: false,
        yandex: false
      }
    }),
    VitePWA({
      registerType: 'autoUpdate',
      // devOptions: {
      //   enabled: true  // PWA in dev mode
      // },
      // Icons auto-injected from favicon plugin
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'The TODO List',
        short_name: 'TODOApp',
        description: 'A simple PWA for managing your tasks',
        theme_color: '#ffffff',
        // icons: [
        //   {
        //     src: 'pwa-192x192.png',
        //     sizes: '192x192',
        //     type: 'image/png'
        //   },
        //   {
        //     src: 'pwa-512x512.png',
        //     sizes: '512x512',
        //     type: 'image/png'
        //   }
        // ]
      }
    })
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
  assetsInclude: ['**/*.woff2'],
});
