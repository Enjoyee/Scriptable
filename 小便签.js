// Variables used by Scriptable.
// This widget was created by Max Zeryck 

/*
 * Author: Enjoyee
 * Github: https://github.com/Enjoyee/Scriptable
 */

/********************************************************************/
/****************************定义小组件****************************/
/********************************************************************/
const filename = Script.name() + ".jpg"
const files = FileManager.local()
const path = files.joinPath(files.documentsDirectory(), filename)

/********************************************************************/
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
const fontColorStr = "#333333"
// 背景是否是颜色
const colorMode = false
// 背景颜色
const bgColorStr = "#ffffff"
// 文字默认大小
const fonSize = 50
/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/


// 创建小组件
let widget = await createWidget(inputArr)
// 运行组件
if (!config.runsInWidget && !colorMode) {
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
}

// 最后设置小组件
if (colorMode) {
  widget.backgroundColor = new Color(bgColorStr)
} else {
  widget.backgroundImage = files.readImage(path)
}
Script.setWidget(widget)
// 脚本停止
Script.complete()
// 直接预览中等大小的小组件
widget.presentSmall()

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
 ************************************************************************************
 */


 /*
 ===================================================================================
 */

// 网络请求get封装
async function getJson({ url, headers = {} }, callback = () => {}) {
  const request = new Request('')
  const defaultHeaders = {
    "Accept": "*/*",
    "Content-Type": "application/json"
  }

  request.url = `https://www.tophub.fun:8888/v2/GetAllInfoGzip?id=${hotID}&page=0`
  request.method = 'GET'
  request.headers = {
    ...headers,
    ...defaultHeaders
  }
  const data = await request.loadJSON()
  callback(request.response, data)
  return data
}

// 请求网络图片
async function fetchImageUrl(imgUrl) {
  const req = await new Request(imgUrl)
  const img = await req.loadImage()
  return img
}

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