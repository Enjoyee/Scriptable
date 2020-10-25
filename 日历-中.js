//------------------------------------------------
const env = importModule('Env-lsp.js')
//------------------------------------------------
// 配置区
env.configs.previewSize = "Medium" // 预览大小【小：Small，中：Medium，大：Large】
env.configs.changePicBg = false // 是否需要更换背景
env.configs.colorMode = true // 是否是纯色背景
env.configs.bgColor = new Color("ffffff") // 小组件背景色
env.configs.topPadding = 0 // 内容区边距
env.configs.leftPadding = 0 // 内容区边距
env.configs.bottomPadding = 0 // 内容区边距
env.configs.rightPadding = 0 // 内容区边距
env.configs.refreshInterval = 0 // 刷新间隔，单位分钟，非精准，会有3-5分钟差距
//
const imgStyle = env.imgStyle
const textStyle = env.textStyle
//------------------------------------------------
// 脚本名字
const name = Script.name()
//------------------------------------------------


//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓内容区↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//------------------------------------------------

// 周标题
const weekTitle = ['🙄 周日', '😪 周一', '😩 周二', '🤨 周三', '🤓 周四', '🤩 周五', '🥳 周六']

// 日期文字大小
const dayFont = Font.ultraLightMonospacedSystemFont(12)
// 日期文字颜色
const dayColor = new Color('#000')
// 今天日期文字颜色
const currDayColor = new Color('#ff0000')
// 非本月日期文字颜色
const nonDayColor = new Color('#000', 0)

// 日期
const thisDate = new Date()
// 年份
const year = thisDate.getFullYear()
// 月份
const month = thisDate.getMonth() + 1
// 日期
const currDay = thisDate.getDate()
// 格式化日期
const yearMonthText = year + "-" + numFormatStr(month)

// 上一个月的年份
let preMonthYear
// 上个月份
let preMonth
if (month == 1) {
  preMonthYear = year - 1
  preMonth = 12
} else {
  preMonthYear = year
  preMonth = month - 1
}
// 上个月有多少天
const preMonthDays = getDays(preMonthYear, preMonth)
// 当前月份有多少天
const currMonthDays = getDays(year, month)
// 当前月份1号是星期几
const currMonthFirstDay = getFirstDayWeek(year, month)
// 开始日期数字
const startNum = preMonthDays - currMonthFirstDay + 1
// 日历总数字
var totalDays = currMonthDays + preMonthDays
// 总日期数字
var totalNumArr = []
for (var index = startNum; index <= totalDays; index++) {
  totalNumArr.push(index)
}


//////////////////////////////////////////////////////////
// 创建列表
let widget = new ListWidget() 
 // 内容排版
let contentStack = widget.addStack()
contentStack.layoutHorizontally()
contentStack.addSpacer()

// 左侧内容
let leftStack = contentStack.addStack()
leftStack.layoutVertically()
leftStack.addSpacer()
// 日期
let monthText = leftStack.addText(numFormatStr(month) + "月" + currDay + "日")
monthText.font = Font.systemFont(18)
monthText.textColor = new Color('#000')
monthText.leftAlignText()
// 星期几
leftStack.addSpacer(8)
let currWeekDayText = leftStack.addText(getCurrDayWeekTitle() + " ☞☞")
currWeekDayText.font = Font.systemFont(14)
currWeekDayText.textColor = new Color('#ff0000')
currWeekDayText.leftAlignText()
// 农历信息
leftStack.addSpacer(8)
let lunarInfo = await getLunar()
let infoLunarText = lunarInfo.data.lunar
let infoSolarText = lunarInfo.data.solar
infoLunarText = infoLunarText.substring(12, infoLunarText.length)
let constellationText = lunarInfo.data.constellation
let lunarText = leftStack.addText(infoLunarText)
lunarText.font = Font.systemFont(18)
lunarText.textColor = new Color('#000')
lunarText.leftAlignText()

// 间隔
leftStack.addSpacer()
contentStack.addSpacer()

// 日期填充
let dayColumnArr1 = []
let dayColumnArr2 = []
let dayColumnArr3 = []
let dayColumnArr4 = []
let dayColumnArr5 = []
let dayColumnArr6 = []
let dayColumnArr7 = []

// 日期行数
var rowSize = Math.round(totalDays / 7)
for (var index = 0; index < totalDays; index=index+7) {
  var size = index
  dayColumnArr1.push(totalNumArr[size])
  
  var size1 = size + 1
  if (size1 < totalDays) {
    dayColumnArr2.push(totalNumArr[size1])
  }

  var size2 = size + 2
  if (size2 < totalDays) {
    dayColumnArr3.push(totalNumArr[size2])
  }

  var size3 = size + 3
  if (size3 < totalDays) {
    dayColumnArr4.push(totalNumArr[size3])
  }

  var size4 = size + 4
  if (size4 < totalDays) {
    dayColumnArr5.push(totalNumArr[size4])
  }

  var size5 = size + 5
  if (size5 < totalDays) {
    dayColumnArr6.push(totalNumArr[size5])
  }

  var size6 = size + 6
  if (size6 < totalDays) {
    dayColumnArr7.push(totalNumArr[size6])
  }
}

// 行间距
const columnSpacer = 10
// 列间距
const rowSpacer = 8
// 周日标题
let weekColumn1 = contentStack.addStack()
weekColumn1.layoutVertically()
weekColumn1.addSpacer()
// 第一列日期
for (var index = 0; index < dayColumnArr1.length; index++) {
  let day = dayColumnArr1[index]
  let color = dayColor
  if (day > preMonthDays) {
    day = day - preMonthDays
  } else {
    color = nonDayColor
  }
  createDayColumn(weekColumn1, day, dayFont, color, columnSpacer)
}
weekColumn1.addSpacer()
contentStack.addSpacer(rowSpacer)

