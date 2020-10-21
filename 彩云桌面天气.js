// Variables used by Scriptable.
// This transparent bg was created by Max Zeryck

/*
 **************************************
 * 配置项
 **************************************
 */

// 地区
const locale = "zh_cn"

// 背景是否是颜色
const colorMode = false

// 背景颜色
const bgColorStr = "#000000"

// 预览大小【小：Small，中：Medium，大：Large】
const previewSize = "Medium"

// 彩云天气的apiKey，自己去免费申请：https://caiyunapp.com
const apiKey = "TAkhjf8d1nlSlspN"

// 默认的定位信息，定位失败的时候默认读取
// https://open.caiyunapp.com/File:Adcode-release-2020-06-10.xlsx.zip
// 上述链接查看对应地区的详细经纬度
let locationData = {
  "latitude": undefined,
  "longitude": undefined,
  "locality": undefined,
  "subLocality": undefined
}
// 锁定地区，直接使用上述填写的地址信息不进行定位
const lockLocation = false

// 是否需要选择图片背景
const changePicBg = true

// 日程显示条数
const maxSchedules = 2

// 提醒事项显示条数
const maxReminders = 2

// 内容区左右边距
const padding = {
  top: 0,
  left: 4,
  bottom: 0,
  right: 4
}

// 顶部问候语，英文花样文字：https://beizhedenglong.github.io/weird-fonts/
const greetingText = {
  nightGreeting: "🦉 𝑇𝑖𝑚𝑒 𝑡𝑜 𝑔𝑒𝑡 𝑙𝑎𝑖𝑑~",
  morningGreeting: "💫 𝐺𝑜𝑜𝑑 𝑚𝑜𝑟𝑛𝑖𝑛𝑔~",
  noonGreeting: "🥳 𝐺𝑜𝑜𝑑 𝑛𝑜𝑜𝑛~",
  afternoonGreeting: "🐡 𝐺𝑜𝑜𝑑 𝑎𝑓𝑡𝑒𝑟𝑛𝑜𝑜𝑛~",
  eveningGreeting: "🐳 𝐺𝑜𝑜𝑑 𝑒𝑣𝑒𝑛𝑖𝑛𝑔~"
}

// 天气对应的icon 
const weatherIcos = {
    CLEAR_DAY: "http://worldweather.wmo.int/images/24a.png", // 晴（白天） CLEAR_DAY
    CLEAR_NIGHT: "http://worldweather.wmo.int/images/24b.png", // 晴（夜间） CLEAR_NIGHT
    PARTLY_CLOUDY_DAY: "http://worldweather.wmo.int/images/23a.png", // 多云（白天）  PARTLY_CLOUDY_DAY
    PARTLY_CLOUDY_NIGHT: "http://worldweather.wmo.int/images/23b.png", // 多云（夜间）  PARTLY_CLOUDY_NIGHT
    CLOUDY: "http://worldweather.wmo.int/images/20.png", // 阴  CLOUDY
    LIGHT_HAZE: "http://worldweather.wmo.int/images/17.png", // 轻度雾霾   LIGHT_HAZE
    MODERATE_HAZE: "http://worldweather.wmo.int/images/18.png", // 中度雾霾  MODERATE_HAZE
    HEAVY_HAZE: "http://worldweather.wmo.int/images/19.png", // 重度雾霾   HEAVY_HAZE
    LIGHT_RAIN: "http://worldweather.wmo.int/images/15.png", // 小雨 LIGHT_RAIN
    MODERATE_RAIN: "http://worldweather.wmo.int/images/14.png", // 中雨 MODERATE_RAIN
    HEAVY_RAIN: "http://worldweather.wmo.int/images/12.png", // 大雨  HEAVY_RAIN
    STORM_RAIN: "http://worldweather.wmo.int/images/9.png", // 暴雨 STORM_RAIN
    FOG: "http://worldweather.wmo.int/images/16.png", // 雾 FOG
    LIGHT_SNOW: "http://worldweather.wmo.int/images/7.png", // 小雪  LIGHT_SNOW
    MODERATE_SNOW: "http://worldweather.wmo.int/images/5.png", // 中雪 MODERATE_SNOW
    HEAVY_SNOW: "http://worldweather.wmo.int/images/6.png", // 大雪  HEAVY_SNOW
    STORM_SNOW: "http://worldweather.wmo.int/images/4.png", // 暴雪 STORM_SNOW
    DUST: "http://worldweather.wmo.int/images/1.png", // 浮尘  DUST
    SAND: "http://worldweather.wmo.int/images/1.png", // 沙尘  SAND
    WIND: "http://worldweather.wmo.int/images/26.png", // 大风  WIND
}

