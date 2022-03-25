/*
 * @Descripttion: 
 * @version: 
 * @Author: xzk
 * @Date: 2020-06-15 15:23:15
 * @LastEditors: xzk
 * @LastEditTime: 2020-06-16 14:19:26
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

    },
    onCollisionEnter(other,self){
        if(other.node.name == 'Claw'){
            if(this.node.getComponent('Goods').get_Catched()){
                GameData.get_GameManager().AudioManager('Diamond')
            }
        }
    },
    // update (dt) {},
});
