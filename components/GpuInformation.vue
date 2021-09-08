<template>
  <div class="container">
    <!-- Gpu -->
    <div class="title">
      <b-icon class="right" icon="video" />
      GPU
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
      <b-icon class="right" icon="desktop" />
      Displays
    </div>
    <hr>
    <div
      v-for="{ vendor, model, connection, max_resolution, curr_resolution } in displays"
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
          Max Resolution:
        </div>
        <div class="value">
          {{ max_resolution }}
        </div>
      </div>
	  <div class="item">
        <div class="name">
          Resolution:
        </div>
        <div class="value">
          {{ curr_resolution }}
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
const { graphics } = require('systeminformation')

export default {
  data () {
    return {
      gpus: [
        { vendor: 'Loading ...', model: 'Loading ...', vram: 'Loading ...' }
      ],
      displays: []
    }
  },
  created () {
    this.checkSys()
  },
  methods: {
    async checkSys () {
      let data
      data = await graphics()
      console.log(data.displays)
      this.gpus = data.controllers
      for (const display of data.displays) {
        const obj = {
          // vendor: display.vendor,
          // model: display.model,
          connection: display.connection,
          max_resolution: display.resolutionX + 'x' + display.resolutionY,
          curr_resolution: display.currentResX + 'x' + display.currentResY
          // refreshRate: display.currentRefreshRate
        }
		console.log(display)
        this.displays.push(obj)
      }
    }
  }
}
</script>
