import React from 'react';
import {View, Button, Text, StyleSheet, I18nManager} from 'react-native';
import {useTranslation} from 'react-i18next';
import RNRestart from 'react-native-restart';

export default function Language() {
  const {t, i18n} = useTranslation();
  const handlePress = (lang) => {
    i18n.changeLanguage(lang).then(() => {
      I18nManager.forceRTL(lang == 'ar');
      RNRestart.Restart();
    });
  };
  return (
    <View style={styles.container}>
      <View style={{height: '10%', width: 100}}>
        <Button title="EN" onPress={() => handlePress('en')} />
      </View>
      <View style={{height: '10%', width: 100}}>
        <Button title="AR" onPress={() => handlePress('ar')} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    fontWeight: 'bold',
  },
});
