import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";
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
      const code = await getCallingCode(country.cca2);
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
        withCallingCodeButton
        withFilter
        onSelect={(country) => {
          setCountry(country);
          setPhoneNumber("+" + country.callingCode + number);
        }}
      />
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
  input: {
    marginLeft: 7,
    height: 40,
    width: "100%",
  },
});
