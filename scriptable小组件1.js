// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// This widget was created by Max Zeryck @mzeryck,在原来的基础上增加了更多内容显示（均来自网络收集）


/********************************************************************/
/****************************公里转农历****************************/
/********************************************************************/

// 农历1949-2100年查询表
let lunarYearArr = [
    0x0b557, //1949
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, //1950-1959
    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, //1960-1969
    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, //1970-1979
    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, //1980-1989
    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, //1990-1999
    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, //2000-2009
    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, //2010-2019
    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, //2020-2029
    0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, //2030-2039
    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, //2040-2049
    0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, //2050-2059
    0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, //2060-2069
    0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, //2070-2079
    0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, //2080-2089
    0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, //2090-2099
    0x0d520 //2100
  ],
  lunarMonth = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'],
  lunarDay = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '初', '廿'],
  tianGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
  diZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 公历转农历函数
function sloarToLunar(sy, sm, sd) {
  // 输入的月份减1处理
  sm -= 1;

  // 计算与公历基准的相差天数
  // Date.UTC()返回的是距离公历1970年1月1日的毫秒数,传入的月份需要减1
  let daySpan = (Date.UTC(sy, sm, sd) - Date.UTC(1949, 0, 29)) / (24 * 60 * 60 * 1000) + 1;
  let ly, lm, ld;
  // 确定输出的农历年份
  for (let j = 0; j < lunarYearArr.length; j++) {
    daySpan -= lunarYearDays(lunarYearArr[j]);
    if (daySpan <= 0) {
      ly = 1949 + j;
      // 获取农历年份确定后的剩余天数
      daySpan += lunarYearDays(lunarYearArr[j]);
      break
    }
  }

  // 确定输出的农历月份
  for (let k = 0; k < lunarYearMonths(lunarYearArr[ly - 1949]).length; k++) {
    daySpan -= lunarYearMonths(lunarYearArr[ly - 1949])[k];
    if (daySpan <= 0) {
      // 有闰月时，月份的数组长度会变成13，因此，当闰月月份小于等于k时，lm不需要加1
      if (hasLeapMonth(lunarYearArr[ly - 1949]) && hasLeapMonth(lunarYearArr[ly - 1949]) <= k) {
        if (hasLeapMonth(lunarYearArr[ly - 1949]) < k) {
          lm = k;
        } else if (hasLeapMonth(lunarYearArr[ly - 1949]) === k) {
          lm = '闰' + k;
        } else {
          lm = k + 1;
        }
      } else {
        lm = k + 1;
      }
      // 获取农历月份确定后的剩余天数
      daySpan += lunarYearMonths(lunarYearArr[ly - 1949])[k];
      break
    }
  }

  // 确定输出农历哪一天
  ld = daySpan;

  // 将计算出来的农历月份转换成汉字月份，闰月需要在前面加上闰字
  if (hasLeapMonth(lunarYearArr[ly - 1949]) && (typeof (lm) === 'string' && lm.indexOf('闰') > -1)) {
    lm = `闰${lunarMonth[/\d/.exec(lm) - 1]}`
  } else {
    lm = lunarMonth[lm - 1];
  }

  // 将计算出来的农历年份转换为天干地支年
  ly = getTianGan(ly) + getDiZhi(ly);

  // 将计算出来的农历天数转换成汉字
  if (ld < 11) {
    ld = `${lunarDay[10]}${lunarDay[ld-1]}`
  } else if (ld > 10 && ld < 20) {
    ld = `${lunarDay[9]}${lunarDay[ld-11]}`
  } else if (ld === 20) {
    ld = `${lunarDay[1]}${lunarDay[9]}`
  } else if (ld > 20 && ld < 30) {
    ld = `${lunarDay[11]}${lunarDay[ld-21]}`
  } else if (ld === 30) {
    ld = `${lunarDay[2]}${lunarDay[9]}`
  }

  return {
    lunarYear: `${ly}`,
    lunarMonth: `${lm}`,
    lunarDay: `${ld}`,
  }
}

// 计算农历年是否有闰月，参数为存储农历年的16进制
// 农历年份信息用16进制存储，其中16进制的最后1位可以用于判断是否有闰月
function hasLeapMonth(ly) {
  // 获取16进制的最后1位，需要用到&与运算符
  if (ly & 0xf) {
    return ly & 0xf
  } else {
    return false
  }
}

