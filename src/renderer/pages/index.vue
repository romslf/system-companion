<template>
  <div class="e-nuxt-container">
    <div class="e-nuxt-content">
      <div class="e-nuxt-system-info">
        <cpu-information />
        <gpu-information />
        <ram-information />
      </div>
    </div>
    <!-- <div class="e-nuxt-links">
      <div class="e-nuxt-button" @click="openURL('https://github.com/michalzaq12/electron-nuxt')">
        Github
      </div>
      <div class="e-nuxt-button" @click="openURL('https://nuxtjs.org/guide')">
        Nuxt.js
      </div>
      <div class="e-nuxt-button" @click="openURL('https://electronjs.org/docs')">
        Electron.js
      </div>
    </div> -->
  </div>
</template>

<script>
import { remote } from 'electron'
import CpuInformation from '@/components/CpuInformation.vue'
import GpuInformation from '@/components/GpuInformation.vue'
import RamInformation from '@/components/RamInformation.vue'

export default {
  components: {
    CpuInformation,
    GpuInformation,
    RamInformation
  },
  data () {
    return {
      externalContent: ''
    }
  },
  methods: {
    openURL (url) {
      remote.shell.openExternal(url)
    }
  }
}
</script>

<style>
.title {
  color: #364758;
  font-size: 1.5em;
  letter-spacing: 0.25px;
  margin-top: 30px;
  margin-bottom: 10px;
}
.items {
  margin-top: 8px;
}
.item {
  display: flex;
  margin-bottom: 6px;
}
.item .name {
  color: #6a6a6a;
  margin-right: 6px;
}

.item .value {
  color: #364758;
  font-weight: bold;
}

.e-nuxt-container {
  min-height: calc(100vh - 50px);
  background: linear-gradient(to right, #ece9e6, #ffffff);
  font-family: Helvetica, sans-serif;
}

.e-nuxt-content {
  display: flex;
  justify-content: space-around;
  padding-top: 30px;
  padding-bottom: 50px;
  align-items: flex-start;
  flex-wrap: wrap;
}
</style>
