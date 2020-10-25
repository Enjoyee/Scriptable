//------------------------------------------------
const env = importModule('Env-lsp.js')
//------------------------------------------------
// 配置区
env.configs.previewSize = "Small" // 预览大小【小：Small，中：Medium，大：Large】
env.configs.changePicBg = false // 是否需要更换背景
env.configs.colorMode = true // 是否是纯色背景
env.configs.bgColor = new Color("ffffff") // 小组件背景色
env.configs.topPadding = 0 // 内容区边距
env.configs.leftPadding = 0 // 内容区边距
env.configs.bottomPadding = 0 // 内容区边距
env.configs.rightPadding = 0 // 内容区边距
//
const imgStyle = env.imgStyle
const textStyle = env.textStyle
//------------------------------------------------
// 脚本名字
const name = Script.name()
//------------------------------------------------


//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓内容区↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//------------------------------------------------

// 获取外部输入的参数，格式：【文字+逗号分隔】
let widgetInputRAW = args.widgetParameter
const defaultInput = "恭 喜，发 财"
try {
  widgetInputRAW.toString()
} catch(e) {
  // 默认值微博热搜
  widgetInputRAW = defaultInput
}
let inputStr = widgetInputRAW.toString()
if (inputStr.trim() == "") {
  inputStr = defaultInput
}
// 获取外部输入
const inputArr = inputStr.replace(/\，/g,",").split(",")

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
// 文字颜色
const fontColorStr = "333333"
// 文字默认大小
const fonSize = 50
/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/

// 创建小组件
const widget = await createWidget(inputArr)


//=========================================================
// 创建组件
async function createWidget(data) {
  let w = new ListWidget() 
  /*
   *************************************************************
   */
  // 文字颜色
  const fontColor = new Color(fontColorStr)
  const shadowColor= new Color(fontColorStr, 0.8)
  // 计算文字最终大小
  const realFontSize = getRealFontSize(data)

  /*
   *************************************************************
   */
  w.addSpacer()
  let lineSpacing = 4
  for (let index in data) {
    let titleStack = w.addStack()
    titleStack.addSpacer()
    let title = titleStack.addText(data[index] + "")
    title.font = Font.lightMonospacedSystemFont(realFontSize)
    title.textColor = fontColor 
    title.shadowColor = shadowColor
    title.shadowOffset = new Point(1,1)
    title.shadowRadius = 1 // 阴影半径
    title.centerAlignText()
    if(index == data.length - 1) {
      lineSpacing = 0
    }
    w.addSpacer(lineSpacing)
    titleStack.addSpacer()
  }
  w.addSpacer()

  w.useDefaultPadding()
  return w
}
//=========================================================
// 获取最终的文字大小
function getRealFontSize(data) {
  var totalStr = ""
  var maxStrLength = 0
  for (let index in data) {
    let str = data[index]
    const length = str.length
    if (length > maxStrLength) {
      maxStrLength = length
    }
    totalStr = totalStr + str
  }
  log("最大行的文字长度：" + maxStrLength)

  const rowLength = 132
  const columnLength = 100
  // 一行可以显示多少个字
  const rowFontCount = Math.floor(rowLength / fonSize)
  // 总共要显示多少列
  const columnFontCount = data.length
  log("总共要显示多少列：" + columnFontCount)
  let columnFontSize = fonSize
  let gap = columnLength - columnFontCount * columnFontSize
  while(gap < 0) {
    columnFontSize = columnFontSize - 1
    gap = columnLength - columnFontCount * columnFontSize
  }
  log("列方向所需的文字大小：" + columnFontSize)

  // 最大行的文字所需长度
  let rowFontSize = fonSize
  gap = rowLength - maxStrLength * rowFontSize
  while(gap < 0) {
    rowFontSize = rowFontSize - 1
    gap = rowLength - maxStrLength * rowFontSize
  }
  log("行方向所需的文字大小：" + rowFontSize)
  const realFontSize = Math.min(rowFontSize, columnFontSize)

  return realFontSize
}

//------------------------------------------------
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑内容区↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

//------------------------------------------------
// 运行脚本、预览
await env.run(name, widget)
//------------------------------------------------