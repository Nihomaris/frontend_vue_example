import InitState from '../../config/initStateRentTerm';

/**
 * Get init state data from config
 */
let rentTermState = new InitState();
let { navigationState, registryState, newRentTermState } = rentTermState;

export default {
	
	state: {
		//////////// NAVIGATION ////////////
		currentPage: navigationState.currentPage,
		navigation: navigationState.navigation,
		infoblock: navigationState.infoblock,

		//////////// RENT TERM ////////////
		isLoading: registryState.isLoading,
		rentSortType: registryState.rentSortType,
        registryData: registryState.registryData,
		carRentTerms: registryState.carRentTerms,
		rentSortType: registryState.rentSortType,
		oneRentTerm: registryState.oneRentTerm,

		//////////// DICT CAR PAGE ////////////
		isOneTermModalVisible: registryState.isOneTermModalVisible,
		warningModal: registryState.warningModal,
		
		//////////// NEW RENT TERM ////////////
		newRentTerm: newRentTermState,
		tempororaryDataStorage: {}
	},

	mutations: {
		
		///////////////////////////// NAVIGATION ////////////////////////////////
		setRentTermsDisplay(state) {
			state.navigation.rentTerms.isActive = true;
			state.navigation.newRentTerm.isActive = false;
			state.currentPage = state.navigation.rentTerms.route;
			state.newRentTerm = new InitState().newRentTermState
		},

		setNewRentTermDisplay(state) {
			state.navigation.newRentTerm.isActive = true;
			state.navigation.rentTerms.isActive = false;
			state.currentPage = state.navigation.newRentTerm.route;
		},

		///////////////////////////// DICT CAR RENT ATTACH ////////////////////////////////
		setCarsOnConditions(state, value) {
			state.infoblock[state.currentPage].infoblocks[0].value = value
		},

		setWarningModalData(state, options) {
            state.warningModal.isModalVisible = options.visibility,
            state.warningModal.errorReasons = options.reasons
        },

        setOneTermModalStatus(state, status) {
            state.isOneTermModalVisible = status
		},

		///////////////////////////// REGISTRY ////////////////////////////////
		setRegistryData(state, data) {
            state.registryData = data;
        },

        setRentSortType(state, type) {
            state.rentSortType = type
        },

        setCarRentTerms(state, terms) {
            state.carRentTerms = terms
		},

		setOneRentTerm(state, oneRentTerm) {
            state.oneRentTerm = oneRentTerm
        },

		setDublicateNewRentTermData(state, data) {
			state.newRentTerm.base.name = '';
			state.newRentTerm.base.price = data.price;
			
			if(data.ages.length > 0) {
				state.newRentTerm.ages = data.ages.map(item => ({ 	
					min_value: item.min_value,  
					max_value: item.max_value,  
					price: item.price,  
				}))
			}
			
			if(data.mileages.length > 0) {
				state.newRentTerm.mileages = data.mileages.map(item => {
					return { 
						min_value: item.min_value,  
						max_value: item.max_value,  
						price: item.price,  
					}
				})
			}
		

			if(data.transmissions.length > 0) {
				let initTransmissionState = new InitState().newRentTermState.transmissions;

				data.transmissions.map(item => {
					const index = initTransmissionState.findIndex(el => el.title.toLocaleLowerCase() === item.title.toLocaleLowerCase());

					initTransmissionState[index] = {
						...initTransmissionState[index],
						title: item.title,
						price: item.price,
						checked: true
					}
				});	
				state.newRentTerm.transmissions = initTransmissionState;
			}

			if(data.fuels.length > 0) {
				let initFuelState = new InitState().newRentTermState.fuels;
				
				data.fuels.map(item => {
					const index = initFuelState.findIndex(el => el.title.toLocaleLowerCase() === item.title.toLocaleLowerCase());

					initFuelState[index] = {
						...initFuelState[index],
						title: item.title,
						price: item.price,
						checked: true
					}
				});	

				state.newRentTerm.fuels = initFuelState;
			}

			if(data.brands.length > 0) {
				let initBrandState = new InitState().newRentTermState.brands;
				
				data.brands.map(item => {
					const index = initBrandState.findIndex(el => el.title.toLocaleLowerCase() === item.title.toLocaleLowerCase());

					initBrandState[index] = {
						...initBrandState[index],
						title: item.title,
						price: item.price,
						checked: true
					}
				});	

				state.newRentTerm.brands = initBrandState;
			}

		},
		
		///////////////////////////// NEW RENT TERM ////////////////////////////////
		setLoadingStatusTrue(state) {
			state.newRentTerm.isLoading = true;
		},

		showErrorNotification(state) {
			state.newRentTerm.needToShowErrorNotification = true;
		},

		hideErrorNotification(state) {
			state.newRentTerm.needToShowErrorNotification = false;
		},

		setLoadingStatusFalse(state) {
			state.newRentTerm.isLoading = false;
		},

		turnOnBlock(state, name) {
            state.newRentTerm.disabled[name] = false
        },

        turnOffBlock(state, name) {
            state.newRentTerm.disabled[name] = true
		},
		
		setTemporaryDataStorage(state, data) {
			state.tempororaryDataStorage = data;
		},

		// Base-term
		updateName(state, value) {
			state.newRentTerm.base.name = value;
		},

		updatePrice(state, value) {
			state.newRentTerm.base.price = value;
		},

		// Ages
		updateAgeMinValue(state, { index, value }) {
			state.newRentTerm.ages[index].min_value = value;
		},

		updateAgeMaxValue(state, { index, value }) {
			state.newRentTerm.ages[index].max_value = value;
		},

		updateAgePrice(state, { index, value }) {
			state.newRentTerm.ages[index].price = value;
		},

		createNewAgePart(state) {
			if(!state.newRentTerm.disabled.ages) { 
				return state.newRentTerm.ages.push({
					"min_value": '',
					"max_value": '',
					"price": '',
				})
			}
		},

		removeAgePart(state, index) {
			return state.newRentTerm.ages.splice(index, 1);
		},

		// Mileages
		updateMileageMinValue(state, { index, value }) {
			state.newRentTerm.mileages[index].min_value = value;
		},

		updateMileageMaxValue(state, { index, value }) {
			state.newRentTerm.mileages[index].max_value = value;
		},

		updateMileagePrice(state, { index, value }) {
			state.newRentTerm.mileages[index].price = value;
		},

		createNewMileagePart(state) {
			if(!state.newRentTerm.disabled.mileages) { 
				return state.newRentTerm.mileages.push({
					"min_value": '',
					"max_value": '',
					"price": '',
				})
			}
		},

		removeMileagePart(state, index) {
			state.newRentTerm.mileages.splice(index, 1);
		},

		// Transmissions
		updateTransmissionPrice(state, { index, value }) {
			state.newRentTerm.transmissions[index].price = value;
		},

		toggleTransmissionType(state, { index, value }) {
			state.newRentTerm.transmissions[index].checked = value;
		},

		// fuels
		updateFuelPrice(state, { index, value }) {
			state.newRentTerm.fuels[index].price = value;
		},

		toggleFuelType(state, { index, value }) {
			state.newRentTerm.fuels[index].checked = value;
		},

		// brands
		updateBrandPrice(state, { index, value }) {
			state.newRentTerm.brands[index].price = value;
		},

		toggleBrandType(state, { index, value }) {
			state.newRentTerm.brands[index].checked = value;
		},

		// Errors
		setErrors(state, errors) {

			/**
			 * TODO переделать, чтобы от сервера приходил конкретный порядковый номер или ассоциативный массив
			 * 
			 * Производим маппинг приходящего массива ошибок от сервера.
			 * В связи с тем, что сервер ничего не знает по порядке расположения блоков на клиенте
			 * Приходится с помощью сравнения title определять нормер поля условий КПП, Топлива, Брендов
			 */
			let result = {}; // будущий новый объект с ошибками
			const { transmissions, fuels, brands } = state.tempororaryDataStorage;
			const termNames = ['transmissions', 'fuels', 'brands'];

			// проходимся пришедшему объекту как по массиву
			Object.keys(errors).map(item => {
				
				// имя свойства ошибки разбиваем на составляющие 
				let [ termName, termNum, termField ] = item.split('.');

				// определяем условия которые будет редактировать
				if(termNames.find(item => item === termName)) {
					
					// Определяем порядковый номер инпута
					const tempData = state.tempororaryDataStorage[termName][termNum];
					const initData = state.newRentTerm[termName];
					const position = initData.findIndex(item => item.title === tempData.title)

					// Добавляем отредактированную ошибку
					result[`${termName}.${position}.${termField}`] = errors[item];

				} else {
					result[item] = errors[item];
				}

			})

			state.newRentTerm.errors = result;
		},

		removeErrorByName(state, name) {
			let newErrors = {...state.newRentTerm.errors}
			delete newErrors[name];

			state.newRentTerm.errors = newErrors;
		},
	},

	getters: {

		///////////////////////////// NAVIGATION ////////////////////////////////
		isRentTermsPage(state) {
			return state.navigation.rentTerms.isActive;
		},

		isNewRentTermPage(state) {
			return state.navigation.newRentTerm.isActive;
		},

		infoBlockData(state) {
			return state.infoblock[state.currentPage];
		},

		///////////////////////////// REGISTRY ////////////////////////////////	пкуз
		activeRent: state => {
            return state && state.carRentTerms && state.carRentTerms.activeCarRent &&
                    Object.keys(state.carRentTerms.activeCarRent).length ?
                        state.carRentTerms.activeCarRent :
                        null
        },

        allCarRents: state => {
            return state && state.carRentTerms && state.carRentTerms.allCarRents &&
                    state.carRentTerms.allCarRents.length ? 
                        state.carRentTerms.allCarRents :
                        []
        },

        allRents: (state, getters) => {
            if (state && state.carRentTerms && state.carRentTerms.allRents && 
                state.carRentTerms.allRents.length) {
                // подготовка списка условий для мультиселекта
                let mappedTerms = state.carRentTerms.allRents.map(term => ({ value: `${term.id}`, text: `${term.name}` }))
                // если за ТС закреплено условие, не выводим его в мультиселект
                return getters.activeRent && getters.activeRent.id ?
                        mappedTerms.filter(term => term.value !== `${getters.activeRent.id}`) :
                        mappedTerms
            } else {
                return [{ value: '', text: '' }]
            }
		},

		oneTermForModal: state => {
            return state && state.oneRentTerm && Object.keys(state.oneRentTerm).length ?
                    state.oneRentTerm :
                    []
        },

		totalPrice: state => {
            return state && state.carRentTerms && state.carRentTerms.totalPrice ?
                    state.carRentTerms.totalPrice :
                    null
		},
		
		oldPrice: state => {
			return state && state.carRentTerms && state.carRentTerms.oldPrice || state.carRentTerms.oldPrice === 0 ? 
				state.carRentTerms.oldPrice :
				null
		},

        errorReasons: state => {
            return state && state.warningModal && state.warningModal.errorReasons &&
                    Object.keys(state.warningModal.errorReasons).length ?
                        state.warningModal.errorReasons :
                        {}
        },

        isWarningModalVisible: state => {
            return state && state.warningModal && state.warningModal.isModalVisible ?
                    true :
                    false
        },

        isOneTermModalVisible: state => {
            return state && state.isOneTermModalVisible ?
                    true :
                    false
        },

		///////////////////////////// NEW RENT TERM ////////////////////////////////
		isLoading(state) {
			return state.newRentTerm.isLoading;
		},

		isNeedToShowErrorNotification(state) {
			return state.newRentTerm.needToShowErrorNotification;
		},

		disabled(state) {
			return state.newRentTerm.disabled;
		},

		name(state) {
			return state.newRentTerm.base.name;
		},

		price(state) {
			return state.newRentTerm.base.price;
		},

		ages(state) {
			return state.newRentTerm.ages;
		},

		mileages(state) {
			return state.newRentTerm.mileages;
		},

		transmissions(state) {
			return state.newRentTerm.transmissions;
		},

		fuels(state) {
			return state.newRentTerm.fuels;
		},

		brands(state) {
			return state.newRentTerm.brands;
		},

		errors(state) {
			return state.newRentTerm.errors;
		},

		preparedFormData(state, getters) {
			const { name, price, ages, mileages, transmissions, fuels, brands, disabled } = getters;

			let formData = {};

			formData.name = name;
			formData.price = price;
			!disabled.ages && (formData.ages = ages);
			!disabled.mileages && (formData.mileages = mileages);

			if(!disabled.transmissions) {
				let total = transmissions.filter(item => item.checked)
				formData.transmissions = total.map(item => ({title: item.name, price: item.price}))
			}
			if(!disabled.fuels) {
				let total = fuels.filter(item => item.checked)
				formData.fuels = total.map(item => ({title: item.name, price: item.price}))
			}
			if(!disabled.brands) {
				let total = brands.filter(item => item.checked)
				formData.brands = total.map(item => ({title: item.name, price: item.price}))
			}

			return formData;
		},
    },

    actions: {

		setCarsOnConditions({ commit }, value) {
			commit('setCarsOnConditions', value)
		},

		///////////////////////////// REGISTRY ////////////////////////////////
        getCarRentTerms({ commit }, { carId }) {
            axios.get(`/rent-conditions/show-car/${carId}`).then(res => {
                commit('setCarRentTerms', res.data.data || {})
            }).catch(err => console.error(err))
        },

        changeRentSortType({ commit }, type) {
            commit('setRentSortType', type);
        },  
        
        getRegistryData({ commit }) {
            axios.get('/rent-conditions').then(res => {
                if (res && res.data) {
                    commit('setRegistryData', res.data)
                }
            }).catch(err => console.error(err))
        },

        changeArchiveStatus({ dispatch }, { rentTermId, archivalStatus }) {
            return new Promise((resolve, reject) => {
                axios.put('/rent-conditions/set-is-archived', { rent_car_condition_id: rentTermId, isArchived: archivalStatus }).then(() => {
                    dispatch('getRegistryData').then(res => {
                        resolve('success')
                    }).catch(err => console.error(err));
                }).catch((err) => { reject(err) });
            })
        },

        applyTermToCar({ dispatch }, options) {
            return axios.post('/rent-conditions/set-cars', options)
        },

        getOneRentTerm({ commit }, rentTermId) {
            return new Promise((resolve, reject) => {
                axios.get(`/rent-conditions/${rentTermId}`).then(res => {
                    if (res && res.data && res.status && res.status === 200) {
                        commit('setOneRentTerm', res.data)
                        commit('setOneTermModalStatus', true)
                        resolve()
                    } else {
                        reject();
                    }
                }).catch(err => reject())
            })
        },

        async toggleWarningModal({ commit }, options = { visibility: false, reasons: {} }) {
            await commit('setWarningModalData', options);
        },

        toggleOneTermModal({ commit }, status) {
            commit('setOneTermModalStatus', status)
        },

		allCarRents: state => {
            return state && state.carRentTerms && state.carRentTerms.allCarRents &&
                    state.carRentTerms.allCarRents.length ? 
                        state.carRentTerms.allCarRents :
                        []
        },

        allRents: (state, getters) => {
            if (state && state.carRentTerms && state.carRentTerms.allRents && 
                state.carRentTerms.allRents.length) {
                // подготовка списка условий для мультиселекта
                let mappedTerms = state.carRentTerms.allRents.map(term => ({ value: `${term.id}`, text: `${term.name}` }))
                // если за ТС закреплено условие, не выводим его в мультиселект
                return getters.activeRent && getters.activeRent.id ?
                        mappedTerms.filter(term => term.value !== `${getters.activeRent.id}`) :
                        mappedTerms
            } else {
                return [{ value: '', text: '' }]
            }
        },

        oneTermForModal: state => {
            return state && state.oneRentTerm && Object.keys(state.oneRentTerm).length ?
                    state.oneRentTerm :
                    []
        },

		///////////////////////////// NEW RENT TERM ////////////////////////////////
		createNewRentTerm({ commit, getters }) {
			commit('setLoadingStatusTrue');
			commit('setTemporaryDataStorage', getters.preparedFormData);

			axios.post('/rent-conditions', getters.preparedFormData).then(res => {
				commit('setLoadingStatusFalse');
				commit('setRentTermsDisplay');
			}).catch(err => { 
				if(err.response.status === 422) {

					/**
					 * if validation arror set errors
					 * Если ошибка валидации отображаем ошибки 
					 */
					commit('setLoadingStatusFalse');
					commit('showErrorNotification');
					commit('setErrors', err.response.data.errors);
				} else {
					commit('setLoadingStatusFalse');
					console.error(err.response);
				}
			})
		},
	}
	
}