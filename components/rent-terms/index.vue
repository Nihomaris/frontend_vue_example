<template>
    <div class="rent-terms-wrapper">
        <div class="rent-terms-wrapper__info">
            <info-panel 
                :title="infoBlockData.title" 
                :infoblocks="infoBlockData.infoblocks"
                :links="infoBlockData.links"
                :buttons="isNewRentTermPage ? newRentTermButtons : rentTermsButtons" />
        </div>
        <div class="rent-terms-wrapper__body">
            <registry v-if="isRentTermsPage" />
            <new-rent-terms v-if="isNewRentTermPage" />
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import InfoPanel from '../common/info-panel';
import Registry from './registry/rent-terms'
import NewRentTerms from './new-rent-terms/new-rent-terms';
import showNotify from '../../modules/notification'

export default {
    components: {
        InfoPanel,
        Registry,
        NewRentTerms
    },

    watch: {
        isNeedToShowErrorNotification(status) {
            if(status) {
                showNotify('Проверьте правильность заполнения полей', '', 'error')
                this.hideErrorNotification()
            }
        }
    },

    computed: {
        ...mapGetters(['isLoading', 'isRentTermsPage', 'isNewRentTermPage', 'infoBlockData', 'isNeedToShowErrorNotification']),

        newRentTermButtons() {
            return [
                { name: 'Сохранить', href: '/rent-terms', disabled: this.isLoading, event: this.createNewRentTerm }, 
				{ name: 'Отменить', href: '/rent-terms', disabled: this.isLoading, event: this.setRentTermsDisplay, secondary: true }
            ]
        },

        rentTermsButtons() {
            return [
				{ name: 'Новое условие аренды', href: '/rent-terms',  event: this.setNewRentTermDisplay }
            ]
        }
    },
    methods: {
        ...mapMutations(['setRentTermsDisplay','setNewRentTermDisplay', 'hideErrorNotification']),
        ...mapActions(['createNewRentTerm'])
    },
}
</script>

<style lang="scss">
/* scoped для стилей не делаем, иначе алерт будет без стилей */
@import '../../../sass/settings/_mixins.scss';
@import '../../../sass/modules/notification.scss';

.rent-terms-wrapper {
    padding: 62px 2% 20px 2%;

    &__body {
        position: relative;
        padding: 30px 2.4%;
        background-color: #FFFFFF;
    }

    @media (max-width: 800px) {
        padding-bottom: 10px;

        &__body {
            padding-bottom: 10px;
        }
    }
}
</style>