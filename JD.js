// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: feather-alt;
/**
 * Author:LSP
 * Date:2023-08-21
 */
// -------------------------------------------------------
// 是否是开发环境，配合手机端调试使用，正式发布设置为false
const isDev = false;
const dependencyLSP = '20230602';
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
    link_fruit: 'openApp.jdMobile://virtual?params=%7B%22category%22%3A%22jump%22%2C%22des%22%3A%22m%22%2C%22url%22%3A%22https%3A%2F%2Fcarry.m.jd.com%2FbabelDiy%2FZeus%2F3KSjXqQabiTuD1cJ28QskrpWoBKT%2Findex.html%3FbabelChannel%3D94%22%7D',
    link_package: 'openapp.jdmobile://virtual?params=%7B%22category%22%3A%22jump%22%2C%22des%22%3A%22m%22%2C%22url%22%3A%22https%3A%2F%2Ftrade.m.jd.com%2Forder%2Forderlist_jdm.shtml%3Fsceneval%3D2%26jxsid%3D16780988595962555448%26orderType%3DwaitReceipt%26ptag%3D7155.1.13%26source%3Dmy%2Findex%3Fsource%3Dlingjingdoushouye%22%7D',
    link_bean_detail: 'openapp.jdmobile://virtual?params=%7B%22category%22%3A%22jump%22%2C%22des%22%3A%22m%22%2C%22url%22%3A%22https%3A%2F%2Fbean.m.jd.com%2FbeanDetail%2Findex.action%3FresourceValue%3Dbean%22%7D',
    centerIconUrls: [
      'img/ic_pikachu_1.png',
      'img/ic_pikachu_4.png',
      'img/ic_pikachu_5.png',
      'img/ic_pikachu_6.png',
      'img/ic_pikachu_7.png',
      'img/ic_pikachu_8.png',
      'img/ic_cat_1.png',
      'img/ic_cat_2.png',
      'img/ic_cat_3.png',
      'img/ic_cat_4.png',
      'img/ic_cat_5.png',
      'img/ic_cat_6.png',
      'img/ic_cat_7.png',
      'img/ic_cat_8.png',
    ],
    leftStackWidth: 80,
    userInfoParam: {
      'functionId': 'jx.userinfo.query',
      'appid': 'jx_h5',
      't': 1692596879037,
      'channel': 'jxh5',
      'client': 'jxh5',
      'cthr': '1',
      'cv': '1.2.5',
      'clientVersion': '1.2.5',
      'loginType': '2',
      'body': JSON.stringify({ "sceneid": 80027, "sceneval": 2, "buid": 325, "appCode": "ms0ca95114", "time": 1692596879037, "signStr": "e3013086b16b6ad04ac13d143d0bda07" }),
    },
    myBeanParam: {
      'appid': 'jd-cphdeveloper-m',
      'functionId': 'myBean',
      'body': JSON.stringify({ "tenantCode": "jgm", "bizModelCode": '6', "bizModeClientType": "M", "externalLoginType": '1' }),
      'g_login_type': 0,
      'g_tk': '997104177',
      'g_ty': 'ajax',
      'appCode': 'ms0ca95114',
    },
    redPackageParam: {
      'functionId': 'redPacket',
      'appid': 'jd-cphdeveloper-m',
      'loginType': 2,
      'client': 'm',
      'sceneval': 2,
      'g_login_type': 1,
      'g_ty': 'ajax',
      'appCode': 'ms0ca95114',
      'body': JSON.stringify({ "type": 1, "redBalanceFlag": 1, "page": 1, "tenantCode": "jgm", "bizModelCode": "6", "bizModeClientType": "M", "externalLoginType": "1" }),
    },
    nicknameDayColor: '#000000',
    nicknameNightColor: '#000000',
    jvDayColor: '#000000',
    jvNightColor: '#000000',
    beanDayColor: '#F62910',
    beanNightColor: '#F62910',
    expiredBeanDayColor: '#AD4731',
    expiredBeanNightColor: '#AD4731',
    dateBeanTitleDayColor: '#000000',
    dateBeanTitleNightColor: '#000000',
    dateBeaneDayColor: '#000000',
    dateBeanNightColor: '#000000',
    redPackageDayColor: '#F62910',
    redPackageNightColor: '#F62910',
    expiredRedPackageDayColor: '#ff8260',
    expiredRedPackageNightColor: '#ff8260',
    fruitDayColor: '#84B264',
    fruitNightColor: '#84B264',
    baiTiaoDayColor: '#F62910',
    baiTiaoNightColor: '#F62910',
    packageFlowTitleDayColor: '#283149',
    packageFlowTitleNightColor: '#283149',
    packageFlowDescDayColor: '#494949',
    packageFlowDescNightColor: '#494949',
  };

  userInfo = {
    levelName: '', // 等级名称
    jvalue: 0, // 京享值
    nickname: '',
    headImageUrl: '',
    isPlusVip: false,
  }

  redPackage = {
    amount: 0,
    expired: '',
  };

  beanInfo = {
    totalAmount: 0,
    yesterdayGain: 0,
    todayGain: 0,
    almostExpired: 0,
  }

  packageFlow = {
    count: 0,
    details: []
  }

  baitiao = {
    title: '',
    amount: '',
    desc: ''
  }

  fruit = {
    name: '',
    simpleName: '',
    goodsImage: '',
    percent: ''
  }

  getValueByKey = (key) => this.readWidgetSetting()[key] ?? this.defaultPreference[key] ?? '';

  ck = () => this.getValueByKey('cookie');

  nicknameDayColor = () => this.getValueByKey('nicknameDayColor');
  nicknameNightColor = () => this.getValueByKey('nicknameNightColor');

  jvDayColor = () => this.getValueByKey('jvDayColor');
  jvNightColor = () => this.getValueByKey('jvNightColor');

  beanDayColor = () => this.getValueByKey('beanDayColor');
  beanNightColor = () => this.getValueByKey('beanNightColor');

  expiredBeanDayColor = () => this.getValueByKey('expiredBeanDayColor');
  expiredBeanNightColor = () => this.getValueByKey('expiredBeanNightColor');

  dateBeanTitleDayColor = () => this.getValueByKey('dateBeanTitleDayColor');
  dateBeanTitleNightColor = () => this.getValueByKey('dateBeanTitleNightColor');

  dateBeanDayColor = () => this.getValueByKey('dateBeanDayColor');
  dateBeanNightColor = () => this.getValueByKey('dateBeanNightColor');

  redPackageDayColor = () => this.getValueByKey('redPackageDayColor');
  redPackageNightColor = () => this.getValueByKey('redPackageNightColor');

  expiredRedPackageDayColor = () => this.getValueByKey('expiredRedPackageDayColor');
  expiredRedPackageNightColor = () => this.getValueByKey('expiredRedPackageNightColor');

  fruitDayColor = () => this.getValueByKey('fruitDayColor');
  fruitNightColor = () => this.getValueByKey('fruitNightColor');

  baiTiaoDayColor = () => this.getValueByKey('baiTiaoDayColor');
  baiTiaoNightColor = () => this.getValueByKey('baiTiaoNightColor');

  packageFlowTitleDayColor = () => this.getValueByKey('packageFlowTitleDayColor');
  packageFlowTitleNightColor = () => this.getValueByKey('packageFlowTitleNightColor');

  packageFlowDescDayColor = () => this.getValueByKey('packageFlowDescDayColor');
  packageFlowDescNightColor = () => this.getValueByKey('packageFlowDescNightColor');

  constructor(scriptName) {
    super(scriptName);
    this.defaultConfig.refreshInterval = '60';
    this.changeBgMode2OnLineBg(
      [`${this.getRemoteRootPath()}/img/jd/bg_orange.png`],
      { blur: false, darkBlur: false, blurRadius: 50 }
    );
    // --------------------------------------------
    this.cookie = this.ck();
    this.defaultHeaders = {
      'cookie': this.cookie,
      'Sec-Fetch-Mode': 'cors',
      'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
    }
    if (!this.cookie) {
      delete this.defaultHeaders.cookie;
    }
    this.jdNum = this.useFileManager().readStringCache('jdBean');
    this.jdNumChange = true;
    this.vSpacer = 0;
    this.useFruitInfoCache = true;
  }

  async getAppViewOptions() {
    return {
      widgetProvider: {
        small: false, // 是否提供小号组件
        medium: true, // 是否提供中号组件
        large: false, // 是否提供大号组件
      },
      // 预览界面的组件设置item
      settingItems: [
        {
          name: 'jdLogin',
          label: '登录京东',
          type: 'cell',
          icon: `${this.getRemoteRootPath()}/img/jd/icon_app_logo.png`,
          needLoading: true,
          default: this.ck()?.length > 0 ? '已登录' : '未登录',
        },
        {
          name: 'otherSetting',
          label: '其他设置',
          type: 'cell',
          icon: `${this.getRemoteRootPath()}/img/setting.gif`,
          needLoading: true,
          childItems: [
            {
              items: [
                {
                  name: 'nicknameDayColor',
                  label: '用户名浅色颜色',
                  type: 'color',
                  icon: { name: 'pencil.and.outline', color: '#3a86ff', },
                  needLoading: false,
                  default: this.nicknameDayColor(),
                },
                {
                  name: 'nicknameNightColor',
                  label: '用户名深色颜色',
                  type: 'color',
                  icon: { name: 'square.and.pencil', color: '#3a0ca3', },
                  needLoading: false,
                  default: this.nicknameNightColor(),
                }
              ]
            },
            {
              items: [
                {
                  name: 'jvDayColor',
                  label: '京享值浅色颜色',
                  type: 'color',
                  icon: { name: 'pencil.and.outline', color: '#3a86ff', },
                  needLoading: false,
                  default: this.jvDayColor(),
                },
                {
                  name: 'jvNightColor',
                  label: '京享值深色颜色',
                  type: 'color',
                  icon: { name: 'square.and.pencil', color: '#3a0ca3', },
                  needLoading: false,
                  default: this.jvNightColor(),
                }
              ]
            },
            {
              items: [
                {
                  name: 'beanDayColor',
                  label: '京豆浅色颜色',
                  type: 'color',
                  icon: { name: 'pencil.and.outline', color: '#3a86ff', },
                  needLoading: false,
                  default: this.beanDayColor(),
                },
                {
                  name: 'beanNightColor',
                  label: '京豆深色颜色',
                  type: 'color',
                  icon: { name: 'square.and.pencil', color: '#3a0ca3', },
                  needLoading: false,
                  default: this.beanNightColor(),
                }
              ]
            },
            {
              items: [
                {
                  name: 'expiredBeanDayColor',
                  label: '快过期京豆浅色颜色',
                  type: 'color',
                  icon: { name: 'pencil.and.outline', color: '#3a86ff', },
                  needLoading: false,
                  default: this.expiredBeanDayColor(),
                },
                {
                  name: 'expiredBeanNightColor',
                  label: '快过期京豆深色颜色',
                  type: 'color',
                  icon: { name: 'square.and.pencil', color: '#3a0ca3', },
                  needLoading: false,
                  default: this.expiredBeanNightColor(),
                }
              ]
            },
            {
              items: [
                {
                  name: 'dateBeanTitleDayColor',
                  label: '日期标题浅色颜色',
                  type: 'color',
                  icon: { name: 'pencil.and.outline', color: '#3a86ff', },
                  needLoading: false,
                  default: this.dateBeanTitleDayColor(),
                },
                {
                  name: 'dateBeanTitleNightColor',
                  label: '日期标题深色颜色',
                  type: 'color',
                  icon: { name: 'square.and.pencil', color: '#3a0ca3', },
                  needLoading: false,
                  default: this.dateBeanTitleNightColor(),
                }
              ]
            },
            {
              items: [
                {
                  name: 'dateBeanDayColor',
                  label: '日期京豆浅色颜色',
                  type: 'color',
                  icon: { name: 'pencil.and.outline', color: '#3a86ff', },
                  needLoading: false,
                  default: this.dateBeanDayColor(),
                },
                {
                  name: 'dateBeanNightColor',
                  label: '日期京豆深色颜色',
                  type: 'color',
                  icon: { name: 'square.and.pencil', color: '#3a0ca3', },
                  needLoading: false,
                  default: this.dateBeanNightColor(),
                }
              ]
            },
            {
              items: [
                {
                  name: 'redPackageDayColor',
                  label: '红包浅色颜色',
                  type: 'color',
                  icon: { name: 'pencil.and.outline', color: '#3a86ff', },
                  needLoading: false,
                  default: this.redPackageDayColor(),
                },
                {
                  name: 'redPackageNightColor',
                  label: '红包深色颜色',
                  type: 'color',
                  icon: { name: 'square.and.pencil', color: '#3a0ca3', },
                  needLoading: false,
                  default: this.redPackageNightColor(),
                }
              ]
            },
            {
              items: [
                {
                  name: 'expiredRedPackageDayColor',
                  label: '快过期红包浅色颜色',
                  type: 'color',
                  icon: { name: 'pencil.and.outline', color: '#3a86ff', },
                  needLoading: false,
                  default: this.expiredRedPackageDayColor(),
                },
                {
                  name: 'expiredRedPackageNightColor',
                  label: '快过期红包深色颜色',
                  type: 'color',
                  icon: { name: 'square.and.pencil', color: '#3a0ca3', },
                  needLoading: false,
                  default: this.expiredRedPackageNightColor(),
                }
              ]
            },
            {
              items: [
                {
                  name: 'fruitDayColor',
                  label: '农场浅色颜色',
                  type: 'color',
                  icon: { name: 'pencil.and.outline', color: '#3a86ff', },
                  needLoading: false,
                  default: this.fruitDayColor(),
                },
                {
                  name: 'fruitNightColor',
                  label: '农场深色颜色',
                  type: 'color',
                  icon: { name: 'square.and.pencil', color: '#3a0ca3', },
                  needLoading: false,
                  default: this.fruitNightColor(),
                }
              ]
            },
            {
              items: [
                {
                  name: 'baiTiaoDayColor',
                  label: '白条浅色颜色',
                  type: 'color',
                  icon: { name: 'pencil.and.outline', color: '#3a86ff', },
                  needLoading: false,
                  default: this.baiTiaoDayColor(),
                },
                {
                  name: 'baiTiaoNightColor',
                  label: '白条深色颜色',
                  type: 'color',
                  icon: { name: 'square.and.pencil', color: '#3a0ca3', },
                  needLoading: false,
                  default: this.baiTiaoNightColor(),
                }
              ]
            },
            {
              items: [
                {
                  name: 'packageFlowTitleDayColor',
                  label: '物流标题浅色颜色',
                  type: 'color',
                  icon: { name: 'pencil.and.outline', color: '#3a86ff', },
                  needLoading: false,
                  default: this.packageFlowTitleDayColor(),
                },
                {
                  name: 'packageFlowTitleNightColor',
                  label: '物流标题深色颜色',
                  type: 'color',
                  icon: { name: 'square.and.pencil', color: '#3a0ca3', },
                  needLoading: false,
                  default: this.packageFlowTitleNightColor(),
                }
              ]
            },
            {
              items: [
                {
                  name: 'packageFlowDescDayColor',
                  label: '物流明细浅色颜色',
                  type: 'color',
                  icon: { name: 'pencil.and.outline', color: '#3a86ff', },
                  needLoading: false,
                  default: this.packageFlowDescDayColor(),
                },
                {
                  name: 'packageFlowDescNightColor',
                  label: '物流明细深色颜色',
                  type: 'color',
                  icon: { name: 'square.and.pencil', color: '#3a0ca3', },
                  needLoading: false,
                  default: this.packageFlowDescNightColor(),
                }
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
          case 'jdLogin':
            let ck = widgetSetting?.cookie ?? '';
            let selectIndex = await this.generateAlert('登录信息', '1.网页登录\n2.自己抓取填入ck', ['网页登录', '直接填入']);
            if (selectIndex == 0) {
              const webview = new WebView();
              await webview.loadURL('https://plogin.m.jd.com/login/login?appid=300&returnurl=https%3A%2F%2Fwqs.jd.com%2Fmy%2Faccountv2.shtml%3Fsceneval%3D2%26jxsid%3D16323729562173504755%26ptag%3D7155.1.2&source=wq_passport');
              await webview.present();
              //
              const REQ = new Request('https://ms.jr.jd.com/gw/generic/bt/h5/m/firstScreenNew',);
              REQ.method = 'POST';
              REQ.body = 'reqData={"clientType":"ios","clientVersion":"13.2.3","deviceId":"","environment":"3"}';
              await REQ.loadJSON();
              const cookies = REQ.response.cookies;
              const cookie = [];
              cookies.forEach((item) => {
                const value = `${item.name}=${item.value}`;
                if (item.name === 'pt_key') cookie.push(value);
                if (item.name === 'pt_pin') cookie.push(value)
              });
              if (cookie.length != 0) {
                ck = cookie.join(';');
                widgetSetting['cookie'] = ck;
              }
            } else {
              await this.generateInputAlert({
                title: '登录信息填写',
                message: '填入抓取京东的cookie',
                options: [
                  { hint: '请输入cookie', value: widgetSetting?.cookie ?? '' },
                ]
              }, async (inputArr) => {
                this.reset = true;
                ck = inputArr[0].value;
                // 保存配置
                widgetSetting['cookie'] = ck;
              });
            }
            this.cookie = ck;
            console.log("2====================");
            console.log(this.cookie);
            console.log("2====================");
            insertDesc = ck?.length > 0 ? '已登录' : '未登录';
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
    return await this.provideMediumWidget(widgetSetting);
  }

  async provideMediumWidget() {
    await this.loadData();
    const { details } = this.packageFlow;
    // ----------------------------------------
    const widgetSize = this.getWidgetSize('中号');
    //=================================
    const widget = new ListWidget();
    widget.setPadding(0, 0, 0, 0);
    //=================================
    let stack = widget.addStack();
    if (details.length === 0) {
      this.vSpacer = 4;
      stack.addSpacer();
    } else {
      this.vSpacer = 0;
      stack.addSpacer(6);
    }
    stack.setPadding(10, 10, 10, 10);
    stack.size = new Size(widgetSize.width, widgetSize.height);
    stack.layoutVertically();
    let topStack = stack.addStack();
    topStack.layoutHorizontally();
    let userInfoStack = topStack.addStack();
    //=================================
    await this.userInfoStack(userInfoStack);
    topStack.addSpacer(14);
    let detailInfoStack = topStack.addStack();
    await this.detailInfoStack(detailInfoStack, widgetSize);
    //=================================
    await this.packageFlowInfoStack(stack, widgetSize.width);
    //=================================
    if (details.length === 0) {
      stack.addSpacer();
    } else {
      stack.addSpacer(6);
    }
    return widget;
  }

  async userInfoStack(userInfoStack) {
    let stackSize = new Size(this.defaultPreference.leftStackWidth, 0);
    const extra = 10;
    const avatarSize = new Size(63 + this.vSpacer * 2, 63 + this.vSpacer * 2);
    const jvBgColor = new Color('#ffde7d', 0.8);
    //================================
    let imgSpan;
    let textSpan;
    let image;
    //================================
    userInfoStack.layoutVertically();
    userInfoStack.size = stackSize;
    let infoStack = userInfoStack.addStack();
    infoStack.size = stackSize;
    infoStack.centerAlignContent();
    let avatarStack = infoStack.addStack();
    let avatarImage = await this.circleCropImage(this.userInfo.headImageUrl);
    const avatarImageSize = avatarImage.size;
    let plusBgImage = await this.getImageByUrl(`${this.getRemoteRootPath()}/img/jd/bg_plus_avatar.png`);
    //
    const ctx = new DrawContext();
    ctx.opaque = false;
    ctx.respectScreenScale = true;
    let rect = new Rect(0, 0, avatarImageSize.width + extra, avatarImageSize.height + extra);
    ctx.size = new Size(rect.width, rect.height);
    ctx.drawImageAtPoint(avatarImage, new Point(extra / 2, extra / 2 + 2 * Device.screenScale() - 10));
    avatarStack.size = avatarSize;
    avatarStack.backgroundImage = ctx.getImage();
    //
    if (this.userInfo.isPlusVip) {
      imgSpan = avatarStack.addImage(plusBgImage);
      imgSpan.imageSize = avatarSize;
    }
    //================================
    userInfoStack.addSpacer(10 + this.vSpacer);
    let nameStack = userInfoStack.addStack();
    nameStack.size = stackSize;
    nameStack.centerAlignContent();
    if (this.userInfo.isPlusVip) {
      image = await this.getImageByUrl(`${this.getRemoteRootPath()}/img/jd/icon_plus.jpg`);
      imgSpan = nameStack.addImage(image);
      imgSpan.imageSize = new Size(15, 15);
      nameStack.addSpacer(8);
    }
    textSpan = nameStack.addText(this.userInfo.nickname);
    textSpan.lineLimit = 1;
    textSpan.textColor = Color.dynamic(new Color(this.nicknameDayColor()), new Color(this.nicknameNightColor()));
    textSpan.font = Font.regularSystemFont(12);
    //================================
    userInfoStack.addSpacer(5 + this.vSpacer / 2);
    let jvStackContainer = userInfoStack.addStack();
    jvStackContainer.size = stackSize;
    jvStackContainer.centerAlignContent();
    let jvStack = jvStackContainer.addStack();
    image = await this.getImageByUrl(`${this.getRemoteRootPath()}/img/jd/bg_red_rect.png`);
    jvStack.backgroundColor = jvBgColor;
    jvStack.backgroundImage = image;
    jvStack.setPadding(2, 8, 2, 8);
    textSpan = jvStack.addText(`京享值 ${this.userInfo.jvalue}`);
    textSpan.textOpacity = 0.9;
    textSpan.textColor = Color.dynamic(new Color(this.jvDayColor()), new Color(this.jvNightColor()));
    textSpan.font = Font.regularSystemFont(10);
    jvStack.cornerRadius = 10;
  }

  async detailInfoStack(detailInfoStack, widgetSize) {
    const icon = this.getRandowArrValue(this.defaultPreference.centerIconUrls);
    let btInfoIndex = parseInt(this.keyGet('btInfoIndex', '0'));
    const bannerSize = new Size(34 + this.vSpacer, 34 + this.vSpacer);
    const textBannerSize = new Size(30 + this.vSpacer, 30 + this.vSpacer);
    const normalBeanSize = new Size(16, 16);
    const expireBeanSize = new Size(13, 13);
    const emojiSize = new Size(48, 48);
    const beanColor = Color.dynamic(new Color(this.beanDayColor()), new Color(this.beanNightColor()));
    const expiredBeanColor = Color.dynamic(new Color(this.expiredBeanDayColor()), new Color(this.expiredBeanNightColor()));
    //================================
    let imgSpan;
    let textSpan;
    let image;
    //================================
    detailInfoStack.layoutVertically();
    let totalBeanStack = detailInfoStack.addStack();
    totalBeanStack.centerAlignContent();
    image = await this.getImageByUrl(`${this.getRemoteRootPath()}/img/jd/ic_jd_logo.png`);
    imgSpan = totalBeanStack.addImage(image);
    imgSpan.imageSize = bannerSize;
    //
    totalBeanStack.addSpacer(8);
    image = await this.getImageByUrl(`${this.getRemoteRootPath()}/img/jd/ic_jd_text.jpg`);
    imgSpan = totalBeanStack.addImage(image);
    imgSpan.imageSize = textBannerSize;
    //
    totalBeanStack.addSpacer(12);
    textSpan = totalBeanStack.addText(`${this.beanInfo.totalAmount}`);
    textSpan.textColor = beanColor;
    textSpan.font = Font.boldSystemFont(20);
    //
    totalBeanStack.addSpacer(2);
    image = await this.getImageByUrl(`${this.getRemoteRootPath()}/img/jd/ic_bean_color.jpg`);
    imgSpan = totalBeanStack.addImage(image);
    imgSpan.imageSize = normalBeanSize;
    // ------------------------
    totalBeanStack.addSpacer(12);
    textSpan = totalBeanStack.addText(`${this.beanInfo.almostExpired}`);
    textSpan.textColor = expiredBeanColor;
    textSpan.font = Font.mediumSystemFont(14);
    //
    totalBeanStack.addSpacer(2);
    image = await this.getImageByUrl(`${this.getRemoteRootPath()}/img/jd/icon_bean_yellow.png`);
    imgSpan = totalBeanStack.addImage(image);
    imgSpan.imageOpacity = 0.6;
    imgSpan.imageSize = expireBeanSize;
    totalBeanStack.url = this.defaultPreference.link_bean_detail;
    //================================
    detailInfoStack.addSpacer(this.vSpacer * 2);
    let beanInfoStack = detailInfoStack.addStack();
    beanInfoStack.size = new Size(widgetSize.width - this.defaultPreference.leftStackWidth - 30, 0);
    //================================
    beanInfoStack.addSpacer(4);
    let yesterdayBeanStack = beanInfoStack.addStack();
    yesterdayBeanStack.layoutVertically();
    textSpan = yesterdayBeanStack.addText(`昨天`);
    textSpan.textColor = Color.dynamic(new Color(this.dateBeanTitleDayColor()), new Color(this.dateBeanTitleNightColor()));
    textSpan.font = Font.regularSystemFont(12);
    yesterdayBeanStack.addSpacer(5);
    yesterdayBeanStack.url = this.defaultPreference.link_bean_detail;
    //
    textSpan = yesterdayBeanStack.addText(`${this.beanInfo.yesterdayGain}`);
    textSpan.textColor = Color.dynamic(new Color(this.dateBeanDayColor()), new Color(this.dateBeanNightColor()));
    textSpan.font = Font.regularSystemFont(25);
    //================================
    beanInfoStack.addSpacer();
    image = await this.getImageByUrl(`${this.getRemoteRootPath()}/${icon}`);
    imgSpan = beanInfoStack.addImage(image);
    imgSpan.imageSize = emojiSize;
    imgSpan.imageOpacity = 0.8;
    //================================
    beanInfoStack.addSpacer();
    let todayBeanStack = beanInfoStack.addStack();
    todayBeanStack.layoutVertically();
    textSpan = todayBeanStack.addText(`今天`);
    textSpan.textColor = Color.dynamic(new Color(this.dateBeanTitleDayColor()), new Color(this.dateBeanTitleNightColor()));
    textSpan.font = Font.regularSystemFont(12);
    todayBeanStack.addSpacer(5);
    todayBeanStack.url = this.defaultPreference.link_bean_detail;
    //
    textSpan = todayBeanStack.addText(`${this.beanInfo.todayGain}`);
    textSpan.textColor = Color.dynamic(new Color(this.dateBeanDayColor()), new Color(this.dateBeanNightColor()));
    textSpan.font = Font.regularSystemFont(25);
    beanInfoStack.addSpacer(10);
    //================================
    const stackSize = 3;
    detailInfoStack.addSpacer(4);
    if (btInfoIndex == 1 && this.fruit.simpleName?.length > 0) {
      await this.fruitInfoStack(detailInfoStack);
    } else if (btInfoIndex == 2 && this.baitiao.amount != 0) {
      await this.baiTiaoStack(detailInfoStack);
    } else {
      await this.redPackageStack(detailInfoStack);
    }
    btInfoIndex++;
    btInfoIndex = btInfoIndex % stackSize;
    this.keySave('btInfoIndex', `${btInfoIndex}`);
    //================================
  }

  async redPackageStack(detailInfoStack) {
    //================================
    let imgSpan;
    let textSpan;
    let image;
    //================================
    const walletSize = new Size(25, 25);
    const redPackageColor = Color.dynamic(new Color(this.redPackageDayColor()), new Color(this.redPackageNightColor()));
    const expiredRedPackageColor = Color.dynamic(new Color(this.expiredRedPackageDayColor()), new Color(this.expiredRedPackageNightColor()));
    //================================
    detailInfoStack.addSpacer(2);
    let walletStack = detailInfoStack.addStack();
    walletStack.centerAlignContent();
    walletStack.addSpacer(6);
    image = await this.getImageByUrl(`${this.getRemoteRootPath()}/img/jd/icon_wallet.jpg`);
    imgSpan = walletStack.addImage(image);
    imgSpan.imageSize = walletSize;
    //
    walletStack.addSpacer(13)
    textSpan = walletStack.addText(`${this.redPackage.amount}`);
    textSpan.textColor = redPackageColor;
    textSpan.font = Font.mediumSystemFont(18);
    //
    walletStack.addSpacer(4)
    textSpan = walletStack.addText(`元`);
    textSpan.textColor = redPackageColor;
    textSpan.font = Font.mediumSystemFont(11);
    //
    textSpan = walletStack.addText(`，即将过期: ${this.redPackage.expired}元`);
    textSpan.textColor = expiredRedPackageColor;
    textSpan.font = Font.mediumSystemFont(11);
  }

  async fruitInfoStack(detailInfoStack) {
    //================================
    let imgSpan;
    let textSpan;
    let image;
    //================================
    const fruitSize = new Size(18, 18);
    const fruitColor = Color.dynamic(new Color(this.fruitDayColor()), new Color(this.fruitNightColor()));
    //================================
    detailInfoStack.addSpacer(6);
    let fruitStack = detailInfoStack.addStack();
    fruitStack.url = this.defaultPreference.link_fruit;
    fruitStack.centerAlignContent();
    fruitStack.addSpacer(6);
    image = await this.getImageByUrl(`${this.getRemoteRootPath()}/img/jd/icon_fruit.png`);
    imgSpan = fruitStack.addImage(image);
    imgSpan.imageSize = fruitSize;
    //
    fruitStack.addSpacer(8);
    const simpleName = this.fruit.simpleName;
    let simpleText = simpleName.length >= 6 ? simpleName.slice(0, 7) : simpleName;
    let showText = `农场『${simpleText}』进度:`;
    textSpan = fruitStack.addText(showText);
    textSpan.textColor = fruitColor;
    textSpan.font = Font.regularSystemFont(showText.length > 12 ? 11 : 12);
    textSpan.lineLimit = 1;
    //
    fruitStack.addSpacer(6);
    textSpan = fruitStack.addText(`${this.fruit.percent}`);
    textSpan.textColor = fruitColor;
    textSpan.font = Font.boldSystemFont(12);
    textSpan.lineLimit = 1;
  }

  async baiTiaoStack(detailInfoStack) {
    //================================
    let imgSpan;
    let textSpan;
    let image;
    //================================
    const baiTiaoSize = new Size(25, 25);
    const baiTiaoColor = Color.dynamic(new Color(this.baiTiaoDayColor()), new Color(this.baiTiaoNightColor()));;
    //================================
    detailInfoStack.addSpacer(2);
    let baiTiaoStack = detailInfoStack.addStack();
    baiTiaoStack.centerAlignContent();
    baiTiaoStack.addSpacer(6);
    image = await this.getImageByUrl(`${this.getRemoteRootPath()}/img/jd/icon_baitiao.jpg`);
    imgSpan = baiTiaoStack.addImage(image);
    imgSpan.imageSize = baiTiaoSize;
    //
    baiTiaoStack.addSpacer(8);
    const monthIndex = this.baitiao?.desc?.indexOf('月');
    textSpan = baiTiaoStack.addText(`${monthIndex == -1 ? this.baitiao.title : `${this.baitiao.desc}待还款:`}`);
    textSpan.textColor = baiTiaoColor;
    textSpan.font = Font.regularSystemFont(11);
    //
    baiTiaoStack.addSpacer(4);
    textSpan = baiTiaoStack.addText(`${this.baitiao.amount}`);
    textSpan.textColor = baiTiaoColor;
    textSpan.font = Font.boldSystemFont(14);
    textSpan.lineLimit = 1;
    //
    if (monthIndex == -1) {
      textSpan = baiTiaoStack.addText(`，${this.baitiao.desc}。`);
      textSpan.textColor = baiTiaoColor;
      textSpan.font = Font.regularSystemFont(11);
      textSpan.lineLimit = 1;
    }
  }

  async packageFlowInfoStack(stack, width) {
    const { details } = this.packageFlow;
    if (details.length === 0) {
      return
    }
    let keyIndex = this.keyGet('flowIndex', '0');
    keyIndex++;
    keyIndex = keyIndex % details.length;
    this.keySave('flowIndex', `${keyIndex}`);
    const itemFlow = details[keyIndex];
    //================================
    let imgSpan;
    let textSpan;
    let image;
    //================================
    const coverSize = new Size(23, 23);
    const titleColor = Color.dynamic(new Color(this.packageFlowTitleDayColor()), new Color(this.packageFlowTitleNightColor()));
    const descColor = Color.dynamic(new Color(this.packageFlowDescDayColor()), new Color(this.packageFlowDescNightColor()));
    //================================
    stack.addSpacer(4);
    let packageFlowStack = stack.addStack();
    packageFlowStack.size = new Size(width - 16, 0);
    packageFlowStack.addSpacer(8);
    packageFlowStack.centerAlignContent();
    packageFlowStack.url = this.defaultPreference.link_package;
    //
    image = await this.getImageByUrl(itemFlow.cover);
    imgSpan = packageFlowStack.addImage(image);
    imgSpan.imageOpacity = 0.8;
    imgSpan.imageSize = coverSize;
    imgSpan.cornerRadius = 4;
    //
    packageFlowStack.addSpacer(8);
    let infoStack = packageFlowStack.addStack();
    infoStack.layoutVertically();
    //
    textSpan = infoStack.addText(`【${this.getDateStr(new Date(itemFlow.time), 'MM-dd HH:mm')}】${itemFlow.title}`);
    textSpan.textColor = titleColor;
    textSpan.font = Font.regularSystemFont(10);
    textSpan.textOpacity = 0.8;
    textSpan.lineLimit = 1;
    //
    textSpan = infoStack.addText(`  ${itemFlow.desc}`);
    textSpan.textColor = descColor;
    textSpan.font = Font.regularSystemFont(9);
    textSpan.textOpacity = 0.7;
    textSpan.lineLimit = 1;
    //
    packageFlowStack.addSpacer();
    stack.addSpacer(2);
  }

  async loadData() {
    await this.userInfoFun();
    await this.redPackageInfoFun();
    await this.loadNearbyBeanDetailsFun();
    await this.myBeanInfoFun();
    await this.packageFlowFun();
    await this.baiTiaoInfoFun();
    await this.fruitInfoFun();
  }

  wrapperValue = (value) => value ?? '--';

  // --------------------------NET START--------------------------
  joinQueryParams = (param) => {
    let params = Object.keys(param).map(key =>
      `${key}=${param[key]}`
    );
    params = params.join('&');
    return `?${encodeURI(params)}`;
  }

  /**
   * 个人信息
   */
  userInfoFun = async () => {
    const url = `https://api.m.jd.com/api${this.joinQueryParams(this.defaultPreference.userInfoParam)}`;
    const options = {
      headers: {
        ...this.defaultHeaders,
        'origin': 'https://wqs.jd.com',
        'referer': 'https://wqs.jd.com/',
      },
    };
    const RES = await this.httpGet(url, { ...options, dataSuccess: (res) => res?.retcode == '0' });
    if (RES?.retcode == '0') {
      const { base, isPlusVip } = RES;
      if (base) {
        const { levelName, jvalue, nickname, headImageUrl } = base;
        const headImgUrlTmp = headImageUrl?.replace(/_mid/g, '_big');
        this.userInfo = {
          ...this.userInfo,
          levelName: this.wrapperValue(levelName),
          jvalue: this.wrapperValue(jvalue),
          nickname: this.wrapperValue(nickname),
          headImageUrl: headImgUrlTmp?.length == 0 ? `${this.getRemoteRootPath()}/img/jd/icon_avatar_jd.png` : headImgUrlTmp,
          isPlusVip,
        }
      }
    } else {
      console.error('用户信息获取失败！');
    }
    console.log(`用户信息：`);
    console.log(
      JSON.stringify(RES, null, 2)
    );
    this.logDivider();
  }

  /**
   * 红包信息
   */
  redPackageInfoFun = async () => {
    const url = `https://api.m.jd.com/api${this.joinQueryParams(this.defaultPreference.redPackageParam)}`;
    const options = {
      headers: {
        ...this.defaultHeaders,
        'origin': 'https://wqs.jd.com',
        'referer': 'https://wqs.jd.com/',
      },
    };
    const RES = await this.httpGet(url, { ...options });
    if (RES?.code == 0) {
      const { result } = RES;
      this.redPackage.amount = result.balance ? result.balance : 0;
      if (result.expiredBalance && result.expiredBalance !== '') {
        this.redPackage.expired = result.expiredBalance;
      }
    } else {
      console.error('红包信息获取失败！');
    }
    console.log(`红包信息：`);
    console.log(
      JSON.stringify(RES, null, 2)
    );
    this.logDivider();
  }

  /**
   * 我的京豆
   */
  myBeanInfoFun = async () => {
    const url = `https://api.m.jd.com${this.joinQueryParams(this.defaultPreference.myBeanParam)}`;
    const options = {
      headers: {
        ...this.defaultHeaders,
        'origin': 'https://wqs.jd.com',
        'referer': 'https://wqs.jd.com/',
      },
    };
    const RES = await this.httpGet(url, { ...options, dataSuccess: (res) => res?.beanNum != undefined });
    const { beanNum, willExpireNum } = RES;
    this.jdNumChange = this.jdNum == 0 || beanNum == 0 || this.jdNum != beanNum;
    if (RES?.list?.length > 0) {
      this.beanInfo = {
        ...this.beanInfo,
        totalAmount: this.wrapperValue(beanNum),
        almostExpired: this.wrapperValue(willExpireNum),
      }
    } else {
      console.error('我的京豆信息获取失败！');
    }
    console.log(`京豆总数&快过期京豆数：`);
    delete RES.list;
    console.log(
      JSON.stringify({ beanNum, willExpireNum }, null, 2)
    );
    this.logDivider();
    this.useFileManager().writeStringCache('jdBean', `${beanNum}`);
  }

  /**
   * 获取昨天跟今天的京豆明细
   * @param {Number} page 
   */
  loadNearbyBeanDetailsFun = async () => {
    if (this.jdNumChange) {
      const currDate = new Date();
      const todayDateStr = this.getDateStr(currDate, 'yyyy-MM-dd');
      const yesterdayDateStr = this.getDateStr(new Date((+new Date()) - 86400000), 'yyyy-MM-dd');
      let page = 1;
      let todayDetails = [];
      let yesterdayDetails = [];

      const { details, willExpireNum } = await this.beanDetailsFun(page);
      todayDetails = todayDetails.concat(details.filter(detail => detail.date.indexOf(todayDateStr) !== -1));
      yesterdayDetails = yesterdayDetails.concat(details.filter(detail => detail.date.indexOf(yesterdayDateStr) !== -1));

      let yesterdayGain = 0;
      yesterdayDetails.map(detail => yesterdayGain = parseInt(detail.amount) + yesterdayGain);
      console.log(`昨日京豆总收获：${yesterdayGain}`);
      this.logDivider();
      let todayGain = 0;
      todayDetails.map(detail => todayGain = parseInt(detail.amount) + todayGain);
      console.log(`今日京豆总收获：${todayGain}`);
      this.logDivider();
      this.beanInfo = {
        ...this.beanInfo,
        willExpireNum,
        yesterdayGain: this.wrapperValue(yesterdayGain),
        todayGain: this.wrapperValue(todayGain),
      }
      //
      this.useFileManager().writeJSONCache('bean', this.beanInfo);
    } else {
      console.log(`获取缓存京豆明细->`);
      this.beanInfo = this.useFileManager().readJSONCache('bean');
    }
    console.log(`我的京豆明细：`);
    console.log(
      JSON.stringify(this.beanInfo, null, 2)
    );
    this.logDivider();
  }

  /**
   * 获取京豆明细列表
   */
  beanDetailsFun = async (page = 1) => {
    const url = `https://api.m.jd.com/?appid=jd-cphdeveloper-m&functionId=myBean&appCode=ms0ca95114&g_ty=ajax&g_login_type=1&sceneval=2&loginType=2&body=${this.joinQueryParams({ "tenantCode": "jgm", "bizModelCode": 6, "bizModeClientType": "M", "externalLoginType": 1 })}`;
    const options = {
      useCache: false,
      headers: {
        ...this.defaultHeaders,
        'origin': `https://wqs.jd.com`,
        'referer': `https://wqs.jd.com`,
      },
    };
    const RES = await this.httpGet(url, { ...options, dataSuccess: (res) => res?.list });
    let details = [];
    let willExpireNum = 0;
    if (RES.list) {
      const { list = [] } = RES;
      willExpireNum = RES.willExpireNum;
      details = list.map(detail => ({ amount: detail.amount, date: detail.createDate }))
    } else {
      console.error(`京豆明细列表获取失败！`);
    }
    return { details, willExpireNum };
  }

  /**
   * 物流
   */
  packageFlowFun = async () => {
    const url = `https://api.m.jd.com/client.action?t=${+new Date()}&loginType=2&loginWQBiz=golden-trade&appid=m_core&client=MacIntel&clientVersion=&build=&osVersion=iOS&screen=390*844&networkType=4g&partner=&forcebot=&d_brand=iPhone&d_model=iPhone&lang=zh-CN&scope=&sdkVersion=&openudid=&uuid=1623999132064880641936&x-api-eid-token=jdd03GJCIKBSNYKA7Z4BCQJDAQY6LWVGIOOL5AN4LK4A5PJ6FTXDW6UOELGTW4NFDWTMBJVAYDGWIWIVSMA6GAIAQKYKK3YAAAAMJFYNLBUQAAAAAC43VSGNQ7GABGMX&functionId=order_list_m&body=%7B%22appType%22%3A3%2C%22bizType%22%3A%222%22%2C%22source%22%3A%22-1%22%2C%22deviceUUId%22%3A%22%22%2C%22platform%22%3A3%2C%22sceneval%22%3A%222%22%2C%22systemBaseInfo%22%3A%22%7B%5C%22pixelRatio%5C%22%3A3%2C%5C%22screenWidth%5C%22%3A390%2C%5C%22screenHeight%5C%22%3A844%2C%5C%22windowWidth%5C%22%3A390%2C%5C%22windowHeight%5C%22%3A844%2C%5C%22statusBarHeight%5C%22%3Anull%2C%5C%22safeArea%5C%22%3A%7B%5C%22bottom%5C%22%3A0%2C%5C%22height%5C%22%3A0%2C%5C%22left%5C%22%3A0%2C%5C%22right%5C%22%3A0%2C%5C%22top%5C%22%3A0%2C%5C%22width%5C%22%3A0%7D%2C%5C%22bluetoothEnabled%5C%22%3Afalse%2C%5C%22locationEnabled%5C%22%3Afalse%2C%5C%22wifiEnabled%5C%22%3Afalse%2C%5C%22deviceOrientation%5C%22%3A%5C%22portrait%5C%22%2C%5C%22benchmarkLevel%5C%22%3A-1%2C%5C%22brand%5C%22%3A%5C%22iPhone%5C%22%2C%5C%22model%5C%22%3A%5C%22iPhone%5C%22%2C%5C%22system%5C%22%3A%5C%22iOS%5C%22%2C%5C%22platform%5C%22%3A%5C%22MacIntel%5C%22%2C%5C%22SDKVersion%5C%22%3A%5C%22%5C%22%2C%5C%22enableDebug%5C%22%3Afalse%2C%5C%22language%5C%22%3A%5C%22zh-CN%5C%22%2C%5C%22version%5C%22%3A%5C%22%5C%22%2C%5C%22theme%5C%22%3A%5C%22light%5C%22%2C%5C%22fontSizeSetting%5C%22%3Anull%2C%5C%22albumAuthorized%5C%22%3Afalse%2C%5C%22cameraAuthorized%5C%22%3Afalse%2C%5C%22locationAuthorized%5C%22%3Afalse%2C%5C%22microphoneAuthorized%5C%22%3Afalse%2C%5C%22notificationAuthorized%5C%22%3Afalse%2C%5C%22notificationAlertAuthorized%5C%22%3Afalse%2C%5C%22notificationBadgeAuthorized%5C%22%3Afalse%2C%5C%22notificationSoundAuthorized%5C%22%3Afalse%2C%5C%22phoneCalendarAuthorized%5C%22%3Afalse%2C%5C%22locationReducedAccuracy%5C%22%3Afalse%2C%5C%22environment%5C%22%3A%5C%22%5C%22%7D%22%2C%22orderListTag%22%3A128%2C%22curTab%22%3A%22waitReceipt%22%2C%22page%22%3A1%2C%22pageSize%22%3A10%2C%22tenantCode%22%3A%22jgm%22%2C%22bizModelCode%22%3A%222%22%2C%22bizModeClientType%22%3A%22M%22%2C%22bizModeFramework%22%3A%22Taro%22%2C%22externalLoginType%22%3A1%2C%22token%22%3A%223852b12f8c4d869b7ed3e2b3c68c9436%22%2C%22appId%22%3A%22m91d27dbf599dff74%22%7D&h5st=20230707101110131%3B55i653mnt9zg6it3%3B44550%3Btk03wbe7f1cc218nzb3KRxPU2bI9P5wmvtQDLxHFdLm-rkwr24jjlhi9hLik3nWEVW2eWjMVKz0ygZneJe9X6YRHYqqE%3B23ff4d1fd278262b7f332b647ddbfe4d%3B4.1%3B1688695870131%3B5f7a486ba29fbc5d176654e46394ec5e0bd88693c61e67c8c7fe08d7d4a9d656c1e3ef12e12f644ae066ec4ea392564125e722195b5d50800bb957380a05952c7d2ffd1e5825ea5e52f63c89d97c65e80c75c93d497fe2d308a6e0e8cf8608fc7cf1e8c3a889f77bc47a60e6df58c66a10828446464bb6205cbeb99c6e107f1e5854ee6f4560872931ef2f39458e418ca6872476d2e7cb032c7b91ad4be9b349bdad1c6d62166c8b7289b414c463623656f7d6a48550c2bae4143c1e9308fc23fa3146b2eca29a4d534f91f9109b9db6`;
    const options = {
      headers: {
        ...this.defaultHeaders,
        'sec-fetch-mode': 'cors',
        'origin': 'https://trade.m.jd.com',
        'referer': 'https://trade.m.jd.com/',
      },
    };
    const RES = await this.httpGet(url, { ...options, dataSuccess: (res) => res?.body?.baseInfo != undefined });
    const { code, body = {} } = RES;
    console.log(RES);
    if (code == '0') {
      const orderList = body.orderList;
      const count = parseInt(orderList?.length ?? 0);
      this.packageFlow.count = count;
      if (count > 0) {
        this.packageFlow.details = orderList.map(order => ({
          cover: order.wareInfoList[0].imageUrl,
          title: this.wrapperValue(order.wareInfoList[0].wareName),
          desc: this.wrapperValue(order.progressInfo?.content || order.orderStatusInfo?.orderStatusName),
          time: this.wrapperValue(order.progressInfo?.tip || ''),
        }));
      }
      console.log(`物流信息：`);
      console.log(
        JSON.stringify(this.packageFlow, null, 2)
      );
      this.logDivider();
    } else {
      console.error('物流信息获取失败！');
    }
  }

  baiTiaoInfoFun = async () => {
    const url = 'https://ms.jr.jd.com/gw/generic/bt/h5/m/firstScreenNew';
    const options = {
      body: 'reqData={"clientType":"ios","clientVersion":"13.2.3","deviceId":"","environment":"3"}',
      headers: {
        ...this.defaultHeaders
      },
    };
    const RES = await this.httpPost(url, { ...options, dataSuccess: (res) => res?.resultCode == '0' });
    const { resultData } = RES;
    if (resultData) {
      const bill = resultData.data?.bill;
      if (bill) {
        this.baitiao.title = this.wrapperValue(bill.title);
        this.baitiao.amount = this.wrapperValue(bill.amount)?.replace(/,/g, '');
        this.baitiao.desc = this.wrapperValue(bill?.buttonName)?.replace(/最近还款日/, '');
      }
      console.log(`白条信息：`);
      console.log(
        JSON.stringify(this.baitiao, null, 2)
      );
      this.logDivider();
    } else {
      console.log('可能没开通白条！');
    }
  }

  /**
   * 东东农场
   */
  fruitInfoFun = async () => {
    const url = 'https://api.m.jd.com/client.action?functionId=initForFarm';
    const options = {
      useCache: this.useFruitInfoCache,
      body: 'body=version:4&appid=wh5&clientVersion=9.1.0',
      headers: {
        ...this.defaultHeaders
      },
    };
    const RES = await this.httpPost(url, { ...options, dataSuccess: (res) => res?.message == null });
    if (RES?.message == null) {
      const { farmUserPro } = RES;
      if (farmUserPro) {
        const { treeState, name, goodsImage, treeTotalEnergy, treeEnergy, simpleName } = farmUserPro;
        let percent = '--';
        if (treeState == 2 || treeState == 3) {
          this.useFruitInfoCache = true;
          percent = "100%";
          this.notify('东东农场', `⊱${simpleName}⊰可以兑换啦~`);
        } else {
          this.useFruitInfoCache = false;
          percent = Math.floor((treeEnergy / treeTotalEnergy) * 100) + "%";
        }
        this.fruit = {
          name: this.wrapperValue(name),
          simpleName: this.wrapperValue(simpleName),
          goodsImage,
          percent
        }
      }
    } else {
      console.error('东东农场信息获取失败！');
    }
    console.log(`东东农场信息：`);
    console.log(
      JSON.stringify(this.fruit, null, 2)
    );
    this.logDivider();
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
    Keychain.set(cacheKey, cache);
  }
}

function keyGet(cacheKey, defaultValue = '') {
  if (Keychain.contains(cacheKey)) {
    return Keychain.get(cacheKey);
  } else {
    return defaultValue;
  }
}
// =================================================================================
// =================================================================================