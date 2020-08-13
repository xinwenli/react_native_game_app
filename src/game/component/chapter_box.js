import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import MapEntry from "./map_entry";
import { Screen } from "../utils/screen";

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
            borderRadius: defaultPlayerSize.radius * 2,
            width: defaultPlayerSize.radius * 2,
            height: defaultPlayerSize.radius * 2,
            backgroundColor: "pink",
          }}
        />
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
        <View style={styles.titleText}>
          <Text>{this.chapterTitle}</Text>
        </View>
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
