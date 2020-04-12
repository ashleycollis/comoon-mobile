import React, { useState, useRef } from "react";
import { View, Button } from "react-native";
import { firebase, firebaseConfig } from "../../api/firebaseAPI";
import "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import PhoneInput from "./PhoneInput";

export default function PhoneAuth({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const recaptchaVerifier = useRef(null);

  // Call verifyPhoneNumber with the `recaptchaVerifier` ref.
  // This will automatically make the modal visible and display
  // the reCAPTCHA widget to the user.
  onPressSendVerificationCode = async () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    const verificationId = await phoneProvider.verifyPhoneNumber(
      phoneNumber,
      recaptchaVerifier.current
    );
    navigation.navigate("VerificationScreen", { verificationId });
  };

  return (
    <View>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <PhoneInput phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
      <Button
        title="Send Verification Code"
        onPress={onPressSendVerificationCode}
      />
    </View>
  );
}
