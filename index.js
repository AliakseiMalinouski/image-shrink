(function () {
    const { app, BrowserWindow } = require('electron');

    let $window = null;

    function createWindow () {
        $window = new BrowserWindow({
            width: 500,
            height: 600,
            icon: `${__dirname}/src/icons/Icon_256x256.png`
        });

        $window.loadFile('./src/index.html');
    }

    app.on('ready', createWindow);
})();
