import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import DateTimeCard from "../components/DateTimeCard";
import { ScrollView } from "react-native-gesture-handler";

const CreateTimeSlot = () => {
    const [numOfTimeSlots, setNumOfTimeSlots] = useState('');

    const CreateUniversalTime=()=>{

    }

    const addTimeSlot=()=>{

    }
    return (
        <View>
            <Button>
                Add Universal Time slots
        </Button>
            <ScrollView>
                <DateTimeCard />
            </ScrollView>
        </View>
    )
}

export default CreateTimeSlot;

