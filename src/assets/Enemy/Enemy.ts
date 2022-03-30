import GamePlay from "../../scenes/GamePlay";
import IEnemy from "./IEnemy";

export default class Enemy extends Phaser.GameObjects.Sprite implements IEnemy{
    protected _config: genericConfig;
    protected _scene: GamePlay;
    protected _body: Phaser.Physics.Arcade.Body;
    private _type: number = 0;
    


    create(): void {
        
    }

    update(time: number, delta: number) {
        
    }


}