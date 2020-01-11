<template>
        <div>
            <template v-if="mask">
                <input 
                    @focus="onFocus"
                    @blur="onBlur"
                    @input="onInput"
                    ref="textfield"
                    v-mask="mask"
                    :type="type"
                    :masked="masked"
                    :class="classes"
                    :placeholder="label" 
                    :readonly="readonly"
                    :maxlength="maxlength"
                    :disabled="disabled" 
                    v-model="amount"
                    />
            </template>
            <template v-else>
                <input 
                    @focus="onFocus"
                    @blur="onBlur"
                    @input="onInput"
                    ref="textfield"
                    :type="type"
                    :class="classes"
                    :placeholder="label" 
                    :readonly="readonly"
                    :maxlength="maxlength"
                    :disabled="disabled" 
                    v-model="amount"
                    />
            </template>
        </div>
</template>

<script>
import { mask } from 'vue-the-mask'

export default {

    name: 'ui-text-field',

    directives: { mask },

    data() {
        return {
            amount: '',
            hasFocus: false,
            isShowSuccess: false,
        }
    },

     props: {
        mask: [String, Array],
        masked: Boolean,
        label: String,
        type: String,
        maxlength: Number,
        autocomplete: String,
        readonly: Boolean,
        disabled: Boolean,
        hasErrors: Boolean,
        isSuccess: Boolean,
        value: {
            type: [Number, String],
            default: '',
            required: false
        },
    },

    mounted() {
        this.amount = this.newValue;
    },

    watch: {
        newValue(value) {
            this.amount = value;
        }
    },

    computed: {
        newValue() {
            return this.value;
        },

        classes() {
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
        onFocus(e) {
            this.hasFocus = true

            this.$emit('focus', e)
        },

        onBlur(e) {
            this.hasFocus = false

            this.$emit('blur', e)
        },

        onInput(e) {
            this.$emit('input', e.target.value)
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
               vertical-align: bottom;
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
                box-sizing: border-box;
                box-shadow: inset 0 0 3px #fff, 0 1px 1px rgba(0,0,0,.1);
            }
        }
    }

</style>