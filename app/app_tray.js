const electron = require('electron')
const {Tray, app, Menu} = electron

class AppTray extends Tray {
    constructor(iconPath, mainWindow){
        super(iconPath)

        this.mainWindow = mainWindow
        this.setToolTip('RAV (protected)')
        this.on('right-click',this.onRightClick.bind(this))
    }

    onRightClick (e) {
        const menuConfig = Menu.buildFromTemplate([
            {
                label: 'Open Reason Antivirus',
                click: () => this.mainWindow.show()
            },
            {
                label: 'Settings',
                click: () => this.mainWindow.show()
            },
            {
                label: 'About reason',
                click: () => this.mainWindow.show()
            },
            {
                label: 'Quit',
                click: () => app.exit()
            }
        ])

        this.popUpContextMenu(menuConfig)
    }

}

module.exports = AppTray