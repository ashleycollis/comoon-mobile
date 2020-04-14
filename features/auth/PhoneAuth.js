import React, { useState, useRef, useEffect } from "react";
import { View, Button } from "react-native";
import { firebase, firebaseConfig, user } from "../../api/firebaseAPI";
import "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import PhoneInput from "./PhoneInput";

export default function PhoneAuth({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const recaptchaVerifier = useRef(null);

  useEffect(() => {
    if (user) {
      navigation.navigate("SignUp");
    }
  });

  // Call verifyPhoneNumber with the `recaptchaVerifier` ref.
  // This will automatically make the modal visible and display
  // the reCAPTCHA widget to the user.
  onPressSendVerificationCode = async () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    const verificationId = await phoneProvider.verifyPhoneNumber(
      phoneNumber,
      recaptchaVerifier.current
    );
    navigation.navigate("Verification", { verificationId });
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
