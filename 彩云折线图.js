const env = importModule('Env-lsp.js')
//------------------------------------------------
// 配置区
env.configs.previewSize = "Medium" // 预览大小【小：Small，中：Medium，大：Large】
env.configs.changePicBg = true // 是否需要更换背景
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
const locale = "zh-cn"

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

// 是否使用上次图片的缓存
let isUsedPicCache = false // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<--------

// 顶部问候语，英文花样文字：https://beizhedenglong.github.io/weird-fonts/
const greetingText = {
    nightGreeting: "Time to get laid~",
    morningGreeting: "Good morning~",
    noonGreeting: "Good noon~",
    afternoonGreeting: "Good afternoon~",
    eveningGreeting: "Good evening~"
}

// 自定义日期对应的问候
const anniversaryText = {
    "1-1": "年之伊始，万事如意~"
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
// 天气小图标，一定要是32x32的!!!!!!
const weatherSmallIcos = {
    CLEAR_DAY: "https://s3.ax1x.com/2020/11/13/DpxSWd.png", // 晴（白天） CLEAR_DAY
    CLEAR_NIGHT: "https://s3.ax1x.com/2020/11/13/DpxCQI.png", // 晴（夜间） CLEAR_NIGHT
    PARTLY_CLOUDY_DAY: "https://s3.ax1x.com/2020/11/13/DpxeYQ.png", // 多云（白天）  PARTLY_CLOUDY_DAY
    PARTLY_CLOUDY_NIGHT: "https://s3.ax1x.com/2020/11/13/DpxKln.png", // 多云（夜间）  PARTLY_CLOUDY_NIGHT
    CLOUDY: "https://s3.ax1x.com/2020/11/13/Dpx8TU.png", // 阴（白天）  CLOUDY
    CLOUDY_NIGHT: "https://s3.ax1x.com/2020/11/13/DpxtfJ.png", // 阴（夜间）  CLOUDY
    LIGHT_HAZE: "https://s3.ax1x.com/2020/11/13/DpxwOx.png", // 轻度雾霾   LIGHT_HAZE
    MODERATE_HAZE: "https://s3.ax1x.com/2020/11/13/DpxwOx.png", // 中度雾霾  MODERATE_HAZE
    HEAVY_HAZE: "https://s3.ax1x.com/2020/11/13/DpxwOx.png", // 重度雾霾   HEAVY_HAZE
    LIGHT_RAIN: "https://s3.ax1x.com/2020/11/13/DpxfXt.png", // 小雨 LIGHT_RAIN
    MODERATE_RAIN: "https://s3.ax1x.com/2020/11/13/DpxTAS.png", // 中雨 MODERATE_RAIN
    HEAVY_RAIN: "https://s3.ax1x.com/2020/11/13/DpxXXq.png", // 大雨  HEAVY_RAIN
    STORM_RAIN: "https://s3.ax1x.com/2020/11/13/DpxXXq.png", // 暴雨 STORM_RAIN
    FOG: "https://s3.ax1x.com/2020/11/13/DpzpAU.png", // 雾 FOG
    LIGHT_SNOW: "https://s3.ax1x.com/2020/11/13/Dpzi9J.png", // 小雪  LIGHT_SNOW
    MODERATE_SNOW: "https://s3.ax1x.com/2020/11/13/Dpzi9J.png", // 中雪 MODERATE_SNOW
    HEAVY_SNOW: "https://s3.ax1x.com/2020/11/13/DpzeHK.png", // 大雪  HEAVY_SNOW
    STORM_SNOW: "https://s3.ax1x.com/2020/11/13/DpzQ9H.png", // 暴雪 STORM_SNOW
    DUST: "https://s3.ax1x.com/2020/11/13/Dpz1gA.png", // 浮尘  DUST
    SAND: "https://s3.ax1x.com/2020/11/13/DpzwCQ.png", // 沙尘  SAND
    WIND: "https://s3.ax1x.com/2020/11/13/DpzBgs.png", // 大风  WIND
}

// 底部的小图标
const lovelyImgArr = [
    "https://s1.ax1x.com/2020/11/05/BWQDOJ.png",
    "https://s1.ax1x.com/2020/11/05/BW1yPx.png",
    "https://s1.ax1x.com/2020/11/05/BRhoy8.png",
    "https://s1.ax1x.com/2020/11/05/BR4pOU.png",
    "https://s1.ax1x.com/2020/11/05/BR4Pw4.png",
    "https://s1.ax1x.com/2020/11/05/BR4kk9.png",
    "https://s1.ax1x.com/2020/11/05/BR4Ef1.png",
    "https://s1.ax1x.com/2020/11/05/BWnaKs.png"
]

// 默认字体颜色
const defaultTextColor = new Color("ffffff", 0.95)

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
// 日程
const schedules = await getSchedules()

// 加载图片
if (!isUsedPicCache) {
    // 加载天气icon
    for (var key in weatherIcos) {
        await loadImg(key, weatherIcos[key])
    }
    // 加载天气小icon
    for (var key in weatherSmallIcos) {
        await loadImg(`${key}-small`, weatherSmallIcos[key])
    }
    // 加载底部小图标
    for (var key in lovelyImgArr) {
        await loadImg(`lovely-${key}`, lovelyImgArr[key])
    }
}
log('~~~下载图片完成~~~')


//////////////////////////////////////////
// 内容排版
const widget = new ListWidget()
let contentStack = widget.addStack()
contentStack.layoutVertically()
// 整体内容居中对齐
contentStack.centerAlignContent()

// 运行
await env.run(name, widget, false, false)
const bgImg = env.readBgImg()
const widgetWidth = bgImg.size.width
const widgetHeight = bgImg.size.height

// 准备画笔
let drawContext = new DrawContext();
drawContext.size = new Size(widgetWidth, widgetHeight)
drawContext.opaque = false
drawContext.setTextAlignedCenter()
var rect = new Rect(0, 0, widgetWidth, widgetHeight)
drawContext.drawImageInRect(bgImg, rect)
//////////////////////////////////////////


//>>>>>1
contentStack.addSpacer(10)
let titleStack = env.alignHorizontallyCenterStack(contentStack)
titleStack.addSpacer()
// 天气Icon
// 缓存目录
const weatherImgCachePath = fm.joinPath(fm.documentsDirectory(), "lsp-weatherImg-cache-env")
let weatherImg = undefined
try {
    weatherImg = await loadImg(weatherInfo.weatherIco, weatherIcos[weatherInfo.weatherIco])
    fm.writeImage(weatherImgCachePath, weatherImg)
    log(`天气icon写入缓存`)
} catch (e) {
    weatherImg = fm.readImage(weatherImgCachePath)
    log(`读取天气icon缓存`)
}
// 显示天气
imgStyle.stack = titleStack
imgStyle.width = 35
imgStyle.height = 35
imgStyle.img = weatherImg
env.addStyleImg()
// 体感温度
titleStack.addSpacer(6)
const bodyFeelingTemperature = weatherInfo.bodyFeelingTemperature
// 显示体感温度
textStyle.stack = titleStack
textStyle.text = `${bodyFeelingTemperature}°C`
textStyle.lineLimit = 1
textStyle.font = Font.regularMonospacedSystemFont(22)
textStyle.textColor = defaultTextColor
env.addStyleText()
//////////////////////////////////
// 添加显示符号
textStyle.stack = titleStack
textStyle.marginStart = 6
textStyle.text = `❦`
textStyle.font = Font.systemFont(22)
textStyle.textColor = defaultTextColor
textStyle.lineLimit = 1
env.addStyleText()
// 问候语获取内容
const greeting = provideGreeting(currentDate)
// 添加显示标题  
textStyle.stack = titleStack
textStyle.marginStart = 6
textStyle.text = `${greeting}`
textStyle.font = new Font("HoeflerText-Italic", 22)
textStyle.textColor = defaultTextColor
textStyle.lineLimit = 1
env.addStyleText()
titleStack.addSpacer()



/////////////////////////////////////////////////////////////
//>>>>>2
// 年月日周
contentStack.addSpacer(3)
let dateStack = env.alignHorizontallyCenterStack(contentStack)
dateStack.addSpacer()
const dateStr = env.getDateStr(currentDate, "MM月d日  EEE", locale)
// 农历信息
const lunarData = lunarInfo.data[0]
let infoLunarText = lunarData.lunarText
infoLunarText = infoLunarText.substring(5, infoLunarText.length)
// 节假期信息
const lunarHoliday = lunarData.calendarDay.lunarHoliday.key
const solarHoliday = lunarData.calendarDay.solarHoliday.key
// 农历节气
const solarTerm = lunarData.calendarDay.solarTerm
const holidayText = `${lunarHoliday ? "⊙ " + lunarHoliday : ""}${solarHoliday ? "⊙ " + solarHoliday : ""}${solarTerm ? "⊙ " + solarTerm : ""}`
log(`节假日信息：${holidayText}`)
// 显示
textStyle.stack = dateStack
textStyle.text = `${dateStr} ⊙ ${infoLunarText} ${holidayText}`
textStyle.font = Font.systemFont(14)
textStyle.textColor = new Color("ffcc99", 0.8)
textStyle.lineLimit = 1
env.addStyleText()
dateStack.addSpacer()


/////////////////////////////////////////////////////////////
let graphMode = Boolean(Math.round(Math.random()))
// graphMode = false
/////////////////////////////////////////////////////////////
if (!graphMode) {
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


    // 随机大图跟小图模式切换
    let randMode = Boolean(Math.round(Math.random()))
    /////////////////////////////////////////////////////////////
    //>>>>>4
    if (!randMode) {
        contentStack.addSpacer(8)
        let infoStack = env.alignHorizontallyCenterStack(contentStack)
        infoStack.addSpacer()
        // 内容
        let contentInfo = undefined
        if (schedules.length != 0) {
            const scheduleObj = schedules[0]
            contentInfo = `“${scheduleObj.title}” ━ ⊱${scheduleObj.timeText}⊰`
        } else {
            const rand = Math.round(Math.random())
            if (rand % 2 == 0) {
                // 请求一言
                const oneWord = await getOneWord()
                contentInfo = `“${oneWord.hitokoto}”`
            } else if (rand % 3 == 0) {
                // 请求丁香医生健康日历
                const dxHealthCalendar = await getDxHealthCalendar()
                contentInfo = `“${dxHealthCalendar}”`
            } else {
                // 请求今日诗词
                const poetry = await getPoetry()
                const poetryInfo = poetry.data
                const authorText = `⊱${poetryInfo.origin.dynasty}·${poetryInfo.origin.author}⊰`
                contentInfo = `“${poetryInfo.content.substring(0, poetryInfo.content.length - 1)}” ━ ${authorText}`
            }
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
    }


    /////////////////////////////////////////////////////////////
    //>>>>>5
    // 图标大小
    let iconSize = 18
    let spacer = 8
    // 图标边距
    let iconMargin = 10
    if (randMode) {
        iconSize = 25
        spacer = 15
        iconMargin = 15
    }
    contentStack.addSpacer(spacer)
    let updateStack = env.alignHorizontallyCenterStack(contentStack)
    updateStack.addSpacer()
    // 显示底部图标栏1
    // 缓存目录
    let lovelyImg1 = await loadImg('lovely-0', lovelyImgArr[0])
    imgStyle.stack = updateStack
    imgStyle.width = iconSize
    imgStyle.height = iconSize
    imgStyle.img = lovelyImg1
    env.addStyleImg()
    updateStack.addSpacer(iconMargin)

    // 显示底部图标栏2
    // 缓存目录
    let lovelyImg2 = await loadImg('lovely-1', lovelyImgArr[1])
    imgStyle.stack = updateStack
    imgStyle.width = iconSize
    imgStyle.height = iconSize
    imgStyle.img = lovelyImg2
    env.addStyleImg()
    updateStack.addSpacer(iconMargin)

    // 显示底部图标栏3
    // 缓存目录
    let lovelyImg3 = await loadImg('lovely-2', lovelyImgArr[2])
    imgStyle.stack = updateStack
    imgStyle.width = iconSize
    imgStyle.height = iconSize
    imgStyle.img = lovelyImg3
    env.addStyleImg()
    updateStack.addSpacer(iconMargin)

    // 显示底部图标栏4
    // 缓存目录
    let lovelyImg4 = await loadImg('lovely-3', lovelyImgArr[3])
    imgStyle.stack = updateStack
    imgStyle.width = iconSize
    imgStyle.height = iconSize
    imgStyle.img = lovelyImg4
    env.addStyleImg()
    updateStack.addSpacer(iconMargin)

    if (!randMode) {
        // 添加更新时间
        textStyle.stack = updateStack
        textStyle.text = `update at ${env.getDateStr(new Date(), "HH:mm")}`
        textStyle.lineLimit = 1
        textStyle.font = Font.thinSystemFont(10)
        textStyle.textColor = new Color("ffffff", 0.6)
        env.addStyleText()
        updateStack.addSpacer(iconMargin)
    }

    // 显示底部图标栏5
    // 缓存目录
    let lovelyImg5 = await loadImg('lovely-4', lovelyImgArr[4])
    imgStyle.stack = updateStack
    imgStyle.width = iconSize
    imgStyle.height = iconSize
    imgStyle.img = lovelyImg5
    env.addStyleImg()
    updateStack.addSpacer(iconMargin)

    // 显示底部图标栏6
    // 缓存目录
    let lovelyImg6 = await loadImg('lovely-5', lovelyImgArr[5])
    imgStyle.stack = updateStack
    imgStyle.width = iconSize
    imgStyle.height = iconSize
    imgStyle.img = lovelyImg6
    env.addStyleImg()
    updateStack.addSpacer(iconMargin)

    // 显示底部图标栏7
    // 缓存目录
    let lovelyImg7 = await loadImg('lovely-6', lovelyImgArr[6])
    imgStyle.stack = updateStack
    imgStyle.width = iconSize
    imgStyle.height = iconSize
    imgStyle.img = lovelyImg7
    env.addStyleImg()
    updateStack.addSpacer(iconMargin)

    // 显示底部图标栏8
    // 缓存目录
    let lovelyImg8 = await loadImg('lovely-7', lovelyImgArr[7])
    imgStyle.stack = updateStack
    imgStyle.width = iconSize
    imgStyle.height = iconSize
    imgStyle.img = lovelyImg8
    env.addStyleImg()
    updateStack.addSpacer()
} else {
    /////////////////////////////////////////////////////////////
    //>>>>> 折线图
    const startX = 50 // 起点
    const weatherIcoCount = 8 // icon数量
    const perSize = (widgetWidth - 2 * startX) / (weatherIcoCount - 1) // 每个item间隔
    let coordArr = [] // 所有坐标
    const foldArea = 50 // 温度曲线所占高度

    // 温度差
    const maxTemperature = weatherInfo.maxTemperature
    const minTemperature = weatherInfo.minTemperature
    const temperatureDifference = maxTemperature - minTemperature
    // 每一度所占高度
    const perTemperatureSize = foldArea / temperatureDifference
    const foldY = 132 // 垂直开始位置
    const areaSize = 15

    for (var index = 0; index < weatherIcoCount; index++) {
        let hourlyTemperature = weatherInfo.hourly[index]
        let imgCoorX = startX - 16 + perSize * index
        let imgCoorY = foldY + (maxTemperature - hourlyTemperature.temperature) * perTemperatureSize
        coordArr.push(imgCoorX)
        coordArr.push(imgCoorY)
    }

    let temperatureIndex = 0
    for (var index = 0; index < weatherIcoCount * 2; index = index + 2) {
        let hourlyTemperature = weatherInfo.hourly[temperatureIndex]

        // 连线
        if (index <= weatherIcoCount * 2 - 2 * 2) {
            let x1 = coordArr[index] + areaSize
            let y1 = coordArr[index + 1] + areaSize
            let x2 = coordArr[index + 2] + areaSize
            let y2 = coordArr[index + 3] + areaSize
            drawLine(x1, y1, x2, y2, 3, new Color("fbda41", 0.8))
        }

        // 天气图标
        let weatherIco = await loadImg(hourlyTemperature.skycon, weatherSmallIcos[hourlyTemperature.skycon])
        const weatherX = coordArr[index]
        const weatherY = coordArr[index + 1]
        drawImage(weatherIco, weatherX, weatherY)

        // 温度
        drawText(`${hourlyTemperature.temperature}°`, 16, coordArr[index] + 5, coordArr[index + 1] - 18)

        // 时间
        const timeX = coordArr[index] + 5
        const timeY = foldY + foldArea + 38
        const timeText = env.getDateStr(new Date(hourlyTemperature.datetime), "HH", locale)
        drawText(`${timeText}`, 16, timeX, timeY)

        // 垂直方向线条
        drawLine(weatherX + areaSize, weatherY + 2 * areaSize, timeX + 10, timeY, 1, new Color('FFFFFF', 0.6))

        temperatureIndex++
    }
}
contentStack.addSpacer()
/*****************************小组件内容ENd*****************************/


/*
**************************************
* 画图
**************************************
*/
function drawImage(image, x, y) {
    drawContext.drawImageAtPoint(image, new Point(x, y))
}

/*
**************************************
* 画文本
**************************************
*/
function drawText(text, fontSize, x, y, color = Color.white()) {
    drawContext.setFont(Font.boldSystemFont(fontSize))
    drawContext.setTextColor(color)
    drawContext.drawText(new String(text).toString(), new Point(x, y))
}

/*
**************************************
* 画线
**************************************
*/
function drawLine(x1, y1, x2, y2, width = 3, color = Color.white()) {
    const path = new Path()
    path.move(new Point(x1, y1))
    path.addLine(new Point(x2, y2))
    drawContext.addPath(path)
    drawContext.setStrokeColor(color)
    drawContext.setLineWidth(width)
    drawContext.strokePath()
}


/*
**************************************
* 获取图片
**************************************
*/
async function loadImg(key, url) {
    // 缓存目录
    const cachePath = fm.joinPath(fm.documentsDirectory(), `lsp-img-cache-env-${key}`)
    let loadedImg = undefined
    if (isUsedPicCache) {
        loadedImg = fm.readImage(cachePath)
    }
    if (loadedImg == undefined) {
        try {
            loadedImg = await env.getImage(url)
            fm.writeImage(cachePath, loadedImg)
        } catch (e) {
            log(`加载图片出错：${e}`)
        }
    } else {
        return loadedImg
    }
}


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
        weatherInfo.minTemperature = Math.round(minTemperature)
        weatherInfo.maxTemperature = Math.round(maxTemperature)

        // 体感温度
        const bodyFeelingTemperature = weatherJsonData.result.realtime.apparent_temperature
        weatherInfo.bodyFeelingTemperature = Math.round(bodyFeelingTemperature)

        // 天气状况 weatherIcos[weatherIco]
        let weather = weatherJsonData.result.realtime.skycon
        let nightCloudy = hour - 12 >= 7 && weather == "CLOUDY"
        if (nightCloudy) {
            weather = "CLOUDY_NIGHT"
        }
        weatherInfo.weatherIco = weather

        // 天气描述
        const weatherDesc = weatherJsonData.result.forecast_keypoint
        log("天气描述==>" + weatherDesc)
        weatherInfo.weatherDesc = weatherDesc.replace("。还在加班么？", "，")

        // 相对湿度
        const humidity = (Math.round(weatherJsonData.result.realtime.humidity * 100)) + "%"
        weatherInfo.humidity = humidity

        // 舒适指数
        const comfort = weatherJsonData.result.realtime.life_index.comfort.desc
        weatherInfo.comfort = comfort

        // 紫外线指数
        const ultraviolet = weatherJsonData.result.realtime.life_index.ultraviolet.desc
        weatherInfo.ultraviolet = ultraviolet

        // 空气质量
        const aqi = weatherJsonData.result.realtime.air_quality.aqi.chn
        const aqiInfo = airQuality(aqi)
        weatherInfo.aqiInfo = aqiInfo

        // 日出日落
        const astro = weatherJsonData.result.daily.astro[0]
        // 日出
        const sunrise = astro.sunrise.time
        // 日落
        const sunset = astro.sunset.time
        weatherInfo.sunrise = sunrise.toString()
        weatherInfo.sunset = sunset.toString()

        // 小时预告
        let hourlyArr = []
        const hourlyData = weatherJsonData.result.hourly
        const temperatureArr = hourlyData.temperature
        const temperatureSkyconArr = hourlyData.skycon
        for (var i = 0; i < temperatureArr.length; i++) {
            let hourlyObj = {}
            hourlyObj.datetime = temperatureArr[i].datetime
            hourlyObj.temperature = Math.round(temperatureArr[i].value)

            let weather = temperatureSkyconArr[i].value
            if (nightCloudy) {
                weather = "CLOUDY_NIGHT"
            }
            hourlyObj.skycon = `${weather}-small`
            hourlyArr.push(hourlyObj)
        }
        weatherInfo.hourly = hourlyArr
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
    let timeInterval = schedule.endDate.getTime() > currentDate.getTime()
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
            let timeText = startHour + ":" + startMinute + "～" + endHour + ":" + endMinute
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
* 获取一言
**************************************
*/
async function getOneWord() {
    const url = 'https://v1.hitokoto.cn/?encode=json'

    // 缓存目录
    const cachePath = fm.joinPath(fm.documentsDirectory(), "lsp-one_word-cache-env")
    let data = undefined

    try {
        data = await env.getJson(url)
        // 缓存数据
        fm.writeString(cachePath, JSON.stringify(data))
        log(`一言：${data}，数据缓存`)
    } catch (e) {
        const cache = fm.readString(cachePath)
        log(`读取一言缓存数据`)
        data = JSON.parse(cache)
    }

    return data
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
widget.backgroundImage = drawContext.getImage()
// 设置组件
env.finish(widget)
//------------------------------------------------
