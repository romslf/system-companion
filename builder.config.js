const ICONS_DIR = "static/icons/";

const windowsOS = {
	win: {
		icon: ICONS_DIR + "win-icon.ico",
		publisherName: "github.comm/romslf",
		verifyUpdateCodeSignature: false,
		target: "nsis"
	},
	nsis: {
		oneClick: true,
		differentialPackage: true,
		createDesktopShortcut: true,
		allowToChangeInstallationDirectory: false
	}
};

const linuxOS = {
	linux: {
		icon: ICONS_DIR,
		target: "deb"
	}
};

const macOS = {
	mac: {
		target: "dmg",
		icon: ICONS_DIR + "icon.icns"
	},
	dmg: {
		contents: [
			{
				x: 410,
				y: 150,
				type: "link",
				path: "/Applications"
			},
			{
				x: 130,
				y: 150,
				type: "file"
			}
		]
	}
};

module.exports = {
	asar: false,
	productName: "System Companion",
	appId: "com.github.romslf.system-companion",
	artifactName: "system-companion-${version}.${ext}",
	directories: {
		output: "build"
	},
	// default files: https://www.electron.build/configuration/contents
	...windowsOS,
	...linuxOS,
	...macOS
};
