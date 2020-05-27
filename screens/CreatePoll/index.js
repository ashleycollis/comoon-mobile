import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput, Button, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import styles from './styles';
import DateCard from '../../components/DateCard';
import { formatMonth, formatDay } from '../../helpers/dateFormatter';

const ScreenHeight = Dimensions.get('window').height;

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
                    <LinearGradient
          colors={['#0066FF', '#0A0080']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: ScreenHeight,
          }}
        />
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
                    <Text style={styles.numOfSelectedOptions}
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
            <View style={styles.TimeSection}>
                <Text style={styles.sectionTitle}>Time:</Text>
                <View>
                    <Text style={styles.numOfSelectedOptions}
                        onPress={() => navigation.navigate('TimeGrid', {
                            selectedDates
                        })}
                    >
                    </Text>
                </View>
            </View>
            <View style={styles.LocationSection}>
                <Text style={styles.sectionTitle}>Location:</Text>
                <Text style={styles.numOfSelectedOptions}>
                </Text>
            </View>
            <View style={styles.botttomLogo}>
                <TouchableOpacity activeOpacity={0.5}>
                    <Image source={require('../../images/comoon_bottom_logo.png')} style={styles.floatingButtonStyle}/>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default CreatePoll;

