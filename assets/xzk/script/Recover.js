/*
 * @Descripttion: 
 * @version: 
 * @Author: xzk
 * @Date: 2020-06-06 16:05:00
 * @LastEditors: xzk
 * @LastEditTime: 2020-06-16 14:27:01
 */ 
// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.getComponent(cc.BoxCollider).size.width = this.node.width
        this.node.getComponent(cc.BoxCollider).size.height = this.node.height
        
    },

    start () {
        this.RecoverSwitch = true
    },
    set_RecoverSwitch(flag){
        this.RecoverSwitch = flag
    },

    onCollisionStay(other,self){    //编辑界面物品收回调
        if(this.RecoverSwitch){
            other.node.destroy()
            this.node.opacity = 0
        }
    }
    // update (dt) {},
});
