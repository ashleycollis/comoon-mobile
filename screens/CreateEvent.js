import React, { Component, useEffect, useState } from "react";
import {StyleSheet, Text, TextInput, Button} from 'react-native';


export function CreateEvent()=>{
    const [eventTitle, setEventTitle] = useState(null);
    const [activity, SetActivity] = useState(null);
    const [eventLink, SetEventLink] = useState(null);

    return(
        <>
        <TextInput/>
        <TextInput/>
        <TextInput/>
        <Button>Generate Link</Button>
        <TextInput/>
        </>
    )
}

const styles  = StyleSheet.styles({
    container: {
        
    },
    textStyle: {

    }

})