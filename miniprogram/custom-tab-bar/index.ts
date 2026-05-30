type TabName = 'industry' | 'profile'

interface TabItem {
  name: TabName
  pagePath: string
}

interface CustomTabBarInstance {
  data?: {
    active: TabName
  }
  setData?: (data: { active: TabName }) => void
}

const tabs: TabItem[] = [
  {
    name: 'industry',
    pagePath: 'pages/industry/industry',
  },
  {
    name: 'profile',
    pagePath: 'pages/profile/profile',
  },
]

function syncActiveTab(componentContext: unknown) {
  const component = componentContext as CustomTabBarInstance
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const currentRoute = currentPage?.route
  const currentTab = tabs.find((item) => item.pagePath === currentRoute)

  if (!currentTab || currentTab.name === component.data?.active || !component.setData) {
    return
  }

  component.setData({
    active: currentTab.name,
  })
}

Component({
  data: {
    active: 'industry' as TabName,
  },
  pageLifetimes: {
    show() {
      syncActiveTab(this)
    },
  },
  lifetimes: {
    attached() {
      syncActiveTab(this)
    },
  },
  methods: {
    syncActiveTab() {
      syncActiveTab(this)
    },
    onChange(event: { detail: TabName }) {
      const targetTab = tabs.find((item) => item.name === event.detail)

      if (!targetTab) {
        return
      }

      wx.switchTab({
        url: `/${targetTab.pagePath}`,
      })
    },
  },
})
