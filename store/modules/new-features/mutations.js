const SET_CURRENT_PAGE = (state, currentPage) => {
    state.currentPage = currentPage;
}

const SET_SLIDER_DATA = (state, sliderData) => {
    state.sliders = sliderData;
}

const SET_CURRENT_SLIDER = (state, slider) => {
    state.currentSlider = slider
}

const SET_SLIDER_STATUS = (state, status) => {
    state.isGlobal = status
}

export {
    SET_CURRENT_PAGE,
    SET_SLIDER_DATA,
    SET_CURRENT_SLIDER,
    SET_SLIDER_STATUS
}