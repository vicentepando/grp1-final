import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { TextInput, Pressable, StyleSheet } from 'react-native';
import { db } from '../firebase/config';
import { auth } from '../firebase/config';
export class NewPost extends Component {
  constructor(props) {

    super(props);
    this.state = {
      texto: '',
      error: '',

    }
  }
  crearPosteo() {
    if(!this.state.texto){
      this.setState({error: 'Debe completar el campo de texto para continuar.'});
      return;
    }
    db.collection('posts').add({
      texto: this.state.texto,
      owner: auth.currentUser.email,
      createdAt: Date.now(),
      likes: [],
      comments: []
    })
    .then(() => {
      console.log('Posteo creado');
      this.setState({ texto: '' , error: ''});
      this.props.navigation.navigate('Home');
    })
    .catch((error) => {
      console.log(error);
    }); 

  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Crear nuevo posteo</Text>

        <TextInput
          placeholder="Escribir posteo"
          value={this.state.texto}
          onChangeText={(text) => this.setState({ texto: text })}
          style={styles.input}
          multiline={true}
        />

        {this.state.error ? (
          <Text style={styles.error}>{this.state.error}</Text>
        ) : null}

        <Pressable onPress={() => this.crearPosteo()} style={styles.btn}>
          <Text style={styles.btnText}>Crear posteo</Text>
        </Pressable>
      </View>
    );
  }
}

export default NewPost

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 22,
    marginBottom: 16,
    textAlign: 'left',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    minHeight: 80,        
    textAlignVertical: 'top',
  },
  btn: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
  error: {
    color: 'red',
    marginBottom: 4,
    textAlign: 'left',
  },
});
