/**
 * 게임오버
 */

import Phaser from 'phaser';
import Button from "../ui/Button";
import bg from '../assets/bg.jpg';

export default class GameOver extends Phaser.Scene {

    constructor(){
        super('gameOver');
    }
    
    // 점수 데이터 가져오기
    init(data) {
        this.scoreCount = data.scoreCount;
        this.timeCount = data.timeCount;
    }

    preload(){
        this.load.image('bg', bg);
    }
    create(){
        const {x, y, width, height} = this.cameras.main;
        const center = {
            x : x + width/2,
            y : y + height/2
        };
        // 배경
        this.bg = this.add.tileSprite(
            0,
            0,
            width,
            height,
            "bg"
        );
        this.bg.setOrigin(0, 0);
        // 게임오버 텍스트
        this.overText = this.add.text(0, 0, 'GAME OVER', { fontSize: '38px', fill: '#fff' }).setStroke('#000', 5);
        this.overText.setPosition(center.x - this.overText.width/2, height * 2 / 5);

        // 점수, 시간 텍스트
        this.scoreText = this.add.text(0, 0, 'Score:' +this.scoreCount +' / '+this.timeCount, { fontSize: '25px', fill: '#fff' }).setStroke('#000', 5);
        this.scoreText.setPosition(center.x - this.scoreText.width/2, height * 2.5 / 5);

        // 다시하기
        new Button(
            center.x,
            height * 3.2 / 5,
            "다시하기",
            this,
            () => this.scene.start("game")
        );
    }
    
    update(){

    }

}