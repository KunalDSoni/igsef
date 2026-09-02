import { defineConfig } from 'astro/config';

export default defineConfig({
  // Served as a GitHub Pages project site until a custom domain is set up.
  site: 'https://kunaldsoni.github.io',
  base: '/igsef',
  vite: {
    server: {
      fs: {
        allow: [
          // Allow serving from the worktree parent directories
          '/Users/kunal/Downloads/igsef1',
        ],
      },
    },
  },
});
