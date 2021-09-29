// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: user-astronaut;
/**
 * 公众号：杂货万事屋
 * Author:LSP
 * Date:2021-09-29
*/

// 当前环境版本号
const VERSION = 20210929

class Base {
    constructor(scriptName) {
        this.init(scriptName)
    }

    init(scriptName, widgetFamily = config.widgetFamily) {
        // 设置脚本名字
        this.scriptName = scriptName
        // 组件大小：small,medium,large
        this.widgetFamily = widgetFamily
        // 本地存储管理
        this.fmLocal = FileManager.local()
        // 设置默认间距
        this.paddingSetting()
        // 默认开启图片模式
        this.setSelectPicBg(true)
        // 默认关闭纯色模式
        this.setColorBgMode(false)
        // 设置默认刷新时间
        this.refreshIntervalTime()
        // 设置预览尺寸-中等
        this.setPreViewSizeMode(1)
    }

    /**
    * 预览模式
    * @param {number} mode 预览尺寸，0：小型，1：中型，2：大型，负数：不进行预览
    */
    setPreViewSizeMode(mode) {
        this.previewSizeMode = mode
    }

    /**
    * 设置组件刷新间隔
    * @param {number}} interval 刷新间隔(单位：分钟)
    */
    refreshIntervalTime(interval = 10) {
        this.refreshInterval = interval
    }

    /**
    * 是否是图片背景模式
    * @param {bool} mode 模式开关
    */
    setSelectPicBg(mode) {
        this.picBgMode = mode
    }

    /**
    * 是否是纯色背景模式
    * @param {bool} mode 模式开关
    * @param {Color} bgColor 背景颜色
    */
    setColorBgMode(mode, bgColor = Color.black()) {
        this.colorBgMode = mode
        this.bgColor = bgColor
    }

    /**
    * 小组件边距设置
    * @param {obj} padding 小组件边距
    */
    paddingSetting(padding = { top: 0, left: 0, bottom: 0, right: 0 }) {
        this.padding = padding
    }

    //==========================================

    /**
    * 字符串是否包含中文
    * @param {string} str 文本
    * @returns 是否包含中文
    */
    strContainCn(str) {
        return /.*[\u4e00-\u9fa5]+.*/.test(str)
    }

    /**
    * 字符串是否全部是中文
    * @param {string} str 文本
    * @returns 是否全部是中文
    */
    strAllCn(str) {
        return /^[\u4e00-\u9fa5]+$/.test(str)
    }

    /**
    * 绘制自定义字体文本
    * @param {string} fontUrl ttf字体url
    * @param {string} text 文本
    * @param {number} fontSize 文本字体大小
    * @param {Color} textColor 文本颜色
    * @param {string} align 文本对齐
    * @param {number} lineLimit 行数
    * @param {number} rowSpacing 行间距
    * @returns 绘制的文字图片
    */
    async drawTextWithCustomFont(fontUrl, text, fontSize, textColor, align = "center", lineLimit = 1, rowSpacing = 5) {
        const font = new CustomFont(new WebView(), {
            fontFamily: 'customFont', // 字体名称
            fontUrl: fontUrl, // 字体地址
            timeout: 60000, // 加载字体的超时时间
        }) // 创建字体
        await font.load() // 加载字体
        const image = await font.drawText(text, {
            fontSize: fontSize, // 字体大小
            textWidth: 0, // 文本宽度
            align: align, // left、right、center
            lineLimit: lineLimit, // 文本行数限制
            rowSpacing: rowSpacing, // 文本行间距
            textColor: textColor, // 文本颜色
            scale: 2, // 缩放因子
        })
        return image
    }

    /**
    * base64 编码字符串
    * @param {string} str 要编码的字符串
    */
    base64Encode(str) {
        const data = Data.fromString(str)
        return data.toBase64String()
    }

    /**
    * base64解码数据 返回字符串
    * @param {string} b64 base64编码的数据
    */
    base64Decode(b64) {
        const data = Data.fromBase64String(b64)
        return data.toRawString()
    }

    /**
    * Http Get 请求接口
    * @param {string} url 请求的url
    * @param {bool} json 返回数据是否为json，默认true
    * @param {Obj} headers 请求头
    * @param {string} pointCacheKey 指定缓存key
    * @param {bool} logable 是否打印数据，默认false
    * @return {string | json | null}
    */
    async httpGet(url, json = true, headers, pointCacheKey, logable = false) {
        console.log("")
        console.log(`----------------------------------------`)

        // 根据URL进行md5生成cacheKey
        let cacheKey = pointCacheKey
        if (cacheKey == undefined || cacheKey == null || cacheKey.length == 0) {
            cacheKey = this.md5(url)
        }
        // 读取本地缓存
        const localCache = this.loadStringCache(cacheKey)

        // 判断是否需要刷新
        const lastCacheTime = this.getCacheModificationDate(cacheKey)
        const timeInterval = Math.floor((this.getCurrentTimeStamp() - lastCacheTime) / 60)
        // 过时且有本地缓存则直接返回本地缓存数据 
        console.log(`httpGet缓存判断，上次缓存时间=${timeInterval}分钟前，缓存过期时间=${this.refreshInterval}分钟，cache=${localCache.length}`)
        if (timeInterval <= this.refreshInterval && localCache != null && localCache.length > 0) {
            console.log(`httpGet读取缓存数据：==> ${url}`)
            // 是否打印响应数据
            if (logable) {
                console.log(``)
                console.log(`httpGet请求响应数据：${localCache}`)
                console.log(``)
            }
            console.log(`----------------------------------------`)
            return json ? JSON.parse(localCache) : localCache
        }

        let data = null
        try {
            console.log(`httpGet在线请求数据：==> ${url}`)
            let req = new Request(url)
            req.method = 'GET'
            if (headers != null && headers != undefined) {
                req.headers = headers
            }
            data = await (json ? req.loadJSON() : req.loadString())
        } catch (e) {
            console.error(`httpGet请求失败：${e}：==> ${url}`)
        }

        // 判断数据是否为空（加载失败）
        if (!data && localCache != null && localCache.length > 0) {
            console.log(``)
            console.log(`httpGet读取缓存数据：==> ${url}`)
            console.log(``)
            console.log(`----------------------------------------`)
            return json ? JSON.parse(localCache) : localCache
        }

        // 存储缓存
        this.saveStringCache(cacheKey, json ? JSON.stringify(data) : data)

        // 是否打印响应数据
        if (logable) {
            console.log(``)
            console.log(`httpGet请求响应数据：${JSON.stringify(data)}`)
            console.log(``)
        }
        console.log(`----------------------------------------`)

        return data
    }

