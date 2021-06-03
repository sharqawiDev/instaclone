import React, { useState } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'
import firebase from "firebase"
require("firebase/firestore")

export default function Search(props) {
    const [users, setUsers] = useState([])
    const searchUsers = input => {
        firebase.firestore()
            .collection("users")
            .where("name", ">=", input)
            .get()
            .then(snapshot => {
                let users = snapshot.docs.map(doc => {
                    let data = doc.data();
                    let id = doc.id
                    return { id, ...data }
                })
                setUsers(users)
            })
    }
    return (
        <View>
            <TextInput
                onChangeText={input => searchUsers(input)}
                placeholder="Search"
            />

            <FlatList
                numColumns={1}
                horizontal={false}
                data={users}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("Profile", {
                            uid: item.id
                        })}
                    >
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}
