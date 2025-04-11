import { COLORS } from '@/constants/theme';
import React, { useRef } from 'react';
import { Animated, Pressable, Text, StyleSheet } from 'react-native';

interface MainButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const MainButton: React.FC<MainButtonProps> = ({ title, onPress, disabled }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
    >
      <Animated.View style={[styles.button, { transform: [{ scale: scaleAnim }] }, disabled && styles.buttonDisabled]}>
        <Text style={styles.buttonText}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.darkblue,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonDisabled: {
    backgroundColor: COLORS.black,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
