import { createMockPdfContent, mockPdfFileName } from './output/pdf-mock'
import { mockReportTokens } from './output/report-tokens'
import { mockArticleTokens } from './output/article-token'
import { mockConclusionTokens } from './output/conclusion'
import { syncCustomTabBar } from '../../utils/tabbar'

const TYPEWRITER_INTERVAL = 48
const TOKENS_PER_TICK = 3

type ReportType = 'report' | 'article' | 'conclusion'

interface ReportTab {
  label: string
  type: ReportType
}

const reportTabs: ReportTab[] = [
  {
    label: '调研报告',
    type: 'report',
  },
  {
    label: '微信公众号文章',
    type: 'article',
  },
  {
    label: '交易员版本结论',
    type: 'conclusion',
  },
]

const reportTokenMap: Record<ReportType, string[]> = {
  report: mockReportTokens,
  article: mockArticleTokens,
  conclusion: mockConclusionTokens,
}

let typewriterTimer: number | undefined

Component({
  data: {
    canDownloadPdf: false,
    hasReport: false,
    isAnalyzing: false,
    isDownloadingPdf: false,
    activeReportType: 'report' as ReportType,
    reportTabs,
    reportHtml: '',
    reportTagStyle: {
      h2: 'margin: 0 0 28rpx; color: #111827; font-size: 38rpx; font-weight: 700; line-height: 1.45;',
      h3: 'margin: 36rpx 0 20rpx; color: #111827; font-size: 32rpx; font-weight: 700; line-height: 1.5;',
      p: 'margin: 20rpx 0; color: #1f2937; font-size: 28rpx; line-height: 1.9;',
      ul: 'margin: 20rpx 0; padding-left: 36rpx;',
      ol: 'margin: 20rpx 0; padding-left: 36rpx;',
      li: 'margin: 16rpx 0; color: #1f2937; font-size: 28rpx; line-height: 1.9;',
      strong: 'font-weight: 700; color: #111827;',
      table: 'min-width: 1040rpx; margin: 28rpx 0; border-collapse: collapse; color: #1f2937; font-size: 26rpx;',
      th: 'padding: 18rpx 20rpx; border-bottom: 1rpx solid #e5e7eb; text-align: left; font-weight: 700; white-space: nowrap;',
      td: 'padding: 18rpx 20rpx; border-bottom: 1rpx solid #eef2f7; white-space: nowrap;',
    },
  },
  lifetimes: {
    detached() {
      this.clearTypewriterTimer()
    },
  },
  pageLifetimes: {
    show() {
      syncCustomTabBar('industry')
    },
  },
  methods: {
    runIndustryAnalysis() {
      this.clearTypewriterTimer()
      this.setData({
        canDownloadPdf: false,
        hasReport: true,
        isAnalyzing: true,
        reportHtml: '',
      })

      const activeTokens = reportTokenMap[this.data.activeReportType]
      let tokenIndex = 0
      let nextHtml = ''

      typewriterTimer = setInterval(() => {
        if (tokenIndex >= activeTokens.length) {
          this.clearTypewriterTimer()
          return
        }

        let tokensWritten = 0

        while (tokensWritten < TOKENS_PER_TICK && tokenIndex < activeTokens.length) {
          nextHtml += activeTokens[tokenIndex]
          tokenIndex += 1
          tokensWritten += 1
        }

        const isComplete = tokenIndex >= activeTokens.length

        if (isComplete) {
          this.clearTypewriterTimer()
          this.setData({
            canDownloadPdf: true,
            isAnalyzing: false,
            reportHtml: nextHtml,
          })
          return
        }

        this.setData({ reportHtml: nextHtml })
      }, TYPEWRITER_INTERVAL)
    },
    switchReportType(event: WechatMiniprogram.TouchEvent) {
      if (this.data.isAnalyzing) {
        return
      }

      const reportType = event.currentTarget.dataset.reportType as string

      if (reportType !== 'report' && reportType !== 'article' && reportType !== 'conclusion') {
        return
      }

      const nextReportType = reportType as ReportType
      const reportHtml = this.data.canDownloadPdf ? reportTokenMap[nextReportType].join('') : this.data.reportHtml

      this.setData({
        activeReportType: nextReportType,
        reportHtml,
      })
    },
    clearTypewriterTimer() {
      if (typewriterTimer === undefined) {
        return
      }

      clearInterval(typewriterTimer)
      typewriterTimer = undefined
    },
    downloadReportPdf() {
      if (this.data.isDownloadingPdf || !this.data.canDownloadPdf) {
        return
      }

      const filePath = `${wx.env.USER_DATA_PATH}/${mockPdfFileName}`

      this.setData({
        isDownloadingPdf: true,
      })
      wx.getFileSystemManager().writeFile({
        filePath,
        data: createMockPdfContent(),
        encoding: 'utf8',
        success: () => {
          wx.openDocument({
            filePath,
            fileType: 'pdf',
            showMenu: true,
            fail: () => {
              wx.showToast({
                title: 'PDF 打开失败',
                icon: 'none',
              })
            },
          })
        },
        fail: () => {
          wx.showToast({
            title: 'PDF 生成失败',
            icon: 'none',
          })
        },
        complete: () => {
          this.setData({
            isDownloadingPdf: false,
          })
        },
      })
    },
  },
})
