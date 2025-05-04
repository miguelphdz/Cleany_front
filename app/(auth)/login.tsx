import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextField from '../components/TextField';
import MainButton from '../components/MainButton';
import { styles } from '@/styles/auth.styles';
import { useRouter } from 'expo-router';



const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        return;
      }
  
      try {
        const res = await fetch('http://192.168.1.134:8000/api/v1/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
  
        if (!res.ok) {
          throw new Error('Token inválido');
        }
  
        const user = await res.json();
        console.log('Usuario autenticado:', user);
        router.replace('/(tabs)'); 
  
      } catch (error) {
        const err = error as Error;
        console.log('Token inválido o expirado:', err.message);
        await AsyncStorage.removeItem('token');
        router.replace('/(auth)/login'); 
      }
    };
  
    checkAuth();
  }, []);
  


  const handleLogin = async () => {
    try {
      console.log("click")
      const response = await fetch('http://192.168.1.134:8000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.log('Error en el login:', data.error);
        return;
      }
  
      console.log('Token recibido:', data.access_token);
      await AsyncStorage.setItem('token', data.access_token);
      console.log('Token válido, redirigiendo al home...');
      router.replace('/(tabs)'); 
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };
  
  

  const handleCreateAccount = () => {
    router.push('/(auth)/registerOne'); // o la ruta que corresponda a tu pantalla de registro
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