// 周一标题
let weekColumn2 = contentStack.addStack()
weekColumn2.layoutVertically()
weekColumn2.addSpacer()
// 第二列日期
for (var index = 0; index < dayColumnArr2.length; index++) {
  let day = dayColumnArr2[index]
  let color = dayColor
  if (day > preMonthDays) {
    day = day - preMonthDays
  } else {
    color = nonDayColor
  }
  createDayColumn(weekColumn2, day, dayFont, color, columnSpacer)
}
weekColumn2.addSpacer()
contentStack.addSpacer(rowSpacer)

// 周二标题
let weekColumn3 = contentStack.addStack()
weekColumn3.layoutVertically()
weekColumn3.addSpacer()
// 第三列日期
for (var index = 0; index < dayColumnArr3.length; index++) {
  let day = dayColumnArr3[index]
  let color = dayColor
  if (day > preMonthDays) {
    day = day - preMonthDays
  } else {
    color = nonDayColor
  }
  createDayColumn(weekColumn3, day, dayFont, color, columnSpacer)
}
weekColumn3.addSpacer()
contentStack.addSpacer(rowSpacer)

// 周三标题
let weekColumn4 = contentStack.addStack()
weekColumn4.layoutVertically()
weekColumn4.addSpacer()
// 第四列日期
for (var index = 0; index < dayColumnArr4.length; index++) {
  let day = dayColumnArr4[index]
  let color = dayColor
  if (day > preMonthDays) {
    day = day - preMonthDays
  } else {
    color = nonDayColor
  }
  createDayColumn(weekColumn4, day, dayFont, color, columnSpacer)
}
weekColumn4.addSpacer()
contentStack.addSpacer(rowSpacer)

// 周四标题
let weekColumn5 = contentStack.addStack()
weekColumn5.layoutVertically()
weekColumn5.addSpacer()
// 第五列日期
for (var index = 0; index < dayColumnArr5.length; index++) {
  let day = dayColumnArr5[index]
  let color = dayColor
  if (day > preMonthDays) {
    day = day - preMonthDays
  } else {
    color = nonDayColor
  }
  createDayColumn(weekColumn5, day, dayFont, color, columnSpacer)
}
weekColumn5.addSpacer()
contentStack.addSpacer(rowSpacer)

// 周五标题
let weekColumn6 = contentStack.addStack()
weekColumn6.layoutVertically()
weekColumn6.addSpacer()
// 第六列日期
for (var index = 0; index < dayColumnArr6.length; index++) {
  let day = dayColumnArr6[index]
  let color = dayColor
  if (day > preMonthDays) {
    day = day - preMonthDays
  } else {
    color = nonDayColor
  }
  createDayColumn(weekColumn6, day, dayFont, color, columnSpacer)
}
weekColumn6.addSpacer()
contentStack.addSpacer(rowSpacer)

// 周六标题
let weekColumn7 = contentStack.addStack()
weekColumn7.layoutVertically()
weekColumn7.addSpacer()
// 第七列日期
for (var index = 0; index < dayColumnArr7.length; index++) {
  let day = dayColumnArr7[index]
  let color = dayColor
  if (day > preMonthDays) {
    day = day - preMonthDays
  } else {
    color = nonDayColor
  }
  createDayColumn(weekColumn7, day, dayFont, color, columnSpacer)
}
weekColumn7.addSpacer()
contentStack.addSpacer()


//================================================
/*
 * 创建行
 ================================================
 */
function createDayColumn(stack, day, font, color, spacer) {
  if (day == undefined) return
  let dayText = stack.addText(day.toString())
  dayText.font = font
  let textColor = color
  if (day == currDay) {
    textColor = currDayColor
  }
  dayText.textColor = textColor
  dayText.shadowColor = textColor
  dayText.shadowOffset = new Point(1,1)
  dayText.shadowRadius = 1 
  dayText.rightAlignText()
  stack.addSpacer(spacer)
}

/*
 * 数字格式化
 ================================================
 */
function numFormatStr(num) {
  if (num > 0 && num < 10) {
    return `0${num}`
  } else {
    return `${num}`
  }
}

/*
 * 获取月份有多少天
 ================================================
 */
 function getDays(year, month) {
  var date = new Date(year, month, 0)
  return date.getDate()
 }

/*
 * 获取指定月份的1号是星期几(0~6)
 ================================================
 */
 function getFirstDayWeek(year, month) {
  var date = new Date(year, month - 1)
  return date.getDay()
 }

/*
 * 获取今天是星期几
 ================================================
 */
 function getCurrDayWeekTitle() {
  var date = new Date()
  return weekTitle[date.getDay()]
 }

/*
 * 在线获取农历信息
 ================================================
 */
async function getLunar() {
  const request = new Request("https://www.iamwawa.cn/home/nongli/ajax")
  const defaultHeaders = {
    "Accept": "*/*",
    "Content-Type": "application/json"
  }

  request.method = 'POST'
  request.headers = defaultHeaders
  
  request.addParameterToMultipart("type", "solar")
  request.addParameterToMultipart("year", year + "")
  request.addParameterToMultipart("month", month + "")
  request.addParameterToMultipart("day", currDay + "")

  const data = await request.loadJSON()
  log(data)

  return data
}



//------------------------------------------------
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑内容区↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

//------------------------------------------------
// 运行脚本、预览
await env.run(name, widget)
//------------------------------------------------