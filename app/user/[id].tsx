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

const mockReviews: Review[] = [
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
  ]

export default function UserProfile() {

    const [profile, setProfile] = useState<Profile | null>(null)
    const [message, setMessage] = useState('')
    const [experience, setExperience] = useState('')
  
    useEffect(() => {
        AsyncStorage.getItem('selectedProfile').then(json => {
          if (json) setProfile(JSON.parse(json))
        })
      }, [])
    
      if (!profile) {
        return (
          <View style={styles.loadingContainer}>
            <Text>Cargando perfil…</Text>
          </View>
        )
      }

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
      {mockReviews.map(r => (
        <View key={r.id} style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <Image source={{ uri: r.photo }} style={styles.reviewAvatar} />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={styles.reviewerName}>{r.name}</Text>
              <View style={styles.reviewStars}>
                {[...Array(5)].map((_, i) => (
                  <FontAwesome
                    key={i}
                    name={i < r.rating ? 'star' : 'star-o'}
                    size={14}
                    color="#5630D4"
                    style={{ marginRight: 1 }}
                  />
                ))}
              </View>
            </View>
          </View>
          <Text style={styles.reviewText}>{r.comment}</Text>
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
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Enviar experiencia</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}