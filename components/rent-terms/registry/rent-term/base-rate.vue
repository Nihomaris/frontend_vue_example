<template>
    <div class="base-rate">
        <div class="base-rate__title">Базовая ставка аренды</div>
        <div class="base-rate__rate">{{ rate }} &#8381;</div>
    </div>    
</template>

<script>
export default {
    props: {
        rate: {
            type: Number,
            default: null,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.base-rate {
    font-family: 'Roboto';
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #EDF5F0;
    margin-bottom: 20px;

    &__title {
        padding-right: 40px;
        margin-right: 40px;
        border-right: 1px solid #E2E2E2;
        font-size: 24px;
        line-height: 32px;
    }

    &__rate {
        font-size: 24px;
    }

    @media (max-width: 992px) {

        &__title,
        &__rate {
            font-size: 18px;
            line-height: 24px;
        }

        &__title {
            padding-right: 20px;
            margin-right: 20px;
        }
    }

    @media (max-width: 768px) {
        text-align: center;
        
        &__title {
            padding-right: 0;
            border-right: 0;
            margin: 0 0 10px 0;
            width: 100%;
        }
    }

    @media (max-width: 576px) {
        text-align: center;

        &__title,
        &__rate {
            font-size: 15px;
        }
        
        &__title {
            padding-right: 0;
            border-right: 0;
            margin: 0 0 5px 0;
            width: 100%;
        }
    }
}
</style>