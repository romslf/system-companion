<template>
  <div>
    <div class="title">
      <v-icon
        left
        large
      >
        fas fa-microchip
      </v-icon> CPU
    </div>
    <hr>
    <div class="items">
      <div class="item">
        <div class="name">
          Manufacturer:
        </div>
        <div class="value">
          {{ cpuManufacturer }}
        </div>
      </div>
      <div class="item">
        <div class="name">
          Model:
        </div>
        <div class="value">
          {{ cpuBrand }}
        </div>
      </div>
      <div class="item">
        <div class="name">
          Max frequency:
        </div>
        <div class="value">
          {{ cpuSpeed }}
        </div>
      </div>
      <div class="item">
        <div class="name">
          Physical Core:
        </div>
        <div class="value">
          {{ cpuPhysicalCores }}
        </div>
      </div>
      <div class="item">
        <div class="name">
          Core:
        </div>
        <div class="value">
          {{ cpuCores }}
        </div>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
const { cpu } = require("systeminformation");

export default {
  data () {
    return {
      cpuManufacturer: "Loading ...",
      cpuBrand: "Loading ...",
      cpuPhysicalCores: "Loading ...",
      cpuCores: "Loading ...",
      cpuSpeed: "Loading ...",
    };
  },
  created () {
      this.checkSys();
  },
  methods: {
      async checkSys () {
        var data;
        data = await cpu();
        this.cpuManufacturer = data.manufacturer;
        this.cpuBrand = data.brand;
        this.cpuPhysicalCores = data.physicalCores;
        this.cpuCores = data.cores;
        this.cpuSpeed = data.speedmax;
    }
  }
};
</script>

<style scoped>
    .title {
        color: #364758;
        font-size: 1.5em;
        letter-spacing: .25px;
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
