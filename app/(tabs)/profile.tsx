import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { styles } from '@/styles/tabs.profile';
import AsyncStorage from '@react-native-async-storage/async-storage';


type Review = {
  id: number;
  name: string;
  comment: string;
  rating: number;
  photo: string;
};

type ProfileData = {
  name: string;
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
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name={i <= rating ? 'star' : 'star-o'}
          size={20}
          color="#5637DD"
          style={{ marginRight: 4 }}
        />
      );
    }
    return stars;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerIcon} />

      <Text style={styles.title}>Mi Perfil</Text>

      <Image source={{ uri: profileData?.photo }} style={styles.profileImage} />

      <Text style={styles.name}>{profileData?.name}</Text>

      {profileData && (
  <View style={styles.starsContainer}>
    {Array.from({ length: 5 }, (_, index) => (
      <FontAwesome
        key={index}
        name={index < profileData.rating ? 'star' : 'star-o'}
        size={20}
        color="#5637DD"
        style={{ marginRight: 4 }}
      />
    ))}
  </View>
)}

      <TouchableOpacity style={styles.locationBox}>
        <Text style={styles.locationText}>Morelia</Text>
        <Ionicons name="location-outline" size={18} color="#5637DD" style={{ marginLeft: 6 }} />
      </TouchableOpacity>

      <Text style={styles.userTypeLabel}>Tipo de Usuario:</Text>

      <View style={styles.userTypeBox}>
        <Text style={styles.userTypeText}>Localatario</Text>
      </View>
    </ScrollView>
  );
};

export default Profile;