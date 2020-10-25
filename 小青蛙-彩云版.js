//------------------------------------------------
const env = importModule('Env-lsp.js')
//------------------------------------------------
// 配置区
env.configs.previewSize = "Large" // 预览大小【小：Small，中：Medium，大：Large】
env.configs.changePicBg = false // 是否需要更换背景
env.configs.colorMode = false // 是否是纯色背景
env.configs.bgColor = new Color("000000") // 小组件背景色
env.configs.topPadding = 0 // 内容区边距
env.configs.leftPadding = 20 // 内容区边距
env.configs.bottomPadding = 0 // 内容区边距
env.configs.rightPadding = 20 // 内容区边距
env.configs.refreshInterval = 60 // 刷新间隔，单位分钟，非精准，会有3-5分钟差距
//
const imgStyle = env.imgStyle
const textStyle = env.textStyle
//------------------------------------------------
// 脚本名字
const name = Script.name()
// 组件
const widget = new ListWidget()
const contentStack = widget.addStack()
contentStack.layoutVertically()
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
//------------------------------------------------


//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓内容区↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//------------------------------------------------

// 彩云天气的apiKey，自己去免费申请：https://caiyunapp.com
const apiKey = "TAkhjf8d1nlSlspN"

// 锁定地区，直接使用上述填写的地址信息不进行定位
const lockLocation = false

// 默认的定位信息，定位失败的时候默认读取
// https://open.caiyunapp.com/File:Adcode-release-2020-06-10.xlsx.zip
// 上述链接查看对应地区的详细经纬度
let locationData = {
    "latitude": undefined,
    "longitude": undefined,
    "locality": undefined,
    "subLocality": "LSP"
}

//
const dayBgPng = "d_bg.png"
const nightBgPng = "n_bg.png"
const dayIcPng = "d_ico.png"
const nightIcPng = "n_ico.png"

// 天气对应的icon 
const weatherIcos = {
    CLEAR_DAY: "http://a.animedlweb.ga/weather/ico/01d_ico.png", // 晴（白天） CLEAR_DAY
    CLEAR_NIGHT: "http://a.animedlweb.ga/weather/ico/01n_ico.png", // 晴（夜间） CLEAR_NIGHT
    PARTLY_CLOUDY_DAY: "http://a.animedlweb.ga/weather/ico/03d_ico.png", // 多云（白天）  PARTLY_CLOUDY_DAY
    PARTLY_CLOUDY_NIGHT: "http://a.animedlweb.ga/weather/ico/03n_ico.png", // 多云（夜间）  PARTLY_CLOUDY_NIGHT
    CLOUDY: "http://a.animedlweb.ga/weather/ico/04d_ico.png", // 阴  CLOUDY
    LIGHT_HAZE: "http://a.animedlweb.ga/weather/ico/50d_ico.png", // 轻度雾霾   LIGHT_HAZE
    MODERATE_HAZE: "http://a.animedlweb.ga/weather/ico/50d_ico.png", // 中度雾霾  MODERATE_HAZE
    HEAVY_HAZE: "http://a.animedlweb.ga/weather/ico/50d_ico.png", // 重度雾霾   HEAVY_HAZE
    LIGHT_RAIN: "http://a.animedlweb.ga/weather/ico/09d_ico.png", // 小雨 LIGHT_RAIN
    MODERATE_RAIN: "http://a.animedlweb.ga/weather/ico/10d_ico.png", // 中雨 MODERATE_RAIN
    HEAVY_RAIN: "http://a.animedlweb.ga/weather/ico/11d_ico.png", // 大雨  HEAVY_RAIN
    STORM_RAIN: "http://a.animedlweb.ga/weather/ico/11d_ico.png", // 暴雨 STORM_RAIN
    FOG: "http://a.animedlweb.ga/weather/ico/50d_ico.png", // 雾 FOG
    LIGHT_SNOW: "http://a.animedlweb.ga/weather/ico/13d_ico.png", // 小雪  LIGHT_SNOW
    MODERATE_SNOW: "http://a.animedlweb.ga/weather/ico/13d_ico.png", // 中雪 MODERATE_SNOW
    HEAVY_SNOW: "http://a.animedlweb.ga/weather/ico/13d_ico.png", // 大雪  HEAVY_SNOW
    STORM_SNOW: "http://a.animedlweb.ga/weather/ico/13d_ico.png", // 暴雪 STORM_SNOW
    DUST: "http://a.animedlweb.ga/weather/ico/50d_ico.png", // 浮尘  DUST
    SAND: "http://a.animedlweb.ga/weather/ico/50d_ico.png", // 沙尘  SAND
    WIND: "http://a.animedlweb.ga/weather/ico/50d_ico.png", // 大风  WIND
}

