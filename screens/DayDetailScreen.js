import React, {Component} from 'react'
import {View, Text, StyleSheet, ScrollView, Alert, Platform, Picker} from 'react-native'
import {
  Header,
  Left,
  Right,
  Icon,
  Tab,
  Tabs,
  ScrollableTab,
  Button,
  ActionSheet,
  Content,
  ListItem,
  Body,
  Title,
  Thumbnail,
  TextInput,
  FlatList,
} from 'native-base'
import {connect} from 'react-redux'
import {Dropdown} from 'react-native-material-dropdown'

import action from '../actions'

// var BUTTONS = ["Day 1", "Day 2", "Day 3", "Day 4", "Cancel"];
const REMOVE = ['Remove']
// var CANCEL_INDEX = 4;
// const days = [1, 2, 3, 4, 5, 6]

class DayDetailScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      days: this.props.savedDayPOI,
      tags: 'restaurant',
      buttons: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Cancel'],
      tagSelectedVal: '',
    }
    this.fetchPlaces = this.fetchPlaces.bind(this)
    this.addPOI = this.addPOI.bind(this)
    this.removePOI = this.removePOI.bind(this)
    this.savesTrip = this.savesTrip.bind(this)
    this.onSelectDropDown = this.onSelectDropDown.bind(this)
  }

  onSelectDropDown = selected => {
    const tags = selected
    this.setState({tags})
    this.fetchPlaces()
  }

  savesTrip = () => {
    // console.log("USER:")
    // console.log(this.props.user.user)
    if (this.props.user.user != null) {
      if (this.props.Destination.name == null) {
        this.props.navigation.navigate('Destination')
      } else if (this.props.dayInfo.start == '') {
        this.props.navigation.navigate('DayPicker')
      } else {
        // Check for the flag here and make an update instead of insert new
        if (this.props.editting) {
          // We are editing the trip then just need to make a put request
          // Create the list of poiID
          // tupple to insert
          tuple = []
          for (saveDayPOIs of this.props.savedDayPOI) {
            for (poi of saveDayPOIs.list) {
              tuple.push({
                poiID: poi.place_id,
                name: poi.name,
                day: saveDayPOIs.day,
                userID: this.props.user.user.uid,
                // this tripID should get from the store
                tripID: this.props.currentTrip[0].tripID,
              })
            }
          }
          daydetail = {
            tupleList: tuple,
          }
          // Check for the flag here and make an update instead of insert new
          fetch('http://ec2-52-15-252-121.us-east-2.compute.amazonaws.com:3000/daydetail/', {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(daydetail),
          }).then(response => {
            // Alert.alert(
            //     "Successful",
            //     "Your trip has been saved",
            //     [
            //         {
            //             text: "OK",
            //             onPress: () => this.props.navigation.navigate("Saved Trip")
            //         }
            //     ],
            //     { cancelable: false }
            // );
          })
          this.props.navigation.navigate('Saved Trip')
        } else {
          const tripID = Math.floor(Math.random() * 1000000)

          // Create the list of poiID
          // tupple to insert
          tuple = []
          for (saveDayPOIs of this.props.savedDayPOI) {
            for (poi of saveDayPOIs.list) {
              tuple.push({
                poiID: poi.place_id,
                name: poi.name,
                day: saveDayPOIs.day,
                userID: this.props.user.user.uid,
                tripID,
              })
            }
          }

          daydetail = {
            tupleList: tuple,
          }

          fetch('http://ec2-52-15-252-121.us-east-2.compute.amazonaws.com:3000/daydetail/', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(daydetail),
          }).then(response => {
            // console.log(response)
          })

          // // Form Object then save
          tripObject = {
            tripName: this.props.tripName,
            destination: this.props.Destination.name,
            destinationImage: this.props.Destination.photos[0].photo_reference,
            destinationID: this.props.Destination.place_id,
            totalDay: this.props.dayInfo.total,
            tripID,
            userID: this.props.user.user.uid,
            startDay: this.props.dayInfo.start,
            endDay: this.props.dayInfo.end,
          }

          // Check for the flag here and make an update instead of insert new
          fetch('http://ec2-52-15-252-121.us-east-2.compute.amazonaws.com:3000/trip/savetrip', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(tripObject),
          }).then(response => {
            Alert.alert(
              'Successful',
              'Your trip has been saved',
              [
                {
                  text: 'OK',
                  onPress: () => this.props.navigation.navigate('Saved Trip'),
                },
              ],
              {cancelable: false}
            )
            // console.log(response)
          })
        }
      }
    } else {
      this.props.navigation.navigate('SignIn')
    }
  }

  removePOI = (buttonIndex, poi, day) => {
    // console.log(poi.name)
    // console.log(buttonIndex)
    days = this.props.savedDayPOI
    for (thing of days) {
      if (thing.day == day) {
        const newList = []
        for (let i = 0; i < thing.list.length; i++) {
          // console.log(thing.list.length)
          checkResult = thing.list[i]
          // console.log(checkResult.name)
          if (checkResult.name != poi.name) {
            // newList = thing.list
            newList.push(checkResult)
          }
        }
        thing.list = newList
      }
    }

    this.setState({days})
    this.props.saveDayPOI(days)
  }

  addPOI = (buttonIndex, poi) => {
    days = this.props.savedDayPOI
    for (thing of days) {
      // console.log(thing.day)
      // console.log(buttonIndex + 1)
      if (thing.day == buttonIndex + 1) {
        thing.list.push(poi)
        // console.log(thing)
        console.log(poi)
      }
    }

    // select = currentDay[buttonIndex]
    // select.push(poi)
    // day = [...currentDay.slice(0, buttonIndex - 1), select, ...currentDay.slice(buttonIndex + 1, currentDay.length-1) ]
    // console.log(days)
    this.setState({days})
    this.props.saveDayPOI(days)
  }

  fetchPlaces = () => {
    this.props.fetchSuggestionPOI(this.state.tags, this.props.Destination.geometry.location)
  }

  componentWillMount() {
    const days = this.props.savedDayPOI
    this.setState(days)
    if (this.props.Destination.name) {
      this.fetchPlaces()
    }
  }

  componentDidMount() {
    // let totalDays = 10
    const totalDays = this.props.dayInfo.total
    days = []
    for (let count = 1; count <= totalDays; count++) {
      days.push({day: count, list: []})
    }
    // console.log(day)
    // this.setState({day})

    buttons = []
    for (let count = 1; count <= totalDays; count++) {
      // buttons.push({ buttons: "Day " + count})
      buttonday = String(`Day ${String(count)}`)
      buttons.push(buttonday)
    }
    buttons.push('Cancel')
    this.setState({days, buttons})
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.Destination) {
      if (this.props.Destination.name) {
        this.fetchPlaces()
      }
    } else if (prevProps.Destination.name !== this.props.Destination.name) {
      this.fetchPlaces()
    }
  }

  render() {
    const data = [
      {value: 'airport'},
      {value: 'amusement_park'},
      {value: 'aquarium'},
      {value: 'art_gallery'},
      {value: 'atm'},
      {value: 'bakery'},
      {value: 'bank'},
      {value: 'bar'},
      {value: 'beauty_salon'},
      {value: 'book_store'},
      {value: 'bowling_alley'},
      {value: 'bus_station'},
      {value: 'cafe'},
      {value: 'campground'},
      {value: 'car_rental'},
      {value: 'casino'},
      {value: 'church'},
      {value: 'city_hall'},
      {value: 'courthouse'},
      {value: 'department_store'},
      {value: 'embassy'},
      {value: 'furniture_store'},
      {value: 'gas_station'},
      {value: 'gym'},
      {value: 'hair_care'},
      {value: 'hindu_temple'},
      {value: 'insurance_agency'},
      {value: 'jewelry_store'},
      {value: 'library'},
      {value: 'lodging'},
      {value: 'movie_theater'},
      {value: 'museum'},
      {value: 'night_club'},
      {value: 'park'},
      {value: 'physiotherapist'},
      {value: 'restaurant'},
      {value: 'rv_park'},
      {value: 'school'},
      {value: 'shopping_mall'},
      {value: 'spa'},
      {value: 'stadium'},
      {value: 'subway_station'},
      {value: 'supermarket'},
      {value: 'synagogue'},
      {value: 'taxi_stand'},
      {value: 'train_station'},
      {value: 'transit_station'},
      {value: 'travel_agency'},
      {value: 'zoo'},
    ]

    const renderAll = this.props.fetchedPOI.map(b => (
      <ListItem key={`${b.id}1`}>
        <Button
          onPress={() =>
            ActionSheet.show(
              {
                options: this.state.buttons,
                cancelButtonIndex: this.state.buttons.length,
                title: 'Select Day to be added',
              },
              buttonIndex => {
                // this.setState({ clicked: this.state.buttons[buttonIndex] })
                this.addPOI(buttonIndex, b)
                // console.log(buttonIndex)
                // console.log(b)
              }
            )
          }
        >
          <Icon name="add" />
        </Button>
        <Text style={{textAlign: 'center', margin: 10}}>{b.name}</Text>
      </ListItem>
    ))
    if (this.props.savedDayPOI.length == 0) {
      const totalDays = this.props.dayInfo.total
      for (let count = 1; count <= totalDays; count++) {
        this.props.savedDayPOI.push({day: count, list: []})
      }
    }
    // console.log(this.props.savedDayPOI);
    const renderedTabs = this.props.savedDayPOI.map((b, i) => {
      const renderedPOI = b.list.map(a => (
        <ListItem key={a.place_id}>
          <Button
            onPress={() =>
              ActionSheet.show(
                {
                  options: REMOVE,
                  title: 'Remove POI',
                },
                buttonIndex => {
                  // this.setState({ clicked: this.state.buttons[buttonIndex] })
                  this.removePOI(buttonIndex, a, b.day)
                }
              )
            }
          >
            <Icon name="remove" />
          </Button>
          <Text style={{textAlign: 'center', marginLeft: 10}}>{a.name}</Text>
        </ListItem>
      ))
      return (
        <Tab heading={`Day ${String(i + 1)}`} key={i}>
          <ScrollView>
            {/* <Text style={{textAlign: "center"}}>DAY {i+1}</Text> */}
            {renderedPOI}
          </ScrollView>
        </Tab>
      )
    })
    return (
      <View style={{flex: 1}}>
        <Header>
          <Left>
            <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />
          </Left>
          <Body style={{}}>
            <Title> Planner </Title>
          </Body>
          <Right>
            <Button
              iconRight
              light
              onPress={() => {
                this.savesTrip()
              }}
            >
              <Text style={{marginRight: 10}}>Save</Text>
            </Button>
          </Right>
        </Header>

        {/* render day tab  */}
        <Tabs renderTabBar={() => <ScrollableTab />}>{renderedTabs}</Tabs>

        {/* render All POI  */}
        <Tabs renderTabBar={() => <ScrollableTab />}>
          <Tab heading="ALL">
            {
              <Dropdown
                label="Filter"
                data={data}
                value="restaurant"
                onChangeText={(value, index, data) => this.onSelectDropDown(value)}
              />
            }
            <ScrollView>{renderAll}</ScrollView>
          </Tab>
        </Tabs>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  fetchedPOI: state.DayDetailReducer.fetchedPOI,
  Destination: state.home.Destination,
  tripName: state.home.tripName,
  dayInfo: state.DayPickerReducer.dayInfo,
  user: state.auth.user,
  editting: state.savedTrips.editting,
  currentTrip: state.savedTrips.currentTrip,
  savedDayPOI: state.DayDetailReducer.dayPOI,
})

const mapDispatchToProps = dispatch => ({
  fetchSuggestionPOI: (tags, location) =>
    dispatch(action.DayDetailAction.fetchSuggestionPOI(tags, location)),
  saveDayPOI: dayPOIInput => dispatch(action.DayDetailAction.saveDayPOI(dayPOIInput)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DayDetailScreen)

// export default DayDetailScreen
