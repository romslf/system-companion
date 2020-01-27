# System Companion
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/3041f7d3b2ff4d06b47f385d0cb33907)](https://www.codacy.com/manual/romslf/system-companion?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=romslf/system-companion&amp;utm_campaign=Badge_Grade) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/romslf/system-companion) ![GitHub All Releases](https://img.shields.io/github/downloads/romslf/system-companion/total)
> Feel free to contact me for any suggestions [rolaforg@student.le-101.fr](mailto:rolaforg@student.le-101.fr?subject=[GitHub]%20System%20Companion)

This repository contain a multi-platform application to get useful informations about your system and more.
It should work on Windows, Mac, Linux (Untested for now).

## Features (For now, a lot in coming)

Get the follwing informations:

- CPU (Manufacturer, Model, Frequency, Cores)
- GPU (Manufacturer, Model, VRAM)
- RAM (Total, Used, Free)
- Displays (Type [HDMI, Display Port], Resolution)
- Network adapter list (Name, Description, IPv4, IPv6, Mav, Type [Wired, Wireless], Max Speed)

And

- Get average, current, Idle CPU load
- Get process list (Sort by: name, cpu, memory usage)
- Kill processes
- Auto-update (Only windows for now, other platforms will get a pop-up with github [release](https://github.com/romslf/system-companion/releases/latest))

### Build Setup

``` bash
# install dependencies
npm install

# serve app with hot reload
npm run dev

# build electron application for production
npm run build


```

---

This project was generated with [electron-nuxt](https://github.com/michalzaq12/electron-nuxt) v1.3.1 using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://github.com/michalzaq12/electron-nuxt/blob/master/README.md).
