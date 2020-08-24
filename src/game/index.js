import React, { Component } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Screen } from "./utils/screen";
import GameOptionBox from "./component/game_options";
import GameButton from "./component/game_button";
import ChapterBoxRenderer from "./component/chapter_box";
import Chap1Map1 from "./chap1_map1";
import * as FileSys from "./utils/file_system";
import * as Constants from "./assets/const/constants";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowPlayer: false,
      playerMapEntry: Constants.chapterProps[0].mapEntries.map1,
      playerChapter: "Chapter 1",
      startMap: false,
      isShowGameSettingOption: false,
      isShwoGameSettingButton: true,
    };
    //console.log(Screen);
    //FileSys.getStringData("test").then((value) => {console.log(value)});
    //let test = getStringData("test")
    //test.then((value) => {console.log(value)});
  }

  onMapEntryPress = (mapEntry, chapter) => {
    this.setState({
      isShowPlayer: true,
      playerMapEntry: mapEntry,
      playerChapter: chapter,
    });
  };

  chapterBoxRenderer = ({ item }) => {
    return (
      <ChapterBoxRenderer
        chapterTitle={item.title}
        mapEntries={item.mapEntries}
        onMapEntryPress={this.onMapEntryPress}
        isShowPlayer={this.state.isShowPlayer}
        playerMapEntry={this.state.playerMapEntry}
        playerChapter={this.state.playerChapter}
        width={Constants.defaultChapterBoxSize.width}
        height={Constants.defaultChapterBoxSize.height}
        playerProps={Constants.defaultPlayerProps}
      />
    );
  };

  onMapStartPress = () => {
    if (this.state.isShowPlayer) {
      this.setState({
        startMap: true,
      });
    }
  };

  onGameSettingPress = () => {
    this.setState({
      isShowGameSettingOption: true,
      isShwoGameSettingButton: false,
    });
  };

  onGameSettingOptionClose = () => {
    this.setState({
      isShowGameSettingOption: false,
      isShwoGameSettingButton: true,
    });
  };

  render() {
    //return <Chap1Map1 />;
    
    if (this.state.startMap) {
      if (this.state.isShowPlayer) {
        if (this.state.playerChapter === "Chapter 1") {
          switch (this.state.playerMapEntry.name) {
            case "map1":
              {
                return <Chap1Map1 />;
              }
              break;

            default:
              break;
          }
        }
      }
    }

    return (
      // the Home Page
      <View style={styles.container}>
        <View style={styles.chapterFlstList}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={Constants.chapterProps}
            renderItem={this.chapterBoxRenderer}
            keyExtractor={(item) => item.id}
          />
        </View>
        <GameButton
          onPress={this.onMapStartPress}
          visible={true}
          sign="Resume"
          top={(Screen.height / 10) * 9 - Screen.height / 16}
          left={Screen.width / 2 - Screen.width / 18}
        />

        <GameButton
          onPress={this.onGameSettingPress}
          sign="Settings"
          signWidth= {Screen.width / 9}
          signHeight={ Screen.height / 7}
          buttonBackground= {false}
          visible={this.state.isShwoGameSettingButton}
        />
        <GameOptionBox
          title={"Settings"}
          visible={this.state.isShowGameSettingOption}
          optionNames={["BackToHome"]}
          onOptionPresses={[this.onGameSettingOptionClose]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    backgroundColor: Constants.defaultColors.homeBackground,
  },
  chapterFlstList: {
    paddingTop: Constants.chapterFlstListPadding.top,
    paddingBottom: Constants.chapterFlstListPadding.bottom,
    paddingLeft: Constants.chapterFlstListPadding.left,
  },
  mapIndicator: {},
});
