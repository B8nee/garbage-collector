export default class GameOver extends Phaser.Scene {
  private GameOver: Phaser.GameObjects.BitmapText;
  private otherintro: Phaser.GameObjects.BitmapText;
  private restart: Phaser.GameObjects.BitmapText;
  private bgEnd: Phaser.GameObjects.Image;

  constructor() {
    super({
      key: "GameOver",
    });
  }

  async preload() {
    this.bgEnd = this.add.image(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      "bgmenu"
    );
  }

  async create() {
    this.GameOver = this.add
      .bitmapText(1280 / 2, 100, "arcade", "Hai perso!", 60)
      .setAlpha(1)
      .setOrigin(0)
      .setDepth(1001)
      .setOrigin(0.5)
      .setTint(0x000f450)
      .on("pointerup", () => {
        this.otherintro.removeInteractive();
        this.intro();
      })
      .on("pointerover", () => {
        this.otherintro.setTint(0xff0000);
      })
      .on("pointerout", () => {
        this.otherintro.setTint(0xff8200);
      });

    this.restart = this.add
      .bitmapText(1280 / 2, 600 / 2, "arcade", "Rigioca")
      .setAlpha(1)
      .setOrigin(0.5)
      .setInteractive()
      .setDepth(100)
      .setTint(0xff8200)
      .on("pointerup", async () => {
        this.restart.removeInteractive();
        this.restartGame();
      })
      .on("pointerover", () => {
        this.restart.setTint(0xff0000);
      })
      .on("pointerout", () => {
        this.restart.setTint(0xff8200);
      });
  }

  async intro() {
    this.scene.stop("GameOver");
    this.scene.start("Intro");
  }

  async restartGame() {
    this.scene.stop("GameOver");
    this.scene.start("GamePlay");
    this.scene.bringToTop("GamePlay");
    this.scene.start("Hud");
    this.scene.bringToTop("Hud");
  }
}
