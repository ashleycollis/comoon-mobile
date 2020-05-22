import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getResponse } from '../api/pollRoutes';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
const moment = require('moment');

function ResponseScreen() {
  const [responses, setResponses] = useState('');
  const [eventName, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dates, setDates] = useState({});

  useEffect(() => {
    async function fetchResponseData() {
      data = await getResponse('ZnyhJAgy6cFm5mfMj9GZ');
      setResponses(data.responses);
      setName(data.name);
      setDescription(data.description);
    }
    fetchResponseData();
  }, []);
  useEffect(() => {
    let counter = {}; //keeps track of number of people who can meet at that date
    for (let [key, value] of Object.entries(responses)) {
      for (let i = 0; i < value.length; i++) {
        let date = moment.unix(value[i].endTime.seconds).format('YYYY-MM-DD');
        console.log(date);
        if (counter[date]) {
          counter[date]++;
        } else {
          counter[date] = 1;
        }
      }
    }
    let available = '';
    for (let key in counter) {
      if (counter[key] == 3) {
        available = key;
        console.log('available', available);
      }
    }
    let check = {
      '2020-06-01': { marked: true },
      '2020-05-18': { selected: true, marked: true, selectedColor: 'blue' },
      '2020-05-19': { disabled: true, disableTouchEvent: true },
    }; //the marked sample dates object, but we're only concerned with date added recently
    check[available] = { marked: true, dotColor: 'green', activeOpacity: 0 };
    setDates(check);
  }, []);
  let test = moment.unix(1591088400).format('YYYY-MM-DD HH:mm:ss'); //how to format later when including time
  return (
    <View>
      <Text>Name: {eventName}</Text>
      <Text>Description: {description}</Text>
      <CalendarList markedDates={dates} />
    </View>
  );
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5FFFA',
  },
  contentContainer: {
    paddingTop: 50,
  },
});

export default ResponseScreen;
