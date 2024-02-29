import { url } from 'inspector';
import { hostname } from 'os';
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tailus.io'
            }
        ]
    }
};

export default nextConfig;
