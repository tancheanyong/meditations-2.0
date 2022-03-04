import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { VictoryPie } from 'victory-native';
import { myContext } from '../App';
import moment from 'moment';

const MoodPiechart = ({daysAgo}) => {

  const { arrOfCards } = useContext(myContext);
  //used to store moods extracted from arrOfCards
  const [arrOfMoods, setArrOfMoods] = useState([]);
  
  //get all cards and filter through daysAgo and pass only their moods into moodHandler
  useEffect(() => {
    try {
      console.log(moment().startOf('day'));
      let moods=[]  //array of moods to be passed into moodHandler
      //if user select 1,7, and 30 days
      if(daysAgo!=0){
        let todayMinusdaysAgo = moment().startOf('date').subtract(daysAgo-1,'d');
        let cardsForTheLast = arrOfCards.filter(card => moment(card.key, 'YYYY MM DD, kk:mm:ss').valueOf() > todayMinusdaysAgo)
        moods = cardsForTheLast.map(card => card.mood)
      }else{//if user select all days
        moods = arrOfCards.map(card=>card.mood)
      }
      console.log(moods);
      moodHandler(moods);
    } catch (e) {
      console.log(e)
    }
  }, [arrOfCards, daysAgo])

  //count the number of each mood and set arrOfMoods state with data which will be used by the pie chart
  const moodHandler = (moods) => {
    const moodCount={
      'Loving':0,
      'Excited':0,
      'Happy':0,
      'Calm':0,
      'Numb':0,
      'Sad':0,
      'Scared':0,
      'Angry':0
    };

    moods.forEach(mood => {
      switch (mood) {
        case 'Loving':
          moodCount.Loving++
          break;
        case 'Excited':
          moodCount.Excited++
          break;
        case 'Happy':
          moodCount.Happy++
          break;
        case 'Calm':
          moodCount.Calm++
          break;
        case 'Numb':
          moodCount.Numb++
          break;
        case 'Sad':
          moodCount.Sad++
          break;
        case 'Scared':
          moodCount.Scared++
          break;
        case 'Angry':
          moodCount.Angry++
          break;
        default:
          break;
      }
    });
    setArrOfMoods([
      { x: 'Loving', y: moodCount.Loving, label: moodCount.Loving > 0 ? 'Loving' : ' ' },
      { x: 'Excited', y: moodCount.Excited, label: moodCount.Excited > 0 ? 'Excited' : ' ' },
      { x: 'Happy', y: moodCount.Happy, label:moodCount.Happy > 0 ? 'Happy' : ' ' },
      { x: 'Calm', y: moodCount.Calm, label: moodCount.Calm > 0 ? 'Calm' : ' ' },
      { x: 'Numb', y: moodCount.Numb, label: moodCount.Numb > 0 ? 'Numb' : ' ' },
      { x: 'Sad', y: moodCount.Sad, label: moodCount.Sad > 0 ? 'Sad' : ' ' },
      { x: 'Scared', y: moodCount.Scared, label: moodCount.Scared > 0 ? 'Scared' : ' ' },
      { x: 'Angry', y: moodCount.Angry, label: moodCount.Angry > 0 ? 'Angry' : ' ' },
    ])
  }



  const chartHeight = Dimensions.get('window').height * 0.35;
  return (
    <View>
      

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

MoodPiechart.defaultProps={
  daysAgo:7
}

const styles = StyleSheet.create({
 
})

export default MoodPiechart