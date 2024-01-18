/**
 * 게임
 */

import Phaser from 'phaser';
import cookie1 from '../assets/cookie1.png';
import cookie2 from '../assets/cookie2.png';
import monster from '../assets/monster.png';
import spider from '../assets/spider.png';


export default class Game extends Phaser.Scene {

    constructor(){
        super('game');
    }

    preload(){
        this.load.image('monster', monster);
        this.textures.addBase64('cookie1', cookie1);
        this.textures.addBase64('cookie2', cookie2);
        this.textures.addBase64('spider', spider);
    }
    create(){
        const {x, y, width, height} = this.cameras.main;
        const center = {
            x : x + width/2,
            y : y + height/2
        };
        
        // 점수 생성
        this.score = 0;
        this.scoreText = this.add.text(0, 0, 'Score:'+this.score, { fontSize: '25px', fill: '#fff' }).setStroke('#000', 5);
        Phaser.Display.Align.In.TopLeft(this.scoreText, this.add.zone(center.x, center.y + 10, width, height)); //정렬

        // 타이머 생성
        this.timeText = this.add.text(0, 0, "Time:", { fontSize: '25px', fill: '#ffd323' }).setStroke('#000', 5); //Elapsed Time Text
        Phaser.Display.Align.In.TopLeft(this.timeText, this.add.zone(center.x, center.y + 40, width, height)); //정렬
        this.timer = this.time.addEvent({
            delay: 999999,
            paused: false
        });

        // 쿠키 생성
        this.makeCookie = setInterval(() => {
            const x = Phaser.Math.Between(30, width-30);
            const y = 0;

            // 쿠키 종류 랜덤
            const rnd = Math.round(Math.random()*1)+1;//1 or 2
            this.cookie = this.physics.add.image(x, y, 'cookie'+rnd);
            this.cookie.body.setVelocity(0, 400);
            // 쿠키 먹었을때
            this.physics.add.overlap(this.monster, this.cookie, this.eatCookie, null, this);
        }, 1600);

        // 거미 생성
        setTimeout(() => {
            this.makeSpider = setInterval(() => {
                const x = Phaser.Math.Between(30, width-30);
                const y = 0;
                
                this.spider = this.physics.add.image(x, y, 'spider');
                this.spider.body.setVelocity(0, 600);
                // 거미 먹었을때
                this.physics.add.overlap(this.monster, this.spider, this.eatSpider, null, this);
            }, 600);
        }, 6000);
        
        // 몬스터 생성
        this.monster = this.physics.add.image(center.x, height * 4.5 / 5, 'monster');
        this.monster.setCollideWorldBounds(true);

        // 키보드
        this.cursors = this.input.keyboard.createCursorKeys();

        // 속도
        this.speed = 7;

    }
    
    update(){
        // 타이머
        this.timeText.setText('Time:' + this.timer.getElapsedSeconds().toFixed(0));
        var pointer = this.input.activePointer;
        // 마우스 우선 처리
        if(pointer.isDown){
            //거리계산
            const distance = Phaser.Math.Distance.Between(
                pointer.x, pointer.y, //마우스x, 마우스y
                this.monster.x, this.monster.y, //몬스터x, 몬스터y
            );
            if(distance > this.speed){
                //각도계산
                const angle = Phaser.Math.Angle.Between(
                    pointer.x, pointer.y, //마우스x, 마우스y
                    this.monster.x, this.monster.y //몬스터x, 몬스터y
                );
                const dx = Math.cos(angle) * this.speed;
                this.monster.x -= dx;
            }
        }else{
            // 키보드 처리
            if (this.cursors.left.isDown){
                this.monster.x -= this.speed;
            }else if (this.cursors.right.isDown){
                this.monster.x += this.speed;
            }
        }
    }

    eatCookie (monster, cookie)
    {
        cookie.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score:' + this.score);
    }

    eatSpider (monster, spider)
    {
        clearInterval(this.makeCookie);
        clearInterval(this.makeSpider);
        // 게임오버
        this.scene.start('gameOver',{ 
            scoreCount: this.score,//점수
            timeCount: this.timeText.text //시간
        });
    }

}