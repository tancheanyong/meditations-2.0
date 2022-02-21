import { View, Text, TextInput,StyleSheet, TouchableOpacity,Keyboard } from 'react-native'
import React, { useContext, useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import { myContext } from '../App'
const Post = () => {
  const [title,setTitle]=useState('');
  const [text,setText]=useState('');
  const [mood,setMood]=useState('Happy');
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
      setMood('Happy')
      Keyboard.dismiss()
      refresh?setRefresh(false):setRefresh(true);
    }catch(e){
      console.log(e);
    }
  }

  return (
    <View style={styles.body}>
      <Text style={styles.pageTitle}>What's on your mind?</Text>
      <TextInput style={styles.inputTitle} multiline={true} onChangeText={(text)=>setTitle(text)} value={title} placeholder='Title' />
      <TextInput style={styles.input} multiline={true} textAlignVertical='top' onChangeText={(text)=>setText(text)} value={text} maxLength={1000} />
      <Picker
        selectedValue={mood}
        onValueChange={(itemValue)=>setMood(itemValue)}>
        <Picker.Item label="Happy" value="Happy" />
        <Picker.Item label="Sad" value="Sad" />
      </Picker>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.saveBtn} onPress={()=>postHandler()}>
          <Text style={styles.btnText}>Save this thought</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body:{
    backgroundColor:'gray',
    flex:1,
  },
  pageTitle:{
    fontSize:25,
    textAlign:'center',
    color:'white',
    margin:20,
    fontWeight:'bold'
  },
  inputTitle:{
    fontSize:17,
    borderWidth:2,
    borderColor:'blue',
    backgroundColor:'lightgray',
    marginHorizontal:20,
    borderRadius:10,
    marginBottom:5,
    padding:10
  },
  input:{
    borderWidth:2,
    borderColor:'blue',
    backgroundColor:'lightgray',
    marginHorizontal:20,
    borderRadius:10,
    flex:1,
    padding:10
  },
  btnContainer:{
    alignItems:'center'
  },
  saveBtn:{
    backgroundColor:'lightblue',
    padding:10,
    width:200,
    borderRadius:10,
  },
  btnText:{
    textAlign:'center',
    fontSize:20
  }

})

export default Post