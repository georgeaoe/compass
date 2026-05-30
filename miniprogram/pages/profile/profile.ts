import { syncCustomTabBar } from '../../utils/tabbar'

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

interface RecentAnalysis {
  title: string
  createdAt: string
}

Component({
  data: {
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '访客用户',
    },
    hasUserInfo: false,
    analysisCount: 0,
    favoriteCount: 0,
    recentAnalyses: [] as RecentAnalysis[],
    hasRecentAnalyses: false,
    hasApiKey: false,
  },
  lifetimes: {
    attached() {
      this.refreshUserInfo()
      this.refreshWorkspaceData()
    },
  },
  pageLifetimes: {
    show() {
      syncCustomTabBar('profile')
      this.refreshUserInfo()
      this.refreshWorkspaceData()
    },
  },
  methods: {
    refreshUserInfo() {
      const app = getApp<IAppOption>()
      const storedUserInfo = wx.getStorageSync<AppUserInfo | ''>('userInfo')
      const userInfo = app.globalData.userInfo || storedUserInfo

      if (!userInfo) {
        this.setData({
          userInfo: {
            avatarUrl: defaultAvatarUrl,
            nickName: '访客用户',
          },
          hasUserInfo: false,
        })
        return
      }

      app.globalData.userInfo = userInfo
      this.setData({
        userInfo,
        hasUserInfo: true,
      })
    },
    refreshWorkspaceData() {
      const analysisCount = wx.getStorageSync<number | ''>('analysisCount') || 0
      const favoriteReportsStorage = wx.getStorageSync<unknown[] | ''>('favoriteReports')
      const recentAnalysesStorage = wx.getStorageSync<RecentAnalysis[] | ''>('recentAnalyses')
      const favoriteReports = Array.isArray(favoriteReportsStorage) ? favoriteReportsStorage : []
      const recentAnalyses = Array.isArray(recentAnalysesStorage) ? recentAnalysesStorage : []
      const apiKey = wx.getStorageSync<string | ''>('deepseekApiKey')

      this.setData({
        analysisCount,
        favoriteCount: favoriteReports.length,
        recentAnalyses,
        hasRecentAnalyses: recentAnalyses.length > 0,
        hasApiKey: Boolean(apiKey),
      })
    },
    configureApiKey() {
      wx.showModal({
        title: 'API Key 配置',
        content: '',
        editable: true,
        placeholderText: '请输入 DeepSeek API Key',
        confirmText: '保存',
        success: (res) => {
          if (!res.confirm) {
            return
          }

          const apiKey = res.content.trim()

          if (!apiKey) {
            wx.showToast({
              title: 'API Key 不能为空',
              icon: 'none',
            })
            return
          }

          wx.setStorageSync('deepseekApiKey', apiKey)
          this.setData({
            hasApiKey: true,
          })
          wx.showToast({
            title: '已保存到本地',
            icon: 'none',
          })
        },
      })
    },
    showAbout() {
      wx.showModal({
        title: '关于项目',
        content: '行业分析工作台用于沉淀行业趋势、竞争格局、风险识别和机会建议。',
        showCancel: false,
      })
    },
    onMenuTap(event: WechatMiniprogram.TouchEvent) {
      const { action } = event.currentTarget.dataset

      if (action === 'apiKey') {
        this.configureApiKey()
        return
      }

      if (action === 'about') {
        this.showAbout()
      }
    },
  },
})
