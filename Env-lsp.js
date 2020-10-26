// Variables used by Scriptable.

/* -----------------------------------------------
这是一份模板，可以导入进行使用里面封装的方法变量，谨慎修改!!
----------------------------------------------- */

//------------------------------------------------
const fm = FileManager.local()
let path = ""
let exports = {}
//------------------------------------------------
let configs = {
    previewSize: "Medium", // 预览大小【小：Small，中：Medium，大：Large】
    changePicBg: true, // 是否需要更换背景
    colorMode: false, // 是否是纯色背景
    bgColor: undefined, // 小组件背景色
    topPadding: 0, // 内容区边距
    leftPadding: 0, // 内容区边距
    bottomPadding: 0, // 内容区边距
    rightPadding: 0, // 内容区边距
    refreshInterval: 0 // 刷新间隔，单位分钟，非精准，会有3-5分钟差距
}
exports.configs = configs
//------------------------------------------------
// 标题样式定义
const textStyle = {
    stack: undefined, // 加入到哪个内容栈显示
    marginStart: 0, // 开始距离，水平方向的就是左边距离，垂直方向的就是顶部距离
    marginEnd: 0, // 结束距离，水平方向的就是右边距离，垂直方向的就是底部距离
    text: "", // 显示的文字
    width: 0, // 宽
    height: 0, // 长
    lineLimit: 0, // 行数控制，0是全部展示
    font: undefined, // 字体
    textColor: undefined, // 文字颜色
}
exports.textStyle = textStyle
//------------------------------------------------
// 图片样式定义
const imgStyle = {
    stack: undefined, // 加入到哪个内容栈显示
    marginStart: 0, // 开始距离，水平方向的就是左边距离，垂直方向的就是顶部距离
    marginEnd: 0, // 结束距离，水平方向的就是右边距离，垂直方向的就是底部距离
    img: undefined, // 图片资源
    width: 50, // 宽
    height: 50, // 长
    tintColor: undefined, // 图片渲染颜色
}
exports.imgStyle = textStyle
//------------------------------------------------




