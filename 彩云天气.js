//------------------------------------------------
const env = importModule('Env-lsp.js')
//------------------------------------------------
// 配置区
env.configs.previewSize = "Medium" // 预览大小【小：Small，中：Medium，大：Large】
env.configs.changePicBg = true // 是否需要更换背景
env.configs.colorMode = false // 是否是纯色背景
env.configs.bgColor = new Color("000000") // 小组件背景色
env.configs.topPadding = 4 // 内容区边距
env.configs.leftPadding = 4 // 内容区边距
env.configs.bottomPadding = 0 // 内容区边距
env.configs.rightPadding = 4 // 内容区边距
//env.configs.refreshInterval = 20 // 刷新间隔，单位分钟，非精准，会有3-5分钟差距
//////////////////////////////////
const imgStyle = env.imgStyle
const textStyle = env.textStyle
/////////////////////////////////

// 地区
const locale = "zh_cn"

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

// 日程显示条数
const maxSchedules = 1

// 顶部问候语，英文花样文字：https://beizhedenglong.github.io/weird-fonts/
const greetingText = {
  nightGreeting: "🦉 𝑇𝑖𝑚𝑒 𝑡𝑜 𝑔𝑒𝑡 𝑙𝑎𝑖𝑑~",
  morningGreeting: "💫 𝐺𝑜𝑜𝑑 𝑚𝑜𝑟𝑛𝑖𝑛𝑔~",
  noonGreeting: "🥳 𝐺𝑜𝑜𝑑 𝑛𝑜𝑜𝑛~",
  afternoonGreeting: "🐡 𝐺𝑜𝑜𝑑 𝑎𝑓𝑡𝑒𝑟𝑛𝑜𝑜𝑛~",
  eveningGreeting: "🐳 𝐺𝑜𝑜𝑑 𝑒𝑣𝑒𝑛𝑖𝑛𝑔~"
}

