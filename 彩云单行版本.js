const env = importModule('Env-lsp.js')
//------------------------------------------------
// 配置区
env.configs.previewSize = "Medium" // 预览大小【小：Small，中：Medium，大：Large】
env.configs.changePicBg = false // 是否需要更换背景
env.configs.colorMode = false // 是否是纯色背景
env.configs.bgColor = new Color("000000") // 小组件背景色
env.configs.topPadding = 2 // 内容区边距
env.configs.leftPadding = 2 // 内容区边距
env.configs.bottomPadding = 2 // 内容区边距
env.configs.rightPadding = 2 // 内容区边距
env.configs.refreshInterval = 10 // 刷新间隔，单位分钟，非精准，会有3-5分钟差距
//////////////////////////////////
const imgStyle = env.imgStyle
const textStyle = env.textStyle
/////////////////////////////////

// 地区
const locale = "zh_cn"

// 彩云天气的apiKey，自己去免费申请：https://caiyunapp.com
const apiKey = ""

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

// 天气是否使用了上次的缓存
let isUsedLastCache = false

// 日程显示条数
const maxSchedules = 1

// 顶部问候语，英文花样文字：https://beizhedenglong.github.io/weird-fonts/
const greetingText = {
  nightGreeting: "𝑇𝑖𝑚𝑒 𝑡𝑜 𝑔𝑒𝑡 𝑙𝑎𝑖𝑑~",
  morningGreeting: "𝐺𝑜𝑜𝑑 𝑚𝑜𝑟𝑛𝑖𝑛𝑔~",
  noonGreeting: "𝐺𝑜𝑜𝑑 𝑛𝑜𝑜𝑛~",
  afternoonGreeting: "𝐺𝑜𝑜𝑑 𝑎𝑓𝑡𝑒𝑟𝑛𝑜𝑜𝑛~",
  eveningGreeting: "𝐺𝑜𝑜𝑑 𝑒𝑣𝑒𝑛𝑖𝑛𝑔~"
}

// 自定义日期对应的问候
const anniversaryText = {
  "1-1": "年之伊始，万事如意~",
  "10-1": "举国同庆，与国同欢~"
}

// 天气对应的icon 
const weatherIcos = {
  CLEAR_DAY: "https://s1.ax1x.com/2020/11/04/BcdaTJ.png", // 晴（白天） CLEAR_DAY
  CLEAR_NIGHT: "https://s1.ax1x.com/2020/10/26/BukPhR.png", // 晴（夜间） CLEAR_NIGHT
  PARTLY_CLOUDY_DAY: "https://s1.ax1x.com/2020/10/26/BuQHN6.png", // 多云（白天）  PARTLY_CLOUDY_DAY
  PARTLY_CLOUDY_NIGHT: "https://s1.ax1x.com/2020/10/26/BukcbF.png", // 多云（夜间）  PARTLY_CLOUDY_NIGHT
  CLOUDY: "https://s1.ax1x.com/2020/10/26/BuAbQ0.png", // 阴（白天）  CLOUDY
  CLOUDY_NIGHT: "https://s1.ax1x.com/2020/10/26/BuEmYd.png", // 阴（夜间）  CLOUDY
  LIGHT_HAZE: "https://s1.ax1x.com/2020/10/26/BuKk34.png", // 轻度雾霾   LIGHT_HAZE
  MODERATE_HAZE: "https://s1.ax1x.com/2020/10/26/BuKk34.png", // 中度雾霾  MODERATE_HAZE
  HEAVY_HAZE: "https://s1.ax1x.com/2020/10/26/BuKk34.png", // 重度雾霾   HEAVY_HAZE
  LIGHT_RAIN: "https://s1.ax1x.com/2020/10/26/BuZTWd.png", // 小雨 LIGHT_RAIN
  MODERATE_RAIN: "https://s1.ax1x.com/2020/10/26/BunhwV.png", // 中雨 MODERATE_RAIN
  HEAVY_RAIN: "https://s1.ax1x.com/2020/10/26/BueSYQ.png", // 大雨  HEAVY_RAIN
  STORM_RAIN: "https://s1.ax1x.com/2020/10/26/BueSYQ.png", // 暴雨 STORM_RAIN
  FOG: "https://s1.ax1x.com/2020/10/26/BueAmV.png", // 雾 FOG
  LIGHT_SNOW: "https://s1.ax1x.com/2020/10/26/BueW1s.png", // 小雪  LIGHT_SNOW
  MODERATE_SNOW: "https://s1.ax1x.com/2020/10/26/BueW1s.png", // 中雪 MODERATE_SNOW
  HEAVY_SNOW: "https://s1.ax1x.com/2020/10/26/BueXcR.png", // 大雪  HEAVY_SNOW
  STORM_SNOW: "https://s1.ax1x.com/2020/10/26/BumM4g.png", // 暴雪 STORM_SNOW
  DUST: "https://s1.ax1x.com/2020/10/26/BumW5D.png", // 浮尘  DUST
  SAND: "https://s1.ax1x.com/2020/10/26/Bunez9.png", // 沙尘  SAND
  WIND: "https://s1.ax1x.com/2020/10/26/BunEiF.png", // 大风  WIND
}

