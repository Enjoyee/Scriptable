// Variables used by Scriptable.
// This transparent bg was created by Max Zeryck


/********************************************************************/
/****************************定义小组件****************************/
/********************************************************************/
const filename = Script.name() + ".jpg"
const files = FileManager.local()
const path = files.joinPath(files.documentsDirectory(), filename)

//////////////////////////////////////////////////////////
// 背景是否是颜色
const colorMode = false
// 背景颜色
const bgColorStr = "#ffffff"

// 年月标题大小
const yearMonthFont = Font.systemFont(20)
// 年月标题文字颜色
const yearMonthColor = new Color('#9A6D38')

// 周标题大小
const weekFont = Font.lightMonospacedSystemFont(9)
// 周标题文字颜色
const weekColor = new Color('#999')

// 日期文字大小
const dayFont = Font.ultraLightMonospacedSystemFont(9)
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

// 周标题
const weekDays = ['日', '一', '二', '三', '四', '五', '六']
//////////////////////////////////////////////////////////

if (config.runsInWidget || colorMode) {
  // 透明背景设置：widget.backgroundImage = files.readImage(path)

  /****************************小组件内容START****************************/
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

  // 年月标题
  let yearMonthRow = widget.addStack()
  yearMonthRow.addSpacer()
  yearMonthRow.layoutHorizontally()
  // 年月
  let yearText = yearMonthRow.addText(yearMonthText)
  yearText.font = yearMonthFont
  yearText.textColor = yearMonthColor
  yearText.shadowColor = yearMonthColor
  yearText.shadowOffset = new Point(1,1)
  yearText.shadowRadius = 1 
  yearText.leftAlignText()
  yearMonthRow.addSpacer()

  widget.addSpacer(10)

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


  // 内容排版
  let contentStack = widget.addStack()
  contentStack.layoutHorizontally()
  contentStack.addSpacer()

  // 列间距
  const columnSpacer = 2
  // 周日标题
  let weekColumn1 = contentStack.addStack();
  weekColumn1.layoutVertically();
  createDayColumn(weekColumn1, weekDays[0], weekFont, weekColor, columnSpacer)
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
  contentStack.addSpacer()

  // 周一标题
  let weekColumn2 = contentStack.addStack();
  weekColumn2.layoutVertically();
  createDayColumn(weekColumn2, weekDays[1], weekFont, weekColor, columnSpacer)
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
  contentStack.addSpacer()

  // 周二标题
  let weekColumn3 = contentStack.addStack();
  weekColumn3.layoutVertically();
  createDayColumn(weekColumn3, weekDays[2], weekFont, weekColor, columnSpacer)
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
  contentStack.addSpacer()

  // 周三标题
  let weekColumn4 = contentStack.addStack();
  weekColumn4.layoutVertically();
  createDayColumn(weekColumn4, weekDays[3], weekFont, weekColor, columnSpacer)
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
  contentStack.addSpacer()

  // 周四标题
  let weekColumn5 = contentStack.addStack();
  weekColumn5.layoutVertically();
  createDayColumn(weekColumn5, weekDays[4], weekFont, weekColor, columnSpacer)
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
  contentStack.addSpacer()

  // 周五标题
  let weekColumn6 = contentStack.addStack();
  weekColumn6.layoutVertically();
  createDayColumn(weekColumn6, weekDays[5], weekFont, weekColor, columnSpacer)
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
  contentStack.addSpacer()

  // 周六标题
  let weekColumn7 = contentStack.addStack();
  weekColumn7.layoutVertically();
  createDayColumn(weekColumn7, weekDays[6], weekFont, weekColor, columnSpacer)
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
  contentStack.addSpacer()


  //////////////////////////////////////////////////////////
  if (colorMode) {
    widget.backgroundColor = new Color(bgColorStr)
  } else {
    widget.backgroundImage = files.readImage(path)
  }
  widget.setPadding(0, 4, 0, 4)
  Script.setWidget(widget)
  Script.complete()
  // 预览小尺寸
  widget.presentSmall()
  /*****************************小组件内容ENd*****************************/

} else if(!colorMode) {
  // Determine if user has taken the screenshot.
  var message
  message = "图片模式支持相册随意照片&背景透明"
  let options = ["图片选择","透明背景"]
  let isTransparentMode = await generateAlert(message, options)
  if (!isTransparentMode) {
    let img = await Photos.fromLibrary()
    message = "您的小部件背景已准备就绪"
    const resultOptions = ["好的"]
    await generateAlert(message, resultOptions)
    files.writeImage(path, img)
  } else {
    message = "透明模式开始之前，请返回主屏幕并长按进入编辑模式。滑动到最右边的空白页并截图。"
    let exitOptions = ["继续","退出以截图"]
    let shouldExit = await generateAlert(message,exitOptions)
    if (shouldExit) return
    
    // Get screenshot and determine phone size.
    let img = await Photos.fromLibrary()
    let height = img.size.height
    let phone = phoneSizes()[height]
    if (!phone) {
      message = "您似乎选择了非iPhone屏幕截图的图像，或者不支持您的iPhone。请使用其他图像再试一次。"
      await generateAlert(message,["好的"])
      return
    }
    
    // Prompt for widget size and position.
    message = "您想要创建什么尺寸的小部件？"
    let sizes = ["Small","Medium","Large"]
    let size = await generateAlert(message,sizes)
    let widgetSize = sizes[size]
    
    message = "您想它在什么位置？"
    message += (height == 1136 ? " (请注意，您的设备仅支持两行小部件，因此中间和底部选项相同。)" : "")
    
    // Determine image crop based on phone size.
    let crop = { w: "", h: "", x: "", y: "" }
    if (widgetSize == "Small") {
      crop.w = phone.small
      crop.h = phone.small
      let positions = ["Top left","Top right","Middle left","Middle right","Bottom left","Bottom right"]
      let position = await generateAlert(message,positions)
      
      // Convert the two words into two keys for the phone size dictionary.
      let keys = positions[position].toLowerCase().split(' ')
      crop.y = phone[keys[0]]
      crop.x = phone[keys[1]]
      
    } else if (widgetSize == "Medium") {
      crop.w = phone.medium
      crop.h = phone.small
      
      // Medium and large widgets have a fixed x-value.
      crop.x = phone.left
      let positions = ["Top","Middle","Bottom"]
      let position = await generateAlert(message,positions)
      let key = positions[position].toLowerCase()
      crop.y = phone[key]
      
    } else if(widgetSize == "Large") {
      crop.w = phone.medium
      crop.h = phone.large
      crop.x = phone.left
      let positions = ["Top","Bottom"]
      let position = await generateAlert(message,positions)
      
      // Large widgets at the bottom have the "middle" y-value.
      crop.y = position ? phone.middle : phone.top
    }
    
    // Crop image and finalize the widget.
    let imgCrop = cropImage(img, new Rect(crop.x,crop.y,crop.w,crop.h))
    
    message = "您的小部件背景已准备就绪"
    const resultOptions = ["好的"]
    await generateAlert(message, resultOptions)
    files.writeImage(path, imgCrop)
  }
  
  Script.complete()
}

