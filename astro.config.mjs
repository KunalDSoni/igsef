import { defineConfig } from 'astro/config';

export default defineConfig({
  // Served as a GitHub Pages project site until a custom domain is set up.
  site: 'https://kunaldsoni.github.io',
  base: '/igsef',
  redirects: {
    '/focus-areas': '/igsef/work',
    '/focus-areas/international-academic-pathway': '/igsef/work/international-academic-pathway',
    '/focus-areas/corporate-and-industry-training': '/igsef/work/corporate-and-industry-training',
    '/focus-areas/ai-and-emerging-tech-education': '/igsef/work/ai-and-emerging-tech-education',
    '/focus-areas/innovation-and-incubation': '/igsef/work/innovation-and-incubation',
    '/focus-areas/industry-academia-integration': '/igsef/work/industry-academia-integration',
    '/focus-areas/strategic-csr-and-social-impact': '/igsef/work/strategic-csr-and-social-impact',
  },
});
