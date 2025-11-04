/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      // Use env var when available; fall back to local FastAPI
      const base = process.env.COST_API_BASE || 'http://127.0.0.1:8000';
      return [
        { source: '/cost-api/:path*', destination: `${base}/:path*` },
      ];
    },
  };
  
  export default nextConfig;
  