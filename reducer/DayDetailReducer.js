import constant from '../contants'

const initialState = {
  fetching: false,
  fetchedPOI: [{name: ''}],
  dayPOI: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.DAYDETAIL.REQUEST_POI:
      return {
        ...state,
        fetching: true,
      }
    case constant.DAYDETAIL.RECEIVE_POI:
      return {
        ...state,
        fetching: false,
        fetchedPOI: action.payload,
      }
    case constant.DAYDETAIL.SAVEDAY_POI:
      return {
        ...state,
        dayPOI: action.payload,
      }
    case 'RESET':
      return {
        ...state,
        fetching: false,
        fetchedPOI: [{name: ''}],
        dayPOI: [],
      }

    case 'RESET_ONE':
      return {
        ...state,
        fetching: false,
        fetchedPOI: [{name: ''}],
        dayPOI: [],
      }

    default:
      return state
  }
}
