import * as Constants from "../assets/const/constants";

const LifeReduce = (entities, { events, time, dispatch }) => {
  if (typeof LifeReduce.LastLifeReduceTime == "undefined") {
    LifeReduce.LastLifeReduceTime = time.current;
  }
  if (events != undefined && events.length != 0) {
    for (e in events) {
      if (events[e].type === "damageRecv") {
        if (
          time.current - LifeReduce.LastLifeReduceTime >
          Constants.defaultPlayerDamageResisTime
        ) {
          dispatch({ type: "lifeReduce" });
          LifeReduce.LastLifeReduceTime = time.current;
        }
      }
    }
  }
  return entities;
};

export default LifeReduce;