// 如果有闰月，计算农历闰月天数，参数为存储农历年的16进制
// 农历年份信息用16进制存储，其中16进制的第1位（0x除外）可以用于表示闰月是大月还是小月
function leapMonthDays(ly) {
  if (hasLeapMonth(ly)) {
    // 获取16进制的第1位（0x除外）
    return (ly & 0xf0000) ? 30 : 29
  } else {
    return 0
  }
}

// 计算农历一年的总天数，参数为存储农历年的16进制
// 农历年份信息用16进制存储，其中16进制的第2-4位（0x除外）可以用于表示正常月是大月还是小月
function lunarYearDays(ly) {
  let totalDays = 0;

  // 获取正常月的天数，并累加
  // 获取16进制的第2-4位，需要用到>>移位运算符
  for (let i = 0x8000; i > 0x8; i >>= 1) {
    let monthDays = (ly & i) ? 30 : 29;
    totalDays += monthDays;
  }
  // 如果有闰月，需要把闰月的天数加上
  if (hasLeapMonth(ly)) {
    totalDays += leapMonthDays(ly);
  }

  return totalDays
}

// 获取农历每个月的天数
// 参数需传入16进制数值
function lunarYearMonths(ly) {
  let monthArr = [];

  // 获取正常月的天数，并添加到monthArr数组中
  // 获取16进制的第2-4位，需要用到>>移位运算符
  for (let i = 0x8000; i > 0x8; i >>= 1) {
    monthArr.push((ly & i) ? 30 : 29);
  }
  // 如果有闰月，需要把闰月的天数加上
  if (hasLeapMonth(ly)) {
    monthArr.splice(hasLeapMonth(ly), 0, leapMonthDays(ly));
  }

  return monthArr
}

// 将农历年转换为天干，参数为农历年
function getTianGan(ly) {
  let tianGanKey = (ly - 3) % 10;
  if (tianGanKey === 0) tianGanKey = 10;
  return tianGan[tianGanKey - 1]
}

// 将农历年转换为地支，参数为农历年
function getDiZhi(ly) {
  let diZhiKey = (ly - 3) % 12;
  if (diZhiKey === 0) diZhiKey = 12;
  return diZhi[diZhiKey - 1]
}




/********************************************************************/
/****************************定义小组件内容****************************/
/********************************************************************/
const filename = Script.name() + ".jpg"
const files = FileManager.local()
const path = files.joinPath(files.documentsDirectory(), filename)
let widgetHello = new ListWidget(); 
var today = new Date();

var widgetInputRAW = args.widgetParameter;

try {
	widgetInputRAW.toString();
} catch(e) {
	widgetInputRAW = "50|#ffffff";
}

var widgetInput = widgetInputRAW.toString();

var inputArr = widgetInput.split("|");

// iCloud file path
var scriptableFilePath = "/var/mobile/Library/Mobile Documents/iCloud~dk~simonbs~Scriptable/Documents/";
var removeSpaces1 = inputArr[0].split(" "); // Remove spaces from file name
var removeSpaces2 = removeSpaces1.join('');
var tempPath = removeSpaces2.split(".");
var backgroundImageURLRAW = scriptableFilePath + tempPath[0];

var fm = FileManager.iCloud();
var backgroundImageURL = scriptableFilePath + tempPath[0] + ".";
var backgroundImageURLInput = scriptableFilePath + removeSpaces2;

// For users having trouble with extensions
// Uses user-input file path is the file is found
// Checks for common file format extensions if the file is not found
if (fm.fileExists(backgroundImageURLInput) == false) {
		var fileTypes = ['png', 'jpg', 'jpeg', 'tiff', 'webp', 'gif'];

		fileTypes.forEach(function(item) {
			if (fm.fileExists((backgroundImageURL + item.toLowerCase())) == true) {
				backgroundImageURL = backgroundImageURLRAW + "." + item.toLowerCase();
			} else if (fm.fileExists((backgroundImageURL + item.toUpperCase())) == true) {
				backgroundImageURL = backgroundImageURLRAW + "." + item.toUpperCase();
			}
		});
} else {
	backgroundImageURL = scriptableFilePath + removeSpaces2;
}

var spacing = parseInt(inputArr[1]);

//API_KEY
let API_WEATHER = "89065f71db2277c83d22a779a34f16a7";//Load Your api here,填入你自己的API
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
let CITY_WEATHER = "1809858";// 1809858是广州，add your city ID,填入你所在城市的7位数字City ID

