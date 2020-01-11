import store from './store';
import underscore from 'vue-underscore';
import VueEventBus from 'vue-event-bus';

var VueAutosize = require('vue-autosize');

Vue.use(VueAutosize);
Vue.use(underscore);
Vue.use(VueEventBus);

window.onload = function () {
    if ($('#vue-app').length) {
        const app = new Vue({
            el: '#vue-app'
        });
    }

    if ($('#vue-import').length) {
        const app = new Vue({
            el: '#vue-import'

        });
    }

    if ($('#vue-dashboard').length) {
        const app = new Vue({
            el: '#vue-dashboard'
        });
    }

    if ($('#vue-driver').length) {
        const app = new Vue({
            el: '#vue-driver'
        });
    }

    if ($('#vue-map').length) {
        const app = new Vue({
            el: '#vue-map'
        });
    }

    if ($('#vue-search').length) {
        const app = new Vue({
            el: '#vue-search'
        });
    }

    if ($('#vue-module').length) {
        const app = new Vue({
            el: '#vue-module'
        });
    }

    if ($('.vue-app').length) {
        $('.vue-app').each(function () {
            new Vue({
                el: $(this)[0]
            });
        });
    }

    if ($('.vuex-app').length) {
        $('.vuex-app').each(function () {
            new Vue({
                el: $(this)[0],
                store
            });
        });
    }

    if ($('.vue-modal').length > 0) {
        /* vmModal - глобальная переменная для работы с модальным окном и вью одновременно */
        window.vmModal = new Vue({
            el: '.vue-modal'
        });
    }
};

import * as Vue2Leaflet from 'vue2-leaflet';
Vue.use(Vue2Leaflet);

import datePicker from 'vue-bootstrap-datetimepicker';
Vue.use(datePicker);

// import VCalendar from 'v-calendar';
// Vue.use(VCalendar);

import { DatePicker, VCalendar } from 'v-calendar';
Vue.component('v-date-picker', DatePicker);
Vue.component('v-calendar', VCalendar);

// UI components registration
const requireComponent = require.context('./components/UI', true, /Ui[A-Z]\w+\/index\.(vue|js)$/)
requireComponent.keys().map(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = fileName.replace(/^\.\/(.*)\/index\.\w+$/, '$1')
  Vue.component(componentName, componentConfig.default || componentConfig)
})

// Dashboard
Vue.component('news', require('./components/dashboard/news.vue'));
Vue.component('news-invite', require('./components/dashboard/news-invite.vue'));
Vue.component('announcement', require('./components/dashboard/announcement.vue'));
Vue.component('favorite', require('./components/dashboard/favorite.vue'));
Vue.component('ad', require('./components/dashboard/ad.vue'));
Vue.component('prevention', require('./components/dashboard/prevention.vue'));
Vue.component('transport', require('./components/dashboard/transport.vue'));
Vue.component('drivers', require('./components/dashboard/drivers.vue'));
Vue.component('order-income', require('./components/dashboard/order-income.vue'));
Vue.component('dispatch-map', require('./components/dashboard/dispatch-map.vue'));
Vue.component('happy-new-year', require('./components/dashboard/happy-new-year'));

Vue.component('driver-balance', require('./components/driver-dashboard/driver-balance.vue'));
Vue.component('driver-ad', require('./components/driver-dashboard/driver-ad'));
Vue.component('driver-interview', require('./components/driver-dashboard/driver-interview.vue'));
Vue.component('driver-fine', require('./components/driver-dashboard/driver-fine.vue'));
Vue.component('driver-services', require('./components/driver-dashboard/driver-services.vue'));
Vue.component('driver-deposit', require('./components/driver-dashboard/driver-deposit.vue'));
Vue.component('driver-conditions', require('./components/driver-dashboard/driver-conditions.vue'));
Vue.component('driver-buyout', require('./components/driver-dashboard/driver-buyout.vue'));

