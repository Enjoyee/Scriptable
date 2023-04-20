// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: user-astronaut;
/**
* Author:LSP
* Date:2022-12-13
*/
// -------------------------------------------------------
// 是否是开发环境，配合手机端调试使用，正式发布设置为false
const isDev = false;
console.log(`开发环境 👉👉👉👉👉 ${isDev ? 'DEV' : 'RELEASE'}`);
console.log(`----------------------------------------`);
const remoteRoot = 'https://gitcode.net/enoyee/scriptable/-/raw/master/';
// 依赖包目录
const fm = FileManager.local();
const rootDir = fm.documentsDirectory();
const cacheDir = fm.joinPath(rootDir, 'LSP');
const dependencyFileName = isDev ? "_LSP.js" : `${cacheDir}/_LSP.js`;
// 下载依赖包
await downloadLSPDependency();
// -------------------------------------------------------
if (typeof require === 'undefined') require = importModule
// 引入相关方法
const { BaseWidget } = require(dependencyFileName);

// @定义小组件
class Widget extends BaseWidget {

  defaultPreference = {
    bgUrl: 'https://s3.uuu.ovh/imgs/2022/12/07/6af2cea7cdbfdce4.png',
    shadowColor: '#FFF',
    shadowColorAlpha: '0.5',
    titleColor: '#222',
    teamColor: '#222',
    notStartedColor: '#211',
    startingColor: '#d30742',
    finishedColor: '#666'
  };

  getValueByKey = (key) => this.readWidgetSetting()[key] ?? this.defaultPreference[key];
  titleColorFun = () => this.getValueByKey('titleColor');
  teamColorFun = () => this.getValueByKey('teamColor');
  notStartedColorFun = () => this.getValueByKey('notStartedColor');
  startingColorFun = () => this.getValueByKey('startingColor');
  finishedColorFun = () => this.getValueByKey('finishedColor');

  constructor(scriptName) {
    super(scriptName);
    this.changeBgMode2OnLineBg(this.defaultPreference.bgUrl, { ...this.defaultPreference });
  }

  async getAppViewOptions() {
    return {
      widgetProvider: {
        defaultBgType: '1',
        small: false, // 是否提供小号组件
        medium: true, // 是否提供中号组件
        large: false, // 是否提供大号组件
      },
      // 预览界面的组件设置item
      settingItems: [
        {
          name: 'filterFinished',
          label: '过滤已完成赛事',
          type: 'switch',
          icon: { name: 'backpack.fill', color: '#e85d04', },
          needLoading: false,
          default: true,
        },
        {
          name: 'otherSetting',
          label: '其他设置',
          type: 'cell',
          icon: 'https://gitcode.net/4qiao/framework/raw/master/img/icon/setting.gif',
          needLoading: true,
          childItems: [
            {
              name: 'titleColor',
              label: '标题颜色',
              type: 'color',
              icon: { name: 'scribble.variable', color: '#264653', },
              needLoading: false,
              default: this.titleColorFun(),
            },
            {
              name: 'teamColor',
              label: '队名颜色',
              type: 'color',
              icon: { name: 'highlighter', color: '#2a9d8f', },
              needLoading: false,
              default: this.teamColorFun(),
            },
            {
              name: 'notStartedColor',
              label: '未开始比分颜色',
              type: 'color',
              icon: { name: 'pencil.and.outline', color: '#e9c46a', },
              needLoading: false,
              default: this.notStartedColorFun(),
            },
            {
              name: 'startingColor',
              label: '进行中比分颜色',
              type: 'color',
              icon: { name: 'lasso', color: '#f4a261', },
              needLoading: false,
              default: this.startingColorFun(),
            },
            {
              name: 'finishedColor',
              label: '结束比分颜色',
              type: 'color',
              icon: { name: 'lasso.and.sparkles', color: '#e76f51', },
              needLoading: false,
              default: this.finishedColorFun(),
            },
          ]
        },
      ],
    };
  }

