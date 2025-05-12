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
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { styles, editStyles } from '@/styles/tabs.profile'; 
import { Picker } from '@react-native-picker/picker';   
import AsyncStorage from '@react-native-async-storage/async-storage';
import { hoverGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/hoverGesture';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';

type Review = {
  id: number;
  name: string;
  comment: string;
  rating: number;
  photo: string;
};

type ProfileData = {
  id: number,
  name: string;
  last_name: string;
  description: string;
  rating: number;
  photo: string;
  location: string;
  user_type: string;
};

type Location = {
  id: number;
  name: string;
};


const reviews: Review[] = [
  {
    id: 1,
    name: 'Cliente 1',
    comment: 'Muy buen trabajo, rápido y profesional.',
    rating: 5,
    photo: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: 2,
    name: 'Cliente 2',
    comment: 'Excelente servicio. Lo recomiendo mucho.',
    rating: 4,
    photo: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: 3,
    name: 'Cliente 3',
    comment: 'Muy amable y puntual.',
    rating: 5,
    photo: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
];

const Profile = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userLocation, setUserLocation] = useState<string>('');

  useEffect(() => {
    const getProfile = async () => {
      const json = await AsyncStorage.getItem('currentProfile');
      if (json) {
        setProfileData(JSON.parse(json));
      }
    };
    getProfile();
  }, []);

  const handleSave = async () => {

  };
  

  
  
  const [locations, setLocations] = useState<Location[]>([]);
  useEffect(() => {
      const fetchLocations = async () => {
        try {
          const response = await fetch('http://192.168.1.10:8000/api/locations');
          const data = await response.json();
          setLocations(data);
        } catch (error) {
          console.error('Error al obtener ubicaciones:', error);
          Alert.alert('Error', 'No se pudieron cargar las ubicaciones.');
        }
      };
    
      fetchLocations();
    }, []);


  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FontAwesome
        key={i}
        name={i < rating ? 'star' : 'star-o'}
        size={25}
        color="#5637DD"
        style={{ marginRight: 4 }}
      />
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>

      <View style={styles.profileHeader}>
        <Image source={{ uri: profileData?.photo }} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{profileData?.name}</Text>
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Ionicons name="pencil" size={26} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.starsContainer}>
        {renderStars(profileData?.rating ?? 0)}
      </View>

      <Text style={styles.userTypeLabel}>Tipo de Usuario:</Text>

      <View style={styles.tagContainer}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{userType}</Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagText}>Morelia</Text>
          <Ionicons name="location-outline" size={16} color="#5637DD" style={{ marginLeft: 4 }} />
        </View>
      </View>

      <View style={styles.reviewBox}>
        <Text style={styles.reviewTitle}>Reseñas de otros usuarios</Text>
        {reviews.map((r) => (
          <View key={r.id} style={styles.reviewItem}>
            <Image source={{ uri: r.photo }} style={styles.reviewPhoto} />
            <View style={{ flex: 1 }}>
              <Text style={styles.reviewName}>{r.name}</Text>
              <Text style={styles.reviewComment}>{r.comment}</Text>
            </View>
          </View>
        ))}
      </View>

      <Modal visible={isEditing} animationType="slide">
        <ScrollView contentContainerStyle={editStyles.modalContainer}>
          <View style={editStyles.modalHeader}>
            <TouchableOpacity onPress={() => setIsEditing(false)}>
              <Ionicons name="arrow-back-outline" size={24} style={editStyles.modalBackButton}/>
            </TouchableOpacity>
            <Text style={editStyles.modalTitle}>Editar Perfil</Text>
          </View>

          <View style={editStyles.photoContainer}>
            <Image source={{ uri: profileData?.photo }} style={editStyles.photo} />
            <TouchableOpacity style={editStyles.uploadIcon}>
              <Ionicons name="cloud-upload-outline" size={24} color="black" />
            </TouchableOpacity>
            <Text style={editStyles.photoLabel}>Cambia tu foto</Text>
          </View>

          <View style={editStyles.row}>
            <TextInput
              placeholder="Nombre"
              style={editStyles.inputHalf}
              value={profileData?.name}
              onChangeText={(text) =>
                setProfileData((prev) => (prev ? { ...prev, name: text } : null))
              }
            />
            <TextInput
              placeholder="Apellido"
              style={editStyles.inputHalf}
              value={profileData?.last_name}
              onChangeText={(text) =>
                setProfileData((prev) => (prev ? { ...prev, last_name: text } : null))
              }
            />
          </View>

          <TextInput
            placeholder="Descripción"
            style={editStyles.input}
            multiline
            numberOfLines={3}
            value={profileData?.description}
            onChangeText={(text) =>
              setProfileData((prev) => (prev ? { ...prev, description: text } : null))
            }
          />
          <Text style={editStyles.selectLabel}>Tipo de Usuario</Text>
            <View style={editStyles.select}>
              <Picker
                selectedValue={profileData?.user_type}
                style={{ height: 50 }}
                dropdownIconColor="#5637DD"
              >
                <Picker.Item label="Quiero..." value="" />
                <Picker.Item label="Encontrar servicios de limpieza" value="CLIENT" />
                <Picker.Item label="Ofrecer servicios de limpieza" value="EMPLOYEE" />
                </Picker>
            </View>


            <Text style={editStyles.selectLabel}>Ubicación</Text>
              <View style={editStyles.select}>
                <Picker
                  selectedValue={profileData?.location}
                  onValueChange={(value) =>
                    setProfileData((prev) => (prev ? { ...prev, location: value } : null))
                  }
                  style={{ height: 50 }}
                  dropdownIconColor="#5637DD"
                >
                  <Picker.Item label="Selecciona tu ciudad" value="" />
                  {locations.map((loc) => (
                    <Picker.Item key={loc.id} label={loc.name} value={loc.name} />
                  ))}
                </Picker>
              </View>


          <TouchableOpacity style={editStyles.button} onPress={handleSave}>
            <Text style={editStyles.buttonText}>Aceptar</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </ScrollView>
  );
};

export default Profile;