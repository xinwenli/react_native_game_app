import React, { Component } from "react";
import {View} from "react-native";

export default class RectRenderer extends Component {
  render() {
    const width = this.props.size.width;
    const height = this.props.size.height;
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
          backgroundColor: this.props.color,
        }}
      />
    );
  }
}
