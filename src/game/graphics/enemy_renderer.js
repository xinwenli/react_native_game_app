import React, { Component } from "react";
import { View, Image } from "react-native";
import Images from "../assets/image/images";
import * as Constants from "../assets/const/constants";

export default class EnemyRenderer extends Component {
  constructor(props) {
    super(props);
    this.enemyActionState = this.props.enemyActionState;

  }

  render() {
    //console.log(this.props);
    let img = Images["enemy" + this.props.enemyKind + String(this.props.pos)];
    //console.log("blackCreature" + this.props.enemyActionState + String(this.props.pos));
    //console.log(this.props.enemyActionState);
    const imgSize = ({
      width: imgWidth,
      height: imgHeight,
    } = Image.resolveAssetSource(img));
    let height;
    let width;
    let x;
    let y;
    if (
      Constants.originalEnemyPixel.width < Constants.originalEnemyPixel.height
    ) {
      height =
        (this.props.body.circleRadius / Constants.originalEnemyPixel.width) *
        imgHeight;
      width =
        (this.props.body.circleRadius / Constants.originalEnemyPixel.width) *
        imgWidth;
      x = this.props.body.position.x - width / 2;
      y =
        this.props.body.position.y -
        height / 2 -
        this.props.body.circleRadius *
          (Constants.originalEnemyPixel.height /
            Constants.originalEnemyPixel.width -
            1);
    } else {
      height =
        (this.props.body.circleRadius / Constants.originalEnemyPixel.height) *
        imgHeight;
      width =
        (this.props.body.circleRadius / Constants.originalEnemyPixel.height) *
        imgWidth;
      x =
        this.props.body.position.x -
        width / 2 -
        this.props.body.circleRadius *
          (Constants.originalEnemyPixel.width /
            Constants.originalEnemyPixel.height -
            1);
      y = this.props.body.position.y - height / 2;
    }
    //const x = this.props.body.position.x - width / 2;
    //const y = this.props.body.position.y - height / 2;

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
        <Image
          style={{
            width: width,
            height: height,
            transform: [{ scaleX:this.props.scaleX}],
          }}
          source={img}
          resizeMode="stretch"
        />
      </View>
    );
  }
}

EnemyRenderer.defaultProps = {
  scaleX: -1,
};
