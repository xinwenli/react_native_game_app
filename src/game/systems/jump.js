import Matter from "matter-js";
import * as Constants from "../assets/const/constants";

const Jump = (entities, { touches, time, screen, layout, events }) => {
  if (typeof Jump.standOnFloor == "undefined") {
    Jump.standOnFloor = true;
    Jump.standOnWall = true;
    Jump.jumpCount = 0;
    Jump.jumpStart = false;
    Jump.dropStart = false;
    Jump.rotate = 0;
    Jump.LastRotateTime = time.current;
  }
  let player = entities.player.body;
  let world = entities.physics.world;
  let defaultFloor = entities.defaultFloor.body;
  if (events != undefined && events.length != 0) {
    for (e in events) {
      if (events[e].type === "floorStand") {
        Jump.standOnFloor = true;
        Jump.jumpCount = 0;
      }
      if (events[e].type === "wallStand") {
        Jump.standOnWall = true;
        Jump.jumpCount = 0;
      }
    }
  }

  let hadTouches = false;
  //touches.filter(t => t.type === "press").forEach(t => {
  if (touches.find((t) => t.type === "press")) {
    if (
      Jump.standOnFloor === true ||
      Jump.standOnWall === true ||
      Jump.jumpCount <= 1
    ) {
      if (!hadTouches) {
        hadTouches = true;
        /*
                    if(world.gravity === 0){
                        world.gravity=1.2;
                    }*/
        Matter.Body.setVelocity(player, {
          x: player.velocity.x,
          y: -Constants.defaultPlayerJumpHeight,
        });
      }
      Jump.jumpStart = true;
      Jump.jumpCount = Jump.jumpCount + 1;
      Jump.standOnFloor = false;
      Jump.standOnWall = false;
    }
  }

  if (Jump.jumpStart) {
    if (player.velocity.y > 0) {
      //falling
      Jump.jumpStart = false;
      Jump.dropStart = true;
    }
    if(player.velocity.y < 0 && player.velocity.y > -Constants.defaultPlayerJumpHeight){
        Jump.rotate = -60*(player.velocity.y/(-Constants.defaultPlayerJumpHeight));
    }
    entities.player.rotate = String(Jump.rotate) + "deg";
  }

  if (Jump.dropStart) {
    if (Math.floor(player.velocity.y) === 0) {
      Jump.jumpStart = false;
      Jump.dropStart = false;
    }
    if(player.velocity.y > 0){
        Jump.rotate = 60*((player.velocity.y/Constants.defaultPlayerJumpHeight) > 1? 1: (player.velocity.y/Constants.defaultPlayerJumpHeight));
    }
    entities.player.rotate = String(Jump.rotate) + "deg";
  }
  if(Jump.jumpStart == false &&
    Jump.dropStart == false){
      entities.player.rotate = "0deg";
    }
  //console.log(Jump.rotate);
  //console.log(player.velocity);

  return entities;
};

export default Jump;
