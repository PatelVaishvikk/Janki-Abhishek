/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 768, 1024, 1280, 1920],
  },
};

export default nextConfig;