  provideMediumWidget = async (widgetSetting) => {
    // 赛程
    const RES = await this.loadWorldCupData(widgetSetting.filterFinished ?? true);
    //
    const ballImg = await this.getImageByUrl('https://gitee.com/enjoyee/img/raw/master/other/ball.png');
    //
    const titleColor = this.titleColorFun();
    const teamColor = this.teamColorFun();
    const notStartedColor = this.notStartedColorFun();
    const startingColor = this.startingColorFun();
    const finishedColor = this.finishedColorFun();
    //=================================
    const widget = new ListWidget();
    widget.setPadding(0, 0, 0, 0);
    const widgetSize = this.getWidgetSize('中号');
    let { width, height } = widgetSize;
    //=================================
    const contentStack = widget.addStack();
    contentStack.layoutVertically();
    contentStack.centerAlignContent();
    if (RES.length == 0) {
      let mxStack = contentStack.addStack();
      mxStack.layoutHorizontally();
      mxStack.addSpacer();
      let mxImg = await this.getImageByUrl('https://s3.uuu.ovh/imgs/2022/12/08/e84b3697053ddaab.webp');
      let mxImgSpan = mxStack.addImage(mxImg);
      mxStack.addSpacer();
      mxImgSpan.imageSize = new Size(100, 100);
      mxImgSpan.centerAlignImage();
      let infoStack = contentStack.addStack();
      infoStack.layoutHorizontally();
      infoStack.addSpacer();
      let tipsTextSpan = infoStack.addText('ops~o_O||今天球场上没人');
      infoStack.addSpacer();
      tipsTextSpan.textColor = new Color(titleColor);
      tipsTextSpan.font = Font.systemFont(20);
      tipsTextSpan.shadowColor = new Color('#666', 0.4);
      tipsTextSpan.shadowRadius = 0.4;
      tipsTextSpan.shadowOffset = new Point(1, 1);
    } else {
      height -= 12;
      contentStack.size = new Size(width, height);
      const perHeight = height / 3;
      const descStackHeight = perHeight / 5 * 2.1;
      const detailStackHeight = perHeight / 5 * 3;
      const areaStackSize = new Size(width / 7 * 2.5, detailStackHeight);
      if (RES.length == 1) {
        let topStack = contentStack.addStack();
        topStack.layoutHorizontally();
        topStack.centerAlignContent();
        topStack.addSpacer();
        let topImg = await this.getImageByUrl('https://s3.uuu.ovh/imgs/2022/12/06/3f48556409802788.png');
        let topImgSpan = topStack.addImage(topImg);
        topImgSpan.imageSize = new Size(28, 28);
        //
        topStack.addSpacer(2);
        let topTextSpan = topStack.addText(`${RES[0].round_name}`);
        topTextSpan.textColor = new Color(titleColor);
        topTextSpan.font = Font.systemFont(20);
        topTextSpan.shadowColor = new Color('#666', 0.4);
        topTextSpan.shadowRadius = 0.4;
        topTextSpan.shadowOffset = new Point(1, 1);
        //
        topStack.addSpacer(2);
        topImgSpan = topStack.addImage(topImg);
        topImgSpan.imageSize = new Size(28, 28);
        //
        topStack.addSpacer();
        contentStack.addSpacer(4);
      }
      for (let index = 0; index < RES.length; index++) {
        const item = RES[index];
        let { room_id, host_team = {}, guest_team = {}, match_status = 1, bottom_note } = item;
        // ================================
        let stack = contentStack.addStack();
        stack.layoutVertically();
        // ================================
        let descContainerStack = stack.addStack();
        descContainerStack.layoutHorizontally();
        descContainerStack.addSpacer();
        let descStack = descContainerStack.addStack();
        descContainerStack.addSpacer();
        descStack.size = new Size(width / 10 * 9, descStackHeight);
        descStack.backgroundColor = new Color('#FFF', 0.5);
        descStack.cornerRadius = descStackHeight / 2;
        descStack.borderWidth = 1;
        descStack.borderColor = new Color('#000', 0.2);
        descStack.layoutHorizontally();
        descStack.centerAlignContent();
        ///
        let imgSpan = descStack.addImage(ballImg);
        imgSpan.imageSize = new Size(12, 12);
        imgSpan.imageOpacity = 0.6;
        descStack.addSpacer(8);
        ///
        let textSpan = descStack.addText(`${item.match_round_desc}`);
        textSpan.textColor = new Color(titleColor, 0.9);
        textSpan.font = Font.systemFont(12); // 小标题
        ///
        descStack.addSpacer(8);
        imgSpan = descStack.addImage(ballImg);
        imgSpan.imageSize = new Size(12, 12);
        imgSpan.imageOpacity = 0.6;
        ///
        // ================================
        stack.addSpacer(4);
        let detailStack = stack.addStack();
        detailStack.size = new Size(width, detailStackHeight);
        detailStack.layoutHorizontally();
        let jumpUrl = `https://webcast-open.douyin.com/open/webcast/reflow/?webcast_app_id=6822&room_id=${room_id}`;
        if (room_id) {
          detailStack.url = jumpUrl;
        }
        // --------------------------------
        let hostStack = detailStack.addStack();
        hostStack.size = areaStackSize;
        hostStack.centerAlignContent();
        hostStack.addSpacer();
        textSpan = hostStack.addText(host_team.cn_name);
        textSpan.textColor = new Color(teamColor, 1);
        textSpan.font = Font.mediumSystemFont(14); // 队名
        hostStack.addSpacer(10);
        //
        let image = await this.getImageByUrl(host_team.flag);
        imgSpan = hostStack.addImage(image);
        imgSpan.imageSize = new Size(40, 40); // 国旗
        // --------------------------------
        let scoreStack = detailStack.addStack();
        scoreStack.addSpacer();
        scoreStack.size = new Size(width / 7 * 2, detailStackHeight);
        scoreStack.centerAlignContent();
        textSpan = scoreStack.addText(`${item.host_score} : ${item.guest_score}`);
        let scoreColor;
        switch (match_status) {
          case 1: // 未开始
            scoreColor = notStartedColor;
            break;

          case 2: // 直播中
            scoreColor = startingColor;
            break;

          case 3: // 已结束
            scoreColor = finishedColor;
            break;
        }
        textSpan.textColor = new Color(scoreColor, 0.8);
        textSpan.font = Font.heavySystemFont(28); // 比分
        scoreStack.addSpacer();
        // --------------------------------
        let guestStack = detailStack.addStack();
        guestStack.size = areaStackSize;
        guestStack.centerAlignContent();
        image = await this.getImageByUrl(guest_team.flag);
        imgSpan = guestStack.addImage(image);
        imgSpan.imageSize = new Size(40, 40); // 国旗
        guestStack.addSpacer(10);
        //
        textSpan = guestStack.addText(guest_team.cn_name);
        textSpan.textColor = new Color(teamColor, 1);
        textSpan.font = Font.mediumSystemFont(14); // 队名
        guestStack.addSpacer();
        //
        if (index != RES.length - 1) {
          stack.addSpacer(10);
        }
        if (RES.length === 1) {
          stack.addSpacer(6);
          const bottomStack = stack.addStack();
          bottomStack.layoutHorizontally();
          bottomStack.addSpacer();
          textSpan = bottomStack.addText(`『${bottom_note}』`);
          textSpan.textColor = new Color(titleColor, 0.9);
          textSpan.font = Font.systemFont(13);
          bottomStack.addSpacer();
          if (room_id) {
            bottomStack.url = jumpUrl;
          }
        }
      }
    }
    //=================================
    return widget;
  }

