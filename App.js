import React, {useReducer, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AsyncStorage} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProjectScreen from './Screens/ProjectScreen/index';
import TasksScreen from './Screens/TasksScreen/Index';
import OthersScreen from './Screens/OthersScreen/Index';
import {ProjectsContext} from './context';
import reducer from './reducer';
import {initialState} from './initialState';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome5';
import './i18n/index';
export default function App() {

  const {t} = useTranslation();
  const Tabs = createBottomTabNavigator();
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (state.length == 0) {
      AsyncStorage.getItem('state', (err, data) => {
        if (data) {
          dispatch({type: 'setState', payload: JSON.parse(data)});
        }
      });
    }
  }, []);
  return (
    <ProjectsContext.Provider value={{state, dispatch}}>
      <NavigationContainer>
        <Tabs.Navigator>
          <Tabs.Screen
            name="Project"
            component={ProjectScreen}
            options={{
              tabBarIcon: ({size, color}) => (
                <Icon name="user-alt" size={size} color={color} />
              ),
              title: t('projects'),
            }}
          />
          <Tabs.Screen
            name="Tasks"
            component={TasksScreen}
            options={{
              tabBarIcon: ({size, color}) => (
                <Icon name="tasks" size={size} color={color} />
              ),
              title: t('tasks'),
            }}
          />
          <Tabs.Screen
            name="Others"
            component={OthersScreen}
            options={{
              tabBarIcon: ({size, color}) => (
                <Icon name="hashtag" size={size} color={color} />
              ),
              title: t('others'),
            }}
          />
        </Tabs.Navigator>
      </NavigationContainer>
    </ProjectsContext.Provider>
  );
}