/*
 ************************************************************************************
 */

// Generate an alert with the provided array of options.
async function generateAlert(message,options) {
  
  let alert = new Alert()
  alert.message = message
  
  for (const option of options) {
    alert.addAction(option)
  }
  
  let response = await alert.presentAlert()
  return response
}

// Crop an image into the specified rect.
function cropImage(img,rect) {
   
  let draw = new DrawContext()
  draw.size = new Size(rect.width, rect.height)
  
  draw.drawImageAtPoint(img,new Point(-rect.x, -rect.y))  
  return draw.getImage()
}

// Pixel sizes and positions for widgets on all supported phones.
function phoneSizes() {
  let phones = { 
 "2688": {
   "small":  507,
   "medium": 1080,
   "large":  1137,
   "left":  81,
   "right": 654,
   "top":    228,
   "middle": 858,
   "bottom": 1488
 },
 
 "1792": {
   "small":  338,
   "medium": 720,
   "large":  758,
   "left":  54,
   "right": 436,
   "top":    160,
   "middle": 580,
   "bottom": 1000
 },
 
 "2436": {
   "small":  465,
   "medium": 987,
   "large":  1035,
   "left":  69,
   "right": 591,
   "top":    213,
   "middle": 783,
   "bottom": 1353
 },
 
 "2208": {
   "small":  471,
   "medium": 1044,
   "large":  1071,
   "left":  99,
   "right": 672,
   "top":    114,
   "middle": 696,
   "bottom": 1278
 },
 
 "1334": {
   "small":  296,
   "medium": 642,
   "large":  648,
   "left":  54,
   "right": 400,
   "top":    60,
   "middle": 412,
   "bottom": 764
 },
 
 "1136": {
   "small":  282,
   "medium": 584,
   "large":  622,
   "left": 30,
   "right": 332,
   "top":  59,
   "middle": 399,
   "bottom": 399
 }
  }
  return phones
}

/*
 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
 */
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
  dayText.centerAlignText()
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