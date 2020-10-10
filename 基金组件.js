// Variables used by Scriptable.

/*
 * Author: Enjoyee
 * Github: https://github.com/Enjoyee
 * 基金数据源自: https://www.doctorxiong.club/api/#api-Fund
 */


// 获取外部输入的参数
var widgetInputRAW = args.widgetParameter
try {
  widgetInputRAW.toString()
} catch(e) {
  // 默认值招商白酒
  widgetInputRAW = "161725"
}
// 初始化基金ID
var fid = widgetInputRAW.toString().split(",")



// 获取基金数据
const fundJSON = await getFund()
// 创建小组件
const widget = createWidget(fundJSON)
widget.addSpacer()
widget.setPadding(15, 2, 15, 2)
Script.setWidget(widget)
Script.complete()


/*
 * 以下函数定义
 */

 // 基金数据获取
async function getFund() {
  // 拼接基金id
  var fidFull = ''
  for (let index in fid) {
    fidFull = fidFull + fid[index] + ","
  }
  fidFull = fidFull.substring(0, fidFull.lastIndexOf(','))

  // 请求基金数据
  const fundRequest = {
    url: `https://api.doctorxiong.club/v1/fund?code=${fidFull}`,
  }
  const res = await get(fundRequest)

  return res
}

// 创建 widget
function createWidget(fundJson) {
  let listWidget = new ListWidget() 
  
  // 下面是设置纯色背景
  const bgColor = new LinearGradient()
  bgColor.colors = [new Color("#29323c"), new Color("#1c1c1c")]
  bgColor.locations = [0.0, 1.0]
  listWidget.backgroundGradient = bgColor

  const data = fundJSON.data
  for (let index in data) {
    // 添加行距
    listWidget.addSpacer(4)
    // 统一字体大小
    const fontSize = 11

    //创建水平方向stack
    let hStack0 = listWidget.addStack()
    hStack0.layoutHorizontally()
    hStack0.addSpacer(0) // Left spacing, 向左对齐间距

    // 颜色值
    const dayGrowthNum = data[index].dayGrowth // 当前基金单位净值估算日涨幅
    var color = new Color('dc0000')
    if (dayGrowthNum <= 0) {
      color = new Color('097C25')
    }

    // 基金名称
    let title = hStack0.addText('>› ' + data[index].name)
    title.font = new Font('Menlo', fontSize) //font and size,字体与大小
    title.textColor = color //font color,字体颜色
    title.textOpacity = (1) //opacity,不透明度
    title.leftAlignText() //Align,对齐方式(center,left,right)！在同一个stack内的对齐方式不能单独设置，只能调整向左对齐间距大小 
    
    // 当前基金单位净值估算日涨幅
    let expectWorth = hStack0.addText(' ‹' + dayGrowthNum + '› ')
    expectWorth.font = Font.boldSystemFont(12) //font and size,字体与大小
    expectWorth.textColor = color //font color,字体颜色
    expectWorth.textOpacity = (1) //opacity,不透明度
    expectWorth.leftAlignText() //Align,对齐方式(center,left,right)！在同一个stack内的对齐方式不能单独设置，只能调整向左对齐间距大小 
    
    // 净值估算更新日期 
    let expectWorthDateText = data[index].expectWorthDate.substring(5)
    let expectWorthDate = hStack0.addText(expectWorthDateText + '')
    expectWorthDate.font = new Font('Menlo', fontSize) //font and size,字体与大小
    expectWorthDate.textColor = color //font color,字体颜色
    expectWorthDate.textOpacity = (1) //opacity,不透明度
    expectWorthDate.leftAlignText() //Align,对齐方式(center,left,right)！在同一个stack内的对齐方式不能单独设置，只能调整向左对齐间距大小 
  }

  return listWidget
}

// 网络请求get封装
async function get({ url, headers = {} }, callback = () => {}) {
  const request = new Request('')
  const defaultHeaders = {
    "Accept": "*/*",
    "Content-Type": "application/json"
  }

  request.url = url
  request.method = 'GET'
  request.headers = {
    ...headers,
    ...defaultHeaders
  }
  const data = await request.loadJSON()
  callback(request.response, data)
  return data
}
