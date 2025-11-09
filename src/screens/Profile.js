import { Text, View, FlatList, Pressable} from 'react-native'
import React, { Component } from 'react'
import { db } from '../firebase/config';
import { auth } from '../firebase/config';
import Post from '../components/Post';


export class Profile extends Component {
    constructor(props) {
        super(props);  
        this.state = {
          posts:[],
          user:{}
            
        }
    }

    componentDidMount() {

      db.collection('users').where('email', '==', auth.currentUser.email).onSnapshot(docs => {
  
        docs.forEach(doc => {
          this.setState({
            user: doc.data()
          });

        }); 
       });

       //ESTE ESTA TIRANDO ERROR: 
      console.log(auth.currentUser.email);
      db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(docs => {
        let posts = [];
        console.log(docs.length); // preguntarle a maria porque esto  trae undifined en el console log de profile. Cuando borramos el .where, los documentos llegan bien 
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
        
          });
          console.log(doc.data());
          
        }); 
        console.log(posts);
        this.setState({
          posts: posts
        });
       });




       


        
    }

    logout() {
      auth.signOut()
      .then(() => {
        this.props.navigation.navigate('Login')
      })
    }

  render() {
    return (
      <View>
        <Text>Profile</Text>
        <Text>{this.state.user.email}</Text>
        <Text>{this.state.user.username}</Text>


        <FlatList data= {this.state.posts} keyExtractor={(item) => item.id} renderItem={({item}) => <Post data={item.data} id={item.id} home={false}/>  }/>
        
        <Pressable onPress={() => this.logout()}>
          <Text>Logout </Text>
        </Pressable>
      </View>
    )
  }
}

export default Profile