    /**
    * Http POST 请求接口
    * @param {string} url 请求的url
    * @param {Array} parameterKV 请求参数键值对数组
    * @param {bool} json 返回数据是否为json，默认true
    * @param {Obj} headers 请求头
    * @param {string} pointCacheKey 指定缓存key
    * @param {bool} logable 是否打印数据，默认false
    * @return {string | json | null}
    */
    async httpPost(url, parameterKV, json = true, headers, pointCacheKey, logable = false) {
        console.log("")
        console.log(`----------------------------------------`)
        // 根据URL进行md5生成cacheKey
        let cacheKey = pointCacheKey
        if (cacheKey == undefined || cacheKey == null || cacheKey.length == 0) {
            cacheKey = this.md5(url)
        }
        // 读取本地缓存
        const localCache = this.loadStringCache(cacheKey)

        // 判断是否需要刷新
        const lastCacheTime = this.getCacheModificationDate(cacheKey)
        const timeInterval = Math.floor((this.getCurrentTimeStamp() - lastCacheTime) / 60)
        // 过时且有本地缓存则直接返回本地缓存数据
        console.log(`httpPost缓存判断，上次缓存时间=${timeInterval}分钟前，缓存过期时间=${this.refreshInterval}分钟，cache=${localCache.length}`)
        if (timeInterval <= this.refreshInterval && localCache != null && localCache.length > 0) {
            console.log(`httpPost读取缓存数据：==> ${url}`)
            // 是否打印响应数据
            if (logable) {
                console.log(``)
                console.log(`httpPost请求响应数据：${localCache}`)
                console.log(``)
            }
            console.log(`----------------------------------------`)
            return json ? JSON.parse(localCache) : localCache
        }

        let data = null
        try {
            console.log(`httpPost在线请求数据：==> ${url}`)
            let req = new Request(url)
            req.method = 'POST'
            if (headers != null && headers != undefined) {
                req.headers = headers
            }
            for (const parameter of parameterKV) {
                req.addParameterToMultipart(Object.keys(parameter)[0], Object.values(parameter)[0])
            }
            data = await (json ? req.loadJSON() : req.loadString())
        } catch (e) {
            console.error(`httpPost请求失败：${e}：==> ${url}`)
        }

        // 判断数据是否为空（加载失败）
        if (!data && localCache != null && localCache.length > 0) {
            console.log(``)
            console.log(`httpPost读取缓存数据：==> ${url}`)
            console.log(``)
            console.log(`----------------------------------------`)
            return json ? JSON.parse(localCache) : localCache
        }

        // 存储缓存
        this.saveStringCache(cacheKey, json ? JSON.stringify(data) : data)

        // 是否打印响应数据
        if (logable) {
            console.log(``)
            console.log(`httpPost请求响应数据：${JSON.stringify(data)}`)
            console.log(``)
        }
        console.log(`----------------------------------------`)

        return data
    }

    /**
    * 获取手机定位信息
    * @param {string} locale 地区
    * @return 定位信息
    */
    async getLocation(locale = "zh_cn") {
        console.log("")

        console.log(`----------------------------------------`)
        console.log(`开始定位`)
        // 定位信息
        let locationData = {
            "latitude": undefined,
            "longitude": undefined,
            "locality": undefined,
            "subLocality": undefined
        }

        // 缓存key
        const cacheKey = "lsp-location-cache"

        // 判断是否需要刷新
        const lastCacheTime = this.getCacheModificationDate(cacheKey)
        const timeInterval = Math.floor((this.getCurrentTimeStamp() - lastCacheTime) / 60)
        // 缓存数据
        const locationCache = this.loadStringCache(cacheKey)
        console.log(`定位缓存判断，上次缓存时间=${timeInterval}分钟前，缓存过期时间=${this.refreshInterval}分钟，cache=${locationCache.length}`)

        if (timeInterval <= this.refreshInterval && locationCache != null && locationCache.length > 0) {
            // 读取缓存数据
            console.log(`读取定位缓存数据：${locationCache}`)
            locationData = JSON.parse(locationCache)
        } else {
            try {
                const location = await Location.current()
                const geocode = await Location.reverseGeocode(location.latitude, location.longitude, locale)
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
                this.saveStringCache(cacheKey, JSON.stringify(locationData))

                console.log(`定位信息：latitude=${location.latitude}，longitude=${location.longitude}，locality=${locationData.locality}，subLocality=${locationData.subLocality}，street=${locationData.street}`)
            } catch (e) {
                console.log(`定位出错了，${e.toString()}`)
                // 读取缓存数据
                const locationCache = this.loadStringCache(cacheKey)
                console.log(`读取定位缓存数据：${locationCache}`)
                locationData = JSON.parse(locationCache)
            }
        }

        console.log(`----------------------------------------`)
        return locationData
    }

    /**
    * 绘制图片阴影浮层
    * @param {Image} img 图片
    * @param {Color} shadowColor 阴影颜色
    * @return {Image}
    */
    async loadShadowColor2Image(img, shadowColor) {
        let drawContext = new DrawContext()
        drawContext.size = img.size
        // 把图片画上去
        drawContext.drawImageInRect(img, new Rect(0, 0, img.size['width'], img.size['height']))
        // 填充蒙版颜色
        drawContext.setFillColor(shadowColor)
        // 填充
        drawContext.fillRect(new Rect(0, 0, img.size['width'], img.size['height']))
        return await drawContext.getImage()
    }

    /**
    * 获取图片
    * @param {string} url 图片链接
    * @param {string} pointCacheKey 指定缓存key
    * @param {bool} useCache 是否使用缓存
    * @return {Image}
    */
    async getImageByUrl(url, pointCacheKey = null, useCache = true) {
        console.log('')
        console.log(`----------------------------------------`)

        // 根据URL进行md5生成cacheKey
        let cacheKey = pointCacheKey
        let isPointCacheKey = true
        if (cacheKey == undefined || cacheKey == null || cacheKey.length == 0) {
            isPointCacheKey = false
            cacheKey = this.md5(url)
        }


        // 缓存数据
        if (useCache) {
            const cacheImg = this.loadImgCache(cacheKey)
            if (cacheImg != undefined && cacheImg != null) {
                console.log(`图片是否指定了缓存key：${isPointCacheKey}`)
                if (isPointCacheKey) {
                    // 判断是否需要刷新
                    const lastCacheTime = this.getCacheModificationDate(cacheKey)
                    const timeInterval = Math.floor((this.getCurrentTimeStamp() - lastCacheTime) / 60)
                    console.log(`图片缓存判断，上次缓存时间=${timeInterval}分钟前，缓存过期时间=${this.refreshInterval}分钟`)
                    // 是否使用缓存
                    if (timeInterval <= this.refreshInterval) {
                        console.log(`使用缓存图片：${url}`)
                        console.log(`----------------------------------------`)
                        return cacheImg
                    }
                } else {
                    console.log(`使用缓存图片：${url}`)
                    console.log(`----------------------------------------`)
                    return cacheImg
                }

            }
        }


        // 在线
        try {
            console.log(`在线请求图片：${url}`)
            console.log(`----------------------------------------`)
            const req = new Request(url)
            const img = await req.loadImage()
            // 存储到缓存
            this.saveImgCache(cacheKey, img)
            return img
        } catch (e) {
            console.error(`图片加载失败：${e}`)
            // 判断本地是否有缓存，有的话直接返回缓存
            let cacheImg = this.loadImgCache(cacheKey)
            if (cacheImg != undefined) {
                console.log(`使用缓存图片：${url}`)
                console.log(`----------------------------------------`)
                return cacheImg
            }
            // 没有缓存+失败情况下，返回灰色背景
            console.log(`返回默认图片：${url}`)
            console.log(`----------------------------------------`)
            let ctx = new DrawContext()
            ctx.size = new Size(80, 80)
            ctx.setFillColor(Color.darkGray())
            ctx.fillRect(new Rect(0, 0, 80, 80))
            return await ctx.getImage()
        }
    }

