// Variables used by Scriptable.
// This widget was created by Max Zeryck 

/*
 * Author: Enjoyee
 * Github: https://github.com/Enjoyee/Scriptable
 * 热榜数据源自: https://mo.fish
 */

/********************************************************************/
/****************************定义小组件****************************/
/********************************************************************/
const filename = Script.name() + ".jpg"
const files = FileManager.local()
const path = files.joinPath(files.documentsDirectory(), filename)

/********************************************************************/
// 获取外部输入的参数，格式：【大标题，ID，大标题文字颜色，列表文字颜色】
let widgetInputRAW = args.widgetParameter
try {
  widgetInputRAW.toString()
} catch(e) {
  // 默认值微博热搜
  widgetInputRAW = "微博热搜,58"
}
// 获取外部输入
let inputArr = widgetInputRAW.toString().replace("，", ",").split(",")
// 热榜标题
const hotTitle = inputArr[0]
// 热榜ID
const hotID = inputArr[1]


if (config.runsInWidget) {
  // 透明背景设置：widget.backgroundImage = files.readImage(path)

  /****************************小组件内容START****************************/
  // 请求地址
  let requestUrl = "https://www.tophub.fun:8888/v2/GetAllInfoGzip?id=58&page=0"
  // 获取热榜数据
  let jsonResponse = await getJson(requestUrl)
  // 调用创建小组件
  if (jsonResponse.Code == 0) {
    createWidget(jsonResponse.Data.data.slice(1, 6))
  }
  /*****************************小组件内容ENd*****************************/

} else {
  // Determine if user has taken the screenshot.
  var message
  message = "开始之前，请返回主屏幕并长按进入编辑模式。滑动到最右边的空白页并截图。"
  let exitOptions = ["继续","退出以截图"]
  let shouldExit = await generateAlert(message,exitOptions)
  if (shouldExit) return
  
  // Get screenshot and determine phone size.
  let img = await Photos.fromLibrary()
  let height = img.size.height
  let phone = phoneSizes()[height]
  if (!phone) {
    message = "您似乎选择了非iPhone屏幕截图的图像，或者不支持您的iPhone。请使用其他图像再试一次。"
    await generateAlert(message,["OK"])
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
  
  message = "您的小部件背景已准备就绪。您想在Scriptable的小部件中使用它还是导出图像？"
  const exportPhotoOptions = ["在Scriptable中使用","导出图像"]
  const exportPhoto = await generateAlert(message,exportPhotoOptions)
  
  if (exportPhoto) {
    Photos.save(imgCrop)
  } else {
    files.writeImage(path,imgCrop)
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
async function createWidget(hotData) {
  let w = new ListWidget() 
  /*
   *************************************************************
   */

  // // 1.自定义颜色背景
  // const customColorBg = new LinearGradient()
  // // 背景渐变色
  // customColorBg.colors = [new Color("#29323c"), new Color("#1c1c1c")]
  // customColorBg.locations = [0.0, 1.0]
  // w.backgroundGradient = customColorBg

  // // 2.自定义图片背景
  // 图片链接
  // const customImgBgUrl = "https://images.unsplash.com/photo-1602408959965-cbde35cfab50?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
  // const imgReq = new Request(customImgBgUrl)
  // const customImgBg = await imgReq.loadImage()
  // w.backgroundImage=customImgBg

  // 3.下面是设置透明背景
  w.backgroundImage = files.readImage(path)

  // 大标题文字颜色
  const headTitleFontColor = new Color("#FF7F00")
  // 列表文字颜色
  const listTitleFontColor = new Color("#E9C2A6")
  /*
   *************************************************************
   */

  // 设置大标题
  w.addSpacer(15)
  let titleStack = w.addStack()
  let title = titleStack.addText(`🔥 ${hotTitle}`)
  title.font = Font.boldRoundedSystemFont(17) // 大标题字体样式/大小
  title.textColor = headTitleFontColor // 大标题的颜色
  title.shadowColor = headTitleFontColor // 大标题的阴影颜色
  title.shadowOffset = new Point(1,1) // 阴影偏移
  title.shadowRadius = 1 // 阴影半径
  title.leftAlignText()
  w.addSpacer()

  // 列表
  for (let index in hotData) {
    let itemStack = w.addStack()
    // 标题
    let title = itemStack.addText(`☞  ${hotData[index].Title}`)
    title.font = Font.boldRoundedSystemFont(13) // 热搜列表标题字体样式/大小
    title.textColor = listTitleFontColor // 热搜列表标题的颜色
    title.url = hotData[index].Url
    title.leftAlignText()
    w.addSpacer(5)
  }

  // 占位
  let spaceStack = w.addStack()
  let space = spaceStack.addText("这是占位用的这是占位用的这是占位用的这是占位用的这是占位用的这是占位用的这是占位用的")
  space.font = Font.boldRoundedSystemFont(8) // 热搜列表标题字体样式/大小
  space.textOpacity = 0

  w.addSpacer()

  Script.setWidget(w)
  Script.complete()

  // 直接预览中等大小的小组件
  w.presentMedium()
}