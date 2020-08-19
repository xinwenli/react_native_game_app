import * as Constants from "../assets/const/constants";
const PlayerFlutter = (entities, { events, time, dispatch }) => {
  if (typeof PlayerFlutter.LastFlutterTime == "undefined") {
    PlayerFlutter.LastFlutterTime = time.current;
  };
  if (typeof PlayerFlutter.playerFlutter == "undefined") {
    PlayerFlutter.playerFlutter = true;
  };

  if (events != undefined && events.length != 0) {
    for(e in events){
        if(events[e].type === "gameStart"){
            // the game start, change player move to run, do not flutter
            PlayerFlutter.playerFlutter = false;
            entities.player.pos = 1;
        }
        if(events[e].type === "gameRestart"){
          PlayerFlutter.playerFlutter = true;
          entities.player.playerActionState = "Stand";
          entities.player.pos = 1;
        }
    }
  }

  if (PlayerFlutter.playerFlutter) {
    if (
      time.current - PlayerFlutter.LastFlutterTime >
      Constants.defaultPlayerFlutterTime
    ) {
      entities.player.pos++;
      if (entities.player.pos === 3) {
        entities.player.pos = 1;
      }
      PlayerFlutter.LastFlutterTime = time.current;
    }
  }
  return entities;
};

export default PlayerFlutter;
