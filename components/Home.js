import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home = () => {
  const [display,setDisplay]=useState({});
  
  useEffect(()=>{
    async function fetchData(){
      try{
        let keys=await AsyncStorage.getAllKeys();
        if(keys.length){
          let obj=await AsyncStorage.getItem(keys[Math.floor(Math.random() * (keys.length))])
          console.log(obj);
          setDisplay(JSON.parse(obj));
        }
      }catch(e){
        console.log(e)
      }
    }
    fetchData();
  },[])

  const deleteAll=()=>{
    AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiRemove(keys))
        .then(() => alert('success'))
  }
  return (
    <View style={styles.body}>
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.card}>
        <Text style={styles.cardTitle}>{display.title}</Text>
        <View style={styles.cardInfo}>
          <Text style={styles.cardInfoText}>{display.mood}</Text>
          <Text style={styles.cardInfoText}>{display.key}</Text>
        </View>
        <Text style={styles.cardText}>
          {display.text}
        </Text>
      </LinearGradient>
      <Button title='delete all thoughts' onPress={()=>deleteAll()} />
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'gray',
    flex: 1
  },
  card: {
    marginVertical: 30,
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

export default Home