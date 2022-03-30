import GamePlay from "../../scenes/GamePlay";
import IPlayer from "./IPlayer";
import Sacchetto from "./Sacchetto";

export default class Player
  extends Phaser.GameObjects.Sprite
  implements IPlayer
{
  protected _config: genericConfig;
  protected _scene: GamePlay;
  private _body: Phaser.Physics.Arcade.Body;
  private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private _spacebar: Phaser.Input.Keyboard.Key;
  private controlloR: Boolean = false;
  private controlloL: Boolean = false;

  constructor(params: genericConfig) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this._scene = <GamePlay>params.scene;
    this._config.scene.physics.world.enable(this);
    this._body = <Phaser.Physics.Arcade.Body>this.body;
    this._scene.add.existing(this);
    this._cursors = this.scene.input.keyboard.createCursorKeys();
    this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this._body.setDragX(100).setCollideWorldBounds(true, 0.5);

    let _animation = {
      key: "idle",
      frames: "idle",
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    };

    this.anims.create(_animation);

    let _animation2 = {
      key: "right-run",
      frames: this.anims.generateFrameNumbers("right-run", {
        frames: [0, 1, 2, 3],
      }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    };

    this.anims.create(_animation2);

    _animation2 = {
      key: "left-run",
      frames: this.anims.generateFrameNumbers("left-run", {
        frames: [0, 1, 2, 3],
      }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    };

    this.anims.create(_animation2);

    _animation = {
      key: "right-jump",
      frames: "right-jump",
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    };

    this.anims.create(_animation);

    _animation = {
      key: "left-jump",
      frames: "left-jump",
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    };

    this.anims.create(_animation);
    this.setDepth(11);
  }

  async update(time: number, delta: number) {
    if (Phaser.Input.Keyboard.JustDown(this._spacebar)) {
      new Sacchetto({ scene: this._scene, x: this.x, y: this.y, key: "bag" });
    }

    if (this._cursors.left.isDown) {
      this.anims.play("left-run", true);
      this._body.setAccelerationX(-160);
      this.controlloL = true;
    } else if (this._cursors.right.isDown) {
      this.anims.play("right-run", true);
      this._body.setAccelerationX(160);
      this.controlloR = true;
    } else if (
      this._cursors.up.isDown &&
      this.controlloL &&
      this._body.blocked.down
    ) {
      this.anims.play("left-jump", true);
    } else if (
      this._cursors.up.isDown &&
      this.controlloR &&
      this._body.blocked.down
    ) {
      this.anims.play("right-jump", true);
    } else {
      this.anims.play("idle", true);
      this.controlloR = false;
      this.controlloL = false;
    }
  }
}
