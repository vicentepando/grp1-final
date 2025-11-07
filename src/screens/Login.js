import React, { Component, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth } from '../firebase/config';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            error: ''

        }
    }
    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user != null) {
                this.props.navigation.navigate('TabNavigation');
            }
        })
    }

    handleLogin() {

        if (!this.state.email.trim() || !this.state.pass) {
            this.setState({ error: 'Debe completar todos los campos para continuar.' });
            return;
        }

        auth
            .signInWithEmailAndPassword(this.state.email.trim(), this.state.pass)
            .then(() => {
                console.log("Usuario logueado")
                this.setState({ email: '', pass: '', error: '' });
            })
            .catch(() => {
                setError('Email o contraseña incorrectos.');
            });
    }
    render() {


        return (
            <View style={styles.container}>
                <Text style={styles.title}>Iniciar sesión</Text>

                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Contraseña"
                    secureTextEntry
                    value={this.state.pass}
                    onChangeText={text => this.setState({ pass: text })}
                    style={styles.input}
                />

                {this.state.error ? <Text style={styles.error}>{this.state.error}</Text> : null}

                <Pressable onPress={() => this.handleLogin()} style={styles.btn}>
                    <Text style={styles.btnText}>Entrar</Text>
                </Pressable>

                <Pressable onPress={() => this.props.navigation.navigate('Register')} style={{ marginTop: 12 }}>
                    <Text style={styles.link}>¿No tenés cuenta? Registrate</Text>
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




