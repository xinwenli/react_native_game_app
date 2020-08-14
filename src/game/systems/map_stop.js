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
          Matter.Body.translate(body, {
            x: 0,
            y: body.velocity.y,
          });
        } else {
          Matter.Body.translate(body, {
            //x: 0,
            x: Constants.defaultPlayerSpeed,
            y: 0,
          });
        }
      }
    }
  }

  return entities;
};

export default MapStop;
