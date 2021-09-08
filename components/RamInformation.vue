<template>
  <div>
    <div class="title">
      <b-icon class="right" icon="memory" />
      Memory
    </div>
    <hr>
    <div class="items">
      <div class="item">
        <div class="name">
          Total:
        </div>
        <div class="value">
          {{ ramTotal }} Go
        </div>
      </div>
      <div class="item">
        <div class="name">
          Free:
        </div>
        <div class="value">
          {{ ramFree }} Go
        </div>
      </div>
      <div class="item">
        <div class="name">
          Used:
        </div>
        <div class="value">
          {{ ramUsed }} Go
        </div>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
const { mem } = require('systeminformation')

export default {
  data () {
    return {
      ramTotal: 'Loading ...',
      ramFree: 'Loading ...',
      ramUsed: 'Loading ...'
    }
  },
  created () {
    this.checkSys()
  },
  methods: {
    async checkSys () {
      let data
      data = await mem()
      this.ramTotal = (data.total / 1073741824).toFixed(2)
      this.ramFree = (data.free / 1073741824).toFixed(2)
      this.ramUsed = (data.used / 1073741824).toFixed(2)
    }
  }
}
</script>
