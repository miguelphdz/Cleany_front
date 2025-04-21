import React from "react";
import { TextInput } from "react-native";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";

interface TextAreaProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    iconName: keyof typeof Ionicons.glyphMap;
    secureTextEntry?: boolean;
    numberOfLines?: number;
    multiline?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
    placeholder,
    value,
    onChangeText,
    iconName,
    secureTextEntry = false,
    multiline = true,
    numberOfLines = 3
}) => {
    return (
      <View style={styles.container}>
        <Ionicons name={iconName} size={20} color={COLORS.black} style={styles.icon} />
        <TextInput
          style={[styles.input, {height: numberOfLines * 20}]}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
      </View>
    );
};

export default TextArea;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginVertical: 8,
      borderWidth: 2,
      borderColor: COLORS.ligthblue,
      borderRadius: 8,
      paddingHorizontal: 10,
      backgroundColor: '#FFF',
    }, 
    icon: {
      marginRight: 8,
      marginTop: 8,
    },
    input: {
      flex: 1,
      minHeight: 50,
      fontSize: 16,
      color: '#333',
      textAlignVertical: 'top',
      paddingVertical: 10,
    },
});