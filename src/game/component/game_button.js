import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Screen } from "../utils/screen";
import Images from "../assets/image/images";
import * as Constants from "../assets/const/constants";

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
    this.buttonSignStyle = {
      width: props.signWidth,
      height: props.signHeight,
      top: (this.buttonStyle.height - props.signHeight) / 2,
      left: (this.buttonStyle.width - props.signWidth) / 2,
    };
    this.buttonImg = Images["greyButton"];
    this.buttonSign = Images[props.sign + "Sign"];
    this.buttonBackground = props.buttonBackground;
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
                //backgroundColor: this.buttonStyle.color,
              },
            ]}
            onPress={this.props.onPress}
          >
            {
              (this.buttonBackground)? (<Image
                style={{ position: "absolute" }}
                source={this.buttonImg}
                resizeMode="stretch"
                width={this.buttonStyle.width}
                height={this.buttonStyle.height}
              />):(null)
            }
            {/*
            <Image
              style={{ position: "absolute" }}
              source={this.buttonImg}
              resizeMode="stretch"
              width={this.buttonStyle.width}
              height={this.buttonStyle.height}
            />*/
            }

            <Image
              style={{
                position: "absolute",
                top: this.buttonSignStyle.top,
                left: this.buttonSignStyle.left,
              }}
              source={this.buttonSign}
              resizeMode="stretch"
              width={this.buttonSignStyle.width}
              height={this.buttonSignStyle.height}
            />
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }
}

GameButton.defaultProps = {
  color: "blue",
  width: Screen.width / 9,
  height: Screen.height / 7,
  top: Screen.height / 25,
  left: (Screen.width / 8) * 7,
  signWidth: Screen.width / 15,
  signHeight: Screen.height / 13,
  sign: "Pause",
  buttonBackground: true,
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
});
