// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: frog;
/**
* Author:LSP
* Date:2023-05-10
*/
// -------------------------------------------------------
// 是否是开发环境，配合手机端调试使用，正式发布设置为false
const isDev = false;
const dependencyLSP = '20230510';
console.log(`当前环境 👉👉👉👉👉 ${isDev ? 'DEV' : 'RELEASE'}`);
console.log(`----------------------------------------`);
// 分支
const branch = 'v2';
// 仓库根目录
const remoteRoot = `https://raw.githubusercontent.com/Enjoyee/Scriptable/${branch}`;
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
    enFontUrl: `${remoteRoot}/font/Facon.ttf`,
    descMap: {
      'CLEAR_DAY': '𝑪𝒍𝒆𝒂𝒓',
      'CLEAR_NIGHT': '𝑪𝒍𝒆𝒂𝒓',
      'PARTLY_CLOUDY_DAY': '𝑷𝒂𝒓𝒕𝒍𝒚 𝑪𝒍𝒐𝒖𝒅𝒚',
      'PARTLY_CLOUDY_NIGHT': '𝑷𝒂𝒓𝒕𝒍𝒚 𝑪𝒍𝒐𝒖𝒅𝒚',
      'CLOUDY': '𝑪𝒍𝒐𝒖𝒅𝒚',
      'LIGHT_HAZE': '𝑯𝒂𝒛𝒆',
      'MODERATE_HAZE': '𝑯𝒂𝒛𝒆',
      'HEAVY_HAZE': '𝑯𝒂𝒛𝒆',
      'LIGHT_RAIN': '𝑹𝒂𝒊𝒏',
      'MODERATE_RAIN': '𝑹𝒂𝒊𝒏',
      'HEAVY_RAIN': '𝑹𝒂𝒊𝒏',
      'STORM_RAIN': '𝑹𝒂𝒊𝒏',
      'FOG': '𝑭𝒐𝒈',
      'LIGHT_SNOW': '𝑺𝒏𝒐𝒘',
      'MODERATE_SNOW': '𝑺𝒏𝒐𝒘',
      'HEAVY_SNOW': '𝑺𝒏𝒐𝒘',
      'STORM_SNOW': '𝑺𝒏𝒐𝒘',
      'DUST': '𝑫𝒖𝒔𝒕',
      'SAND': '𝑺𝒂𝒏𝒅',
      'WIND': '𝑾𝒊𝒏𝒅',
    },
  };

  getValueByKey = (key) => this.readWidgetSetting()[key] ?? this.defaultPreference[key];

  caiyun = () => this.getValueByKey('caiyun');

  constructor(scriptName) {
    super(scriptName);
  }

  async getAppViewOptions() {
    return {
      showWidgetBg: false,
      widgetProvider: {
        small: false, // 是否提供小号组件
        medium: true, // 是否提供中号组件
        large: false, // 是否提供大号组件
      },
      // 预览界面的组件设置item
      settingItems: [
        {
          name: 'caiyun',
          label: '彩云key',
          type: 'cell',
          icon: `${remoteRoot}/img/ic_weather_loop.gif`,
          alert: {
            title: '彩云key',
            message: "外部已使用默认key\\n如果不可用了需要自己去申请填入替换",
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
      ]
    };
  }

  async render({ widgetSetting, family }) {
    return await this.provideMediumWidget();
  }

  async provideMediumWidget() {
    // ----------------------------------------
    // 请求彩云
    const weatherInfo = await this.getWeather();
    // ========================================
    // 天气对应的背景
    let weatherBgUrl = this.weatherBgUrl(weatherInfo.weatherIco);
    let image = await this.getImageByUrl(weatherBgUrl);
    const widgetSize = this.getWidgetSize('中号');
    //=================================
    const widget = new ListWidget();
    widget.setPadding(0, 0, 0, 0);
    //=================================
    let stack = widget.addStack();
    stack.setPadding(10, 10, 0, 0);
    stack.size = new Size(widgetSize.width, widgetSize.height);
    stack.backgroundImage = image;
    stack.layoutVertically();
    //
    let tipStack = stack.addStack();
    tipStack.layoutHorizontally();
    tipStack.setPadding(0, 0, 10, 10);
    let temperatureImg = await this.drawTextWithCustomFont(this.defaultPreference.enFontUrl, `${weatherInfo.temperature}°c`, 25, "fff", "left");
    let imgSpan = tipStack.addImage(temperatureImg);
    imgSpan.imageSize = new Size(temperatureImg.size.width / 2, temperatureImg.size.height / 2);
    imgSpan.leftAlignImage();
    //
    tipStack.addSpacer();
    let textSpan = tipStack.addText(this.weatherPhenomenonCN(weatherInfo.weatherIco));
    textSpan.font = Font.mediumSystemFont(13);
    textSpan.textColor = new Color('#fff');
    textSpan.shadowRadius = 0.4;
    textSpan.shadowColor = new Color('#444');
    stack.addSpacer();
    //=================================
    return widget;
  }

  /**
    * 获取天气背景
    */
  weatherBgUrl(weatherDesc) {
    return `https://gitee.com/enjoyee/img/raw/master/bg/frog/${weatherDesc}.png`
  }

  weatherPhenomenonCN = (phenomenonEN) => {
    return this.defaultPreference.descMap[phenomenonEN];
  }

  // --------------------------NET START--------------------------

  /**
   * 获取彩云天气信息
   * @param {*} dailysteps 
   * @returns 
   */
  getWeather = async (dailysteps = 6) => {
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
      if (keyIndex < 1 || keyIndex > 10) {
        keyIndex = parseInt(Math.random() * 10) + 1;
      }
      return `https://gitee.com/enjoyee/img/raw/master/icon/weather${keyIndex}/${weatherDesc}.png`;
    }

    // 获取位置
    let location = await this.getLocation();
    // 彩云api key
    const caiyunKey = this.caiyun();
    // 彩云天气api
    const url = `https://api.caiyunapp.com/v2.5/${caiyunKey}/${location.longitude},${location.latitude}/weather.json?alert=true&dailysteps=${dailysteps}`;
    const weatherJsonData = await this.httpGet(url);
    // 天气数据
    let weatherInfo = {};
    if (weatherJsonData && weatherJsonData.status == "ok") {
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
      // 天气状况 weatherIcos[weatherIco]
      let weather = weatherJsonData.result.realtime.skycon;
      weatherInfo.weatherIco = weather;
      weatherInfo.weatherIcoUrl = getWeatherIco(weather, Number(this.readWidgetSetting()?.weatherIco ?? 0));
      // 天气描述
      const weatherDesc = weatherJsonData.result.forecast_keypoint;
      weatherInfo.weatherDesc = weatherDesc.replace("最近的", "")
        .replace("。还在加班么？", "，")
        .replace("您", "")
        .replace("，放心出门吧", "")
        .replace("呢", "");
      console.log("👉天气预告：" + weatherDesc);
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
      console.error(`🚫 请求彩云天气出错：${weatherJsonData.status}，可能是key有问题`);
      this.notify('彩云', '彩云天气请求出错，可能key有问题');
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
  const dependencyURL = `${remoteRoot}/_LSP.js`;
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
    return
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