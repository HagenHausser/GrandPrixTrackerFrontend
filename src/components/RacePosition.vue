<script setup lang="ts">
defineProps<{
  racePosition: { "position": number, "driver": string, "constructor": string, "laps": number,
    "points": number }
}>()
</script>

<template>
<div class="race-position">
  <span class="bolden">{{racePosition.position}}</span>
  <span class="driver">{{racePosition.driver}}</span>
  <span>{{racePosition.constructor}}</span>
  <span>{{racePosition.laps}}</span>
  <span class="bolden">{{racePosition.points}}</span>
</div>
</template>

<style scoped>
  .race-position {
    display: flex;
    justify-content: space-evenly;
    width: 500px;
  }

  .bolden {
    font-weight: bolder;
  }

  .driver {
    color: #2c3e50;
  }
</style>