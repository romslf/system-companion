<template>
  <div class="e-nuxt-container">
    <div class="e-nuxt-content">
      <div class="e-nuxt-system-info">
        <!-- CPU Load -->
        <div class="title">
          <v-icon left large>fas fa-microchip</v-icon>CPU Load
        </div>
        <hr />
        <div class="items">
          <div class="item">
            <div class="name">
              Average:
            </div>
            <div class="value">
              {{ avgLoad.toFixed(2) }}%
            </div>
          </div>
          <div class="item">
            <div class="name">
              Current:
            </div>
            <div class="value">
              {{ currentLoad.toFixed(2) }}%
            </div>
          </div>
          <div class="item">
            <div class="name">
              Idle:
            </div>
            <div class="value">
              {{ idleLoad.toFixed(2) }}%
            </div>
          </div>
        </div>
        <hr />
        <!-- Process -->
        <div class="title">
          <v-icon left large>fas fa-list</v-icon>Processes list <v-spacer />
        </div>
        <div class="item">
          <div class="name">
                Sort by:
            <v-radio-group v-model="radio" row>
              <v-radio label="CPU" value="radio-1"></v-radio>
              <v-radio label="MEM" value="radio-2"></v-radio>
            </v-radio-group>
          </div>
        </div>
        <v-simple-table dense fixed-header height="500px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">CPU usage</th>
                <th class="text-left">MEM usage</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in process" :key="item.pid">
                <td>{{ item.name }}</td>
                <td>{{ item.pcpu.toFixed(3) }}%</td>
                <td>{{ item.pmem.toFixed(3) }}%</td>
              </tr>
            </tbody>
          </template>
      </v-simple-table>
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
const { currentLoad, processes } = require('systeminformation')

export default {
  data () {
    return {
      radio: "radio-1",
      avgLoad: 0,
      idleLoad: 0,
      currentLoad: 0,
      process: []
    }
  },
  methods: {
    async checkSys() {
      var data;
      data = await processes();
      this.process = []
      for (let pro of data.list) {
        this.process.push(pro)
      }
      if (this.radio === "radio-1") {
        this.process.sort(function(a, b){return b.pcpu - a.pcpu})
      } else {
        this.process.sort(function(a, b){return b.pmem - a.pmem})
      }
      data = await currentLoad();
      this.avgLoad = data.avgload
      this.currentLoad = data.currentload
      this.idleLoad = data.currentload_idle
      setTimeout(res => this.checkSys(), 2000)
    }
  },
  created() {
    this.checkSys()
  }
}
</script>