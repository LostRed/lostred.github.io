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
      },
      {
        text: '规则',
        collapsed: false,
        items: [
          { text: '规则定义 RuleDefinition', link: '/rule/rule-definition' },
          { text: '抽象规则 AbstractRule', link: '/rule/abstract-rule' },
          { text: '声明式规则 DeclarativeRule', link: '/rule/declarative-rule' },
          { text: '编程式规则 ProgrammaticRule', link: '/rule/programmatic-rule' },
          { text: '简单规则 SimpleRule', link: '/rule/simple-rule' }
        ]
      },
      {
        text: '规则引擎',
        collapsed: false,
        items: [
          { text: '不可终止规则引擎 NoTerminableRulesEngine', link: '/rulesengine/no-terminable-rules-engine' },
          { text: '可终止规则引擎 TerminableRulesEngine', link: '/rulesengine/terminable-rules-engine' }
        ]
      },
      {
        text: '规则工厂',
        collapsed: false,
        items: [
          { text: '规则工厂 RuleFactory', link: '/rulefactory/rule-factory' },
          { text: '使用spEL动态创建规则', link: '/rulefactory/create-rule' },
        ]
      },
      {
        text: 'SpEL',
        collapsed: false,
        items: [
          { text: 'SpEL简介', link: '/spel/sp-el-intro' },
          { text: 'SpEL基础语法', link: '/spel/sp-el-base-grammar' },
          { text: 'SpEL类型相关语法', link: '/spel/sp-el-base-grammar' },
          { text: 'SpEL集合相关语法', link: '/spel/sp-el-base-grammar' },
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
