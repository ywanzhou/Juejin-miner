/*
 * @Descripttion: 
 * @version: 
 * @Author: xzk
 * @Date: 2020-06-05 16:28:54
 * @LastEditors: xzk
 * @LastEditTime: 2020-06-12 11:34:18
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
    
    /**
     *  点击事件监听 
     */
    onLoad () {
        GameData.set_TouchManager(this)
    },

    start () {
        this.node.on(cc.Node.EventType.TOUCH_END,this.TOUCH_END,this)
    },
    onDestroy(){
        this.node.off(cc.Node.EventType.TOUCH_END,this.TOUCH_END,this)
    },
    TOUCH_END(event){
        GameData.get_Player().Grasp()
    }
    // update (dt) {},
});
