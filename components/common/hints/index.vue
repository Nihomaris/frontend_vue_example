<template>
    <div class="hints-overlay__box" data-hint-attachment="rent-term.multiple-appointment" data-hint-position="inner-left-middle"></div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Hint from '../../../modules/hint'

export default {

    mounted() {
        const self = this;

        this.loadHints();

        this.globalHints.map(hint => {
            let elem = new Hint({hint});
            elem.close(function() { self.disableHint(hint.target) })
        });

        this.localHints.map(hint => {

            if(hint.target === 'rent-term.multiple-appointment') {
                let elem = new Hint({hint});
                elem.close(function() { self.disableHint(hint.target) })
            }

        });
    },

    computed: {
        ...mapGetters(['localHints', 'globalHints']),
    },

    methods: {
        ...mapActions(['loadHints', 'disableHint'])
    },
}
</script>

<style lang="scss">
@import '../../../../sass/settings/_mixins.scss';
@import '../../../../sass/modules/hints.scss';

.hints-overlay {

    &__box {
        position: static !important;
    }
}

</style>