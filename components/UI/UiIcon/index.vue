<template>
    <i class="ui-icon">{{ icon }}</i>
</template>

<script>
export default {
    name: 'ui-icon',
    data: () => ({
        pre: 'er-icon',
        icon: '',
        viewbox: ''
    }),
    props: {

        /**
         * Название иконки
         */
        name: {
            type: String,
            required: true
        },

        /**
         * Ширина иконки
         */
        width: [String, Number],

        /**
         * Высота иконки
         */
        height: [String, Number]
    },

    watch: {
        name (val) {
            this.icon = require(`@images/ui-icons/${val}.svg`)
        }
    },

    created () {
        this.icon = require(`@images/ui-icons/${this.name}.svg`)
    },
}
</script>

<style>

</style>