// 默认字体颜色
const defaultTextColor = new Color("ffffff")

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
//------------------------------------------------
// 脚本名字
const name = Script.name()
// 文件
const fm = FileManager.local()
//------------------------------------------------


//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓内容区↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//------------------------------------------------


/****************************小组件内容START****************************/
// 彩云天气信息
const weatherInfo = await getWeather()
// 农历信息
const lunarInfo = await getLunar()


//////////////////////////////////////////
// 内容排版
const widget = new ListWidget()
let contentStack = widget.addStack()
contentStack.layoutVertically()
// 整体内容居中对齐
contentStack.centerAlignContent()
//////////////////////////////////////////


//>>>>>1
let titleStack = env.alignHorizontallyCenterStack(contentStack)
titleStack.addSpacer()
// 天气Icon
// 缓存目录
const weatherImgCachePath = fm.joinPath(fm.documentsDirectory(), "lsp-weatherImg-cache-env")
let weatherImg = undefined
try {
  weatherImg = await env.getImage(weatherInfo.weatherIco)
  fm.writeImage(weatherImgCachePath, weatherImg)
  log(`天气icon写入缓存`)
} catch (e) {
  weatherImg = fm.readImage(weatherImgCachePath)
  log(`读取天气icon缓存`)
}
// 显示天气
imgStyle.stack = titleStack
imgStyle.width = 38
imgStyle.height = 38
imgStyle.img = weatherImg
env.addStyleImg()
// 体感温度
titleStack.addSpacer(4)
const bodyFeelingTemperature = weatherInfo.bodyFeelingTemperature
// 显示体感温度
textStyle.stack = titleStack
textStyle.text = `${bodyFeelingTemperature}°C`
textStyle.lineLimit = 1
textStyle.font = Font.regularSystemFont(21)
textStyle.textColor = defaultTextColor
env.addStyleText()
//////////////////////////////////
// 添加显示符号
textStyle.stack = titleStack
textStyle.marginStart = 6
textStyle.text = `❦`
textStyle.font = Font.systemFont(16)
textStyle.textColor = defaultTextColor
textStyle.lineLimit = 1
env.addStyleText()
// 问候语获取内容
const greeting = provideGreeting(currentDate)
// 添加显示标题  
textStyle.stack = titleStack
textStyle.marginStart = 6
textStyle.text = `${greeting}`
textStyle.font = Font.systemFont(21)
textStyle.textColor = defaultTextColor
textStyle.lineLimit = 1
env.addStyleText()
titleStack.addSpacer()



