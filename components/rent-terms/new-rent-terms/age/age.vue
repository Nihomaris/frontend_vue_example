<template>
    <div class="age">
        <heading heading="Возраст" :disabled="disabled.ages" />
        <div class="age__content-wrapper">
            <div class="age__content age__content_data">
           
                <part 
                    v-for="(age, index) in ages" 
                    :key="index" 
                    :num="index"
                    :errors="errors" 
                    :age="age" 
                    :count="ages.length"
                    :disabled="disabled.ages"
                    :removeErrorByName="removeErrorByName" 
                    :updateAgeMinValue="updateAgeMinValue"
                    :updateAgeMaxValue="updateAgeMaxValue"
                    :updateAgePrice="updateAgePrice" 
                    :removeAgePart="removeAgePart" />

                 <add-button 
                    v-if="ages.length < 5"
                    :disabled="disabled.ages"
                    :createNew="createNewAgePart"   
                    :number="ages.length+1" />
            </div>
                    
            <info-block :disabled="disabled.ages" class="age__content age__content_info">
                <p class="base-terms__info-text">«Изменение базовой ставки» — значение, изменяющее базовую ставку в положительную (если без минуса) или в отрицательную (если с минусом) сторону.</p>
                <p class="base-terms__info-text">Максимум может быть 5 параметров возраста, диапазон которых не должен пересекаться.</p>
                <p class="base-terms__info-text base-terms__info-text_no-bottom">Если поле «Дата приобретения / Дата выдачи паспорта» не заполнено в карточке ТС, то параметр не будет учитываться при формировании итоговой суммы аренды.</p>
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
        ...mapGetters(['disabled', 'ages', 'errors']),
    },

    methods: {
        ...mapMutations(['removeErrorByName', 'updateAgeMinValue', 'updateAgeMaxValue', 'updateAgePrice', 'createNewAgePart', 'removeAgePart']),
    },
    
}
</script>

<style lang="scss" scoped>
.age {
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

            &-data {
                padding-left: 0;

                &-wrapper {
                    border-left: none;
                    width: 100%;
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

    }
}
</style>