// 天气信息控制
const weatherControl = {
  HUMIDITY: true, // 是否显示相对湿度
  COMFORT: true, // 是否显示舒适指数
  ULTRAVIOLET: true, // 是否显示紫外线指数
  AQI: true, // 是否显示空气质量指数
  HEIGHT_LOW: true, // 是否显示温度范围
  SUNRISE_SUNSET: true, // 是否显示日出日落时间
  UPDATE_TIME: true, // 是否显示天气更新时间
}

// 周标题
const weekTitle = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

// 默认文字颜色
const defaultTextColor = new Color("#ffffff")

//////////////////////////////////////////
// 标题样式
let textStyle = {
  stack: undefined, // 加入到哪个内容栈显示
  topMargin: 0, // 顶部距离
  text: "", // 显示的文字
  lineLimit: 0, // 行数控制，0是全部展示
  font: Font.systemFont(18), // 字体
  textColor: defaultTextColor, // 文字颜色
}

// 图片样式
let imgStyle = {
  stack: undefined, // 加入到哪个内容栈显示
  topMargin: 0, // 顶部距离
  img: undefined, // 图片资源
  width: 0, // 宽
  length: 0, // 长
  tintColor: undefined, // 图片渲染颜色
}
//////////////////////////////////////////

// 当前日期
const currentDate = new Date()
// 年份
const year = currentDate.getFullYear()
// 月份
const month = currentDate.getMonth() + 1
// 日期
const day = currentDate.getDate()
// 小时
const hour = currentDate.getHours()
// 分钟
const minute = currentDate.getMinutes()

/*
 ****************************************************************************
 ****************************************************************************
 ****************************************************************************
 */


/********************************************************************/
/****************************定义小组件****************************/
/********************************************************************/
const filename = `${Script.name()}.jpg`
const files = FileManager.local()
const path = files.joinPath(files.documentsDirectory(), filename)
const widget = new ListWidget()


/****************************小组件内容START****************************/
// 彩云天气信息
const weatherInfo = await getWeather()
// 农历信息
const lunarInfo = await getLunar()
// 今日诗词
const poetry = await getPoetry()
// // 日程信息
const showSchedules = await getSchedules()
// 提醒事项
// const showReminders = await getReminders()


//////////////////////////////////////////
// 内容排版
let contentStack = widget.addStack()
contentStack.layoutHorizontally()
// 整体内容居中对齐
contentStack.centerAlignContent()
// 背景
widget.backgroundColor = new Color(bgColorStr)
//////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////
// 左侧内容
let leftStack = contentStack.addStack()
leftStack.layoutVertically()

//////////////////////////////////////////
// 问候
let titleStack = horizontallyCenterStack(leftStack)
// 问候语获取内容
const greeting = provideGreeting(currentDate)
// 添加显示标题  
addStyleText(titleStack, 0, greeting, 1, Font.systemFont(22), defaultTextColor)


//////////////////////////////////////////
// 年月日
const dateStr = getDateStr(currentDate)
addStyleText(leftStack, 2, dateStr, 1, Font.systemFont(16), new Color("#ffcc99"))

//////////////////////////////////////////
// 星期几 / 农历日期
const weekDayColor = new Color("#ffffff", 0.9)
leftStack.addSpacer(2)
let dateStack = horizontallyCenterStack(leftStack)
// 添加显示星期几
const weekDayTitle = getDayWeekTitle(currentDate)
addStyleText(dateStack, 0, weekDayTitle, 1, Font.systemFont(16), weekDayColor)
dateStack.addSpacer(4)

// 农历信息
let infoLunarText = lunarInfo.data.lunar
infoLunarText = infoLunarText.substring(12, infoLunarText.length)
// 添加显示农历
addStyleText(dateStack, 0, infoLunarText, 1, Font.systemFont(16), weekDayColor)

