<template>
    <div class="tooltip-icon">
        <img src="../../../../../../public/img/tooltip-icon.svg" alt="">
        <div v-show="description !== ''" class="tooltip-description">
            {{ description }}
        </div>
    </div>
</template>

<script>
export default {

    props: {
        description: {
            type: String,
            default: '',
            required: false
        }
    }
}
</script>

<style lang="scss" scoped>
.tooltip-icon {
    display: flex;
    justify-content: center;
    position: absolute;
    right: -20px;
    top: 5px;
    cursor: pointer;

    &:hover .tooltip-description {
        visibility: visible;
    }

    .tooltip-description {
        visibility: hidden;
        width: max-content;
        max-width: 305px;
        position: absolute;
        top: 20px;
        padding: 6px;
        font-size: 14px;
        line-height: 16px;
        color: #212121;
        background-color: #fff;
        border: 1px solid #E5E5E5;
        border-radius: 2px;
        z-index: 1;

        &:before {
            position: absolute;
            content: '';
            width: 0;
            height: 0;
            top: -8px;
            left: calc(50% - 8px);
            border-left: 8px solid transparent;
            border-bottom: 8px solid #E5E5E5;
            border-right: 8px solid transparent;
        }

        &:after {
            position: absolute;
            content: '';
            width: 0;
            height: 0;
            top: -6px;
            left: calc(50% - 7px);
            border-left: 7px solid transparent;
            border-bottom: 7px solid #fff;
            border-right: 7px solid transparent;
        }
    }
}
</style>