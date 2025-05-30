// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: gray; icon-glyph: user-astronaut;
/**
 * 公众号：杂货万事屋
 * Desc：集合了一些网上各位大神的代码，修改自用，侵权请联系公众号删除
 * Author：LSP
*/

// 当前环境版本号
const VERSION = 20240419_1
// 组件配置文件名
const settingConfigName = 'settings.json';
// 分支
const branch = 'v2';
// 仓库根目录
const remoteGithubRoot = `https://raw.githubusercontent.com/Enjoyee/Scriptable/${branch}`;
const remoteHomeLandRoot = `https://glimmerk.coding.net/p/Scriptable/shared-depot/source/git/raw/${branch}`;

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
class BaseWidget {

  // 组件默认配置
  defaultConfig = {
    useGithub: true,
    notify: true,
    bgType: '3', // 0：透明，1：在线，2：纯色，3：渐变
    refreshInterval: '20',
  };

  constructor(scriptName) {
    //=====================
    this.scriptName = scriptName;
    this.backgroundColor = '#0c81e4,#161823';
    this.backgroundGradientColor = '#c93756,#243B55';
    this.backgroundGradientAngle = '0';
    this.VERSION = VERSION;
    let widgetSetting = this.readWidgetSetting();
    this.widgetSetting = widgetSetting;
    console.log(`远程是否使用GitHub：${this.keyGet(this.scriptName, `${this.defaultConfig.useGithub}`)}`);
    //=====================
  }

  getRemoteRootPath = () => {
    const { use_github = this.defaultConfig.useGithub } = this.readWidgetSetting();
    if (use_github) {
      return remoteGithubRoot;
    } else {
      return remoteHomeLandRoot;
    }
  }

  dayTransparentBgName = () => `${this.scriptName}_day_transparent`;

  dayOnlineBgName = () => `${this.scriptName}_day_online`;

  dayLocalBgName = () => `${this.scriptName}_day_local`;

  nightTransparentBgName = () => `${this.scriptName}_night_transparent`;

  nightOnlineBgName = () => `${this.scriptName}_night_online`;

  nightLocalBgName = () => `${this.scriptName}_night_local`;

  dynamicColor = (dayColorHex, nightColorHex) => Color.dynamic(new Color(dayColorHex), new Color(nightColorHex));

  changeBgMode2OnLineBg = (bgUrlArr = [], options = {}) => {
    this.defaultConfig.bgType = '1';
    let widgetSetting = this.readWidgetSetting();
    const { fm, fullFileName } = this.useFileManager();
    // const styles = ["", "light", "dark", "none"]
    const { shadow = false, shadowColor = '#000000', shadowColorAlpha = '0.5', blur = false, blurMode = 'none', blurRadius = 20 } = options;
    if (bgUrlArr.length > 0) {
      widgetSetting['shadow'] = `${shadow}`;
      widgetSetting['shadowColor'] = shadowColor;
      widgetSetting['shadowColorAlpha'] = shadowColorAlpha;
      widgetSetting['blurBg'] = blur;
      widgetSetting['blurMode'] = blurMode;
      widgetSetting['blurRadius'] = blurRadius;
      if (widgetSetting['dayBackgroundImageUrl']?.length == 0 || widgetSetting['dayBackgroundImageUrl'] != bgUrlArr[0]) {
        widgetSetting['dayBackgroundImageUrl'] = bgUrlArr[0];
        widgetSetting['dayBackgroundImagePath'] = this.dayOnlineBgName();
        //
        if (fm.fileExists(fullFileName(this.dayOnlineBgName()))) {
          fm.remove(fullFileName(this.dayOnlineBgName()));
        }
      }
      // ----------------------------------------------------------------
      if (bgUrlArr.length > 1) {
        if (widgetSetting['nightBackgroundImageUrl']?.length == 0 || widgetSetting['nightBackgroundImageUrl'] != bgUrlArr[1]) {
          widgetSetting['nightBackgroundImageUrl'] = bgUrlArr[1];
          widgetSetting['nightBackgroundImagePath'] = this.nightOnlineBgName();
          //
          if (fm.fileExists(fullFileName(this.nightOnlineBgName()))) {
            fm.remove(fullFileName(this.nightOnlineBgName()));
          }
        }
      }
      // ----------------------------------------------------------------
      const { bgType } = widgetSetting;
      if (bgType == undefined || bgType == '1') {
        this.writeWidgetSetting(
          {
            ...widgetSetting,
            picType: 1,
            bgType: '1',
          }
        );
      }
    }
  }

  readWidgetSetting = () => {
    try {
      const localFM = this.useFileManager({ useICloud: false });
      let settings = localFM.readJSONCache(settingConfigName);
      if (settings) {
        if (JSON.stringify(settings) == '{}') {
          settings = JSON.parse(JSON.stringify(this.defaultConfig));
          delete settings.bgType;
        }
        return settings
      }
      const iCloudFM = this.useFileManager({ useICloud: true });
      settings = iCloudFM.readJSONCache(settingConfigName);
      if (settings) {
        if (JSON.stringify(settings) == '{}') {
          settings = JSON.parse(JSON.stringify(this.defaultConfig));
          delete settings.bgType;
        }
      }
      return settings;
    } catch (error) {
      console.error(error);
      if (!config.runsInApp) {
        this.notify('配置读取失败', `${error}`);
      }
    }
  }

  writeWidgetSetting = (data) => {
    try {
      this.useFileManager().writeJSONCache(settingConfigName, data);
    } catch (error) {
      console.error(error);
      if (!config.runsInApp) {
        this.notify('配置写入失败', `${error}`);
      }
    }
  }

  removeWidgetSetting = (retainSetting = true) => {
    try {
      this.useFileManager().cleanWidgetCache(retainSetting);
      Keychain.set(this.scriptName + "VERSION", "");
    } catch (error) {
      console.error(error);
      if (!config.runsInApp) {
        this.notify('配置移除失败', `${error}`);
      }
    }
  }

  useFileManager = (options = {}) => {
    try {
      const { useICloud = false, scriptName = this.scriptName } = options;
      const fm = useICloud ? FileManager.iCloud() : FileManager.local();
      const rootDir = fm.joinPath(fm.documentsDirectory(), 'LSP/');

      // 创建根目录
      if (!fm.fileExists(rootDir)) {
        console.log(`✅ 创建LSP根目录`);
        fm.createDirectory(rootDir, true);
        this.logDivider();
      }

      // 创建对应脚本的缓存目录
      const cacheDir = fm.joinPath(rootDir, `${scriptName}/`)
      if (!fm.fileExists(cacheDir)) {
        console.log(`✅ 创建对应脚本缓存目录->${scriptName}`);
        fm.createDirectory(cacheDir, true);
        this.logDivider();
      }

      /**
       * 全路径名
       * @param {*} cacheFileName 
       * @returns 
       */
      const fullFileName = (cacheFileName, root = false) => {
        return `${root ? rootDir : cacheDir}/${cacheFileName}`
      }

      /**
       * 获取缓存文件的上次修改时间
       * @param {string} cacheKey 缓存key
       * @param {object} options 
       * @return 返回上次缓存文件修改的时间戳(单位：秒)
       */
      const getCacheModifyDate = (cacheKey, root = false) => {
        const cacheFileName = fullFileName(cacheKey, root);
        const fileExists = fm.fileExists(cacheFileName);
        if (fileExists) {
          return Math.floor(fm.modificationDate(cacheFileName).getTime() / 1000);
        } else {
          return 0;
        }
      }

      /**
       * 清空组件缓存
       * @param {bool} retainSetting 是否保留配置文件
       */
      const cleanWidgetCache = (retainSetting = true) => {
        if (retainSetting && fm.fileExists(cacheDir)) {
          fm.move(`${cacheDir}/${settingConfigName}`, `${rootDir}/${settingConfigName}`);
          //
          if (fm.fileExists(`${cacheDir}/${this.dayTransparentBgName()}`)) {
            fm.move(`${cacheDir}/${this.dayTransparentBgName()}`, `${rootDir}/${this.dayTransparentBgName()}`);
          }
          if (fm.fileExists(`${cacheDir}/${this.nightTransparentBgName()}`)) {
            fm.move(`${cacheDir}/${this.nightTransparentBgName()}`, `${rootDir}/${this.nightTransparentBgName()}`);
          }
          if (fm.fileExists(`${cacheDir}/${this.dayLocalBgName()}`)) {
            fm.move(`${cacheDir}/${this.dayLocalBgName()}`, `${rootDir}/${this.dayLocalBgName()}`);
          }
          if (fm.fileExists(`${cacheDir}/${this.nightLocalBgName()}`)) {
            fm.move(`${cacheDir}/${this.nightLocalBgName()}`, `${rootDir}/${this.nightLocalBgName()}`);
          }
        }
        console.log(`🚫 移除组件内所有缓存->${cacheDir}`);
        fm.remove(cacheDir);
        if (retainSetting && !fm.fileExists(cacheDir)) {
          fm.createDirectory(cacheDir);
          fm.move(`${rootDir}/${settingConfigName}`, `${cacheDir}/${settingConfigName}`);
          //
          if (fm.fileExists(`${rootDir}/${this.dayTransparentBgName()}`)) {
            fm.move(`${rootDir}/${this.dayTransparentBgName()}`, `${cacheDir}/${this.dayTransparentBgName()}`);
          }
          if (fm.fileExists(`${rootDir}/${this.nightTransparentBgName()}`)) {
            fm.move(`${rootDir}/${this.nightTransparentBgName()}`, `${cacheDir}/${this.nightTransparentBgName()}`);
          }
          if (fm.fileExists(`${rootDir}/${this.dayLocalBgName()}`)) {
            fm.move(`${rootDir}/${this.dayLocalBgName()}`, `${cacheDir}/${this.dayLocalBgName()}`);
          }
          if (fm.fileExists(`${rootDir}/${this.nightLocalBgName()}`)) {
            fm.move(`${rootDir}/${this.nightLocalBgName()}`, `${cacheDir}/${this.nightLocalBgName()}`);
          }
        }
        this.logDivider();
      }

      /**
      * 保存字符串到本地
      * @param {string} cacheFileName 缓存文件名
      * @param {string} content 缓存内容
      */
      const writeStringCache = (cacheFileName, content, root = false) => {
        fm.writeString(fullFileName(cacheFileName, root), content);
      }

      /**
      * 获取本地缓存字符串
      * @param {string} cacheFileName 缓存文件名
      * @return {string} 本地字符串缓存
      */
      const readStringCache = (cacheFileName, root = false) => {
        const fileName = fullFileName(cacheFileName, root);
        const fileExists = fm.fileExists(fileName);
        let cacheString;
        if (fileExists) {
          cacheString = fm.readString(fileName);
        }
        return cacheString;
      }

      /**
      * 获取本地缓存字符串
      * @param {string} cacheFileName 缓存文件名
      * @return {string} 本地字符串缓存
      */
      const readJSONCache = (cacheFileName, root = false) => {
        const fileName = fullFileName(cacheFileName, root);
        const fileExists = fm.fileExists(fileName);
        let cacheString = '{}';
        if (fileExists) {
          cacheString = fm.readString(fileName);
        }
        return JSON.parse(cacheString);
      }

      /**
      * 保存JSON字符串到本地
      * @param {string} cacheFileName 缓存文件名
      * @param {object} content 缓存对象
      */
      const writeJSONCache = (cacheFileName, content, root = false) => {
        fm.writeString(fullFileName(cacheFileName, root), JSON.stringify(content));
      }

      /**
      * 保存图片到本地
      * @param {string} cacheFileName 缓存文件名
      * @param {Image} img 缓存图片
      */
      const writeImgCache = (cacheFileName, img, root = false) => {
        fm.writeImage(fullFileName(cacheFileName, root), img);
      }

      /**
      * 获取本地缓存图片
      * @param {string} cacheFileName 缓存文件名
      * @return {Image} 本地图片缓存
      */
      const readImgCache = (cacheFileName, root = false) => {
        const fileName = fullFileName(cacheFileName, root);
        const fileExists = fm.fileExists(fileName);
        let img;
        if (fileExists) {
          img = fm.readImage(fileName);
        }
        return img
      }

      return {
        fm,
        rootDir,
        cacheDir,
        getCacheModifyDate,
        fullFileName,
        cleanWidgetCache,
        writeStringCache,
        readStringCache,
        readJSONCache,
        writeJSONCache,
        writeImgCache,
        readImgCache,
      }
    } catch (error) {
      console.error(error);
      if (!config.runsInApp) {
        this.notify('文件操作', `🚫 ${error}`);
      }
    }
  }

  saveFile2Scriptable = (fileName, content) => {
    try {
      const { fm } = this.useFileManager({ useICloud: true });
      const hasSuffix = fileName.lastIndexOf(".") + 1;
      const fullFileName = !hasSuffix ? `${fileName}.js` : fileName;
      const filePath = fm.joinPath(fm.documentsDirectory(), fullFileName);
      fm.writeString(filePath, content);
      return true;
    } catch (error) {
      console.error(error);
      if (!config.runsInApp) {
        this.notify('文件保存', `${error}`);
      }
    }
  };

  downloadFile2Scriptable = async ({ moduleName, url }) => {
    const req = new Request(url);
    const content = await req.loadString();
    return this.saveFile2Scriptable(`${moduleName}`, content);
  };

  bgType2Text = (bgType) => {
    let typeText = '';
    switch (bgType) {
      case '0':
        typeText = `透明背景`;
        break;

      case '1':
        typeText = `在线图片`;
        break;

      case '2':
        typeText = `相册图片`;
        break;

      case '3':
        typeText = `纯色背景`;
        break;

      case '4':
        typeText = `渐变背景`;
        break;
    }
    return typeText;
  }

  notify = async (title, body, url, opts = {}) => {
    const widgetSetting = this.readWidgetSetting();
    if (widgetSetting.notify) {
      return await this.realNotify(title, body, url, opts);
    } else {
      return null;
    }
  }

  realNotify = async (title, body, url, opts = {}) => {
    let n = new Notification();
    n = Object.assign(n, opts);
    n.title = title;
    n.body = body;
    if (url) n.openURL = url;
    return await n.schedule();
  }

  scaleFontSize = (defaultFontSize, textLength, startLength) => {
    let fontSize = defaultFontSize;
    if (textLength >= startLength) {
      let count = textLength - startLength;
      let loopSize = Math.round(count / 2.0);
      fontSize -= loopSize;
      fontSize = fontSize < 6 ? 6 : fontSize;
    }
    return fontSize;
  }

  logDivider = () => {
    console.log(`@--------------------------------------@`);
  }

  splitColors = (color = '') => {
    const colors = typeof color === 'string' ? color.split(',') : []
    return colors;
  }

  getLinearGradientColor = (colors, angle = 0) => {
    try {
      const locations = [];
      const linearColor = new LinearGradient();
      let x = 0, y = 0;
      if (angle < 45) {
        y = 0.5 - 0.5 / 45 * angle;
      } else if (angle < 135) {
        x = 1 / 90 * (angle - 45);
      } else if (angle <= 180) {
        x = 1;
        y = 0.5 / 45 * (angle - 135);
      }
      linearColor.startPoint = new Point(x, y);
      linearColor.endPoint = new Point(1 - x, 1 - y);
      let avg = 1 / (colors.length - 1);
      linearColor.colors = colors.map((item, index) => {
        locations.push(index * avg);
        return new Color(item);
      });
      linearColor.locations = locations;
      return linearColor;
    } catch (error) {
      console.error(error);
      if (!config.runsInApp) {
        this.notify('渐变色', `🚫 ${error}`);
      }
    }
  }

  loadSF2B64 = async (
    icon = 'square.grid.2x2',
    color = '#56A8D6',
    cornerWidth = 42
  ) => {
    const sfImg = await this.drawSFIcon(icon, color, cornerWidth);
    return `data:image/png;base64,${Data.fromPNG(sfImg).toBase64String()}`;
  }

