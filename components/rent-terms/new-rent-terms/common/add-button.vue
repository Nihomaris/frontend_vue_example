<template>
  <div :class="['add-new', { 'add-new_disabled': disabled }]" @click="createNew">
        <div class="add-new__number">
            <span class="add-new__number-value">
                №{{ number }}
            </span>
        </div>
        <span class="add-new__title">Добавить параметр</span>
        <div class="add-new__icon">
            <i class="material-icons">add</i>
        </div>
    </div>
</template>

<script>
export default {
    props: [ 'disabled', 'createNew', 'number' ]
}
</script>

<style lang="scss" scoped>
    .add-new {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #E2E2E2;
        border-radius: 5px;
        padding: 20px;
        cursor: pointer;

        &__icon {
            display: flex;
            align-items: center;
            color: #E58325;
        }

        &__title {
            color: #E58325;
        }

        &__number {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            font-size: 16px;
            line-height: 19px;
            color: #696969;
            border-right: 1px solid #E2E2E2;
            padding-right: 20px;

            &-value {
                width: 48px;
                text-align: center;
            }
        }

        &_disabled {
            .add-new__title {
                color: #B2B2B2 !important;
            }
            .add-new__icon {
                color: #B2B2B2 !important;
            }
        }
    }

    @media (max-width: 576px) {
        .add-new {

            &__number {
                width: 48px;
            }

            &__number-value {
                text-align: center;
                margin-bottom: 0;
                padding-bottom: 0;
                border-bottom: none;
            }

        }
    }
</style>