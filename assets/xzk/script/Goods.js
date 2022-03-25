/*
 * @Descripttion: 
 * @version: 
 * @Author: xzk
 * @Date: 2020-06-06 09:46:48
 * @LastEditors: xzk
 * @LastEditTime: 2020-06-16 14:25:55
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
        score:0,
        TimesSpeed:1,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        
        this.MoveStartLocation = cc.v2()        //编辑关卡时开始移动的位置
        this.MoveFlag = false                   //移动标识
        this.CollisionSwitch = true             //碰撞检测标识
    },
    onEnable(){
        this.Catched = false                    //被抓住标识
        if(GameData.get_Editing()){
            this.node.on(cc.Node.EventType.TOUCH_START,this.TOUCH_START,this)
            this.node.on(cc.Node.EventType.TOUCH_MOVE,this.TOUCH_MOVE,this)
            this.node.on(cc.Node.EventType.TOUCH_END,this.TOUCH_END,this)
        }
    },
    get_Catched(){
        return this.Catched
    },
    set_Catched(flag){
        this.Catched = flag
    },
    onDisable(){
        this.node.off(cc.Node.EventType.TOUCH_START,this.TOUCH_START,this)
        this.node.off(cc.Node.EventType.TOUCH_MOVE,this.TOUCH_MOVE,this)
        this.node.off(cc.Node.EventType.TOUCH_END,this.TOUCH_END,this)
    },
    
    
    TOUCH_START(event){
        // console.log(GameData.get_Editor().Recover.node)
        GameData.get_Editor().Recover.node.opacity = 150
        GameData.get_Editor().Recover.set_RecoverSwitch(false)
        this.MoveStartLocation = cc.v2(this.node.x,this.node.y)
        this.MoveFlag = true
        this.CollisionSwitch = false
    },
    TOUCH_MOVE(event){
        this.node.x = event.getLocation().x - GameData.get_Canvas().width/2
        this.node.y = event.getLocation().y - GameData.get_Canvas().height/2
    },
    TOUCH_END(){
        GameData.get_Editor().Recover.node.opacity = 0
        GameData.get_Editor().Recover.set_RecoverSwitch(true)
        this.CollisionSwitch = true
        setTimeout(() => {
            this.MoveFlag = false
        }, 100);
    },
    onDestroy(){
        // console.log('emmmm')
    },
    onCollisionEnter(other,self){
        if(!this.Catched){
            switch (other.node.name) {
                case 'Claw':
                    if(GameData.get_Player().get_extending()){
                        console.log('Catched')
                        
                        GameData.get_Player().set_ClawGoods(this.node)
                        GameData.get_Player().set_extending(false)
                        this.Catched = true
                        let lv = other.node.getComponent(cc.RigidBody).linearVelocity
                        lv.x = -lv.x * this.TimesSpeed
                        lv.y = -lv.y * this.TimesSpeed
                        other.node.getComponent(cc.RigidBody).linearVelocity = lv
                    }
                    break;
                default:
                    break;
            }
        }
    },
    onCollisionStay(other,self){    //编辑重叠检测，重叠会弹会原来地方
        if(GameData.get_Editing()){
            if(this.CollisionSwitch){
                if(this.MoveFlag){
                    this.node.x = this.MoveStartLocation.x
                    this.node.y = this.MoveStartLocation.y
                    this.MoveFlag = false
                }
            }
        }
    }
    // update (dt) {},
    
});
