import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import { getCallingCode } from "react-native-country-picker-modal";

import * as Cellular from "expo-cellular";

export default function PhoneInput({ setPhoneNumber }) {
  const [number, setNumber] = useState("");
  const [country, setCountry] = useState({
    cca2: Cellular.isoCountryCode.toUpperCase(),
    callingCode: 351,
  });
  useEffect(() => {
    async function guessCallingCode() {
      const code = await getCallingCode("PT");
      setCountry((country) =>
        !country["name"] ? { ...country, callingCode: code } : country
      );
    }
    guessCallingCode();
  }, []);

  return (
    <View style={styles.container}>
      <CountryPicker
        countryCode={country.cca2}
        withCallingCode
        onSelect={(country) => {
          setCountry(country);
          setPhoneNumber("+" + country.callingCode + number);
        }}
      />
      <Text style={styles.callingCode}>+{country.callingCode}</Text>
      <TextInput
        style={styles.input}
        autoFocus
        autoCompleteType="tel"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        onChangeText={(number) => {
          setNumber(number);
          setPhoneNumber("+" + country.callingCode + number);
        }}
        value={number}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  callingCode: {
    marginLeft: -7,
    marginRight: 7,
  },
  input: {
    height: 40,
    width: "100%",
  },
});
