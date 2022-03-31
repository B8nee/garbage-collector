import GamePlay from "../../scenes/GamePlay";
import ISacchetto from "./ISacchetto";

export default class Sacchetto extends Phaser.GameObjects.Sprite implements ISacchetto{
    protected _config: genericConfig;
    protected _scene: GamePlay;
    protected _body: Phaser.Physics.Arcade.Body;

    constructor(params : genericConfig){
        super(params.scene, params.x, params.y, params.key);
        this._config = params;
        this._scene = <GamePlay>params.scene;
        this._config.scene.physics.world.enable(this);
        this._body = <Phaser.Physics.Arcade.Body>this.body;

        this._body.setDragX(1000)
            .setAccelerationX(100)
            .setMaxVelocityX(1000)
    }
    
    async create() { 
        let _animation = {
            keys: "bag-shoot",
            frames: "bag",
            frameRate: 10,
            yoyo : false,
            repeat : -1,
        };
        
        this.setScale(1);
        this._body.setCircle(7, 1.5, 1);
        this.anims.create(_animation);
        this.anims.play("bag-shoot");
        this.setAlpha(0).setScale(.5).setDepth(10);
        this._scene.tweens.add({targets:this, alpha: 1, scale:1, duration:200});
        this._scene.addBag(this);
        this._scene.add.existing(this);
    
    }
    
    async update(time: number, delta:number) {
        if (this.x < 0) { this._scene.removeBag(this); }
    }

    async removeItem() {}
}