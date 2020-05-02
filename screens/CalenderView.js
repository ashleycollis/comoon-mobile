import React, {Component, useState} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import calendarPicker from 'react-native-calendar-picker';

const CalenderView = ({})=>{    
    const [selectedStartDate, SetselectedStartDate] = useState(null)
    onDateChange(date){
        selectedStartDate: date
    }
    return(
        <View style={styles.container}>
        <CalendarPicker
          onDateChange={this.onDateChange}
        />
        <View>
          <Text>SELECTED DATE:{ startDate }</Text>
        </View>
      </View>

    );
}

export default CalenderView;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      marginTop: 100,
    },
  });