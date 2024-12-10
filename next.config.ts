import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    webpack: (config) => ({
        ...config,
        externals: [
            ...config.externals,
            {
                sharp: 'commonjs sharp'
            }
        ]
    })
};

export default nextConfig;
