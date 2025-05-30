// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: bolt;
/**
 * Author:LSP
 * Date:2023-05-24
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
    weatherIco: '1',
    lineMode: '1',
    lineHeight: 76,
    dateFontDayColor: '#FFFFFF',
    dateFontNightColor: '#FFFFFF',
    currentTemperatureDayColor: '#FFFFFF',
    currentTemperatureNightColor: '#FFFFFF',
  };

  getValueByKey = (key) => this.readWidgetSetting()[key] ?? this.defaultPreference[key];

  caiyun = () => this.getValueByKey('caiyun');

  dateFontDayColor = () => this.getValueByKey('dateFontDayColor');
  dateFontNightColor = () => this.getValueByKey('dateFontNightColor');

  currentTemperatureDayColor = () => this.getValueByKey('currentTemperatureDayColor');
  currentTemperatureNightColor = () => this.getValueByKey('currentTemperatureNightColor');

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
          icon: `${this.getRemoteRootPath()}/img/ic_weather.gif`,
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
          name: 'lineMode',
          label: '折线数据',
          type: 'select',
          icon: { name: 'chart.xyaxis.line', color: '#11c4d4', },
          needLoading: false,
          options: [
            { label: '小时', value: '1' },
            { label: '每日', value: '2' },
          ],
          default: "1"
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
                {
                  name: 'currentTemperatureDayColor',
                  label: '温度文字浅色颜色',
                  type: 'color',
                  icon: { name: 'sun.min.fill', color: '#3a86ff', },
                  needLoading: false,
                  default: this.currentTemperatureDayColor(),
                },
                {
                  name: 'currentTemperatureNightColor',
                  label: '温度文字深色颜色',
                  type: 'color',
                  icon: { name: 'moon.fill', color: '#3a0ca3', },
                  needLoading: false,
                  default: this.currentTemperatureNightColor(),
                },
              ],
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
    const { temperature, lineCharImg, weatherIcoList, labels } = await this.loadWeatherStack();
    //=================================
    const widget = new ListWidget();
    widget.setPadding(0, 0, 0, 0);
    let textWidget;
    //=================================
    const fullDateText = await this.loadDateStack();
    let topStack = widget.addStack();
    topStack.layoutHorizontally();
    topStack.centerAlignContent();
    topStack.addSpacer(20);
    textWidget = topStack.addText(fullDateText);
    textWidget.textColor = this.dynamicColor(this.dateFontDayColor(), this.dateFontNightColor());
    textWidget.font = Font.semiboldSystemFont(12);
    topStack.addSpacer();
    //
    textWidget = topStack.addText(`${temperature}°`);
    textWidget.textColor = this.dynamicColor(this.currentTemperatureDayColor(), this.currentTemperatureNightColor());
    textWidget.font = Font.semiboldSystemFont(18);
    topStack.addSpacer(20);

    //
    const lineCharStack = widget.addStack();
    lineCharStack.size = new Size(0, this.defaultPreference.lineHeight);
    lineCharStack.addImage(lineCharImg);

    //
    const weatherIconStack = widget.addStack();
    weatherIconStack.layoutHorizontally();
    weatherIconStack.addSpacer();
    const icoSize = new Size(18, 18);
    for (const icoImg of weatherIcoList) {
      let imgStack = weatherIconStack.addImage(icoImg);
      imgStack.imageSize = icoSize;
      weatherIconStack.addSpacer();
    }

    //
    widget.addSpacer(4)
    const weatherTimeStack = widget.addStack();
    weatherTimeStack.layoutHorizontally();
    weatherTimeStack.addSpacer();
    for (const label of labels) {
      textWidget = weatherTimeStack.addText(label);
      textWidget.textColor = this.dynamicColor(this.dateFontDayColor(), this.dateFontNightColor());
      textWidget.font = Font.semiboldSystemFont(11);
      weatherTimeStack.addSpacer();
    }

    //---------------------------------
    //=================================
    return widget;
  }

  /**
  * 
  * @param {Array} labels X轴标签数组
  * @param {Array} datas 温度数组
  * @param {Number} lineHeight 图高
  * @param {Array} gradientColorArr 渐变色数组
  */
  async renderLineChar(labels, datas, lineHeight = this.defaultPreference.lineHeight, gradientColorArr = ['#FFFFFF', '#FEC163', '#DE4313']) {
    const temperatureColor = Device.isUsingDarkAppearance() ? this.currentTemperatureNightColor() : this.currentTemperatureDayColor();
    const chartStr = `
        {
        'type': 'bar',
            'data': {
            'labels': ${JSON.stringify(labels)}, // 数据替换
            'datasets': [
              {
                  type: 'line',
                  backgroundColor: getGradientFillHelper('horizontal', ${JSON.stringify(gradientColorArr)}),
                  borderColor: getGradientFillHelper('horizontal', ${JSON.stringify(gradientColorArr)}),
                  'borderWidth': 2,
                  pointRadius: 2,
                  'fill': false,
                  'data': ${JSON.stringify(datas)}, // 折线对应数据
              },
            ],
          },
          'options': {
            plugins: {
              datalabels: {
                display: true,
                align: 'top',
                color: '${temperatureColor}', // 折线上的数据点对应的文字颜色
                font: {
                  size: '12'
                }
              },
            },
            layout: {
              padding: {
                left: 0,
                right: 10,
                top: 30,
                bottom: 0
              }
             },
            'legend': {
              'display': false,
            },
            scales: {
              xAxes: [ // X 轴线
                {
                  gridLines: {
                    display: false,
                    color: '#000000',
                  },
                  ticks: {
                    display: false,
                    fontColor: '#b598a1', // x轴label文字颜色
                    fontSize: '14',
                  },
                },
              ],
              yAxes: [
                  {
                    ticks: {
                      display: false
                    },
                    gridLines: {
                      display: false
                    },
                  },
                ],
            },
           },
          }`
    const { width } = this.getWidgetSize('中号');
    const url = `https://quickchart.io/chart?w=${width}&h=${lineHeight}&f=png&c=${encodeURIComponent(chartStr)}`
    return await this.getImageByUrl(url)
  }

  loadDateStack = async () => {
    // ========================================
    // 获取农历信息
    const lunarInfo = await this.getLunarInfo();
    // ========================================
    const infoLunarText = `  ${lunarInfo.infoLunarText}`;
    let holidayText = lunarInfo.holidayText;
    holidayText = holidayText ? ` · ${holidayText}` : '';
    return `${this.getDateStr(new Date(), 'M月d日  EEE')}${infoLunarText}${holidayText}`;
  }

  loadWeatherStack = async () => {
    // ========================================
    // 请求彩云
    const weatherInfo = await this.getWeather();
    // ========================================
    const labels = [];
    const temperatureList = [];
    const weatherIcoList = [];
    const hourlyArr = weatherInfo.hourly;
    const daily = weatherInfo.daily;

    if (Number(this.getValueByKey('lineMode')) == 1) {
      for (let index = 0; index < hourlyArr.length; index++) {
        if (index >= 8) {
          break
        }
        const hourly = hourlyArr[index];
        const timeText = this.getDateStr(new Date(hourly.datetime), "HH");
        labels.push(`${timeText}时`);
        temperatureList.push(`${hourly.temperature}`);
        // 天气图标
        let icoImg = await this.getImageByUrl(weatherInfo.weatherIcoUrl);
        weatherIcoList.push(icoImg);
      }
    } else {
      const temperatureArr = daily.temperature;
      for (let index = 0; index < temperatureArr.length; index++) {
        const dailyTemperature = temperatureArr[index];
        const dateText = dailyTemperature.date.slice(8, 10);
        labels.push(`${dateText}日`);
        temperatureList.push(`${Math.round(dailyTemperature.avg)}`);
        // 天气图标
        let icoImg = await this.getImageByUrl(weatherInfo.weatherIcoUrl);
        weatherIcoList.push(icoImg);
      }
    }

    let lineCharImg = await this.renderLineChar(labels, temperatureList);
    // ========================================
    return { lineCharImg, weatherIcoList, labels, temperature: weatherInfo.temperature };
  }

  // --------------------------NET START--------------------------

  /**
   * 获取彩云天气信息
   * @param {*} dailysteps 
   * @returns 
   */
  getWeather = async (dailysteps = 7) => {
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
      let alertWeather = weatherJsonData.result.alert.content;
      if (alertWeather.length > 0) {
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
      const weatherIcoObj = getWeatherIco(weather, Number(this.getValueByKey('weatherIco', 1)));
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