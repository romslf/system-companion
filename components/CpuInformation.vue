<template>
  <div>
    <div class="title">
      <b-icon class="right" icon="microchip" />
      CPU
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
          {{ cpuSpeed }} Ghz
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
const { cpu } = require('systeminformation')

export default {
  data () {
    return {
      cpuManufacturer: 'Loading ...',
      cpuBrand: 'Loading ...',
      cpuPhysicalCores: 'Loading ...',
      cpuCores: 'Loading ...',
      cpuSpeed: 'Loading ...'
    }
  },
  created () {
    this.checkSys()
  },
  methods: {
    async checkSys () {
      let data
      data = await cpu()
      this.cpuManufacturer = data.manufacturer
      this.cpuBrand = data.brand
      this.cpuPhysicalCores = data.physicalCores
      this.cpuCores = data.cores
      this.cpuSpeed = data.speedMax
    }
  }
}
</script>
