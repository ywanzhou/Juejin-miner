/*
 * @Descripttion: 
 * @version: 
 * @Author: xzk
 * @Date: 2020-06-11 09:37:14
 * @LastEditors: xzk
 * @LastEditTime: 2020-06-18 17:04:02
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
        Success:cc.Node,
        Fail:cc.Node,
        End:cc.Node,
        AD:cc.Node,
        Share:cc.Node,
        NewRecord:cc.Node,
        ThisScore:cc.Label,
        HistoryHighScore:cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        GameData.set_LevelComplete(this)
    },
    /**
     * 通关成功显示
     */
    ShowSuccess(){                  
        this.Success.active = true
        this.Fail.active = false
        this.End.active = false
        this.WriteHighScore()
    },
    /**
     * 通关失败显示
     */
    ShowFail(){
        this.Success.active = false
        this.Fail.active = true
        this.End.active = false
        if(GameData.get_GameManager().get_Video()){
            this.AD.active = true
            this.Share.active = false
        }else{
            this.AD.active = false
            this.Share.active = true
        }
        this.WriteHighScore()
    },
    /**
     * 结束界面显示
     */
    ShowEnd(){
        this.WriteHighScore(true)
        this.Success.active = false
        this.Fail.active = false
        this.End.active = true
        GameData.get_GameManager().CloseMidView()
    },
    CloseAll(){
        this.Success.active = false
        this.Fail.active = false
        this.End.active = false
    },
    /**
     * 向本地写入最高分
     */
    WriteHighScore(ShowNewRecord = false){
        let thisLevel = GameData.get_Score()
        let LocalHighLevel = cc.sys.localStorage.getItem('HighLevel')
        if(LocalHighLevel == '' || LocalHighLevel <= thisLevel){
            cc.sys.localStorage.setItem('HighLevel',thisLevel)
            if(ShowNewRecord){
                this.NewRecord.active = true

                this.HistoryHighScore.string = thisLevel
                this.ThisScore.string = thisLevel
            }
        }else{
            if(ShowNewRecord){
                this.HistoryHighScore.string = LocalHighLevel
                this.ThisScore.string = thisLevel
            }
        }
    }
    

    // update (dt) {},
});
