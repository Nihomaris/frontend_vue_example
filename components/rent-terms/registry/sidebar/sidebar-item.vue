<template>
    <div class="terms-item" @click.self="moveTo">
        <div class="terms-item__title" @click="moveTo">
            {{ term.name }}
        </div>
        <!-- <div class="terms-item__cars">
            <div class="terms-item__cars-counter">
                {{ term.count }}
            </div>
            <div class="terms-item__cars-icon">
                <i class="material-icons" title="Количество ТС на  выбранном условии">directions_car</i>
            </div>
        </div> -->
        <div class="terms-item__buttons-wrapper"> <!-- TODO: Remove -->
            <div class="terms-item__copy">
                <i class="material-icons" @click="duplicateTerm" title="дублировать">file_copy</i>
            </div>
            <div class="terms-item__archive">
                <template v-if="!term.count">
                    <i v-if="activeTab === 'relevant'" @click.once="changeArchivalStatus" class="material-icons" title="архивировать">archive</i>
                    <i v-else @click.once="changeArchivalStatus" class="material-icons" title="разархивировать">unarchive</i>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import showNotify from '../../../../modules/notification';

export default {

    props: {
        term: {
            type: Object,
            default: {},
            required: true
        },
        activeTab: {
            type: String,
            default: '',
            required: true
        }
    },

    methods: {
        ...mapMutations(['setDublicateNewRentTermData','setNewRentTermDisplay']),

        moveTo() {
            let itemIndex = +this.$el.getAttribute('data-sidebar-index')

            document.querySelector(`[data-term-index="${itemIndex}"`).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        },

        changeArchivalStatus() {
            if (!this.term.isArchived && this.term.count) { // если условие не архивное и при этом есть закрепленные авто
                showNotify('Ошибка', 'За условием закреплены авто', 'error');
            } else {
                this.$store.dispatch('changeArchiveStatus', { rentTermId: this.term.id, archivalStatus: !this.term.isArchived }).then((res) => {
                    if (res === 'success') {
                        showNotify(`Переведено в ${this.term.isArchived ? 'актуальные' : 'архивные'}`, '', 'success');
                    }
                }).catch(err => {
                    showNotify('Ошибка', 'За условием закреплены авто', 'error')
                    this.$store.dispatch('getRegistryData')
                });
            }
        },

        duplicateTerm() {
            this.setNewRentTermDisplay();
            this.setDublicateNewRentTermData(this.term);
        }
    }
}
</script>

<style lang="scss" scoped>

.search-loader {
    position: relative;
    width: 16px;
    right: unset;
    top: unset;
}

.terms-item {
    display: flex;
    justify-content: space-between; // TODO: Remove
    align-items: center;
    padding: 10px 40px 10px 0;
    border-left: 5px solid #fff;
    cursor: pointer;

    &:hover {
        background-color: #FDF1E6;
        border-left: 5px solid #E58325;
    }

    &__title {
        align-items: center;
        font-size: 16px;
        line-height: 19px;
        width: 328px;
        padding-left: 35px;
        margin-right: 30px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
    }

    &__buttons-wrapper { // TODO: Remove
        display: flex;
    }

    &__cars {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 76px;
        margin-right: 30px;
    
        &-counter {
            padding-right: 7px;
        }

        &-icon {
            display: flex;
            align-items: center;
            color: #696969;
            cursor: pointer;
        }
    }

    &__copy {
        display: flex;
        margin-right: 30px;
        color: #EDA866;

        .material-icons {
            cursor: pointer;
        }

        &:hover {
            color: #E58325;
        }
    }

    &__archive {
        width: 20px;
        min-width: 20px;
        display: flex;
        align-items: center;
        color: #EDA866;

        .material-icons {
            cursor: pointer;
        }

        &:hover {
            color: #E58325;
        }
    }

    @media (max-width: 1370px) {
        padding-right: 20px;
        
        &__title {
            font-size: 14px;
            line-height: 16px;
            padding-left: 15px;
        }
    }
}
</style>

<style lang="scss">
@import '../../../../../sass/settings/_mixins.scss';
@import '../../../../../sass/modules/notification.scss';
</style>