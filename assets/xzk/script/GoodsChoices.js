/*
 * @Descripttion: 
 * @version: 
 * @Author: xzk
 * @Date: 2020-06-06 14:55:21
 * @LastEditors: xzk
 * @LastEditTime: 2020-06-16 14:26:05
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
        GoodsPerfeb:{
            type:cc.Prefab,
            default:null
        },
        img:{
            type:cc.Sprite,
            default:null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.touchLocation
        this.node.on(cc.Node.EventType.TOUCH_END,this.TOUCH_END,this)
    },
    onDestroy () {
        this.node.off(cc.Node.EventType.TOUCH_END,this.TOUCH_END,this)
    },
    TOUCH_END(event){
        let Goods = cc.instantiate(this.GoodsPerfeb)
        Goods.parent = GameData.get_Editor().node.getChildByName('EditorGoods')
        Goods.x = 0,
        Goods.y = 0
    }
    // update (dt) {},
});
