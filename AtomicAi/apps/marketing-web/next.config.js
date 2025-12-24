/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@atomic-ai/ui",
    "@atomic-ai/tokens",
    "@atomic-ai/blocks",
    "@atomic-ai/adapters-shadcn",
  ],
};

module.exports = nextConfig;

