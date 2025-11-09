import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.mdx?$/, // support .md and .mdx
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  experimental: {
    mdxRs: true, // App Router MDX compiler
  },
  async rewrites() {
    // Env-driven bases; fall back to local FastAPI in dev
    const spectorrBase = process.env.SPECTORR_API_BASE || 'http://127.0.0.1:8000';
    const costBase = process.env.COST_API_BASE || 'http://127.0.0.1:8000';

    return [
      // Main Spectorr backend (portfolio/sentiment, portfolio/insights, demo/*, etc.)
      { source: '/api/:path*', destination: `${spectorrBase}/:path*` },

      // Cost optimizer backend (kept separate so you can point it elsewhere)
      { source: '/cost-api/:path*', destination: `${costBase}/:path*` },
    ];
  },
  // Optional: allow external blog images later
  // images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] },
};

export default withMDX(nextConfig);
