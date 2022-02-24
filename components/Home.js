import { View, Text, StyleSheet, Button,ScrollView,ImageBackground } from 'react-native'
import React, { useEffect, useState,useContext } from 'react'
import LinearGradient from 'react-native-linear-gradient'

import { myContext } from '../App'
const Home = () => {
  //page will auto re-render everytime a context changes
  const {arrOfCards}=useContext(myContext);
  
  const [display,setDisplay]=useState();
  
  // Get data to display when app loaded
  useEffect(()=>{
      try{
        if(arrOfCards.length){
          //this will run after App.js re-render when json finally arrives for setArrOfCards.
          setDisplay(arrOfCards[Math.floor(Math.random() * (arrOfCards.length))]);
          console.log('yes');
        }else{
          //this would be display at first, as arrOfCards is still awaiting to be set.
          console.log('nothing');
        }
      }catch(e){
        console.log('Home '+e)
      }
  },[arrOfCards])

  return (
    <ImageBackground source={require('./img/jeremy-yap-jn-HaGWe4yw-unsplash.jpg')} style={{flex:1,}} >
      <LinearGradient colors={['rgba(228, 212, 200, 1)','rgba(228, 212, 200, 0.2)','rgba(228, 212, 200, 0.5)']} style={styles.body}>
        <Text style={styles.pageTitle}>Good Morning!</Text>
        {display?
          (<View style={styles.card}>
            <Text style={styles.cardTitle}>{display.title}</Text>
            <View style={styles.cardInfo}>
              <Text style={styles.cardInfoText}>{display.mood}</Text>
              <Text style={styles.cardInfoText}>{display.key}</Text>
            </View>
            <Text style={styles.cardText}>
              {display.text}
            </Text>
          </View>)
        :null}
      </LinearGradient>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  pageTitle:{
    fontSize:25,
    textAlign:'center',
    color:'#523A28',
    margin:20,
    fontWeight:'bold'
  },
  card: {
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 10,
    backgroundColor:'rgba(164, 117, 81,0.9)'
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
  }
})

//Sand Dollar :#E4D4C8
//Tan         :#D0B49F
//Brown       :#A47551
//Carafe      :#523A28

export default Home