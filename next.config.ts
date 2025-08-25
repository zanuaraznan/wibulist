import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'avatars.githubusercontent.com' },
            { hostname: 'cdn.myanimelist.net' },
            { hostname: 'lh3.googleusercontent.com' },
        ],
    },
};

export default nextConfig;
