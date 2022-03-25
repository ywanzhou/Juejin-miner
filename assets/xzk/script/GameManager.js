/*
 * @Descripttion: 
 * @version: 
 * @Author: xzk
 * @Date: 2020-06-05 16:28:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-05 18:04:49
 */
// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
let GameData = require('GameData')
cc.Class({
    extends: cc.Component,

    properties: {
        Canvas: {
            type: cc.Node,
            default: null
        },
        Editor: {
            type: cc.Node,
            default: null
        },
        Time: {
            type: cc.Label,
            default: null
        },
        TargetScore: {
            type: cc.Label,
            default: null
        },
        TargetScoreAnimation:{
            type: cc.Animation,
            default: null
        },
        Score: {
            type: cc.Label,
            default: null
        },
        Loading: {
            type: cc.Node,
            default: null
        },
        LevelLabel:{
            type:cc.Label,
            default:null
        },

        AudioClips:{
            type:cc.AudioClip,
            default:[]
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.AudioArray = []                //音频数组
        cc.audioEngine.setMaxAudioInstance(1)
        GameData.set_GameManager(this)
        GameData.set_Canvas(this.Canvas)
        GameData.set_Loading(this.Loading)

        let C = cc.director.getCollisionManager();
        C.enabled = true;
        // C.enabledDebugDraw = true

        let P = cc.director.getPhysicsManager();
        P.enabled = true
        P.gravity = cc.v2()

        GameData.StartGame()
        this.AudioManager('StartBGM')
    },

    start() {

        this.node.on(cc.Node.EventType.MOUSE_WHEEL, this.Editing, this)
        this.GameTime = 45
        this.OneS = 0   //计时器
        this.FreshTime()
        this.FreshLevel()
        this.TenCountDown = true

        GameData.get_GoodsManager().LoadGoods()
        // GameData.get_GoodsManager().RangeGoods((GameData.get_Level()[1]-1)%7)

        // GameData.get_GoodsManager().RangeGoods(4)
        // if(DaoliuData.default.GTEvideo()){
        //     this.ad.active = true
        //     this.share.active = false
        // }else{
        //     this.ad.active = false
        //     this.share.active = true
        // }
        this.FreshScore()
        this.TargetScoreAnimation.play()
    },
    get_Video(){
    },
    /**
     * 音乐管理
     */

    AudioManager(Clips){
        let AudioID
        switch (Clips) {
            case 'StartBGM':
                AudioID = cc.audioEngine.playMusic(this.AudioClips[0],true)
                this.AudioArray.push({
                    AudioID:AudioID,
                    AudioClips:this.AudioClips[0]
                })
                break;
            case 'StopBGM':
                cc.audioEngine.stopMusic()
                break;
            case 'CountDown':
                cc.audioEngine.play(this.AudioClips[1],false)
                break;
            case 'Fail':
                cc.audioEngine.play(this.AudioClips[2],false)
                break;
            case 'Golden':
                cc.audioEngine.play(this.AudioClips[3],false)
                break;
            case 'StartRope':
                AudioID = cc.audioEngine.play(this.AudioClips[4],false)
                this.AudioArray.push({
                    AudioID:AudioID,
                    AudioClips:this.AudioClips[4]
                })
                break;
            case 'StopRope':
                this.AudioArray.forEach(element => {
                    if(element.AudioClips == this.AudioClips[4]){
                        cc.audioEngine.stop(element.AudioID)
                    }
                });
                break;
            case 'Catched':
                cc.audioEngine.play(this.AudioClips[5],false)
                break;
            case 'ResetClaw':
                cc.audioEngine.play(this.AudioClips[6],false)
                break;
            case 'Diamond':
                cc.audioEngine.play(this.AudioClips[7],false)
                break;
            case 'Boom':
                cc.audioEngine.play(this.AudioClips[8],false)
                break;
            case 'Stone':
                cc.audioEngine.play(this.AudioClips[9],false)
                break;
            case 'PassedLevel':
                cc.audioEngine.play(this.AudioClips[10],false)
                break;
            case 'GoldenMini':
                cc.audioEngine.play(this.AudioClips[11],false)
                break;
            default:
                break;
        }
    },
    /**
     * 下一关
     */
    NextLevel(){
        GameData.get_GoodsManager().RemoveAll()
        
        let Level = GameData.get_Level()
        Level[1] += 1
        GameData.set_Level(Level)
        this.TenCountDown = true

        
        
        if(GameData.get_Level()[1]<11){
            GameData.get_GoodsManager().LoadGoods()
        }else{
            GameData.get_GoodsManager().RangeGoods((GameData.get_Level()[1]-1)%5)
        }
        GameData.get_LevelComplete().CloseAll()
        this.GameTime = 45
        this.OneS = 0
        this.FreshScore()
        this.FreshTime()
        this.FreshLevel()
        this.TargetScoreAnimation.play()

        this.AudioManager('StartBGM')
        this.scheduleOnce(()=>{
            GameData.set_GameRunning(true)
        },1.5)

    },

    /**
     * 关卡更新
     */
    FreshLevel(){
        this.LevelLabel.string = '第'+GameData.get_Level()[1]+'关'
        // if(GameData.get_Level()[1]>10){
        //     this.BackStart()
        // }
    },
    /**
     * 更新分数+分数判断
     */
    FreshScore() {  
        
        if(GameData.get_Level()[1]<11){
            this.Score.string = GameData.get_Score()
            this.TargetScore.string = GameData.get_LevelScore()
        }else{
            this.Score.string = GameData.get_Score()
            this.TargetScore.string = GameData.get_LevelCountScore()
        }

    },
    /**
     * 关闭mid广告
     */
    CloseMidView(){
    },
    FreshTime() {   //更新时间+时间判断
        this.Time.string = this.GameTime.toFixed(0)
        if(this.GameTime<=10 && this.TenCountDown){
            this.AudioManager('CountDown')
            this.TenCountDown = false
        }
        if(this.GameTime<=0){
            this.Time.string = 0
            
            GameData.set_GameRunning(false)
            GameData.get_Player().PauseClaw()

            GameData.get_Player().ResetClaw()
            GameData.get_Player().set_ClawGoods(null)
            this.AudioManager('StopBGM')
            if(GameData.get_Level()[1]<11){
                if(GameData.get_Score() >= GameData.get_LevelScore()){
                    this.AudioManager('PassedLevel')
                    GameData.get_LevelComplete().ShowSuccess()
                }else{
                    this.AudioManager('Fail')
                    if(GameData.get_RivivalTimes()>0){
                        GameData.get_LevelComplete().ShowFail()
                    }else{
                        GameData.get_LevelComplete().ShowEnd()
                    }
                }
            }else{
                if(GameData.get_Score() >= GameData.get_LevelCountScore()){
                    this.AudioManager('PassedLevel')
                    GameData.get_LevelComplete().ShowSuccess()
                }else{
                    this.AudioManager('Fail')
                    if(GameData.get_RivivalTimes()>0){
                        GameData.get_LevelComplete().ShowFail()
                    }else{
                        GameData.get_LevelComplete().ShowEnd()
                    }
                }
            }
            
        }else{
        }
    },
    BackStart(){    //返回开始游戏界面
        cc.director.loadScene('Loading');
    },
    Editing() {     //跳转编辑
        GameData.set_GameRunning(false)
        GameData.set_Editing(true)
        // GameData.
        this.Editor.active = true
    },
    /**
     * 复活方法
     */
    Revival(){
        this.awardCallback()
    },
    /**
     * 复活回调
     */
    awardCallback() {
        console.log('Revival!!')
        GameData.set_RivivalTimes(0)
        GameData.get_GoodsManager().RemoveAll()
        if(GameData.get_Level()[1]<11){
            GameData.get_GoodsManager().LoadGoods()
        }else{
            GameData.get_GoodsManager().RangeGoods((GameData.get_Level()[1]-1)%5)
        }
        GameData.set_GameRunning(true)
        GameData.get_LevelComplete().CloseAll()
        this.AudioManager('StartBGM')
        GameData.get_Player().ResetClaw()
        if(GameData.get_Player().get_ClawGoods() != null){
           GameData.get_Player().get_ClawGoods().getComponent('Goods').set_Catched(false)
        }
        GameData.get_Player().set_ClawGoods(null)
        
        this.GameTime = 45
    },
    /**
     * 分享
     */
    Share(){
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
        }
    },
    update(dt) {    
        if (GameData.get_GameRunning()) {
            this.GameTime -= dt
            this.OneS += dt
            while (this.OneS >= 1) {    //updata做计时器
                this.OneS -= 1
                this.FreshTime()
            }
        }
    },
});
