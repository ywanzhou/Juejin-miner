/*
 * @Descripttion: 
 * @version: 
 * @Author: xzk
 * @Date: 2020-06-05 16:29:14
 * @LastEditors: xzk
 * @LastEditTime: 2020-06-18 15:34:38
 */


let Canvas = cc.Node        //Canvas节点
let Loading = cc.Node       //Loading节点

let GameManager = null      //GameManager脚本
let TouchManager = null     //TouchManager脚本
let GoodsManager = null     //GoodsManager脚本
let Player = null           //Player脚本
let Editor = null           //Editor脚本
let LevelComplete = null    //关卡结束脚本

/*参数 */
let GameRunning = false     //运行flag
let Goods = []              //物品数组
let LevelScore = [[200]]    //关卡通关分数
let Level = [1, 1]          //关卡号
let Score = 0               //得分
let Editing = false         //正在编辑标识
let RevivalTimes = 1        //复活次数e
let LevelCountScore = 5000

/**
 * 关卡随机配置
 * 1    GoldMax
 * 2    GoldMid
 * 3    GoldMini
 * 4    StoneMax
 * 5    StoneMini
 * 6    Boom
 * 7    Box
 * 8    DiaMond
 * 9    Mouse
 * 10   Mouse&Diamond
 */
let LevelConfig = [ 
        {
            score:4000,
            custom:true,
            level:[
                [
                    [{"name":"GoldMax","x":6.956521739130437,"y":-255.65217391304344},{"name":"Diamond","x":-113.04347826086953,"y":-269.5652173913043},{"name":"Diamond","x":107.82608695652175,"y":-273.04347826086956},{"name":"Diamond","x":-3.47826086956519,"y":-173.91304347826082}],
                    [{"name":"GoldMax","x":19.130434782608745,"y":-296.52173913043475},{"name":"Diamond","x":118.26086956521743,"y":-306.95652173913044},{"name":"Diamond","x":-95.65217391304344,"y":-301.73913043478257}],
                    
                ],
                [
                    [{"name":"GoldMax","x":-300.8695652173913,"y":-25.217391304347757},{"name":"GoldMax","x":-189.56521739130434,"y":-73.91304347826087},{"name":"GoldMid","x":-208.69565217391303,"y":35.6521739130435},{"name":"Diamond","x":260.86956521739137,"y":77.39130434782612},{"name":"Diamond","x":262.608695652174,"y":-82.60869565217388},{"name":"Mouse&Diamond","x":181.54144927536433,"y":6.0869565217391255}],
                    [{"name":"GoldMax","x":219.13043478260875,"y":59.130434782608745},{"name":"GoldMid","x":269.5652173913044,"y":-38.26086956521738},{"name":"GoldMax","x":166.9565217391305,"y":-48.695652173913004},{"name":"Mouse&Diamond","x":-150.59387826086805,"y":69.56521739130437},{"name":"Diamond","x":-321.7391304347826,"y":-52.17391304347825},{"name":"Diamond","x":-191.30434782608694,"y":-57.39130434782601}]
                ],
                [   
                    [{"name":"GoldMid","x":-6.95652173913038,"y":206.9565217391305}],
                    [{"name":"GoldMax","x":3.478260869565247,"y":211.304347826087}]
                ]
            ]
        },
        {
            score:4000,
            custom:true,
            level:[
                [
                    [{"name":"GoldMax","x":-76.52173913043475,"y":-235.65217391304344},{"name":"StoneMini","x":17.39130434782612,"y":-225.2173913043478},{"name":"GoldMini","x":-123.47826086956519,"y":-167.8260869565217}],
                    [{"name":"GoldMax","x":210.43478260869574,"y":-279.1304347826087},{"name":"GoldMini","x":252.17391304347836,"y":-202.60869565217388},{"name":"GoldMid","x":106.08695652173918,"y":-206.08695652173907}]
                ],
                [
                    [{"name":"StoneMax","x":-274.7826086956522,"y":12.173913043478365},{"name":"GoldMax","x":-250.43478260869563,"y":-97.39130434782601},{"name":"GoldMid","x":-147.82608695652172,"y":-48.695652173913004},{"name":"StoneMax","x":288.6956521739131,"y":113.04347826086962},{"name":"StoneMax","x":149.56521739130437,"y":-5.217391304347757},{"name":"GoldMax","x":292.17391304347836,"y":-60.869565217391255}],
                    [{"name":"GoldMax","x":299.13043478260875,"y":-46.086956521739125},{"name":"StoneMax","x":-154.78260869565216,"y":-58.26086956521738},{"name":"GoldMax","x":-269.5652173913044,"y":-51.30434782608688},{"name":"GoldMid","x":187.82608695652175,"y":6.0869565217391255},{"name":"GoldMid","x":274.78260869565224,"y":63.47826086956525},{"name":"GoldMid","x":-252.17391304347825,"y":49.56521739130437}]
                ],
                [
                    [{"name":"GoldMid","x":-151.30434782608694,"y":209.56521739130437},{"name":"GoldMini","x":-200,"y":256.52173913043487},{"name":"GoldMid","x":220.86956521739137,"y":209.56521739130437},{"name":"GoldMid","x":271.304347826087,"y":287.82608695652186},{"name":"StoneMini","x":297.3913043478261,"y":207.82608695652175},{"name":"StoneMax","x":-271.30434782608694,"y":213.04347826086962}],
                    [{"name":"GoldMid","x":-267.82608695652175,"y":228.69565217391312},{"name":"GoldMid","x":203.47826086956525,"y":193.913043478261},{"name":"StoneMax","x":280,"y":275.6521739130435},{"name":"GoldMini","x":-264.3478260869565,"y":294.78260869565224},{"name":"StoneMini","x":-210.43478260869563,"y":180.0000000000001}]
                ]
            ]
        },
        {
            score:5000,
            custom:true,
            level:[
                [
                    [{"name":"GoldMid","x":-267.82608695652175,"y":-193.91304347826082},{"name":"StoneMax","x":-177.39130434782606,"y":-258.2608695652174},{"name":"StoneMini","x":-318.2608695652174,"y":-155.65217391304344},{"name":"StoneMax","x":280,"y":-162.60869565217388},{"name":"Box","x":196.52173913043487,"y":-233.91304347826082},{"name":"StoneMini","x":92.17391304347831,"y":-209.56521739130432}],
                    [{"name":"Box","x":-233.04347826086956,"y":-232.17391304347825},{"name":"StoneMax","x":-288.695652173913,"y":-146.95652173913038},{"name":"StoneMax","x":-109.56521739130432,"y":-242.60869565217388},{"name":"GoldMid","x":125.21739130434787,"y":-249.56521739130432},{"name":"GoldMid","x":248.69565217391312,"y":-185.2173913043478},{"name":"GoldMini","x":196.52173913043487,"y":-259.99999999999994}]
                    
                ],
                [
                    [{"name":"Mouse","x":-80.55809275362495,"y":135.6521739130435},{"name":"Mouse","x":200,"y":142.608695652174},{"name":"Mouse","x":100,"y":-8.695652173913004},{"name":"Diamond","x":246.9565217391305,"y":-29.56521739130426},{"name":"Diamond","x":-311.30434782608694,"y":-24.347826086956502},{"name":"Diamond","x":-24.347826086956502,"y":113.04347826086962}],
                    [{"name":"Mouse","x":0,"y":87.82608695652175},{"name":"Mouse","x":200,"y":18.26086956521749},{"name":"Diamond","x":140.86956521739137,"y":-117.39130434782601},{"name":"Diamond","x":20.86956521739131,"y":-115.65217391304338},{"name":"Diamond","x":-113.04347826086953,"y":-117.39130434782601}]
                ],
                [   
                    [{"name":"GoldMini","x":-191.30434782608694,"y":169.56521739130437},{"name":"GoldMini","x":-259.1304347826087,"y":268.6956521739131},{"name":"StoneMini","x":-252.17391304347825,"y":200.86956521739137},{"name":"GoldMini","x":227.82608695652175,"y":204.34782608695662},{"name":"StoneMini","x":246.9565217391305,"y":265.21739130434787},{"name":"StoneMini","x":173.91304347826087,"y":188.69565217391312}],
                    [{"name":"GoldMini","x":219.13043478260875,"y":193.913043478261},{"name":"GoldMini","x":267.82608695652175,"y":265.21739130434787},{"name":"GoldMini","x":278.2608695652175,"y":197.39130434782612},{"name":"StoneMini","x":-250.43478260869563,"y":164.34782608695662},{"name":"StoneMini","x":-304.3478260869565,"y":265.21739130434787},{"name":"GoldMini","x":-210.43478260869563,"y":223.47826086956525}]
                ]
            ]
        },
        {
            score:5000,
            custom:true,
            level:[
                [
                    [{"name":"Boom","x":19.130434782608745,"y":-263.4782608695652},{"name":"Diamond","x":113.04347826086962,"y":-265.2173913043478},{"name":"Diamond","x":-78.26086956521738,"y":-263.4782608695652}],
                    [{"name":"Boom","x":240,"y":-259.99999999999994},{"name":"Boom","x":-172.17391304347825,"y":-259.99999999999994},{"name":"Diamond","x":142.60869565217394,"y":-256.52173913043475},{"name":"Diamond","x":-78.26086956521738,"y":-253.04347826086956}]
                    
                ],
                [
                    [{"name":"Boom","x":-252.17391304347825,"y":-23.478260869565133},{"name":"Diamond","x":-259.1304347826087,"y":108.69565217391312},{"name":"Diamond","x":-156.52173913043475,"y":-16.521739130434753},{"name":"Boom","x":288.6956521739131,"y":-18.260869565217376},{"name":"Diamond","x":179.13043478260875,"y":-0.8695652173912549},{"name":"Diamond","x":276.52173913043487,"y":126.08695652173924},{"name":"GoldMid","x":13.913043478260875,"y":26.956521739130494}],
                    [{"name":"Boom","x":-191.30434782608694,"y":-14.78260869565213},{"name":"Diamond","x":12.173913043478308,"y":-11.304347826086882},{"name":"Boom","x":253.91304347826087,"y":-7.826086956521635},{"name":"Diamond","x":234.78260869565224,"y":124.34782608695662},{"name":"Diamond","x":-201.7391304347826,"y":126.08695652173924},{"name":"Mouse&Diamond","x":100,"y":145.21739130434787}]
                ],
                [   
                    [{"name":"GoldMid","x":-116.52173913043475,"y":235.6521739130435},{"name":"GoldMid","x":135.6521739130435,"y":240.86956521739137}],
                    [{"name":"GoldMid","x":12.173913043478308,"y":220.0000000000001}]
                ]
            ]
        },
        {
            score:5000,
            custom:true,
            level:[
                [
                    [{"name":"Boom","x":248.69565217391312,"y":50},{"name":"StoneMax","x":106.08695652173918,"y":60},{"name":"StoneMax","x":240,"y":280},{"name":"GoldMax","x":278.2608695652175,"y":-263.4782608695652},{"name":"Diamond","x":163.47826086956525,"y":-265.2173913043478},{"name":"Diamond","x":271.304347826087,"y":-183.4782608695652},{"name":"Box","x":-253.91304347826087,"y":44.347826086956616},{"name":"StoneMax","x":-111.30434782608694,"y":32.173913043478365},{"name":"GoldMid","x":-260.8695652173913,"y":152.17391304347836},{"name":"GoldMid","x":-248.69565217391303,"y":-206.08695652173907},{"name":"StoneMini","x":-166.9565217391304,"y":-225.2173913043478},{"name":"StoneMini","x":-271.30434782608694,"y":-148.695652173913}],
                    [{"name":"StoneMax","x":-240,"y":155.6521739130435},{"name":"GoldMid","x":-119.99999999999997,"y":11.304347826086996},{"name":"Boom","x":-236.52173913043475,"y":-13.043478260869506},{"name":"Box","x":-227.82608695652172,"y":-239.1304347826087},{"name":"Diamond","x":-314.7826086956522,"y":-207.8260869565217},{"name":"Diamond","x":-119.99999999999997,"y":-280.86956521739125},{"name":"StoneMax","x":-119.99999999999997,"y":-72.17391304347825},{"name":"GoldMax","x":273.0434782608696,"y":-9.565217391304259},{"name":"StoneMax","x":233.04347826086962,"y":110.43478260869574},{"name":"StoneMini","x":161.73913043478262,"y":-25.217391304347757},{"name":"GoldMid","x":259.13043478260875,"y":-233.91304347826082},{"name":"StoneMax","x":111.304347826087,"y":-166.08695652173907},{"name":"GoldMid","x":328.6956521739131,"y":56.52173913043487}],
                    [{"name":"Boom","x":-6.95652173913038,"y":-13.043478260869506},{"name":"StoneMax","x":74.78260869565219,"y":129.56521739130437},{"name":"StoneMax","x":-81.73913043478257,"y":120.86956521739137},{"name":"Box","x":-184.3478260869565,"y":-265.2173913043478},{"name":"GoldMax","x":160,"y":-303.4782608695652},{"name":"GoldMid","x":46.956521739130494,"y":-261.73913043478257},{"name":"GoldMini","x":206.9565217391305,"y":-199.1304347826087},{"name":"GoldMid","x":-201.7391304347826,"y":-153.91304347826082},{"name":"Diamond","x":125.21739130434787,"y":-219.99999999999994},{"name":"Diamond","x":-78.26086956521738,"y":-301.73913043478257},{"name":"GoldMid","x":-280,"y":-0.8695652173912549},{"name":"StoneMax","x":-172.17391304347825,"y":7.826086956521749},{"name":"StoneMini","x":-295.6521739130435,"y":91.304347826087},{"name":"GoldMax","x":285.21739130434787,"y":14.782608695652243},{"name":"StoneMini","x":196.52173913043487,"y":2.608695652173992},{"name":"StoneMax","x":266.0869565217391,"y":218.2608695652175}]
                    
                ],
                [
                    
                ],
                [   
                    
                ]
            ]
        }
        
    ]


