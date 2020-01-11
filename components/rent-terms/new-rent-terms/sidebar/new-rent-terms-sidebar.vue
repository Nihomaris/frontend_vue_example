<template>
    <div
        class="sidebar"
        :class="{'sidebar_hidden': !isSidebarVisible && isMobileVersion}"
    >
        <div class="sidebar__points-wrapper">
            <i
                class="material-icons sidebar__close"
                @click="closeSidebar"
            >
                close
            </i>
            <div class="sidebar__point" @click="toTop(terms.baseTerms.name)">
                <div class="sidebar__point-title">
                    {{ terms.baseTerms.title }}
                </div>
            </div>
            <div class="sidebar__point" @click="toTop(terms.additionalTerms.childTerms[0].name)">
                <div class="sidebar__point-title">
                    {{ terms.additionalTerms.title }}
                </div>
            </div>

            <div class="sidebar__point sidebar__point_child" v-for="(term, index) in terms.additionalTerms.childTerms" :key="index"  @click.self="toTop(term.name)">
                <div class="sidebar__point-title" @click.self="toTop(term.name)">
                    {{ term.title }}
                </div>

                <ui-switcher 
                    :name="`switcher-${index}`" 
                    :value="index" 
                    :default="true"
                    @off="turnOffBlock(term.storeName)" 
                    @on="turnOnBlock(term.storeName)"
                />

            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { onEscapePress } from '../../../mixins/keyboard-events'

export default {
    mixins: [ onEscapePress ],
    props: ['toTop'],
    data() {
        return {
            terms: {
                baseTerms: {
                    title: 'Базовые параметры', name: 'base-terms'
                },
                additionalTerms: {
                    title: 'Дополнительные параметры',
                    childTerms: [
                        { title: 'Возраст ', name: 'age', storeName: 'ages', checked: true },
                        { title: 'Пробег', name: 'mileage', storeName: 'mileages', checked: true },
                        { title: 'КПП', name: 'transmission', storeName: 'transmissions', checked: true },
                        { title: 'Топливо', name: 'fuel', storeName: 'fuels', checked: true },
                        { title: 'Брендирование', name: 'brending', storeName: 'brands', checked: true },
                    ]
                }
            }
        }
    },

    computed: {
        isSidebarVisible() {
            return this.$store.getters.isNewRentTermSidebarVisible
        },
    },

    methods: {
        ...mapMutations(['turnOnBlock', 'turnOffBlock']),

        isMobileVersion() {
            return window.innerWidth > 1370;
        },

        closeSidebar() {
            this.$store.dispatch('toggleNewRentTermSidebarStatus')
        },

        onEscapePress() {
            this.closeSidebar()
        },
    },

    beforeMount() {
        window.addEventListener('resize', this.isMobileVersion);
        this.isMobileVersion();
    },
    
    beforeDestroy() {
        this.closeSidebar()
        window.removeEventListener('resize', this.isMobileVersion);
    }
}
</script>

<style lang="scss" scoped>
@import '../../../../../sass/settings/_mixins.scss';

.sidebar {
    position: relative;
    width: 274px;
    margin-right: 30px;
    background-color: #fff;
    box-shadow: 0px 10px 30px rgba(167, 167, 167, 0.25);
    padding-top: 20px;
    overflow-y: auto;
    overflow-y: overlay; // перезапишется, если поддерживается

    @include scroll();

     &__close {
        display: none;
        padding: 10px;
        color: #696969;
        cursor: pointer;
    }

    &__point {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px 10px 15px;
        border-left: 5px solid #fff;
        cursor: pointer;

        &:hover {
            border-left: 5px solid #E58325;
            background-color: #FDF1E6;
        }

        &-title {
            display: inline-block;
            font-size: 16px;
            line-height: 19px;
        }

        .ui-switch {
            display: flex;
        }

        &_child {
            padding-left: 35px;

            &:last-child {
                margin-bottom: 20px;
            }
        }

    }

    @media (max-width: 1370px) {
        height: calc(100vh - 70px);
        position: fixed;
        top: 50px;
        left:0;
        transform: translateX(0px);
        transition: all .5s ease-out;
        z-index: 9999;

        &_hidden {
            transform: translateX(-274px);
        }

        &__close {
            display: block;
            position: absolute;
            top: 0;
            right: 0;
        }
    }

    @media (max-width: 576px) {
        width: 100%;
        transform: translateX(0%);

        &_hidden {
            transform: translateX(-100%);
        }
    }
}
</style>

<style lang="scss">
.container-fluid.content-block > .row {
    z-index: 9998;
}
</style>