// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: user-astronaut;
/**
* Author:LSP
* Date:2021-09-25
*/
// @导入引用开发环境
if (typeof require === 'undefined') require = importModule
const { Base } = require("./lsp环境")

// @小组件配置
const widgetConfigs = {
    // 打开更新，直接同步脚本
    openDownload: true,

    // 彩云key
    apiKey: "",
    
    // 农历api，https://www.mxnzp.com/doc/detail?id=1
    lunarAppid: "jdtjpaqlvaxmpsfi", // 农历相关apikey
    lunarAppSecret: "NDM2dDFHcml6V21QcEhZSUxBZldQQT09", // 农历相关apikey

    // 是否是iPhone12mini
    isIphone12Mini: false,
    // 缓存刷新时间--估算(单位：分钟)
    refreshInterval: 10,

    // 组件样式：1、2(选择样式2推荐打开透明背景开关【selectPicBg:true】)
    widgetStyle: 1,
    // 组件背景样式：1、2、3、4、5、6
    widgetUIBg: 6,
    // 组件天气icon样式：1、2、3、4、5（开启useSF的话则此选项无效）
    widgetUIIcon: 5,
    // 是否使用SF系统天气图标
    useSF: false,

    // 是否显示定位
    showLocation: true,
    // 是否显示具体天气文本
    showWeatherDesc: true,
    // 是否显示农历
    showLunar: true,
    // 是否显示更新时间
    showUpdateTime: true,
    // 备用仓库地址
    useGithub: false,

    selectPicBg: false, // 透明背景图片
    colorBgMode: false,  // 纯色背景模式
    bgColor: Color.black(), // 背景色

    // 位置，可以不进行定位，或者定位为出错的时候使用
    location: {
        "latitude": undefined,
        "longitude": undefined,
        "locality": undefined,
        "subLocality": undefined
    },
    // 锁定地区，直接使用上述填写的地址信息不进行定位
    lockLocation: false,
    // 地区
    locale: "zh-cn",

    padding: {
        top: 0, // 上边距
        left: 0, // 左边距
        bottom: 0, // 底边距
        right: 0, // 右边距
    },

    // 英文字体
    enFontUrl: "https://mashangkaifa.coding.net/p/coding-code-guide/d/coding-code-guide/git/raw/master/HelveticaNeue-Thin.otf",

    // 预览模式：0：小尺寸，1：中等尺寸，2：大尺寸，负数：不预览
    previewMode: 1,

    //**********************************************************************
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
        LIGHT_RAIN: "Rain",
        MODERATE_RAIN: "Rain",
        HEAVY_RAIN: "Rain",
        STORM_RAIN: "Rain",
        FOG: "Fog",
        LIGHT_SNOW: "Snow",
        MODERATE_SNOW: "Snow",
        HEAVY_SNOW: "Snow",
        STORM_SNOW: "Snow",
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
    // 天气对应的背景->1
    weatherBgOneUrls: {
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
    // 天气对应的背景->2
    weatherBgTwoUrls: {
        CLEAR_DAY: "https://s3.ax1x.com/2021/01/23/s74MGT.png", // 晴（白天） CLEAR_DAY 
        CLEAR_NIGHT: "https://s3.ax1x.com/2021/01/23/s74maq.png", // 晴（夜间） CLEAR_NIGHT 
        PARTLY_CLOUDY_DAY: "https://s3.ax1x.com/2021/01/23/s74nI0.png", // 多云（白天）  PARTLY_CLOUDY_DAY 
        PARTLY_CLOUDY_NIGHT: "https://s3.ax1x.com/2021/01/23/s74KiV.png", // 多云（夜间）  PARTLY_CLOUDY_NIGHT 
        CLOUDY: "https://s3.ax1x.com/2021/01/23/s74QRU.png", // 阴（白天）  CLOUDY 
        CLOUDY_NIGHT: "https://s3.ax1x.com/2021/01/23/s74KiV.png", // 阴（夜间）  CLOUDY 
        LIGHT_HAZE: "https://s3.ax1x.com/2021/01/23/s74eZn.jpg", // 轻度雾霾   LIGHT_HAZE 
        LIGHT_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/23/s74KiV.png", // 轻度雾霾   LIGHT_HAZE 
        MODERATE_HAZE: "https://s3.ax1x.com/2021/01/23/s74eZn.jpg", // 中度雾霾  MODERATE_HAZE 
        MODERATE_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/23/s74KiV.png", // 中度雾霾  MODERATE_HAZE 
        HEAVY_HAZE: "https://s3.ax1x.com/2021/01/23/s74eZn.jpg", // 重度雾霾   HEAVY_HAZE 
        HEAVY_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/23/s74KiV.png", // 重度雾霾   HEAVY_HAZE 
        LIGHT_RAIN: "https://s3.ax1x.com/2021/01/23/s74lzF.jpg", // 小雨 LIGHT_RAIN 
        MODERATE_RAIN: "https://s3.ax1x.com/2021/01/23/s74lzF.jpg", // 中雨 MODERATE_RAIN 
        HEAVY_RAIN: "https://s3.ax1x.com/2021/01/23/s74lzF.jpg", // 大雨  HEAVY_RAIN 
        STORM_RAIN: "https://s3.ax1x.com/2021/01/23/s74lzF.jpg", // 暴雨 STORM_RAIN 
        FOG: "https://s3.ax1x.com/2021/01/23/s74eZn.jpg", // 雾 FOG 
        LIGHT_SNOW: "https://s3.ax1x.com/2021/01/23/s748sJ.jpg", // 小雪  LIGHT_SNOW 
        MODERATE_SNOW: "https://s3.ax1x.com/2021/01/23/s748sJ.jpg", // 中雪 MODERATE_SNOW 
        HEAVY_SNOW: "https://s3.ax1x.com/2021/01/23/s748sJ.jpg", // 大雪  HEAVY_SNOW 
        STORM_SNOW: "https://s3.ax1x.com/2021/01/23/s748sJ.jpg", // 暴雪 STORM_SNOW 
        DUST: "https://s3.ax1x.com/2021/01/23/s74eZn.jpg", // 浮尘  DUST 
        SAND: "https://s3.ax1x.com/2021/01/23/s74eZn.jpg", // 沙尘  SAND 
        WIND: "https://s3.ax1x.com/2021/01/23/s743M4.jpg", // 大风  WIND 
    },
    // 天气对应的背景->3
    weatherBgThreeUrls: {
        CLEAR_DAY: "https://s3.ax1x.com/2021/01/23/s75PT1.png", // 晴（白天） CLEAR_DAY 
        CLEAR_NIGHT: "https://s3.ax1x.com/2021/01/23/s75PT1.png", // 晴（夜间） CLEAR_NIGHT 
        PARTLY_CLOUDY_DAY: "https://s3.ax1x.com/2021/01/23/s75VSO.png", // 多云（白天）  PARTLY_CLOUDY_DAY 
        PARTLY_CLOUDY_NIGHT: "https://s3.ax1x.com/2021/01/23/s75VSO.png", // 多云（夜间）  PARTLY_CLOUDY_NIGHT 
        CLOUDY: "https://s3.ax1x.com/2021/01/23/s75FFx.png", // 阴（白天）  CLOUDY 
        CLOUDY_NIGHT: "https://s3.ax1x.com/2021/01/23/s75FFx.png", // 阴（夜间）  CLOUDY 
        LIGHT_HAZE: "https://s3.ax1x.com/2021/01/23/s75kY6.png", // 轻度雾霾   LIGHT_HAZE 
        LIGHT_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/23/s75kY6.png", // 轻度雾霾   LIGHT_HAZE 
        MODERATE_HAZE: "https://s3.ax1x.com/2021/01/23/s75kY6.png", // 中度雾霾  MODERATE_HAZE 
        MODERATE_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/23/s75kY6.png", // 中度雾霾  MODERATE_HAZE 
        HEAVY_HAZE: "https://s3.ax1x.com/2021/01/23/s75kY6.png", // 重度雾霾   HEAVY_HAZE 
        HEAVY_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/23/s75kY6.png", // 重度雾霾   HEAVY_HAZE 
        LIGHT_RAIN: "https://s3.ax1x.com/2021/01/23/s75AfK.png", // 小雨 LIGHT_RAIN 
        MODERATE_RAIN: "https://s3.ax1x.com/2021/01/23/s75AfK.png", // 中雨 MODERATE_RAIN 
        HEAVY_RAIN: "https://s3.ax1x.com/2021/01/23/s75AfK.png", // 大雨  HEAVY_RAIN 
        STORM_RAIN: "https://s3.ax1x.com/2021/01/23/s75AfK.png", // 暴雨 STORM_RAIN 
        FOG: "https://s3.ax1x.com/2021/01/23/s75kY6.png", // 雾 FOG 
        LIGHT_SNOW: "https://s3.ax1x.com/2021/01/23/s75e6e.png", // 小雪  LIGHT_SNOW 
        MODERATE_SNOW: "https://s3.ax1x.com/2021/01/23/s75e6e.png", // 中雪 MODERATE_SNOW 
        HEAVY_SNOW: "https://s3.ax1x.com/2021/01/23/s75e6e.png", // 大雪  HEAVY_SNOW 
        STORM_SNOW: "https://s3.ax1x.com/2021/01/23/s75e6e.png", // 暴雪 STORM_SNOW 
        DUST: "https://s3.ax1x.com/2021/01/23/s75kY6.png", // 浮尘  DUST 
        SAND: "https://s3.ax1x.com/2021/01/23/s75kY6.png", // 沙尘  SAND 
        WIND: "https://s3.ax1x.com/2021/01/23/s75ZlD.png", // 大风  WIND 
    },
    // 天气对应的背景->4
    weatherBgFourUrls: {
        CLEAR_DAY: "https://s3.ax1x.com/2021/01/23/s7Iy5t.jpg", // 晴（白天） CLEAR_DAY 
        CLEAR_NIGHT: "https://s3.ax1x.com/2021/01/23/s7I0DH.jpg", // 晴（夜间） CLEAR_NIGHT 
        PARTLY_CLOUDY_DAY: "https://s3.ax1x.com/2021/01/23/s7IBbd.jpg", // 多云（白天）  PARTLY_CLOUDY_DAY 
        PARTLY_CLOUDY_NIGHT: "https://s3.ax1x.com/2021/01/23/s7IsUI.jpg", // 多云（夜间）  PARTLY_CLOUDY_NIGHT 
        CLOUDY: "https://s3.ax1x.com/2021/01/23/s7IBbd.jpg", // 阴（白天）  CLOUDY 
        CLOUDY_NIGHT: "https://s3.ax1x.com/2021/01/23/s7IsUI.jpg", // 阴（夜间）  CLOUDY 
        LIGHT_HAZE: "https://s3.ax1x.com/2021/01/23/s7IwKe.jpg", // 轻度雾霾   LIGHT_HAZE 
        LIGHT_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/23/s7IwKe.jpg", // 轻度雾霾   LIGHT_HAZE 
        MODERATE_HAZE: "https://s3.ax1x.com/2021/01/23/s7IwKe.jpg", // 中度雾霾  MODERATE_HAZE 
        MODERATE_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/23/s7IwKe.jpg", // 中度雾霾  MODERATE_HAZE 
        HEAVY_HAZE: "https://s3.ax1x.com/2021/01/23/s7IwKe.jpg", // 重度雾霾   HEAVY_HAZE 
        HEAVY_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/23/s7IwKe.jpg", // 重度雾霾   HEAVY_HAZE 
        LIGHT_RAIN: "https://s3.ax1x.com/2021/01/23/s7IcPP.jpg", // 小雨 LIGHT_RAIN 
        MODERATE_RAIN: "https://s3.ax1x.com/2021/01/23/s7IcPP.jpg", // 中雨 MODERATE_RAIN 
        HEAVY_RAIN: "https://s3.ax1x.com/2021/01/23/s7IcPP.jpg", // 大雨  HEAVY_RAIN 
        STORM_RAIN: "https://s3.ax1x.com/2021/01/23/s7IcPP.jpg", // 暴雨 STORM_RAIN 
        FOG: "https://s3.ax1x.com/2021/01/23/s7IwKe.jpg", // 雾 FOG 
        LIGHT_SNOW: "https://s3.ax1x.com/2021/01/23/s748sJ.jpg", // 小雪  LIGHT_SNOW 
        MODERATE_SNOW: "https://s3.ax1x.com/2021/01/23/s748sJ.jpg", // 中雪 MODERATE_SNOW 
        HEAVY_SNOW: "https://s3.ax1x.com/2021/01/23/s748sJ.jpg", // 大雪  HEAVY_SNOW 
        STORM_SNOW: "https://s3.ax1x.com/2021/01/23/s748sJ.jpg", // 暴雪 STORM_SNOW 
        DUST: "https://s3.ax1x.com/2021/01/23/s7IwKe.jpg", // 浮尘  DUST 
        SAND: "https://s3.ax1x.com/2021/01/23/s7IwKe.jpg", // 沙尘  SAND 
        WIND: "https://s3.ax1x.com/2021/01/23/s743M4.jpg", // 大风  WIND 
    },
    // 天气对应的背景->5
    weatherBgFiveUrls: {
        CLEAR_DAY: "https://s3.ax1x.com/2021/01/23/s7o5QO.png", // 晴（白天） CLEAR_DAY 
        CLEAR_NIGHT: "https://s3.ax1x.com/2021/01/23/s7ofW6.png", // 晴（夜间） CLEAR_NIGHT 
        PARTLY_CLOUDY_DAY: "https://s3.ax1x.com/2021/01/23/s7oIyD.png", // 多云（白天）  PARTLY_CLOUDY_DAY 
        PARTLY_CLOUDY_NIGHT: "https://s3.ax1x.com/2021/01/23/s7oIyD.png", // 多云（夜间）  PARTLY_CLOUDY_NIGHT 
        CLOUDY: "https://s3.ax1x.com/2021/01/23/s7oIyD.png", // 阴（白天）  CLOUDY 
        CLOUDY_NIGHT: "https://s3.ax1x.com/2021/01/23/s7oIyD.png", // 阴（夜间）  CLOUDY 
        LIGHT_HAZE: "https://s3.ax1x.com/2021/01/23/s7o4SK.png", // 轻度雾霾   LIGHT_HAZE 
        LIGHT_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/23/s7o4SK.png", // 轻度雾霾   LIGHT_HAZE 
        MODERATE_HAZE: "https://s3.ax1x.com/2021/01/23/s7o4SK.png", // 中度雾霾  MODERATE_HAZE 
        MODERATE_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/23/s7o4SK.png", // 中度雾霾  MODERATE_HAZE 
        HEAVY_HAZE: "https://s3.ax1x.com/2021/01/23/s7o4SK.png", // 重度雾霾   HEAVY_HAZE 
        HEAVY_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/23/s7o4SK.png", // 重度雾霾   HEAVY_HAZE 
        LIGHT_RAIN: "https://s3.ax1x.com/2021/01/23/s7oHwd.png", // 小雨 LIGHT_RAIN 
        MODERATE_RAIN: "https://s3.ax1x.com/2021/01/23/s7oHwd.png", // 中雨 MODERATE_RAIN 
        HEAVY_RAIN: "https://s3.ax1x.com/2021/01/23/s7oHwd.png", // 大雨  HEAVY_RAIN 
        STORM_RAIN: "https://s3.ax1x.com/2021/01/23/s7oHwd.png", // 暴雨 STORM_RAIN 
        FOG: "https://s3.ax1x.com/2021/01/23/s7ooOe.png", // 雾 FOG 
        LIGHT_SNOW: "https://s3.ax1x.com/2021/01/23/s7obTA.png", // 小雪  LIGHT_SNOW 
        MODERATE_SNOW: "https://s3.ax1x.com/2021/01/23/s7obTA.png", // 中雪 MODERATE_SNOW 
        HEAVY_SNOW: "https://s3.ax1x.com/2021/01/23/s7obTA.png", // 大雪  HEAVY_SNOW 
        STORM_SNOW: "https://s3.ax1x.com/2021/01/23/s7obTA.png", // 暴雪 STORM_SNOW 
        DUST: "https://s3.ax1x.com/2021/01/23/s7o4SK.png", // 浮尘  DUST 
        SAND: "https://s3.ax1x.com/2021/01/23/s7o4SK.png", // 沙尘  SAND 
        WIND: "https://s3.ax1x.com/2021/01/23/s7ooOe.png", // 大风  WIND 
    },
    // 天气对应的背景->6
    weatherBgSixUrls: {
        CLEAR_DAY: "https://s3.ax1x.com/2021/01/23/s7xrZV.jpg", // 晴（白天） CLEAR_DAY 
        CLEAR_NIGHT: "https://s3.ax1x.com/2021/01/23/s7xsaT.jpg", // 晴（夜间） CLEAR_NIGHT 
        PARTLY_CLOUDY_DAY: "https://s3.ax1x.com/2021/01/23/s7xyIU.jpg", // 多云（白天）  PARTLY_CLOUDY_DAY 
        PARTLY_CLOUDY_NIGHT: "https://s3.ax1x.com/2021/01/23/s7xciF.jpg", // 多云（夜间）  PARTLY_CLOUDY_NIGHT 
        CLOUDY: "https://s3.ax1x.com/2021/01/23/s7xyIU.jpg", // 阴（白天）  CLOUDY 
        CLOUDY_NIGHT: "https://s3.ax1x.com/2021/01/23/s7xciF.jpg", // 阴（夜间）  CLOUDY 
        LIGHT_HAZE: "https://s3.ax1x.com/2021/01/23/s7xgG4.jpg", // 轻度雾霾   LIGHT_HAZE 
        LIGHT_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/23/s7xgG4.jpg", // 轻度雾霾   LIGHT_HAZE 
        MODERATE_HAZE: "https://s3.ax1x.com/2021/01/23/s7xgG4.jpg", // 中度雾霾  MODERATE_HAZE 
        MODERATE_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/23/s7xgG4.jpg", // 中度雾霾  MODERATE_HAZE 
        HEAVY_HAZE: "https://s3.ax1x.com/2021/01/23/s7xgG4.jpg", // 重度雾霾   HEAVY_HAZE 
        HEAVY_HAZE_NIGHT: "https://s3.ax1x.com/2021/01/23/s7xgG4.jpg", // 重度雾霾   HEAVY_HAZE 
        LIGHT_RAIN: "https://s3.ax1x.com/2021/01/23/s7x2RJ.jpg", // 小雨 LIGHT_RAIN 
        MODERATE_RAIN: "https://s3.ax1x.com/2021/01/23/s7x2RJ.jpg", // 中雨 MODERATE_RAIN 
        HEAVY_RAIN: "https://s3.ax1x.com/2021/01/23/s7x2RJ.jpg", // 大雨  HEAVY_RAIN 
        STORM_RAIN: "https://s3.ax1x.com/2021/01/23/s7x2RJ.jpg", // 暴雨 STORM_RAIN 
        FOG: "https://s3.ax1x.com/2021/01/23/s7xBq0.jpg", // 雾 FOG 
        LIGHT_SNOW: "https://s3.ax1x.com/2021/01/23/s7xRz9.jpg", // 小雪  LIGHT_SNOW 
        MODERATE_SNOW: "https://s3.ax1x.com/2021/01/23/s7xRz9.jpg", // 中雪 MODERATE_SNOW 
        HEAVY_SNOW: "https://s3.ax1x.com/2021/01/23/s7xRz9.jpg", // 大雪  HEAVY_SNOW 
        STORM_SNOW: "https://s3.ax1x.com/2021/01/23/s7xRz9.jpg", // 暴雪 STORM_SNOW 
        DUST: "https://s3.ax1x.com/2021/01/23/s7xgG4.jpg", // 浮尘  DUST 
        SAND: "https://s3.ax1x.com/2021/01/23/s7xgG4.jpg", // 沙尘  SAND 
        WIND: "https://s3.ax1x.com/2021/01/23/s7xfMR.jpg", // 大风  WIND 
    },
    //**********************************************************************
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
    * 获取彩云天气信息
    */
    async getWeather(dailysteps = 7) {
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
        // 日期
        const currentDate = new Date()
        const dateStr = this.getDateStr(currentDate, 'yyyyMMdd', widgetConfigs.locale)
        // 日历
        const lunarUrl = `https://www.mxnzp.com/api/holiday/single/${dateStr}?app_id=${widgetConfigs.lunarAppid}&app_secret=${widgetConfigs.lunarAppSecret}`
        const lunarJsonData = await this.httpGet(lunarUrl, true, null, 'lunar')
        const data = lunarJsonData.data
        return {
            yearTips: data.yearTips,
            infoLunarText: data.lunarCalendar,
            holidayText: data.solarTerms,
            typeDes: data.typeDes,
            chineseZodiac: data.chineseZodiac,
            avoid: data.avoid,
            suit: data.suit,
            weekOfYear: data.dayOfYear,
            weekOfYear: data.weekOfYear,
        }
    }

    /**
    * 筛选日程
    * @param {CalendarEvent} schedule 日程
    * @return 返回符合条件的日程
    */
    shouldShowSchedule(schedule) {
        const currentDate = new Date()
        // 被取消的日程不用显示
        if (schedule.title.startsWith("Canceled:")) { return false }
        // 与当前时间做比较
        let timeInterval = schedule.endDate.getTime() > currentDate.getTime()
        // 返回全天跟还没过去的
        return timeInterval && !schedule.isAllDay
    }

    /**
    * 获取手机日程
    */
    async getSchedules() {
        let showSchedules = []
        const todaySchedules = await CalendarEvent.today([])
        for (const schedule of todaySchedules) {
            if (this.shouldShowSchedule(schedule)) {
                // 日程
                let scheduleObj = {}
                // 开始时间
                const startDate = schedule.startDate
                // 年
                const startYear = startDate.getFullYear()
                // 月
                const month = startDate.getMonth() + 1
                // 日
                const day = startDate.getDate()
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
                let timeText = month + "月" + day + "日 " + startHour + ":" + startMinute + "～" + endHour + ":" + endMinute
                if (schedule.isAllDay) {
                    timeText = "全天"
                }

                // 构造格式后的日程
                scheduleObj.title = schedule.title
                scheduleObj.timeText = timeText
                log(`>>日程：${scheduleObj.title} ==> ${timeText}`)
                showSchedules.push(scheduleObj)
            }
        }

        return showSchedules
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
            let downloadURL = "https://gitee.com/enjoyee/scriptable/raw/master/%E6%96%B0%E7%B3%BB%E5%88%97/material_weather.js"
            if (widgetConfigs.useGithub) {
                downloadURL = "https://raw.githubusercontent.com/Enjoyee/Scriptable/new/%E5%A4%9A%E6%A0%B7%E5%BC%8F%E5%BD%A9%E4%BA%91%E5%A4%A9%E6%B0%94/material_weather.js"
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

    /**
    * 获取天气背景图
    */
    weatherBgUrls() {
        let weatherBgUrls = widgetConfigs.weatherBgOneUrls
        const widgetUIBg = widgetConfigs.widgetUIBg
        if (widgetUIBg == 2) {
            weatherBgUrls = widgetConfigs.weatherBgTwoUrls
        } else if (widgetUIBg == 3) {
            weatherBgUrls = widgetConfigs.weatherBgThreeUrls
        } else if (widgetUIBg == 4) {
            weatherBgUrls = widgetConfigs.weatherBgFourUrls
        } else if (widgetUIBg == 5) {
            weatherBgUrls = widgetConfigs.weatherBgFiveUrls
        } else if (widgetUIBg == 6) {
            weatherBgUrls = widgetConfigs.weatherBgSixUrls
        }
        return weatherBgUrls
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
    * 组件样式1
    */
    async renderUIStyle1() {
        //-------------------------------------
        // 天气对应的背景
        let weatherBgUrls = this.weatherBgUrls()
        // 天气对应的图标
        let weatherIcos = this.weatherIcos()
        //-------------------------------------
        const widget = new ListWidget()
        widget.addSpacer(20)
        const widgetWidth = this.getWidgetWidthSize('中号', widgetConfigs.isIphone12Mini)
        //-------------------------------------
        const currentDate = new Date()
        // 获取天气信息
        const sizeCount = 6
        // 六天内天气
        const weatherInfo = await this.getWeather(sizeCount)

        // 当前信息
        const currentInfoStack = widget.addStack()
        currentInfoStack.layoutHorizontally()
        currentInfoStack.addSpacer(15)
        // 
        const stackTopFont = Font.systemFont(10)
        const temStack = currentInfoStack.addStack()
        temStack.layoutVertically()
        temStack.addSpacer(10)
        // 定位图标
        let dividerDesc = ''
        const locationStack = temStack.addStack()
        let textWidget = undefined
        if (widgetConfigs.showLocation) {
            // 天气
            locationStack.centerAlignContent()
            locationStack.addSpacer(3)
            const locationImg = await this.getImageByUrl("https://s3.ax1x.com/2021/01/24/sH8Hk6.png")
            const locationImgSpan = locationStack.addImage(locationImg)
            locationImgSpan.imageSize = new Size(10, 10)
            // 定位
            locationStack.addSpacer(7)
            textWidget = locationStack.addText(`${widgetConfigs.location.subLocality}`)
            textWidget.textColor = Color.white()
            textWidget.font = stackTopFont

            dividerDesc = ' • '
        }
        // 天气文字
        if (widgetConfigs.showWeatherDesc) {
            textWidget = locationStack.addText(`${dividerDesc}${widgetConfigs.weatherDesc[weatherInfo.weatherIco]}`)
            textWidget.textColor = Color.white()
            textWidget.font = stackTopFont

            if (dividerDesc.length == 0) {
                dividerDesc = ' • '
            }
        }
        // 农历
        if (widgetConfigs.showLunar) {
            const lunarInfo = await this.getLunar()
            // 农历信息
            const infoLunarText = lunarInfo.infoLunarText
            const holidayText = lunarInfo.holidayText
            let dateFullText = `${infoLunarText}`
            if (holidayText.length != 0) {
                dateFullText = `${dateFullText} ⊙ ${holidayText}`
            }
            textWidget = locationStack.addText(`${dividerDesc}${dateFullText}`)
            textWidget.textColor = Color.white()
            textWidget.font = stackTopFont

            if (dividerDesc.length == 0) {
                dividerDesc = ' • '
            }
        } 
        if (widgetConfigs.showUpdateTime) {
            // 更新时间
            const updateText = `${this.getDateStr(new Date(), "HH:mm")} ⊹`
            textWidget = locationStack.addText(`${dividerDesc}${updateText}`)
            textWidget.textColor = Color.white()
            textWidget.font = stackTopFont
            
            if (dividerDesc.length == 0) {
                dividerDesc = ' • '
            }
        }
        locationStack.addSpacer()
        // 
        temStack.addSpacer(15)
        let image = await this.drawTextWithCustomFont(widgetConfigs.enFontUrl, `${weatherInfo.temperature}°c`, 40, "FFFFFF", "left")
        let imgSpan = temStack.addImage(image)
        imgSpan.imageSize = new Size(image.size.width / 2, image.size.height / 2)
        imgSpan.leftAlignImage()
        currentInfoStack.addSpacer()
        //------
        const topRightStack = currentInfoStack.addStack()
        topRightStack.layoutVertically()
        topRightStack.addSpacer(20)
        const previewSize = new Size(11, 11)
        // 
        let stackWidth = 60
        const comfort = weatherInfo.comfort
        if (comfort.length > 2) {
            stackWidth = 67
        }
        const singleSize = new Size(stackWidth, 0)
        const comfortStack = topRightStack.addStack()
        comfortStack.layoutHorizontally()
        comfortStack.size = singleSize
        let img = await this.getImageByUrl("https://s3.ax1x.com/2021/01/23/sHiv9K.png")
        imgSpan = comfortStack.addImage(img)
        imgSpan.imageSize = previewSize
        comfortStack.addSpacer(5)
        textWidget = comfortStack.addText(`${weatherInfo.comfort}`)
        textWidget.textColor = Color.white()
        textWidget.font = Font.mediumSystemFont(10)
        comfortStack.addSpacer()
        // -----
        topRightStack.addSpacer(5)
        const aqStack = topRightStack.addStack()
        aqStack.layoutHorizontally()
        aqStack.size = singleSize
        img = await this.getImageByUrl("https://s3.ax1x.com/2021/01/23/sHPrZR.png")
        imgSpan = aqStack.addImage(img)
        imgSpan.imageSize = previewSize
        aqStack.addSpacer(6)
        textWidget = aqStack.addText(`${weatherInfo.aqiInfo}`)
        textWidget.textColor = Color.white()
        textWidget.font = Font.mediumSystemFont(10)
        aqStack.addSpacer()
        // -----
        topRightStack.addSpacer(6)
        const rainStack = topRightStack.addStack()
        rainStack.layoutHorizontally()
        rainStack.size = singleSize
        img = await this.getImageByUrl("https://s3.ax1x.com/2021/01/23/sHic0s.png")
        imgSpan = rainStack.addImage(img)
        imgSpan.imageSize = previewSize
        rainStack.addSpacer(8)
        textWidget = rainStack.addText(`${Math.floor(weatherInfo.probability[0] * 100)}%`)
        textWidget.textColor = Color.white()
        textWidget.font = Font.mediumSystemFont(10)
        rainStack.addSpacer()
        topRightStack.addSpacer()

        // ========================================================
        // 未来天气信息
        widget.addSpacer(5)
        const weatherInfoStack = widget.addStack()
        weatherInfoStack.layoutHorizontally()
        weatherInfoStack.size = new Size(widgetWidth, 0)
        // 日温度
        const daily = weatherInfo.daily
        // 日温度
        const temperatureArr = daily.temperature
        const perSize = widgetWidth / sizeCount
        for (let index = 0; index < temperatureArr.length; index++) {
            let itemStack = weatherInfoStack.addStack()
            itemStack.size = new Size(perSize, 0)
            itemStack.setPadding(0, 0, 10, 0)
            itemStack.layoutVertically()
            itemStack.centerAlignContent()

            // 日期
            let dateStack = itemStack.addStack()
            dateStack.layoutHorizontally()
            dateStack.addSpacer()
            const dailyTemperature = temperatureArr[index]
            let dateText = dailyTemperature.date.slice(8, 10)
            // 替换实时天气icon
            let realtimeIcon = weatherInfo.weatherIco
            if (dateText == currentDate.getDate()) {
                dateText = `今天`
            } else {
                dateText = `${dateText}日`
                realtimeIcon = daily.skycon[index].value
            }
            textWidget = dateStack.addText(dateText)
            textWidget.textColor = Color.white()
            textWidget.font = Font.systemFont(10)
            dateStack.addSpacer()
            itemStack.addSpacer(6)

            // 天气图标
            let weatherIco = this.getSFSymbol(widgetConfigs.weatherSFIcos[realtimeIcon])
            if (!widgetConfigs.useSF) {
                weatherIco = await this.getImageByUrl(weatherIcos[realtimeIcon])
            }
            let icoStack = itemStack.addStack()
            icoStack.layoutHorizontally()
            icoStack.addSpacer()
            let imgStack = icoStack.addImage(weatherIco)
            imgStack.imageSize = new Size(22, 22)
            icoStack.addSpacer()
            itemStack.addSpacer(6)

            // 温度区间
            let temperatureStack = itemStack.addStack()
            temperatureStack.setPadding(0, 0, 0, 0)
            temperatureStack.layoutHorizontally()
            temperatureStack.addSpacer()
            textWidget = temperatureStack.addText(`${Math.floor(dailyTemperature.min)}/${Math.floor(dailyTemperature.max)}°`)
            textWidget.textColor = Color.white()
            textWidget.font = Font.systemFont(11)
            temperatureStack.addSpacer()
        }

        //-------------------------------------
        widget.addSpacer(15)
        const selectPicBg = widgetConfigs.selectPicBg
        this.setSelectPicBg(selectPicBg)
        if (!selectPicBg) {
            // 天气背景
            let bgImg = await this.getImageByUrl(weatherBgUrls[weatherInfo.weatherIco])
            bgImg = await this.loadShadowColor2Image(bgImg, new Color("000", 0.3))
            await this.saveImgCache(this.scriptName, bgImg)
        }
        return widget
    }

    /**
    * 组件样式2
    */
    async renderUIStyle2() {
        //-------------------------------------
        // 字体颜色
        const fontColorHex = "FFFFFF"
        //-------------------------------------
        // 天气对应的背景
        let weatherBgUrls = this.weatherBgUrls()
        // 天气对应的图标
        let weatherIcos = this.weatherIcos()
        //-------------------------------------
        // 获取天气信息
        const sizeCount = 6
        // 六天内天气
        const weatherInfo = await this.getWeather(sizeCount)
        // 获取农历信息
        const lunarInfo = await this.getLunar()
        //-------------------------------------
        const widget = new ListWidget()
        //-------------------------------------
        let fontUrl = "https://mashangkaifa.coding.net/p/coding-code-guide/d/coding-code-guide/git/raw/master/harmony-2.otf"
        let image = await this.drawTextWithCustomFont(fontUrl, `${this.getDateStr(new Date(), "EEEE", "en")}`, 40, fontColorHex)
        let imgSpan = widget.addImage(image)
        imgSpan.imageSize = new Size(image.size.width / 2, image.size.height / 2)
        imgSpan.centerAlignImage()

        // 日历信息 
        widget.addSpacer(10)
        let stack = widget.addStack()
        stack.layoutHorizontally()
        stack.centerAlignContent()
        stack.addSpacer()
        const infoLunarText = lunarInfo.infoLunarText
        const holidayText = lunarInfo.holidayText
        const dateFullText = `${infoLunarText}`
        if (holidayText.length != 0) {
            dateFullText = `${dateFullText} ⊙ ${holidayText}`
        }
        fontUrl = "https://mashangkaifa.coding.net/p/coding-code-guide/d/coding-code-guide/git/raw/master/jf-openhuninn-1.0.ttf"
        let text = `${dateFullText}`
        image = await this.drawTextWithCustomFont(fontUrl, `${text}`, 14, fontColorHex)
        imgSpan = stack.addImage(image)
        imgSpan.imageSize = new Size(image.size.width / 2, image.size.height / 2)
        imgSpan.centerAlignImage()
        // 当前日期
        const dateArr = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ]
        const currentDate = new Date()
        fontUrl = "https://mashangkaifa.coding.net/p/coding-code-guide/d/coding-code-guide/git/raw/master/quicksand_regular.ttf"
        text = ` ⊙ ${currentDate.getDate()}  ${dateArr[currentDate.getMonth()]}`
        image = await this.drawTextWithCustomFont(fontUrl, `${text}`, 16, fontColorHex)
        imgSpan = stack.addImage(image)
        imgSpan.imageSize = new Size(image.size.width / 2, image.size.height / 2)
        imgSpan.centerAlignImage()
        // 电池信息
        if (holidayText.length == 0) {
            const batteryLevel = Math.floor(Device.batteryLevel() * 100)
            text = ` ⊙ ${batteryLevel}%`
            image = await this.drawTextWithCustomFont(fontUrl, `${text}`, 15, fontColorHex)
            imgSpan = stack.addImage(image)
            imgSpan.imageSize = new Size(image.size.width / 2, image.size.height / 2)
            imgSpan.centerAlignImage()
        }
        stack.addSpacer()

        // 当前天气
        //---------
        widget.addSpacer(5)
        stack = widget.addStack()
        stack.layoutHorizontally()
        stack.centerAlignContent()
        stack.addSpacer()
        //---------
        let weatherIco = this.getSFSymbol(widgetConfigs.weatherSFIcos[weatherInfo.weatherIco])
        if (!widgetConfigs.useSF) {
            weatherIco = await this.getImageByUrl(weatherIcos[weatherInfo.weatherIco])
        }
        imgSpan = stack.addImage(weatherIco)
        imgSpan.imageSize = new Size(23, 23)
        imgSpan.centerAlignImage()
        //---------
        stack.addSpacer(10)
        text = `${widgetConfigs.weatherDesc[weatherInfo.weatherIco]}  ${weatherInfo.temperature}°`
        image = await this.drawTextWithCustomFont(fontUrl, `${text}`, 16, fontColorHex)
        imgSpan = stack.addImage(image)
        imgSpan.imageSize = new Size(image.size.width / 2, image.size.height / 2)
        imgSpan.centerAlignImage()
        //---------
        // 舒适指数
        stack.addSpacer(10)
        image = await this.getImageByUrl("https://s3.ax1x.com/2021/01/23/sHPrZR.png")
        imgSpan = stack.addImage(image)
        imgSpan.tintColor = new Color(fontColorHex, 0.8)
        imgSpan.imageSize = new Size(14, 14)
        stack.addSpacer(6)
        text = `${weatherInfo.aqiInfo}`
        let textWidget = stack.addText(`${text}`)
        textWidget.textColor = new Color(fontColorHex, 0.8)
        textWidget.font = Font.lightSystemFont(13)
        // 降雨率
        stack.addSpacer(10)
        image = await this.getImageByUrl("https://s3.ax1x.com/2021/01/23/sHic0s.png")
        imgSpan = stack.addImage(image)
        imgSpan.tintColor = new Color(fontColorHex, 0.8)
        imgSpan.imageSize = new Size(14, 14)
        stack.addSpacer(6)
        text = `${Math.floor(weatherInfo.probability[0] * 100)}%`
        textWidget = stack.addText(`${text}`)
        textWidget.textColor = new Color(fontColorHex, 0.8)
        textWidget.font = Font.lightSystemFont(13)
        //---------
        stack.addSpacer()

        // 天气预告
        //---------
        widget.addSpacer(7)
        stack = widget.addStack()
        stack.layoutHorizontally()
        stack.centerAlignContent()
        stack.addSpacer()
        //---------
        text = `⊱ ${weatherInfo.weatherDesc} ⊰`
        textWidget = stack.addText(`${text}`)
        textWidget.textColor = new Color(fontColorHex, 0.8)
        textWidget.font = Font.lightSystemFont(13)
        stack.addSpacer()

        //-------------------------------------
        const selectPicBg = widgetConfigs.selectPicBg
        this.setSelectPicBg(selectPicBg)
        if (!selectPicBg) {
            // 天气背景
            let bgImg = await this.getImageByUrl(weatherBgUrls[weatherInfo.weatherIco])
            bgImg = await this.loadShadowColor2Image(bgImg, new Color("333", 0.25))
            await this.saveImgCache(this.scriptName, bgImg)
        }
        //-------------------------------------
        return widget
    }

    /**
    * 组件渲染
    */
    async renderUI() {
        if (widgetConfigs.widgetStyle == 1) {
            return await this.renderUIStyle1()
        } else if (widgetConfigs.widgetStyle == 2) {
            return await this.renderUIStyle2()
        }
    }

    //-------------------------------------
    /**
    * @渲染小组件
    */
    async render() {
        // 下载更新
        if (widgetConfigs.openDownload && config.runsInApp) {
            const message = "同步天气远程脚本？"
            const options = ["运行脚本", "下载脚本"]
            let typeIndex = await this.generateAlert(message, options)
            if (typeIndex == 1) {
                await this.downloadUpdate()
            } else {
                return await this.renderUI()
            }
        } else {
            return await this.renderUI()
        }
    }
}

// @运行测试
const { Running } = require("./lsp环境")
await Running(Widget, Script.name())
