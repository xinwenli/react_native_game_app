import Matter from "matter-js";
import {Screen} from "../utils/screen";

const Drop = (entities, engine) => {
    let player = entities.player.body;
    if(player.position.y > Screen.height || player.position.x < 0){
        engine.dispatch({ type: "gameOver" });
    }
    return entities;
}

export default Drop;