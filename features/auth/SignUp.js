import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Keyboard } from "react-native";
import { authentication } from "../../api/firebaseAPI";
import { login } from "./authSlice";
import { connect } from "react-redux";

const mapDispatchToProps = { login };

function SignUp({ login }) {
  const [name, setName] = useState("");

  onPressDone = async () => {
    await authentication.currentUser.updateProfile({
      displayName: name,
      photoURL: "https://example.com/jane-q-user/profile.jpg",
    });

    login(true);
    Keyboard.dismiss();
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={(name) => setName(name)}
        value={name}
      />
      <Button title="Done" onPress={onPressDone} />
    </View>
  );
}

export default connect(null, mapDispatchToProps)(SignUp);

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "100%",
  },
});
