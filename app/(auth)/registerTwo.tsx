import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { styles } from '@/styles/auth.registerTwo';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';
import TextField from '../components/TextField';
import DateField from '../components/DateField';
import TextArea from '../components/TextArea';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import MainButton from '../components/MainButton';



export default function RegisterTwoScreen() {
  const router = useRouter();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [description, setDescription] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [role, setRole] = useState('');
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const { email, password, user_type } = useLocalSearchParams();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [birthDateObj, setBirthDateObj] = useState<Date | null>(null);
  

  useEffect(() => {

    const fetchLocations = async () => {
      try {
        const response = await fetch('http://192.168.1.14:8000/api/locations');
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error('Error al obtener ubicaciones:', error);
        Alert.alert('Error', 'No se pudieron cargar las ubicaciones.');
      }
    };
  
    fetchLocations();
  }, []);

  type Location = {
    id: number;
    name: string;
  };
  
  const [locations, setLocations] = useState<Location[]>([]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Se requieren permisos para acceder a tus fotos.');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Se requieren permisos para usar la cámara.');
      return;
    }
  
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      cameraType: ImagePicker.CameraType.front, 
    });
  
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };
  
  const handleNext = async () => {
    if (
      !email || !password || !user_type ||
      !name || !lastname || !description || !birthDate || !selectedLocation || !imageUri
    ) {
      Alert.alert('Por favor llena todos los campos');
      return;
    }
  
    try {
        const formatDate = (dateString: string) => {
            const [day, month, year] = dateString.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
          };
          
          const birth_date = formatDate(birthDate);
          
        const registerResponse = await fetch('http://192.168.1.14:8000/api/v1/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
              user_type,
              name,
              last_name: lastname,
              description,
              birth_date: birth_date,
              id_location: selectedLocation,
              photo: imageUri || '',
            }),
          });
          
  
          const registerData = await registerResponse.json();

          if (!registerResponse.ok) {
            console.error('Error al registrar usuario:', registerData);
            Alert.alert('Error en el registro', JSON.stringify(registerData.error));
            return;
          }
          
          const token = registerData.access_token;
          
          await AsyncStorage.setItem('token', token);
          router.push('/(tabs)');
          
  
    } catch (error) {
      console.error('Error en el proceso de registro:', error);
      Alert.alert('Error', 'No se pudo completar el registro.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Casi lo conseguimos🥳🥳</Text>
      <Text style={styles.subtitle}>¡Dinos acerca de tii!</Text>

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <View style={styles.photoPlaceholder}>
            {imageUri ? (
            <Image source={{ uri: imageUri }} style={{ width: 100, height: 100, borderRadius: 50 }} />
            ) : (
            <Text style={styles.photoText}>👤</Text>
            )}
        </View>
        <Text style={styles.uploadText}>Sube una foto de ti</Text>
    </TouchableOpacity>

      <TextField
        placeholder="Nombre(s)"
        value={name}
        onChangeText={setName}
        iconName="person-outline"
      />
      <TextField
        placeholder="Apellidos"
        value={lastname}
        onChangeText={setLastname}
        iconName="person-outline"
      />
      <TextArea
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={8}
        iconName='reader-outline'
      />
<TouchableOpacity
  style={styles.input}
  onPress={() => setShowDatePicker(true)}
>
  <Ionicons name="calendar-outline" size={20} color={COLORS.black} style={styles.icon} />
  <Text style={styles.text}>
    {birthDate ? birthDate : 'Selecciona tu fecha de nacimiento'}
  </Text>
</TouchableOpacity>

{showDatePicker && (
  <DateTimePicker
    value={birthDateObj || new Date()}
    mode="date"
    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
    maximumDate={new Date()}
    onChange={(event, selectedDate) => {
      setShowDatePicker(false);
      if (selectedDate) {
        setBirthDateObj(selectedDate);
        const formatted = selectedDate.toLocaleDateString('es-MX'); 
        setBirthDate(formatted);
      }
    }}
  />
)}


      <TouchableOpacity style={styles.input} onPress={() => setShowRoleModal(true)}>
        <Ionicons name={"location-outline"} size={20} color={COLORS.black} style={styles.icon} />
        <Text style={styles.text}>
            {selectedLocation
            ? locations.find(loc => loc.id === selectedLocation)?.name
            : 'Ubicación'}
        </Text>
      </TouchableOpacity>

      <Modal visible={showRoleModal} transparent animationType="slide">
  <TouchableOpacity
    style={styles.modalOverlay}
    activeOpacity={1}
    onPressOut={() => setShowRoleModal(false)}
  >
    <View style={styles.modalContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {locations.map((location) => (
          <TouchableOpacity
            key={location.id}
            style={styles.roleOption}
            onPress={() => {
              setSelectedLocation(location.id);
              setShowRoleModal(false);
            }}
          >
            <Text>{location.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  </TouchableOpacity>
</Modal>

      <MainButton title="Siguiente" onPress={handleNext} />

    </View>
  );
}
