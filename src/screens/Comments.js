import { db } from '../firebase/config';
import { auth } from '../firebase/config';
import firebase from 'firebase/app';
import React, { Component } from 'react'
import { FlatList, Text, View, TextInput, Pressable, StyleSheet } from 'react-native';

export class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      texto: ""


    }
  }
  componentDidMount() {
    console.log(this.props.route.params.data)

  }





  crearComentario() {
    db.collection('posts').doc(this.props.route.params.data.data.id).update({
      comments: firebase.firestore.FieldValue.arrayUnion({ owner: auth.currentUser.email, texto: this.state.texto })
    })
      .then(() => {
        this.setState({
          texto: ''
        })
      })
  }






  render() {
    const post = this.props.route.params.data.data.data;
    const comments = post.comments || [];
    return (
      <View style={styles.container}>
        <View style={styles.postCard}>
          <Text style={styles.postOwner}>{post.owner}</Text>
          <Text style={styles.postText}>{post.texto}</Text>
        </View>

        <FlatList
          data={comments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.commentItem}>
              <Text style={styles.commentOwner}>{item.owner}</Text>
              <Text style={styles.commentText}>{item.texto}</Text>
            </View>
          )}
          style={styles.commentsList}
          contentContainerStyle={comments.length === 0 ? styles.emptyContainer : null}
          ListEmptyComponent={<View style={styles.emptyContainer}><Text style={styles.emptyTitle}>No hay comentarios</Text></View>}
        />

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Escribir comentario"
            value={this.state.texto}
            onChangeText={text => this.setState({ texto: text })}
          />
          <Pressable style={styles.submitButton} onPress={() => this.crearComentario()}>
            <Text style={styles.submitText}>Crear</Text>
          </Pressable>
        </View>
        \      </View>
    );
  }
}





const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  postCard: { backgroundColor: '#f9f9fb', padding: 12, borderRadius: 10, marginBottom: 12 },
  postOwner: { fontWeight: '700', fontSize: 14, color: '#000', marginBottom: 6 },
  postText: { fontSize: 14, color: '#222', lineHeight: 20 },
  commentsList: { flex: 1 },
  commentItem: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  commentOwner: { fontSize: 13, fontWeight: '600', color: '#000' },
  commentText: { fontSize: 13, color: '#333', marginTop: 4 },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, marginRight: 8 },
  submitButton: { backgroundColor: '#007AFF', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8 },
  submitText: { color: '#fff', fontWeight: '600' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  emptyTitle: { fontSize: 16, color: '#666' },
});

export default Comments