/*
 * @Descripttion: 
 * @version: 
 * @Author: xzk
 * @Date: 2020-06-05 17:47:03
 * @LastEditors: xzk
 * @LastEditTime: 2020-06-17 11:47:13
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
        GraspClosedSprite:cc.SpriteFrame,
        GraspNormalSprite:cc.SpriteFrame,
        SingleClaw:cc.Node,
        ScoreAdd:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        GameData.set_Player(this)
        this.Rope = this.node.getChildByName('Rope')
        this.Axle = this.node.getChildByName('Axle')
        this.Claw = this.node.getChildByName('Claw')
    },

    start () {
        this.updateTimer = 0                    //updata计数器
        this.RoLeft = true                      //旋转方向开关 
        this.RoAngle = 2                        //旋转角速度
        this.ClawSpeed = 200                    //爪子速度
        this.RoSwitch = true                    //旋转开关
        this.ClawOriginalLocation = cc.v2()     //爪子伸出之前初始位置
        this.ClawGoods = null                   //爪子上的物品
        this.extending = false                  //正在伸长状态
        this.GraspAnimation = this.node.getChildByName('Body').getComponent(cc.Animation)
    },

    /**
     * 正在伸长状态
     */

    get_extending(){
        return this.extending
    },
    set_extending(flag){
        this.extending = flag
    },
    /**
     * 爪子上的物品
     */
    get_ClawGoods(){        
        return this.ClawGoods
    },
    set_ClawGoods(node){
        this.ClawGoods = node
    },
    /**
     * 爪子速度
     */
    get_ClawSpeed(){        
        return this.ClawSpeed
    },
    set_ClawSpeed(num){     
        this.ClawSpeed = num
    },
    
    /**
     * 抓取操作
     */
    Grasp(){

        if(this.RoSwitch){
            GameData.get_GameManager().AudioManager('StartRope')

            this.GraspAnimation.play()
            this.RoSwitch = false
            this.ClawOriginalLocation = cc.v2(this.Claw.x,this.Claw.y)      
            let lv = this.Claw.getComponent(cc.RigidBody).linearVelocity
            lv.y = -Math.cos(this.Claw.angle*Math.PI/180)*this.ClawSpeed
            lv.x = Math.sin(this.Claw.angle*Math.PI/180)*this.ClawSpeed
            this.Claw.getComponent(cc.RigidBody).linearVelocity = lv
            this.set_extending(true)
            // this.Rope.height = 1500
        }else{
            console.log('爪子正在出钩状态')
        }
        
    },
    /**
     *  夹空
     */
    GraspNull(){
        this.node.getChildByName('Claw').getComponent(cc.Sprite).spriteFrame = this.GraspClosedSprite
    },
    /**
     * 暂停爪子
     */

    PauseClaw(){
        GameData.get_GameManager().AudioManager('StopRope')
        let lv = this.Claw.getComponent(cc.RigidBody).linearVelocity
        lv.y = 0
        lv.x = 0
        this.Claw.getComponent(cc.RigidBody).linearVelocity = lv
        this.GraspAnimation.stop()
    },
    /**
     * 重置爪子
     */
    ResetClaw(){
        this.Claw.x = this.ClawOriginalLocation.x
        this.Claw.y = this.ClawOriginalLocation.y
        GameData.get_GameManager().AudioManager('ResetClaw')
        GameData.get_GameManager().AudioManager('StopRope')
        let lv = this.Claw.getComponent(cc.RigidBody).linearVelocity
        lv.y = 0
        lv.x = 0
        this.Claw.getComponent(cc.RigidBody).linearVelocity = lv

        this.GraspAnimation.stop()
        this.RoSwitch = true
        let dx = this.Rope.x-this.Claw.x                            //绳子跟爪子位置做适配
        let dy = this.Rope.y-this.Claw.y
        this.Rope.height = Math.sqrt(dx*dx+dy*dy)+48
        this.SingleClaw.active = false
        this.node.getChildByName('Claw').getComponent(cc.Sprite).spriteFrame = this.GraspNormalSprite
    },

    update (dt) {
        // this.updateTimer += dt
        // while(this.updateTimer >= 0.02){        
        //     this.updateTimer -= 0.02
            // console.log(GameData.get_GameRunning(),this.RoSwitch)
            if(GameData.get_GameRunning()){

                if(this.RoSwitch){                  //爪子旋转
                    if(this.RoLeft){
                        this.Rope.angle -= this.RoAngle
                        this.Claw.angle -= this.RoAngle
                    }else{
                        this.Rope.angle += this.RoAngle
                        this.Claw.angle += this.RoAngle
                    }
                    if(this.Rope.angle <= -60){
                        this.RoLeft = false
                    }
                    if(this.Rope.angle >= 60){
                        this.RoLeft = true
                    }
                }else{                              //爪子伸出状态
                    if (this.Claw.y>this.ClawOriginalLocation.y) {              //爪子回到地面判断
                        this.Claw.x = this.ClawOriginalLocation.x
                        this.Claw.y = this.ClawOriginalLocation.y
                        this.SingleClaw.active = false
                        this.node.getChildByName('Claw').getComponent(cc.Sprite).spriteFrame = this.GraspNormalSprite
                        this.GraspAnimation.stop()
                        // GameData.get_GameManager().AudioManager('StopRope')
                        let lv = this.Claw.getComponent(cc.RigidBody).linearVelocity
                        lv.y = 0
                        lv.x = 0
                        this.Claw.getComponent(cc.RigidBody).linearVelocity = lv

                        if(this.ClawGoods != null){
                            GameData.add_Score(this.ClawGoods.getComponent('Goods').score)
                            this.ScoreAdd.getComponent(cc.Label).string = '+'+this.ClawGoods.getComponent('Goods').score
                            let MoveAction = this.ClawGoods.runAction(cc.spawn(
                                cc.moveTo(0.5,cc.v2(250,480)),
                                cc.fadeOut(0.5)
                            )
                            )
                            let RemoveGoods = this.ClawGoods
                            this.ScoreAdd.getComponent(cc.Animation).play()
                            
                            this.ClawGoods = null
                            GameData.get_GameManager().AudioManager('Catched')
                            // GameData.get_GameManager().FreshScore()
                            this.scheduleOnce(()=>{
                                RemoveGoods.stopAction(MoveAction)
                                GameData.get_GoodsManager().RemoveGoods(RemoveGoods)

                                GameData.get_GameManager().AudioManager('ResetClaw')
                                this.RoSwitch = true
                                GameData.get_GameManager().FreshScore()
                            },0.5)
                        }else{
                            GameData.get_GameManager().AudioManager('ResetClaw')
                            this.RoSwitch = true
                        }

                    }
                    let dx = this.Rope.x-this.Claw.x                            //绳子跟爪子位置做适配
                    let dy = this.Rope.y-this.Claw.y
                    this.Rope.height = Math.sqrt(dx*dx+dy*dy)+48
                    if(this.ClawGoods != null){                                 //如果爪子抓住了物品
                        this.ClawGoods.x =  GameData.getWorldPos(this.Claw.getChildByName('ClawCenter')).x - GameData.get_Canvas().width/2
                        this.ClawGoods.y =  GameData.getWorldPos(this.Claw.getChildByName('ClawCenter')).y - GameData.get_Canvas().height/2

                        this.SingleClaw.active = true
                        this.SingleClaw.angle =  this.Claw.angle
                        this.SingleClaw.x =  GameData.getWorldPos(this.Claw.getChildByName('ClawCenter')).x - GameData.get_Canvas().width/2 
                        this.SingleClaw.y =  GameData.getWorldPos(this.Claw.getChildByName('ClawCenter')).y - GameData.get_Canvas().height/2 - 2
                    }
                }
                

            }

            
        // }
    },
});