//Get storage
var base_path = "/var/mobile/Library/Mobile Documents/iCloud~dk~simonbs~Scriptable/Documents/weather/";
var fm = FileManager.iCloud();

// Fetch Image from Url
async function fetchimageurl(url) {
	const request = new Request(url)
	var res = await request.loadImage();
	return res;
}

// Get formatted Date
function getformatteddate(){
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return months[today.getMonth()] + " " + today.getDate()
}

// Long-form days and months
var days = ['周日','周一','周二','周三','周四','周五','周六'];
var months = ['1','2','3','4','5','6','7','8','9','10','11','12'];

// Load image from local drive
async function fetchimagelocal(path){
  var finalPath = base_path + path + ".png";
  if(fm.fileExists(finalPath)==true){
	console.log("file exists: " + finalPath);
	return finalPath;
  }else{
	//throw new Error("Error file not found: " + path);
	if(fm.fileExists(base_path)==false){
	  console.log("Directry not exist creating one.");
	  fm.createDirectory(base_path);
	}
	console.log("Downloading file: " + finalPath);
	await downloadimg(path);
	if(fm.fileExists(finalPath)==true){
	  console.log("file exists after download: " + finalPath);
	  return finalPath;
	}else{
	  throw new Error("Error file not found: " + path);
	}
  }
}

async function downloadimg(path){
	const url = "http://a.animedlweb.ga/weather/weathers25_2.json";
	const data = await fetchWeatherData(url);
	var dataimg = null;
	var name = null;
	if(path.includes("bg")){
	  dataimg = data.background;
	  name = path.replace("_bg","");
	}else{
	  dataimg = data.icon;
	  name = path.replace("_ico","");
	}
	var imgurl=null;
	switch (name){
	  case "01d":
		imgurl = dataimg._01d;
	  break;
	  case "01n":
		imgurl = dataimg._01n;
	  break;
	  case "02d":
		imgurl = dataimg._02d;
	  break;
	  case "02n":
		imgurl = dataimg._02n;
	  break;
	  case "03d":
		imgurl = dataimg._03d;
	  break;
	  case "03n":
		imgurl = dataimg._03n;
	  break;
	  case "04d":
		imgurl = dataimg._04d;
	  break;
	  case "04n":
		imgurl = dataimg._04n;
	  break;
	  case "09d":
		imgurl = dataimg._09d;
	  break;
	  case "09n":
		imgurl = dataimg._09n;
	  break;
	  case "10d":
		imgurl = dataimg._10d;
	  break;
	  case "10n":
		imgurl = dataimg._10n;
	  break;
	  case "11d":
		imgurl = dataimg._11d;
	  break;
	  case "11n":
		imgurl = dataimg._11n;
	  break;
	  case "13d":
		imgurl = dataimg._13d;
	  break;
	  case "13n":
		imgurl = dataimg._13n;
	  break;
	  case "50d":
		imgurl = dataimg._50d;
	  break;
	  case "50n":
		imgurl = dataimg._50n;
	  break;
	}
	const image = await fetchimageurl(imgurl);
	console.log("Downloaded Image");
	fm.writeImage(base_path+path+".png",image);
}

//get Json weather
async function fetchWeatherData(url) {
  const request = new Request(url);
  const res = await request.loadJSON();
  return res;
}

// Get Location 
/*Location.setAccuracyToBest();
let curLocation = await Location.current();
console.log(curLocation.latitude);
console.log(curLocation.longitude);*/
let wetherurl = "http://api.openweathermap.org/data/2.5/weather?id=" + CITY_WEATHER + "&APPID=" + API_WEATHER + "&units=metric";
//"http://api.openweathermap.org/data/2.5/weather?lat=" + curLocation.latitude + "&lon=" + curLocation.longitude + "&appid=" + API_WEATHER + "&units=metric";
//"http://api.openweathermap.org/data/2.5/weather?id=" + CITY_WEATHER + "&APPID=" + API_WEATHER + "&units=metric"

const weatherJSON = await fetchWeatherData(wetherurl);
const cityName = weatherJSON.name;
const weatherarry = weatherJSON.weather;
const iconData = weatherarry[0].icon;
const weathername = weatherarry[0].main;
const curTempObj = weatherJSON.main;
const curTemp = curTempObj.temp;
const highTemp = curTempObj.temp_max;
const lowTemp = curTempObj.temp_min;
const feel_like = curTempObj.feels_like;
//Completed loading weather data

