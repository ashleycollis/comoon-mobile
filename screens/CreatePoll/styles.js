import { StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    contentView: {
        flex: 1,
        backgroundColor: '#0066FF',
        
    },
    pollNameSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    polltextInput: {
        textAlign: 'center',
        height: 55,
        width: deviceWidth - 40,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: '#0B0080',
        color: '#fff',
        fontSize: 20,
    },
    datesSection: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    numDateOptions: {
        flex: 1,
    },
    dateOptionsText: {
        width: deviceWidth - 40,
        borderColor: '#fff',
        borderBottomWidth: 1,
        borderRadius: 6,
        color: '#fff',
        fontSize: 20,
    },
    dateOptionsDisplay: {
        flex: 3,
        flexDirection: 'row',
    },
    selectedHours: {
        flex: 3,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: -40
    },
    selectedHoursTitle: {
        marginLeft: 18,
        alignSelf: 'flex-start',
        fontSize: 15,
        color: 'rgba(0,0,0,0.4)'
    },
    location: {
        width: deviceWidth - 40,
        borderColor: '#fff',
        borderBottomWidth: 1,
        borderRadius: 6,
        marginLeft: 60,
        fontSize: 20,
    },
    locationText: {
        fontSize: 18,
        color: 'rgba(0,0,0,0.4)',
        marginLeft: 3,
        marginTop: 10,
        marginBottom: 10,
    }
});