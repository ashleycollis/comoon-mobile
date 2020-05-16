import React, {useState, useEffect} from "react";
import {View, Text} from "react-native";

import styles from './styles';

const DateTimeCard = ({ startDate, endDate }) => {
    const dateDisplay = `${startDate}${endDate ? ` - ${endDate}` : ''}`;
    return (
        <View style={styles.cardContainer}>
            <View style={styles.dateTimeContainer}>
                <Text style={styles.dateRange}>{dateDisplay}</Text>
                <View style={styles.timeSlots}>
                    <Text style={styles.timeSlots}>10:00 - 13:00</Text>
                </View>
            </View>
            <View style={styles.addBtnContainer}>
                <Text>+ add button</Text>
            </View>
        </View>
    )
};
export default DateTimeCard; 