import Player from "../assets/gameComponents/Player";
import Cestino from "../assets/Enemy/Cestino";
import Sacchetto from "../assets/gameComponents/Sacchetto";
export default class GamePlay extends Phaser.Scene {
  private _level: number = 1;
  private _city: Phaser.GameObjects.Image;
  private _player: Player;
  private _enemyGroup: Phaser.GameObjects.Group;
  private _bagGroup: Phaser.GameObjects.Group;
  private _platform: Phaser.GameObjects.Rectangle;
  constructor() {
    super({ key: "GamePlay" });
  }

  async preload() {
    this._city = this.add.image(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      "city"
    );
  }

  async create() {
    this._level = 1;
    this._bagGroup = this.add.group({ runChildUpdate: true });
    this._enemyGroup = this.add.group({ runChildUpdate: true });
    this._player = new Player({
      scene: this,
      x: this.game.canvas.width / 2,
      y: 550,
      key: "player",
    });
    this.physics.add.collider(
      this._bagGroup,
      this._enemyGroup,
      this.hitEnemy,
      undefined,
      this
    );

    this._platform = this.add.rectangle(700,600,this.game.canvas.width+120,25,0x33cc33,10).setOrigin(.5)

    


    
        
  }

  async addBag(bag: Sacchetto) {
    this._bagGroup.add(bag);
  }

  async removeBag(bag: Sacchetto) {
    this._bagGroup.remove(bag, true, true);
  }

  async addEnemy(enemy: Cestino) {
    this._enemyGroup.add(enemy);
  }

  async removeEnemy(enemy: Cestino) {
    this._enemyGroup.remove(enemy, true, true);
  }

  async hitEnemy(bag: any, enemy: any) {
    this.removeEnemy(enemy);
    this.removeBag(bag);
    this.events.emit("update-score", [1]);
  }


  async update() {
    this._player.update();
  
  }
}
