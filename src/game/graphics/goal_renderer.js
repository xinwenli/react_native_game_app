import React, { Component } from "react";
import { View, Image } from "react-native";
import Images from "../assets/image/images";
import * as Constants from "../assets/const/constants";

export default class GoalRenderer extends Component {
  constructor(props) {
    super(props);
    this.imgName = this.props.imgName;
    this.img = Images[this.imgName];
    this.imgRenderSize = Constants[this.imgName + "RenderSize"];

    this.width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
    this.height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
    this.left = this.props.body.position.x - this.width / 2;
    this.top = this.props.body.position.y - this.height / 2;

    this.color = this.props.color;
    this.renderedView = this.setupView();
  }

  setupView = () => {
      return (        <Image
        style={{
          width: this.imgRenderSize.width,
          height: this.imgRenderSize.height,
        }}
        key={String(Math.random() * 1000)}
        source={this.img}
        resizeMode="stretch"
      />);
  }

  render() {
    this.left = this.props.body.position.x - this.width / 2;
    this.top = this.props.body.position.y - this.height / 2;
    return (
      <View
        style={{
          position: "absolute",
          top: this.top,
          left: this.left,
          width: this.width,
          height: this.height,
          overflow: "hidden",
        }}
      >
        {this.renderedView}
      </View>
    );
  }
}

GoalRenderer.defaultProps = {
  imgName: "goal",
  color: "blue",
};
