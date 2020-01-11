import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';

const state = {
    currentPage: '',
    isSliderVisible: true,
    currentSlider: [],
    isGlobal: false,
    sliders: {
        activeSlider: '',
        local_sliders: {},
        global_sliders: {}
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}