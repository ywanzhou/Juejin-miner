/*
 * @Descripttion: 
 * @version: 
 * @Author: xzk
 * @Date: 2020-06-15 09:16:13
 * @LastEditors: xzk
 * @LastEditTime: 2020-06-17 10:42:28
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

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        this.MoveRange = 200            //移动范围
        this.MoveTime = 1.5               //移动时间


        // if(GameData.get_GameRunning()){
            this.node.runAction(                    //老鼠移动
                cc.repeatForever(
                    cc.sequence(
                        cc.moveBy(this.MoveTime,cc.v2(-this.MoveRange,0)),
                        cc.callFunc(()=>{
                            this.node.scaleX = -this.node.scaleX
                        }),
                        cc.moveBy(this.MoveTime,cc.v2(this.MoveRange,0)),
                        cc.callFunc(()=>{
                            this.node.scaleX = -this.node.scaleX
                        }),
                    )
                )
            )
        // }
        
    },
    onEnable(){
        // console.log('???',this.node)
        this.node.resumeAllActions()
        // if(GameData.get_GameRunning()){
        //     this.node.runAction(                    //老鼠移动
        //         cc.repeatForever(
        //             cc.sequence(
        //                 cc.moveBy(this.MoveTime,cc.v2(-this.MoveRange,0)),
        //                 cc.callFunc(()=>{
        //                     this.node.scaleX = -this.node.scaleX
        //                 }),
        //                 cc.moveBy(this.MoveTime,cc.v2(this.MoveRange,0)),
        //                 cc.callFunc(()=>{
        //                     this.node.scaleX = -this.node.scaleX
        //                 }),
        //             )
        //         )
        //     )
        // }
    },
    /**
     * 碰撞检测取消动作
     * @param {*} other 
     * @param {*} self 
     */
    onCollisionEnter(other,self){
        if(other.node.name == 'Claw'){
            if(this.node.getComponent('Goods').get_Catched()){
                this.node.pauseAllActions()
            }
        }
    },
    // update (dt) {},
});
