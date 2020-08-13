import Matter from "matter-js";
import {Screen} from "../utils/screen";

const Drop = (entities, engine) => {
    let player = entities.player.body;
    if(player.position.x < 0 || player.position.y > Screen.height ){
        engine.dispatch({ type: "gameOver" });
    }
    return entities;
}

export default Drop;