// 电池信息
dateStack.addSpacer(2)
const batteryLevel = Device.batteryLevel() * 100
const batteryStr = `〓 ${getBatteryLevel()} 〓`
// 添加显示电池具体信息
addStyleText(dateStack, 0, batteryStr, 1, Font.systemFont(15), weekDayColor)


//////////////////////////////////////////
// 天气预警、预告信息
const weatherAlertInfo = weatherInfo.alertWeatherTitle 
let weatherDesc = weatherInfo.weatherDesc
if (weatherAlertInfo != undefined) {
  weatherDesc = weatherAlertInfo
}
// 添加显示天气预告信息
addStyleText(leftStack, 3, weatherDesc, 1, Font.systemFont(12), defaultTextColor)

//////////////////////////////////////////
// 日程、诗词
const schedulePoetryColor = new Color("#ffffff", 0.7)
const scheduleSize = showSchedules.length
if (scheduleSize > 0) {
  addStyleText(leftStack, 1, "----------------------------------", 1, Font.systemFont(10), schedulePoetryColor)
  // 添加日程
  let scheduleIndex = 0
  for (let schedule of showSchedules) {
    // 索引值
    scheduleIndex++
    if (scheduleIndex > maxSchedules) {
      return
    }

    const scheduleStack = horizontallyCenterStack(leftStack)
    // 图片
    const img = SFSymbol.named("megaphone").image 
    // 展示ico
    addStyleImg(scheduleStack, 0, img, 12, 12, schedulePoetryColor)
    scheduleStack.addSpacer(4)

    // 日程标题
    addStyleText(scheduleStack, 0, schedule.title, 1, Font.systemFont(11), schedulePoetryColor)

    // 开始时间
    const scheduleTimeStack = leftStack.addStack()
    scheduleTimeStack.layoutHorizontally()
    scheduleTimeStack.addSpacer(17)
    // 展示时间
    addStyleText(scheduleTimeStack, 0, schedule.timeText, 1, Font.systemFont(11), schedulePoetryColor)
  }
} else {
  // 添加今日诗词
  leftStack.addSpacer(8)
  const poetryStack = leftStack.addStack()
  // 诗词背景
  poetryStack.backgroundColor = new Color("#666", 0.5)
  poetryStack.cornerRadius = 4
  poetryStack.layoutVertically()
  poetryStack.addSpacer(4)
  //
  const poetryInfoStack = poetryStack.addStack()
  poetryInfoStack.layoutHorizontally()
  poetryInfoStack.addSpacer(4)
  const poetryInfo = poetry.data
  // 添加显示诗词
  const potryContent = `"${poetryInfo.content.substring(0, poetryInfo.content.length - 1)}"`
  addStyleText(poetryInfoStack, 0, potryContent, 1, Font.systemFont(11), schedulePoetryColor)

  // 添加作者
  const authStack = poetryStack.addStack()
  authStack.layoutHorizontally()
  authStack.addSpacer()
  // 显示作者
  const authorText = `⊱${poetryInfo.origin.dynasty}·${poetryInfo.origin.author}⊰`
  addStyleText(authStack, 0, authorText, 1, Font.systemFont(11), schedulePoetryColor)
  authStack.addSpacer(4)
  poetryStack.addSpacer(4)
}

////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////
// 右侧内容
contentStack.addSpacer()
let rightStack = contentStack.addStack()
// 写死右侧宽度
rightStack.size = new Size(110, 0)
rightStack.layoutVertically()
//////////////////////////////////////////


//////////////////////////////////////////
// 天气Icon
const weatherStack = alignRightStack(rightStack)
weatherStack.bottomAlignContent()
let weatherImg = await getImage(weatherInfo.weatherIco)
// 显示天气
addStyleImg(weatherStack, 0, weatherImg, 32, 32)
// 体感温度
weatherStack.addSpacer(4)
const bodyFeelingTemperature = weatherInfo.bodyFeelingTemperature
addStyleText(weatherStack, 0, `${bodyFeelingTemperature}°C`, 1, Font.boldMonospacedSystemFont(22), defaultTextColor)
//////////////////////////////////////////

