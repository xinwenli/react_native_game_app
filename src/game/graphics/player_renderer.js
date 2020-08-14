import React, { Component } from "react";
import {View, Image} from "react-native";
import Images from "../assets/image/images";
import * as Constants from "../assets/const/constants";

export default class PlayerRenderer extends Component {
  render() {
    const height = this.props.body.circleRadius*2;
    const width = height / Constants.PlayerImageSize.height * Constants.PlayerImageSize.width;
    const x = this.props.body.position.x - width/2;
    const y = this.props.body.position.y - height/2;
    return (
      <View
        style={{
          position: "absolute",
          top: y,
          left: x,
          width: width,
          height: height,
        }}
      >
        <Image style={{width:width, height:height}} source={Images.blackCat} resizeMode="stretch" />
      </View>
    );
  }
}
