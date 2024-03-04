import React from 'react'
import {Text, View, StyleSheet, Image} from 'react-native'
import {Button, Header, Left, Right, Icon, Body, Title, Thumbnail} from 'native-base'
import {connect} from 'react-redux'

import Input from '../dummyComponents/input'
import Buttons from '../dummyComponents/Buttons'
import {signingOut, clearStore} from '../actions/AuthAction'

import firebase from './firebase'

class signOut extends React.Component {
  handleSignOut = () => {
    this.props.dispatchSignOut()

    if (!this.props.auth.user.Object) {
      this.props.dispatchClearStore()
      this.props.navigation.navigate('Home')
    }
  }

  noSignOut = () => {
    this.props.navigation.navigate('Home')
  }

  render() {
    const {
      auth: {signOutErrorMessage, isAuthenticating, signOutError},
    } = this.props
    return (
      <View style={{flex: 1}}>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />
            </Button>
          </Left>
          <Body>
            <Title>Sign Out </Title>
          </Body>
          <Right>{/* <Thumbnail small source={require('../assets/group.png')} /> */}</Right>
        </Header>
        <View style={styles.container}>
          <View style={styles.heading}>
            <Image
              source={require('../assets/signOut.png')}
              style={styles.headingImage}
              resizeMode="contain"
            />
          </View>
          <Text style={[styles.greeting2]}>Are you sure you want to sign out?</Text>

          <Buttons isLoading={isAuthenticating} title="NO" onPress={this.noSignOut} />
          <Buttons isLoading={isAuthenticating} title="YES" onPress={this.handleSignOut} />
          <Text style={[styles.errorMessage, signOutError && {color: 'orange'}]}>
            Error Logging Out. Please Try Again.
          </Text>
          <Text style={[styles.errorMessage, signOutError && {color: 'orange'}]}>
            {signOutErrorMessage}
          </Text>
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = {
  dispatchSignOut: () => signingOut(),
  dispatchClearStore: () => clearStore(),
}

const mapStateToProps = state => ({
  auth: state.auth,
  home: state.home,
  savedTrips: state.savedTrips,
  DayDetail: state.DayDetailReducer,
  DayPicker: state.DayPickerReducer,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(signOut)

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
  },
  headingImage: {
    width: 38,
    height: 38,
  },
  errorMessage: {
    fontSize: 12,
    marginTop: 10,
    color: 'transparent',
    fontFamily: 'Arial',
  },

  inputContainer: {
    marginTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  greeting: {
    marginTop: 20,
    fontSize: 24,
    fontFamily: 'Arial',
  },
  greeting2: {
    color: '#666',
    fontSize: 24,
    marginTop: 5,
    fontFamily: 'Courier New',
  },
})
