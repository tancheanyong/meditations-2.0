import { View, Text, StyleSheet, ScrollView, Pressable, Modal, TouchableOpacity, TextInput, BackHandler } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { myContext } from '../App'
import CurrentModal from './CurrentModal'
import { Picker } from '@react-native-picker/picker'

const Browse = () => {
  //For sorting
  const [sortType,setSortType]=useState('Newest First')
  const [sortedCards,setSortedCards]=useState([])
  //for modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  const [currentModalCard, setcurrentModalCard] = useState({});

  //arrOfCards passed down from App.js through context
  const { arrOfCards } = useContext(myContext);
  //sort browsing list
  useEffect(()=>{
    //clone the arrOfCards array, so that using reverse() won't affect the original arrOfCards state
    let arrOfCardsVar = [...arrOfCards];
    switch (sortType) {
      case 'Newest First':
        setSortedCards(arrOfCardsVar.reverse())
        break;
      case 'Oldest First':
        setSortedCards(arrOfCards)
        break;
    }
  },[sortType,arrOfCards])

  const modalHandler = (card) => {
    setModalVisible(true);
    setcurrentModalCard({
      'key': card.key,
      'title': card.title,
      'text': card.text,
      'mood': card.mood
    })
  }

  return (
    <ScrollView style={styles.body}>
      <Text style={styles.pageTitle}>Browse</Text>

      <View style={styles.sortContainer}>
        <Picker
          selectedValue={sortType}
          onValueChange={(itemValue) => setSortType(itemValue)}
          style={styles.sortBtn}
          mode='dropdown'
          itemStyle={{ fontSize: 30 }}>
          <Picker.Item label="Newest First" value='Newest First' color='#523A28' />
          <Picker.Item label="Oldest First" value="Oldest First" color='#523A28' />
        </Picker>
      </View>

      {/* map through arrOfCards, for each card, renders a Pressable */}
      {sortedCards ? sortedCards.map(card => {
        return (
          // On Pressable(card) pressed, show modal and pass in modalKey to know which modal to show 
          // On this error, perhaps just usestate a card state, and store the entire card data inside of it to be accessed by modal, instead of using modalkey to access arrOfCards data
          <Pressable key={card.key} onPress={() => modalHandler(card)}>
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
      <CurrentModal modalVisible={modalVisible} setModalVisible={setModalVisible} currentModalCard={currentModalCard} />

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#E4D4C8',
    flex: 1
  },
  pageTitle: {
    fontSize: 25,
    textAlign: 'center',
    color: '#523A28',
    marginTop: 20,
    fontWeight: 'bold'
  },
  sortContainer:{
    alignItems:'flex-end',
  },
  sortBtn:{
    width:200,
  },
  card: {
    marginVertical: 5,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#A47551'
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
    fontSize: 17,
    marginTop: 5
  },
  cardText: {
    color: 'white',
    fontSize: 20,
    marginVertical: 20,
    textAlign: 'justify'
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  },
  editText: {
    fontSize: 20,
    marginVertical: 20,
    backgroundColor: 'white',
    borderRadius: 10
  }
})


export default Browse