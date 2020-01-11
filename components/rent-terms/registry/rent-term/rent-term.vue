<template>
    <div class="rent-term">
        <template v-if="term">
            <heading :heading="term.name" :author="fullName" :date="termDate" />
            <div class="rent-term__content-wrapper">
                <base-rate :rate="term.price" />
                <div class="rent-term__points-wrapper">
                    <rent-info :info-data="term.mileages" info-type="mileage" title="Пробег ТС" />
                    <rent-info :info-data="term.ages" info-type="age" title="Возраст ТС" />
                    <rent-info :info-data="term.transmissions" info-type="transmission" title="КПП" />
                    <rent-info :info-data="term.fuels" info-type="fuel-type" title="Тип топлива" />
                    <rent-info :info-data="term.brands" info-type="branding" title="Брендинг" />
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import Heading from './rent-term-heading'
import BaseRate from './base-rate'
import RentInfo from './term-item'

export default {
    components: {
        Heading,
        BaseRate,
        RentInfo
    },

    props: {
        term: {
            type: Object,
            default: null,
            required: true
        }
    },

    data() {
        return {
            months: [
                'янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'
            ]
        }
    },

    computed: {
        fullName() {
            let lastName = this.term.user.lastName && this.term.user.lastName.trim() !== '' ? `${this.term.user.lastName}` : '';
            let firstName = this.term.user.firstName && this.term.user.firstName.trim() !== '' ? `${this.term.user.firstName[0].toUpperCase()}.` : '';
            let patronim = this.term.user.middleName && this.term.user.middleName.trim() !== '' ? `${this.term.user.middleName[0].toUpperCase()}.` : '';

            return `${lastName} ${firstName} ${patronim}`.trim();
        },

        termDate() {
            if (this.term.created_at && this.term.created_at.trim() !== '') {
                let [ day, month, year] = this.term.created_at.split('-');

                return `${day} ${this.months[+month - 1]} ${year}`;
            } else {
                return '';
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.rent-term {
    font-family: 'Roboto';
    box-shadow: 0px 10px 30px rgba(167, 167, 167, 0.25);
    margin-bottom: 30px;

    &__content-wrapper {
        padding: 20px 45px 40px;
    }

    &__points-wrapper {
        display: flex;
        flex-wrap: wrap;
    }

    @media (max-width: 992px) {

        &__content-wrapper {
            padding: 20px 20px 30px;
        }

        &__title,
        &__rate {
            font-size: 18px;
            line-height: 24px;
        }
    }

    @media (max-width: 576px) {

        &__content-wrapper {
            padding: 20px 10px 20px;
        }
    }
}
</style>