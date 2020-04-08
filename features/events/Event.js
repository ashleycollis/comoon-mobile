import React, { useEffect } from "react";
import { Text, ScrollView } from "react-native";
import { connect } from "react-redux";
import { fetchEvent } from "./eventsSlice";

const mapStateToProps = (state) => ({
  evs: state.events,
});
const mapDispatchToProps = { fetchEvent };

const Event = ({ evs, fetchEvent }) => {
  const { events } = evs;
  const id = "ZnyhJAgy6cFm5mfMj9GZ";
  useEffect(() => {
    if (!events[id]) fetchEvent(id);
  });
  return (
    <ScrollView>
      {!!events[id] ? <Text>{events[id].name}</Text> : <Text>Not Found?</Text>}
    </ScrollView>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Event);
