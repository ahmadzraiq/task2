import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
export default function About() {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>{t('text')}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  Text: {
    fontWeight: 'bold',
  },
});
