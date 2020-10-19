// Variables used by Scriptable.
// This widget was created by Max Zeryck，并在原来的基础上增加了更多内容显示


/********************************************************************/
/****************************定义小组件****************************/
/********************************************************************/
const filename = Script.name() + ".jpg"
const files = FileManager.local()
const path = files.joinPath(files.documentsDirectory(), filename)

if (config.runsInWidget) {
  /****************************小组件内容START****************************/
  // 获取外部输入的参数
  var widgetInputRAW = args.widgetParameter
  // 默认值
  const defaultFund = "001838,002190"
  try {
    widgetInputRAW.toString()
  } catch(e) {
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
  widget.backgroundImage = files.readImage(path)
  widget.addSpacer()
  widget.setPadding(15, 2, 15, 2)
  Script.setWidget(widget)
  Script.complete()
  // 直接预览中等大小的小组件
  widget.presentMedium()
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
 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
 */


 // 基金数据获取
async function getFund() {
  // 拼接基金id
  var fidFull = ''
  for (let index in fid) {
    fidFull = fidFull + fid[index] + ","
  }
  fidFull = fidFull.substring(0, fidFull.lastIndexOf(','))

  // 请求基金数据
  const fundRequest = {
    url: `https://api.doctorxiong.club/v1/fund?code=${fidFull}`,
  }
  const res = await get(fundRequest)

  return res
}

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

// 网络请求get封装
async function get({ url, headers = {} }, callback = () => {}) {
  const request = new Request('')
  const defaultHeaders = {
    "Accept": "*/*",
    "Content-Type": "application/json"
  }

  request.url = url
  request.method = 'GET'
  request.headers = {
    ...headers,
    ...defaultHeaders
  }
  const data = await request.loadJSON()
  callback(request.response, data)
  return data
}
