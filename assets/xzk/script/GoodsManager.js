/*
 * @Descripttion: 
 * @version: 
 * @Author: xzk
 * @Date: 2020-06-06 09:46:36
 * @LastEditors: xzk
 * @LastEditTime: 2020-06-18 10:31:35
 */ 
// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
let GameData = require('GameData');
const { randomNum } = require('./GameData');
cc.Class({
    extends: cc.Component,

    properties: {

        GoodsPrefab:{
            type:cc.Prefab,
            default:[]
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        GameData.set_GoodsManager(this)
        this.GoodsPrefab.forEach(element => {
            GameData.push_Goods(element)
        });

        let initCount = 5;
        this.GoldMaxPool = new cc.NodePool();
        for (let i = 0; i < initCount; ++i) {
            let Goods = cc.instantiate(this.GoodsPrefab[0]); // 创建节点
            this.GoldMaxPool.put(Goods); // 通过 put 接口放入对象池
        }
        this.GoldMidPool = new cc.NodePool();
        for (let i = 0; i < initCount; ++i) {
            let Goods = cc.instantiate(this.GoodsPrefab[1]); // 创建节点
            this.GoldMidPool.put(Goods); // 通过 put 接口放入对象池
        }
        this.GoldMiniPool = new cc.NodePool();
        for (let i = 0; i < initCount; ++i) {
            let Goods = cc.instantiate(this.GoodsPrefab[2]); // 创建节点
            this.GoldMiniPool.put(Goods); // 通过 put 接口放入对象池
        }
        this.StoneMaxPool = new cc.NodePool();
        for (let i = 0; i < initCount; ++i) {
            let Goods = cc.instantiate(this.GoodsPrefab[3]); // 创建节点
            this.StoneMaxPool.put(Goods); // 通过 put 接口放入对象池
        }
        this.StoneMiniPool = new cc.NodePool();
        for (let i = 0; i < initCount; ++i) {
            let Goods = cc.instantiate(this.GoodsPrefab[4]); // 创建节点
            this.StoneMiniPool.put(Goods); // 通过 put 接口放入对象池
        }
        this.BoomPool = new cc.NodePool();
        for (let i = 0; i < initCount; ++i) {
            let Goods = cc.instantiate(this.GoodsPrefab[5]); // 创建节点
            this.BoomPool.put(Goods); // 通过 put 接口放入对象池
        }
        this.BoxPool = new cc.NodePool();
        for (let i = 0; i < initCount; ++i) {
            let Goods = cc.instantiate(this.GoodsPrefab[6]); // 创建节点
            this.BoxPool.put(Goods); // 通过 put 接口放入对象池
        }
        this.DiamondPool = new cc.NodePool();
        for (let i = 0; i < initCount; ++i) {
            let Goods = cc.instantiate(this.GoodsPrefab[7]); // 创建节点
            this.DiamondPool.put(Goods); // 通过 put 接口放入对象池
        }
        this.MousePool = new cc.NodePool();
        for (let i = 0; i < initCount; ++i) {
            let Goods = cc.instantiate(this.GoodsPrefab[8]); // 创建节点
            this.MousePool.put(Goods); // 通过 put 接口放入对象池
        }
        this.MouseDiamondPool = new cc.NodePool();
        for (let i = 0; i < initCount; ++i) {
            let Goods = cc.instantiate(this.GoodsPrefab[9]); // 创建节点
            this.MouseDiamondPool.put(Goods); // 通过 put 接口放入对象池
        }
    },
    start () {
        this.LevelConfig
    },
    /**
     * 通过关卡编号读取关卡json文件。
     * 如：当前关卡1.1关，则读取LevelConfig/Level_1_1.json
     */
    LoadGoods(){    
        GameData.get_Loading().active = true
        let Level = GameData.get_Level()
        
        cc.loader.loadRes('LevelConfig/Level_'+Level[0]+'_'+Level[1]+'.json',(err, jsonAsset)=> {
            if(err != null){
                console.log(err)
                GameData.get_Loading().active = false
                return
            }else{
                this.LevelConfig = jsonAsset.json
                this.LevelConfig.forEach(element => {
                    this.CreateGoods(element.name,element.x,element.y)
                });
                GameData.get_Loading().active = false
            }
        })
        

    },
    /**
     * 随机拜访物品
     * index: 0~length-1,
     */
    RangeGoods(index){
        if(index >= GameData.get_LevelConfig().length){
            console.log('NUM ERROR')
            return
        }
        this.LevelConfig = GameData.get_LevelConfig()[index]
        GameData.add_LevelCountScore(this.LevelConfig.score)
        if(this.LevelConfig.custom){
            for (let i = 0; i < 3; i++) {
                if(this.LevelConfig.level[i].length>0){
                    let random = GameData.randomNum(0,this.LevelConfig.level[i].length-1)
                    console.log(random,this.LevelConfig.level[i][random])
                    this.LevelConfig.level[i][random].forEach(element => {
                        this.CreateGoods(element.name,element.x,element.y)
                    });
                }
                
            }
        }else{
            let yindex = 300
            for (let i = 0; i < 3; i++) {
                let Width = 0
                this.LevelConfig.level[i].forEach(element => {
                    Width += this.GoodsPrefab[element-1].data.width
                });
                let xindex = -360
                this.LevelConfig.level[i].forEach(element => {
                    let RandomDX = this.GoodsPrefab[element-1].data.width/Width*720 - this.GoodsPrefab[element-1].data.width
                    let RandomDY =( i < 2? 200:300 ) - this.GoodsPrefab[element-1].data.height
                    let Goods = this.CreateGoods(this.GoodsPrefab[element-1].data.name , GameData.randomNum(xindex+this.GoodsPrefab[element-1].data.width/2,xindex+RandomDX) , GameData.randomNum(yindex-this.GoodsPrefab[element-1].data.height/2,yindex-RandomDY))
                    xindex += RandomDX + this.GoodsPrefab[element-1].data.width
                });
                yindex -= 200
            }
        }


        
    },
    /**
     * 生成物品
     * 
     * @param {String} GoodsName    物品名称
     * @param {number} x            物品位置x
     * @param {number} y            物品位置y
     */
    CreateGoods: function (GoodsName, x = 0, y = 0) {
        
        let Goods = null;
        switch (GoodsName) {
            case 'GoldMax':
                if(this.GoldMaxPool.size() > 0){
                    Goods = this.GoldMaxPool.get();
                }else{
                    Goods = cc.instantiate(this.GoodsPrefab[0])
                }
                break;
            case 'GoldMid':
                if(this.GoldMidPool.size() > 0){
                    Goods = this.GoldMidPool.get();
                }else{
                    Goods = cc.instantiate(this.GoodsPrefab[1])
                }
                break;
            case 'GoldMini':
                if(this.GoldMiniPool.size() > 0){
                    Goods = this.GoldMiniPool.get();
                }else{
                    Goods = cc.instantiate(this.GoodsPrefab[2])
                }
                break;
            case 'StoneMax':
                if(this.StoneMaxPool.size() > 0){
                    Goods = this.StoneMaxPool.get();
                }else{
                    Goods = cc.instantiate(this.GoodsPrefab[3])
                }
                break;
            case 'StoneMini':
                if(this.StoneMiniPool.size() > 0){
                    Goods = this.StoneMiniPool.get();
                }else{
                    Goods = cc.instantiate(this.GoodsPrefab[4])
                }
                break;
            case 'Boom':
                if(this.BoomPool.size() > 0){
                    Goods = this.BoomPool.get();
                }else{
                    Goods = cc.instantiate(this.GoodsPrefab[5])
                }
                break;
            case 'Box':
                if(this.BoxPool.size() > 0){
                    Goods = this.BoxPool.get();
                }else{
                    Goods = cc.instantiate(this.GoodsPrefab[6])
                }
                break;
            case 'Diamond':
                if(this.DiamondPool.size() > 0){
                    Goods = this.DiamondPool.get();
                }else{
                    Goods = cc.instantiate(this.GoodsPrefab[7])
                }
                break;
            case 'Mouse':
                if(this.MousePool.size() > 0){
                    Goods = this.MousePool.get();
                }else{
                    Goods = cc.instantiate(this.GoodsPrefab[8])
                }
                break;
            case 'Mouse&Diamond':
                if(this.MouseDiamondPool.size() > 0){
                    Goods = this.MouseDiamondPool.get();
                }else{
                    Goods = cc.instantiate(this.GoodsPrefab[9])
                }
                break;
            default:
                break;
        }
        Goods.parent = this.node
        Goods.x = x
        Goods.y = y
        Goods.opacity = 255
        return Goods
    },
    /**
     * 移除物品
     * @param {Node} Node 
     */
    RemoveGoods(Node){

        switch (Node.name) {
            case 'GoldMax':
                this.GoldMaxPool.put(Node);
                break;
            case 'GoldMid':
                this.GoldMidPool.put(Node);
                break;
            case 'GoldMini':
                this.GoldMiniPool.put(Node);
                break;
            case 'StoneMax':
                this.StoneMaxPool.put(Node);
                break;
            case 'StoneMini':
                this.StoneMiniPool.put(Node);
                break;
            case 'Boom':
                this.BoomPool.put(Node);
                break;
            case 'Box':
                this.BoxPool.put(Node);
                break;
            case 'Diamond':
                this.DiamondPool.put(Node);
                break;
            case 'Mouse':
                this.MousePool.put(Node);
                break;
            case 'Mouse&Diamond':
                this.MouseDiamondPool.put(Node);
                break;
            default:
                break;
        }

    },
    /**
     *  
     * */ 
    RemoveAll(){
        let length = this.node.children.length
        for (let index = 0; index < length; index++) {
            this.RemoveGoods(this.node.children[length-index-1])
        }
        
    }
    // update (dt) {

    // },
});