/////////////////////////////////////////////////////////////
//>>>>>2
// 年月日周
contentStack.addSpacer(4)
let dateStack = env.alignHorizontallyCenterStack(contentStack)
dateStack.addSpacer()
const dateStr = env.getDateStr(currentDate, "MM月dd日 EEE")
// 农历信息
const lunarData = lunarInfo.data[0]
let infoLunarText = lunarData.lunarText
infoLunarText = infoLunarText.substring(5, infoLunarText.length)
// 节假期信息
const lunarHoliday = lunarData.calendarDay.lunarHoliday.key
const solarHoliday = lunarData.calendarDay.solarHoliday.key
// 农历节气
const solarTerm = lunarData.calendarDay.solarTerm
const holidayText = `${lunarHoliday ? "◇ " + lunarHoliday : ""}${solarHoliday ? "◇ " + solarHoliday : ""}${solarTerm ? "◇ " + solarTerm : ""}`
log(`节假日信息：${holidayText}`)
// 显示
textStyle.stack = dateStack
textStyle.text = `${dateStr} ${infoLunarText} ${holidayText}`
textStyle.font = Font.systemFont(15)
textStyle.textColor = new Color("ffcc99", 0.9)
textStyle.lineLimit = 1
env.addStyleText()
dateStack.addSpacer()



/////////////////////////////////////////////////////////////
//>>>>>3
contentStack.addSpacer(8)
let weatherTipsStack = env.alignHorizontallyCenterStack(contentStack)
weatherTipsStack.addSpacer()
// 天气预警、预告信息
const weatherAlertInfo = weatherInfo.alertWeatherTitle
let weatherDesc = weatherInfo.weatherDesc
if (weatherAlertInfo != undefined) {
  weatherDesc = weatherAlertInfo
}
// 添加显示天气预告信息
textStyle.stack = weatherTipsStack
textStyle.text = `Φ ${weatherDesc} ⊙ 指数≒${weatherInfo.comfort} Φ`
textStyle.lineLimit = 1
textStyle.font = Font.systemFont(12)
textStyle.textColor = defaultTextColor
env.addStyleText()
weatherTipsStack.addSpacer()


/////////////////////////////////////////////////////////////
//>>>>>4
contentStack.addSpacer(8)
let infoStack = env.alignHorizontallyCenterStack(contentStack)
infoStack.addSpacer()
const rand = Boolean(Math.round(Math.random()))
// 内容
let contentInfo = undefined
if (rand) {
  // 请求今日诗词
  const poetry = await getPoetry()
  const poetryInfo = poetry.data
  const authorText = `⊱${poetryInfo.origin.dynasty}·${poetryInfo.origin.author}⊰`
  contentInfo = `“${poetryInfo.content.substring(0, poetryInfo.content.length - 1)}” ━ ${authorText}`
} else {
  // 请求丁香医生健康日历
  const dxHealthCalendar = await getDxHealthCalendar()
  contentInfo = `“${dxHealthCalendar}” ━ ⊱丁香医生⊰`
}

// 添加今日tips
// 背景
infoStack.backgroundColor = new Color("666", 0.3)
infoStack.cornerRadius = 4
infoStack.setPadding(6, 6, 6, 6)
// 添加内容
textStyle.stack = infoStack
textStyle.text = contentInfo
textStyle.lineLimit = 1
textStyle.font = Font.lightMonospacedSystemFont(11)
textStyle.textColor = new Color("ffffff", 0.7)
env.addStyleText()
infoStack.addSpacer()



/////////////////////////////////////////////////////////////
//>>>>>5
let useLovelyCache = false
contentStack.addSpacer(8)
let updateStack = env.alignHorizontallyCenterStack(contentStack)
updateStack.addSpacer()

// 显示底部图标栏1
// 缓存目录
let lovelyImgCachePath1 = fm.joinPath(fm.documentsDirectory(), "lsp-lovely1-cache-env")
let lovelyImg1 = undefined
if (useLovelyCache) {
  lovelyImg1 = fm.readImage(lovelyImgCachePath1)
  log(`读取lovely icon缓存`)
} else {
  try {
    lovelyImg1 = await env.getImage("https://s1.ax1x.com/2020/11/05/BWQDOJ.png")
    fm.writeImage(lovelyImgCachePath1, lovelyImg1)
    log(`lovely icon写入缓存`)
  } catch (e) {
    lovelyImg1 = fm.readImage(lovelyImgCachePath1)
    log(`读取lovely icon缓存`)
  }
}
imgStyle.stack = updateStack
imgStyle.width = 18
imgStyle.height = 18
imgStyle.img = lovelyImg1
env.addStyleImg()
updateStack.addSpacer(10)

