import React, {useState, useEffect} from "react";
import {View, Text} from "react-native";

import styles from './styles';

const TimeCard = ({startDate, endDate, numOfTimeSlots, startTime, endTime}) => (
    <View style={styles.timecardContainder}>
        <Text>{startDate}-{endDate}</Text>
        <Text>{numOfTimeSlots</Text>
        <Text>{startTime}-{endTime}</Text>
    </View>
);
export default TimeCard;