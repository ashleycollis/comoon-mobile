import React, { useState, useEffect} from "react";
import {StyleSheet, Text, View, Button} from "react-native";
import TimeCard from "../components/TimeCard";

const CreateTimeSlot = () => {
    const [numOfTimeSlots, setNumOfTimeSlots] = useState('');
}
return(
    <View>
        <Button>
            Add Universal Time slots
        </Button>
        <TimeCard/>
    </View>
)

export default CreateTimeSlot;

