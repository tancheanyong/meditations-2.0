import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const Home = () => {
  return (
    <View style={styles.body}>
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.card}>
        <Text>Title</Text>
        <View>
          <Text>Mood</Text>
          <Text>27 March 2022</Text>
        </View>
        <Text>
          “If you are distressed by anything external, the pain is not due to the thing itself, but to your estimate of it; and this you have the power to revoke at any moment.”
          ― Marcus Aurelius, Meditations
        </Text>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  body:{
    backgroundColor:'gray',
    flex:1
  },
  card:{
    marginVertical:30,
    marginHorizontal:50,
    padding:20,
    borderColor: 'white',
    borderWidth:1,
    borderRadius:10
  }
})

export default Home