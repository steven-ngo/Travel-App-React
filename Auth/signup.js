import React from 'react'
import {StyleSheet, Text, Image, View, Alert} from 'react-native'
import {Button, Header, Left, Right, Icon, Body, Title, Thumbnail} from 'native-base'
import {connect} from 'react-redux'

import {createUser} from '../actions/AuthAction'
import Input from '../dummyComponents/input'
import Buttons from '../dummyComponents/Buttons'

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {email: '', password: '', confirmedPassword: ''}
  }

  handleSignUp = () => {
    if (this.state.password !== this.state.confirmedPassword) {
      Alert.alert('Passwords do not match')
      return
    }
    this.props.dispatchCreateUser(this.state.email, this.state.password)

    setTimeout(() => {
      if (!this.props.auth.signUpError) {
        this.props.navigation.navigate('SignIn')
      }
    }, 1300)
  }

  render() {
    const {
      auth: {isAuthenticating, signUpError, signUpErrorMessage},
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
            <Title> Sign Up </Title>
          </Body>
          <Right>{/* <Thumbnail small source={require('../assets/group.png')} /> */}</Right>
        </Header>
        <View style={styles.container}>
          <View style={styles.heading}>
            <Image
              source={require('../assets/boomboxcropped.png')}
              style={styles.headingImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.greeting}>Welcome,</Text>
          <Text style={styles.greeting2}>sign up to continue</Text>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Email"
              onChangeText={email =>
                this.setState({
                  email,
                })
              }
              value={this.state.email}
            />
            <Input
              placeholder="Password"
              onChangeText={password => this.setState({password})}
              value={this.state.password}
              secureTextEntry
            />
            <Input
              placeholder="Confirmed Password"
              onChangeText={confirmedPassword => this.setState({confirmedPassword})}
              value={this.state.confirmedPassword}
              secureTextEntry
            />
          </View>
          <Buttons title="Sign Up" onPress={this.handleSignUp} isLoading={isAuthenticating} />

          <Text style={[styles.errorMessage, signUpError && {color: 'orange'}]}>
            Error logging in. Please try again.
          </Text>
          <Text style={[styles.errorMessage, signUpError && {color: 'orange'}]}>
            {signUpErrorMessage}
          </Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
})

const mapDispatchToProps = {
  dispatchCreateUser: (email, password) => createUser(email, password),
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
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
  errorMessage: {
    fontFamily: 'Arial',
    fontSize: 12,
    marginTop: 10,
    color: 'transparent',
  },
  heading: {
    flexDirection: 'row',
  },
  headingImage: {
    width: 38,
    height: 38,
  },
})
