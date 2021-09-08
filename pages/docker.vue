<template>
  <div class="container">
    <div v-if="containersNb != undefined">
      <div class="card">
        <div class="card-header">
          <div class="card-header-title">Containers</div>
        </div>
        <div class="card-content">
          Running:
          <b-progress :value="running" :max="containersNb" show-value />Paused:
          <b-progress :value="paused" :max="containersNb" show-value />Stopped:
          <b-progress :value="stopped" :max="containersNb" show-value />
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-header-title">Informations:</div>
        </div>
        <div class="card-content">
          <div class="items">
            <div class="item">
              <div class="name">Channel:</div>
              <div v-if="!this.infos.experimentalBuild" class="value">Stable</div>
              <div v-else class="value">Experimental</div>
            </div>
            <div class="item">
              <div class="name">CPUs:</div>
              <div class="value">{{ infos.ncpu }}</div>
            </div>
            <div v-if="infos.memoryLimit" class="item">
              <div class="name">Memory limit:</div>
              <div class="value">{{ infos.memTotal.toFixed() }} Go</div>
            </div>
            <div class="item">
              <div class="name">Images:</div>
              <div class="value">{{ infos.images }}</div>
            </div>
            <div class="item">
              <div class="name">Driver:</div>
              <div class="value">{{ infos.driver }}</div>
            </div>
            <div class="item">
              <div class="name">Engine Version:</div>
              <div class="value">{{ infos.serverVersion }}</div>
            </div>
            <div class="item">
              <div class="name">Kernel Version:</div>
              <div class="value">{{ infos.kernelVersion }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="this.containers != undefined" class="card">
        <div class="card-header">
          <div class="card-header-title">Containers list</div>
        </div>
        <div class="card-content">
          <b-table
            ref="table"
            :data="containers"
            paginated
            per-page="15"
            detailed
            detail-key="id"
            default-sort-direction="desc"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"
            @details-open="(row, index) => $buefy.toast.open(`Expanded ${row.name}`)"
          >
              <b-table-column field="id" label="ID" v-slot="props">{{ props.row.id.slice(0, 10) }}</b-table-column>
              <b-table-column field="name" label="Name" v-slot="props">{{ props.row.name }}</b-table-column>
              <b-table-column field="image" label="Image" v-slot="props">{{ props.row.image }}</b-table-column>
              <b-table-column field="state" label="State" v-slot="props">{{ props.row.state }}</b-table-column>
              <b-table-column field="startedAt" label="Started at" v-slot="props">{{ props.row.startedAt }}</b-table-column>
              <b-table-column field="finishedAt" label="Finished at" v-slot="props">{{ props.row.finishedAt }}</b-table-column>

          <template slot="detail" slot-scope="props">
            <article class="media">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img src="/static/img/placeholder-128x128.png">
                </p>
              </figure>
              <div class="card center">
                <div class="card-header">
                  <div class="card-header-title">
                    <strong>{{ props.row.name }}</strong>
                  </div>
                </div>
                <div class="card-content">
                  <ul v-if="props.row.priority">
                    Priority: {{ props.row.priority }}
                  </ul>
                  <ul v-if="props.row.nice">
                    Nice: {{ props.row.nice }}
                  </ul>
                  <ul v-if="props.row.started">
                    Started at: {{ props.row.started }}
                  </ul>
                  <ul v-if="props.row.state">
                    State: {{ props.row.state }}
                  </ul>
                  <ul v-if="props.row.tty">
                    Uptime: {{ props.row.tty }}
                  </ul>
                  <ul v-if="props.row.user">
                    User: {{ props.row.user }}
                  </ul>
                  <ul v-if="props.row.path">
                    Path: {{ props.row.path }}
                  </ul>
                  <ul v-if="props.row.params">
                    Params: {{ props.row.params }}
                  </ul>
                  <ul v-if="props.row.comand">
                    Starting command: {{ props.row.command }}
                  </ul>
                </div>
                <footer class="card-footer">
                    <b-button class="is-danger center" outlined rounded icon-right="trash">Kill</b-button>
                </footer>
              </div>
            </article>
          </template>
          </b-table>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="card">
        <div class="card-header">
          <div class="card-header-title">Docker not found</div>
        </div>
        <div class="card-content">
          Docker is not running or is not on this computer.
          If you want to download it, click <a target="_blank" href="https://www.docker.com/get-started">here</a> !
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { dockerInfo, dockerContainers } = require('systeminformation')

export default {
  data () {
    return {
	  containers: [],
      containersNb: 0,
      running: 0,
      paused: 0,
      stopped: 0,
      infos: {
        images: 0,
        driver: '',
        memoryLimit: false,
        memTotal: 0,
        ncpu: 0,
        kernelVersion: 0,
        serverVersion: 0,
        experimentalBuild: false
      }
    }
  },
  mounted () {
    this.getStats()
    this.getContainers()
  },
  methods: {
    async getStats () {
      const data = await dockerInfo()
      this.containersNb = data.containers
      this.running = data.containersRunning
      this.paused = data.containersPaused
      this.stopped = data.containersStopped
      this.infos.driver = data.driver
      this.infos.images = data.images
      this.infos.memoryLimit = data.memoryLimit
      this.infos.ncpu = data.ncpu
      this.infos.memTotal = data.memTotal / 1073741824
      this.infos.serverVersion = data.serverVersion
      this.infos.kernelVersion = data.kernelVersion
	  this.infos.experimentalBuild = data.experimentalBuild
	  if (this.containers != undefined) { setTimeout(() => this.getStats(), this.$store.state.docker_refresh_time * 1000) }
    },
    async getContainers () {
      this.containers = await dockerContainers()
      console.log(this.containers)
	    if (this.containers != undefined) { setTimeout(() => this.getContainers(), this.$store.state.docker_refresh_time * 1000) }
    }
  }
}
</script>
