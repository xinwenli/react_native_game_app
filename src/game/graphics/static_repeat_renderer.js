import React, { Component } from "react";
import {View, Image} from "react-native";
import Images from "../assets/image/images";
import * as Constants from "../assets/const/constants";

export default class StaticRepeatRenderer extends Component {
  render() {
    const img = this.props.imgSource;
    const imgSize = Constants[this.props.imgName + "Size"];
    const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
    const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
    const x = this.props.body.position.x - width/2;
    const y = this.props.body.position.y - height/2;
    
    const iterNumber = Math.ceil(width / (height/imgSize.height * imgSize.width));
    //console.log(iterNumber);
    return (
      <View
        style={{
          position: "absolute",
          top: y,
          left: x,
          width: width,
          height: height,
          overflow: "hidden",
          flexDirection: "row",
        }} >
        {//imageFill(iterNumber, height, height, Images.yelllowBricksBlock)
        Array.apply(null, new Array(iterNumber)).map((el, idx) => {
            return <Image style={{width:height/imgSize.height * imgSize.width, height:height}} key={idx} source={img} />
        })
        }
      </View>
    );
  }
}
