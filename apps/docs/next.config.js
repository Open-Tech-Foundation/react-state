const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {};

const prodNextConfig = {
  ...nextConfig,
  output: 'export',
  images: {
    unoptimized: true,
  },
  distDir: 'build',
};

// module.exports = withNextra({ ...nextConfig() });

// If you have other Next.js configurations, you can pass them as the parameter:
// module.exports = withNextra({ /* other next.js config */ })

// @ts-check

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return withNextra({ ...nextConfig });
  }

  return withNextra({ ...prodNextConfig });
};
