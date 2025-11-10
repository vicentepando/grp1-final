import React, { Component } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
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
            <View style={styles.card}>
                <View style={styles.headerRow}>
                    <Text style={styles.owner}>{this.props.data.owner}</Text>
                    <Text style={styles.likes}>{this.props.data.likes.length} ♥️</Text>
                </View>

                <Text style={styles.text}>{this.props.data.texto}</Text>

                <View style={styles.actions}>
                    {this.props.home ? (
                        <>
                            <Pressable style={styles.actionButton} onPress={() => this.likear()}>
                                <Text style={styles.actionText}>{this.state.like ? "Sacar like" : "Like"}</Text>
                            </Pressable>

                            <Pressable style={styles.actionButton} onPress={() => this.props.irAComentario({ data: this.props })}>
                                <Text style={styles.actionText}>Comentarios</Text>
                            </Pressable>
                        </>
                    ) : (
                        <Pressable style={styles.actionButton} onPress={() => console.log("borrar")}>
                            <Text style={styles.actionText}>Borrar</Text>
                        </Pressable>
                    )}
                </View>
            </View>


        )
    }
}
export default Post;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9fb',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  owner: {
    fontWeight: '700',
    fontSize: 14,
    color: '#000',
  },
  likes: {
    fontSize: 12,
    color: '#888',
  },
  text: {
    fontSize: 14,
    color: '#222',
    lineHeight: 20,
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  actionButton: {
    backgroundColor: 'transparent',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  actionText: {
    color: '#007AFF',
    fontWeight: '600',
  }
});