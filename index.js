(function () {
    const { app, BrowserWindow, Menu } = require('electron');

    let $window = null;
    let $mainMenu = null;

    const isMac = process.platform === 'darwin';
    const isClosed = BrowserWindow.getAllWindows().length === 0;
    const isDevelopment = process.env.NODE_ENV == 'development';

    const menu = [
        ...(isMac && [{ role: 'appMenu' }]),
        {
            label: 'File',
            submenu: [
                {
                    label: 'Quit',
                    click: () => app.quit(),
                }
            ],
        }
    ];

    function createWindow () {
        $window = new BrowserWindow({
            width: 500,
            height: 600,
            icon: `${__dirname}/src/icons/Icon_256x256.png`,
        });

        $window.loadFile('./src/index.html');
        $window.on('ready', () => $window = null);
    }

    function createMenu () {
        $mainMenu = Menu.buildFromTemplate(menu);
        Menu.setApplicationMenu($mainMenu);
    }

    function closeWindows () {
        if(!isMac) app.quit();
    }

    function restart () {
        if(isClosed) return;
        createWindow();
    }

    app.on('ready', createWindow);
    app.on('ready', createMenu);
    app.on('window-all-closed', closeWindows);
    app.on('activate', restart);
    app.allowRendererProcessReuse = true;
})();
