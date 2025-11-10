import { Text, View, FlatList } from 'react-native'
import { StyleSheet } from 'react-native';
import React, { Component } from 'react'
import { db } from '../firebase/config';
import Post from '../components/Post';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []

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
  irAComentario(data) {
    this.props.navigation.navigate('Comments', { data: data })
  }


  render() {
    const { posts } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Home</Text>
          <Text style={styles.subtitle}>{posts.length} publicaciones</Text>
        </View>

        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Post
              data={item.data}
              id={item.id}
              irAComentario={(data) => this.irAComentario(data)}
              home={true}
            />
          )}
          style={styles.list}
          contentContainerStyle={posts.length === 0 ? styles.emptyContainer : null}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No hay publicaciones</Text>
              <Text style={styles.emptyMessage}>Sé el primero en publicar.</Text>
            </View>
          }
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },


  list: {
    flex: 1,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },

  meta: {
    fontSize: 12,
    color: '#888',
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },

  actionText: {
    marginLeft: 6,
    color: '#666',
    fontSize: 13,
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






export default Home