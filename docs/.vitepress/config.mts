import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Ruler',
  description: 'Ruler 使用指南',
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN'
    }
  },
  themeConfig: {
    logo: '/logo.png',
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },
    sidebarMenuLabel: '菜单',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/intro/what-is-ruler' }
    ],
    sidebar: [
      {
        text: '简介',
        collapsed: false,
        items: [
          { text: '什么是Ruler？', link: '/intro/what-is-ruler' }
        ]
      },
      {
        text: '指南',
        collapsed: false,
        items: [
          { text: '快速开始', link: '/guide/getting-started' },
          { text: '规则开发', link: '/guide/rule-developing' },
          { text: '其它开发注解', link: '/guide/other-annotation' }
        ]
      }
    ],
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/LostRed/ruler-project' }
    ],
    footer: {
      message: 'Released under the <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2024-present <a href="https://github.com/LostRed">LostRed</a>'
    },
    lastUpdated: {
      text: '最后更新于'
    },
    outline: {
      level: 'deep',
      label: '页面导航'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    editLink: {
      pattern: 'https://github.com/LostRed/lostred.github.io/edit/master/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },
    base: '/ruler/'
  },
  lastUpdated: true
})
