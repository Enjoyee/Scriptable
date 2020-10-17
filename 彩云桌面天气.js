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
const apiKey = ""

// 默认的定位信息，定位失败的时候默认读取
// https://open.caiyunapp.com/File:Adcode-release-2020-06-10.xlsx.zip
// 上述链接查看对应地区的详细经纬度
let locationData = {
  "latitude": undefined,
  "longitude": undefined,
  "locality": "",
  "subLocality": ""
}
// 锁定地区，直接使用上述填写的地址信息不进行定位
const lockLocation = false

// 是否需要选择图片背景
const changePicBg = false

// 内容区左右边距
const padding = {
  top: 0,
  left: 0,
  bottom: 0,
  right: 0
}

// 顶部问候语，英文花样文字：https://beizhedenglong.github.io/weird-fonts/
const greetingText = {
  nightGreeting: "🦉 𝔗𝔦𝔪𝔢 𝔱𝔬 𝔤𝔢𝔱 𝔩𝔞𝔦𝔡~",
  morningGreeting: "💫 𝔊𝔬𝔬𝔡 𝔪𝔬𝔯𝔫𝔦𝔫𝔤~",
  noonGreeting: "🥳 𝔊𝔬𝔬𝔡 𝔫𝔬𝔬𝔫~",
  afternoonGreeting: "🐡 𝔊𝔬𝔬𝔡 𝔞𝔣𝔱𝔢𝔯𝔫𝔬𝔬𝔫~",
  eveningGreeting: "🐳 𝔊𝔬𝔬𝔡 𝔢𝔳𝔢𝔫𝔦𝔫𝔤~"
}

// 天气对应的icon 
const weatherIcos = {
  SUNRISE: "sunrise.fill", // 日出
  CLEAR_DAY: "sun.max.fill", // 晴（白天） CLEAR_DAY
  CLEAR_NIGHT: "sun.min.fill", // 晴（夜间） CLEAR_NIGHT
  PARTLY_CLOUDY_DAY: "cloud.sun.fill", // 多云（白天）  PARTLY_CLOUDY_DAY
  PARTLY_CLOUDY_NIGHT: "cloud.sun.fill", // 多云（夜间）  PARTLY_CLOUDY_NIGHT
  CLOUDY: "cloud.fill", // 阴  CLOUDY
  LIGHT_HAZE: "sun.haze.fill", // 轻度雾霾   LIGHT_HAZE
  MODERATE_HAZE: "sun.haze.fill", // 中度雾霾  MODERATE_HAZE
  HEAVY_HAZE: "sun.haze.fill", // 重度雾霾   HEAVY_HAZE
  LIGHT_RAIN: "cloud.drizzle.fill", // 小雨 LIGHT_RAIN
  MODERATE_RAIN: "cloud.rain.fill", // 中雨 MODERATE_RAIN
  HEAVY_RAIN: "cloud.rain.fill", // 大雨  HEAVY_RAIN
  STORM_RAIN: "cloud.heavyrain.fill", // 暴雨 STORM_RAIN
  FOG: "cloud.fog.fill", // 雾 FOG
  LIGHT_SNOW: "cloud.snow.fill", // 小雪  LIGHT_SNOW
  MODERATE_SNOW: "cloud.snow.fill", // 中雪 MODERATE_SNOW
  HEAVY_SNOW: "cloud.snow.fill", // 大雪  HEAVY_SNOW
  STORM_SNOW: "wind.snow.fill", // 暴雪 STORM_SNOW
  DUST: "cloud.dust.fill", // 浮尘  DUST
  SAND: "cloud.dust.fill", // 沙尘  SAND
  WIND: "cloud.wind.fill", // 大风  WIND
  SUNSET: "sunset.fill", // 日落
}

