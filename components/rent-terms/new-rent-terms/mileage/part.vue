<template>
    <div :class="['mileage__term', {'mileage__term_disabled': disabled}]">
        <i :class="['mileage__term-delete', 'material-icons', { 'mileage__term-delete_disabled': disabled }]" v-if="count > 1 && !disabled" @click="removeMileagePart(num)">close</i>
        <div class="mileage__term-number">
            <span class="mileage__term-number-value">
                №{{ num+1 }}
            </span>
        </div>

        <div class="mileage__term-data-wrapper">
            <div class="mileage__term-data">
                <p class="mileage__term-title">Пробег</p>
                <span class="mileage__term-text">от&nbsp;</span>
                <ui-tooltip 
                    :isShow="!disabled && minValErrorDisplayed && hasMinValueError" 
                    :text="getErrorMinValueText"
                    class="mileage__term-text">
                        <ui-text-field 
                            class="mileage__term-input mileage__term-input_min-val"
                            v-model="min_value"
                            type="tel" 
                            label="0"
                            :disabled="disabled"
                            @input="removeErrorByName(`mileages.${num}.min_value`)"
                            @focus="toggleMinValError(true)"
                            @blur="toggleMinValError(false)"
                            :hasErrors="hasMinValueError"
                            :isSuccess="min_value !== ''"
                            mask="######" />
                </ui-tooltip>
                <span class="mileage__term-text">&nbsp;до&nbsp;</span>
                <ui-tooltip 
                    :isShow="!disabled && maxValErrorDisplayed && hasMaxValueError" 
                    :text="getErrorMaxValueText"
                    class="mileage__term-text">
                            <ui-text-field 
                                class="mileage__term-input mileage__term-input_max-val"
                                v-model="max_value"
                                type="tel" 
                                label="10"
                                :disabled="disabled"
                                @input="removeErrorByName(`mileages.${num}.max_value`)"
                                @focus="toggleMaxValError(true)"
                                @blur="toggleMaxValError(false)"
                                :hasErrors="hasMaxValueError"
                                :isSuccess="max_value !== ''"
                                mask="######" />
                    </ui-tooltip>
                    <span class="mileage__term-text">&nbsp;км</span> <span class="mileage__term-explanation">{{mileagesSum}}</span>
                </div>

                <div class="mileage__term-data">
                    <p class="mileage__term-title">Изменение базовой ставки</p>
                    <ui-tooltip 
                        :isShow="!disabled && priceErrorDisplayed && hasPriceValueError" 
                        :text="getErrorPriceText"
                        class="mileage__term-text">
                            <ui-currency-field 
                                class="mileages__term-input mileages__term-input_base-rate"
                                v-model="price"
                                type="tel" 
                                @input="removeErrorByName(`mileages.${num}.price`)"
                                @focus="togglePriceError(true)"
                                @blur="togglePriceError(false)"
                                :hasErrors="hasPriceValueError"
                                :isSuccess="price !== ''"
                                label="100 000" 
                                :disabled="disabled"
                                separator="space"
                                :minus="true"
                                :min="-999999" 
                                :max="999999" />
                </ui-tooltip> <span class="mileage__term-text">&#8381;</span>
            </div>

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
            mileage: Object, 

            /**
             * Remove current field error after input event
             * Удалить ошибку текущего поля при попытке ввести что-то
             */
            removeErrorByName: Function, 

            /**
             * Обновить данные в store
             */
            updateMileageMinValue: Function, 
            updateMileageMaxValue: Function, 
            updateMileagePrice: Function, 

            /**
             * Remove current term part
             */
            removeMileagePart: Function, 

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
                minValErrorDisplayed: false,
                maxValErrorDisplayed: false,
                priceErrorDisplayed: false,
            }
        },

        computed: {
            
            /**
             * v-model and vuex work together
             */
            min_value: {
                get() {
                    return this.mileage.min_value;
                },
                set(value) {
                    this.updateMileageMinValue({ index: this.num, value });
                }
            },

            max_value: {
                get() {
                    return this.mileage.max_value;
                },
                set(value) {
                    this.updateMileageMaxValue({ index: this.num, value });
                }
            },

            price: {
                get() {
                    return this.mileage.price;
                },
                set(value) {
                    this.updateMileagePrice({ index: this.num, value });
                }
            },

            /**
             * Calculate sum of mileages
             */
            mileagesSum() {
                let result = null;
                if(this.mileage.min_value && this.mileage.max_value) {
                    let min = +this.mileage.min_value;
                    let max = +this.mileage.max_value;
                    let sum = max - min;

                    if(sum >= 0) {
                        result = `(${sum}км)`
                    }
                }

                return result;
            },

            /**
             *  Check server side validation errors for a field,
             *  Проверка на наличие ошибки для поля
             */
            hasMinValueError() {
                return this.errors && this.errors[`mileages.${this.num}.min_value`] ? true : false;
            },

            hasMaxValueError() {
                return this.errors && this.errors[`mileages.${this.num}.max_value`] ? true : false;
            },

            hasPriceValueError() {
                return this.errors && this.errors[`mileages.${this.num}.price`] ? true : false;
            },

            /**
             * Get field's error text
             * Получить текст ошибки для поля
             */
            getErrorMinValueText() {
                return this.hasMinValueError ? this.errors[`mileages.${this.num}.min_value`][0] : '';        
            },

            getErrorMaxValueText() {
                return this.hasMaxValueError ?  this.errors[`mileages.${this.num}.max_value`][0] : '';        
            },

            getErrorPriceText() {
                return this.hasPriceValueError ? this.errors[`mileages.${this.num}.price`][0] : '';        
            },

        },

        methods: {

            /**
             * Show or hide tooltip with error text
             * Показать или скрыть тултип с ошибкой
             */
            toggleMinValError(flag) {
                this.minValErrorDisplayed = flag;
            },

            toggleMaxValError(flag) {
                this.maxValErrorDisplayed = flag;
            },

            togglePriceError(flag) {
                this.priceErrorDisplayed = flag;
            },
        },

    }
</script>

<style lang="scss" scoped>
    .mileage {

        &__term {
            position: relative;
            display: flex;
            align-items: center;
            padding: 20px;
            margin-bottom: 20px;
            border: 1px solid #E2E2E2;
            border-radius: 5px;

            &_disabled {
                color: #B2B2B2 !important;
            }

            &-delete {
                position: absolute;
                top: 5px;
                right: 10px;
                padding: 10px;
                color: #E58325;
                cursor: pointer;
            }

            &-title {
                margin-bottom: 2px;
                color: #696969;
            }

            &-text {
                line-height: 25px;
                vertical-align: top;
            }

            &-explanation {
                color: #696969;
                line-height: 25px;
                vertical-align: top;
            }

            &-number {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                font-size: 16px;
                line-height: 19px;
                color: #212121;
                padding-right: 20px;

                &-value {
                    width: 48px;
                    text-align: center;
                }
            }

            &-data {
                height: 46px;
                padding-left: 20px;
                margin-bottom: 15px;

                &-wrapper {
                    border-left: 1px solid #E2E2E2;
                }
            }
            
            &-input {
                color: #221122;

                &::placeholder {
                    color: #C6C6C6;
                }

                &_min-val,
                &_max-val {
                    width: 61px;
                }

                &_base-rate {
                    width: 89px;
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

        @media (max-width: 576px) {
            &__term {
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