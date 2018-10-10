const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const { ipcMain } = electron

const path = require('path');
const url = require('url');
const Store = require('./store')

var fs   = require('fs');
var ytdl = require('youtube-dl');

const store = new Store({
    configName: 'user-preferences',
    defaults: {
        windowBounds: { width: 800, height: 600 },
        theme: 'light',
        downloadLocation: app.getPath('videos')
    }
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let mainWindow;
function createWindow() {
    store.set('windowBounds', { width: 1240, height: 800 });
    
    // Get User Defaults
    //let { width, height } = store.get('windowBounds');    
    // Create the browser window.
    mainWindow = new BrowserWindow({ 
        //maxWidth: 1240, 
        width: 1240, 
        //minWidth: 800,

        //maxHeight: 800, 
        height: 800, 
        //minHeight: 600,
        frame: false ,
        resizable: false
    });

    // and load the index.html of the app.
    const startUrl = process.env.ELECTRON_START_URL || url.format({
            pathname: path.join(__dirname, './build/index.html'),
            protocol: 'file:',
            slashes: true
        });
    mainWindow.loadURL(startUrl);
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    
    // mainWindow.on('resize', () => {
    //     let { width, height } = mainWindow.getBounds();
    //     store.set('windowBounds', { width, height });
    // });
    
    mainWindow.setMenu(null)
    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

ipcMain.on('quit:app', () => {
    app.quit()
})

ipcMain.on('download:video', function(event, arg) {
    console.log(arg);  // prints "ping"
    //event.sender.send('download:video', );
    playlist(arg)
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


function playlist(url) {
    'use strict';
    var video = ytdl(url);

    video.on('error', function error(err) {
    console.log('error 2:', err);
    });

    var size = 0;

    video.on('info', function(info) {
        size = info.size;
        var output = path.resolve(store.get('downloadLocation'), info._filename + '.mp4');

        const VideoInfo = {
            duration: info.duration,
            title: info.fulltitle,
            resolution: info.resolution,
            thumbnail: info.thumbnail
        }

        mainWindow.webContents.send('download:video:info', VideoInfo)

        video.pipe(fs.createWriteStream(path.resolve(output)));
    });

    var pos = 0;
    video.on('data', function data(chunk) {
    pos += chunk.length;
    // `size` should not be 0 here.
    if (size) {
        var percent = (pos / size * 100).toFixed(2);
        // process.stdout.cursorTo(0);
        // process.stdout.clearLine(1);
        // process.stdout.write(percent + '%');
    }
    });

    video.on('next', playlist);

}