// 显示底部图标栏2
// 缓存目录
let lovelyImgCachePath2 = fm.joinPath(fm.documentsDirectory(), "lsp-lovely2-cache-env")
let lovelyImg2 = undefined
if (useLovelyCache) {
  lovelyImg2 = fm.readImage(lovelyImgCachePath2)
  log(`读取lovely icon缓存`)
} else {
  try {
    lovelyImg2 = await env.getImage("https://s1.ax1x.com/2020/11/05/BW1yPx.png")
    fm.writeImage(lovelyImgCachePath2, lovelyImg2)
    log(`lovely icon写入缓存`)
  } catch (e) {
    lovelyImg2 = fm.readImage(lovelyImgCachePath2)
    log(`读取lovely icon缓存`)
  }
}
imgStyle.stack = updateStack
imgStyle.width = 18
imgStyle.height = 18
imgStyle.img = lovelyImg2
env.addStyleImg()
updateStack.addSpacer(10)

// 显示底部图标栏3
// 缓存目录
let lovelyImgCachePath3 = fm.joinPath(fm.documentsDirectory(), "lsp-lovely3-cache-env")
let lovelyImg3 = undefined
if (useLovelyCache) {
  lovelyImg3 = fm.readImage(lovelyImgCachePath3)
  log(`读取lovely icon缓存`)
} else {
  try {
    lovelyImg3 = await env.getImage("https://s1.ax1x.com/2020/11/05/BRhoy8.png")
    fm.writeImage(lovelyImgCachePath3, lovelyImg3)
    log(`lovely icon写入缓存`)
  } catch (e) {
    lovelyImg3 = fm.readImage(lovelyImgCachePath3)
    log(`读取lovely icon缓存`)
  }
}
imgStyle.stack = updateStack
imgStyle.width = 18
imgStyle.height = 18
imgStyle.img = lovelyImg3
env.addStyleImg()
updateStack.addSpacer(10)

// 显示底部图标栏4
// 缓存目录
let lovelyImgCachePath4 = fm.joinPath(fm.documentsDirectory(), "lsp-lovely4-cache-env")
let lovelyImg4 = undefined
if (useLovelyCache) {
  lovelyImg4 = fm.readImage(lovelyImgCachePath4)
  log(`读取lovely icon缓存`)
} else {
  try {
    lovelyImg4 = await env.getImage("https://s1.ax1x.com/2020/11/05/BR4pOU.png")
    fm.writeImage(lovelyImgCachePath4, lovelyImg4)
    log(`lovely icon写入缓存`)
  } catch (e) {
    lovelyImg4 = fm.readImage(lovelyImgCachePath4)
    log(`读取lovely icon缓存`)
  }
}
imgStyle.stack = updateStack
imgStyle.width = 18
imgStyle.height = 18
imgStyle.img = lovelyImg4
env.addStyleImg()
updateStack.addSpacer(10)

// 添加更新时间
textStyle.stack = updateStack
textStyle.text = `update at ${env.getDateStr(new Date(), "HH:mm")}`
textStyle.lineLimit = 1
textStyle.font = Font.thinSystemFont(10)
textStyle.textColor = new Color("ffffff", 0.6)
env.addStyleText()
updateStack.addSpacer(6)

// 显示底部图标栏5
// 缓存目录
let lovelyImgCachePath5 = fm.joinPath(fm.documentsDirectory(), "lsp-lovely5-cache-env")
let lovelyImg5 = undefined
if (useLovelyCache) {
  lovelyImg5 = fm.readImage(lovelyImgCachePath5)
  log(`读取lovely icon缓存`)
} else {
  try {
    lovelyImg5 = await env.getImage("https://s1.ax1x.com/2020/11/05/BR4Pw4.png")
    fm.writeImage(lovelyImgCachePath5, lovelyImg5)
    log(`lovely icon写入缓存`)
  } catch (e) {
    lovelyImg5 = fm.readImage(lovelyImgCachePath5)
    log(`读取lovely icon缓存`)
  }
}
imgStyle.stack = updateStack
imgStyle.width = 18
imgStyle.height = 18
imgStyle.img = lovelyImg5
env.addStyleImg()
updateStack.addSpacer(10)

