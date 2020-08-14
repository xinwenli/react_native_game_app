import * as Constants from "../assets/const/constants";
const PlayerFlutter = (entities, { events, time, dispatch }) => {
  if (typeof PlayerFlutter.LastFlutterTime == "undefined") {
    PlayerFlutter.LastFlutterTime = time.current;
  }

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
  //console.log(entities.player.pos);
  //console.log(time.current - PlayerFlutter.LastFlutterTime);

  return entities;
};

export default PlayerFlutter;
