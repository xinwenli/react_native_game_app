import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Modal } from "react-native";
import { Screen } from "../utils/screen";

const tapToStart = (props) => {
  let width = Screen.width;
  let height = Screen.height;
  let top = 0;
  let left = 0;
  if (props.visible) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[
            styles.container,
            { top: top, left: left, width: width, height: height },
          ]}
          onPress={props.onPress}
        >
          <Text
            style={[
              styles.textStyle,
              {
                top: Screen.height / 3,
              },
            ]}
          >
            Tap to start
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "transparent",
  },
  textStyle: {
    color: "black",
    textAlign: "center",
  },
});

export default tapToStart;
