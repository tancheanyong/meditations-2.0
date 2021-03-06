import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { myContext } from '../App'
const Post = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [mood, setMood] = useState('Calm');
  const { postNewCard } = useContext(myContext);

  const month = []

  const postHandler = async () => {
    try {
      let key = moment().format('YYYY MM DD, kk:mm:ss');
      let dateTime = moment().format('DD MMMM YYYY, kk:mm:ss');
      let obj = {
        'key': key,
        'title': title,
        'text': text,
        'mood': mood,
        'date': dateTime
      }
      postNewCard(obj);
      setTitle('')
      setText('')
      setMood('Calm')
      Keyboard.dismiss()
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.body}>
      <Text style={styles.pageTitle}>What's on your mind?</Text>
      <TextInput style={styles.inputTitle} multiline={true} onChangeText={(text) => setTitle(text)} value={title} maxLength={50} placeholder='Title' />
      <TextInput style={styles.input} multiline={true} textAlignVertical='top' onChangeText={(text) => setText(text)} value={text} maxLength={1000} placeholder='Your words...' />
      <View style={styles.btnContainer}>
        <View style={styles.picker}>
          <Picker
            selectedValue={mood}
            onValueChange={(itemValue) => setMood(itemValue)}>
            <Picker.Item label="Loving" value="Loving" />
            <Picker.Item label="Excited" value="Excited" />
            <Picker.Item label="Happy" value="Happy" />
            <Picker.Item label="Calm" value="Calm" />
            <Picker.Item label="Numb" value="Numb" />
            <Picker.Item label="Sad" value="Sad" />
            <Picker.Item label="Scared" value="Scared" />
            <Picker.Item label="Angry" value="Angry" />
          </Picker>
        </View>
        <TouchableOpacity style={styles.saveBtn} onPress={() => postHandler()}>
          <Text style={styles.btnText}><Ionicons name='save-outline' size={30} color='#D0B49F' /></Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#E4D4C8',
    flex: 1,
  },
  pageTitle: {
    fontSize: 25,
    textAlign: 'center',
    color: '#523A28',
    margin: 20,
    fontWeight: 'bold'
  },
  inputTitle: {
    fontSize: 20,
    backgroundColor: '#D0B49F',
    color: 'black',
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 5,
    padding: 10
  },
  input: {
    backgroundColor: '#D0B49F',
    color: 'black',
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 10,
    flex: 1,
    padding: 10,
    fontSize: 17
  },
  btnContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 5,
    alignItems: 'center'
  },
  picker: {
    flex: 3,
    borderRadius: 10,
    marginRight: 5,
    backgroundColor: '#D0B49F'
  },
  saveBtn: {
    flex: 1,
    backgroundColor: '#A47551',
    padding: 10,
    borderRadius: 10,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
  }

})

export default Post