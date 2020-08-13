import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Screen } from "../utils/screen";

const boxWidth = Screen.width / 3;
const boxHeight = (Screen.height / 5) * 3;
//const boxTop = 0;
//const boxLeft = 0;
const boxTop = Screen.height / 2 - boxHeight / 2;
const boxLeft = Screen.width / 2 - boxWidth / 2;
const titleHeight = boxHeight / 3;
const optionHeight = (boxHeight / 9) * 2;

const OptionView = (optionIdx,optionName, onOptionPresses) => {
  return (
    <View key={String(Math.random()*10000)}
      style={[
        styles.container,
        {
          top: titleHeight + optionIdx*optionHeight,
          left: 0,
          width: boxWidth,
          height: optionHeight,
          backgroundColor: "blue",
        },
      ]}
    >
      <TouchableOpacity onPress={onOptionPresses}>
        <Text style={[styles.textStyle, { paddingTop: optionHeight / 3 }]}>
          {optionName}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const OptionViews = (optionNames, onOptionPresses) => {
  let res = []
  for(const i in optionNames){
    let optionName = optionNames[i];
    let onOptionPress = onOptionPresses[i];
    res.push(OptionView(i, optionName, onOptionPress));
  }
  return res;
};

const GameOptionBox = (props) => {
  if (props.visible) {
    return (
      <View
        style={[
          styles.container,
          {
            top: boxTop,
            left: boxLeft,
            width: boxWidth,
            height: boxHeight,
            opacity: 0.8,
            backgroundColor: "transparent",
          },
        ]}
      >
        <View
          style={[
            styles.container,
            {
              top: 0,
              left: 0,
              width: boxWidth,
              height: titleHeight,
              backgroundColor: "yellow",
            },
          ]}
        >
          <Text style={[styles.textStyle, { paddingTop: titleHeight / 3 }]}>
            {props.title}
          </Text>
        </View>
        {OptionViews(props.optionNames, props.onOptionPresses)}
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
  textStyle: {
    //position: "relative",
    color: "black",
    opacity: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    //textAlign: "center",
    //justifyContent: "center",
    //alignItems: "center",
    alignSelf: "center",
  },
});

export default GameOptionBox;
