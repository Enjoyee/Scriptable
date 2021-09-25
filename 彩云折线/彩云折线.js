// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: user-astronautc;
/**
* Author:LSP
* Date:2021-09-25
*/
// @导入引用开发环境
if (typeof require === 'undefined') require = importModule
const { Base } = require("./lsp环境")

// @小组件配置
const widgetConfigs = {
    // 打开更新，直接同步远程彩云脚本
    openDownload: true,
    // 备用仓库地址
    useGithub: false,

    apiKey: "", // 彩云key

    // 是否显示地区
    showLocation: true,
    // 是否显示当前温度
    showCurrentTemperature: true,
    // 是否使用SF系统天气图标
    useSF: false,
    locale: "zh-cn", // 地区
    // 锁定地区，直接使用上述填写的地址信息不进行定位
    lockLocation: false,
    // 位置，可以不进行定位，或者定位为出错的时候使用
    location: {
        "latitude": undefined,
        "longitude": undefined,
        "locality": undefined,
        "subLocality": undefined
    },

    // 是否是iPhone12mini
    isIphone12Mini: false,
    refreshInterval: 10, // 缓存刷新时间--估算(单位：分钟)
    // 预览模式：0：小尺寸，1：中等尺寸，2：大尺寸，负数：不预览
    previewMode: 1,

    // 默认文字颜色
    defaultTextColor: new Color('FFFFFF'),
    // 默认文字
    defaultFont: Font.semiboldSystemFont(11),

    // 当前温度文字
    nowTemperatureFont: Font.mediumSystemFont(16),

    // 当前日期文字
    currentDateFont: Font.systemFont(17),

    selectPicBg: true, // 选择图片
    colorBgMode: false,  // 纯色背景模式
    bgColor: Color.black(), // 黑色背景

    // 折线高度
    lineCharHeight: 65,
    // 天气icon尺寸
    weatherIconSize: new Size(18, 18),

    padding: {
        top: 10, // 上边距
        left: 2, // 左边距
        bottom: 10, // 底边距
        right: 2, // 右边距
    },

    // 天气描述
    weatherDesc: {
        CLEAR_DAY: "Sunny",
        CLEAR_NIGHT: "Sunny",
        PARTLY_CLOUDY_DAY: "Cloudy",
        PARTLY_CLOUDY_NIGHT: "Cloudy",
        CLOUDY: "Cloudy",
        CLOUDY_NIGHT: "Cloudy",
        LIGHT_HAZE: "Haze",
        LIGHT_HAZE_NIGHT: "Haze",
        MODERATE_HAZE: "Haze",
        MODERATE_HAZE_NIGHT: "Haze",
        HEAVY_HAZE: "Haze",
        HEAVY_HAZE_NIGHT: "Haze",
        LIGHT_RAIN: "Light Rain",
        MODERATE_RAIN: "Moderate Rain",
        HEAVY_RAIN: "Heavy Rain",
        STORM_RAIN: "Storm Rain",
        FOG: "Fog",
        LIGHT_SNOW: "Light Snow",
        MODERATE_SNOW: "Moderate Snow",
        HEAVY_SNOW: "Heavy Snow",
        STORM_SNOW: "Storm Snow",
        DUST: "Dust",
        SAND: "Sand",
        WIND: "Wind",
    },
    // 天气对应的icon 
    weatherIcos: {
        CLEAR_DAY: "https://s3.ax1x.com/2020/12/08/rpVVhD.png", // 晴（白天） CLEAR_DAY
        CLEAR_NIGHT: "https://s1.ax1x.com/2020/10/26/BukPhR.png", // 晴（夜间） CLEAR_NIGHT
        PARTLY_CLOUDY_DAY: "https://s1.ax1x.com/2020/10/26/BuQHN6.png", // 多云（白天）  PARTLY_CLOUDY_DAY
        PARTLY_CLOUDY_NIGHT: "https://s1.ax1x.com/2020/10/26/BukcbF.png", // 多云（夜间）  PARTLY_CLOUDY_NIGHT
        CLOUDY: "https://s3.ax1x.com/2020/12/10/ripz8J.png", // 阴（白天）  CLOUDY
        CLOUDY_NIGHT: "https://s3.ax1x.com/2020/12/10/ripz8J.png", // 阴（夜间）  CLOUDY
        LIGHT_HAZE: "https://s3.ax1x.com/2021/01/15/s009Mj.png", // 轻度雾霾   LIGHT_HAZE
        LIGHT_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/15/s00dOA.png", // 轻度雾霾   LIGHT_HAZE
        MODERATE_HAZE: "https://s3.ax1x.com/2021/01/15/s009Mj.png", // 中度雾霾  MODERATE_HAZE
        MODERATE_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/15/s00dOA.png", // 中度雾霾  MODERATE_HAZE
        HEAVY_HAZE: "https://s3.ax1x.com/2021/01/15/s009Mj.png", // 重度雾霾   HEAVY_HAZE
        HEAVY_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/15/s00dOA.png", // 重度雾霾   HEAVY_HAZE
        LIGHT_RAIN: "https://s3.ax1x.com/2020/12/15/rMkQVx.png", // 小雨 LIGHT_RAIN
        MODERATE_RAIN: "https://s3.ax1x.com/2020/12/15/rMkBIf.png", // 中雨 MODERATE_RAIN
        HEAVY_RAIN: "https://s3.ax1x.com/2020/12/15/rMk6zQ.png", // 大雨  HEAVY_RAIN
        STORM_RAIN: "https://s3.ax1x.com/2020/12/15/rMk6zQ.png", // 暴雨 STORM_RAIN
        FOG: "https://s3.ax1x.com/2020/12/15/rMAYkV.png", // 雾 FOG
        LIGHT_SNOW: "https://s3.ax1x.com/2020/12/15/rMActK.png", // 小雪  LIGHT_SNOW
        MODERATE_SNOW: "https://s3.ax1x.com/2020/12/15/rMActK.png", // 中雪 MODERATE_SNOW
        HEAVY_SNOW: "https://s3.ax1x.com/2020/12/15/rMActK.png", // 大雪  HEAVY_SNOW
        STORM_SNOW: "https://s3.ax1x.com/2020/12/15/rMActK.png", // 暴雪 STORM_SNOW
        DUST: "https://s3.ax1x.com/2020/12/08/rpupes.png", // 浮尘  DUST
        SAND: "https://s3.ax1x.com/2020/12/08/rpupes.png", // 沙尘  SAND
        WIND: "https://s3.ax1x.com/2020/12/15/rMEeBR.png", // 大风  WIND
    },
    // 系统SF天气对应的icon
    weatherSFIcos: {
        CLEAR_DAY: "sun.max.fill", // 晴（白天） CLEAR_DAY 
        CLEAR_NIGHT: "moon.stars.fill", // 晴（夜间） CLEAR_NIGHT 
        PARTLY_CLOUDY_DAY: "cloud.sun.fill", // 多云（白天）  PARTLY_CLOUDY_DAY 
        PARTLY_CLOUDY_NIGHT: "cloud.moon.fill", // 多云（夜间）  PARTLY_CLOUDY_NIGHT 
        CLOUDY: "cloud.fill", // 阴（白天）  CLOUDY 
        CLOUDY_NIGHT: "cloud.fill", // 阴（夜间）  CLOUDY 
        LIGHT_HAZE: "sun.haze.fill", // 轻度雾霾   LIGHT_HAZE 
        LIGHT_HAZE_NIGHT: "sun.haze.fill", // 轻度雾霾   LIGHT_HAZE 
        MODERATE_HAZE: "sun.haze.fill", // 中度雾霾  MODERATE_HAZE 
        MODERATE_HAZE_NIGHT: "sun.haze.fill", // 中度雾霾  MODERATE_HAZE 
        HEAVY_HAZE: "sun.haze.fill", // 重度雾霾   HEAVY_HAZE 
        HEAVY_HAZE_NIGHT: "sun.haze.fill", // 重度雾霾   HEAVY_HAZE 
        LIGHT_RAIN: "cloud.drizzle.fill", // 小雨 LIGHT_RAIN 
        MODERATE_RAIN: "cloud.drizzle.fill", // 中雨 MODERATE_RAIN 
        HEAVY_RAIN: "cloud.rain.fill", // 大雨  HEAVY_RAIN 
        STORM_RAIN: "cloud.heavyrain.fill", // 暴雨 STORM_RAIN 
        FOG: "cloud.fog.fill ", // 雾 FOG 
        LIGHT_SNOW: "cloud.snow.fill", // 小雪  LIGHT_SNOW 
        MODERATE_SNOW: "cloud.snow.fill", // 中雪 MODERATE_SNOW 
        HEAVY_SNOW: "cloud.snow.fill", // 大雪  HEAVY_SNOW 
        STORM_SNOW: "cloud.snow.fill", // 暴雪 STORM_SNOW 
        DUST: "sun.dust.fill", // 浮尘  DUST 
        SAND: "smoke.fill", // 沙尘  SAND 
        WIND: "wind", // 大风  WIND 
    },
}

