<template>
  <header class="main-header">
    <nav>
      <div>
        <nuxt-link
          to="/"
          exact
        >
          System info
        </nuxt-link>
      </div>
      <div>
        <nuxt-link
          to="/process"
          exact
        >
          Process
        </nuxt-link>
      </div>
      <div>
        <nuxt-link
          to="/network"
          exact
        >
          Network
        </nuxt-link>
      </div>
    </nav>
    <p>{{ version }}</p>
  </header>
</template>

<script>
export default {
  data () {
    return {
      version: require('electron').remote.app.getVersion()
    }
  }
}
</script>

<style scoped>
    .main-header {
        height: 50px;
        display: flex;
        background-color: #364758;
    }

    nav{
        width: 100%;
        display: flex;
        justify-content: center;
    }

    nav div{
        height: 100%;
        margin: 0 20px;
        display: flex;
        align-items: center;
    }

    a {
        font-family: Helvetica, sans-serif;
        color: white;
        font-size: 1rem;
        font-weight: 100;
        text-decoration: underline;
        text-transform: uppercase;
    }

    a:hover{
        opacity: 0.9;
    }
</style>