  async render({ widgetSetting, family }) {
    return await this.provideMediumWidget(widgetSetting);
  }

  // --------------------------NET START--------------------------

  /**
   * 世界杯数据
   */
  loadWorldCupData = async (filterFinished) => {
    const URL = 'https://api5-normal-lq.toutiaoapi.com/vertical/sport/go/world_cup/match_info';
    const RES = await this.httpGet(URL);
    const match_infos = JSON.parse(RES.data).match_infos;
    const matchInfoKeys = Object.keys(match_infos);
    // -------------------------------------------------
    const currDateKey = this.getDateStr(new Date(), 'yyyyMMdd');
    let currDateIndex = matchInfoKeys.indexOf(currDateKey);
    // -------------------------------------------------
    let preDateIndex = currDateIndex - 1;
    let preDateKey = matchInfoKeys[preDateIndex];
    // -------------------------------------------------
    let afterDateIndex = currDateIndex + 1;
    let afterDateKey = '';
    if (currDateIndex == matchInfoKeys.length - 1) {
      afterDateIndex = -1;
    } else {
      afterDateKey = matchInfoKeys[afterDateIndex];
    }
    console.log(`preDateKey->${preDateKey}, afterDateKey:${afterDateKey}, currDateKey=${currDateKey}`);
    // -------------------------------------------------
    // match_status：1未开始，2：进行中，3：已结束，其他非比赛
    let currMatch = match_infos[currDateKey];
    let preMatch = match_infos[preDateKey];
    let afterMatch;
    if (afterDateKey.length > 0) {
      afterMatch = match_infos[afterDateKey];
    }
    //
    let showInfoArr = [];
    if (preMatch.match_status == 2) {
      showInfoArr = showInfoArr.concat(preMatch);
    }
    if ([1, 2, 3].indexOf(currMatch.match_status) != -1) {
      showInfoArr = showInfoArr.concat(currMatch);
    }
    if (filterFinished) {
      showInfoArr = showInfoArr.filter(item => item.match_status != 3);
      if (showInfoArr.length == 0 && afterDateKey.length > 0) {
        showInfoArr = showInfoArr.concat(afterMatch);
      }
    }

    const infoArr = [];
    for (const info of showInfoArr) {
      const {
        round_name = '',
        match_status = 1, // 1：未开始，2：直播中，3：已结束
        match_round_desc = '',
        host_team = {},
        guest_team = {},
        host_score = '',
        guest_score = '',
        bottom_note = '',
        room_id = ''
      } = info;
      infoArr.push({
        match_status,
        round_name,
        match_round_desc: match_round_desc.replaceAll(round_name, ''),
        host_team,
        guest_team,
        host_score,
        guest_score,
        bottom_note,
        room_id
      });
    }

    return infoArr.length > 1 ? infoArr.slice(0, 2) : infoArr;
  }

