/**
 * 公众号：杂货万事屋
 * Author:LSP
 * Date:2022-09-19
*/
// @导入引用开发环境
if (typeof require === 'undefined') require = importModule
const { Base } = require("./lsp环境")

// @小组件配置
const widgetConfigs = {
  languageCN: false,
  // 时间字体
  font: Font.mediumRoundedSystemFont(16),
  // 预览模式：0：小尺寸，1：中等尺寸，2：大尺寸，负数：不预览
  previewMode: 0,
}


// @定义小组件
class Widget extends Base {
  constructor(scriptName) {
    super(scriptName)
    // 初始化其他变量
    this.setPreViewSizeMode(widgetConfigs.previewMode)
  }

  /**
   * 组件渲染
   */
  async renderUI() {
    //-------------------------------------
    const widget = new ListWidget()
    let stack = widget.addStack()
    stack.layoutHorizontally()
    //-------------------------------------
    // 请求农历信息
    const lunarInfo = await this.getLunar()
    // 农历
    let lunarInfoText = lunarInfo.infoLunarText;
    if (widgetConfigs.languageCN) {
      lunarInfoText = lunarInfoText.replaceAll('十一月', '冬月')
        .replaceAll('十二月', '腊月')
        .replaceAll('一月', '正月');
    } else {
      lunarInfoText = lunarInfoText.replaceAll('一月', 'Jan.')
        .replaceAll('二月', 'Feb.')
        .replaceAll('三月', 'Mar.')
        .replaceAll('四月', 'Apr.')
        .replaceAll('五月', 'May.')
        .replaceAll('六月', 'Jun.')
        .replaceAll('七月', 'Jul.')
        .replaceAll('八月', 'Aug.')
        .replaceAll('九月', 'Sep.')
        .replaceAll('十月', 'Oct.')
        .replaceAll('十一月', 'Nov.')
        .replaceAll('十二月', 'Dec.')
        .replaceAll('初一', '1')
        .replaceAll('初二', '2')
        .replaceAll('初三', '3')
        .replaceAll('初四', '4')
        .replaceAll('初五', '5')
        .replaceAll('初六', '6')
        .replaceAll('初七', '7')
        .replaceAll('初八', '8')
        .replaceAll('初九', '9')
        .replaceAll('初十', '10')
        .replaceAll('十一', '11')
        .replaceAll('十二', '12')
        .replaceAll('十三', '13')
        .replaceAll('十四', '14')
        .replaceAll('十五', '15')
        .replaceAll('十六', '16')
        .replaceAll('十七', '17')
        .replaceAll('十八', '18')
        .replaceAll('十九', '19')
        .replaceAll('二十', '20')
        .replaceAll('廿一', '21')
        .replaceAll('廿二', '22')
        .replaceAll('廿三', '23')
        .replaceAll('廿四', '24')
        .replaceAll('廿五', '25')
        .replaceAll('廿六', '26')
        .replaceAll('廿七', '27')
        .replaceAll('廿八', '28')
        .replaceAll('廿九', '29')
        .replaceAll('三十', '30')
    }
    // 显示
    let showText = `🫧 ${lunarInfoText}`
    let widgetText = stack.addText(`${showText}`)
    widgetText.textOpacity = 0.8
    widgetText.font = widgetConfigs.font
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
      let downloadURL = "https://gitee.com/enjoyee/scriptable/raw/master/%E6%96%B0%E7%B3%BB%E5%88%97/%E5%B0%8F%E6%97%A5%E5%8E%86.js"
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
await Running(Widget, Script.name(), false)