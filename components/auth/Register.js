import React, { Component } from 'react'
import { Button, TextInput, View } from 'react-native'
import firebase from "firebase"
export default class Login extends Component {
    constructor(params) {
        super(params)
        this.state = {
            email: "",
            password: "",
        }
    }
    onLogin = () => {
        const { email, password, name } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result)
                this.emailInput.clear()
                this.passInput.clear()
            })
            .catch((error) => console.log(error))

    }
    render() {
        return (
            <View>
                <TextInput
                    placeholder="Email"
                    onChangeText={(email) => this.setState({ email })}
                    autoCompleteType={"email"}
                    keyboardType={"email-address"}
                    textContentType={"emailAddress"}
                    clearButtonMode="always"
                    ref={input => { this.emailInput = input }}

                />
                <TextInput
                    placeholder="Password"
                    onChangeText={(password) => this.setState({ password })}
                    autoCompleteType={"password"}
                    textContentType={"password"}
                    secureTextEntry={true}
                    clearButtonMode="always"
                    ref={input => { this.passInput = input }}
                />
                <Button
                    onPress={() => this.onLogin()}
                    title="Login"
                />
            </View>
        )
    }
}