import * as Constants from "../assets/const/constants";
const PlayerRun = (entities, { events, time, dispatch }) => {
  if (typeof PlayerRun.LastFrameTime == "undefined") {
    PlayerRun.LastFrameTime = time.current;
  }
  if (typeof PlayerRun.playerRun == "undefined") {
    PlayerRun.playerRun = false;
  }

  if (events != undefined && events.length != 0) {
    for (e in events) {
      if (events[e].type === "gameStart") {
        // the game start, change player move to run
        PlayerRun.playerRun = true;
        entities.player.playerActionState = "Run";
        entities.player.pos = 1;
      }
      if (events[e].type === "gameRestart"){
        PlayerRun.playerRun = false;
        entities.player.playerActionState = "Stand";
        entities.player.pos = 1;
      }
    }
  }

  if (PlayerRun.playerRun) {
    if (
      time.current - PlayerRun.LastFrameTime >
      Constants.defaultPlayerFrameTime
    ) {
      entities.player.pos++;
      if (entities.player.pos === 4) {
        entities.player.pos = 1;
      }
      PlayerRun.LastFrameTime = time.current;
    }
  }

  return entities;
};

export default PlayerRun;
