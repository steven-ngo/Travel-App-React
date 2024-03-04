import React from 'react'
import {Image, StyleSheet} from 'react-native'
import {createBottomTabNavigator} from 'react-navigation'

import SignIn from './signin'
import SignUp from './signup'

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
  },
})

const routes = {
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: 'Sign In',
      tabBarIcon: ({tintColor}) => (
        <Image source={require('../assets/signUpButton.png')} style={[styles.icon, {tintColor}]} />
      ),
    },
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: 'Sign Up',
      tabBarIcon: ({tintColor}) => (
        <Image source={require('../assets/signUpButton.png')} style={[styles.icon, {tintColor}]} />
      ),
    },
  },
}

const routeConfig = {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showLabel: true,
    activeTintColor: '#3e98fa',
    inactiveTintColor: '#b9b9b9',
    indicatorStyle: {backgroundColor: '#b9b9b9'},
    labelStyle: {
      fontFamily: 'Arial',
      fontSize: 12,
    },
    style: {
      backgroundColor: 'white',
      borderTopWidth: 0,
      paddingBottom: 3,
    },
  },
}

export default createBottomTabNavigator(routes, routeConfig)
