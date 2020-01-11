<template>
    <div class="store">
        <new-features v-if="isSliderVisible" @closeSlider="isSliderVisible = false" />
    </div>
</template>

<script>
import sliderData from './new-features-slides.json';
import newFeatures from './new-features';

export default {
    components: {
        newFeatures
    },

    data: () => ({
        sliderData,
        isSliderVisible: false
    }),

    beforeMount() {
        let currentPage = window.location.pathname.toString().split('/')[1];
        this.$store.dispatch('initializeSlider', { currentPage, sliderData: this.sliderData }).then((res) => {
            this.isSliderVisible = true;
        }).catch(err => console.error())
    }
}
</script>