// @定义小组件
class Widget extends Base {
    constructor(scriptName) {
        super(scriptName)
        // 初始化其他变量
        this.setSelectPicBg(widgetConfigs.selectPicBg)
        this.setColorBgMode(widgetConfigs.colorBgMode, widgetConfigs.bgColor)
        this.paddingSetting(Object.assign(widgetConfigs.padding))
        this.refreshIntervalTime(widgetConfigs.refreshInterval)
        this.setPreViewSizeMode(widgetConfigs.previewMode)
    }

    //-------------------------------------

    /**
    * 
    * @param {Array} labels X轴标签数组
    * @param {Array} datas 温度数组
    * @param {Array} gradientColorArr 渐变色数组
    */
    async renderLineChar(labels, datas, gradientColorArr = ['#FFFFFF', '#FEC163', '#DE4313']) {
        const chartStr = `
        {
        'type': 'bar',
            'data': {
            'labels': ${JSON.stringify(labels)}, // 数据替换
            'datasets': [
            {
                type: 'line',
                backgroundColor: getGradientFillHelper('horizontal', ${JSON.stringify(gradientColorArr)}),
                borderColor: getGradientFillHelper('horizontal', ${JSON.stringify(gradientColorArr)}),
                'borderWidth': 2,
                pointRadius: 1.2,
                'fill': false,
                'data': ${JSON.stringify(datas)}, // 折线对应数据
            },
            ],
            },
          'options': {
            plugins: {
              datalabels: {
                display: true,
                  align: 'top',
                  color: '#FFFFFF', // 折线上的数据点对应的文字颜色
                  font: {
                    size: '11'
                  }
                },
              },
            layout: {
              padding: {
                left: 0,
                right: 10,
                top: 30,
                bottom: 0
              }
             },
            'legend': {
              'display': false,
            },
            scales: {
              xAxes: [ // X 轴线
                {
                  gridLines: {
                    display: false,
                    color: '#000000',
                  },
                  ticks: {
                    display: false,
                    fontColor: '#b598a1', // x轴label文字颜色
                    fontSize: '14',
                  },
                },
              ],
              yAxes: [
                  {
                    ticks: {
                      display: false
                    },
                    gridLines: {
                      display: false
                    },
                  },
                ],
            },
           },
          }`
        const width = this.getWidgetWidthSize('中号', widgetConfigs.isIphone12Mini)
        const url = `https://quickchart.io/chart?w=${width}&h=${widgetConfigs.lineCharHeight}&f=png&c=${encodeURIComponent(chartStr)}`
        return await this.getImageByUrl(url)
    }

