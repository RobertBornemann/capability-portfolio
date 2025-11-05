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
    // Use env var when available; fall back to local FastAPI
    const base = process.env.COST_API_BASE || 'http://127.0.0.1:8000';
    return [{ source: '/cost-api/:path*', destination: `${base}/:path*` }];
  },
  // Optional: allow external blog images later
  // images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] },
};

export default withMDX(nextConfig);
