import { View, Text, Dimensions } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { VictoryPie, VictoryChart, VictoryLine } from 'victory-native';
import { myContext } from '../App';
import moment from 'moment';

const MoodLinechart = ({daysAgo}) => {
  const { arrOfCards } = useContext(myContext);
  //used to store moods extracted from arrOfCards
  const [arrOfMoods, setArrOfMoods] = useState([]);
  const [NoOfCardsPosted,setNoOfCardsPosted]=useState([]);
  //get all cards and filter through daysAgo and pass only their moods into moodHandler
  useEffect(() => {
    try {
      // console.log('today: ' + moment());
      // let todayMinusdaysAgo = moment().startOf('date').subtract(daysAgo,'d');
      let moodsCountPerDay=[]
      let data = {}
      for(let i =0;i<daysAgo;i++){
        let todayMinusdaysAgo=moment().startOf('date').subtract(i,'d');
        let cardsForTheLast = arrOfCards.filter(card => moment(card.key, 'YYYY MM DD, kk:mm:ss').valueOf() > todayMinusdaysAgo)
        // setNoOfCardsPosted(prev=>[...prev,cardsForTheLast.length]);
        console.log(cardsForTheLast.length);
        let moods = cardsForTheLast.map(card => card.mood)
        moodsCountPerDay.push(moodHandler(moods));
      }
      console.log(NoOfCardsPosted);
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
    return moodCount
  }
  const chartHeight = Dimensions.get('window').height * 0.4;
  const chartWidth = Dimensions.get('window').width * 0.9;

  return (
    <VictoryChart height={chartHeight} width={chartWidth}>
      {NoOfCardsPosted?<VictoryLine
        style={{
          data: { stroke: "#c43a31" },
        }}
        data={[
          { x: moment().subtract(7,'d').format('DD/MM'), y: NoOfCardsPosted[0] },
          { x: moment().subtract(6,'d').format('DD/MM'), y: NoOfCardsPosted[1] },
          { x: moment().subtract(5,'d').format('DD/MM'), y: NoOfCardsPosted[2] },
          { x: moment().subtract(4,'d').format('DD/MM'), y: NoOfCardsPosted[3] },
          { x: moment().subtract(3,'d').format('DD/MM'), y: NoOfCardsPosted[4] }
        ]}
      />:null}
      
    </VictoryChart>
  )
}

MoodLinechart.defaultProps={
  daysAgo:7
}

export default MoodLinechart