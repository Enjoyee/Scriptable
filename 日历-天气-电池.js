//------------------------------------------------
const env = importModule('Env-lsp.js')
//------------------------------------------------
// 配置区
env.configs.previewSize = "Medium" // 预览大小【小：Small，中：Medium，大：Large】
env.configs.changePicBg = false // 是否需要更换背景
env.configs.colorMode = true // 是否是纯色背景
env.configs.bgColor = new Color("000000") // 小组件背景色
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
// 组件
const widget = new ListWidget()
const contentStack = widget.addStack()
//------------------------------------------------


//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓内容区↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//------------------------------------------------

// 是否暗黑模式
const appearance = (await env.isUsingDarkAppearance()) ? 'dark' : 'light'
let darkMode = true
if (appearance == 'light') {
    darkMode = false
}
function isDarkMode() {
    return darkMode
}

// 小组件背景色
env.configs.bgColor = new Color("e5e6e7")
if (isDarkMode()) {
    env.configs.bgColor = new Color("151517")
}


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


/*
****************************************************************************
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
下面添加你自己的组件内容/逻辑 宽度330 高度156
****************************************************************************
*/

// 彩云天气的apiKey，自己去免费申请：https://caiyunapp.com
const apiKey = "TAkhjf8d1nlSlspN"

// 锁定地区，直接使用上述填写的地址信息不进行定位
const lockLocation = false

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


////////////////////////////////////////
const date = new Date()
let formatter = new DateFormatter()
formatter.locale = "en"
formatter.dateFormat = "MMMM"
let monthString = formatter.string(date)
formatter.dateFormat = "EEEE"
const weekString = formatter.string(date)
//////////////////////////////////////////

//////////////////////////////////////////
const width = 330 - 2 * 10
const height = 156 - 3 * 10
const halfWidth = (width - 10) / 2
const halfHeight = height / 2
const cornerRadius = 10
//////////////////////////////////////////


////////////////////////////////////////
contentStack.layoutVertically()
const topStack = contentStack.addStack()
topStack.layoutHorizontally()
//

// 日期内容
let dateStackBgColor = new Color("ffffff")
if (isDarkMode()) {
    dateStackBgColor = new Color("000000")
}
const dateStack = topStack.addStack()
dateStack.layoutHorizontally()
dateStack.backgroundColor = dateStackBgColor
dateStack.size = new Size(halfWidth, halfHeight)
dateStack.cornerRadius = cornerRadius
// 今天日期
const numStack = dateStack.addStack()
numStack.layoutVertically()
numStack.addSpacer()
textStyle.stack = numStack
textStyle.text = "TODAY"
textStyle.font = Font.systemFont(10)
textStyle.textColor = new Color("ff0000")
env.addStyleText()
// 日期
let numFontColor = new Color("000000")
if (isDarkMode()) {
    numFontColor = new Color("ffffff")
}
textStyle.stack = numStack
textStyle.text = `${date.getDate()}`
textStyle.font = Font.systemFont(30)
textStyle.textColor = numFontColor
env.addStyleText()
numStack.addSpacer()
////////////////////
// 周几内容
dateStack.addSpacer(16)
const weekMonthStack = dateStack.addStack()
weekMonthStack.layoutVertically()
weekMonthStack.addSpacer()
// 周几
let weekFontColor = new Color("000000")
if (isDarkMode()) {
    weekFontColor = new Color("ffffff")
}
textStyle.stack = weekMonthStack
textStyle.text = `${weekString}`
textStyle.font = Font.systemFont(10)
textStyle.textColor = weekFontColor
env.addStyleText()
// 月份
weekMonthStack.addSpacer(4)
textStyle.stack = weekMonthStack
textStyle.text = `${monthString}`
let fontSize = Math.floor(11 * 9 / monthString.length)
textStyle.font = Font.systemFont(fontSize)
let monFontColor = new Color("000000", 0.6)
if (isDarkMode()) {
    monFontColor = new Color("ffffff", 0.6)
}
textStyle.textColor = monFontColor
env.addStyleText()
////////////////////////////
weekMonthStack.addSpacer()
topStack.addSpacer(10)
////////////////////////////