    //-------------------------------------

    /**
    * 获取彩云天气信息
    */
    async getWeather() {
        // 获取位置
        let location = widgetConfigs.location
        if (!widgetConfigs.lockLocation) {
            location = await this.getLocation(widgetConfigs.locale)
            widgetConfigs.location = location
        }
        // 小时
        const hour = new Date().getHours()

        const apiCacheKeyName = 'CaiYunKey'
        let apiKey = widgetConfigs.apiKey
        if(apiKey.length == 0) {
            apiKey = this.loadStringCache(apiCacheKeyName)
        } else {
            this.saveStringCache(apiCacheKeyName, apiKey)
        }
        // 彩云天气域名
        const url = `https://api.caiyunapp.com/v2.5/${apiKey}/${location.longitude},${location.latitude}/weather.json?dailysteps=7`
        const weatherJsonData = await this.httpGet(url, true, null, 'caiyunLine')

        // 天气数据
        let weatherInfo = {}
        if (weatherJsonData.status == "ok") {
            log("天气数据请求成功")

            // 全部温度
            weatherInfo.daily = weatherJsonData.result.daily
            // 温度范围
            const temperatureData = weatherInfo.daily.temperature[0]
            // 最低温度
            const minTemperature = temperatureData.min
            // 最高温度
            const maxTemperature = temperatureData.max
            weatherInfo.minTemperature = Math.round(minTemperature)
            weatherInfo.maxTemperature = Math.round(maxTemperature)

            // 体感温度
            const bodyFeelingTemperature = weatherJsonData.result.realtime.apparent_temperature
            weatherInfo.bodyFeelingTemperature = Math.floor(bodyFeelingTemperature)

            // 显示温度
            const temperature = weatherJsonData.result.realtime.temperature
            weatherInfo.temperature = Math.floor(temperature)

            // 天气状况 weatherIcos[weatherIco]
            let weather = weatherJsonData.result.realtime.skycon
            let night = hour - 12 >= 7
            let nightCloudy = night && weather == "CLOUDY"
            let nightLightHaze = night && weather == "LIGHT_HAZE"
            let nightModerateHaze = night && weather == "MODERATE_HAZE"
            let nightHeavyHaze = night && weather == "HEAVY_HAZE"
            if (nightCloudy) {
                weather = "CLOUDY_NIGHT"
            }
            if (nightLightHaze) {
                weather = "LIGHT_HAZE_NIGHT"
            }
            if (nightModerateHaze) {
                weather = "MODERATE_HAZE_NIGHT"
            }
            if (nightHeavyHaze) {
                weather = "HEAVY_HAZE_NIGHT"
            }
            weatherInfo.weatherIco = weather
            log(`天气：${weather}`)

            // 天气描述
            const weatherDesc = weatherJsonData.result.forecast_keypoint
            weatherInfo.weatherDesc = weatherDesc.replace("。还在加班么？", "，")
            log("天气预告==>" + weatherDesc)

            // 相对湿度
            const humidity = (Math.floor(weatherJsonData.result.realtime.humidity * 100)) + "%"
            weatherInfo.humidity = humidity

            // 舒适指数
            const comfort = weatherJsonData.result.realtime.life_index.comfort.desc
            weatherInfo.comfort = comfort
            log(`舒适指数：${comfort}`)

            // 紫外线指数
            const ultraviolet = weatherJsonData.result.realtime.life_index.ultraviolet.desc
            weatherInfo.ultraviolet = ultraviolet

            // 空气质量
            const aqi = weatherJsonData.result.realtime.air_quality.aqi.chn
            const aqiInfo = this.airQuality(aqi)
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
                hourlyObj.skycon = `${weather}`
                hourlyArr.push(hourlyObj)
            }
            weatherInfo.hourly = hourlyArr
        } else {
            log(`请求彩云天气出错：${weatherJsonData.status}`)
        }

