import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {ProjectsContext} from '../../context';
import CheckBox from '@react-native-community/checkbox';

export default function TasksScreen() {
  const {state, dispatch} = React.useContext(ProjectsContext);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    let allTasks = [];
    state.map((project) => {
      allTasks = [...allTasks, ...project.tasks];
    });
    setTasks(allTasks);
  }, [state]);
  return (
    <ScrollView style={styles.container}>
      {tasks.map((task, index) => (
        <View style={styles.task} key={index}>
          <TouchableOpacity style={{flex:1}}>
            <Text style={styles.text}>{task.title}</Text>
          </TouchableOpacity>
          <CheckBox disabled={true} value={task.checked} />
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
    marginVertical: 10,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30,
  },
});