////////////////////////////
// 电池内容
let batteryStackBgColor = new Color("65c368")
if (isDarkMode()) {
    batteryStackBgColor = new Color("223e36")
}
const batteryStack = topStack.addStack()
batteryStack.layoutHorizontally()
batteryStack.backgroundColor = batteryStackBgColor
batteryStack.size = new Size(halfWidth, halfHeight)
batteryStack.cornerRadius = cornerRadius
// 电池
const batteryInfoStack = batteryStack.addStack()
batteryInfoStack.layoutVertically()
batteryInfoStack.addSpacer()
textStyle.stack = batteryInfoStack
textStyle.text = "Battery"
textStyle.font = Font.systemFont(10)
textStyle.textColor = new Color("ffffff", 0.8)
env.addStyleText()
// 电池信息
const batteryLevel = Device.batteryLevel()
const batteryAscii = `${Math.round(batteryLevel * 100)}%`
textStyle.stack = batteryInfoStack
textStyle.text = `${batteryAscii}`
textStyle.font = Font.systemFont(18)
textStyle.textColor = new Color("ffffff", 0.9)
env.addStyleText()
batteryInfoStack.addSpacer()
////////// 
batteryStack.addSpacer(30)
const batteryImgStack = batteryStack.addStack()
batteryImgStack.layoutVertically()
batteryImgStack.addSpacer()
imgStyle.stack = batteryImgStack
let batteryImg = SFSymbol.named("battery.100").image
if (batteryLevel <= 0.5) {
    batteryImg = SFSymbol.named("battery.25").image
}
if (Device.isCharging() || Device.isFullyCharged()) {
    batteryImg = SFSymbol.named("battery.100.bolt").image
}
imgStyle.img = batteryImg
imgStyle.tintColor = new Color("ffffff")
imgStyle.width = 30
imgStyle.height = 30
env.addStyleImg()
batteryImgStack.addSpacer()


////////////////////////////////////////////////
contentStack.addSpacer(10)
////////////////////////////////////////////////

