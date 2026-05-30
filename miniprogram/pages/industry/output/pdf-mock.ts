export const mockPdfFileName = 'industry-analysis-mock.pdf'

const mockPdfLines = [
  'AI产业投资转折点摘要',
  '生成日期：2026-05-30',
  '',
  '买方摘要',
  'AI产业正在从训练资本开支周期，转向推理部署和AI Agent规模化落地周期。',
  '核心瓶颈已从GPU供给，扩散到存储带宽、Agent网络、端侧推理和物理世界基础设施。',
  '未来3到12个月，最值得跟踪的是真实订单、资本开支、价格、交期和毛利率变化。',
  '',
  'Top机会',
  '1. 企业级AI存储（SSD）- 评分91/100',
  '   长上下文和长期记忆使企业级SSD成为AI Agent的核心基础设施。',
  '   直接受益方向包括江波龙、佰维存储、美光，以及NAND主控、封测等环节。',
  '2. AI网络升级（交换机、PCB、CCL）- 评分87/100',
  '   Agent微服务负载提升低延迟、高带宽网络需求，网络预算占比有望上行。',
  '   受益方向包括Arista、锐捷网络、沪电股份、深南电路、生益科技等。',
  '3. 端侧AI推理芯片（NPU）- 评分87/100',
  '   云端推理成本下降并不会消灭端侧需求，反而扩大手机、PC、汽车和机器人本地AI场景。',
  '   受益方向包括高通、联发科、芯原股份、全志科技、瑞芯微等。',
  '',
  '观察名单',
  '- 具身智能和机器人关节模组：逻辑强，但大规模订单证据仍有限。',
  '- AI安全：Agent时代需求刚性，但产品形态和付费模式仍在演化。',
  '- AI数据：合成数据正在改变数据标注和数据服务价值链。',
  '',
  '潜在受损方向',
  '- 传统机械硬盘厂商可能在AI存储场景中被QLC SSD侵蚀企业级负载。',
  '- 缺乏企业级和端侧AI敞口的低端消费DRAM、SSD模组厂商可能承压。',
  '',
  '交易员视角',
  '最值得研究的方向：AI存储和AI网络。',
  '可能被低估的A股标的：江波龙、佰维存储、沪电股份。',
  '最拥挤且需要小心的方向：纯800G光模块交易和高波动GPU敞口。',
  '当前较优结构：做多A股存储+PCB组合，并观察企业级存储相对传统HDD的配对交易。',
  '',
  '证伪条件',
  '如果主要云厂商连续两个季度AI相关收入增速停滞或下滑，',
  '或者AI Agent商业化无法支撑下一轮基础设施投资，则推理驱动重估逻辑需要下修。',
]

function escapePdfText(text: string) {
  return text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
}

export function createMockPdfContent() {
  const streamLines = [
    'BT',
    '/F1 18 Tf',
    '72 720 Td',
    `(${escapePdfText(mockPdfLines[0])}) Tj`,
    '/F1 11 Tf',
    '16 TL',
    ...mockPdfLines.slice(1).map((line) => `T* (${escapePdfText(line)}) Tj`),
    'ET',
  ]
  const stream = streamLines.join('\n')
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  ]
  let pdf = '%PDF-1.4\n'
  const offsets = [0]

  objects.forEach((object, index) => {
    offsets.push(pdf.length)
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`
  })

  const xrefOffset = pdf.length
  pdf += `xref\n0 ${objects.length + 1}\n`
  pdf += '0000000000 65535 f \n'
  pdf += offsets
    .slice(1)
    .map((offset) => `${String(offset).padStart(10, '0')} 00000 n \n`)
    .join('')
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n`
  pdf += `startxref\n${xrefOffset}\n%%EOF`

  return pdf
}
