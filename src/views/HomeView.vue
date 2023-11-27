<script setup lang="ts">
import RaceButton from '../components/RaceButton.vue';
import axios from 'axios';
</script>

<script lang="ts">
  export default {
      data() {
          return {
              tracks: [{name: "", country: "", year: "", winner: "", abbreviation: ""}]
          }
      },
      methods: {
          async getTracks() {
              try {
                  const response = await axios.get("http://localhost:8080/api/track/all");

                  this.tracks = response.data;
              } catch(error) {
                  console.log(error);
              }
          }
      },
      created() {
        this.getTracks();
      }
  }

  const races = [{name: "Canada", country: "Canada", year:"2023", winner:"Max Verstappen"},
  {name: "Bahrain", country: "Bahrain", year:"2023", winner:"Max Verstappen"},
  {name: "Hungary", country: "Hungary", year:"2023", winner:"Max Verstappen"}]
</script>

<template>
  <main>
    <RaceButton v-for="track in tracks" :track="track" />
  </main>
</template>
