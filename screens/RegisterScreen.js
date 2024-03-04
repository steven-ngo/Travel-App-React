import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Header, Left, Right, Icon } from 'native-base'

class RegisterScreen extends Component {
    // static navigationOptions = {
    //     drawerIcon: ({ tintColor }) => (
    //         <Icon name="home" style={{ fontSize: 24, color: tintColor }}></Icon>
    //     )
    // }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header>
                    <Left>
                        <Icon name="menu" onPress={() => this.props.navigation.openDrawer()}></Icon>
                    </Left>
                </Header>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>RegisterScreen</Text>
                </View>
            </View>
        )
    }
}

export default RegisterScreen
