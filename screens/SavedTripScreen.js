import React, {Component} from 'react'
import {ScrollView, Image, Button, TouchableHighlight} from 'react-native'
import {connect} from 'react-redux'
import {
  Container,
  Header,
  View,
  Card,
  CardItem,
  Text,
  Left,
  Right,
  Body,
  Icon,
  Title,
  Thumbnail,
} from 'native-base'
import {TextButton, RaisedTextButton} from 'react-native-material-buttons'

import allReducers from '../reducer'
// import { createStore } from 'redux';
import action from '../actions'
// import {clearTripInfo} from '../actions/SavedTripAction'

// const store = createStore(allReducers);

class SavedTripScreen extends Component {
  constructor(props) {
    super(props)
    this.onTripClick = this.onTripClick.bind(this)
  }

  componentWillMount() {
    if (this.props.user.user != null) {
      this.props.fetchSavedTrip(this.props.user.user.uid)
      this.props.dispatchClearTripInfo()
    }
  }

  onTripClick = tripID => {
    // Fetch the choosen Trip and put all info into the store.
    this.props.fetchChoosenTrip(String(tripID))
  }

  addNewTrip = () => {
    this.props.dispatchClearTripInfo()
    this.props.navigation.navigate('Home')
  }

  render() {
    if (Object.keys(this.props.auth.user).length !== 0) {
      return (
        <View style={{flex: 1}}>
          <Header>
            <Left>
              <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />
            </Left>
            <Body>
              <Title> My Trips </Title>
            </Body>
            <Right>
              <Icon name="add" onPress={this.addNewTrip} style={{marginRight: 20}} />
            </Right>
          </Header>
          <Container>
            <ScrollView>
              {this.props.savedTrips.map(item => (
                <Card style={{elevation: 3}} key={item.tripID}>
                  <CardItem>
                    <Left>
                      <Body>
                        <Text>{item.tripName}</Text>
                        <Text>
                          {item.totalDay
                            .toString()
                            .concat(' days   ')
                            .concat(
                              item.startDay
                                .substring(0, 10)
                                .concat(' to ')
                                .concat(item.endDay.substring(0, 10))
                            )}
                        </Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem cardBody>
                    <TouchableHighlight onPress={() => this.onTripClick(item.tripID)}>
                      <Image
                        style={{height: 200, width: 700, resizeMode: 'cover', flex: 1}}
                        source={{
                          uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${
                            item.destinationImage
                          }&key=AIzaSyD7Oa99Y264n7KesaO7LWB-OGmSUntkPHI`,
                        }}
                      />
                    </TouchableHighlight>
                  </CardItem>
                  <CardItem>
                    <Icon name="heart" style={{color: '#ED4A6A'}} />
                    <Text>{item.destination}</Text>
                    {/* <Button onPress={() => this.ignoreTrip(item.tripID)} */}
                    <Button
                      onPress={() =>
                        this.props.removeSavedTrip(item.tripID, this.props.user.user.uid)
                      }
                      title="Delete"
                      color="#841584"
                    />
                  </CardItem>
                </Card>
              ))}
            </ScrollView>
          </Container>
        </View>
      )
    }

    return (
      <View>
        <Header>
          <Left>
            <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />
          </Left>
          <Body>
            <Title> My Trips </Title>
          </Body>
          <Right>
            <Icon name="add" onPress={this.addNewTrip} style={{marginRight: 20}} />
          </Right>
        </Header>
        <View>
          <Image source={require('../assets/fatty.png')} style={{width: '100%'}} />
        </View>
        <View>
          <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center', margin: 20}}>
            Uh oh! Please sign in to see your saved trips!
          </Text>
          <RaisedTextButton
            color="#2196f3"
            title="Sign in"
            onPress={() => this.props.navigation.navigate('SignIn')}
          />
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchSavedTrip: uid => dispatch(action.SavedTripAction.fetchSavedTrip(uid)),
  fetchChoosenTrip: tripID => dispatch(action.SavedTripAction.fetchChoosenTrip(tripID)),
  removeSavedTrip: (tripID, uid) => {
    dispatch(action.SavedTripAction.removeSavedTrip(tripID)),
      dispatch(action.SavedTripAction.fetchSavedTrip(uid))
  },
  dispatchClearTripInfo: () => dispatch(action.SavedTripAction.clearTripInfo()),
  // setDate: (dayInfo) => dispatch(action.DayPickerAction.setDate(dayInfo)),
  // saveDayPOI: (dayPOIInput) => dispatch(action.DayDetailAction.saveDayPOI(dayPOIInput))
})

const mapStateToProps = state => ({
  savedTrips: state.savedTrips.savedTrips,
  currentTrip: state.savedTrips.currentTrip,
  fetching: state.savedTrips.fetching,
  user: state.auth.user,
  auth: state.auth,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedTripScreen)
