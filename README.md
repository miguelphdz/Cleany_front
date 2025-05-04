npm i

npm install expo

npm i --save-dev @babel/types

npm install @react-native-async-storage/async-storage

npm i nativewind

npx expo install expo-image-picker

#si no se puede ejecutar: npx expo install --fix

useEffect(() => {
  const clearStorage = async () => {
    await AsyncStorage.clear();
    console.log('AsyncStorage limpiado');
  };

  clearStorage();
}, []);