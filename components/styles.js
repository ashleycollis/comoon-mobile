import { StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    dateCardContainer: {
        height: deviceWidth / 4,
        width: deviceWidth / 4,
        padding: 5,
        borderWidth: 1,
        borderRadius: 20,
        color: '#000',
        backgroundColor: '#fff', 
        alignItems: 'center',
        margin: 8,
    },
    month: {
        color: '#F8C67D',
        fontSize: 15,
    },
    date: {
        fontSize: 40,
    },
    day: {
        fontSize: 15,
    },
});