<template>
    <div class="brending">
        <heading heading="Брендирование" :disabled="disabled.brands" />
        <div class="brending__content-wrapper">
            <div class="brending__content brending__content_data">
                <part 
                    v-for="(brand,index) in brands" 
                    :key="index"
                    :num="index"
                    :errors="errors" 
                    :brand="brand" 
                    :count="brands.length"
                    :disabled="disabled.brands"
                    :removeErrorByName="removeErrorByName" 
                    :updateBrandPrice="updateBrandPrice" 
                    :toggleBrandType="toggleBrandType" />
            </div>

            <info-block :disabled="disabled.brands" class="brending__content brending__content_info">
                <p class="brending__info-text">«Изменение базовой ставки» — значение, изменяющее базовую ставку в положительную (если без минуса) или в отрицательную (если с минусом) сторону.</p>
                <p class="brending__info-text brending__info-text_no-bottom">Если поле «Брендирование» не заполнено в карточке ТС, то параметр не будет учитываться при формировании итоговой суммы аренды.</p>
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
        Part,
    },
    computed: {
        ...mapGetters(['disabled', 'brands', 'errors']),
    },
    
    methods: {
        ...mapMutations(['updateBrandPrice', 'removeErrorByName', 'toggleBrandType']),
    },
}
</script>

<style lang="scss" scoped>
.brending {
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

        &-item {
            display: flex;
            align-items: center;
            padding: 20px;
            border: 1px solid #E2E2E2;
            border-radius: 5px;
            margin-bottom: 20px;

            &:last-child {
                margin-bottom: 0;
            }
        }

        &_info {
            margin-bottom: 0;
        }
    }

    &__term {
        &-title {
            margin-bottom: 2px;
            color: #696969;
        }

        &-input {
            padding: 2px 5px;
            border: 1px solid #B4B4B4;
            border-radius: 2px;
            color: #221122;
            outline: none;

            &::placeholder {
                color: #C6C6C6;
            }

            &-change-rate {
                width: 89px;
                margin-bottom: 5px;
            }

            &_rent {
                width: 90px;
            }

            &_error {
                border: 1px solid #D42C27;
                border-bottom: 2px solid #D42C27;
            }

            &_success {
                border-bottom: 2px solid #479D6C;
            }
        }
    }

    &__checkbox {
        height: 18px;
        margin-right: 5px;
    }

    &__check-type {
        display: flex;
        align-items: center;
    }

    &__type {
        width: 147px;
        display: block;
        font-size: 16px;
        line-height: 19px;
        text-align: center;
        margin-right: 20px;
    }

    &__change-base-rent {
        padding-left: 20px;
        border-left: 1px solid #E2E2E2;;
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
        &__content {
            &-item {
                padding: 10px;
                flex-direction: column;
            }
        }

        &__check-type {
            width: 100%;
            margin-bottom: 8px;
            padding-bottom: 12px;
            border-bottom: 1px solid #E2E2E2;
        }

        &_checkbox {
            margin-right: 10px;
        }

        &__type {
            width: 200px;
            margin-right: 0;
            text-align: left;
        }

        &__change-base-rent {
            padding-left: 0;
            border-left: 0;
            width: 100%;
        }
    }
}
</style>