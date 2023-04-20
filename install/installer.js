Script.Installer = async () => {
  let continueRun = true;
  const INSTALL_NAME = '';
  console.log(`👉公众号«杂货万事屋»`);
  console.log(`🚀安装«${INSTALL_NAME}»小组件`);
  const fileManager = FileManager[module.filename.includes('Documents/iCloud~') ? 'iCloud' : 'local']();
  await Promise.all([`${INSTALL_NAME}.js`].map(async widgetFullName => {
    const widgetName = widgetFullName.replace('.js', '');
    console.log("👉下载小组件«" + widgetName + "»");
    let url = `https://raw.githubusercontent.com/Enjoyee/Scriptable/v2/${encodeURIComponent(widgetName)}.js`;
    console.log('👉脚本地址：' + url);
    const req = new Request(url);
    const res = await req.load();
    const widgetFullPath = fileManager.joinPath(fileManager.documentsDirectory(), widgetFullName);
    if (fileManager.fileExists(widgetFullPath)) {
      let alert = new Alert();
      alert.title = "⚠️ 发现同名小组件 ⚠️";
      alert.message = "\n是否替换此小组件\n" + "«" + INSTALL_NAME + "»";
      alert.addAction("替换");
      alert.addCancelAction("退出");
      let response = await alert.presentAlert();
      continueRun = response !== -1;
    }
    if (!continueRun) {
      console.log("⛔️停止安装小组件");
    } else {
      fileManager.write(widgetFullPath, res);
      console.log(`👉创建«${widgetName}»完成`);
    }
  }));
  if (continueRun) {
    fileManager.remove(module.filename);
    console.log("⛔️删除安装脚本文件");
    Safari.open(`scriptable:///run/${encodeURIComponent(INSTALL_NAME)}`);
    console.log(`👉运行«${INSTALL_NAME}»小组件`);
  }
}