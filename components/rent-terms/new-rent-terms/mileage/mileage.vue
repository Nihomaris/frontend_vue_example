<template>
    <div class="mileage">
        <heading heading="Пробег" :disabled="disabled.mileages" />
        <div class="mileage__content-wrapper">
            <div class="mileage__content mileage__content_data">
                
                <part 
                    v-for="(mileage,index) in mileages" 
                    :key="index" 
                    :num="index"
                    :errors="errors" 
                    :mileage="mileage" 
                    :count="mileages.length"
                    :disabled="disabled.mileages"
                    :removeErrorByName="removeErrorByName" 
                    :updateMileageMinValue="updateMileageMinValue"
                    :updateMileageMaxValue="updateMileageMaxValue"
                    :updateMileagePrice="updateMileagePrice" 
                    :removeMileagePart="removeMileagePart" />

                <add-button 
                    v-if="mileages.length < 5"
                    :disabled="disabled.mileages"
                    :createNew="createNewMileagePart"   
                    :number="mileages.length+1" />

            </div>
            <info-block :disabled="disabled.mileages" class="mileage__content mileage__content_info">
                <p class="mileage__info-text">«Изменение базовой ставки» — значение, изменяющее базовую ставку в положительную (если без минуса) или в отрицательную (если с минусом) сторону.</p>
                <p class="mileage__info-text">Максимум может быть 5 параметров пробега, диапазон которых не должен пересекаться.</p>
                <p class="mileage__info-text mileage__info-text_no-bottom">Если поле «Пробег» не заполнено в карточке ТС, то параметр не будет учитываться при формировании итоговой суммы аренды.</p>
            </info-block>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Heading from '../new-rent-term-heading'
import InfoBlock from '../../../common/info-block'
import AddButton from '../common/add-button'
import Part from './part.vue'

export default {
    components: {
        Part,
        Heading,
        InfoBlock,
        AddButton
    },
    computed: {
        ...mapGetters(['disabled', 'mileages', 'errors']),
    },

    methods: {
        ...mapMutations(['removeErrorByName', 'updateMileageMinValue', 'updateMileageMaxValue', 'updateMileagePrice', 'createNewMileagePart', 'removeMileagePart']),
    },
}
</script>

<style lang="scss" scoped>
.mileage {
    font-family: 'Roboto';
    box-shadow: 0px 10px 30px rgba(167, 167, 167, 0.25);
    margin-bottom: 30px;

    &__content {
        width: calc(50% - 15px);
        
        &-wrapper {
            display: flex;
            flex-wrap: wrap;
            padding: 20px 45px 40px;
        }

        &_data {
            margin-right: 30px;
            border-radius: 5px;
        }

        &_info.info-block {
            margin-bottom: 0;
        }
    }

    &__info-text {

        &_no-bottom {
            margin-bottom: 0;
        }
    }

    @media (max-width: 1100px) {
        &__content {
            width: 100%;

            &_data {
                margin: 0 0 20px;
            }
        }
    }

    @media (max-width: 992px) {
        &__content {
            &-wrapper {
                padding: 20px;
            }
        }
    }

    @media (max-width: 576px) {
        &__term,
        &__add-new {
            padding: 10px;
        }

        &__term {
            flex-direction: column;

            &-delete {
                top: 3px;
                right: 6px;
                padding: 3px;
                font-size: 22px;
            }

            &-data {
                padding-left: 0;

                &-wrapper {
                    border-left: none;
                    width: 100%;
                }
            }

            &-number {
                width: 100%;
                padding-right: 0;
                font-size: 14px;

                &-value {
                    text-align: left;
                    width: 100%;
                    padding-bottom: 5px;
                    border-bottom: 1px solid #E2E2E2;
                    margin-bottom: 10px;
                }
            }

            &-input {
                &_min-val,
                &_max-val {
                    margin-bottom: 5px;
                }
            }

            &-explanation {
                display: block;
                margin-bottom: 10px;
            }
        }

        &__add-new {
            .mileage__term-number {
                width: 48px;
            }
            .mileage__term-number-value {
                text-align: center;
                margin-bottom: 0;
                padding-bottom: 0;
                border-bottom: none;
            }
        }
    }
}
</style>