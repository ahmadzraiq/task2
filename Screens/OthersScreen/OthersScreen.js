import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
export default function OthersScreen({navigation}) {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Button title={t('about')} onPress={() => navigation.push('About')} />
      <Button title={t('language')} onPress={() => navigation.push('Language')} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