Vue.component('driver-oil-map', require('./components/dashboard/driver-oil-map.vue'));
Vue.component('import-vue', require('./components/import-vue.vue'));
Vue.component('driver-pay', require('./components/driver-pay.vue'));
Vue.component('error', require('./components/error.vue'));
Vue.component('success', require('./components/success.vue'));

// VoxImplant
Vue.component('call-list', require('./components/vox/call-list.vue'));
Vue.component('calls', require('./components/vox/calls.vue'));
Vue.component('operators', require('./components/vox/operators.vue'));
Vue.component('phone-app', require('./components/vox/phone-app.vue'));
Vue.component('call-keyboard', require('./components/vox/call-keyboard.vue'));
Vue.component('call-active', require('./components/vox/call-active.vue'));
Vue.component('call-income', require('./components/vox/call-income.vue'));
Vue.component('call-status', require('./components/vox/call-status.vue'));

// Checkperson
Vue.component('check-report', require('./components/check-report/check-report'));
// Guideline
Vue.component('info-panel', require('./components/common/info-panel'));

// Driver
Vue.component('driver-history', require('./components/driver/history.vue'));
Vue.component('resultMassChangeWorkCondition', require('./components/driver/resultMassChangeWorkCondition'));
Vue.component('driver-balance-limit', require('./components/driver/balance-limit'));
Vue.component('resultMassChangeWorkCondition', require('./components/driver/resultMassChangeWorkCondition'));
Vue.component('driver-scheduler', require('./components/driver/scheduler.vue'));
Vue.component('driver-schedule-edit', require('./components/driver/schedule-edit.vue'));
Vue.component('driver-fines-wrapper', require('./components/driver-page/driver-fines-wrapper.vue'));

// Photocontrol
Vue.component('photocontrol-history', require('./components/photocontrol/photocontrol-history.vue'));
Vue.component('photocontrol-create', require('./components/photocontrol/photocontrol-create.vue'));

// Report
Vue.component('report-year', require('./components/report/report-year'));

// Module
Vue.component('news-history', require('./components/news/news-history'));

//Support
Vue.component('driver-map', require('./components/support/driver-map'));

//Schedule
Vue.component('new-schedule', require('./components/schedules/new-schedule'));
Vue.component('edit-schedule', require('./components/schedules/edit-schedule'));
Vue.component('delete-schedule', require('./components/schedules/delete-schedule'));

//Calculator
Vue.component('calculator', require('./components/calculator/calculator.vue'));

//Admin office
Vue.component('office-map', require('./components/office/office-map'));

//Helpdesk tickets
Vue.component('helpdesk', require('./components/helpdesk'));

//Helpdesk notification
Vue.component('helpdesk-notification', require('./components/helpdesk/helpdesk-notification'));

//Search
Vue.component('search', require('./components/search/search'));

//Plan
Vue.component('manage-plan', require('./components/plan/manage-plan.vue'));
Vue.component('condition-plan', require('./components/plan/condition-plan.vue'));

// Guideline
Vue.component('guideline', require('./components/guideline/guideline'));

// Payments for qiwi
Vue.component('qiwi-modal-edit', require('./components/payments-for-qiwi/qiwi-modal-edit'));

// Driver reception
Vue.component('driver-reception', require('./components/driver-reception/driver-reception'));

// cash outflow
Vue.component('cash-outflow', require('./components/cash-outflow/cash-outflow'));


// hints
Vue.component('hints', require('./components/common/hints'));

// Rent terms
Vue.component('rent-terms', require('./components/rent-terms'));
Vue.component('rent-term-card', require('./components/car/rent-term-card.vue'));
Vue.component('rent-term-result-mass-set', require('./components/car/rent-term-result-mass-set'));
Vue.component('rent-term-card-warning-modal', require('./components/car/rent-term-card-warning-modal.vue'));
Vue.component('modal-wrapper', require('./components/car/modal-wrapper.vue'));

// hints
Vue.component('hints', require('./components/common/hints'));

//New features
Vue.component('slider-wrapper', require('./components/common/slider-wrapper.vue'));
