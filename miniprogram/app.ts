// app.ts
App<IAppOption>({
  globalData: {},
  onLaunch() {
    const userInfo = wx.getStorageSync<AppUserInfo | ''>('userInfo')

    if (userInfo && userInfo.avatarUrl && userInfo.nickName) {
      this.globalData.userInfo = userInfo
    }

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
})