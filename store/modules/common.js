export default {
	state: {
		JWT: ''
	},
	actions: {
		fetchJwt({commit, dispatch}, next) {
			axios.get('/jwt').then(res => {  
				if(res.data.jwt) {
					commit('setJwt', res.data.jwt);

					/*
						Временное решение для обновления тикета пока не реализуем middleware
						Обновляем JWT каждые 29мин
					*/
					setTimeout(() => dispatch('fetchJwt'), 1000*60*29)
					dispatch(next);
				}
			}).catch(err => {
			    // showNotify('Ошибка', 'при попытке получения токена', 'error');
			    console.warn('Ошибка при попытке получения токена', err)
			})
		},
	},
	mutations: {
		setJwt(state, jwt) {
			state.JWT = jwt
		},
	},

	getters: {
		currentPage() {
			return window.location.pathname.toString().split('/')[1];
		}
	}
}