Component({
  data: {
    capabilities: [
      {
        icon: 'chart-trending-o',
        title: '趋势洞察',
        desc: '识别增长周期与市场变化',
      },
      {
        icon: 'cluster-o',
        title: '竞争格局',
        desc: '拆解核心玩家与差异化机会',
      },
      {
        icon: 'warning-o',
        title: '风险识别',
        desc: '提前发现政策、供需与经营风险',
      },
      {
        icon: 'bulb-o',
        title: '机会建议',
        desc: '输出可落地的行动方向',
      },
    ],
    featureList: [
      {
        icon: 'description-o',
        title: '输入行业背景',
        desc: '补充目标行业、区域和分析目标',
      },
      {
        icon: 'points',
        title: '生成分析框架',
        desc: '围绕趋势、竞争、用户和风险形成结构化提纲',
      },
      {
        icon: 'passed',
        title: '沉淀分析结论',
        desc: '汇总关键发现，作为后续决策依据',
      },
    ],
  },
  methods: {
    runIndustryAnalysis() {
      wx.showToast({
        title: '开始行业分析',
        icon: 'none',
      })
    },
    onFeatureTap(event: WechatMiniprogram.TouchEvent) {
      const { title } = event.currentTarget.dataset

      wx.showToast({
        title,
        icon: 'none',
      })
    },
  },
})
