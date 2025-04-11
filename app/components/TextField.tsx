import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";

interface TextFieldProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    iconName: string;
    secureTextEntry?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
    placeholder,
    value,
    onChangeText,
    iconName,
    secureTextEntry = false,
}) => {
    return (
      <View style={styles.container}>
        <Ionicons name={iconName as any} size={20} color={COLORS.black} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />
      </View>
    );
  };

  export default TextField;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
      borderWidth: 2,
      borderColor: COLORS.ligthblue,
      borderRadius: 8,
      paddingHorizontal: 10,
      backgroundColor: '#FFF',
    },
    icon: {
      marginRight: 8,
    },
    input: {
      flex: 1,
      height: 50,
      fontSize: 16,
      color: '#333',
    },
  });