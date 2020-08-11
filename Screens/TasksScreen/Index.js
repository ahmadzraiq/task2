import React from 'react';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import TasksScreen from './TasksScreen';
import {useTranslation} from 'react-i18next';

export default function Index() {
  const TasksStack = createStackNavigator();
  const {t} = useTranslation();

  return (
    <TasksStack.Navigator>
      <TasksStack.Screen
        name="Tasks"
        component={TasksScreen}
        options={{headerTitle: t('tasks')}}
      />
    </TasksStack.Navigator>
  );
}