// 天气对应的icon 
// 天气对应的icon 
const weatherIcos = {
    CLEAR_DAY: "https://s1.ax1x.com/2020/10/26/Bukd4s.png", // 晴（白天） CLEAR_DAY
    CLEAR_NIGHT: "https://s1.ax1x.com/2020/10/26/BukPhR.png", // 晴（夜间） CLEAR_NIGHT
    PARTLY_CLOUDY_DAY: "https://s1.ax1x.com/2020/10/26/BuQHN6.png", // 多云（白天）  PARTLY_CLOUDY_DAY
    PARTLY_CLOUDY_NIGHT: "https://s1.ax1x.com/2020/10/26/BukcbF.png", // 多云（夜间）  PARTLY_CLOUDY_NIGHT
    CLOUDY: "https://s1.ax1x.com/2020/10/26/BuAbQ0.png", // 阴（白天）  CLOUDY
    CLOUDY_NIGHT:"https://s1.ax1x.com/2020/10/26/BuEmYd.png", // 阴（夜间）  CLOUDY
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
// 日程信息
const showSchedules = await getSchedules()


//////////////////////////////////////////
// 内容排版
const widget = new ListWidget()
let contentStack = widget.addStack()
contentStack.layoutHorizontally()
// 整体内容居中对齐
contentStack.centerAlignContent()
//////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////
// 左侧内容
let leftStack = contentStack.addStack()
leftStack.layoutVertically()

//////////////////////////////////////////
// 问候
let titleStack = env.alignHorizontallyCenterStack(leftStack)
// 问候语获取内容
const greeting = provideGreeting(currentDate)
// 添加显示标题  
textStyle.stack = titleStack
textStyle.text = greeting
textStyle.font = Font.systemFont(22)
textStyle.textColor = defaultTextColor
env.addStyleText()


//////////////////////////////////////////
// 年月日周
const dateStr = getDateStr(currentDate)
// 显示
textStyle.stack = leftStack
textStyle.marginStart = 2
textStyle.text = dateStr
textStyle.font = Font.systemFont(16)
textStyle.textColor = new Color("ffcc99")
env.addStyleText()


//////////////////////////////////////////
// 星期几 / 农历日期
const weekDayColor = new Color("ffffff", 0.9)
leftStack.addSpacer(2)
let dateStack = env.alignHorizontallyCenterStack(leftStack)

// 农历信息
const lunarData = lunarInfo.data[0]
let infoLunarText = lunarData.lunarText
infoLunarText = infoLunarText.substring(5, infoLunarText.length)
// 节假期信息
const lunarHoliday = lunarData.calendarDay.lunarHoliday.key
const solarHoliday = lunarData.calendarDay.solarHoliday.key
// 农历节气
const solarTerm = lunarData.calendarDay.solarTerm
// 下一个节气的时间间隔
const solarTermDays = lunarData.calendarDay.solarTermDays
const holidayText = `${lunarHoliday ? lunarHoliday+"◇" : ""}${solarHoliday ? solarHoliday+"◇" : ""}${solarTerm ? solarTerm : ""}`
log(`节假日信息：${holidayText}`)
// 添加显示农历
textStyle.stack = dateStack
textStyle.text = `${infoLunarText} ${holidayText}`
textStyle.font = Font.systemFont(14)
textStyle.textColor = weekDayColor
env.addStyleText()

// 电池信息
dateStack.addSpacer(4)
const batteryLevel = Device.batteryLevel() * 100
const batteryStr = `〓${getBatteryLevel()}〓`
// 添加显示电池具体信息
textStyle.stack = dateStack
textStyle.text = batteryStr
textStyle.font = Font.systemFont(14)
textStyle.textColor = weekDayColor
env.addStyleText()


//////////////////////////////////////////
// 天气预警、预告信息
const weatherAlertInfo = weatherInfo.alertWeatherTitle 
let weatherDesc = weatherInfo.weatherDesc
if (weatherAlertInfo != undefined) {
  weatherDesc = weatherAlertInfo
}
// 添加显示天气预告信息
textStyle.stack = leftStack
textStyle.marginStart = 3
textStyle.text = weatherDesc
textStyle.lineLimit = 1
textStyle.font = Font.systemFont(12)
textStyle.textColor = defaultTextColor
env.addStyleText()


//////////////////////////////////////////
// 日程、诗词
const schedulePoetryColor = new Color("ffffff", 0.7)
const scheduleSize = showSchedules.length
if (scheduleSize > 0) {
  leftStack.addSpacer(1)
  // 添加分割线
  textStyle.stack = leftStack
  textStyle.marginStart = 1
  textStyle.text = "---------------------------------------"
  textStyle.lineLimit = 1
  textStyle.font = Font.systemFont(10)
  textStyle.textColor = schedulePoetryColor
  env.addStyleText()
  // 添加日程
  leftStack.addSpacer(2)
  let scheduleIndex = 0
  for (let schedule of showSchedules) {
    // 索引值
    scheduleIndex++
    if (scheduleIndex > maxSchedules) {
      return
    }

    const scheduleStack = env.alignHorizontallyCenterStack(leftStack)
    // 图片
    const img = SFSymbol.named("rosette").image 
    // 展示ico
    imgStyle.stack = scheduleStack
    imgStyle.width = 15
    imgStyle.height = 15
    imgStyle.img = img
    imgStyle.tintColor = schedulePoetryColor
    env.addStyleImg()
    scheduleStack.addSpacer(4)

    // 日程标题
    textStyle.stack = scheduleStack
    textStyle.text = schedule.title
    textStyle.lineLimit = 1
    textStyle.font = Font.systemFont(11)
    textStyle.textColor = schedulePoetryColor
    env.addStyleText()

    // 开始时间
    leftStack.addSpacer(2)
    const scheduleTimeStack = leftStack.addStack()
    scheduleTimeStack.layoutHorizontally()
    scheduleTimeStack.addSpacer(18)
    // 展示时间
    textStyle.stack = scheduleTimeStack
    textStyle.text = schedule.timeText
    textStyle.lineLimit = 1
    textStyle.font = Font.systemFont(10)
    textStyle.textColor = schedulePoetryColor
    env.addStyleText()
  }
} else {
  // 请求今日诗词
  const poetry = await getPoetry()

  // 添加今日诗词
  leftStack.addSpacer(4)
  const poetryStack = leftStack.addStack()
  // 诗词背景
  poetryStack.backgroundColor = new Color("666", 0.5)
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
  textStyle.stack = poetryInfoStack
  textStyle.text = potryContent
  textStyle.lineLimit = 1
  textStyle.font = Font.systemFont(11)
  textStyle.textColor = schedulePoetryColor
  env.addStyleText()

  // 添加作者
  const authStack = poetryStack.addStack()
  authStack.layoutHorizontally()
  authStack.addSpacer()
  // 显示作者
  const authorText = `⊱${poetryInfo.origin.dynasty}·${poetryInfo.origin.author}⊰`
  textStyle.stack = authStack
  textStyle.text = authorText
  textStyle.lineLimit = 1
  textStyle.font = Font.systemFont(11)
  textStyle.textColor = schedulePoetryColor
  env.addStyleText()
  //////
  authStack.addSpacer(4)
  poetryStack.addSpacer(4)
}

////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////
// 右侧内容
contentStack.addSpacer()
let rightStack = contentStack.addStack()
// 写死右侧宽度
rightStack.size = new Size(115, 0)
rightStack.layoutVertically()
//////////////////////////////////////////


//////////////////////////////////////////
// 天气Icon
const weatherStack = env.alignRightStack(rightStack)
weatherStack.bottomAlignContent()
// 缓存目录
const weatherImgCachePath = fm.joinPath(fm.documentsDirectory(), "env-lsp-weatherImg-cache")
let weatherImg = undefined
try {
  weatherImg = await env.getImage(weatherInfo.weatherIco)
  fm.writeImage(weatherImgCachePath, weatherImg)
  log(`天气icon写入缓存`)
} catch(e) {
  weatherImg = fm.readImage(weatherImgCachePath)
  log(`读取天气icon缓存`)
}

// 显示天气
imgStyle.stack = weatherStack
imgStyle.width = 35
imgStyle.height = 35
imgStyle.img = weatherImg
env.addStyleImg()
// 体感温度
weatherStack.addSpacer(4)
const bodyFeelingTemperature = weatherInfo.bodyFeelingTemperature
// 显示体感温度
textStyle.stack = weatherStack
textStyle.text = `${bodyFeelingTemperature}°C`
textStyle.lineLimit = 1
textStyle.font = Font.boldMonospacedSystemFont(23)
textStyle.textColor = defaultTextColor
env.addStyleText()
//////////////////////////////////////////

// 相对湿度
if (weatherControl.HUMIDITY) {
  rightStack.addSpacer(4)
  const humidityStack = env.alignRightStack(rightStack)
  // 显示
  textStyle.stack = humidityStack
  textStyle.text = `相对湿度：${weatherInfo.humidity}`
  textStyle.lineLimit = 1
  textStyle.font = Font.systemFont(11)
  textStyle.textColor = defaultTextColor
  env.addStyleText()
}

//////////////////////////////////////////
// 舒适指数
if (weatherControl.COMFORT) {
  rightStack.addSpacer(1)
  const comfortStack = env.alignRightStack(rightStack)
  // 显示
  textStyle.stack = comfortStack
  textStyle.text = `舒适指数：${weatherInfo.comfort}`
  textStyle.lineLimit = 1
  textStyle.font = Font.systemFont(11)
  textStyle.textColor = defaultTextColor
  env.addStyleText()
}

//////////////////////////////////////////
// 紫外线指数
if (weatherControl.ULTRAVIOLET) {
  rightStack.addSpacer(1)
  const ultravioletStack = env.alignRightStack(rightStack)
  // 显示
  textStyle.stack = ultravioletStack
  textStyle.text = `紫外线：${weatherInfo.ultraviolet}`
  textStyle.lineLimit = 1
  textStyle.font = Font.systemFont(11)
  textStyle.textColor = defaultTextColor
  env.addStyleText()
}

//////////////////////////////////////////
// 空气质量
if (weatherControl.AQI) {
  rightStack.addSpacer(1)
  const aqiInfoStack = env.alignRightStack(rightStack)
  // 显示
  textStyle.stack = aqiInfoStack
  textStyle.marginStart = 8
  textStyle.text = `空气质量：${weatherInfo.aqiInfo}`
  textStyle.lineLimit = 1
  textStyle.font = Font.systemFont(11)
  textStyle.textColor = defaultTextColor
  env.addStyleText()
}

//////////////////////////////////////////
// 高低温
if (weatherControl.HEIGHT_LOW) {
  const minTemperature = weatherInfo.minTemperature
  const maxTemperature = weatherInfo.maxTemperature
  // 右对齐
  rightStack.addSpacer(3)
  const tempStack = env.alignRightStack(rightStack)
  // 显示箭头
  textStyle.stack = tempStack
  textStyle.text = `↑`
  textStyle.lineLimit = 1
  textStyle.font = Font.systemFont(10)
  textStyle.textColor = new Color("ff0000")
  env.addStyleText()
  // 高温温度
  tempStack.addSpacer(2)
  textStyle.stack = tempStack
  textStyle.text = `${weatherInfo.maxTemperature}°`
  textStyle.lineLimit = 1
  textStyle.font = Font.systemFont(10)
  textStyle.textColor = defaultTextColor
  env.addStyleText()
  // 低温箭头
  tempStack.addSpacer(6)
  textStyle.stack = tempStack
  textStyle.text = `↓`
  textStyle.lineLimit = 1
  textStyle.font = Font.systemFont(10)
  textStyle.textColor = new Color("2bae85")
  env.addStyleText()
  // 低温温度
  tempStack.addSpacer(2)
  textStyle.stack = tempStack
  textStyle.text = `${weatherInfo.minTemperature}°`
  textStyle.lineLimit = 1
  textStyle.font = Font.systemFont(10)
  textStyle.textColor = defaultTextColor
  env.addStyleText()
}

//////////////////////////////////////////
// 日出
if (weatherControl.SUNRISE_SUNSET) {
  let symbolStack = rightStack.addStack()
  symbolStack.layoutHorizontally()
  symbolStack.addSpacer()
  symbolStack.bottomAlignContent()
  // 添加日出icon
  let sunriseImg = SFSymbol.named("sunrise.fill").image
  imgStyle.stack = symbolStack
  imgStyle.width = 15
  imgStyle.height = 15
  imgStyle.img = sunriseImg
  env.addStyleImg()
  symbolStack.addSpacer(4)
  // 日出时间 / 样式
  textStyle.stack = symbolStack
  textStyle.text = weatherInfo.sunrise
  textStyle.lineLimit = 1
  textStyle.font = Font.systemFont(10)
  textStyle.textColor = defaultTextColor
  env.addStyleText()
  //***********************//
  // 日落
  symbolStack.addSpacer(6)
  // 添加日落icon
  let sunsetImg = SFSymbol.named("sunset.fill").image
  imgStyle.stack = symbolStack
  imgStyle.width = 15
  imgStyle.height = 15
  imgStyle.img = sunsetImg
  env.addStyleImg()
  symbolStack.addSpacer(4)
  // 日落时间 / 样式
  textStyle.stack = symbolStack
  textStyle.text = weatherInfo.sunset
  textStyle.lineLimit = 1
  textStyle.font = Font.systemFont(10)
  textStyle.textColor = defaultTextColor
  env.addStyleText()
}

//////////////////////////////////////////
// 天气更新时间
if (weatherControl.UPDATE_TIME) {
  // 更新时间
  rightStack.addSpacer(3)
  const updateTimeStack = env.alignRightStack(rightStack)
  textStyle.stack = updateTimeStack
  textStyle.text = `上次更新 → ${getDateStr(new Date(), "HH:mm")}`
  textStyle.lineLimit = 1
  textStyle.font = Font.systemFont(8)
  textStyle.textColor = new Color("ffffff", 0.8)
  env.addStyleText()
}

/*****************************小组件内容ENd*****************************/


/*
 **************************************
 * 获取彩云天气
 **************************************
 */
async function getWeather() {
  // 缓存目录
  const cachePath = fm.joinPath(fm.documentsDirectory(), "lsp-weather-caiyun-cache")
  // 天气数据
  let weatherInfo = {}
  const location = await getLocation()
  log("定位信息：" + location.locality + "·" + location.subLocality)
  
  // 彩云天气域名
  const DOMAIN = `https://api.caiyunapp.com/v2.5/${apiKey}/${location.longitude},${location.latitude}/weather.json?alert=true`
  let weatherJsonData = undefined
  try {
    weatherJsonData = await env.getJson(DOMAIN)
  } catch (e) {
    const cache = fm.readString(cachePath)
    log(`读取彩云天气缓存数据：${cache}`)
    weatherJsonData = JSON.parse(cache)
  }

  if (weatherJsonData.status == "ok") {
    log("天气数据请求成功，进行缓存")
    
    // 写入缓存
    fm.writeString(cachePath, JSON.stringify(weatherJsonData))

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
  const cachePath = fm.joinPath(fm.documentsDirectory(), "env-lsp-lunar-cache")

  let dateString = getDateStr(new Date(), "yyyy-MM-dd")
  const url = `http://calendar.netcore.show/api/day/days?day=${dateString}`
  let data = undefined

  try {
    data = await env.getJson(url)
    // 缓存数据
    fm.writeString(cachePath, JSON.stringify(data))
    log(`农历信息请求成功，数据缓存`)
  } catch (e) {
    const cache = fm.readString(cachePath)
    log(`读取农历缓存数据：${cache}`)
    data = JSON.parse(cache)
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
  const cachePath = fm.joinPath(fm.documentsDirectory(), "env-lsp-poetry-cache")
  let data = undefined

  try {
    data = await env.getJson("https://v2.jinrishici.com/sentence")
    // 缓存数据
    fm.writeString(cachePath, JSON.stringify(data))
    log(`今日诗词：${data.status}，数据缓存`)
  } catch (e) {
    const cache = fm.readString(cachePath)
    log(`读取今日诗词缓存数据：${cache}`)
    data = JSON.parse(cache)
  }

  
  return data
}


/*
 **************************************
 * 格式化时间
 **************************************
 */
function getDateStr(date, formatter = "yyyy年MM月d日 EEE") {
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
  if (hour    >= 11 && hour-12 <= 1)  { return greetingText.noonGreeting }
  if (hour-12 < 7)  { return greetingText.afternoonGreeting }
  if (hour-12 < 10) { return greetingText.eveningGreeting }
  return greetingText.nightGreeting
}


//------------------------------------------------
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑内容区↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

//------------------------------------------------
// 运行脚本、预览
await env.run(name, widget)
//------------------------------------------------
