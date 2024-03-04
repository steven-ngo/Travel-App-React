import constant from '../contants'

const selectDestination = destination => ({
  type: constant.HOME.SELECT_DESTINATION,
  payload: destination,
})

const requestSuggestionDestination = (input) => {
    return {
        type: constant.HOME.REQUEST_SUGGESTION_DESTINATION,
        payload: input
    }
}

const receiveSuggestionDestination = (result) => {
    return {
        type: constant.HOME.RECEIVE_SUGGESTION_DESTINATION,
        payload: result
    }
}
const setTripName = (name) => {
    return {
        type: constant.HOME.SELECT_TRIP_NAME,
        payload: name
    }
}

const fetchSuggestionDestination = (input) => {
    // APItoFectch = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + input + '&inputtype=textquery&key=AIzaSyD7Oa99Y264n7KesaO7LWB-OGmSUntkPHI'
    APItoFectch = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+input+'&sensor=false&types=(regions)&key=AIzaSyD7Oa99Y264n7KesaO7LWB-OGmSUntkPHI'
    return (dispatch, input) => {
        dispatch(requestSuggestionDestination(input));
        return fetch(APItoFectch, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                result = responseJson.predictions
                // console.log(result)
                dispatch(receiveSuggestionDestination(result))
            })
            .catch((error) => {
                // console.error(error);
            });
    }
}


const requestDestination = (input) => {
    return {
        type: constant.HOME.REQUEST_DESTINATION,
        payload: input
    }
}

const receiveDestination = (result) => {
    return {
        type: constant.HOME.RECEIVE_DESTINATION,
        payload: result
    }
}

const fetchDestination = (place) => {
    // APItoFectch = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + input + '&inputtype=textquery&key=AIzaSyD7Oa99Y264n7KesaO7LWB-OGmSUntkPHI'
    // APItoFectch = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+input+'&sensor=false&types=(regions)&key=AIzaSyD7Oa99Y264n7KesaO7LWB-OGmSUntkPHI'
    APItoFectch = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + place.place_id +'&key=AIzaSyD7Oa99Y264n7KesaO7LWB-OGmSUntkPHI'
    console.log(APItoFectch)
    return (dispatch, place) => {
        dispatch(requestDestination(place));
        return fetch(APItoFectch, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson.result)
                dispatch(receiveDestination(responseJson.result))
                dispatch({
                    type: constant.SAVETRIP.SET_FETCHING,
                    payload: true
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }
}


export default { selectDestination, requestSuggestionDestination, receiveSuggestionDestination, fetchSuggestionDestination, fetchDestination, receiveDestination, requestDestination, setTripName }
