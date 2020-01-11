<template>
    <div
        class="sidebar"
        :class="{'sidebar_hidden': !isSidebarVisible && isMobileVersion}"
    >
        <div class="rent-terms__tabs tab-panel">
            <i
                class="material-icons sidebar__close"
                @click="toggleRentTermSidebarStatus()"
            >
                close
            </i>
            
            <div class="tab-panel__header tab-panel__header_align-left">
                <div class="tab-panel__buttons">
                    <div
                        class="tab-panel__link tab-panel__link"
                        :class="{'tab-panel__link_active': activeTab === 'relevant'}"
                        @click="changeActiveTab('relevant')"
                    >
                        <span class="tab-panel__link-text">Актуальные</span>
                    </div>
                    <div
                        class="tab-panel__link tab-panel__link"
                        :class="{'tab-panel__link_active': activeTab === 'archival'}"
                        @click="changeActiveTab('archival')"
                    >
                        <span class="tab-panel__link-text">Архив</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="currentTerms" class="sidebar__terms-wrapper">
            <terms-item v-for="(term, index) in currentTerms" :key="term.id" :data-sidebar-index="index" :term="term" :active-tab="activeTab" />
        </div>
        <div class="sidebar__info-block-wrapper">
            <info-block :message-for="activeTab" />
        </div>
    </div>
</template>

<script>
import TermsItem from './sidebar-item';
import InfoBlock from './sidebar-info-block';
import { onEscapePress } from '../../../mixins/keyboard-events';
import { mapActions } from 'vuex';

export default {
    mixins: [ onEscapePress ],

    components: {
        TermsItem,
        InfoBlock
    },

    data() {
        return {
        }
    },

    methods: {

        ...mapActions([ 'changeRentSortType', 'toggleRentTermSidebarStatus' ]),

        changeActiveTab(activeTab) {
            if (activeTab !== this.$store.state.rentTerms.rentSortType) {
                this.changeRentSortType(activeTab)
            }
        },

        isMobileVersion() {
            return window.innerWidth > 1370;
        },

        onEscapePress() {
            this.toggleRentTermSidebarStatus()
        }
    },

    computed: {

        isSidebarVisible() {
            return this.$store.getters.isRentTermSidebarVisible
        },

        activeTab() {
            return this.$store.state.rentTerms.rentSortType
        },

        currentTerms() {
            return this.activeTab === 'relevant' ? this.allTerms.filter(term => !term.isArchived) : this.allTerms.filter(term => term.isArchived);
        },

        allTerms() {
            return this.$store.state.rentTerms.registryData
        }
    },

    beforeMount() {
        window.addEventListener('resize', this.isMobileVersion);

        this.isMobileVersion();
    },
    
    beforeDestroy() {
        window.removeEventListener('resize', this.isMobileVersion);
    }
}
</script>

<style lang="scss" scoped>
@import '../../../../../sass/settings/_mixins.scss';

.sidebar {
    position: relative;
    background-color: #fff;
    width: 577px;
    margin-right: 30px;
    padding-top: 20px;
    box-shadow: 0px 10px 30px rgba(167, 167, 167, 0.25);
    overflow-y: auto;
    overflow-x: hidden;

    @include scroll();

    &__close {
        display: none;
        padding: 10px;
        color: #696969;
        cursor: pointer;
    }

    .tab-panel {
        &__header {
            display: flex;
            justify-content: center;
        }

        &__link {
            font-size: 16px;
            line-height: 29px;
            cursor: pointer;
        }
    }

    &__terms-wrapper {
        margin-bottom: 30px;
    }

    &__info-block-wrapper {
        padding: 0 40px;
    }

    @media (max-width: 1600px) {
        width: 540px;
    }

    @media (max-width: 1500px) {
        width: 500px;
    }

    @media (max-width: 1370px) {
        width: 450px;
        height: calc(100vh - 50px);
        position: fixed;
        top: 50px;
        left:0;
        transform: translateX(0px);
        transition: all .5s ease-out;
        z-index: 9999;
        overflow-y: auto;

        &__info-block-wrapper {
            padding: 0 20px;
        }

        &__close {
            display: block;
            position: absolute;
            top: 0;
            right: 0;
        }

        &_hidden {
            transform: translateX(-450px);
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