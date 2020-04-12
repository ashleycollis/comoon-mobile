import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import store from "./store";
import useLinking from "./navigation/useLinking";
import { Provider } from "react-redux";
import Navigation from "./navigation/Navigation";
import { checkLoggedIn } from "./api/firebaseAPI";

// atob error fix
import { decode, encode } from "base-64";

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

export default function App({ skipLoadingScreen }) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...MaterialCommunityIcons.font,
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        });

        await checkLoggedIn();
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !skipLoadingScreen) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <Navigation
            containerRef={containerRef}
            initialNavigationState={initialNavigationState}
          />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
