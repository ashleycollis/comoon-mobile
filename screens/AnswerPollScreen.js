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
      availabilityList: [],
      adding: false,
    };
    this.isOccupied = this.isOccupied.bind(this);
  }

  scrollOffset = 0;
  gestureOffset = 0;
  blocks = 1;
  height = new Animated.Value(0);

  panResponder = PanResponder.create({
    // Ask to be the responder:
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,

    onPanResponderGrant: async (_evt, gestureState) => {
      let headerHeight = this.state.startY;

      // The gesture has started
      if (!headerHeight) {
        const ref = this.viewRef;

        // Moving this to componentDidMount didn't work
        headerHeight = await new Promise((resolve) => {
          ref.measure((_x, _y, _width, _height, _pageX, pageY) => {
            resolve(pageY);
          });
        });
      }
      const top = gestureState.y0 + this.scrollOffset - headerHeight;
      if (!this.isOccupied(top)) {
        const topWithSnapping = top - (top % TIMEBOX_HEIGHT);
        const stateChange = {
          top: topWithSnapping + CALENDAR_MARGIN_TOP,
          adding: true,
        };
        this.setState(
          !this.state.startY
            ? { ...stateChange, startY: headerHeight }
            : stateChange
        );
        this.gestureOffset = top % TIMEBOX_HEIGHT;
        this.height.setValue(TIMEBOX_HEIGHT);
        this.blocks = 1;
      }
    },

    onPanResponderMove: (_evt, gestureState) => {
      if (this.state.adding) {
        const height = gestureState.dy + this.gestureOffset;
        if (
          (height < (this.blocks - 1) * TIMEBOX_HEIGHT ||
            height > this.blocks * TIMEBOX_HEIGHT) &&
          !this.isOccupied(this.state.top + height)
        ) {
          const heightWithSnapping =
            TIMEBOX_HEIGHT + height - (height % TIMEBOX_HEIGHT);
          this.blocks = heightWithSnapping / TIMEBOX_HEIGHT;
          Animated.timing(this.height, {
            toValue: heightWithSnapping,
            duration: 10,
          }).start();
        }
      }
    },

    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => {
      // The user has released all touches while this view is the
      // responder. This typically means a gesture has succeeded
      if (this.state.adding) {
        this.setState((state) => {
          return this.height._value > 0
            ? {
                availabilityList: [
                  ...state.availabilityList,
                  { startY: this.state.top, height: this.height._value },
                ],
                adding: false,
              }
            : {
                adding: false,
              };
        });
      }
    },
    onPanResponderTerminate: (evt, gestureState) => {
      // Another component has become the responder, so this gesture
      // should be cancelled
      this.setState({ adding: false });
    },
    onShouldBlockNativeResponder: (evt, gestureState) => {
      // Returns whether this component should block native components from becoming the JS
      // responder. Returns true by default. Is currently only supported on android.
      return true;
    },
  });

  isOccupied(y) {
    const test = this.state.availabilityList.reduce((acc, item) => {
      const { startY, height } = item;
      return acc || (startY <= y && y <= startY + height);
    }, false);
    return test;
  }

  render() {
    const { availabilityList, adding, top } = this.state;
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
          {adding && (
            <View style={styles.overlay}>
              <Animated.View
                style={[
                  styles.selectionBox,
                  { height: this.height, marginTop: top },
                ]}
              />
            </View>
          )}
          {availabilityList.map(({ startY, height }) => (
            <View style={styles.overlay} key={startY}>
              <Animated.View
                style={[styles.selectionBox, { height, marginTop: startY }]}
              />
            </View>
          ))}
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
