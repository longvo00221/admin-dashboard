/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "res.cloudinary.com",
            "/"
        ]
    },
    output: {
        // options related to "next export" go here
    },
    // other Next.js config options go here
}

module.exports = nextConfig;
