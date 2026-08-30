import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,

  // تنظیمات تصاویر
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "/**",
      },
      // اضافه کردن دامنه‌های دیگر در صورت نیاز
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
    // تنظیمات اختیاری
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // تنظیمات دیگر (اختیاری)
  // اگر از API خارجی استفاده می‌کنید
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/:path*", // پروکسی به API
      },
    ];
  },
};

export default nextConfig;
