import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import TextField from '../components/TextField';
import MainButton from '../components/MainButton';
import { styles } from '@/styles/auth.styles';


const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    // Aquí más adelante conectarás con tu backend (ej. usando fetch o axios)
    // Ejemplo:
    // try {
    //   const response = await axios.post('http://tu-api-laravel.com/api/login', {
    //     email,
    //     password,
    //     rememberMe,
    //   });
    //   // Maneja la respuesta, guarda token, etc.
    // } catch (error) {
    //   console.error(error);
    // }
    console.log('Iniciar sesión con', { email, password, rememberMe });
  };

  const handleCreateAccount = () => {
    // Aquí podrías navegar a una pantalla de registro
    console.log('Ir a crear cuenta');
  };

  return (
    <View style={styles.container}>
      {/* Logo e imagen superior */}
      <Image
        source={require('../../assets/images/CLEANY-LOGO.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Título */}
      <Text style={styles.title}>¡Te extrañamos!</Text>
      <Text style={styles.subTitle}>Iniciemos sesión</Text>

      {/* Campos de texto */}
      <TextField
        placeholder="E-Mail"
        value={email}
        onChangeText={setEmail}
        iconName="mail-outline"
      />
      <TextField
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        iconName="lock-closed-outline"
        secureTextEntry
      />

      {/* Botón de Ingresar */}
      <MainButton
        title="Ingresar" 
        onPress={handleLogin} 
      />

      {/* Link para crear cuenta */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>¿No tienes una cuenta?</Text>
        <TouchableOpacity onPress={handleCreateAccount}>
          <Text style={styles.footerLink}> CREA UNA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