    /**
    * 保存字符串到本地
    * @param {string} cacheKey 缓存key
    * @param {string} content 缓存内容
    */
    saveStringCache(cacheKey, content) {
        const cacheFile = this.fmLocal.joinPath(FileManager.local().documentsDirectory(), cacheKey)
        this.fmLocal.writeString(cacheFile, content)
    }

    /**
    * 获取本地缓存字符串
    * @param {string} cacheKey 缓存key
    * @return {string} 本地字符串缓存
    */
    loadStringCache(cacheKey) {
        const cacheFile = this.fmLocal.joinPath(FileManager.local().documentsDirectory(), cacheKey)
        const fileExists = this.fmLocal.fileExists(cacheFile)
        let cacheString = ""
        if (fileExists) {
            cacheString = this.fmLocal.readString(cacheFile)
        }
        return cacheString
    }

    /**
    * 保存图片到本地
    * @param {string} cacheKey 缓存key
    * @param {Image} img 缓存图片
    */
    saveImgCache(cacheKey, img) {
        const cacheFile = this.fmLocal.joinPath(FileManager.local().documentsDirectory(), cacheKey)
        this.fmLocal.writeImage(cacheFile, img)
    }

    /**
    * 获取本地缓存图片
    * @param {string} cacheKey 缓存key
    * @return {Image} 本地图片缓存
    */
    loadImgCache(cacheKey) {
        const cacheFile = this.fmLocal.joinPath(FileManager.local().documentsDirectory(), cacheKey)
        const fileExists = this.fmLocal.fileExists(cacheFile)
        let img = undefined
        if (fileExists) {
            img = this.fmLocal.readImage(cacheFile)
        }
        return img
    }

    /**
    * 获取缓存文件的上次修改时间
    * @param {string} cacheKey 缓存key
    * @return 返回上次缓存文件修改的时间戳(单位：秒)
    */
    getCacheModificationDate(cacheKey) {
        const cacheFile = this.fmLocal.joinPath(FileManager.local().documentsDirectory(), cacheKey)
        const fileExists = this.fmLocal.fileExists(cacheFile)
        if (fileExists) {
            return this.fmLocal.modificationDate(cacheFile).getTime() / 1000
        } else {
            return 0
        }
    }

    /**
    * 获取当前时间戳(单位：秒)
    */
    getCurrentTimeStamp() {
        return new Date().getTime() / 1000
    }

    /**
    * 删除本地缓存
    * @param {string} cacheKey 缓存key
    */
    removeCache(cacheKey) {
        const cacheFile = this.fmLocal.joinPath(FileManager.local().documentsDirectory(), cacheKey)
        this.fmLocal.remove(cacheFile)
    }

    /**
    * 删除本地缓存集合
    * @param {string} cacheKey 缓存key
    */
    removeCaches(cacheKeyList) {
        for (const cacheKey of cacheKeyList) {
            removeCache(cacheKey)
        }
    }

    /**
    * 索引值轮播
    * @param {string} cacheKey 缓存key
    * @param {number} size 轮播大小
    */
    carouselIndex(cacheKey, size) {
        let index = -1
        if (Keychain.contains(cacheKey)) {
            let cacheString = Keychain.get(cacheKey)
            index = parseInt(cacheString)
            console.log(`索引缓存值---${index}`);
        }

        index = index + 1
        index = index % size
        console.log(`索引值轮播---${index}`);
        Keychain.set(cacheKey, `${index}`)
        return index
    }

    /**
    * 格式化时间
    * @param {Date} date 日期
    * @param {DateFormatter} formatter 格式化
    * @param {string} locale 地区
    */
    getDateStr(date, formatter = "yyyy年MM月d日 EEE", locale = "zh_cn") {
        const df = new DateFormatter()
        df.locale = locale
        df.dateFormat = formatter
        return df.string(date)
    }

    /**
    * 获取组件尺寸宽度大小
    * @param {string} size 组件尺寸【小号】、【中号】、【大号】
    * @param {bool} isIphone12Mini 是否是12mini
    */
    getWidgetWidthSize(size, isIphone12Mini) {
        // 屏幕缩放比例
        const screenScale = Device.screenScale()
        // 组件宽度
        let phoneWidgetSize = undefined
        // 手机屏幕高度
        const screenHeight = Device.screenSize().height * screenScale
        if (screenHeight == 2436) {
            // 2436尺寸的手机有【11 Pro, XS, X】 & 【12 mini】
            if (isIphone12Mini) {
                phoneWidgetSize = this.phoneSizes()[screenHeight].mini
            } else {
                phoneWidgetSize = this.phoneSizes()[screenHeight].x
            }
        } else {
            phoneWidgetSize = this.phoneSizes()[screenHeight]
        }
        const width = phoneWidgetSize[size] / screenScale
        return width
    }

    /**
    * 获取上次保存的背景图
    * @return 背景图
    */
    loadLastSavedBgImg() {
        return this.loadImgCache(this.scriptName)
    }

    /**
    * 画图
    * @param {DrawContext} drawContext 画板
    * @param {Image} image 图片
    * @param {number} x 坐标x
    * @param {number} y 坐标y
    */
    drawImage(drawContext, image, x, y) {
        drawContext.drawImageAtPoint(image, new Point(x, y))
    }

    /**
    * 画文本
    * @param {DrawContext} drawContext 画板
    * @param {string} text 文本
    * @param {Font} fontSize 字体
    * @param {number} x 坐标x
    * @param {number} y 坐标y
    * @param {Color} color 颜色
    */
    drawText(drawContext, text, fontSize, x, y, color = Color.white()) {
        drawContext.setFont(Font.boldSystemFont(fontSize))
        drawContext.setTextColor(color)
        drawContext.drawText(new String(text).toString(), new Point(x, y))
    }

    /**
    * 画线
    * @param {DrawContext} drawContext 画板
    * @param {number} x1 坐标
    * @param {number} y1 坐标
    * @param {number} x2 坐标
    * @param {number} y2 坐标
    * @param {*} width 线宽
    * @param {*} color 颜色
    */
    drawLine(drawContext, x1, y1, x2, y2, width = 2, color = Color.white()) {
        const path = new Path()
        path.move(new Point(x1, y1))
        path.addLine(new Point(x2, y2))
        drawContext.addPath(path)
        drawContext.setStrokeColor(color)
        drawContext.setLineWidth(width)
        drawContext.strokePath()
    }

    /**
    * 获取SFSymbol
    * @param {string}} name 名
    * @param {number} size 尺寸
    */
    getSFSymbol(name, size) {
        const sf = SFSymbol.named(name)
        if (sf != null) {
            if (size != undefined && size != null) {
                sf.applyFont(Font.systemFont(size))
            }
            return sf.image
        } else {
            return undefined
        }
    }

    /**
    * 获取widget输入
    * @param {string} defaultInput 默认输入
    */
    getWidgetInput(defaultInput = "") {
        // 获取外部输入的参数
        let widgetInputRAW = args.widgetParameter
        try {
            widgetInputRAW.toString()
        } catch (e) {
            widgetInputRAW = defaultInput
        }
        return widgetInputRAW.toString()
    }

