const isDriverFinesDataLoaded = state => Object.keys(state.driverFinesData).length

const finesData = state => state.driverFinesData

export {
    isDriverFinesDataLoaded,
    finesData
}