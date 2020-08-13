import React, { useState } from "react";
import { GameEngine } from "react-native-game-engine";
import Timer from "./utils/perf-timer";
import Matter from "matter-js";
import CircleRenderer from "./graphics/circle_renderer";
import RectRenderer from "./graphics/rect_renderer";
import FloorRenderer from './graphics/floor_renderer';
import Physics from "./systems/physics";
import MapStart from "./systems/map_start";
import MapStop from "./systems/map_stop";
import Jump from "./systems/jump";
import Drop from "./systems/drop";
import LifeReduce from "./systems/life_reduce";
import Test from "./systems/test";
import TapToStart from "./component/tap_to_start";
import GameOptionBox from "./component/game_options";
import GameButton from "./component/game_button";
import { View, Text, StatusBar, StyleSheet } from "react-native";
import Home from "./index";
import * as Constants from "./assets/const/constants";

class Chap1Map1 extends React.Component {
  constructor(props) {
    super(props);
    this.gameEngine = null;
    this.entityProperties = new Object();
    this.entities = this.setupWorld();
    this.state = {
      isStartMap: true,
      isClearMap: false,
      isRunning: false,
      isShowOptions: false,
      optionNames: ["Resume", "Restart", "Back to home"],
      onOptionPresses: [
        this.onResumePress,
        this.onRestartPress,
        this.onBackToHomePress,
      ],
      isPauseButtonVisible: true,
      isBackToHome: false,
      playerLifePoint: Constants.defaultPlayerLifePoint,
      doubleJump: true,
      optionTitle: "Pause",
    };
    //getStringData("test").then((value) => {console.log(value)});
  }

  /**
   * This is used for quick entity property initialize
   * @param {*} EntityPropertiesObject
   * @param {*} entityName
   * @param {*} entityShape
   * @param {*} entityType
   * @param {*} entityIsStatic
   * @param {*} entityRadius
   * @param {*} entityWidth
   * @param {*} entityHeight
   * @param {*} entityStartPositionX
   * @param {*} entityStartPositionY
   * @param {*} entityRepresentColor
   * @param {*} entityAdditionalData
   */
  initEntityPropertiesObject = (
    EntityPropertiesObject,
    entityName,
    entityShape,
    entityType,
    entityIsStatic,
    entityRadius,
    entityWidth,
    entityHeight,
    entityStartPositionX,
    entityStartPositionY,
    entityRepresentColor = "green",
    entityAdditionalData = null
  ) => {
    let entityBody;
    let collisionProp;
    if (entityShape === "circle") {
      if (entityName === "player") {
        collisionProp = {
          mask:
            Constants.collisionCategory.floor |
            Constants.collisionCategory.wall |
            Constants.collisionCategory.enemy |
            Constants.collisionCategory.trap |
            Constants.collisionCategory.goal,
        };
      } else {
        collisionProp = {
          category: Constants.collisionCategory[entityType],
        };
      }
      entityBody = Matter.Bodies.circle(
        entityStartPositionX,
        entityStartPositionY,
        entityRadius,
        {
          isStatic: entityIsStatic,
          label: entityName,
          collisionFilter: collisionProp,
        }
      );
      EntityPropertiesObject[entityName] = {
        type: entityType,
        shape: entityShape,
        body: entityBody,
        size: { radius: entityRadius },
        color: entityRepresentColor,
        startPosition: {
          x: entityStartPositionX,
          y: entityStartPositionY,
        },
        renderer: CircleRenderer,
      };

      if (
        entityAdditionalData != null &&
        Object.keys(entityAdditionalData).length != 0
      ) {
        //has additional data, append to exsisting EntityPropertiesObject[entityName]
        for (const prop in entityAdditionalData) {
          let value = entityAdditionalData[prop];
          EntityPropertiesObject[entityName][prop] = value;
        }
      }
    } else if (entityShape === "rectangle") {
      if (entityName === "player") {
        collisionProp = {
          mask:
            Constants.collisionCategory.floor |
            Constants.collisionCategory.wall |
            Constants.collisionCategory.enemy |
            Constants.collisionCategory.trap |
            Constants.collisionCategory.goal,
        };
      } else {
        collisionProp = {
          category: Constants.collisionCategory[entityType],
        };
      }
      entityBody = Matter.Bodies.rectangle(
        entityStartPositionX,
        entityStartPositionY,
        entityWidth,
        entityHeight,
        {
          isStatic: entityIsStatic,
          label: entityName,
          collisionFilter: collisionProp,
        }
      );

      EntityPropertiesObject[entityName] = {
        type: entityType,
        shape: entityShape,
        body: entityBody,
        size: { width: entityWidth, height: entityHeight },
        startPosition: {
          x: entityStartPositionX,
          y: entityStartPositionY,
        },
        color: entityRepresentColor,
        renderer: RectRenderer,
      };

      if (
        entityAdditionalData != null &&
        Object.keys(entityAdditionalData).length != 0
      ) {
        //has additional data, append to exsisting EntityPropertiesObject[entityName]
        for (const prop in entityAdditionalData) {
          let value = entityAdditionalData[prop];
          EntityPropertiesObject[entityName][prop] = value;
        }
      }
    }

    return entityBody;
  };

  setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    let player = this.initEntityPropertiesObject(
      this.entityProperties,
      "player",
      "rectangle",
      "player",
      false,
      null,
      Constants.defaultPlayerSize.width,
      Constants.defaultPlayerSize.height,
      Constants.defaultPlayerStartPosition.x,
      Constants.defaultPlayerStartPosition.y,
      "pink"
    );
    player.frictionAir = 0.03;

    console.log(this.entityProperties["player"]);

    let defaultFloor = this.initEntityPropertiesObject(
      this.entityProperties,
      "defaultFloor",
      "rectangle",
      "floor",
      true,
      null,
      Constants.defaultFloorSize.width,
      Constants.defaultFloorSize.height,
      Constants.defaultFloorPosition.x,
      Constants.defaultFloorPosition.y,
      "green",
      {
        renderer: FloorRenderer,
      }
    );

    let floor1 = this.initEntityPropertiesObject(
      this.entityProperties,
      "floor1",
      "rectangle",
      "floor",
      true,
      null,
      Constants.floor1Size.width,
      Constants.floor1Size.height,
      Constants.floor1Position.x,
      Constants.floor1Position.y,
      "green"
    );

    let defaultGoal = this.initEntityPropertiesObject(
      this.entityProperties,
      "defaultGoal",
      "rectangle",
      "goal",
      true,
      null,
      Constants.defaultGoalSize.width,
      Constants.defaultGoalSize.height,
      Constants.defaultGoalPosition.x,
      Constants.defaultGoalPosition.y,
      "blue"
    );

    let wall1 = this.initEntityPropertiesObject(
      this.entityProperties,
      "wall1",
      "rectangle",
      "wall",
      true,
      null,
      Constants.wall1Size.width,
      Constants.wall1Size.height,
      Constants.wall1Position.x,
      Constants.wall1Position.y,
      "green"
    );

    let trap1 = this.initEntityPropertiesObject(
      this.entityProperties,
      "trap1",
      "rectangle",
      "trap",
      true,
      null,
      Constants.trap1Size.width,
      Constants.trap1Size.height,
      Constants.trap1Position.x,
      Constants.trap1Position.y,
      "red"
    );

