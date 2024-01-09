<script setup lang="ts">
  import RacePosition from "@/components/RacePosition.vue";

  /*const year: number = defineModel();
  const round: number = defineModel();*/

  defineProps<{
    year: number,
    round: number
  }>();
</script>

<script lang="ts">
import axios from "axios";

export default {
  data() {
    return {
      race: {locality: "", country: "", positions: [{
          position: 0, driver: "", constructor: "", laps: 0, points: 0
        }]
      }
    }
  },
  methods: {
    async getRaceData() {
      try {
        const response = await axios.get(`http://localhost:8080/api/race/${this.year}/${this.round}`)
        this.race = response.data;
        console.log(this.race)
      } catch (error) {
        console.log(error)
      }
    }
  },
  created() {
    this.emitter.on('reload-race-data', () => {
      this.race = {}
      this.getRaceData();
    })

  }
}
</script>

<template>
  <div v-if="race.positions.length">
    <p>
      {{race.locality}}
    </p>
    <p>
      {{race.country}}
    </p>
    <RacePosition v-for="position in race.positions" :race-position="position" />
  </div>
</template>

<style scoped>

</style>