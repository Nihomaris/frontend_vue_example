<template>
    <div class="base-terms">
        <heading heading="Базовые параметры"/>
        <div class="base-terms__content-wrapper">
            <div class="base-terms__content base-terms__content_data">

                <div class="base-terms__content-block">
                    <p class="base-terms__term-title">Название</p>

                    <ui-tooltip :isShow="nameErrorDisplayed && hasNameValueError" :text="getErrorNameText">
                        <ui-text-field 
                            class="base-terms__term-input base-terms__term-input_name"
                            v-model="baseName"
                            type="text" 
                            @input="removeErrorByName('name')"
                            @focus="toggleNameError(true)"
                            @blur="toggleNameError(false)"
                            label="Новое условие аренды"
                            :hasErrors="hasNameValueError"
                            :isSuccess="baseName !== ''"
                            :maxlength="50" />
                    </ui-tooltip>
                </div>

                <div class="base-terms__content-block">
                    <p class="base-terms__term-title">Базовая ставка аренды</p>

                    <ui-tooltip :isShow="priceErrorDisplayed && hasPriceValueError" :text="getErrorPriceText">
                        <ui-currency-field 
                            class="base-terms__term-input base-terms__term-input_price"
                            v-model="basePrice"
                            type="tel" 
                            @input="removeErrorByName('price')"
                            @focus="togglePriceError(true)"
                            @blur="togglePriceError(false)"
                            :hasErrors="hasPriceValueError"
                            :isSuccess="basePrice !== ''"
                            label="100 000" 
                            separator="space"
                            :minus="false" 
                            :min="0" 
                            :max="999999" />
                    </ui-tooltip> &#8381;
                </div>

            </div>
            <info-block class="base-terms__content base-terms__content_info">
                <p class="base-terms__info-text">Поля «Название» и «Базовая ставка» обязательны для заполнения. Без них условие аренды не сохранится.</p>
                <p class="base-terms__info-text">Базовая ставка аренды — значение, от которого будут вычитаться или прибавляться суммы дополнительных параметров, описанных ниже.</p>
                <p class="base-terms__info-text base-terms__info-text_no-bottom">Итоговая сумма аренды формируется конкретно в каждом ТС, в зависимости от параметров условий аренды и параметров самого ТС.</p>
            </info-block>
        </div>
    </div>    
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Heading from '../new-rent-term-heading'
import InfoBlock from '../../../common/info-block'

export default {

    data() {
        return {
            nameErrorDisplayed: false,
            priceErrorDisplayed: false
        }
    },

    components: {
        Heading,
        InfoBlock
    },

    computed: {
        ...mapGetters(['name', 'price', 'errors']),

        /**
         * v-model and vuex work together
         */
        baseName: {
            get() {
                return this.name
            },
            set(value) {
                this.updateName(value);
            }
        },

        basePrice: {
            get() {
                return this.price
            },
            set(value) {
                this.updatePrice(value);
            }
        },

        /**
         *  Check server side validation errors for field,
         *  Проверка на наличие ошибки для поля
         */
        hasNameValueError() {
            return this.errors && this.errors.name ? true : false
        },

        hasPriceValueError() {
            return this.errors && this.errors.price ? true : false
        },

        /**
         * Get field's error text
         * Получить текст ошибки для поля
         */
        getErrorNameText() {
            return this.errors && this.errors.name ? this.errors.name[0] : null;
        },

        getErrorPriceText() {
            return this.errors && this.errors.price ? this.errors.price[0] : null;
        },
    },

    methods: {
        ...mapMutations(['removeErrorByName', 'updateName', 'updatePrice']),

        /**
         * Show or hide tooltip with error text
         * Показать или скрыть тултип с ошибкой
         */
        toggleNameError(flag) {
            this.nameErrorDisplayed = flag;
        },

        togglePriceError(flag) {
            this.priceErrorDisplayed = flag;
        }
    },
    
}
</script>

<style lang="scss" scoped>
.base-terms {
    box-shadow: 0px 10px 30px rgba(167, 167, 167, 0.25);
    margin-bottom: 30px;

    &__content {
        width: calc(50% - 15px);
        
        &-wrapper {
            display: flex;
            flex-wrap: wrap;
            padding: 20px 45px 40px;
        }

        &-block {
            margin-bottom: 15px;
        }

        &_data {
            padding-left: 109px;
            margin-right: 30px;
        }

        &_info {
            border: 1px solid #E2E2E2;
        
            &.info-block {
                margin-bottom: 0;
            }
        }
    }

    &__term {
        &-title {
            margin-bottom: 2px;
            color: #696969;
        }

        &-input {
            

            &::placeholder {
                color: #C6C6C6;
            }

            &_name,
            &_rent {
                height: 25px;
            }

            &_name {
                width: 327px;
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

    &__info-text {
        &_no-bottom {
            margin-bottom: 0;
        }
    }

    @media (max-width: 1600px) {
        &__content {
            &_data {
                padding-left: 0;
            }
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

        &__term {
            &-input {
                &_name {
                    width: 75%;
                }
            }
        }
    }

    @media (max-width: 480px) {
        &__term {
            &-input {
                &_rent {
                    width: 50%;
                }
            }
        }
    }

    @media (max-width: 320px) {
        &__term {
            &-input {
                &_name {
                    width: 100%;
                }

                &_rent {
                    width: 75%;
                }
            }
        }
    }
}
</style>