// 显示底部图标栏6
// 缓存目录
let lovelyImgCachePath6 = fm.joinPath(fm.documentsDirectory(), "lsp-lovely6-cache-env")
let lovelyImg6 = undefined
if (useLovelyCache) {
  lovelyImg6 = fm.readImage(lovelyImgCachePath6)
  log(`读取lovely icon缓存`)
} else {
  try {
    lovelyImg6 = await env.getImage("https://s1.ax1x.com/2020/11/05/BR4kk9.png")
    fm.writeImage(lovelyImgCachePath6, lovelyImg6)
    log(`lovely icon写入缓存`)
  } catch (e) {
    lovelyImg6 = fm.readImage(lovelyImgCachePath6)
    log(`读取lovely icon缓存`)
  }
}
imgStyle.stack = updateStack
imgStyle.width = 18
imgStyle.height = 18
imgStyle.img = lovelyImg6
env.addStyleImg()
updateStack.addSpacer(10)

// 显示底部图标栏7
// 缓存目录
let lovelyImgCachePath7 = fm.joinPath(fm.documentsDirectory(), "lsp-lovely7-cache-env")
let lovelyImg7 = undefined
if (useLovelyCache) {
  lovelyImg7 = fm.readImage(lovelyImgCachePath7)
  log(`读取lovely icon缓存`)
} else {
  try {
    lovelyImg7 = await env.getImage("https://s1.ax1x.com/2020/11/05/BR4Ef1.png")
    fm.writeImage(lovelyImgCachePath7, lovelyImg7)
    log(`lovely icon写入缓存`)
  } catch (e) {
    lovelyImg7 = fm.readImage(lovelyImgCachePath7)
    log(`读取lovely icon缓存`)
  }
}
imgStyle.stack = updateStack
imgStyle.width = 18
imgStyle.height = 18
imgStyle.img = lovelyImg7
env.addStyleImg()
updateStack.addSpacer(10)

// 显示底部图标栏8
// 缓存目录
let lovelyImgCachePath8 = fm.joinPath(fm.documentsDirectory(), "lsp-lovely8-cache-env")
let lovelyImg8 = undefined
if (useLovelyCache) {
  lovelyImg8 = fm.readImage(lovelyImgCachePath8)
  log(`读取lovely icon缓存`)
} else {
  try {
    lovelyImg8 = await env.getImage("https://s1.ax1x.com/2020/11/05/BWnaKs.png")
    fm.writeImage(lovelyImgCachePath8, lovelyImg8)
    log(`lovely icon写入缓存`)
  } catch (e) {
    lovelyImg8 = fm.readImage(lovelyImgCachePath8)
    log(`读取lovely icon缓存`)
  }
}
imgStyle.stack = updateStack
imgStyle.width = 18
imgStyle.height = 18
imgStyle.img = lovelyImg8
env.addStyleImg()
updateStack.addSpacer()

/*****************************小组件内容ENd*****************************/


