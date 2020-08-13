import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Screen } from "../utils/screen";

export default class MapEntry extends Component {
  constructor(props) {
    super(props);
    this.MapEntryStyle = {
      color: props.color,
      radius: props.radius,
    };
    this.entryProp = props.entryProp;
    this.onPress = props.onPress;
  }

  render() {
    return (
      <View style={[styles.container, ,]}>
        <TouchableOpacity
          style={{
            borderRadius: this.MapEntryStyle.radius,
            width: this.MapEntryStyle.radius * 2,
            height: this.MapEntryStyle.radius * 2,
            backgroundColor: this.MapEntryStyle.color,
          }}
          onPress={this.props.onPress}
        />
      </View>
    );
  }
}

MapEntry.defaultProps = {
  color: "blue",
  radius: Screen.height / 20,
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
});
