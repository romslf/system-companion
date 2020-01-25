import { EventEmitter } from 'events'
import { BrowserWindow, app } from 'electron'
import {autoUpdater} from 'electron-updater'
const isProduction = process.env.NODE_ENV === 'production'

export default class BrowserWinHandler {
  /**
     * @param [options] {object} - browser window options
     * @param [allowRecreate] {boolean}
     */
  constructor (options, allowRecreate = true) {
    this._eventEmitter = new EventEmitter()
    this.allowRecreate = allowRecreate
    this.options = options
    this.browserWindow = null
    this._createInstance()
  }

  _createInstance () {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    autoUpdater.on('checking-for-update', () => {
      console.log("1")
    })
    autoUpdater.on('update-available', (ev, info) => {
      console.log("2")
    })
    autoUpdater.on('update-not-available', (ev, info) => {
      console.log("3")
    })
    autoUpdater.on('error', (ev, err) => {
      console.log("4")
    })
    autoUpdater.on('download-progress', (ev, progressObj) => {
      console.log("5")
    })
    autoUpdater.on('update-downloaded', (ev, info) => {
      // Wait 5 seconds, then quit and install
      // In your application, you don't need to wait 5 seconds.
      // You could call autoUpdater.quitAndInstall(); immediately
      console.log("6")
      autoUpdater.quitAndInstall();  
    })
    
    app.on('ready', () => {
      this._create()
      console.log("0")
      autoUpdater.checkForUpdates()
    })

    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (!this.allowRecreate) return
    app.on('activate', () => this._recreate())
  }

  _create () {
    this.browserWindow = new BrowserWindow(
      {
        ...this.options,
        webPreferences: {
          ...this.options.webPreferences,
          webSecurity: isProduction, // disable on dev to allow loading local resources
          nodeIntegration: true, // allow loading modules via the require () function
          devTools: !process.env.SPECTRON // disable on e2e test environment
        }
      }
    )
    this.browserWindow.on('closed', () => {
      // Dereference the window object
      this.browserWindow = null
    })
    this._eventEmitter.emit('created')
  }

  _recreate () {
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
  onCreated (callback) {
    this._eventEmitter.once('created', () => {
      callback(this.browserWindow)
    })
  }

  /**
     *
     * @returns {Promise<BrowserWindow>}
     */
  created () {
    return new Promise(resolve => {
      this._eventEmitter.once('created', () => {
        resolve(this.browserWindow)
      })
    })
  }
}
