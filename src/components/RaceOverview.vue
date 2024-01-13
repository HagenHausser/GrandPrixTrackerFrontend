<script setup lang="ts">
  import RacePosition from "@/components/RacePosition.vue";
  import type {GrandPrix} from "@/models/GrandPrix";

  /*const year: number = defineModel();
  const round: number = defineModel();*/

  defineProps<{
    year: number,
    grandPrix: GrandPrix
  }>();
</script>

<script lang="ts">
import axios from "axios";
import type {Race} from "@/models/Race";
import {FavouriteRace} from "@/models/FavouriteRace";

export default {
  data() {
    return {
        race: null as Race,
      }
    }
  ,
  methods: {
    async getRaceData() {
      try {
        this.race = null;
        const response = await axios.get(`http://localhost:8080/api/race/${this.year}/${this.grandPrix.round}`)
        this.race = response.data;
        this.emitter.emit('race-data-loaded');
      } catch (error) {
        console.log(error)
      }
    },
    toggleFavourite() {
      if (this.race.isFavourite) {
        this.removeFavourite();
      } else {
        this.addFavourite();
      }
    },
    async addFavourite() {
      if (!this.year && !this.grandPrix.round && !this.grandPrix.raceName) return;
      try {
        let fav = new FavouriteRace(this.year, this.grandPrix.round, this.grandPrix.raceName, this.grandPrix.raceReportUrl);
        //let fav = { season: this.year, round: this.grandPrix.round, raceName: this.grandPrix.raceName }
        const response = await axios.post(`http://localhost:8080/api/favourite/add`, fav)
        if(response.status == 200) {
         this.race.isFavourite = true;
        }
      } catch (error) {
        console.log(error)
      }
    },
    async removeFavourite() {
      try {
        let fav = { season: this.year, round: this.grandPrix.round }
        const response = await axios.post(`http://localhost:8080/api/favourite/remove`, fav)
        if(response.status == 200) {
          this.race.isFavourite = false;
          this.emitter.emit('reload-fav-data');
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  created() {
    this.emitter.on('reload-race-data', () => {
      this.race = null;
      this.getRaceData();
    });

  }
}
</script>

<template>
  <div class="race-results">
    <div v-if="race" class="text-center">
      <div class="race-title-container">
        <a :href="grandPrix.raceReportUrl" target="_blank" class="race-result-link">
          <h2 class="race-result-header">{{race.country}}, {{race.locality}}</h2>
        </a>
        <i :class="[race.isFavourite ? 'bi-star-fill' : 'bi-star']" class="favourite-icon" @click="toggleFavourite()"></i>
      </div>
      <div class="race-position-header">
        <span class="fw-bold">{{$t('position')}}</span>
        <span class="fw-bold">{{$t('driver')}}</span>
        <span class="fw-bold">{{$t('constructor')}}</span>
        <span class="fw-bold">{{$t('laps')}}</span>
        <span class="fw-bold">{{$t('points')}}</span>
      </div>
      <RacePosition v-for="position in race.positions" :race-position="position" />
    </div>
    <b-spinner v-if="!race" label="Loading..."></b-spinner>
  </div>
</template>

<style scoped>
.race-title-container {
  position: relative;
  display: flex;
  justify-content: center;

  h2 {
    width: fit-content;
  }
}

.race-result-link {
  text-decoration: unset;
  color: #e10600;
}

.race-result-link:hover {
  color: #c80500;
}
</style>