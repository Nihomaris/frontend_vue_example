<template>
    <div :class="['age__term', {'age__term_disabled': disabled} ]">
        <i :class="['age__term-delete', 'material-icons', { 'age__term-delete_disabled': disabled }]" v-if="count > 1 && !disabled" @click="removeAgePart(num)">close</i>
        <div class="age__term-number">
            <span class="age__term-number-value">
                №{{ num+1 }}
            </span>
        </div>
        <div class="age__term-data-wrapper">
            <div class="age__term-data">
                <p class="age__term-title">Возраст</p>
                <span class="age__term-text">от&nbsp;</span>
                <ui-tooltip 
                    :isShow="!disabled && minValErrorDisplayed && hasMinValueError" 
                    :text="getErrorMinValueText"
                    class="age__term-text">

                        <ui-text-field 
                            class="age__term-input age__term-input_min-val"
                            v-model="min_value"
                            type="tel" 
                            label="0"
                            :disabled="disabled"
                            @input="removeErrorByName(`ages.${num}.min_value`)"
                            @focus="toggleMinValError(true)"
                            @blur="toggleMinValError(false)"
                            :hasErrors="hasMinValueError"
                            :isSuccess="min_value !== ''"
                            mask="###" />
                </ui-tooltip>
                <span class="age__term-text">&nbsp;до&nbsp;</span>
                <ui-tooltip 
                    :isShow="!disabled && maxValErrorDisplayed && hasMaxValueError" 
                    :text="getErrorMaxValueText"
                    class="age__term-text">

                        <ui-text-field 
                            class="age__term-input age__term-input_max-val"
                            v-model="max_value"
                            type="tel" 
                            label="10"
                            :disabled="disabled"
                            @input="removeErrorByName(`ages.${num}.max_value`)"
                            @focus="toggleMaxValError(true)"
                            @blur="toggleMaxValError(false)"
                            :hasErrors="hasMaxValueError"
                            :isSuccess="max_value !== ''"
                            mask="###" />
                </ui-tooltip>
                <span class="age__term-text">&nbsp;месяцев </span><span class="age__term-explanation">{{agesSum}}</span>
            </div>
            <div class="age__term-data">
                <p class="age__term-title">Изменение базовой ставки</p>
                
                <ui-tooltip 
                    :isShow="!disabled && priceErrorDisplayed && hasPriceValueError" 
                    :text="getErrorPriceText"
                    class="age__term-text">

                        <ui-currency-field 
                            class="age__term-input age__term-input_base-rate"
                            v-model="price"
                            type="tel" 
                            @input="removeErrorByName(`ages.${num}.price`)"
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
                </ui-tooltip> <span class="age__term-text">&#8381;</span>
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
            age: Object, 

            /**
             * Remove current field error after input event
             * Удалить ошибку текущего поля при попытке ввести что-то
             */
            removeErrorByName: Function, 

            /**
             * Обновить данные в store
             */
            updateAgeMinValue: Function, 
            updateAgeMaxValue: Function, 
            updateAgePrice: Function, 

            /**
             * Remove current term part
             */
            removeAgePart: Function, 

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
                    return this.age.min_value;
                },
                set(value) {
                    this.updateAgeMinValue({ index: this.num, value });
                }
            },

            max_value: {
                get() {
                    return this.age.max_value;
                },
                set(value) {
                    this.updateAgeMaxValue({ index: this.num, value });
                }
            },

            price: {
                get() {
                    return this.age.price;
                },
                set(value) {
                    this.updateAgePrice({ index: this.num, value });
                }
            },

            /**
             * Calculate sum of ages
             */
            agesSum() {
                let result = null;
                if(this.age.min_value && this.age.max_value) {
                    let min = +this.age.min_value;
                    let max = +this.age.max_value;
                    let sum = max - min;

                    if(sum >= 0) {
                        result = `(${Math.floor(sum/12)} г. ${sum%12} мес.)`
                    }
                }

                return result;
            },

            /**
             *  Check server side validation errors for a field,
             *  Проверка на наличие ошибки для поля
             */
            hasMinValueError() {
                return this.errors && this.errors[`ages.${this.num}.min_value`] ? true : false;
            },

            hasMaxValueError() {
                return this.errors && this.errors[`ages.${this.num}.max_value`] ? true : false;
            },

            hasPriceValueError() {
                return this.errors && this.errors[`ages.${this.num}.price`] ? true : false;
            },

            /**
             * Get field's error text
             * Получить текст ошибки для поля
             */
            getErrorMinValueText() {
                return this.hasMinValueError ? this.errors[`ages.${this.num}.min_value`][0] : '';        
            },

            getErrorMaxValueText() {
                return this.hasMaxValueError ?  this.errors[`ages.${this.num}.max_value`][0] : '';        
            },

            getErrorPriceText() {
                return this.hasPriceValueError ? this.errors[`ages.${this.num}.price`][0] : '';        
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
.age {
    
    &__term {
        position: relative;
        display: flex;
        align-items: center;
        padding: 20px;
        border: 1px solid #E2E2E2;
        border-radius: 5px;
        margin-bottom: 20px;

        &_disabled {
            color: #B2B2B2 !important;
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

        &-delete {
            position: absolute;
            top: 5px;
            right: 10px;
            padding: 10px;
            color: #E58325;
            cursor: pointer;

            &_disabled {
                color: #B2B2B2
            }
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
                width: 38px;
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