// 天气对应的背景
const weatherBgs = {
    CLEAR_DAY: "http://a.animedlweb.ga/weather/bg/01d_bg.png", // 晴（白天） CLEAR_DAY
    CLEAR_NIGHT: "http://a.animedlweb.ga/weather/bg/01n_bg.png", // 晴（夜间） CLEAR_NIGHT
    PARTLY_CLOUDY_DAY: "http://a.animedlweb.ga/weather/bg/03d_bg.png", // 多云（白天）  PARTLY_CLOUDY_DAY
    PARTLY_CLOUDY_NIGHT: "http://a.animedlweb.ga/weather/bg/03n_bg.png", // 多云（夜间）  PARTLY_CLOUDY_NIGHT
    CLOUDY: "http://a.animedlweb.ga/weather/bg/04d_bg.png", // 阴  CLOUDY
    LIGHT_HAZE: "http://a.animedlweb.ga/weather/bg/50d_bg.png", // 轻度雾霾   LIGHT_HAZE
    MODERATE_HAZE: "http://a.animedlweb.ga/weather/bg/50d_bg.png", // 中度雾霾  MODERATE_HAZE
    HEAVY_HAZE: "http://a.animedlweb.ga/weather/bg/50d_bg.png", // 重度雾霾   HEAVY_HAZE
    LIGHT_RAIN: "http://a.animedlweb.ga/weather/bg/09d_bg.png", // 小雨 LIGHT_RAIN
    MODERATE_RAIN: "http://a.animedlweb.ga/weather/bg/10d_bg.png", // 中雨 MODERATE_RAIN
    HEAVY_RAIN: "http://a.animedlweb.ga/weather/bg/11d_bg.png", // 大雨  HEAVY_RAIN
    STORM_RAIN: "http://a.animedlweb.ga/weather/bg/11d_bg.png", // 暴雨 STORM_RAIN
    FOG: "http://a.animedlweb.ga/weather/bg/50d_bg.png", // 雾 FOG
    LIGHT_SNOW: "http://a.animedlweb.ga/weather/bg/13d_bg.png", // 小雪  LIGHT_SNOW
    MODERATE_SNOW: "http://a.animedlweb.ga/weather/bg/13d_bg.png", // 中雪 MODERATE_SNOW
    HEAVY_SNOW: "http://a.animedlweb.ga/weather/bg/13d_bg.png", // 大雪  HEAVY_SNOW
    STORM_SNOW: "http://a.animedlweb.ga/weather/bg/13d_bg.png", // 暴雪 STORM_SNOW
    DUST: "http://a.animedlweb.ga/weather/bg/50d_bg.png", // 浮尘  DUST
    SAND: "http://a.animedlweb.ga/weather/bg/50d_bg.png", // 沙尘  SAND
    WIND: "http://a.animedlweb.ga/weather/bg/50d_bg.png", // 大风  WIND
}

// 获取天气
const weatherInfo = await getWeather()
// 农历信息
const lunarInfo = await getLunar()

// 白天夜晚转换
const timeHour = hour - 12
let weatherIco = weatherInfo.weatherIco
let weatherBg = weatherInfo.weatherBg
if (timeHour >= 6) {
  weatherBg = weatherBg.replace(dayBgPng, nightBgPng)
  weatherIco = weatherIco.replace(dayIcPng, nightIcPng)
}

// 右上角天气icon
contentStack.addSpacer(16)
const weatherIcoStack = contentStack.addStack()
weatherIcoStack.layoutHorizontally()
weatherIcoStack.addSpacer()
weatherIcoStack.setPadding(0, 0, -8, 0)
imgStyle.stack = weatherIcoStack
const weatherImg = await env.getImage(weatherIco)
imgStyle.img = weatherImg
imgStyle.width = 60
imgStyle.height = 60
env.addStyleImg()

// otherInfo
let formatter = new DateFormatter()
formatter.locale = "en"
formatter.dateFormat = "MMMM dd"
let dateString = formatter.string(currentDate)

const otherStack = contentStack.addStack()
otherStack.layoutVertically()
// 日期
let infoLunarText = lunarInfo.data.lunar
infoLunarText = infoLunarText.substring(12, infoLunarText.length)
textStyle.stack = otherStack
textStyle.text = `${dateString}  ${infoLunarText}`
textStyle.font = Font.systemFont(14)
textStyle.textColor = new Color("ffffff", 0.8)
env.addStyleText()
// 温度 
textStyle.stack = otherStack
textStyle.text = `${weatherInfo.temperature}°C`
textStyle.font = Font.systemFont(32)
textStyle.textColor = new Color("ffffff", 0.9)
env.addStyleText()
// 体感温度 
textStyle.stack = otherStack
textStyle.text = `Feels like ${weatherInfo.bodyFeelingTemperature}°C, ${weatherInfo.weather}`
textStyle.font = Font.systemFont(14)
textStyle.textColor = new Color("ffffff", 0.8)
env.addStyleText()
// 地区 
textStyle.stack = otherStack
textStyle.marginStart = 2
textStyle.text = `${locationData.locality} の ${locationData.subLocality}`
textStyle.font = Font.systemFont(11)
textStyle.textColor = new Color("ffffff", 0.8)
env.addStyleText()
// 
contentStack.addSpacer()

//////////////////////////////////////
// 组件End
// 设置小组件的背景
const bgImg = await env.getImage(weatherBg)
widget.backgroundImage = bgImg
// 设置边距(上，左，下，右)
widget.setPadding(env.configs.topPadding, env.configs.leftPadding, env.configs.bottomPadding, env.configs.rightPadding)
// 设置组件
Script.setWidget(widget)
// 完成脚本
Script.complete()
// 预览
widget.presentLarge()
//////////////////////////////////////

//================================================
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
    const weatherJsonData = await env.getJson(DOMAIN)
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

        // 温度
        const temperature = weatherJsonData.result.realtime.temperature
        log("温度==>" + temperature)
        weatherInfo.temperature = Math.round(temperature)

        // 天气状况  
        const weather = weatherJsonData.result.realtime.skycon
        log("天气状况==>" + weather)
        weatherInfo.weather = weather.replace("PARTLY_", "").toLowerCase().replace(/\_/g," ")
        weatherInfo.weatherIco = weatherIcos[weather]
        weatherInfo.weatherBg = weatherBgs[weather]

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
        locationData = await env.getLocation()
    }

    return locationData
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

//------------------------------------------------
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑内容区↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
