import constant from '../contants'

const setDate = (dayInfo) => {
    return {
        type: constant.DAYPICKER.SET_DATE,
        payload: dayInfo
    }
}

export default { setDate }
