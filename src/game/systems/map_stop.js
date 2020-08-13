import Matter from "matter-js";
import {Screen} from "../utils/screen";
import * as Constants from "../assets/const/constants";

const MapStop = (entities, isMapClear) => {
  if (isMapClear) {
    for (const i in entities) {
      let entity = entities[i];
      let body = entity.body;

      //player movement control
      if (entity.type === "player") {
        if (body.position.x > Screen.width*1.3) {
          Matter.Body.setVelocity(body, {
            x: 0,
            y: body.velocity.y,
          });
        } else {
          Matter.Body.setVelocity(body, {
            x: Constants.defaultPlayerSpeed,
            y: body.velocity.y,
          });
        }
      }
    }
  }

  return entities;
};

export default MapStop;
