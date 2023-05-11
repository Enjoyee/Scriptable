// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: calendar-alt;
/**
 * Author:LSP
 * Date:2023-05-11
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
const dependencyFileName = isDev ? '_LSP.js' : `${cacheDir}/_LSP.js`;
// 下载依赖包
await downloadLSPDependency();
// -------------------------------------------------------
if (typeof require === 'undefined') require = importModule;
// 引入相关方法
const { BaseWidget } = require(dependencyFileName);

// @定义小组件
class Widget extends BaseWidget {

  defaultPreference = {
    weekdayTitleDayColor: '#333333',
    weekdayTitleNightColor: '#eeeeee',

    weekendTitleDayColor: '#333333',
    weekendTitleNightColor: '#eeeeee',

    notCurrMonthDayColor: '#bbbbbb',
    notCurrMonthNightColor: '#555555',

    weekdayDateDayColor: '#000000',
    weekdayDateNightColor: '#ffffff',

    holidayDateDayColor: '#F73131',
    holidayDateNightColor: '#F73131',

    todayDayColor: '#5371EA',
    todayNightColor: '#5371EA',

    monthBgTextDayColor: '#F0F3FC',
    monthBgTextNightColor: '#222222',
  };

  getValueByKey = (key) => this.readWidgetSetting()[key] ?? this.defaultPreference[key] ?? '';

  weekdayTitleDayColor = () => this.getValueByKey('weekdayTitleDayColor');
  weekdayTitleNightColor = () => this.getValueByKey('weekdayTitleNightColor');

  weekendTitleDayColor = () => this.getValueByKey('weekendTitleDayColor');
  weekendTitleNightColor = () => this.getValueByKey('weekendTitleNightColor');

  notCurrMonthDayColor = () => this.getValueByKey('notCurrMonthDayColor');
  notCurrMonthNightColor = () => this.getValueByKey('notCurrMonthNightColor');

  weekdayDateDayColor = () => this.getValueByKey('weekdayDateDayColor');
  weekdayDateNightColor = () => this.getValueByKey('weekdayDateNightColor');

  holidayDateDayColor = () => this.getValueByKey('holidayDateDayColor');
  holidayDateNightColor = () => this.getValueByKey('holidayDateNightColor');

  todayDayColor = () => this.getValueByKey('todayDayColor');
  todayNightColor = () => this.getValueByKey('todayNightColor');

  monthBgTextDayColor = () => this.getValueByKey('monthBgTextDayColor');
  monthBgTextNightColor = () => this.getValueByKey('monthBgTextNightColor');

  constructor(scriptName) {
    super(scriptName);
    this.defaultConfig.bgType = '3';
    this.backgroundColor = '#FFFFFF,#000000';
  }

  async getAppViewOptions() {
    return {
      widgetProvider: {
        small: false, // 是否提供小号组件
        medium: false, // 是否提供中号组件
        large: true, // 是否提供大号组件
      },
      // 预览界面的组件设置item
      settingItems: [
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
                  name: 'weekdayTitleDayColor',
                  label: '工作日标题浅色颜色',
                  type: 'color',
                  icon: { name: 'pencil.and.outline', color: '#3a86ff' },
                  needLoading: false,
                  default: this.weekdayTitleDayColor(),
                },
                {
                  name: 'weekdayTitleNightColor',
                  label: '工作日标题深色颜色',
                  type: 'color',
                  icon: { name: 'square.and.pencil', color: '#3a0ca3' },
                  needLoading: false,
                  default: this.weekdayTitleNightColor(),
                },
              ],
            },
            {
              items: [
                {
                  name: 'weekendTitleDayColor',
                  label: '周末标题浅色颜色',
                  type: 'color',
                  icon: { name: 'pencil.and.outline', color: '#3a86ff' },
                  needLoading: false,
                  default: this.weekendTitleDayColor(),
                },
                {
                  name: 'weekendTitleNightColor',
                  label: '周末标题深色颜色',
                  type: 'color',
                  icon: { name: 'square.and.pencil', color: '#3a0ca3' },
                  needLoading: false,
                  default: this.weekendTitleNightColor(),
                },
              ],
            },
            {
              items: [
                {
                  name: 'notCurrMonthDayColor',
                  label: '非当前月浅色颜色',
                  type: 'color',
                  icon: { name: 'pencil.and.outline', color: '#3a86ff' },
                  needLoading: false,
                  default: this.notCurrMonthDayColor(),
                },
                {
                  name: 'notCurrMonthNightColor',
                  label: '非当前月深色颜色',
                  type: 'color',
                  icon: { name: 'square.and.pencil', color: '#3a0ca3' },
                  needLoading: false,
                  default: this.notCurrMonthNightColor(),
                },
              ],
            },
            {
              items: [
                {
                  name: 'weekdayDateDayColor',
                  label: '工作日日期浅色颜色',
                  type: 'color',
                  icon: { name: 'pencil.and.outline', color: '#3a86ff' },
                  needLoading: false,
                  default: this.weekdayDateDayColor(),
                },
                {
                  name: 'weekdayDateNightColor',
                  label: '工作日日期深色颜色',
                  type: 'color',
                  icon: { name: 'square.and.pencil', color: '#3a0ca3' },
                  needLoading: false,
                  default: this.weekdayDateNightColor(),
                },
              ],
            },
            {
              items: [
                {
                  name: 'holidayDateDayColor',
                  label: '节假日日期浅色颜色',
                  type: 'color',
                  icon: { name: 'pencil.and.outline', color: '#3a86ff' },
                  needLoading: false,
                  default: this.holidayDateDayColor(),
                },
                {
                  name: 'holidayDateNightColor',
                  label: '节假日日期深色颜色',
                  type: 'color',
                  icon: { name: 'square.and.pencil', color: '#3a0ca3' },
                  needLoading: false,
                  default: this.holidayDateNightColor(),
                },
              ],
            },
            {
              items: [
                {
                  name: 'todayDayColor',
                  label: '今日日期浅色颜色',
                  type: 'color',
                  icon: { name: 'pencil.and.outline', color: '#3a86ff' },
                  needLoading: false,
                  default: this.todayDayColor(),
                },
                {
                  name: 'todayNightColor',
                  label: '今日日期深色颜色',
                  type: 'color',
                  icon: { name: 'square.and.pencil', color: '#3a0ca3' },
                  needLoading: false,
                  default: this.todayNightColor(),
                },
              ],
            },
            {
              items: [
                {
                  name: 'monthBgTextDayColor',
                  label: '当前月份浅色颜色',
                  type: 'color',
                  icon: { name: 'pencil.and.outline', color: '#3a86ff' },
                  needLoading: false,
                  default: this.monthBgTextDayColor(),
                },
                {
                  name: 'monthBgTextNightColor',
                  label: '当前月份深色颜色',
                  type: 'color',
                  icon: { name: 'square.and.pencil', color: '#3a0ca3' },
                  needLoading: false,
                  default: this.monthBgTextNightColor(),
                },
              ],
            },
          ],
        },
      ],
      // cell类型的item点击回调
      onItemClick: async (item) => {
      },
    };
  }

  async render() {
    return await this.provideWidget();
  }

  async provideWidget() {
    // ========================================
    const widgetSize = this.getWidgetSize('大号');
    const width = widgetSize.width;
    const height = widgetSize.height;
    const hCellWidth = width / 7;
    const topPadding = 8;
    const bottomPadding = 8;
    const weekCellHeight = 16;
    const dateCellHeight = (height - weekCellHeight - 2 * topPadding - bottomPadding) / 6;
    const canvasHeight = height - 2 * topPadding;
    // ========================================
    const widget = new ListWidget();
    widget.setPadding(0, 0, 0, 0);
    const stack = widget.addStack();
    stack.size = new Size(width, canvasHeight);
    // =================================

    const drawContext = new DrawContext();
    drawContext.size = new Size(width, canvasHeight);
    drawContext.respectScreenScale = true;
    drawContext.opaque = false;

    //
    drawContext.setFont(Font.regularSystemFont(15));
    drawContext.setTextAlignedCenter();
    const weekTitleArr = ['一', '二', '三', '四', '五', '六', '日'];
    for (let index = 0; index < 7; index++) {
      if (index >= 5) {
        drawContext.setTextColor(Color.dynamic(new Color(this.weekendTitleDayColor()), new Color(this.weekendTitleNightColor())));
      } else {
        drawContext.setTextColor(Color.dynamic(new Color(this.weekdayTitleDayColor()), new Color(this.weekdayTitleNightColor())));
      }
      drawContext.drawTextInRect(weekTitleArr[index], new Rect(index * hCellWidth, 0, hCellWidth, weekCellHeight));
    }

    // =================================
    const calendarArr = await this.loadCalendarData();

    // =================================
    const margin = 2;
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        let rect = new Rect(col * hCellWidth, (topPadding + weekCellHeight) + row * dateCellHeight + topPadding, hCellWidth, dateCellHeight);
        let calendarInfo = calendarArr[7 * row + col];
        if (calendarInfo.isWeekend && !calendarInfo.showWorkDay || calendarInfo.showHoliday) {
          drawContext.setTextColor(Color.dynamic(new Color(this.holidayDateDayColor()), new Color(this.holidayDateNightColor())));
        } else {
          drawContext.setTextColor(Color.dynamic(new Color(this.weekdayDateDayColor()), new Color(this.weekdayDateNightColor())));
        }

        // 当天
        if (calendarInfo.isToday) {
          drawContext.setLineWidth(1.2);
          drawContext.setTextColor(Color.dynamic(new Color(this.todayDayColor()), new Color(this.todayNightColor())));
          drawContext.setStrokeColor(Color.dynamic(new Color(this.todayDayColor()), new Color(this.todayNightColor())));
          let newRect = new Rect(rect.x + margin, rect.y + margin, rect.width - 2 * margin, rect.height - 2 * margin);
          let path = new Path();
          path.addRoundedRect(newRect, 8, 8);
          path.closeSubpath();
          drawContext.addPath(path);
          drawContext.strokePath(path);
        }

        // 当前月颜色
        if (!calendarInfo.isCurrentMonth) {
          drawContext.setTextColor(Color.dynamic(new Color(this.notCurrMonthDayColor()), new Color(this.notCurrMonthNightColor())))
        }

        // 新历
        let text = calendarInfo.day;
        if (calendarInfo.isToday) {
          drawContext.setFont(Font.semiboldSystemFont(19));
        } else {
          drawContext.setFont(Font.systemFont(18));
        }
        let newDatePoint = new Point(rect.x + hCellWidth / 2 - 5 * (text.length), rect.y + dateCellHeight / 2 - 20);
        drawContext.drawText(text, newDatePoint);

        // 农历
        if (calendarInfo.isToday) {
          drawContext.setFont(Font.semiboldSystemFont(11));
        } else {
          drawContext.setFont(Font.systemFont(10));
        }
        let subText = calendarInfo.subText;
        let lunDatePoint = new Point(rect.x + hCellWidth / 2 - 5.4 * subText.length, rect.y + dateCellHeight / 2 + 2);
        drawContext.drawText(subText, lunDatePoint);

        // 角标
        drawContext.setFont(Font.regularSystemFont(9));
        let anchorTextPoint = new Point(rect.x + margin * 2.2, rect.y + 2.2 * margin);
        drawContext.drawText(calendarInfo.anchorText, anchorTextPoint);
      }
    }

    // =================================
    let img = await drawContext.getImage();
    stack.centerAlignContent();
    stack.setPadding(0, 10, 0, 10);
    stack.addImage(img);

    let ctx = new DrawContext();
    ctx.opaque = false;
    ctx.size = new Size(width, height);
    ctx.respectScreenScale = true;
    ctx.setTextAlignedCenter();
    ctx.setFont(Font.semiboldSystemFont(300));
    ctx.setTextColor(Color.dynamic(new Color(this.monthBgTextDayColor()), new Color(this.monthBgTextNightColor())));
    ctx.drawTextInRect(`${new Date().getMonth() + 1}`, new Rect(0, 0, width, height));
    img = await ctx.getImage();
    stack.backgroundImage = img;

    return widget;
  }

  // --------------------------NET START------------------------

  async loadCalendarData() {
    const totalCalendarArr = [];
    //
    const currDate = new Date();
    const url = `https://opendata.baidu.com/api.php?tn=wisetpl&format=json&resource_id=39043&query=${currDate.getFullYear()}%E5%B9%B4${currDate.getMonth() + 1}%E6%9C%88&t=${currDate.getTime()}`
    const response = await this.httpGet(
      url,
      {
        headers: {
          'user-agent:': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
        },
        jsonFormat: false,
      }
    );
    const json = JSON.parse(response);
    if (json.status == 0) {
      const { data = [] } = json;
      if (data.length > 0) {
        const { almanac = [] } = data[0]

        // ================================
        function constructDateItem(isToday, isCurrentMonth, day, month) {
          let dateItem = {};
          dateItem['isToday'] = isToday;
          dateItem['isCurrentMonth'] = isCurrentMonth;
          dateItem['day'] = `${day}`;
          dateItem['month'] = month;
          let matchDate = almanac.filter(item => item.month == dateItem.month && item.day == dateItem.day)[0];
          dateItem['lunarMonth'] = matchDate.lMonth;
          dateItem['lunarDay'] = matchDate.lDate;
          dateItem['lunarDate'] = `${matchDate.lMonth}月${matchDate.lDate}`;
          dateItem['showWorkDay'] = matchDate.status == 2; // 调休补班
          dateItem['showHoliday'] = matchDate.status == 1; // 节假日放假
          let anchorText = '';
          if (matchDate.status == 1) {
            anchorText = '休';
          } else if (matchDate.status == 2) {
            anchorText = '班';
          }
          dateItem['anchorText'] = anchorText;
          dateItem['weekTitle'] = `星期${matchDate.cnDay}`; // 周几
          dateItem['isWeekend'] = matchDate.cnDay == '六' || matchDate.cnDay == '日'; // 是否周末
          dateItem['festivalList'] = matchDate.festivalList; // 节假名称
          let subText = matchDate.lDate;
          if (subText == '初一') {
            subText = `${matchDate.lMonth}月`;
          }
          if (matchDate.term != undefined && matchDate.term.length > 0) {
            subText = matchDate.term;
          }
          dateItem['subText'] = subText;
          return dateItem;
        }
        // ================================

        let firstDate = new Date(currDate.getFullYear(), currDate.getMonth(), 1);
        let lastDate = new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0);
        // [0, 6] 0表示周日，6表示周六
        const firstDayIndex = firstDate.getDay();
        const lastDay = lastDate.getDate();
        //
        let lastMonthDays = firstDayIndex - 1;
        lastMonthDays = lastMonthDays < 0 ? 6 : lastMonthDays;
        // 上一个月数据
        if (lastMonthDays > 0) {
          const firstAlmanac = almanac[0];
          const preDate = new Date(firstAlmanac.year, firstAlmanac.month, 0)
          for (let index = lastMonthDays - 1; index >= 0; index--) {
            let day = preDate.getDate() - index;
            totalCalendarArr.push(constructDateItem(false, false, day, firstAlmanac.month));
          }
        }
        // 当前月数据
        for (let index = 1; index <= lastDay; index++) {
          totalCalendarArr.push(constructDateItem(currDate.getDate() == index, true, index, `${currDate.getMonth() + 1}`));
        }
        // 下一个月
        const currCount = 42 - totalCalendarArr.length;
        for (let index = 1; index <= currCount; index++) {
          const lastAlmanac = almanac[almanac.length - 1];
          totalCalendarArr.push(constructDateItem(false, false, index, lastAlmanac.month));
        }
      }
    }

    return totalCalendarArr;
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
  const hasSuffix = fileName.lastIndexOf('.') + 1;
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