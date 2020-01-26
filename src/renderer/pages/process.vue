<template>
  <div class="e-nuxt-container">
    <div class="e-nuxt-content">
      <div class="e-nuxt-system-info">
        <!-- CPU Load -->
        <div class="title">
          <v-icon
            left
            large
          >
            fas fa-microchip
          </v-icon>CPU Load
        </div>
        <hr>
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
        <hr>
        <!-- Process -->
        <div class="title">
          <v-icon
            left
            large
          >
            fas fa-list
          </v-icon>Processes list
          <v-spacer />
        </div>
        <div class="item">
          <div class="name">
            Sort by:
            <v-radio-group
              v-model="radio"
              row
            >
              <v-radio
                label="CPU"
                value="cpu"
              />
              <v-radio
                label="MEM"
                value="mem"
              />
              <v-radio
                label="Name"
                value="name"
              />
            </v-radio-group>
          </div>
        </div>
        <v-simple-table
          dense
          fixed-header
          height="500px"
        >
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  CPU usage
                </th>
                <th class="text-left">
                  MEM usage
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in process"
                :key="item.pid"
                @click="askKill(item.pid, item.name)"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.pcpu.toFixed(2) }}%</td>
                <td>{{ item.pmem.toFixed(2) }}%</td>
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
    </div>-->
  </div>
</template>

<script>
const dialog = require("electron").remote.dialog;
const { currentLoad, processes } = require("systeminformation");

export default {
  data() {
    return {
      radio: "cpu",
      avgLoad: 0,
      idleLoad: 0,
      currentLoad: 0,
      process: []
    };
  },
  created() {
    this.checkSys();
  },
  methods: {
    async checkSys() {
      var data;
      data = await processes();
      this.process = [];
      this.process = data.list;
      this.process = this.process.filter(el => el.name !== "System Idle Process" );
      if (this.radio === "cpu") {
        this.process.sort(function(a, b) {
          return b.pcpu - a.pcpu;
        });
      } else if (this.radio === "mem") {
        this.process.sort(function(a, b) {
          return b.pmem - a.pmem;
        });
      } else {
        this.process.sort(function(a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      }
      data = await currentLoad();
      this.avgLoad = data.avgload;
      this.currentLoad = data.currentload;
      this.idleLoad = data.currentload_idle;
      setTimeout(() => this.checkSys(), 2000);
    },
    askKill(pid, name) {
      if (name.includes("System Companion")) {
        dialog.showMessageBox(null, {
          type: "info",
          message: "Sorry you can't kill System Companion from here."
        });
      } else {
        dialog.showMessageBox(
          null,
          {
            type: "question",
            title: "Process kill",
            message: `Do you want to kill ${name} ?`,
            buttons: ["No", "Yes"]
          },
          response => {
            if (response === 1) {
              this.processKill(pid, name);
            }
          }
        );
      }
    },
    processKill(pid, name) {
      try {
        var done = process.kill(pid);
        if (done >= 0) {
          dialog.showMessageBox(null, {
            type: "info",
            title: "Process kill",
            message: `${name} as been killed`
          });
        } else {
          this.cantKill(name);
        }
      } catch (error) {
        this.cantKill(name);
      }
    },
    cantKill(name) {
      dialog.showMessageBox(null, {
        type: "info",
        title: "Process kill",
        message: `${name} can't be killed, try run System Companion as Admin`
      });
    }
  }
};
</script>