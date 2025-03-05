/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: true,
  },
  // Configurar las rutas que deben ser renderizadas en el servidor
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://backend:8000/api/:path*',
      },
    ]
  },
  // Configuraciones básicas
  reactStrictMode: true,
  swcMinify: true,
  // Configurar el modo de renderizado
  poweredByHeader: false,
  // Configurar el modo de renderizado
  images: {
    unoptimized: true,
  },
  // Configuraciones de TypeScript y ESLint
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configuración de webpack
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },
  // Configurar el modo de renderizado
  distDir: '.next',
  // Configurar el modo de renderizado
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: process.env.MY_SECRET,
  },
  // Configurar el modo de renderizado
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
  },
}

module.exports = nextConfig 