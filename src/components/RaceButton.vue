<script setup lang="ts">
defineProps<{
    track: {"name": string, "country": string, "year": string, "winner": string, "abbreviation": string}
}>()
</script>

<template>
    <div class="race-overview-button">
        <img class="track-layout" :src="'/track-svgs/' + track.abbreviation + '.svg'" />
        <div class="race-details">
            <h3 class="track-name">{{ track.name }}</h3>
            <div class="country-details">
                <h4 class="track-country">{{ track.country }}</h4>
                <img class="country-flag">
            </div>
            <div class="latest-details">
                <span class="latest-year">📅 {{ track.year }}</span>
                <span class="latest-winner">🏆 {{ track.winner }}</span>
            </div>
        </div>
    </div>
</template>

<style>
    .race-overview-button {
        width: 100%;
        display: flex;
        border: white solid 1px;
        border-radius: 4px;
        padding: 0.5em;
        margin: 0.5em;
        cursor: pointer;
    }

    .track-layout {
        width: 4em;
        height: 6em;
        margin-right: 1em;
    }

    .latest-year {
        margin-right: 0.8em;
    }
</style>