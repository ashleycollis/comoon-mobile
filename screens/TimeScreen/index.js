import React from 'react';
import { View, ScrollView, Text, Button, StyleSheet, Modal} from 'react-native';

import { formatMonth } from '../../helpers/dateFormatter';
import DateTimeCard from '../../components/DateTimeCard';

const TimeScreen = ({ route }) => {
    const { selectedDates } = route.params;
    
    return (
        <View style={styles.container}>
            <View style={styles.universalTimeContainer}>
                <Button
                  title="Create Universal Time Slot"
                  color=""
                  style={styles.universalTimeBtn}
                  onPress={() => {}}
                />
            </View>
            <ScrollView>
                {selectedDates && selectedDates.map((date) => (
                    <DateTimeCard
                    startDate={
                        `${date[0].getDate()} ${formatMonth(date[0].getMonth())}`
                    }
                    />
                ))}
            </ScrollView>
        </View>
    )
}

export default TimeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0066FF',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    universalTimeContainer: {
        padding: 20,
    },
    universalTimeBtn: {
        borderRadius: 30,
        height: 20,
    }
})