# System Companion

![GitHub all releases](https://img.shields.io/github/downloads/romslf/system-companion/total)

[Contributing](https://github.com/romslf/system-companion/blob/master/CONTRIBUTING.md) | 
[License](https://github.com/romslf/system-companion/blob/master/LICENSE)

## Description

This repository contain a multi-platform application to get useful informations about your system and manage running processes.
It should work on Windows, Mac, Linux (Untested for now).

## Preview
![Animation](https://github.com/romslf/system-companion/blob/main/Animation.gif?raw=true)

## Features

Get the follwing informations:

- CPU (Manufacturer, Model, Frequency, Cores)
- GPU (Manufacturer, Model, VRAM)
- RAM (Total, Used, Free)
- Displays (Type [HDMI, Display Port], Resolution)
- Network adapter list (Name, Description, IPv4, IPv6, Mav, Type [Wired, Wireless], Max Speed)

And

- Get average and current CPU load
- Processes list (Sort and search features + kill)
- Get Docker informations, running/paused/stopped images...
- Auto-update (Only windows for now, other platforms will get a pop-up with github [release](https://github.com/romslf/system-companion/releases/latest))

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# development with vue devtools
$ npm run dev

# build for production
$ npm run build

For detailed explanation on how things work, checkout [Nuxt.js](https://github.com/nuxt/nuxt.js), [Electron.js](https://electronjs.org/), and [electron-builder](https://www.electron.build/).