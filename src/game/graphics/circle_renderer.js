import React, { Component } from "react";
import { View } from "react-native";

export default class CircleRenderer extends Component {
  render() {
    const radius = this.props.body.circleRadius;
    const x = this.props.body.position.x - radius;
    const y = this.props.body.position.y - radius;

    return (
      <View
        style={{
          position: "absolute",
          top: y,
          left: x,
          borderRadius: radius * 2,
          width: radius * 2,
          height: radius * 2,
          backgroundColor: this.props.color,
        }}
      />
    );
  }
}
