<template>
  <div>
    <div class="title">
      <v-icon
        left
        large
      >
        fas fa-memory
      </v-icon> Ram
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
const { mem } = require("systeminformation");

export default {
  data () {
    return {
      ramTotal: "Loading ...",
      ramFree: "Loading ...",
      ramUsed: "Loading ..."
    };
  },
  created () {
      this.checkSys();
  },
  methods: {
      async checkSys () {
        var data;
        data = await mem();
        this.ramTotal = (data.total / 1073741824).toFixed(2);
        this.ramFree = (data.free / 1073741824).toFixed(2);
        this.ramUsed = (data.used / 1073741824).toFixed(2);
    }
  }
};
</script>

<style scoped>
    .title {
        color: #364758;
        font-size: 1.5em;
        letter-spacing: .25px;
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
