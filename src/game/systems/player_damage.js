import * as Constants from "../assets/const/constants";
const PlayerDamage = (entities, { events, time, dispatch }) => {
  if (typeof PlayerDamage.LastFrameTime == "undefined") {
    PlayerDamage.LastFrameTime = time.current;
  }
  if (typeof PlayerDamage.playerDamageRecv == "undefined") {
    PlayerDamage.playerDamageRecv = false;
    PlayerDamage.playerDamageRecvTime = null;
  }

  if (events != undefined && events.length != 0) {
    for (e in events) {
      if (events[e].type === "lifeReduce" || events[e].type === "gameOver") {
        // the game start, change player move to run
        PlayerDamage.playerDamageRecv = true;
        PlayerDamage.playerPrevAction = entities.player.playerActionState;
        PlayerDamage.playerDamageRecvTime = time.current;
        entities.player.playerActionState = "Damage";
        entities.player.pos = 1;
      }
      if (events[e].type === "gameRestart"){
        PlayerDamage.playerDamageRecv = false;
        entities.player.playerActionState = "Stand";
        entities.player.pos = 1;
      }
    }
  }

  if (PlayerDamage.playerDamageRecv) {
    if (
      time.current - PlayerDamage.LastFrameTime >
      Constants.defaultPlayerFrameTime
    ) {
      entities.player.pos++;
      if (entities.player.pos === 4) {
        entities.player.pos = 1;
      }
      PlayerDamage.LastFrameTime = time.current;
    }

    if(time.current - PlayerDamage.playerDamageRecvTime > Constants.defaultPlayerDamageResisTime){
      PlayerDamage.playerDamageRecv = false;
      entities.player.playerActionState = PlayerDamage.playerPrevAction;
      entities.player.pos = 1;
    }
  }



  return entities;
};

export default PlayerDamage;
