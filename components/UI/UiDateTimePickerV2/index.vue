<template>
    <div :class="[ 'date-picker', {'date-picker_active': isActive} ]" :data-picker-id="_uid">
        <date-picker
            class="guideline__input date-time-picker"
            @dp-show="onShow"
            @dp-hide="onHide"
            @dp-change="$emit('hide-validation')"
            @input="forwardDate"
            :placeholder="placeholder"
            v-model="date"
            :config="pickerConfig"
        />
        <i class="material-icons date-picker__icon" @click="openPicker">date_range</i>
    </div>
</template>

<script>
import datePicker from 'vue-bootstrap-datetimepicker';

export default {
    components: {
        datePicker
    },

    props: {
        placeholder: {
            type: String,
            default: '',
            required: false
        },
        isFutureOnly: { // запретить выбор предыдущих дат
            type: Boolean,
            default: false,
            required: false
        },
        isDateOnly: { // использовать только дату
            type: Boolean,
            default: false,
            required: false
        },
        pickedDate: {
            type: String,
            default: '',
            required: false
        }
    },

    data() {
        return {
            date: '',
            isActive: false
        }
    },

    computed: {
        pickerConfig() {
            return {
                format: this.isDateOnly ? 'DD.MM.YYYY' : 'DD.MM.YYYY HH:mm',
                defaultDate: false,
                useCurrent: false,
                showClear: true,
                showClose: true,
                minDate: this.isFutureOnly ? moment().subtract(2, "minutes") : false
            }
        }
    },

    methods: {

        onShow() {
            this.isActive = true
        },

        onHide() {
            this.isActive = false
        },

        forwardDate(changedDate) {
            this.$emit('changed', changedDate);
        },

        openPicker() {
            document.querySelector(`[data-picker-id="${this._uid}"] > input.date-time-picker`).focus()
        }
    },

    beforeMount() {
        this.date = this.pickedDate ? this.pickedDate : ''
    }
}
</script>

<style lang="scss" scoped>
.date-time-picker {
    position: relative;
    height: 24px;
    padding: 4px 6px;
    border: 1px solid #B4B4B4;
    border-radius: 3px;
    box-shadow: none;

    &:hover {
        border: 1px solid #489090;
    }

    &::placeholder {
        color: #C7C7C7;
    }

}

.date-picker_error {

    .date-time-picker {
        border-bottom: 2px solid #D42C27;
    }
}

.form-control:focus {
    border: 1px solid #489090;
    box-shadow: none !important;
}

.date-picker {
    position: relative;

    &__icon {
        font-size: 17px; 
        position: absolute;
        top: 3px;
        right: 3px;

        &:hover {
            cursor: pointer;
            color: #e58325;
        }
    }
}

.date-picker_active {

    .date-picker__icon {
        color: #e58325;
    }
}
</style>