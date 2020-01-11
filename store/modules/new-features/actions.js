
const initializeSlider = ({ commit }, { currentPage, sliderData }) => {
    return new Promise((resolve, reject) => {
        commit('SET_CURRENT_PAGE', currentPage);
        commit('SET_SLIDER_DATA', sliderData);
    
        let activeSlider = sliderData.activeSlider;

        if (!localStorage.getItem('newFeatures')) {
            localStorage.setItem('newFeatures', JSON.stringify({
                localSlider: true,
                globalSlider: true
            }))
        }
        
        let storageData = JSON.parse(localStorage.getItem('newFeatures'))

        if (currentPage === activeSlider.replace('_', '-') && storageData.localSlider) {
            commit('SET_CURRENT_SLIDER', sliderData.local_sliders[activeSlider].slides)
            commit('SET_SLIDER_STATUS', false)
            resolve()
        } else if (storageData.globalSlider){
            commit('SET_CURRENT_SLIDER', sliderData.global_sliders[activeSlider].slides)
            commit('SET_SLIDER_STATUS', true)
            resolve()
        } else {
            commit('SET_CURRENT_SLIDER', [])
            reject()
        }
    })
}

export {
    initializeSlider
}
