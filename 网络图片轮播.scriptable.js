//------------------------------------------------
const env = importModule('Env.js')
//------------------------------------------------
// 配置区
env.configs.previewSize = "Small" // 预览大小【小：Small，中：Medium，大：Large】
env.configs.changePicBg = true // 是否需要更换背景
env.configs.colorMode = false // 是否是纯色背景
env.configs.bgColor = new Color("000000") // 小组件背景色
env.configs.topPadding = 0 // 内容区边距
env.configs.leftPadding = 0 // 内容区边距
env.configs.bottomPadding = 0 // 内容区边距
env.configs.rightPadding = 0 // 内容区边距
//
const imgStyle = env.imgStyle
const textStyle = env.textStyle
//------------------------------------------------
// 脚本名字
const name = Script.name()
//------------------------------------------------


//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓内容区↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//------------------------------------------------
const widget = new ListWidget()
const contentStack = widget.addStack()
// 图片链接
const imgObjs = [
  "https://patchwiki.biligame.com/images/dongsen/a/a2/3f1qchqu7q74dsis7uyz7jfqt6xgo0d.png",
  "https://patchwiki.biligame.com/images/dongsen/7/7e/awj7kx6aqiuoventjw1w3qu7imv1f9n.png",
  "https://patchwiki.biligame.com/images/dongsen/0/01/mnuuv9nmyb8q7qv8fuqflzn8ds465zp.png"
]
// 索引值
const key = parseInt(Math.random() * Object.keys(imgObjs).length).toString()
let imgUrl = imgObjs[key]
if(imgUrl == undefined) {
    imgUrl = imgObjs['0']
}
log(`图片链接：${imgUrl}`)
let img = await env.getImage(imgUrl)
imgStyle.stack = contentStack
imgStyle.width = 138
imgStyle.height = 138
imgStyle.img = img
env.addStyleImg()
//------------------------------------------------
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑内容区↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

//------------------------------------------------
// 运行脚本、预览
await env.run(name, widget)
//------------------------------------------------