import {Alert} from 'react-native'

import firebaseApp from '../Auth/firebase'
import {
  LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from '../reducer/AuthReducer'

function signUp() {
  return {
    type: SIGN_UP,
  }
}

function signUpSuccess(user) {
  return {
    type: SIGN_UP_SUCCESS,
    user,
  }
}

function signUpFailure(err) {
  return {
    type: SIGN_UP_FAILURE,
    error: err,
  }
}

export function createUser(email, password) {
  return dispatch => {
    dispatch(signUp())

    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        const userObject = {userID: data.user.uid, userEmail: data.user.email}

        fetch('http://ec2-52-15-252-121.us-east-2.compute.amazonaws.com:3000/user/createUser', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userObject),
        })
          .then(response => {
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
            console.log(response)
          })
          .catch(error => {
            console.error(error)
          })
        dispatch(signUpSuccess(data))
      })
      .catch(error => {
        dispatch(signUpFailure(error))
        // Alert.alert(error.message)
      })
  }
}

function logIn() {
  return {
    type: LOG_IN,
  }
}

function logInSuccess(user) {
  return {
    type: LOG_IN_SUCCESS,
    user,
  }
}

function logInFailure(err) {
  return {
    type: LOG_IN_FAILURE,

    error: err,
  }
}

export function authenticate(email, password) {
  return dispatch => {
    dispatch(logIn())

    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch(logInSuccess(user))
      })
      .catch(error => {
        dispatch(logInFailure(error))
        // Alert.alert(error.message)
      })
  }
}

function logOut() {
  return {
    type: LOG_OUT,
  }
}

function logOutSuccess() {
  return {
    type: LOG_OUT_SUCCESS,
  }
}

function logOutFailure(err) {
  return {
    type: LOG_OUT_FAILURE,
    error: err,
  }
}

export function signingOut() {
  return dispatch => {
    dispatch(logOut())

    firebaseApp
      .auth()
      .signOut()
      .then(() => {
        dispatch(logOutSuccess())
      })
      .catch(error => {
        dispatch(logOutFailure(error))
      })
  }
}

export function clearStore() {
  return {type: 'RESET'}
}
