import RaceOverview from '@/components/RaceOverview.vue'
import {config, mount} from '@vue/test-utils'
import {describe, it, test, vi, beforeAll,expect} from "vitest";
import axios from "axios";


describe('RaceOverview', () => {
    beforeAll(() => {
        const $t = () => {};

        config.global.mocks = {
            emitter: {
                on: (event: string, func: unknown) => {func()},
                emit: (event: string) => {}
            },
            $t: $t
        }

        const raceData = {"isFavourite":null,"locality":"Shanghai","country":"China","positions":[{"position":1,"driver":"Lewis Hamilton","constructor":"Mercedes","laps":56,"points":25.0,"fastestLap":true},{"position":2,"driver":"Nico Rosberg","constructor":"Mercedes","laps":56,"points":18.0,"fastestLap":false},{"position":3,"driver":"Sebastian Vettel","constructor":"Ferrari","laps":56,"points":15.0,"fastestLap":false},{"position":4,"driver":"Kimi Räikkönen","constructor":"Ferrari","laps":56,"points":12.0,"fastestLap":false},{"position":5,"driver":"Felipe Massa","constructor":"Williams","laps":56,"points":10.0,"fastestLap":false},{"position":6,"driver":"Valtteri Bottas","constructor":"Williams","laps":56,"points":8.0,"fastestLap":false},{"position":7,"driver":"Romain Grosjean","constructor":"Lotus F1","laps":56,"points":6.0,"fastestLap":false},{"position":8,"driver":"Felipe Nasr","constructor":"Sauber","laps":56,"points":4.0,"fastestLap":false},{"position":9,"driver":"Daniel Ricciardo","constructor":"Red Bull","laps":56,"points":2.0,"fastestLap":false},{"position":10,"driver":"Marcus Ericsson","constructor":"Sauber","laps":55,"points":1.0,"fastestLap":false},{"position":11,"driver":"Sergio Pérez","constructor":"Force India","laps":55,"points":0.0,"fastestLap":false},{"position":12,"driver":"Fernando Alonso","constructor":"McLaren","laps":55,"points":0.0,"fastestLap":false},{"position":13,"driver":"Carlos Sainz","constructor":"Toro Rosso","laps":55,"points":0.0,"fastestLap":false},{"position":14,"driver":"Jenson Button","constructor":"McLaren","laps":55,"points":0.0,"fastestLap":false},{"position":15,"driver":"Will Stevens","constructor":"Manor Marussia","laps":54,"points":0.0,"fastestLap":false},{"position":16,"driver":"Roberto Merhi","constructor":"Manor Marussia","laps":54,"points":0.0,"fastestLap":false},{"position":17,"driver":"Max Verstappen","constructor":"Toro Rosso","laps":52,"points":0.0,"fastestLap":false},{"position":18,"driver":"Pastor Maldonado","constructor":"Lotus F1","laps":49,"points":0.0,"fastestLap":false},{"position":19,"driver":"Daniil Kvyat","constructor":"Red Bull","laps":15,"points":0.0,"fastestLap":false},{"position":20,"driver":"Nico Hülkenberg","constructor":"Force India","laps":9,"points":0.0,"fastestLap":false}]};
        vi.spyOn(axios, 'get').mockResolvedValue({
            data: raceData
        })
    });

   it('makes sure the selected race is shown as not a favourite', () => {

       const grandPrix = {
           round: 3,
           raceName: 'Chinese Grand Prix',
           date: new Date(),
           circuit: 'Shanghai',
           raceReportUrl: 'wikipedia.com'
       };

       //const wrapper = mount(RaceOverview, {props: { year: 2015, grandPrix: grandPrix }});

       //expect(wrapper.find('.race-title-container').find('.bi-star').exists().toBe(true));

   });
});