// Greetings arrays per time period. 
const greetingsMorning = '💫 Good morning~';
const greetingsNoon = '🥳 Good noon~';
const greetingsAfternoon = '🐡 Good afternoon~';
const greetingsEvening = '🐳 Good evening~';
const greetingsNight = '🦉 Time to get laid~';
const greetingsLateNight = '🦍 Into Fairy mode!!';

var holidaysByDate = {
	// month,date: greeting
	"1,1": "🎇元旦快乐!",
	"2,14": "👩‍❤️‍💋‍👨情人节快乐!",
	"3,8": "👩三八妇女节!",
	"3,12": "🌳植树节!",
  "10,31": "🎃万圣节快乐!",
	"12,25": "🎄圣诞快乐!"
}

var holidayKey = (today.getMonth() + 1).toString() + "," +  (Math.ceil(today.getDate() / 7)).toString() + "," + (today.getDay()).toString();

var holidayKeyDate = (today.getMonth() + 1).toString() + "," + (today.getDate()).toString();

// Date Calculations
var weekday = days[ today.getDay() ];
var month = months[ today.getMonth() ];
var date = today.getDate();
var hour = today.getHours();

// Append ordinal suffix to date
function ordinalSuffix(input) {
	if (input % 10 == 1 && date != 11) {
		return input.toString();
	} else if (input % 10 == 2 && date != 12) {
		return input.toString();
	} else if (input % 10 == 3 && date != 13) {
		return input.toString();
	} else {
		return input.toString();
	}
}

// Support for multiple greetings per time period
function randomGreeting(greetingArray) {
	return Math.floor(Math.random() * greetingArray.length);
}

var greeting = new String("Howdy.")
if (hour >= 23 || hour <= 1) {
	greeting = greetingsNight
} else if (hour > 1 && hour <= 5) {
	greeting = greetingsLateNight
} else if (hour > 5 && hour <= 10) {
	greeting = greetingsMorning
} else if (hour > 10 && hour <= 13) {
	greeting = greetingsNoon
} else if (hour > 13 && hour <= 18) {
	greeting = greetingsAfternoon
} else if (hour > 18 && hour < 23) {
	greeting = greetingsEvening
} 

// Overwrite all greetings if specific holiday
if (holidaysByDate[holidayKeyDate]) {
	greeting = holidaysByDate[holidayKeyDate];
}

//Battery Render
function getBatteryLevel() {
	const batteryLevel = Device.batteryLevel()
	const batteryAscii = Math.round(batteryLevel * 100);
	return batteryAscii + "%";
}

//Year Render
function renderYearProgress() {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 1) // Start of this year
  const end = new Date(now.getFullYear() + 1, 0, 1) // End of this year
  const progress = (now - start) / (end - start)
  return renderProgress(progress)
}
function renderProgress(progress) {
  const used = '▓'.repeat(Math.floor(progress * 24))
  const left = '░'.repeat(24 - used.length)
  return `${used}${left} ${Math.floor(progress * 100)}%`
}

// Try/catch for color input parameter
try {
	inputArr[0].toString();
} catch(e) {
	throw new Error("Please long press the widget and add a parameter.");
}

let themeColor = new Color(inputArr[0].toString());


