import { View, Text, StyleSheet,ScrollView, Pressable, Modal, TouchableOpacity, TextInput, BackHandler } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { myContext } from '../App'
const Browse = () => {
  //for edit text 
  const [editText,setEditText]=useState(false);
  const [text,setText]=useState('');
  //for modal visibility
  const [modalVisible,setModalVisible]=useState(false);
  const [currentModalCard,setcurrentModalCard]=useState({});
  //for page refresh
  const {refresh,setRefresh}=useContext(myContext);

  //arrOfCards stores an array of objects, where each object is one card
  const [arrOfCards, setArrOfCards] = useState();

  //get all cards from storage 
  useEffect(() => {
    async function getData() {
      try {
       let keys = await AsyncStorage.getAllKeys();
       let result = await AsyncStorage.multiGet(keys);
       let json = result.map(card=>JSON.parse(card[1]));
       console.log(json);
       setArrOfCards(json.reverse())
      } catch (e) {
        console.log(e)
      }
    }
    getData();
    
  }, [refresh])

  const modalHandler=(card)=>{
    setModalVisible(true);
    setcurrentModalCard({
      'key':card.key,
      'title':card.title,
      'text':card.text,
      'mood':card.mood
    })
  }

  const editHandler = async(card)=>{
    try{  
      await AsyncStorage.mergeItem(card.key, JSON.stringify({'text':text}));
      refresh?setRefresh(false):setRefresh(true);
      setEditText(false);
    }catch(e){
      console.log(e);
    }
  }

  const deleteHandler=async(key)=>{
    try{
      await AsyncStorage.removeItem(key);
      setModalVisible(false);
      refresh?setRefresh(false):setRefresh(true);
    }catch(e){
      console.log(e);
    }
  }

  return (
    <ScrollView style={styles.body}>
      <Text style={styles.pageTitle}>Browse</Text>
      {/* map through arrOfCards, for each card, renders a Pressable */}
      {arrOfCards ? arrOfCards.map(card => {
        return (
          // On Pressable(card) pressed, show modal and pass in modalKey to know which modal to show 
          // On this error, perhaps just usestate a card state, and store the entire card data inside of it to be accessed by modal, instead of using modalkey to access arrOfCards data
          <Pressable key={card.key} onPress={()=>modalHandler(card)}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <View style={styles.cardInfo}>
                <Text style={styles.cardInfoText}>{card.mood}</Text>
                <Text style={styles.cardInfoText}>{card.key}</Text>
              </View>
              <Text style={styles.cardText}>
                {card.text}
              </Text>
            </View>
          </Pressable>
        )
      }) : null}

      {/* Modal */}
     
      <Modal visible={modalVisible} animationType='fade' transparent={true} onRequestClose={()=>{setEditText(false);setModalVisible(false)}}>
        <ScrollView style={styles.modal}>
          {/* show the card in arrOfCards on modalKey index */}
          <View key={currentModalCard.key} style={styles.card}>
            <Text style={styles.cardTitle}>{currentModalCard.title}</Text>
            <View style={styles.cardInfo}>
              <Text style={styles.cardInfoText}>{currentModalCard.mood}</Text>
              <Text style={styles.cardInfoText}>{currentModalCard.key}</Text>
            </View>
            {/* default modal card text shown, hides when edit button is pressed */}
            {editText?null:(
              <Text style={styles.cardText}>
                {currentModalCard.text}
              </Text>
            )}
            {/* text input default hidden, show when edit button pressed */}
            {editText?(
              <TextInput style={styles.editText} multiline={true} textAlignVertical='top' onChangeText={(txt)=>setText(txt)} value={text} maxLength={1000}  />
            ):null}

            {/* showing different buttons depending on edit */}
            {editText?(
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={()=>editHandler(currentModalCard)}>
                  <Text><Ionicons name='save-outline' size={30} color='lightgreen' /></Text>
                </TouchableOpacity>
              </View>
            ):(
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={()=>{setText(currentModalCard.text);setEditText(true)}}>
                  <Text><Ionicons name='create-outline' size={30} color='#523A28' /></Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>deleteHandler(currentModalCard.key)} >
                  <Text><Ionicons name='trash-outline' size={30} color='#523A28' /></Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#E4D4C8',
    flex: 1
  },
  pageTitle:{
    fontSize:25,
    textAlign:'center',
    color:'#523A28',
    margin:20,
    fontWeight:'bold'
  },
  card: {
    marginVertical: 5,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor:'#A47551'
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
    color: '#D0B49F',
    fontSize:17,
    marginTop:5
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