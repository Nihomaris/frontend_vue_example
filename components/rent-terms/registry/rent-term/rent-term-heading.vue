<template>
    <div class="heading">
        <span class="heading__main-heading">
            {{ heading }}
        </span>
        <div class="heading__info">
            <div class="heading__author">
                <span class="heading__author-title">
                    Автор
                </span>
                <span class="heading__author-name">
                    {{ author }}
                </span>
            </div>
            <div class="heading__date">
                <span class="heading__date-title">
                    Дата создания
                </span>
                <span class="heading__date-value">
                    {{ date }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>

export default {

    props: {
        author: {
            type: String,
            default: '',
            required: true
        },
        date: {
            type: String,
            default: '',
            required: true
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
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    background-color: #EEF6F6;
    font-family: 'Roboto';
    padding: 20px 45px;

    &__info {
        display: flex;
        flex-wrap: wrap;
    }

    &__main-heading {
        padding-right: 20px;
        font-size: 18px;
        line-height: 21px;
        font-weight: bold;
    }

    &__author {
        margin-right: 40px;
    }

    &__author-title,
    &__date-title {
        text-align: right;
        display: block;
        font-size: 12px;
        line-height: 14px;
        color: #696969;
    }

    &__author-name,
    &__date-value {
        font-size: 16px;
        line-height: 19px;
        color: #212121;
    }

    @media (max-width: 992px) {
        padding: 20px;
    }

    @media (max-width: 768px) {

        &__main-heading,
        &__info {
            width: 100%;
        }

        &__main-heading {
            padding-right: 0;
            margin-bottom: 10px;
        }

        &__author {
            margin-bottom: 10px;
        }

        &__author,
        &__date {

            &-title {
                text-align: left;
            }
        }
    }
}
</style>