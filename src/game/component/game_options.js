import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Screen } from "../utils/screen";
import * as Constants from "../assets/const/constants";
import Images from "../assets/image/images";

const OptionView = (optionIdx, optionName, onOptionPresses) => {
  let optionSignImg = Images[optionName + "Sign"];
  let optionNameTextImg = Images[optionName + "Text"];
  let optionNameTextImgSize= Image.resolveAssetSource(optionNameTextImg);
  let optionNameTextImgRenderWidth =  Constants.gameOptionPadTextRenderSize.height *(optionNameTextImgSize.width/optionNameTextImgSize.height);
  //console.log(optionNameTextImgSize);
  return (
    <View
      key={String(Math.random() * 10000)}
      style={[
        styles.container,
        {
          top:
            Constants.gameOptionPadSize.titleHeight +
            Constants.gameOptionBoxRenderSize.paddingTop +
            optionIdx * Constants.gameOptionPadSize.optionHeight,
          left: 0,
          width: Constants.gameOptionPadSize.optionWidth,
          height: Constants.gameOptionPadSize.optionHeight,
        },
      ]}
    >
      <TouchableOpacity onPress={onOptionPresses}>
        <Image
          style={{
            position: "absolute",
            top: 0,
            left: Constants.gameOptionBoxRenderSize.paddingLeft,
            width: Constants.gameOptionRenderSize.width,
            height: Constants.gameOptionRenderSize.height,
          }}
          resizeMode="stretch"
          source={Images.OptionPad}
        />
        <Image
          style={{
            position: "absolute",
            top: Constants.gameOptionPadSignRenderSize.paddingTop,
            left: Constants.gameOptionBoxRenderSize.paddingLeft + Constants.gameOptionPadSignRenderSize.paddingLeft,
            width: Constants.gameOptionPadSignRenderSize.width,
            height: Constants.gameOptionPadSignRenderSize.height,
          }}
          resizeMode="stretch"
          source={optionSignImg}
        />
        <Image
          style={{
            position: "absolute",
            top: Constants.gameOptionPadTextRenderSize.paddingTop,
            left: Constants.gameOptionPadTextRenderSize.paddingLeft + Constants.gameOptionBoxRenderSize.paddingLeft + Constants.gameOptionPadSignRenderSize.paddingLeft + (Constants.gameOptionRenderSize.width - Constants.gameOptionPadSignRenderSize.width - Constants.gameOptionPadSignRenderSize.paddingLeft - optionNameTextImgRenderWidth)/2,
            width: optionNameTextImgRenderWidth,
            height: Constants.gameOptionPadTextRenderSize.height,
          }}
          resizeMode="stretch"
          source={optionNameTextImg}
        />
        <Text
          style={[
            styles.textStyle,
            { paddingTop: Constants.gameOptionPadSize.optionHeight / 3 },
          ]}
        >
          {optionName}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const OptionViews = (optionNames, onOptionPresses) => {
  let res = [];
  for (const i in optionNames) {
    let optionName = optionNames[i];
    let onOptionPress = onOptionPresses[i];
    res.push(OptionView(i, optionName, onOptionPress));
  }
  return res;
};

const GameOptionBox = (props) => {
  let titleTextImg = Images[props.title + "Text"];
  const boxHeight =
    Constants.gameOptionPadSize.titleHeight +
    Constants.gameOptionBoxRenderSize.paddingTop +
    props.optionNames.length * Constants.gameOptionPadSize.optionHeight +
    Constants.gameOptionBoxRenderSize.paddingBottom;
  if (props.visible) {
    return (
      <View
        style={[
          styles.container,
          {
            top: Constants.gameOptionBoxPosition.boxTop,
            left: Constants.gameOptionBoxPosition.boxLeft,
            width: Constants.gameOptionBoxRenderSize.boxWidth,
            height: boxHeight,
          },
        ]}
      >
        <Image
          style={styles.titleStyle}
          resizeMode="stretch"
          source={titleTextImg}
        />
        <Image
          style={[
            styles.optionBoxStyle,
            { height: boxHeight - Constants.gameOptionTitleRenderSize.height },
          ]}
          resizeMode="stretch"
          source={Images.OptionBox}
        />
        <View
          style={[
            styles.container,
            {
              top: 0,
              left: 0,
              width: Constants.gameOptionBoxRenderSize.boxWidth,
              height: Constants.gameOptionPadSize.titleHeight,
              backgroundColor: "transparent",
            },
          ]}
        >
          <Text
            style={[
              styles.textStyle,
              { paddingTop: Constants.gameOptionPadSize.titleHeight / 3 },
            ]}
          >
            {props.title}
          </Text>
        </View>
        <View style={styles.paddingTop} />
        {OptionViews(props.optionNames, props.onOptionPresses)}
        <View style={styles.paddingBottom} />
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
  titleStyle: {
    position: "absolute",
    top:
      (Constants.gameOptionPadSize.titleHeight -
        Constants.gameOptionTitleRenderSize.height) /
      2,
    left:
      (Constants.gameOptionBoxRenderSize.boxWidth -
        Constants.gameOptionTitleRenderSize.width) /
      2,
    width: Constants.gameOptionTitleRenderSize.width,
    height: Constants.gameOptionTitleRenderSize.height,
  },
  optionBoxStyle: {
    position: "absolute",
    top: Constants.gameOptionPadSize.titleHeight,
    left: 0,
    width: Constants.gameOptionBoxRenderSize.boxWidth,
    height:
      Constants.gameOptionBoxRenderSize.boxHeight -
      Constants.gameOptionPadSize.titleHeight,
  },
  paddingTop: {
    top: 0,
    left: 0,
    width: Constants.gameOptionBoxRenderSize.boxWidth,
    height:
      Constants.gameOptionBoxRenderSize.boxHeight -
      Constants.gameOptionPadSize.titleHeight,
  },
  paddingBottom: {
    paddingBottom:
      (Constants.gameOptionBoxRenderSize.boxHeight -
        Constants.gameOptionPadSize.titleHeight) /
      10,
  },
});

export default GameOptionBox;
