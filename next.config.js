/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  // تحسين الأداء
  swcMinify: true,
  compress: true,
  // دعم الـ RTL للغة العربية
  i18n: {
    locales: ['ar', 'en'],
    defaultLocale: 'ar',
  },
}

module.exports = nextConfig