  drawSFIcon = async (
    icon = 'square.grid.2x2',
    color = '#e8e8e8',
    cornerWidth = 42
  ) => {
    try {
      let sf = SFSymbol.named(icon);
      if (sf == null) {
        sf = SFSymbol.named('scribble');
      }
      sf.applyFont(Font.mediumSystemFont(30));
      const imgData = Data.fromPNG(sf.image).toBase64String();
      const html = `
    <img id="sourceImg" src="data:image/png;base64,${imgData}" />
    <img id="silhouetteImg" src="" />
    <canvas id="mainCanvas" />
    `
      const js = `
    var canvas = document.createElement("canvas");
    var sourceImg = document.getElementById("sourceImg");
    var silhouetteImg = document.getElementById("silhouetteImg");
    var ctx = canvas.getContext('2d');
    var size = sourceImg.width > sourceImg.height ? sourceImg.width : sourceImg.height;
    canvas.width = size;
    canvas.height = size;
    ctx.drawImage(sourceImg, (canvas.width - sourceImg.width) / 2, (canvas.height - sourceImg.height) / 2);
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var pix = imgData.data;
    //convert the image into a silhouette
    for (var i=0, n = pix.length; i < n; i+= 4){
      //set red to 0
      pix[i] = 255;
      //set green to 0
      pix[i+1] = 255;
      //set blue to 0
      pix[i+2] = 255;
      //retain the alpha value
      pix[i+3] = pix[i+3];
    }
    ctx.putImageData(imgData,0,0);
    silhouetteImg.src = canvas.toDataURL();
    output=canvas.toDataURL()
    `

      let wv = new WebView();
      await wv.loadHTML(html);
      const base64Image = await wv.evaluateJavaScript(js);
      const iconImage = await new Request(base64Image).loadImage();
      const size = new Size(160, 160);
      const ctx = new DrawContext();
      ctx.opaque = false;
      ctx.respectScreenScale = true;
      ctx.size = size;
      const path = new Path();
      const rect = new Rect(0, 0, size.width, size.width);

      path.addRoundedRect(rect, cornerWidth, cornerWidth);
      path.closeSubpath();
      ctx.setFillColor(new Color(color));
      ctx.addPath(path);
      ctx.fillPath();
      const rate = 36;
      const iw = size.width - rate;
      const x = (size.width - iw) / 2;
      ctx.drawImageInRect(iconImage, new Rect(x, x, iw, iw));
      return ctx.getImage();
    } catch (error) {
      console.error(error);
    }
  }

  drawTextWithCustomFont = async (fontUrl, text, fontSize, textColor, option = { lineLimit: 1, align: "center", rowSpacing: 8 }) => {
    try {
      const fontKey = fontUrl + text + fontSize + textColor;
      let cache = this.useFileManager().readImgCache(this.md5(fontKey));
      if (cache != undefined && cache != null) {
        return cache;
      }
      const font = new CustomFont(new WebView(), {
        fontFamily: 'customFont', // 字体名称
        fontUrl: fontUrl, // 字体地址
        timeout: 60000, // 加载字体的超时时间
      }) // 创建字体
      await font.load() // 加载字体
      const image = await font.drawText(text, {
        fontSize: fontSize, // 字体大小
        textWidth: 0, // 文本宽度
        textColor: textColor, // 文本颜色
        scale: 2, // 缩放因子
        ...option
      })
      this.useFileManager().writeImgCache(this.md5(text), image);
      return image;
    } catch (error) {
      console.error(error);
    }
  }

  base64Encode = (str) => {
    const data = Data.fromString(str);
    return data.toBase64String();
  }

  base64Decode = (b64) => {
    const data = Data.fromBase64String(b64);
    if (data) {
      return data.toRawString();
    } else {
      return b64;
    }
  }

  md5 = (str) => {
    function d(n, t) {
      var r = (65535 & n) + (65535 & t);
      return (((n >> 16) + (t >> 16) + (r >> 16)) << 16) | (65535 & r);
    }

    function f(n, t, r, e, o, u) {
      return d(((c = d(d(t, n), d(e, u))) << (f = o)) | (c >>> (32 - f)), r);
      var c, f;
    }

    function l(n, t, r, e, o, u, c) {
      return f((t & r) | (~t & e), n, t, o, u, c);
    }

    function v(n, t, r, e, o, u, c) {
      return f((t & e) | (r & ~e), n, t, o, u, c);
    }

    function g(n, t, r, e, o, u, c) {
      return f(t ^ r ^ e, n, t, o, u, c);
    }

    function m(n, t, r, e, o, u, c) {
      return f(r ^ (t | ~e), n, t, o, u, c);
    }

    function i(n, t) {
      var r, e, o, u;
      (n[t >> 5] |= 128 << t % 32), (n[14 + (((t + 64) >>> 9) << 4)] = t);
      for (
        var c = 1732584193,
        f = -271733879,
        i = -1732584194,
        a = 271733878,
        h = 0;
        h < n.length;
        h += 16
      )
        (c = l((r = c), (e = f), (o = i), (u = a), n[h], 7, -680876936)),
          (a = l(a, c, f, i, n[h + 1], 12, -389564586)),
          (i = l(i, a, c, f, n[h + 2], 17, 606105819)),
          (f = l(f, i, a, c, n[h + 3], 22, -1044525330)),
          (c = l(c, f, i, a, n[h + 4], 7, -176418897)),
          (a = l(a, c, f, i, n[h + 5], 12, 1200080426)),
          (i = l(i, a, c, f, n[h + 6], 17, -1473231341)),
          (f = l(f, i, a, c, n[h + 7], 22, -45705983)),
          (c = l(c, f, i, a, n[h + 8], 7, 1770035416)),
          (a = l(a, c, f, i, n[h + 9], 12, -1958414417)),
          (i = l(i, a, c, f, n[h + 10], 17, -42063)),
          (f = l(f, i, a, c, n[h + 11], 22, -1990404162)),
          (c = l(c, f, i, a, n[h + 12], 7, 1804603682)),
          (a = l(a, c, f, i, n[h + 13], 12, -40341101)),
          (i = l(i, a, c, f, n[h + 14], 17, -1502002290)),
          (c = v(
            c,
            (f = l(f, i, a, c, n[h + 15], 22, 1236535329)),
            i,
            a,
            n[h + 1],
            5,
            -165796510,
          )),
          (a = v(a, c, f, i, n[h + 6], 9, -1069501632)),
          (i = v(i, a, c, f, n[h + 11], 14, 643717713)),
          (f = v(f, i, a, c, n[h], 20, -373897302)),
          (c = v(c, f, i, a, n[h + 5], 5, -701558691)),
          (a = v(a, c, f, i, n[h + 10], 9, 38016083)),
          (i = v(i, a, c, f, n[h + 15], 14, -660478335)),
          (f = v(f, i, a, c, n[h + 4], 20, -405537848)),
          (c = v(c, f, i, a, n[h + 9], 5, 568446438)),
          (a = v(a, c, f, i, n[h + 14], 9, -1019803690)),
          (i = v(i, a, c, f, n[h + 3], 14, -187363961)),
          (f = v(f, i, a, c, n[h + 8], 20, 1163531501)),
          (c = v(c, f, i, a, n[h + 13], 5, -1444681467)),
          (a = v(a, c, f, i, n[h + 2], 9, -51403784)),
          (i = v(i, a, c, f, n[h + 7], 14, 1735328473)),
          (c = g(
            c,
            (f = v(f, i, a, c, n[h + 12], 20, -1926607734)),
            i,
            a,
            n[h + 5],
            4,
            -378558,
          )),
          (a = g(a, c, f, i, n[h + 8], 11, -2022574463)),
          (i = g(i, a, c, f, n[h + 11], 16, 1839030562)),
          (f = g(f, i, a, c, n[h + 14], 23, -35309556)),
          (c = g(c, f, i, a, n[h + 1], 4, -1530992060)),
          (a = g(a, c, f, i, n[h + 4], 11, 1272893353)),
          (i = g(i, a, c, f, n[h + 7], 16, -155497632)),
          (f = g(f, i, a, c, n[h + 10], 23, -1094730640)),
          (c = g(c, f, i, a, n[h + 13], 4, 681279174)),
          (a = g(a, c, f, i, n[h], 11, -358537222)),
          (i = g(i, a, c, f, n[h + 3], 16, -722521979)),
          (f = g(f, i, a, c, n[h + 6], 23, 76029189)),
          (c = g(c, f, i, a, n[h + 9], 4, -640364487)),
          (a = g(a, c, f, i, n[h + 12], 11, -421815835)),
          (i = g(i, a, c, f, n[h + 15], 16, 530742520)),
          (c = m(
            c,
            (f = g(f, i, a, c, n[h + 2], 23, -995338651)),
            i,
            a,
            n[h],
            6,
            -198630844,
          )),
          (a = m(a, c, f, i, n[h + 7], 10, 1126891415)),
          (i = m(i, a, c, f, n[h + 14], 15, -1416354905)),
          (f = m(f, i, a, c, n[h + 5], 21, -57434055)),
          (c = m(c, f, i, a, n[h + 12], 6, 1700485571)),
          (a = m(a, c, f, i, n[h + 3], 10, -1894986606)),
          (i = m(i, a, c, f, n[h + 10], 15, -1051523)),
          (f = m(f, i, a, c, n[h + 1], 21, -2054922799)),
          (c = m(c, f, i, a, n[h + 8], 6, 1873313359)),
          (a = m(a, c, f, i, n[h + 15], 10, -30611744)),
          (i = m(i, a, c, f, n[h + 6], 15, -1560198380)),
          (f = m(f, i, a, c, n[h + 13], 21, 1309151649)),
          (c = m(c, f, i, a, n[h + 4], 6, -145523070)),
          (a = m(a, c, f, i, n[h + 11], 10, -1120210379)),
          (i = m(i, a, c, f, n[h + 2], 15, 718787259)),
          (f = m(f, i, a, c, n[h + 9], 21, -343485551)),
          (c = d(c, r)),
          (f = d(f, e)),
          (i = d(i, o)),
          (a = d(a, u));
      return [c, f, i, a];
    }

    function a(n) {
      for (var t = '', r = 32 * n.length, e = 0; e < r; e += 8)
        t += String.fromCharCode((n[e >> 5] >>> e % 32) & 255);
      return t;
    }

    function h(n) {
      var t = [];
      for (t[(n.length >> 2) - 1] = void 0, e = 0; e < t.length; e += 1)
        t[e] = 0;
      for (var r = 8 * n.length, e = 0; e < r; e += 8)
        t[e >> 5] |= (255 & n.charCodeAt(e / 8)) << e % 32;
      return t;
    }

    function e(n) {
      for (var t, r = '0123456789abcdef', e = '', o = 0; o < n.length; o += 1)
        (t = n.charCodeAt(o)),
          (e += r.charAt((t >>> 4) & 15) + r.charAt(15 & t));
      return e;
    }

    function r(n) {
      return unescape(encodeURIComponent(n));
    }

    function o(n) {
      return a(i(h((t = r(n))), 8 * t.length));
      var t;
    }

    function u(n, t) {
      return (function (n, t) {
        var r,
          e,
          o = h(n),
          u = [],
          c = [];
        for (
          u[15] = c[15] = void 0,
          16 < o.length && (o = i(o, 8 * n.length)),
          r = 0;
          r < 16;
          r += 1
        )
          (u[r] = 909522486 ^ o[r]), (c[r] = 1549556828 ^ o[r]);
        return (
          (e = i(u.concat(h(t)), 512 + 8 * t.length)), a(i(c.concat(e), 640))
        );
      })(r(n), r(t));
    }

    function t(n, t, r) {
      return t ? (r ? u(t, n) : e(u(t, n))) : r ? o(n) : e(o(n));
    }

    return t(str);
  }

  rerunWidget = (scriptName = this.scriptName) => {
    Safari.open(`scriptable:///run/${encodeURIComponent(scriptName)}`);
  }

  getCurrentTimeStamp = () => {
    return Math.floor(new Date().getTime() / 1000);
  }

  getDateStr = (date, formatter = "yyyy年MM月d日 EEE", locale = "zh_cn") => {
    const df = new DateFormatter();
    df.locale = locale;
    df.dateFormat = formatter;
    return df.string(date);
  }

