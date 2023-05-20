/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com"]
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/login"
  //     }
  //   ]
  // }
}

module.exports = nextConfig
