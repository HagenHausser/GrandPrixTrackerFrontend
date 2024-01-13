import './assets/main.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import mitt from 'mitt'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

const messages = {
    'en': {
        'hello': 'test',
        'choose-year': 'Choose a year',
        'choose-race': 'Choose a race',
        'pick-favourite': 'Pick a favourite race',
        'search': 'Search',
        'favourite': 'Favourites',
        'position': 'Position',
        'driver': 'Driver',
        'constructor': 'Constructor',
        'laps': 'Laps',
        'points': 'Points',
        'write-comment-prompt': 'Write down your comments',
        'save': 'Save'
    },
    'de': {
        'hello': 'test nachricht',
        'choose-year': 'Wähle ein Jahr aus',
        'choose-race': 'Wähle ein Rennen aus',
        'pick-favourite': 'Wähle einen Favoriten',
        'search': 'Suche',
        'favourite': 'Favoriten',
        'position': 'Position',
        'driver': 'Fahrer',
        'constructor': 'Konstrukteur',
        'laps': 'Runden',
        'points': 'Punkte',
        'write-comment-prompt': 'Schreibe einen Kommentar',
        'save': 'Speichern'
    }
}

const i18n = createI18n({
    locale: 'de',
    fallbackLocale: 'en',
    messages
})

const emitter = mitt()
const app = createApp(App)
app.use(router)
app.use(i18n)
app.config.globalProperties.emitter = emitter
app.mount('#app')
