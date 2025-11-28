import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Nginx에서 /new로 서빙되므로 basePath를 맞춰준다.
  basePath: "/new",
};

export default nextConfig;
