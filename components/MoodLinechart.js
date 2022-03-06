import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { VictoryPie, VictoryChart, VictoryLine, VictoryAxis, VictoryLegend } from 'victory-native';
import { myContext } from '../App';
import moment from 'moment';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

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
  const windowWidth=Dimensions.get('window').width;

  return (
    <View>
      <VictoryChart height={chartHeight} width={chartWidth} animate={{ duration: 1000 }}>
        <VictoryAxis dependentAxis label='Count' tickFormat={tick => Math.round(tick)} />
        <VictoryAxis label='Date' fixLabelOverlap={true} />
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
      <View style={[styles.legends,{width:chartWidth}]}>
        <Pressable style={styles.legendBtn}>
          <View style={[styles.legendDot,{backgroundColor:'black'}]}></View>
          <Text style={styles.legendText}>Total</Text>
        </Pressable>
        <Pressable style={styles.legendBtn}>
          <View style={[styles.legendDot,{backgroundColor:'#632000'}]}></View>
          <Text style={styles.legendText}>Loving</Text>
        </Pressable>
        <Pressable style={styles.legendBtn}>
          <View style={[styles.legendDot,{backgroundColor:'#7C3600'}]}></View>
          <Text style={styles.legendText}>Excited</Text>
        </Pressable>
        <Pressable style={styles.legendBtn}>
          <View style={[styles.legendDot,{backgroundColor:'#964B00'}]}></View>
          <Text style={styles.legendText}>Happy</Text>
        </Pressable>
        <Pressable style={styles.legendBtn}>
          <View style={[styles.legendDot,{backgroundColor:'#C46200'}]}></View>
          <Text style={styles.legendText}>Calm</Text>
        </Pressable>
        <Pressable style={styles.legendBtn}>
          <View style={[styles.legendDot,{backgroundColor:'#F27900'}]}></View>
          <Text style={styles.legendText}>Numb</Text>
        </Pressable>
        <Pressable style={styles.legendBtn}>
          <View style={[styles.legendDot,{backgroundColor:'#FF9021'}]}></View>
          <Text style={styles.legendText}>Sad</Text>
        </Pressable>
        <Pressable style={styles.legendBtn}>
          <View style={[styles.legendDot,{backgroundColor:'#FFA74F'}]}></View>
          <Text style={styles.legendText}>Scared</Text>
        </Pressable>
        <Pressable style={styles.legendBtn}>
          <View style={[styles.legendDot,{backgroundColor:'#FFBE7C'}]}></View>
          <Text style={styles.legendText}>Angry</Text>
        </Pressable>
      </View>
    </View>
  )
}

MoodLinechart.defaultProps = {
  daysAgo: 7
}

const styles = StyleSheet.create({
  legends: {
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'center'
  },
  legendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    margin:10
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
  }
})

export default MoodLinechart