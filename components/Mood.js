import { ScrollView, View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { VictoryPie, VictoryChart, VictoryLine } from 'victory-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { myContext } from '../App'
import { Picker } from '@react-native-picker/picker';
import MoodPiechart from './MoodPiechart';
import MoodLinechart from './MoodLinechart';

const Mood = () => {
  //For user to select their moods for the past 'daysAgo' days
  const [daysAgo, setDaysAgo] = useState(7)
  return (
    <ScrollView style={styles.body}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Your mood for the last</Text>
        <View>
          <Picker
            selectedValue={daysAgo}
            onValueChange={(itemValue) => setDaysAgo(itemValue)}
            style={styles.dropdownBtn}
            mode='dropdown'
            itemStyle={{ fontSize: 30 }}>
            <Picker.Item label="1" value={1} />
            <Picker.Item label="7" value={7} />
            <Picker.Item label="30" value={30} />
            <Picker.Item label="all" value={0} />
          </Picker>
        </View>
        <Text style={styles.headerText}>day</Text>
      </View>
      <View style={styles.chartsContainer}>
        <MoodPiechart daysAgo={daysAgo} />

        <MoodLinechart daysAgo={daysAgo}/>

      </View>

      <View>

      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#E4D4C8',
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  dropdownBtn: {
    width: 100,
  },
  dropdownStyle: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 20,
    color: '#523A28'
  },
  chartsContainer:{
    alignItems:'center'
  }
})

export default Mood