// 相对湿度
if (weatherControl.HUMIDITY) {
  rightStack.addSpacer(4)
  const humidityStack = alignRightStack(rightStack)
  addStyleText(humidityStack, 0, `相对湿度：${weatherInfo.humidity}`, 1, Font.systemFont(11), defaultTextColor)  
}

//////////////////////////////////////////
// 舒适指数
if (weatherControl.COMFORT) {
  rightStack.addSpacer(1)
  const comfortStack = alignRightStack(rightStack)
  addStyleText(comfortStack, 0, `舒适指数：${weatherInfo.comfort}`, 1, Font.systemFont(11), defaultTextColor)
}

//////////////////////////////////////////
// 紫外线指数
if (weatherControl.ULTRAVIOLET) {
  rightStack.addSpacer(1)
  const ultravioletStack = alignRightStack(rightStack)
  addStyleText(ultravioletStack, 0, `紫外线：${weatherInfo.ultraviolet}`, 1, Font.systemFont(11), defaultTextColor)
}

//////////////////////////////////////////
// 空气质量
if (weatherControl.AQI) {
  rightStack.addSpacer(1)
  const aqiInfoStack = alignRightStack(rightStack)
  addStyleText(aqiInfoStack, 8, `空气质量：${weatherInfo.aqiInfo}`, 1, Font.systemFont(11), defaultTextColor)
}

//////////////////////////////////////////
// 高低温
if (weatherControl.HEIGHT_LOW) {
  const minTemperature = weatherInfo.minTemperature
  const maxTemperature = weatherInfo.maxTemperature
  // 右对齐
  rightStack.addSpacer(3)
  const tempStack = alignRightStack(rightStack)
  // 高温
  addStyleText(tempStack, 0, `↑`, 1, Font.systemFont(10), new Color("#ff0000"))
  addStyleText(tempStack, 0, `${weatherInfo.maxTemperature}°`, 1, Font.systemFont(10), defaultTextColor)
  // 低温
  tempStack.addSpacer(6)
  addStyleText(tempStack, 0, `↓`, 1, Font.systemFont(10), new Color("#2bae85"))
  addStyleText(tempStack, 0, `${weatherInfo.minTemperature}°`, 1, Font.systemFont(10), defaultTextColor)
}

//////////////////////////////////////////
// 日出
if (weatherControl.SUNRISE_SUNSET) {
  rightStack.addSpacer(2)
  let symbolStack = rightStack.addStack()
  symbolStack.layoutHorizontally()
  symbolStack.addSpacer()
  symbolStack.bottomAlignContent()
  // 添加日出icon
  let sunriseImg = SFSymbol.named("sunrise.fill").image
  addStyleImg(symbolStack, 0, sunriseImg, 15, 15)
  symbolStack.addSpacer(4)
  // 日出时间 / 样式
  addStyleText(symbolStack, 0, weatherInfo.sunrise, 1, Font.systemFont(10), defaultTextColor)
  //***********************//
  // 日落
  symbolStack.addSpacer(4)
  // 添加日落icon
  let sunsetImg = SFSymbol.named("sunset.fill").image
  addStyleImg(symbolStack, 0, sunsetImg, 15, 15)
  symbolStack.addSpacer(4)
  // 日落时间 / 样式
  addStyleText(symbolStack, 0, weatherInfo.sunset, 1, Font.systemFont(10), defaultTextColor)
}

//////////////////////////////////////////
// 天气更新时间
if (weatherControl.UPDATE_TIME) {
  // 更新时间
  rightStack.addSpacer(2)
  const updateTimeStack = alignRightStack(rightStack)
  addStyleText(updateTimeStack, 0, `上次更新 → ${num2Str(hour)}:${num2Str(minute)}`, 1, Font.systemFont(8), new Color("#ffffff", 0.8))  
}

/*****************************小组件内容ENd*****************************/

