import "phaser";
import Boot from "./scenes/Boot";
import Preloader from "./scenes/Preloader";
import Intro from "./scenes/Intro";
import Hud from "./scenes/Hud";
import GameOver from "./scenes/GameOver";
import GamePlay from "./scenes/GamePlay";
import { GameData } from "./GameData";
import Win from "./scenes/Win";
import GamePlay2 from "./scenes/GamePlay2";
import GameWin from "./scenes/GameWin";

window.addEventListener("load", () => {
  const config: any = {
    type: Phaser.WEBGL,
    backgroundColor: GameData.globals.bgColor,
    parent: "my-game",
    scale: {
      mode: Phaser.Scale.FIT,
      width: GameData.globals.gameWidth,
      height: GameData.globals.gameHeight,
    },

    scene: [
      Boot,
      Preloader,
      Intro,
      Hud,
      GamePlay,
      GameOver,
      Win,
      GamePlay2,
      GameWin,
    ],

    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 1400 },
        debug: false,
      },
    },
    input: {
      activePointers: 2,
      keyboard: true,
    },
    render: {
      pixelArt: true,
      antialias: false,
    },
  };

  const game = new Phaser.Game(config);

  return;
});
