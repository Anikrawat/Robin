/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' }
    ],
  },
  env: {
    PRODUCTION: process.env.PRODUCTION,
    NEXT_PUBLIC_PRODUCTION: process.env.PRODUCTION,
  },
};

export default nextConfig;
