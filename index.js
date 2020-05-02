const electron = require('electron')
const path = require('path')
const faker = require('faker')
const AppTray = require('./app/app_tray')
const { app, BrowserWindow, ipcMain } = electron

const fakePathArray = []
for(let i = 0; i < 500; i++) {
    let randomFileName = faker.fake("{{system.commonFileName}}")
    fakePathArray.push('C:\\users\\user\\' + randomFileName)
}

let mainWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow(
        {
            webPreferences: {
                nodeIntegration: true,
                backgroundThrottling: false,
                devTools: process.env.NODE_ENV ? false:true
            },
            frame: false,
            titleBarStyle: 'customButtonsOnHover',
            minimizable: false,
            maximizable: false,
            closable: false,
            resizable: false,
            width: 1000,
            height: 650
        }
    )

    if(process.env.NODE_ENV) {
        mainWindow.loadURL(`file://${__dirname}/build/index.html`)
    } else {
        mainWindow.loadURL('http://localhost:3000')
    }

    const iconName = process.platform === 'win32' ? 'windows-icon.png':'iconTemplate.png'
    const iconPath = path.join(__dirname, `./assets/${iconName}`)
    mainWindow.tray = new AppTray(iconPath, mainWindow)

    mainWindow.tray.on('click', () => {
        mainWindow.show()
    })

})

// ipc

ipcMain.on('window:close', () =>{
    mainWindow.hide()
})

ipcMain.on('window:minimize', () =>{
    mainWindow.minimize()
})

ipcMain.on('data:fake_array', () =>{
    mainWindow.webContents.send('data:fake_array', fakePathArray)
})


