// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: clock;
/**
 * Author:LSP
 * Date:2023-05-12
 */
// -------------------------------------------------------
// 是否是开发环境，配合手机端调试使用，正式发布设置为false
const isDev = false;
const dependencyLSP = '20230511';
console.log(`当前环境 👉👉👉👉👉 ${isDev ? 'DEV' : 'RELEASE'}`);
console.log(`----------------------------------------`);
// 分支
const branch = 'v2';
// 仓库根目录
const remoteGithubRoot = `https://raw.githubusercontent.com/Enjoyee/Scriptable/${branch}`;
const remoteHomeLandRoot = `https://glimmerk.coding.net/p/Scriptable/shared-depot/source/git/raw/${branch}`;
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
    countDownName: 'LSP',
    prefixTitle: '',
    countDownDate: this.getDateStr(new Date(), 'yyyy-MM-dd'),
    //
    titleFontSize: 14,
    titleDayColor: '#000000',
    titleNightColor: '#FFFFFF',
    //
    countdownFontSize: 22,
    countdownDayColor: '#000000',
    countdownNightColor: '#FFFFFF',
  };

  getValueByKey = (key) => this.readWidgetSetting()[key] ?? this.defaultPreference[key];

  prefixTitle = () => this.getValueByKey('prefixTitle');

  countDownName = () => this.getValueByKey('countDownName');

  countDownDate = () => this.getValueByKey('countDownDate');

  titleFontSize = () => parseInt(this.getValueByKey('titleFontSize'));
  titleDayColor = () => this.getValueByKey('titleDayColor');
  titleNightColor = () => this.getValueByKey('titleNightColor');

  countdownFontSize = () => parseInt(this.getValueByKey('countdownFontSize'));
  countdownDayColor = () => this.getValueByKey('countdownDayColor');
  countdownNightColor = () => this.getValueByKey('countdownNightColor');

  constructor(scriptName) {
    super(scriptName);
    this.backgroundColor = '#FEFCF3,#0A2647';
    this.changeBgMode2OnLineBg(
      [`${this.getRemoteRootPath()}/img/ic_clock.png`]
    );
  }

  async getAppViewOptions() {
    return {
      widgetProvider: {
        small: true, // 是否提供小号组件
        medium: false, // 是否提供中号组件
        large: false, // 是否提供大号组件
      },
      // 预览界面的组件设置item
      settingItems: [
        {
          name: 'countDownName',
          label: '计时标题',
          type: 'cell',
          icon: { name: 'tag', color: '#7678ed', },
          alert: {
            title: '计时标题',
            options: [
              {
                key: 'countDownName',
                hint: '请输入计时标题',
              }
            ]
          },
          showDesc: true,
          needLoading: false,
          default: this.countDownName(),
        },
        {
          name: 'countDownDate',
          label: '计时日期',
          type: 'cell',
          icon: { name: 'clock.arrow.circlepath', color: '#f35b04', },
          needLoading: false,
          default: this.countDownDate(),
        },
        {
          name: 'otherSetting',
          label: '其他设置',
          type: 'cell',
          icon: 'https://cdnjson.com/images/2024/02/05/settings.png',
          needLoading: true,
          childItems: [
            {
              items: [
                {
                  name: 'prefixTitle',
                  label: '计时标题前缀',
                  type: 'input',
                  icon: { name: 'square.on.circle', color: '#0D9DF0', },
                  needLoading: false,
                  default: this.prefixTitle(),
                },
                {
                  name: 'countdownType',
                  label: '计时类型',
                  type: 'select',
                  icon: { name: 'square.on.square', color: '#0753F7', },
                  needLoading: false,
                  options: [
                    { label: '常规计时', value: '1' },
                    { label: '纪念日', value: '2' },
                    { label: '出生岁数', value: '3' },
                  ],
                  default: '1',
                },
              ]
            },
            {
              items: [
                {
                  name: 'titleFontSize',
                  label: '计时标题文字大小',
                  type: 'cell',
                  icon: { name: 'tag', color: '#7678ed', },
                  needLoading: false,
                  alert: {
                    title: '计时标题文字大小',
                    options: [
                      {
                        key: 'titleFontSize',
                        hint: '请输入字号',
                      }
                    ]
                  },
                  default: this.titleFontSize(),
                },
                {
                  name: 'titleDayColor',
                  label: '计时标题文字浅色颜色',
                  type: 'color',
                  icon: { name: 'sun.min.fill', color: '#3a86ff', },
                  needLoading: false,
                  default: this.titleDayColor(),
                },
                {
                  name: 'titleNightColor',
                  label: '计时标题文字深色颜色',
                  type: 'color',
                  icon: { name: 'moon.fill', color: '#3a0ca3', },
                  needLoading: false,
                  default: this.titleNightColor(),
                },
              ]
            },
            {
              items: [
                {
                  name: 'countdownFontSize',
                  label: '计时文字大小',
                  type: 'cell',
                  icon: { name: 'stopwatch', color: '#7678ed', },
                  needLoading: false,
                  alert: {
                    title: '计时文字大小',
                    options: [
                      {
                        key: 'countdownFontSize',
                        hint: '请输入字号',
                      }
                    ]
                  },
                  default: this.countdownFontSize(),
                },
                {
                  name: 'countdownDayColor',
                  label: '计时文字浅色颜色',
                  type: 'color',
                  icon: { name: 'sun.min.fill', color: '#3a86ff', },
                  needLoading: false,
                  default: this.countdownDayColor(),
                },
                {
                  name: 'countdownNightColor',
                  label: '计时文字深色颜色',
                  type: 'color',
                  icon: { name: 'moon.fill', color: '#3a0ca3', },
                  needLoading: false,
                  default: this.countdownNightColor(),
                },
              ]
            },
          ]
        },
      ],
      // cell类型的item点击回调
      onItemClick: async (item) => {
        let widgetSetting = this.readWidgetSetting();
        let insertDesc = '';
        switch (item.name) {
          case 'countDownDate':
            try {
              const date = await new DatePicker().pickDate();
              insertDesc = this.getDateStr(date, 'yyyy-MM-dd');
              widgetSetting[item.name] = insertDesc;
            } catch (error) {
            }
            break;
        }
        // 写入更新配置
        this.writeWidgetSetting(widgetSetting);
        return {
          desc: { value: insertDesc },
        };
      },
    };
  }

  async render({ widgetSetting }) {
    const { countdownType = '1' } = widgetSetting;
    const countdownTypeNum = parseInt(countdownType);
    if (countdownTypeNum == 2) {
      this.defaultPreference.countdownFontSize = 22;
      return await this.provideMemorialWidget(widgetSetting);
    } else if (countdownTypeNum == 3) {
      this.defaultPreference.countdownFontSize = 30;
      return await this.provideBirthdayWidget(widgetSetting);
    } else {
      this.defaultPreference.countdownFontSize = 22;
      return await this.provideNormalWidget(widgetSetting);
    }
  }

  async provideNormalWidget(widgetSetting) {
    // ----------------------------------------
    const widgetSize = this.getWidgetSize('小号');
    //=================================
    const widget = new ListWidget();
    widget.setPadding(0, 0, 0, 0);
    //=================================
    let stack = widget.addStack();
    stack.setPadding(12, 8, 0, 8);
    stack.size = new Size(widgetSize.width, widgetSize.height);
    stack.layoutVertically();

    // ----------------------------------------
    const countDownTime = new Date(`${this.countDownDate()} 00:00`).getTime();
    const timeInterval = (countDownTime - new Date().getTime()) / 86400 / 1000;
    // ----------------------------------------
    let hStack = stack.addStack();
    hStack.addSpacer();
    let textSpan = hStack.addText(`${this.prefixTitle()}❝${this.countDownName()}❞ ${timeInterval >= 0 ? '还有' : '已过'}`);
    textSpan.textColor = this.dynamicColor(this.titleDayColor(), this.titleNightColor());
    textSpan.font = Font.lightSystemFont(this.titleFontSize());
    hStack.addSpacer();
    // ----------------------------------------
    stack.addSpacer();
    let countDownStack = stack.addStack();
    countDownStack.centerAlignContent();
    countDownStack.addSpacer();
    // 倒计
    let dateSpan = countDownStack.addDate(new Date(countDownTime));
    dateSpan.centerAlignText();
    dateSpan.lineLimit = 2;
    dateSpan.applyRelativeStyle();
    dateSpan.font = Font.semiboldRoundedSystemFont(this.countdownFontSize());
    dateSpan.textColor = this.dynamicColor(this.countdownDayColor(), this.countdownNightColor());
    countDownStack.addSpacer();

    // ----------------------------------------
    stack.addSpacer();
    //=================================
    return widget;
  }

  async provideMemorialWidget(widgetSetting) {
    // ----------------------------------------
    const widgetSize = this.getWidgetSize('小号');
    //=================================
    const widget = new ListWidget();
    widget.setPadding(0, 0, 0, 0);
    //=================================
    let stack = widget.addStack();
    stack.setPadding(12, 8, 0, 8);
    stack.size = new Size(widgetSize.width, widgetSize.height);
    stack.layoutVertically();

    // ----------------------------------------
    const countShotDate = this.countDownDate().slice(5);
    const currShotDate = this.getDateStr(new Date(), 'MM-dd');
    const isToday = countShotDate == currShotDate;
    const countDownTime = +new Date(`${this.countDownDate()} 00:00`);
    const timeInterval = Math.floor((+new Date() - countDownTime) / 86400 / 1000 / 365);
    const isOverdue = (+new Date() - +new Date(`${new Date().getFullYear()}-${countShotDate} 00:00`)) / 86400 / 1000 >= 1;
    // ----------------------------------------
    let hStack = stack.addStack();
    hStack.addSpacer();
    let textSpan = hStack.addText(`${this.prefixTitle()}❝${this.countDownName()}❞ ${timeInterval + 1}周年`);
    textSpan.textColor = this.dynamicColor(this.titleDayColor(), this.titleNightColor());
    textSpan.font = Font.mediumSystemFont(this.titleFontSize());
    hStack.addSpacer();
    //
    hStack = stack.addStack();
    hStack.addSpacer();
    textSpan = hStack.addText(`纪念日${isToday ? '' : '还有'}`);
    textSpan.textColor = this.dynamicColor(this.titleDayColor(), this.titleNightColor());
    textSpan.font = Font.systemFont(this.titleFontSize() - 2);
    textSpan.textOpacity = 0.9;
    hStack.addSpacer();

    // ----------------------------------------
    stack.addSpacer();
    let countDownStack = stack.addStack();
    countDownStack.centerAlignContent();
    countDownStack.addSpacer();
    if (isToday) {
      let image = await this.getImageByUrl(`${this.getRemoteRootPath()}/img/party-popper.png`);
      let imgSpan = countDownStack.addImage(image);
      imgSpan.imageSize = new Size(60, 60);
      imgSpan.imageOpacity = 0.9;
    } else {
      // 倒计
      let realCountDownTime = +new Date(`${new Date().getFullYear()}-${countShotDate} 00:00`);
      if (isOverdue) {
        realCountDownTime = +new Date(`${new Date().getFullYear() + 1}-${countShotDate} 00:00`);
      }
      let dateSpan = countDownStack.addDate(new Date(realCountDownTime));
      dateSpan.centerAlignText();
      dateSpan.lineLimit = 2;
      dateSpan.applyRelativeStyle();
      dateSpan.font = Font.semiboldRoundedSystemFont(this.countdownFontSize());
      dateSpan.textColor = this.dynamicColor(this.countdownDayColor(), this.countdownNightColor());
    }
    countDownStack.addSpacer();

    // ----------------------------------------
    stack.addSpacer();
    //=================================
    return widget;
  }

  async provideBirthdayWidget(widgetSetting) {
    // ----------------------------------------
    const widgetSize = this.getWidgetSize('小号');
    //=================================
    const widget = new ListWidget();
    widget.setPadding(0, 0, 0, 0);
    //=================================
    let stack = widget.addStack();
    stack.size = new Size(widgetSize.width, widgetSize.height);
    stack.layoutVertically();

    // ----------------------------------------
    const countShotDate = this.countDownDate().slice(5);
    const currShotDate = this.getDateStr(new Date(), 'MM-dd');
    const isToday = countShotDate == currShotDate;
    const countDownTime = +new Date(`${this.countDownDate()} 00:00`);
    const timeInterval = Math.floor((+new Date() - countDownTime) / 86400 / 1000 / 365);
    const isOverdue = (+new Date() - +new Date(`${new Date().getFullYear()}-${countShotDate} 00:00`)) / 86400 / 1000 >= 1;
    // ----------------------------------------

    // ----------------------------------------
    let topStack = stack.addStack();
    topStack.size = new Size(widgetSize.width, widgetSize.height * 0.75);
    topStack.layoutVertically();
    topStack.addSpacer();
    //
    let hStack = topStack.addStack();
    hStack.setPadding(0, 0, 2, 10);
    hStack.addSpacer();
    let textSpan = hStack.addText(`${this.prefixTitle()}${this.countDownName()}`);
    textSpan.textColor = this.dynamicColor(this.titleDayColor(), this.titleNightColor());
    textSpan.font = Font.mediumRoundedSystemFont(this.titleFontSize());

    // ----------------------------------------
    let bottomStack = stack.addStack();
    bottomStack.centerAlignContent();
    bottomStack.size = new Size(widgetSize.width, widgetSize.height * 0.3);
    bottomStack.backgroundColor = this.dynamicColor('#FEFCF3', '#0A2647');
    bottomStack.setPadding(0, 12, 0, 0);
    //
    if (timeInterval >= 1) {
      textSpan = bottomStack.addText(`${timeInterval}`);
      textSpan.textColor = this.dynamicColor(this.countdownDayColor(), this.countdownNightColor());
      textSpan.font = Font.semiboldRoundedSystemFont(this.countdownFontSize());
      // 
      bottomStack.addSpacer(4);
      let vStack = bottomStack.addStack();
      vStack.layoutVertically();
      textSpan = vStack.addText(`岁${isToday ? '啦，生日快乐！🎂' : ''}`);
      textSpan.textColor = this.dynamicColor(this.countdownDayColor(), this.countdownNightColor());
      textSpan.font = Font.systemFont(Math.max(10, this.countdownFontSize() - 20));
      //
      if (!isToday) {
        hStack = vStack.addStack();
        textSpan = hStack.addText(`零`);
        textSpan.textColor = this.dynamicColor(this.countdownDayColor(), this.countdownNightColor());
        textSpan.font = Font.systemFont(Math.max(10, this.countdownFontSize() - 20));
        //
        let realCountDownTime = +new Date(`${new Date().getFullYear() - (isOverdue ? 0 : 1)}-${countShotDate} 00:00`);
        let dateSpan = hStack.addDate(new Date(realCountDownTime));
        dateSpan.leftAlignText();
        dateSpan.lineLimit = 2;
        dateSpan.applyRelativeStyle();
        dateSpan.font = Font.systemFont(Math.max(10, this.countdownFontSize() - 20));
        dateSpan.textColor = this.dynamicColor(this.countdownDayColor(), this.countdownNightColor());
      }
    } else {
      let realCountDownTime = +new Date(`${new Date().getFullYear() - 1}-${countShotDate} 00:00`);
      let dateSpan = bottomStack.addDate(new Date(realCountDownTime));
      dateSpan.leftAlignText();
      dateSpan.lineLimit = 2;
      dateSpan.applyRelativeStyle();
      dateSpan.font = Font.semiboldRoundedSystemFont(Math.max(this.countdownFontSize() - 12, 12));
      dateSpan.textColor = this.dynamicColor(this.countdownDayColor(), this.countdownNightColor());
    }
    //
    if (isToday) {
      bottomStack.addSpacer(4);
    } else {
      bottomStack.addSpacer();
    }
    // ----------------------------------------
    stack.addSpacer();
    //=================================
    return widget;
  }
  // --------------------------NET START--------------------------

  // --------------------------NET END--------------------------
}

