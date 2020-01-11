<template>
    <div :class="['ui-checkbox', 'ui-checkbox_inline-block', { 'ui-checkbox_disabled': disabled }]">
        <input 
            :id="name"
            type="checkbox" 
            class="ui-checkbox__input"
            :name="name"
            :value="value"
            @change.prevent="toggle"
            :disabled="disabled"
            :checked="checked" />
        <label :for="name" class="ui-checkbox__label">
            <i class="ui-checkbox__icon"></i>
        </label>
    </div>
</template>

<script>
export default {
    data: () => ({
            checked: false
    }),
    name: 'ui-checkbox',

    props: {
        default: {
            type: Boolean,
            default: false
        },
        name: {
            type: String,
            required: true
        },
        value: {
            type: [String, Number],
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        if(this.default) {
            this.checked = this.default;
        }
    },
    methods: {
        toggle (event) {
            if(!this.disabled) { 
                this.checked = !this.checked;
                this.checked ? this.$emit('on', this.checked) : this.$emit('off', this.checked);        
                this.$emit('change', this.checked);
            }
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../../../../sass/settings/_mixins.scss';

.ui-checkbox {
    margin-bottom: 5px;

    &__label {
        position: relative;
        font: 400 12px/16px 'Tahoma', sans-serif;
        color: #000;
        padding-left: 20px;
        cursor: pointer;
        margin: 0;

        &_reset {
            min-height: 15px !important;
            padding-left: 15px !important;
        }

        &:hover {
            .ui-checkbox__icon {
                background-color: color(radio-hover);
            }
        }
    }

    &__input {
        display: none;

        &:checked + .ui-checkbox__label .ui-checkbox__icon {
            border: 1px solid color(radio-active);

            &:after {
                display: block;
            }
        }
    }

    &__icon {
        position: absolute;
        z-index: 1;
        width: 15px;
        height: 15px;
        left: 0;
        top: 0;
        border: 1px solid color(radio-border);
        border-radius: 2px;
        background-color: color(radio);

        @include transition();

        &:after {
            position: absolute;
            display: none;
            content: '';
            left: -1px;
            top: -1px;
            width: 15px;
            height: 15px;
            background: url(/img/checkbox.svg) no-repeat transparent 50% 0;
        }
    }

    &_inline-block {
        display: inline-block;
        margin: 0;

        .ui-checkbox__label {
            width: 15px;
            height: 15px;
            padding-left: 16px;
        }

        .ui-checkbox__icon {
            top: 2px;
        }
    }

    &_disabled {
        .ui-checkbox__icon {
            border: 1px solid color(radio-border-disabled);
            background-color: color(radio-disabled) !important;

            &:after {
                background-color: color(radio-border-disabled) !important;
            }
        }

        .ui-checkbox__label {
            cursor: default;
        }

        .ui-checkbox__input:checked + .ui-checkbox__label .ui-checkbox__icon {
            border: 1px solid color(radio-border-disabled);

            &:after {
                filter: grayscale(1);
                opacity: 0.3;
            }
        }
    }
}
</style>