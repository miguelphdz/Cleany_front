import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { styles } from '@/styles/tabs.home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';


type EmployeeCardProps = {
  name: string;
  description: string;
  rating: number;
  photo: string;
};

const EmployeeCard = ({ name, description, rating, photo }: EmployeeCardProps) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: photo }}
        style={styles.photo}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <FontAwesome
              key={index}
              name={index < rating ? "star" : "star-o"}
              size={16}
              color="#5630D4"
              style={styles.star}
            />
          ))}
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const Home = () => {

  const [employees, setEmployees] = useState<EmployeeCardProps[]>([]);

  const fetchEmployees = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); // Ajusta si usas otro método
      const response = await axios.get('http://192.168.1.209:8000/api/employees', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Mapear los datos al formato del componente
      const formatted = response.data.map((user: any) => ({
        name: `${user.profile.name} ${user.profile.last_name}`,
        description: user.profile.description,
        rating: user.profile.calification ?? 0,
        photo: user.profile.photo,
      }));

      setEmployees(formatted);
    } catch (error) {
      console.error('Error al obtener empleados:', error);
    }
  };
  useEffect(() => {
    const validateToken = async () => {
      // Espera leve para dar tiempo a AsyncStorage
      await new Promise(resolve => setTimeout(resolve, 300));
  
      const token = await AsyncStorage.getItem('token');
      console.log('TOKEN EN HOME:', token);
  
      if (!token) {
        router.replace('/(auth)/login');
        return;
      }
  
      try {
        const res = await fetch('http://192.168.1.209:8000/api/v1/auth/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
        
        const data = await res.json();
        console.log('Respuesta de /me:', data);

        if (!res.ok) throw new Error('Token inválido');
      } catch (error) {
        console.log('ERROR en validación:', error);
        await AsyncStorage.removeItem('token');
        router.replace('/(auth)/login');
      }
    };
  
    validateToken();
  }, []);  

  const router = useRouter();



  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
      <View style={styles.headerContainer}>
    {/* Search */}
    <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar"
          placeholderTextColor="#000"
          style={styles.searchInput}
        />
        <TouchableOpacity>
          <Ionicons name="search" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Location */}
      <View style={styles.locationWrapper}>
        <Text style={styles.locationTitle}>Near you</Text>
        <View style={styles.locationBadge}>
          <Text style={styles.locationText}>Morelia</Text>
          <Ionicons name="location-sharp" size={16} color="#5630D4" />
        </View>
      </View>

      {/* Employee list */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {employees.map((employee, index) => (
          <EmployeeCard
            key={index}
            name={employee.name}
            description={employee.description}
            rating={employee.rating}
            photo={employee.photo}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;
