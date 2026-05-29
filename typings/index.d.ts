/// <reference path="./types/index.d.ts" />

interface AppUserInfo {
  avatarUrl: string
  nickName: string
}

interface IAppOption {
  globalData: {
    userInfo?: AppUserInfo,
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}