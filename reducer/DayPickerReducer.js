import constant from '../contants'

const initialState = {
  dayInfo: {
    start: '',
    end: '',
    total: 0,
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.DAYPICKER.SET_DATE:
      return {
        ...state,
        dayInfo: action.payload,
      }
    case 'RESET':
      return {
        ...state,
        dayInfo: {
          start: '',
          end: '',
          total: 0,
        },
      }
    case 'RESET_ONE':
      return {
        ...state,
        dayInfo: {
          start: '',
          end: '',
          total: 0,
        },
      }

    default:
      return state
  }
}
