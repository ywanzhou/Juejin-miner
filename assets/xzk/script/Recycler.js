/*
 * @Descripttion: 
 * @version: 
 * @Author: xzk
 * @Date: 2020-06-06 08:59:28
 * @LastEditors: xzk
 * @LastEditTime: 2020-06-16 17:29:20
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
        this.ClawBackTimesSpeed = 1.5             //爪子返回时的速度倍数
    },


    onCollisionEnter(other,self){   //爪子碰到边界判断
        switch (other.node.name) {
            case 'Claw':
                if(GameData.get_Player().get_extending()){

                    let lv = other.node.getComponent(cc.RigidBody).linearVelocity
                    lv.x = -lv.x * this.ClawBackTimesSpeed
                    lv.y = -lv.y * this.ClawBackTimesSpeed
                    other.node.getComponent(cc.RigidBody).linearVelocity = lv
                    GameData.get_Player().set_extending(false)
                    GameData.get_Player().GraspNull()
                    break;

                }
                
        
            default:
                break;
        }
    }
    // update (dt) {},
});
