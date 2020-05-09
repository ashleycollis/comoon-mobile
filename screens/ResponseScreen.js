import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getResponse } from '../api/pollRoutes';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

function ResponseScreen() {
  const [response, setResponse] = useState('');
  const [currentDate, setDate] = useState(new Date());
  useEffect(() => {
    async function fetchResponseData() {
      data = await getResponse('ZnyhJAgy6cFm5mfMj9GZ');
      setResponse(data);
    }
    fetchResponseData();
  }, []);
  console.log('state', response);
  return (
    <CalendarList
      current={currentDate}
      markedDates={{
        '2020-05-16': { selected: true, marked: true, selectedColor: 'blue' },
        '2020-05-17': { marked: true },
        '2020-05-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
        '2020-05-19': { disabled: true, disableTouchEvent: true },
      }}
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
