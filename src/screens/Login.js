import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth } from '../firebase/config';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  function handleLogin() {
    setError('');

    if (!email.trim() || !pass) {
      setError('Completá email y contraseña.');
      return;
    }

    auth
      .signInWithEmailAndPassword(email.trim(), pass)
      .then(() => {
        // IMPORTANTE:
        // No navegamos manualmente.
        // El listener de App.js detecta que el usuario se logueó
        // y automáticamente te manda a las Tabs (Home, etc).
      })
      .catch(() => {
        setError('Email o contraseña incorrectos.');
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={pass}
        onChangeText={setPass}
        style={styles.input}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable onPress={handleLogin} style={styles.btn}>
        <Text style={styles.btnText}>Entrar</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Register')} style={{ marginTop: 12 }}>
        <Text style={styles.link}>¿No tenés cuenta? Registrate</Text>
      </Pressable>
    </View>
  );
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