    /**
    * 获取数组的随机索引
    * @param {Array} arr 数组
    */
    getRandowArrValue(arr) {
        // 索引
        const key = parseInt(Math.random() * arr.length)
        let item = arr[key]
        if (item == undefined) {
            item = arr[0]
        }
        return item
    }

    /**
    * md5 加密字符串
    * @param {string} str 要加密成md5的数据
    */
    md5(str) {
        function d(n, t) {
            var r = (65535 & n) + (65535 & t);
            return (((n >> 16) + (t >> 16) + (r >> 16)) << 16) | (65535 & r);
        }

        function f(n, t, r, e, o, u) {
            return d(((c = d(d(t, n), d(e, u))) << (f = o)) | (c >>> (32 - f)), r);
            var c, f;
        }

        function l(n, t, r, e, o, u, c) {
            return f((t & r) | (~t & e), n, t, o, u, c);
        }

        function v(n, t, r, e, o, u, c) {
            return f((t & e) | (r & ~e), n, t, o, u, c);
        }

        function g(n, t, r, e, o, u, c) {
            return f(t ^ r ^ e, n, t, o, u, c);
        }

        function m(n, t, r, e, o, u, c) {
            return f(r ^ (t | ~e), n, t, o, u, c);
        }

        function i(n, t) {
            var r, e, o, u;
            (n[t >> 5] |= 128 << t % 32), (n[14 + (((t + 64) >>> 9) << 4)] = t);
            for (
                var c = 1732584193,
                f = -271733879,
                i = -1732584194,
                a = 271733878,
                h = 0;
                h < n.length;
                h += 16
            )
                (c = l((r = c), (e = f), (o = i), (u = a), n[h], 7, -680876936)),
                    (a = l(a, c, f, i, n[h + 1], 12, -389564586)),
                    (i = l(i, a, c, f, n[h + 2], 17, 606105819)),
                    (f = l(f, i, a, c, n[h + 3], 22, -1044525330)),
                    (c = l(c, f, i, a, n[h + 4], 7, -176418897)),
                    (a = l(a, c, f, i, n[h + 5], 12, 1200080426)),
                    (i = l(i, a, c, f, n[h + 6], 17, -1473231341)),
                    (f = l(f, i, a, c, n[h + 7], 22, -45705983)),
                    (c = l(c, f, i, a, n[h + 8], 7, 1770035416)),
                    (a = l(a, c, f, i, n[h + 9], 12, -1958414417)),
                    (i = l(i, a, c, f, n[h + 10], 17, -42063)),
                    (f = l(f, i, a, c, n[h + 11], 22, -1990404162)),
                    (c = l(c, f, i, a, n[h + 12], 7, 1804603682)),
                    (a = l(a, c, f, i, n[h + 13], 12, -40341101)),
                    (i = l(i, a, c, f, n[h + 14], 17, -1502002290)),
                    (c = v(
                        c,
                        (f = l(f, i, a, c, n[h + 15], 22, 1236535329)),
                        i,
                        a,
                        n[h + 1],
                        5,
                        -165796510,
                    )),
                    (a = v(a, c, f, i, n[h + 6], 9, -1069501632)),
                    (i = v(i, a, c, f, n[h + 11], 14, 643717713)),
                    (f = v(f, i, a, c, n[h], 20, -373897302)),
                    (c = v(c, f, i, a, n[h + 5], 5, -701558691)),
                    (a = v(a, c, f, i, n[h + 10], 9, 38016083)),
                    (i = v(i, a, c, f, n[h + 15], 14, -660478335)),
                    (f = v(f, i, a, c, n[h + 4], 20, -405537848)),
                    (c = v(c, f, i, a, n[h + 9], 5, 568446438)),
                    (a = v(a, c, f, i, n[h + 14], 9, -1019803690)),
                    (i = v(i, a, c, f, n[h + 3], 14, -187363961)),
                    (f = v(f, i, a, c, n[h + 8], 20, 1163531501)),
                    (c = v(c, f, i, a, n[h + 13], 5, -1444681467)),
                    (a = v(a, c, f, i, n[h + 2], 9, -51403784)),
                    (i = v(i, a, c, f, n[h + 7], 14, 1735328473)),
                    (c = g(
                        c,
                        (f = v(f, i, a, c, n[h + 12], 20, -1926607734)),
                        i,
                        a,
                        n[h + 5],
                        4,
                        -378558,
                    )),
                    (a = g(a, c, f, i, n[h + 8], 11, -2022574463)),
                    (i = g(i, a, c, f, n[h + 11], 16, 1839030562)),
                    (f = g(f, i, a, c, n[h + 14], 23, -35309556)),
                    (c = g(c, f, i, a, n[h + 1], 4, -1530992060)),
                    (a = g(a, c, f, i, n[h + 4], 11, 1272893353)),
                    (i = g(i, a, c, f, n[h + 7], 16, -155497632)),
                    (f = g(f, i, a, c, n[h + 10], 23, -1094730640)),
                    (c = g(c, f, i, a, n[h + 13], 4, 681279174)),
                    (a = g(a, c, f, i, n[h], 11, -358537222)),
                    (i = g(i, a, c, f, n[h + 3], 16, -722521979)),
                    (f = g(f, i, a, c, n[h + 6], 23, 76029189)),
                    (c = g(c, f, i, a, n[h + 9], 4, -640364487)),
                    (a = g(a, c, f, i, n[h + 12], 11, -421815835)),
                    (i = g(i, a, c, f, n[h + 15], 16, 530742520)),
                    (c = m(
                        c,
                        (f = g(f, i, a, c, n[h + 2], 23, -995338651)),
                        i,
                        a,
                        n[h],
                        6,
                        -198630844,
                    )),
                    (a = m(a, c, f, i, n[h + 7], 10, 1126891415)),
                    (i = m(i, a, c, f, n[h + 14], 15, -1416354905)),
                    (f = m(f, i, a, c, n[h + 5], 21, -57434055)),
                    (c = m(c, f, i, a, n[h + 12], 6, 1700485571)),
                    (a = m(a, c, f, i, n[h + 3], 10, -1894986606)),
                    (i = m(i, a, c, f, n[h + 10], 15, -1051523)),
                    (f = m(f, i, a, c, n[h + 1], 21, -2054922799)),
                    (c = m(c, f, i, a, n[h + 8], 6, 1873313359)),
                    (a = m(a, c, f, i, n[h + 15], 10, -30611744)),
                    (i = m(i, a, c, f, n[h + 6], 15, -1560198380)),
                    (f = m(f, i, a, c, n[h + 13], 21, 1309151649)),
                    (c = m(c, f, i, a, n[h + 4], 6, -145523070)),
                    (a = m(a, c, f, i, n[h + 11], 10, -1120210379)),
                    (i = m(i, a, c, f, n[h + 2], 15, 718787259)),
                    (f = m(f, i, a, c, n[h + 9], 21, -343485551)),
                    (c = d(c, r)),
                    (f = d(f, e)),
                    (i = d(i, o)),
                    (a = d(a, u));
            return [c, f, i, a];
        }

        function a(n) {
            for (var t = '', r = 32 * n.length, e = 0; e < r; e += 8)
                t += String.fromCharCode((n[e >> 5] >>> e % 32) & 255);
            return t;
        }

        function h(n) {
            var t = [];
            for (t[(n.length >> 2) - 1] = void 0, e = 0; e < t.length; e += 1)
                t[e] = 0;
            for (var r = 8 * n.length, e = 0; e < r; e += 8)
                t[e >> 5] |= (255 & n.charCodeAt(e / 8)) << e % 32;
            return t;
        }

        function e(n) {
            for (var t, r = '0123456789abcdef', e = '', o = 0; o < n.length; o += 1)
                (t = n.charCodeAt(o)),
                    (e += r.charAt((t >>> 4) & 15) + r.charAt(15 & t));
            return e;
        }

        function r(n) {
            return unescape(encodeURIComponent(n));
        }

        function o(n) {
            return a(i(h((t = r(n))), 8 * t.length));
            var t;
        }

        function u(n, t) {
            return (function (n, t) {
                var r,
                    e,
                    o = h(n),
                    u = [],
                    c = [];
                for (
                    u[15] = c[15] = void 0,
                    16 < o.length && (o = i(o, 8 * n.length)),
                    r = 0;
                    r < 16;
                    r += 1
                )
                    (u[r] = 909522486 ^ o[r]), (c[r] = 1549556828 ^ o[r]);
                return (
                    (e = i(u.concat(h(t)), 512 + 8 * t.length)), a(i(c.concat(e), 640))
                );
            })(r(n), r(t));
        }

        function t(n, t, r) {
            return t ? (r ? u(t, n) : e(u(t, n))) : r ? o(n) : e(o(n));
        }

        return t(str);
    }

