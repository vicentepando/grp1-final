import { FlatList, Text, View } from 'react-native'
import { TextInput, Pressable } from 'react-native';
import { db } from '../firebase/config';
import { auth } from '../firebase/config';
import firebase from 'firebase/app';
import React, { Component } from 'react'

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
        comments: firebase.firestore.FieldValue.arrayUnion({owner: auth.currentUser.email, texto: this.state.texto})
    })
    .then(() => {
        this.setState({
            texto: ''
        })
      })
    }






  render() {
    return (
      <View>
        <Text>{this.props.route.params.data.data.data.owner}</Text>
        <Text>{this.props.route.params.data.data.data.texto}</Text>


      <FlatList data = {this.props.route.params.data.data.data.comments} keyExtractor={(item) => Math.random() /* pongo math. random porq tengo que poner un valor unico y los comentarios no tienen un valor propio  **/} renderItem={({item}) => <View><Text>{item.owner}</Text><Text>{item.texto}</Text></View>}/>


        <TextInput
          placeholder="Escribir comentario"
          value={this.state.texto}
          onChangeText={text => this.setState({ texto: text })}
          
        />
        <Pressable onPress={() => this.crearComentario()} >
          <Text >Crear comentario</Text>
        </Pressable>



      </View>
    )
  }
}

export default Comments