if (config.runsInWidget) {
  let widget = new ListWidget()
  widget.backgroundImage = files.readImage(path)
  
 // You can your own code here to add additional items to the "invisible" background of the widget.
 /* --------------- */
 /* Assemble Widget */
 /* --------------- */
 
 
 //Top spacing,顶部间距
 widgetHello.addSpacer(15);

 // Greeting label,问候标签
 let hello = widgetHello.addText(greeting + '');
 hello.font = Font.boldSystemFont(32); //font and size,字体与大小
 hello.textColor = new Color('e8ffc1'); //font color,字体颜色
 hello.textOpacity = (1); //opacity,不透明度
 hello.leftAlignText(); //Align,对齐方式(center,left,right)！在同一个stack内的对齐方式不能单独设置，只能调整向左对齐间距大小
 
//Spacing between greeting and yearprogress,问候标签与年进度行间距
widgetHello.addSpacer(10);

//define horizontal stack,创建一个stack，使下面组件都在同一个stack中，布局为横向布局（hStack0）
let hStack0 = widgetHello.addStack();
hStack0.layoutHorizontally();

// Centers line
hStack0.addSpacer(0)//Left spacing,向左对齐间距

// Year icon in stack,年进度图标
const YearProgressicon = hStack0.addText("◕ ")
YearProgressicon.font = new Font('Menlo', 12) //font and size,字体与大小
YearProgressicon.textColor = new Color('#8675a9') //font color,字体颜色
YearProgressicon.textOpacity = (1); //opacity,不透明度
YearProgressicon.leftAlignText(); //AlignText,对齐方式(center,left,right)！在同一个stack内的对齐方式不能单独设置，只能调整向左对齐间距大小

// Year label in stack,年进度标签
const YearProgress = hStack0.addText("今年 "+renderYearProgress())
YearProgress.font = new Font('Menlo', 12) //font and size,字体与大小
YearProgress.textColor = new Color('#8675a9') //font color,字体颜色
YearProgress.textOpacity = (1); //opacity,不透明度
YearProgress.leftAlignText(); //Align,对齐方式(center,left,right)！在同一个stack内的对齐方式不能单独设置，只能调整向左对齐间距大小

//Spacing between yearprogress and battery,年进度与电量行间距
widgetHello.addSpacer(5);

//define horizontal stack,创建一个stack，使下面组件都在同一个stack中，布局为横向布局（hStack1）
let hStack1 = widgetHello.addStack();
hStack1.layoutHorizontally();

// Centers line
hStack1.addSpacer(0) //Left spacing,向左对齐间距

// Battery icon in stack,电量图标、标签
const batteryicon = hStack1.addText("⚡ 电量");
batteryicon.font = new Font('Menlo', 12); //font and size,字体与大小
batteryicon.textColor = new Color("a8df65"); //font color,字体颜色
batteryicon.textOpacity = (1); //opacity,不透明度
batteryicon.leftAlignText(); //AlignText,对齐方式(center,left,right)

// Battery Progress in stack,电量进度条
const batteryLine = hStack1.addText(renderBattery());
batteryLine.font = new Font("Menlo", 12); //font and size,字体与大小
batteryLine.textColor = new Color("a8df65"); //font color,字体颜色
batteryLine.textOpacity = (1);//opacity,不透明度
batteryLine.leftAlignText(); //Align,对齐方式(center,left,right)！在同一个stack内的对齐方式不能单独设置，只能调整向左对齐间距大小
function renderBattery() { 
const batteryLevel = Device.batteryLevel(); 
const juice = "▓".repeat(Math.floor(batteryLevel * 10)); 
const used = "░".repeat(10 - juice.length) 
const batteryAscii = " " + juice + used + " " ; 
return batteryAscii; }

// Battery Status in stack,电量状态
var battery =  getBatteryLevel();
if(Device.isCharging() && Device.batteryLevel() < 1){
  battery = battery + " 等我充满电就可以看片了⚡";
}
else if(Device.isCharging() && Device.batteryLevel() >= 1){
  battery = battery + " 已充满电!满血复活🐣!";
}
else if(Device.batteryLevel() >= 0.8 && Device.batteryLevel() <= 1){
  battery = battery + " 电量十足,撸一天都不是事!";
}
else if(Device.batteryLevel() >= 0.7 && Device.batteryLevel() <= 0.8){
  battery = battery + " 电量可以,不出国就没有问题!";
}
else if(Device.batteryLevel() >= 0.6 && Device.batteryLevel() <= 0.7){
  battery = battery + " 电量还有大半,不用着急充电!";
}
else if(Device.batteryLevel() >= 0.5 && Device.batteryLevel() <= 0.6){
  battery = battery + " 电量用了快一半,有点慌!";
}
else if(Device.batteryLevel() >= 0.4 && Device.batteryLevel() <= 0.5 && !Device.isCharging()){
  battery = battery + " 电量用了一半,有时间就充电啦!";
}
else if(Device.batteryLevel() >= 0.3 && Device.batteryLevel() <= 0.4 && !Device.isCharging()){
  battery = battery + " 电量用了大半了,备好电源数据线!";
}
else if(Device.batteryLevel() >= 0.2 && Device.batteryLevel() <= 0.3 && !Device.isCharging()){
  battery = battery + " 电量很快用完,赶紧充电啦!";
}
else if(Device.batteryLevel() >= 0.1 && Device.batteryLevel() <= 0.2 && !Device.isCharging()){
  battery = battery + " 电量就剩不到20%了,快插入充电!";
}
else if(Device.batteryLevel() <= 0.1 && !Device.isCharging()){
  battery = battery + " 电量快耗尽,再不充电就关机了!";
}
let batterytext = hStack1.addText(battery);
batterytext.font = new Font("Menlo", 12); //font and size,字体与大小
batterytext.textColor = new Color('a8df65'); //font color,字体颜色
batterytext.textOpacity = (1); //opacity,不透明度
batterytext.leftAlignText(); //Align,对齐方式(center,left,right)！在同一个stack内的对齐方式不能单独设置，只能调整向左对齐间距大小

//Spacing between battery and summary,电量与天气行间距
widgetHello.addSpacer(10);

// Widget feel temp
let feel = weathername + " today" + "." + " It feels like " + Math.round(feel_like) + "\u2103" + ";" + " the high will be " + Math.round(highTemp) + "\u2103";//"H:"+highTemp+"\u00B0"+" L:"+lowTemp+"\u00B0"
var hltemptext = widgetHello.addText(feel);
hltemptext.font = Font.regularSystemFont(12); //font and size,字体与大小
hltemptext.textColor = new Color('#fdd835'); //font color,字体颜色
hltemptext.textOpacity = (0.8); //opacity,不透明度
hltemptext.leftAlignText(); //Align,对齐方式(center,left,right)！在同一个stack内的对齐方式不能单独设置，只能调整向左对齐间距大小


//define horizontal stack,创建一个stack，使下面组件都在同一个stack中，布局为横向布局（hStack2）
widgetHello.addSpacer(6);
let hStack2 = widgetHello.addStack();
hStack2.layoutHorizontally();

// Centers line
hStack2.addSpacer(0)//Left spacing,向左对齐间距

// Date label,日期
var datefull = "⊱" + month + "-" + ordinalSuffix(date) + "  " + weekday + "  ";
const datetext = hStack2.addText(datefull);
datetext.font = Font.regularSystemFont(20); //font and size,字体与大小
datetext.textColor = new Color('#ffffff'); //font color,字体颜色
datetext.textOpacity = (1); //opacity,不透明度
datetext.centerAlignText(); //Align,对齐方式(center,left,right)！在同一个stack内的对齐方式不能单独设置，只能调整向左对齐间距大小

// 农历
var lunarDate = sloarToLunar(today.getFullYear(), today.getMonth() + 1, today.getDate())
const lunarText = lunarDate['lunarMonth'] + '月' + lunarDate['lunarDay'] + "⊰ "
const lunarDateText = hStack2.addText(lunarText);
lunarDateText.font = Font.regularSystemFont(20); //font and size,字体与大小
lunarDateText.textColor = new Color('#ffffff'); //font color,字体颜色
lunarDateText.textOpacity = (1); //opacity,不透明度
lunarDateText.centerAlignText(); //Align,对齐方式(center,left,right)！在同一个stack内的对齐方式不能单独设置，只能调整向左对齐间距大小

//tempeture label in stack
let temptext = hStack2.addText('\xa0\xa0'+ Math.round(curTemp).toString() + "\u2103" + "  ");
temptext.font = Font.boldSystemFont(20); //font and size,字体与大小
temptext.textColor = new Color('#ffffff'); //font color,字体颜色
temptext.textOpacity = (1); //opacity,不透明度
temptext.centerAlignText(); //AlignText,对齐方式(center,left,right)！在同一个stack内的对齐方式不能单独设置，只能调整向左对齐间距大小

// image
var img = Image.fromFile(await fetchimagelocal(iconData + "_ico")); 
//image in stack 天气图像
let widgetimg = hStack2.addImage(img); 
widgetimg.imageSize = new Size(20, 20); //image size,图像大小
widgetimg.centerAlignImage(); //Align,对齐方式(center,left,right)

// Bottom Spacer
 widgetHello.addSpacer();
 widgetHello.setPadding( 0, 0, 0, 0)
 widgetHello.backgroundImage = widget.backgroundImage
 Script.setWidget(widgetHello)
 Script.complete()


/*
 * The code below this comment is used to set up the invisible widget.
 * ===================================================================
 */
} else {
  
  // Determine if user has taken the screenshot.
  var message
  message = "开始之前，请返回主屏幕并长按进入编辑模式。滑动到最右边的空白页并截图。"
  let exitOptions = ["继续","退出以截图"]
  let shouldExit = await generateAlert(message,exitOptions)
  if (shouldExit) return
  
  // Get screenshot and determine phone size.
  let img = await Photos.fromLibrary()
  let height = img.size.height
  let phone = phoneSizes()[height]
  if (!phone) {
    message = "您似乎选择了非iPhone屏幕截图的图像，或者不支持您的iPhone。请使用其他图像再试一次。"
    await generateAlert(message,["OK"])
    return
  }
  
  // Prompt for widget size and position.
  message = "您想要创建什么尺寸的小部件？"
  let sizes = ["Small","Medium","Large"]
  let size = await generateAlert(message,sizes)
  let widgetSize = sizes[size]
  
  message = "您想它在什么位置？"
  message += (height == 1136 ? " (请注意，您的设备仅支持两行小部件，因此中间和底部选项相同。)" : "")
  
  // Determine image crop based on phone size.
  let crop = { w: "", h: "", x: "", y: "" }
  if (widgetSize == "Small") {
    crop.w = phone.small
    crop.h = phone.small
    let positions = ["Top left","Top right","Middle left","Middle right","Bottom left","Bottom right"]
    let position = await generateAlert(message,positions)
    
    // Convert the two words into two keys for the phone size dictionary.
    let keys = positions[position].toLowerCase().split(' ')
    crop.y = phone[keys[0]]
    crop.x = phone[keys[1]]
    
  } else if (widgetSize == "Medium") {
    crop.w = phone.medium
    crop.h = phone.small
    
    // Medium and large widgets have a fixed x-value.
    crop.x = phone.left
    let positions = ["Top","Middle","Bottom"]
    let position = await generateAlert(message,positions)
    let key = positions[position].toLowerCase()
    crop.y = phone[key]
    
  } else if(widgetSize == "Large") {
    crop.w = phone.medium
    crop.h = phone.large
    crop.x = phone.left
    let positions = ["Top","Bottom"]
    let position = await generateAlert(message,positions)
    
    // Large widgets at the bottom have the "middle" y-value.
    crop.y = position ? phone.middle : phone.top
  }
  
  // Crop image and finalize the widget.
  let imgCrop = cropImage(img, new Rect(crop.x,crop.y,crop.w,crop.h))
  
  message = "您的小部件背景已准备就绪。您想在Scriptable的小部件中使用它还是导出图像？"
  const exportPhotoOptions = ["在Scriptable中使用","导出图像"]
  const exportPhoto = await generateAlert(message,exportPhotoOptions)
  
  if (exportPhoto) {
    Photos.save(imgCrop)
  } else {
    files.writeImage(path,imgCrop)
  }
  
  Script.complete()
}

