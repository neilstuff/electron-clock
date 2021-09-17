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
        resizable: false,
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

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

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