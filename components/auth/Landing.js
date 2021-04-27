import React from 'react'
import { StyleSheet, View, Button } from 'react-native'

export default function Landing() {
    return (
        <View style={styles.container} >
            <Button title="Login"
                onPress={() => navigation.navigate("Login")}
            />
            <Button title="Register"
                onPress={() => navigation.navigate("Register")}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    }
})