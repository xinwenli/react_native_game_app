import React, { Component } from "react";
import { View, Image } from "react-native";
import Images from "../assets/image/images";
import * as Constants from "../assets/const/constants";

export default class StaticBlockRenderer extends Component {
  constructor(props) {
    super(props);
    this.imgName = this.props.imgName;
    this.imgSize = Constants[this.props.imgName + "ImgSize"];
    this.screenRenderSize = Constants[this.props.imgName + "RenderSize"];
    this.width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
    this.height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
    this.left = this.props.body.position.x - this.width / 2;
    this.top = this.props.body.position.y - this.height / 2;
    this.renderTop = this.props.renderTop;
    this.renderLeft = this.props.renderLeft;
    this.renderRight = this.props.renderRight;
    this.renderBottom = this.props.renderBottom;
    this.color = this.props.color;

    this.topRenderedView = this.columnTopRenderer();
    this.middleRenderView = this.columnMiddleRender();
    this.bottomRenderView = this.columnBottomRenderer();
  }

  columnTopRenderer = () => {
    let top = [];
    if (this.screenRenderSize === undefined && this.renderTop === undefined)
      return null;
    let columnIterNumber =
      Math.round(
        (this.width -
          this.screenRenderSize["topleft"].width -
          this.screenRenderSize["topright"].width) /
          this.screenRenderSize["topmiddle"].width
      ) + 2;

    for (var i = 0; i < columnIterNumber; i++) {
      if (i === 0 && Images[this.imgName + "TopLeft"] != undefined) {
        top.push(
          <Image
            style={{
              width: this.screenRenderSize["topleft"].width,
              height: this.screenRenderSize["topleft"].height,
            }}
            key={String(Math.random() * 1000)}
            source={Images[this.imgName + "TopLeft"]}
          />
        );
      }
      if (
        i === columnIterNumber - 1 &&
        Images[this.imgName + "TopRight"] != undefined
      ) {
        top.push(
          <Image
            style={{
              width: this.screenRenderSize["topright"].width,
              height: this.screenRenderSize["topright"].height,
            }}
            key={String(Math.random() * 1000)}
            source={Images[this.imgName + "TopRight"]}
          />
        );
      }
      if (
        i != 0 &&
        i != columnIterNumber - 1 &&
        Images[this.imgName + "TopMiddle"] != undefined
      ) {
        top.push(
          <Image
            style={{
              width: this.screenRenderSize["topmiddle"].width,
              height: this.screenRenderSize["topmiddle"].height,
            }}
            key={String(Math.random() * 1000)}
            source={Images[this.imgName + "TopMiddle"]}
          />
        );
      }
    }
    return top;
  };

  columnMiddleRender = () => {
    if (this.screenRenderSize === undefined) return null;
    let middle = [];
    if (this.renderLeft && Images[this.imgName + "MiddleLeft"] != undefined) {
      middle.push(
        <Image
          style={{
            top: 0,
            left: 0,
            width: this.screenRenderSize["middleleft"].width,
            height: this.renderBottom
            ? this.renderTop
              ? this.height -
                this.screenRenderSize["topleft"].height -
                this.screenRenderSize["bottomleft"].height
              : this.height - this.screenRenderSize["bottomleft"].height
            : this.renderTop
            ? this.height - this.screenRenderSize["topleft"].height
            : this.height,
            resizeMode: "stretch",
          }}
          key={String(Math.random() * 1000)}
          source={Images[this.imgName + "MiddleLeft"]}
        />
      );
    }
    if (this.renderRight && Images[this.imgName + "MiddleRight"] != undefined) {
      middle.push(
        <Image
          style={{
            top: 0,
            left: this.renderLeft
              ? this.width -
                this.screenRenderSize["middleright"].width -
                this.screenRenderSize["middleleft"].width
              : this.width - this.screenRenderSize["middleright"].width,
            width: this.screenRenderSize["middleright"].width,
            //height: 20,
            height: this.renderBottom
              ? this.renderTop
                ? this.height -
                  this.screenRenderSize["topleft"].height -
                  this.screenRenderSize["bottomleft"].height
                : this.height - this.screenRenderSize["bottomleft"].height
              : this.renderTop
              ? this.height - this.screenRenderSize["topleft"].height
              : this.height,
            resizeMode: "stretch",
          }}
          key={String(Math.random() * 1000)}
          source={Images[this.imgName + "MiddleRight"]}
        />
      );
    }
    return middle;
  };

  columnBottomRenderer = () => {
    if (this.screenRenderSize === undefined) return null;
    let bottom = [];
    if (this.renderBottom && Images[this.imgName + "BottomLeft"] != undefined) {
      bottom.push(
        <Image
          style={{
            width: this.screenRenderSize["bottomleft"].width,
            height: this.screenRenderSize["bottomleft"].height,
          }}
          key={String(Math.random() * 1000)}
          source={Images[this.imgName + "BottomLeft"]}
        />
      );
      bottom.push(
        <Image
          style={{
            width:
              this.width -
              this.screenRenderSize["bottomleft"].width -
              this.screenRenderSize["bottomright"].width,
            height: this.screenRenderSize["bottommiddle"].height,
            resizeMode: "stretch",
          }}
          key={String(Math.random() * 1000)}
          source={Images[this.imgName + "BottomMiddle"]}
        />
      );
      bottom.push(
        <Image
          style={{
            width: this.screenRenderSize["bottomright"].width,
            height: this.screenRenderSize["bottomright"].height,
          }}
          key={String(Math.random() * 1000)}
          source={Images[this.imgName + "BottomRight"]}
        />
      );
    }

    return bottom;
  };

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
          flexDirection: "column",
        }}
      >
        <View style={{ flexDirection: "row" }}>{this.topRenderedView}</View>
        <View style={{ flexDirection: "row", backgroundColor: this.color }}>{this.middleRenderView}</View>
        <View style={{ flexDirection: "row" }}>{this.bottomRenderView}</View>
      </View>
    );
  }
}

StaticBlockRenderer.defaultProps = {
  renderTop: true,
  renderLeft: true,
  renderRight: true,
  renderBottom: false,
};
