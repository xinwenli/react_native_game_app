import React, { Component } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import MapEntry from "./map_entry";
import { Screen } from "../utils/screen";
import Images from "../assets/image/images";
import * as Constants from "../assets/const/constants";
import * as FileSys from "../utils/file_system";

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
    this.chapterBoxFrame = Images["greyFrame"];
    this.playerImg = Images["blackCreatureStand1"];
    this.platerImgaSize = Image.resolveAssetSource(this.playerImg);
    this.flagImg = Images["Flag"];
    FileSys.getStringData("PlayerSave1").then(
      (value) => {
        this.playerSave = JSON.parse(value);
        //FileSys.storeObjData("PlayerSave1", this.playerSave);
        console.log(this.playerSave);
      },
      (re) => {
        console.log(re);
        //No playerSave, initiate a new save for player
        FileSys.storeObjData("PlayerSave1", this.initPlayerSave());
      }
    );
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
            Constants.MapentryRenderSize.height / 2,
          left:
            this.chapterBoxStyle.width * mapEntry.position.leftRatio -
            Constants.MapentryRenderSize.width / 2,
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
            Constants.MapentryRenderSize.height -
            defaultPlayerSize.radius,
          this.chapterBoxStyle.width *
            this.props.playerMapEntry.position.leftRatio -
            Constants.MapentryRenderSize.width +
            defaultPlayerSize.radius
        )
      );
      mapEntrys.push(
        this.flagRenderer(
          true,
          //this.playerSave["clearedChapter"][this.chapterTitle][map],
          this.chapterBoxStyle.height * mapEntry.position.topRatio -
            Constants.MapentryRenderSize.height / 2 - Constants.flagRenderSize.height + Constants.MapentryRenderSize.height/2,
            this.chapterBoxStyle.width * mapEntry.position.leftRatio -
            Constants.MapentryRenderSize.width / 2,
        )
      );

      i += 1;
    }
    return mapEntrys;
  };

  flagRenderer = (visible, top, left) => {
    if (visible) {
      return (
        <View
          key={String(Math.random() * 1000)}
          style={{
            position: "absolute",
            top: top,
            left: left,
            //borderRadius: defaultPlayerSize.radius * 2,
            width: Constants.flagRenderSize.width,
            height: Constants.flagRenderSize.height,
            //backgroundColor: "pink",
          }}
        >
          <Image
            source={this.flagImg}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width:Constants.flagRenderSize.width,
              height:Constants.flagRenderSize.height,
            }}
            resizeMode="stretch"
            width={Constants.flagRenderSize.width}
            height={Constants.flagRenderSize.height}
          />
        </View>
      );
    }
    return null;
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
        <Image
          source={this.backgroundImg}
          resizeMode="stretch"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: this.chapterBoxStyle.width,
            height: this.chapterBoxStyle.height,
            borderTopLeftRadius: Screen.height / 10,
            borderTopRightRadius: Screen.height / 10,
            borderBottomLeftRadius: Screen.height / 10,
            borderBottomRightRadius: Screen.height / 10,
          }}
        />
        {/*
        <Image
          source={this.chapterTitleImg}
          resizeMode="stretch"
          style={{
            position: "absolute",
            top: 0,
            left:
              this.chapterTitleImgSize === undefined
                ? 0
                : (this.chapterBoxStyle.width -
                    (Constants.chapterBoxTitleRenderSize.height *
                      this.chapterTitleImgSize.width) /
                      this.chapterTitleImgSize.height) /
                  2,
            width:
              this.chapterTitleImgSize === undefined
                ? 0
                : (Constants.chapterBoxTitleRenderSize.height *
                    this.chapterTitleImgSize.width) /
                  this.chapterTitleImgSize.height,
            height: Constants.chapterBoxTitleRenderSize.height,
          }}
        />
        {/*
        <View style={styles.titleText}>
          <Text>{this.chapterTitle}</Text>
        </View>*/}

        <Image
          source={this.chapterBoxFrame}
          resizeMode="stretch"
          style={{ position: "absolute", top: 0, left: 0 }}
          width={this.chapterBoxStyle.width}
          height={this.chapterBoxStyle.height}
        />
        <Image
          source={this.chapterTitleImg}
          resizeMode="stretch"
          style={{
            position: "absolute",
            top: 0,
            left:
              this.chapterTitleImgSize === undefined
                ? 0
                : (this.chapterBoxStyle.width -
                    (Constants.chapterBoxTitleRenderSize.height *
                      this.chapterTitleImgSize.width) /
                      this.chapterTitleImgSize.height) /
                  2,
            width:
              this.chapterTitleImgSize === undefined
                ? 0
                : (Constants.chapterBoxTitleRenderSize.height *
                    this.chapterTitleImgSize.width) /
                  this.chapterTitleImgSize.height,
            height: Constants.chapterBoxTitleRenderSize.height,
          }}
        />
        <View style={[styles.alignMapEntry]}>{this.mapEntrysRenderer()}</View>
      </View>
    );
  }
}

ChapterBox.defaultProps = {
  //color: "grey",
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
    //position: "absolute"
  },
  titleText: {
    alignSelf: "center",
  },
  alignMapEntry: {
    flex: 1,
    flexDirection: "row",
  },
});