    /**
    * ------------------------------------------------------------------------------
    */

    /**
    * 透明背景
    * created by Max Zeryck @mzeryck
    */
    async transparentBg() {
        if (config.runsInApp) {
            let imgCrop = undefined
            const tips = "您的小部件背景已准备就绪，退到桌面刷新小组件查看即可"
            // Determine if user has taken the screenshot.
            var message
            message = "如需实现透明背景请先滑到最右边的空白页并截图"
            let options = ["继续选择图片", "退出进行截图", "同步远程环境"]
            let response = await this.generateAlert(message, options)
            // Return if we need to exit.
            if (response == 1) return null

            // Update the code.
            if (response == 2) {
                // Determine if the user is using iCloud.
                let files = FileManager.local()
                const iCloudInUse = files.isFileStoredIniCloud(module.filename)
                // If so, use an iCloud file manager.
                files = iCloudInUse ? FileManager.iCloud() : files
                // Try to download the file.
                try {
                    const req = new Request("https://gitee.com/enjoyee/scriptable/raw/master/%E6%96%B0%E7%B3%BB%E5%88%97/lsp%E7%8E%AF%E5%A2%83.js")
                    const codeString = await req.loadString()
                    files.writeString(module.filename, codeString)
                    message = "环境脚本已更新，下次运行时生效。"
                } catch {
                    message = "更新失败，请稍后再试。"
                }
                options = ["好的"]
                await this.generateAlert(message, options)
                return
            }

            // Get screenshot and determine phone size.
            let img = await Photos.fromLibrary()
            let height = img.size.height
            let phone = this.phoneSizes()[height]
            if (!phone) {
                message = "您似乎选择了非iPhone屏幕截图的图像，或者不支持您的iPhone。请使用其他图像再试一次!"
                await this.generateAlert(message, ["好的"])
                return
            }

            // Extra setup needed for 2436-sized phones.
            if (height == 2436) {
                let files = FileManager.local()
                let cacheName = "lsp-phone-type"
                let cachePath = files.joinPath(files.libraryDirectory(), cacheName)

                // If we already cached the phone size, load it.
                if (files.fileExists(cachePath)) {
                    let typeString = files.readString(cachePath)
                    phone = phone[typeString]

                    // Otherwise, prompt the user.
                } else {
                    message = "你使用什么型号的iPhone？"
                    let types = ["iPhone 12 mini", "iPhone 11 Pro, XS, or X"]
                    let typeIndex = await this.generateAlert(message, types)
                    let type = (typeIndex == 0) ? "mini" : "x"
                    phone = phone[type]
                    files.writeString(cachePath, type)
                }
            }

            // Prompt for widget size and position.
            message = "您想要创建什么尺寸的小部件？"
            let sizes = ["小号", "中号", "大号"]
            let size = await this.generateAlert(message, sizes)
            let widgetSize = sizes[size]

            message = "您想它应用在什么位置？"
            message += (height == 1136 ? " (请注意，您的设备仅支持两行小部件，因此中间和底部选项相同。)" : "")

            // Determine image crop based on phone size.
            let crop = { w: "", h: "", x: "", y: "" }
            if (widgetSize == "小号") {
                crop.w = phone.小号
                crop.h = phone.小号
                let positions = ["顶部 左边", "顶部 右边", "中间 左边", "中间 右边", "底部 左边", "底部 右边"]
                let position = await this.generateAlert(message, positions)

                // Convert the two words into two keys for the phone size dictionary.
                let keys = positions[position].toLowerCase().split(' ')
                crop.y = phone[keys[0]]
                crop.x = phone[keys[1]]

            } else if (widgetSize == "中号") {
                crop.w = phone.中号
                crop.h = phone.小号

                // 中号 and 大号 widgets have a fixed x-value.
                crop.x = phone.左边
                let positions = ["顶部", "中间", "底部"]
                let position = await this.generateAlert(message, positions)
                let key = positions[position].toLowerCase()
                crop.y = phone[key]

            } else if (widgetSize == "大号") {
                crop.w = phone.中号
                crop.h = phone.大号
                crop.x = phone.左边
                let positions = ["顶部", "底部"]
                let position = await this.generateAlert(message, positions)

                // 大号 widgets at the 底部 have the "中间" y-value.
                crop.y = position ? phone.中间 : phone.顶部
            }

            // Prompt for blur style.
            message = "您想要一个完全透明的小部件，还是半透明的模糊效果？"
            let blurOptions = ["透明背景", "浅色模糊", "深色模糊", "完全模糊"]
            let blurred = await this.generateAlert(message, blurOptions)

            // We always need the cropped image.
            imgCrop = this.cropImage(crop, img)

            // If it's blurred, set the blur style.
            if (blurred) {
                const styles = ["", "light", "dark", "none"]
                const style = styles[blurred]
                imgCrop = await this.blurImage(img, crop, style)
            }

            message = tips
            const exportPhotoOptions = ["完成预览", "导出到相册"]
            const exportToPhoto = await this.generateAlert(message, exportPhotoOptions)

            if (exportToPhoto) {
                Photos.save(imgCrop)
            }

            // 保存
            this.saveImgCache(this.scriptName, imgCrop)
        }
    }

    /**
    * 弹窗
    * @param {string} message 信息
    * @param {Array} options 选项
    */
    async generateAlert(message, options) {
        let alert = new Alert()
        alert.message = message

        for (const option of options) {
            alert.addAction(option)
        }

        let response = await alert.presentAlert()
        return response
    }

