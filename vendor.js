window.Vue = require('vue');
window.axios = require('axios');


window.sweetalert = require('sweetalert');



window.$ = window.jQuery = require('jquery');
require('bootstrap');
window.moment = require('moment');

moment.locale('ru');
require('eonasdan-bootstrap-' +
    'datetimepicker');
window.chosen = require('chosen-js');
window.autosize = require('autosize');
window.selectize = require('selectize');
window.Inputmask = require('inputmask');
window.tinymce = require('tinymce');
window.chartist = require('chartist');
window.croppie = require('croppie');

// window.vue-underscore = require('vue-underscore');
require('tinymce/themes/modern/theme');
function tbsDatemainpicker(options, format, __this) {
    var template = {
        locale: 'ru',
        format: format,
        keepOpen: false,
        allowInputToggle: true,
    };
    if (options) {
        options = Object.assign(options, template);
    } else {
        options = template;
    }
    __this.datetimepicker(options);
    return __this;
}

jQuery.fn.tbsDatetimepicker = function (options) {
    return tbsDatemainpicker(options, 'DD.MM.YYYY HH:mm', this);
};

jQuery.fn.tbsDatepicker = function (options) {
    return tbsDatemainpicker(options, 'DD.MM.YYYY', this);
};

jQuery.fn.setTbsDate = function (date) {
    if (typeof date === 'undefined') {
        date = new Date();
    }
    if (this.length > 0) {
        this.data("DateTimePicker").date(date);
    }
    return this;
};