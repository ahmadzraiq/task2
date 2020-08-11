import React, {useState} from 'react';
import {View, StyleSheet, Button, TextInput} from 'react-native';
import {ProjectsContext} from '../../context';
import DatePicker from 'react-native-datepicker';

export default function addTask({navigation, route}) {
  const {dispatch} = React.useContext(ProjectsContext);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');
  const save = () => {
    dispatch({
      type: 'addTask',
      payload: {title, desc, date, id: route.params.id},
    });
    navigation.goBack();
    // navigation.push('ProjectTasks',{id: route.params.id});
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputText}
        placeholder="Title"
        onChangeText={(e) => setTitle(e)}
      />
      <TextInput
        style={styles.inputText}
        placeholder="desc"
        onChangeText={(e) => setDesc(e)}
      />
      <DatePicker
        style={{width: 200}}
        date="2016-05-15"
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
            top: 30,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 36,
            marginTop: 50,
          },
        }}
        onDateChange={(date) => {
            setDate(date);
        }}
      />
      <View style={styles.button}>
        <Button title="Save" onPress={save} />
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
  inputText: {
    width: '75%',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  button: {
    marginTop: '10%',
  },
});
