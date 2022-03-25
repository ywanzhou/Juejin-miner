/*
 * @Descripttion: 
 * @version: 
 * @Author: xzk
 * @Date: 2020-05-23 10:05:02
 * @LastEditors: xzk
 * @LastEditTime: 2020-06-16 15:05:21
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
        
    },

    start () {

    },
    showSub(){
        wx.getOpenDataContext().postMessage({
            event:"updateViewPort",
            score: cc.sys.localStorage.getItem('HighLevel'),
            box: this.node.getBoundingBoxToWorld(),
            winSize: cc.winSize,
        });
    }
    // update (dt) {},
});
