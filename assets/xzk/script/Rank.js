/*
 * @Descripttion: 
 * @version: 
 * @Author: xzk
 * @Date: 2020-05-23 15:08:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-05 17:51:08
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
        sub:{
            type:require('sub'),
            default:null
        },
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },
    onEnable(){
        this.sub.showSub()
    },
    start () {
        
    },

    close_Rank(){
        this.node.active = false
    },
    share(){
        Daoliu.default.shareApp()
    }
    // update (dt) {},
});
