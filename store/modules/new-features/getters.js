const currentSlider = state => (
    state.currentSlider && state.currentSlider.length ?
        state.currentSlider :
        []
)

const isGlobalSlider = state => state.isGlobal;

const activeSlider = state => state.sliders.activeSlider

export {
    currentSlider,
    activeSlider,
    isGlobalSlider
}