if (!colorMode && !config.runsInWidget && changePicBg) {
  // Determine if user has taken the screenshot.
  const okTips = "您的小部件背景已准备就绪"
  let message = "图片模式支持相册照片&背景透明"
  let options = ["图片选择","透明背景"]
  let isTransparentMode = await generateAlert(message, options)
  if (!isTransparentMode) {
    let img = await Photos.fromLibrary()
    message = okTips
    const resultOptions = ["好的"]
    await generateAlert(message, resultOptions)
    files.writeImage(path, img)
  } else {
    message = "以下是【透明背景】生成步骤，如果你没有屏幕截图请退出，并返回主屏幕长按进入编辑模式。滑动到最右边的空白页截图。然后重新运行！"
    let exitOptions = ["继续(已有截图)","退出(没有截图)"]
  
    let shouldExit = await generateAlert(message,exitOptions)
    if (shouldExit) return
  
    // Get screenshot and determine phone size.
    let img = await Photos.fromLibrary()
    let height = img.size.height
    let phone = phoneSizes()[height]
    if (!phone) {
      message = "您似乎选择了非iPhone屏幕截图的图像，或者不支持您的iPhone。请使用其他图像再试一次!"
      await generateAlert(message,["好的！我现在去截图"])
      return
    }
  
    // Prompt for widget size and position.
    message = "您想要创建什么尺寸的小部件？"
    let sizes = ["小号","中号","大号"]
    let size = await generateAlert(message,sizes)
    let widgetSize = sizes[size]
  
    message = "您想它在什么位置？"
    message += (height == 1136 ? " (请注意，您的设备仅支持两行小部件，因此中间和底部选项相同。)" : "")
  
    // Determine image crop based on phone size.
    let crop = { w: "", h: "", x: "", y: "" }
    if (widgetSize == "小号") {
      crop.w = phone.小号
      crop.h = phone.小号
      let positions = ["顶部 左边","顶部 右边","中间 左边","中间 右边","底部 左边","底部 右边"]
      let position = await generateAlert(message,positions)
    
      // Convert the two words into two keys for the phone size dictionary.
      let keys = positions[position].split(' ')
      crop.y = phone[keys[0]]
      crop.x = phone[keys[1]]
    
    } else if (widgetSize == "中号") {
      crop.w = phone.中号
      crop.h = phone.小号
    
      // 中号 and 大号 widgets have a fixed x-value.
      crop.x = phone.左边
      let positions = ["顶部","中间","底部"]
      let position = await generateAlert(message,positions)
      let key = positions[position].toLowerCase()
      crop.y = phone[key]
    
    } else if(widgetSize == "大号") {
      crop.w = phone.中号
      crop.h = phone.大号
      crop.x = phone.左边
      let positions = ["顶部","底部"]
      let position = await generateAlert(message,positions)
    
      // 大号 widgets at the 底部 have the "中间" y-value.
      crop.y = position ? phone.中间 : phone.顶部
    }
    
    // Crop image and finalize the widget.
    let imgCrop = cropImage(img, new Rect(crop.x,crop.y,crop.w,crop.h))
    
    message = "您的小部件背景已准备就绪，退出到桌面预览。"
    const resultOptions = ["好的"]
    await generateAlert(message, resultOptions)
    files.writeImage(path, imgCrop)
  }  

}


////////////////////////////////////////////////////////////////////////////////////
if (colorMode) {
  widget.backgroundColor = new Color(bgColorStr)
} else {
  widget.backgroundImage = files.readImage(path)
}
// 设置边距(上，左，下，右)
widget.setPadding(padding.top, padding.left, padding.bottom, padding.right)
// 设置组件
Script.setWidget(widget)
// 完成脚本
Script.complete()
// 预览
if (previewSize == "Large") {
  widget.presentLarge()
} else if (previewSize == "Medium") {
  widget.presentMedium()
} else {
  widget.presentSmall()
}
////////////////////////////////////////////////////////////////////////////////////






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
      "小号":  507,
      "中号":  1080,
      "大号":  1137,
      "左边":  81,
      "右边":  654,
      "顶部":  228,
      "中间":  858,
      "底部":  1488
  },
  
  "1792": {
      "小号":  338,
      "中号":  720,
      "大号":  758,
      "左边":  54,
      "右边":  436,
      "顶部":  160,
      "中间":  580,
      "底部":  1000
  },
  
  "2436": {
      "小号":  465,
      "中号":  987,
      "大号":  1035,
      "左边":  69,
      "右边":  591,
      "顶部":  213,
      "中间":  783,
      "底部":  1353
  },
  
  "2208": {
      "小号":  471,
      "中号":  1044,
      "大号":  1071,
      "左边":  99,
      "右边":  672,
      "顶部":  114,
      "中间":  696,
      "底部":  1278
  },
  
  "1334": {
      "小号":  296,
      "中号":  642,
      "大号":  648,
      "左边":  54,
      "右边":  400,
      "顶部":  60,
      "中间":  412,
      "底部":  764
  },
  
  "1136": {
      "小号":  282,
      "中号":  584,
      "大号":  622,
      "左边":  30,
      "右边":  332,
      "顶部":  59,
      "中间":  399,
      "底部":  399
  }
  }
  return phones
}


