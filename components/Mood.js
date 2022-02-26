import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React,{useEffect,useState,useContext} from 'react'
import {VictoryPie} from 'victory-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { myContext } from '../App'
import MoodPiechart from './MoodPiechart';

const Mood = () => {

  return (
    <View style={styles.body}>
      
      <MoodPiechart />
      
    </View>
  )
}

const styles=StyleSheet.create({
  body:{
    backgroundColor:'#E4D4C8',
    flex:1
  }
})

export default Mood