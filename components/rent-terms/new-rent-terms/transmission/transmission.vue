<template>
    <div class="transmission">
        <heading heading="КПП" :disabled="disabled.transmissions" />
        <div class="transmission__content-wrapper">
            <div class="transmission__content transmission__content_data">
                    <part 
                        v-for="(transmission,index) in transmissions"
                        :key="index"
                        :num="index"
                        :errors="errors" 
                        :transmission="transmission" 
                        :count="transmissions.length"
                        :disabled="disabled.transmissions"
                        :removeErrorByName="removeErrorByName" 
                        :updateTransmissionPrice="updateTransmissionPrice" 
                        :toggleTransmissionType="toggleTransmissionType"/>
            </div>
            <info-block :disabled="disabled.transmissions" class="transmission__content transmission__content_info">
                <p class="transmission__info-text">«Изменение базовой ставки» — значение, изменяющее базовую ставку в положительную (если без минуса) или в отрицательную (если с минусом) сторону.</p>
                <p class="transmission__info-text transmission__info-text_no-bottom">Если поле «КПП» не заполнено в карточке ТС, то параметр не будет учитываться при формировании итоговой суммы аренды.</p>
            </info-block>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Heading from '../new-rent-term-heading'
import InfoBlock from '../../../common/info-block'
import Part from './part'

export default {
    components: {
        Heading,
        InfoBlock,
        Part
    },
    computed: {
        ...mapGetters(['disabled', 'transmissions', 'errors']),
    },
    
    methods: {
        ...mapMutations(['updateTransmissionPrice', 'removeErrorByName', 'toggleTransmissionType']),
    },
}
</script>

<style lang="scss" scoped>
.transmission {
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
}
</style>