import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('CreatePoll')} style={styles.touchableOpacityStyle} >
            <Image source={require('../images/create_poll.png')} style={styles.floatingButtonStyle} />
          </TouchableOpacity>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  touchableOpacityStyle:{
    position: 'absolute',
    width: 75,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 75,
    height: 55
  },

});
