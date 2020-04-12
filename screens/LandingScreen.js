import React from "react";
import { View } from "react-native";
import PhoneAuth from "../features/auth/PhoneAuth";

export default function LandingScreen({ navigation }) {
  return (
    <View>
      <PhoneAuth navigation={navigation} />
    </View>
  );
}
