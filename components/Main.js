import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons"
import firebase from "firebase"

import { fetchUser, fetchUserPosts } from "../redux/actions"
import FeedScreen from './main/Feed';
import SearchScreen from "./main/Search"
import ProfileScreen from './main/Profile';

const Tab = createMaterialBottomTabNavigator();

const Empty = () => null

class Main extends Component {
    componentDidMount() {
        this.props.fetchUser()
        this.props.fetchUserPosts()
    }

    render() {
        const { currentUser } = this.props
        if (!currentUser) return (
            <View></View>
        )
        return (

            <Tab.Navigator initialRouteName="Feed" labeled={false}>
                <Tab.Screen name="Feed" component={FeedScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="home" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen name="Search" component={SearchScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="magnify" color={color} size={26} />
                        ),
                    }}

                />
                <Tab.Screen name="AddContainer" component={Empty}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="plus" color={color} size={26} />
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
                            <MaterialIcons name="account" color={color} size={26} />
                        ),
                    }}

                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault()
                            navigation.navigate("Profile", {
                                uid: firebase.auth().currentUser.uid
                            })
                        }
                    })}
                />
            </Tab.Navigator>
        )
    }
}

const mapStateToProps = store => ({ currentUser: store.userState.currentUser })
const mapDispatchProps = dispatch => bindActionCreators({ fetchUser, fetchUserPosts }, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main)