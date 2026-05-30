export type TabName = 'industry' | 'profile'

interface CustomTabBarInstance {
  setData?: (data: { active: TabName }) => void
}

interface PageWithCustomTabBar {
  getTabBar?: () => CustomTabBarInstance | undefined
}

export function syncCustomTabBar(active: TabName) {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1] as PageWithCustomTabBar | undefined
  const tabBar = currentPage?.getTabBar?.()

  tabBar?.setData?.({ active })
}
