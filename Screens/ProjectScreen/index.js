import React from 'react';
import {Button, View, StyleSheet, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import ListProjects from './ListProjects';
import addProject from './addProject';
import addTask from './addTask';
import ProjectTasks from './ProjectTasks';
import detailsTask from './detailsTask';
import {useTranslation} from 'react-i18next';
export default function ProjectScreen({navigation}) {
  const projectStack = createStackNavigator();
  const {t} = useTranslation();
  const LogoTitle = ({navigation, id}) => {
    return (
      <View style={styles.cHeaderSyle}>
        <Text style={styles.titleStyle}>{t('projectTasks')}</Text>
        <View style={styles.headerStyle}>
          <Button
            style={styles.button}
            onPress={() => navigation.push('addTask', {id})}
            title={t('add')}
          />
        </View>
      </View>
    );
  };
  return (
    <projectStack.Navigator
      screenOptions={({route}) => ({
        headerShown: route.name == 'ListProjects' ? false : true,
      })}>
      <projectStack.Screen name="ListProjects" component={ListProjects} />
      <projectStack.Screen name="addProject" component={addProject} />
      <projectStack.Screen name="addTask" component={addTask} />
      <projectStack.Screen
        name="detailsTask"
        component={detailsTask}
        options={{headerTitle: t('detailsTask')}}
      />
      <projectStack.Screen
        name="ProjectTasks"
        component={ProjectTasks}
        options={({navigation, route}) => ({
          headerTitle: (props) => (
            <LogoTitle
              {...props}
              navigation={navigation}
              id={route.params.id}
            />
          ),
        })}
      />
    </projectStack.Navigator>
  );
}
const styles = StyleSheet.create({
  cHeaderSyle: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headerStyle: {
    width: '20%',
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
