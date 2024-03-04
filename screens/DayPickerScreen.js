import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native'
import { Button, Header, Left, Right, Icon, Item, Body, Title, Thumbnail } from 'native-base'

import DateTimePicker from 'react-native-modal-datetime-picker';
import DatepickerRange from 'react-native-range-datepicker';

import { connect } from 'react-redux'
import action from '../actions'


class DayPickerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            startDate: new Date(),
            untilDate: new Date(),
            totalDays: 0
        };
        this.onSubmmit = this.onSubmmit.bind(this)
    }

    onSubmmit(startDate, untilDate){

        let startDay = Date.parse(startDate)
        let endDay = Date.parse(untilDate)
        let timeDiff = Math.abs(endDay - startDay);
        let totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
        // console.log(totalDays)
        this.setState({ startDate, untilDate, totalDays})
        this.props.setDate({
            start: startDate.toISOString(),
            end: untilDate.toISOString(),
            total: totalDays
        })
        
        // const tripID = Math.floor(Math.random() * 1000000);
        // fetch("http://ec2-52-15-252-121.us-east-2.compute.amazonaws.com:3000/trip/savetrip", {
        //     method: "POST",
        //     headers: {
        //       Accept: "application/json",
        //       "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         tripName: "Cool Test Trip",
        //         destination: this.props.Destination.name,
        //         destinationImage: this.props.Destination.photos[0].photo_reference,
        //         //destinationImage: this.props.Destination.photos[0].photo_reference,
        //         totalDay: totalDays,
        //         tripID: tripID,
        //         userID: 12,
        //         startDay: startDate,
        //         endDay: untilDate,
        //     })
        //   }).then(response => {
        //   });

        this.props.navigation.navigate('DayDetail')
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                    <Header>
                        <Left>
                            <Button transparent>
                                <Icon name="menu" onPress={() => this.props.navigation.openDrawer()}></Icon>
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{textAlign:"center"}}>Pick Date</Title>
                        </Body>
                        <Right>
                        </Right>
                    </Header>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Total Days</Text>
                    <Text>{this.props.dayInfo.total}</Text>
                    <DatepickerRange
                        selectedBackgroundColor= '#2196f3'
                        selectedTextColor= 'white'
                        todayColor= 'red'
                        buttonColor= '#2196f3'
                        startDate = {this.props.dayInfo.start}
                        untilDate = {this.props.dayInfo.end}
                        onConfirm = {(startDate, untilDate) => this.onSubmmit(startDate, untilDate)}
                    />
                </View>
            </View>
        )

    }
}

const mapStateToProps = state => ({
    dayInfo: state.DayPickerReducer.dayInfo,
    Destination: state.home.Destination,
})

const mapDispatchToProps = dispatch => ({
    // fetchSuggestionPOI: (tags, location) => dispatch(action.DayDetailAction.fetchSuggestionPOI(tags, location))
    setDate: (dayInfo) => dispatch(action.DayPickerAction.setDate(dayInfo))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DayPickerScreen)


// export default DayPickerScreen
