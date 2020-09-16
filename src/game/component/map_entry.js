import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Screen } from "../utils/screen";
import Images from "../assets/image/images";
import * as Constants from "../assets/const/constants";


export default class MapEntry extends Component {
  constructor(props) {
    super(props);
    this.MapEntryStyle = {
      color: props.color,
      radius: props.radius,
    };
    this.entryProp = props.entryProp;
    this.onPress = props.onPress;
    this.entryImg = Images["MapEntryPoint"];

  }

  render() {
    return (
      <View style={[styles.container]}>
        <TouchableOpacity
          style={{
            //borderRadius: this.MapEntryStyle.radius,
            width: Constants.MapentryRenderSize.width,
            height: Constants.MapentryRenderSize.height,
            //backgroundColor: this.MapEntryStyle.color,
          }}
          onPress={this.props.onPress}
        > 
          <Image
            source={this.entryImg}
            resizeMode="stretch"
            style={{
              position: "absolute",
              width: Constants.MapentryRenderSize.width,
              height: Constants.MapentryRenderSize.height,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

MapEntry.defaultProps = {
  color: "blue",
  radius: Screen.height / 20,
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
});
