import { View, Text, TextInput,StyleSheet, TouchableOpacity,Keyboard } from 'react-native'
import React, { useContext, useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { myContext } from '../App'
const Post = () => {
  const [title,setTitle]=useState('');
  const [text,setText]=useState('');
  const [mood,setMood]=useState('Calm');
  const {refresh,setRefresh} = useContext(myContext);

  const postHandler=async()=>{
    try{
      let dateTime=moment().format('DD MM YYYY, kk:mm:ss');
      let obj={
        'key':dateTime,
        'title':title,
        'text':text,
        'mood':mood
      }
      await AsyncStorage.setItem(obj.key,JSON.stringify(obj))
      console.log('success');
      setTitle('')
      setText('')
      setMood('Calm')
      Keyboard.dismiss()
      refresh?setRefresh(false):setRefresh(true);
    }catch(e){
      console.log(e);
    }
  }

  return (
    <View style={styles.body}>
      <Text style={styles.pageTitle}>What's on your mind?</Text>
      <TextInput style={styles.inputTitle} multiline={true} onChangeText={(text)=>setTitle(text)} value={title} maxLength={50} placeholder='Title' />
      <TextInput style={styles.input} multiline={true} textAlignVertical='top' onChangeText={(text)=>setText(text)} value={text} maxLength={1000} placeholder='Your words...' />
      <View style={styles.btnContainer}>
        <View style={styles.picker}>
          <Picker
            selectedValue={mood}
            onValueChange={(itemValue)=>setMood(itemValue)}>
            <Picker.Item label="Loving" value="Loving" color='#523A28' />
            <Picker.Item label="Excited" value="Excited" color='#523A28' />
            <Picker.Item label="Happy" value="Happy" color='#523A28' />
            <Picker.Item label="Calm" value="Calm" color='#523A28' />
            <Picker.Item label="Numb" value="Numb" color='#523A28' />
            <Picker.Item label="Sad" value="Sad" color='#523A28' />
            <Picker.Item label="Scared" value="Scared" color='#523A28' />
            <Picker.Item label="Angry" value="Angry" color='#523A28' />
          </Picker>
        </View>
        <TouchableOpacity style={styles.saveBtn} onPress={()=>postHandler()}>
          <Text style={styles.btnText}><Ionicons name='save-outline' size={30} color='#D0B49F' /></Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body:{
    backgroundColor:'#E4D4C8',
    flex:1,
  },
  pageTitle:{
    fontSize:25,
    textAlign:'center',
    color:'#523A28',
    margin:20,
    fontWeight:'bold'
  },
  inputTitle:{
    fontSize:20,
    backgroundColor:'#D0B49F',
    marginHorizontal:20,
    borderRadius:10,
    marginBottom:5,
    padding:10
  },
  input:{
    backgroundColor:'#D0B49F',
    marginHorizontal:20,
    marginBottom:5,
    borderRadius:10,
    flex:1,
    padding:10,
    fontSize:17
  },
  btnContainer:{
    flexDirection:'row',
    marginHorizontal:20,
    marginBottom:5,
    alignItems:'center'
  },
  picker:{
    flex:3,
    borderRadius:10,
    marginRight:5,
    backgroundColor:'#D0B49F'
  },
  saveBtn:{
    flex:1,
    backgroundColor:'#A47551',
    padding:10,
    borderRadius:10,
  },
  btnText:{
    textAlign:'center',
    fontSize:20,
    color:'white'
  }

})

export default Post