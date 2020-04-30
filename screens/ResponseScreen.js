import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getResponse } from '../api/pollRoutes';

function ResponseScreen() {
  const [response, setResponse] = useState('');
  useEffect(() => {
    async function fetchData() {
      data = await getResponse('ZnyhJAgy6cFm5mfMj9GZ');
      setResponse(data);
    }
    fetchData();
  }, []);
  console.log('state', response);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text>Poll Results</Text>
      <Text>Event: {response.name}</Text>
      <Text>Group: {response.groups[0]}</Text>
      <Text>Location: {response.location}</Text>
      <Text>Participant Availability</Text>
    </ScrollView>
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
