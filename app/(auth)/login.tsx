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
    console.log('Iniciar sesión con', { email, password, rememberMe });
  };

  const handleCreateAccount = () => {
    console.log('Ir a crear cuenta');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/CLEANY-LOGO.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>¡Te extrañamos!</Text>
      <Text style={styles.subTitle}>Iniciemos sesión</Text>

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

      <MainButton
        title="Ingresar" 
        onPress={handleLogin} 
      />

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

