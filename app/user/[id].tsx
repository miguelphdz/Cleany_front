import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { styles } from '@/styles/user.profileScreen'

type Profile = {
    id: number;
    name: string;
    description: string;
    rating: number;
    photo: string;
};

type Review = {
    id: number
    name: string
    comment: string
    rating: number
    photo: string
}


export default function UserProfile() {

    const [profile, setProfile] = useState<Profile | null>(null)
    const [message, setMessage] = useState('')
    const [experience, setExperience] = useState('')
    const [reviews, setReviews] = useState<Review[]>([])

  
    useEffect(() => {
        const loadProfileAndReviews = async () => {
            const json = await AsyncStorage.getItem('selectedProfile');
            if (json) {
                const parsed = JSON.parse(json);
                setProfile(parsed);

                try {
                    const res = await fetch(`http://192.168.1.23:8000/api/references/${parsed.id}`);
                    const data = await res.json();
                    setReviews(data);
                } catch (error) {
                    console.error('error cargando reviews: ', error);
                }
            }
        }
        
        loadProfileAndReviews();
      }, []);
    
      if (!profile) {
        return (
          <View style={styles.loadingContainer}>
            <Text>Cargando perfil…</Text>
          </View>
        )
    }

    const handleSendExperience = async () => {
        if (!experience.trim()) return;
        try {
            const currentUserJson = await AsyncStorage.getItem('currentProfile');
            const currentUser = currentUserJson ? JSON.parse(currentUserJson) : null;

            if (!currentUser || !profile) return;

            const res = await fetch(`http://192.168.1.23:8000/api/references`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_profile: profile.id,
                    id_user: currentUser.id,
                    content: experience,
                }),
            });
            
            const data = await res.json();

            if (res.ok) {
                setExperience('');

                const refreshed = await fetch(`http://192.168.1.23:8000/api/references/${profile.id}`);
                const updateReviews = await refreshed.json();
                setReviews(updateReviews);
            } else {
                console.error('Error al enviar experiencias: ', data);
            }
        } catch (err) {
            console.error('Error al enviar experiencias: ', err);
        }
    };

  return (
<ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: profile.photo }} style={styles.avatar} />
        <Text style={styles.username}>{profile.name}</Text>
        <View style={styles.stars}>
          {[...Array(5)].map((_, i) => (
            <FontAwesome
              key={i}
              name={i < profile.rating ? 'star' : 'star-o'}
              size={20}
              color="#5630D4"
              style={{ marginHorizontal: 2 }}
            />
          ))}
        </View>
      </View>

      {/* Descripción */}
      <Text style={styles.description}>{profile.description}</Text>

      {/* Enviar un mensaje */}
      <Text style={styles.sectionTitle}>¡Envía un mensaje!</Text>
      <View style={styles.messageContainer}>
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={24}
          color="#5630D4"
          style={{ marginRight: 8 }}
        />
        <TextInput
          style={styles.messageInput}
          placeholder="Hola, quisiera contratarte"
          placeholderTextColor="#555"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Reseñas */}
      <Text style={styles.sectionTitle}>Reseñas de otros usuarios</Text>
      {reviews.map(r => (
  <View key={r.id} style={styles.reviewCard}>
    <View style={styles.reviewHeader}>
      <Image source={{ uri: r.photo }} style={styles.reviewAvatar} />
      <Text style={styles.reviewerName}>{r.name}</Text>
    </View>
    <Text style={styles.reviewContent}>{r.comment}</Text>
  </View>
))}

      {/* Compartir experiencia */}
      <Text style={styles.sectionTitle}>Comparte tu experiencia</Text>
      <TextInput
        style={styles.experienceInput}
        placeholder="Mi experiencia con este usuario fue..."
        placeholderTextColor="#555"
        multiline
        numberOfLines={4}
        value={experience}
        onChangeText={setExperience}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSendExperience}>
        <Text style={styles.submitButtonText}>Enviar experiencia</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}