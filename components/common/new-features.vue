<template>
    <div :class="['new-features', {'new-features_one': isOneSlide}]">
        <div class="new-features__slider-wrapper">
            <close-button @close="closeSlider" />
            <vue-glide :perView="1" :rewind="false" :bullet="currentSlider.length > 1" v-model="activeSlide" :key="sliderKey">
                <vue-glide-slide v-for="(slide, index) in currentSlider" :key="slidesKeys[index]">
                    <div class="new-features__slide-wrapper">
                        <div :class="['new-features__image-wrapper', {'new-features__image-wrapper_one': isOneSlide}]">
                            <img :src="slide.image_url" class="new-features__image" alt="">
                        </div>
                        <div
                            :class="['new-features__content-wrapper', {'new-features__content-wrapper_one': isOneSlide}]"
                        >
                            <div :class="['new-features__heading', {'new-features__heading_one': isOneSlide}]" v-html="slide.heading"></div>
                            <div v-if="slide.description" class="new-features__description" v-html="slide.description"></div>
                            <div v-if="slide.button.type === 'secondary'" class="new-features__secondary-button" @click="++activeSlide">
                                {{ slide.button.text }}
                            </div>
                            <div v-else class="new-features__primary-button" @click="closeSlider">
                                {{ slide.button.text }}
                            </div>
                            <p v-if="isGlobalSlider" class="new-features__access">Доступно при наличии прав доступа</p>
                        </div>
                    </div>
                </vue-glide-slide>
                <template slot="control">
                    <button v-show="isLeftControlVisible" data-glide-dir="<" class="new-features__control-button"><i class="material-icons">keyboard_arrow_left</i></button>
                    <button v-show="isRightControlVisible" data-glide-dir=">" class="new-features__control-button"><i class="material-icons">keyboard_arrow_right</i></button>
                </template>
            </vue-glide>
        </div>
    </div>
</template>

<script>
import CloseButton from '../UI/UiCloseButton';
import { Glide, GlideSlide } from 'vue-glide-js';
// при использовании стрелок навигации slot="controls" в режиме эмуляции появляется ошибка https://github.com/glidejs/glide/issues/334 когде решится issue, она пропадет и у нас
import { onWindowResize } from '../mixins/window-size';
import { debounce } from 'lodash';
import { mapGetters } from 'vuex';

export default {
    mixins: [ onWindowResize ],

    components: {
        [Glide.name]: Glide,
        [GlideSlide.name]: GlideSlide,
        CloseButton
    },

    data: () => ({
        activeSlide: 0,
        sliderKey: 0,
        slidesKeys: []
    }),

    computed: {

        ...mapGetters([ 'currentSlider', 'activeSlider', 'currentPage', 'isGlobalSlider' ]),

        isLeftControlVisible() {
            return this.activeSlide && this.innerScreenWidth >= 768;
        },

        isRightControlVisible() {
            return this.activeSlide !== this.currentSlider.length - 1 && this.innerScreenWidth >= 768;
        },

        isOneSlide() {
            return this.currentSlider.length < 2
        }
    },

    methods: {

        closeSlider() {
            let storageData = JSON.parse(localStorage.getItem('newFeatures'))

            if (this.currentPage === this.activeSlider.replace('_', '-') && storageData.localSlider) {
                localStorage.setItem('newFeatures', JSON.stringify({
                    localSlider: false,
                    globalSlider: storageData.globalSlider
                }))
                this.$emit('closeSlider')
            } else {
                localStorage.setItem('newFeatures', JSON.stringify({
                    localSlider: storageData.localSlider,
                    globalSlider: false
                }))
                this.$emit('closeSlider')
            }
        },

        updateKeys: debounce(function() { // ждем последнее событие ресайза, если использовать стрелочную функцию, нужно будет использовать vm
            this.$nextTick(() => {
                ++this.sliderKey;
                this.slidesKeys.forEach((key, index) => ++this.slidesKeys[index]);
            })
        }, 500)
    },

    watch: {
        innerScreenWidth() { // если произошел ресайз, запускаем ререндер
            this.updateKeys();
        }
    },

    beforeMount() { // для каждого слайда делаем свой индекс, чтобы эффективно обновлять
        this.currentSlider.forEach((el, index) => this.slidesKeys.push(index))
    }
}
</script>

