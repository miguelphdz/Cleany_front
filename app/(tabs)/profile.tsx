import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';               // ← nuevo
import { styles, editStyles } from '@/styles/tabs.profile';

// Tipos ------------------------------------------------------
interface Review { id: number; name: string; comment: string; rating: number; photo: string; }
interface Location { id: number; name: string; }
interface ProfileData { id?: number; name: string; last_name: string; description: string; photo: string; calificacion: number; id_location: number; }

const Profile: React.FC = () => {
  const [userType, setUserType] = useState<string>('Empleado');
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [locationName, setLocationName] = useState<string>('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  // ------------------------------------------------------
  useEffect(() => {
    loadProfile();
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      const res = await fetch('http://192.168.1.23:8000/api/locations');
      setLocations(await res.json());
    } catch (e) { console.error('Error cargando ubicaciones:', e); }
  };

  const loadProfile = async () => {
    try {
      const json = await AsyncStorage.getItem('profileData');
      if (!json) return;
      const data: ProfileData = JSON.parse(json);
      setProfileData(data);
      const loc = locations.find(l => l.id === data.id_location);
      if (loc) setLocationName(loc.name);

      if (data.id !== undefined) {
        try {
          const res = await fetch(`http://192.168.1.23:8000/api/references/${data.id}`, { headers: { Accept: 'application/json' } });
          if (res.ok) setReviews(await res.json());
        } catch { /* nada */ }
      }
    } catch (e) { console.error('Error leyendo perfil:', e); }
  };

  useEffect(() => {
    if (profileData && locations.length) {
      const loc = locations.find(l => l.id === profileData.id_location);
      setLocationName(loc ? loc.name : '');
    }
  }, [profileData, locations]);

  // ----------------------------- elegir foto
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Necesitamos acceso a tu galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
    if (!result.canceled) {
      const newUri = result.assets[0].uri;
      setProfileData(prev => prev ? { ...prev, photo: newUri } : prev);
      if (profileData) {
        const updated = { ...profileData, photo: newUri };
        await AsyncStorage.setItem('profileData', JSON.stringify(updated));
      }
      // TODO: subir al backend si se requiere
    }
  };

  const saveProfile = async () => {
    if (!profileData) return;
    try {
      await AsyncStorage.setItem('profileData', JSON.stringify(profileData));
      await fetch('http://192.168.1.23:8000/api/profile', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(profileData) });
      setIsEditing(false);
      Alert.alert('Perfil guardado', 'Tus cambios se han guardado correctamente.');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el perfil.');
    }
  };

  const renderStars = (rating: number) => (
    <View style={styles.starsContainer}>
      {Array.from({ length: 5 }, (_, i) => (<FontAwesome key={i} name={i < rating ? 'star' : 'star-o'} size={20} style={{ marginRight: 4 }} />))}
    </View>
  );

  // ------------------------------------------------------ JSX
  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Mi Perfil</Text>
        <View style={styles.profileHeader}>
          <Image source={{ uri: profileData?.photo }} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{profileData?.name} {profileData?.last_name}</Text>
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Ionicons name="pencil" size={26} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        {renderStars(profileData?.calificacion ?? 0)}
        <Text style={styles.userTypeLabel}>Tipo de Usuario:</Text>
        <View style={styles.tagContainer}>
          <View style={styles.tag}><Text style={styles.tagText}>{userType}</Text></View>
          <View style={styles.tag}><Text style={styles.tagText}>{locationName || '...'}</Text><Ionicons name="location-outline" size={16} style={{ marginLeft: 4 }} /></View>
        </View>
        <View style={styles.reviewBox}>
          <Text style={styles.reviewTitle}>Reseñas de otros usuarios</Text>
          {reviews.length ? reviews.map(r => (
            <View key={r.id} style={styles.reviewItem}>
              <Image source={{ uri: r.photo }} style={styles.reviewPhoto} />
              <View style={styles.reviewTextContainer}>
                <Text style={styles.reviewName}>{r.name}</Text>
                <Text style={styles.reviewComment}>{r.comment}</Text>
              </View>
            </View>
          )) : <Text style={styles.tag}>Aún no hay reseñas.</Text>}
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal visible={isEditing} animationType="slide" transparent onRequestClose={() => setIsEditing(false)}>
        <TouchableOpacity style={editStyles.backdrop} activeOpacity={1} onPress={() => setIsEditing(false)} />
        <View style={editStyles.halfModalWrapper}>
          <ScrollView contentContainerStyle={editStyles.modalContainer}>
            <Text style={editStyles.modalTitle}>Editar Perfil</Text>
            <View style={editStyles.photoContainer}>
              <Image source={{ uri: profileData?.photo }} style={editStyles.photo} />
              <TouchableOpacity style={editStyles.uploadIcon} onPress={pickImage}>
                <Ionicons name="cloud-upload-outline" size={24} />
              </TouchableOpacity>
              <Text style={editStyles.photoLabel}>Cambia tu foto</Text>
            </View>
            <View style={editStyles.row1}><Text style={styles.name}>{profileData?.name} {profileData?.last_name}</Text></View>
            <TextInput placeholder="Descripción" style={editStyles.input} multiline numberOfLines={3} value={profileData?.description} onChangeText={txt => setProfileData(prev => prev ? { ...prev, description: txt } : prev)} />
            <Text style={editStyles.selectLabel}>Tipo de Usuario</Text>
            <View style={editStyles.select}><Picker selectedValue={userType} onValueChange={val => setUserType(val)}><Picker.Item label="Quiero..." value="" /><Picker.Item label="Encontrar servicios" value="Cliente" /><Picker.Item label="Ofrecer servicios" value="Empleado" /></Picker></View>
            <Text style={editStyles.selectLabel}>Ubicación</Text>
            <View style={editStyles.select}><Picker selectedValue={profileData?.id_location} onValueChange={val => setProfileData(prev => prev ? { ...prev, id_location: val } : prev)}>{locations.map(loc => <Picker.Item key={loc.id} label={loc.name} value={loc.id} />)}</Picker></View>
            <TouchableOpacity style={editStyles.button} onPress={saveProfile}><Text style={editStyles.buttonText}>Aceptar</Text></TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;
