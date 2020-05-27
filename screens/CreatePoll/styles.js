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
    sectionTitle: {
        marginLeft: 18,
        alignSelf: 'flex-start',
        fontSize: 18,
        color: '#fff',
        marginTop: 10,
    },
    numOfSelectedOptions: {
        width: deviceWidth - 40,
        borderColor: '#fff',
        borderBottomWidth: 1,
        borderRadius: 6,
        color: '#fff',
        fontSize: 20,
        marginLeft: 60,
        padding: 10,
    },
    dateOptionsDisplay: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'flex-start',
        marginTop: -50
    },
    TimeSection: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    LocationSection: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    touchableOpacityStyle:{
        position: 'absolute',
        width: 75,
        height: 75,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
      },
      floatingButtonStyle: {
        resizeMode: 'contain',
        width: 75,
        height: 55,
        margin: 40,
      },
      botttomLogo:{
        alignContent: 'center',
        alignItems: 'center',
      }
});