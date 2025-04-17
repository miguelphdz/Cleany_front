import React from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { styles } from '@/styles/tabs.home';

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
  return (
    <View style={styles.container}>
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
        <EmployeeCard
          name="Oliver Mondragon"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry..."
          rating={4}
          photo="https://randomuser.me/api/portraits/men/1.jpg"
        />
        <EmployeeCard
          name="Oliver Mondragon"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry..."
          rating={4}
          photo="https://randomuser.me/api/portraits/men/2.jpg"
        />
        <EmployeeCard
          name="Oliver Mondragon"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry..."
          rating={4}
          photo="https://randomuser.me/api/portraits/men/3.jpg"
        />
      </ScrollView>
    </View>
  );
};

export default Home;
