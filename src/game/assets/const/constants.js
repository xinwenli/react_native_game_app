import { Screen } from "../../utils/screen";
import chapter1Data from "./chapter1.json";
import chapter2Data from "./chapter2.json";

export const collisionCategory = {
  floor: 1,
  wall: 2,
  trap: 16,
  enemy: 4,
  goal: 8,
  decoration: 32,
};
export const StoneBlockCoverRenderSize = {
  topleft: {
    width: Screen.width / 74, //9
    height: Screen.height / 18, //21
  },
  topmiddle: {
    width: Screen.width / 30, //22
    height: Screen.height / 18, //21
  },
  topright: {
    width: Screen.width / 74, //9
    height: Screen.height / 18, //21
  },
  middleleft: {
    width: Screen.width / 74, //9
    height: Screen.height / 38, //10
  },
  middleright: {
    width: Screen.width / 74, //9
    height: Screen.height / 38, //10
  },
  bottomleft: {
    width: Screen.width / 74, //9
    height: Screen.height / 42, //9
  },
  bottommiddle: {
    width: Screen.width / 30, //22
    height: Screen.height / 42, //9
  },
  bottomright: {
    width: Screen.width / 74, //9
    height: Screen.height / 42, //9
  },
};

export const redTrapRenderSize = {
  width: Screen.width / 20, //34
  height: Screen.height / 9, //40
};

export const originalBlackCreaturePixel = 12;
export const originalEnemyPixel = {
  width: 10,
  height: 16,
};

export const defaultColors = {
  block: "#684302",
  homeBackground: '#bebfc1',
};

export const baseFloorLevel = (Screen.height / 10) * 7;
export const baseFloorHeight = Screen.height - baseFloorLevel;
export const baseFloorCoverHeight = Screen.height / 10;
export const baseFloorCoverLevel = baseFloorLevel - baseFloorCoverHeight;

export const wall1Size = {
  width:
    StoneBlockCoverRenderSize.topleft.width +
    StoneBlockCoverRenderSize.topright.width +
    StoneBlockCoverRenderSize.topmiddle.width * 1,
  height: Screen.height / 8,
};

export const wall1Position = {
  x: Screen.width + wall1Size.width / 2,
  y: baseFloorLevel - wall1Size.height / 2,
};

export const defaultFloorSize = {
  width:
    StoneBlockCoverRenderSize.topleft.width +
    StoneBlockCoverRenderSize.topright.width +
    StoneBlockCoverRenderSize.topmiddle.width * 45,
  height: baseFloorHeight,
  //height: 100
};

export const defaultFloorPosition = {
  x: 0 + defaultFloorSize.width / 2,
  y: baseFloorLevel + defaultFloorSize.height / 2,
};

export const defaultFloorCoverSize = {
  width: defaultFloorSize.width,
  height: baseFloorCoverHeight,
};

export const defaultFloorCoverPosition = {
  //x: 0,
  x: defaultFloorPosition.x,
  //y:100,
  y: defaultFloorPosition.y - defaultFloorCoverSize.height,
};
export const defaultPlayerSize = {
  radius: Screen.height / 20,
  width: Screen.width / 15,
  height: Screen.height / 8,
};
export const defaultPlayerStartPosition = {
  //x: 10,
  x: Screen.width / 3,
  //y: baseFloorLevel - defaultPlayerSize.height/2,
  y:
    defaultFloorCoverPosition.y -
    defaultFloorCoverSize.height / 2 -
    defaultPlayerSize.radius,
};

export const floor1Size = {
  width:
    StoneBlockCoverRenderSize.topleft.width +
    StoneBlockCoverRenderSize.topright.width +
    StoneBlockCoverRenderSize.topmiddle.width * 40,
  height: baseFloorHeight,
};

export const floor1Position = {
  x: Screen.width * 1.65 + floor1Size.width / 2,
  y: baseFloorLevel + floor1Size.height / 2,
};

export const goalRenderSize = {
  width: Screen.width / 2, //528 resize
  height: Screen.height / 2, //323 resize
};

export const defaultGoalSize = {
  width: Screen.width / 2,
  height: Screen.height / 2,
};

export const defaultGoalPosition = {
  //x: 0,
  x: Screen.width * 2.2 + defaultGoalSize.width / 2,
  y: baseFloorLevel - defaultGoalSize.height / 2,
};

export const trap1Size = {
  width: redTrapRenderSize.width * 3,
  height: redTrapRenderSize.height,
};
export const trap1Position = {
  //x: 300,
  x: Screen.width * 1.8 + trap1Size.width / 2,
  y: baseFloorLevel - trap1Size.height / 2,
};

export const groundEnemy1Size = {
  radius: (Screen.height / 38) * 2, //10
  width: Screen.width / 20,
  height: Screen.height / 8,
};
export const groundEnemy1Position = {
  //x: 400,
  x: Screen.width + groundEnemy1Size.radius + Screen.width / 8,
  y: baseFloorLevel - defaultPlayerSize.radius,
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
  height: 60,
};
export const defaultPlayerFlutterTime = 200;
export const defaultEnemyFlutterTime = 200;
export const defaultPlayerFrameTime = 200;
export const yellowBricksBlockSize = {
  width: 300,
  height: 300,
};
export const yellowBricksBlockCoverSize = {
  width: 180,
  height: 60,
};

const gameOptionBoxRenderScale = 0.7

export const gameOptionBoxRenderSize = {
  paddingTop: (Screen.height / 8) * gameOptionBoxRenderScale, //45
  paddingBottom: (Screen.height / 11)* gameOptionBoxRenderScale, //35
  paddingLeft: (Screen.width/6)*gameOptionBoxRenderScale, 
  paddingRight: (Screen.width/6)*gameOptionBoxRenderScale, 
  boxWidth: (Screen.width / 1.164)* gameOptionBoxRenderScale, //513
  boxHeight: (Screen.height / 1.320)*gameOptionBoxRenderScale, //284
};

export const gameOptionBoxPosition = {
  boxTop: Screen.height / 8,
  boxLeft: Screen.width / 2 - gameOptionBoxRenderSize.boxWidth / 2,
};

export const gameOptionPadSize = {
  titleHeight: gameOptionBoxRenderSize.boxHeight / 5,
  optionHeight: (gameOptionBoxRenderSize.boxHeight / 9) * 2,
  optionWidth: gameOptionBoxRenderSize.boxWidth,
};

export const gameOptionTitleRenderSize = {
  width: gameOptionBoxRenderSize.boxWidth/10*5,
  height:gameOptionPadSize.titleHeight/6*5,
}

export const gameOptionRenderSize = {
  width:gameOptionBoxRenderSize.boxWidth - gameOptionBoxRenderSize.paddingLeft - gameOptionBoxRenderSize.paddingRight,
  height:gameOptionPadSize.optionHeight - Screen.height/45,
}

export const gameOptionPadSignRenderSize = {
  width:Screen.width/45, //10
  height:Screen.height/17, //10
  paddingLeft:Screen.width/45, //15
  paddingTop: Screen.height/100, //10
}

export const gameOptionPadTextRenderSize = {
  paddingLeft: Screen.width/45, //15
  paddingTop: gameOptionPadSignRenderSize.paddingTop,
  width:10,
  height:gameOptionPadSignRenderSize.height,
}

export const chapterBoxTitleRenderSize = {
  width:Screen.width/7,
  height:Screen.height/10,
}