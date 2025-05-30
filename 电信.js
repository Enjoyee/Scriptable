// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: mobile-alt;
/**
 * Author:LSP
 * Date:2024-04-19
 */
// -------------------------------------------------------
// 是否是开发环境，配合手机端调试使用，正式发布设置为false
const isDev = false;
const dependencyLSP = '20240419_1';
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
    cache_key_detail: 'detail',
    cache_key_balance: 'balance',
    fetchUrl: {
      home: 'https://e.dlife.cn/wap/mine/showIndex.do#/',
      detail: 'https://e.dlife.cn/user/package_detail.do',
      balance: 'https://e.dlife.cn/user/balance.do',
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

  getValueByKey = (key) => this.readWidgetSetting()[key] ?? this.defaultPreference[key];

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
          name: 'chinaTelecomCK',
          label: '天翼信息',
          type: 'cell',
          icon: `${this.getRemoteRootPath()}/img/icon_10000.png`,
          needLoading: true,
          desc: this.getValueByKey('loginMiddle')?.length > 0 ? '已填写' : '未填写'
        },
        {
          name: 'filterOrientateFlow',
          label: '过滤定向流量',
          type: 'switch',
          icon: { name: 'bag.fill', color: '#F14A16', },
          needLoading: false,
          default: false
        },
        {
          name: 'showUsedFlow',
          label: '显示已使用流量',
          type: 'switch',
          icon: { name: 'archivebox.fill', color: '#ECA97A', },
          needLoading: false,
          default: false
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
        let insertDesc;
        const widgetSetting = this.readWidgetSetting();
        switch (item.name) {
          case 'chinaTelecomCK':
            let loginMiddle;
            let selectIndex = await this.generateAlert('登录信息填写', '1.复制链接进行网页登录\n2.抓取包含loginMiddle.do链接进行填入', ['复制地址', '填入链接']);
            if (selectIndex == 0) {
              Pasteboard.copy(this.defaultPreference.fetchUrl.home);
              await this.generateAlert('提示', '登录链接已复制，请自行网页登录抓包', ["好的"])
            } else {
              await this.generateInputAlert({
                title: '登录信息链接填写',
                message: '填入抓取包含loginMiddle.do的链接',
                options: [
                  { hint: '请输入链接', value: '' },
                ]
              }, async (inputArr) => {
                this.reset = true;
                loginMiddle = inputArr[0].value;
                // 保存配置
                widgetSetting['loginMiddle'] = loginMiddle;
              });
            }
            insertDesc = loginMiddle?.length > 0 ? '已填写' : '未填写';
            this.writeWidgetSetting({ ...widgetSetting });
            break;
        }
        return {
          desc: { value: insertDesc },
        };
      },
    };
  }

  async render({ widgetSetting }) {
    return await this.provideSmallWidget(widgetSetting);
  }

  async provideSmallWidget(widgetSetting) {
    // ========================================
    let loginMiddle = widgetSetting.loginMiddle;
    if (loginMiddle) {
      console.log('获取加载ck...');
      const req = new Request(widgetSetting.loginMiddle);
      req.credentials = 'include';
      await req.load();
      const cookieResArr = req.response.cookies;
      const ckArr = cookieResArr?.map(item => `${item.name}=${item.value}`);
      const ck = ckArr.join(';')
      widgetSetting['cookie'] = ck;
      this.cookie = ck;
      console.log(`获取到的ck：${ck}`);
    } else {
      console.error('❌❌❌❌❌未配置登录链接❌❌❌❌❌');
    }
    console.log(`=======================================`);

    // ========================================
    await this.loadMoneyBalance();
    await this.loadDetailInfo(widgetSetting);
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
    textSpan.textColor = titleTextColor;
    textSpan.font = titleFont;
    // 
    stack.addSpacer(descSpacer);
    let displayStack = stack.addStack();
    displayStack.centerAlignContent();
    displayStack.addSpacer(descLeftSpacer);
    textSpan = displayStack.addText(`${this.fee.balance}${this.fee.unit}`);
    textSpan.textColor = descTextColor;
    textSpan.font = infoFont;
    displayStack.addSpacer();
    // ========================================
    stack.addSpacer(lineSpacer);
    textSpan = stack.addText(`${this.voice.title} `);
    textSpan.textColor = titleTextColor;
    textSpan.font = titleFont;
    // 
    stack.addSpacer(descSpacer);
    displayStack = stack.addStack();
    displayStack.centerAlignContent();
    displayStack.addSpacer(descLeftSpacer);
    textSpan = displayStack.addText(`${voiceBalance}${this.voice.unit}`);
    textSpan.textColor = descTextColor;
    textSpan.font = infoFont;
    displayStack.addSpacer();
    // ========================================
    stack.addSpacer(lineSpacer);
    textSpan = stack.addText(`${this.flow.title} `);
    textSpan.textColor = titleTextColor;
    textSpan.font = titleFont;
    // 
    stack.addSpacer(descSpacer);
    displayStack = stack.addStack();
    displayStack.centerAlignContent();
    displayStack.addSpacer(descLeftSpacer);
    textSpan = displayStack.addText(`${this.flow.balance}${this.flow.unit}`);
    textSpan.textColor = descTextColor;
    textSpan.font = infoFont;
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
    imgSpan.tintColor = refreshTimeTextColor;
    btStack.addSpacer(4);
    if (this.success) {
      this.lastUpdate = this.getDateStr(new Date(), 'HH:mm');
    }
    textSpan = btStack.addText(`${this.getDateStr(new Date(), 'HH:mm')} `);
    textSpan.textColor = refreshTimeTextColor;
    textSpan.font = Font.lightSystemFont(10);
    btStack.addSpacer();
    image = await this.getImageByUrl(`${this.getRemoteRootPath()}/img/ic_logo_10000.jpg`);
    imgSpan = btStack.addImage(image);
    imgSpan.imageSize = new Size(14, 14);
    stack.addSpacer();
    //=================================
    return widget;
  }

  // --------------------------NET START--------------------------
  bodyText2Response = async (webview, cacheKey) => {
    const widgetSetting = this.readWidgetSetting();
    const text = await webview.evaluateJavaScript("document.body.innerText");
    const ck = await webview.evaluateJavaScript("document.cookie");
    console.log(`CK:${ck} `);
    let RES;
    try {
      this.success = true;
      RES = JSON.parse(text);
      widgetSetting['loginRes'] = 'login';
      this.useFileManager().writeJSONCache(cacheKey, RES);
    } catch (error) {
      this.success = false;
      widgetSetting['loginRes'] = '';
      console.error(`加载出错：${text} `);
    }
    this.writeWidgetSetting(widgetSetting);
    return RES;
  }

  /**
   * 加载账户余额
   */
  loadMoneyBalance = async () => {
    const response = await this.httpGet(
      this.defaultPreference.fetchUrl.balance,
      {
        useCache: this.reset ?? false,
        dataSuccess: (res) => res.serviceResultCode == '0',
        headers: {
          'cookie': this.cookie
        }
      }
    );
    this.fee.balance = response == undefined || response['serviceResultCode'] == 0 ? parseFloat(parseInt(response?.totalBalanceAvailable || 0) / 100).toFixed(2) : 'NAN';
  }

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
  loadDetailInfo = async (widgetSetting) => {
    const { filterOrientateFlow, showUsedFlow } = widgetSetting;
    const response = await this.httpGet(
      this.defaultPreference.fetchUrl.detail,
      {
        useCache: this.reset ?? false,
        dataSuccess: (res) => res.paraFieldResult == 'SUCCESS',
        headers: {
          'cookie': this.cookie
        }
      }
    );
    // 总流量
    let totalFlowAmount = 0;
    // 剩余流量
    let totalBalanceFlowAmount = 0;
    // 已用流量
    let totalUsedFlowAmount = 0;
    // 总语音
    let totalVoiceAmount = 0;
    // 剩余语音
    let totalBalanceVoiceAmount = 0;
    // 语音
    if (response?.voiceAmount && response?.voiceBalance) {
      totalVoiceAmount = response.voiceAmount;
      totalBalanceVoiceAmount = response.voiceBalance;
    }
    // 流量&语音
    let isUnlimitedFlow = false;
    response?.items?.forEach((data) => {
      if (data.offerType !== 19) {
        data.items?.forEach((item) => {
          if (item.unitTypeId == 3) {
            if (!(item.usageAmount == 0 && item.balanceAmount == 0)) {
              let ratableResourcename = item.ratableResourcename;
              let ratableAmount = item.ratableAmount;
              let balanceAmount = item.balanceAmount;
              let usedAmount = ratableAmount - balanceAmount;
              console.log(`套餐名称：«${ratableResourcename}»`);
              console.log(`套餐总流量：${ratableAmount} MB`);
              console.log(`套餐剩余流量：${balanceAmount} MB`);
              console.log(`套餐已用流量：${usedAmount} MB`);
              console.log(`================================= `);
              if (filterOrientateFlow && ratableResourcename.search('定向') != -1 || balanceAmount == '999999999999') {
                ratableAmount = 0;
                balanceAmount = 0;
              }
              totalFlowAmount += parseFloat(ratableAmount);
              totalBalanceFlowAmount += parseFloat(balanceAmount);
            }
            totalUsedFlowAmount += parseFloat(item.usageAmount);
            if (showUsedFlow) {
              this.flow.title = '⛽️ 流量已用：';
            }
            if (data.offerType == 21 && item.ratableAmount == '0') {
              // 无限流量用户
              isUnlimitedFlow = true;
            }
          } else if (!response.voiceBalance && item.unitTypeId == 1) {
            totalVoiceAmount += parseInt(item.ratableAmount);
            totalBalanceVoiceAmount += parseInt(item.balanceAmount);
          }
        });
      }
    });
    const totalFlowObj = this.formatFlow(totalFlowAmount);
    const totalBalanceFlowObj = this.formatFlow(totalBalanceFlowAmount);
    const totalUsedFlowObj = this.formatFlow(totalUsedFlowAmount);
    const finalBalanceFlowObj = showUsedFlow ? totalUsedFlowObj : totalBalanceFlowObj;
    console.log(`总流量：${totalFlowObj.amount}${totalFlowObj.unit} `);
    console.log(`剩余流量：${totalBalanceFlowObj.amount}${totalBalanceFlowObj.unit} `);
    console.log(`已使用流量：${totalUsedFlowObj.amount}${totalUsedFlowObj.unit} `);
    console.log(`总语音：${totalVoiceAmount}${this.voice.unit} `);
    console.log(`剩余语音：${totalBalanceVoiceAmount}${this.voice.unit} `);
    console.log(`================================= `);
    // 设置流量
    this.flow.percent = ((totalBalanceFlowAmount / (totalFlowAmount || 1)) * 100).toFixed(2);
    this.flow.balance = finalBalanceFlowObj.amount;
    this.flow.unit = finalBalanceFlowObj.unit;
    if (isUnlimitedFlow) {
      const usageAmountObj = this.formatFlow(totalUsedFlowAmount);
      this.flow.title = '⛽️ 流量已用：';
      this.flow.balance = usageAmountObj.amount;
      this.flow.unit = usageAmountObj.unit;
    }
    // 设置语音
    this.voice.percent = ((totalBalanceVoiceAmount / (totalVoiceAmount || 1)) * 100).toFixed(2);
    this.voice.balance = totalBalanceVoiceAmount;
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