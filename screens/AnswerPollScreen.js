import React from "react";
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  PanResponder,
  Animated,
  TouchableOpacity,
} from "react-native";

import { selectionAsync } from "expo-haptics";

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
    this.removeAvailability = this.removeAvailability.bind(this);
  }

  scrollOffset = 0;
  gestureOffset = 0;
  blocks = 1;
  height = new Animated.Value(0);

  mainPanResponder = PanResponder.create({
    // Ask to be the responder:
    onStartShouldSetPanResponder: (evt) => true,
    onStartShouldSetPanResponderCapture: (evt) => false, // Children respond first
    onMoveShouldSetPanResponder: (evt) => true,
    onMoveShouldSetPanResponderCapture: (evt) => true,

    onPanResponderGrant: async (_evt, gestureState) => {
      console.log("mainpan respond");
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
      if (!this.isOccupied(top, 0)) {
        console.log("starting timeout");
        this.longpressTimeout = setTimeout(() => {
          console.log("start gesture");
          selectionAsync();
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
        }, 500);
      }
    },

    onPanResponderMove: (_evt, gestureState) => {
      if (this.state.adding) {
        const height = gestureState.dy + this.gestureOffset;
        if (
          (height < (this.blocks - 1) * TIMEBOX_HEIGHT ||
            height > this.blocks * TIMEBOX_HEIGHT) &&
          !this.isOccupied(this.state.top, height)
        ) {
          const heightWithSnapping =
            height > 0
              ? TIMEBOX_HEIGHT + height - (height % TIMEBOX_HEIGHT)
              : 0;
          this.blocks = heightWithSnapping / TIMEBOX_HEIGHT;
          Animated.timing(this.height, {
            toValue: heightWithSnapping,
            duration: 10,
          }).start();
        }
      } else {
        console.log("KAPUT");
      }
    },

    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => {
      // The user has released all touches while this view is the
      // responder. This typically means a gesture has succeeded
      console.log("timeout cleared: success");
      clearTimeout(this.longpressTimeout);
      if (this.state.adding) {
        this.setState((state) => {
          return this.height._value - this.gestureOffset > 0
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
      console.log("timeout cleared: cancel");

      clearTimeout(this.longpressTimeout);
      this.setState({ adding: false });
    },
    onShouldBlockNativeResponder: (evt, gestureState) => {
      // Returns whether this component should block native components from becoming the JS
      // responder. Returns true by default. Is currently only supported on android.
      return false;
    },
  });

  backgroundPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, g) => false,
  });

  isOccupied(y, h) {
    return this.state.availabilityList.reduce((acc, item) => {
      const { startY, height } = item;
      return (
        acc ||
        (startY <= y + h && y + h <= startY + height) || // Current drag pos is inside existing block
        (y <= startY && startY + height <= y + h) // Current block contains existing block
      );
    }, false);
  }

  removeAvailability(startY) {
    selectionAsync();
    this.setState({
      availabilityList: this.state.availabilityList.filter(
        (el) => el.startY !== startY
      ),
    });
  }

  render() {
    const { availabilityList, adding, top } = this.state;
    return (
      <View
        ref={(ref) => (this.viewRef = ref)}
        style={styles.container}
        collapsable={false}
        {...this.mainPanResponder.panHandlers}
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
              <Animated.View style={{ height, marginTop: startY }}>
                <TouchableOpacity
                  onLongPress={() => this.removeAvailability(startY)}
                  style={[styles.selectionBox, { height }]}
                />
              </Animated.View>
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
