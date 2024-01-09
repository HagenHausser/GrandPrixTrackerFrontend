<script setup lang="ts">
  import RaceOverview from "@/components/RaceOverview.vue";
</script>



<template>
  <RaceOverview :year="this.$route.params.year" :round="this.$route.params.round" />
</template>

<style scoped>

</style>