import GamePlay from "../../scenes/GamePlay";
import IPlayer from "./IPlayer";

export default class Player extends Phaser.GameObjects.Sprite implements IPlayer {
  protected _config: genericConfig;
  protected _scene: GamePlay;
  private _body: Phaser.Physics.Arcade.Body;
  private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private controlloR: Boolean = false;
  private controlloL: Boolean = false;

  constructor(params: genericConfig) {
    super(params.scene, params.x, params.y, params.key);
    this._scene.add.existing(this);
    this._cursors = this.scene.input.keyboard.createCursorKeys();
    this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this._body
      .setDragX(1000)
      .setCollideWorldBounds(true, 0.5)
      .setImmovable(true)
      .setGravity(0, 1200)
      .setMaxVelocity(250, 550);

    let _animation = {
      key: "idle",
      frames: this.anims.generateFrameNumbers(this._config.key, {
        frames: [0],
      }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    };

    this.anims.create(_animation);

    _animation = {
      key: "right-run",
      frames: this.anims.generateFrameNumbers(this._config.key, {
        frames: [0, 1, 2, 3],
      }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    };

    this.anims.create(_animation);

    _animation = {
      key: "left-run",
      frames: this.anims.generateFrameNumbers(this._config.key, {
        frames: [0, 1, 2, 3],
      }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    };

    this.anims.create(_animation);

    _animation = {
      key: "right-jump",
      frames: this.anims.generateFrameNumbers(this._config.key, {
        frames: [0],
      }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    };

    this.anims.create(_animation);

    _animation = {
      key: "left-jump",
      frames: this.anims.generateFrameNumbers(this._config.key, {
        frames: [0],
      }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    };

    this.anims.create(_animation);
  }

  create() {}

  update(time: number, delta: number): void {
    if (this._cursors.left.isDown) {
      this.anims.play("left-run", true);
      this._body.setAccelerationX(-160);
      this.controlloL = true;
    }
     else if (this._cursors.right.isDown) {
      this.anims.play("right-run", true);
        this._body.setAccelerationX(160);
        this.controlloR = true;
    }

    else if (this._cursors.up.isDown && this.controlloL) {
      this.anims.play("left-jump", true);
      }
      
    else if (this._cursors.up.isDown && this.controlloR) {
        this.anims.play("right-jump", true);
      }
    else {
        // dani sei gay <3
        this.anims.play("idle", true);
        this.controlloR = false;
        this.controlloL = false;
      }
    
      
      
  }
}
