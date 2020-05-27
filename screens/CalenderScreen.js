import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
const testIDs = require('./testIDs');
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class CalendarScreen extends Component {
  render() {
    return (
      <View>
        <View>
          <Text>
            Add Time
          </Text>
        </View>
        <Calendar
          pastScrollRange={24}
          futureScrollRange={24}
          onDayPress={(day) => {console.log(day)}}
          markedDates={{
          
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 100,
  },
});


