// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: gray; icon-glyph: user-astronaut;
/**
 * 公众号：杂货万事屋
 * Desc：集合了一些网上各位大神的代码，修改自用，侵权请联系公众号删除
 * Author：LSP
*/

// 当前环境版本号
const VERSION = 20230324
// 组件配置文件名
const settingConfigName = 'settings.json';
// 分支
const branch = 'master';
// 仓库根目录
const remoteRoot = `https://gitcode.net/enoyee/scriptable/-/raw/${branch}`;

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
class BaseWidget {

  // 组件默认配置
  defaultConfig = {
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
    //=====================
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
    const widgetSetting = await this.readWidgetSetting();
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
      this.useFileManager().writeImgCache('customFont', image);
      return image;
    } catch (error) {
      console.error(error);
      let cache = this.useFileManager().readImgCache('customFont');
      if (cache != undefined && cache != null) {
        return cache;
      }
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
      const url = "https://wannianrili.51240.com/";
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
      authorAvatar = `${remoteRoot}/img/ic_pikachu_4.png`,
      authorName = '杂货万事屋',
      authorDesc = '点击查看/添加Scriptable小组件订阅',
      homePage = remoteRoot,
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
    const showDayImg = dayBackgroundImage ? `data:image/png;base64,${Data.fromPNG(dayBackgroundImage).toBase64String()}` : `${remoteRoot}/img/bg_placeholder.png`;
    const showNightImg = nightBackgroundImage ? `data:image/png;base64,${Data.fromPNG(nightBackgroundImage).toBase64String()}` : `${remoteRoot}/img/bg_placeholder.png`;
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
            `${remoteRoot}/${encodeURIComponent(this.scriptName)}.js`
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
    const dependencyURL = `${remoteRoot}/_LSP.js`;
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
      scriptURL: `${remoteRoot}/install/package.json`
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
          { hint: '🔗 请输入订阅地址', value: `${remoteRoot}/install/package.json` },
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