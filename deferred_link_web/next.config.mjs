/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/deferred-link/:path*', // Match all paths starting with /a/
        destination: '/deferred-link', // Redirect to /a
      },
    ];
  },
};

export default nextConfig;
