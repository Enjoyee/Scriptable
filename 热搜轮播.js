//------------------------------------------------
const env = importModule('Env-lsp.js')
//------------------------------------------------
// 配置区
env.configs.previewSize = "Medium" // 预览大小【小：Small，中：Medium，大：Large】
env.configs.changePicBg = true // 是否需要更换背景
env.configs.colorMode = false // 是否是纯色背景
env.configs.bgColor = new Color("000000") // 小组件背景色
env.configs.topPadding = 0 // 内容区边距
env.configs.leftPadding = 0 // 内容区边距
env.configs.bottomPadding = 0 // 内容区边距
env.configs.rightPadding = 0 // 内容区边距
// env.configs.refreshInterval = 30 // 刷新间隔，单位分钟，非精准，会有3-5分钟差距
//////////////////////////////////
// 大标题文字颜色
const headTitleFontColor = new Color("FF7F00", 0.8)
// 列表文字颜色
const listTitleFontColor = new Color("ffffff", 0.8)
// 热搜ID跟对应的标题，数据来源于 https://mo.fish/ 
const hotIdObjs = [
	{"1": "知乎の热搜"},
	{"58": "微博の热搜"},
	{"59": "V2EXの热搜"}
]
//////////////////////////////////
const imgStyle = env.imgStyle
const textStyle = env.textStyle
//------------------------------------------------
// 脚本名字
const name = Script.name()
// 文件
const fm = FileManager.local()
// 组件
const widget = new ListWidget()
const contentStack = widget.addStack()
//------------------------------------------------


//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓内容区↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//------------------------------------------------
const splitStr = "@"
// 缓存目录
const cachePath = fm.joinPath(fm.documentsDirectory(), "lsp-hot-cache")
let cache = undefined
let index = 0
let start = 0

if(fm.fileExists(cachePath)) {
	cache = fm.readString(cachePath)
	start = cache.indexOf(splitStr)
	const indexStr = cache.slice(0, start)
	index = (parseInt(indexStr) + 1) % hotIdObjs.length
} 

let obj = hotIdObjs[index]
// 热榜ID
let hotID = Object.keys(obj)[0]

// 请求热榜数据
let response = undefined
try {
	response = await env.getJson(`https://www.tophub.fun:8888/v2/GetAllInfoGzip?id=${hotID}&page=0`)
} catch(e) {
	index -= 1
	if (index < 0) {
		index = 0
	}
	log("请求网络失败，读取缓存数据")
	response = JSON.parse(cache.slice(start+1, cache.length))
}

log(`本次轮询索引：${index}`)
obj = hotIdObjs[index]
// 热榜ID
hotID = Object.keys(obj)[0]
// 热榜标题
const hotTitle = Object.values(obj)[0]
log(`标题：${hotTitle}，ID：${hotID}`)

// 写入缓存
fm.writeString(cachePath, `${index}${splitStr}${JSON.stringify(response)}`)

// 截取前5条
const hotData = response.Data.data.slice(1, 6)

// 设置大标题
widget.addSpacer(15)
const titleStack = widget.addStack()
let title = titleStack.addText(`🔥 ${hotTitle}`)
title.font = Font.boldRoundedSystemFont(17) // 大标题字体样式/大小
title.textColor = headTitleFontColor // 大标题的颜色
titleStack.addSpacer()
widget.addSpacer(5)

// 列表
for (let index in hotData) {
	let itemStack = widget.addStack()
	// 标题
	let title = itemStack.addText(`☞  ${hotData[index].Title}`)
	title.font = Font.boldRoundedSystemFont(13) // 热搜列表标题字体样式/大小
	title.textColor = listTitleFontColor // 热搜列表标题的颜色
	title.url = hotData[index].Url
	title.lineLimit = 1
	itemStack.addSpacer()
	widget.addSpacer(5)
}

widget.addSpacer()

//------------------------------------------------
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑内容区↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

//------------------------------------------------
// 运行脚本、预览
await env.run(name, widget)
//------------------------------------------------