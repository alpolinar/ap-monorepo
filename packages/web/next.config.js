/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "images.unsplash.com",
      port: "",
      pathname: "/**"
    }]
  },
  transpilePackages: ["@ap-monorepo/ui"]
}

module.exports = nextConfig
