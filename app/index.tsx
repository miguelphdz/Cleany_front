import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, router } from "expo-router";
import { useEffect } from "react";

export default function index() {
    useEffect(() => {
        const checkToken = async () => {
          const token = await AsyncStorage.getItem('token');
          if (token) {
            router.replace('/(tabs)');
          } else {
            router.replace('/(auth)/login');
          }
        };
    
        checkToken();
      }, []);
    
      return null;
    }