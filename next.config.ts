import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "media.dodostatic.net",
                port: "",
                pathname: "/image/r:**/**",
                search: "",
            },
        ],
    },
};

export default nextConfig;
