import { StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    /* DateCard designs */
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
    /* DateTimeCard designs */
    cardContainer: {
        flexDirection: 'row',
        height: deviceWidth / 3,
        width: deviceWidth - 25,
        padding: 20,
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#ffff',
        marginVertical: 5,
    },
    dateTimeContainer: {
        flex: 9,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    dateRange: {
        fontSize: 25,
    },
    timeSlots: {
        fontSize: 16
    },
    addBtnContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
});