// Generate an alert with the provided array of options.
async function generateAlert(message,options) {
  
  let alert = new Alert()
  alert.message = message
  
  for (const option of options) {
    alert.addAction(option)
  }
  
  let response = await alert.presentAlert()
  return response
}

// Crop an image into the specified rect.
function cropImage(img,rect) {
   
  let draw = new DrawContext()
  draw.size = new Size(rect.width, rect.height)
  
  draw.drawImageAtPoint(img,new Point(-rect.x, -rect.y))  
  return draw.getImage()
}

// Pixel sizes and positions for widgets on all supported phones.
function phoneSizes() {
  let phones = { 
 "2688": {
   "small":  507,
   "medium": 1080,
   "large":  1137,
   "left":  81,
   "right": 654,
   "top":    228,
   "middle": 858,
   "bottom": 1488
 },
 
 "1792": {
   "small":  338,
   "medium": 720,
   "large":  758,
   "left":  54,
   "right": 436,
   "top":    160,
   "middle": 580,
   "bottom": 1000
 },
 
 "2436": {
   "small":  465,
   "medium": 987,
   "large":  1035,
   "left":  69,
   "right": 591,
   "top":    213,
   "middle": 783,
   "bottom": 1353
 },
 
 "2208": {
   "small":  471,
   "medium": 1044,
   "large":  1071,
   "left":  99,
   "right": 672,
   "top":    114,
   "middle": 696,
   "bottom": 1278
 },
 
 "1334": {
   "small":  296,
   "medium": 642,
   "large":  648,
   "left":  54,
   "right": 400,
   "top":    60,
   "middle": 412,
   "bottom": 764
 },
 
 "1136": {
   "small":  282,
   "medium": 584,
   "large":  622,
   "left": 30,
   "right": 332,
   "top":  59,
   "middle": 399,
   "bottom": 399
 }
  }
  return phones
}
