/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        // pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "**",
        // pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