    /**
    * 裁剪图片
    * @param {Rect} crop 裁剪矩形
    * @param {Image} image 图片
    */
    cropImage(crop, image) {
        let draw = new DrawContext()
        let rect = new Rect(crop.x, crop.y, crop.w, crop.h)
        draw.size = new Size(rect.width, rect.height)

        draw.drawImageAtPoint(image, new Point(-rect.x, -rect.y))
        return draw.getImage()
    }

    /**
    * 高斯模糊
    * @param {Image} img 图片
    * @param {Rect} crop 裁剪的矩形
    * @param {string} style 高斯模糊样式：dark、light
    * @param {number} blur 高斯模糊强度
    */
    async blurImage(img, crop, style, blur = 150) {
        const js = `
            /*
            StackBlur - a fast almost Gaussian Blur For Canvas
            Version:   0.5
            Author:    Mario Klingemann
            Contact:   mario@quasimondo.com
            Website:  http://quasimondo.com/StackBlurForCanvas/StackBlurDemo.html
            Twitter:  @quasimondo
            In case you find this class useful - especially in commercial projects -
            I am not totally unhappy for a small donation to my PayPal account
            mario@quasimondo.de
            Or support me on flattr: 
            https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript
            Copyright (c) 2010 Mario Klingemann
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation
            files (the "Software"), to deal in the Software without
            restriction, including without limitation the rights to use,
            copy, modify, merge, publish, distribute, sublicense, and/or sell
            copies of the Software, and to permit persons to whom the
            Software is furnished to do so, subject to the following
            conditions:
            The above copyright notice and this permission notice shall be
            included in all copies or substantial portions of the Software.
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
            OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
            NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
            HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
            WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
            FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
            OTHER DEALINGS IN THE SOFTWARE.
        */
        var mul_table = [
            512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512,
            454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512,
            482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456,
            437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512,
            497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328,
            320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456,
            446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335,
            329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512,
            505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405,
            399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328,
            324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271,
            268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456,
            451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388,
            385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335,
            332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292,
            289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];
        
        
        var shg_table = [
            9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17,
            17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19,
            19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20,
            20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21,
            21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
            21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22,
            22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
            22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23,
            23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
            23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
            23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
            23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
            24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
            24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
            24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
            24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
        function stackBlurCanvasRGB(id, top_x, top_y, width, height, radius) {
            if (isNaN(radius) || radius < 1) return;
            radius |= 0;
        
            var canvas = document.getElementById(id);
            var context = canvas.getContext("2d");
            var imageData;
        
            try {
                try {
                    imageData = context.getImageData(top_x, top_y, width, height);
                } catch (e) {
        
                    // NOTE: this part is supposedly only needed if you want to work with local files
                    // so it might be okay to remove the whole try/catch block and just use
                    // imageData = context.getImageData( top_x, top_y, width, height );
                    try {
                        netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
                        imageData = context.getImageData(top_x, top_y, width, height);
                    } catch (e) {
                        alert("Cannot access local image");
                        throw new Error("unable to access local image data: " + e);
                        return;
                    }
                }
            } catch (e) {
                alert("Cannot access image");
                throw new Error("unable to access image data: " + e);
            }
        
            var pixels = imageData.data;
        
            var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum,
                r_out_sum, g_out_sum, b_out_sum,
                r_in_sum, g_in_sum, b_in_sum,
                pr, pg, pb, rbs;
        
            var div = radius + radius + 1;
            var w4 = width << 2;
            var widthMinus1 = width - 1;
            var heightMinus1 = height - 1;
            var radiusPlus1 = radius + 1;
            var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
        
            var stackStart = new BlurStack();
            var stack = stackStart;
            for (i = 1; i < div; i++) {
                stack = stack.next = new BlurStack();
                if (i == radiusPlus1) var stackEnd = stack;
            }
            stack.next = stackStart;
            var stackIn = null;
            var stackOut = null;
        
            yw = yi = 0;
        
            var mul_sum = mul_table[radius];
            var shg_sum = shg_table[radius];
        
            for (y = 0; y < height; y++) {
                r_in_sum = g_in_sum = b_in_sum = r_sum = g_sum = b_sum = 0;
        
                r_out_sum = radiusPlus1 * (pr = pixels[yi]);
                g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
                b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
        
                r_sum += sumFactor * pr;
                g_sum += sumFactor * pg;
                b_sum += sumFactor * pb;
        
                stack = stackStart;
        
                for (i = 0; i < radiusPlus1; i++) {
                    stack.r = pr;
                    stack.g = pg;
                    stack.b = pb;
                    stack = stack.next;
                }
        
                for (i = 1; i < radiusPlus1; i++) {
                    p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
                    r_sum += (stack.r = (pr = pixels[p])) * (rbs = radiusPlus1 - i);
                    g_sum += (stack.g = (pg = pixels[p + 1])) * rbs;
                    b_sum += (stack.b = (pb = pixels[p + 2])) * rbs;
        
                    r_in_sum += pr;
                    g_in_sum += pg;
                    b_in_sum += pb;
        
                    stack = stack.next;
                }
        
        
                stackIn = stackStart;
                stackOut = stackEnd;
                for (x = 0; x < width; x++) {
                    pixels[yi] = (r_sum * mul_sum) >> shg_sum;
                    pixels[yi + 1] = (g_sum * mul_sum) >> shg_sum;
                    pixels[yi + 2] = (b_sum * mul_sum) >> shg_sum;
        
                    r_sum -= r_out_sum;
                    g_sum -= g_out_sum;
                    b_sum -= b_out_sum;
        
                    r_out_sum -= stackIn.r;
                    g_out_sum -= stackIn.g;
                    b_out_sum -= stackIn.b;
        
                    p = (yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1)) << 2;
        
                    r_in_sum += (stackIn.r = pixels[p]);
                    g_in_sum += (stackIn.g = pixels[p + 1]);
                    b_in_sum += (stackIn.b = pixels[p + 2]);
        
                    r_sum += r_in_sum;
                    g_sum += g_in_sum;
                    b_sum += b_in_sum;
        
                    stackIn = stackIn.next;
        
                    r_out_sum += (pr = stackOut.r);
                    g_out_sum += (pg = stackOut.g);
                    b_out_sum += (pb = stackOut.b);
        
                    r_in_sum -= pr;
                    g_in_sum -= pg;
                    b_in_sum -= pb;
        
                    stackOut = stackOut.next;
                    yi += 4;
                }
                yw += width;
            }
        
            for (x = 0; x < width; x++) {
                g_in_sum = b_in_sum = r_in_sum = g_sum = b_sum = r_sum = 0;
        
                yi = x << 2;
                r_out_sum = radiusPlus1 * (pr = pixels[yi]);
                g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
                b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
        
                r_sum += sumFactor * pr;
                g_sum += sumFactor * pg;
                b_sum += sumFactor * pb;
        
                stack = stackStart;
        
                for (i = 0; i < radiusPlus1; i++) {
                    stack.r = pr;
                    stack.g = pg;
                    stack.b = pb;
                    stack = stack.next;
                }
        
                yp = width;
        
                for (i = 1; i <= radius; i++) {
                    yi = (yp + x) << 2;
        
                    r_sum += (stack.r = (pr = pixels[yi])) * (rbs = radiusPlus1 - i);
                    g_sum += (stack.g = (pg = pixels[yi + 1])) * rbs;
                    b_sum += (stack.b = (pb = pixels[yi + 2])) * rbs;
        
                    r_in_sum += pr;
                    g_in_sum += pg;
                    b_in_sum += pb;
        
                    stack = stack.next;
        
                    if (i < heightMinus1) {
                        yp += width;
                    }
                }
        
                yi = x;
                stackIn = stackStart;
                stackOut = stackEnd;
                for (y = 0; y < height; y++) {
                    p = yi << 2;
                    pixels[p] = (r_sum * mul_sum) >> shg_sum;
                    pixels[p + 1] = (g_sum * mul_sum) >> shg_sum;
                    pixels[p + 2] = (b_sum * mul_sum) >> shg_sum;
        
                    r_sum -= r_out_sum;
                    g_sum -= g_out_sum;
                    b_sum -= b_out_sum;
        
                    r_out_sum -= stackIn.r;
                    g_out_sum -= stackIn.g;
                    b_out_sum -= stackIn.b;
        
                    p = (x + (((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width)) << 2;
        
                    r_sum += (r_in_sum += (stackIn.r = pixels[p]));
                    g_sum += (g_in_sum += (stackIn.g = pixels[p + 1]));
                    b_sum += (b_in_sum += (stackIn.b = pixels[p + 2]));
        
                    stackIn = stackIn.next;
        
                    r_out_sum += (pr = stackOut.r);
                    g_out_sum += (pg = stackOut.g);
                    b_out_sum += (pb = stackOut.b);
        
                    r_in_sum -= pr;
                    g_in_sum -= pg;
                    b_in_sum -= pb;
        
                    stackOut = stackOut.next;
        
                    yi += width;
                }
            }
        
            context.putImageData(imageData, top_x, top_y);
        
        }
        function BlurStack() {
            this.r = 0;
            this.g = 0;
            this.b = 0;
            this.a = 0;
            this.next = null;
        }
        
        // https://gist.github.com/mjackson/5311256
        function rgbToHsl(r, g, b) {
            r /= 255, g /= 255, b /= 255;
            var max = Math.max(r, g, b), min = Math.min(r, g, b);
            var h, s, l = (max + min) / 2;
            if (max == min) {
                h = s = 0; // achromatic
            } else {
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }
            return [h, s, l];
        }
        function hslToRgb(h, s, l) {
            var r, g, b;
            if (s == 0) {
                r = g = b = l; // achromatic
            } else {
                var hue2rgb = function hue2rgb(p, q, t) {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1 / 6) return p + (q - p) * 6 * t;
                    if (t < 1 / 2) return q;
                    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                    return p;
                }
                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
                r = hue2rgb(p, q, h + 1 / 3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1 / 3);
            }
            return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
        }
        
        function lightBlur(hsl) {
        
            // Adjust the luminance.
            let lumCalc = 0.35 + (0.3 / hsl[2]);
            if (lumCalc < 1) { lumCalc = 1; }
            else if (lumCalc > 3.3) { lumCalc = 3.3; }
            const l = hsl[2] * lumCalc;
        
            // Adjust the saturation. 
            const colorful = 2 * hsl[1] * l;
            const s = hsl[1] * colorful * 1.5;
        
            return [hsl[0], s, l];
        
        }
        
        function darkBlur(hsl) {
            // Adjust the saturation. 
            const colorful = 2 * hsl[1] * hsl[2];
            const s = hsl[1] * (1 - hsl[2]) * 3;
        
            return [hsl[0], s, hsl[2]];
        
        }
        // Set up the canvas.
        const img = document.getElementById("blurImg");
        const canvas = document.getElementById("mainCanvas");
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";
        canvas.width = w;
        canvas.height = h;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, w, h);
        context.drawImage(img, 0, 0);
        
        // Get the image data from the context.
        var imageData = context.getImageData(0, 0, w, h);
        var pix = imageData.data;
        
        // Set the image function, if any.
        var imageFunc;
        var style = "${style}";
        if (style == "dark") { imageFunc = darkBlur; }
        else if (style == "light") { imageFunc = lightBlur; }
        for (let i = 0; i < pix.length; i += 4) {
            // Convert to HSL.
            let hsl = rgbToHsl(pix[i], pix[i + 1], pix[i + 2]);
        
            // Apply the image function if it exists.
            if (imageFunc) { hsl = imageFunc(hsl); }
        
            // Convert back to RGB.
            const rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
        
            // Put the values back into the data.
            pix[i] = rgb[0];
            pix[i + 1] = rgb[1];
            pix[i + 2] = rgb[2];
        }
        // Draw over the old image.
        context.putImageData(imageData, 0, 0);
        // Blur the image.
        stackBlurCanvasRGB("mainCanvas", 0, 0, w, h, ${ blur });
        
        // Perform the additional processing for dark images.
        if (style == "dark") {
        
            // Draw the hard light box over it.
            context.globalCompositeOperation = "hard-light";
            context.fillStyle = "rgba(55,55,55,0.2)";
            context.fillRect(0, 0, w, h);
            // Draw the soft light box over it.
            context.globalCompositeOperation = "soft-light";
            context.fillStyle = "rgba(55,55,55,1)";
            context.fillRect(0, 0, w, h);
            // Draw the regular box over it.
            context.globalCompositeOperation = "source-over";
            context.fillStyle = "rgba(55,55,55,0.4)";
            context.fillRect(0, 0, w, h);
        
            // Otherwise process light images.
        } else if (style == "light") {
            context.fillStyle = "rgba(255,255,255,0.4)";
            context.fillRect(0, 0, w, h);
        }
        // Return a base64 representation.
        canvas.toDataURL();    
        `

        // Convert the images and create the HTML.
        let blurImgData = Data.fromPNG(img).toBase64String()
        let html = `
            <img id="blurImg" src="data:image/png;base64,${blurImgData}" />
            <canvas id="mainCanvas" />
        `

        // Make the web view and get its return value.
        let view = new WebView()
        await view.loadHTML(html)
        let returnValue = await view.evaluateJavaScript(js)

        // Remove the data type from the string and convert to data.
        let imageDataString = returnValue.slice(22)
        let imageData = Data.fromBase64String(imageDataString)

        // Convert to image and crop before returning.
        let imageFromData = Image.fromData(imageData)
        if (crop != null && crop != undefined) {
            return this.cropImage(crop, imageFromData)
        } else {
            return imageFromData
        }
    }

