import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { VictoryPie } from 'victory-native';
import { myContext } from '../App';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';

const MoodPiechart = () => {

  const { arrOfCards } = useContext(myContext);
  //used to store moods extracted from arrOfCards
  const [arrOfMoods, setArrOfMoods] = useState([]);

  const [daySelect, setDaySelect] = useState(7)
  //get all cards and pass only their moods into moodHandler
  useEffect(() => {
    try {
      console.log('today: '+moment());
      let todayMinusDaySelect=moment()-(daySelect*24*60*60*1000);
      let cardsForTheLast = arrOfCards.filter(card=>moment(card.key,'DD MM YYYY, kk:mm:ss').valueOf()>todayMinusDaySelect?card:null)
      console.log(cardsForTheLast);
      let moods = cardsForTheLast.map(card => card.mood)
      console.log(moods);
      moodHandler(moods);
    } catch (e) {
      console.log(e)
    }
  }, [arrOfCards,daySelect])

  //count the number of each mood and set arrOfMoods state with data which will be used by the pie chart
  const moodHandler = (moods) => {
    let lovingCount = 0;
    let excitedCount = 0;
    let happyCount = 0;
    let calmCount = 0;
    let numbCount = 0;
    let sadCount = 0;
    let scaredCount = 0;
    let angryCount = 0;

    moods.forEach(mood => {
      switch (mood) {
        case 'Loving':
          lovingCount++
          break;
        case 'Excited':
          excitedCount++
          break;
        case 'Happy':
          happyCount++
          break;
        case 'Calm':
          calmCount++
          break;
        case 'Numb':
          numbCount++
          break;
        case 'Sad':
          sadCount++
          break;
        case 'Scared':
          scaredCount++
          break;
        case 'Angry':
          angryCount++
          break;
        default:
          break;
      }
    });
    setArrOfMoods([
      { x: 'Loving', y: lovingCount, label: lovingCount != 0 ? 'Loving' : ' ' },
      { x: 'Excited', y: excitedCount, label: excitedCount != 0 ? 'Excited' : ' ' },
      { x: 'Happy', y: happyCount, label: happyCount != 0 ? 'Happy' : ' ' },
      { x: 'Calm', y: calmCount, label: calmCount != 0 ? 'Calm' : ' ' },
      { x: 'Numb', y: numbCount, label: numbCount != 0 ? 'Numb' : ' ' },
      { x: 'Sad', y: sadCount, label: sadCount != 0 ? 'Sad' : ' ' },
      { x: 'Scared', y: scaredCount, label: scaredCount != 0 ? 'Scared' : ' ' },
      { x: 'Angry', y: angryCount, label: angryCount != 0 ? 'Angry' : ' ' },
    ])
  }

 

  const chartHeight = Dimensions.get('window').height * 0.4;
  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Your mood for the last</Text>
        <View>
          <Picker
            selectedValue={daySelect}
            onValueChange={(itemValue) => setDaySelect(itemValue)}
            style={styles.dropdownBtn}
            mode='dropdown'
            itemStyle={{fontSize:30}}>
            <Picker.Item label="1" value={1} color='#523A28' />
            <Picker.Item label="7" value={7} color='#523A28' />
            <Picker.Item label="30" value={30} color='#523A28' />
            <Picker.Item label="all" value={100000} color='#523A28' />
          </Picker>
        </View>
        <Text style={styles.headerText}>day</Text>
      </View>

      <VictoryPie
        data={arrOfMoods}
        animate={{
          duration: 1000
        }}
        colorScale={['#632000', '#7C3600', '#964B00', '#C46200', '#F27900', '#FF9021', '#FFA74F', '#FFBE7C', '#FFD5AA']}
        radius={100}
        height={chartHeight}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  dropdownBtn: {
    width:100,
  },
  dropdownStyle: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 20
  }
})

export default MoodPiechart