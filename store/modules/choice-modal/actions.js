const changeModalStatus = ({ commit }, status = false) => commit('CHANGE_STATUS', status)

export {
    changeModalStatus
}