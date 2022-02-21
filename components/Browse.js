import { View, Text, StyleSheet,ScrollView, Pressable, Modal, TouchableOpacity, TextInput, BackHandler } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { myContext } from '../App'
const Browse = () => {
  //for edit text trigger
  const [editText,setEditText]=useState(false);
  const [text,setText]=useState('');
  //for modal visibility
  const [modalVisible,setModalVisible]=useState(false);
  const [modalKey,setModalKey]=useState(0);
  //for page refresh
  const {refresh,setRefresh}=useContext(myContext);

  //for storing data for display
  const [data, setData] = useState(null);

  //get all cards from storage 
  useEffect(() => {
    async function getData() {
      try {
       let keys = await AsyncStorage.getAllKeys();
       let result = await AsyncStorage.multiGet(keys);
       let json = result.map(card=>JSON.parse(card[1]));
       console.log(json);
       setData(json.reverse())
      } catch (e) {
        console.log(e)
      }
    }
    getData();
    
  }, [refresh])

  const editHandler = async(key)=>{
    try{  
      await AsyncStorage.mergeItem(key, JSON.stringify({'text':text}));
      refresh?setRefresh(false):setRefresh(true);
      setEditText(false);
    }catch(e){
      console.log(e);
    }
  }

  return (
    <ScrollView style={styles.body}>
      {/* data is an array of objects, and each object is a card */}
      {data ? data.map(card => {
        return (
          <Pressable key={card.key} onPress={()=>{setModalVisible(true);setModalKey(data.indexOf(card))}}>
            <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.card}>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <View style={styles.cardInfo}>
                <Text style={styles.cardInfoText}>{card.mood}</Text>
                <Text style={styles.cardInfoText}>{card.key}</Text>
              </View>
              <Text style={styles.cardText}>
                {card.text}
              </Text>
            </LinearGradient>
          </Pressable>
        )
      }) : null}
      
      <Modal visible={modalVisible} animationType='fade' transparent={true} onRequestClose={()=>{setEditText(false);setModalVisible(false)}}>
        <ScrollView style={styles.modal}>
          <LinearGradient key={data?data[modalKey].key:null} colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.card}>
            <Text style={styles.cardTitle}>{data?data[modalKey].title:null}</Text>
            <View style={styles.cardInfo}>
              <Text style={styles.cardInfoText}>{data?data[modalKey].mood:null}</Text>
              <Text style={styles.cardInfoText}>{data?data[modalKey].key:null}</Text>
            </View>
            {/* default text shown, hides when edit button is pressed */}
            {editText?null:(
              <Text style={styles.cardText}>
                {data?data[modalKey].text:null}
              </Text>
            )}
            {/* default hidden, show when edit button pressed */}
            {editText?(
              <TextInput style={styles.editText} multiline={true} textAlignVertical='top' onChangeText={(text)=>setText(text)} value={text} maxLength={1000}  />
            ):null}
            {/* showing different buttons depending on edit */}
            {editText?(
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={()=>editHandler(data[modalKey].key)}>
                  <Text><Ionicons name='save-outline' size={30} color='lightgreen' /></Text>
                </TouchableOpacity>
              </View>
            ):(
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={()=>{setText(data[modalKey].text);setEditText(true)}}>
                  <Text><Ionicons name='create-outline' size={30} color='white' /></Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>deleteHandler(data[modalKey].text)} >
                  <Text><Ionicons name='trash-outline' size={30} color='red' /></Text>
                </TouchableOpacity>
              </View>
            )}
          </LinearGradient>
        </ScrollView>
      </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'gray',
    flex: 1
  },
  card: {
    marginVertical: 5,
    marginHorizontal: 20,
    padding: 20,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10
  },
  cardTitle: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold'
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardInfoText: {
    color: 'lightgray',
  },
  cardText: {
    color: 'white',
    fontSize: 20,
    marginVertical: 20,
    textAlign:'justify'
  },
  modal:{
    flex:1,
    backgroundColor:'rgba(0,0,0,0.6)'
  },
  modalButtons:{
    flexDirection:'row',
    justifyContent:'space-around',
    marginTop:20
  },
  editText:{
    fontSize:20,
    marginVertical:20,
    backgroundColor:'white',
    borderRadius:10
  }
})


export default Browse