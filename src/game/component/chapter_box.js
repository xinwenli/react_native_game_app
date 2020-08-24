import React, { Component } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import MapEntry from "./map_entry";
import { Screen } from "../utils/screen";
import Images from "../assets/image/images";
import * as Constants from "../assets/const/constants";

const defaultMapEntryRadius = Screen.height / 20;
const defaultPlayerSize = { radius: Screen.height / 15 };

export default class ChapterBox extends Component {
  constructor(props) {
    super(props);
    this.chapterBoxStyle = {
      color: props.color,
      width: props.width,
      height: props.height,
    };
    this.chapterTitle = props.chapterTitle;
    this.mapEntries = props.mapEntries;
    this.playerProps = props.playerProps;
    this.onMapEntryPress = props.onMapEntryPress;
    this.state = {
      isShowPlayer: false,
      playerMapEntry: this.mapEntries["map1"],
      playerChapter: props.playerChapter,
    };
    if (this.chapterTitle === "Chapter 1") {
      this.backgroundImg = Images["background_dessert"];
      this.chapterTitleImg = Images["Chapter1TitleText"];
      this.chapterTitleImgSize = Image.resolveAssetSource(this.chapterTitleImg);
    }
    this.playerImg = Images["blackCreatureStand1"];
    this.platerImgaSize = Image.resolveAssetSource(this.playerImg);
  }
  /*

  onMapEntryPress = (mapEntry) => {
    this.setState({
      isShowPlayer: true,
      playerMapEntry: mapEntry,
    });
    console.log(mapEntry);
    console.log("entryPress");
    console.log(this.state);
  };
  */

  mapEntryRenderer = (mapEntryNumber, mapEntry) => {
    return (
      <View
        key={mapEntry.key}
        style={{
          //flex: 1/mapEntryNumber,
          position: "absolute",
          top:
            this.chapterBoxStyle.height * mapEntry.position.topRatio -
            defaultMapEntryRadius * 2,
          left:
            this.chapterBoxStyle.width * mapEntry.position.leftRatio -
            defaultMapEntryRadius,
        }}
      >
        <MapEntry
          entryProp={mapEntry}
          playerProps={this.playerProps}
          onPress={this.onMapEntryPress.bind(this, mapEntry, this.chapterTitle)}
        />
      </View>
    );
  };

  mapEntrysRenderer = () => {
    let mapEntrys = [];
    let mapEntryNumber = Object.keys(this.mapEntries).length;
    let i = 0;
    for (const map in this.mapEntries) {
      let mapEntry = this.mapEntries[map];
      mapEntrys.push(this.mapEntryRenderer(mapEntryNumber, mapEntry));
      //console.log(this.state);
      mapEntrys.push(
        this.playerRenderer(
          this.props.isShowPlayer &&
            this.props.playerChapter === this.chapterTitle,
          this.props.playerMapEntry.position.topRatio *
            this.chapterBoxStyle.height -
            defaultMapEntryRadius * 2 -
            defaultPlayerSize.radius,
          this.chapterBoxStyle.width *
            this.props.playerMapEntry.position.leftRatio -
            defaultMapEntryRadius -
            (defaultPlayerSize.radius - defaultMapEntryRadius)
        )
      );
      i += 1;
    }
    return mapEntrys;
  };

  playerRenderer = (isVisible, top, left) => {
    if (isVisible) {
      return (
        <View
          key={String(Math.random() * 1000)}
          style={{
            position: "absolute",
            top: top,
            left: left,
            //borderRadius: defaultPlayerSize.radius * 2,
            width: defaultPlayerSize.radius * 2.3,
            height: defaultPlayerSize.radius * 2.3,
            //backgroundColor: "pink",
          }}
        > 
        <Image 
        source={this.playerImg}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
        resizeMode="stretch"
        width={defaultPlayerSize.radius * 2.3}
        height={defaultPlayerSize.radius * 2.3}
        />
        
        </View>
      );
    }
    return null;
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: this.chapterBoxStyle.color,
            marginHorizontal: Screen.width / 20,
            width: this.chapterBoxStyle.width,
            height: this.chapterBoxStyle.height,
          },
        ]}
      >
        <Image source={this.backgroundImg} resizeMode="stretch" style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: this.chapterBoxStyle.width,
              height: this.chapterBoxStyle.height,
        }} />
        <Image source={this.chapterTitleImg} resizeMode="stretch" style={
          {
            position: "absolute",
            top:0,
            left: this.chapterTitleImgSize === undefined? 0 : (this.chapterBoxStyle.width - Constants.chapterBoxTitleRenderSize.height * this.chapterTitleImgSize.width/this.chapterTitleImgSize.height)/2,
            width: this.chapterTitleImgSize === undefined? 0: Constants.chapterBoxTitleRenderSize.height * this.chapterTitleImgSize.width/this.chapterTitleImgSize.height,
            height: Constants.chapterBoxTitleRenderSize.height,

        }} />
        {/*
        <View style={styles.titleText}>
          <Text>{this.chapterTitle}</Text>
        </View>*/}
        <View style={[styles.alignMapEntry]}>{this.mapEntrysRenderer()}</View>
      </View>
    );
  }
}

ChapterBox.defaultProps = {
  color: "grey",
  width: (Screen.width / 5) * 3,
  height: (Screen.height / 5) * 3,
  playerProps: {
    playerSize: { radius: Screen.height / 15 },
    playerPos: {
      chapter: 0,
      map: "map1",
    },
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    alignSelf: "center",
  },
  alignMapEntry: {
    flex: 1,
    flexDirection: "row",
  },
});
