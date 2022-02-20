import { View, Text, StyleSheet,ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { myContext } from '../App'
const Browse = () => {

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
       setData(json)
      } catch (e) {
        console.log(e)
      }
    }
    getData();
  }, [refresh])

  return (
    <ScrollView style={styles.body}>
      {/* data is an array of objects, and each object is a card */}
      {data ? data.map(card => {
        return (
          <LinearGradient key={card.key} colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.card}>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <View style={styles.cardInfo}>
              <Text style={styles.cardInfoText}>{card.mood}</Text>
              <Text style={styles.cardInfoText}>{card.key}</Text>
            </View>
            <Text style={styles.cardText}>
              {card.text}
            </Text>
          </LinearGradient>
        )
      }) : null}
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
    marginHorizontal: 50,
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
    marginVertical: 20
  }
})


export default Browse