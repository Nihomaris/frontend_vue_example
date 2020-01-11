<template>
    <div class="new-rent-terms" data-hint-attachment="rent-term.sidebar-control" data-hint-position="inner-left-middle">
        <sidebar :toTop="toTop" />
        <div class="new-rent-terms__main">
            <i class="material-icons new-rent-terms__show-more" @click="toggleNewRentTermSidebarStatus(true)">more_vert</i>
            <base-terms />
            <age />
            <mileage />
            <transmission />
            <fuel />
            <branding />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Sidebar from './sidebar/new-rent-terms-sidebar'
import BaseTerms from './base-terms/base-terms'
import Age from './age/age'
import Mileage from './mileage/mileage'
import Transmission from './transmission/transmission'
import Fuel from './fuel/fuel'
import Branding from './branding/branding'
import Hint from '../../../modules/hint'


export default {
    components: {
        Sidebar,
        BaseTerms,
        Age,
        Mileage,
        Transmission,
        Fuel,
        Branding
    },

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
    },

    methods: {

        ...mapActions([ 'loadHints', 'disableHint', 'toggleNewRentTermSidebarStatus' ]),

        // каждый элемент сайдбара соответствует элементу в check-report_main. При клике на него сюда передается строка,
        // которая соответствует названию одного из главных блоков в check-report_main
        toTop(targetBlockName) {
            document.getElementsByClassName(targetBlockName)[0].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        },

    },
}
</script>

<style lang="scss">
@import '../../../../sass/settings/_mixins.scss';

.new-rent-terms {
    width: 100%;
    max-width: 1792px;
    display: flex;
    height: calc(100vh - 235px);

    &__main {
        width: calc(100% - 304px);
        overflow-y: auto;
        scroll-behavior: smooth;

        @include scroll();
    }

    &__show-more {
        display: none;
        position: absolute;
        top: -5px;
        left: -7px;
        padding: 10px;
        cursor: pointer;
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

@media (max-width: 576px) {
    .row-masonry {
        .grid-item {
            padding: 30px 0 0;
        }
    }
}
</style>