import Player from "../assets/gameComponents/Player";
import Boss from "../assets/Enemy/Boss";
import Sacchetto from "../assets/gameComponents/Sacchetto";

export default class GamePlay2 extends Phaser.Scene {
  private _level: number = 2;
  private _bossMap: Phaser.GameObjects.Image;
  private _player: Player;
  private _boss: Phaser.GameObjects.Group;
  private _bagGroup: Phaser.GameObjects.Group;
  private base: any;
  private vitaBoss: integer = 15;

  constructor() {
    super({ key: "GamePlay2" });
  }

  async preload() {
    this._bossMap = this.add.image(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      "stage2"
    );
  }
  async create() {
    this._level = 2;
    this._bagGroup = this.add.group({ runChildUpdate: true });
    this._boss = this.add.group({ runChildUpdate: true });
    this._player = new Player({
      scene: this,
      x: this.game.canvas.width / 2,
      y: 500,
      key: "player",
    });

    this.base = this.physics.add.staticGroup();

    this.base.create(800, 852, "base").setScale(0);

    this.physics.add.collider(this.base, this._player);

    this._player = this.physics.add.existing(this._player);
    this.physics.add.collider(
      this._bagGroup,
      this._boss,
      this.hitEnemy,
      undefined,
      this
    );

    this._boss.create(1180, 470, "boss-idle");

    this.physics.add.collider(
      this._bagGroup,
      this._boss,
      this.hitEnemy,
      undefined,
      this
    );
  }

  async addBag(bag: Sacchetto) {
    this._bagGroup.add(bag);
  }

  async removeBag(bag: Sacchetto) {
    this._bagGroup.remove(bag, true, true);
  }

  async addBoss(enemy: Boss) {
    this._boss.add(enemy);
  }

  async removeEnemy(enemy: Boss) {
    this._boss.remove(enemy, true, true);
  }

  async hitEnemy(bag: any, enemy: any) {
    if (this.vitaBoss == 0) {
      this.removeEnemy(enemy);
    }
    this.vitaBoss++;
    this.removeBag(bag);
    this.events.emit("update-score", [1]);
  }

  async shoot() {
    this.events.emit("decrease-score", [1]);
  }

  async update() {
    this._player.update();
  }
}
