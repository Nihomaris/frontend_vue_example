<template>
    <div :class="['info-block', { 'info-block_disabled': disabled }]">
        <div class="info-block__icon">
            <i class="material-icons info-block__icon-info">info</i>
        </div>
        <div class="info-block__message">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: ['disabled']
}
</script>

<style lang="scss" scoped>

.info-block {
    padding: 22px;
    display: flex;
    border: 1px solid #E2E2E2;
    border-radius: 5px;
    margin-bottom: 30px;

    &__icon {
        margin-right: 8px;

        &-info {
            color: #C9D5E0;
        }
    }

    &__message {
        color: #696969;
    }
    
    &:hover {
        
        .info-block__icon-info {
            color: #2A5885;
        }

        .info-block__message {
            color: #212121;
        }

    }

    &_disabled {

        .info-block__icon-info {
            color: #B2B2B2 !important;
        }

        .info-block__message {
            color: #B2B2B2 !important;
        }

    }

    @media (max-width: 576px) {
        padding: 10px;
    }
}
</style>