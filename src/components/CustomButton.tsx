import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

export interface CustomButtonProps {
  children: React.ReactNode;
  onPress?: (() => void) | null;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  size?: 'normal' | 'small';
}

export const CustomButton = ({
  children,
  onPress,
  disabled = false,
  style,
  textStyle,
  size = 'normal',
}: CustomButtonProps) => {
  return (
    <Pressable
      onPress={onPress ?? undefined}
      disabled={disabled}
      style={({ pressed }) => [
        styles.buttonBase,
        size === 'small' ? styles.buttonSmall : styles.buttonNormal,
        disabled ? styles.buttonDisabled : styles.buttonEnabled,
        pressed && !disabled && styles.buttonPressed,
        style,
      ]}
    >
      <Text
        style={[
          styles.textBase,
          size === 'small' ? styles.textSmall : styles.textNormal,
          disabled ? styles.textDisabled : styles.textEnabled,
          textStyle,
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonNormal: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonSmall: {
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  buttonEnabled: {
    backgroundColor: '#BFDBFE', // bg-blue-200
  },
  buttonDisabled: {
    backgroundColor: '#E5E7EB', // bg-gray-200
  },
  buttonPressed: {
    opacity: 0.8,
  },
  textBase: {
    fontWeight: '600',
    textAlign: 'center',
  },
  textNormal: {
    fontSize: 16,
  },
  textSmall: {
    fontSize: 14,
  },
  textEnabled: {
    color: '#2563EB', // text-blue-600
  },
  textDisabled: {
    color: '#9CA3AF', // text-gray-400
  },
});

export default CustomButton;

