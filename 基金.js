//------------------------------------------------
const env = importModule('Env-lsp.js')
//------------------------------------------------
// 配置区
env.configs.previewSize = "Medium" // 预览大小【小：Small，中：Medium，大：Large】
env.configs.changePicBg = true // 是否需要更换背景
env.configs.colorMode = false // 是否是纯色背景
env.configs.bgColor = new Color("000000") // 小组件背景色
env.configs.topPadding = 0 // 内容区边距
env.configs.leftPadding = 0 // 内容区边距
env.configs.bottomPadding = 0 // 内容区边距
env.configs.rightPadding = 0 // 内容区边距
env.configs.refreshInterval = 1 // 刷新间隔，单位分钟，非精准，会有3-5分钟差距
//
const imgStyle = env.imgStyle
const textStyle = env.textStyle
//------------------------------------------------
// 脚本名字
const name = Script.name()
//------------------------------------------------


//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓内容区↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//------------------------------------------------

// 获取外部输入的参数
var widgetInputRAW = args.widgetParameter
const defaultFund = "001838,002190,161725,160643,000336,161726,519019"
try {
  widgetInputRAW.toString()
} catch(e) {
  // 默认值招商白酒
  widgetInputRAW = defaultFund
}
// 初始化基金ID
var inputStr = widgetInputRAW.toString()
if (inputStr.length == 0) {
  inputStr = defaultFund
}
var fid = inputStr.replace(/\，/g,",").split(",")
// 获取基金数据
const fundJSON = await getFund()
// 创建小组件
const widget = createWidget(fundJSON)


//======================================================
// 基金数据获取
async function getFund() {
  // 拼接基金id
  var fidFull = ''
  for (let index in fid) {
    fidFull = fidFull + fid[index] + ","
  }
  fidFull = fidFull.substring(0, fidFull.lastIndexOf(','))

  // 请求基金数据
  const url = `https://api.doctorxiong.club/v1/fund?code=${fidFull}`
  const res = await env.getJson(url)

  return res
}

//======================================================
// 创建 widget
function createWidget(fundJson) {
  let listWidget = new ListWidget() 

  const data = fundJson.data
  for (let index in data) {
    // 添加行距
    listWidget.addSpacer(4)
    // 统一字体大小
    const fontSize = 11

    //创建水平方向stack
    let hStack0 = listWidget.addStack()
    hStack0.layoutHorizontally()
    hStack0.addSpacer(0) // Left spacing, 向左对齐间距

    // 颜色值
    const expectGrowth = data[index].expectGrowth // 当前基金单位净值估算日涨幅
    var color = new Color('dc0000')
    if (expectGrowth <= 0) {
      color = new Color('1ba784')
    }

    // 基金名称
    let title = hStack0.addText('>› ' + data[index].name)
    title.font = new Font('Menlo', fontSize) //font and size,字体与大小
    title.textColor = color //font color,字体颜色
    title.textOpacity = (1) //opacity,不透明度
    title.leftAlignText() //Align,对齐方式(center,left,right)！在同一个stack内的对齐方式不能单独设置，只能调整向左对齐间距大小 
    
    // 净值估算更新日期 
    let expectWorthDateStr = data[index].expectWorthDate
    let expectWorthDateText = data[index].netWorthDate

    // 当前基金单位净值估算日涨幅,单位为百分比 
    let expectGrowthStr = expectGrowth
    if (expectWorthDateStr.search(expectWorthDateText) != -1) {
        expectGrowthStr = data[index].dayGrowth
    }
    if (typeof(expectWorthDateStr) != "undefined") {
        expectWorthDateText = expectWorthDateStr.substring(5)
    }

    let expectWorth = hStack0.addText(' ‹' + expectGrowthStr + '› ')
    expectWorth.font = Font.boldSystemFont(12) //font and size,字体与大小
    expectWorth.textColor = color //font color,字体颜色
    expectWorth.textOpacity = (1) //opacity,不透明度
    expectWorth.leftAlignText() //Align,对齐方式(center,left,right)！在同一个stack内的对齐方式不能单独设置，只能调整向左对齐间距大小 

    // 净值估算更新日期添加
    let expectWorthDate = hStack0.addText(expectWorthDateText + '')
    expectWorthDate.font = new Font('Menlo', fontSize) //font and size,字体与大小
    expectWorthDate.textColor = color //font color,字体颜色
    expectWorthDate.textOpacity = (1) //opacity,不透明度
    expectWorthDate.leftAlignText() //Align,对齐方式(center,left,right)！在同一个stack内的对齐方式不能单独设置，只能调整向左对齐间距大小 
  }

  return listWidget
}

//------------------------------------------------
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑内容区↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

//------------------------------------------------
// 运行脚本、预览
await env.run(name, widget)
//------------------------------------------------