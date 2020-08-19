import React, { Component } from "react";
import { View, Image } from "react-native";
import Images from "../assets/image/images";
import * as Constants from "../assets/const/constants";

export default class PlayerRenderer extends Component {
  constructor(props) {
    super(props);
    this.playerActionState = this.props.playerActionState;
    //this.img = Images["blackCreature" + this.props.playerActionState + String(this.props.pos)];
    //const imgSize = {width: this.imgWidth, height: this.imgHeight} = Image.resolveAssetSource(this.img);
  }

  render() {
    let img = Images["blackCreature" + this.props.playerActionState + String(this.props.pos)];
    //console.log("blackCreature" + this.props.playerActionState + String(this.props.pos));
    //console.log(this.props.playerActionState);
    const imgSize = {width: imgWidth, height: imgHeight} = Image.resolveAssetSource(img);
    const height = this.props.body.circleRadius /Constants.originalBlackCreaturePixel * imgHeight;
    const width = this.props.body.circleRadius /Constants.originalBlackCreaturePixel * imgWidth;
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
        <Image
          style={{ width: width, height: height 
          ,
          transform: [{rotate: this.props.rotate}]}}
          source={img}
          resizeMode="stretch"
        />
      </View>
    );
  }
}

PlayerRenderer.defaultProps = {
  rotate: "0deg",

}
