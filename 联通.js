// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: mobile-alt;
/**
 * Author:LSP
 * Date:2023-04-15
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
    fetchUrl: {
      detail: `https://m.client.10010.com/mobileserviceimportant/home/queryUserInfoSeven?version=iphone_c@10.0100&desmobiel=13232135179&showType=0`,
    },
    titleDayColor: '#000000',
    titleNightColor: '#999999',
    descDayColor: '#000000',
    descNightColor: '#999999',
    refreshTimeDayColor: '#000000',
    refreshTimeNightColor: '#999999',
  };

  fee = {
    title: '📱 剩余话费：',
    balance: 0,
    unit: '元',
  };

  voice = {
    title: '⏳ 剩余语音：',
    balance: 0,
    percent: 0,
    unit: '分钟',
  };

  flow = {
    title: '⛽️ 剩余流量：',
    balance: 0,
    percent: 0,
    unit: 'MB',
  };

  getValueByKey = (key) => this.readWidgetSetting()[key] ?? '';

  titleDayColor = () => this.getValueByKey('titleDayColor');
  titleNightColor = () => this.getValueByKey('titleNightColor');

  descDayColor = () => this.getValueByKey('descDayColor');
  descNightColor = () => this.getValueByKey('descNightColor');

  refreshTimeDayColor = () => this.getValueByKey('refreshTimeDayColor');
  refreshTimeNightColor = () => this.getValueByKey('refreshTimeNightColor');

  constructor(scriptName) {
    super(scriptName);
    this.reset = false;
    this.defaultConfig.bgType = '3';
    this.backgroundColor = '#FEFCF3,#0A2647';
    this.cookie = this.getValueByKey('cookie');
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
          name: 'chinaUnicomCK',
          label: '联通Cookie',
          type: 'cell',
          icon: `${this.getRemoteRootPath()}/img/icon_10010.png`,
          needLoading: true,
          desc: this.getValueByKey('cookie')?.length > 0 ? '已填写' : '未填写'
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
                  name: 'titleDayColor',
                  label: '标题浅色颜色',
                  type: 'color',
                  icon: { name: 'pencil.and.outline', color: '#3a86ff', },
                  needLoading: false,
                  default: this.titleDayColor(),
                },
                {
                  name: 'titleNightColor',
                  label: '标题深色颜色',
                  type: 'color',
                  icon: { name: 'square.and.pencil', color: '#3a0ca3', },
                  needLoading: false,
                  default: this.titleNightColor(),
                },
              ],
            },
            {
              items: [
                {
                  name: 'descDayColor',
                  label: '内容浅色颜色',
                  type: 'color',
                  icon: { name: 'pencil.and.outline', color: '#3a86ff', },
                  needLoading: false,
                  default: this.descDayColor(),
                },
                {
                  name: 'descNightColor',
                  label: '内容深色颜色',
                  type: 'color',
                  icon: { name: 'square.and.pencil', color: '#3a0ca3', },
                  needLoading: false,
                  default: this.descNightColor(),
                },
              ],
            },
            {
              items: [
                {
                  name: 'refreshTimeDayColor',
                  label: '刷新时间浅色颜色',
                  type: 'color',
                  icon: { name: 'pencil.and.outline', color: '#3a86ff', },
                  needLoading: false,
                  default: this.refreshTimeDayColor(),
                },
                {
                  name: 'refreshTimeNightColor',
                  label: '刷新时间深色颜色',
                  type: 'color',
                  icon: { name: 'square.and.pencil', color: '#3a0ca3', },
                  needLoading: false,
                  default: this.refreshTimeNightColor(),
                },
              ],
            },
          ]
        },
      ],
      // cell类型的item点击回调
      onItemClick: async (item) => {
        const widgetSetting = this.readWidgetSetting();
        let insertDesc = widgetSetting.phone?.length > 0 && widgetSetting.cookie?.length > 0 ? '已填写' : '未填写';
        switch (item.name) {
          case 'chinaUnicomCK':
            let phone;
            let ck;
            await this.generateInputAlert({
              title: '登录信息填写',
              message: '自己抓取联通客户端app的cookie填入',
              options: [
                { hint: '请输入联通号码', value: widgetSetting?.phone ?? '' },
                { hint: '请输入cookie', value: widgetSetting?.cookie ?? '' },
              ]
            }, async (inputArr) => {
              this.reset = true;
              phone = inputArr[0].value;
              ck = inputArr[1].value;
              // 保存配置
              widgetSetting['phone'] = phone;
              widgetSetting['cookie'] = ck;
            });
            this.cookie = widgetSetting.cookie;
            insertDesc = phone?.length > 0 && ck?.length > 0 ? '已填写' : '未填写';
            this.writeWidgetSetting({ ...widgetSetting });
            break;
        }
        return {
          desc: { value: insertDesc },
        };
      },
    };
  }

  async render() {
    return await this.provideSmallWidget();
  }

  async provideSmallWidget() {
    // ========================================
    await this.loadDetailInfo();
    const voiceBalance = this.voice.balance;
    // ========================================
    const widget = new ListWidget();
    widget.setPadding(0, 0, 0, 0);
    // ========================================
    const widgetSize = this.getWidgetSize('小号');
    let stack = widget.addStack();
    let image = await this.getImageByUrl(`${this.getRemoteRootPath()}/img/bg_doraemon_1.png`);
    stack.setPadding(4, 12, 0, 12);
    stack.backgroundImage = image;
    stack.size = new Size(widgetSize.width, widgetSize.height);
    stack.layoutVertically();
    stack.addSpacer();
    // ========================================
    const titleFont = Font.lightSystemFont(13);
    const infoFont = Font.mediumSystemFont(16);
    const titleTextColor = Color.dynamic(new Color(this.titleDayColor()), new Color(this.titleNightColor()));
    const descTextColor = Color.dynamic(new Color(this.descDayColor()), new Color(this.descNightColor()));
    const refreshTimeTextColor = Color.dynamic(new Color(this.refreshTimeDayColor()), new Color(this.refreshTimeNightColor()));
    const descSpacer = 3;
    const lineSpacer = 4;
    const descLeftSpacer = 22;
    // ========================================
    let textSpan = stack.addText(`${this.fee.title}`);
    textSpan.textColor = titleTextColor
    textSpan.font = titleFont;
    // 
    stack.addSpacer(descSpacer);
    let displayStack = stack.addStack();
    displayStack.centerAlignContent();
    displayStack.addSpacer(descLeftSpacer);
    textSpan = displayStack.addText(`${this.fee.balance}${this.fee.unit}`);
    textSpan.textColor = descTextColor
    textSpan.font = infoFont
    displayStack.addSpacer();
    // ========================================
    stack.addSpacer(lineSpacer);
    textSpan = stack.addText(`${this.voice.title}`);
    textSpan.textColor = titleTextColor
    textSpan.font = titleFont;
    // 
    stack.addSpacer(descSpacer);
    displayStack = stack.addStack();
    displayStack.centerAlignContent();
    displayStack.addSpacer(descLeftSpacer);
    textSpan = displayStack.addText(`${voiceBalance}${this.voice.unit}`);
    textSpan.textColor = descTextColor
    textSpan.font = infoFont
    displayStack.addSpacer();
    // ========================================
    stack.addSpacer(lineSpacer);
    textSpan = stack.addText(`${this.flow.title}`);
    textSpan.textColor = titleTextColor
    textSpan.font = titleFont;
    // 
    stack.addSpacer(descSpacer);
    displayStack = stack.addStack();
    displayStack.centerAlignContent();
    displayStack.addSpacer(descLeftSpacer);
    textSpan = displayStack.addText(`${this.flow.balance}${this.flow.unit}`);
    textSpan.textColor = descTextColor
    textSpan.font = infoFont
    displayStack.addSpacer();
    // ========================================

    // ========================================
    stack.addSpacer(6);
    let btStack = stack.addStack();
    btStack.centerAlignContent();
    btStack.addSpacer(6);
    image = this.getSFSymbol('goforward');
    let imgSpan = btStack.addImage(image);
    imgSpan.imageSize = new Size(9, 9);
    imgSpan.tintColor = refreshTimeTextColor
    btStack.addSpacer(4);
    if (this.success) {
      this.lastUpdate = this.getDateStr(new Date(), 'HH:mm');
    }
    textSpan = btStack.addText(`${this.getDateStr(new Date(), 'HH:mm')}`);
    textSpan.textColor = refreshTimeTextColor
    textSpan.font = Font.lightSystemFont(10);
    btStack.addSpacer();
    image = await this.getImageByUrl(`${this.getRemoteRootPath()}/img/ic_logo_10010.png`);
    imgSpan = btStack.addImage(image);
    imgSpan.imageSize = new Size(14, 14);
    stack.addSpacer();
    //=================================
    return widget;
  }

  // --------------------------NET START--------------------------
  /**
   * 流量格式化
   * @param {*} flow 
   * @returns 
   */
  formatFlow = (flow) => {
    const remain = flow / 1024;
    if (remain < 1024) {
      return { amount: remain.toFixed(2), unit: 'MB' };
    }
    return { amount: (remain / 1024).toFixed(2), unit: 'GB' };
  }

  /**
   * 加载明细
   * @returns 
   */
  loadDetailInfo = async () => {
    const response = await this.httpGet(
      this.defaultPreference.fetchUrl.detail,
      {
        useCache: this.reset ?? false,
        dataSuccess: (res) => res.code == 'Y',
        headers: {
          'Host': 'm.client.10010.com',
          'User-Agent': 'ChinaUnicom.x CFNetwork iOS/16.3 unicom{version:iphone_c@10.0100}',
          'cookie': this.cookie,
        }
      }
    );
    if (response?.code == 'Y') {
      const { feeResource, voiceResource, flowResource } = response;
      // 话费
      this.fee = {
        title: `📱 ${feeResource?.dynamicFeeTitle}：`,
        balance: feeResource?.feePersent,
        unit: feeResource?.newUnit,
      };
      // 语音
      this.voice = {
        title: `⏳ ${voiceResource?.dynamicVoiceTitle}：`,
        balance: voiceResource?.voicePersent,
        percent: 0,
        unit: voiceResource?.newUnit,
      };
      // 流量
      this.flow = {
        title: `⛽️ ${flowResource?.dynamicFlowTitle}：`,
        balance: flowResource?.flowPersent,
        percent: 0,
        unit: flowResource?.newUnit,
      };
      console.log(`话费：`);
      console.log(JSON.stringify(this.fee, null, 2));
      console.log(`语音：`);
      console.log(JSON.stringify(this.voice, null, 2));
      console.log(`流量：`);
      console.log(JSON.stringify(this.flow, null, 2));
    } else {
      this.notify('联通小组件', `可能cookie失效了~`);
    }
  }

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