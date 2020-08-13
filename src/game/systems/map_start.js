import Matter from "matter-js";
import React from "react";
import { Screen } from "../utils/screen";
import * as Constants from "../assets/const/constants";


const MapStart = (entities, isMapStart, isMapClear, entityProperties) => {
  let defaultfloorMovFromStart = { x: 0, y: 0 };
  let groundEnemy1MovFromStart = { x: 0, y: 0 };
  if (!isMapStart && !isMapClear) {
    for (const i in entities) {
      let entity = entities[i];
      let body = entity.body;
      // This part is for all moving enities in the map
      if (
        entity.type === "wall" ||
        entity.type === "floor" ||
        entity.type === "trap" ||
        entity.type === "enemy" ||
        entity.type === "goal"
      ) {
        if (body.label === "defaultFloor") {
          defaultfloorMovFromStart.x =
            body.position.x - entityProperties.defaultFloor.startPosition.x;
          defaultfloorMovFromStart.y =
            body.position.y - entityProperties.defaultFloor.startPosition.x;
        }
        Matter.Body.translate(body, {
          //x: 0,
          x: Constants.defaultMapMovSpeed,
          y: 0,
        });
      }

      // This part is for moving controls execpt for map moving
      // Enemy movment control
      if (entity.type === "enemy") {
        if (body.label === "groundEnemy1") {
          groundEnemy1MovFromStart.x =
            body.position.x - entityProperties.groundEnemy1.startPosition.x;
          groundEnemy1MovFromStart.y =
            body.position.y - entityProperties.groundEnemy1.startPosition.y;

          if (
            entity.isMove == true &&
            entity.movPattern === "horizontal-round"
          ) {
            if (typeof MapStart.horizentalDirection == "undefined") {
              MapStart.horizentalDirection = "right";
            }

            //console.log(defaultfloorMovFromStart.x);
            //console.log(groundEnemy1MovFromStart.x);
            //console.log(entity.movRange.right);
            //console.log(MapStart.horizentalDirection);
            if (MapStart.horizentalDirection === "right") {
              Matter.Body.setVelocity(body, {
                x: Constants.defaultEnemySpeed,
                y: body.velocity.y,
              });
              if (
                groundEnemy1MovFromStart.x - defaultfloorMovFromStart.x >
                entity.movRange.right
              ) {
                MapStart.horizentalDirection = "left";
              }
            } else if (MapStart.horizentalDirection === "left") {
              Matter.Body.setVelocity(body, {
                x: -Constants.defaultEnemySpeed,
                y: body.velocity.y,
              });
              if (
                -groundEnemy1MovFromStart.x + defaultfloorMovFromStart.x >
                entity.movRange.left
              ) {
                MapStart.horizentalDirection = "right";
              }
            }
          }
        }
      }

      //player movement control
      if (entity.type === "player") {
        if (body.position.x > Screen.width / 2) {
          Matter.Body.setVelocity(body, {
            x: 0,
            y: body.velocity.y,
          });
        } else {
          Matter.Body.setVelocity(body, {
            x: Constants.defaultPlayerSpeed + Constants.defaultMapMovSpeed,
            y: body.velocity.y,
          });
        }
      }
    }
  }
  return entities;
};

export default MapStart;
