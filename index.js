(function () {
    const { app, BrowserWindow, Menu, globalShortcut, ipcMain } = require('electron');

    let $about = null;
    let $window = null;
    let $mainMenu = null;

    const isMac = process.platform === 'darwin';
    const isClosed = BrowserWindow.getAllWindows().length === 0;
    const isDevelopment = process.env.NODE_ENV == 'development';

    const menu = [
        ...(isMac && [{ role: 'appMenu' }]),
        {
            role: 'fileMenu'
        },
        {
            label: 'Developer',
            submenu: [
                {
                    role: 'reload',
                },
                {
                    role: 'forcereload',
                },
                {
                    type: 'separator',
                },
                {
                    role: 'toggledevtools',
                },
            ]
        },
        {
            label: 'About',
            submenu: [
                {
                    label: 'Go to about',
                    click: () => createWindow({ width: 200, height: 300 }, './src/pages.about.html', $about)
                }
            ],
        }
    ];

    function createWindow (options, pagePath, $store) {
        const { width, height } = options;
        $store = new BrowserWindow({
            width,
            height,
            icon: `${__dirname}/src/icons/Icon_256x256.png`,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            },

        });

        globalShortcut.register('CmdOrCtrl+Shift+R', () => $store.reload());
        globalShortcut.register(isMac ? 'Cmd+Option+I' : 'F12', () => $store.toggleDevTools());

        $store.loadFile(pagePath);
        $store.on('ready', () => $window = null);
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

    ipcMain.on('image:minimize', (e, options) => {
        /* ...  */
        console.log(options)
    });

    app.on('ready', () => createWindow({ widht: 500, height: 600 }, './src/index.html', $window));
    app.on('ready', createMenu);
    app.on('window-all-closed', closeWindows);
    app.on('activate', restart);
    app.allowRendererProcessReuse = true;
})();
