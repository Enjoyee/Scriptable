/**
* Author:LSP
* Date:2020-09-25
*/

// @导入引用开发环境
if (typeof require === 'undefined') require = importModule
const { Base } = require("./lsp环境")

// @小组件配置
const widgetConfigs = {
    // 打开更新，直接同步远程彩云脚本
    openDownload: false,

    // 是否是iPhone12mini
    isIphone12Mini: false,

    apiKey: "", // 彩云key

    // 农历api，https://www.mxnzp.com/doc/detail?id=1
    lunarAppid: "jdtjpaqlvaxmpsfi", // 农历相关apikey
    lunarAppSecret: "NDM2dDFHcml6V21QcEhZSUxBZldQQT09", // 农历相关apikey

    selectPicBg: true, // 选择图片
    colorBgMode: false,  // 纯色背景模式
    bgColor: Color.black(), // 黑色背景

    // 是否显示全天的日程
    openAllDaySchedule: false,
    // 是否开启天气描述
    openWeatherDesc: true,
    // 组件天气icon样式：1、2、3、4、5（开启useSF的话则此选项无效）
    widgeWeathertIcon: 5,
    // 是否使用SF系统天气图标
    useSF: false,

    // 是否使用折线图模式，1：曲线模式，2：顺序轮播切换模式，3：普通模式
    throwLineCharMode: 3,
    // 普通模式时候底部的内容填充，0：轮播，1：一言，2：丁香医生日历，3：每日诗词
    contentFillMode: 0,

    padding: {
        top: 2, // 上边距
        left: 2, // 左边距
        bottom: 2, // 底边距
        right: 2, // 右边距
    },

    refreshInterval: 10, // 刷新时间--估算(单位：分钟)

    locale: "zh-cn", // 地区

    // 标题是否使用自定义ttf字体加载显示文本
    titleUseCustomFont: true,
    // 日期是否使用自定义ttf字体加载显示文本
    dateUseCustomFont: true,
    // 天气描述是否使用自定义ttf字体加载显示文本
    weatherDescUseCustomFont: true,
    // 内容区是否使用自定义ttf字体加载显示文本
    contentUseCustomFont: true,

    // 自定义中文字体
    cnFontUrl: "https://mashangkaifa.coding.net/p/coding-code-guide/d/coding-code-guide/git/raw/master/jf-openhuninn-1.0.ttf",

    // 顶部问候语，英文花样文字：https://beizhedenglong.github.io/weird-fonts/
    greetingText: {
        nightGreeting: "𝔗𝔦𝔪𝔢 𝔱𝔬 𝔤𝔢𝔱 𝔩𝔞𝔦𝔡~",
        morningGreeting: "𝔊𝔬𝔬𝔡 𝔪𝔬𝔯𝔫𝔦𝔫𝔤~",
        noonGreeting: "𝔊𝔬𝔬𝔡 𝔫𝔬𝔬𝔫~",
        afternoonGreeting: "𝔊𝔬𝔬𝔡 𝔞𝔣𝔱𝔢𝔯𝔫𝔬𝔬𝔫~",
        eveningGreeting: "𝔊𝔬𝔬𝔡 𝔢𝔳𝔢𝔫𝔦𝔫𝔤~"
    },
    // 自定义日期对应的问候
    anniversaryText: {
        "1-1": "年之伊始，万事如意~",
        "10-1": "国之庆典，普天同庆~",
        "12-25": "𝔐𝔢𝔯𝔯𝔶 ℭ𝔥𝔯𝔦𝔰𝔱𝔪𝔞𝔰~",
    },
    // 自定义农历日期对应的问候
    lunarText: {
        "正月初一": "金牛贺岁迎新春~",
        "正月初二": "喜迎财神福满门~",
        "正月初三": "赤狗小年朝~",
    },
    // 位置，可以不进行定位，或者定位为出错的时候使用
    location: {
        "latitude": undefined,
        "longitude": undefined,
        "locality": undefined,
        "subLocality": undefined
    },
    // 锁定地区，直接使用上述填写的地址信息不进行定位
    lockLocation: false,
    // 默认文字颜色hex
    defaultTextColorHex: "FFFFFF",
    // 顶部天气图标尺寸
    bigWeatherIconSize: new Size(23, 23),
    // 温度字体
    temperatureFontSize: 18,
    // 天气描述字体
    weatherDescFontSize: 15,
    // 问候语字体大小
    greetingFontSize: 17,
    // 日期格式化
    dateFormater: "M月d日  EEE",
    // 日期字体
    dateFontSize: 14,
    // 日期颜色
    dateTextColorHex: "FFCC99",
    // 天气提示信息字体
    weatherTipsFontSize: 12,
    // 内容区块背景
    contentBgHex: "666",
    // 内容区块字体
    contentFontSize: 12,
    // 内容区块文字颜色
    contentTextColorHex: "FFFFFF",
    // 底部lovely的icon尺寸
    lovelyIconSize: new Size(18, 18),
    // 底部更新文字
    updateFontSize: 11,
    // 底部更新文字颜色
    updateTextColorHex: "FFFFFF",
    // 折线温度连线颜色
    foldLineColorHex: "FBDA41",
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
    // 底部的小图标
    lovelyImgArr: [
        "https://s3.ax1x.com/2021/01/16/sDrPeJ.png",
        "https://s3.ax1x.com/2021/01/16/sDrFoR.png",
        "https://s3.ax1x.com/2021/01/16/sDriw9.png",
        "https://s3.ax1x.com/2021/01/16/sDr9L4.png",
        "https://s3.ax1x.com/2021/01/16/sDrpyF.png",
        "https://s3.ax1x.com/2021/01/16/sDrAF1.png",
        "https://s3.ax1x.com/2021/01/16/sDrEJx.png",
        "https://s3.ax1x.com/2021/01/16/sDrVW6.png",
    ],

    // 预览模式：0：小尺寸，1：中等尺寸，2：大尺寸，负数：不预览
    previewMode: 1,
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

    applyDefaultTextColor() {
        return this.applyColor(widgetConfigs.defaultTextColorHex, 0.95)
    }

    applyColor(colorHex, alpha) {
        return new Color(colorHex, alpha)
    }

    applyTemperatureFont() {
        return Font.systemFont(widgetConfigs.temperatureFontSize)
    }

    applyWeatherDescFont() {
        return new Font('IowanOldStyle-Bold', widgetConfigs.weatherDescFontSize)
    }

    applyGreetingFont() {
        return Font.systemFont(widgetConfigs.greetingFontSize)
    }

    applyDateFont() {
        return Font.systemFont(widgetConfigs.dateFontSize)
    }

    applyWeatherTipsFont() {
        return Font.systemFont(widgetConfigs.weatherTipsFontSize)
    }

    applyContentFont() {
        return Font.lightMonospacedSystemFont(widgetConfigs.contentFontSize)
    }

    applyUpdateFont() {
        return Font.thinSystemFont(widgetConfigs.updateFontSize)
    }

    /**
    * 获取天气icon
    */
    weatherIcos() {
        let weatherIcos = widgetConfigs.weatherOneIcos
        const widgeWeathertIcon = widgetConfigs.widgeWeathertIcon
        if (widgeWeathertIcon == 2) {
            weatherIcos = widgetConfigs.weatherTwoIcos
        } else if (widgeWeathertIcon == 3) {
            weatherIcos = widgetConfigs.weatherThreeIcos
        } else if (widgeWeathertIcon == 4) {
            weatherIcos = widgetConfigs.weatherFourIcos
        } else if (widgeWeathertIcon == 5) {
            weatherIcos = widgetConfigs.weatherFiveIcos
        }
        return weatherIcos
    }

    /**
     * 获取彩云天气信息
     */
    async getWeather() {
        // 获取位置
        let location = widgetConfigs.location
        if (!widgetConfigs.lockLocation) {
            location = await this.getLocation(widgetConfigs.locale)
        }
        // 小时
        const hour = new Date().getHours()

        // 彩云天气域名
        const url = `https://api.caiyunapp.com/v2.5/${widgetConfigs.apiKey}/${location.longitude},${location.latitude}/weather.json?alert=true`
        const weatherJsonData = await this.httpGet(url, true, null, 'caiyun')

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
        log(`农历信息：${JSON.stringify(data)}`);
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
        let allDay = widgetConfigs.openAllDaySchedule
        if (!allDay) {
            allDay = !schedule.isAllDay
        }
        // 返回还没过去的
        return timeInterval && allDay
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
     * 按照时间获取问候语
     * @param {Date} date 公历日期
     * @param {Date} lunarDate 农历日历
     * @return 问候语
     */
    provideGreeting(date, lunarDate) {
        // 农历问候语
        const lunarGreetingText = widgetConfigs.lunarText[`${lunarDate}`]
        if (lunarGreetingText != null && lunarGreetingText != undefined && lunarGreetingText.length > 0) {
            return lunarGreetingText
        }

        // 月份
        const month = date.getMonth() + 1
        // 日期
        const day = date.getDate()
        // 小时
        const hour = date.getHours()
        // 纪念日子
        let anniversary = widgetConfigs.anniversaryText[`${month}-${day}`]
        const greetingText = widgetConfigs.greetingText
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

    /**
     * 在线获取今日诗词
     */
    async getPoetry() {
        // 获取token
        const tokenUrl = "https://v2.jinrishici.com/token"
        const tokenData = await this.httpGet(tokenUrl)
        // 获取诗词
        const poetryUrl = "https://v2.jinrishici.com/sentence"
        const headers = { "X-User-Token": tokenData.data }
        const poetryData = await this.httpGet(poetryUrl, true, headers)

        const poetryInfo = poetryData.data
        const contentInfo = `“${poetryInfo.content.substring(0, poetryInfo.content.length - 1)}”`
        const authorText = `⊱${poetryInfo.origin.dynasty}·${poetryInfo.origin.author}⊰`
        let fullContent = contentInfo
        if (contentInfo.length <= 17) {
            fullContent = `${contentInfo} ━ ${authorText}`
        }
        return fullContent
    }

    /**
     * 获取丁香医生健康日历
     */
    async getDxHealthCalendar() {
        const url = 'https://dxy.com/app/i/ask/discover/todayfeed/healthcalendar'
        let data = await this.httpGet(url)
        data = data.data.items[0].title.replace('[丁香医生] ', '')
        return `“${data}” ━ ⊱丁香医生⊰`
    }

    /**
     * 获取一言
     */
    async getOneWord() {
        const url = 'https://v1.hitokoto.cn/?encode=json'
        const data = await this.httpGet(url)
        return `“${data.hitokoto}”`
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
            const req = new Request("https://gitee.com/enjoyee/scriptable/raw/master/%E6%96%B0%E7%B3%BB%E5%88%97/%E5%BD%A9%E4%BA%91.js")
            const codeString = await req.loadString()
            files.writeString(module.filename, codeString)
            message = "彩云脚本已更新，请退出脚本重新进入运行生效。"
        } catch {
            message = "更新失败，请稍后再试。"
        }
        const options = ["好的"]
        await this.generateAlert(message, options)
        Script.complete()
    }

    /**
     * @渲染小组件
     */
    async renderUI() {
        // 获取天气数据
        const weatherInfo = await this.getWeather()
        // 获取农历信息
        const lunarInfo = await this.getLunar()
        // 获取日程
        const schedules = await this.getSchedules()

        /*****************************************************/

        // 天气对应的图标
        let weatherIcos = this.weatherIcos()
        // 组件背景
        this.bgImg = this.loadLastSavedBgImg()
        if (widgetConfigs.selectPicBg) {
            await this.transparentBg()
            this.bgImg = this.loadLastSavedBgImg()
        }
        // 当前日期
        const currentDate = new Date()

        // 小组件
        const widget = new ListWidget()
        let contentStack = widget.addStack()
        contentStack.layoutVertically()
        // 整体内容居中对齐
        contentStack.centerAlignContent()

        //>>>>>1
        contentStack.addSpacer(10)
        const titleStack = contentStack.addStack()
        titleStack.layoutHorizontally()
        titleStack.centerAlignContent()
        titleStack.addSpacer()
        // 天气Icon
        let weatherImg = undefined
        if (widgetConfigs.useSF) {
            weatherImg = this.getSFSymbol(widgetConfigs.weatherSFIcos[weatherInfo.weatherIco])
        } else {
            weatherImg = await this.getImageByUrl(weatherIcos[weatherInfo.weatherIco])
        }
        // 显示天气
        let imgWidget = titleStack.addImage(weatherImg)
        imgWidget.imageSize = widgetConfigs.bigWeatherIconSize
        titleStack.addSpacer(8)
        let temperatureTips = weatherInfo.temperature
        // 是否打开天气描述
        if (widgetConfigs.openWeatherDesc) {
            temperatureTips = `${temperatureTips}°`
        } else {
            temperatureTips = `${temperatureTips}°C`
        }
        // 显示温度
        let textWidget = titleStack.addText(`${temperatureTips}`)
        textWidget.font = this.applyTemperatureFont()
        textWidget.textColor = this.applyDefaultTextColor()
        titleStack.addSpacer(8)
        // 是否打开天气描述
        if (widgetConfigs.openWeatherDesc) {
            // 天气描述 
            const weatherDesc = widgetConfigs.weatherDesc[weatherInfo.weatherIco]
            // 添加显示
            textWidget = titleStack.addText(`${weatherDesc} • `)
            textWidget.font = this.applyWeatherDescFont()
            textWidget.textColor = this.applyDefaultTextColor()
            textWidget.lineLimit = 1
        }
        //////////////////////////////////
        // 问候语获取内容
        const greeting = this.provideGreeting(currentDate, lunarInfo.infoLunarText)
        // 添加显示标题
        if (widgetConfigs.titleUseCustomFont && this.strContainCn(greeting)) {
            // 缩小字体
            const greetingFontSize = widgetConfigs.greetingFontSize - 4
            const fontUrl = widgetConfigs.cnFontUrl
            const image = await this.drawTextWithCustomFont(fontUrl, greeting, greetingFontSize, widgetConfigs.defaultTextColorHex)
            const imgSpan = titleStack.addImage(image)
            imgSpan.imageSize = new Size(image.size.width / 2, image.size.height / 2)
            imgSpan.centerAlignImage()
        } else {
            textWidget = titleStack.addText(`${greeting}`)
            textWidget.font = this.applyGreetingFont()
            textWidget.textColor = this.applyDefaultTextColor()
            textWidget.lineLimit = 1
        }

        titleStack.addSpacer()

        /////////////////////////////////////////////////////////////
        //>>>>>2
        // 年月日周
        contentStack.addSpacer(8)
        const dateStack = contentStack.addStack()
        dateStack.layoutHorizontally()
        dateStack.centerAlignContent()
        dateStack.addSpacer()
        const dateStr = this.getDateStr(currentDate, widgetConfigs.dateFormater, widgetConfigs.locale)

        // 农历信息
        const infoLunarText = lunarInfo.infoLunarText
        const holidayText = lunarInfo.holidayText
        let dateFullText = `${dateStr} ⊙ ${infoLunarText}`
        if (holidayText.length != 0) {
            dateFullText = `${dateFullText} ⊙ ${holidayText}`
        }
        // 显示
        if (widgetConfigs.dateUseCustomFont) {
            const fontUrl = widgetConfigs.cnFontUrl
            const image = await this.drawTextWithCustomFont(fontUrl, dateFullText, widgetConfigs.dateFontSize, widgetConfigs.dateTextColorHex)
            const imgSpan = dateStack.addImage(image)
            imgSpan.imageSize = new Size(image.size.width / 2, image.size.height / 2)
            imgSpan.centerAlignImage()
        } else {
            textWidget = dateStack.addText(`${dateFullText}`)
            textWidget.font = this.applyDateFont()
            textWidget.textColor = this.applyColor(widgetConfigs.dateTextColorHex, 0.8)
            textWidget.lineLimit = 1
        }
        dateStack.addSpacer()

        /////////////////////////////////////////////////////////////
        // 模式轮播
        const cacheKey = 'mode'
        let carouselIndex = 0
        if (Keychain.contains(cacheKey)) {
            let cacheString = Keychain.get(cacheKey)
            carouselIndex = parseInt(cacheString)
            console.log(`索引缓存值---${index}`);
        }
        /////////////////////////////////////////////////////////////
        if (carouselIndex == 0 && widgetConfigs.throwLineCharMode != 1 || widgetConfigs.throwLineCharMode == 3 || widgetConfigs.colorBgMode) {
            console.log(`---普通模式---`);
            carouselIndex = 1
            Keychain.set(cacheKey, `${carouselIndex}`)
            // 普通模式
            //>>>>>3
            contentStack.addSpacer(8)
            const weatherTipsStack = contentStack.addStack()
            weatherTipsStack.layoutHorizontally()
            weatherTipsStack.centerAlignContent()
            weatherTipsStack.addSpacer()
            // 天气预警、预告信息
            const weatherAlertInfo = weatherInfo.alertWeatherTitle
            let weatherDesc = weatherInfo.weatherDesc
            if (weatherAlertInfo != undefined) {
                weatherDesc = weatherAlertInfo
            }
            // 添加显示天气预告信息
            const tipText = `Φ ${weatherDesc} ⊙ 指数≒${weatherInfo.comfort} Φ`
            if (widgetConfigs.weatherDescUseCustomFont) {
                const fontUrl = widgetConfigs.cnFontUrl
                const image = await this.drawTextWithCustomFont(fontUrl, tipText, widgetConfigs.weatherTipsFontSize, widgetConfigs.defaultTextColorHex)
                const imgSpan = weatherTipsStack.addImage(image)
                imgSpan.imageSize = new Size(image.size.width / 2, image.size.height / 2)
                imgSpan.centerAlignImage()
            } else {
                textWidget = weatherTipsStack.addText(tipText)
                textWidget.font = this.applyWeatherTipsFont()
                textWidget.textColor = this.applyDefaultTextColor()
                textWidget.lineLimit = 1
            }
            weatherTipsStack.addSpacer()

            /////////////////////////////////////////////////////////////
            //>>>>>4
            contentStack.addSpacer(8)
            const infoStack = contentStack.addStack()
            infoStack.layoutHorizontally()
            infoStack.centerAlignContent()
            infoStack.addSpacer()
            // 内容
            let contentInfo = ""
            if (schedules.length != 0) {
                const scheduleObj = schedules[0]
                contentInfo = `“${scheduleObj.title}” ━ ⊱${scheduleObj.timeText}⊰`
            } else {
                const contentFillMode = widgetConfigs.contentFillMode
                if (contentFillMode == 0) {
                    // 内容轮播
                    console.log(`内容轮播...`);
                    let contentIndex = this.carouselIndex('content', 3)
                    if (contentIndex == 0) {
                        // 请求一言
                        console.log(`请求一言...`);
                        contentInfo = await this.getOneWord()
                    } else if (contentIndex == 1) {
                        // 请求丁香医生健康日历
                        console.log(`请求丁香...`);
                        contentInfo = await this.getDxHealthCalendar()
                    } else {
                        // 请求今日诗词
                        console.log(`请求诗词...`);
                        contentInfo = await this.getPoetry()
                    }
                } else if (contentFillMode == 1) {
                    // 请求一言
                    console.log(`请求一言...`);
                    contentInfo = await this.getOneWord()
                } else if (contentFillMode == 2) {
                    // 请求丁香医生健康日历
                    console.log(`请求丁香...`);
                    contentInfo = await this.getDxHealthCalendar()
                } else if (contentFillMode == 3) {
                    // 请求今日诗词
                    console.log(`请求诗词...`);
                    contentInfo = await this.getPoetry()
                }
            }
            // 添加今日tips
            infoStack.backgroundColor = this.applyColor(widgetConfigs.contentBgHex, 0.2)
            infoStack.cornerRadius = 4
            infoStack.setPadding(6, 6, 6, 6)
            // 添加内容
            if (widgetConfigs.contentUseCustomFont) {
                const fontUrl = widgetConfigs.cnFontUrl
                const image = await this.drawTextWithCustomFont(fontUrl, contentInfo, widgetConfigs.contentFontSize, widgetConfigs.contentTextColorHex)
                const imgSpan = infoStack.addImage(image)
                imgSpan.imageSize = new Size(image.size.width / 2, image.size.height / 2)
                imgSpan.centerAlignImage()
            } else {
                textWidget = infoStack.addText(contentInfo)
                textWidget.font = this.applyContentFont()
                textWidget.textColor = this.applyColor(widgetConfigs.contentTextColorHex, 0.7)
                textWidget.lineLimit = 1
                textWidget.centerAlignText()
            }
            infoStack.addSpacer()


            /////////////////////////////////////////////////////////////
            //>>>>>5
            // 图标大小
            const iconSize = widgetConfigs.lovelyIconSize
            const spacer = 8
            // 图标边距
            const iconMargin = 10
            contentStack.addSpacer(spacer)
            let updateStack = contentStack.addStack()
            updateStack.layoutHorizontally()
            updateStack.centerAlignContent()
            updateStack.addSpacer()
            // 显示底部图标栏1
            const lovelyImgArr = widgetConfigs.lovelyImgArr
            // 缓存目录
            let lovelyImg = await this.getImageByUrl(lovelyImgArr[0])
            imgWidget = updateStack.addImage(lovelyImg)
            imgWidget.imageSize = iconSize
            updateStack.addSpacer(iconMargin)

            // 显示底部图标栏2
            // 缓存目录
            lovelyImg = await this.getImageByUrl(lovelyImgArr[1])
            imgWidget = updateStack.addImage(lovelyImg)
            imgWidget.imageSize = iconSize
            updateStack.addSpacer(iconMargin)

            // 显示底部图标栏3
            // 缓存目录
            lovelyImg = await this.getImageByUrl(lovelyImgArr[2])
            imgWidget = updateStack.addImage(lovelyImg)
            imgWidget.imageSize = iconSize
            updateStack.addSpacer(iconMargin)

            // 显示底部图标栏4
            // 缓存目录
            lovelyImg = await this.getImageByUrl(lovelyImgArr[3])
            imgWidget = updateStack.addImage(lovelyImg)
            imgWidget.imageSize = iconSize
            updateStack.addSpacer(iconMargin)

            // 添加更新时间
            const updateText = `${this.getDateStr(new Date(), "HH:mm")} updated`
            // 添加内容
            textWidget = updateStack.addText(updateText)
            textWidget.font = this.applyUpdateFont()
            textWidget.textColor = this.applyColor(widgetConfigs.updateTextColorHex, 0.6)
            textWidget.lineLimit = 1
            updateStack.addSpacer(iconMargin)

            // 显示底部图标栏5
            // 缓存目录
            lovelyImg = await this.getImageByUrl(lovelyImgArr[4])
            imgWidget = updateStack.addImage(lovelyImg)
            imgWidget.imageSize = iconSize
            updateStack.addSpacer(iconMargin)

            // 显示底部图标栏6
            // 缓存目录
            lovelyImg = await this.getImageByUrl(lovelyImgArr[5])
            imgWidget = updateStack.addImage(lovelyImg)
            imgWidget.imageSize = iconSize
            updateStack.addSpacer(iconMargin)

            // 显示底部图标栏7
            // 缓存目录
            lovelyImg = await this.getImageByUrl(lovelyImgArr[6])
            imgWidget = updateStack.addImage(lovelyImg)
            imgWidget.imageSize = iconSize
            updateStack.addSpacer(iconMargin)

            // 显示底部图标栏8
            // 缓存目录
            lovelyImg = await this.getImageByUrl(lovelyImgArr[7])
            imgWidget = updateStack.addImage(lovelyImg)
            imgWidget.imageSize = iconSize

            //
            updateStack.addSpacer()
        } else {
            /////////////////////////////////////////////////////////////
            carouselIndex = 0
            Keychain.set(cacheKey, `${carouselIndex}`)
            console.log(`---折线图模式---`);
            const width = this.getWidgetWidthSize('中号', widgetConfigs.isIphone12Mini)
            // 折线画板高度
            const height = 80

            const drawContext = new DrawContext()
            drawContext.respectScreenScale = true
            drawContext.size = new Size(width, height)
            drawContext.opaque = false
            drawContext.setTextAlignedCenter()

            const startX = 35 // 起点
            const weatherIcoCount = 8 // icon数量
            const perSize = (width - 2 * startX) / (weatherIcoCount - 1) // 每个item间隔
            const coordArr = [] // 所有坐标
            const foldArea = height - 40 // 温度曲线所占高度
            const foldY = 20 // 垂直开始位置
            const areaSize = 20

            // 温度差
            let subWeatherArr = weatherInfo.hourly.slice(0, 8)
            subWeatherArr = subWeatherArr.sort(function (a, b) { return a.temperature - b.temperature })
            const maxTemperature = subWeatherArr[subWeatherArr.length - 1].temperature
            const minTemperature = subWeatherArr[0].temperature
            let temperatureDifference = maxTemperature - minTemperature
            temperatureDifference = Math.max(1, temperatureDifference)
            // 每一度所占高度
            const perTemperatureSize = (foldArea - areaSize) / temperatureDifference

            for (var index = 0; index < weatherIcoCount; index++) {
                let hourlyTemperature = weatherInfo.hourly[index]
                let imgCoorX = startX - areaSize / 2 + perSize * index
                let imgCoorY = foldY + (maxTemperature - hourlyTemperature.temperature) * perTemperatureSize
                coordArr.push(imgCoorX)
                coordArr.push(imgCoorY)
            }

            let temperatureIndex = 0
            for (var index = 0; index < weatherIcoCount * 2; index = index + 2) {
                let hourlyTemperature = weatherInfo.hourly[temperatureIndex]

                // 连线
                if (index <= weatherIcoCount * 2 - 2 * 2) {
                    let x1 = coordArr[index] + areaSize / 2 - 2
                    let y1 = coordArr[index + 1] + areaSize / 2 - 2
                    let x2 = coordArr[index + 2] + areaSize / 2 - 2
                    let y2 = coordArr[index + 3] + areaSize / 2 - 2
                    this.drawLine(drawContext, x1, y1, x2, y2, 1.3, this.applyColor(widgetConfigs.foldLineColorHex, 0.5))
                }

                // 天气图标
                let weatherIconX = coordArr[index]
                let weatherIconY = coordArr[index + 1]
                if (widgetConfigs.useSF) {
                    let img = this.getSFSymbol(widgetConfigs.weatherSFIcos[hourlyTemperature.skycon])
                    this.drawImage(drawContext, img, weatherIconX, weatherIconY - 3)
                } else {
                    const img = await this.getImageByUrl(weatherIcos[hourlyTemperature.skycon])
                    // 缩放因子
                    const scaleFactor = img.size.width / areaSize
                    const rect = new Rect(weatherIconX, weatherIconY, areaSize, img.size.height / scaleFactor)
                    drawContext.drawImageInRect(img, rect)
                }

                // 温度
                let weatherX = coordArr[index] + 4
                let weatherY = weatherIconY - areaSize / 2 - 3
                this.drawText(drawContext, `${hourlyTemperature.temperature}°`, 9, weatherX, weatherY)

                // 时间
                let timeX = weatherX
                let timeY = foldArea + foldY + areaSize / 3
                let timeText = this.getDateStr(new Date(hourlyTemperature.datetime), "HH", widgetConfigs.locale)
                this.drawText(drawContext, `${timeText}`, 10, timeX, timeY)

                temperatureIndex++
            }

            contentStack.addSpacer(5)
            const foldLineStack = contentStack.addStack()
            foldLineStack.size = new Size(width, height)
            foldLineStack.layoutHorizontally()
            imgWidget = foldLineStack.addImage(drawContext.getImage())
            imgWidget.centerAlignImage()
        }

        //
        contentStack.addSpacer()

        if (!widgetConfigs.colorBgMode) {
            // 手动设置组件背景
            widget.backgroundImage = this.bgImg
        } else {
            // 设置纯色背景 
            widget.backgroundColor = widgetConfigs.bgColor
        }

        return widget
    }

    /**
     * @渲染
     */
    async render() {
        // 下载更新
        if (widgetConfigs.openDownload && config.runsInApp) {
            const message = "同步彩云天气远程脚本？"
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
if (widgetConfigs.apiKey.length == 0) {
    console.error(`请先填入彩云的ApiKey!!`)
} else {
    await Running(Widget, Script.name(), false)
}
