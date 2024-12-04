(function () {
    const { app, BrowserWindow } = require('electron');

    let $window = null;

    const isMac = process.platform === 'darwin';
    const isClosed = BrowserWindow.getAllWindows().length === 0;
    const isDevelopment = process.env.NODE_ENV == 'development';

    function createWindow () {
        $window = new BrowserWindow({
            width: 500,
            height: 600,
            icon: `${__dirname}/src/icons/Icon_256x256.png`,
        });

        $window.loadFile('./src/index.html');
    }

    function closeWindows () {
        if(!isMac) app.quit();
    }

    function restart () {
        if(isClosed) {
            createWindow();
        }
    }

    app.on('ready', createWindow);
    app.on('window-all-closed', closeWindows);
    app.on('activate', restart);
    app.allowRendererProcessReuse = true;
})();
