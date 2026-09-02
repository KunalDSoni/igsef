import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://igsef.org',
  base: '',
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
  redirects: {
    '/focus-areas': '/work',
    '/focus-areas/international-academic-pathway': '/work/international-academic-pathway',
    '/focus-areas/corporate-and-industry-training': '/work/corporate-and-industry-training',
    '/focus-areas/ai-and-emerging-tech-education': '/work/ai-and-emerging-tech-education',
    '/focus-areas/innovation-and-incubation': '/work/innovation-and-incubation',
    '/focus-areas/industry-academia-integration': '/work/industry-academia-integration',
    '/focus-areas/strategic-csr-and-social-impact': '/work/strategic-csr-and-social-impact',
  },
});
