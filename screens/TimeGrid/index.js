import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

export default class Example extends Component {
    render() {
      const items = [
        { name: '00:00', code: '#1abc9c' },
        { name: '01:00', code: '#3498db' },
        { name: '02:00', code: '#34495e' }, 
        { name: '03:00', code: '#27ae60' },
        { name: '04:00', code: '#8e44ad' },
        { name: '05:00', code: '#f1c40f' },
        { name: '06:00', code: '#e74c3c' },
        { name: '07:00', code: '#95a5a6' },
        { name: '08:00', code: '#d35400' },
        { name: '09:00', code: '#bdc3c7' }, 
      ];
  
      return (
            <FlatGrid
            itemDimension={200}
            items={items}
            style={styles.gridView}
            // staticDimension={300}
            // fixed
            spacing={4}
            renderItem={({ item, index }) => (
                <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemCode}>{item.code}</Text>
                </View>

            )}
            />

      );
    }
  }
  
  const styles = StyleSheet.create({
    gridView: {
      marginTop: 5,
      flex: 1,
      width:200
    },
    itemContainer: {
      justifyContent: 'flex-start',
      borderRadius: 5,
      padding: 10,
      height: 150,
    },
    itemName: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '600',
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
    },
  });
  


// const items = [
// //     {name: "00:00hrs"},
//     {name: "00:00hrs"},
//     {name: "00:00hrs"},
//     {name: "00:00hrs"},
//     {name: "00:00hrs"},
//     {name: "00:00hrs"},
