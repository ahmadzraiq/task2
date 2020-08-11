import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {ProjectsContext} from '../../context';

export default function TasksScreen() {
  const {state, dispatch} = React.useContext(ProjectsContext);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    let allTasks = [];
    state.map((project) => {
      allTasks = [...allTasks, ...project.tasks];
    });
    setTasks(allTasks);
  }, []);
  return (
    <ScrollView style={styles.container}>
      {tasks.map((task, index) => (
        <View style={styles.task} key={index}>
          <Text style={styles.text}>{task.title}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  task: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30,
  },
});
