<script setup lang="ts">
import RaceOverview from '../components/RaceOverview.vue';
import axios from 'axios';
</script>

<script lang="ts">
  import type {GrandPrix} from "@/models/GrandPrix";
  import type {FavouriteRace} from "@/models/FavouriteRace";
  import axios from "axios";

  export default {
    data() {
      return {
        selectedLang: 'de',
        years: [0],
        selectedYear: 0,
        selectedGrandPrix: null as GrandPrix,
        selectedFavourite: null as FavouriteRace,
        grandPrixs: [] as GrandPrix[],
        favourites: [] as FavouriteRace[],
        favouriteLoaded: false,
        tabIndex: 0,
        initialComment: "",
        lightMode: true
      }
    },
    methods: {
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
          this.grandPrixs = response.data;
        } catch (error) {
          console.log(error);
        }
      },
      switchLang(lang: string) {
        this.selectedLang = this.$i18n.locale = lang;
      },
      async getAllFavourites(tabIndex: number) {
        this.tabIndex = tabIndex
        if (!tabIndex) return;
        try {
          const response = await axios.get(`http://localhost:8080/api/favourite/all`);
          this.favourites = response.data;
        } catch (error) {
          console.log(error);
        }
      },
      emitReloadRaceData() {
        if (!this.selectedFavourite) return;
        this.emitter.emit('reload-race-data');
        this.favouriteLoaded = false;
        this.initialComment = this.selectedFavourite.comment;
      },
      async saveFavourite() {
        if (!this.selectedFavourite) return;
        try {
          const response = await axios.post(`http://localhost:8080/api/favourite/add`, this.selectedFavourite)
          if (response.status == 200) {
            this.initialComment = this.selectedFavourite.comment
          }
        } catch (error) {
          console.log(error)
        }
      },
      commentChanged(): boolean {
        if (!this.initialComment) {
          this.initialComment = '';
        }
        if (!this.selectedFavourite.comment) {
          this.selectedFavourite.comment = '';
        }
        return this.selectedFavourite.comment != this.initialComment;
      },
      setTheme(lightMode: boolean) {
        if (lightMode) {
          document.documentElement.className = 'light-mode';
          this.lightMode = true;
        } else {
          document.documentElement.className = 'dark-mode';
          this.lightMode = false;
        }
      },
      getMediaPreference() {
        const hasDarkPreference = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        if (hasDarkPreference) {
          this.lightMode = false;
        }
      }
    },
    created() {
      this.getMediaPreference();
      this.populateYears();
      this.emitter.on('reload-fav-data', () => {
        this.getAllFavourites(1);
      });
      this.emitter.on('race-data-loaded', () => {
        if (this.tabIndex) {
          this.favouriteLoaded = true;
        }
      })
    }
  }
</script>

<template>
  <main>
      <div class="page-settings-container">
        <i v-if="lightMode" @click="setTheme(false)" class="bi bi-moon-fill fs-2"></i>
        <i v-if="!lightMode" @click="setTheme(true)" class="bi bi-sun-fill fs-2"></i>
        <img class="lang-btn" :class="{active: selectedLang == 'de'}" @click="switchLang('de')" src="/images/de.svg" alt="Deutsch"/>
        <img class="lang-btn" :class="{active: selectedLang == 'en'}" @click="switchLang('en')" src="/images/en.svg" alt="English"/>
      </div>
    <div>
    <div class="page-content">
      <h1 class="text-center mb-5 heading">GrandPrix Tracker</h1>
        <b-tabs content-class="mt-2" fill  @activate-tab="getAllFavourites($event)">
          <b-tab :title="$t('search')" active>
            <b-form-select v-model="selectedYear" v-on:change="getRacesInYear(selectedYear)">
              <b-form-select-option v-if="!selectedYear" :value="0">{{ $t("choose-year") }}</b-form-select-option>
              <option v-for="year in years" :value="year">{{year}}</option>
            </b-form-select>
            <b-form-select v-if="selectedYear" v-model="selectedGrandPrix"
                           v-on:change="this.emitter.emit('reload-race-data')">
              <b-form-select-option v-if="!selectedGrandPrix" :value="null">{{ $t("choose-race") }}</b-form-select-option>
              <option v-for="grandPrix in grandPrixs" :value="grandPrix">{{grandPrix.raceName}}</option>
            </b-form-select>
            <RaceOverview v-if="selectedYear && selectedGrandPrix"
                          :year="selectedYear" :grandPrix="selectedGrandPrix"/>
          </b-tab>
          <b-tab :title="$t('favourite')">
            <b-form-select v-model="selectedFavourite" v-on:change="emitReloadRaceData()">
              <b-form-select-option v-if="!selectedFavourite" :value="null">{{ $t("pick-favourite") }}</b-form-select-option>
              <option v-for="fav in favourites" :value="fav">{{fav.raceName}} | {{fav.season}}</option>
            </b-form-select>
            <div class="d-flex flex-column align-items-center">
              <div v-if="selectedFavourite" class="fav-content">
                <RaceOverview  :year="selectedFavourite.season"
                              :grandPrix="selectedFavourite"/>
                <b-form-textarea
                    id="fav-comment-box"
                    :placeholder="$t('write-comment-prompt')"
                    v-if="favouriteLoaded"
                    v-model="selectedFavourite.comment"
                >
                </b-form-textarea>
                <b-button id="save-btn" pill v-if="commentChanged()" @click="saveFavourite()">
                  {{$t('save')}}
                </b-button>
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </main>
</template>

<style scoped>
  .page-settings-container {
    display: flex;
    justify-content: space-between;
    width: 10em;
    position: absolute;
    right: 2em;
    top: 2em;

    &i {
      font-size: 2em;
    }
  }

  .lang-btn {
    vertical-align: middle;
    width: 3em;
    border-radius: 100%;
  }

  .lang-btn:hover {
    cursor: pointer;
  }

  .lang-btn.active {
    border: #E7473C solid 3px;
  }

  h1 {
    color: #E7473C;
  }

  .fav-content {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    width: fit-content;
  }

  #fav-comment-box {
    width: 100%;
    margin: 1em 0;
  }

  #save-btn {
    background-color: #F0F0F0;
    color: #000000;
    border-color: #000000;
  }

  #save-btn:hover {
    background: #E7473C;
    color: white;
  }
</style>