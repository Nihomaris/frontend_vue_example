export default {

    state: {
        rentTermSidebarStatus: false,
        newRentTermSidebarStatus: false
    },

    mutations: {
        changeRentTermSidebarStatus(state, status) {
            state.rentTermSidebarStatus = status
        },

        changeNewRentTermSidebarStatus(state, status) {
            state.newRentTermSidebarStatus = status
        }
    },

    actions: {
        toggleRentTermSidebarStatus({ commit }, status = false) {
            commit('changeRentTermSidebarStatus', status)
        },

        toggleNewRentTermSidebarStatus({ commit }, status = false) {
            commit('changeNewRentTermSidebarStatus', status)
        }
    },

    getters: {
        isRentTermSidebarVisible: state => state.rentTermSidebarStatus,
        isNewRentTermSidebarVisible: state => state.newRentTermSidebarStatus
    }
}