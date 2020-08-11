import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-datepicker';
import {useTranslation} from 'react-i18next';

import {ProjectsContext} from '../../context';

export default function ProjectTasks({route, navigation}) {
  const {t} = useTranslation();

  const {state, dispatch} = React.useContext(ProjectsContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = state.find((p) => p.id == route.params.id).tasks;
    setTasks(getTasks);
  }, [state]);

  return (
    <>
      <ScrollView style={styles.listView}>
        {tasks &&
          tasks.map((task, index) => (
            <TouchableOpacity
              key={index}
              style={styles.listView}
              onPress={() => navigation.push('detailsTask', {task})}
              onLongPress={() => {
                setTitle(task.title);
                setDate(task.date);
                setDesc(task.desc);
                setTask(task);
                setModalVisible(true);
              }}>
              <View style={styles.containerTask}>
                <View style={{width: '75%'}}>
                  <Text style={styles.projectName}>{task.title}</Text>
                </View>
                <CheckBox
                  disabled={false}
                  value={task.checked}
                  onValueChange={(newValue) =>
                    dispatch({
                      type: 'changeCheckBox',
                      payload: {
                        value: newValue,
                        projectId: route.params.id,
                        taskId: task.id,
                      },
                    })
                  }
                />
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.inputText}
              value={title}
              onChangeText={(e) => {
                setTitle(e);
              }}
            />
            <TextInput
              style={styles.inputText}
              value={desc}
              onChangeText={(e) => {
                setDesc(e);
              }}
            />
            <DatePicker
              style={{width: 200}}
              date={date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="2016-05-01"
              maxDate="2016-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 10,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                  marginTop: 10,
                },
              }}
              onDateChange={(date) => {
                setDate(date);
              }}
            />
            <View style={{...styles.openButton, backgroundColor: '#2196F3'}}>
              <Text
                style={styles.textStyle}
                onPress={() => {
                  dispatch({
                    type: 'editTask',
                    payload: {
                      id: task.id,
                      projectId: route.params.id,
                      task: {...task, desc, title, date},
                    },
                  });
                  setModalVisible(!modalVisible);
                  setTitle('');
                  setDesc('');
                }}>
                {t('edit')}
              </Text>
              <Text
                style={styles.textStyle}
                onPress={() => {
                  dispatch({
                    type: 'deleteTask',
                    payload: {id: task.id, projectId: route.params.id},
                  });
                  setModalVisible(!modalVisible);
                  setTitle('');
                  setDesc('');
                }}>
                {t('delete')}
              </Text>
              <Text
                style={styles.textStyle}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setTitle('');
                  setDesc('');
                  setDate('');
                }}>
                {t('close')}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  listView: {
    flex: 1,
  },
  containerTask: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectName: {
    paddingHorizontal: '5%',
    marginVertical: '3%',
    fontSize: 20,
    fontWeight: 'bold',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  inputText: {
    width: '75%',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '75%',
    height: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'space-around',
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    flexDirection: 'row',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
