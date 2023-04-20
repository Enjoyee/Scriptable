const projectId = '50019248';
const currDate = new Date().getTime();
const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
  "Cookie": "862429528_50019248_/prong/iterations/index_remember_view=1150019248001001403; iter_card_status=; iteration_tflnewfilter_status=close; tui_filter_fields=%5B%22title%22%2C%22current_owner%22%2C%22status%22%2C%22priority%22%5D; _qddaz=QD.268823144296912; last_iteration_50019248=1150019248001000083; iteration_view_type_cookie=card_view; __root_domain_v=.tapd.cn; iteration_card__862429528_50019248=1; tapdsession=166977892639bf4597eec45d43ac8bd9c6b59cbf38d6665318fbb333af430a047906542c7f; t_u=d40f3120339473b52c74c182d1d306cdfe5c69d9a62917e2f6c0c889eec9d3858cf1830fb76a1a3ec48f8fd7bd6f7c6ce40127808fa588f392c584a02a211c2dd90cd152824dc5f1%7C1; new_worktable=todo%7Cexpiration_date%7Cexpiration_date%7Cexpiration_date; _t_uid=862429528; _t_crop=66005810; tapd_div=101_2885; dsc-token=qqLV4FeC0pDcq1O9; iteration_card_current_iteration_50019248=1150019248001000097; _wt=eyJ1aWQiOiI4NjI0Mjk1MjgiLCJjb21wYW55X2lkIjoiNjYwMDU4MTAiLCJleHAiOjE2NzE0MTY2NTJ9.d945bc9ca576f78e7717bb1ae2c4258c1f225c872665f6e5af6cd86caaaccaf3"
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