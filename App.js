// Navigation //
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
//  React   //
import React, { createContext, useEffect, useState } from 'react';
import {View,Text,Button} from 'react-native';
// Icons  //
import Ionicons from 'react-native-vector-icons/Ionicons';
//  Components  //
import Home from './components/Home';
import Browse from './components/Browse';
import Post from './components/Post';
import Mood from './components/Mood';
import Settings from './components/Settings';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const myContext=React.createContext({
  arrOfCards:[],
  postNewCard:()=>{}
});

const App =()=>{
  //The main array of Cards which can be accessed by all children through context
  const [arrOfCards,setArrOfCards]=useState([])
  //Refreshes the page when postNewCard finishes
  const [refresh,setRefresh]=useState(false);
  //retrieving cards from Async Storage
  useEffect(()=>{
    async function getData() {
      try {
        let keys = await AsyncStorage.getAllKeys();
        let result = await AsyncStorage.multiGet(keys);
        let json = result.map(cardWithKeys=>JSON.parse(cardWithKeys[1]));
        //arrOfCards display [] at first, because it is still awaiting promise.
        //setState is async, so it'll wait for json, and after it finally has json, it'll re-render this page, which you can log by console.log inside another useEffect hook that updates on arrOfCards changes.
        setArrOfCards(json)
        console.log(arrOfCards);
      } catch (e) {
        console.log(e)
      }
    }
    getData();
    
  },[refresh])

  const postNewCard = (newCard)=>{
    AsyncStorage.setItem(newCard.key,JSON.stringify(newCard));
    refresh?setRefresh(false):setRefresh(true);
  }

  const value = {arrOfCards,postNewCard}

  return(
    <NavigationContainer>
      {/* screenOptions can take an object or a function with navigation and route props */}
      {/* Check out route props documentation for more info */}
      <myContext.Provider value={value}>
        <Tab.Navigator screenOptions={screenOptions}>

          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Browse" component={Browse} />
          <Tab.Screen name="Post" component={Post} />
          <Tab.Screen name="Mood" component={Mood} />
          {/* <Tab.Screen name="Settings" component={Settings} /> */}
        </Tab.Navigator>
      </myContext.Provider>
    </NavigationContainer>
  )
};

// Navigator styling
const screenOptions = ({route})=>({
  tabBarIcon:()=>{
    switch (route.name){
      case 'Home':
        return <Ionicons name='home-outline' size={25} color='#523A28'/>;
        break;
      case 'Browse':
        return <Ionicons name='search' size={25} color='#523A28'/>;
        break;
      case 'Post':
        return <Ionicons name='add-circle-outline' size={25} color='#523A28'/>;
        break;
      case 'Mood':
        return <Ionicons name='bar-chart-outline' size={25} color='#523A28'/>;
        break;
      case 'Settings':
        return <Ionicons name='settings-outline' size={25} color='#523A28'/>;
        break;
    }
  },
  tabBarStyle:{
    backgroundColor:'#D0B49F'
  },
  tabBarShowLabel:false,
  headerShown:false
})

//color schemes
//Dusty Rose: #E4D4C8
//Mauve     : #A47786
//Brown     : #533440
//Blue Gray : #9DB6CC

//Sand Dollar :#E4D4C8
//Tan         :#D0B49F
//Brown       :#A47551
//Carafe      :#523A28

export default App;