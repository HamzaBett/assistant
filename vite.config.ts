import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        sidepanel: 'sidepanel.html',
        background: 'src/background.ts',
        content: 'src/content-script.ts',
        index: 'index.html',
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'manifest.json' || assetInfo.name?.endsWith('.html')) {
            return '[name].[ext]';
          }
          return 'assets/[name].[hash].[ext]';
        },
        entryFileNames: '[name].js', // Output compiled scripts directly to dist
        chunkFileNames: 'assets/[name].[hash].js',
      },
    },
  },
});
