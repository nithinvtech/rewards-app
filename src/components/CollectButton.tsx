import React, { useState } from 'react';
import {
  Pressable,
  Text,
  Animated,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, Typography } from '../theme';

interface CollectButtonProps {
  onPress?: () => void;
  label?: string;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const CollectButton: React.FC<CollectButtonProps> = ({
  onPress,
  label,
  buttonStyle,
  textStyle,
  disabled = false,
}) => {
  const scale = useState(new Animated.Value(1))[0];

  const handlePressIn = () => {
    if (disabled) return;
    Animated.spring(scale, {
      toValue: 0.92,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={disabled ? undefined : onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.button, disabled && styles.disabledButton, buttonStyle]}
        android_ripple={{ color: Colors.ripple }}
      >
        <Text style={[styles.buttonText, textStyle]}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
};

export default CollectButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    margin: 12,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: Typography.body,
    fontWeight: '600',
    color: Colors.cardBackground,
  },
});
