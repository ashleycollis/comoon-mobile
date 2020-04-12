import React, { useState, useRef } from "react";
import { View, TextInput, Button } from "react-native";
import { firebase, firebaseConfig } from "../../api/firebaseAPI";
import "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import PhoneInput from "./PhoneInput";

export default function PhoneAuth({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  console.log(phoneNumber);

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
    setVerificationId(verificationId);
  };

  // Whenever the user has entered the verification-code, continue and
  // create the credential and sign in.
  onPressConfirmVerificationCode = async () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    );
    const authResult = await firebase.auth().signInWithCredential(credential);
    console.log(authResult);
    navigation.navigate("Root");
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
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
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
