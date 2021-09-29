'use strict';

const electron = require('electron')
const { app, ipcMain, protocol, BrowserWindow } = require('electron');

const path = require('path')
const url = require('url')

var mainWindow = null;

function createWindow() {

    mainWindow = new BrowserWindow({
        width: 110,
        height: 110,
        minWidth: 110,
        minHeight: 110,
        maxWidth: 110,
        maxHeight: 110,
        resizable: true,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, "preload.js")
        }

    });

    mainWindow.setMenu(null);

    mainWindow.loadURL(`file:///${path.join(__dirname, 'index.html')}`);

    mainWindow.on('closed', () => {
        mainWindow = null
    })

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    app.quit()
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

ipcMain.on('quit', function(event, arg) {

    app.quit();

})