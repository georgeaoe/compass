import { tokenizeReportHtml } from './report-tokens'

const conclusionHtmlParts = [
  '<div class="industry-report">',
  '<h2>交易员版本结论</h2>',
  '<ol>',
  '<li><strong>现在最值得研究的方向：</strong>AI 存储和网络。推理落地阶段，这是最清晰且被低估的需求接力方向。</li>',
  '<li><strong>现在最可能被低估的标的：</strong>A 股江波龙、佰维存储和沪电股份。它们处于 AI 驱动的产品结构质变期，但市场仍给予周期或传统估值折价。</li>',
  '<li><strong>现在最拥挤、最需要小心的标的：</strong>部分纯粹 800G 光模块公司，以及短期波动很大的 GPU 双雄。</li>',
  '<li><strong>未来 30 天需要盯的催化剂：</strong>台积电、三星、海力士关于先进封装和 HBM 产能的最新指引；苹果开发者大会端侧 AI 功能；国内 AI 服务器和存储模组厂商月度数据。</li>',
  '<li><strong>未来 90 天需要盯的数据：</strong>A 股 PCB/存储/网络设备公司 Q2 业绩预告，美股 CoreWeave、Vertiv、Arista 等基础设施公司 Q2 订单积压。</li>',
  '<li><strong>当前最优交易结构：</strong>核心表达是做多 A 股存储 + PCB 组合；卫星策略是在美股利用期权表达做多企业级存储、做空传统硬盘的配对头寸；跨市场对冲可观察端侧 NPU 设计公司相对纯手机组装厂的价值迁移。</li>',
  '<li><strong>我会在什么情况下承认判断错了：</strong>如果连续两个季度全球主要云厂商 AI 相关收入增速停滞或下滑，证明 AI Agent 商业化失败，无法驱动下一轮基础设施投资回报，则“推理驱动重估”的根基不成立。</li>',
  '</ol>',
  '</div>',
]

export const mockConclusionTokens = tokenizeReportHtml(conclusionHtmlParts.join(''))
