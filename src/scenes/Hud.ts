import GamePlay from "./GamePlay";

export default class Hud extends Phaser.Scene {
  private scoreText: Phaser.GameObjects.BitmapText;
  private score: number;
  private gamePlay: GamePlay;
  private rubbish: Phaser.GameObjects.Image;

  constructor() {
    super({
      key: "Hud",
    });
  }

  async preload() {
    this.rubbish = this.add
      .image(this.game.canvas.width - 125, 18, "rubbish")
      .setScale(0.02)
      .setOrigin(0);
  }

  async create() {
    this.gamePlay = <GamePlay>this.scene.get("GamePlay");
    this.gamePlay.events.off("update-score", this.updateScore, this);
    this.gamePlay.events.on("update-score", this.updateScore, this);
    this.score = 0;
    this.registry.set("score", this.score);

    this.scoreText = this.add
      .bitmapText(this.game.canvas.width - 75, 20, "arcade", "0")
      .setFontSize(30)
      .setTint(0x000000)
      .setOrigin(0);
  }

  async update() {
    if (this.score == 100) {
      this.gameOver();
    }
  }

  private updateScore(parameters: Array<any>): void {
    this.score += parameters[0];
    this.scoreText.setText(this.score + "");
    this.registry.set("score", this.score);
  }

  private gameOver() {
    this.scene.stop("Hud");
    this.scene.stop("GamePlay");
    this.scene.start("GameOver");
  }
}
