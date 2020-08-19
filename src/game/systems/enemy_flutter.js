import * as Constants from "../assets/const/constants";
const enemyFlutter = (entities, { events, time, dispatch }) => {
  if (typeof enemyFlutter.LastFlutterTime == "undefined") {
    enemyFlutter.LastFlutterTime = time.current;
  };
  if (typeof enemyFlutter.enemyFlutter == "undefined") {
    enemyFlutter.enemyFlutter = false;
  };

  if (events != undefined && events.length != 0) {
    for(e in events){
        if(events[e].type === "gameStart"){
          //enemy always flutter
            enemyFlutter.enemyFlutter = true;
            entities.groundEnemy1.pos = 1;
        }
        if(events[e].type === "gameRestart"){
          enemyFlutter.enemyFlutter = true;
          entities.groundEnemy1.pos = 1;
        }
    }
  }

  if (enemyFlutter.enemyFlutter) {
    if (
      time.current - enemyFlutter.LastFlutterTime >
      Constants.defaultEnemyFlutterTime
    ) {
      entities.groundEnemy1.pos++;
      if (entities.groundEnemy1.pos === 3) {
        entities.groundEnemy1.pos = 1;
      }
      enemyFlutter.LastFlutterTime = time.current;
    }
  }
  return entities;
};

export default enemyFlutter;
