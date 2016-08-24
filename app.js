#!/usr/bin/env node

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

electron.crashReporter.start({
    productName: 'TES3MP-Launcher',
    companyName: 'TES3MP Team',
    submitURL: 'https://tes3mp.com/url-to-submit',
    autoSubmit: false
});

app.on('window-all-closed', function () {
   if(process.platform != 'darwin')
       app.quit();
});

var mainWindow = null;
app.on('ready', function () {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        'accept-first-mouse': true
    });
    //mainWindow.setMenu(null);

    mainWindow.loadURL('file://' + __dirname + '/public/index.html');

    //mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
});
