<template>
	<div style="background: rgb(2,0,36); background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(78,9,121,1) 0%, rgba(0,44,255,1) 86%);" class="notification">
			<section>
    <b-sidebar
      type="is-light"
      :fullheight="fullheight"
      :fullwidth="fullwidth"
      :overlay="overlay"
      :right="right"
      v-model="open"
    >
      <div class="p-1">
        <img
          src="../assets/cover-mini.png"
		  style="display:block; margin-left: auto; margin-right: auto; margin-bottom: 10px;  margin-top: 10px; max-height: 70px;"
        />
        <b-menu>
          <b-menu-list>
            <b-button @click="go('/')" icon-left="list" type="is-primary" size="is-large" expanded inverted>Processes</b-button>
                <b-button @click="go('/hardware')" icon-left="microchip" type="is-primary" size="is-large" expanded inverted>Hardware</b-button>
                <b-button @click="go('/network')" icon-left="network-wired" type="is-primary" size="is-large" expanded inverted>Network</b-button>
                <b-button @click="go('/docker')" icon-pack="fab" icon-left="docker" type="is-primary" size="is-large" expanded inverted>Docker</b-button>
          </b-menu-list>
        </b-menu>
      </div>
    </b-sidebar>
	<b-sidebar
      type="is-light"
      fullwidth
      overlay
      right
      v-model="open_settings"
    >
      <div class="p-1">
        <img
          src="../assets/cover-mini.png"
		  style="display:block; margin-left: auto; margin-right: auto; margin-bottom: 10px;  margin-top: 10px; max-height: 70px;"
        />
        <b-menu>
          <b-menu-list>
            <b-field label="Processes refresh time">
				<b-numberinput v-model="process_refresh_time"></b-numberinput>
			</b-field>
            <b-field label="Docker refresh time">
				<b-numberinput v-model="docker_refresh_time"></b-numberinput>
			</b-field>
			<b-field>
				<b-button @click="save()" type="is-success" expanded>Save</b-button>
			</b-field>
          </b-menu-list>
        </b-menu>
      </div>
    </b-sidebar>
	<div class="columns is-vcentered">
    <b-button @click="open = true" icon-left="bars"></b-button>
	<img :src="require('@/assets/isolated-layout.svg')" style="width: 60px; height: 60px; margin-left: auto; margin-right: auto; display:block;"/>
    <b-button @click="open_settings = true" icon-left="cog" class="is-pulled-left"></b-button>
	</div>
  </section>
        </div>
		
</template>-->

<script>
const { remote } = require('electron')
export default {
  data () {
    return {
      foc: "",
	  open: false,
	  open_settings: false,
      overlay: true,
      fullheight: false,
      fullwidth: true,
      right: false,
	  process_refresh_time: this.$store.state.process_refresh_time,
	  docker_refresh_time: this.$store.state.docker_refresh_time
    }
  },
  methods: {
	  go(page) {
		this.open = false
		this.$router.push(page)
	  },
	  save() {
		  this.$store.commit('setPRT', this.process_refresh_time)
		  this.$store.commit('setDRT', this.docker_refresh_time)
		  this.open_settings = false
	  }
  }
}
</script>
