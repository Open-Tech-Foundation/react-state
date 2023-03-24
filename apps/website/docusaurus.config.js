// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'React State',
  url: 'https://react-app-state.pages.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'open-tech-foundation', // Usually your GitHub org/user name.
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
            'https://github.com/open-tech-foundation/react-state/tree/main/website/',
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
            href: 'https://github.com/open-tech-foundation/react-state',
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
            html: `
            <div>
              Powered by
              <a href="https://open-tech-foundation.pages.dev/" target="_blank" rel="noreferrer noopener" aria-label="Built with docusaurus">
                <img style="vertical-align:middle" src="https://open-tech-foundation.pages.dev/img/logo.png" alt="Deploys by Cloudflare Pages" width="32" height="32" />
              </a>
              <span>.</span>
              Built with 
              <a href="https://docusaurus.io/" target="_blank" rel="noreferrer noopener" aria-label="Built with docusaurus">
              <img style="vertical-align:middle" src="https://d33wubrfki0l68.cloudfront.net/c088b7acfcf11100903c44fe44f2f2d7e0f30531/47727/img/docusaurus.svg" alt="Deploys by Cloudflare Pages" width="32" height="32" />
              </a>
              <span>.</span>
              Deploys by 
              <a href="https://pages.cloudflare.com/" target="_blank" rel="noreferrer noopener" aria-label="Deploys by Cloudflare Pages">
                <img style="vertical-align:middle" src="https://pages.cloudflare.com/resources/logo/logo.svg" alt="Deploys by Cloudflare Pages" width="32" height="32" />
              </a>
            </div>`,
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} <a href="https://github.com/open-tech-foundation">OPEN TECH FOUNDATION</a>.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
