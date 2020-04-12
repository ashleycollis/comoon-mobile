import React from "react";
import { View } from "react-native";
import PhoneVerification from "../features/auth/PhoneVerification";

export default function LandingScreen({ route, navigation }) {
  const { verificationId } = route.params;
  return (
    <View>
      <PhoneVerification
        verificationId={verificationId}
        navigation={navigation}
      />
    </View>
  );
}
