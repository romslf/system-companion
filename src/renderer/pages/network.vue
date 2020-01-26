<template>
  <div class="e-nuxt-container">
    <div class="e-nuxt-content">
      <div class="e-nuxt-system-info">
        <!-- Gpu -->
        <div class="title">
          <v-icon
            left
            large
          >
            fas fa-network-wired
          </v-icon> Network
        </div>
        <hr>
        <div
          v-for="{ iface, ifaceName, ip4, ip6, mac, type, speed } in interfaces"
          :key="ip6"
          class="items"
        >
          <div class="item">
            <div class="name">
              Name:
            </div>
            <div class="value">
              {{ ifaceName }}
            </div>
          </div>
          <div class="item">
            <div class="name">
              Description:
            </div>
            <div class="value">
              {{ iface }}
            </div>
          </div>
          <div class="item">
            <div class="name">
              IPv4:
            </div>
            <div class="value">
              {{ ip4 }}
            </div>
          </div>
          <div class="item">
            <div class="name">
              IPv6:
            </div>
            <div class="value">
              {{ ip6 }}
            </div>
          </div>
          <div class="item">
            <div class="name">
              Mac:
            </div>
            <div class="value">
              {{ mac }}
            </div>
          </div>
          <div class="item">
            <div class="name">
              Type:
            </div>
            <div class="value">
              {{ type.toUpperCase() }}
            </div>
          </div>
          <div class="item">
            <div class="name">
              Speed:
            </div>
            <div class="value">
              {{ speed }} MBit/s
            </div>
          </div>
          <hr>
        </div>
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
const { networkInterfaces } = require("systeminformation");

export default {
  data () {
    return {
      interfaces: [{ iface: "Loading ...", ifaceName: "Loading ...", ip4: "Loading ...", ip6: "Loading ...", mac: "Loading ...", type: "Loading ...", speed: "Loading ..." }]
    };
  },
  created() {
    this.checkSys();
  },
  methods: {
    async checkSys() {
      var data;
      data = await networkInterfaces();
      console.log(data);
      this.interfaces = (data);
    }
  }
};
</script>