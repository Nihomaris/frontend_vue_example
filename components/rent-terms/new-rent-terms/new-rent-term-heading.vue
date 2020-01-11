<template>
    <div class="heading">
        <i v-if="disabled" class="material-icons heading__icon" style="color: #B2B2B2;">cancel</i>
        <i v-else class="material-icons heading__icon" style="color: #479D6C;">check_circle</i>
        <span class="heading__title">{{ heading }}</span>
    </div>
</template>

<script>

export default {
    props: {
        disabled: {
            type: Boolean,
            default: false,
            required: false
        },
        heading: {
            type: String,
            default: '',
            required: true
        }
    } 
}
</script>

<style lang="scss" scoped>
.heading {
    display: flex;
    align-items: center;
    background-color: #EEF6F6;
    color: #212121;
    padding: 20px 45px;

    &__icon {
        font-size: 32px;
        margin-right: 15px;
    }

    &__title {
        font-size: 18px;
        line-height: 21px;
        font-weight: bold;
    }

    @media (max-width: 992px) {
        padding: 20px;
    }
}
</style>