import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { styles } from '@/styles/tabs.home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router, useFocusEffect, useRouter } from 'expo-router';


type EmployeeCardProps = {
  id?: number;
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

const handleCardPress = async (employee: any) => {
  try {
    await AsyncStorage.setItem('selectedProfile', JSON.stringify(employee));
    router.push({
      pathname: '/user/[id]',
      params: { id: employee.id.toString() },
    });
  } catch (error) {
    console.error('Error storing employee data:', error);
  }
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
      const response = await axios.get('http://192.168.1.154:8000/api/employees', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const formatted = response.data.map((user: any) => ({
        id:user.id,
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
        const res = await fetch('http://192.168.1.154:8000/api/v1/auth/me', {
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
        
        const profileObj = {
          name: `${data.user.profile.name} ${data.user.profile.last_name}`,
          description: data.user.profile.description,
          rating: data.user.profile.calification ?? 0,
          photo: data.user.profile.photo,
          user_type: data.user.profile.location,
          id: data.user.profile.id, 
        };
        
        await AsyncStorage.setItem('currentProfile', JSON.stringify(profileObj));
        
        
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

  useFocusEffect(
    useCallback(() => {
      fetchEmployees();
    }, [])
  );



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
        {filteredEmployees.map((employee, index) => {
          const { id, ...cardProps } = employee;
            return (
             <TouchableOpacity
              key={index}
              onPress={() => handleCardPress(employee)}
             >
                <EmployeeCard {...cardProps} />
             </TouchableOpacity>
            );
          })}
      </ScrollView>

    </View>
  );
};

export default Home;
