const nextConfig = {
  distDir: process.env.PORTFOLIO_BUILD_DIR || ".next",
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: false,
  },
}

export default nextConfig