  // --------------------------NET END--------------------------

}

await new Widget(Script.name()).run();


// =================================================================================
// =================================================================================
async function downloadLSPDependency() {
  let fm = FileManager.local();
  const dependencyURL = `${remoteRoot}_LSP.js`;
  if (isDev) {
    const iCloudPath = FileManager.iCloud().documentsDirectory();
    const localIcloudDependencyExit = fm.isFileStoredIniCloud(`${iCloudPath}/_LSP.js`);
    const localDependencyExit = fm.fileExists(`${rootDir}/_LSP.js`);
    const fileExist = localIcloudDependencyExit || localDependencyExit;
    console.log(`🚀 DEV开发依赖文件${fileExist ? '已存在 ✅' : '不存在 🚫'}`);
    if (!fileExist) {
      console.log(`🤖 DEV 开始下载依赖~`);
      await downloadFile2Scriptable('_LSP', dependencyURL);
    }
    return
  }

  //////////////////////////////////////////////////////////
  console.log(`----------------------------------------`);
  const remoteDependencyExit = fm.fileExists(`${cacheDir}/_LSP.js`);
  console.log(`🚀 RELEASE依赖文件${remoteDependencyExit ? '已存在 ✅' : '不存在 🚫'}`);
  console.log(`----------------------------------------`);
  // ------------------------------
  if (!remoteDependencyExit) { // 下载依赖
    // 创建根目录
    if (!fm.fileExists(cacheDir)) {
      fm.createDirectory(cacheDir, true);
    }
    // 下载
    console.log('🤖 RELEASE开始下载依赖~');
    console.log(`----------------------------------------`);
    const req = new Request(dependencyURL);
    const moduleJs = await req.load();
    if (moduleJs) {
      fm.write(fm.joinPath(cacheDir, '/_LSP.js'), moduleJs);
      console.log('✅ LSP远程依赖环境下载成功！');
      console.log(`----------------------------------------`);
    } else {
      console.error('🚫 获取依赖环境脚本失败，请重试！');
      console.log(`----------------------------------------`);
    }
  }
}

/**
 * 获取保存的文件名
 * @param {*} fileName 
 * @returns 
 */
function getSaveFileName(fileName) {
  const hasSuffix = fileName.lastIndexOf(".") + 1;
  return !hasSuffix ? `${fileName}.js` : fileName;
};

/**
 * 保存文件到Scriptable软件目录，app可看到
 * @param {*} fileName 
 * @param {*} content 
 * @returns 
 */
function saveFile2Scriptable(fileName, content) {
  try {
    const fm = FileManager.iCloud();
    let fileSimpleName = getSaveFileName(fileName);
    const filePath = fm.joinPath(fm.documentsDirectory(), fileSimpleName);
    fm.writeString(filePath, content);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * 下载js文件到Scriptable软件目录
 * @param {*} moduleName 名称 
 * @param {*} url 在线地址 
 * @returns 
 */
async function downloadFile2Scriptable(moduleName, url) {
  const req = new Request(url);
  const content = await req.loadString();
  return saveFile2Scriptable(`${moduleName}`, content);
};

// =================================================================================
// =================================================================================