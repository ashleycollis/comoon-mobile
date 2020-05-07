import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
const testIDs = require('./testIDs');
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

export default class CalendarsList extends Component{
    render(){
        return(
        <CalendarList
        testID={testIDs.calendarList.CONTAINER}
        pastScrollRange={24}
        futureScrollRange={24}
        />
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