    let groundEnemy1 = this.initEntityPropertiesObject(
      this.entityProperties,
      "groundEnemy1",
      "circle",
      "enemy",
      false,
      Constants.groundEnemy1Size.radius,
      null,
      null,
      Constants.groundEnemy1Position.x,
      Constants.groundEnemy1Position.y,
      "red",
      {
        enemyType: "ground",
        isMove: true,
        movRange: {
          top: Constants.groundEnemy1MovRange.top,
          left: Constants.groundEnemy1MovRange.left,
          right: Constants.groundEnemy1MovRange.right,
          bottom: Constants.groundEnemy1MovRange.bottom,
        },
        movPattern: "horizontal-round",
      }
    );
    Matter.World.add(world, [
      player,
      defaultFloor,
      floor1,
      defaultGoal,
      wall1,
      trap1,
      groundEnemy1,
    ]);

    Matter.Events.on(engine, "collisionStart", (event) => {
      let pairs = event.pairs;
      for (const i in pairs) {
        let pair = pairs[i];
        // wall collision
        if (
          (pair.bodyA.label === "player" &&
            pair.bodyB.collisionFilter.category ===
              Constants.collisionCategory.wall) ||
          (pair.bodyB.collisionFilter.category ===
            Constants.collisionCategory.wall &&
            pair.bodyB.label === "player")
        ) {
          console.log("wall collision");
          //console.log(pair);
          let player;
          let wall;
          if (pair.bodyA.label === "player") {
            player = pair.bodyA;
            wall = pair.bodyB;
          } else {
            player = pair.bodyB;
            wall = pair.bodyA;
          }
          if (player.position.x < wall.position.x) {
            if (player.position.y < wall.position.y) {
              console.log("left top wall collision");
              this.gameEngine.dispatch({ type: "wallStand" });
            } else {
              console.log("left down wall collision");
            }
          } else if (player.position.x > wall.position.x) {
            if (player.position.y < wall.position.y) {
              console.log("right top wall collision");
              this.gameEngine.dispatch({ type: "wallStand" });
            } else {
              console.log("right down wall collision");
            }
          }
        }

        // goal collision
        if (
          (pair.bodyA.label === "player" &&
            pair.bodyB.collisionFilter.category ===
              Constants.collisionCategory.goal) ||
          (pair.bodyB.collisionFilter.category ===
            Constants.collisionCategory.goal &&
            pair.bodyB.label === "player")
        ) {
          console.log("goal collision");
          this.gameEngine.dispatch({ type: "mapClear" });
          //this.gameEngine.dispatch({ type: "gameOver" });
        }

        // floor collision
        if (
          (pair.bodyA.label === "player" &&
            pair.bodyB.collisionFilter.category ===
              Constants.collisionCategory.floor) ||
          (pair.bodyB.collisionFilter.category ===
            Constants.collisionCategory.floor &&
            pair.bodyB.label === "player")
        ) {
          console.log("floor collision");
          this.gameEngine.dispatch({ type: "floorStand" });
        }

        // trap collision
        if (
          (pair.bodyA.label === "player" &&
            pair.bodyB.collisionFilter.category ===
              Constants.collisionCategory.trap) ||
          (pair.bodyB.collisionFilter.category ===
            Constants.collisionCategory.trap &&
            pair.bodyB.label === "player")
        ) {
          console.log("trap collision");
          this.gameEngine.dispatch({ type: "damageRecv" });
          //this.gameEngine.dispatch({ type: "gameOver" });
        }

        // enemy collision
        if (
          (pair.bodyA.label === "player" &&
            pair.bodyB.collisionFilter.category ===
              Constants.collisionCategory.enemy) ||
          (pair.bodyB.collisionFilter.category ===
            Constants.collisionCategory.enemy &&
            pair.bodyB.label === "player")
        ) {
          console.log("enemy collision");
          this.gameEngine.dispatch({ type: "damageRecv" });
          //this.gameEngine.dispatch({ type: "gameOver" });
        }
      }
    });

