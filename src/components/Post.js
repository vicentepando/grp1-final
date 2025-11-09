import React, { Component } from 'react';
import { View, Text, Pressable } from 'react-native';
import { db } from '../firebase/config';
import { auth } from '../firebase/config';
import firebase from 'firebase/app';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: [],
            like: false,

        }
    }
    componentDidMount() {
        console.log(this.props)
        if (this.props.data.likes.includes(auth.currentUser.email)) {
            this.setState({ like: true })
        } 

    }
    likear() {
        if (this.props.data.likes.includes(auth.currentUser.email)) {
            db.collection('posts').doc(this.props.id).update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)

            })
                .then(() => {
                    this.setState({ like: false })
                })
        } else {
            db.collection('posts').doc(this.props.id).update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
                .then(() => {
                    this.setState({ like: true })
                })
        }
    }

    render() {
        return (
            <View>
                <Text>{this.props.data.texto}</Text>
                <Text>{this.props.data.owner}</Text>
                <Text>{this.props.data.likes.length}</Text>
                <Pressable onPress={() => this.likear()}>
                    <Text>{this.state.like ? "Sacar like" : "likear"}</Text>
                </Pressable>

                <Pressable onPress={() => this.props.irAComentario({data: this.props })}>
                    <Text>ir a comentarios </Text>
                </Pressable>

            </View>
        )
    }
}
export default Post;