// 电池对应的icon 
const batteryIcos = {
  BATTERY_NORMAL: "battery.100",
  BATTERY_CHARGING: "battery.100.bolt",
  BATTERY_LOWER: "battery.25",
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

/*
 ****************************************************************************
 ****************************************************************************
 ****************************************************************************
 */


/********************************************************************/
/****************************定义小组件****************************/
/********************************************************************/
const filename = Script.name() + ".jpg"
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
// const showSchedules = getSchedules()
// // 提醒事项
// const showReminders = getReminders()


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
let titleStack = leftStack.addStack()
titleStack.layoutHorizontally()
titleStack.centerAlignContent()
// 问候语获取内容
const greeting = provideGreeting(currentDate)
textStyle.stack = titleStack
textStyle.topMargin = 0
textStyle.text = greeting
textStyle.font = Font.systemFont(22)
textStyle.textColor = defaultTextColor
// 添加显示标题
addText(textStyle)

//////////////////////////////////////////
// 年月日样式
textStyle.stack = leftStack
textStyle.topMargin = 3
textStyle.text = getDateStr(currentDate)
textStyle.font = Font.systemFont(16)
textStyle.textColor = new Color("#ffcc99")
// 添加显示日期
addText(textStyle)

//////////////////////////////////////////
// 星期几 / 农历日期
leftStack.addSpacer(2)
let dateStack = leftStack.addStack()
dateStack.layoutHorizontally()
dateStack.centerAlignContent()
// 样式
textStyle.stack = dateStack
textStyle.topMargin = 0
textStyle.text = getDayWeekTitle(currentDate)
textStyle.font = Font.systemFont(16)
textStyle.textColor = new Color("#ffffff", 0.8)
// 添加显示星期几
addText(textStyle)
dateStack.addSpacer(4)
// 农历信息
let infoLunarText = lunarInfo.data.lunar
infoLunarText = infoLunarText.substring(12, infoLunarText.length)
// 样式
textStyle.stack = dateStack
textStyle.topMargin = 0
textStyle.text = infoLunarText
textStyle.font = Font.systemFont(16)
textStyle.textColor = new Color("#ffffff", 0.8)
// 添加显示农历
addText(textStyle)
// 电池信息
const batteryLevel = Device.batteryLevel() * 100
const batteryStr = `〓 ${getBatteryLevel()} 〓`
// 电池具体信息 / 样式
textStyle.stack = dateStack
textStyle.topMargin = 0
textStyle.text = batteryStr
textStyle.font = Font.systemFont(14)
textStyle.textColor = new Color("#ffffff", 0.8)
// 添加显示电池具体信息
addText(textStyle)


//////////////////////////////////////////
// 添加天气预告信息
const weatherAlertInfo = weatherInfo.alertWeatherTitle 
let weatherDesc = weatherInfo.weatherDesc
if (weatherAlertInfo != undefined) {
  weatherDesc = weatherAlertInfo
}
// 样式
textStyle.stack = leftStack
textStyle.topMargin = 4
textStyle.text = weatherDesc
textStyle.lineLimit = 1
textStyle.font = Font.systemFont(12)
textStyle.textColor = new Color("#ffffff", 0.8)
// 添加天气预告信息
addText(textStyle)

//////////////////////////////////////////
// 添加今日诗词
leftStack.addSpacer(3)
const poetryStack = leftStack.addStack()
poetryStack.backgroundColor = new Color("#666", 0.5)
poetryStack.cornerRadius = 4
poetryStack.layoutVertically()
poetryStack.addSpacer(2)
const poetryInfo = poetry.data
// 样式
textStyle.stack = poetryStack
textStyle.topMargin = 0
textStyle.text = `“${poetryInfo.content.substring(0, poetryInfo.content.length - 1)}”`
textStyle.lineLimit = 1
textStyle.font = Font.systemFont(12)
textStyle.textColor = new Color("#ffffff", 0.7)
// 添加显示诗词
addText(textStyle)
// 重置行数控制
textStyle.lineLimit = 0
// 添加作者
const authStack = poetryStack.addStack()
authStack.layoutHorizontally()
authStack.addSpacer()
// 作者样式
textStyle.stack = authStack
textStyle.topMargin = 0
textStyle.text = `⊱${poetryInfo.origin.dynasty}·${poetryInfo.origin.author}⊰`
textStyle.lineLimit = 1
textStyle.font = Font.systemFont(11)
textStyle.textColor = new Color("#ffffff", 0.7)
// 显示作者
addText(textStyle)
authStack.addSpacer(20)
poetryStack.addSpacer(2)
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
let weatherImg = getWeatherIco(weatherInfo.weatherIco)
// 样式
imgStyle.stack = weatherStack
imgStyle.topMargin = 0
imgStyle.img = weatherImg
imgStyle.width = 32
imgStyle.length = 32
// 显示天气
addImg(imgStyle)
// 体感温度
weatherStack.addSpacer(4)
const bodyFeelingTemperature = weatherInfo.bodyFeelingTemperature
textStyle.stack = weatherStack
textStyle.topMargin = 0
textStyle.text = `${bodyFeelingTemperature}°C`
textStyle.font = Font.boldMonospacedSystemFont(20)
textStyle.textColor = defaultTextColor
addText(textStyle)
//////////////////////////////////////////

// 相对湿度
rightStack.addSpacer(4)
const humidityStack = alignRightStack(rightStack)
textStyle.stack = humidityStack
textStyle.topMargin = 0
textStyle.text = `相对湿度：${weatherInfo.humidity}`
textStyle.font = Font.systemFont(11)
textStyle.textColor = defaultTextColor
addText(textStyle)

//////////////////////////////////////////
// 舒适指数
rightStack.addSpacer(1)
const comfortStack = alignRightStack(rightStack)
textStyle.stack = comfortStack
textStyle.topMargin = 0
textStyle.text = `舒适指数：${weatherInfo.comfort}`
textStyle.font = Font.systemFont(11)
textStyle.textColor = defaultTextColor
addText(textStyle)

//////////////////////////////////////////
// 紫外线指数
rightStack.addSpacer(1)
const ultravioletStack = alignRightStack(rightStack)
textStyle.stack = ultravioletStack
textStyle.topMargin = 0
textStyle.text = `紫外线：${weatherInfo.ultraviolet}`
textStyle.font = Font.systemFont(11)
textStyle.textColor = defaultTextColor
addText(textStyle)

//////////////////////////////////////////
// 空气质量
rightStack.addSpacer(1)
const aqiInfoStack = alignRightStack(rightStack)
textStyle.stack = aqiInfoStack
textStyle.topMargin = 8
textStyle.text = `空气质量：${weatherInfo.aqiInfo}`
textStyle.font = Font.systemFont(11)
textStyle.textColor = defaultTextColor
addText(textStyle)


//////////////////////////////////////////
// 高低温
const minTemperature = weatherInfo.minTemperature
const maxTemperature = weatherInfo.maxTemperature
// 右对齐
rightStack.addSpacer(3)
const tempStack = alignRightStack(rightStack)
// 高温
textStyle.stack = tempStack
textStyle.topMargin = 0
textStyle.text = `↑`
textStyle.font = Font.systemFont(10)
textStyle.textColor = new Color("#ff0000")
addText(textStyle)
textStyle.text = `${weatherInfo.maxTemperature}°`
textStyle.textColor = defaultTextColor
addText(textStyle)
// 低温
tempStack.addSpacer(6)
textStyle.stack = tempStack
textStyle.topMargin = 0
textStyle.text = `↓`
textStyle.font = Font.systemFont(10)
textStyle.textColor = new Color("#2bae85")
addText(textStyle)
textStyle.text = `${weatherInfo.minTemperature}°`
textStyle.textColor = defaultTextColor
addText(textStyle)


//////////////////////////////////////////
// 日出
rightStack.addSpacer(2)
let symbolStack = rightStack.addStack()
symbolStack.layoutHorizontally()
symbolStack.addSpacer()
symbolStack.bottomAlignContent()
// 添加日出icon
let sunriseImg = getWeatherIco(weatherIcos.SUNRISE)
// 样式
imgStyle.stack = symbolStack
imgStyle.topMargin = 0
imgStyle.img = sunriseImg
imgStyle.width = 15
imgStyle.length = 15
addImg(imgStyle)
symbolStack.addSpacer(4)
// 日出时间 / 样式
textStyle.stack = symbolStack
textStyle.topMargin = 0
textStyle.text = weatherInfo.sunrise
textStyle.font = Font.systemFont(10)
textStyle.textColor = defaultTextColor
addText(textStyle)
//***********************//
// 日落
symbolStack.addSpacer(4)
// 添加日落icon
let sunsetImg = getWeatherIco(weatherIcos.SUNSET)
// 样式
imgStyle.stack = symbolStack
imgStyle.topMargin = 0
imgStyle.img = sunsetImg
imgStyle.width = 15
imgStyle.length = 15
addImg(imgStyle)
symbolStack.addSpacer(4)
// 日落时间 / 样式
textStyle.stack = symbolStack
textStyle.topMargin = 0
textStyle.text = weatherInfo.sunset
textStyle.font = Font.systemFont(10)
textStyle.textColor = defaultTextColor
addText(textStyle)
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
  if (hour-12 < 6)  { return greetingText.afternoonGreeting }
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
    const humidity = (weatherJsonData.result.realtime.humidity * 100) + "%"
    log("相对湿度==>" + humidity)
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
    let timeText = startHour + ":" + startMinute + " → " + endHour + ":" + endMinute
    if (schedule.isAllDay) {
      timeText = "全天"
    }

    // 构造格式后的日程
    scheduleObj.title = schedule.title
    scheduleObj.timeText = schedule.timeText 
    log(">>日程：" + scheduleObj.title + "==>" + scheduleObj.timeText)
    showSchedules.push(scheduleObj)
  }
  }
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
 * 获取电池对应的icon
 **************************************
 */
function getBatteryIco(batteryKey) {
  return SFSymbol.named(batteryKey).image
}


/*
 **************************************
 * 获取天气对应的icon
 **************************************
 */
function getWeatherIco(weatherKey) {
  return SFSymbol.named(weatherKey).image
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