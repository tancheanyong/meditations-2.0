import { View, Text, Dimensions } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { VictoryPie, VictoryChart, VictoryLine, VictoryAxis } from 'victory-native';
import { myContext } from '../App';
import moment from 'moment';

const MoodLinechart = ({ daysAgo }) => {
  const { arrOfCards } = useContext(myContext);
  //used to store moods extracted from arrOfCards
  const [arrOfMoods, setArrOfMoods] = useState([]);
  //store date based on daysAgo determined by user
  const [data, setData] = useState([]);

  //get all cards and filter through daysAgo and pass only their moods into moodHandler
  useEffect(() => {
    try {
      const arrOfDates = [];
      //loop through each date since today for daysAgo days, and put these dates into arrOfDates
      for (let i = 0; i < daysAgo; i++) {
        arrOfDates.push(moment().startOf('date').subtract(i, 'd').format('DD/MM'));
      }
      //arrOfData is an array of objects containing a date, and the mood counts on that date
      let arrOfData = arrOfDates.map((date) => {
        return {
          date: date,
          totalCtn: countFunc('Total', date),
          lovingCtn: countFunc('Loving', date),
          excitedCtn: countFunc('Excited', date),
          happyCtn: countFunc('Happy', date),
          calmCtn: countFunc('Calm', date),
          numbCtn: countFunc('Numb', date),
          sadCtn: countFunc('Sad', date),
          scaredCtn: countFunc('Scared', date),
          angryCtn: countFunc('Angry', date),
        }
      })
      //put all required data into data state
      setData(arrOfData.reverse())
      console.log(data);
    } catch (e) {
      console.log(e)
    }
  }, [arrOfCards, daysAgo])

  //take in a mood and a date, and return the number of that mood in that date
  const countFunc = (moodType, date) => {
    let ctn = 0;
    //get the cards that is posted on 'date' day
    let cardsToday = arrOfCards.filter(card => moment(card.key, 'YYYY MM DD, kk:mm:ss').valueOf() >= moment(date, 'DD/MM').valueOf() && moment(card.key, 'YYYY MM DD, kk:mm:ss').valueOf() < moment(date, 'DD/MM').add(1, 'd').valueOf())
    if (moodType === 'Total') {
      return cardsToday.length
    } else {
      cardsToday.forEach((card) => {
        if (card.mood === moodType) {
          ctn++
        }
      })
      return ctn
    }
  }

  const chartHeight = Dimensions.get('window').height * 0.4;
  const chartWidth = Dimensions.get('window').width * 0.9;

  return (
    <VictoryChart height={chartHeight} width={chartWidth} animate={{duration: 1000}}>
      <VictoryAxis dependentAxis label='Count' tickFormat={tick=>Math.round(tick)}/>
      <VictoryAxis label='Date' fixLabelOverlap={true}/>
      {/* Total count line */}
      {data.length ?
        <VictoryLine
          style={{
            data: { stroke: "black" },
          }}
          data={data.map(dataPoint => { return { x: dataPoint.date, y: dataPoint.totalCtn } })}
        />
        : null}
      {/* Loving count line */}
      {data.length ?
        <VictoryLine
          style={{
            data: { stroke: "#632000" },
          }}
          data={data.map(dataPoint => { return { x: dataPoint.date, y: dataPoint.lovingCtn } })}
        />
        : null}
      {/* excited count line */}
      {data.length ?
        <VictoryLine
          style={{
            data: { stroke: "#7C3600" },
          }}
          data={data.map(dataPoint => { return { x: dataPoint.date, y: dataPoint.excitedCtn } })}
        />
        : null}
      {/* happy count line */}
      {data.length ?
        <VictoryLine
          style={{
            data: { stroke: "#964B00" },
          }}
          data={data.map(dataPoint => { return { x: dataPoint.date, y: dataPoint.happyCtn } })}
        />
        : null}
      {/* calm count line */}
      {data.length ?
        <VictoryLine
          style={{
            data: { stroke: "#C46200" },
          }}
          data={data.map(dataPoint => { return { x: dataPoint.date, y: dataPoint.calmCtn } })}
        />
        : null}
      {/* numb count line */}
      {data.length ?
        <VictoryLine
          style={{
            data: { stroke: "#F27900" },
          }}
          data={data.map(dataPoint => { return { x: dataPoint.date, y: dataPoint.numbCtn } })}
        />
        : null}
      {/* sad count line */}
      {data.length ?
        <VictoryLine
          style={{
            data: { stroke: "#FF9021" },
          }}
          data={data.map(dataPoint => { return { x: dataPoint.date, y: dataPoint.sadCtn } })}
        />
        : null}
      {/* scared count line */}
      {data.length ?
        <VictoryLine
          style={{
            data: { stroke: "#FFA74F" },
          }}
          data={data.map(dataPoint => { return { x: dataPoint.date, y: dataPoint.scaredCtn } })}
        />
        : null}
      {/* angry count line */}
      {data.length ?
        <VictoryLine
          style={{
            data: { stroke: "#FFBE7C" },
          }}
          data={data.map(dataPoint => { return { x: dataPoint.date, y: dataPoint.angryCtn } })}
        />
        : null}
    </VictoryChart>
  )
}

MoodLinechart.defaultProps = {
  daysAgo: 7
}

export default MoodLinechart