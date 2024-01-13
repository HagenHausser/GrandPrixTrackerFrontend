import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils';
import RacePosition from '@/components/RacePosition.vue';


describe('RacePosition', () => {

    it('renders race position correctly', () => {

        const racePosition = {
            position: 1,
            driver: 'Max Verstappen',
            constructor: 'Red Bull',
            laps: 56,
            points: 25,
            fastestLap: true,
        };


        const wrapper = mount(RacePosition, { props: { racePosition } });


        expect(wrapper.find('.race-position').exists()).toBe(true);
        expect(wrapper.find('.race-position').classes('fastest-lap')).toBe(true);
        expect(wrapper.find('.bi-stopwatch').exists()).toBe(true);

    });
});



