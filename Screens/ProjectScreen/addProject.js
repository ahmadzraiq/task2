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
const addProject = ({navigation}) => {
  const {dispatch} = React.useContext(ProjectsContext);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const save = () => {
    dispatch({type: 'addProject', payload: {title, desc}});
    navigation.push("ListProjects")
  };
  return (
    <>
      <View style={styles.container}>
        <TextInput style={styles.inputText} placeholder="Title" onChangeText={(e)=>setTitle(e)} />
        <TextInput style={styles.inputText} placeholder="desc"  onChangeText={(e)=>setDesc(e)} />
        <View style={styles.button}>
          <Button title="Save" onPress={save} />
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    width: '75%',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  button: {
    marginTop: '5%',
  },
});

export default addProject;
