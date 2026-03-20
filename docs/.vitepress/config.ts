import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'hugo-theme-drift',
  description: 'A modern Hugo theme with 3D floating sidebar, dark/light mode, and dynamic animations.',
  base: '/hugo-theme-drift/',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/hugo-theme-drift/favicon.svg' }],
  ],

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/getting-started' },
      { text: 'GitHub', link: 'https://github.com/konentung/hugo-theme-drift' },
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What is Drift?', link: '/' },
          { text: 'Getting Started', link: '/getting-started' },
        ],
      },
      {
        text: 'Configuration',
        items: [
          { text: 'Site Config', link: '/configuration' },
          { text: 'Color Palette', link: '/color-palette' },
          { text: 'Content Types', link: '/content-types' },
          { text: 'Search', link: '/search' },
        ],
      },
      {
        text: 'Features',
        items: [
          { text: 'i18n', link: '/i18n' },
          { text: 'Table of Contents', link: '/table-of-contents' },
          { text: 'Comments', link: '/comments' },
          { text: 'Share Buttons', link: '/share-buttons' },
          { text: 'Alerts', link: '/alerts' },
          { text: 'Custom CSS/JS', link: '/custom-css-js' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/konentung/hugo-theme-drift' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © Konen Tung',
    },

    search: {
      provider: 'local',
    },
  },
})
