/*
 * @Descripttion: 
 * @Author: xzk
 * @Date: 2020-08-05 17:45:10
 * @LastEditTime: 2020-08-05 17:45:53
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

    // onLoad () {},

    start () {

    },

    StartGame(){
        cc.director.loadScene('Game')
    }
    // update (dt) {},
});
