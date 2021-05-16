import React, { useState } from 'react'
import { View, TextInput, Image, Button } from 'react-native'
import firebase from "firebase"
require("firebase/firestore")
require("firebase/firebase-storage")

export default function Save({ route, navigation }) {
    const [caption, setCaption] = useState("")
    const image = route.params.image
    const childURL = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
    const uploadImage = async () => {
        const response = await fetch(image)
        const blob = await response.blob()
        const task = firebase
            .storage()
            .ref()
            .child(childURL)
            .put(blob)

        const taskProgress = snapshot => {
            console.log(`Uploaded: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then(snapshot => {
                savePostData(snapshot)
                console.log(snapshot)
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted)
    }

    const savePostData = (downloadURL) => {
        firebase.firestore()
            .collection("posts")
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .add({
                downloadURL,
                caption,
                creation: firebase.firestore.FieldValue.serverTimestamp()
            }).then((() => {
                navigation.popToTop()
            }))
    }

    return (
        <View style={{ flex: 1 }}>
            <Image
                source={{ uri: image }}
                style={{ width: 300, height: 300 }}
            />
            <TextInput
                placeholder={"Caption"}
                onChangeText={caption => setCaption(caption)}
            />
            <Button
                title={"Save"}
                onPress={() => uploadImage()}
            />
        </View>
    )
}