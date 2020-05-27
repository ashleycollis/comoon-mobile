import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./BottomTabNavigator";
import LandingScreen from "../screens/LandingScreen";
import VerificationScreen from "../screens/VerificationScreen";
import SignUpScreen from "../screens/SignUpScreen";
import CalendarScreen from "../screens/CalenderScreen"
import TimeScreen from "../screens/TimeScreen"
import TimeGrid from "../screens/TimeGrid"
import CreatePoll from "../screens/CreatePoll";
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
        {true ? (
          <>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen name="Calendar" component={CalendarScreen}/>
            <Stack.Screen name="TimeScreen" component={TimeScreen}/>
            <Stack.Screen name="TimeGrid" component={TimeGrid}/>
            <Stack.Screen name="CreatePoll" component={CreatePoll}/>

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