    /**
    * 手机各大小组件尺寸
    */
    phoneSizes() {
        let phones = {

            // 12 Pro Max
            "2778": {
                小号: 510,
                中号: 1092,
                大号: 1146,
                左边: 96,
                右边: 678,
                顶部: 246,
                中间: 882,
                底部: 1518
            },

            // 12 and 12 Pro
            "2532": {
                小号: 474,
                中号: 1014,
                大号: 1062,
                左边: 78,
                右边: 618,
                顶部: 231,
                中间: 819,
                底部: 1407
            },

            // 11 Pro Max, XS Max
            "2688": {
                小号: 507,
                中号: 1080,
                大号: 1137,
                左边: 81,
                右边: 654,
                顶部: 228,
                中间: 858,
                底部: 1488
            },

            // 11, XR
            "1792": {
                小号: 338,
                中号: 720,
                大号: 758,
                左边: 54,
                右边: 436,
                顶部: 160,
                中间: 580,
                底部: 1000
            },


            // 11 Pro, XS, X, 12 mini
            "2436": {
                x: {
                    小号: 465,
                    中号: 987,
                    大号: 1035,
                    左边: 69,
                    右边: 591,
                    顶部: 213,
                    中间: 783,
                    底部: 1353,
                },

                mini: {
                    小号: 465,
                    中号: 987,
                    大号: 1035,
                    左边: 69,
                    右边: 591,
                    顶部: 231,
                    中间: 801,
                    底部: 1371,
                }

            },

            // Plus phones
            "2208": {
                小号: 471,
                中号: 1044,
                大号: 1071,
                左边: 99,
                右边: 672,
                顶部: 114,
                中间: 696,
                底部: 1278
            },

            // SE2 and 6/6S/7/8
            "1334": {
                小号: 296,
                中号: 642,
                大号: 648,
                左边: 54,
                右边: 400,
                顶部: 60,
                中间: 412,
                底部: 764
            },

            // SE1
            "1136": {
                小号: 282,
                中号: 584,
                大号: 622,
                左边: 30,
                右边: 332,
                顶部: 59,
                中间: 399,
                底部: 399
            },

            // 11 and XR in Display Zoom mode
            "1624": {
                小号: 310,
                中号: 658,
                大号: 690,
                左边: 46,
                右边: 394,
                顶部: 142,
                中间: 522,
                底部: 902
            },

            // Plus in Display Zoom mode
            "2001": {
                小号: 444,
                中号: 963,
                大号: 972,
                左边: 81,
                右边: 600,
                顶部: 90,
                中间: 618,
                底部: 1146
            },
        }
        return phones
    }

