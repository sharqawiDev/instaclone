import React, { Component } from 'react'
import { Button, TextInput, View } from 'react-native'
import firebase from "firebase"
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
        const { email, password, name } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => console.log(result))
            .catch((error) => console.log(error))

        this.nameInput.clear()
        this.emailInput.clear()
        this.passInput.clear()
    }
    render() {
        return (
            <View>
                <TextInput
                    placeholder="Name"
                    onChangeText={(name) => this.setState({ name })}
                    autoCompleteType={"name"}
                    textContentType={"name"}
                    clearButtonMode="always"
                    ref={input => { this.nameInput = input }}
                />
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
                    onPress={() => this.onRegister()}
                    title="Register"
                />
            </View>
        )
    }
}