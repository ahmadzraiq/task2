import React from 'react';
import {View, Text, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import OthersScreen from './OthersScreen';
import About from './About';
import Language from './Language';
import {useTranslation} from 'react-i18next';

export default function Index() {
  const othersStack = createStackNavigator();
  const {t} = useTranslation();

  return (
    <othersStack.Navigator>
      <othersStack.Screen
        name="Others"
        component={OthersScreen}
        options={{headerTitle: t('others')}}
      />
      <othersStack.Screen
        name="About"
        component={About}
        options={{headerTitle: t('about')}}
      />
      <othersStack.Screen
        name="Language"
        component={Language}
        options={{headerTitle: t('language')}}
      />
    </othersStack.Navigator>
  );
}
