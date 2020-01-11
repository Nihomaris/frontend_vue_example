<template>
    <div>
        <a :class="['ui-button', classes]" @click.prevent="onClick">{{ name }}</a>
    </div>
</template>

<script>
export default {
    props: {
        name: String,
        secondary: Boolean,
        disabled: Boolean
    },
    computed: {
        classes () {
            return {
                [`ui-button_secondary`]: this.secondary,
                [`ui-button_disabled`]: this.disabled,
            }
        },
    },
    methods: {
        onClick(e) {
            if (!this.disabled) this.$emit('click', e);
        }
    }
}
</script>

<style lang="scss">
@import '../../../../sass/settings/_mixins.scss';

    .ui-button {
        display: inline-block;
        min-width: 130px;
        font: 400 12px/18px 'Tahoma', sans-serif;
        letter-spacing: 0.1em;
        color: color(button-main-text) !important;
        background-color: color(button-main);
        padding: 6px 14px;
        text-align: center;
        text-transform: uppercase;
        border: 0;
        border-radius: 2px;
        cursor: pointer;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0), 0px 0px 2px rgba(0, 0, 0, 0);

        @include transition();
        @include no-select();

        &:hover {
            background-color: color(button-main-hover);
            color: color(button-main-text-hover);
            box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2), 0px 0px 2px rgba(0, 0, 0, 0.12);
        }

        &:active {
            box-shadow: inset 0px 2px 3px rgba(0, 0, 0, 0.1);
        }

        &_secondary {
            background-color: color(button-secondary) !important;
            color: color(button-secondary-text) !important;

            &:hover {
                background-color: color(button-secondary-hover) !important;
                color: color(button-secondary-text-hover) !important;
            }

            &:active {
                background-color: color(button-secondary-active) !important;
                color: color(button-secondary-text-active) !important;
            }
        }

        &_disabled {
            background-color: color(button-disabled) !important;
            color: color(disabled) !important;
            box-shadow: none !important;
            cursor: default !important;

            &:hover {
                color: color(disabled) !important;
                background-color: color(button-disabled) !important;
            }
        }
    }
</style>