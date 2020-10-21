/*
 * Enjoyee 
 * https://github.com/Enjoyee/Scriptable
 */

// 是否暗黑模式
const darkMode = "false"
let widgetInputRAW = args.widgetParameter
try {
  widgetInputRAW.toString()
} catch(e) {
  // 默认值白色
  widgetInputRAW = darkMode
}
// 获取外部输入
let inputArr = widgetInputRAW.toString()
if (inputArr.length == 0) {
    inputArr = darkMode
}

function isDarkMode() {
    return inputArr == "true"
}

const previewSize = "Medium"

// 小组件背景色
let bgColor = new Color("e5e6e7")
if (isDarkMode()) {
    bgColor = new Color("151517")
}

// 默认字体
const defaultFont = Font.systemFont(18)

// 默认字体颜色
const defaultTextColor = new Color("ffffff")

// 内容区左右边距
const padding = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
}

// 标题样式定义
let textStyle = {
    stack: undefined, // 加入到哪个内容栈显示
    marginStart: 0, // 开始距离，水平方向的就是左边距离，垂直方向的就是顶部距离
    marginEnd: 0, // 结束距离，水平方向的就是右边距离，垂直方向的就是底部距离
    text: "", // 显示的文字
    width: 0, // 宽
    height: 0, // 长
    lineLimit: 0, // 行数控制，0是全部展示
    font: undefined, // 字体
    textColor: defaultTextColor, // 文字颜色
}

// 图片样式定义
let imgStyle = {
    stack: undefined, // 加入到哪个内容栈显示
    marginStart: 0, // 开始距离，水平方向的就是左边距离，垂直方向的就是顶部距离
    marginEnd: 0, // 结束距离，水平方向的就是右边距离，垂直方向的就是底部距离
    img: undefined, // 图片资源
    width: 0, // 宽
    height: 0, // 长
    tintColor: undefined, // 图片渲染颜色
}
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////
// 组件Start
const filename = `${Script.name()}.jpg`
const files = FileManager.local()
const path = files.joinPath(files.documentsDirectory(), filename)
const widget = new ListWidget()
const contentStack = widget.addStack()
//////////////////////////////////////



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

// 默认的定位信息，定位失败的时候默认读取
// https://open.caiyunapp.com/File:Adcode-release-2020-06-10.xlsx.zip
// 上述链接查看对应地区的详细经纬度
let locationData = {
    "latitude": undefined,
    "longitude": undefined,
    "locality": undefined,
    "subLocality": undefined
}
//

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
addStyleText()
// 日期
let numFontColor = new Color("000000")
if (isDarkMode()) {
    numFontColor = new Color("ffffff")
}
textStyle.stack = numStack
textStyle.text = `${date.getDate()}`
textStyle.font = Font.systemFont(30)
textStyle.textColor = numFontColor
addStyleText()
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
addStyleText()
// 月份对齐
for (let index = monthString.length; index < 9; index++) {
    monthString = " " + monthString
}
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
addStyleText()
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
addStyleText()
// 电池信息
const batteryLevel = Device.batteryLevel()
const batteryAscii = `${Math.round(batteryLevel * 100)}%`
textStyle.stack = batteryInfoStack
textStyle.text = `${batteryAscii}`
textStyle.font = Font.systemFont(18)
textStyle.textColor = new Color("ffffff", 0.9)
addStyleText()
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
addStyleImg()
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
let img = await getImage(weatherInfo.weather)
imgStyle.img = img
if (date.getHours() - 12 > 6 && isDarkMode()) {
    imgStyle.tintColor = new Color("ffffff", 0.8)
}
addStyleImg()
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
addStyleText()
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
addStyleImg()
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
addStyleText()
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
addStyleImg()
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
addStyleText()
// 体感 
otherWeatherStack.addSpacer(10)
// 体感ico
imgStyle.stack = otherWeatherStack
imgStyle.width = 15
imgStyle.height = 15
img = await getImage("http://worldweather.wmo.int/images/34.png")
imgStyle.img = img
let feelingTintColor = new Color("000000", 0.6)
if (isDarkMode()) {
    feelingTintColor = new Color("ffffff", 0.6)
}
imgStyle.tintColor = feelingTintColor
addStyleImg()
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
addStyleText()
//
bottomStack.addSpacer()
bottomContentStack.addSpacer()


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
        try {
            const location = await Location.current()
            const geocode = await Location.reverseGeocode(location.latitude, location.longitude, "zh_cn")
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
        } catch (e) {
            log("定位出错了，" + e.toString())
        }
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

/*
****************************************************************************
上面添加你自己的组件内容/逻辑
↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
****************************************************************************
*/


//////////////////////////////////////
// 组件End
// 设置小组件的背景
widget.backgroundColor = bgColor
// 设置边距(上，左，下，右)
widget.setPadding(padding.top, padding.left, padding.bottom, padding.right)
// 设置组件
Script.setWidget(widget)
// 完成脚本
Script.complete()
// 预览
widget.presentMedium()
//////////////////////////////////////

