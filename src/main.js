'use strict'

const electron = require('electron');
const { app, BrowserWindow, ipcMain, Menu } = electron;

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

let mainWindow = null;

app.on('ready', () => {
    // ブラウザ(Chromium)の起動, 初期画面のロード
    // mainWindow = new BrowserWindow({
    //     width : 1400,
    //     height : 600,
    //     webPreferences : {
    //         nodeIntegration : true
    //     }
    // });
    mainWindow = new BrowserWindow({
        width : 800,
        height : 600,
        webPreferences : {
            nodeIntegration : true
        }
    });

    mainWindow.loadURL('file://' + __dirname + '/index.html');
    // mainWindow.openDevTools();

    mainWindow.on('closed', () => app.quit());

    // Menu
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

// Menu
let menuTemplate = [ {
    label : "Menu",
    submenu : [
        {
            label : "Quit",
            accelerator : process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
            click() {
                app.quit();
            }
        }
    ]
} ];

if (process.platform == 'darwin') {
    menuTemplate.unshift({ label : '' });
}