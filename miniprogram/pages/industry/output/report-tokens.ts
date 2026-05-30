/** 打字机 mock：HTML 标签整段输出，文本逐字输出 */
const mockReportHtmlParts = [
  '<div class="industry-report">',
  '<h2>买方调研报告</h2>',
  '<p><strong>报告日期：</strong>2026-05-30</p>',
  '<p><strong>研究对象：</strong>AI 产业下一阶段投资转折点</p>',
  '<p><strong>研究范围：</strong>A 股、美股、港股、台股、日股、韩股，以及与 AI 产业链高度相关的上市公司。</p>',
  '<h3>一页结论</h3>',
  '<p>当前 AI 产业正经历从“训练军备竞赛”向“推理应用大爆发”的历史性转折。核心瓶颈已从 GPU 算力供给，扩散至推理存储带宽、Agent 互联网络，以及物理世界（端侧与机器人）的感知计算。</p>',
  '<ol>',
  '<li><strong>企业级 AI 存储（特别是 SSD）的系统性重估：</strong>长上下文和长期记忆是 AI Agent 落地的关键，正引发企业级 SSD 的 HDD 替代革命和需求暴增，A 股存储模组和主控芯片龙头是直接受益者。</li>',
  '<li><strong>AI 网络“价值量跃迁”：</strong>Agent 的协同工作需求驱动后端网络从“连接 GPU”转向“连接微服务”，对高带宽、低延迟、高可靠性网络设备的需求带来利润池扩张，交换机芯片和高速 PCB/CCL 环节被低估。</li>',
  '<li><strong>端侧 AI 推理芯片的“边缘霸权”：</strong>AI 推理成本下降 80% 后，端侧模型的实用化催生手机、PC、汽车、机器人专用 NPU 的爆发需求，这是典型的量价齐升市场。</li>',
  '</ol>',
  '<h3>AI 转折点雷达表</h3>',
  '<div style="width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch;">',
  '<table>',
  '<thead><tr><th>机会方向</th><th>需求转折</th><th>证据强度</th><th>利润池</th><th>未定价</th><th>催化剂</th><th>可交易</th><th>风险</th><th>总分</th><th>结论</th></tr></thead>',
  '<tbody>',
  '<tr><td><strong>企业级 AI 存储（SSD）</strong></td><td>20</td><td>14</td><td>14</td><td>18</td><td>9</td><td>9</td><td>7</td><td><strong>91</strong></td><td>重点交易候选</td></tr>',
  '<tr><td><strong>AI 网络设备升级（交换机/PCB/CCL）</strong></td><td>18</td><td>14</td><td>14</td><td>16</td><td>8</td><td>9</td><td>8</td><td><strong>87</strong></td><td>重点交易候选</td></tr>',
  '<tr><td><strong>端侧 AI 推理芯片（NPU）</strong></td><td>19</td><td>13</td><td>15</td><td>15</td><td>8</td><td>9</td><td>8</td><td><strong>87</strong></td><td>重点交易候选</td></tr>',
  '<tr><td>具身智能/机器人关节模组</td><td>17</td><td>10</td><td>12</td><td>17</td><td>9</td><td>7</td><td>6</td><td>78</td><td>观察或小仓位试错</td></tr>',
  '<tr><td>AI 医药研发外包（CRO）</td><td>16</td><td>11</td><td>12</td><td>16</td><td>7</td><td>7</td><td>7</td><td>76</td><td>观察或小仓位试错</td></tr>',
  '</tbody>',
  '</table>',
  '</div>',
  '<h3>Top 3 交易机会深挖</h3>',
  '<h3>机会一：企业级 AI 存储（SSD）——长记忆的基础设施</h3>',
  '<p><strong>本质是什么：</strong>AI Agent 要实现可靠工作，需要存储和处理海量上下文和记忆。这催生了对速度比 HDD 快千倍、容量足够大的企业级 SSD 的刚性需求。</p>',
  '<p><strong>谁付钱：</strong>云厂商和企业客户从 IT 预算中划拨专项开支用于 AI 数据存储，传统数据库加速、AI 训练数据湖实时存取、RAG 向量数据库均在从 HDD 转向 QLC 大容量 SSD。</p>',
  '<p><strong>谁直接受益：</strong>A 股江波龙、佰维存储，以及美股美光科技。间接受益包括 NAND Flash 主控芯片、封测厂等。</p>',
  '<p><strong>利润流向：</strong>模组厂在 NAND 颗粒价格企稳回升周期中，叠加企业级产品占比提升，有望享受库存增值和毛利率扩张。</p>',
  '<p><strong>护城河：</strong>云厂商客户认证、供应链锁定、固件算法和产品可靠性。</p>',
  '<p><strong>市场预期差：</strong>市场仍以消费电子周期股逻辑给 A 股存储模组厂估值，尚未充分认识 AI 推理带来的 eSSD 需求是服务器行业的 HDD 替换逻辑。未定价程度评分 18/20。</p>',
  '<p><strong>催化剂：</strong>云厂商 Q2 财报中对存储支出的指引，NAND 原厂企业级颗粒涨价函，以及 A 股公司中报 eSSD 业务占比超预期。</p>',
  '<h3>机会二：AI 网络设备升级——Agent 的神经网络</h3>',
  '<p><strong>本质是什么：</strong>瓶颈已从 GPU 间通信扩展到跨服务器、跨机架的 Agent 协作通信。复杂任务被拆成数百个微服务在不同 GPU 集群上并行，需要无损、超低延迟的 RoCE v2/IB 网络。</p>',
  '<p><strong>谁付钱：</strong>云厂商 AI 数据中心网络资本开支比例从约 5% 提升至 15%-20%，直接体现在 Arista、白牌交换机和核心部件供应商订单上。</p>',
  '<p><strong>谁直接受益：</strong>高速交换机（Arista、锐捷网络）、高速 PCB/CCL（沪电股份、深南电路、生益科技）。间接受益包括交换芯片（Broadcom、盛科通信）、高速连接器和光模块。</p>',
  '<p><strong>利润流向：</strong>交换机 PCB 和 CCL 是典型卖铲子环节，技术壁垒高，利润率显著高于传统通信设备。</p>',
  '<p><strong>市场预期差：</strong>市场过度关注 GPU 和光模块，对交换机及 PCB 在 AI 推理组网中的价值量提升认识不足。未定价程度评分 16/20。</p>',
  '<p><strong>催化剂：</strong>Broadcom、Marvell 的 AI 网络芯片收入超预期，Arista 2026 年 Q2 指引上修，以及 A 股 PCB 厂商获得海外 AI 大客户新批量订单。</p>',
  '<h3>机会三：端侧 AI 推理芯片（NPU）——成本下降后的边缘霸权</h3>',
  '<p><strong>本质是什么：</strong>云端 API 推理成本下降，使端侧部署模型变得经济可行。端侧推理具备低延迟、隐私保护、离线可用优势，是 AI 手机、AI PC、自动驾驶、机器人落地的核心。</p>',
  '<p><strong>谁付钱：</strong>消费者为 AI 手机和 AI PC 支付溢价，车企为高阶智驾芯片买单。</p>',
  '<p><strong>谁直接受益：</strong>端侧 NPU IP/芯片设计公司，包括高通、联发科，以及 A 股芯原股份、全志科技、瑞芯微。</p>',
  '<p><strong>利润流向：</strong>NPU 是 SoC 中价值增量最大的部分，直接切割部分 CPU/GPU 功能预算，带来结构性 ASP 提升。</p>',
  '<p><strong>市场预期差：</strong>市场担忧云端推理成本下降会消灭端侧需求，但本地化隐私、延迟、离线可用性仍是刚性需求。未定价程度评分 15/20。</p>',
  '<p><strong>催化剂：</strong>Apple Intelligence、高通骁龙 8 Gen5、联发科天玑在 AI PC/手机上的杀手级应用，以及具身智能公司公布端侧模型机器人大批量生产计划。</p>',
  '<h3>做空或受损资产</h3>',
  '<ul>',
  '<li><strong>传统机械硬盘（HDD）：</strong>在 AI 数据存储和推理场景下，HDD 速度劣势被放大，企业级市场正在被 QLC SSD 加速侵蚀。可观察西部数据、希捷等标的的潜在压力，但需注意低估值和股东回报计划。</li>',
  '<li><strong>消费级 DRAM/低端 SSD 模组：</strong>如果业务组合缺乏企业级和端侧 AI 存储，仅依赖传统消费电子市场，可能面临需求被挤占和利润被压缩。</li>',
  '</ul>',
  '<h3>配对交易和跨市场传导</h3>',
  '<ul>',
  '<li><strong>配对交易：</strong>做多江波龙（A 股）vs 做空希捷（STX），表达 AI 驱动企业级 SSD 新势力相对传统 HDD 龙头的结构性变化。</li>',
  '<li><strong>跨市场传导：</strong>做多沪电股份（A 股）/ 做多 ISPG（Nasdaq），表达 AI 网络设备升级周期下高端 PCB 的价值量提升。</li>',
  '</ul>',
  '<h3>观察名单</h3>',
  '<ul>',
  '<li><strong>具身智能关节模组：</strong>绿的谐波、三花智控。逻辑完整，但 10 万台以上订单级别的数据证据尚未出现。</li>',
  '<li><strong>AI 安全：</strong>CrowdStrike、深信服。Agent 时代安全需求刚性，但产品形态和付费模式仍在演化。</li>',
  '<li><strong>AI 数据：</strong>数据标注正从人工转向 AI 合成，行业本身在巨变，需观察新模式下谁的护城河更深。</li>',
  '</ul>',
  '<h3>数据缺口</h3>',
  '<ul>',
  '<li>未找到 A 股端侧 NPU 公司来自 AI 推理的精确营收占比和毛利率数据，大多归入“智能硬件 SoC”。</li>',
  '<li>无法精确量化 AI Agent 微服务网络流量相对于传统云计算的增幅，缺乏来自云厂商的详细网络架构白皮书。</li>',
  '<li>缺少来自特斯拉或 Figure 机器人明确的 2026-2027 年关节模组采购订单可靠证据。</li>',
  '</ul>',
  '</div>',
]

export function tokenizeReportHtml(html: string) {
  const tokens: string[] = []
  let index = 0

  while (index < html.length) {
    if (html[index] === '<') {
      const tagEndIndex = html.indexOf('>', index)

      if (tagEndIndex === -1) {
        tokens.push(...html.slice(index))
        break
      }

      tokens.push(html.slice(index, tagEndIndex + 1))
      index = tagEndIndex + 1
      continue
    }

    tokens.push(html[index])
    index += 1
  }

  return tokens
}

export const mockReportTokens = tokenizeReportHtml(mockReportHtmlParts.join(''))
