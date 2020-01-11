<template>
    <div class="rent-terms" data-hint-attachment="rent-term.term-control" data-hint-position="inner-left-middle">
        <sidebar />
        <div class="rent-terms__main">
            <i class="material-icons rent-terms__show-more" @click="openMobileSidebar">more_vert</i>
            <template v-if="termsData.length">
                <rent-term v-for="(term, index) in termsData" :key="index" :data-term-index="index" :term="term" />
            </template>
            <div v-else class="rent-terms__no-data">
                <span class="rent-terms__no-data-message">
                    Нет данных для отображения
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from './sidebar/rent-terms-sidebar';
import RentTerm from './rent-term/rent-term';
import Hint from '../../../modules/hint'
import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
        Sidebar,
        RentTerm    
    },

    data: () => ({
        rentData: {}
    }),

    mounted() {
        
        /**
         * Загружаем и инициализируем подсказку на странице
         */
        const self = this;
        this.loadHints()
        this.localHints.forEach(hint => {
            let elem = new Hint({hint});
            elem.close(function() { self.disableHint(hint.target) })
        });
    },
    
    computed: {
        ...mapGetters(['localHints']),
        
        termsData() {
            let termsList = this.$store.state.rentTerms.registryData ? this.$store.state.rentTerms.registryData : [];
            
            return this.$store.state.rentTerms.rentSortType === 'relevant' && termsList.length ? termsList.filter(term => !term.isArchived) : termsList.filter(term => term.isArchived)
        } 
    },

    methods: {

        ...mapActions([ 'loadHints', 'disableHint', 'getRegistryData', 'toggleRentTermSidebarStatus' ]),

        openMobileSidebar() {
            this.toggleRentTermSidebarStatus(true)
        }
    },

    beforeMount() {

        axios.get('/rent-conditions/cars').then(res => {
            let cars = res.data.cars || res.data.cars === 0 ? res.data.cars : 'N/A';
            let carsOnConditions = res.data.renCars || res.data.renCars === 0 ? res.data.renCars : 'N/A';

            this.$store.dispatch('setCarsOnConditions', `${carsOnConditions} из ${cars}`)
        })

        this.getRegistryData()
    },

    beforeDestroy() {
        this.toggleRentTermSidebarStatus()
    }
}
</script>

<style lang="scss" scoped>
@import '../../../../sass/settings/_mixins.scss';

.rent-terms {
    width: 100%;
    max-width: 1792px;
    display: flex;
    justify-content: flex-end;
    height: calc(100vh - 235px);

    &__main {
        width: calc(100% - 607px);
        scroll-behavior: smooth;
        overflow-y: auto;

        @include scroll();
    }

    &__show-more {
        display: none;
        position: absolute;
        top: -6px;
        left: -7px;
        padding: 10px;
        cursor: pointer;
    }

    &__no-data {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;

        &-message {
            font-size: 16px;
            line-height: 19px;
            color: #212121;
        }
    }

    @media (max-width: 1600px) {
        &__main {
            width: calc(100% - 570px);
        }
    }

    @media (max-width: 1500px) {
        &__main {
            width: calc(100% - 500px);
        }
    }

    @media (max-width: 1370px) {
        &__main {
            width: 100%;
        }

        &__show-more {
            display: block;
        }
    }

    @media (max-width: 568px) {
        height: 50vh;
    }
}
</style>

<style lang="scss">
.container-fluid.content-block.demo__mode {
    padding-bottom: 0;
}

.rent-terms-wrapper__body {
    display: flex;
    justify-content: center;
}
</style>