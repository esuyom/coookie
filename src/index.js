/**
 * 기본설정
 */
import './css/index.css';

import Phaser from 'phaser';

import Loading from './js/Loading.js';
import Game from './js/Game.js';
import GameOver from './js/GameOver.js';

//게임 설정 - 웹 폰트 로딩 후 생성
const width = window.innerWidth;
const height = window.innerHeight;
const config = {
    type:Phaser.AUTO,//WebGL or Canvas
    width:width,
    height:height,
    physics:{//물리엔진
        default:'arcade',//arcade 엔진
        // arcade : {
        //     debug:false,//디버깅 사용
        // }
    },
    scale:{//배율설정
        parent: "game", //게임아이디
        mode:Phaser.Scale.FIT,//자동맞춤
        autoCenter:Phaser.Scale.CENTER_BOTH,//가로세로 모두맞춤
        width:width,//비율설정용 폭
        height:height,//비율설정용 높이
    },
    backgroundColor: '#000',
    //장면 설정
    scene:[Loading, Game, GameOver]
}

const game = new Phaser.Game(config);//eslint-disable-line no-unused-vars