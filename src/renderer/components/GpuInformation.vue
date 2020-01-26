<template>
  <div>
    <!-- Gpu -->
    <div class="title">
      <v-icon
        left
        large
      >
        fas fa-video
      </v-icon> GPU
    </div>
    <hr>
    <div
      v-for="{ vendor, model, vram } in gpus"
      class="items"
    >
      <div class="item">
        <div class="name">
          Manufacturer:
        </div>
        <div class="value">
          {{ vendor }}
        </div>
      </div>
      <div class="item">
        <div class="name">
          Model:
        </div>
        <div class="value">
          {{ model }}
        </div>
      </div>
      <div class="item">
        <div class="name">
          VRAM:
        </div>
        <div class="value">
          {{ (vram / 1024).toFixed() }} Go
        </div>
      </div>
      <hr>
    </div>
    <!-- Displays -->
    <div class="title">
      <v-icon
        left
        large
      >
        fas fa-desktop
      </v-icon> Displays
    </div>
    <hr>
    <div
      v-for="{ vendor, model, connection, resolution } in displays"
      class="items"
    >
      <!-- <div class="item">
        <div class="name">Manufacturer:</div>
        <div class="value">{{ vendor }}</div>
      </div>
      <div class="item">
        <div class="name">Model:</div>
        <div class="value">{{ model }}</div>
      </div> -->
      <div class="item">
        <div class="name">
          Type:
        </div>
        <div class="value">
          {{ connection }}
        </div>
      </div>
      <div class="item">
        <div class="name">
          Resolution:
        </div>
        <div class="value">
          {{ resolution }}
        </div>
      </div>
      <!-- <div class="item">
        <div class="name">Refresh Rate:</div>
        <div class="value">{{ refreshRate }}</div>
      </div> -->
      <hr>
    </div>
  </div>
</template>

<script>
const { graphics } = require("systeminformation");

export default {
  data() {
    return {
      gpus: [
        { vendor: "Loading ...", model: "Loading ...", vram: "Loading ..." }
      ],
      displays: []
    };
  },
  created() {
    this.checkSys();
  },
  methods: {
    async checkSys() {
      var data;
      data = await graphics();
      console.log(data.displays);
      this.gpus = data.controllers;
      for (let display of data.displays) {
        var obj = {
          // vendor: display.vendor,
          // model: display.model,
          connection: display.connection,
          resolution: display.resolutionx + "x" + display.resolutiony,
          // refreshRate: display.currentRefreshRate
        };
        this.displays.push(obj);
      }
    }
  }
};
</script>

<style scoped>
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
</style>
