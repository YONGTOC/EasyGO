let fun = {
    fun: function () { },
    mStackUp: true,
}
var SceneGUI;

function InitGUI() {
    if (SceneGUI) {
        SceneGUI.destroy();
    }

    SceneGUI = new dat.GUI();
    if (GLOBAL.pCurBuilding) {
        var fallBack = SceneGUI.add(fun, "fun").name("返回外景");
        fallBack.onFinishChange(function (value) {
            GLOBAL.Do.SwitchScene();
        });
        //#region 楼层选择
        //var layerFloder = SceneGUI.addFolder("楼层选择");
        let layers = new Array();
        for (let j = 0; j < GLOBAL.pCurBuilding.layerList.length; j++) {
            layers.push(SceneGUI.add(fun, "fun").name(GLOBAL.pCurBuilding.layerList[j].floor_name));
        }
        for (let j = 0; j < layers.length; j++) {
            layers[j].onFinishChange(function (value) {
                //console.log("点击楼层：" + j + GLOBAL.pCurBuilding.layerList[j].floor_name + " -- " + value);
                GLOBAL.Do.SwitchLayer(GLOBAL.pCurBuilding.layerList[j].floor_name);
            });
        }
        //#endregion
    }
    else {
        var fallBack = SceneGUI.add(fun, "fun").name("进入体育场内景");
        fallBack.onFinishChange(function (value) {
            GLOBAL.Do.SwitchScene("体育场");
        });
    }
    

    //#region 楼层叠加
    var mStackUp = SceneGUI.add(fun, "mStackUp").name("叠加楼层：");
    mStackUp.onFinishChange(function (value) {
        GLOBAL.Do.StackUp(value);
    });
    //#endregion

    
}