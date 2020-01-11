<template>
    <div>
        <input 
            :class="classes"
            ref="currencyfield"
            :placeholder="label" 
            :type="type" 
            @focus="onFocus"
            @input="onInput"
            @blur="onBlur"
            @click="onClick"
            :readonly="readonly"
            :disabled="disabled"
            v-model="amount" />
    </div>
</template>

<script>
import currencyMask from '../../mixins/currency-mask'

export default {
    name: 'ui-currency-field',

    mixins: [currencyMask],

    data() {
        return {
            /* Other data you'll see in currencyMask mixin */
            hasFocus: false,
            isShowSuccess: false,
        }
    },

    props: {

        /* Other props you'll see in currencyMask mixin */

        /**
         * placeholder name
         */
        label: {
            type: String,
            default: 'Введите текст'
        },
        
        /**
         * Text, tel and other
         */
        type: {
            type: String,
            default: 'text'
        },

        /**
         * Native autocomplete attr
         */
        autocomplete: {
            type: String,
        },

        /**
         * Native readonly attr
         */
        readonly: {
            type: Boolean,
            default: false
        },

        /**
         * Disable input
         */
        disabled: {
            type: Boolean,
            default: false
        },

        /**
         * Show error styles
         */
        hasErrors: {
            type: Boolean,
            default: false
        },

        /**
         * Show success styles
         */
        isSuccess: {
            type: Boolean,
            default: false
        },
    },

    computed: {
        classes () {
            return {
                [`ui-text-field__input`]: true,
                [`ui-text-field__input_focus`]: this.hasFocus,
                [`ui-text-field__input_disabled`]: this.disabled,
                [`ui-text-field__input_error`]: this.hasErrors && !this.hasFocus,
                [`ui-text-field__input_success`]: this.isSuccess && !this.hasFocus && !this.hasErrors
            }
        },
    },

    methods: {
        onClick (e) {
            if (!this.hasFocus) {
                this.$refs.currencyfield.focus()
            }
        },

        onFocus (e) {
            this.hasFocus = true

            // currencyMask mixin
            this.onFocusHandler(e)

            this.$emit('focus', e)
        },

        onBlur (e) {
            this.hasFocus = false

            // currencyMask mixin
            this.onBlurHandler(e)

            // this.isSuccess = this.validate()
            this.$emit('blur', e)
        },

        onInput (e) {
            this.$emit('input', e.target.value)

            // currencyMask mixin
            this.onInputHandler(e)
        },
    },
}

</script>

<style lang="scss" scoped>
@import '../../../../sass/settings/_mixins.scss';

    .ui-text-field {
        &__input {
            box-sizing: border-box;
            width: 100%;
            height: 24px;
            padding: 0 5px;
            background: color(input-bg);
            vertical-align: top;
            @include input();
            border: 1px solid color(input-border);
            border-radius: 2px;
            color: color(input-text);
            @include transition();

            &::placeholder {
                color: #C6C6C6;
            }

            &_error {
                border: 1px solid #D42C27;
                border-bottom: 2px solid #D42C27;
            }

            &_success {
                border-bottom: 2px solid #479D6C;
            }

            &_disabled {
                background: #F2F2F2 !important;
                border: 1px solid #E5E5E5 !important;

                &::placeholder {
                    color: #B2B2B2;
                }
            }

            &:focus {
                border: 1px solid color(input-border-focus);
                outline: none;
                box-shadow: inset 0 0 3px #fff, 0 1px 1px rgba(0,0,0,.1);
            }
        }
    }

</style>