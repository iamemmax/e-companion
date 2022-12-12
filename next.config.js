/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,// it should be false by default 
  reactStrictMode:false,
  images: {
    domains: ["res.cloudinary.com"],
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },
  //  pageExtensions: ['Axios.tsx', 'Axios.ts', 'Axios.jsx', 'Axios.js'],
  
}

module.exports = nextConfig