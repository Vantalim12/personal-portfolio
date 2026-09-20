/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    useTypeScriptCli: false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/resume.pdf",
        destination: "/Gumora-Resume.pdf",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