        return weatherInfo
    }

    /**
    * 空气指标质量
    * @param {number} levelNum 控制aiq
    */
    airQuality(levelNum) {
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

    //-------------------------------------

    /**
    * 下载更新
    */
    async downloadUpdate() {
        let files = FileManager.local()
        const iCloudInUse = files.isFileStoredIniCloud(module.filename)
        files = iCloudInUse ? FileManager.iCloud() : files
        let message = ''
        try {
            let downloadURL = "https://gitee.com/enjoyee/scriptable/raw/master/%E6%96%B0%E7%B3%BB%E5%88%97/%E5%BD%A9%E4%BA%91%E6%8A%98%E7%BA%BF.js"
            if (widgetConfigs.useGithub) {
                downloadURL = "https://raw.githubusercontent.com/Enjoyee/Scriptable/new/%E5%BD%A9%E4%BA%91%E6%8A%98%E7%BA%BF/%E5%BD%A9%E4%BA%91%E6%8A%98%E7%BA%BF.js"
            }
            const req = new Request(downloadURL)
            const codeString = await req.loadString()
            files.writeString(module.filename, codeString)
            message = "天气脚本已更新，请退出脚本重新进入运行生效。"
        } catch {
            message = "更新失败，请稍后再试。"
        }
        const options = ["好的"]
        await this.generateAlert(message, options)
        Script.complete()
    }

    //-------------------------------------

    /**
    * 当日折线
    * @param {Object} weatherInfo 温度信息
    * @param {ListWidget} widget 组件
    * @param {Number} lineCharMode 折线模式 1：日折线；2：未来7天折线
    */
    async renderUI(weatherInfo, widget, lineCharMode) {
        // 顶部
        const topStack = widget.addStack()
        topStack.layoutHorizontally()
        topStack.centerAlignContent()
        topStack.addSpacer(20)
        // 当前日期
        const dateText = this.getDateStr(new Date(), "M月dd · EEE", 'EN')
        let textWidget = topStack.addText(`${dateText}`)
        textWidget.textColor = widgetConfigs.defaultTextColor
        textWidget.font = widgetConfigs.currentDateFont
        topStack.addSpacer()
        // 顶部右侧
        const topRightStack = topStack.addStack()
        if (widgetConfigs.showLocation && widgetConfigs.showCurrentTemperature) {
            topRightStack.addSpacer(5)
        }
        topRightStack.layoutVertically()
        topRightStack.size = new Size(100, 0)
        // 当前温度
        const temperatureStack = topRightStack.addStack()
        temperatureStack.layoutHorizontally()
        temperatureStack.addSpacer()
        if (widgetConfigs.showCurrentTemperature) {
            textWidget = temperatureStack.addText(`${weatherInfo.temperature}°C`)
            textWidget.textColor = widgetConfigs.defaultTextColor
            textWidget.font = widgetConfigs.nowTemperatureFont
        }
        if (widgetConfigs.showLocation) {
            // 定位
            if (widgetConfigs.showCurrentTemperature) {
                topRightStack.addSpacer(2)
            }
            const locationStack = topRightStack.addStack()
            locationStack.layoutHorizontally()
            locationStack.addSpacer()
            textWidget = locationStack.addText(`${widgetConfigs.location.subLocality}`)
            textWidget.textColor = widgetConfigs.defaultTextColor
            textWidget.font = widgetConfigs.defaultFont
        }
        //
        topStack.addSpacer(20)

        // 请求折线
        const labels = []
        const temperatureList = []
        const hourlyArr = weatherInfo.hourly
        const daily = weatherInfo.daily
        // 折线对应的天气icon
        const weatherIcoList = []
        if (lineCharMode == '1') {
            for (let index = 0; index < hourlyArr.length; index++) {
                if (index >= 8) {
                    break
                }
                const hourly = hourlyArr[index];
                const timeText = this.getDateStr(new Date(hourly.datetime), "HH", widgetConfigs.locale)
                labels.push(`${timeText}时`)
                temperatureList.push(`${hourly.temperature}`)

                // 天气图标
                let weatherIco = this.getSFSymbol(widgetConfigs.weatherSFIcos[hourly.skycon])
                if (!widgetConfigs.useSF) {
                    weatherIco = await this.getImageByUrl(widgetConfigs.weatherIcos[hourly.skycon])
                }
                weatherIcoList.push(weatherIco)
            }
        } else {
            const temperatureArr = daily.temperature
            for (let index = 0; index < temperatureArr.length; index++) {
                const dailyTemperature = temperatureArr[index]
                const dateText = dailyTemperature.date.slice(8, 10)
                labels.push(`${dateText}日`)
                temperatureList.push(`${Math.floor(dailyTemperature.avg)}`)

                // 天气图标
                let weatherIco = this.getSFSymbol(widgetConfigs.weatherSFIcos[daily.skycon[index].value])
                if (!widgetConfigs.useSF) {
                    weatherIco = await this.getImageByUrl(widgetConfigs.weatherIcos[daily.skycon[index].value])
                }
                weatherIcoList.push(weatherIco)
            }
        }

        const lineCharImg = await this.renderLineChar(labels, temperatureList)
        const lineCharStack = widget.addStack()
        lineCharStack.size = new Size(0, widgetConfigs.lineCharHeight)
        lineCharStack.layoutHorizontally()
        lineCharStack.addImage(lineCharImg)

        //
        widget.addSpacer(5)
        const weatherIconStack = widget.addStack()
        weatherIconStack.layoutHorizontally()
        weatherIconStack.addSpacer()
        for (const ico of weatherIcoList) {
            let imgStack = weatherIconStack.addImage(ico)
            imgStack.imageSize = widgetConfigs.weatherIconSize
            weatherIconStack.addSpacer()
        }

        //
        widget.addSpacer(8)
        const weatherTimeStack = widget.addStack()
        weatherTimeStack.layoutHorizontally()
        weatherTimeStack.addSpacer()
        for (const label of labels) {
            textWidget = weatherTimeStack.addText(label)
            textWidget.textColor = widgetConfigs.defaultTextColor
            textWidget.font = widgetConfigs.defaultFont
            weatherTimeStack.addSpacer()
        }

        //
        return widget
    }

    /**
    * @渲染小组件
    */
    async render() {
        //-------------------------------------
        // 折线模式，1：日折线；2：未来7天折线
        const lineCharMode = this.getWidgetInput('2')
        //-------------------------------------

        // 请求彩云
        const weatherInfo = await this.getWeather()

        //-------------------------------------
        const widget = new ListWidget()
        //-------------------------------------

        // 下载更新
        if (widgetConfigs.openDownload && config.runsInApp) {
            const message = "同步彩云折线远程脚本？"
            const options = ["运行脚本", "下载脚本"]
            let typeIndex = await this.generateAlert(message, options)
            if (typeIndex == 1) {
                await this.downloadUpdate()
            } else {
                // 渲染折线
                return this.renderUI(weatherInfo, widget, lineCharMode)
            }
        } else {
            // 渲染折线
            return this.renderUI(weatherInfo, widget, lineCharMode)
        }
    }
}

// @运行测试
const { Running } = require("./lsp环境")
await Running(Widget, Script.name())
