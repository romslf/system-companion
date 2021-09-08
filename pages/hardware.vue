<template>
  <div class="container">
    <div class="content">
      <cpu-information />
      <ram-information />
      <gpu-information />
    </div>
  </div>
</template>

<script>
import GpuInformation from '@/components/GpuInformation.vue'
import CpuInformation from '@/components/CpuInformation.vue'
import RamInformation from '@/components/RamInformation.vue'

export default {
  components: {
    GpuInformation,
    CpuInformation,
    RamInformation
  }
}
</script>
