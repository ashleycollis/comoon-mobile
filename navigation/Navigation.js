import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./BottomTabNavigator";
import LandingScreen from "../screens/LandingScreen";
import VerificationScreen from "../screens/VerificationScreen";
import SignUpScreen from "../screens/SignUpScreen";
import AnswerPollScreen from "../screens/AnswerPollScreen";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
});

const Stack = createStackNavigator();

function Navigation({ containerRef, initialNavigationState, loggedIn }) {
  return (
    <NavigationContainer
      ref={containerRef}
      initialState={initialNavigationState}
    >
      <Stack.Navigator>
        {loggedIn ? (
          <>
            <Stack.Screen name="Answer" component={AnswerPollScreen} />
            <Stack.Screen name="Root" component={BottomTabNavigator} />
          </>
        ) : (
          <>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Verification" component={VerificationScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default connect(mapStateToProps)(Navigation);
