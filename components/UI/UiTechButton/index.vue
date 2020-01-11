<template>
    <a :class="['ui__tech-button', {'ui__tech-button_disabled': disabled}]" @click.prevent="onClick">{{ name }}</a>
</template>

<script>
export default {
    props: {
        disabled: {
            type: Boolean,
            default: false,
            required: false
        },

        name: {
            type: String,
            default: '',
            required: true
        }
    },

    methods: {
        onClick() {
            if (!this.disabled) this.$emit('click')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../../../sass/settings/_mixins.scss';

.ui__tech-button {
    position: relative;
    @include sub-text();
    color: color(tech-button);
    @include transition();

    &_disabled {
        color: color(disabled) !important;
        cursor: default;
    }

    &:active {
        top: 1px;
    }
}
</style>