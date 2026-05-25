import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/pergolas/m4",
        destination: "/pergolas/c4",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
