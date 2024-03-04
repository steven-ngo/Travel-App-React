import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Header, Left, Right, Icon, Tab, Tabs, ScrollableTab, Button, ActionSheet, Content, ListItem, Body, Title,
    Thumbnail} from 'native-base'


var BUTTONS = ["Day 1", "Day 2", "Day 3", "Day 4", "Cancel"];
var REMOVE = ["Remove"];
var CANCEL_INDEX = 4;

class DayDetailScreen extends Component {
    constructor(props)
    {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <View style={{flex:1}}>
                <Header>
                    <Left>
                        <Icon name="menu" onPress={() => this.props.navigation.openDrawer()}></Icon>
                    </Left> 
                    <Body style={{}}>
                        <Title> Planner </Title>
                    </Body>
                    <Right>
                        <Thumbnail small source={require('../assets/group.png')} />
                    </Right>
                </Header>

                <Tabs renderTabBar = {() => <ScrollableTab/>}>
                    <Tab heading = "All POI">
                        <Text style={{textAlign: "center"}}>ALL POI</Text>
                        {/*<Content padder>*/}
                        <ListItem>
                        <Button onPress={() => ActionSheet.show({
                            options: BUTTONS,
                            cancelButtonIndex: CANCEL_INDEX,
                            title: "Select Day to be added"    
                        }, 
                        buttonIndex => {
                            this.setState({clicked: BUTTONS[buttonIndex]}) 
                        }
                        )}>
                            <Icon name='add'/>
                        </Button> 
                            <Text style={{ textAlign: "right" }}> San Jose State University </Text>
                        </ListItem>
                        <ListItem>
                            <Button onPress={() => ActionSheet.show({
                                options: BUTTONS,
                                cancelButtonIndex: CANCEL_INDEX,
                                title: "Select Day to be added"
                            },
                                buttonIndex => {
                                    this.setState({ clicked: BUTTONS[buttonIndex] })
                                }
                            )}>
                                <Icon name='add' />
                            </Button>
                            <Text style={{ textAlign: "right" }}> Winchester Mystery House </Text>
                        </ListItem>         
                        <ListItem>
                            <Button onPress={() => ActionSheet.show({
                                options: BUTTONS,
                                cancelButtonIndex: CANCEL_INDEX,
                                title: "Select Day to be added"
                            },
                                buttonIndex => {
                                    this.setState({ clicked: BUTTONS[buttonIndex] })
                                }
                            )}>
                                <Icon name='add' />
                            </Button>
                            <Text style={{ textAlign: "right" }}> Mission Peak </Text>
                        </ListItem>         
                        <ListItem>
                            <Button onPress={() => ActionSheet.show({
                                options: BUTTONS,
                                cancelButtonIndex: CANCEL_INDEX,
                                title: "Select Day to be added"
                            },
                                buttonIndex => {
                                    this.setState({ clicked: BUTTONS[buttonIndex] })
                                }
                            )}>
                                <Icon name='add' />
                            </Button>
                            <Text style={{ textAlign: "right" }}> The Tech Museum of Innovation </Text>
                        </ListItem>

                        <ListItem>
                            <Button onPress={() => ActionSheet.show({
                                options: BUTTONS,
                                cancelButtonIndex: CANCEL_INDEX,
                                title: "Select Day to be added"
                            },
                                buttonIndex => {
                                    this.setState({ clicked: BUTTONS[buttonIndex] })
                                }
                            )}>
                                <Icon name='add' />
                            </Button>
                            <Text style={{ textAlign: "right" }}> Rosicrucian Egyptian Museum </Text>
                        </ListItem>                               
                        {/*</Content>*/}
                    </Tab>

                    <Tab heading = "Day 1">
                        <Text style={{textAlign: "center"}}>DAY 1</Text>
                        <ListItem>
                            <Button danger onPress={() => ActionSheet.show({
                                options: REMOVE,
                                title: "Remove POI"    
                                }, 
                                buttonIndex => {
                                this.setState({clicked: BUTTONS[buttonIndex]}) 
                                }
                                )}>
                                <Icon name='remove'/>
                            </Button>
                            <Text style={{ textAlign: "right" }}> San Jose State University </Text> 
                        </ListItem>
                        <ListItem>
                            <Button danger onPress={() => ActionSheet.show({
                                options: REMOVE,
                                title: "Remove POI"
                            },
                                buttonIndex => {
                                    this.setState({ clicked: BUTTONS[buttonIndex] })
                                }
                            )}>
                                <Icon name='remove' />
                            </Button>
                            <Text style={{ textAlign: "right" }}> Mission Peak </Text>
                        </ListItem>
                    </Tab>

                    <Tab heading="Day 2">
                        <Text style={{ textAlign: "center" }}>DAY 2</Text>
                        <ListItem>
                            <Button danger onPress={() => ActionSheet.show({
                                options: REMOVE,
                                title: "Remove POI"
                            },
                                buttonIndex => {
                                    this.setState({ clicked: BUTTONS[buttonIndex] })
                                }
                            )}>
                                <Icon name='remove' />
                            </Button>
                            <Text style={{ textAlign: "right" }}> Winchester Mystery House </Text>
                        </ListItem>
                        <ListItem>
                            <Button danger onPress={() => ActionSheet.show({
                                options: REMOVE,
                                title: "Remove POI"
                            },
                                buttonIndex => {
                                    this.setState({ clicked: BUTTONS[buttonIndex] })
                                }
                            )}>
                                <Icon name='remove' />
                            </Button>
                            <Text style={{ textAlign: "right" }}> The Tech Museum of Innovation </Text>
                        </ListItem>
                    </Tab> 

                    <Tab heading="Day 3">
                        <Text style={{ textAlign: "center" }}>DAY 3</Text>
                        <ListItem>
                            <Button danger onPress={() => ActionSheet.show({
                                options: REMOVE,
                                title: "Remove POI"
                            },
                                buttonIndex => {
                                    this.setState({ clicked: BUTTONS[buttonIndex] })
                                }
                            )}>
                                <Icon name='remove' />
                            </Button>
                            <Text style={{ textAlign: "right" }}> San Jose State University </Text>
                        </ListItem>
                        <ListItem>
                            <Button danger onPress={() => ActionSheet.show({
                                options: REMOVE,
                                title: "Remove POI"
                            },
                                buttonIndex => {
                                    this.setState({ clicked: BUTTONS[buttonIndex] })
                                }
                            )}>
                                <Icon name='remove' />
                            </Button>
                            <Text style={{ textAlign: "right" }}> Mission Peak </Text>
                        </ListItem>
                    </Tab> 

                    <Tab heading="Day 4">
                        <Text style={{ textAlign: "center" }}>DAY 4</Text>
                        <ListItem>
                            <Button danger onPress={() => ActionSheet.show({
                                options: REMOVE,
                                title: "Remove POI"
                            },
                                buttonIndex => {
                                    this.setState({ clicked: BUTTONS[buttonIndex] })
                                }
                            )}>
                                <Icon name='remove' />
                            </Button>
                            <Text style={{ textAlign: "right" }}> San Jose State University </Text>
                        </ListItem>
                        <ListItem>
                            <Button danger onPress={() => ActionSheet.show({
                                options: REMOVE,
                                title: "Remove POI"
                            },
                                buttonIndex => {
                                    this.setState({ clicked: BUTTONS[buttonIndex] })
                                }
                            )}>
                                <Icon name='remove' />
                            </Button>
                            <Text style={{ textAlign: "right" }}> Mission Peak </Text>
                        </ListItem>
                    </Tab>              
                </Tabs>   
            </View>
        )
    }
}

export default DayDetailScreen
