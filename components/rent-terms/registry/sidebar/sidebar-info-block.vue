<template>
    <div class="info-block">
        <div class="info-block__icon">
            <i class="material-icons">info</i>
        </div>
        <div class="info-block__message">
            <template v-if="messageFor === 'relevant'">
                <p class="info-block__message">Редактировать условия нельзя, так как это может повлиять на историю аренды ваших ТС. Можно воспользоваться дублированием.</p>
                <p class="info-block__message_inline">
                    Неиспользуемые условия аренды можно поместить в архив.
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M15.1167 2.35833L13.9583 0.958333C13.7333 0.675 13.3917 0.5 13 0.5H3C2.60833 0.5 2.26667 0.675 2.03333 0.958333L0.883333 2.35833C0.641667 2.64167 0.5 3.01667 0.5 3.41667V13.8333C0.5 14.75 1.25 15.5 2.16667 15.5H13.8333C14.75 15.5 15.5 14.75 15.5 13.8333V3.41667C15.5 3.01667 15.3583 2.64167 15.1167 2.35833ZM8 12.5833L3.41667 8H6.33333V6.33333H9.66667V8H12.5833L8 12.5833ZM2.26667 2.16667L2.94167 1.33333H12.9417L13.725 2.16667H2.26667Z" fill="#F5CDA8"/>
                    </svg>
                </p>
            </template>
            <template v-else>
                <p class="info-block__message">Архив — неиспользуемые на данный момент условия аренды.</p>
                <p class="info-block__message_inline">
                    Вы можете восстановить условие для дальнейшей работы.
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M15.125 2.35L13.9667 0.95C13.7333 0.675 13.3917 0.5 13 0.5H3C2.60833 0.5 2.26667 0.675 2.04167 0.958333L0.883333 2.35C0.641667 2.64167 0.5 3.00833 0.5 3.41667V13.8333C0.5 14.75 1.24167 15.5 2.16667 15.5H13.8333C14.75 15.5 15.5 14.75 15.5 13.8333V3.41667C15.5 3.00833 15.3583 2.64167 15.125 2.35ZM8 5.91667L12.5833 10.5H9.66667V12.1667H6.33333V10.5H3.41667L8 5.91667ZM2.26667 2.16667L2.95 1.33333H12.95L13.725 2.16667H2.26667Z" fill="#F5CDA8"/>
                    </svg>
                </p>
            </template>
        </div>
    </div>
</template>

<script>
import InfoBlock from '../../../common/info-block';

export default {
    mixins: [
        InfoBlock
    ],
    props: {
        messageFor: {
            type: String,
            default: '',
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.info-block {
    padding: 22px;
    display: flex;
    border: 1px solid #E2E2E2;
    border-radius: 5px;
    margin-bottom: 30px;
    color: #696969;

    &:hover {
        color: #212121;

        .info-block__icon {
            color: #2A5885;
        }
    }

    &__icon {
        margin-right: 8px;
        color: #C9D5E0;
    }

    &__message,
    &__message_inline {
        margin-bottom: 5px;
    }

    &__message_inline {
        display: inline-block;
    }
}
</style>