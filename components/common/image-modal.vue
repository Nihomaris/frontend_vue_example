<template>
    <div class="image-modal" @click.self="$emit('close-modal')">
        <div class="image-modal__wrapper">
            <div class="image-modal__close">
                <i class="material-icons image-modal__close-button" @click="$emit('close-modal')">close</i>
            </div>
            <div class="image-modal__image-wrapper">
                <img :src="url" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import { onEscapePress } from '../mixins/keyboard-events'

export default {
    mixins: [onEscapePress],
    props: {
        url: {
            type: String,
            default: '',
            required: true
        }
    },
    methods: {
        onEscapePress() {
            this.$emit('close-modal');
        }
    }
}
</script>

<style lang="scss" scoped>
.image-modal {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    position: fixed;
    z-index: 9999;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);

    &__wrapper {
        max-width: 90%;
    }

    &__close {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-bottom: 10px;

        &-button {
            font-size: 36px;
            margin-right: -8px;
            cursor: pointer;
        }
    }

    &__image-wrapper {
        img {
            max-width: 100%;
            max-height: 70vh;
            height: auto;
        }
    }

    @media (max-width: 1024px) {
        &__wrapper {
            position: relative;
            top: 10px;
        }

        &__close {
            &-button {
                font-size: 30px;
            }
        }

        &__image-wrapper {
            img {
                max-height: 60vh;
            }
        }
    }
}
</style>