    return {
      physics: { engine: engine, world: world },
      defaultFloor: this.entityProperties["defaultFloor"],
      floor1: this.entityProperties["floor1"],
      defaultGoal: this.entityProperties["defaultGoal"],
      wall1: this.entityProperties["wall1"],
      trap1: this.entityProperties["trap1"],
      groundEnemy1: this.entityProperties["groundEnemy1"],
      player: this.entityProperties["player"],
    };
  };

  onStartMap = () => {
    this.setState({ isStartMap: false, isRunning: true });
  };

  onClearMap = () => {
    this.setState({ 
      isBackToHome: true, 
      isPauseButtonVisible: 
      false 
    });
  };

  onEvent = (e) => {
    if (e.type === "gameOver") {
      this.setState({
        isRunning: false,
        isShowOptions: true,
        optionNames:["Restart", "Back to Home"],
        onOptionPresses:[this.onRestartPress, this.onBackToHomePress],
        isPauseButtonVisible: false,
        optionTitle: "Game Over",
      });
    }

    if (e.type === "lifeReduce") {
      this.setState({
        playerLifePoint: this.state.playerLifePoint - 1,
      });
      if (this.state.playerLifePoint <= 0) {
        this.gameEngine.dispatch({ type: "gameOver" });
      }
    }

    if (e.type === "mapClear") {
      this.setState({
        isClearMap: true,
        optionTitle: "Clear",
        isShowOptions: true,
        optionNames: ["Restart", "Back to home"],
        onOptionPresses:[this.onRestartPress, this.onBackToHomePress],
        isPauseButtonVisible: false,
      });
    }
  };

  onGamePause = () => {
    this.setState({
      isRunning: false,
      isShowOptions: true,
      optionNames: ["Resume", "Restart", "Back to Home"],
      onOptionPresses:[this.onResumePress, this.onRestartPress, this.onBackToHomePress],
      isPauseButtonVisible: false,
      isStartMap: false,
      optionTitle: "Pause",
    });
  };

  onRestartPress = () => {
    this.setState({
      isRunning: true,
      isShowOptions: false,
      isStartMap: true,
      isClearMap: false,
      isPauseButtonVisible: true,
      playerLifePoint: Constants.defaultPlayerLifePoint,
    });
    for (const i in this.entities) {
      let entity = this.entities[i];
      let body = entity.body;
      if (entity.type) {
        Matter.Body.setPosition(body, {
          x: this.entityProperties[entity.body.label].startPosition.x,
          y: this.entityProperties[entity.body.label].startPosition.y,
        });
      }
    }
  };

  onBackToHomePress = () => {
    this.setState({
      isBackToHome: true,
      running: false,
      isPauseButtonVisible: false,
    });
  };

  onResumePress = () => {
    this.setState({
      isRunning: true,
      isShowOptions: false,
      isPauseButtonVisible: true,
    });
  };

  render() {
    if (this.state.isBackToHome) {
      return <Home />;
    }

    return (
      // Map1
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Text style={styles.text}> Life: {this.state.playerLifePoint} </Text>
        <GameEngine
          ref={(ref) => {
            this.gameEngine = ref;
          }}
          timer={new Timer()}
          systems={[
            Physics,
            MapStart.bind(
              this,
              this.entities,
              this.state.isStartMap,
              this.state.isClearMap,
              this.entityProperties
            ),
            MapStop.bind(this, this.entities, this.state.isClearMap),
            Jump,
            LifeReduce,
            Drop.bind(this, this.entities, this.gameEngine),
          ]}
          running={this.state.isRunning}
          //running={true}
          entities={this.entities}
          onEvent={this.onEvent}
        />
        <GameOptionBox
          title={this.state.optionTitle}
          visible={this.state.isShowOptions}
          // a list of option names
          optionNames={this.state.optionNames}
          // a list of option press functions
          onOptionPresses={this.state.onOptionPresses}
        />
        <TapToStart onPress={this.onStartMap} visible={this.state.isStartMap} />
        <GameButton
          onPress={this.onGamePause}
          visible={this.state.isPauseButtonVisible}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 20,
  },
});

export default Chap1Map1;
