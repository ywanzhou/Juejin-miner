/*
 * @Descripttion: 
 * @version: 
 * @Author: xzk
 * @Date: 2020-06-13 10:52:11
 * @LastEditors: xzk
 * @LastEditTime: 2020-06-18 10:28:32
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
        this.Booming = this.node.getChildByName('Booming').getComponent(cc.Animation)
    },
    onCollisionEnter(other,self){
        if(other.node.name == 'Claw'){
            console.log('!!!!!!!boom')
            GameData.get_GameManager().AudioManager('Boom')
            this.Booming.play()
            GameData.get_Player().set_ClawGoods(null)
            let length = GameData.get_GoodsManager().node.children.length
            
            this.scheduleOnce(()=>{
                // this.Booming.active = false
                // GameData.get_GoodsManager().RemoveGoods(this.node)
                for (let index = 0; index < length; index++) {
                    let node = GameData.get_GoodsManager().node.children[length-index-1]
                    let dx = node.x - this.node.x
                    let dy = node.y - this.node.y
                    if(Math.sqrt(dx*dx+dy*dy)<=200){
                        GameData.get_GoodsManager().RemoveGoods(node)
                    }
                }
            },1)
            
        }
        
    },
    // update (dt) {},
});
