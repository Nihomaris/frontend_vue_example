<template>
    <div :class="['ui-tooltip', classesForPosition, classesForStyling]">
        <div class="ui-tooltip__link">
            <slot />
        </div>
        <div v-if="isEmptyString" :class="['ui-tooltip__item', classesForShow]">
            <span class="ui-tooltip__text">{{ text }}</span>
        </div>
    </div>
</template>

<script>
export default {

    name: 'ui-tooltip',

    props: {

        /**
         * Tooltip will be displaying if prop true
         * Тултип отображается если этот параметр true
         */
        isShow: Boolean,

        /**
         * Text content inside tooltip body
         * Текст внутри тултипа
         */
        text: {
            type: String,
            default: 'Default text'
        },

        /**
         * Tooltip position
         * Позиционирование
         */
        top: Boolean,
        left: Boolean,
        bottom: Boolean,
        right: Boolean,
    },

    computed: {

        /**
         * Classes with different tooltip colors
         */
        classesForStyling() {
            return {
                [`ui-tooltip_white`]: true,
            }
        },

        /**
         * Show\Hide classes
         */
        classesForShow() {
            return {
                [`ui-tooltip__item_show`]: this.isShow && this.text,
            }
        },

        /**
         * Position classes
         */
        classesForPosition() {
            return {
                [`ui-tooltip_bottom`]: true,
                [`ui-tooltip_right`]: false, // TODO
                [`ui-tooltip_left`]: false, // TODO
                [`ui-tooltip_top`]: false, // TODO
            }
        },

        /**
         * if text equal empty string
         */
        isEmptyString() {
            return this.text && this.text.trim() ? true : false
        },

    },

}
</script>

<style lang="scss" scoped>
@import '../../../../sass/settings/_mixins.scss';

.ui-tooltip {
    $this: &;

    position: relative;
    display: inline-block;

    &__link {
        position: relative;
        cursor: pointer;
    }

    &__item {
        position: absolute;
        z-index: 2;
        min-height: 22px;
        max-width: 320px;
        margin: auto;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 2px;
        text-align: center;

        @include transition();

        opacity: 0;
        visibility: hidden;
        padding: 0 10px;

        &:after {
            position: absolute;
            content: '';
            width: 0;
            height: 0;
            margin: auto;
        }

        &_show {
            opacity: 1;
            visibility: visible;
        }
    }

    &__text {
        display: inline-block;
        font: 400 12px/22px 'Tahoma', sans-serif;
        line-height: 14px;
        color: #ffffff;
        margin-bottom: 0;
    }

    &_right {
        #{$this}__item {
            left: 100%;
            top: 0;

            // &:hover {
            //     opacity: 1;
            //     visibility: visible;
            //     left: 120%;
            // }

            &:after {
                left: -5px;
                top: 0;
                bottom: 0;
                border-top: 5px solid transparent;
                border-right: 5px solid rgba(0, 0, 0, 0.5);
                border-bottom: 5px solid transparent;
            }

            &_show {
                left: 120%;
            }
        }
    }

    &_bottom {
        #{$this}__item {
            top: 90%;
            left: 50%;
            transform: translateX(-50%);
            min-width: 140px;
            margin-top: 6px;

            &:after {
                top: -5px;
                left: 0;
                right: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-bottom: 5px solid rgba(0, 0, 0, 0.5);
            }

            &_show {
                top: 100%;
            }
        }
    }

    &_white {
        #{$this}__item {
            background-color: #ffffff;
            border: 1px solid #C6C6C6;
            box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);

            &:after {
                top: -5px;
                left: 0;
                right: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-bottom: 5px solid #ffffff;
            }

            &:before {
                position: absolute;
                content: '';
                top: -6px;
                left: 0;
                right: 0;
                width: 0;
                height: 0;
                margin: auto;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-bottom: 6px solid #C6C6C6;
            }
        }

        #{$this}__text {
            color: #212121;
        }
    }
}
</style>