////////////////////////////////////////////////
// 底部stack
let bottomContentStackBgColor = new Color("ffffff")
if (isDarkMode()) {
    bottomContentStackBgColor = new Color("000000")
}
const weatherInfo = await getWeather()
let bottomContentStack = contentStack.addStack()
bottomContentStack.layoutHorizontally()
bottomContentStack.setPadding(0, 10, 0, 10)
bottomContentStack.size = new Size(width, halfHeight)
bottomContentStack.backgroundColor = bottomContentStackBgColor
bottomContentStack.cornerRadius = cornerRadius
bottomContentStack.addSpacer()
//
const bottomStack = bottomContentStack.addStack()
bottomStack.layoutVertically()
bottomStack.addSpacer()
// 天气内容
const weatherInfoStack = bottomStack.addStack()
weatherInfoStack.layoutHorizontally()
weatherInfoStack.centerAlignContent()
// 天气ico
imgStyle.stack = weatherInfoStack
imgStyle.width = 25
imgStyle.height = 25
let img = await env.getImage(weatherInfo.weather)
imgStyle.img = img
if (date.getHours() - 12 > 6 && isDarkMode()) {
    imgStyle.tintColor = new Color("ffffff", 0.8)
}
env.addStyleImg()
// 天气预告信息
const weatherAlertInfo = weatherInfo.alertWeatherTitle
let weatherDesc = weatherInfo.weatherDesc
if (weatherAlertInfo != undefined) {
    weatherDesc = weatherAlertInfo
}
weatherInfoStack.addSpacer(4)
textStyle.stack = weatherInfoStack
textStyle.text = `${weatherDesc}`
textStyle.font = Font.systemFont(12)
let weatherInfoFontColor = new Color("000000", 0.8)
if (isDarkMode()) {
    weatherInfoFontColor = new Color("ffffff", 0.8)
}
textStyle.textColor = weatherInfoFontColor
textStyle.lineLimit = 1
env.addStyleText()
weatherInfoStack.addSpacer(4)
//////////////////////////
bottomStack.addSpacer(4)
//////////////////////////
// 日出、日落、体感
const otherWeatherStack = bottomStack.addStack()
otherWeatherStack.layoutHorizontally()
otherWeatherStack.addSpacer(4)
// 日出ico 
imgStyle.stack = otherWeatherStack
imgStyle.width = 15
imgStyle.height = 15
img = SFSymbol.named("sunrise.fill").image
imgStyle.img = img
let sunriseTintColor = new Color("000000", 0.6)
if (isDarkMode()) {
    sunriseTintColor = new Color("ffffff", 0.6)
}
imgStyle.tintColor = sunriseTintColor
env.addStyleImg()
//
otherWeatherStack.addSpacer(2)
textStyle.stack = otherWeatherStack
textStyle.text = `${weatherInfo.sunrise} am`
textStyle.font = Font.systemFont(12)
let sunriseFontColor = new Color("000000", 0.6)
if (isDarkMode()) {
    sunriseFontColor = new Color("ffffff", 0.6)
}
textStyle.textColor = sunriseFontColor
textStyle.lineLimit = 1
env.addStyleText()
// 日落ico 
otherWeatherStack.addSpacer(10)
imgStyle.stack = otherWeatherStack
imgStyle.width = 15
imgStyle.height = 15
img = SFSymbol.named("sunset.fill").image
imgStyle.img = img
let sunsetTintColor = new Color("000000", 0.6)
if (isDarkMode()) {
    sunsetTintColor = new Color("ffffff", 0.6)
}
imgStyle.tintColor = sunsetTintColor
env.addStyleImg()
//
otherWeatherStack.addSpacer(2)
textStyle.stack = otherWeatherStack
textStyle.text = `${weatherInfo.sunset} pm`
textStyle.font = Font.systemFont(12)
let sunsetFontColor = new Color("000000", 0.6)
if (isDarkMode()) {
    sunsetFontColor = new Color("ffffff", 0.6)
}
textStyle.textColor = sunsetFontColor
textStyle.lineLimit = 1
env.addStyleText()
// 体感 
otherWeatherStack.addSpacer(10)
// 体感ico
imgStyle.stack = otherWeatherStack
imgStyle.width = 15
imgStyle.height = 15
img = await env.getImage("http://worldweather.wmo.int/images/34.png")
imgStyle.img = img
let feelingTintColor = new Color("000000", 0.6)
if (isDarkMode()) {
    feelingTintColor = new Color("ffffff", 0.6)
}
imgStyle.tintColor = feelingTintColor
env.addStyleImg()
// 体感温度内容
textStyle.stack = otherWeatherStack
textStyle.text = `${weatherInfo.bodyFeelingTemperature}°C`
textStyle.font = Font.systemFont(12)
let feelingFontColor = new Color("000000", 0.6)
if (isDarkMode()) {
    feelingFontColor = new Color("ffffff", 0.6)
}
textStyle.textColor = feelingFontColor
textStyle.lineLimit = 1
env.addStyleText()
//
bottomStack.addSpacer()
bottomContentStack.addSpacer()




//======================================================================
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

        // 天气状况  
        const weather = weatherJsonData.result.realtime.skycon
        log("天气状况==>" + weather)
        weatherInfo.weather = weatherIcos[weather]

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
        locationData = await env.getLocation()
    }

    return locationData
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


//------------------------------------------------
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑内容区↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

//------------------------------------------------
// 运行脚本、预览
await env.run(name, widget)
//------------------------------------------------
