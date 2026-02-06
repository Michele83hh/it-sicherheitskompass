import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  serverExternalPackages: ['@react-pdf/renderer'],
};

export default withNextIntl(nextConfig);
