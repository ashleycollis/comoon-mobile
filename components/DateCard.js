import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

const DateCard = ({ month, date, day }) => (
    <View style={styles.dateCardContainer}>
        <Text style={styles.month}>{month}</Text>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.day}>{day}</Text>
    </View>
);

export default DateCard;