// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: user-astronaut;
/**
* Author:LSP
* Date:2021-03-16
* 公众号：杂货万事屋
*/
// @导入引用开发环境
if (typeof require === 'undefined') require = importModule
const { Base } = require("./lsp环境")

// @小组件配置
const widgetConfigs = {
    imgArr: [
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/333206742/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/333206743/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/333206744/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/333206745/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/333206746/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/333206747/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/333206748/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/333206749/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/333206750/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/333206751/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/333206752/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/333206753/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/333206754/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/333206755/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/333206756/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/333206757/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/333206758/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/333206759/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/333206760/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/333206761/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/333206762/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/333206763/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/333206764/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/333206765/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353942/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353943/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353944/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353945/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353946/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353947/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353948/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353949/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353950/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353951/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353952/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353953/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353954/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353955/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353956/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353957/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353958/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353959/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353960/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353961/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353962/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353963/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353964/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353965/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353966/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353967/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353968/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353969/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353970/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353971/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353972/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353973/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353974/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353975/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353976/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353977/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353978/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353979/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353980/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/369353981/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/378622238/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/378622239/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/378622240/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/378622241/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/378622242/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/378622243/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/378622244/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/378622245/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/378622246/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/378622247/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/378622248/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/378622249/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/378622250/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/378622251/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/378622252/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/378622253/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/378622254/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/378622255/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/378622256/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/378622257/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/378622258/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/378622259/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/378622260/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/378622261/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/3190307/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/3190308/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/3190309/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/3190310/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/3190311/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/3190312/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/3190313/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/3190314/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/3190315/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/3190316/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/3190317/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/3190318/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/3190319/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/3190320/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/3190321/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/3190322/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/3190323/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/3190324/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/3190325/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/3190326/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/3190327/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/3190328/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/3190329/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/3190330/iPhone/sticker@2x.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/46993/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/46994/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/46995/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/46996/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/46997/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/46998/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/46999/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47000/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47001/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47002/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47003/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47004/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47005/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47006/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47007/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47008/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47009/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47010/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47011/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47012/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47013/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47014/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47015/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47016/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47017/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47018/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47019/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47020/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47021/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47022/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47023/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47024/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47025/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47026/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47027/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47028/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47029/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47030/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47031/android/sticker.png",
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/47032/android/sticker.png"
    ],

    // 打开更新，直接同步脚本
    openDownload: false,
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
        top: 0, // 上边距
        left: 0, // 左边距
        bottom: 0, // 底边距
        right: 0, // 右边距
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
     * 组件渲染
     */
    async renderUI() {
        //-------------------------------------
        const widget = new ListWidget()
        //-------------------------------------

        const imgUrl = this.getRandowArrValue(widgetConfigs.imgArr)
        const img = await this.getImageByUrl(imgUrl)
        const imgStack = widget.addStack()
        widget.addImage(img)

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
            let downloadURL = "https://gitee.com/enjoyee/scriptable/raw/master/%E6%96%B0%E7%B3%BB%E5%88%97/%E7%BD%91%E7%BB%9C%E5%9B%BE%E7%89%87%E8%BD%AE%E6%92%AD.js"
            if (widgetConfigs.useGithub) {
                downloadURL = "https://raw.githubusercontent.com/Enjoyee/Scriptable/new/%E5%9B%BE%E7%89%87%E8%BD%AE%E6%92%AD/%E7%BD%91%E7%BB%9C%E5%9B%BE%E7%89%87%E8%BD%AE%E6%92%AD.js"
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
