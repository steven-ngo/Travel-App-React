import { NavigationActions } from 'react-navigation'
import constant from '../contants'
import DayPickerAction from './DayPickerAction'
import HomeAction from './HomeAction'
import NavigationService from '../screens/NavigationService';

const fetchSavedTrip = uid => {
  const string = `http://ec2-52-15-252-121.us-east-2.compute.amazonaws.com:3000/trip/savedtrips?userid='${uid}'`
  return (dispatch, uid) => fetch(string)
				.then(res => res.json())
				.then(trips => {
					// console.log(trips)
					dispatch({
						type: constant.SAVETRIP.FETCH_SAVED_TRIP,
						payload: trips
					})
				})
}

const removeSavedTrip = id => {
  where = JSON.stringify({
    tripID: id,
  })
  return (dispatch, getState, id) => fetch("http://ec2-52-15-252-121.us-east-2.compute.amazonaws.com:3000/trip/deletetrip", {
	            method: "POST",
	            headers: {
	              Accept: "application/json",
	              "Content-Type": "application/json"
	            },
				body: where
	          }).then(response => {
				  dispatch(fetchSavedTrip(getState().auth.user.user.uid))
	          })
}

const fetchChoosenTrip = id => {
  const string = `http://ec2-52-15-252-121.us-east-2.compute.amazonaws.com:3000/trip?tripID='${id}'`
  return (dispatch, uid) => fetch(string)
			.then(res => res.json())
			.then(trip => {
				console.log(trip)
				dispatch({
					type: constant.SAVETRIP.FETCH_CHOSEN_TRIP,
					payload: trip
				})
				// fetch tripPOI and put into store
				dispatch(fetchChoosenTripPOI(trip[0].userID, trip[0].tripID, trip[0].totalDay))
				// put the day info into store
				dispatch(DayPickerAction.setDate({
					start: trip[0].startDay,
					end: trip[0].endDay,
					total: trip[0].totalDay
				}))
				dispatch(HomeAction.setTripName(trip[0].tripName))
				dispatch(HomeAction.fetchDestination({ place_id: trip[0].destinationID })).then(() => {
					NavigationService.navigate('DayDetail')
				})
			})
}

const fetchChoosenTripPOI = (userid, tripID, totalDay) => {
  const string = `http://ec2-52-15-252-121.us-east-2.compute.amazonaws.com:3000/daydetail?tripID='${tripID}'&userID='${userid}'&totalDay=${totalDay}`
  return (dispatch, uid) => fetch(string)
			.then(res => res.json())
			.then(dayPOI => {
				console.log(dayPOI)
				dispatch({
					type: constant.DAYDETAIL.SAVEDAY_POI,
					payload: dayPOI
				})
			})
}

export function clearTripInfo() {
  return {type: 'RESET_ONE'}
}

export default {fetchSavedTrip, removeSavedTrip, fetchChoosenTrip, clearTripInfo}
