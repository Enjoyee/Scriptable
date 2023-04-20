const projectId = '';
const currDate = new Date().getTime();
const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
  "Cookie": ""
};
let RE = new Request(`https://www.tapd.cn/${projectId}/prong/iterations/get_next_page_iterations?page=1&isShowParentWorkspaceName=true&limit=20&time${currDate}`);
RE.headers = HEADERS;
let html = await RE.loadString();
const webview = new WebView();
await webview.loadHTML(html);
const getIterationId = `
    function getIterationId() {
      let currentIterationId;
        try {
            currentIterationId = document.getElementsByClassName('iteration-current__tag')[0].parentElement.parentElement.getAttribute('iteration_id')
        } catch(e) {
            log(e);
        }
        return currentIterationId;
    }
    getIterationId()
`
const currentIterationId = await webview.evaluateJavaScript(getIterationId, false);
//////////////////////////////
RE = new Request(`https://www.tapd.cn/${projectId}/prong/iterations/ajax_get_card_view_by_iteration_id/${currentIterationId}?limit=50&sort_name=&order=&page=1&types[]=story&types[]=bug&time=${currDate}`);
RE.headers = HEADERS;
RE.method = 'GET';
await webview.loadRequest(RE);
html = await webview.getHTML();
await webview.loadHTML(html);
const getTask = `
    function getTask() {
      const taskTitleArr = [];
        try {
            const totalTask = document.getElementsByClassName('growing-title iteration__growing-title');
            for(let task of totalTask) {
              taskTitle = task.innerText;
              if(taskTitle) {
                taskTitleArr.push(taskTitle);
              }
            }
        } catch(e) {
            log(e);
        }
        return taskTitleArr;
    }
    getTask()
`
const taskTitleArr = await webview.evaluateJavaScript(getTask, false);
console.log(JSON.stringify(taskTitleArr));