    /**
    * ------------------------------------------------------------------------------
    */


    /**
    * 运行小组件
    * @param {ListWidget} widget 小组件
    * @param {bool} needSetBg 是否需要设置背景
    */
    async runWidget(widget, needSetBg = true) {
        // 设置边距(上，左，下，右)
        widget.setPadding(this.padding.top, this.padding.left, this.padding.bottom, this.padding.right)
        // 设置刷新间隔
        widget.refreshAfterDate = new Date(this.refreshInterval * 60 * 1000)

        if (needSetBg) {
            // 需要选择图片
            if (this.picBgMode) {
                await this.transparentBg()
            }

            // 设置图片背景
            if (!this.colorBgMode) {
                const bgImg = this.loadImgCache(this.scriptName)
                if (bgImg != undefined && bgImg != null) {
                    widget.backgroundImage = bgImg
                }
            } else {
                // 设置纯色背景 
                widget.backgroundColor = this.bgColor
            }
        }

        // 设置组件
        Script.setWidget(widget)
        if (this.previewSizeMode >= 0) {
            // 预览
            if (config.runsInApp) {
                if (this.previewSizeMode == 1) {
                    widget.presentMedium()
                } else if (this.previewSizeMode == 2) {
                    widget.presentLarge()
                } else {
                    widget.presentSmall()
                }
            }
        }
        // 完成脚本
        Script.complete()
    }

}

//================================
/**
* 自定义字体渲染
*/
class CustomFont {
    constructor(webview, config) {
        this.webview = webview || new WebView()
        this.fontFamily = config.fontFamily || 'customFont'
        this.fontUrl = 'url(' + config.fontUrl + ')'
        this.timeout = config.timeout || 60000
    }

    async load() { // 加载字体
        return await this.webview.evaluateJavaScript(`
            const customFont = new FontFace("${this.fontFamily}", "${this.fontUrl}");
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            let baseHeight,extendHeight;
            console.log('loading font.');
            customFont.load().then((font) => {
            document.fonts.add(font);
            console.log('load font successfully.');
            completion(true);
            });
            setTimeout(()=>{
            console.log('load font failed：timeout.');
            completion(false);
            },${this.timeout});
            null`
        )
    }

    async drawText(text, config) {
        // 配置
        const fontSize = config.fontSize || 20
        const textWidth = config.textWidth || 300
        const align = config.align || 'left' // left、right、center
        const lineLimit = config.lineLimit || 99
        const rowSpacing = config.rowSpacing || 0
        const textColor = config.textColor || 'white'
        
        const textArray = await this.cutText(text, fontSize, textWidth)
        const scale = config.scale || 1
        
        let script = ''
        for (let i in textArray) {
            let content = textArray[i].str
            let length = textArray[i].len

            if (i >= lineLimit) break
            if (i == lineLimit - 1 && i < textArray.length - 1)
                content = content.replace(/(.{1})$/, '…')

            let x = 0, y = Number(i) * fontSize
            if (rowSpacing > 0 && i > 0) y = y + rowSpacing
            if (i > 0) {
                if (align === 'right') {
                    x = textWidth - length
                } else if (align === 'center') {
                    x = (textWidth - length) / 2
                }
            }
            script = script + `ctx.fillText("${content}", ${x}, ${y});`
        }

        const realWidth = textArray.length > 1 ? textWidth : textArray[0].len
        const lineCount = lineLimit < textArray.length ? lineLimit : textArray.length
        const returnValue = await this.webview.evaluateJavaScript(`
            canvas.width=${realWidth}*${scale};
            ctx.font = "${fontSize}px ${this.fontFamily}";
            ctx.textBaseline= "hanging";
            baseHeight= ${(fontSize + rowSpacing) * (lineCount - 1)};
            extendHeight= ctx.measureText('qypgj').actualBoundingBoxDescent;
            canvas.height= (baseHeight + extendHeight)*${scale};
            ctx.scale(${scale}, ${scale});

            ctx.font = "${fontSize}px ${this.fontFamily}";
            ctx.fillStyle = "${textColor}";
            ctx.textBaseline= "hanging";
            ${script}
            canvas.toDataURL()`
        )

        const imageDataString = returnValue.slice(22)
        const imageData = Data.fromBase64String(imageDataString)
        return Image.fromData(imageData)
    }

    async cutText(text, fontSize, textWidth) { // 处理文本
        return await this.webview.evaluateJavaScript(`
            function cutText(textWidth, text) {
                ctx.font = "${fontSize}px ${this.fontFamily}";
                ctx.textBaseline = "hanging";
            
                let textArray = [];
                let len = 0, str = '';
                for (let i = 0; i < text.length; i++) {
                    const char = text[i]
                    const width = ctx.measureText(char).width;
                    if (len < textWidth) {
                        str = str + char;
                        len = len + width;
                    }
                    if (len == textWidth) {
                        textArray.push({ str: str, len: len, });
                        str = ''; len = 0;
                    }
                    if (len > textWidth) {
                        textArray.push({
                            str: str.substring(0, str.length - 1),
                            len: len - width,
                        });
                        str = char; len = width;
                    }
                    if (i == text.length - 1 && str) {
                        textArray.push({ str: str, len: len, });
                    }
                }
                return textArray
            }
            cutText(${ textWidth }, "${text}")
        `)
    }
}

//================================
const Running = async (Widget, scriptName, needSetBg = true) => {
    const M = new Widget(scriptName)
    const W = await M.render()
    if (W != undefined) {
        await M.runWidget(W, needSetBg)
    }
}
//================================

//================================
module.exports = {
    Base,
    Running,
}
//================================
