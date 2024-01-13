<script setup lang="ts">
defineProps<{
  racePosition: { "position": number, "driver": string, "constructor": string, "laps": number,
    "points": number, fastestLap: boolean }
}>()
</script>

<template>
<div class="race-position" :class="{'fastest-lap': racePosition.fastestLap}">
  <span class="fw-bolder">{{racePosition.position}}</span>
  <span>{{racePosition.driver}}</span>
  <span>{{racePosition.constructor}}</span>
  <span>{{racePosition.laps}}</span>
  <span class="fw-bolder">{{racePosition.points}}</span>
  <i v-if="racePosition.fastestLap" class="bi bi-stopwatch"></i>
</div>
</template>

<style scoped>
  .bi-stopwatch {
    position: absolute;
    left: 0;
    color: #aa28ca;
  }

  .fastest-lap {
    background: rgba(170,40,202,0.2);
    border-radius: 4px;
  }
</style>