/*
 ****************************************************************************************************************************
 ****************************************************************************************************************************
 ****************************************************************************************************************************
 */

/*
 **************************************
 * 添加一行文本数据显示
 **************************************
 */
function addStyleText(stack, topMargin, text, lineLimit, font, textColor, width = 0) {
  textStyle.stack = stack
  textStyle.topMargin = topMargin
  textStyle.text = text
  textStyle.lineLimit = lineLimit
  textStyle.font = font
  textStyle.textColor = textColor
  addText(textStyle)
  textStyle.lineLimit = 0
}

function addText(style, width = 0) {
  style.stack.size = new Size(width, 0)
  style.stack.addSpacer(style.topMargin)
  let textSpan = style.stack.addText(style.text + "")
  textSpan.font = style.font
  textSpan.lineLimit = style.lineLimit
  textSpan.textColor = style.textColor
}


/*
 **************************************
 * 添加图片显示
 **************************************
 */
function addStyleImg(stack, topMargin, img, width, length, tintColor) {
  imgStyle.stack = stack
  imgStyle.topMargin = topMargin
  imgStyle.img = img
  imgStyle.width = width
  imgStyle.length = length
  imgStyle.tintColor = tintColor
  addImg(imgStyle)
}

function addImg(style) {
  const stack = style.stack
  stack.addSpacer(style.topMargin)
  let imgSpan = stack.addImage(style.img)
  imgSpan.imageSize = new Size(style.width, style.length)
  const tintColor = style.tintColor
  if (tintColor != undefined) {
    imgSpan.tintColor = tintColor
  }
}


/*
 **************************************
 * 格式化时间
 **************************************
 */
function getDateStr(date, formatter = "yyyy年MM月d日") {
  let df = new DateFormatter()
  df.locale = locale
  df.dateFormat = formatter
  return df.string(date)
}

/*
 **************************************
 * 按照时间获取问候语
 **************************************
 */
function provideGreeting(date) {
  const hour = date.getHours()
  if (hour    < 5)  { return greetingText.nightGreeting }
  if (hour    < 11) { return greetingText.morningGreeting }
  if (hour    > 11 && hour-12 < 1)  { return greetingText.noonGreeting }
  if (hour-12 < 7)  { return greetingText.afternoonGreeting }
  if (hour-12 < 10) { return greetingText.eveningGreeting }
  return greetingText.nightGreeting
}


/*
 **************************************
 * 获取彩云天气
 **************************************
 */
