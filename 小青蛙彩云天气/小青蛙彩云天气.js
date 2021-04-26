// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: user-astronaut;
/**
* Author:LSP
* Date:2021-04-26
*/
// @导入引用开发环境
if (typeof require === 'undefined') require = importModule
const { Base } = require("./lsp环境")

// @小组件配置
const widgetConfigs = {
    // 打开更新，直接同步脚本
    openDownload: true,

    // 彩云key，第一次填写后重新更新脚本不需要再次填写，已做缓存
    apiKey: "",

    // 是否是iPhone12mini
    isIphone12Mini: false,
    // 缓存刷新时间--估算(单位：分钟)
    refreshInterval: 10,

    // 透明背景图片
    selectPicBg: false,
    // 纯色背景模式
    colorBgMode: false,
    // 组件背景色
    bgColor: Color.black(),

    // 日期格式化
    dateFormater: 'MMMM dd ⊙ EEE',
    // 国家
    area: 'en',

    // 位置，可以不进行定位，或者定位为出错的时候使用
    location: {
        "latitude": undefined,
        "longitude": undefined,
        "locality": undefined,
        "subLocality": 'LSP'
    },
    // 锁定地区，直接使用上述填写的地址信息不进行定位
    lockLocation: false,

    padding: {
        top: 0, // 上边距
        left: 15, // 左边距
        bottom: 0, // 底边距
        right: 8, // 右边距
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
    // 自定义天气对应的icon-->1
    weatherOneIcos: {
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
    // 自定义天气对应的icon-->2
    weatherTwoIcos: {
        CLEAR_DAY: "https://s3.ax1x.com/2021/01/23/s7tKd1.png", // 晴（白天） CLEAR_DAY
        CLEAR_NIGHT: "https://s3.ax1x.com/2021/01/23/s7tli6.png", // 晴（夜间） CLEAR_NIGHT
        PARTLY_CLOUDY_DAY: "https://s3.ax1x.com/2021/01/23/s7t3RO.png", // 多云（白天）  PARTLY_CLOUDY_DAY
        PARTLY_CLOUDY_NIGHT: "hhttps://s3.ax1x.com/2021/01/23/s7tJQe.png", // 多云（夜间）  PARTLY_CLOUDY_NIGHT
        CLOUDY: "https://s3.ax1x.com/2021/01/23/s7tdot.png", // 阴（白天）  CLOUDY
        CLOUDY_NIGHT: "https://s3.ax1x.com/2021/01/23/s7tdot.png", // 阴（夜间）  CLOUDY
        LIGHT_HAZE: "https://s3.ax1x.com/2021/01/23/s7tDW8.png", // 轻度雾霾   LIGHT_HAZE
        LIGHT_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/23/s7tDW8.png", // 轻度雾霾   LIGHT_HAZE
        MODERATE_HAZE: "https://s3.ax1x.com/2021/01/23/s7tDW8.png", // 中度雾霾  MODERATE_HAZE
        MODERATE_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/23/s7tDW8.png", // 中度雾霾  MODERATE_HAZE
        HEAVY_HAZE: "https://s3.ax1x.com/2021/01/23/s7tDW8.png", // 重度雾霾   HEAVY_HAZE
        HEAVY_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/23/s7tDW8.png", // 重度雾霾   HEAVY_HAZE
        LIGHT_RAIN: "https://s3.ax1x.com/2021/01/23/s7NCOH.png", // 小雨 LIGHT_RAIN
        MODERATE_RAIN: "https://s3.ax1x.com/2021/01/23/s7NCOH.png", // 中雨 MODERATE_RAIN
        HEAVY_RAIN: "https://s3.ax1x.com/2021/01/23/s7NCOH.png", // 大雨  HEAVY_RAIN
        STORM_RAIN: "https://s3.ax1x.com/2021/01/23/s7NCOH.png", // 暴雨 STORM_RAIN
        FOG: "https://s3.ax1x.com/2021/01/23/s7tDW8.png", // 雾 FOG
        LIGHT_SNOW: "https://s3.ax1x.com/2021/01/23/s7Nmp8.png", // 小雪  LIGHT_SNOW
        MODERATE_SNOW: "https://s3.ax1x.com/2021/01/23/s7Nmp8.png", // 中雪 MODERATE_SNOW
        HEAVY_SNOW: "https://s3.ax1x.com/2021/01/23/s7Nmp8.png", // 大雪  HEAVY_SNOW
        STORM_SNOW: "https://s3.ax1x.com/2021/01/23/s7Nmp8.png", // 暴雪 STORM_SNOW
        DUST: "https://s3.ax1x.com/2021/01/23/s7txfK.png", // 浮尘  DUST
        SAND: "https://s3.ax1x.com/2021/01/23/s7txfK.png", // 沙尘  SAND
        WIND: "https://s3.ax1x.com/2021/01/23/s7txfK.png", // 大风  WIND
    },
    // 自定义天气对应的icon-->3
    weatherThreeIcos: {
        CLEAR_DAY: "https://s3.ax1x.com/2021/01/24/sHAD1K.png", // 晴（白天） CLEAR_DAY
        CLEAR_NIGHT: "https://s3.ax1x.com/2021/01/24/sHABp6.png", // 晴（夜间） CLEAR_NIGHT
        PARTLY_CLOUDY_DAY: "https://s3.ax1x.com/2021/01/24/sHAwfx.png", // 多云（白天）  PARTLY_CLOUDY_DAY
        PARTLY_CLOUDY_NIGHT: "https://s3.ax1x.com/2021/01/24/sHAdt1.png", // 多云（夜间）  PARTLY_CLOUDY_NIGHT
        CLOUDY: "https://s3.ax1x.com/2021/01/24/sHAakR.png", // 阴（白天）  CLOUDY
        CLOUDY_NIGHT: "https://s3.ax1x.com/2021/01/24/sHAr6O.png", // 阴（夜间）  CLOUDY
        LIGHT_HAZE: "https://s3.ax1x.com/2021/01/24/sHAsXD.png", // 轻度雾霾   LIGHT_HAZE
        LIGHT_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/24/sHAsXD.png", // 轻度雾霾   LIGHT_HAZE
        MODERATE_HAZE: "https://s3.ax1x.com/2021/01/24/sHAsXD.png", // 中度雾霾  MODERATE_HAZE
        MODERATE_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/24/sHAsXD.png", // 中度雾霾  MODERATE_HAZE
        HEAVY_HAZE: "https://s3.ax1x.com/2021/01/24/sHAsXD.png", // 重度雾霾   HEAVY_HAZE
        HEAVY_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/24/sHAsXD.png", // 重度雾霾   HEAVY_HAZE
        LIGHT_RAIN: "https://s3.ax1x.com/2021/01/24/sHA6ne.png", // 小雨 LIGHT_RAIN
        MODERATE_RAIN: "https://s3.ax1x.com/2021/01/24/sHAc0H.png", // 中雨 MODERATE_RAIN
        HEAVY_RAIN: "https://s3.ax1x.com/2021/01/24/sHARAA.png", // 大雨  HEAVY_RAIN
        STORM_RAIN: "https://s3.ax1x.com/2021/01/24/sHARAA.png", // 暴雨 STORM_RAIN
        FOG: "https://s3.ax1x.com/2021/01/24/sHAsXD.png", // 雾 FOG
        LIGHT_SNOW: "https://s3.ax1x.com/2021/01/24/sHAg7d.png", // 小雪  LIGHT_SNOW
        MODERATE_SNOW: "https://s3.ax1x.com/2021/01/24/sHAg7d.png", // 中雪 MODERATE_SNOW
        HEAVY_SNOW: "https://s3.ax1x.com/2021/01/24/sHAWtI.png", // 大雪  HEAVY_SNOW
        STORM_SNOW: "https://s3.ax1x.com/2021/01/24/sHAWtI.png", // 暴雪 STORM_SNOW
        DUST: "https://s3.ax1x.com/2021/01/24/sHVnGq.png", // 浮尘  DUST
        SAND: "https://s3.ax1x.com/2021/01/24/sHVnGq.png", // 沙尘  SAND
        WIND: "https://s3.ax1x.com/2021/01/24/sHVuR0.png", // 大风  WIND
    },
    // 自定义天气对应的icon-->4
    weatherFourIcos: {
        CLEAR_DAY: "https://s3.ax1x.com/2021/01/26/svnyF0.png", // 晴（白天） CLEAR_DAY
        CLEAR_NIGHT: "https://s3.ax1x.com/2021/01/26/svnfOJ.png", // 晴（夜间） CLEAR_NIGHT
        PARTLY_CLOUDY_DAY: "https://s3.ax1x.com/2021/01/26/svn2SU.png", // 多云（白天）  PARTLY_CLOUDY_DAY
        PARTLY_CLOUDY_NIGHT: "https://s3.ax1x.com/2021/01/26/svnRlF.png", // 多云（夜间）  PARTLY_CLOUDY_NIGHT
        CLOUDY: "https://s3.ax1x.com/2021/01/26/svnroq.png", // 阴（白天）  CLOUDY
        CLOUDY_NIGHT: "https://s3.ax1x.com/2021/01/26/svnroq.png", // 阴（夜间）  CLOUDY
        LIGHT_HAZE: "https://s3.ax1x.com/2021/01/26/svnWy4.png", // 轻度雾霾   LIGHT_HAZE
        LIGHT_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/26/svncWT.png", // 轻度雾霾   LIGHT_HAZE
        MODERATE_HAZE: "https://s3.ax1x.com/2021/01/26/svnWy4.png", // 中度雾霾  MODERATE_HAZE
        MODERATE_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/26/svncWT.png", // 中度雾霾  MODERATE_HAZE
        HEAVY_HAZE: "https://s3.ax1x.com/2021/01/26/svnWy4.png", // 重度雾霾   HEAVY_HAZE
        HEAVY_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/26/svncWT.png", // 重度雾霾   HEAVY_HAZE
        LIGHT_RAIN: "https://s3.ax1x.com/2021/01/26/svnBes.png", // 小雨 LIGHT_RAIN
        MODERATE_RAIN: "https://s3.ax1x.com/2021/01/26/svn5wR.png", // 中雨 MODERATE_RAIN
        HEAVY_RAIN: "https://s3.ax1x.com/2021/01/26/svn4m9.png", // 大雨  HEAVY_RAIN
        STORM_RAIN: "https://s3.ax1x.com/2021/01/26/svnDwn.png", // 暴雨 STORM_RAIN
        FOG: "https://s3.ax1x.com/2021/01/26/svn6YV.png", // 雾 FOG
        LIGHT_SNOW: "https://s3.ax1x.com/2021/01/26/svnwLj.png", // 小雪  LIGHT_SNOW
        MODERATE_SNOW: "https://s3.ax1x.com/2021/01/26/svnwLj.png", // 中雪 MODERATE_SNOW
        HEAVY_SNOW: "https://s3.ax1x.com/2021/01/26/svnwLj.png", // 大雪  HEAVY_SNOW
        STORM_SNOW: "https://s3.ax1x.com/2021/01/26/svnwLj.png", // 暴雪 STORM_SNOW
        DUST: "https://s3.ax1x.com/2021/01/26/svuh38.png", // 浮尘  DUST
        SAND: "https://s3.ax1x.com/2021/01/26/svuh38.png", // 沙尘  SAND
        WIND: "https://s3.ax1x.com/2021/01/26/svndyQ.png", // 大风  WIND
    },
    // 自定义天气对应的icon-->5
    weatherFiveIcos: {
        CLEAR_DAY: "https://s3.ax1x.com/2021/01/26/svubEn.png", // 晴（白天） CLEAR_DAY
        CLEAR_NIGHT: "https://s3.ax1x.com/2021/01/26/svuqNq.png", // 晴（夜间） CLEAR_NIGHT
        PARTLY_CLOUDY_DAY: "https://s3.ax1x.com/2021/01/26/svu5jg.png", // 多云（白天）  PARTLY_CLOUDY_DAY
        PARTLY_CLOUDY_NIGHT: "https://s3.ax1x.com/2021/01/26/svuTBj.png", // 多云（夜间）  PARTLY_CLOUDY_NIGHT
        CLOUDY: "https://s3.ax1x.com/2021/01/26/svu4gS.png", // 阴（白天）  CLOUDY
        CLOUDY_NIGHT: "https://s3.ax1x.com/2021/01/26/svu4gS.png", // 阴（夜间）  CLOUDY
        LIGHT_HAZE: "https://s3.ax1x.com/2021/01/26/svu7Hs.png", // 轻度雾霾   LIGHT_HAZE
        LIGHT_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/26/svu7Hs.png", // 轻度雾霾   LIGHT_HAZE
        MODERATE_HAZE: "https://s3.ax1x.com/2021/01/26/svu7Hs.png", // 中度雾霾  MODERATE_HAZE
        MODERATE_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/26/svu7Hs.png", // 中度雾霾  MODERATE_HAZE
        HEAVY_HAZE: "https://s3.ax1x.com/2021/01/26/svu7Hs.png", // 重度雾霾   HEAVY_HAZE
        HEAVY_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/26/svu7Hs.png", // 重度雾霾   HEAVY_HAZE
        LIGHT_RAIN: "https://s3.ax1x.com/2021/01/26/svuR4P.png", // 小雨 LIGHT_RAIN
        MODERATE_RAIN: "https://s3.ax1x.com/2021/01/26/svuR4P.png", // 中雨 MODERATE_RAIN
        HEAVY_RAIN: "https://s3.ax1x.com/2021/01/26/svuR4P.png", // 大雨  HEAVY_RAIN
        STORM_RAIN: "https://s3.ax1x.com/2021/01/26/svuR4P.png", // 暴雨 STORM_RAIN
        FOG: "https://s3.ax1x.com/2021/01/26/svu2Nt.png", // 雾 FOG
        LIGHT_SNOW: "https://s3.ax1x.com/2021/01/26/svuouQ.png", // 小雪  LIGHT_SNOW
        MODERATE_SNOW: "https://s3.ax1x.com/2021/01/26/svuouQ.png", // 中雪 MODERATE_SNOW
        HEAVY_SNOW: "https://s3.ax1x.com/2021/01/26/svuouQ.png", // 大雪  HEAVY_SNOW
        STORM_SNOW: "https://s3.ax1x.com/2021/01/26/svuouQ.png", // 暴雪 STORM_SNOW
        DUST: "https://s3.ax1x.com/2021/01/26/svuh38.png", // 浮尘  DUST
        SAND: "https://s3.ax1x.com/2021/01/26/svuh38.png", // 沙尘  SAND
        WIND: "https://s3.ax1x.com/2021/01/26/svuL40.png", // 大风  WIND
    },
    // SF对应的天气icon
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
        FOG: "cloud.fog.fill", // 雾 FOG 
        LIGHT_SNOW: "cloud.snow.fill", // 小雪  LIGHT_SNOW 
        MODERATE_SNOW: "cloud.snow.fill", // 中雪 MODERATE_SNOW 
        HEAVY_SNOW: "cloud.snow.fill", // 大雪  HEAVY_SNOW 
        STORM_SNOW: "cloud.snow.fill", // 暴雪 STORM_SNOW 
        DUST: "sun.dust.fill", // 浮尘  DUST 
        SAND: "smoke.fill", // 沙尘  SAND 
        WIND: "wind", // 大风  WIND 
    },
    //**********************************************************************
    weatherBgUrls: {
        CLEAR_DAY: "https://s3.ax1x.com/2021/01/23/s78p4S.png", // 晴（白天） CLEAR_DAY 
        CLEAR_NIGHT: "https://s3.ax1x.com/2021/01/23/s73zAf.jpg", // 晴（夜间） CLEAR_NIGHT 
        PARTLY_CLOUDY_DAY: "https://s3.ax1x.com/2021/01/23/s73vHP.png", // 多云（白天）  PARTLY_CLOUDY_DAY 
        PARTLY_CLOUDY_NIGHT: "https://s3.ax1x.com/2021/01/23/s73zAf.jpg", // 多云（夜间）  PARTLY_CLOUDY_NIGHT 
        CLOUDY: "https://s3.ax1x.com/2021/01/23/s73jBt.png", // 阴（白天）  CLOUDY 
        CLOUDY_NIGHT: "https://s3.ax1x.com/2021/01/23/s73zAf.jpg", // 阴（夜间）  CLOUDY 
        LIGHT_HAZE: "https://s3.ax1x.com/2021/01/23/s78SN8.png", // 轻度雾霾   LIGHT_HAZE 
        LIGHT_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/23/s73zAf.jpg", // 轻度雾霾   LIGHT_HAZE 
        MODERATE_HAZE: "https://s3.ax1x.com/2021/01/23/s78SN8.png", // 中度雾霾  MODERATE_HAZE 
        MODERATE_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/23/s73zAf.jpg", // 中度雾霾  MODERATE_HAZE 
        HEAVY_HAZE: "https://s3.ax1x.com/2021/01/23/s78SN8.png", // 重度雾霾   HEAVY_HAZE 
        HEAVY_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/23/s73zAf.jpg", // 重度雾霾   HEAVY_HAZE 
        LIGHT_RAIN: "https://s3.ax1x.com/2021/01/23/s78C9g.png", // 小雨 LIGHT_RAIN 
        MODERATE_RAIN: "https://s3.ax1x.com/2021/01/23/s78C9g.png", // 中雨 MODERATE_RAIN 
        HEAVY_RAIN: "https://s3.ax1x.com/2021/01/23/s78C9g.png", // 大雨  HEAVY_RAIN 
        STORM_RAIN: "https://s3.ax1x.com/2021/01/23/s78C9g.png", // 暴雨 STORM_RAIN 
        FOG: "https://s3.ax1x.com/2021/01/23/s78SN8.png", // 雾 FOG 
        LIGHT_SNOW: "https://s3.ax1x.com/2021/01/23/s78P3Q.png", // 小雪  LIGHT_SNOW 
        MODERATE_SNOW: "https://s3.ax1x.com/2021/01/23/s78P3Q.png", // 中雪 MODERATE_SNOW 
        HEAVY_SNOW: "https://s3.ax1x.com/2021/01/23/s78P3Q.png", // 大雪  HEAVY_SNOW 
        STORM_SNOW: "https://s3.ax1x.com/2021/01/23/s78P3Q.png", // 暴雪 STORM_SNOW 
        DUST: "https://s3.ax1x.com/2021/01/23/s78SN8.png", // 浮尘  DUST 
        SAND: "https://s3.ax1x.com/2021/01/23/s78SN8.png", // 沙尘  SAND 
        WIND: "https://s3.ax1x.com/2021/01/23/s78icj.jpg", // 大风  WIND 
    },

    // 预览模式：0：小尺寸，1：中等尺寸，2：大尺寸，负数：不预览
    previewMode: 2,
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

    /**
     * 定位
     * @returns 定位信息
     */
    async location() {
        if (!widgetConfigs.lockLocation) {
            return await this.getLocation(widgetConfigs.locale)
        } else {
            return widgetConfigs.location
        }
    }

    /**
    * 获取彩云天气信息
    */
    async getWeather(dailysteps = 7) {
        // 获取位置
        let location = await this.location()
        // 小时
        const hour = new Date().getHours()

        const apiCacheKeyName = 'CaiYunKey'
        let apiKey = widgetConfigs.apiKey
        if (apiKey.length == 0) {
            apiKey = this.loadStringCache(apiCacheKeyName)
        } else {
            this.saveStringCache(apiCacheKeyName, apiKey)
        }
        // 彩云天气域名
        const url = `https://api.caiyunapp.com/v2.5/${apiKey}/${location.longitude},${location.latitude}/weather.json?alert=true&dailysteps=${dailysteps}`
        const weatherJsonData = await this.httpGet(url, true, null, 'weatherMultiInfo')

        // 天气数据
        let weatherInfo = {}
        if (weatherJsonData.status == "ok") {
            log("天气数据请求成功")

            // 天气突发预警
            let alertWeather = weatherJsonData.result.alert.content
            if (alertWeather.length > 0) {
                const alertWeatherTitle = alertWeather[0].title
                log(`突发的天气预警==>${alertWeatherTitle}`)
                weatherInfo.alertWeatherTitle = alertWeatherTitle
            }

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

            // 降水率
            weatherInfo.probability = weatherJsonData.result.minutely.probability

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

    /**
    * 获取农历信息
    */
    async getLunar() {
        const day = new Date().getDate() - 1
        // 万年历数据
        const url = "https://wannianrili.51240.com/"
        const defaultHeaders = {
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36"
        }
        const html = await this.httpGet(url, false, defaultHeaders)
        let webview = new WebView()
        await webview.loadHTML(html)
        var getData = `
            function getData() {
                try {
                    infoLunarText = document.querySelector('div#wnrl_k_you_id_${day}.wnrl_k_you .wnrl_k_you_id_wnrl_nongli').innerText
                    holidayText = document.querySelectorAll('div.wnrl_k_zuo div.wnrl_riqi')[${day}].querySelector('.wnrl_td_bzl').innerText
                    if (infoLunarText.search(holidayText) != -1) {
                        holidayText = ''
                    }
                } catch {
                    holidayText = ''
                }
                return { infoLunarText: infoLunarText, holidayText: holidayText }
            }
            
            getData()
        `

        // 节日数据  
        const response = await webview.evaluateJavaScript(getData, false)
        console.log(`农历输出：${JSON.stringify(response)}`);

        return response
    }

    /**
    * 下载更新
    */
    async downloadUpdate() {
        let files = FileManager.local()
        const iCloudInUse = files.isFileStoredIniCloud(module.filename)
        files = iCloudInUse ? FileManager.iCloud() : files
        let message = ''
        try {
            let downloadURL = "https://gitee.com/enjoyee/scriptable/raw/master/%E5%90%88%E9%9B%86%E6%95%B4%E7%90%86/%E5%B0%8F%E9%9D%92%E8%9B%99%E5%BD%A9%E4%BA%91%E5%A4%A9%E6%B0%94.js"
            if (widgetConfigs.useGithub) {
                downloadURL = "https://raw.githubusercontent.com/Enjoyee/Scriptable/new/%E5%B0%8F%E9%9D%92%E8%9B%99%E5%BD%A9%E4%BA%91%E5%A4%A9%E6%B0%94/%E5%B0%8F%E9%9D%92%E8%9B%99%E5%BD%A9%E4%BA%91%E5%A4%A9%E6%B0%94.js"
            }
            const req = new Request(downloadURL)
            const codeString = await req.loadString()
            files.writeString(module.filename, codeString)
            message = "脚本已更新，请退出脚本重新进入运行生效。"
        } catch {
            message = "更新失败，请稍后再试。"
        }
        const options = ["好的"]
        await this.generateAlert(message, options)
        Script.complete()
    }

    /**
    * 获取天气背景图
    */
    weatherBgUrls(weatherDesc) {
        let bgUrl = 'https://gitee.com/peter7/scriptable/raw/master/frogweather'
        switch (weatherDesc) {
            case 'LIGHT_HAZE':
            case 'LIGHT_HAZE_NIGHT':
            case 'MODERATE_HAZE':
            case 'MODERATE_HAZE_NIGHT':
            case 'HEAVY_HAZE':
            case 'HEAVY_HAZE_NIGHT':
            case 'FOG':
            case 'DUST':
            case 'SAND':
            case 'WIND':
                bgUrl = `${bgUrl}/FOG.jpg`;
                break;

            case 'CLEAR_DAY':
                bgUrl = `${bgUrl}/CLEAR_DAY/${Math.round(Math.random() * 6) + 1}.jpg`;
                break;

            case 'CLEAR_NIGHT':
                bgUrl = `${bgUrl}/CLEAR_NIGHT/${Math.round(Math.random() * 4) + 1}.jpg`;
                break;

            case 'CLOUDY':
                bgUrl = `${bgUrl}/CLOUDY/${Math.round(Math.random() * 2) + 1}.jpg`;
                break;

            case 'CLOUDY_NIGHT':
                bgUrl = `${bgUrl}/CLOUDY_NIGHT/${Math.round(Math.random() * 1) + 1}.jpg`;
                break;

            case 'PARTLY_CLOUDY_DAY':
                bgUrl = `${bgUrl}/PARTLY_CLOUDY_DAY/${Math.round(Math.random() * 11) + 1}.jpg`;
                break;

            case 'PARTLY_CLOUDY_NIGHT':
                bgUrl = `${bgUrl}/PARTLY_CLOUDY_NIGHT/${Math.round(Math.random() * 5) + 1}.jpg`;
                break;

            case 'LIGHT_RAIN':
            case 'MODERATE_RAIN':
            case 'HEAVY_RAIN':
            case 'STORM_RAIN':
                bgUrl = `${bgUrl}/RAIN/${Math.round(Math.random() * 4) + 1}.jpg`;
                break;

            case 'LIGHT_SNOW':
            case 'MODERATE_SNOW':
            case 'HEAVY_SNOW':
            case 'STORM_SNOW':
                bgUrl = `${bgUrl}/SNOW/${Math.round(Math.random() * 3) + 1}.jpg`;
                break;

            default:
                bgUrl = `${bgUrl}/WELCOME.jpg`;
                break;
        }

        return bgUrl;
    }

    /**
    * 获取天气icon
    */
    weatherIcos() {
        let weatherIcos = widgetConfigs.weatherOneIcos
        const widgetUIIcon = widgetConfigs.widgetUIIcon
        if (widgetUIIcon == 2) {
            weatherIcos = widgetConfigs.weatherTwoIcos
        } else if (widgetUIIcon == 3) {
            weatherIcos = widgetConfigs.weatherThreeIcos
        } else if (widgetUIIcon == 4) {
            weatherIcos = widgetConfigs.weatherFourIcos
        } else if (widgetUIIcon == 5) {
            weatherIcos = widgetConfigs.weatherFiveIcos
        }
        return weatherIcos
    }

    /**
     * 组件渲染
     */
    async renderUI() {
        // 天气对应的图标
        let weatherIcos = this.weatherIcos()
        //-------------------------------------
        const widget = new ListWidget()
        const contentStack = widget.addStack()
        contentStack.layoutVertically()
        //-------------------------------------
        const currentDate = new Date()
        // 获取天气信息
        const sizeCount = 6
        // 六天内天气
        const weatherInfo = await this.getWeather(sizeCount)
        // 农历
        const lunarInfo = await this.getLunar()
        // 定位
        const locationInfo = await this.location()

        // 天气图标
        let realtimeIcon = weatherInfo.weatherIco
        let weatherIco = this.getSFSymbol(widgetConfigs.weatherSFIcos[realtimeIcon])
        if (!widgetConfigs.useSF) {
            weatherIco = await this.getImageByUrl(weatherIcos[realtimeIcon])
        }
        // 天气对应的背景
        let weatherBgUrl = this.weatherBgUrls(realtimeIcon)
        // 日期
        const dateStr = this.getDateStr(currentDate, widgetConfigs.dateFormater, widgetConfigs.area)
        // 农历信息
        const infoLunarText = lunarInfo.infoLunarText
        const holidayText = lunarInfo.holidayText
        let dateFullText = `${infoLunarText}`
        if (holidayText.length != 0) {
            dateFullText = `${dateFullText} ⊙ ${holidayText}`
        }
        // 日期修改
        let dividerDesc = ''
        const dateInfo = `${dateStr} ⊙ ${dividerDesc}${dateFullText}`
        // 温度
        const temperature = `${weatherInfo.temperature} °C`
        // 体感，最低温度 weatherInfo.minTemperature，最高温度：weatherInfo.maxTemperature
        const feelLikeStr = `Feels like ${weatherInfo.bodyFeelingTemperature}°C， ${widgetConfigs.weatherDesc[weatherInfo.weatherIco]}`
        // 定位
        let defineSubLocality = widgetConfigs.location.subLocality
        if(defineSubLocality == undefined) {
            defineSubLocality = locationInfo.subLocality
        }
        const locationStr = `${locationInfo.locality} の ${defineSubLocality}`

        //-------------------------------------
        const descStack = contentStack.addStack();
        // 左侧信息
        const leftInfoStack = descStack.addStack();
        leftInfoStack.layoutVertically();
        leftInfoStack.addSpacer(20);
        // 日期
        const dateInfoStack = leftInfoStack.addStack()
        dateInfoStack.layoutHorizontally()
        let textStack = dateInfoStack.addText(dateInfo)
        textStack.font = Font.systemFont(14)
        textStack.textColor = new Color("ffffff", 0.8)
        // 温度
        leftInfoStack.addSpacer(2)
        const weatherStack = leftInfoStack.addStack()
        weatherStack.layoutHorizontally()
        textStack = weatherStack.addText(temperature)
        textStack.font = Font.systemFont(32)
        textStack.textColor = new Color("ffffff", 0.9)
        // 体感->feel like
        leftInfoStack.addSpacer(2)
        const feelStack = leftInfoStack.addStack()
        feelStack.layoutHorizontally()
        textStack = feelStack.addText(feelLikeStr)
        textStack.font = Font.systemFont(14)
        textStack.textColor = new Color("ffffff", 0.8)
        // 定位
        leftInfoStack.addSpacer(2)
        const locationStack = contentStack.addStack()
        locationStack.layoutHorizontally()
        textStack = locationStack.addText(locationStr)
        textStack.font = Font.systemFont(11)
        textStack.textColor = new Color("ffffff", 0.7)

        // 右上角天气icon
        descStack.addSpacer();
        const weatherIcoStack = descStack.addStack();
        weatherIcoStack.layoutVertically();
        weatherIcoStack.addSpacer(10);
        weatherIcoStack.size = new Size(50, 50)
        let imgStack = weatherIcoStack.addImage(weatherIco)
        imgStack.imageSize = new Size(43, 43)

        //-------------------------------------
        contentStack.addSpacer()
        const selectPicBg = widgetConfigs.selectPicBg
        this.setSelectPicBg(selectPicBg)
        if (!selectPicBg) {
            // 天气背景
            let bgImg = await this.getImageByUrl(weatherBgUrl)
            bgImg = await this.loadShadowColor2Image(bgImg, new Color("000", 0.2))
            await this.saveImgCache(this.scriptName, bgImg)
        }
        return widget
        //-------------------------------------
    }

    //-------------------------------------
    /**
     * @渲染小组件
     */
    async render() {
        return await this.renderUI()
    }
}

// @运行测试
const { Running } = require("./lsp环境")
await Running(Widget, Script.name())
