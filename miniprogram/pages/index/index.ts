Component({
  data: {
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    isLoggingIn: false,
  },
  methods: {
    loginWithWechat() {
      if (this.data.isLoggingIn) {
        return
      }

      this.setData({ isLoggingIn: true })
      wx.getUserProfile({
        desc: '用于登录后展示头像和昵称',
        success: (res) => {
          getApp<IAppOption>().globalData.userInfo = res.userInfo
          wx.switchTab({
            url: '/pages/industry/industry',
          })
        },
        fail: () => {
          wx.showToast({
            title: '授权后才能登录',
            icon: 'none',
          })
        },
        complete: () => {
          this.setData({ isLoggingIn: false })
        },
      })
    },
  },
})
