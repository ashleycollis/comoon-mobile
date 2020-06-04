import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getResponse } from '../api/pollRoutes';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
const moment = require('moment');

function intersection(setA, setB) {
  let _intersection = new Set();
  for (let elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem);
    }
  }
  return _intersection;
}

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
    // console.log('responses', responses);
    let justResponses = {};
    for (let [key, value] of Object.entries(responses)) {
      if (!justResponses[key]) {
        justResponses[key] = new Set();
      }
      console.log('key');
      for (let i = 0; i < value.length; i++) {
        let start = value[i].startTime.seconds;
        let end = value[i].endTime.seconds;
        let current = start;
        while (current < end) {
          justResponses[key].add(current);
          current += 15 * 60;
        }
        console.log(justResponses);
      }
    }
    let availableSlotsByEverybody = Object.values(justResponses)[0];
    for (let value in Object.values(justResponses)) {
      console.log(availableSlotsByEverybody, value);
      availableSlotsByEverybody = intersection(
        availableSlotsByEverybody,
        value
      );
    }
    console.log(availableSlotsByEverybody);
    let available = '';
    let check = {
      '2020-05-19': { disabled: true, disableTouchEvent: true },
    }; //the marked sample dates object, but we're only concerned with date added recently
    check[available] = { marked: true, dotColor: 'green', activeOpacity: 0 };
    setDates(check);
  }, [responses]);
  let test = moment.unix(1591088400).format('YYYY-MM-DD HH:mm:ss'); //how to format later when including time
  return (
    <View>
      <Text>Name: {eventName}</Text>
      <Text>Description: {description}</Text>
      <Calendar
        markedDates={dates}
        current={'2020-06-01'}
        onDayPress={(day) => <Text>Hi</Text>}
      />
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
