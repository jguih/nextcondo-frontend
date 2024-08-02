/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  sassOptions: {
    includePaths: ['./src/theme'],
  },
};

export default nextConfig;
