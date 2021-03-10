// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: user-astronaut;
/**
* Author:LSP
* Date:2021-03-10
* 公众号：杂货万事屋
*/
// @导入引用开发环境
if (typeof require === 'undefined') require = importModule
const { Base } = require("./lsp环境")

// @小组件配置
const widgetConfigs = {
    // 时间颜色
    timeColor: new Color("#EA4041"),
    // 时间字体
    timeFont: Font.mediumRoundedSystemFont(18),

    // 周颜色
    weekColor: new Color("#1A94BC", 1),
    // 周字体
    weekFont: Font.mediumRoundedSystemFont(16),

    // 年月日颜色
    fullYearColor: new Color("#CDD1D3", 0.9),
    fullYearFont: Font.regularRoundedSystemFont(14),

    // 农历颜色
    lunarColor: new Color("#F9F4DC", 1),
    // 农历字体
    lunarFont: Font.regularRoundedSystemFont(15),

    // 日程字体
    scheduleFont: Font.systemFont(11),

    // 打开更新，直接同步脚本
    openDownload: true,
    // 是否使用GitHub仓库地址同步
    useGithub: false,
    // 缓存刷新时间--估算(单位：分钟)
    refreshInterval: 30,

    // 透明背景图片
    selectPicBg: false,
    // 纯色背景模式
    colorBgMode: true,
    // 组件背景色
    bgColor: new Color("#1F2932"),

    padding: {
        top: 12, // 上边距
        left: 10, // 左边距
        bottom: 12, // 底边距
        right: 10, // 右边距
    },

    // 预览模式：0：小尺寸，1：中等尺寸，2：大尺寸，负数：不预览
    previewMode: 0,
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
                    lunarYearText = document.querySelector('div.wnrl_k_you_id_wnrl_nongli_ganzhi').innerText
                    lunarYearText = lunarYearText.slice(0, lunarYearText.indexOf('年')+1)
                    if (infoLunarText.search(holidayText) != -1) {
                        holidayText = ''
                    }
                } catch {
                    holidayText = ''
                }
                return { infoLunarText: infoLunarText, holidayText: holidayText , lunarYearText: lunarYearText}
            }

            getData()
        `

        // 节日数据  
        const response = await webview.evaluateJavaScript(getData, false)
        console.log(`农历输出：${JSON.stringify(response)}`);

        return response
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
        return timeInterval
    }

    /**
    * 获取手机日程
    */
    async getSchedules() {
        let showSchedules = []
        // 今日行程
        const todaySchedules = await CalendarEvent.today([])
        for (const schedule of todaySchedules) {
            if (this.shouldShowSchedule(schedule)) {
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
                if (schedule.isAllDay) {
                    scheduleObj.text = `${schedule.title} 今天`
                } else {
                    let timeText = startHour + ":" + startMinute
                    scheduleObj.text = `${schedule.title} ${timeText}`
                }

                // 日程颜色
                scheduleObj.color = schedule.calendar.color
                log(`>>日程：${scheduleObj.text}`)
                showSchedules.push(scheduleObj)
            }
        }

        // 明日行程
        const tomorrowSchedules = await CalendarEvent.tomorrow([])
        for (const schedule of tomorrowSchedules) {
            log("@" + tomorrowSchedules.size)
            if (this.shouldShowSchedule(schedule)) {
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
                if (schedule.isAllDay) {
                    scheduleObj.text = `${schedule.title} 明天`
                } else {
                    let timeText = "明天 " + startHour + ":" + startMinute
                    scheduleObj.text = `${schedule.title} ${timeText}`
                }

                // 日程颜色
                scheduleObj.color = schedule.calendar.color
                log(`>>日程：${scheduleObj.text}`)
                showSchedules.push(scheduleObj)
            }
        }

        // 获取本周日程
        let startDate = new Date()
        startDate.setTime(startDate.getTime() + 2 * 24 * 60 * 60 * 1000)
        let endDate = new Date()
        endDate.setTime(endDate.getTime() + 7 * 24 * 60 * 60 * 1000)
        const thisWeekSchedules = await CalendarEvent.between(startDate, endDate, [])
        for (const schedule of thisWeekSchedules) {
            if (this.shouldShowSchedule(schedule)) {
                // 日程
                let scheduleObj = {}
                // 开始时间
                const startDate = schedule.startDate
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
                if (schedule.isAllDay) {
                    scheduleObj.text = `${schedule.title} ${month}月${day}日`
                } else {
                    let timeText = month + "月" + day + "日 " + startHour + ":" + startMinute
                    scheduleObj.text = `${schedule.title} ${timeText}`
                }

                // 日程颜色
                scheduleObj.color = schedule.calendar.color
                log(`>>日程：${scheduleObj.text}`)
                showSchedules.push(scheduleObj)
            }
        }

        return showSchedules
    }

    /**
     * 组件渲染
     */
    async renderUI() {
        //-------------------------------------
        const widget = new ListWidget()
        //-------------------------------------

        // 当前日期
        const currentDate = new Date()

        // 写入内容
        let stack = widget.addStack()
        const timeStack = stack.addStack()
        timeStack.layoutVertically()
        timeStack.bottomAlignContent()
        // 时间
        let widgetDate = timeStack.addDate(new Date())
        widgetDate.date = new Date(new Date(new Date().toLocaleDateString()).getTime())
        widgetDate.applyTimerStyle()
        widgetDate.textColor = widgetConfigs.timeColor
        widgetDate.font = widgetConfigs.timeFont
        // 星期几
        stack.addSpacer()
        const weekStack = stack.addStack()
        weekStack.layoutVertically()
        weekStack.bottomAlignContent()
        const week = this.getDateStr(currentDate, 'EEE', "en")
        console.log(`week:${week}`)
        let widgetText = stack.addText(week)
        widgetText.textColor = widgetConfigs.weekColor
        widgetText.font = widgetConfigs.weekFont

        // 年月日
        const dateText = this.getDateStr(currentDate, 'yyyy年MM月dd日')
        console.log(`dateText:${dateText}`)
        widget.addSpacer(6)
        stack = widget.addStack()
        stack.addSpacer()
        widgetText = stack.addText(dateText)
        widgetText.textColor = widgetConfigs.fullYearColor
        widgetText.font = widgetConfigs.fullYearFont
        stack.addSpacer()

        // 请求农历信息
        const lunarInfo = await this.getLunar()
        // 农历
        widget.addSpacer(5)
        stack = widget.addStack()
        stack.addSpacer()
        widgetText = stack.addText(lunarInfo.lunarYearText)
        widgetText.textColor = widgetConfigs.lunarColor
        widgetText.font = widgetConfigs.lunarFont
        stack.addSpacer(5)
        widgetText = stack.addText(lunarInfo.infoLunarText)
        widgetText.textColor = widgetConfigs.lunarColor
        widgetText.font = widgetConfigs.lunarFont
        stack.addSpacer()
        widget.addSpacer(11)

        // 本周日程
        const schedules = await this.getSchedules()
        for (let index = 0; index < schedules.length; index++) {
            const schedule = schedules[index]
            if (index < 3) {
                stack = widget.addStack()
                widget.addSpacer(5)
                widgetText = stack.addText(`▌${schedule.text}`)
                widgetText.textColor = schedule.color
                widgetText.textOpacity = 0.8
                widgetText.font = widgetConfigs.scheduleFont
                widgetText.lineLimit = 1
            }
        }


        //-------------------------------------
        return widget
        //-------------------------------------
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
            let downloadURL = "https://mashangkaifa.coding.net/p/coding-code-guide/d/Scriptable/git/raw/master/material_weather.js"
            if (widgetConfigs.useGithub) {
                downloadURL = "https://raw.githubusercontent.com/Enjoyee/Scriptable/new/%E5%B0%8F%E6%97%A5%E5%8E%86/%E5%B0%8F%E6%97%A5%E5%8E%86.js"
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

    //-------------------------------------
    /**
     * @渲染小组件
     */
    async render() {
        // 下载更新
        if (widgetConfigs.openDownload && config.runsInApp) {
            const message = "同步远程脚本？"
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
