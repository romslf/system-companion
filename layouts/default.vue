<template>
  <div>
    <app-header />
    <nuxt />
  </div>
</template>

<script>
import appHeader from '@/components/header'
export default {
  components: { appHeader }
}
</script>

<style>
.e-nuxt-container {
  min-height: calc(100vh - 50px);
  background: linear-gradient(to right, #ece9e6, #ffffff);
  font-family: Helvetica, sans-serif;
  margin-bottom: 50px;
}

.e-nuxt-content {
  display: flex;
  justify-content: center;
  padding-top: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.e-nuxt-logo {
  width: 400px;
}

.e-nuxt-system-info {
  padding-bottom: 10px;
  padding-top: 10px;
  margin-bottom: 20px;
  border-top: 1px solid #5405d1;
  border-bottom: 1px solid #5405d1;
}
.right {
  margin-left: 30px;
  margin-right: 20px;
}
.center {
  margin-left: auto;
  margin-right: auto;
}
.title {
  color: #364758;
  font-size: 1.5em;
  letter-spacing: 0.25px;
  margin-top: 30px;
  margin-bottom: 10px;
}
.items {
  margin-top: 8px;
  margin-left: 40px;
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
.right-btn {
  padding-left: 50px;
  padding-right: 20px;
}
</style>