<style lang="scss" scoped>
.new-features {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto';
    padding: 5px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, .8);
    
    .close-button {
        position: absolute;
        top: 20px;
        right: 20px;
        z-index: 1;
    }

    &__slider-wrapper {
        position: relative;
        width: 930px;
        height: 419px;
        background: #fff;
        border-radius: 5px;
    }

    &__slide-wrapper {
        display: flex;
        height: 100%;
        max-height: 100%;
    }

    &__content-wrapper {
        padding-top: 37px;

        &_one {
            display: flex;
            padding-top: 0;
            flex-direction: column;
            justify-content: center;
        }
    }

    &__image-wrapper {
        width: 310px;
        height: 310px;
        margin-right: 20px;
    }

    &__image {
        max-height: 100%;
        max-width: 100%;
    }

    &__heading {
        max-width: 445px;
        font-weight: bold;
        font-size: 36px;
        line-height: 45px;
        margin-bottom: 17px;

        &_one {
            margin-bottom: 38px;
        }
    }

    &__description {
        max-width: 442px;
        font-size: 24px;
        line-height: 120%;
        margin-bottom: 36px;
    }

    &__access {
        margin-top: 10px;
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 14px;
        color: #696969;
    }

    &__control-button {
        margin: 0;
        border: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
    }

    &__secondary-button,
    &__primary-button {
        max-width: max-content;
        cursor: pointer;
    }

    &__secondary-button {
        color: #E58325;
        background: linear-gradient(45deg, #E7732E, #EC4B4E);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 18px;
        line-height: 21px;
    }

    &__primary-button {
        padding: 11px 18px;
        color: #fff;
        background: linear-gradient(to right, #E7732E, #EC4B4E);
        border-radius: 4px;
        font-size: 18px;
        line-height: 21px;
    }

    @media (max-width: 1024px) {

        &__slider-wrapper {
            width: 738px;
            height: 383px;
            max-height: 100%;
        }

        &__image-wrapper {
            width: 241px;
            height: 228px;
        }

        &__content-wrapper {
            padding-top: 0;
        }

        &__heading {
            font-size: 32px;
            line-height: 40px;
        }

        &__description {
            font-size: 18px;
            line-height: 120%;
            margin-bottom: 38px;
        }
    }

    @media (max-width: 768px) {

        .close-button {
            width: auto;
        }

        &__slider-wrapper {
            height: 300px;
            width: 100%;
            height: 330px;
        }

        &__slide-wrapper {
            align-items: center;
            justify-content: center;
            padding-bottom: 15px;
        }

        &__image-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &__heading {
            font-size: 24px;
            line-height: 30px;
            margin-bottom: 13px;

            &_one {
                margin-bottom: 33px;
            }
        }

        &__description {
            max-width: 363px;
            font-size: 16px;
            margin-bottom: 30px;
            line-height: 18px;
        }

        &__secondary-button {
            font-weight: bold;
            letter-spacing: .2px;
        }

        &__primary-button {
            font-size: 14px;
            line-height: 16px;
            padding: 11px 25px;
        }

    }
    
    @media (max-width: 576px) and (orientation: portrait) {

        &__slider-wrapper {
            width: 100%;
            height: 100%;
        }

        &__slide-wrapper {
            padding-bottom: 0;
            flex-wrap: wrap;
            flex-direction: column;
        }

        &__heading {
            padding-top: 14px;
            font-size: 18px;
            line-height: 21px;
            text-align: center;

            &_one {
                margin-bottom: 80px;
            }
        }

        &__description {
            font-size: 14px;
            line-height: 120%;
            margin-bottom: 43px;
            text-align: center;
        }

        &__image-wrapper {
            width: 215px;
            height: 202px;
            margin-right: 0;
            margin-bottom: 35px;

            &_one {
                margin-bottom: 15px;
            }
        }

        &__content-wrapper {
            height: max-content;
        }

        &__primary-button,
        &__secondary-button {
            margin: 0 auto;
        }

        &__access {
            text-align: center;
        }
    }
}
</style>

<style lang="scss">
.new-features {

    .glide {
        position: relative;
    }

    .glide,
    .glide__track,
    .glide__slides {
        height: 100%;
    }

    .glide__slides {
        display: flex;
        padding-left: 0;
        margin-bottom: 0;
    }

    .glide__track {
        overflow: hidden;
    }

    .glide__slide {
        padding: 45px 60px 64px;
    }

    div[data-glide-el=controls] {
        display: flex;
        justify-content: space-between;
        position: absolute;
        width: 100%;
        top: calc(50% - 22.5px);
        font-size: 45px;
        color: #E58325;
        pointer-events: none;

        .material-icons {
            font-size: 45px;
            pointer-events: all;
        }
    }

    .glide__bullets {
        width: 100%;
        display: flex;
        justify-content: center;
        position: absolute;
        bottom: 0;
        margin-bottom: 32px;
    }

    .glide__bullet {
        width: 8px;
        height: 8px;
        border: 0;
        padding: 0;
        margin: 0 5px;
        border-radius: 50%;
        background-color: #C5C5C5;
    }
    
    .glide__bullet--active {
        background-color: #366E6D;
    }

    button[data-glide-dir="<"],
    button[data-glide-dir=">"] {
        position: absolute;
    }

    button[data-glide-dir="<"] {
        left: 0;
    }

    button[data-glide-dir=">"] {
        right: 0;
    }

    @media (max-width: 1024px) {
        
        .glide__slide {
            padding: 73px 26px 82px;
        }
    }

    @media (max-width: 768px) {
        .glide__slide {
            padding: 0px;
            padding: 0 20px 0 0;
        }
    }

    @media (max-width: 576px) {
        
        .glide__slide {
            padding: 43px 14px 76px;
        }

        &_one .glide__slide {
            padding: 43px 14px;
        }
    }

}
</style>