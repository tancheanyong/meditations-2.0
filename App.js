// Navigation //
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
//  React   //
import React from 'react';
import {View,Text,Button} from 'react-native';
// Icons  //
import Ionicons from 'react-native-vector-icons/Ionicons';
//  Components  //
import Home from './components/Home';
import Browse from './components/Browse';
import Post from './components/Post';
import Mood from './components/Mood';
import Settings from './components/Settings';
const App =()=>{
  return(
    <NavigationContainer>
      {/* screenOptions can take an object or a function with navigation and route props */}
      {/* Check out route props documentation for more info */}
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Browse" component={Browse} />
        <Tab.Screen name="Post" component={Post} />
        <Tab.Screen name="Mood" component={Mood} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  )
};

// Navigator styling
const screenOptions = ({route})=>({
  tabBarIcon:()=>{
    switch (route.name){
      case 'Home':
        return <Ionicons name='home' size={20} color='white'/>;
        break;
      case 'Browse':
        return <Ionicons name='search' size={20} color='white'/>;
        break;
      case 'Post':
        return <Ionicons name='add-circle-outline' size={20} color='white'/>;
        break;
      case 'Mood':
        return <Ionicons name='bar-chart' size={20} color='white'/>;
        break;
      case 'Settings':
        return <Ionicons name='settings-outline' size={20} color='white'/>;
        break;
    }
  },
  tabBarStyle:{
    backgroundColor:'black'
  },
  headerStyle:{
    backgroundColor:'black'
  },
  headerTintColor:'white',
  headerTitleAlign:'center'
})

export default App;