//------------------------------------------------
exports.run = async function (scriptName, widget) {
    let appearance = (await exports.isUsingDarkAppearance()) ? 'dark' : 'light'
    let appearanceStr = appearance == 'dark' ? '暗黑模式' : '白天模式'


    let fileImgName = `${scriptName}-${appearance}.jpg`
    path = fm.joinPath(fm.documentsDirectory(), fileImgName)

    if (!exports.configs.changePicBg || exports.configs.colorMode || config.runsInWidget) {
        // 结束并且进行预览
        completeWidget(widget)
        return
    }

    const okTips = `您的小部件在${appearanceStr}下的背景已准备就绪，请退到桌面查看即可。`
    let message = "图片模式支持相册照片&背景透明"
    let options = ["图片选择", "透明背景"]
    let isTransparentMode = await generateAlert(message, options)
    if (!isTransparentMode) {
        let img = await Photos.fromLibrary()
        message = okTips
        const resultOptions = ["好的"]
        await generateAlert(message, resultOptions)
        fm.writeImage(path, img)
    } else {
        message = "以下是【透明背景】生成步骤，如果你没有屏幕截图请退出，并返回主屏幕长按进入编辑模式。滑动到最右边的空白页截图，然后重新运行！"
        let exitOptions = ["继续(已有截图)", "退出(没有截图)"]

        let shouldExit = await generateAlert(message, exitOptions)
        if (shouldExit) return

        // Get screenshot and determine phone size.
        let img = await Photos.fromLibrary()
        let height = img.size.height
        let phone = phoneSizes()[height]
        if (!phone) {
            message = "您似乎选择了非iPhone屏幕截图的图像，或者不支持您的iPhone。请使用其他图像再试一次!"
            await generateAlert(message, ["好的！我现在去截图"])
            return
        }

        // Prompt for widget size and position.
        message = "您想要创建什么尺寸的小部件？"
        let sizes = ["小号", "中号", "大号"]
        let size = await generateAlert(message, sizes)
        let widgetSize = sizes[size]

        message = "您想它在什么位置？"
        message += (height == 1136 ? " (请注意，您的设备仅支持两行小部件，因此中间和底部选项相同。)" : "")

        // Determine image crop based on phone size.
        let crop = { w: "", h: "", x: "", y: "" }
        if (widgetSize == "小号") {
            crop.w = phone.小号
            crop.h = phone.小号
            let positions = ["顶部 左边", "顶部 右边", "中间 左边", "中间 右边", "底部 左边", "底部 右边"]
            let position = await generateAlert(message, positions)

            // Convert the two words into two keys for the phone size dictionary.
            let keys = positions[position].split(' ')
            crop.y = phone[keys[0]]
            crop.x = phone[keys[1]]

        } else if (widgetSize == "中号") {
            crop.w = phone.中号
            crop.h = phone.小号

            // 中号 and 大号 widgets have a fixed x-value.
            crop.x = phone.左边
            let positions = ["顶部", "中间", "底部"]
            let position = await generateAlert(message, positions)
            let key = positions[position].toLowerCase()
            crop.y = phone[key]

        } else if (widgetSize == "大号") {
            crop.w = phone.中号
            crop.h = phone.大号
            crop.x = phone.左边
            let positions = ["顶部", "底部"]
            let position = await generateAlert(message, positions)

            // 大号 widgets at the 底部 have the "中间" y-value.
            crop.y = position ? phone.中间 : phone.顶部
        }

        // Crop image and finalize the widget.
        let imgCrop = cropImage(img, new Rect(crop.x, crop.y, crop.w, crop.h))

        message = okTips
        const resultOptions = ["好的"]
        await generateAlert(message, resultOptions)
        fm.writeImage(path, imgCrop)
    }

    // 结束并且进行预览
    completeWidget(widget)
}
//------------------------------------------------
function completeWidget(widget) {
    // 刷新间隔
    const refreshInterval = exports.configs.refreshInterval
    if (refreshInterval > 0) {
        widget.refreshAfterDate = new Date(new Date() + 1000*60*refreshInterval)
    }
    // 背景
    if (exports.configs.colorMode) {
        widget.backgroundColor = exports.configs.bgColor
    } else {
        widget.backgroundImage = fm.readImage(path)
    }
    // 设置边距(上，左，下，右)
    widget.setPadding(exports.configs.topPadding, exports.configs.leftPadding, exports.configs.bottomPadding, exports.configs.rightPadding)
    // 设置组件
    Script.setWidget(widget)
    // 完成脚本
    Script.complete()
    // 预览
    if (exports.configs.previewSize == "Large") {
        widget.presentLarge()
    } else if (exports.configs.previewSize == "Medium") {
        widget.presentMedium()
    } else {
        widget.presentSmall()
    }
}
//------------------------------------------------
// Generate an alert with the provided array of options.
async function generateAlert(message, options) {
    let alert = new Alert()
    alert.message = message

    for (const option of options) {
        alert.addAction(option)
    }

    let response = await alert.presentAlert()
    return response
}
//------------------------------------------------
// Crop an image into the specified rect.
function cropImage(img, rect) {
    let draw = new DrawContext()
    draw.size = new Size(rect.width, rect.height)
    draw.drawImageAtPoint(img, new Point(-rect.x, -rect.y))
    return draw.getImage()
}
//------------------------------------------------
// Pixel sizes and positions for widgets on all supported phones.
function phoneSizes() {
    let phones = {
        "2340": { // 12mini
            "小号": 436,
            "中号": 936,
            "大号": 980,
            "左边": 72,
            "右边": 570,
            "顶部": 212,
            "中间": 756,
            "底部": 1300,
        },

        "2532": { // 12/12 Pro
            "小号": 472,
            "中号": 1012,
            "大号": 1058,
            "左边": 78,
            "右边": 618,
            "顶部": 230,
            "中间": 818,
            "底部": 1408,
        },

        "2778": { // 12 Pro Max
            "小号": 518,
            "中号": 1114,
            "大号": 1162,
            "左边": 86,
            "右边": 678,
            "顶部": 252,
            "中间": 898,
            "底部": 1544,
        },

        "2688": {
            "小号": 507,
            "中号": 1080,
            "大号": 1137,
            "左边": 81,
            "右边": 654,
            "顶部": 228,
            "中间": 858,
            "底部": 1488
        },

        "1792": {
            "小号": 338,
            "中号": 720,
            "大号": 758,
            "左边": 54,
            "右边": 436,
            "顶部": 160,
            "中间": 580,
            "底部": 1000
        },

        "2436": {
            "小号": 465,
            "中号": 987,
            "大号": 1035,
            "左边": 69,
            "右边": 591,
            "顶部": 213,
            "中间": 783,
            "底部": 1353
        },

        "2208": {
            "小号": 471,
            "中号": 1044,
            "大号": 1071,
            "左边": 99,
            "右边": 672,
            "顶部": 114,
            "中间": 696,
            "底部": 1278
        },

        "1334": {
            "小号": 296,
            "中号": 642,
            "大号": 648,
            "左边": 54,
            "右边": 400,
            "顶部": 60,
            "中间": 412,
            "底部": 764
        },

        "1136": {
            "小号": 282,
            "中号": 584,
            "大号": 622,
            "左边": 30,
            "右边": 332,
            "顶部": 59,
            "中间": 399,
            "底部": 399
        }
    }
    return phones
}
//------------------------------------------------
exports.isUsingDarkAppearance = async function() {
    const wv = new WebView()
    let js = "(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)"
    let r = await wv.evaluateJavaScript(js)
    return r
}
//================================================
//================================================
//================================================
//================================================
//================================================
exports.getImage = async function(url) {
    const request = new Request(url)
    const data = await request.loadImage()
    return data
}
//------------------------------------------------
exports.getJson = async function(url) {
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
//------------------------------------------------
exports.alignVerticallyCenterStack = function(alignmentStack) {
    let returnStack = alignmentStack.addStack()
    returnStack.layoutVertically()
    returnStack.centerAlignContent()
    return returnStack
}
//------------------------------------------------
exports.alignHorizontallyCenterStack = function (alignmentStack) {
    let returnStack = alignmentStack.addStack()
    returnStack.layoutHorizontally()
    returnStack.centerAlignContent()
    return returnStack
}
//------------------------------------------------
exports.alignBottomStack = function(alignmentStack, marginBottom) {
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
//------------------------------------------------
exports.alignTopStack = function(alignmentStack, marginTop) {
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
//------------------------------------------------
exports.alignLeftStack = function(alignmentStack, marginLeft) {
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
//------------------------------------------------
exports.alignRightStack = function(alignmentStack, marginRight) {
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
//------------------------------------------------
exports.addStyleImg = function() {
    const imgStyle = exports.imgStyle
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
//------------------------------------------------
exports.addStyleText = function() {
    const textStyle = exports.textStyle
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
//------------------------------------------------
exports.getLocation = async function() {
    let locationData = {
        "latitude": undefined,
        "longitude": undefined,
        "locality": undefined,
        "subLocality": undefined
    }

    // 缓存目录
    const cachePath = fm.joinPath(fm.documentsDirectory(), "env-lsp-location-cache")

    try {
        const location = await Location.current()
        const geocode = await Location.reverseGeocode(location.latitude, location.longitude, "zh_cn")
        locationData.latitude = location.latitude
        locationData.longitude = location.longitude
        const geo = geocode[0]
        // 市
        if (locationData.locality == undefined) {
          locationData.locality = geo.locality
        }
        // 区
        if (locationData.subLocality == undefined) {
          locationData.subLocality = geo.subLocality
        }
        // 街道
        locationData.street = geo.thoroughfare

        // 缓存数据
        fm.writeString(cachePath, JSON.stringify(locationData))

        log("定位信息：latitude=" + location.latitude + "，longitude=" + location.longitude + "，locality="
            + locationData.locality + "，subLocality=" + locationData.subLocality + "，street=" + locationData.street)
    } catch (e) {
        log(`定位出错了，${e.toString()}`)
        // 读取缓存数据
        const locationCache = fm.readString(cachePath)
        log(`读取定位缓存数据：${locationCache}`)
        locationData = JSON.parse(locationCache)
    }

    return locationData
}
//------------------------------------------------
function resetImgStyle() {
    exports.imgStyle.stack = undefined // 加入到哪个内容栈显示
    exports.textStyle.marginStart = 0
    exports.textStyle.marginEnd = 0
    exports.imgStyle.img = undefined // 图片资源
    exports.imgStyle.width = 0 // 宽
    exports.imgStyle.height = 0 // 长
    exports.imgStyle.tintColor = undefined // 图片渲染颜色
}
//------------------------------------------------
function resetTextStyle() {
    exports.textStyle.stack = undefined // 加入到哪个内容栈显示
    exports.textStyle.marginStart = 0
    exports.textStyle.marginEnd = 0
    exports.textStyle.text = "" // 显示的文字
    exports.textStyle.width = 0 // 宽
    exports.textStyle.height = 0 // 长
    exports.textStyle.lineLimit = 0 // 行数控制，0是全部展示
    exports.textStyle.font = undefined // 字体
    exports.textStyle.textColor = undefined // 文字颜色
}

//------------------------------------------------
module.exports = exports
//------------------------------------------------
