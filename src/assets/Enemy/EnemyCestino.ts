import GamePlay from "../../scenes/GamePlay";
import Enemy from "./Enemy";

export default class EnemyCestino extends Enemy{
    private _type: number = 0;
    private _runAnimation: Array<{ radius: number , frames: Array<number>}> = {
        radius: 40, frames:[0,1,2,3,4,5,6,7,8,9,10,11]}
    ];
    



}