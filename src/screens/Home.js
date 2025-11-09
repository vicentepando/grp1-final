import { Text, View, FlatList } from 'react-native'
import React, { Component } from 'react'
import { db } from '../firebase/config';
import Post from '../components/Post';

export class Home extends Component {
    constructor(props) {
        super(props);  
        this.state = {
          posts:[]

        }
    }
    componentDidMount() {
       db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(docs => {
        let posts = [];
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
        
          });

        }); 
        console.log(posts);
        this.setState({
          posts: posts
        });
       });
    }
    irAComentario(data){
      this.props.navigation.navigate('Comments', {data:data})
    }


  render() {
    return (
      <View>
        <Text>Home</Text>
        <FlatList data={this.state.posts} keyExtractor={(item) => item.id} renderItem={({item}) => <Post data={item.data} id={item.id} irAComentario={(data) => this.irAComentario(data)}/>}/>
      </View>
    )
  }
}

export default Home