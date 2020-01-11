<template>
    <div class="modal" @click.self="$store.dispatch('changeModalStatus')">
        <div class="modal__wrapper">
            <div class="modal__content-wrapper">
                <p class="modal__heading">{{ heading }}</p>
                <p class="modal__content">{{ text }}</p>
            </div>
            <div class="modal__buttons-wrapper">
                <ui-button class="modal__btn-one" :name="btnOneText" @click="$emit('primaryClick')"/>
                <ui-button class="modal__btn-two" :name="btnTwoText" :secondary="true" @click="$emit('secondaryClick')"/>
            </div>
        </div>
    </div>
</template>

<script>
import button from '../UiButton'

import { onEscapePress } from '../../mixins/keyboard-events';

export default {
    mixins: [ onEscapePress ],

    props: {
        heading: {
            type: String,
            default: '',
            required: false
        },

        text: {
            type: String,
            default: '',
            required: false
        },

        btnOneText: {
            type: String,
            default: 'Подтвердить',
            required: false
        },

        btnTwoText: {
            type: String,
            default: 'Отменить',
            required: false
        }
    }
}
</script>

<style lang="scss" scoped>
.modal {
    font-family: 'Roboto';
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;

    &__btn {

        &-one {
            margin-right: 30px;
        }
    }

    &__wrapper {
        background-color: #fff;
        border-radius: 5px;
        max-width: 427px;
        width: 427px;
        padding-top: 35px;
    }

    &__content-wrapper {
        padding: 0 35px;
        margin-bottom: 30px;
    }

    &__heading {
        font-size: 18px;
        line-height: 22px;
        font-weight: bold;
        margin-bottom: 20px;
    }

    &__content {
        font-size: 14px;
        display: inline-block;
        
        &_warning {
            margin-bottom: 0;
        }

        .material-icons {
            font-size: inherit;
            position: relative;
            bottom: -2px;
            color: #D42C27;
        }

    }

    &__buttons-wrapper {
        display: flex;
        justify-content: center;
        margin-bottom: 39px;
    }

    &__button {
        &-active {
            display: inline-block;
            text-transform: uppercase;
            font-size: 12px;
            line-height: 22px;
            letter-spacing: .1em;
            padding: 9px 23px;
            border-radius: 2px;
            background-color: #E58325;
            color: #fff;
            cursor: pointer;
        }
    }

    &__rub {
        font-size: 18px;
        line-height: 22px;
    }

    &__left {
        font-size: 12px;
        line-height: 14px;
        color: #696969;
    }

    &__replenish {
        color: #fff;
    }

    .new-policy__buttons-save {
        margin-right: 30px;
    }

}

</style>
