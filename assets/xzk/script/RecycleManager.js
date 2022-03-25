/*
 * @Descripttion: 
 * @version: 
 * @Author: xzk
 * @Date: 2020-06-05 17:03:08
 * @LastEditors: xzk
 * @LastEditTime: 2020-06-12 11:31:51
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

    onLoad () {                 //边界设置
        this.Left = this.node.getChildByName('Left')
        this.Right = this.node.getChildByName('Right')
        this.Bottom = this.node.getChildByName('Bottom')
        this.Left.getComponent(cc.BoxCollider).size.height = GameData.get_Canvas().height
        this.Right.getComponent(cc.BoxCollider).size.height = GameData.get_Canvas().height
        this.Bottom.getComponent(cc.BoxCollider).size.width = GameData.get_Canvas().width
        

        
    },

    start () {

    },

    // update (dt) {},
});
