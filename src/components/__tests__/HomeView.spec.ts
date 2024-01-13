import HomeView from '../../views/HomeView.vue';
import {config, mount} from '@vue/test-utils';
import {describe, it, expect, beforeAll, vi} from 'vitest';

describe('HomeView', () => {
    beforeAll(() => {
        const $t = () => {};
        const matchMediaMock = vi.fn((query: string) => ({}));

        config.global.mocks = {
            emitter: { on: () => {} },
            $t: $t
        }
        vi.stubGlobal("matchMedia", matchMediaMock);
    });

    it("renders three control buttons on top right", () => {
        const wrapper = mount(HomeView);

        expect(wrapper.find('.page-settings-container').exists()).toBe(true);

        // Expect to find 3 control elements
        expect(wrapper.find('.page-settings-container').findAll('.lang-btn').length).toBe(2);
        expect(wrapper.find('.page-settings-container').findAll('i').length).toBe(1);

        // Expect only one of the language control elements to be active
        expect(wrapper.find('.page-settings-container').findAll('.lang-btn.active').length).toBe(1);
    });

    it("checks if lightmode is set by default and dark mode button is shown", () => {
        const wrapper = mount(HomeView);

        // Expect lightMode to be active and darkMode button to be visible
        expect(wrapper.find('.page-settings-container').findAll('i.bi-moon-fill').length).toBe(1);
        expect(wrapper.find('.page-settings-container').findAll('i.bi-sun-fill').length).toBe(0);
    });

    it("checks if darkmode is set and light mode button is shown", () => {
        const matchMediaMock = vi.fn((query: string) => ({ matches: true }));
        vi.stubGlobal("matchMedia", matchMediaMock);
        const wrapper = mount(HomeView);

        // Expect darkMode to be active and lightMode button to be visible
        expect(wrapper.find('.page-settings-container').findAll('i.bi-sun-fill').length).toBe(1);
        expect(wrapper.find('.page-settings-container').findAll('i.bi-moon-fill').length).toBe(0);
    });
});

