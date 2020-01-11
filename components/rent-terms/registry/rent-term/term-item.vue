<template>
    <div :class="`point point_${infoType}`">
        <div class="point-header">
            <span class="point-heading">
                {{ title }}
                <i :class="['material-icons point-heading-icon', { 'point-heading-icon_no-data': !infoData.length }]">check_circle</i>
            </span> 
            <span class="point-additional">Доп. параметр</span>
        </div>
        <div class="point-content">
            <div class="point-status">
                <i :class="['material-icons point-status-icon', { 'point-status-icon_no-data': !infoData.length }]" >check_circle</i>
            </div>
            <div class="point-data">
                <template v-if="infoData.length">
                    <div v-for="(point, index) in infoData" :key="index" class="point-data-item">
                        <span class="point-data-title">
                            <template v-if="infoType === 'mileage' || infoType === 'age'">
                                от {{ point.min_value }} до {{ point.max_value }} {{ infoType === 'mileage' ? 'км' : 'месяцев'}}
                            </template>
                            <template v-else>
                                {{ point.title }}
                            </template>
                        </span>
                        <p class="point-data-value">
                            {{ point.price }} &#8381;
                        </p>
                    </div>
                </template>
                <template v-else>
                    <div class="point-data__no-data">
                        <span class="point-data__no-data-message">
                            Условия не назначены
                        </span>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import titleMapping from './term-item-mapping.json'

export default {
    props: {
        infoType: {
            type: String,
            default: '',
            required: true
        },

        title: {
            type: String,
            default: '',
            required: true
        },

        infoData: {
            type: Array,
            default: [],
            required: true
        }
    },

    data: () => ({
        titleMapping,
    }),

    beforeMount() {
        if (this.infoType !== 'mileage' && this.infoType !== 'age') {
            this.infoData.forEach(el => {
                el.title = this.titleMapping[el.title]
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.point {
    padding: 20px;
    border: 1px solid #E2E2E2;
    border-radius: 5px;

    &-header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    &-heading {
        display: flex;
        align-items: center;
        font-size: 24px;
        line-height: 28px;
        color: #212121;

        &-icon {
            padding-left: 10px;
            display: none;
            color: #479D6C;

            &_no-data {
                color: #B2B2B2;
            }
        }
    }

    &-additional {
        font-size: 12px;
        line-height: 14px;
        color: #696969;
    }

    &-content {
        display: flex;
        height: calc(100% - 48px);
        min-height: 100px;
    }

    &-status {
        display: flex;
        align-items: center;
        border-right: 1px solid #E2E2E2;
        padding-right: 20px;

        &-icon {
            font-size: 40px;
            color: #479D6C;
            
            &_no-data {
                color: #B2B2B2;
            }
        }
    }

    &-data {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        padding-left: 20px;

        &-item {
            padding-top: 10px;
            margin-right: 20px;
        }

        &-title {
            font-size: 14px;
            line-height: 16px;
            color: #696969;
        }

        &-value {
            font-size: 18px;
            line-height: 21px;
            color: #212121;
        }

        &__no-data {
            display: flex;
            align-items: center;
            font-size: 14px;
            line-height: 14px;
            color: #696969;
        }
    }

    &_mileage,
    &_age,
    &_transmission,
    &_fuel-type {
        margin-bottom: 20px;
        width: calc(50% - 15px);
    }

    &_mileage,
    &_transmission {
        margin-right: 30px;
    }

    &_branding {
        width: 100%;
    }

    @media (max-width: 1800px) {

        &_mileage,
        &_age,
        &_transmission,
        &_fuel-type {
            width: 100%;
        }

        &_mileage,
        &_transmission {
            margin-right: 0;
        }
    }

    @media (max-width: 1370px) {

        &_mileage,
        &_age,
        &_transmission,
        &_fuel-type {
            width: calc(50% - 15px);
        }

        &_mileage,
        &_transmission {
            margin-right: 30px;
        }
    }

    @media (max-width: 992px) {

        &_mileage,
        &_age,
        &_transmission,
        &_fuel-type {
            width: 100%;
        }

        &_mileage,
        &_transmission {
            margin-right: 0;
        }
    }

    @media (max-width: 576px) {
        
        &-header {
            flex-direction: column;
        }

        &-heading {
            font-size: 20px;
            margin-bottom: 5px;

            &-icon {
                display: inline-block;
            }
        }

        &-status {
            display: none;
        }

        &-data {
            padding-left: 0;
        }

        &-content {
            min-height: unset;
            align-items: start;
        }
    }
}
</style>