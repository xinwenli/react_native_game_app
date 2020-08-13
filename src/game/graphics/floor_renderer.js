import React, { Component } from "react";
import {View, Image} from "react-native";
import Images from "../assets/image/images";

export default class RectRenderer extends Component {
  render() {
    const width = this.props.size.width;
    const height = this.props.size.height;
    const x = this.props.body.position.x - width/2;
    const y = this.props.body.position.y - height/2;
    
    const iterNumber = Math.ceil(width/ height);

    const imageFill = (iterNumber, fillWidth, fillHeight, imgSource) => {
        res = []
        for(var i = 0; i < iterNumber; i++){
            res.push(
                <Image style={{width:fillWidth, height:fillHeight}} key={i} source={imgSource} />
            )
        }
        return res;
    }

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
          backgroundColor: this.props.color,
        }} >
        {//imageFill(iterNumber, height, height, Images.yelllowBricksBlock)
        Array.apply(null, new Array(iterNumber)).map((el, idx) => {
            return <Image style={{width:height, height:height}} key={idx} source={Images.yelllowBricksBlock} />
        })
        }
      </View>
    );
  }
}
