import React, { Component, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            error: '',
            username: ''


        }
    }
     componentDidMount() {
          auth.onAuthStateChanged(user => {
            if (user != null) {
              this.props.navigation.navigate('TabNavigation');
            }
          })}

    handleRegister() {

        if (!this.state.email || !this.state.pass || !this.state.username) {
            this.setState({ error: 'Debe completar todos los campos para continuar.' });
            return;
        }

        auth
            .createUserWithEmailAndPassword(this.state.email, this.state.pass)
            .then(() => {
                db.collection('users').add({
                    email: this.state.email,
                    username: this.state.username,
                })
            })
            .then(() => {
                this.props.navigation.navigate('Login');
            })
            .catch(() => {
                this.setState({ error: 'Email o contraseña incorrectos.' });
            });
    }
    render() {


        return (
            <View style={styles.container}>
                <Text style={styles.title}>Registro</Text>

                <TextInput
                    placeholder="UserName"
                    value={this.state.username}
                    onChangeText={text => this.setState({ username: text })}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Email"
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Contraseña"
                    value={this.state.pass}
                    onChangeText={text => this.setState({ pass: text })}
                    style={styles.input}
                />

                {this.state.error ? <Text style={styles.error}>{this.state.error}</Text> : null}

                <Pressable onPress={() => this.handleRegister()}><View style={styles.btn}>
                    <Text style={styles.btnText}>Entrar</Text>
                    </View>
                </Pressable>

                <Pressable onPress={() => this.props.navigation.navigate('Login')} style={{ marginTop: 12 }}>
                    <Text style={styles.link}>Ya tenés cuenta? Inicia Sesion</Text>
                </Pressable>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff'
    },
    title: {
        fontSize: 24, marginBottom: 20, textAlign: 'center', fontWeight: '600'
    },
    input: {
        borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 12
    },
    btn: {
        backgroundColor: '#007AFF', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 10
    },
    btnText: { color: '#fff', fontWeight: '600' },
    link: { color: '#007AFF', textAlign: 'center' },
    error: { color: 'red', marginBottom: 8, textAlign: 'center' }
});





