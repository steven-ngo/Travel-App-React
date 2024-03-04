import React from 'react'
import {StyleSheet, TextInput} from 'react-native'

const Input = ({placeholder, value, onChangeText, ...props}) => (
  <TextInput
    autoCapitalize="none"
    autoCorrect={false}
    style={styles.input}
    placeholder={placeholder}
    placeholderTextColor="#a0a0a0"
    onChangeText={onChangeText}
    underlineColorAndroid="transparent"
    value={value}
    {...props}
  />
)

const styles = StyleSheet.create({
  input: {
    height: 45,
    marginBottom: 15,
    borderBottomWidth: 1.5,
    fontSize: 16,
    borderBottomColor: '#3e98fa',
    fontFamily: 'Arial',
  },
})

export default Input
