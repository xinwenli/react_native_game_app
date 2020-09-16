import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Modal, Image } from "react-native";
import { Screen } from "../utils/screen";
import Images from "../assets/image/images";

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
          <Image source={Images.TapToStartText}
          resizeMode="stretch"
          style={{
            top: Screen.height/3,
            left: Screen.width/2 - Screen.width/4/2,
            width: Screen.width/4,
            height: Screen.height/7,
          }
          }
          />
          {/*
          <Text
            style={[
              styles.textStyle,
              {
                top: Screen.height / 3,
              },
            ]}
          >
            Tap to start
          </Text>*/}
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
