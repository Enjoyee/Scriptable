// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: user-astronaut;
/**
 * Author:LSP
 * Date:2024-02-05
 */
// -------------------------------------------------------
// 是否是开发环境，配合手机端调试使用，正式发布设置为false
const isDev = false;
const dependencyLSP = '20230512';
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
    caiyun: 'UR8ASaplvIwavDfR',
    weatherIcoSize: 30,
    //
    quickFontSize: '11',
    quickFontDayColor: '#FFFFFF',
    quickFontNightColor: '#FFFFFF',
    //
    temperatureFontSize: '34',
    temperatureFontDayColor: '#FFFFFF',
    temperatureFontNightColor: '#FFFFFF',
    //
    dateFontSize: '13',
    dateFontColor: '#FFFEF9',
    dateFontDayColor: '#FFFEF9',
    dateFontNightColor: '#FFFEF9',
    //
    weatherFontSize: '12',
    weatherFontDayColor: '#F9F4DC',
    weatherFontNightColor: '#F9F4DC',
    //
    holidayFontSize: '13',
    holidayFontDayColor: '#F18F47',
    holidayFontNightColor: '#F18F47',
    //
    quickConfigs: [
      {
        icon: `${this.getRemoteRootPath()}/img/other/wechat.png`,
        name: '扫一扫',
        scheme: 'weixin://scanqrcode'
      },
      {
        icon: `${this.getRemoteRootPath()}/img/other/payment.png`,
        name: '付款码',
        scheme: 'alipay://platformapi/startapp?appId=20000056'
      },
      {
        icon: 'location.fill.viewfinder',
        name: '乘车码',
        scheme: 'alipay://platformapi/startapp?appId=200011235'
      },
      {
        icon: `${this.getRemoteRootPath()}/img/other/delivery-man.png`,
        name: '菜鸟包裹',
        scheme: 'alipay://platformapi/startapp?appId=2021001141626787'
      },
    ],
    enFontUrl: `${this.getRemoteRootPath()}/font/Facon.ttf`,
    isShowNewYear: ['20240209', '20240210', '20240211', '20240212'],
    newYearTips: {},
  };

  getValueByKey = (key) => this.readWidgetSetting()[key] ?? this.defaultPreference[key];

  caiyun = () => this.getValueByKey('caiyun');

  quickFontSize = () => parseInt(this.getValueByKey('quickFontSize'));
  quickFontDayColor = () => this.getValueByKey('quickFontDayColor');
  quickFontNightColor = () => this.getValueByKey('quickFontNightColor');

  temperatureFontSize = () => parseInt(this.getValueByKey('temperatureFontSize'));
  temperatureFontDayColor = () => this.getValueByKey('temperatureFontDayColor');
  temperatureFontNightColor = () => this.getValueByKey('temperatureFontNightColor');

  dateFontSize = () => parseInt(this.getValueByKey('dateFontSize'));
  dateFontDayColor = () => this.getValueByKey('dateFontDayColor');
  dateFontNightColor = () => this.getValueByKey('dateFontNightColor');

  weatherFontSize = () => parseInt(this.getValueByKey('weatherFontSize'));
  weatherFontDayColor = () => this.getValueByKey('weatherFontDayColor');
  weatherFontNightColor = () => this.getValueByKey('weatherFontNightColor');

  holidayFontSize = () => parseInt(this.getValueByKey('holidayFontSize'));
  holidayFontDayColor = () => this.getValueByKey('holidayFontDayColor');
  holidayFontNightColor = () => this.getValueByKey('holidayFontNightColor');

  constructor(scriptName) {
    super(scriptName);
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
          name: 'weatherIco',
          label: '天气图标',
          type: 'select',
          icon: { name: 'cloud.moon', color: '#480ca8', },
          needLoading: false,
          options: [
            { label: '第1套图标', value: '1' },
            { label: '第2套图标', value: '2' },
            { label: '第3套图标', value: '3' },
            { label: '第4套图标', value: '4' },
            { label: '第5套图标', value: '5' },
            { label: '第6套图标', value: '6' },
            { label: '第7套图标', value: '7' },
            { label: '第8套图标', value: '8' },
            { label: '第9套图标', value: '9' },
            { label: '第10套图标', value: '10' },
            { label: '第11套图标', value: '11' },
            { label: '第12套图标', value: '12' },
            { label: '第13套图标', value: '13' },
          ],
          default: "1"
        },
        {
          name: 'quickStart',
          label: '快捷启动设置',
          type: 'cell',
          icon: { name: 'lasso.and.sparkles', color: '#ffc300', },
          needLoading: false,
          showDesc: false,
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
                  name: 'caiyun',
                  label: '彩云key',
                  type: 'cell',
                  icon: `${this.getRemoteRootPath()}/img/icon_caiyun.png`,
                  alert: {
                    title: '彩云key',
                    message: "已使用默认key，如果不可用了需要自己去申请填入替换",
                    options: [
                      {
                        key: 'caiyun',
                        hint: '请输入彩云key',
                      }
                    ]
                  },
                  needLoading: false,
                  default: this.caiyun(),
                },
              ],
            },
            {
              items: [
                {
                  name: 'quickFontSize',
                  label: '启动文字大小',
                  type: 'cell',
                  icon: { name: 'lasso.and.sparkles', color: '#7743DB', },
                  needLoading: false,
                  alert: {
                    title: '启动文字大小',
                    options: [
                      {
                        key: 'quickFontSize',
                        hint: '请输入字号',
                      }
                    ]
                  },
                  default: this.quickFontSize(),
                },
                {
                  name: 'quickFontDayColor',
                  label: '启动文字浅色颜色',
                  type: 'color',
                  icon: { name: 'sun.min.fill', color: '#3a86ff', },
                  needLoading: false,
                  default: this.quickFontDayColor(),
                },
                {
                  name: 'quickFontNightColor',
                  label: '启动文字深色颜色',
                  type: 'color',
                  icon: { name: 'moon.fill', color: '#3a0ca3', },
                  needLoading: false,
                  default: this.quickFontNightColor(),
                },
              ],
            },
            {
              items: [
                {
                  name: 'temperatureFontSize',
                  label: '温度文字大小',
                  type: 'cell',
                  icon: { name: 'thermometer.medium', color: '#E0144C', },
                  needLoading: false,
                  alert: {
                    title: '温度文字大小',
                    options: [
                      {
                        key: 'temperatureFontSize',
                        hint: '请输入字号',
                      }
                    ]
                  },
                  default: this.temperatureFontSize(),
                },
                {
                  name: 'temperatureFontDayColor',
                  label: '温度文字浅色颜色',
                  type: 'color',
                  icon: { name: 'sun.min.fill', color: '#3a86ff', },
                  needLoading: false,
                  default: this.temperatureFontDayColor(),
                },
                {
                  name: 'temperatureFontNightColor',
                  label: '温度文字深色颜色',
                  type: 'color',
                  icon: { name: 'moon.fill', color: '#3a0ca3', },
                  needLoading: false,
                  default: this.temperatureFontDayColor(),
                },
              ]
            },
            {
              items: [
                {
                  name: 'dateFontSize',
                  label: '日期文字大小',
                  type: 'cell',
                  icon: `${this.getRemoteRootPath()}/img/ic_calendar.png`,
                  needLoading: false,
                  alert: {
                    title: '日期文字大小',
                    options: [
                      {
                        key: 'dateFontSize',
                        hint: '请输入字号',
                      }
                    ]
                  },
                  default: this.dateFontSize(),
                },
                {
                  name: 'dateFontDayColor',
                  label: '日期文字浅色颜色',
                  type: 'color',
                  icon: { name: 'sun.min.fill', color: '#3a86ff', },
                  needLoading: false,
                  default: this.dateFontDayColor(),
                },
                {
                  name: 'dateFontNightColor',
                  label: '日期文字深色颜色',
                  type: 'color',
                  icon: { name: 'moon.fill', color: '#3a0ca3', },
                  needLoading: false,
                  default: this.dateFontNightColor(),
                },
              ]
            },
            {
              items: [
                {
                  name: 'weatherFontSize',
                  label: '天气文字大小',
                  type: 'cell',
                  icon: `${this.getRemoteRootPath()}/img/ic_weather.png`,
                  needLoading: false,
                  alert: {
                    title: '天气文字大小',
                    options: [
                      {
                        key: 'weatherFontSize',
                        hint: '请输入字号',
                      }
                    ]
                  },
                  default: this.weatherFontSize(),
                },
                {
                  name: 'weatherFontDayColor',
                  label: '天气文字浅色颜色',
                  type: 'color',
                  icon: { name: 'sun.min.fill', color: '#3a86ff', },
                  needLoading: false,
                  default: this.weatherFontDayColor(),
                },
                {
                  name: 'weatherFontNightColor',
                  label: '天气文字深色颜色',
                  type: 'color',
                  icon: { name: 'moon.fill', color: '#3a0ca3', },
                  needLoading: false,
                  default: this.weatherFontNightColor(),
                },
              ]
            },
            {
              items: [
                {
                  name: 'holidayFontSize',
                  label: '节假日文字大小',
                  type: 'cell',
                  icon: `${this.getRemoteRootPath()}/img/ic_calendar.png`,
                  needLoading: false,
                  alert: {
                    title: '节假日文字大小',
                    options: [
                      {
                        key: 'holidayFontSize',
                        hint: '请输入字号',
                      }
                    ]
                  },
                  default: this.holidayFontSize(),
                },
                {
                  name: 'holidayFontDayColor',
                  label: '节假日文字浅色颜色',
                  type: 'color',
                  icon: { name: 'sun.min.fill', color: '#3a86ff', },
                  needLoading: false,
                  default: this.holidayFontDayColor(),
                },
                {
                  name: 'holidayFontNightColor',
                  label: '节假日文字深色颜色',
                  type: 'color',
                  icon: { name: 'moon.fill', color: '#3a0ca3', },
                  needLoading: false,
                  default: this.holidayFontNightColor(),
                },
              ]
            },
          ]
        },
      ],
      // cell类型的item点击回调
      onItemClick: async (item) => {
        let widgetSetting = this.readWidgetSetting();
        let insertDesc;
        switch (item.name) {
          case 'quickStart':
            const ufm = this.useFileManager();
            const index = await this.presentSheet({
              title: '快捷启动设置',
              message: '⊱配置各个快捷按钮的启动配置⊰',
              options: [
                { name: '启动按钮1' },
                { name: '启动按钮2' },
                { name: '启动按钮3' },
                { name: '启动按钮4' },
              ],
            });
            if (index >= 0 && index <= 3) {
              const localQuickConfigs = ufm.readStringCache('quickStart');
              const quickConfigJSON = localQuickConfigs ? localQuickConfigs : JSON.stringify(this.defaultPreference.quickConfigs);
              const quickConfigArr = JSON.parse(quickConfigJSON);
              const quickStack = quickConfigArr[index];
              await this.generateInputAlert({
                title: '快捷启动设置',
                message: '1.图标是SFSymbol或者图片链接\n2.名称最好输入2~3个字，多余会换行\n3.启动scheme链接可以自行上网搜索',
                options: [
                  { hint: '请输入快捷启动的图标', value: quickStack.icon },
                  { hint: '请输入快捷启动的名称', value: quickStack.name },
                  { hint: '快捷启动scheme', value: quickStack.scheme },
                ]
              }, async (inputArr) => {
                quickStack.icon = inputArr[0].value;
                quickStack.name = inputArr[1].value;
                quickStack.scheme = inputArr[2].value;
                ufm.writeStringCache('quickStart', JSON.stringify(quickConfigArr));
              });
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

  async render({ widgetSetting, family }) {
    //=================================
    const widget = new ListWidget();
    widget.setPadding(0, 0, 0, 0);
    //=================================
    let stack = widget.addStack();
    stack.layoutHorizontally();
    //---------------------------------
    const localQuickConfigs = this.useFileManager().readStringCache('quickStart');
    const quickConfigJSON = localQuickConfigs ? localQuickConfigs : JSON.stringify(this.defaultPreference.quickConfigs);
    const quickConfigArr = JSON.parse(quickConfigJSON);
    await this.quickStack(stack, quickConfigArr);
    //---------------------------------
    let rightStack = stack.addStack();
    rightStack.layoutVertically();
    rightStack.addSpacer();
    await this.loadWeatherStack(rightStack);
    rightStack.addSpacer();

    if (this.defaultPreference.isShowNewYear.indexOf(this.getDateStr(new Date(), 'yyyyMMdd')) != -1) {
      let image = await this.getImageByUrl(`${this.getRemoteRootPath()}/img/ic_fireworks_a20.png`);
      rightStack.backgroundImage = image;
    }

    //=================================
    stack.addSpacer();
    return widget;
  }


  /**
   * 快捷启动
   * @param {*} stack 
   * @param {*} quickConfigs 
   */
  quickStack = async (stack, quickConfigs) => {
    //---------------------------------
    const quickStackSize = new Size(58, 60);
    const quickImgSize = new Size(33, 30);
    const quickCornerRadius = 10;
    const quickStackBg = new Color('333', 0.2);
    const quickPadding = 10;
    const quickTextColor = this.dynamicColor(this.quickFontDayColor(), this.quickFontNightColor());
    const quickFont = (textLength = 3) => Font.semiboldSystemFont(textLength < 3 ? Number(this.quickFontSize()) : Number(this.quickFontSize()) - 1);
    const imageOpacity = 0.8;
    //---------------------------------
    let leftStack = stack.addStack();
    leftStack.size = new Size(148, 0);
    leftStack.layoutVertically();
    leftStack.addSpacer();
    //////////////////////////////////////////////////
    let qStack;
    for (let index = 0; index < quickConfigs.length; index++) {
      const item = quickConfigs[index];
      if (index % 2 === 0) {
        qStack = leftStack.addStack();
        if (index === 0) {
          leftStack.addSpacer(quickPadding);
        }
      }
      qStack.addSpacer(quickPadding);
      let oneStack = qStack.addStack();
      oneStack.url = item.scheme;
      oneStack.centerAlignContent();
      oneStack.size = quickStackSize;
      oneStack.cornerRadius = quickCornerRadius;
      oneStack.backgroundColor = quickStackBg;
      //
      let tipsStack = oneStack.addStack();
      tipsStack.layoutVertically();
      tipsStack.centerAlignContent();
      //
      let image;
      let imgUrl = item.icon;
      if (imgUrl.startsWith('http')) {
        image = await this.getImageByUrl(imgUrl);
      } else {
        image = this.getSFSymbol(imgUrl);
      }
      let hStack = tipsStack.addStack();
      hStack.layoutHorizontally();
      hStack.addSpacer();
      let imgSpan = hStack.addImage(image);
      hStack.addSpacer();
      imgSpan.tintColor = this.dynamicColor(this.quickFontDayColor(), this.quickFontNightColor());
      imgSpan.imageSize = quickImgSize;
      imgSpan.imageOpacity = imageOpacity;
      //
      tipsStack.addSpacer(2);
      hStack = tipsStack.addStack();
      hStack.layoutHorizontally();
      hStack.addSpacer();
      let textWidget = hStack.addText(item.name);
      hStack.addSpacer();
      textWidget.textColor = quickTextColor;
      textWidget.font = quickFont(item.name.length);
    }
    //////////////////////////////////////////////////
    leftStack.addSpacer();
  }

  /**
   * 天气UI
   * @param {*} stack 
   */
  loadWeatherStack = async (stack) => {
    // ========================================
    // 获取农历信息
    const lunarInfo = await this.getLunarInfo()
    // 请求彩云
    const weatherInfo = await this.getWeather();
    // 节假日
    const holidayInfo = await this.holidayInfo();
    // ========================================
    stack.addSpacer();
    let weatherStack = stack.addStack();
    weatherStack.layoutHorizontally();
    weatherStack.bottomAlignContent();
    //
    let image = await this.getImageByUrl(weatherInfo.weatherIcoUrl);
    let imgSpan = weatherStack.addImage(image);
    imgSpan.imageSize = new Size(this.defaultPreference.weatherIcoSize, this.defaultPreference.weatherIcoSize);
    imgSpan.leftAlignImage();
    //
    image = await this.drawTextWithCustomFont(
      this.defaultPreference.enFontUrl,
      `${weatherInfo.temperature}°c`,
      this.temperatureFontSize(),
      Device.isUsingDarkAppearance() ? this.temperatureFontNightColor() : this.temperatureFontDayColor(),
      "left"
    );
    weatherStack.addSpacer(10);
    imgSpan = weatherStack.addImage(image);
    imgSpan.imageSize = new Size(image.size.width / 2, image.size.height / 2);
    imgSpan.leftAlignImage();
    //
    weatherStack.addSpacer(16);
    // 刷新时间
    let textWidget;
    textWidget = weatherStack.addText(this.getDateStr(new Date(), 'HH:mm'))
    textWidget.textColor = this.dynamicColor(this.dateFontDayColor(), this.dateFontNightColor());
    textWidget.font = Font.systemFont(10);
    textWidget.textOpacity = 0.8;
    textWidget.lineLimit = 1;
    //
    // ------------------------------------------------
    const infoLunarText = `  ${lunarInfo.infoLunarText}`;
    let holidayText = lunarInfo.holidayText;
    holidayText = holidayText ? ` · ${holidayText}` : '';
    let text = `${this.getDateStr(new Date(), 'MM月d日  EEE')}${infoLunarText}${holidayText}`;

    stack.addSpacer(10);
    textWidget = stack.addText(text);
    textWidget.textColor = this.dynamicColor(this.dateFontDayColor(), this.dateFontNightColor());
    textWidget.font = Font.regularSystemFont(this.scaleFontSize(Number(this.dateFontSize()), text.length, 18));
    textWidget.lineLimit = 1;
    // ------------------------------------------------

    text = `${weatherInfo.weatherDesc}`;
    stack.addSpacer(6);
    textWidget = stack.addText(text);
    textWidget.textColor = this.dynamicColor(this.weatherFontDayColor(), this.weatherFontNightColor());
    textWidget.font = Font.regularSystemFont(this.scaleFontSize(Number(this.weatherFontSize()), text.length, 50));
    textWidget.lineLimit = 3;
    // ------------------------------------------------
    text = holidayInfo;
    stack.addSpacer(6);
    textWidget = stack.addText(text);
    textWidget.url = 'calshow://';
    textWidget.textColor = this.dynamicColor(this.holidayFontDayColor(), this.holidayFontNightColor());
    textWidget.font = Font.regularSystemFont(Number(this.holidayFontSize()));
    textWidget.lineLimit = 1;
    // ------------------------------------------------
    stack.addSpacer();
  }

  // --------------------------NET START--------------------------

  /**
   * 节假日信息
   * @returns 节假日信息
   */
  holidayInfo = async () => {
    let infoTips = '';
    const datePre = 'date_';
    const currDate = new Date();
    let dateStr = this.getDateStr(currDate, 'yyyyMM');
    let holidayJsonData = this.useFileManager().readJSONCache(datePre + dateStr);
    const url = `https://opendata.baidu.com/api.php?tn=wisetpl&format=json&resource_id=39043&query=${currDate.getFullYear()}%E5%B9%B4${currDate.getMonth() + 1}%E6%9C%88&t=${currDate.getTime()}`
    if (JSON.stringify(holidayJsonData) == '{}' || holidayJsonData?.length == 0 || holidayJsonData.status != 0) {
      holidayJsonData = await this.httpGet(url, { useCache: false, jsonFormat: false });
      holidayJsonData = JSON.parse(holidayJsonData);
      //
      const listFiles = this.useFileManager().fm.listContents(this.useFileManager().cacheDir);
      for (let index = listFiles.length - 1; index >= 0; index--) {
        const file = listFiles[index];
        if (file.startsWith(datePre)) {
          console.log(`删除节假日缓存文件：${file}`);
          this.useFileManager().fm.remove(this.useFileManager().cacheDir + '/' + file);
        }
      }
      //
      this.useFileManager().writeJSONCache(datePre + dateStr, holidayJsonData);
    }
    let list = holidayJsonData.data[0].almanac;
    let currItem = list.find(item => item.year == currDate.getFullYear() && item.month == currDate.getMonth() + 1 && item.day == currDate.getDate());
    if ((currItem.status == 1) || (currItem.status == undefined && (currItem.cnDay == '六' || currItem.cnDay == '日'))) {
      infoTips = 'Η𝒶𝓋е 𝐚 𝓷𝖎𝖈𝖾 ⅆ𝙖𝛄~ ᕕ(ȍᴥȍ)ᕗ';
    } else {
      let currIndex = list.indexOf(currItem);
      let remainArr = list.slice(currIndex + 1, list.size);
      let notWorkday = remainArr.find(item => item.status == 1 || (item.status == undefined && (item.cnDay == '六' || item.cnDay == '日')));
      let remainDay = (+new Date(parseInt(notWorkday.timestamp) * 1000) - (+new Date(parseInt(currItem.timestamp) * 1000))) / 86400 / 1000;
      let holidayTips = '周末';
      const { term } = notWorkday;
      if (term?.length > 0) {
        holidayTips = term;
      }
      if (remainDay == 1) {
        infoTips = '明天就『' + holidayTips + '』啦 (ง⚆‿⚆)ง';
      } else {
        infoTips = `离${holidayTips}还有：${remainDay}天！(งȌ_Ȍ)ง`;
      }
    }
    return this.defaultPreference.newYearTips[dateStr] || infoTips;
  }

  /**
   * 获取彩云天气信息
   * @param {*} dailysteps 
   * @returns 
   */
  getWeather = async (dailysteps = 6) => {
    const remoteRootPath = this.getRemoteRootPath();

    // 开启质量
    function airQuality(levelNum) {
      // 0-50 优，51-100 良，101-150 轻度污染，151-200 中度污染
      // 201-300 重度污染，>300 严重污染
      if (levelNum >= 0 && levelNum <= 50) {
        return "优秀";
      } else if (levelNum >= 51 && levelNum <= 100) {
        return "良好";
      } else if (levelNum >= 101 && levelNum <= 150) {
        return "轻度";
      } else if (levelNum >= 151 && levelNum <= 200) {
        return "中度";
      } else if (levelNum >= 201 && levelNum <= 300) {
        return "重度";
      } else {
        return "严重";
      }
    }

    // 获取天气icon
    function getWeatherIco(weatherDesc, keyIndex) {
      return { keyIndex, url: `${remoteRootPath}/img/icon/weather${keyIndex}/${weatherDesc}.png` };
    }

    // 获取位置
    let location = await this.getLocation();
    // 彩云api key
    const caiyunKey = this.caiyun();
    // 彩云天气api
    const url = `https://api.caiyunapp.com/v2.5/${caiyunKey}/${location.longitude},${location.latitude}/weather.json?alert=true&dailysteps=${dailysteps}`;
    const weatherJsonData = await this.httpGet(url, { dataSuccess: (res) => res?.status == "ok" });
    // 天气数据
    let weatherInfo = {};
    if (weatherJsonData) {
      // 天气突发预警
      let alertWeather = weatherJsonData.result?.alert?.content;
      if (alertWeather?.length > 0) {
        const alertWeatherTitle = alertWeather[0].title;
        console.log(`👉突发的天气预警：${alertWeatherTitle}`);
        weatherInfo.alertWeatherTitle = alertWeatherTitle;
      }
      // 全部温度
      weatherInfo.daily = weatherJsonData.result.daily;
      // 温度范围
      const temperatureData = weatherInfo.daily.temperature[0];
      // 最低温度
      const minTemperature = temperatureData.min;
      // 最高温度
      const maxTemperature = temperatureData.max;
      weatherInfo.minTemperature = Math.round(minTemperature);
      weatherInfo.maxTemperature = Math.round(maxTemperature);
      // 体感温度
      const bodyFeelingTemperature = weatherJsonData.result.realtime.apparent_temperature;
      weatherInfo.bodyFeelingTemperature = Math.floor(bodyFeelingTemperature);
      // 显示温度
      const temperature = weatherJsonData.result.realtime.temperature;
      weatherInfo.temperature = Math.floor(temperature);
      // 天气状况 
      let weather = weatherJsonData.result.realtime.skycon;
      weatherInfo.weatherIco = weather;
      const weatherIcoObj = getWeatherIco(weather, Number(this.readWidgetSetting()?.weatherIco ?? 0));
      this.defaultPreference.weatherIcoSize = (weatherIcoObj.keyIndex == 11 || weatherIcoObj.keyIndex == 12) ? 38 : 30;
      weatherInfo.weatherIcoUrl = weatherIcoObj.url;
      // 天气描述
      const weatherDesc = weatherJsonData.result.forecast_keypoint;
      weatherInfo.weatherDesc = weatherDesc;
      console.log("👉 天气预告：" + weatherDesc);
      // 降水率
      weatherInfo.probability = weatherJsonData.result.minutely.probability;
      // 相对湿度
      const humidity = (Math.floor(weatherJsonData.result.realtime.humidity * 100)) + "%";
      weatherInfo.humidity = humidity;
      // 舒适指数
      const comfort = weatherJsonData.result.realtime.life_index.comfort.desc;
      weatherInfo.comfort = comfort;
      // 紫外线指数
      const ultraviolet = weatherJsonData.result.realtime.life_index.ultraviolet.desc;
      weatherInfo.ultraviolet = ultraviolet;
      // 空气质量
      const aqi = weatherJsonData.result.realtime.air_quality.aqi.chn;
      const aqiInfo = airQuality(aqi);
      weatherInfo.aqiInfo = aqiInfo;
      // 日出日落
      const astro = weatherJsonData.result.daily.astro[0];
      // 日出
      const sunrise = astro.sunrise.time;
      // 日落
      const sunset = astro.sunset.time;
      weatherInfo.sunrise = sunrise.toString();
      weatherInfo.sunset = sunset.toString();
      // 小时预告
      let hourlyArr = [];
      const hourlyData = weatherJsonData.result.hourly;
      const temperatureArr = hourlyData.temperature;
      const temperatureSkyconArr = hourlyData.skycon;
      for (var i = 0; i < temperatureArr.length; i++) {
        let hourlyObj = {};
        hourlyObj.datetime = temperatureArr[i].datetime;
        hourlyObj.temperature = Math.round(temperatureArr[i].value);
        let weather = temperatureSkyconArr[i].value;
        hourlyObj.skycon = `${weather}`;
        hourlyArr.push(hourlyObj);
      }
      weatherInfo.hourly = hourlyArr;
    } else {
      console.error(`🚫 请求彩云天气出错`);
    }
    this.logDivider();
    return weatherInfo;
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