import constant from '../contants'

const initialState = {
  savedTrips: [],
  currentTrip: {},
  editting: false,
  fetching: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.SAVETRIP.FETCH_SAVED_TRIP:
      return {
        ...state,
        savedTrips: action.payload,
      }
    case constant.SAVETRIP.FETCH_CHOSEN_TRIP:
      return {
        ...state,
        editting: true,
        currentTrip: action.payload,
      }
    case constant.SAVETRIP.SET_FETCHING:
      return {
        ...state,
        fetching: action.payload,
      }

    case 'RESET':
      return {
        ...state,
        savedTrips: [],
        currentTrip: {},
        editting: false,
        fetching: false,
      }

    default:
      return state
  }
}
