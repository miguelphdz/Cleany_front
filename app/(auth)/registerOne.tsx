import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import TextField from "../components/TextField";
import MainButton from "../components/MainButton";
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { styles } from "@/styles/auth.registerOne";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';


export default function RegisterOne() {
  const navigation = useNavigation<any>(); // Puedes reemplazar 'any' con el tipo correcto si usas TypeScript con tipado de rutas

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Encontrar servicios de limpieza', value: 'CLIENT' },
    { label: 'Ofrecer servicios de limpieza', value: 'EMPLOYEE' },
  ]);

  const handleNext = () => {
    if (!email || !password || !confirmPassword || !role) {
      Alert.alert('Por favor llena todos los campos');
      return;
    } else if (password !== confirmPassword) {
      Alert.alert('Las contraseñas no coinciden');
      return;
    }
  
    // Navegar y pasar los datos a la siguiente pantalla
    router.push({
      pathname: '/(auth)/registerTwo',
      params: {
        email,
        password,
        user_type: value === 'buscar' ? 'CLIENT' : 'EMPLOYEE',
      },
    });
  };

  return (
    <View style={styles.container}>
    <View style={styles.headerContainer}>
    <Image
        source={require('../../assets/images/CLEANY-LOGO-ESTRELLAS.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <View >
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>¡Comencemos con tus datos!</Text>
      </View>
    </View>
      <View style={styles.form}>
        <TextField placeholder="E-Mail" value={email} onChangeText={setEmail} iconName="mail-outline" />
        <TextField iconName="lock-closed-outline" placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} />
        <TextField iconName="lock-closed-outline" placeholder="Confirmar Contraseña" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={(val) => {
            setValue(val);
            setRole(val); 
          }}
          setItems={setItems}
          placeholder="Quiero..."
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          textStyle={styles.dropdownText}
          placeholderStyle={styles.placeholderStyle}
        />
      </View>

      <MainButton title="Siguiente" onPress={handleNext} />
    </View>
  );
}
