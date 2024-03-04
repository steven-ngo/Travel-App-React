import constant from '../contants'

const requestSuggestionPOI = (input) => {
    return {
        type: constant.DAYDETAIL.REQUEST_POI,
        payload: input
    }
}

const saveDayPOI = (input) => {
    return {
        type: constant.DAYDETAIL.SAVEDAY_POI,
        payload: input
    }
}

const receiveSuggestionPOI = (result) => {
    return {
        type: constant.DAYDETAIL.RECEIVE_POI,
        payload: result
    }
}

const fetchSuggestionPOI = (tags, location) => {
    locationText = String(location.lat +','+ location.lng)
    // APItoFectch = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + input + '&inputtype=textquery&key=AIzaSyD7Oa99Y264n7KesaO7LWB-OGmSUntkPHI'
    // https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&key=YOUR_API_KEY
    APItoFectch = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + locationText + '&radius=3000&type=' + tags +'&key=AIzaSyD7Oa99Y264n7KesaO7LWB-OGmSUntkPHI'
    // console.log(APItoFectch)
    return (dispatch, input) => {
        dispatch(requestSuggestionPOI(input));
        return fetch(APItoFectch, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                result = responseJson.results

                // APIResult = []
                // for (thing of result) {
                //     APIResult.push(thing.structured_formatting.main_text)
                // }
                // console.log(result)
                dispatch(receiveSuggestionPOI(result))
            })
            .catch((error) => {
                // console.error(error);
            });
    }
}

export default { requestSuggestionPOI, receiveSuggestionPOI, fetchSuggestionPOI, saveDayPOI }
