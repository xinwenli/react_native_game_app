import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Screen } from "../utils/screen";

export default class GameButton extends Component {
  constructor(props) {
    super(props);
    this.buttonStyle = {
      width: props.width,
      height: props.height,
      top: props.top,
      left: props.left,
      color: props.color,
    };
  }

  render() {
    if (this.props.visible) {
      return (
        <View style={[styles.container]}>
          <TouchableOpacity
            style={[
              styles.container,
              {
                top: this.buttonStyle.top,
                left: this.buttonStyle.left,
                width: this.buttonStyle.width,
                height: this.buttonStyle.height,
                backgroundColor: this.buttonStyle.color,
              },
            ]}
            onPress={this.props.onPress}
          />
        </View>
      );
    }
    return null;
  }
}

GameButton.defaultProps = {
  color: "blue",
  width: Screen.width / 9,
  height: Screen.height / 8,
  top: Screen.height / 25,
  left: (Screen.width / 8) * 7,
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
});
