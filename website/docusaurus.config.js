// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const pkgVer = require('../packages/react-state/package.json');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'React State',
  url: 'https://react-app-state.pages.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'open-tech-world', // Usually your GitHub org/user name.
  projectName: 'react-state', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          sidebarCollapsed: false,
          // Please change this to your repo.
          editUrl:
            'https://github.com/open-tech-world/react-state/tree/main/website/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
        gtag: {
          trackingID: 'G-Q96W3YGXH2',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'React State',
        items: [
          {
            label: 'v' + pkgVer.version,
            position: 'right',
            href: 'https://www.npmjs.com/package/@open-tech-world/react-state',
          },
          {
            href: 'https://github.com/open-tech-world/react-state',
            // label: 'GitHub',
            className: 'header-github-link',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            html: `⚡ by <a href="https://open-tech-world.pages.dev">Open Tech World</a>`,
          },
          {
            html: `📝 with <a href="https://docusaurus.io/">Docusaurus</a>`,
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Contributors of <a href="https://github.com/open-tech-world/react-state">open-tech-world/react-state</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
