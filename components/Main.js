import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { fetchUser } from "../redux/actions"
import FeedScreen from './main/Feed';
import ProfileScreen from './main/Profile';

const Tab = createBottomTabNavigator();

const Empty = () => null

class Main extends Component {
    componentDidMount() {
        this.props.fetchUser()
    }

    render() {
        const { currentUser } = this.props
        if (!currentUser) return (
            <View></View>
        )
        return (

            <Tab.Navigator initialRouteName="Feed">
                <Tab.Screen name="Feed" component={FeedScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="home" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen name="AddContainer" component={Empty}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="plus" color={color} size={size} />
                        ),
                        title: "Add"
                    }}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault()
                            navigation.navigate("Add")
                        }
                    })}
                />
                <Tab.Screen name="Profile" component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="account" color={color} size={size} />
                        ),
                    }}
                />
            </Tab.Navigator>
        )
    }
}

const mapStateToProps = store => ({ currentUser: store.userState.currentUser })
const mapDispatchProps = dispatch => bindActionCreators({ fetchUser }, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main)