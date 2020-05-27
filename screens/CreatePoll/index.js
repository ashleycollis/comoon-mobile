import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput, Button } from 'react-native';

import styles from './styles';
import DateCard from '../../components/DateCard';
import { formatMonth, formatDay } from '../../helpers/dateFormatter';

const CreatePoll = ({ navigation }) => {
    const [pollName, setPollName] = useState('');
    const [selectedDates, setSelectedDates] = useState([
        [new Date('2020-04-22T21:42:39.849Z')],
        [new Date('2020-04-23T21:42:39.849Z')],
        [new Date('2020-04-24T21:42:39.849Z')],
        [new Date('2020-04-25T21:42:39.849Z')],
        [new Date('2020-04-26T21:42:39.849Z')],
    ]);

    return (
        <View style={styles.contentView}>
            <View style={styles.pollNameSection}>
                <TextInput
                    value={pollName}
                    style={styles.polltextInput}
                    onChangeText={(text) => setPollName(text)}
                />
            </View>
            <View style={styles.datesSection}>
                <Text style={styles.sectionTitle}>Date:</Text>
                <View style={styles.numDateOptions}>
                    <Text style={styles.dateOptionsText}
                        onPress={() => navigation.navigate('Calendar')}
                    >
                        {selectedDates.length} slots selected
                    </Text>
                </View>
                <View style={styles.dateOptionsDisplay}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {selectedDates && selectedDates.map((selectedDate) => (
                            <DateCard
                                month={formatMonth(selectedDate[0].getMonth())}
                                date={selectedDate[0].getDate()}
                                day={formatDay(selectedDate[0].getDay())}
                            />
                        ))}
                    </ScrollView>
                </View>
            </View>
            <View style={styles.selectedHours}>
                <Text style={styles.sectionTitle}>Time:</Text>
                <View style={styles.location}>
                    <Text
                        onPress={() => navigation.navigate('TimeGrid', {
                            selectedDates
                        })}
                    >
                    </Text>
                </View>
   
            </View>
            
        </View>
    )
};

export default CreatePoll;

