/*
 * @Descripttion: 
 * @version: 
 * @Author: xzk
 * @Date: 2020-06-06 14:22:46
 * @LastEditors: xzk
 * @LastEditTime: 2020-06-17 15:09:38
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
        Recover : require('Recover'),
        ChoicesContent : cc.Node,
        GoodsChoicesPrefab: cc.Prefab,
        EditorGoods:cc.Node,
        EditUp:cc.Node,
        EditMid:cc.Node,
        EditDown:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        GameData.set_Editor(this)               
        GameData.get_Goods().forEach(element => {       //遍历Goods数组，生成编辑界面的按钮
            let GoodsChoices = cc.instantiate(this.GoodsChoicesPrefab)
            GoodsChoices.parent = this.ChoicesContent
            GoodsChoices.getComponent('GoodsChoices').GoodsPerfeb = element
            GoodsChoices.getComponent('GoodsChoices').img.spriteFrame = element.data.getComponent(cc.Sprite).spriteFrame
            GoodsChoices.getComponent('GoodsChoices').img.node.scale = element.data.scale
        });
    },

    start () {
        this.HideEditeAll()
    },
    ShowEditeUp(){
        this.EditUp.active = true
        this.EditMid.active = false
        this.EditDown.active = false
    },
    ShowEditeMid(){
        this.EditUp.active = false
        this.EditMid.active = true
        this.EditDown.active = false
    },
    ShowEditeDown(){
        this.EditUp.active = false
        this.EditMid.active = false
        this.EditDown.active = true
    },
    HideEditeAll(){
        this.EditUp.active = false
        this.EditMid.active = false
        this.EditDown.active = false
    },
    Clear(){
        this.EditorGoods.children.forEach(element => {      //销毁编辑的节点
            element.destroy()
        });
    },
    confirm(){  //确定按钮
        this.HideEditeAll()
        let Save = []   //保存数组
        this.node.getChildByName('EditorGoods').children.forEach(element => {   //保存节点下Node信息到数组
            let data = {
                name : element.name,
                x:element.x,
                y:element.y
            }
            Save.push(data)
        });
        this.saveForBrowser(JSON.stringify(Save),'config')  //保存到JSON文件
        this.EditorGoods.children.forEach(element => {      //销毁编辑的节点
            element.destroy()
        });
        this.node.active = false    //关闭编辑场景
        GameData.set_Editing(false) 
        GameData.set_GameRunning(true)  //继续进行游戏
    },
    saveForBrowser(textToWrite, fileNameToSaveAs) { //下载JSON文件
        if (cc.sys.isBrowser) {
            let textFileAsBlob = new Blob([textToWrite], { type: 'application/json' });
            let downloadLink = document.createElement("a");
            downloadLink.download = fileNameToSaveAs;
            downloadLink.innerHTML = "Download File";
            if (window.webkitURL != null) {
                // Chrome allows the link to be clicked
                // without actually adding it to the DOM.
                downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
                } else {
                // Firefox requires the link to be added to the DOM
                // before it can be clicked.
                downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                downloadLink.onclick = destroyClickedElement;
                downloadLink.style.display = "none";
                document.body.appendChild(downloadLink);
            }
            downloadLink.click();
        }
    }
    // update (dt) {},
});
