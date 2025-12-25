/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@atomic-ai/ui-antd", "@atomic-ai/tokens"],
  reactStrictMode: true,
};

module.exports = nextConfig;

