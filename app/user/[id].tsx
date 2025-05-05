import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { styles } from '@/styles/user.profileScreen'
import { FlatList } from 'react-native-gesture-handler'

const reasons = [
    'Lenguaje ofensivo',
    'Acoso',
    'Contenido inapropiado',
    'Fraude o estafa',
    'Violencia o agresión física',
    'Spam',
];

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
    const [showReportModal, setShowReportModal] = useState(false)
    const [selectedReason, setSelectedReason] = useState<string | null>(null)

  
    useEffect(() => {
        const loadProfileAndReviews = async () => {
            const json = await AsyncStorage.getItem('selectedProfile');
            if (json) {
                const parsed = JSON.parse(json);
                setProfile(parsed);

                try {
                    const res = await fetch(`http://192.168.1.134:8000/api/references/${parsed.id}`);
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

    const openReport = () => {
        setSelectedReason(null);
        setShowReportModal(true);
      };
    
      const sendReport = async () => {
        try {
            const currentUserJson = await AsyncStorage.getItem('currentProfile');
            const currentUser = currentUserJson ? JSON.parse(currentUserJson) : null;
            console.log(selectedReason, profile, currentUser)
          if (!selectedReason || !profile || !currentUser) {
            Alert.alert('Error', 'Faltan datos para enviar el reporte');
            return;
          }
      
          const res = await fetch('http://192.168.1.134:8000/api/reports', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_profile: profile.id,
                id_user: currentUser.id,
                content: selectedReason,
            }),
          });
      
          const data = await res.json();
      
          if (res.ok) {
            setShowReportModal(false);
            Alert.alert('Reporte enviado', 'El usuario ha sido reportado correctamente.');
          } else {
            console.error('Error al enviar el reporte:', data);
            Alert.alert('Error', 'Hubo un problema al enviar el reporte.');
          }
        } catch (error) {
          console.error('Error al enviar el reporte:', error);
          Alert.alert('Error', 'No se pudo conectar al servidor.');
        }
      };   

    const handleSendExperience = async () => {
        if (!experience.trim()) return;
        try {
            const currentUserJson = await AsyncStorage.getItem('currentProfile');
            console.log('currentProfile desde AsyncStorage:', currentUserJson);
            const currentUser = currentUserJson ? JSON.parse(currentUserJson) : null;

            if (!currentUser || !profile) return;

            const res = await fetch(`http://192.168.1.134:8000/api/references`, {
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

                const refreshed = await fetch(`http://192.168.1.134:8000/api/references/${profile.id}`);
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
    <>
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

        <TouchableOpacity
            style={styles.reportButton}
            onPress={openReport}
          >
            <Ionicons name="alert-circle-outline" size={28} color="#E53935" />
          </TouchableOpacity>

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

          <Modal
          visible={showReportModal}
          animationType="slide"
          transparent
          onRequestClose={() => setShowReportModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Selecciona un motivo</Text>
              <FlatList
                data={reasons}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.reasonItem,
                      item === selectedReason && styles.reasonItemSelected
                    ]}
                    onPress={() => setSelectedReason(item)}
                  >
                    <Text
                      style={[
                        styles.reasonText,
                        item === selectedReason && styles.reasonTextSelected
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  !selectedReason && styles.modalButtonDisabled
                ]}
                onPress={sendReport}
                disabled={!selectedReason}
              >
                <Text style={styles.modalButtonText}>Enviar reporte</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalClose}
                onPress={() => setShowReportModal(false)}
              >
                <Text style={styles.modalCloseText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        </>
  )
}