import React, {useState} from 'react';
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
import {ProjectsContext} from '../../context';
import {useTranslation} from 'react-i18next';

const ListProjects = ({navigation}) => {
  const {state, dispatch} = React.useContext(ProjectsContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [project, setProject] = useState('');
  const [desc, setDesc] = useState('');
  const {t} = useTranslation();

  const handlePress = (id) => {
    navigation.push('ProjectTasks', {id});
  };

  const handleLongPress = (p) => {
    setModalVisible(true);
    setTitle(p.title);
    setDesc(p.desc);
    setProject(p);
  };
  return (
    <View style={styles.container}>
      <View style={styles.addProject}>
        <Text style={styles.TextProject} placeholder="Type a name of project">
          {t('projects')}
        </Text>
        <Button
          title={t('add')}
          onPress={() => navigation.push('addProject')}
        />
      </View>
      <ScrollView style={styles.listView}>
        {state.map((project, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(project.id)}
            onLongPress={() => handleLongPress(project)}>
            <Text style={styles.projectName}>{project.title}</Text>
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
            <View style={{...styles.openButton, backgroundColor: '#2196F3'}}>
              <Text
                style={styles.textStyle}
                onPress={() => {
                  dispatch({
                    type: 'editProject',
                    payload: {
                      id: project.id,
                      project: {...project, desc, title},
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
                  dispatch({type: 'deleteProject', payload: {id: project.id}});
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
                }}>
                {t('close')}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listView: {
    flex: 1,
  },
  addProject: {
    flexDirection: 'row',
    padding: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  TextProject: {
    flex: 1,
    fontSize: 25,
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
    height: '75%',
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

export default ListProjects;