  /**
  * Http Get 请求接口
  * @param {string} url 请求的url
  * @param {bool} jsonFormat 返回数据是否为json，默认true
  * @param {object} headers 请求头
  * @param {boolean} logable 是否打印数据，默认true
  * @param {boolean} useICloud 是否使用iCloud
  * @param {string} scriptName 脚本名称
  * @return {string | json | null}
  */
  httpGet = async (url, options = {}) => {
    let data;
    try {
      const defaultOptions = {
        jsonFormat: true,
        headers: null,
        logable: false,
        useICloud: false,
        useCache: true,
        dataSuccess: (res) => true,
        scriptName: this.scriptName
      };
      options = {
        ...defaultOptions,
        ...options
      };
      const { jsonFormat, headers, logable, useICloud, useCache, scriptName } = options;

      // 根据URL进行md5生成cacheKey
      const cacheFileName = this.md5(url);
      const ufm = this.useFileManager({ useICloud, scriptName });
      // 读取本地缓存
      const localCache = ufm.readStringCache(cacheFileName);
      // 判断是否需要刷新
      const lastCacheTime = ufm.getCacheModifyDate(cacheFileName);
      const timeInterval = Math.floor((this.getCurrentTimeStamp() - lastCacheTime) / 60);
      const canUseCache = localCache != null && localCache.length > 0;
      if (useCache) {
        // 过时且有本地缓存则直接返回本地缓存数据 
        const { refreshInterval = '0' } = this.readWidgetSetting();
        const shouldLoadCache = timeInterval <= Number(refreshInterval) && canUseCache;
        console.log(`⏰ ${this.getDateStr(new Date(lastCacheTime * 1000), 'HH:mm')}加入缓存，已缓存 ${lastCacheTime > 0 ? timeInterval : 0}min，缓存${shouldLoadCache ? '未过期' : '已过期'}`);
        if (shouldLoadCache) {
          const RES = jsonFormat ? JSON.parse(localCache) : localCache;
          if (options.dataSuccess(RES)) {
            console.log(`🤖 Get读取缓存：${url}`);
            // 是否打印响应数据
            if (logable) {
              console.log(`🤖 Get请求响应：${localCache}`);
            }
            this.logDivider();
            return RES;
          }
        }
      }

      console.log(`🚀 Get在线请求：${url}`);
      let req = new Request(url);
      req.method = 'GET';
      if (headers != null && headers != undefined) {
        req.headers = headers;
      }
      data = await (jsonFormat ? req.loadJSON() : req.loadString());
      // 判断数据是否为空（加载失败）
      if (!data && canUseCache) {
        console.log(`🤖 Get读取缓存：${url}`);
        this.logDivider();
        return jsonFormat ? JSON.parse(localCache) : localCache;
      }
      // 存储缓存
      if (options.dataSuccess(data)) {
        ufm.writeStringCache(cacheFileName, jsonFormat ? JSON.stringify(data) : data);
      }
      // 是否打印响应数据
      if (logable) {
        console.log(`🤖 Get请求响应：${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error(`🚫 Get请求失败：${error}： ${url}`);
    }
    this.logDivider();
    return data;
  }

  /**
  * Http Post 请求接口
  * @param {string} url 请求的url
  * @param {Array} parameterArr 请求参数键值对数组
  * @param {bool} jsonFormat 返回数据是否为json，默认true
  * @param {object} headers 请求头
  * @param {boolean} logable 是否打印数据，默认true
  * @param {boolean} useICloud 是否使用iCloud
  * @param {string} scriptName 脚本名称
  * @param {any} body body
  * @return {string | json | null}
  */
  httpPost = async (url, options = {}) => {
    let data;
    try {
      const defaultOptions = {
        parameterArr: [],
        body: undefined,
        jsonFormat: true,
        headers: null,
        logable: false,
        useICloud: false,
        useCache: true,
        dataSuccess: (res) => true,
        scriptName: Script.name()
      };
      options = {
        ...defaultOptions,
        ...options
      };
      const { jsonFormat, headers, logable, useICloud, useCache, scriptName } = options;

      // 根据URL进行md5生成cacheKey
      const cacheFileName = this.md5(url);
      const ufm = this.useFileManager({ useICloud, scriptName });
      // 读取本地缓存
      const localCache = ufm.readStringCache(cacheFileName);
      const lastCacheTime = ufm.getCacheModifyDate(cacheFileName);
      const timeInterval = Math.floor((this.getCurrentTimeStamp() - lastCacheTime) / 60);
      const canUseCache = localCache != null && localCache.length > 0;
      if (useCache) {
        // 判断是否需要刷新
        // 过时且有本地缓存则直接返回本地缓存数据 
        const { refreshInterval = '0' } = this.readWidgetSetting();
        const shouldLoadCache = timeInterval <= Number(refreshInterval) && canUseCache;
        console.log(`⏰ ${this.getDateStr(new Date(lastCacheTime * 1000), 'HH:mm')}加入缓存，已缓存 ${lastCacheTime > 0 ? timeInterval : 0}min，缓存${shouldLoadCache ? '未过期' : '已过期'}`);
        if (shouldLoadCache) {
          const RES = jsonFormat ? JSON.parse(localCache) : localCache;
          if (options.dataSuccess(RES)) {
            console.log(`🤖 Post读取缓存：${url}`);
            // 是否打印响应数据
            if (logable) {
              console.log(`🤖 Post请求响应：${localCache}`);
            }
            this.logDivider();
            return RES;
          }
        }
      }

      console.log(`🚀 Post在线请求：${url}`);
      let req = new Request(url);
      req.method = 'POST';
      if (headers != null && headers != undefined) {
        req.headers = headers;
      }
      for (const parameter of options?.parameterArr) {
        req.addParameterToMultipart(Object.keys(parameter)[0], Object.values(parameter)[0])
      }
      if (options?.body) {
        req.body = options?.body;
      }
      data = await (jsonFormat ? req.loadJSON() : req.loadString());
      // 判断数据是否为空（加载失败）
      if (!data && canUseCache) {
        console.log(`🤖 Post读取缓存：${url}`);
        this.logDivider();
        return jsonFormat ? JSON.parse(localCache) : localCache;
      }
      // 存储缓存
      if (options.dataSuccess(data)) {
        ufm.writeStringCache(cacheFileName, jsonFormat ? JSON.stringify(data) : data);
      }
      // 是否打印响应数据
      if (logable) {
        console.log(`🤖 Post请求响应：${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error(`🚫 Post请求失败：${error}： ${url}`);
    }
    this.logDivider();
    return data;
  }

  getSFSymbol = (name, size = 16) => {
    const sf = SFSymbol.named(name)
    if (sf != null) {
      if (size != undefined && size != null) {
        sf.applyFont(Font.systemFont(size))
      }
      return sf.image
    } else {
      return undefined
    }
  }

  getLocation = async (locale = "zh_cn", options = {}) => {
    // 定位信息
    let locationData = {
      "latitude": undefined,
      "longitude": undefined,
      "locality": undefined,
      "subLocality": undefined
    };
    const { location = true, longitude, latitude } = this.readWidgetSetting();
    if (!location) {
      locationData.longitude = longitude;
      locationData.latitude = latitude;
      if (longitude == null || longitude == undefined || latitude == null || latitude == undefined) {
        await this.generateAlert('定位信息', '系统定位已关闭\n配置中找不到指定定位信息\n请开关定位后输入定位\n点击左上角关闭脚本重新运行', ['确定']);
        throw new Error('获取定位信息失败，请打开定位或者手动输入定位信息！');
      }
      return locationData;
    }
    // 缓存
    const defaultOptions = {
      useICloud: false,
      scriptName: this.scriptName
    };
    options = {
      ...defaultOptions,
      ...options
    };
    const { useICloud, scriptName } = options;
    // 缓存文件
    const cacheFileName = this.md5("lsp-location-cache");
    const ufm = this.useFileManager({ useICloud, scriptName });
    try {
      // 读取本地缓存
      const locationCache = ufm.readStringCache(cacheFileName, true);
      // 判断是否需要刷新
      const lastCacheTime = ufm.getCacheModifyDate(cacheFileName, true);
      const timeInterval = Math.floor((this.getCurrentTimeStamp() - lastCacheTime) / 60);
      const canUseCache = locationCache != null && locationCache.length > 0;
      const { refreshInterval = '0' } = this.readWidgetSetting();
      const shouldLoadCache = timeInterval <= Number(refreshInterval) && canUseCache;
      console.log(`⏰ ${this.getDateStr(new Date(lastCacheTime * 1000), 'HH:mm')}加入缓存，已缓存 ${lastCacheTime > 0 ? timeInterval : 0}min，缓存${shouldLoadCache ? '未过期' : '已过期'}`);
      if (shouldLoadCache) {
        // 读取缓存数据
        console.log(`🤖 读取定位缓存数据：${locationCache}`);
        locationData = JSON.parse(locationCache);
      } else {
        console.log(`📌 开始调用手机定位`);
        const location = await Location.current();
        const geocode = await Location.reverseGeocode(location.latitude, location.longitude, locale);
        locationData.latitude = location.latitude;
        locationData.longitude = location.longitude;
        const geo = geocode[0];
        // 市
        if (locationData.locality == undefined) {
          locationData.locality = geo.locality;
        }
        // 区
        if (locationData.subLocality == undefined) {
          locationData.subLocality = geo.subLocality;
        }
        // 街道
        locationData.street = geo.thoroughfare;
        // 缓存数据
        ufm.writeStringCache(cacheFileName, JSON.stringify(locationData), true);
        console.log(`🚀 定位信息：latitude=${location.latitude}，longitude=${location.longitude}，locality=${locationData.locality}，subLocality=${locationData.subLocality}，street=${locationData.street}`);
      }
    } catch (error) {
      console.error(`🚫 定位出错了，${error.toString()}`);
      // 读取缓存数据
      const locationCache = ufm.readStringCache(cacheFileName, true);
      console.log(`🤖 读取定位缓存数据：${locationCache}`);
      if (locationCache && locationCache.length > 0) {
        locationData = JSON.parse(locationCache);
      }
    }
    this.logDivider();
    return locationData;
  }

  getSettingValueByKey = (key, defaultValue) => this.readWidgetSetting()[key] ?? defaultValue;

  loadShadowColor2Image = async (img, shadowColor) => {
    try {
      let drawContext = new DrawContext()
      drawContext.size = img.size
      drawContext.respectScreenScale = true
      // 把图片画上去
      drawContext.drawImageInRect(img, new Rect(0, 0, img.size['width'], img.size['height']))
      // 填充蒙版颜色
      drawContext.setFillColor(shadowColor)
      // 填充
      drawContext.fillRect(new Rect(0, 0, img.size['width'], img.size['height']))
      return await drawContext.getImage()
    } catch (error) {
      console.error(error);
      this.logDivider();
    }
  }

  /**
   * 图片圆形裁剪
   * @param {*} url 
   * @returns 
   */
  circleCropImage = async (url) => {
    let img = await this.getImageByUrl(url);
    const imgData = Data.fromPNG(img).toBase64String();
    const html = `
      <img id="sourceImg" src="data:image/png;base64,${imgData}" />
      <img id="silhouetteImg" src="" />
      <canvas id="mainCanvas" />
    `
    const js = `
      let canvas = document.createElement("canvas");
      let sourceImg = document.getElementById("sourceImg");
      let silhouetteImg = document.getElementById("silhouetteImg");
      var diameter = sourceImg.width < sourceImg.height ? sourceImg.width : sourceImg.height;
      let ctx = canvas.getContext('2d');
      canvas.width = diameter;
      canvas.height = diameter;
      ctx.save();
      ctx.beginPath();
      ctx.arc(diameter / 2, diameter / 2, diameter / 2, 0, 2 * Math.PI);
      ctx.clip();
      ctx.drawImage(sourceImg, 0, 0);
      ctx.restore();
      let imgData = ctx.getImageData(0, 0, diameter, diameter);
      ctx.putImageData(imgData, 0, 0);
      silhouetteImg.src = canvas.toDataURL();
      output = canvas.toDataURL();
    `
    const wv = new WebView();
    await wv.loadHTML(html);
    const base64Image = await wv.evaluateJavaScript(js);
    return await new Request(base64Image).loadImage();
  }

  /**
  * 在线图片加载
  * @param {string} url 图片链接
  * @param {string} pointCacheKey 指定缓存key
  * @param {bool} useCache 是否使用缓存
  * @return {Image}
  */
  getImageByUrl = async (url, options = {}) => {
    const { pointCacheKey = null, useCache = true } = options;
    // 缓存
    options = {
      useICloud: false,
      scriptName: this.scriptName,
      ...options,
    };
    const { useICloud, scriptName } = options;
    const ufm = this.useFileManager({ useICloud, scriptName });
    // 根据URL进行md5生成cacheKey
    let cacheFileName = pointCacheKey;
    if (cacheFileName == undefined || cacheFileName == null || cacheFileName.length == 0) {
      cacheFileName = this.md5(url);
    }
    try {
      // 缓存数据
      if (useCache) {
        const cacheImg = ufm.readImgCache(cacheFileName);
        if (cacheImg != undefined && cacheImg != null) {
          console.log(`🤖 返回缓存图片：${url}`);
          this.logDivider();
          return cacheImg;
        }
      }
      console.log(`🚀 在线请求图片：${url}`);
      const req = new Request(url);
      let img = await req.loadImage();
      // 存储到缓存
      ufm.writeImgCache(cacheFileName, img);
      this.logDivider();
      return img;
    } catch (e) {
      console.error(`🚫 图片加载失败：${e}`);
      // 判断本地是否有缓存，有的话直接返回缓存
      let cacheImg = ufm.readImgCache(cacheFileName);
      if (cacheImg != undefined) {
        console.error(`🚫 图片加载失败，返回缓存图片`);
        this.logDivider();
        return cacheImg;
      }
      // 没有缓存+失败情况下，返回灰色背景
      console.log(`📵 返回默认图片，原链接：${url}`)
      let ctx = new DrawContext();
      ctx.opaque = false;
      ctx.respectScreenScale = true;
      ctx.size = new Size(80, 80);
      ctx.setFillColor(Color.darkGray());
      ctx.fillRect(new Rect(0, 0, 80, 80));
      this.logDivider();
      return await ctx.getImage();
    }
  }

  carouselIndex = (cacheKey, size) => {
    if (size <= 0) {
      return 0;
    }
    let index = -1;
    if (Keychain.contains(cacheKey)) {
      let cacheString = this.keyGet(cacheKey);
      index = parseInt(cacheString);
    }
    index = index + 1;
    index = index % size;
    this.keySave(cacheKey, `${index}`)
    return index
  }

  getRandowArrValue(arr) {
    const key = parseInt(Math.random() * arr.length)
    let item = arr[key]
    if (item == undefined) {
      item = arr[0]
    }
    return item
  }

  keySave = (cacheKey, cache) => {
    if (cache) {
      Keychain.set(cacheKey, cache);
    }
  }

  keyGet = (cacheKey, defaultValue = '') => {
    if (Keychain.contains(cacheKey)) {
      return Keychain.get(cacheKey);
    } else {
      return defaultValue;
    }
  }

  generateAlert = async (title, message, options, cancelAction) => {
    let alert = new Alert();
    alert.title = title;
    if (message?.length > 0) {
      alert.message = `\n${message}`;
    }
    if (!options) {
      throw new Error('generateAlert 方法的 "options" 属性不可为空');
    }
    for (const option of options) {
      alert.addAction(option);
    }
    if (cancelAction) {
      alert.addCancelAction(cancelAction);
    }
    let response = await alert.presentAlert();
    return response;
  }

  generateInputAlert = async (options, confirm) => {
    options = {
      cancelText: '取消',
      confirmText: '确定',
      ...options
    };
    const inputAlert = new Alert();
    inputAlert.title = options.title;
    const message = options.message;
    if (message) {
      inputAlert.message = `\n${message}`;
    }
    inputAlert.addAction(options.cancelText);
    inputAlert.addAction(options.confirmText);
    const fieldArr = options.options;
    if (!fieldArr) {
      throw new Error('generateInputAlert 方法的 "options" 属性不可为空')
    }
    for (const option of fieldArr) {
      inputAlert.addTextField(option.hint, option.value);
    }
    let selectIndex = await inputAlert.presentAlert();
    if (selectIndex == 1) {
      const inputObj = [];
      fieldArr.forEach((_, index) => {
        let value = inputAlert.textFieldValue(index);
        inputObj.push({ index, value });
      });
      confirm(inputObj);
    }
    return selectIndex;
  }

  presentSheet = async (options) => {
    options = {
      showCancel: true,
      cancelText: '取消',
      ...options
    };
    const alert = new Alert();
    if (options.title) {
      alert.title = options.title;
    }
    if (options.message) {
      alert.message = options.message;
    }
    if (!options.options) {
      throw new Error('presentSheet 方法的 "options" 属性不可为空')
    }
    for (const option of options.options) {
      alert.addAction(option.name);
    }
    if (options.showCancel) {
      alert.addCancelAction(options.cancelText);
    }
    return await alert.presentSheet();
  };

  /**
  * 手机各大小组件尺寸
  */
  phoneSizes = () => {
    return {
      // 14 Pro Max
      "2796": { 小号: 510, 中号: 1092, 大号: 1146, 左边: 99, 右边: 681, 顶部: 282, 中间: 918, 底部: 1554 },
      // 14 Pro
      "2556": { 小号: 474, 中号: 1014, 大号: 1062, 左边: 82, 右边: 622, 顶部: 270, 中间: 858, 底部: 1446 },
      // 12/13 Pro Max
      "2778": { 小号: 510, 中号: 1092, 大号: 1146, 左边: 96, 右边: 678, 顶部: 246, 中间: 882, 底部: 1518 },
      // 12/13 and 12/13 Pro
      "2532": { 小号: 474, 中号: 1014, 大号: 1062, 左边: 78, 右边: 618, 顶部: 231, 中间: 819, 底部: 1407 },
      // 11 Pro Max, XS Max
      "2688": { 小号: 507, 中号: 1080, 大号: 1137, 左边: 81, 右边: 654, 顶部: 228, 中间: 858, 底部: 1488 },
      // 11, XR
      "1792": { 小号: 338, 中号: 720, 大号: 758, 左边: 54, 右边: 436, 顶部: 160, 中间: 580, 底部: 1000 },
      // 11 Pro, XS, X, 12 mini
      "2436": {
        x: { 小号: 465, 中号: 987, 大号: 1035, 左边: 69, 右边: 591, 顶部: 213, 中间: 783, 底部: 1353 },
        mini: { 小号: 465, 中号: 987, 大号: 1035, 左边: 69, 右边: 591, 顶部: 231, 中间: 801, 底部: 1371 }
      },
      // Plus phones
      "2208": { 小号: 471, 中号: 1044, 大号: 1071, 左边: 99, 右边: 672, 顶部: 114, 中间: 696, 底部: 1278 },
      // SE2 and 6/6S/7/8
      "1334": { 小号: 296, 中号: 642, 大号: 648, 左边: 54, 右边: 400, 顶部: 60, 中间: 412, 底部: 764 },
      // SE1
      "1136": { 小号: 282, 中号: 584, 大号: 622, 左边: 30, 右边: 332, 顶部: 59, 中间: 399, 底部: 399 },
      // 11 and XR in Display Zoom mode
      "1624": { 小号: 310, 中号: 658, 大号: 690, 左边: 46, 右边: 394, 顶部: 142, 中间: 522, 底部: 902 },
      // Plus in Display Zoom mode
      "2001": { 小号: 444, 中号: 963, 大号: 972, 左边: 81, 右边: 600, 顶部: 90, 中间: 618, 底部: 1146 },
    }
  }

  cropImage = (crop, image) => {
    let draw = new DrawContext();
    let rect = new Rect(crop.x, crop.y, crop.w, crop.h);
    draw.size = new Size(rect.width, rect.height);
    draw.drawImageAtPoint(image, new Point(-rect.x, -rect.y));
    return draw.getImage();
  }

  blurImage = async (img, crop, style, blur = 150) => {
    const js = `
    var mul_table = [
        512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512,
        454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512,
        482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456,
        437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512,
        497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328,
        320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456,
        446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335,
        329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512,
        505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405,
        399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328,
        324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271,
        268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456,
        451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388,
        385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335,
        332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292,
        289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];
    
    var shg_table = [
        9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17,
        17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19,
        19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20,
        20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21,
        21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
        21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22,
        22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
        22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23,
        23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
        23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
        23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
        23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
        24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
        24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
        24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
        24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];

    function stackBlurCanvasRGB(id, top_x, top_y, width, height, radius) {
        if (isNaN(radius) || radius < 1) return;
        radius |= 0;
    
        var canvas = document.getElementById(id);
        var context = canvas.getContext("2d");
        var imageData;
    
        try {
            try {
                imageData = context.getImageData(top_x, top_y, width, height);
            } catch (e) {
                // NOTE: this part is supposedly only needed if you want to work with local files
                // so it might be okay to remove the whole try/catch block and just use
                // imageData = context.getImageData( top_x, top_y, width, height );
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
                    imageData = context.getImageData(top_x, top_y, width, height);
                } catch (e) {
                    alert("Cannot access local image");
                    throw new Error("unable to access local image data: " + e);
                    return;
                }
            }
        } catch (e) {
            alert("Cannot access image");
            throw new Error("unable to access image data: " + e);
        }
    
        var pixels = imageData.data;
    
        var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum,
            r_out_sum, g_out_sum, b_out_sum,
            r_in_sum, g_in_sum, b_in_sum,
            pr, pg, pb, rbs;
    
        var div = radius + radius + 1;
        var w4 = width << 2;
        var widthMinus1 = width - 1;
        var heightMinus1 = height - 1;
        var radiusPlus1 = radius + 1;
        var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
    
        var stackStart = new BlurStack();
        var stack = stackStart;
        for (i = 1; i < div; i++) {
            stack = stack.next = new BlurStack();
            if (i == radiusPlus1) var stackEnd = stack;
        }
        stack.next = stackStart;
        var stackIn = null;
        var stackOut = null;
    
        yw = yi = 0;
    
        var mul_sum = mul_table[radius];
        var shg_sum = shg_table[radius];
    
        for (y = 0; y < height; y++) {
            r_in_sum = g_in_sum = b_in_sum = r_sum = g_sum = b_sum = 0;
    
            r_out_sum = radiusPlus1 * (pr = pixels[yi]);
            g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
            b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
    
            r_sum += sumFactor * pr;
            g_sum += sumFactor * pg;
            b_sum += sumFactor * pb;
    
            stack = stackStart;
    
            for (i = 0; i < radiusPlus1; i++) {
                stack.r = pr;
                stack.g = pg;
                stack.b = pb;
                stack = stack.next;
            }
    
            for (i = 1; i < radiusPlus1; i++) {
                p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
                r_sum += (stack.r = (pr = pixels[p])) * (rbs = radiusPlus1 - i);
                g_sum += (stack.g = (pg = pixels[p + 1])) * rbs;
                b_sum += (stack.b = (pb = pixels[p + 2])) * rbs;
    
                r_in_sum += pr;
                g_in_sum += pg;
                b_in_sum += pb;
    
                stack = stack.next;
            }
    
            stackIn = stackStart;
            stackOut = stackEnd;
            for (x = 0; x < width; x++) {
                pixels[yi] = (r_sum * mul_sum) >> shg_sum;
                pixels[yi + 1] = (g_sum * mul_sum) >> shg_sum;
                pixels[yi + 2] = (b_sum * mul_sum) >> shg_sum;
    
                r_sum -= r_out_sum;
                g_sum -= g_out_sum;
                b_sum -= b_out_sum;
    
                r_out_sum -= stackIn.r;
                g_out_sum -= stackIn.g;
                b_out_sum -= stackIn.b;
    
                p = (yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1)) << 2;
    
                r_in_sum += (stackIn.r = pixels[p]);
                g_in_sum += (stackIn.g = pixels[p + 1]);
                b_in_sum += (stackIn.b = pixels[p + 2]);
    
                r_sum += r_in_sum;
                g_sum += g_in_sum;
                b_sum += b_in_sum;
    
                stackIn = stackIn.next;
    
                r_out_sum += (pr = stackOut.r);
                g_out_sum += (pg = stackOut.g);
                b_out_sum += (pb = stackOut.b);
    
                r_in_sum -= pr;
                g_in_sum -= pg;
                b_in_sum -= pb;
    
                stackOut = stackOut.next;
                yi += 4;
            }
            yw += width;
        }
    
        for (x = 0; x < width; x++) {
            g_in_sum = b_in_sum = r_in_sum = g_sum = b_sum = r_sum = 0;
    
            yi = x << 2;
            r_out_sum = radiusPlus1 * (pr = pixels[yi]);
            g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
            b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
    
            r_sum += sumFactor * pr;
            g_sum += sumFactor * pg;
            b_sum += sumFactor * pb;
    
            stack = stackStart;
    
            for (i = 0; i < radiusPlus1; i++) {
                stack.r = pr;
                stack.g = pg;
                stack.b = pb;
                stack = stack.next;
            }
    
            yp = width;
    
            for (i = 1; i <= radius; i++) {
                yi = (yp + x) << 2;
    
                r_sum += (stack.r = (pr = pixels[yi])) * (rbs = radiusPlus1 - i);
                g_sum += (stack.g = (pg = pixels[yi + 1])) * rbs;
                b_sum += (stack.b = (pb = pixels[yi + 2])) * rbs;
    
                r_in_sum += pr;
                g_in_sum += pg;
                b_in_sum += pb;
    
                stack = stack.next;
    
                if (i < heightMinus1) {
                    yp += width;
                }
            }
    
            yi = x;
            stackIn = stackStart;
            stackOut = stackEnd;
            for (y = 0; y < height; y++) {
                p = yi << 2;
                pixels[p] = (r_sum * mul_sum) >> shg_sum;
                pixels[p + 1] = (g_sum * mul_sum) >> shg_sum;
                pixels[p + 2] = (b_sum * mul_sum) >> shg_sum;
    
                r_sum -= r_out_sum;
                g_sum -= g_out_sum;
                b_sum -= b_out_sum;
    
                r_out_sum -= stackIn.r;
                g_out_sum -= stackIn.g;
                b_out_sum -= stackIn.b;
    
                p = (x + (((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width)) << 2;
    
                r_sum += (r_in_sum += (stackIn.r = pixels[p]));
                g_sum += (g_in_sum += (stackIn.g = pixels[p + 1]));
                b_sum += (b_in_sum += (stackIn.b = pixels[p + 2]));
    
                stackIn = stackIn.next;
    
                r_out_sum += (pr = stackOut.r);
                g_out_sum += (pg = stackOut.g);
                b_out_sum += (pb = stackOut.b);
    
                r_in_sum -= pr;
                g_in_sum -= pg;
                b_in_sum -= pb;
    
                stackOut = stackOut.next;
    
                yi += width;
            }
        }
    
        context.putImageData(imageData, top_x, top_y);
    }

    function BlurStack() {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = 0;
        this.next = null;
    }
    
    // https://gist.github.com/mjackson/5311256
    function rgbToHsl(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;
        if (max == min) {
            h = s = 0; // achromatic
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return [h, s, l];
    }

    function hslToRgb(h, s, l) {
        var r, g, b;
        if (s == 0) {
            r = g = b = l; // achromatic
        } else {
            var hue2rgb = function hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }
    
    function lightBlur(hsl) {
        // Adjust the luminance.
        let lumCalc = 0.35 + (0.3 / hsl[2]);
        if (lumCalc < 1) { lumCalc = 1; }
        else if (lumCalc > 3.3) { lumCalc = 3.3; }
        const l = hsl[2] * lumCalc;
    
        // Adjust the saturation. 
        const colorful = 2 * hsl[1] * l;
        const s = hsl[1] * colorful * 1.5;
    
        return [hsl[0], s, l];
    }
    
    function darkBlur(hsl) {
        // Adjust the saturation. 
        const colorful = 2 * hsl[1] * hsl[2];
        const s = hsl[1] * (1 - hsl[2]) * 3;
    
        return [hsl[0], s, hsl[2]];
    }

    // Set up the canvas.
    const img = document.getElementById("blurImg");
    const canvas = document.getElementById("mainCanvas");
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.width = w;
    canvas.height = h;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, w, h);
    context.drawImage(img, 0, 0);
    
    // Get the image data from the context.
    var imageData = context.getImageData(0, 0, w, h);
    var pix = imageData.data;
    
    // Set the image function, if any.
    var imageFunc;
    var style = "${style}";
    if (style == "dark") { imageFunc = darkBlur; }
    else if (style == "light") { imageFunc = lightBlur; }
    for (let i = 0; i < pix.length; i += 4) {
        // Convert to HSL.
        let hsl = rgbToHsl(pix[i], pix[i + 1], pix[i + 2]);
    
        // Apply the image function if it exists.
        if (imageFunc) { hsl = imageFunc(hsl); }
    
        // Convert back to RGB.
        const rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
    
        // Put the values back into the data.
        pix[i] = rgb[0];
        pix[i + 1] = rgb[1];
        pix[i + 2] = rgb[2];
    }

    // Draw over the old image.
    context.putImageData(imageData, 0, 0);
    // Blur the image.
    stackBlurCanvasRGB("mainCanvas", 0, 0, w, h, ${blur});
    
    // Perform the additional processing for dark images.
    if (style == "dark") {
        // Draw the hard light box over it.
        context.globalCompositeOperation = "hard-light";
        context.fillStyle = "rgba(55,55,55,0.2)";
        context.fillRect(0, 0, w, h);
        // Draw the soft light box over it.
        context.globalCompositeOperation = "soft-light";
        context.fillStyle = "rgba(55,55,55,1)";
        context.fillRect(0, 0, w, h);
        // Draw the regular box over it.
        context.globalCompositeOperation = "source-over";
        context.fillStyle = "rgba(55,55,55,0.4)";
        context.fillRect(0, 0, w, h);
        // Otherwise process light images.
    } else if (style == "light") {
        context.fillStyle = "rgba(255,255,255,0.4)";
        context.fillRect(0, 0, w, h);
    }
    // Return a base64 representation.
    canvas.toDataURL();    
    `

    // Convert the images and create the HTML.
    let blurImgData = Data.fromPNG(img).toBase64String()
    let html = `
        <img id="blurImg" src="data:image/png;base64,${blurImgData}" />
        <canvas id="mainCanvas" />
    `

    // Make the web view and get its return value.
    let view = new WebView()
    await view.loadHTML(html)
    let returnValue = await view.evaluateJavaScript(js)

    // Remove the data type from the string and convert to data.
    let imageDataString = returnValue.slice(22)
    let imageData = Data.fromBase64String(imageDataString)

    // Convert to image and crop before returning.
    let imageFromData = Image.fromData(imageData)
    if (crop != null && crop != undefined) {
      return this.cropImage(crop, imageFromData)
    } else {
      return imageFromData
    }
  }

  transparentBg = async (day = true) => {
    try {
      if (config.runsInApp) {
        let alertTitle = `${day ? '白天' : '深色'}背景设置`
        let imgCrop = undefined
        const tips = "小组件透明背景已经设置完成，\n退到桌面刷新/预览组件即可查看效果"
        // Determine if user has taken the screenshot.
        let message = "如需实现透明背景\n长按桌面然后滑到桌面最右边进行截图"
        let options = ["退出进行截图", "继续选择图片"]
        let response = await this.generateAlert(alertTitle, message, options)
        // Return if we need to exit.
        if (response == 0) return null
        // Get screenshot and determine phone size.
        let img = await Photos.fromLibrary()
        let height = img.size.height
        let phone = this.phoneSizes()[height]
        if (!phone) {
          message = "你似乎选择了非iPhone屏幕截图的图像\n或者不支持你的iPhone\n请使用其他图像再试一次!"
          await this.generateAlert(alertTitle, message, ["好的"])
          return null
        }

        const ufm = this.useFileManager();
        const { fm, fullFileName, writeStringCache, readStringCache, writeImgCache } = ufm;

        // Extra setup needed for 2436-sized phones.
        if (height == 2436) {
          let cacheName = "lsp-phone-type"
          const cacheFileName = fullFileName(cacheName);
          const fileExists = fm.fileExists(cacheFileName);
          // If we already cached the phone size, load it.
          if (fileExists) {
            let typeString = readStringCache(cacheFileName)
            phone = phone[typeString]
            // Otherwise, prompt the user.
          } else {
            message = "你使用什么型号的iPhone？"
            let types = ["iPhone 12 mini", "iPhone 11 Pro, XS, or X"]
            let typeIndex = await this.generateAlert(alertTitle, message, types)
            let type = (typeIndex == 0) ? "mini" : "x"
            phone = phone[type]
            writeStringCache(cacheFileName, type)
          }
        }

        // Prompt for widget size and position.
        message = "你想要创建什么尺寸的小部件？"
        let sizes = ["小号", "中号", "大号"]
        let size = await this.generateAlert(alertTitle, message, sizes)
        let widgetSize = sizes[size]

        message = "你想它应用在什么位置？"
        message += (height == 1136 ? " (请注意，你的设备仅支持两行小部件，因此中间和底部选项相同。)" : "")

        // Determine image crop based on phone size.
        let crop = { w: "", h: "", x: "", y: "" }
        if (widgetSize == "小号") {
          crop.w = phone.小号
          crop.h = phone.小号
          let positions = ["顶部 左边", "顶部 右边", "中间 左边", "中间 右边", "底部 左边", "底部 右边"]
          let position = await this.generateAlert(alertTitle, message, positions)
          // Convert the two words into two keys for the phone size dictionary.
          let keys = positions[position].toLowerCase().split(' ')
          crop.y = phone[keys[0]]
          crop.x = phone[keys[1]]
        } else if (widgetSize == "中号") {
          crop.w = phone.中号
          crop.h = phone.小号
          // 中号 and 大号 widgets have a fixed x-value.
          crop.x = phone.左边
          let positions = ["顶部", "中间", "底部"]
          let position = await this.generateAlert(alertTitle, message, positions)
          let key = positions[position].toLowerCase()
          crop.y = phone[key]
        } else if (widgetSize == "大号") {
          crop.w = phone.中号
          crop.h = phone.大号
          crop.x = phone.左边
          let positions = ["顶部", "底部"]
          let position = await this.generateAlert(alertTitle, message, positions)
          // 大号 widgets at the 底部 have the "中间" y-value.
          crop.y = position ? phone.中间 : phone.顶部
        }

        // Prompt for blur style.
        message = "你想要一个完全透明的小部件，还是半透明的模糊效果？"
        let blurOptions = ["透明背景", "浅色模糊", "深色模糊", "完全模糊"]
        let blurred = await this.generateAlert(alertTitle, message, blurOptions)

        // We always need the cropped image.
        imgCrop = this.cropImage(crop, img)

        // If it's blurred, set the blur style.
        if (blurred) {
          const styles = ["", "light", "dark", "none"]
          const style = styles[blurred]
          imgCrop = await this.blurImage(img, crop, style)
        }

        message = tips
        const exportPhotoOptions = ["导出", "完成"]
        const exportToPhoto = await this.generateAlert(alertTitle, message, exportPhotoOptions)

        if (exportToPhoto == 0) {
          Photos.save(imgCrop)
        }

        // 保存图片缓存
        writeImgCache(day ? this.dayTransparentBgName() : this.nightTransparentBgName(), imgCrop);
        return true;
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
  * 获取组件尺寸大小
  * @param {string} size 组件尺寸【小号】、【中号】、【大号】
  * @param {bool} isIphone12Mini 是否是12mini
  */
  getWidgetSize = (size, isIphone12Mini = false) => {
    // 屏幕缩放比例
    const screenScale = Device.screenScale();
    // 组件宽度
    let phoneWidgetSize = undefined;
    // 手机屏幕高度
    const screenHeight = Device.screenSize().height * screenScale;
    if (screenHeight == 2436) {
      // 2436尺寸的手机有【11 Pro, XS, X】 & 【12 mini】
      if (isIphone12Mini) {
        phoneWidgetSize = this.phoneSizes()[screenHeight].mini;
      } else {
        phoneWidgetSize = this.phoneSizes()[screenHeight].x;
      }
    } else {
      phoneWidgetSize = this.phoneSizes()[screenHeight];
    }
    //
    let width = phoneWidgetSize[size] / screenScale;
    if (size === '大号') {
      width = phoneWidgetSize['中号'] / screenScale;
    }
    //
    let height = phoneWidgetSize['小号'] / screenScale;
    if (size === '大号') {
      height = phoneWidgetSize['大号'] / screenScale;
    }
    //
    return { width, height };
  }

  // *******************常用api信息接口*******************
  /**
  * 获取农历信息
  */
  getLunarInfo = async () => {
    const datePre = 'lunar_';
    const currDate = new Date();
    let dateStr = this.getDateStr(currDate, 'yyyyMMdd');
    let lunarJsonData = this.useFileManager().readJSONCache(datePre + dateStr);
    if (JSON.stringify(lunarJsonData) == '{}') {
      console.log(`🚀 在线请求农历数据`);
      const day = currDate.getDate() - 1;
      // 万年历数据
      const url = "https://wannianrili.bmcx.com/";
      const headers = {
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36"
      };
      const html = await this.httpGet(url, { jsonFormat: false, headers, useCache: false });
      const webview = new WebView();
      await webview.loadHTML(html);
      const getData = `
        function getData() {
            try {
                success = true;
                infoLunarText = document.querySelector('div#wnrl_k_you_id_${day}.wnrl_k_you .wnrl_k_you_id_wnrl_nongli').innerText
                holidayText = document.querySelectorAll('div.wnrl_k_zuo div.wnrl_riqi')[${day}].querySelector('.wnrl_td_bzl').innerText
                lunarYearText = document.querySelector('div.wnrl_k_you_id_wnrl_nongli_ganzhi').innerText
                lunarYearText = lunarYearText.slice(0, lunarYearText.indexOf('年') + 1)
                if (infoLunarText.search(holidayText) != -1) {
                    holidayText = ''
                }
            } catch(e) {
              log(e)
                success = false;
                infoLunarText = '*'
                holidayText = '*'
                lunarYearText = '*'
            }
            return { success, infoLunarText, holidayText , lunarYearText }
        }
        getData()
      `
      // 节日数据  
      lunarJsonData = await webview.evaluateJavaScript(getData, false);
      //
      const listFiles = this.useFileManager().fm.listContents(this.useFileManager().cacheDir);
      for (let index = listFiles.length - 1; index >= 0; index--) {
        const file = listFiles[index];
        if (file.startsWith(datePre)) {
          console.log(`删除农历缓存文件：${file}`);
          this.useFileManager().fm.remove(this.useFileManager().cacheDir + '/' + file);
        }
      }
      //
      if (lunarJsonData?.success) {
        this.useFileManager().writeJSONCache(datePre + dateStr, lunarJsonData);
      }
    }
    console.log(`🚀 农历数据：${JSON.stringify(lunarJsonData)}`);
    this.logDivider();
    return lunarJsonData;
  }
  // ***************************************************

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  async getAppViewOptions() {
    return {};
  }

  async run() {
    const viewOptions = await this.getAppViewOptions();
    if (config.runsInWidget) {
      await this.providerWidget(viewOptions.widgetProvider);
    } else {
      this.renderAppView(viewOptions);
    }
  }

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  dismissLoading = (webView) => {
    webView.evaluateJavaScript(
      'window.dispatchEvent(new CustomEvent(\'JWeb\', { detail: { code: \'finishLoading\' } }))',
      false
    );
  }

  insertTextByElementId = (webView, elementId, text) => {
    webView.evaluateJavaScript(
      'document.getElementById("' + elementId + '").innerText="' + text + '"',
      false
    );
  }

  async renderAppView(options = {}, previewWebView = new WebView()) {
    this.logDivider();
    console.log(`👉 组件控制面板渲染预览 👇`);
    this.logDivider();
    const {
      showWidgetSettingBg = false, // 是否显示组件背景设置的图片
      showWidgetBg = true, // 是否显示背景菜单选项
      isChildLevel = false, // 是否是二级菜单
      needLocation = false, // 是否需要定位
      settingItemFontSize = 16,
      authorNameFontSize = 20,
      authorDescFontSize = 12,
      widgetProvider = { defaultBgType: '2', small: true, medium: true, large: true },
      settingItems = [],
      onItemClick,
      onCheckedChange,
      authorAvatar = `data:image/png;base64,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`,
      authorName = '杂货万事屋',
      authorDesc = '点击查看/添加Scriptable小组件订阅',
      homePage = this.getRemoteRootPath(),
    } = options;
    // 屏幕宽度
    const screenWidth = Device.screenSize().width;
    const mediumWidgetHeight = 80;
    // 组件配置缓存
    const widgetSetting = this.readWidgetSetting();
    const { dayBackgroundImagePath, nightBackgroundImagePath, dayBackgroundImageUrl, nightBackgroundImageUrl, picType } = widgetSetting;
    let dayBackgroundImage = this.useFileManager().readImgCache(dayBackgroundImagePath);
    let nightBackgroundImage = this.useFileManager().readImgCache(nightBackgroundImagePath);
    if ((picType == 0 || picType == 1 || picType == 2) && showWidgetSettingBg) {
      if (picType == 1) {
        dayBackgroundImage = dayBackgroundImageUrl ? await this.getImageByUrl(dayBackgroundImageUrl) : null;
        nightBackgroundImage = nightBackgroundImageUrl ? await this.getImageByUrl(nightBackgroundImageUrl) : null;
      }
    }
    const showDayImg = dayBackgroundImage ? `data:image/png;base64,${Data.fromPNG(dayBackgroundImage).toBase64String()}` : `${this.getRemoteRootPath()}/img/bg_placeholder.png`;
    const showNightImg = nightBackgroundImage ? `data:image/png;base64,${Data.fromPNG(nightBackgroundImage).toBase64String()}` : `${this.getRemoteRootPath()}/img/bg_placeholder.png`;
    let bgType = widgetSetting.bgType ?? widgetProvider.defaultBgType ?? this.defaultConfig.bgType;
    // ================== 配置界面样式 ===================
    const style = `
    :root {
      --color-primary: #007aff;
      --divider-color: rgba(60,60,67,0.16);
      --card-background: #fff;
      --card-radius: 8px;
      --list-header-color: rgba(60,60,67,0.6);
    }
    * {
      -webkit-user-select: none;
      user-select: none;
    }
    body {
      margin: 10px 0;
      -webkit-font-smoothing: antialiased;
      font-family: "SF Pro Display","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif;
      accent-color: var(--color-primary);
      background: #f6f6f6;
    }
    .list {
      margin: 15px;
    }
    .list__header {
      margin: 0 18px;
      color: var(--list-header-color);
      font-size: 13px;
    }
    .list__body {
      margin-top: 10px;
      background: var(--card-background);
      border-radius: var(--card-radius);
      overflow: hidden;
    }
    .form-item-auth {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 4em;
      padding: 0.5em 18px;
      position: relative;
    }
    .form-item-auth-name {
      margin: 0px 12px;
      font-size: ${authorNameFontSize}px;
      font-weight: 430;
    }
    .form-item-auth-desc {
      margin: 0px 12px;
      font-size: ${authorDescFontSize}px;
      font-weight: 400;
    }
    .form-label-author-avatar {
      width: 62px;
      height: 62px;
      border-radius:50%;
      border: 1px solid #F6D377;
    }
    .form-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: ${settingItemFontSize}px;
      font-weight: 400;
      min-height: 2.2em;
      padding: 0.5em 18px;
      position: relative;
    }
    .form-label {
      display: flex;
      align-items: center;
    }
    .form-label-img {
      height: 30;
    }
    .form-label-title {
      margin-left: 8px
    }
    .bottom-bg {
      margin: 30px 15px 15px 15px;
    }
    .form-item--link .icon-arrow-right {
      color: #86868b;
    }
    .form-item-right-desc {
      font-size: 13px;
      color: #86868b;
      margin-right: 4px;
    }
    .form-item + .form-item::before {
      content: "";
      position: absolute;
      top: 0;
      left: 20px;
      right: 0;
      border-top: 0.5px solid var(--divider-color);
    }
    .form-item input[type="checkbox"] {
      width: 2em;
      height: 2em;
    }
    input[type='number'] {
      width: 6em;
      height: 2.3em;
      outline-style: none;
      text-align: right;
      padding: 0px 10px;
      border: 1px solid #ddd;
      font-size: 14px;
      color: #86868b;
    }
    input[type='input'] {
      width: 6em;
      height: 2.3em;
      outline-style: none;
      text-align: right;
      padding: 0px 10px;
      border: 1px solid #ddd;
      font-size: 14px;
      color: #86868b;
    }
    input[type='text'] {
      width: 6em;
      height: 2.3em;
      outline-style: none;
      text-align: right;
      padding: 0px 10px;
      border: 1px solid #ddd;
      font-size: 14px;
      color: #86868b;
    }
    input[type='checkbox'][role='switch'] {
      position: relative;
      display: inline-block;
      appearance: none;
      width: 40px;
      height: 24px;
      border-radius: 24px;
      background: #ccc;
      transition: 0.3s ease-in-out;
    }
    input[type='checkbox'][role='switch']::before {
      content: '';
      position: absolute;
      left: 2px;
      top: 2px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #fff;
      transition: 0.3s ease-in-out;
    }
    input[type='checkbox'][role='switch']:checked {
      background: var(--color-primary);
    }
    input[type='checkbox'][role='switch']:checked::before {
      transform: translateX(16px);
    }
    .copyright {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 15px;
      font-size: 10px;
      color: #86868b;
    }
    .copyright a {
      color: #515154;
      text-decoration: none;
    }
    .preview.loading {
      pointer-events: none;
    }
    .icon-loading {
      display: inline-block;
      animation: 1s linear infinite spin;
    }
    .normal-loading {
      display: inline-block;
      animation: 20s linear infinite spin;
    }
    @keyframes spin {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(1turn);
      }
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --divider-color: rgba(84,84,88,0.65);
        --card-background: #1c1c1e;
        --list-header-color: rgba(235,235,245,0.6);
      }
      body {
        background: #000;
        color: #fff;
      }
    }`;

    // 组件背景Icon
    const widgetBgIco = await this.loadSF2B64('text.below.photo.fill', '#2176ff');
    // 系统通知Icon
    const notifyIco = await this.loadSF2B64('bell.fill', '#FD2953');
    // 仓库Icon
    const warehouseIco = await this.loadSF2B64('link.icloud', '#3a86ff');
    // 系统定位Icon
    const locationIco = await this.loadSF2B64('location.fill', '#07beb8');
    // 刷新间隔
    const refresIntervalIco = await this.loadSF2B64('clock.arrow.circlepath', '#30C758');
    // 组件更新
    const widgetUpdateIco = await this.loadSF2B64('icloud.and.arrow.down', '#3a86ff');
    // 清理缓存
    const cleanDataIco = await this.loadSF2B64('trash', '#FF7F50');
    // 小号预览
    const smallPreviewIco = await this.loadSF2B64('app', '#504ED5');
    // 中号预览
    const mediumPreviewIco = await this.loadSF2B64('rectangle', '#504ED5');
    // 大号预览
    const largePreviewIco = await this.loadSF2B64('rectangle.portrait', '#504ED5');
    // icon转换
    for (let index = 0; index < settingItems.length; index++) {
      const item = settingItems[index];
      if (isChildLevel) {
        const childItems = item.items;
        for (let childIndex = 0; childIndex < childItems.length; childIndex++) {
          const childItem = childItems[childIndex];
          const icon = childItem.icon;
          const { name, color } = icon;
          if (typeof icon !== 'string') {
            childItem.icon = await this.loadSF2B64(name, color);
          }
        }
      } else {
        const icon = item.icon;
        const { name, color } = icon;
        if (typeof icon !== 'string') {
          item.icon = await this.loadSF2B64(name, color);
        }
      }
    }

    const js = `
    (() => {
      const settings = JSON.parse('${JSON.stringify(widgetSetting)}')
      const settingItems = JSON.parse('${JSON.stringify(settingItems)}')

      window.invoke = (code, data) => {
        window.dispatchEvent(
          new CustomEvent(
            'JBridge',
            { detail: { code, data } }
          )
        )
      }

      const notify = document.querySelector('input[name="notify"]')
      notify.checked = settings.notify ?? true
      notify.addEventListener('change', (e) => {
        formData['notify'] = e.target.checked
        invoke('changeSettings', formData)
      })

      const use_github = document.querySelector('input[name="use_github"]')
      use_github.checked = settings.use_github ?? true
      use_github.addEventListener('change', (e) => {
        formData['use_github'] = e.target.checked
        invoke('changeSettings', formData)
      })
      
      const location = document.querySelector('input[name="location"]')
      location.checked = settings.location ?? true
      location.addEventListener('change', (e) => {
        formData['location'] = e.target.checked
        invoke('changeSettings', formData)
      })
      
      function createSettingItems(fragment, settingItems, formId) {
        const formData = {};
        for (const item of settingItems) {
          const value = item.desc ?? settings[item.name] ?? item.default ?? null;
          if(value && item.type != 'cell') {
            formData[item.name] = value;
          }
          const label = document.createElement("label");
          label.className = "form-item";

          if(item.id) {
            label.id = item.id;
          }

          const divLabel = document.createElement("div");
          divLabel.className = 'form-label';
          label.appendChild(divLabel);

          const img = document.createElement("img");
          img.src = item.icon;
          img.className = 'form-label-img';
          divLabel.appendChild(img);

          const divTitle = document.createElement("div");
          divTitle.className = 'form-label-title';
          divTitle.innerText = item.label;
          divLabel.appendChild(divTitle);

          if (item.type === 'select') {
            const select = document.createElement('select');
            select.className = 'form-item__input';
            select.name = item.name;
            select.value = value;
            for (const opt of (item.options || [])) {
              const option = document.createElement('option');
              option.value = opt.value;
              option.innerText = opt.label;
              option.selected = value === opt.value;
              select.appendChild(option);
            }
            select.addEventListener('change', (e) => {
              formData[item.name] = e.target.value;
              invoke('changeSettings', formData);
            })
            label.appendChild(select);
          } else if (item.type === 'cell') {
            label.classList.add('form-item--link');

            const divLabel2 = document.createElement("div");
            divLabel2.className = 'form-label';
            label.appendChild(divLabel2);

            const descDiv = document.createElement("div");
            descDiv.setAttribute('id', item.name);
            descDiv.className = 'form-item-right-desc';
            if(item.showDesc != false) {
              descDiv.innerText = value ?? '';
            }
            divLabel2.appendChild(descDiv);

            const icon = document.createElement('i');
            icon.className = 'iconfont icon-arrow-right';
            divLabel2.appendChild(icon);
            label.addEventListener('click', (e) => {
              if(item.needLoading) {
                toggleIcoLoading(e);
              }
              let openWeb = item.openWeb;
              if(openWeb) {
                invoke('safari', openWeb);
              } else {
                invoke('itemClick', item);
              }
            })
          } else {
            const input = document.createElement("input");
            input.className = 'form-item__input';
            input.name = item.name;
            input.type = item.type || "text";
            input.enterKeyHint = 'done';
            input.value = value;

            if (item.type === 'switch') {
              input.type = 'checkbox';
              input.role = 'switch';
              input.checked = value;
            }

            if (item.type === 'number') {
              input.inputMode = 'decimal';
            }

            if (input.type === 'text') {
              input.size = 12;
            }

            input.addEventListener("change", (e) => {
              formData[item.name] =
                item.type === 'switch'
                ? e.target.checked
                : item.type === 'number'
                ? Number(e.target.value)
                : e.target.value;
              invoke('changeSettings', formData)
            });
            label.appendChild(input);
          }
          fragment.appendChild(label);
        }
        document.getElementById(formId).appendChild(fragment);
        return formData;
      }

      let formData = {};
      const fragment = document.createDocumentFragment();
      if(${isChildLevel}) {
        let subIndex = 0;
        let tmpFormData = {};
        for (const item of settingItems) {
          subIndex++;
          //
          const subForm = document.createElement("form");
          let formId = 'form_sub_menu_' + subIndex;
          subForm.id = formId;
          subForm.className = 'list__body';
          subForm.action = 'javascript:void(0);';
          //
          document.getElementById('sub_list').appendChild(subForm);
          tmpFormData = createSettingItems(fragment, item.items, formId);
          formData = Object.assign(formData, tmpFormData);
        }
      } else {
        formData = createSettingItems(fragment, settingItems, 'form');
      }
    
      // 切换ico的loading效果
      const toggleIcoLoading = (e) => {
          const target = e.currentTarget
          target.classList.add('loading')
          const icon = e.currentTarget.querySelector('.iconfont')
          const className = icon.className
          icon.className = 'iconfont icon-loading'
          const listener = (event) => {
            const { code } = event.detail
            if (code === 'finishLoading') {
              target.classList.remove('loading')
              icon.className = className
              window.removeEventListener('JWeb', listener);
            }
          }
          window.addEventListener('JWeb', listener)
      };

      for (const btn of document.querySelectorAll('.preview')) {
          btn.addEventListener('click', (e) => {
            toggleIcoLoading(e);
            invoke('preview', e.currentTarget.dataset.size);
          })
      }
    
      document.getElementById('author').addEventListener('click', (e) => {
          toggleIcoLoading(e);
          invoke('author', formData);
      })
      document.getElementById('widgetBg').addEventListener('click', (e) => {
          toggleIcoLoading(e);
          invoke('widgetBg', formData);
      })
      document.getElementById('refreshTime').addEventListener('click', () => invoke('refreshInterval', formData))
      document.getElementById('widgetUpdate').addEventListener('click', (e) => {
          toggleIcoLoading(e);
          invoke('widgetUpdate', formData);
      })
      document.getElementById('cleanData').addEventListener('click', () => invoke('cleanData', formData))
    })()`;

    const html = `
    <html>
      <head>
        <meta name='viewport' content='width=device-width, user-scalable=no'>
        <link rel="stylesheet" href="//at.alicdn.com/t/c/font_3791881_bf011w225k4.css" type="text/css">
        <style>${style}</style>
      </head>
      <body>
      <!--头部个人信息-->  
      <div class="list" style="display:${!isChildLevel ? '' : 'none'}">
        <form class="list__body" action="javascript:void(0);">
          <label id="author" class="form-item-auth form-item--link">
            <div class="form-label">
              <img class="form-label-author-avatar" src="${authorAvatar}"/>
              <div>
                <div class="form-item-auth-name">${authorName}</div>
                <div class="form-item-auth-desc">${authorDesc}</div>
              </div>
            </div>
            <i class="iconfont icon-arrow-right"></i>
          </label>
        </form>
      </div>
      <!--组件预览-->
      <div class="list" style="display:${!isChildLevel ? '' : 'none'}">
        <div class="list__header">组件预览</div>
        <form id="form_preview" class="list__body" action="javascript:void(0);">
          <!--小号组件-->
          <label style="display:${widgetProvider.small ? '' : 'none'}" id="previewSmall" data-size="small" class="preview form-item form-item--link">
            <div class="form-label item-none">
              <img class="form-label-img" class="form-label-img" src="${smallPreviewIco}"/>
              <div class="form-label-title" data-size="small">小尺寸</div>
            </div>
            <i class="iconfont icon-arrow-right"></i>
          </label>
          <!--中号组件-->  
          <label style="display:${widgetProvider.medium ? '' : 'none'}" id="previewMedium" data-size="medium" class="preview form-item form-item--link">
            <div class="form-label">
              <img class="form-label-img" src="${mediumPreviewIco}"/>
              <div class="form-label-title" data-size="medium">中尺寸</div>
            </div>
            <i class="iconfont icon-arrow-right"></i>
          </label>
          <!--大号组件-->  
          <label style="display:${widgetProvider.large ? '' : 'none'}" id="previewLarge" data-size="large" class="preview form-item form-item--link">
            <div class="form-label">
              <img class="form-label-img" src="${largePreviewIco}"/>
              <div class="form-label-title" data-size="large">大尺寸</div>
              </div>
            <i class="iconfont icon-arrow-right"></i>
          </label>
        </form>
      </div>
      <!--组件设置-->  
      <div class="list" style="display:${!isChildLevel && settingItems.length > 0 ? '' : 'none'}">
        <div class="list__header">组件设置</div>
        <form id="form" class="list__body" action="javascript:void(0);">
          <label id="widgetBg" class="form-item form-item--link" style="display:${showWidgetBg ? '' : 'none'}">
            <div class="form-label">
              <img class="form-label-img" src="${widgetBgIco}"/>
              <div class="form-label-title">组件背景</div>
            </div>
            <div class="form-label">
              <div id="bgType" class="form-item-right-desc">${this.bgType2Text(bgType)}</div>
              <i class="iconfont icon-arrow-right"></i>
            </div>
          </label>
        </form>
      </div>
      <!--通用设置-->  
      <div class="list" style="display:${!isChildLevel ? '' : 'none'}">
        <div class="list__header">通用设置</div>
        <form class="list__body" action="javascript:void(0);">
        <label id="use_github" class="form-item form-item--link" class="form-item form-item--link">
            <div class="form-label">
              <img class="form-label-img" src="${warehouseIco}"/>
              <div class="form-label-title">使用GitHub仓库</div>
            </div>
            <input name="use_github" type="checkbox" role="switch" />
          </label>
          <label id="notify" class="form-item form-item--link" class="form-item form-item--link">
            <div class="form-label">
              <img class="form-label-img" src="${notifyIco}"/>
              <div class="form-label-title">组件通知</div>
            </div>
            <input name="notify" type="checkbox" role="switch" />
          </label>
          <label id="location" class="form-item form-item--link" style="display:${needLocation ? '' : 'none'}">
            <div class="form-label">
              <img class="form-label-img" src="${locationIco}"/>
              <div class="form-label-title">自动定位</div>
            </div>
            <input name="location" type="checkbox" role="switch" />
          </label>
          <label id="refreshTime" class="form-item form-item--link">
            <div class="form-label">
              <img class="form-label-img" src="${refresIntervalIco}"/>
              <div class="form-label-title">刷新间隔</div>
            </div>
            <div class="form-label">
              <div id="refreshInterval" class="form-item-right-desc">${widgetSetting.refreshInterval} min</div>
              <i class="iconfont icon-arrow-right"></i>
            </div>
          </label>
          <label id="widgetUpdate" class="form-item form-item--link">
            <div class="form-label">
              <img class="form-label-img" src="${widgetUpdateIco}"/>
              <div class="form-label-title">组件更新</div>
            </div>
            <i class="iconfont icon-arrow-right"></i>
          </label>
          <label id="cleanData" class="form-item form-item--link">
            <div class="form-label">
              <img class="form-label-img" src="${cleanDataIco}"/>
              <div class="form-label-title">组件清理</div>
            </div>
            <i class="iconfont icon-arrow-right"></i>
          </label>
        </form>
      </div>
      <!--二级菜单-->
      <div id='sub_list' class="list" style="display:${isChildLevel ? '' : 'none'}">
      </div>
      <!--背景图-->
      <div id='previewBg' style="display:${showWidgetSettingBg ? '' : 'none'}">
        <div style="display: flex; justify-content: center; align-content: center; padding-left: 10px; padding-right: 10px;">
          <div style="flex-flow: column; margin-right: 20px;">
            <div style="text-align: center;">
              <img id='dayBg' width='${screenWidth * 0.43}' height='${dayBackgroundImage ? mediumWidgetHeight : 0}' style="object-fit: cover; border-radius: 12px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.22);"
                src="${showDayImg}" />
              <div id='previewDayBg' style="margin-top: 6px; font-size: 12; display:${dayBackgroundImage ? '' : 'none'}">浅色背景</div>
            </div>
          </div>
          <div style="flex-flow: column;">
            <div style="text-align: center;">
              <img id='darkBg' width='${screenWidth * 0.43}' height='${nightBackgroundImage ? mediumWidgetHeight : 0}' style="object-fit: cover; border-radius: 12px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.22);"
                src="${showNightImg}" />
              <div id='previewDarkBg' style="margin-top: 6px; font-size: 12; display:${nightBackgroundImage ? '' : 'none'}">深色背景</div>
            </div>
          </div>
        </div>
      </div>
      <footer style="display:${!isChildLevel ? '' : 'none'}">
        <div class="copyright"><div> </div><div>© 界面样式修改自 <a href="javascript:invoke('safari', 'https://www.imarkr.com');">@iMarkr.</a></div></div>
      </footer>
        <script>${js}</script>
      </body>
    </html>`;

    // 预览web
    await previewWebView.loadHTML(html, homePage);

    const injectListener = async () => {
      const event = await previewWebView.evaluateJavaScript(
        `(() => {
          try {
            const controller = new AbortController()
            const listener = (e) => {
              completion(e.detail)
              controller.abort()
            }
            window.addEventListener(
              'JBridge',
              listener,
              { signal: controller.signal }
            )
          } catch (e) {
              alert("预览界面出错：" + e);
              throw new Error("界面处理出错: " + e);
              return;
          }
        })()`, true).catch((err) => {
          console.error(err);
          this.dismissLoading(previewWebView);
        });
      ////////////////////////////////////
      let widgetSetting = this.readWidgetSetting();
      let {
        bgType = widgetProvider.defaultBgType ?? widgetSetting.bgType ?? this.defaultConfig.bgType,
        refreshInterval = this.defaultConfig.refreshInterval,
      } = widgetSetting;
      const { code, data } = event;
      switch (code) {
        case 'author':
          await this.presentSubscribeWidget();
          this.dismissLoading(previewWebView);
          break

        case 'widgetBg':
          try {
            const bgWebView = new WebView();
            let settingItems = [];
            const bgTypeIndex = await this.presentSheet({
              title: '组件背景设置',
              options: [
                { name: '透明背景' },
                { name: '在线图片' },
                { name: '相册图片' },
                { name: '纯色背景' },
                { name: '渐变背景' },
              ],
            });
            if (bgTypeIndex !== -1) {
              bgType = `${bgTypeIndex}`;
              if (bgTypeIndex == 0 || bgTypeIndex == 1 || bgTypeIndex == 2) {
                widgetSetting['picType'] = bgTypeIndex;
                widgetSetting['dayBackgroundImagePath'] = bgTypeIndex == 0 ? this.dayTransparentBgName() : (bgTypeIndex == 1 ? this.dayOnlineBgName() : this.dayLocalBgName());
                widgetSetting['nightBackgroundImagePath'] = bgTypeIndex == 0 ? this.nightTransparentBgName() : (bgTypeIndex == 1 ? this.nightOnlineBgName() : this.nightLocalBgName());
              }
              this.writeWidgetSetting({ ...widgetSetting, bgType });
              this.insertTextByElementId(previewWebView, 'bgType', this.bgType2Text(bgType));
            }
            switch (bgTypeIndex) {
              case 0: // 透明背景
                settingItems = [
                  {
                    items: [
                      {
                        name: 'bgDayImg',
                        label: '浅色背景',
                        type: 'cell',
                        icon: { name: 'photo', color: '#11c4d4', },
                        needLoading: false,
                        default: this.useFileManager().readImgCache(this.dayTransparentBgName()) ? '已设置' : ''
                      },
                      {
                        name: 'bgNightImg',
                        label: '深色背景',
                        type: 'cell',
                        icon: { name: 'photo.fill', color: '#0c81e4', },
                        needLoading: false,
                        default: this.useFileManager().readImgCache(this.nightTransparentBgName()) ? '已设置' : ''
                      },
                    ]
                  }
                ];
                break;

              case 1: // 在线图片
                settingItems = [
                  {
                    items: [
                      {
                        name: 'bgDayImg',
                        label: '浅色背景',
                        type: 'cell',
                        icon: { name: 'photo', color: '#11c4d4', },
                        needLoading: false,
                        default: widgetSetting.dayBackgroundImageUrl ? '已设置' : ''
                      },
                      {
                        name: 'bgNightImg',
                        label: '深色背景',
                        type: 'cell',
                        icon: { name: 'photo.fill', color: '#0c81e4', },
                        needLoading: false,
                        default: widgetSetting.nightBackgroundImageUrl ? '已设置' : ''
                      },
                    ]
                  },
                  {
                    items: [
                      {
                        name: 'blurBg',
                        label: '高斯模糊',
                        type: 'switch',
                        icon: { name: 'rectangle.on.rectangle', color: '#938BF0', },
                        needLoading: false,
                        default: false
                      },
                      {
                        name: 'blurMode',
                        label: '模糊效果',
                        type: 'select',
                        icon: { name: 'rectangle.fill.on.rectangle.fill', color: '#6A63B8', },
                        needLoading: false,
                        options: [
                          { label: '浅色模糊', value: 'light' },
                          { label: '深色模糊', value: 'dark' },
                          { label: '完全模糊', value: 'none' },
                        ],
                        default: "none"
                      },
                      {
                        name: 'blurRadius',
                        label: '模糊强度',
                        type: 'number',
                        icon: { name: 'plus.rectangle.on.rectangle', color: '#FF59A1', },
                        needLoading: false,
                        default: '50',
                      },
                    ]
                  },
                  {
                    items: [
                      {
                        name: 'shadow',
                        label: '颜色蒙层',
                        type: 'switch',
                        icon: { name: 'rectangle.grid.1x2', color: '#938BF0', },
                        needLoading: false,
                        default: false
                      },
                      {
                        name: 'shadowColor',
                        label: '蒙层颜色',
                        type: 'color',
                        icon: { name: 'rectangle.grid.1x2.fill', color: '#6A63B8', },
                        needLoading: false,
                        default: "#000000"
                      },
                      {
                        name: 'shadowAlpha',
                        label: '蒙层透明度',
                        type: 'number',
                        icon: { name: 'capsule', color: '#FF59A1', },
                        needLoading: false,
                        default: '0.5',
                      },
                    ]
                  }
                ];
                break;

              case 2: // 相册图片
                settingItems = [
                  {
                    items: [
                      {
                        name: 'bgDayImg',
                        label: '浅色背景',
                        type: 'cell',
                        icon: { name: 'photo', color: '#11c4d4', },
                        needLoading: false,
                        default: this.useFileManager().readImgCache(this.dayLocalBgName()) ? '已设置' : ''
                      },
                      {
                        name: 'bgNightImg',
                        label: '深色背景',
                        type: 'cell',
                        icon: { name: 'photo.fill', color: '#0c81e4', },
                        needLoading: false,
                        default: this.useFileManager().readImgCache(this.nightLocalBgName()) ? '已设置' : ''
                      },
                    ]
                  },
                  {
                    items: [
                      {
                        name: 'localBlurBg',
                        label: '高斯模糊',
                        type: 'switch',
                        icon: { name: 'rectangle.on.rectangle', color: '#938BF0', },
                        needLoading: false,
                        default: false
                      },
                      {
                        name: 'localBlurMode',
                        label: '模糊效果',
                        type: 'select',
                        icon: { name: 'rectangle.fill.on.rectangle.fill', color: '#6A63B8', },
                        needLoading: false,
                        options: [
                          { label: '浅色模糊', value: 'light' },
                          { label: '深色模糊', value: 'dark' },
                          { label: '完全模糊', value: 'none' },
                        ],
                        default: 'none'
                      },
                      {
                        name: 'localBlurRadius',
                        label: '模糊强度',
                        type: 'number',
                        icon: { name: 'plus.rectangle.on.rectangle', color: '#FF59A1', },
                        needLoading: false,
                        default: '50',
                      },
                    ]
                  },
                  {
                    items: [
                      {
                        name: 'localShadow',
                        label: '颜色蒙层',
                        type: 'switch',
                        icon: { name: 'rectangle.grid.1x2', color: '#938BF0', },
                        needLoading: false,
                        default: false
                      },
                      {
                        name: 'localShadowColor',
                        label: '蒙层颜色',
                        type: 'color',
                        icon: { name: 'rectangle.grid.1x2.fill', color: '#6A63B8', },
                        needLoading: false,
                        default: "#000000"
                      },
                      {
                        name: 'localShadowAlpha',
                        label: '蒙层透明度',
                        type: 'number',
                        icon: { name: 'capsule', color: '#FF59A1', },
                        needLoading: false,
                        default: '0.5',
                      },
                    ]
                  }
                ];
                break;

              case 3: // 纯色背景
                settingItems = [
                  {
                    items: [
                      {
                        name: 'bgDayColor',
                        label: '浅色背景色',
                        type: 'color',
                        icon: { name: 'sun.max', color: '#11c4d4', },
                        needLoading: false,
                        default: this.splitColors(this.backgroundColor)[0],
                      },
                      {
                        name: 'bgNightColor',
                        label: '深色背景色',
                        type: 'color',
                        icon: { name: 'moon.stars', color: '#0c81e4', },
                        needLoading: false,
                        default: this.splitColors(this.backgroundColor)[1],
                      },
                    ]
                  }
                ];
                break;

              case 4: // 渐变背景
                settingItems = [
                  {
                    items: [
                      {
                        name: 'gradientAngle',
                        label: '渐变角度',
                        type: 'number',
                        icon: { name: 'square.stack', color: '#E33049', },
                        needLoading: false,
                        default: `${this.backgroundGradientAngle}`,
                      },
                      {
                        name: 'startColor',
                        label: '开始背景色',
                        type: 'color',
                        icon: { name: 'play.circle', color: '#11c4d4', },
                        needLoading: false,
                        default: this.splitColors(this.backgroundGradientColor)[0],
                      },
                      {
                        name: 'endColor',
                        label: '结束背景色',
                        type: 'color',
                        icon: { name: 'pause.circle', color: '#0c81e4', },
                        needLoading: false,
                        default: this.splitColors(this.backgroundGradientColor)[1],
                      },
                    ]
                  }
                ];
                break;
            }

            if (settingItems.length > 0) {
              // 预览
              await this.renderAppView({
                isChildLevel: true,
                showWidgetBg: false,
                showWidgetSettingBg: bgTypeIndex == 0 || bgTypeIndex == 1 || bgTypeIndex == 2,
                settingItems,
                onItemClick: async (item) => {
                  switch (item.name) {
                    case 'bgDayImg':
                      widgetSetting = this.readWidgetSetting();
                      if (bgTypeIndex == 0) {
                        const result = await this.transparentBg(true);
                        if (result) {
                          const backgroundImage = this.useFileManager().readImgCache(this.dayTransparentBgName());
                          if (backgroundImage) {
                            widgetSetting['picType'] = 0;
                            widgetSetting['dayBackgroundImagePath'] = this.dayTransparentBgName();
                            this.writeWidgetSetting({ ...widgetSetting });
                            this.insertTextByElementId(bgWebView, item.name, '已设置');
                            // 
                            bgWebView.evaluateJavaScript(
                              `
                                document.getElementById("previewBg").style.display = "";
                                document.getElementById("previewDayBg").style.display = "";
                                document.getElementById("dayBg").height = ${this.getWidgetSize('中号').height / 2};
                                document.getElementById("dayBg").src="data:image/png;base64,${Data.fromPNG(backgroundImage).toBase64String()}";
                              `,
                              false
                            );
                          }
                        }
                      } else if (bgTypeIndex == 1) {
                        await this.generateInputAlert({
                          title: '在线白天图片背景',
                          message: '填入图片链接设置为组件背景图\n系统自动裁剪中间部分图片使用',
                          options: [{ hint: '🔗 请输入图片链接', value: '' }]
                        }, async (inputArr) => {
                          const imgUrl = inputArr[0].value;
                          // 保存配置
                          widgetSetting['picType'] = 1;
                          widgetSetting['dayBackgroundImageUrl'] = imgUrl;
                          widgetSetting['dayBackgroundImagePath'] = this.dayOnlineBgName();
                          this.writeWidgetSetting({ ...widgetSetting });
                          this.insertTextByElementId(bgWebView, item.name, '已设置');
                          bgWebView.evaluateJavaScript(
                            `
                              document.getElementById("previewBg").style.display = "";
                              document.getElementById("previewDayBg").style.display = "";
                              document.getElementById("dayBg").height = ${this.getWidgetSize('中号').height / 2};
                              document.getElementById("dayBg").src="${imgUrl}";
                            `,
                            false
                          );
                        });
                      } else if (bgTypeIndex == 2) {
                        let backgroundImage = await Photos.fromLibrary();
                        if (backgroundImage) {
                          this.useFileManager().writeImgCache(this.dayLocalBgName(), backgroundImage);
                          // 保存配置
                          widgetSetting['picType'] = 2;
                          widgetSetting['dayBackgroundImagePath'] = this.dayLocalBgName();
                          this.writeWidgetSetting({ ...widgetSetting });
                          this.insertTextByElementId(bgWebView, item.name, '已设置');
                          bgWebView.evaluateJavaScript(
                            `
                              document.getElementById("previewBg").style.display = "";
                              document.getElementById("previewDayBg").style.display = "";
                              document.getElementById("dayBg").height = ${this.getWidgetSize('中号').height / 2};
                              document.getElementById("dayBg").src="data:image/png;base64,${Data.fromPNG(backgroundImage).toBase64String()}";
                            `,
                            false
                          );
                        }
                      }
                      break;

                    case 'bgNightImg':
                      widgetSetting = this.readWidgetSetting();
                      if (bgTypeIndex == 0) {
                        const result = await this.transparentBg(false);
                        if (result) {
                          const backgroundImage = this.useFileManager().readImgCache(this.nightTransparentBgName());
                          if (backgroundImage) {
                            widgetSetting['picType'] = 0;
                            widgetSetting['nightBackgroundImagePath'] = this.nightTransparentBgName();
                            this.writeWidgetSetting({ ...widgetSetting });
                            this.insertTextByElementId(bgWebView, item.name, '已设置');
                            // 
                            bgWebView.evaluateJavaScript(
                              `
                                document.getElementById("previewBg").style.display = "";
                                document.getElementById("previewDarkBg").style.display = "";
                                document.getElementById("darkBg").height = ${this.getWidgetSize('中号').height / 2};
                                document.getElementById("darkBg").src="data:image/png;base64,${Data.fromPNG(backgroundImage).toBase64String()}";
                              `,
                              false
                            );
                          }
                        }
                      } else if (bgTypeIndex == 1) {
                        await this.generateInputAlert({
                          title: '在线深色图片背景',
                          message: '填入图片链接设置为组件背景图\n系统自动裁剪中间部分图片使用',
                          options: [{ hint: '🔗 请输入图片链接', value: '' }]
                        }, async (inputArr) => {
                          const imgUrl = inputArr[0].value;
                          // 保存配置
                          widgetSetting['picType'] = 1;
                          widgetSetting['nightBackgroundImageUrl'] = imgUrl;
                          widgetSetting['nightBackgroundImagePath'] = this.nightOnlineBgName();
                          this.writeWidgetSetting({ ...widgetSetting });
                          this.insertTextByElementId(bgWebView, item.name, '已设置');
                          bgWebView.evaluateJavaScript(
                            `
                              document.getElementById("previewBg").style.display = "";
                              document.getElementById("previewDarkBg").style.display = "";
                              document.getElementById("darkBg").height = ${this.getWidgetSize('中号').height / 2};
                              document.getElementById("darkBg").src="${imgUrl}";
                            `,
                            false
                          );
                        });
                      } else if (bgTypeIndex == 2) {
                        let backgroundImage = await Photos.fromLibrary();
                        if (backgroundImage) {
                          this.useFileManager().writeImgCache(this.nightLocalBgName(), backgroundImage);
                          // 保存配置
                          widgetSetting['picType'] = 2;
                          widgetSetting['nightBackgroundImagePath'] = this.nightLocalBgName();
                          this.writeWidgetSetting({ ...widgetSetting });
                          this.insertTextByElementId(bgWebView, item.name, '已设置');
                          bgWebView.evaluateJavaScript(
                            `
                              document.getElementById("previewBg").style.display = "";
                              document.getElementById("previewDarkBg").style.display = "";
                              document.getElementById("darkBg").height = ${this.getWidgetSize('中号').height / 2};
                              document.getElementById("darkBg").src="data:image/png;base64,${Data.fromPNG(backgroundImage).toBase64String()}";
                            `,
                            false
                          );
                        }
                      }
                      break;
                  }
                }
              }, bgWebView);
            }
            this.dismissLoading(previewWebView);
          } catch (error) {
            console.error(error);
          }
          break

        case 'refreshInterval':
          await this.generateInputAlert({
            title: '刷新间隔',
            message: '设置小组件刷新的时间间距(单位:分钟)\n系统不一定会按照这个时间进行刷新\n该时间内网络请求数据读取缓存反显',
            options: [
              { hint: '⏰ 请输入时间数字', value: refreshInterval },
            ]
          }, async (inputArr) => {
            refreshInterval = inputArr[0].value;
            // 保存配置
            widgetSetting = this.readWidgetSetting();
            widgetSetting.refreshInterval = refreshInterval;
            this.logDivider();
            await this.generateAlert('刷新间隔', '已成功设置组件刷新时间间距', ['确定']);
          });
          // 写入配置缓存
          this.writeWidgetSetting({ ...widgetSetting });
          this.insertTextByElementId(previewWebView, 'refreshInterval', `${refreshInterval} min`);
          break

        case 'widgetUpdate':
          await this.downloadUpdate(
            this.scriptName,
            `${this.getRemoteRootPath()}/${encodeURIComponent(this.scriptName)}.js`
          );
          this.dismissLoading(previewWebView);
          break

        case 'cleanData':
          let res = await this.generateAlert('组件清理', '', ['重置组件', '清理缓存'], '取消');
          if (res != -1) {
            this.removeWidgetSetting(res != 0);
            await this.generateAlert('组件清理', '清理成功\n请重新运行小组件', ['确定']);
            this.rerunWidget();
          }
          break

        case 'preview': {
          widgetSetting = this.readWidgetSetting();
          const widget = await this.render({ widgetSetting, family: data });
          await this.widgetBaseSetting(widget, widgetSetting, bgType);
          // 结束loading
          this.dismissLoading(previewWebView);
          // 预览
          widget[`present${data.replace(data[0], data[0].toUpperCase())}`]();
          break
        }

        case 'safari':
          Safari.openInApp(data, false);
          break

        case 'changeSettings':
          widgetSetting = this.readWidgetSetting();
          if (data.location == false) {
            await this.generateInputAlert({
              title: '定位信息',
              message: '关闭自动定位需要自己输入定位信息',
              options: [
                { hint: '请输入经度', value: '' },
                { hint: '请输入维度', value: '' },
              ]
            }, async (inputArr) => {
              widgetSetting.longitude = inputArr[0].value;
              widgetSetting.latitude = inputArr[1].value;
            });
          }
          this.keySave(this.scriptName, `${data.use_github}`);
          this.writeWidgetSetting({ ...widgetSetting, ...data });
          await onCheckedChange?.(data, widgetSetting);
          break

        case 'itemClick':
          widgetSetting = this.readWidgetSetting();
          const { name, showDesc = true, alert, childItems = [] } = data;
          if (childItems.length > 0) {
            await this.renderAppView({
              isChildLevel: true,
              showWidgetBg: false,
              settingItems: childItems,
              onCheckedChange,
              onItemClick,
            });
          } else {
            if (alert) {
              const { title = '', message, options = [] } = alert;
              await this.generateInputAlert({
                title,
                message,
                options
              }, (inputArr) => {
                inputArr.forEach((input, index) => {
                  let value = input.value
                  if (value && value != 'null' && value.length > 0) {
                    let { key } = options[index];
                    widgetSetting[key] = value;
                  }
                });
                this.writeWidgetSetting({ ...widgetSetting });
                if (options.length == 1 && showDesc) {
                  this.insertTextByElementId(previewWebView, name, inputArr[0].value);
                }
              });
            }
            ////////////////////////////////////////////////
            const callbackRes = await onItemClick?.(data);
            const { desc, reStart = false } = callbackRes || {};
            if (reStart) {
              rerunWidget();
              return
            }
            if (desc?.value) {
              this.insertTextByElementId(previewWebView, name, desc?.value);
            }
          }
          this.dismissLoading(previewWebView);
          break
      }
      injectListener();
    };

    injectListener().catch((e) => {
      console.error(e);
      if (!config.runsInApp) {
        this.notify('主界面', `🚫 ${e}`);
      }
    });

    previewWebView.present();
  }

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  provideDefaultWidget = (family) => {
    //====================================
    const widget = new ListWidget();
    widget.setPadding(0, 0, 0, 0);
    //====================================
    let stack = widget.addStack();
    let tipsTextSpan = stack.addText(`暂不提供『${family}』组件`);
    tipsTextSpan.textColor = Color.black();
    let fontSize = 12;
    if (family != 'small') {
      fontSize = 22
    }
    tipsTextSpan.font = Font.semiboldSystemFont(fontSize);
    tipsTextSpan.shadowColor = new Color('#333');
    tipsTextSpan.shadowRadius = 2;
    tipsTextSpan.shadowOffset = new Point(1, 1);
    stack.centerAlignContent();
    //====================================
    return widget;
  }

  async providerWidget(widgetProvider = {}, family = config.widgetFamily) {
    let widget;
    const widgetSetting = this.readWidgetSetting();
    const { small = true, medium = true, large = true } = widgetProvider;
    switch (family) {
      case 'small':
        if (small) {
          widget = await this.render({ widgetSetting, family });
        } else {
          widget = this.provideDefaultWidget(family);
        }
        break;

      case 'medium':
        if (medium) {
          widget = await this.render({ widgetSetting, family });
        } else {
          widget = this.provideDefaultWidget(family);
        }
        break;

      case 'large':
        if (large) {
          widget = await this.render({ widgetSetting, family });
        } else {
          widget = this.provideDefaultWidget(family);
        }
        break;

      default:
        widget = this.provideDefaultWidget(family);
        break;
    }
    await this.widgetBaseSetting(widget, widgetSetting, widgetSetting.bgType);
    Script.setWidget(widget);
    Script.complete();
  }

  widgetBaseSetting = async (widget, widgetSetting, bgType) => {
    try {
      // 背景效果
      const {
        refreshInterval,
        picType = 0,
        blurBg, blurMode, blurRadius, shadow, shadowColor, shadowAlpha,
        localBlurBg, localBlurMode, localBlurRadius, localShadow, localShadowColor, localShadowAlpha,
        dayBackgroundImageUrl,
        nightBackgroundImageUrl,
        dayBackgroundImagePath,
        nightBackgroundImagePath,
        bgDayColor,
        bgNightColor,
        gradientAngle,
        startColor,
        endColor,
      } = widgetSetting;
      let bgImg;
      let dayBackgroundImagePathTmp = '';
      let nightBackgroundImagePathTmp = '';
      switch (bgType) {
        case '0':
        case '1':
        case '2':
          if (picType == 1) {
            if (dayBackgroundImageUrl) {
              let dayBgImg = await this.getImageByUrl(dayBackgroundImageUrl);
              if (blurBg) {
                dayBgImg = await this.blurImage(dayBgImg, { w: dayBgImg.size.width, h: dayBgImg.size.height, x: 0, y: 0 }, blurMode, blurRadius);
              }
              if (shadow) {
                let alpha = Number(shadowAlpha);
                alpha = Math.min(1, alpha);
                alpha = Math.max(0, alpha);
                dayBgImg = await this.loadShadowColor2Image(dayBgImg, new Color(shadowColor, alpha));
              }
              this.useFileManager().writeImgCache(this.dayOnlineBgName(), dayBgImg);
            }
            if (nightBackgroundImageUrl) {
              let nightBgImg = await this.getImageByUrl(nightBackgroundImageUrl);
              if (blurBg) {
                nightBgImg = await this.blurImage(nightBgImg, { w: nightBgImg.size.width, h: nightBgImg.size.height, x: 0, y: 0 }, blurMode, blurRadius);
              }
              if (shadow) {
                let alpha = Number(shadowAlpha);
                alpha = Math.min(1, alpha);
                alpha = Math.max(0, alpha);
                nightBgImg = await this.loadShadowColor2Image(nightBgImg, new Color(shadowColor, alpha));
              }
              this.useFileManager().writeImgCache(this.nightOnlineBgName(), nightBgImg);
            }
          } else if (picType == 2) {
            if (dayBackgroundImagePath && !Device.isUsingDarkAppearance()) {
              dayBackgroundImagePathTmp = this.dayLocalBgName();
              let dayBgImg = this.useFileManager().readImgCache(dayBackgroundImagePath);
              if (localBlurBg) {
                dayBgImg = await this.blurImage(dayBgImg, { w: dayBgImg.size.width, h: dayBgImg.size.height, x: 0, y: 0 }, localBlurMode, localBlurRadius);
                dayBackgroundImagePathTmp = dayBackgroundImagePathTmp + "_blur";
              }
              if (localShadow) {
                let alpha = Number(localShadowAlpha);
                alpha = Math.min(1, alpha);
                alpha = Math.max(0, alpha);
                dayBgImg = await this.loadShadowColor2Image(dayBgImg, new Color(localShadowColor, alpha));
                dayBackgroundImagePathTmp = dayBackgroundImagePathTmp + "_shadow";
              }
              if (dayBgImg) {
                this.useFileManager().writeImgCache(dayBackgroundImagePathTmp, dayBgImg);
              }
            }
            if (nightBackgroundImagePath && Device.isUsingDarkAppearance()) {
              nightBackgroundImagePathTmp = this.nightLocalBgName();
              let nightBgImg = this.useFileManager().readImgCache(nightBackgroundImagePath);
              if (localBlurBg) {
                nightBgImg = await this.blurImage(nightBgImg, { w: nightBgImg.size.width, h: nightBgImg.size.height, x: 0, y: 0 }, localBlurMode, localBlurRadius);
                nightBackgroundImagePathTmp = nightBackgroundImagePathTmp + "_blur";
              }
              if (localShadow) {
                let alpha = Number(localShadowAlpha);
                alpha = Math.min(1, alpha);
                alpha = Math.max(0, alpha);
                nightBgImg = await this.loadShadowColor2Image(nightBgImg, new Color(localShadowColor, alpha));
                nightBackgroundImagePathTmp = nightBackgroundImagePathTmp + "_shadow";
              }
              if (nightBgImg) {
                this.useFileManager().writeImgCache(nightBackgroundImagePathTmp, nightBgImg);
              }
            }
          }
          const dayBackgroundImage = this.useFileManager().readImgCache(dayBackgroundImagePathTmp || dayBackgroundImagePath);
          const nightBackgroundImage = this.useFileManager().readImgCache(nightBackgroundImagePathTmp || nightBackgroundImagePath);
          bgImg = Device.isUsingDarkAppearance() ? (nightBackgroundImage || dayBackgroundImage) : (dayBackgroundImage || nightBackgroundImage);
          if (bgImg) {
            widget.backgroundImage = bgImg;
          }
          break;

        case '3':
          let pureColors = this.splitColors(this.backgroundColor);
          if (bgDayColor && bgNightColor) {
            widget.backgroundColor = Color.dynamic(new Color(bgDayColor), new Color(bgNightColor));
          } else {
            widget.backgroundColor = Color.dynamic(new Color(pureColors[0]), new Color(pureColors[1]));
          }
          break;

        case '4':
          let gradientColors = this.splitColors(this.backgroundGradientColor);
          if (startColor && endColor) {
            gradientColors = [startColor, endColor];
          }
          widget.backgroundGradient = this.getLinearGradientColor(gradientColors, gradientAngle || this.backgroundGradientAngle);
          break;
      }
      // 设置刷新间隔
      widget.refreshAfterDate = new Date(Number(refreshInterval) * 60 * 1000);
      let msg = `${this.bgType2Text(bgType)}，刷新间隔：${refreshInterval}min`
      // 日志
      console.log(`🪢🪢🪢 ${msg} 🪢🪢🪢`);
      this.logDivider();
    } catch (error) {
      console.error(error);
    }
  }

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  fetchEnv = async () => {
    const dependencyURL = `${this.getRemoteRootPath()}/_LSP.js`;
    const { fm, rootDir } = this.useFileManager({ useICloud: false });
    // 下载
    console.log('🤖 开始更新依赖~');
    this.logDivider();
    let updateResult = false;
    const req = new Request(dependencyURL);
    const moduleJs = await req.load();
    if (moduleJs) {
      updateResult = true;
      fm.write(fm.joinPath(rootDir, '/_LSP.js'), moduleJs);
      console.log('✅ LSP远程依赖环境更新成功！');
      this.logDivider();
    } else {
      console.error('🚫 获取依赖环境脚本失败，请重试！');
      this.logDivider();
    }
    return updateResult;
  }

  downloadUpdate = async (fileName, downloadURL) => {
    let result = await this.fetchEnv();
    if (result) {
      try {
        result = await this.downloadFile2Scriptable({
          moduleName: fileName,
          url: downloadURL,
        });
        if (result) {
          await this.generateAlert('✅ 组件更新', '已同步远程更新', ["重新运行"]);
          this.rerunWidget();
        } else {
          console.error("❌ 组件更新失败，请重试~");
          this.logDivider();
        }
      } catch (error) {
        console.error("❌ 组件更新失败，" + error);
        await this.generateAlert('❌ 组件更新', '更新失败，请稍后重试', ["好的"]);
        this.logDivider();
      }
    }
  }

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  renderWidgetTableList = async (data) => {
    // 背景色
    const bgColor = Color.dynamic(
      new Color('#F6F6F6'),
      new Color('#000000')
    );
    const table = new UITable();
    table.showSeparators = true;

    // ===================================
    const topRow = new UITableRow();
    topRow.height = 80 * Device.screenScale();
    const topCell = topRow.addImageAtURL(atob('aHR0cHM6Ly9zd2VpeGluZmlsZS5oaXNlbnNlLmNvbS9tZWRpYS9NMDAvNzEvQzgvQ2g0RnlXT0k2b0NBZjRQMUFFZ0trSzZxVVVrNTQyLmdpZg=='));
    topCell.centerAligned();
    table.addRow(topRow);
    topRow.backgroundColor = bgColor;

    // ===================================
    const { scriptURL } = data;
    const response = await this.httpGet(scriptURL, { jsonFormat: true });
    const { author, icon, apps } = response;
    const headerRow = new UITableRow();
    headerRow.isHeader = true;
    headerRow.height = 60;
    headerRow.cellSpacing = 10;
    // -----------------------------------
    let avatarImg = headerRow.addImageAtURL(icon);
    avatarImg.leftAligned();
    avatarImg.widthWeight = 130;
    const headText = headerRow.addText(`@${author}`, '先打开Scriptable通知权限再点击下载安装');
    headText.titleFont = Font.semiboldSystemFont(15);
    headText.titleColor = new Color('#666');
    headText.widthWeight = 870;
    headText.leftAligned();
    // -----------------------------------
    table.addRow(headerRow);
    // -----------------------------------

    // ===================================
    const titleDividerRow = new UITableRow();
    titleDividerRow.height = 10;
    table.addRow(titleDividerRow);
    titleDividerRow.backgroundColor = bgColor;

    // ===================================
    apps.forEach((item, index) => {
      let { title, description, thumb } = item;
      const itemRow = new UITableRow();
      itemRow.height = 80;
      itemRow.cellSpacing = 30;
      // -----------------------------------
      let itemText = itemRow.addText(`${index + 1}. ${title}`);
      itemText.titleFont = Font.blackSystemFont(14);
      itemText.titleColor = new Color('#444');
      itemText.leftAligned();
      itemText.widthWeight = 300;
      // -----------------------------------
      let itemDescText = itemRow.addText(`${description}`);
      itemDescText.titleFont = Font.mediumSystemFont(13);
      itemDescText.titleColor = new Color('#666');
      itemDescText.leftAligned();
      itemDescText.widthWeight = 470;
      // -----------------------------------
      let itemImg = itemRow.addImageAtURL(thumb);
      itemImg.widthWeight = 230;
      itemImg.rightAligned();
      // -----------------------------------
      itemRow.dismissOnSelect = false;
      itemRow.onSelect = async () => {
        await this.realNotify("下载提示", `开始下载小组件『${item.title}』`);
        if (item.depend) {
          try {
            for (let index = 0; index < item.depend.length; index++) {
              const relyItem = item.depend[index];
              const _isWrite = await this.downloadFile2Scriptable({
                moduleName: relyItem.name,
                url: relyItem.scriptURL,
              });
              if (_isWrite) {
                await this.realNotify("下载提示", `依赖插件：『${relyItem.name}』下载/更新成功`);
              }
            }
          } catch (e) {
            console.error(e);
          }
        }
        const isWrite = await this.downloadFile2Scriptable({
          moduleName: item.name,
          url: item.scriptURL,
        });
        if (isWrite) {
          await this.realNotify("下载提示", `小组件：『${item.title}』 下载/更新成功`, `scriptable:///run/${encodeURIComponent(item.name)}`);
        }
      };
      // -----------------------------------
      table.addRow(itemRow);
    });
    //
    QuickLook.present(table, false);
  }

  presentSubscribeWidget = async () => {
    const cacheKey = `${this.scriptName}_subscribe_list`;
    // 默认订阅列表
    const defaultSubscribeList = [{
      author: 'LSP-杂货万事屋',
      scriptURL: `${this.getRemoteRootPath()}/install/package.json`
    }]
    const subscribeList = JSON.parse(this.keyGet(cacheKey, JSON.stringify(defaultSubscribeList)));
    // 弹窗
    const mainAlert = new Alert();
    mainAlert.title = "小组件订阅列表";
    mainAlert.message = "可自行添加订阅地址";
    const _actions = [];
    subscribeList.forEach((data) => {
      const { author } = data;
      mainAlert.addAction(author);
      _actions.push(async () => {
        try {
          await this.renderWidgetTableList(data);
        } catch (error) {
          console.error(error);
        }
      });
    });
    _actions.push(async () => {
      await this.generateInputAlert({
        title: '订阅地址',
        options: [
          { hint: '🔗 请输入订阅地址', value: `${this.getRemoteRootPath()}/install/package.json` },
        ]
      }, async (inputArr) => {
        const scriptURL = inputArr[0].value;
        try {
          const response = await new Request(scriptURL).loadJSON();
          const newList = [];
          let notifyText = '';
          let needPush = true;
          for (let item of subscribeList) {
            if (response.author === item.author) {
              needPush = false;
              notifyText = '订阅源更新成功';
              newList.push({ author: response.author, scriptURL });
            } else {
              notifyText = '订阅源添加成功';
              newList.push(item);
            }
          }
          if (needPush) newList.push({ author: response.author, scriptURL });
          this.keySave(cacheKey, JSON.stringify(newList));
          notifyText ? await this.notify('小组件订阅', notifyText) : null;
          await this.presentSubscribeWidget();
        } catch (error) {
          await this.notify('订阅出错', '订阅源格式不符合要求~')
          console.error(error);
        }
      })
    });
    _actions.push(async () => {
      this.keySave(cacheKey, JSON.stringify(defaultSubscribeList));
      await this.notify('小组件订阅', '订阅源重置成功');
      await this.presentSubscribeWidget();
    });
    mainAlert.addDestructiveAction("添加订阅");
    mainAlert.addDestructiveAction("重置订阅源");
    mainAlert.addCancelAction("取消操作");
    const _actionsIndex = await mainAlert.presentSheet();
    if (_actions[_actionsIndex]) {
      await _actions[_actionsIndex]();
    }
  }
}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

class CustomFont {
  constructor(webview, config) {
    this.webview = webview || new WebView()
    this.fontFamily = config.fontFamily || 'customFont'
    this.fontUrl = 'url(' + config.fontUrl + ')'
    this.timeout = config.timeout || 20000
  }

  async load() { // 加载字体
    return await this.webview.evaluateJavaScript(`
        const customFont = new FontFace("${this.fontFamily}", "${this.fontUrl}");
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        let baseHeight,extendHeight;
        log('🚀 开始加载自定义字体.');
        customFont.load().then((font) => {
            document.fonts.add(font);
            completion(true);
            log('✅ 自定义字体加载成功.');
            log('----------------------------------------')
        });
        setTimeout(()=>{
            log('🚫 自定义字体加载超时');
            log('----------------------------------------')
            completion(false);
        },${this.timeout});
        null`, true)
  }

  async drawText(text, config) {
    try {
      // 配置
      const fontSize = config.fontSize || 20
      const textWidth = config.textWidth || 300
      const align = config.align || 'left' // left、right、center
      const lineLimit = config.lineLimit || 99
      const rowSpacing = config.rowSpacing || 0
      const textColor = config.textColor || 'white'
      const textArray = await this.cutText(text, fontSize, textWidth)
      const scale = config.scale || 1

      let script = ''
      for (let i in textArray) {
        let content = textArray[i].str
        let length = textArray[i].len

        if (i >= lineLimit) break
        if (i == lineLimit - 1 && i < textArray.length - 1)
          content = content.replace(/(.{1})$/, '…')

        let x = 0, y = Number(i) * fontSize
        if (rowSpacing > 0 && i > 0) y = y + rowSpacing
        if (i > 0) {
          if (align === 'right') {
            x = textWidth - length
          } else if (align === 'center') {
            x = (textWidth - length) / 2
          }
        }
        script = script + `ctx.fillText("${content}", ${x}, ${y});`
      }

      const realWidth = textArray.length > 1 ? textWidth : textArray[0].len
      const lineCount = lineLimit < textArray.length ? lineLimit : textArray.length
      const returnValue = await this.webview.evaluateJavaScript(`
            canvas.width=${realWidth}*${scale};
            ctx.font = "${fontSize}px ${this.fontFamily}";
            ctx.textBaseline= "hanging";
            baseHeight= ${(fontSize + rowSpacing) * (lineCount - 1)};
            extendHeight= ctx.measureText('qypgj').actualBoundingBoxDescent;
            canvas.height= (baseHeight + extendHeight)*${scale};
            ctx.scale(${scale}, ${scale});
        
            ctx.font = "${fontSize}px ${this.fontFamily}";
            ctx.fillStyle = "${textColor}";
            ctx.textBaseline= "hanging";
            ${script}
            canvas.toDataURL()`, false)

      const imageDataString = returnValue.slice(22)
      const imageData = Data.fromBase64String(imageDataString)
      return Image.fromData(imageData)
    } catch (error) {
      console.error(error);
    }
  }

  async cutText(text, fontSize, textWidth) { // 处理文本
    try {
      return await this.webview.evaluateJavaScript(`
            function cutText(textWidth, text){
                ctx.font = "${fontSize}px ${this.fontFamily}";
                ctx.textBaseline= "hanging";
        
                let textArray=[];
                let len=0,str='';
                for(let i=0;i<text.length;i++){
                    const char=text[i]
                    const width=ctx.measureText(char).width;
                    if(len < textWidth){
                        str=str+char;
                        len=len+width;
                    }
                    if(len == textWidth){
                        textArray.push({str:str,len:len,});
                        str='';len=0;
                    }
                    if(len > textWidth){
                        textArray.push({
                        str:str.substring(0,str.length-1),
                        len:len-width,});
                        str=char;len=width;
                    }
                    if(i==text.length-1 && str){
                        textArray.push({str:str,len:len,});
                    }
                }
                return textArray
            }
            cutText(${textWidth},"${text}")
        `)
    } catch (error) {
      console.error(error);
    }
  }
}

//================================
module.exports = {
  BaseWidget,
}
//================================