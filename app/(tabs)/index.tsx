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
  const [userLocation, setUserLocation] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState<EmployeeCardProps[]>([]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);

    if (text === '') {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter((employee) =>
        employee.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredEmployees(filtered);
      console.log("holahola")
    }
  };

  const fetchEmployees = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); 
      const response = await axios.get('http://10.31.8.23:8000/api/employees', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const formatted = response.data.map((user: any) => ({
        name: `${user.profile.name} ${user.profile.last_name}`,
        description: user.profile.description,
        rating: user.profile.calification ?? 0,
        photo: user.profile.photo,
      }));
      setEmployees(formatted);
      setFilteredEmployees(formatted); 
    } catch (error) {
      console.error('Error al obtener empleados:', error);
    }
  };
  useEffect(() => {
    const validateToken = async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
  
      const token = await AsyncStorage.getItem('token');
      console.log('TOKEN EN HOME:', token);
  
      if (!token) {
        router.replace('/(auth)/login');
        return;
      }
  
      try {
        const res = await fetch('http://10.31.8.23:8000/api/v1/auth/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
           
        const data = await res.json();
        console.log('DATA DEL USUARIO:', data);
        
        if (!res.ok) throw new Error('Token inválido');
        
        setUserLocation(data.user?.profile?.location?.name ?? 'Ubicación desconocida');
        
        await AsyncStorage.setItem('profileData', JSON.stringify({
          name: `${data.user.profile.name} ${data.user.profile.last_name}`,
          description: data.user.profile.description,
          rating: data.user.profile.calification ?? 0,
          photo: data.user.profile.photo,
          user_type: data.user.profile.location,
        }));
        
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
    handleSearch(searchQuery);
  }, [employees]);

    

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (

    <View style={styles.container}>
   
    <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar"
          placeholderTextColor="#000"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity>
          <Ionicons name="search" size={20} color="black" />
        </TouchableOpacity>
      </View>

   
      <View style={styles.locationWrapper}>
        <Text style={styles.locationTitle}>Near you</Text>
        <View style={styles.locationBadge}>
        <Text style={styles.locationText}>{userLocation}</Text>
        <Ionicons name="location-sharp" size={16} color="#5630D4" />
        </View>
      </View>
      

      {/* Employee list */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredEmployees.map((employee, index) => (
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
