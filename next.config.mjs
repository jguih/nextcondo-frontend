/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  sassOptions: {
    includePaths: ['./src/theme'],
  },
  images: {
    remotePatterns: [
      {protocol: "https", hostname: "**"}
    ]
  }
};

export default nextConfig;
