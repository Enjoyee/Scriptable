// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: bell;
/**
* Author:LSP
* Date:2023-02-04
*/
// -------------------------------------------------------
// 是否是开发环境，配合手机端调试使用，正式发布设置为false
const isDev = false;
const dependencyLSP = '20230204';
console.log(`当前环境 👉👉👉👉👉 ${isDev ? 'DEV' : 'RELEASE'}`);
console.log(`----------------------------------------`);
// 分支
const branch = 'master';
// 仓库根目录
const remoteRoot = `https://gitcode.net/enoyee/scriptable/-/raw/${branch}`;
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
    reminderColors: {
      0: '#333333',
      1: '#ff0000',
      5: '#e85d04',
      9: '#faa307',
    }
  };

  constructor(scriptName) {
    super(scriptName);
    this.changeBgMode2OnLineBg(
      ['https://www.toptal.com/designers/subtlepatterns/uploads/double-bubble-outline.png']
    );
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
          name: 'avatar',
          label: '设置头像',
          type: 'cell',
          icon: { name: 'photo.on.rectangle', color: '#ff4800', },
          needLoading: false,
          alert: {
            title: '设置头像',
            options: [
              {
                key: 'avatar',
                hint: '请输入头像链接',
              }
            ]
          },
          showDesc: false
        },
        {
          name: 'circleAvatar',
          label: '头像圆形裁剪',
          type: 'switch',
          icon: { name: 'person.crop.circle', color: '#6C00FF', }
        },
      ],
    };
  }

  async render({ widgetSetting, family }) {
    let widget;
    switch (family) {
      case 'medium':
        widget = await this.provideMediumWidget(widgetSetting);
        break;
    }
    widget.setPadding(6, 12, 6, 12);
    return widget;
  }

  /**
   * 中型组件
   * @returns 
   */
  async provideMediumWidget(widgetSetting) {
    const reminderObj = await this.loadReminderList();
    const { finishedList, unfinishedList } = reminderObj;
    const finishedCount = finishedList.length;
    const unfinishedCount = unfinishedList.length;
    const totalCount = finishedCount + unfinishedCount;
    // ========================================
    const widget = new ListWidget();
    const { width, height } = this.getWidgetSize('中号');
    const contentStack = widget.addStack();
    contentStack.layoutHorizontally();
    // ========================================
    const leftStack = contentStack.addStack();
    leftStack.layoutVertically();
    const leftStackWidth = width * 0.31;
    leftStack.size = new Size(leftStackWidth, height);
    leftStack.setPadding(0, 16, 0, 0);
    const avatarUrl = widgetSetting.avatar || 'https://gitcode.net/enoyee/scriptable/-/raw/master/img/ic_pikachu_4.png';
    // ------------
    const avatarStack = leftStack.addStack();
    let img;
    if (widgetSetting.circleAvatar) {
      img = await this.circleCropImage(avatarUrl);
    } else {
      img = await this.getImageByUrl(avatarUrl);
    }
    let imgSpan = avatarStack.addImage(img);
    avatarStack.addSpacer();
    imgSpan.imageSize = new Size(leftStackWidth * 0.65, leftStackWidth * 0.65);
    // ------------
    const leftTextColor = new Color('#444');
    const leftTextFont = Font.mediumSystemFont(13);
    leftStack.addSpacer(10);
    let textSpan = leftStack.addText(`已完成：${finishedCount}项`);
    textSpan.textColor = leftTextColor;
    textSpan.font = leftTextFont;
    textSpan.lineLimit = 1;
    // ------------
    leftStack.addSpacer(4);
    textSpan = leftStack.addText(`未完成：${unfinishedCount}项`);
    textSpan.textColor = leftTextColor;
    textSpan.font = leftTextFont;
    textSpan.lineLimit = 1;
    // ------------
    leftStack.addSpacer(4);
    const percent = totalCount > 0 ? Math.floor((finishedCount / totalCount) * 100) : 0;
    textSpan = leftStack.addText(`完成率：${percent}%`);
    textSpan.textColor = leftTextColor;
    textSpan.font = leftTextFont;
    textSpan.lineLimit = 1;
    // ========================================
    const rightStackWidth = width * 0.69;
    const rightStack = contentStack.addStack();
    rightStack.size = new Size(rightStackWidth, height);
    rightStack.layoutVertically();
    const perHeight = height / 6;
    const list = unfinishedList.slice(0, unfinishedList.length > 4 ? 4 : unfinishedList.length);
    rightStack.addSpacer(10);
    // ---------------------------------------
    rightStack.url = 'x-apple-reminderkit://';
    let percentIndex = 0;
    if (percent > 0 && percent <= 25) {
      percentIndex = 25;
    } else if (percent > 25 && percent <= 50) {
      percentIndex = 50;
    } else if (percent > 50 && percent <= 75) {
      percentIndex = 75;
    } else if (percent > 75) {
      percentIndex = 100;
    }
    if (percentIndex > 0) {
      img = await this.getImageByUrl(`https://gitcode.net/enoyee/scriptable/-/raw/master/img/bg_celebrate_${percentIndex}.png`);
      rightStack.backgroundImage = img;
    }
    // ---------------------------------------
    if (list.length === 0) {
      ['全', '步', '完', '成'].forEach(_ => {
        let rdStack = rightStack.addStack();
        rdStack.url = 'x-apple-reminderkit://';
        rdStack.size = new Size(rightStackWidth - 16, perHeight);
        rdStack.backgroundColor = new Color('#19a5ff', 0.1);
        rdStack.cornerRadius = 4;
        rdStack.addSpacer();
        rightStack.addSpacer(10);
      });
    } else {
      list.forEach(rd => {
        let rdStack = rightStack.addStack();
        rdStack.url = 'x-apple-reminderkit://';
        rdStack.size = new Size(rightStackWidth - 16, perHeight);
        rdStack.setPadding(0, 8, 0, 8);
        rdStack.centerAlignContent();
        let alpha = 0.06;
        if (rd.isOverdue) {
          alpha = 0.3;
        }
        rdStack.backgroundColor = new Color(`${rd.color}`, alpha);
        rdStack.cornerRadius = 4;
        textSpan = rdStack.addText(`@${rd.title}`)
        textSpan.textColor = new Color(`${rd.color}`, 0.8);
        let fontSize = 13;
        if (rd.title.length >= 15) {
          fontSize = 12;
        }
        textSpan.font = Font.semiboldSystemFont(fontSize);
        textSpan.lineLimit = 1;
        rdStack.addSpacer();
        rightStack.addSpacer(10);
      });
    }
    return widget;
  }

  // --------------------------NET START--------------------------
  async loadReminderList() {
    const calendar = await Calendar.forReminders();
    const originalRdList = await Reminder.all(calendar);
    const filterList = originalRdList.filter(item => {
      const { isCompleted } = item;
      const date = item.dueDate ? this.getDateStr(item.dueDate, 'yyyy-MM-dd') : '';
      const currDate = this.getDateStr(new Date(), 'yyyy-MM-dd')
      return date == currDate || (!isCompleted && date < currDate);
    });
    const reminderList = filterList.map(item => ({
      title: item.title,
      notes: item.notes,
      isCompleted: item.isCompleted,
      isOverdue: item.isOverdue,
      priority: item.priority == 0 ? 10 : item.priority,
      color: this.defaultPreference.reminderColors[item.priority],
      calendar: item.calendar
    }));
    const unfinishedList = reminderList.filter(reminder => !reminder.isCompleted);
    unfinishedList.sort(function (a, b) { return (a.isOverdue || b.isOverdue) ? 1 : (a.priority - b.priority) });
    const finishedList = reminderList.filter(reminder => reminder.isCompleted);
    return { finishedList, unfinishedList };
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