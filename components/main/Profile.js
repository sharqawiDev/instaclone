import React, { useState, useEffect } from 'react'
import { Text, View, Image, FlatList, StyleSheet } from 'react-native'
import { connect } from "react-redux"
import firebase from "firebase"
require("firebase/firestore")
function Profile(props) {
    const [userPosts, setUserPosts] = useState([])
    const [user, setUser] = useState(null)

    console.log(props.route)
    useEffect(() => {
        const { currentUser, posts } = props
        if (props.route.params.uid === firebase.auth().currentUser.uid) {
            setUser(currentUser)
            setUserPosts(posts)
        }
        else {

            firebase.firestore()
                .collection("users")
                .doc(props.route.params.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        setUser(snapshot.data())
                    }
                    else console.log('user does not exist')
                })


            firebase.firestore()
                .collection("posts")
                .doc(props.route.params.uid)
                .collection("userPosts")
                .orderBy("creation", "asc")
                .get()
                .then((snapshot) => {
                    let posts = snapshot.docs.map(doc => {
                        let data = doc.data();
                        let id = doc.id
                        return { id, ...data }
                    })

                    setUserPosts(posts)
                })


        }
    }, [props.route.params.uid])

    if (user === null) return <View />
    return (
        <View style={styles.view}>
            <View style={styles.profileInfo}>
                <Text> {user.name} </Text>
                <Text> {user.email} </Text>
            </View>
            <View style={styles.gallery}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={userPosts}
                    renderItem={({ item }) => (
                        <View style={styles.imagesContainer}>
                            <Image
                                style={styles.image}
                                source={{ uri: item.downloadURL }}
                            />
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    profileInfo: {
        margin: 20
    },
    gallery: {
        flex: 1
    },
    imagesContainer: {
        flex: 1 / 3
    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1
    }
})

const mapStateToProps = store => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts
})

export default connect(mapStateToProps, null)(Profile)