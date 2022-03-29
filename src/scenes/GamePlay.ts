import Player from "../assets/gameComponents/Player";

export default class GamePlay extends Phaser.Scene {
  private level: number = 1;
  private city: Phaser.GameObjects.Image;

  constructor() {
    super({ key: "GamePlay" });
  }

  async preload() {
    this.city = this.add.image(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      "city"
    );
  }

  init() {}

  async create() {
    this.add
      .rectangle(0, 0, 100, 100, 0x000000)
      .setInteractive()
      .on("pointerdown", async () => {
        this.events.emit("update-score", [100]);
      })
      .setDepth(10)
      .setOrigin(0.5);

    //new Player( scene: this, x: 512, y: 300, key: "idle" );
  }

  update() {}
}
