const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Component({
  data: {
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '访客用户',
    },
    hasUserInfo: false,
  },
  lifetimes: {
    attached() {
      this.refreshUserInfo()
    },
  },
  pageLifetimes: {
    show() {
      this.refreshUserInfo()
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
  },
})
