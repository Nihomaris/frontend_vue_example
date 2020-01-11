<template>
    <basic-select
            class="base-select"
            :options="options"
            :selected-option="value"
            :placeholder="placeholder"
            @select="$emit('input', $event)"
            v-model="value"
    >
    </basic-select>
</template>


<script>
    import { BasicSelect } from 'vue-search-select';
    // https://github.com/moreta/vue-search-select repo
    // https://vue-search-select.netlify.com/#/model demo

    export default {

        components: {
            BasicSelect
        },

        props: {
            placeholder: {
                type: String,
                default: '',
                required: false
            },

            options: {
                type: Array,
                default: () => [],
                required: false
            },

            value: {
                type: Object,
                default: () => ({value: '', text: ''}),
                required: false
            }
        },

        data: () => ({
            searchText: '',
        }),

        mounted() {
            document.querySelector('.dropdown.icon').classList.add('material-icons')
        }
    }
</script>

<style lang="scss">
    @import '../../../../sass/settings/_mixins.scss';
    @import '../../../../../../node_modules/vue-search-select/dist/VueSearchSelect.css';

    .base-select_error {
        border-bottom: 2px solid #D42C27 !important;
    }

    .base-select.ui.selection.dropdown {
        position: relative;
        height: 24px;
        padding: 4px;
        border: 1px solid #B4B4B4;
        border-radius: 3px;
    }

    .base-select.ui.selection.dropdown:hover,
    .base-select.ui.selection.active.dropdown,
    .base-select.ui.selection.dropdown .active,
    .base-select.ui.selection.dropdown .visible {
        border: 1px solid #489090;

    }
    .base-select.ui.selection.active.dropdown .search {
        padding-top: 0;
    }

    .base-select.ui.selection.dropdown > .dropdown.icon {
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 17px;
        font-weight: bold;
        height: 16px;
        padding: 0;
        transition: all .2s ease-in-out;
        transform: rotate(0deg);
    }

    .base-select.ui.search.selection.dropdown>input.search {
        height: 24px;
        padding: 0 4px 3px;
    }


    .base-select.ui.selection.active.dropdown .menu {
        border: 1px solid #489090;
    }

    .base-select.ui.selection.dropdown .menu > .item {
        font-size: 12px;
        line-height: 12px !important;
        padding: 5px !important;
    }

    .base-select.ui.selection.dropdown .menu > .item:hover {
        background: rgba(240, 124, 24, .2);
    }

    .base-select.ui.selection.dropdown > .dropdown.icon:before {
        font-family: 'Material Icons';
        content: 'keyboard_arrow_down';
    }

    .base-select.ui.active.selection.dropdown > .dropdown.icon,
    .base-select.ui.visible.selection.dropdown > .dropdown.icon {
        color: #E58325;
        transform: rotate(180deg);
        top: 17px;
    }

    .menu {
        @include scroll();
    }

    .base-select .text {
        max-width: calc(100% - 17px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>