/*
**************************************
* 获取彩云天气
**************************************
*/
async function getWeather() {
  // 缓存目录
  const cachePath = fm.joinPath(fm.documentsDirectory(), "lsp-caiyun-cache-env")
  // 天气数据
  let weatherInfo = {}
  const location = await getLocation()
  log("定位信息：" + location.locality + "·" + location.subLocality)

  // 彩云天气域名
  const url = `https://api.caiyunapp.com/v2.5/${apiKey}/${location.longitude},${location.latitude}/weather.json?alert=true`

  let weatherJsonData = undefined

  try {
    log('请求彩云天气信息')
    weatherJsonData = await env.getJson(url, false)
    // 写入缓存
    fm.writeString(cachePath, JSON.stringify(weatherJsonData))
  } catch (e) {
    isUsedLastCache = true
    const cache = fm.readString(cachePath)
    log(`读取彩云天气缓存数据`)
    weatherJsonData = JSON.parse(cache)
  }

  if (weatherJsonData.status == "ok") {
    log("天气数据请求成功，进行缓存")

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
    let weather = weatherJsonData.result.realtime.skycon
    log("天气状况==>" + weather + "|" + weatherIcos[weather])
    if (hour - 12 >= 7 && weather == "CLOUDY") {
      weather = "CLOUDY_NIGHT"
    }
    weatherInfo.weatherIco = weatherIcos[weather]

    // 天气描述
    const weatherDesc = weatherJsonData.result.forecast_keypoint
    log("天气描述==>" + weatherDesc)
    weatherInfo.weatherDesc = weatherDesc.replace("。还在加班么？", "，")

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
* 获取定位
**************************************
*/
async function getLocation() {
  if (!lockLocation) {
    locationData = env.getLocation()
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
      let timeText = "▷" + startHour + ":" + startMinute + "→" + endHour + ":" + endMinute
      if (schedule.isAllDay) {
        timeText = "▷全天"
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
  // 缓存目录
  const cachePath = fm.joinPath(fm.documentsDirectory(), "lsp-lunar-cache-env")

  let dateString = env.getDateStr(new Date(), "yyyy-MM-dd")
  const url = `http://calendar.netcore.show/api/day/days?day=${dateString}`
  let data = undefined

  if (env.useCache(cachePath)) {
    const cache = fm.readString(cachePath)
    log(`刷新间隔触发，读取农历缓存数据`)
    data = JSON.parse(cache)
  } else {
    try {
      data = await env.getJson(url)
      // 缓存数据
      fm.writeString(cachePath, JSON.stringify(data))
      log(`农历信息请求成功，数据缓存`)
    } catch (e) {
      const cache = fm.readString(cachePath)
      log(`读取农历缓存数据`)
      data = JSON.parse(cache)
    }
  }

  return data
}

/*
**************************************
* 在线获取今日诗词
**************************************
*/
async function getPoetry() {
  // 缓存目录
  const cachePath = fm.joinPath(fm.documentsDirectory(), "lsp-poetry-cache-env")
  let data = undefined

  try {
    data = await env.getJson("https://v2.jinrishici.com/sentence")
    // 缓存数据
    fm.writeString(cachePath, JSON.stringify(data))
    log(`今日诗词：${data.status}，数据缓存`)
  } catch (e) {
    const cache = fm.readString(cachePath)
    log(`读取今日诗词缓存数据`)
    data = JSON.parse(cache)
  }

  return data
}

/*
**************************************
* 获取丁香医生健康日历
**************************************
*/
async function getDxHealthCalendar() {
  const url = 'https://dxy.com/app/i/ask/discover/todayfeed/healthcalendar'

  // 缓存目录
  const cachePath = fm.joinPath(fm.documentsDirectory(), "lsp-dx-cache-env")
  let data = undefined

  try {
    data = await env.getJson(url)
    // 缓存数据
    fm.writeString(cachePath, JSON.stringify(data))
    log(`丁香日历：${data}，数据缓存`)
  } catch (e) {
    const cache = fm.readString(cachePath)
    log(`读取丁香日历缓存数据`)
    data = JSON.parse(cache)
  }

  return data.data.items[0].title.replace('[丁香医生] ', '')
}



/*
**************************************
* 按照时间获取问候语
**************************************
*/
function provideGreeting(date) {
  // 月份
  const month = currentDate.getMonth() + 1
  // 日期
  const day = currentDate.getDate()
  // 小时
  const hour = date.getHours()
  // 纪念日子
  let anniversary = anniversaryText[`${month}-${day}`]
  if (anniversary == undefined) {
    if (hour < 5) { return greetingText.nightGreeting }
    if (hour < 11) { return greetingText.morningGreeting }
    if (hour >= 11 && hour - 12 <= 1) { return greetingText.noonGreeting }
    if (hour - 12 < 7) { return greetingText.afternoonGreeting }
    if (hour - 12 < 10) { return greetingText.eveningGreeting }
    return greetingText.nightGreeting
  } else {
    return anniversary
  }
}


//------------------------------------------------
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑内容区↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

//------------------------------------------------
// 运行脚本、预览
widget.refreshAfterDate = new Date(+new Date + 1000 * 30)
await env.run(name, widget)
//------------------------------------------------