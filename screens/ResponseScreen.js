import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getResponse } from '../api/pollRoutes';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
const moment = require('moment');

function ResponseScreen() {
  const [responses, setResponses] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [currentDate, setDate] = useState(new Date());
  useEffect(() => {
    async function fetchResponseData() {
      data = await getResponse('ZnyhJAgy6cFm5mfMj9GZ');
      setResponses(data.responses);
      setName(data.name);
      setDescription(data.description);
      setGroup(data.dates);
    }
    fetchResponseData();
  }, []);
  // let person = response[participants][0];
  let first = moment.unix(1591088400).format('YYYY-MM-DD');
  let test = moment.unix(1591088400).format('YYYY-MM-DD HH:mm:ss');
  console.log('name', name);
  console.log('responses', responses);
  let dates = {
    '2020-06-01': { marked: true },
    '2020-05-18': { selected: true, marked: true, selectedColor: 'blue' },
    '2020-05-19': { disabled: true, disableTouchEvent: true },
  };
  dates[first] = { marked: true, dotColor: 'red', activeOpacity: 0 };

  return (
    <CalendarList
      current={currentDate}
      markedDates={dates}
      // <ScrollView
      //   style={styles.container}
      //   contentContainerStyle={styles.contentContainer}
      // >
      //   <Agenda />
      //   <Text>Poll Results</Text>
      //   <Text>Event: {response.name}</Text>
      //   <Text>Group: {response.groups[0]}</Text>
      //   <Text>Location: {response.location}</Text>
      //   <Text>Participant Availability</Text>
      // </ScrollView>
    />
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