async function getWeather() {
  let weatherInfo = {}
  const location = await getLocation()
  log("定位信息：" + location.locality + "·" + location.subLocality)
  // 彩云天气域名
  const DOMAIN = `https://api.caiyunapp.com/v2.5/${apiKey}/${location.longitude},${location.latitude}/weather.json?alert=true`
  const weatherJsonData = await getJson(DOMAIN)
  if (weatherJsonData.status == "ok") {
    log("天气数据请求成功")
    // 天气突发预警
    const alertWeatherTitle = weatherJsonData.result.alert.content.title
    log("突发的天气预警==>" + alertWeatherTitle)
    weatherInfo.alertWeatherTitle = alertWeatherTitle

    // 温度范围
    const temperatureData = weatherJsonData.result.daily.temperature[0]
    // 最低温度
    const minTemperature = temperatureData.min
    // 最高温度
    const maxTemperature = temperatureData.max
    log("温度==>" + minTemperature + "|" + maxTemperature)
    weatherInfo.minTemperature = Math.round(minTemperature)
    weatherInfo.maxTemperature = Math.round(maxTemperature)

    // 体感温度
    const bodyFeelingTemperature = weatherJsonData.result.realtime.apparent_temperature 
    log("体感温度==>" + bodyFeelingTemperature)
    weatherInfo.bodyFeelingTemperature = Math.round(bodyFeelingTemperature)

    // 天气状况 weatherIcos[weatherIco]
    const weather = weatherJsonData.result.realtime.skycon
    log("天气状况==>" + weather + "|" + weatherIcos[weather])
  weatherInfo.weatherIco = weatherIcos[weather]

    // 天气描述
    const weatherDesc = weatherJsonData.result.forecast_keypoint
    log("天气描述==>" + weatherDesc)
    weatherInfo.weatherDesc = weatherDesc

    // 相对湿度
    const humidity = (Math.round(weatherJsonData.result.realtime.humidity * 100)) + "%"
    log("相对湿度==>" + weatherJsonData.result.realtime.humidity)
    weatherInfo.humidity = humidity

    // 舒适指数
    const comfort = weatherJsonData.result.realtime.life_index.comfort.desc
    log("舒适指数==>" + comfort)
    weatherInfo.comfort = comfort

    // 紫外线指数
    const ultraviolet = weatherJsonData.result.realtime.life_index.ultraviolet.desc
    log("紫外线指数==>" + ultraviolet)
    weatherInfo.ultraviolet = ultraviolet

    // 空气质量
    const aqi = weatherJsonData.result.realtime.air_quality.aqi.chn
    const aqiInfo = airQuality(aqi)
    log("空气质量==>" + aqiInfo)
    weatherInfo.aqiInfo = aqiInfo

    // 日出日落
    const astro = weatherJsonData.result.daily.astro[0]
    // 日出
    const sunrise = astro.sunrise.time
    // 日落
    const sunset = astro.sunset.time
    log("日出==>" + sunrise + "，日落==>" + sunset)
    weatherInfo.sunrise = sunrise.toString()
    weatherInfo.sunset = sunset.toString()
  }

  return weatherInfo
}


/*
 **************************************
 * 获取定位
 **************************************
 */
async function getLocation() {
  if (!lockLocation) {
    try {
      const location = await Location.current()
      const geocode = await Location.reverseGeocode(location.latitude, location.longitude, locale)
      locationData.latitude = location.latitude
      locationData.longitude = location.longitude
      const geo = geocode[0]
      // 市
      locationData.locality = geo.locality
      // 区
      locationData.subLocality = geo.subLocality
      // 街道
      locationData.street = geo.thoroughfare
      log("定位信息：latitude=" + location.latitude + "，longitude=" + location.longitude + "，locality="
       + locationData.locality + "，subLocality=" + locationData.subLocality + "，street=" + locationData.street)
    } catch(e) {
      log("定位出错了，" + e.toString())
    }
  }

  return locationData
}


/*
 **************************************
 * 日程筛选
 **************************************
 */
function shouldShowSchedule(schedule) {
  const currentDate = new Date()
  // 被取消的日程不用显示
  if (schedule.title.startsWith("Canceled:")) { return false }
  // 与当前时间做比较
  let timeInterval = schedule.startDate.getTime() > currentDate.getTime()
  // 返回全天跟还没过去的
  return timeInterval || schedule.isAllDay
}


/*
 **************************************
 * 日程列表
 **************************************
 */
async function getSchedules() {
  let showSchedules = []
  const todaySchedules = await CalendarEvent.today([])
  for (const schedule of todaySchedules) {
    if (shouldShowSchedule(schedule)) {
      // 日程
      let scheduleObj = {}
      // 开始时间
      const startDate = schedule.startDate
        // 开始小时
      const startHour = ("0" + startDate.getHours()).slice(-2)
      // 开始分钟
      const startMinute = ("0" + startDate.getMinutes()).slice(-2)
      
      // 结束时间
      const endDate = schedule.endDate
      // 结束小时
      const endHour = ("0" + endDate.getHours()).slice(-2)
      // 结束分钟
      const endMinute = ("0" + endDate.getMinutes()).slice(-2)
      
      // 时间安排展示
      let timeText = startHour + ":" + startMinute + "→" + endHour + ":" + endMinute
      if (schedule.isAllDay) {
        timeText = "全天"
      }

      // 构造格式后的日程
      scheduleObj.title = schedule.title
      scheduleObj.timeText = timeText 
      log(">>日程：" + scheduleObj.title + "==>" + timeText)
      showSchedules.push(scheduleObj)
    }
  }

  return showSchedules
}


