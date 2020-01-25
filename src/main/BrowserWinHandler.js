import { EventEmitter } from 'events'
import { BrowserWindow, dialog, app, Menu } from 'electron'
import { autoUpdater } from 'electron-updater'
const isProduction = process.env.NODE_ENV === 'production'
Menu.setApplicationMenu(null)

export default class BrowserWinHandler {
  /**
     * @param [options] {object} - browser window options
     * @param [allowRecreate] {boolean}
     */
  constructor(options, allowRecreate = true) {
    this._eventEmitter = new EventEmitter()
    this.allowRecreate = allowRecreate
    this.options = options
    this.browserWindow = null
    this._createInstance()
  }

  _createInstance() {
    const options = {
      type: 'question',
      buttons: ['No, thanks', 'Yes, please'],
      defaultId: 1,
      title: 'Question',
      message: 'Do you want to do this?'
    };

    autoUpdater.on('update-available', () => {
      if (process.platform === 'win32' || process.platform === 'win64') {
        options.title = "Update"
        options.message = "Update available, download it ?"
        dialog.showMessageBox(null, options, (response) => {
          if (response === 1) {
            autoUpdater.downloadUpdate()
            autoUpdater.on('update-downloaded', () => {
              autoUpdater.quitAndInstall();
            })
          }
        });
      } else {
        options.title = "Update"
        options.message = "Update available, download it ?"
        dialog.showMessageBox(null, options, (response) => {
          if (response === 1) {
            let child = new BrowserWindow({ modal: false, show: false })
            child.loadURL('https://github.com/romslf/system-companion/releases/latest')
            child.once('ready-to-show', () => {
              child.show()
            })
          }
        });
      }
    })

    autoUpdater.on('error', (err) => {
      console.log(err);
    })

    app.on('ready', () => {
      this._create()
      autoUpdater.autoDownload = false
      autoUpdater.checkForUpdates()
    })

    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (!this.allowRecreate) return
    app.on('activate', () => this._recreate())
  }

  _create() {
    this.browserWindow = new BrowserWindow(
      {
        ...this.options,
        webPreferences: {
          ...this.options.webPreferences,
          webSecurity: isProduction, // disable on dev to allow loading local resources
          nodeIntegration: true, // allow loading modules via the require () function
          devTools: !isProduction // disable on e2e test environment
        }
      }
    )
    this.browserWindow.on('closed', () => {
      // Dereference the window object
      this.browserWindow = null
    })
    this._eventEmitter.emit('created')
  }

  _recreate() {
    if (this.browserWindow === null) this._create()
  }

  /**
     * @callback onReadyCallback
     * @param {BrowserWindow}
     */

  /**
     *
     * @param callback {onReadyCallback}
     */
  onCreated(callback) {
    this._eventEmitter.once('created', () => {
      callback(this.browserWindow)
    })
  }

  /**
     *
     * @returns {Promise<BrowserWindow>}
     */
  created() {
    return new Promise(resolve => {
      this._eventEmitter.once('created', () => {
        resolve(this.browserWindow)
      })
    })
  }
}
