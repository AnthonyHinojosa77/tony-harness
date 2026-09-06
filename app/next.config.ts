import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // PGlite ships WebAssembly and must load from node_modules, not the bundle.
  serverExternalPackages: ["@electric-sql/pglite"],
  // The SQL migration files are read at startup, so ship them with every function.
  outputFileTracingIncludes: { "/**": ["./drizzle/**"] },
};

export default nextConfig;
