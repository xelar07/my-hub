/** @type {import('next').NextConfig} */
const nextConfig = {
  // Añadimos esta sección de 'images'
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
