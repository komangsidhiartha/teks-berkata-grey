import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLanguage } from '@/context/LanguageContext';
import { CustomButton } from './CustomButton';

export const Header = () => {
  const { language, setLanguage } = useLanguage();

  const onPressLanguage = () => {
    setLanguage(language === 'en-US' ? 'id-ID' : 'en-US');
  };

  const title = language === 'en-US' ? 'EN' : 'ID';

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>TeksBerkata</Text>
        <Text style={styles.subtitle}>
          {"Offline text-to-speech using your device's voices."}
        </Text>
      </View>
      <CustomButton size="small" onPress={onPressLanguage}>
        {title}
      </CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 4,
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6B7280', // text-gray-500
  },
  subtitle: {
    fontSize: 12,
    color: '#9CA3AF', // text-gray-400
    marginTop: 2,
  },
});

export default Header;

