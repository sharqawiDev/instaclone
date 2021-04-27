import React, { Component } from 'react'
import { Button, Text, TextInput, View } from 'react-native'

export default class Register extends Component {
    constructor(params) {
        super(params)
        this.state = {
            name: '',
            email: "",
            password: "",
        }
    }
    onRegister = () => {

    }
    render() {
        return (
            <View>
                <TextInput
                    placeholder="Name"
                    onChangeText={(name) => this.setState({ name })}
                    autoCompleteType={"name"}
                    textContentType={"name"}
                />
                <TextInput
                    placeholder="Email"
                    onChangeText={(email) => this.setState({ email })}
                    autoCompleteType={"email"}
                    keyboardType={"email-address"}
                    textContentType={"emailAddress"}

                />
                <TextInput
                    placeholder="Password"
                    onChangeText={(password) => this.setState({ password })}
                    autoCompleteType={"password"}
                    textContentType={"password"}
                    secureTextEntry={true}
                />
                <Button
                    onPress={() => this.onRegister()}
                    title="Register"
                />
            </View>
        )
    }
}