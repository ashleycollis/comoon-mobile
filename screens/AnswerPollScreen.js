import React from "react";
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  PanResponder,
  Animated,
} from "react-native";

const TIMEBOX_HEIGHT = 60;
const CALENDAR_MARGIN_TOP = 8;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: 0,
      startY: null,
    };
  }

  scrollOffset = 0;
  gestureOffset = 0;
  blocks = 1;
  height = new Animated.Value(0);

  panResponder = PanResponder.create({
    // Ask to be the responder:
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    onPanResponderGrant: async ({ nativeEvent }, gestureState) => {
      // The gesture has started

      if (!this.state.startY) {
        const ref = this.viewRef;
        const startY = await new Promise((resolve) => {
          ref.measure((_x, _y, _width, _height, _pageX, pageY) => {
            resolve(pageY);
          });
        });

        const top = gestureState.y0 + this.scrollOffset - startY;
        const topWithSnapping = top - (top % TIMEBOX_HEIGHT);
        this.setState({ top: topWithSnapping + CALENDAR_MARGIN_TOP, startY });
        this.gestureOffset = top % TIMEBOX_HEIGHT;
      } else {
        const top = gestureState.y0 + this.scrollOffset - this.state.startY;
        const topWithSnapping = top - (top % TIMEBOX_HEIGHT);
        this.setState({ top: topWithSnapping + CALENDAR_MARGIN_TOP });
        this.gestureOffset = top % TIMEBOX_HEIGHT;
      }
      this.height.setValue(TIMEBOX_HEIGHT);
      this.blocks = 1;
    },
    // onPanResponderMove: Animated.event([null, { dy: this.height }]),

    onPanResponderMove: (evt, gestureState) => {
      const height = gestureState.dy + this.gestureOffset;
      if (
        height < (this.blocks - 1) * TIMEBOX_HEIGHT ||
        height > this.blocks * TIMEBOX_HEIGHT
      ) {
        const heightWithSnapping =
          TIMEBOX_HEIGHT + height - (height % TIMEBOX_HEIGHT);
        this.blocks = heightWithSnapping / TIMEBOX_HEIGHT;
        Animated.timing(this.height, {
          toValue: heightWithSnapping,
          duration: 10,
        }).start();
      }
    },

    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => {
      console.log("Released");
      // The user has released all touches while this view is the
      // responder. This typically means a gesture has succeeded
    },
    onPanResponderTerminate: (evt, gestureState) => {
      console.log("Terminated");
      // Another component has become the responder, so this gesture
      // should be cancelled
    },
    onShouldBlockNativeResponder: (evt, gestureState) => {
      // Returns whether this component should block native components from becoming the JS
      // responder. Returns true by default. Is currently only supported on android.
      return true;
    },
  });

  render() {
    return (
      <View
        ref={(ref) => (this.viewRef = ref)}
        style={styles.container}
        collapsable={false}
        {...this.panResponder.panHandlers}
      >
        <ScrollView
          onScroll={({ nativeEvent }) =>
            (this.scrollOffset = nativeEvent.contentOffset.y)
          }
        >
          <View style={styles.timeContainer}>
            <Row time={"10:00"} />
            <Row time={"11:00"} />
            <Row time={"12:00"} />
            <Row time={"13:00"} />
            <Row time={"14:00"} />
            <Row time={"15:00"} />
            <Row time={"16:00"} />
            <Row time={"17:00"} />
            <Row time={"18:00"} />
            <Row time={"19:00"} />
            <Row time={"20:00"} />
            <Row time={"21:00"} />
            <Row time={"21:00"} />
            <Row time={"21:00"} />
            <Row time={"21:00"} />
            <Row time={"21:00"} />
          </View>
          <View style={styles.overlay}>
            <Animated.View
              style={[
                styles.selectionBox,
                { height: this.height, marginTop: this.state.top },
              ]}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

function Row({ time }) {
  return (
    <View style={styles.row}>
      <Text style={styles.hour}>{time}</Text>
      <View style={styles.timeBox} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 8,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  timeContainer: { marginTop: CALENDAR_MARGIN_TOP },
  timeBox: {
    flex: 1,
    height: TIMEBOX_HEIGHT,
    borderColor: "#EBECEF",
    borderTopWidth: 1,
    borderLeftWidth: 1,
  },
  hour: {
    marginTop: -CALENDAR_MARGIN_TOP,
    marginRight: 5,
    width: 40,
    color: "#5F6368",
  },
  overlay: {
    position: "absolute",
    paddingLeft: 45,
    width: "100%",
  },
  selectionBox: {
    backgroundColor: "#ff38917f",
    borderColor: "#ff3891",
    borderWidth: 2,
    borderRadius: 5,
  },
});
