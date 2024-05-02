/**
 * 로딩
 */

import Phaser from 'phaser';
import bg from '../assets/bg.jpg';

export default class Loading extends Phaser.Scene {

    constructor(){
        super('loading');//식별자를 loading으로 설정
    }

    preload(){
        this.load.image('bg', bg);
    }

    create(){
        const {x, y, width, height} = this.cameras.main;

        //글꼴 크기 계산
        //- 제목 : 120px (1920px 기준)
        //- 내용 : 75px (1920px 기준)
        const titleFontSize = Math.max(50, 120 * width / 1920);
        const clickToStartFontSize = Math.max(35, 75 * width / 1920);

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

        //제목
        this.title = this.add.text(
            center.x, //x위치
            height * 1.5 / 5, //y위치
            'D r o p\nC o o k i e'//제목
        )
        .setFontFamily('Arial')
        .setFill("#f9bb00")
        .setFontSize(titleFontSize)
        .setOrigin(0.5)
        .setDepth(999)
        .setStroke('#fff', 5)
        .setAlign('center');

        //클릭메세지
        this.clickToStart = this.add.text(
            center.x,
            height * 4 / 5,
            'Click to start'
        )
        .setFill("#f9bb00")
        .setFontFamily('Arial')
        .setFontSize(clickToStartFontSize)
        .setOrigin(0.5)
        .setDepth(999)
        .setAlign('center')
        .setInteractive({ cursor: 'pointer' });
        
        // 클릭메세지 텍스트 효과
        const textEffect = this.clickToStart.postFX.addGlow(0xffffff, 0, 0, false, 0.1, 20);
        this.tweens.add({
            targets: textEffect,
            outerStrength: 4,
            yoyo: true,
            loop: -1,
            ease: 'sine.inout'
        });
        
        //게임시작
        this.clickToStart.once('pointerdown', ()=>{
            this.scene.start('game');
        });
    }
    update(){
        
    }

}