/*
 **************************************
 * 提醒事项列表
 **************************************
 */
async function getReminders() {
  let showReminders = []
  const allReminders = await Reminder.all();
  for (const reminder of allReminders) {
    if (!reminder.isCompleted) {
      let reminderObj = {}
      // 构造格式后的提醒事项
      reminderObj.title = reminder.title
      reminderObj.dueDate = reminder.dueDate
      log(">>提醒事项：" + reminderObj.title + "==>" + reminderObj.dueDate)
      showReminders.push(reminder)
    }
  }

  return showReminders
}


/*
 **************************************
 * 网络请求get封装
 **************************************
 */
async function getJson(url) {
  const request = new Request(url)
  const defaultHeaders = {
    "Accept": "*/*",
    "Content-Type": "application/json"
  }

  request.url = url
  request.method = 'GET'
  request.headers = defaultHeaders

  const data = await request.loadJSON()

  return data
}


/*
 **************************************
 * 空气质量指标
 **************************************
 */
function airQuality(levelNum) {
  // 0-50 优，51-100 良，101-150 轻度污染，151-200 中度污染
  // 201-300 重度污染，>300 严重污染
  if (levelNum >= 0 && levelNum <= 50) {
    return "优秀"
  } else if (levelNum >= 51 && levelNum <= 100) {
    return "良好"
  } else if (levelNum >= 101 && levelNum <= 150) {
    return "轻度"
  } else if (levelNum >= 151 && levelNum <= 200) {
    return "中度"
  } else if (levelNum >= 201 && levelNum <= 300) {
    return "重度"
  } else {
    return "严重"
  }
}


/*
 **************************************
 * 获取电池信息
 **************************************
 */
function getBatteryLevel() {
  const batteryLevel = Device.batteryLevel()
  const batteryAscii = `${Math.round(batteryLevel * 100)}%`
  log("电池==>" + batteryAscii)
  return batteryAscii;
}


/*
 **************************************
 * 在线获取农历信息
 **************************************
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
  request.addParameterToMultipart("day", day + "")
  const data = await request.loadJSON()
  return data
}

/*
 **************************************
 * 在线获取今日诗词
 **************************************
 */
async function getPoetry() {
  const request = new Request("https://v2.jinrishici.com/sentence")
  const defaultHeaders = {
    "Accept": "*/*",
    "Content-Type": "application/json"
  }
  request.method = 'GET'
  request.headers = defaultHeaders
  const data = await request.loadJSON()
  log("诗词==>" + data.status)
  return data
 }


/*
 **************************************
 * 获取星期几
 **************************************
 */
 function getDayWeekTitle(date) {
  return weekTitle[date.getDay()]
 }


/*
 **************************************
 * 右对齐
 **************************************
 */
function alignRightStack(alignmentStack) {
  let returnStack = alignmentStack.addStack()
  returnStack.layoutHorizontally()
  returnStack.addSpacer()
  return returnStack
}


/*
 **************************************
 * 水平居中
 **************************************
 */
function horizontallyCenterStack(alignmentStack) {
  let returnStack = alignmentStack.addStack()
  returnStack.layoutHorizontally()
  returnStack.centerAlignContent()
  return returnStack
}


/*
 **************************************
 * 垂直居中
 **************************************
 */
function verticallyCenterStack(alignmentStack) {
  let returnStack = alignmentStack.addStack()
  returnStack.layoutVertically()
  returnStack.centerAlignContent()
  return returnStack
}


/*
 **************************************
 * 数字加0
 **************************************
 */
function num2Str(num) {
  if (num < 10) {
    return `0${num}`
  } else {
    return `${num}` 
  }
}

/*
****************************************************************************
* 网络请求获取图片
****************************************************************************
*/
async function getImage(url) {
    const request = new Request(url)
    const data = await request.loadImage()
    return data
}
