<template>
    <div>
        <a :class="['ui-link__link', classes]" 
            :href="href"
            :target="target"
            @click="onClick">{{ name }}</a>
    </div>
</template>

<script>
export default {
    props: {
        name: String,
        href: String,
        disabled: Boolean,
        target: {
            type: String,
            default: '',
            required: false
        }
    },
    methods: {

        /**
         * TODO
         */
        onClick(e) {
            if (!this.disabled) this.$emit('click', e)
        }
    },
    computed: {
        classes () {
            return {
                [`ui-link_disabled`]: this.disabled,
            }
        },
    },
}
</script>

<style lang="scss" scoped>
    .ui-link {

        &_disabled {
            border-bottom: 1px solid #b2b2b2;
            color: #b2b2b2 !important;
            cursor: default;
        }

        &__link {
            display: inline-block;
            margin-right: 10px;
            color: #2A5885;
            border-bottom: 1px solid rgba(42, 88, 133, 0.5);
            transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            white-space: nowrap;
            
            &:hover,
            &:focus {
                color: #E58325;
                border-bottom: 1px solid #E58325;
            }
        }

    }
</style>