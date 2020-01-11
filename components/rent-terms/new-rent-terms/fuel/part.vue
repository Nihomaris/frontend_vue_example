<template>
    <div class="fuel__content-item">
        <div class="fuel__check-type">
            <ui-checkbox 
                :default="fuel.checked"
                :name="`fuel-${num}`" 
                :value="fuel.title"
                :disabled="disabled" 
                @change="toggleCheckbox" />

            <span class="fuel__type">{{ fuel.title }}</span>
        </div>
        <div class="fuel__change-base-rent">
            <p class="fuel__term-title">Изменение базовой ставки</p>
            
             <ui-tooltip 
                :isShow="!disabled && priceErrorDisplayed && hasPriceValueError" 
                :text="getErrorPriceText"
                class="fuel__term-text">
                    <ui-currency-field 
                        class="fuel__term-input fuel__term-input-change-rate"
                        v-model="price"
                        type="tel" 
                        @input="removeErrorByName(`fuels.${num}.price`)"
                        @focus="togglePriceError(true)"
                        @blur="togglePriceError(false)"
                        :hasErrors="hasPriceValueError"
                        :isSuccess="price !== ''"
                        label="100" 
                        :disabled="disabled || !fuel.checked"
                        separator="space"
                        :minus="true"
                        :min="-999999" 
                        :max="999999" />
            </ui-tooltip> <span class="fuel__term-text">&#8381;</span>

        </div>
    </div>
</template>

<script>
export default {
    
    props: {
        /**
         * Number of part
         */
        num: {
            type: [String, Number], 
            required: true
        },

        /**
         * Term block active status
         */
        disabled: Boolean, 

        /**
         * Server side errors
         */
        errors: Object, 

        /**
         * Store input data
         */
        fuel: Object, 

        /**
         * Remove current field error after input event
         * Удалить ошибку текущего поля при попытке ввести что-то
         */
        removeErrorByName: Function, 

        /**
         * Обновить данные в store
         */
        updateFuelPrice: Function, 

        /**
         * Either Activate or deactivate current term type
         */
        toggleFuelType: Function, 

        /**
         * Sum of all parts
         */
        count: Number 
    },

    data() {
        return {

            /**
             * Show tooltip status
             */
            priceErrorDisplayed: false,
        }
    },

    computed: {

        /**
         * v-model and vuex work together
         */
        price: {
            get() {
                return this.fuel.price;
            },
            set(value) {
                this.updateFuelPrice({ index: this.num, value });
            }
        },

        /**
         *  Check server side validation errors for a field,
         *  Проверка на наличие ошибки для поля
         */
        hasPriceValueError() {
            return this.errors && this.errors[`fuels.${this.num}.price`] ? true : false;
        },

        /**
         * Get field's error text
         * Получить текст ошибки для поля
         */
        getErrorPriceText() {
            return this.hasPriceValueError ? this.errors[`fuels.${this.num}.price`][0] : '';        
        },
    },

    methods: {

        /**
         * Either Activate or deactivate current term type
         */
        toggleCheckbox(checked) {
            this.toggleFuelType({index: this.num, value: checked})
        },

        /**
         * Show or hide tooltip with error text
         * Показать или скрыть тултип с ошибкой
         */
        togglePriceError(flag) {
            this.priceErrorDisplayed = flag;
        },
    }
}
</script>

<style lang="scss" scoped>
.fuel {
    &__content {
        width: calc(50% - 15px);

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
    }

    &__term {
        &-title {
            margin-bottom: 2px;
            color: #696969;
        }

        &-text {
            line-height: 25px;
            vertical-align: top;
        }

        &-input {
            color: #221122;

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
        border-left: 1px solid #E2E2E2;
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