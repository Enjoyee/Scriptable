// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: user-astronaut;
/**
 * Author:LSP
 * Date:2023-08-21
 * Desc:修复DOM操作无法获取对应信息问题
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
    version: 20230203,
    domain: 'https://tophub.today',
    hotban: [{ title: '微博 · 热搜榜', link: 'https://tophub.today/n/KqndgxeLl9' }],
    // --------------------------
    titleFontSize: 16,
    titleFontDayColor: '#FFFFFF',
    titleFontNightColor: '#FFFFFF',
    //
    hotTitleFontDayColor: '#ef233c',
    hotTitleFontNightColor: '#ef233c',
    //
    contentFontSize: 13,
    contentFontDayColor: '#FFFFFF',
    contentFontNightColor: '#FFFFFF',
    //
    refreshTimeFontSize: 9,
    refreshTimeFontDayColor: '#FFFFFF',
    refreshTimeFontNightColor: '#FFFFFF',
    //
    contentLineSpacing: 6,
    normalItemCount: 5,
    largeItemCount: 13
  };

  getCookie() {
    const { cookie } = this.readWidgetSetting();
    return cookie;
  }

  getValueByKey = (key) => this.readWidgetSetting()[key] ?? this.defaultPreference[key];

  getHotban = (defaultValue) => JSON.parse(this.useFileManager().readStringCache('hotban') ?? (defaultValue ? defaultValue : JSON.stringify(this.defaultPreference.hotban)));

  getTitleFontSize = () => parseInt(this.getValueByKey('titleFontSize'));
  getTitleFontDayColor = () => this.getValueByKey('titleFontDayColor');
  getTitleFontNightColor = () => this.getValueByKey('titleFontNightColor');

  getHotTitleFontDayColor = () => this.getValueByKey('hotTitleFontDayColor');
  getHotTitleFontNightColor = () => this.getValueByKey('hotTitleFontNightColor');

  getContentFontSize = () => parseInt(this.getValueByKey('contentFontSize'));
  getContentFontDayColor = () => this.getValueByKey('contentFontDayColor');
  getContentFontNightColor = () => this.getValueByKey('contentFontNightColor');

  getRefreshTimeFontSize = () => parseInt(this.getValueByKey('refreshTimeFontSize'));
  getRefreshTimeFontDayColor = () => this.getValueByKey('refreshTimeFontDayColor');
  getRefreshTimeFontNightColor = () => this.getValueByKey('refreshTimeFontNightColor');

  getContentLineSpacing = () => parseInt(this.getValueByKey('contentLineSpacing'));
  getNormalItemCount = () => parseInt(this.getValueByKey('normalItemCount'));
  getLargeItemCount = () => parseInt(this.getValueByKey('largeItemCount'));

  getCKDesc = () => {
    let hasCK = this.getCookie()?.length > 0;
    return hasCK ? '已登录' : '未登录'
  };

  constructor(scriptName) {
    super(scriptName);
    this.changeBgMode2OnLineBg(
      [`${this.getRemoteRootPath()}/img/bg_1.jpg`],
      { blur: true, blurMode: 'dark', blurRadius: 10 }
    );
  }

  async renderSearchResultView(response, onItemClick) {
    const { coverArr = [], linkArr = [], titleArr = [], tipArr = [] } = response;
    // =========================================================
    const style = `
      :root {
        --color-primary: #007aff;
        --divider-color: rgba(60,60,67,0.16);
        --card-background: #fff;
        --card-radius: 8px;
        --list-header-color: rgba(60,60,67,0.6);
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
      .list__body {
        margin-top: 10px;
        background: var(--card-background);
        border-radius: var(--card-radius);
        overflow: hidden;
      }
      .form-label {
        display: flex;
        align-items: center;
      }
      .form-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 4em;
        padding: 2px 16px;
        position: relative;
      }
      .form-item + .form-item::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        border-top: 0.8px solid var(--divider-color);
      }
      .form-item-cover {
        width: 44px;
        height: 44px;
        border-radius: 6px;
        border: 0;
      }
      .form-item-tite {
        margin: 0px 12px;
        font-size: 14px;
        font-weight: 700;
      }
      .form-item-desc {
        color: #999;
        margin: 0px 12px;
        font-size: 13px;
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
      }
    `;
    // =========================================================
    const js = `
    (() => {
      const coverArr = JSON.parse('${JSON.stringify(coverArr)}')
      const titleArr = JSON.parse('${JSON.stringify(titleArr)}')
      const tipArr = JSON.parse('${JSON.stringify(tipArr)}')
      const linkArr = JSON.parse('${JSON.stringify(linkArr)}')

      window.invoke = (title, link) => {
        window.dispatchEvent(
          new CustomEvent(
            'JBridge',
            { detail: { title, link } }
          )
        )
      }

      const fragment = document.createDocumentFragment()
      coverArr.forEach((cover, index) => {
        const title = titleArr[index];
        const tips = tipArr[index];
        const link = linkArr[index];

        const label = document.createElement("label");
        label.className = "form-item";
    
        const divLabel = document.createElement("div");
        divLabel.className = 'form-label';
        label.appendChild(divLabel);
    
        const img = document.createElement("img");
        img.src = cover;
        img.className = 'form-item-cover';
        divLabel.appendChild(img);
    
        const divContent = document.createElement("div");
        divLabel.appendChild(divContent);

        const divTitle = document.createElement("div");
        divTitle.className = 'form-item-tite';
        divTitle.innerText = title;
        divContent.appendChild(divTitle);

        const divDesc = document.createElement("div");
        divDesc.className = 'form-item-desc';
        divDesc.innerText = tips;
        divContent.appendChild(divDesc);

        const icon = document.createElement('i')
        icon.className = 'iconfont icon-xuqiudingyue'
        label.appendChild(icon)

        label.addEventListener('click', (e) => invoke(title, link))

        fragment.appendChild(label);
      });
      document.getElementById('form').appendChild(fragment)
    })()`;
    // =========================================================
    const html = `
    <html>
      <head>
        <meta name='viewport' content='width=device-width, user-scalable=no'>
        <link rel="stylesheet" href="//at.alicdn.com/t/c/font_3791881_clagdowvbg6.css" type="text/css">
        <style>${style}</style>
      </head>
      <body>
        <div class="list">
          <form id="form" class="list__body" action="javascript:void(0);">
          </form>
        </div>
        <script>${js}</script>
      </body>
    </html>`;

    // 预览web
    const previewWebView = new WebView();
    await previewWebView.loadHTML(html, 'https://tophub.today');

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
              alert("搜索界面出错：" + e);
              throw new Error("搜索界面处理出错: " + e);
              return;
          }
        })()`, true).catch((err) => {
          console.error(err);
          this.ERRS.push(err);
          if (!config.runsInApp) {
            this.notify('APP主界面', `🚫 ${err}`);
          } else {
            throw err
          }
        });
      ////////////////////////////////////
      onItemClick?.(event);
      injectListener();
    }

    injectListener().catch((e) => {
      console.error(e);
    });

    await previewWebView.present();
  }

  async getAppViewOptions() {
    return {
      widgetProvider: {
        small: true, // 是否提供小号组件
        medium: true, // 是否提供中号组件
        large: true, // 是否提供大号组件
      },
      // 预览界面的组件设置item
      settingItems: [
        {
          name: 'hotban',
          label: '热搜榜设置',
          type: 'cell',
          icon: { name: 'flame', color: '#EB3323', },
          needLoading: true,
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
                  name: 'hotbanCK',
                  label: '登录TopHub',
                  type: 'cell',
                  icon: 'https://file.ipadown.com/tophub/assets/images/logo.png',
                  needLoading: true,
                  desc: this.getCKDesc()
                },
                {
                  name: 'weiboOpenType',
                  label: '微博打开方式',
                  type: 'select',
                  icon: `${this.getRemoteRootPath()}/img/ic_weibo.png`,
                  needLoading: false,
                  options: [
                    { label: '浏览器', value: '1' },
                    { label: '国内版本', value: '2' },
                    { label: '国际版本', value: '3' },
                  ],
                  default: '1',
                },
              ]
            },
            {
              items: [
                {
                  name: 'titleFontSize',
                  label: '标题文字大小',
                  type: 'cell',
                  icon: { name: 'pencil.and.outline', color: '#ff758f', },
                  needLoading: false,
                  alert: {
                    title: '标题文字大小',
                    options: [
                      {
                        key: 'titleFontSize',
                        hint: '标题文字大小',
                      }
                    ]
                  },
                  default: `${this.getTitleFontSize()}`,
                },
                {
                  name: 'titleFontDayColor',
                  label: '标题文字浅色颜色',
                  type: 'color',
                  icon: { name: 'sun.min.fill', color: '#3a86ff', },
                  needLoading: false,
                  default: this.getTitleFontDayColor(),
                },
                {
                  name: 'titleFontNightColor',
                  label: '标题文字深色颜色',
                  type: 'color',
                  icon: { name: 'moon.fill', color: '#3a0ca3', },
                  needLoading: false,
                  default: this.getTitleFontNightColor(),
                },
              ]
            },
            {
              items: [
                {
                  name: 'hotTitleFontDayColor',
                  label: '前三标题序号浅色颜色',
                  type: 'color',
                  icon: { name: 'sun.min.fill', color: '#3a86ff', },
                  needLoading: false,
                  default: this.getHotTitleFontDayColor(),
                },
                {
                  name: 'hotTitleFontNightColor',
                  label: '前三标题序号深色颜色',
                  type: 'color',
                  icon: { name: 'moon.fill', color: '#3a0ca3', },
                  needLoading: false,
                  default: this.getHotTitleFontNightColor(),
                },
              ]
            },
            {
              items: [
                {
                  name: 'contentFontSize',
                  label: '榜单文字大小',
                  type: 'cell',
                  icon: { name: 'scribble', color: '#ff758f', },
                  needLoading: false,
                  alert: {
                    title: '榜单文字大小',
                    options: [
                      {
                        key: 'contentFontSize',
                        hint: '榜单文字大小',
                      }
                    ]
                  },
                  default: `${this.getContentFontSize()}`,
                },
                {
                  name: 'contentFontDayColor',
                  label: '榜单文字浅色颜色',
                  type: 'color',
                  icon: { name: 'sun.min.fill', color: '#3a86ff', },
                  needLoading: false,
                  default: this.getContentFontDayColor(),
                },
                {
                  name: 'contentFontNightColor',
                  label: '榜单文字深色颜色',
                  type: 'color',
                  icon: { name: 'moon.fill', color: '#3a0ca3', },
                  needLoading: false,
                  default: this.getContentFontNightColor(),
                },
              ]
            },
            {
              items: [
                {
                  name: 'refreshTimeFontSize',
                  label: '刷新文字大小',
                  type: 'cell',
                  icon: { name: 'goforward', color: '#ef233c', },
                  needLoading: false,
                  alert: {
                    title: '刷新文字大小',
                    options: [
                      {
                        key: 'refreshTimeFontSize',
                        hint: '刷新文字大小',
                      }
                    ]
                  },
                  default: `${this.getRefreshTimeFontSize()}`,
                },
                {
                  name: 'refreshTimeFontDayColor',
                  label: '刷新文字浅色颜色',
                  type: 'color',
                  icon: { name: 'sun.min.fill', color: '#3a86ff', },
                  needLoading: false,
                  default: this.getRefreshTimeFontDayColor(),
                },
                {
                  name: 'refreshTimeFontNightColor',
                  label: '刷新文字深色颜色',
                  type: 'color',
                  icon: { name: 'moon.fill', color: '#3a0ca3', },
                  needLoading: false,
                  default: this.getRefreshTimeFontNightColor(),
                },
              ]
            },
            {
              items: [
                {
                  name: 'contentLineSpacing',
                  label: '榜单行间距',
                  type: 'cell',
                  icon: { name: 'square.stack.3d.up.fill', color: '#3a86ff', },
                  needLoading: false,
                  alert: {
                    title: '榜单行间距',
                    options: [
                      {
                        key: 'contentLineSpacing',
                        hint: '榜单行间距',
                      }
                    ]
                  },
                  default: `${this.getContentLineSpacing()}`,
                },
                {
                  name: 'banCount',
                  label: '榜单条数',
                  type: 'cell',
                  icon: { name: 'square.stack.3d.down.right.fill', color: '#fb5607' },
                  alert: {
                    title: '榜单显示条数',
                    message: "小组件每次展示的热榜条数",
                    options: [
                      {
                        key: 'normalItemCount',
                        hint: '中/小号组件热榜条数',
                      },
                      {
                        key: 'largeItemCount',
                        hint: '大号组件热榜条数',
                      }
                    ]
                  },
                  needLoading: false,
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
          case 'hotbanCK':
            const url = "https://tophub.today/login";
            const webview = new WebView();
            await webview.loadURL(url);
            await webview.present();
            const cookie = await webview.evaluateJavaScript("document.cookie");
            widgetSetting.cookie = cookie;
            insertDesc = cookie?.length > 0 ? '已登录' : '未登录';
            break;

          case 'hotban':
            const hotSelectIndex = await this.presentSheet({
              title: '热榜设置',
              message: '⊱配置热榜显示榜单内容⊰',
              options: [{ name: '查看已添加榜单' }, { name: '搜索添加榜单' }, { name: '重置榜单' }],
            });
            if (hotSelectIndex == 0) {
              const hotbanArr = this.getHotban('[]');
              const hotbanTitleArr = hotbanArr.map(hotban => hotban.title.replaceAll(" ", ""));
              await this.generateAlert('已添加榜单', `${hotbanTitleArr.length > 0 ? hotbanTitleArr.join('、') : '暂无添加，默认微博热搜'}`, ['确定']);
            } else if (hotSelectIndex == 1) {
              await this.generateInputAlert({
                title: '热榜搜索',
                options: [{ hint: '请输入关键字', value: '' }]
              }, async (inputArr) => {
                const keyword = inputArr[0].value;
                let response = undefined;
                try {
                  //////
                  const webview = new WebView();
                  await webview.loadURL(`${this.defaultPreference.domain}/search?q=${encodeURIComponent(keyword)}`);
                  let html = await webview.getHTML();
                  html = html.replaceAll(html.substring(html.indexOf('<head>') + 6, html.lastIndexOf('</head>')), '');
                  await webview.loadHTML(html);
                  // 通过dom操作把HTML里面的热榜内容提取出来
                  const getData = `
                  function getData() {
                    // 图片封面
                    coverArr = []
                    // 链接
                    linkArr = []
                    // 标题
                    titleArr = []
                    // 描述
                    tipArr = []
                    nodeSize = 0
                    totalCount = 20
                    // 图片封面
                    let allItemNodeList = document.getElementsByClassName('weui-media-box__thumb radius');
                    for(let node of allItemNodeList) {
                      if(nodeSize < totalCount) {
                        coverArr.push(node.src)
                      } else {
                        break
                      }
                      nodeSize += 1
                    }
                    // 链接
                    nodeSize = 0
                    allItemNodeList = document.getElementsByClassName('weui-media-box weui-media-box_appmsg weui-cell');
                    for(let node of allItemNodeList) {
                      if(nodeSize < totalCount) {
                        linkArr.push(node.href)
                      } else {
                        break
                      }
                      nodeSize += 1
                    }
                    // 标题
                    nodeSize = 0
                    allItemNodeList = document.getElementsByClassName('weui-media-box__title');
                    for(let node of allItemNodeList) {
                      if(nodeSize < totalCount) {
                        titleArr.push(node.innerText)
                      } else {
                        break
                      }
                      nodeSize += 1
                    }
                    // 订阅人数
                    nodeSize = 0
                    allItemNodeList = document.getElementsByClassName('weui-media-box__desc');
                    for(let node of allItemNodeList) {
                      if(nodeSize < totalCount) {
                        tipArr.push(node.innerText)
                      } else {
                        break
                      }
                      nodeSize += 1
                    }
                    return { coverArr, linkArr, titleArr, tipArr };
                  }
                  getData()
                `
                  // 热榜数据
                  response = await webview.evaluateJavaScript(getData, false);
                  const { linkArr = [] } = response;
                  if (linkArr.length === 0) {
                    await this.generateAlert('热榜搜索', '搜索结果为空', ['确定']);
                  } else {
                    await this.renderSearchResultView(response, async (event) => {
                      let { title, link } = event;
                      const hotbanArr = this.getHotban('[]');
                      const findItem = hotbanArr.find(hotban => hotban.title == title);
                      if (findItem == undefined) {
                        try {
                          link = `${this.defaultPreference.domain}${link}`;
                          hotbanArr.push({ title, link });
                          this.useFileManager().writeStringCache('hotban', JSON.stringify(hotbanArr));
                          await this.generateAlert(`热榜内容`, `已成功添加«${title}»\n返回上级点击组件预览即可查看效果`, ['确定']);
                        } catch (error) {
                          console.error(error);
                        }
                      }
                    });
                  }
                  //////
                } catch (error) {
                  await this.generateAlert('🚫 热榜搜索出错', `${error}`, ['确定']);
                };
              });
            } else if (hotSelectIndex != -1) {
              this.useFileManager().writeStringCache('hotban', JSON.stringify([]));
              await this.generateAlert('热榜设置', '热榜已重置成功', ['确定']);
            }
            break;

          case 'weiboOpenType':
            const index = await this.presentSheet({
              title: '微博打开方式',
              message: '⊱配置点击微博跳转方式⊰',
              options: this.defaultPreference.weiboOpenOptions,
            });
            insertDesc = this.defaultPreference.weiboOpenOptions[index].name;
            widgetSetting.weiboOpenType = insertDesc;
            break
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
    let widget;
    switch (family) {
      case 'small':
        widget = await this.provideSmallWidget(widgetSetting);
        break;

      case 'medium':
        widget = await this.provideMediumWidget(widgetSetting);
        break;

      case 'large':
        widget = await this.provideLargeWidget(widgetSetting);
        break;
    }
    widget.setPadding(6, 16, 6, 12);
    return widget;
  }

  /**
   * 小型组件
   * @returns 
   */
  async provideSmallWidget(widgetSetting) {
    return await this.provideWidget(widgetSetting, this.getNormalItemCount(), true);
  }

  /**
   * 中型组件
   * @returns 
   */
  async provideMediumWidget(widgetSetting) {
    return await this.provideWidget(widgetSetting, this.getNormalItemCount());
  }

  /**
   * 大型组件
   * @returns 
   */
  async provideLargeWidget(widgetSetting) {
    return await this.provideWidget(widgetSetting, this.getLargeItemCount());
  }

  async provideWidget(widgetSetting, itemCount, small = false) {
    const defaultHotArr = this.defaultPreference.hotban;
    const cacheHotStr = this.useFileManager().readStringCache('hotban');
    let hotbanArr = cacheHotStr ? JSON.parse(cacheHotStr) : defaultHotArr;
    hotbanArr = hotbanArr.length === 0 ? defaultHotArr : hotbanArr;
    const index = this.carouselIndex(`HotbanRandom${this.defaultPreference.version}`, hotbanArr.length);
    const response = await this.loadHotBanRES(hotbanArr[index].link);
    // 数据
    const { hotTitle = '', logoUrl = '', linkArr = [], titleArr = [] } = response;
    //=================================
    const widget = new ListWidget();
    //=================================
    let stack = widget.addStack();
    stack.layoutVertically();
    // 标题
    let titleStack = stack.addStack();
    titleStack.size = new Size(0, 44);
    titleStack.centerAlignContent();
    titleStack.layoutHorizontally();
    let img = await this.getImageByUrl(logoUrl);
    let imgSpan = titleStack.addImage(img);
    imgSpan.imageSize = new Size(23, 23);
    imgSpan.cornerRadius = 6;
    titleStack.addSpacer(8);
    let textSpan = titleStack.addText(hotTitle.replace('\n', ''));
    textSpan.textColor = this.dynamicColor(this.getTitleFontDayColor(), this.getTitleFontNightColor());
    let titleSize = this.getTitleFontSize();
    if (small) {
      titleSize -= 2;
    }
    textSpan.font = Font.semiboldSystemFont(titleSize);
    textSpan.lineLimit = 1;
    //
    titleStack.addSpacer();
    if (!small) {
      img = this.getSFSymbol('goforward');
      imgSpan = titleStack.addImage(img);
      imgSpan.imageSize = new Size(12, 12);
      imgSpan.tintColor = this.dynamicColor(this.getRefreshTimeFontDayColor(), this.getRefreshTimeFontNightColor());
      titleStack.addSpacer(4);
      textSpan = titleStack.addText(this.getDateStr(new Date(), 'HH:mm'));
      textSpan.textColor = this.dynamicColor(this.getRefreshTimeFontDayColor(), this.getRefreshTimeFontNightColor());
      textSpan.font = Font.semiboldSystemFont(this.getRefreshTimeFontSize());
      titleStack.addSpacer(10);
    }
    // item
    for (let index = 0; index < itemCount; index++) {
      const name = titleArr[index];
      const link = linkArr[index];
      let nameStack = stack.addStack();
      stack.addSpacer(this.getContentLineSpacing());
      nameStack.layoutHorizontally();
      textSpan = nameStack.addText(`${index + 1}. `);
      let hotTop = index <= 2;
      let hotTitleColor = this.dynamicColor(this.getTitleFontDayColor(), this.getTitleFontNightColor());
      if (hotTop) {
        hotTitleColor = this.dynamicColor(this.getHotTitleFontDayColor(), this.getHotTitleFontNightColor());
      }
      textSpan.textColor = hotTitleColor;
      let contentSize = this.getContentFontSize();
      textSpan.font = hotTop ? Font.italicSystemFont(contentSize) : Font.systemFont(contentSize);
      // 
      textSpan = nameStack.addText(`${name}`);
      textSpan.textColor = this.dynamicColor(this.getContentFontDayColor(), this.getContentFontNightColor());
      textSpan.font = Font.systemFont(contentSize);
      textSpan.lineLimit = 1;
      //
      let linkElement = link;
      if (!link?.startsWith('http')) {
        linkElement = `https://tophub.today${link}`;
      }
      if (hotTitle.search("微博") != -1) {
        const { weiboOpenType = '1' } = widgetSetting;
        if (weiboOpenType == '2') {
          // 微博客户端
          linkElement = 'sinaweibo://searchall?q=' + encodeURIComponent(`#${name}#`)
        } else if (weiboOpenType == '3') {
          // 微博国际版客户端
          linkElement = 'weibointernational://search?q=' + encodeURIComponent(`#${name}#`)
        }
      }
      nameStack.url = linkElement;
    }
    stack.addSpacer();
    //=================================
    return widget;
  }

  // --------------------------NET START--------------------------
  async loadHTML(url) {
    let req = new Request(url);
    req.headers = {
      "cookie": this.getCookie(),
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
    };
    let html = await req.loadString();
    html = html.replaceAll(html.substring(html.indexOf('<head>') + 6, html.lastIndexOf('</head>')), '');
    return html.replace(/(\r\n|\n|\r)/gm, "");
  }

  async loadHotBanRES(link) {
    // 热榜数据
    let response = undefined;
    try {
      const ufm = this.useFileManager();
      const webview = new WebView();
      const cacheFileName = this.md5(link);
      const lastCacheTime = ufm.getCacheModifyDate(cacheFileName);
      const timeInterval = Math.floor((this.getCurrentTimeStamp() - lastCacheTime) / 60);
      // 读取本地缓存
      const localCache = ufm.readStringCache(cacheFileName);
      const canUseCache = localCache != null && localCache.length > 0;
      // 过时且有本地缓存则直接返回本地缓存数据 
      const { refreshInterval = '0' } = this.readWidgetSetting();
      const shouldLoadCache = timeInterval <= Number(refreshInterval) && canUseCache;
      let html = ufm.readStringCache(cacheFileName);
      if (!shouldLoadCache) {
        html = await this.loadHTML(link);
        ufm.writeStringCache(cacheFileName, html);
      }
      await webview.loadHTML(html);
      // 通过dom操作把HTML里面的热榜内容提取出来
      const getData =
        `
        function getData() {
            // logo链接
            logoUrl = document.getElementsByClassName('f-g')[0].getAttribute('src')
            // 榜单标题
            hotTitle = document.getElementsByClassName('Xc-ec-L b-L')[0].innerText
            // 链接
            linkArr = []
            // 标题
            titleArr = []       
            allItemNodeList = document.getElementsByClassName('al')
            // 链接&标题
            nodeSize = 0
            for(let node of allItemNodeList) {
              if(nodeSize < 30) {
                link = node.getElementsByTagName('a')[0].getAttribute('href');
                linkArr.push(link);
                title = node.innerText
                titleArr.push(title);
              } else {
                break
              }
              nodeSize += 1
            }
            return { hotTitle, logoUrl, linkArr, titleArr };
        }
        getData()
      `
      // 热榜数据
      response = await webview.evaluateJavaScript(getData, false);
      if (response.titleArr?.length > 0) {
        this.useFileManager().writeStringCache('hot', JSON.stringify(response));
      }
    } catch (error) {
      console.error(`🚫 请求热板数据出错了=>${error}`);
      response = JSON.parse(this.useFileManager().readStringCache('hot'));
    }
    return response;
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
