import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { styles, editStyles } from '@/styles/tabs.profile'; 
import { Picker } from '@react-native-picker/picker';   
import AsyncStorage from '@react-native-async-storage/async-storage';
import { hoverGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/hoverGesture';

type Review = {
  id: number;
  name: string;
  comment: string;
  rating: number;
  photo: string;
};

type ProfileData = {
  name: string;
  lastname: string;
  description: string;
  rating: number;
  photo: string;
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
  const [userType, setUserType] = useState('Empleado');
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      const json = await AsyncStorage.getItem('profileData');
      if (json) {
        setProfileData(JSON.parse(json));
      }
    };
    getProfile();
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
          <Text style={editStyles.modalTitle}>Editar Perfil</Text>

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
              value={profileData?.lastname}
              onChangeText={(text) =>
                setProfileData((prev) => (prev ? { ...prev, lastname: text } : null))
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
                selectedValue={userType}
                onValueChange={(value) => setUserType(value)}
                style={{ height: 50 }}
                dropdownIconColor="#5637DD"
              >
                <Picker.Item label="Quiero..." value="" />
                <Picker.Item label="Encontrar servicios de limpieza" value="cliente" />
                <Picker.Item label="Ofrecer servicios de limpieza" value="empleado" />
                </Picker>
            </View>


          <Text style={editStyles.selectLabel}>Ubicación</Text>
          <View style={editStyles.select}>
            <Text>Morelia</Text>
          </View>

          <TouchableOpacity style={editStyles.button} onPress={() => setIsEditing(false)}>
            <Text style={editStyles.buttonText}>Aceptar</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </ScrollView>
  );
};

export default Profile;
