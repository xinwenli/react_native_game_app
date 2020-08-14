import { Screen } from "../../utils/screen";
import chapter1Data from "./chapter1.json";
import chapter2Data from "./chapter2.json";

export const collisionCategory = {
  floor: 0x1,
  wall: 0x2,
  trap: 0x3,
  enemy: 0x4,
  goal: 0x5,
  decoration: 0x6,
};

export const baseFloorLevel = (Screen.height / 10) * 9;
export const baseFloorHeight = Screen.height - baseFloorLevel;
export const baseFloorCoverHeight = Screen.height / 10;
export const baseFloorCoverLevel = baseFloorLevel - baseFloorCoverHeight;
export const defaultPlayerSize = {
  radius: Screen.height / 15,
  width: Screen.width / 15,
  height: Screen.height / 8,
};
export const defaultPlayerStartPosition = {
  //x: 10,
  x: Screen.width / 3,
  //y: baseFloorLevel - defaultPlayerSize.height/2,
  y: baseFloorLevel - defaultPlayerSize.radius,
};

export const wall1Size = {
  width: Screen.width / 20,
  height: Screen.height / 8,
};

export const wall1Position = {
  x: Screen.width + wall1Size.width / 2,
  y: baseFloorLevel - wall1Size.height / 2,
};

export const defaultFloorSize = {
  width: Screen.width * 1.5,
  height: baseFloorHeight,
};
export const defaultFloorPosition = {
  x: 0 + defaultFloorSize.width / 2,
  y: baseFloorLevel + defaultFloorSize.height / 2,
};

export const defaultFloorCoverSize = {
  width: defaultFloorSize.width,
  height: baseFloorCoverHeight,
}

export const defaultFloorCoverPosition = {
  //x: 0,
  x: defaultFloorPosition.x,
  //y:100,
  y: defaultFloorPosition.y - defaultFloorCoverSize.height/2,
}

export const floor1Size = {
  width: Screen.width,
  height: baseFloorHeight,
};

export const floor1Position = {
  x: Screen.width * 1.65 + floor1Size.width / 2,
  y: baseFloorLevel + floor1Size.height / 2,
};

export const defaultGoalSize = {
  width: Screen.width,
  height: baseFloorHeight,
};

export const defaultGoalPosition = {
  //x: 0,
  x: Screen.width * 2.2 + defaultGoalSize.width / 2,
  y: baseFloorLevel + defaultGoalSize.height / 2,
};

export const trap1Size = {
  width: Screen.width / 12,
  height: baseFloorHeight,
};
export const trap1Position = {
  //x: 300,
  x: Screen.width + trap1Size.width / 2 + Screen.width / 10,
  y: baseFloorLevel + trap1Size.height / 2,
};

export const groundEnemy1Size = {
  radius: Screen.height / 15,
  width: Screen.width / 20,
  height: Screen.height / 8,
};
export const groundEnemy1Position = {
  //x: 400,
  x: Screen.width + groundEnemy1Size.width/2 + Screen.width / 8,
  y: baseFloorLevel - groundEnemy1Size.radius,
};
export const groundEnemy1MovRange = {
  top: 4 * groundEnemy1Size.radius,
  left: Screen.width / 15,
  right: Screen.width / 15,
  bottom: 4 * groundEnemy1Size.radius,
};
export const defaultPlayerLifePoint = 2;

export const defaultMapMovSpeed = -2.5;
export const defaultPlayerSpeed = 3;
export const defaultEnemySpeed = 3;

export const defaultChapterBoxSize = {
  width: (Screen.width / 5) * 3,
  height: (Screen.height / 5) * 3,
};

export const defaultMapEntryRadius = Screen.height / 20;
export const chapterFlstListPadding = {
  top: Screen.height / 5,
  left: Screen.width / 8,
  bottom: Screen.height / 4,
};

export const chapterProps = [chapter1Data, chapter2Data];

export const defaultPlayerPos = {
  chapter: 0,
  map: "map1",
};

export const defaultPlayerProps = {
  playerSize: defaultPlayerSize,
  playerPos: defaultPlayerPos,
};

export const defaultPlayerDamageResisTime = 2 * 1000;
export const defaultPlayerJumpHeight = 6;
export const PlayerImageSize = {
  width: 100,
  height: 60
}
export const defaultPlayerFlutterTime = 200;
export const yellowBricksBlockSize={
  width: 300,
  height: 300,
};
export const yellowBricksBlockCoverSize = {
  width: 180,
  height: 60,
};