await new Widget(Script.name()).run();


// =================================================================================
// =================================================================================
async function downloadLSPDependency() {
  let fm = FileManager.local();
  const fileName = fm.joinPath(fm.documentsDirectory(), `LSP/${Script.name()}/settings.json`);
  const fileExists = fm.fileExists(fileName);
  let cacheString = '{}';
  if (fileExists) {
    cacheString = fm.readString(fileName);
  }
  const use_github = JSON.parse(cacheString)['use_github'];
  const dependencyURL = `${use_github ? remoteGithubRoot : remoteHomeLandRoot}/_LSP.js`;
  const update = needUpdateDependency();
  if (isDev) {
    const iCloudPath = FileManager.iCloud().documentsDirectory();
    const localIcloudDependencyExit = fm.isFileStoredIniCloud(`${iCloudPath}/_LSP.js`);
    const localDependencyExit = fm.fileExists(`${rootDir}/_LSP.js`);
    const fileExist = localIcloudDependencyExit || localDependencyExit;
    console.log(`🚀 DEV开发依赖文件${fileExist ? '已存在 ✅' : '不存在 🚫'}`);
    if (!fileExist || update) {
      console.log(`🤖 DEV 开始${update ? '更新' + dependencyLSP : '下载'}依赖~`);
      keySave('VERSION', dependencyLSP);
      await downloadFile2Scriptable('_LSP', dependencyURL);
    }
    return;
  }

  //////////////////////////////////////////////////////////
  console.log(`----------------------------------------`);
  const remoteDependencyExit = fm.fileExists(`${cacheDir}/_LSP.js`);
  console.log(`🚀 RELEASE依赖文件${remoteDependencyExit ? '已存在 ✅' : '不存在 🚫'}`);
  // ------------------------------
  if (!remoteDependencyExit || update) { // 下载依赖
    // 创建根目录
    if (!fm.fileExists(cacheDir)) {
      fm.createDirectory(cacheDir, true);
    }
    // 下载
    console.log(`🤖 RELEASE开始${update ? '更新' : '下载'}依赖~`);
    console.log(`----------------------------------------`);
    const req = new Request(dependencyURL);
    const moduleJs = await req.load();
    if (moduleJs) {
      fm.write(fm.joinPath(cacheDir, '/_LSP.js'), moduleJs);
      keySave('VERSION', dependencyLSP);
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

/**
 * 是否需要更新依赖版本
 */
function needUpdateDependency() {
  return dependencyLSP != keyGet('VERSION');
};

function keySave(cacheKey, cache) {
  if (cache) {
    Keychain.set(Script.name() + cacheKey, cache);
  }
}

function keyGet(cacheKey, defaultValue = '') {
  if (Keychain.contains(Script.name() + cacheKey)) {
    return Keychain.get(Script.name() + cacheKey);
  } else {
    return defaultValue;
  }
}
// =================================================================================
// =================================================================================