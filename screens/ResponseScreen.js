import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getResponse } from '../api/pollRoutes';
import { render } from 'react-dom';

export default class ResponseScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: '',
    };
  }
  async componentDidMount() {
    let test = await getResponse('ZnyhJAgy6cFm5mfMj9GZ');
    this.setState({
      response: test,
    });
    console.log('state', this.state);
  }
  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text>Poll Results</Text>
        <Text>Name</Text>
        <Text>Group</Text>
        <Text>Location</Text>
        <Text>Participant Availability</Text>
      </ScrollView>
    );
  }
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
