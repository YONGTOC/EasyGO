
//#region GLOBAL.Action 响应事件

/**
 * 总加载进度数量
 * @param {any} bShow 表示是否正在加载
 * @param {any} nRate 0 -> 1
 */
GLOBAL.Action.pMajorProgress = function MajorProgress(bShow, nRate) {
    //console.log("主进度更新：" + bShow + " --- " + nRate);
    if (!bShow) {
        GLOBAL.Do.SwitchScene();
    }
    
}
/**
 * 副进度条更新,用于控制加载进度
 * @param {any} bShow
 * @param {any} nRate
 */
GLOBAL.Action.pMinorProgress = function MinorProgress(bShow, nRate) {
    //console.log("副进度更新：" +bShow + " --- " + nRate);
}

/**每帧更新调用函数 */
GLOBAL.Action.pUpdate = function Update() {
    
}

/**
 *  绘制POI，非EAM场景使用
 * @param {any} pCavans
 * @param {any} pSite
 */
GLOBAL.Action.pDrawPOI = function DrawPOI(pCavans, pSite) {
    if (pSite.Type < 0)
        return;
    pCavans.fillStyle = "#606060";
    pCavans.font = "bold 14px Microsoft YaHei";
    pCavans.strokeStyle = "white";
    pCavans.lineWidth = 2;
    pCavans.strokeText(pSite.Name, pSite.Position.x + 10, pSite.Position.y);
    pCavans.fillText(pSite.Name, pSite.Position.x + 10, pSite.Position.y);
    if (!Img.load)
        return;
    switch (pSite.Type) {
        case 0:
            pCavans.drawImage(Img.tyc.image, pSite.Position.x - 28, pSite.Position.y - 20, 32, 32);

            if (CheckClick(GLOBAL.pClick, pSite.Position)) {
                GLOBAL.pClick = null;
                SwitchScene("体育场");
            }
            break;
        case 1:
            pCavans.drawImage(Img.qsg.image, pSite.Position.x - 28, pSite.Position.y - 20, 32, 32);         
            if (CheckClick(GLOBAL.pClick, pSite.Position)) {
                GLOBAL.pClick = null;
                alert("点击了：" + pSite.Name);

            }
            break;
        case 3:
            pCavans.drawImage(Img.zxc.image, pSite.Position.x - 28, pSite.Position.y - 20, 32, 32);
            if (CheckClick(GLOBAL.pClick, pSite.Position)) {
                GLOBAL.pClick = null;
                alert("点击了：" + pSite.Name);
            }
            break;
        case 7:
            pCavans.drawImage(Img.yyg.image, pSite.Position.x - 28, pSite.Position.y - 20, 32, 32);
            if (CheckClick(GLOBAL.pClick, pSite.Position)) {
                GLOBAL.pClick = null;
                alert("点击了：" + pSite.Name);
            }
            break;
        default:
            break;            
    }
    
}
/**
 * 判断是否点击命中浮标。
 * @param {any} pClick
 * @param {any} mPosition
 */
function CheckClick(pClick, mPosition) {
    if (pClick) {
        let nDistance = Vector3.Distance(mPosition, pClick);
        if (50 > nDistance) {
            return true;
        }
    }
    return false;
}

/**
 * 楼层列表刷新
 * @param {any} nLayerCount
 * @param {any} nWorkIndex
 */
GLOBAL.Action.pLayerListFlush = function LayerListFlush(nLayerCount, nWorkIndex) {
    console.log("楼层列表刷新：" + nLayerCount + " --- " + nWorkIndex);
    InitGUI();
}

/**
 * 室内外场景切换响应函数
 * @param {any} bOut
 */
GLOBAL.Action.pOutsideSwich = function OutsideSwich(bOut) {
     console.log("室内外场景切换响应函数：" + bOut);
}

/**
 * 2D/3D切换响应函数
 * @param {any} nView 当前视角 2/3
 */
GLOBAL.Action.pViewSwich = function ViewSwich(nView) {
     console.log(" 2D/3D切换响应函数：" + nView);
}

/**
 * 指南针旋转更新
 * @param {any} nDeg
 */
GLOBAL.Action.pCompassUpdate = function CompassUpdate(nDeg) {
  //  console.log(" 指南针旋转更新：" + nDeg);
}

/**
 * 楼层激活响应
 * @param {any} nIndex
 */
GLOBAL.Action.pLayerActive = function LayerActive(nIndex) {
    console.log(" 楼层激活响应：" + nIndex);

}

/**
 * 楼层显示响应
 * @param {any} pBackData
 */
GLOBAL.Action.pLayerShow = function LayerShow(pBackData) {
    console.log(" 楼层显示响应：" + pBackData);
    //DebugObjValue(pBackData);
    GLOBAL.Do.StackUp(fun.mStackUp);
}

/**
 * 光标位置信息反馈
 * @param {any} pID
 * @param {any} pName
 * @param {any} mPos
 * @param {any} pEvent
 */
GLOBAL.Action.pCursorInfo = function CursorInfo(pID, pName, mPos, pEvent) {
    console.log(" 光标位置信息反馈：" + pID + " --- " + pName + " --- " + mPos + " --- " + pEvent);
    Webgl.showEnd(pID,pName);
}

/**
 * 导航路径信息反馈
 * @param {any} aPoint
 */
GLOBAL.Action.pPathDataFeedback = function PathDataFeedback(aPoint) {
    console.log(" 导航路径信息反馈：" + aPoint);
}

/**
 * 导航提示信息反馈
 * @param {any} pID
 * @param {any} pName
 * @param {any} mPos
 * @param {any} pEvent
 */
GLOBAL.Action.pHintFeedback = function HintFeedback(pID, pName, mPos, pEvent) {
    console.log("导航提示信息反馈：" + pID + " --- " + pName + " --- " + mPos + " --- " + pEvent);
}

/**
 * 鼠标单击画布反馈
 * @param {any} pPoint { x: x, y: y, z: 1 }
 */
GLOBAL.Action.pOnClick = function OnClick(pPoint) {
    console.log("鼠标单击画布反馈：" + pPoint.x + " --- " + pPoint.y + " --- " + pPoint.z);
    GLOBAL.pClick = pPoint;
}
//#endregion
