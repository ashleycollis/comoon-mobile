import React, { useEffect } from "react";
import { View, Image, ActivityIndicator, StyleSheet } from "react-native";

export default function SplashScreen() {
  useEffect(() => firebase.auth().onAuthStateChanged((user) => logIn(!!user)));
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/robot-prod.png")}
        style={styles.welcomeImage}
      />
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
  },
});
