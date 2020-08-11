import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function detailsTask({route}) {
  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <Text>title    :</Text>
        <Text>{route.params.task.title}</Text>
      </View>
      <View style={styles.label}>
        <Text>desc    :</Text>
        <Text>{route.params.task.desc}</Text>
      </View>
      <View style={styles.label}>
        <Text>date    :</Text>
        <Text>{route.params.task.date}</Text>
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
  label:{
      flexDirection:'row',
      marginVertical:10
  }
});
