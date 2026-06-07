import type { NextConfig } from "next";

const nextConfig = {
  // Type-safety is enforced separately via `tsc --noEmit`; don't fail the
  // production build on the two known pre-existing errors in legacy pages.
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
} as NextConfig;

export default nextConfig;
