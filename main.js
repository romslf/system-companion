/*
**  Nuxt
*/
const { autoUpdater } = require("electron-updater");
const http = require('http')
const { Nuxt, Builder } = require('nuxt')
let config = require('./nuxt.config.js')
config.rootDir = __dirname // for electron-builder
// Init Nuxt.js
const nuxt = new Nuxt(config)
const builder = new Builder(nuxt)
const server = http.createServer(nuxt.render)
// Build only in dev mode
if (config.dev) {
	builder.build().catch(err => {
		console.error(err) // eslint-disable-line no-console
		process.exit(1)
	})
}
// Listen the server
server.listen()
const _NUXT_URL_ = `http://localhost:${server.address().port}`
console.log(`Nuxt working on ${_NUXT_URL_}`)

/*
** Electron
*/
let win = null // Current window
const electron = require('electron')
const path = require('path')
const app = electron.app
const newWin = () => {
	const options = {
		type: "question",
		buttons: ["No, thanks", "Yes, please"],
		defaultId: 1,
		title: "Question",
		message: "Do you want to do this?"
	  };
  
	  autoUpdater.on("update-available", () => {
		if (process.platform === "win32" || process.platform === "win64") {
		  options.title = "Update";
		  options.message = "Update available, download it ?";
		  dialog.showMessageBox(null, options, (response) => {
			if (response === 1) {
			  autoUpdater.downloadUpdate();
			  autoUpdater.on("update-downloaded", () => {
				autoUpdater.quitAndInstall();
			  });
			}
		  });
		} else {
		  options.title = "Update";
		  options.message = "Update available, download it ?";
		  dialog.showMessageBox(null, options, (response) => {
			if (response === 1) {
			  let child = new BrowserWindow({ modal: false, show: false });
			  child.loadURL("https://github.com/romslf/system-companion/releases/latest");
			  child.once("ready-to-show", () => {
				child.show();
			  });
			}
		  });
		}
	  });
  
	  autoUpdater.on("error", (err) => {
		console.log(err);
	  });
  
	win = new electron.BrowserWindow({
		icon: path.join(__dirname, 'static/icons/win-icon.ico'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
		autoHideMenuBar: true
	})
	//win.maximize()
	win.on('closed', () => win = null)
	if (config.dev) {
		// Install vue dev tool and open chrome dev tools
		const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')
		installExtension(VUEJS_DEVTOOLS.id).then(name => {
			console.log(`Added Extension:  ${name}`)
			win.webContents.openDevTools()
		}).catch(err => console.log('An error occurred: ', err))
		// Wait for nuxt to build
		const pollServer = () => {
			http.get(_NUXT_URL_, (res) => {
				if (res.statusCode === 200) { win.loadURL(_NUXT_URL_) } else { setTimeout(pollServer, 300) }
			}).on('error', pollServer)
		}
		pollServer()
	} else { return win.loadURL(_NUXT_URL_) }
	//this._create();
	autoUpdater.autoDownload = false;
	console.log("Checking updates ...")
	autoUpdater.checkForUpdates();
}
app.on('ready', newWin)
app.on('window-all-closed', () => app.quit())
app.on('activate', () => win === null && newWin())