/*
****************************************************************************
* 重置文本样式
****************************************************************************
*/
function resetTextStyle() {
    textStyle.stack = undefined // 加入到哪个内容栈显示
    textStyle.marginStart = 0
    textStyle.marginEnd = 0
    textStyle.text = "" // 显示的文字
    textStyle.width = 0 // 宽
    textStyle.height = 0 // 长
    textStyle.lineLimit = 0 // 行数控制，0是全部展示
    textStyle.font = undefined // 字体
    textStyle.textColor = defaultTextColor // 文字颜色
}

/*
****************************************************************************
* 重置图片样式
****************************************************************************
*/
function resetImgStyle() {
    imgStyle.stack = undefined // 加入到哪个内容栈显示
    textStyle.marginStart = 0
    textStyle.marginEnd = 0
    imgStyle.img = undefined // 图片资源
    imgStyle.width = 0 // 宽
    imgStyle.height = 0 // 长
    imgStyle.tintColor = undefined // 图片渲染颜色
}

/*
****************************************************************************
* 添加一行文本数据进行显示
****************************************************************************
*/
function addStyleText() {
    const contentStack = textStyle.stack
    if (contentStack == undefined) {
        return
    }

    const marginStart = textStyle.marginStart
    if (marginStart != undefined && marginStart != 0) {
        contentStack.addSpacer(marginStart)
    }

    const textSpan = contentStack.addText(`${textStyle.text}`)
    contentStack.size = new Size(textStyle.width, textStyle.height)
    textSpan.lineLimit = textStyle.lineLimit
    textSpan.font = textStyle.font
    textSpan.textColor = textStyle.textColor

    const marginEnd = textStyle.marginEnd
    if (marginStart != undefined && marginStart != 0) {
        contentStack.addSpacer(marginEnd)
    }

    // 重置样式
    resetTextStyle()
}

/*
****************************************************************************
* 添加图片进行显示
****************************************************************************
*/
function addStyleImg() {
    const contentStack = imgStyle.stack
    if (contentStack == undefined) {
        return
    }

    const marginStart = textStyle.marginStart
    if (marginStart != undefined && marginStart != 0) {
        contentStack.addSpacer(marginStart)
    }

    const imgSpan = contentStack.addImage(imgStyle.img)
    imgSpan.imageSize = new Size(imgStyle.width, imgStyle.height)
    const tintColor = imgStyle.tintColor
    if (tintColor != undefined) {
        imgSpan.tintColor = tintColor
    }

    const marginEnd = textStyle.marginEnd
    if (marginStart != undefined && marginStart != 0) {
        contentStack.addSpacer(marginEnd)
    }

    // 重置样式
    resetImgStyle()
}

/*
****************************************************************************
* 右对齐，水平方向排列
****************************************************************************
*/
function alignRightStack(alignmentStack, marginRight) {
    let contentStack = alignmentStack.addStack()
    contentStack.layoutHorizontally()
    contentStack.addSpacer()

    let returnStack = contentStack.addStack()

    // 添加右边距
    if (marginRight != undefined && marginRight != 0) {
        contentStack.addSpacer(marginRight)
    }

    return returnStack
}


/*
****************************************************************************
* 左对齐，水平方向排列
****************************************************************************
*/
function alignLeftStack(alignmentStack, marginLeft) {
    let contentStack = alignmentStack.addStack()
    contentStack.layoutHorizontally()

    let returnStack = contentStack.addStack()
    returnStack.layoutHorizontally()

    // 添加左边距
    if (marginLeft != undefined && marginLeft != 0) {
        returnStack.addSpacer(marginLeft)
    }

    contentStack.addSpacer()
    return returnStack
}

/*
****************************************************************************
* 上对齐，垂直方向排列
****************************************************************************
*/
function alignTopStack(alignmentStack, marginTop) {
    let contentStack = alignmentStack.addStack()
    contentStack.layoutVertically()

    // 添加左边距
    if (marginTop != undefined && marginTop != 0) {
        contentStack.addSpacer(marginTop)
    }

    let returnStack = contentStack.addStack()
    returnStack.layoutVertically()

    contentStack.addSpacer()
    return returnStack
}


/*
****************************************************************************
* 下对齐，垂直方向排列
****************************************************************************
*/
function alignBottomStack(alignmentStack, marginBottom) {
    let contentStack = alignmentStack.addStack()
    contentStack.layoutVertically()
    contentStack.addSpacer()

    let returnStack = contentStack.addStack()

    // 添加下边距
    if (marginBottom != undefined && marginBottom != 0) {
        contentStack.addSpacer(marginBottom)
    }

    return returnStack
}

/*
****************************************************************************
* 水平居中
****************************************************************************
*/
function alignHorizontallyCenterStack(alignmentStack) {
    let returnStack = alignmentStack.addStack()
    returnStack.layoutHorizontally()
    returnStack.centerAlignContent()
    return returnStack
}


/*
****************************************************************************
* 垂直居中
****************************************************************************
*/
function alignVerticallyCenterStack(alignmentStack) {
    let returnStack = alignmentStack.addStack()
    returnStack.layoutVertically()
    returnStack.centerAlignContent()
    return returnStack
}


/*
****************************************************************************
* 网络请求get封装
****************************************************************************
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
****************************************************************************
* 网络请求获取图片
****************************************************************************
*/
async function getImage(url) {
    const request = new Request(url)
    const data = await request.loadImage()
    return data
}




