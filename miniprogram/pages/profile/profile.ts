const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Component({
  data: {
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '未登录',
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
      const userInfo = getApp<IAppOption>().globalData.userInfo

      if (!userInfo) {
        this.setData({
          userInfo: {
            avatarUrl: defaultAvatarUrl,
            nickName: '未登录',
          },
          hasUserInfo: false,
        })
        return
      }

      this.setData({
        userInfo,
        hasUserInfo: true,
      })
    },
    goToLogin() {
      wx.reLaunch({
        url: '/pages/index/index',
      })
    },
  },
})