module.exports = {
    /*开始游戏参数设置 */
    StartGame() {
        GameRunning = true
        Goods = []
        LevelScore = [[500,2000,5000,8000,12000,16000,20000,24000,28000,32000]]
        LevelCountScore = 32000
        Level = [1, 1]
        Score = 0
        Editing = false
        RevivalTimes = 1
    },
    /**
     * LevelCountScore 关卡目标分数
     */
    get_LevelCountScore(){
        return LevelCountScore
    },
    set_LevelCountScore(num){
        LevelCountScore = num 
    },
    add_LevelCountScore(score){
        LevelCountScore += score
    },
    /**
     * LevelConfig
     */
    get_LevelConfig(){
        return LevelConfig
    },
    /**
     * 复活次数
     */
    set_RivivalTimes(num){
        RevivalTimes = num
    },
    get_RivivalTimes(){
        return RevivalTimes
    },
    /**
     * 运行flag
     */
    set_GameRunning(flag) {
        GameRunning = flag
    },
    get_GameRunning() {
        return GameRunning
    },
    /**
     * 物品数组 
    */
    push_Goods(prefab) {
        Goods.push(prefab)
    },
    get_Goods() {
        return Goods
    },
    /**
     * 关卡号
     * 数据类型：数组，[章节号,关卡号] 
    */
    get_Level() {
        return Level
    },
    set_Level(arr) {
        Level = arr
    },
    /**
     * 分数 
    */
    add_Score(num) {
        Score += num
    },
    get_Score() {
        return Score
    },

    /**
     * 通关分数 
    */
    get_LevelScore() {
        return LevelScore[Level[0] - 1][Level[1] - 1]
    },

    /**
     * 编辑标识 
    */
    set_Editing(flag) {
        Editing = flag
    },

    get_Editing() {
        return Editing
    },

    /** 
     * Canvas节点
    */
    set_Canvas(node) {
        Canvas = node
    },
    get_Canvas() {
        return Canvas
    },
    /** 
     * Loading节点
    */
    set_Loading(node) {
        Loading = node
    },
    get_Loading() {
        return Loading
    },
    /**
     * GamManager
     */
    set_GameManager(script) {
        GameManager = script
    },
    get_GameManager() {
        return GameManager
    },
    /**
     * TouchManager
     */
    set_TouchManager(script) {
        TouchManager = script
    },
    get_TouchManager() {
        return TouchManager
    },
    /**
     * GoodsManager
     */
    set_GoodsManager(script) {
        GoodsManager = script
    },
    get_GoodsManager() {
        return GoodsManager
    },
    /**
     * Player
     */
    set_Player(script) {
        Player = script
    },
    get_Player() {
        return Player
    },
    /**
     * Editor
     */
    set_Editor(script) {
        Editor = script
    },
    get_Editor() {
        return Editor
    },
    /**
     * LevelComplete
     */
    set_LevelComplete(script){
        LevelComplete = script
    },
    get_LevelComplete(){
        return LevelComplete
    },

    /**
     * 工具 |   获取节点世界坐标
     */
    getWorldPos(sb) {
        return sb.convertToWorldSpaceAR(cc.Vec2.ZERO);
    },
    /**
     * 工具 |   生成随机整数
     * @param {*} minNum 
     * @param {*} maxNum 
     */
    randomNum(minNum,maxNum){ 
        switch(arguments.length){ 
            case 1: 
                return parseInt(Math.random()*minNum+1,10); 
            break; 
            case 2: 
                return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
            break; 
                default: 
                    return 0; 
                break; 
        } 
    } 
}