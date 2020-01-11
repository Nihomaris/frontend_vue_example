export default class InitState {
    constructor() {
        /* Navigation */
        this.navigationState = {
            currentPage: 'rent-terms',
            navigation: {
                rentTerms: {
                    route: 'rent-terms',
                    isActive: true,
                },
                newRentTerm: {
                    route: 'new-rent-term',
                    isActive: false,
                },
            },
            infoblock: {
                'rent-terms': {
                    title: 'Условия аренды',
                    infoblocks: [
                        { label: 'ТС на условиях', value: ''}
                    ],
                    links: [
                        { name: 'Собственные ТС', href: '/dict-car' }, 
                        { name: 'Условия работы', href: '/work-condition' }, 
                    ],
                    buttons: []
                },
                'new-rent-term': {
                    title: 'Новое условие аренды',
                    infoblocks: [],
                    links: [
                        { name: 'Условия аренды', href: '/rent-terms' }
                    ],
                    buttons: []
                },
            },
        }


        /* Registry */
        this.registryState = {
            rentSortType: 'relevant',
            currentPage: 'registry',
            registryData: [],
            carRentTerms: {},
            oneRentTerm: {},
            isOneTermModalVisible: false,
            warningModal: {
                isModalVisible: false,
                errorReasons: {}
            }
        }

            
        /* New rent term */
        this.newRentTermState = {
            isLoading: false,

            needToShowErrorNotification: false,

            base: {
                name: '',
                price: '',
            },
            
            ages: [
                {
                    "min_value": '',
                    "max_value": '',
                    "price": '',
                }
            ],
            
            mileages: [
                {
                    "min_value": '',
                    "max_value": '',
                    "price": '',
                },
            ],
            
            transmissions: [
                {
                    "title":"Автоматическая",
                    "price": '',
                    "name": 'Автоматическая',
                    "checked": false
                },
                {
                    "title":"Механическая",
                    "price": '',
                    "name": 'Механическая',
                    "checked": false
                },
                {
                    "title":"Вариатор",
                    "price": '',
                    "name": 'Вариатор',
                    "checked": false
                }
            ],
            
            fuels: [
                {
                    "title":"Бензиновый",
                    "price": '',
                    "name": 'Бензиновый',
                    "checked": false
                },
                {
                    "title":"Газовый",
                    "price": '',
                    "name": 'Газовый',
                    "checked": false
                },
                {
                    "title":"Дизельный",
                    "price": '',
                    "name": 'Дизельный',
                    "checked": false
                },
                {
                    "title":"Гибрид",
                    "price": '',
                    "name": 'Гибрид',
                    "checked": false
                },
                {
                    "title":"Электрический",
                    "price": '',
                    "name": 'Электрический',
                    "checked": false
                }
            ],
            
            brands: [
                {
                    "title":"Yandex",
                    "price": '',
                    "name": 'yandex',
                    "checked": false
                },
                {
                    "title":"GetTaxi",
                    "price": '',
                    "name": 'gettaxi',
                    "checked": false
                },
                {
                    "title":"Ситимобил",
                    "price": '',
                    "name": 'cityMobil',
                    "checked": false
                },
                {
                    "title":"Uber",
                    "price": '',
                    "name": 'uber',
                    "checked": false
                },
                {
                    "title":"Uber (без бокса)",
                    "price": '',
                    "name": 'uberWithoutBoxing',
                    "checked": false
                }
            ],
            
            errors: null,
            
            disabled: {
                ages: false,
                mileages: false,
                transmissions: false,
                fuels: false,
                brands: false,
            },    
        }

    }
}

