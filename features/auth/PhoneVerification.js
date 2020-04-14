import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Keyboard } from "react-native";
import { signInWithVerification } from "../../api/firebaseAPI";

export default function PhoneVerification({ verificationId, navigation }) {
  const [verificationCode, setVerificationCode] = useState("");
  // Whenever the user has entered the verification-code, continue and
  // create the credential and sign in.
  onPressConfirmVerificationCode = async () => {
    const { user } = await signInWithVerification(
      verificationId,
      verificationCode
    );
    if (user && !user.displayName) {
      navigation.navigate("SignUp");
    } else {
      Keyboard.dismiss();
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        onChangeText={(verificationCode) =>
          setVerificationCode(verificationCode)
        }
        value={verificationCode}
      />
      <Button
        title="Confirm Verification Code"
        onPress={onPressConfirmVerificationCode}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "100%",
  },
});
