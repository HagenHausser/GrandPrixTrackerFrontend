<script setup lang="ts">
import RaceOverview from '../components/RaceOverview.vue';
import axios from 'axios';
  //const selectedYear = defineModel();
</script>

<script lang="ts">
  //let selectedYear = defineModel()

  export default {
    data() {
      return {
        tracks: [{name: "", country: "", year: "", winner: "", abbreviation: ""}],
        years: [0],
        selectedYear: null,
        selectedRound: null,
        grandPrixs: [{round: 0, raceName: "", date: new Date(), circuit: ""}]
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
      },
      populateYears() {
        this.years = [];
        const startYear = 1950;
        let currentYear = new Date().getFullYear();
        for (let i = 0; i < currentYear - startYear; i++) {
          this.years.push(currentYear - i);
        }
        this.years.push(startYear)
      },
      async getRacesInYear(year: number) {
        if (!year) return
        try {
          const response = await axios.get(`http://localhost:8080/api/season/${year}`);
          console.log(this.grandPrixs)
          this.grandPrixs = response.data;
        } catch (error) {
          console.log(error);
        }
      }
    },
    created() {
      this.populateYears();
    }
  }
</script>

<template>
  <main>
    <b-form-select v-model="selectedYear" v-on:change="getRacesInYear(selectedYear || 0)">
      <b-form-select-option v-if="!selectedYear" :value="null">{{ $t("choose-year") }}</b-form-select-option>
      <option v-for="year in years" :value="year">{{year}}</option>
    </b-form-select>
    <b-form-select v-if="selectedYear" v-model="selectedRound"
                   v-on:change="this.emitter.emit('reload-race-data')">
      <b-form-select-option v-if="!selectedRound" :value="null">{{ $t("choose-race") }}</b-form-select-option>
      <option v-for="grandPrix in grandPrixs" :value="grandPrix.round">{{grandPrix.raceName}}</option>
    </b-form-select>
    <RaceOverview v-if="selectedYear && selectedRound"
                  :year="selectedYear" :round="selectedRound"/>
  </main>
</template>
