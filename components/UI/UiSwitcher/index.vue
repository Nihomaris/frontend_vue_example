<template>
    <div :class="['ui-switch', { 'ui-switch_disabled': disabled }]">
        <input 
            :id="name"
            type="checkbox" 
            class="ui-switch__checkbox"
            :name="name"
            :value="value"
            @change.prevent="toggle"
            :disabled="disabled"
            :checked="checked" />
        <label :for="name" :class="['ui-switch__label', 'ui-switch__label-icon', { 'ui-switch__label-icon_checked': checked } ]" />
    </div>
</template>

<script>
export default {
    data: () => ({
        checked: false
    }),
    name: 'ui-switcher',
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

.ui-switch {
    $this: &;

    position: relative;
    display: inline-block;
    @include no-select();

    &__checkbox {
        display: none;
    }

    &__label {
        position: relative;
        font: 400 12px/22px "Tahoma", sans-serif;
        color: #696969;
        margin-bottom: 0;
        cursor: pointer;
        margin-right: 0;

        @include transition();

        &-icon {
            position: relative;
            width: 27px;
            height: 15px;

            &:before {
                position: absolute;
                content: '';
                top: 0;
                right: 0;
                width: 27px;
                height: 15px;
                background-color: color(switch-bg);
                border: 1px solid color(switch);
                border-radius: 10px;

                @include transition();
            }

            &:after {
                position: absolute;
                content: 'close';
                right: 14px;
                top: 2px;
                width: 11px;
                height: 11px;
                background-color: color(switch);
                border-radius: 50%;
                font-family: 'Material Icons';
                font-size: 8px;
                line-height: 11px;
                text-align: center;
                color: #ffffff;
                @include transition();
            }

            &:hover {
                &:before {
                    background-color: color(switch-bg-hover) !important;
                }
            }
                
            &_checked {
                &:before {
                    background-color: color(switch-bg-active);
                    border: 1px solid color(switch-active);
                }

                &:after {
                    content: 'done';
                    right: 2px;
                    background-color: color(switch-active);
                }
            }

        }

    }

    &__title {
        font: 400 16px/20px 'Tahoma', sans-serif;
        color: #000000;
    }

    &__sub-title {
        font: 400 12px/16px 'Tahoma', sans-serif;
        color: #696969;
        margin-top: -10px;
    }


    &_disabled {
        .ui-switch__label {
            cursor: default;

            &-icon {
                &:before {
                    background-color: color(switch-bg-disabled) !important;
                    border: 1px solid color(switch-disabled);
                }

                &:after {
                    background-color: color(switch-disabled);
                }
            }
        }
    }

    &_flex {
        display: flex;

        #{$this}__label {
            &_icon {
                min-width: 27px;
                margin-right: 8px;
                margin-top: 2px;
            }
        }
    }

    &_offset-to-left {
        margin-left: -35px;

        @media (max-width: 767px) {
            margin-left: 0;
        }
    }

}
</style>