import { Text, View, FlatList, Image, Pressable, StyleSheet } from 'react-native';
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



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },

  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#e6e6ea',
  },

  username: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginTop: 12,
  },

  bio: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 10,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 16,
  },

  statBox: {
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },

  statLabel: {
    fontSize: 12,
    color: '#666',
  },

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  editButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },

  logoutButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  editButtonText: {
    color: '#fff',
    fontWeight: '600',
  },

  logoutButtonText: {
    color: '#007AFF',
    fontWeight: '600',
  },

  postsList: {
    marginTop: 18,
    flex: 1,
  },

  postCard: {
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

  separator: {
    height: 12,
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },

  emptyMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 6,
  },
});



export default Profile