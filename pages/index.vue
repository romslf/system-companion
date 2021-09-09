<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <div class="card-header-title">CPU Load</div>
      </div>
      <div class="card-content">
        Current:
        <b-progress class="is-circle" :type="cpu.styleLoad" :value="cpu.load" show-value format="percent" />Average:
        <b-progress :type="cpu.styleAvg" :value="cpu.average" show-value format="percent" />
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-header-title">Processes list</div>
      </div>
      <div class="card-content">
		  <b-field label="Find a process">
            <b-autocomplete
                v-model="process_name"
                placeholder="e.g. Chrome"
                keep-first
                open-on-focus
                :data="filteredDataObj"
                field="name"
                @select="option => (process_selected = option)"
                clearable
            >
            </b-autocomplete>
        </b-field>
		<b-field v-if="process_selected">
			<article class="media" >
              <div class="card center">
                <div class="card-header">
                  <div class="card-header-title is-justify-content-space-between">
                    <strong>{{ process_selected.name }}</strong>
					<b-button class="is-pulled-right" rounded icon-right="times" @click="process_selected = null"></b-button>
                  </div>
                </div>
                <div class="card-content">
                  <ul v-if="process_selected.priority">Priority: {{ process_selected.priority }}</ul>
                  <ul v-if="process_selected.nice">Nice: {{ process_selected.nice }}</ul>
                  <ul v-if="process_selected.started">Started at: {{ process_selected.started }}</ul>
                  <ul v-if="process_selected.state">State: {{ process_selected.state }}</ul>
                  <ul v-if="process_selected.tty">Uptime: {{ process_selected.tty }}</ul>
                  <ul v-if="process_selected.user">User: {{ process_selected.user }}</ul>
                  <ul v-if="process_selected.path">Path: {{ process_selected.path }}</ul>
                  <ul v-if="process_selected.params">Params: {{ process_selected.params }}</ul>
                  <ul v-if="process_selected.comand">Starting command: {{ process_selected.command }}</ul>
                </div>
                <footer class="card-footer">
                  <b-button class="is-danger center" outlined rounded icon-right="trash" @click="askKill(process_selected.name, process_selected.pid)">Kill</b-button>
                </footer>
              </div>
            </article>
		</b-field>
		  <b-table
            :data="data"
            ref="table"
            paginated
            per-page="15"
			default-sort-direction="desc"
			default-sort="mem"
            :selected.sync="process_selected"
            hoverable
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page">

            <b-table-column field="name" label="Name" width="250" sortable v-slot="props">
                {{ props.row.name }}
            </b-table-column>

            <b-table-column field="cpu" label="CPU" sortable v-slot="props">
                <span
                :class="[
                  'tag',
                  {'is-danger': props.row.cpu > 25},
                  {'is-warning': props.row.cpu <= 25 && props.row.cpu > 10},
                  {'is-success': props.row.cpu <= 10}
                ]"
              >{{ props.row.cpu.toFixed(1) }}%</span>
            </b-table-column>

            <b-table-column field="mem" label="Ram" sortable v-slot="props">
                <span
                :class="[
                  'tag',
                  {'is-danger': props.row.mem > 25},
                  {'is-warning': props.row.mem <= 25 && props.row.mem > 10},
                  {'is-success': props.row.mem <= 10}
                ]"
              >{{ props.row.mem.toFixed(1) }}%</span>
            </b-table-column>

			<b-table-column field="started" label="Started At" sortable v-slot="props">
				{{ props.row.started }}
            </b-table-column>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
const { currentLoad, processes } = require('systeminformation')

export default {
  data () {
    return {
      cpu: {
        load: 0,
        average: 0,
        idle: 0,
        styleLoad: 'is-success',
        styleAvg: 'is-success',
        styleIdle: 'is-success'
      },
      data: [],
	  process_name: "",
	  process_selected: null,
    }
  },
  computed: {
	  load () {
		  return this.cpu.load.toFixed()
	  },
	  filteredDataObj() {
            return this.data.filter(option => {
                return (
                    option.name
                        .toString()
                        .toLowerCase()
                        .indexOf(this.process_name.toLowerCase()) >= 0
                )
            })
        }
  },
  mounted () {
    this.getStats()
  },
  methods: {
    async getLoad () {
      const data = await currentLoad()
	  if (data.currentLoad)
      {
		this.cpu.load = data.currentLoad
      	this.cpu.styleLoad = this.getColor(data.currentLoad)
	  } else {
		this.cpu.load = 0
	  }
	  if (data.avgLoad) {
		this.cpu.average = data.avgLoad
      	this.cpu.styleAvg = this.getColor(data.avgLoad)
	  } else {
		  this.cpu.average = 0
	  }
    },
    async getProcess () {
      const data = await processes()
      this.data = data.list
	  console.log(data)
    },
    async getStats () {
      await this.getLoad()
	  await this.getProcess()
      setTimeout(() => this.getStats(), this.$store.state.process_refresh_time * 1000)
    },
    getColor (nb) {
      if (nb <= 40) return 'is-success'
      else if (nb > 40 && nb < 70) return 'is-warning'
      return 'is-danger'
    },
    killProcess (name, pid) {
      try {
        const done = process.kill(pid)
        if (done >= 0) {
          this.$buefy.toast.open({ type: 'is-success', message: `The process ${name} has been killed.` })
		  this.process_selected = null
        } else {
          this.$buefy.toast.open({ duration: 5000, type: 'is-danger', message: `System Companion can't kill ${name}, try starting it as Administrator.` })
        }
      } catch (error) {
        this.$buefy.toast.open({ duration: 5000, type: 'is-danger', message: `System Companion can't kill ${name}, try starting it as Administrator.` })
      }
    },
    askKill (name, pid) {
      this.$buefy.dialog.confirm({
        title: 'Are you sure ?',
        message: `Would you like to kill ${name} process ?`,
        cancelText: 'No',
        confirmText: 'Yes',
        type: 'is-success',
        onConfirm: () => this.killProcess(name, pid)
      })
    }
  }
}
</script>
