/// 全局变量与配置项
let GLOBAL = {
    pConfig: null,
    pEngine: null,

    pWorkList: [],
    pLayerList: [],
    pRoomList: [],

    // 当前所处楼宇，处于外景时该值为空
    pCurBuilding: null,
    // 当前所处楼宇，处于外景时该值为空
    pCurLayer: null,
    // 图标点击事件
    pClick: null,
    // 笛卡尔坐标系转GIS经纬度
    pCartesianToGis: null,
    // GIS经纬度转笛卡尔坐标系
    pGisToCartesian: null,

    // SDK开放接口
    Do: {
        // SDK初始化
        Init: Init,
        // SDK启动运行
        Start: Start,
        // SDK暂停运行
        Stop: Stop,
        // 重设画布大小
        Resize: Resize,
        // 切换视图模式，2表示2D模式、3表示3D模式
        SwitchView: SwitchView,
        // 设置摄像机视角。参数分布为观察目标坐标，仰角，偏航角，3D距离观察点距离/2D观察范围大小
        SetCamera: SetCamera,
        // 切换室内外场景
        SwitchScene: SwitchScene,
        // 切换楼层
        SwitchLayer: SwitchLayer,
        // 设置叠加楼层
        StackUp: StackUp,
        // 基于距离和类型过滤POI列表
        FilterPOI: FilterPOI,
        /// 搜索路径：参数分别为起点ID、终点ID、优先楼层通道类型（0：最近、1楼梯、2电梯、3扶梯）
        Navigate: Navigate,
        /// 是否将视角锁定在摄像机上，还是可以自由浏览地图
        LockCameraToPath: LockCameraToPath,
        /// 三维坐标转屏幕坐标
        WorldToScreen: WorldToScreen,
        /// 屏幕坐标转三维坐标
        ScreenToWorld: ScreenToWorld
    },

    // SDK用户根据需要自定义实现以下响应函数
    Action: {
        // 主进度条更新
        pMajorProgress: function (bShow, nRate) { },
        // 副进度条更新
        pMinorProgress: function (bShow, nRate) { },
        // 帧更新函数
        pUpdate: function () { },
        // 帧POI绘制函数
        pDrawPOI: function (pCavans, pSite) { },
        // POI绘制函数，EAM项目定制
        pDrawPOIAtEAM: function (pCavans, pSite, bVisible) { },
        // 楼层列表刷新
        pLayerListFlush: function (nLayerCount, nWorkIndex) { },
        // 室内外切换响应
        pOutsideSwich: function (bOut) { },
        // 2D/3D切换响应
        pViewSwich: function (nView) { },
        // 指南针旋转更新
        pCompassUpdate: function (nDeg) { },
        // 楼层激活响应
        pLayerActive: function (nIndex) { },
        // 楼层显示响应
        pLayerShow: function (nIndex) { },
        // 光标位置信息反馈
        pCursorInfo: function (pID, pName, mPos, pEvent) { },
        // 导航路径信息反馈
        pPathDataFeedback: function (aPoint) { },
        // 导航提示信息反馈
        pHintFeedback: function (pID, pName, mPos, pEvent) { },
        // 鼠标单击画布反馈
        pOnClick: function (pPoint, nKey) { },
        // 隐藏拾取光标
        pHideCursor: null, // hideSetPoint
        // 获取基站列表
        pStationListFeedback: null, // getBleList
        // 获取导航动画类型
        pGetAnimateType: null, // getAnimateType
        // 搜索路径失败响应
        pPathNotFound: null, // notFoundRoute\
        // 当设置起点时
        pOnSetPos: function (pArea, pNaerLandmark, pWordPos, pScreenPos) { },
        // 当ProjectA相关结束时。
        pProjectAEnd: function () { },
        // 当模型相关结束时。
        pModelEnd: function () { },
    }
};


//#region GLOBAL.Do 实现方法

/**
 * SDK初始化方法
 * @param {any} pConfig
 * @param {any} pCallback
 */
function Init(pConfig, pCallback) {
    GLOBAL.pConfig = pConfig;
    pConfig.pCallback = pCallback;
    //pConfig.pZipLoader = LoadZip;
    pConfig.pZipLoader = g_pProjectLoad.LoadZip;
    pConfig.pUpdate1 = GLOBAL.Action.pMajorProgress;
    pConfig.pUpdate2 = GLOBAL.Action.pMinorProgress;
    pConfig.pUpdate = function () {
        GLOBAL.pClick = null;
        GLOBAL.Action.pUpdate();
    };
    pConfig.pDrawPOI = GLOBAL.Action.pDrawPOI;
    pConfig.pLayerUpdate = GLOBAL.Action.pLayerListFlush;
    pConfig.pOutWorkBack = GLOBAL.Action.pOutsideSwich;
    pConfig.pSwichViweModelBack = GLOBAL.Action.pViewSwich;
    pConfig.pCompass = GLOBAL.Action.pCompassUpdate;
    pConfig.pChooseLayer = GLOBAL.Action.pLayerActive;
    pConfig.pShowActiveLayer = GLOBAL.Action.pLayerShow;
    pConfig.pSetNavPoint = GLOBAL.Action.pCursorInfo;
    pConfig.pNavBack = GLOBAL.Action.pPathDataFeedback;
    pConfig.pVoicePost = GLOBAL.Action.pHintFeedback;
    pConfig.pOnClick = GLOBAL.Action.pOnClick;
    pConfig.pChickTouchMove = GLOBAL.Action.pHideCursor;
    pConfig.pPostBlueToothList = GLOBAL.Action.pStationListFeedback;
    pConfig.pMovie = GLOBAL.Action.pGetAnimateType;
    pConfig.pNoFindPath = GLOBAL.Action.pPathNotFound;
    pConfig.pOnSetPos = GLOBAL.Action.pOnSetPos;
    pConfig.pProjectAEnd = GLOBAL.Action.pProjectAEnd;
    pConfig.pModelEnd = GLOBAL.Action.pModelEnd;
    pConfig.aFirstProjectBaoNameList = g_pConfig3d.m_pProjectBaoInfo.firstBaoNameAndExtList;
    pConfig.pProjectBaoName = g_pConfig3d.m_pProjectBaoInfo.projectBaoNameAndExt;

    pConfig.mCanvasLeftWidth = {
        Lenght: 0,
        ScreenPercentage: 0
    }
    pConfig.mCanvasTopHeight = {
        Lenght: 0,
        ScreenPercentage: 0
    }

    {
        // 经线上，100米间隔0.0009度
        // 纬线上，100米间隔0.1 / (111 * cosα)度
        // 确定三维场景中心点经纬度，在根据偏移距离指定位置经纬度

        let mScale = new THREE.Matrix4();
        mScale.makeScale(0.000009, 1.0, 0.001 / (111 * Math.cos(GLOBAL.pConfig.mCoord.lat)));

        let mRotation = new THREE.Matrix4();
        mRotation.makeRotationY(-GLOBAL.pConfig.nCompassBias / 180 * 3.141592654);

        let mTransform = new THREE.Matrix4();
        mTransform.multiplyMatrices(mScale, mRotation);

        let mTransformInv = new THREE.Matrix4();
        mTransformInv.getInverse(mTransformInv, true);

        GLOBAL.pCartesianToGis = mTransform;
        GLOBAL.pGisToCartesian = mTransformInv;
    }

    LoadData(function () {
        pConfig.pSiteData = GLOBAL.pRoomList;
        pConfig.pFloorData = GLOBAL.pLayerList;
        GLOBAL.pEngine = new Engine();
        GLOBAL.pEngine.Init(pConfig);
    });

 
}

//文字提示
NNavigation.TipMessage = function (message) {
    // console.log(message)
     Webgl.now(message) 
};

// 导航结束
NNavigation.NavigateCancel=function(){
   // console.log("NavigateCancel");
  // LockCameraToPath(0);
 
  Webgl.finishNav();
}

//重新规划线路
NNavigation.ReNavigate = function () {
    console.log('ReNavigate')
}

 

/**SDK启动函数 */
function Start() {
    Engine.g_pInstance.Start();
}

/**SDK暂停函数 */
function Stop() {
    Engine.g_pInstance.Stop();
}

/**
 * 重设画布大小
 * @param {any} nWidth
 * @param {any} nHeight
 */
function Resize(nWidth, nHeight) {
    if (Engine.g_pInstance) {
        Engine.g_pInstance.Resize(nWidth, nHeight);
        $("canvas").each(function () {
            $(this).height(window.innerHeight);
            $(this).width(window.innerWidth);
        });
    }
}

/**
 * 切换视图模式，2表示2D模式、3表示3D模式
 * @param {any} nMode
 */
function SwitchView(nMode) {
    if (2 === nMode) {
        // MiaokitDC.DC.viewMode = ViewMode.View3D;
        MiaokitDC.DC.viewMode = ViewMode.View2D;
    } else {
        MiaokitDC.DC.viewMode = ViewMode.View3D;
        // MiaokitDC.DC.viewMode = ViewMode.View2D;
    }
}

/**
 * 设置摄像机视角。某项参数赋值为undefined则维持其状态由鼠标控制
 * @param {any} mTarget 观察目标坐标
 * @param {any} nPitch 仰角
 * @param {any} nYaw 偏航角
 * @param {any} nDistance 3D距离观察点距离/2D观察范围大小
 */
function SetCamera(mTarget, nPitch, nYaw, nDistance) {
    Engine.g_pInstance.m_pCameraCtrl.ResetCamera(mTarget, nPitch, nYaw, nDistance);
}

/**
 * 切换室内外场景
 * @param {any} pName 切换场景的名称
 */
function SwitchScene(pName) {
    if (!pName) {
        GLOBAL.pCurBuilding = null;
        Engine.g_pInstance.m_pProject.GoOutWork();
    } else {
        for (pWork of GLOBAL.pWorkList) {
            if (pWork.build_name === pName) {
                GLOBAL.pCurBuilding = pWork;
                Engine.g_pInstance.m_pProject.SwitchWork(pWork.build_num);
                break;
            }
        }
    }
}

/**
 * 切换楼层
 * @param {any} pName 切换楼宇名称
 */
function SwitchLayer(pName) {

    GLOBAL.pCurLayer = null;
    if (GLOBAL.pCurBuilding) {
        let pLayerList = GLOBAL.pCurBuilding.layerList;

        for (let i = 0; i < pLayerList.length; i++) {
            if (pLayerList[i].floor_name === pName) {
                GLOBAL.pCurLayer = pLayerList[i];
                let nLayerCount = MiaokitDC.DC.GetWork(MiaokitDC.DC.m_nCurWork).m_pALinerDC.m_pLayerMgr.GetLayersLenth();
                for (let j = 0; j < nLayerCount; j++) {
                    let pLayerId = MiaokitDC.DC.GetWork(MiaokitDC.DC.m_nCurWork).m_pEyejiaDC.m_pLayerMgr.GetLayer(j).name;
                    if (pLayerId == GLOBAL.pCurLayer.floor_id) {
                        Engine.g_pInstance.m_pProject.ActiveFloor(j);
                        break;
                    }
                }
            }
        }
    }
}

/**
 * 设置叠加楼层
 * @param {any} bActive 是否叠加显示
 */
function StackUp(bActive) {
    Engine.g_pInstance.m_pProject.StackUp(bActive);
}

/**
 * 基于距离和类型过滤POI列表
 * @param {any} bEnable 
 * @param {any} mCenter
 * @param {any} nRadius
 * @param {any} aType
 */
function FilterPOI(bEnable, mCenter, nRadius, aType) {
    Engine.g_pInstance.FilterPOI(bEnable, mCenter, nRadius, aType);
}

/**
 * 搜索路径
 * @param {any} pStartID 起点ID
 * @param {any} pEndID 终点ID
 * @param {any} nType 优先楼层通道类型（0：最近、1楼梯、2电梯、3扶梯）
 */
function Navigate(pStartID, pEndID, nType = 0) {
    Engine.g_pInstance.m_pProject.Navigate(pStartID, pEndID, nType);
}

/**
 * 是否将视角锁定在摄像机上，还是可以自由浏览地图
 * @param {any} bLock ture / false
 */
function LockCameraToPath(bLock) {
    NNavigation.LockCameraToPath(bLock);
}

/**获取最近的位置点
 * startid：起点房间号
 * endtype：设施编号
 * GateType：优先通道类型
 */
function getNearestPoi(startId, EndType, GateType) {
    GLOBAL.NearList = Engine.g_pInstance.m_pProject.FindNearestList(startId, EndType, GateType);
    return GLOBAL.NearList;
}

/**
 * 三维坐标转屏幕坐标
 * @param {any} mPos
 */
function WorldToScreen(mPos) {
    return Engine.g_pInstance.m_pCameraCtrl.WorldToScenePos(mPos);
}

/**
 * 屏幕坐标转三维坐标
 * @param {any} mPoint
 */
function ScreenToWorld(mPoint) {
    return Engine.g_pInstance.m_pCameraCtrl.TouchPoint({
        pageX: mPoint.x,
        pageY: mPoint.y
    });
}

/**
 * 三维坐标转经纬度
 * @param {any} mPos
 */
function WorldToLonLat(mPos) {
    return new THREE.Vector3(mPos.x, 0, mPos.z).applyMatrix4(GLOBAL.pCartesianToGis);
}

/**
 * 经纬度转三维坐标
 * @param {any} mPoint
 */
function LonLatToWorld(mPoint) {
    return new THREE.Vector3(mPoint.x, 0, mPoint.z).applyMatrix4(GLOBAL.pGisToCartesian);
}
//#endregion

//#region 数据加载方法

/**
 * 数据请求函数
 * @param {any} pUrl
 * @param {any} pType
 * @param {any} pCallback
 */
function AJAX(pUrl, pType = "get", pCallback) {
    $.ajax({
        type: pType,
        url: pUrl,
        async: true,
        dataType: 'json',
        beforeSend: function () { },
        success: function (data) {
            pCallback(data);
        },
        error: function (err) {
            console.info('AJAX Error: ', err);
            pCallback(null);
        }
    });
}

/**
 * 加载资源包
 * @param {any} pCallback
 */
function LoadZip(pCallback) {
    fetch('Model/project.zip').then(function (response) {
        if (response.status === 200 || response.status === 0) {
            return Promise.resolve(response.blob());
        } else {
            return Promise.reject(new Error(response.statusText));
        }
    }).then(JSZip.loadAsync).then(function (zip) {
        pCallback(zip);
    });
}

//#endregion

//#region 配置文件加载

var g_pConfig3d;

function InitConfig3d(pPath, pBack) {
    g_pConfig3d = new Config3d();
    g_pConfig3d.LoadConfig3d(pPath, function () {
        pBack();
    });
}

class Config3d {
    constructor() {
        // -project包的相关配置-
        this.m_pProjectBaoInfo = {
            baoLocalPath: "",
            firstBaoNameAndExtList: [],
            projectBaoNameAndExt: "",
        };
        // -定制模型相关信息- 
        this.m_pCustomModelInfo = {
            customBaoLocalPath: "",
            customModelList: [],
        };
        // -miaokit相关信息- 
        this.m_pMiaokitInfo = {
            projectIdent: null,
            nCompassBias: 0,
            mCoord: [],
            mBackground: [],
            hasOutModel: false,
            outModelPath: "",
            outModelCount: 0,
            outModelStartJPG: 0,
            outModelStartPNG: 0,
            // 屏幕尺寸相关 
            canvasWidthScale: null,
            canvasHeightScale: null,
            canvasLeftWidth: [],
            canvasTopHeight: [],
        };
    }

    //#region -成员函数
    /* -▼ */

    LoadConfig3d(pPath, pBack) {
        let pThis = g_pConfig3d;
        pThis.AJAXText(pPath, 'get', function (pData) {
            if (!pData) {
                console.error("-config3d文件加载失败-");
                pBack();
                return;
            }

            let lRowList = pData.split('\n');
            for (let pRow of lRowList) {
                if (!pRow)
                    continue;
                if (pRow.indexOf("=") == -1)
                    continue;
                if (pRow.indexOf("////") != -1) {
                    pRow = pRow.split('////')[0];
                }
                if (!pRow)
                    continue;

                pThis.CheckFillData(pRow);
            }

            pBack();
        });
    }

    /// 检测每行数据并填充。
    CheckFillData(pRow) {
        let pThis = g_pConfig3d;
        let aRowCur = pRow.split('=');
        let pName = aRowCur[0].trim();
        let pInfo = aRowCur[1];

        if (pInfo == '""')
            return;

        switch (pName) {
            // -project包的相关配置- 
            case "baoLocalPath":
                pInfo = pThis.GetCutValue(pInfo, '"', '"');
                pThis.m_pProjectBaoInfo.baoLocalPath = pInfo;
                break;
            case "firstBaoNameAndExtItem":
                pInfo = pThis.GetCutValue(pInfo, '"', '"');
                pThis.m_pProjectBaoInfo.firstBaoNameAndExtList.push(pInfo);
                break;
            case "projectBaoNameAndExt":
                pInfo = pThis.GetCutValue(pInfo, '"', '"');
                pThis.m_pProjectBaoInfo.projectBaoNameAndExt = pInfo;
                break;
            // -定制模型相关信息- 
            case "customBaoLocalPath":
                pInfo = pThis.GetCutValue(pInfo, '"', '"');
                pThis.m_pCustomModelInfo.customBaoLocalPath = pInfo;
                break;
            case "customModelItem":
                var aInfos = pInfo.split(',');
                var pItem = {
                    pFileNameAndExt: pThis.GetCutValue(aInfos[0], '"', '"'),
                    pWorkId: pThis.GetCutValue(aInfos[1], '"', '"'),
                };
                pThis.m_pCustomModelInfo.customModelList.push(pItem);
                break;
            // -miaokit相关信息- 
            case "projectIdent":
                pInfo = pThis.GetCutValue(pInfo, '"', '"');
                pThis.m_pMiaokitInfo.projectIdent = pInfo;
                break;
            case "nCompassBias":
                pInfo = pThis.GetCutValue(pInfo, '"', '"');
                pThis.m_pMiaokitInfo.nCompassBias = JSON.parse(pInfo);
                break;
            case "mCoord":
                var aInfos = pInfo.split(',');
                var pInfo0 = pThis.GetCutValue(aInfos[0], '"', '"');
                pInfo0 = JSON.parse(pInfo0);
                var pInfo1 = pThis.GetCutValue(aInfos[1], '"', '"')
                pInfo1 = JSON.parse(pInfo1);
                pThis.m_pMiaokitInfo.mCoord.push(pInfo0);
                pThis.m_pMiaokitInfo.mCoord.push(pInfo1);
                break;
            case "mBackground":
                var aInfos = pInfo.split(',');
                var pInfo0 = pThis.GetCutValue(aInfos[0], '"', '"');
                pInfo0 = JSON.parse(pInfo0);
                var pInfo1 = pThis.GetCutValue(aInfos[1], '"', '"')
                pInfo1 = JSON.parse(pInfo1);
                var pInfo2 = pThis.GetCutValue(aInfos[2], '"', '"')
                pInfo2 = JSON.parse(pInfo2);
                pThis.m_pMiaokitInfo.mBackground.push(pInfo0);
                pThis.m_pMiaokitInfo.mBackground.push(pInfo1);
                pThis.m_pMiaokitInfo.mBackground.push(pInfo2);
                break;
            case "hasOutModel":
                pInfo = pThis.GetCutValue(pInfo, '"', '"');
                pThis.m_pMiaokitInfo.hasOutModel = JSON.parse(pInfo);
                break;
            case "outModelPath":
                pInfo = pThis.GetCutValue(pInfo, '"', '"');
                pThis.m_pMiaokitInfo.outModelPath = pInfo;
                break;
            case "outModelCount":
                pInfo = pThis.GetCutValue(pInfo, '"', '"');
                pThis.m_pMiaokitInfo.outModelCount = JSON.parse(pInfo);
                break;
            case "outModelStartJPG":
                pInfo = pThis.GetCutValue(pInfo, '"', '"');
                pThis.m_pMiaokitInfo.outModelStartJPG = JSON.parse(pInfo);
                break;
            case "outModelStartPNG":
                pInfo = pThis.GetCutValue(pInfo, '"', '"');
                pThis.m_pMiaokitInfo.outModelStartPNG = JSON.parse(pInfo);
                break;
            // 屏幕尺寸相关 
            case "canvasWidthScale":
                pInfo = pThis.GetCutValue(pInfo, '"', '"');
                pInfo = JSON.parse(pInfo);
                pThis.m_pMiaokitInfo.canvasWidthScale = pInfo;
                break;
            case "canvasHeightScale":
                pInfo = pThis.GetCutValue(pInfo, '"', '"');
                pInfo = JSON.parse(pInfo);
                pThis.m_pMiaokitInfo.canvasHeightScale = pInfo;
                break;
            case "canvasLeftWidth":
                var aInfos = pInfo.split(',');
                var pInfo0 = pThis.GetCutValue(aInfos[0], '"', '"');
                pInfo0 = JSON.parse(pInfo0);
                var pInfo1 = pThis.GetCutValue(aInfos[1], '"', '"')
                pInfo1 = JSON.parse(pInfo1);
                pThis.m_pMiaokitInfo.canvasLeftWidth.push(pInfo0);
                pThis.m_pMiaokitInfo.canvasLeftWidth.push(pInfo1);
                break;
            case "canvasTopHeight":
                var aInfos = pInfo.split(',');
                var pInfo0 = pThis.GetCutValue(aInfos[0], '"', '"');
                pInfo0 = JSON.parse(pInfo0);
                var pInfo1 = pThis.GetCutValue(aInfos[1], '"', '"')
                pInfo1 = JSON.parse(pInfo1);
                pThis.m_pMiaokitInfo.canvasTopHeight.push(pInfo0);
                pThis.m_pMiaokitInfo.canvasTopHeight.push(pInfo1);
                break;
            // xxxx相关 

        }
    }

    GetCutValue(pStr, pL, pR) {
        pStr = pStr.match(new RegExp(pL + "(" + "\\" + "S*)" + pR));
        if (!pStr) {
            pStr = "";
        } else {
            pStr = pStr[1];
        }
        return pStr;
    }

    /* -▲ */
    //#endregion -成员函数 end

    //#region -数据加载
    /* -▼ */

    /// 加载文本。
    AJAXText(pUrl, pType = "get", pCallback) {
        $.ajax({
            type: pType,
            url: pUrl,
            async: true,
            dataType: 'text',
            beforeSend: function () { },
            success: function (data) {
                pCallback(data);
            },
            error: function (err) {
                console.info('AJAX Error: ', err);
                pCallback(null);
            }
        });
    }

    /* -▲ */
    //#endregion -数据加载 end
}

//#endregion

//#region 接口队列功能
/* -▼ */

// 实例队列玩法:（适用于队列中的队列）
function CreateAPILoadQueue() {
    let pNew = null;
    let pAPIQueue = new WebAPILoadQueue();
    let pAPIBack = function () {
        pAPIQueue.CheckQueue(function () {
            pAPIBack();
        });
    };
    pNew = {
        pAPIQueue,
        pAPIBack,
    };
    return pNew;
}

/// 接口加载队列。
class WebAPILoadQueue {
    constructor() {
        this.pThis = null;
        this.aQueue = [];
        this.pActionBack = null;
        this.pIng = false;
        this.aEndAllActionQueueA = [];
        this.aEndAllActionQueueB = [];
        this.pEndAllQueueName = "A"; // A库在清空时，添加的东西都在B库，来回使用(为了解决一种情况下的bug，就是在回调中添加队列项时,当前回调因为结束，被删)。
    }

    SwitchEndAllQueueName() {
        if (this.pEndAllQueueName == "A") {
            this.pEndAllQueueName = "B";
        } else if (this.pEndAllQueueName == "B") {
            this.pEndAllQueueName = "A";
        }
    }

    AddEndAllQueue(pItem) {
        if (this.pEndAllQueueName == "A") {
            this.aEndAllActionQueueA.push(pItem);
        } else if (this.pEndAllQueueName == "B") {
            this.aEndAllActionQueueB.push(pItem);
        }
    }

    CheckEndAll() {
        if (this.aQueue.length > 0)
            return;

        this.SwitchEndAllQueueName();

        if (this.pEndAllQueueName == "A") {
            for (let pItem of this.aEndAllActionQueueB) {
                pItem();
            }
            this.aEndAllActionQueueB = [];
        } else if (this.pEndAllQueueName == "B") {
            for (let pItem of this.aEndAllActionQueueA) {
                pItem();
            }
            this.aEndAllActionQueueA = [];
        }
    }

    CheckQueue(pBack) {
        if (this.aQueue.length > 0) {
            this.pIng = true;
            let pItem = this.aQueue.shift();
            // console.error("头疼=>",pItem.pAPI.name,pItem);
            if (pItem.pParam) {
                pItem.pAPI(pItem.pParam, function (pData) {

                    if (pItem.pFunc) {
                        if (pData) {
                            pItem.pFunc(pData);
                        } else {
                            pItem.pFunc(null);
                        }
                    }
                    pBack();
                });
            } else {
                pItem.pAPI(function (pData) {
                    if (pItem.pFunc) {
                        if (pData) {
                            pItem.pFunc(pData);
                        } else {
                            pItem.pFunc(null);
                        }
                    }
                    pBack();
                });
            }
        } else {
            this.pIng = false;
            this.CheckEndAll();
        }
    };

    /// Add(函数,函数参数)
    Add(pAPIAction, pParam) {
        let pItem = {
            pAPI: pAPIAction,
            pFunc: null,
            pParam: pParam,
        };
        this.aQueue.push(pItem);
    }

    /// 上一个队列结束时调用。
    AddFunc(pAction) {
        if (this.aQueue.length <= 0)
            return;
        let pItem = this.aQueue[this.aQueue.length - 1];
        pItem.pFunc = pAction;
    }

    /// 队列开始。
    Start(pBack, pEndAll) {
        if (pEndAll)
            this.AddEndAllQueue(pEndAll);
        this.CheckEndAll();
        if (!this.pIng)
            this.CheckQueue(pBack);
    }
}

var m_pAPIQueue = null;
var m_pAPIBack = null;

function WebAPILoadQueueInit() {
    m_pAPIQueue = new WebAPILoadQueue();
    m_pAPIBack = function () {
        m_pAPIQueue.CheckQueue(function () {
            m_pAPIBack();
        });
    };

}
WebAPILoadQueueInit();

/* -▲ */
//#endregion 接口队列功能 end

//#region Project_ 小包加载
var g_pProjectLoad;

function InitProjectLoad(pProjectInfo, pBack) {
    g_pProjectLoad = new ProjectLoad();
    g_pProjectLoad.LoadProjectLoad(pProjectInfo, function () {
        if (pBack)
            pBack();
    });
}

class ProjectLoad {

    constructor() {
        // -project包的相关配置-
        this.m_pProjectBaoInfo = {
            baoLocalPath: "",
            firstBaoNameAndExtList: [],
            projectBaoNameAndExt: "",
        };

        this.m_lProjectDic = new Array();
    }

    LoadProjectLoad(pProjectInfo, pBack) {
        let pThis = g_pProjectLoad;
        pThis.m_pProjectBaoInfo = pProjectInfo;
        let lFirstBaoNameAndExtList = pThis.m_pProjectBaoInfo.firstBaoNameAndExtList;
        let pLQ = CreateAPILoadQueue();
        for (let pItem of lFirstBaoNameAndExtList) {
            pLQ.pAPIQueue.Add(pThis.LoadZip, pItem);
        }
        pLQ.pAPIQueue.Start(pLQ.pAPIBack, function () {
            pBack();
        });
    }

    /// 加载资源包。
    LoadZip(pBaoNameAndExt, pCallback) {
        let pThis = g_pProjectLoad;
        if (pThis.m_lProjectDic[pBaoNameAndExt] === undefined) {
            pThis.m_lProjectDic[pBaoNameAndExt] = null;
        }
        if (pThis.m_lProjectDic[pBaoNameAndExt]) {
            pCallback(pThis.m_lProjectDic[pBaoNameAndExt]);
            return;
        }

        pThis.LoadZipPuzzle(pBaoNameAndExt, function (pZip) {
            pThis.m_lProjectDic[pBaoNameAndExt] = pZip;
            pCallback(pZip);
        });
    }

    LoadZipPuzzle(pBaoNameAndExt, pCallback) {
        let pThis = g_pProjectLoad;
        let pFulllocalPath = "./" + pThis.m_pProjectBaoInfo.baoLocalPath + "/" + pBaoNameAndExt;
        fetch(pFulllocalPath).then(function (response) {
            if (response.status === 200 || response.status === 0) {
                return Promise.resolve(response.blob());
            } else {
                return Promise.reject(new Error(response.statusText));
            }
        }).then(JSZip.loadAsync).then(function (zip) {
            pCallback(zip);
        });
    }
}


//#endregion

//#region 3D入口


/// Miaokit入口。
function InitMiaokit(pMiaokitInfo) {
    /// 初始化SDK 
    Init({
        pProjectIdent: pMiaokitInfo.projectIdent, // 项目标识。(如果没有则填空)
        pLanguage: "zh-cn", // 语言类型
        nCompassBias: pMiaokitInfo.nCompassBias, // 地图正方向相对与北方逆时针旋转度数
        mCoord: { // 中心点经纬度坐标
            long: pMiaokitInfo.mCoord[0],
            lat: pMiaokitInfo.mCoord[1]
        },
        nWidth: window.innerWidth * pMiaokitInfo.canvasWidthScale, // 初始画布宽度
        nHeight: window.innerHeight * pMiaokitInfo.canvasHeightScale, // 初始画布高度
        mBackground: { // 背景颜色。
            r: pMiaokitInfo.mBackground[0],
            g: pMiaokitInfo.mBackground[1],
            b: pMiaokitInfo.mBackground[2]
        },
        mCanvasLeftWidth: {
            Lenght: pMiaokitInfo.canvasLeftWidth[0], // 描述:(EAM函数说明文档.doc 第3项)
            ScreenPercentage: pMiaokitInfo.canvasLeftWidth[1], // 描述:(EAM函数说明文档.doc 第4项)
        },
        mCanvasTopHeight: {
            Lenght: pMiaokitInfo.canvasTopHeight[0], // 描述:(EAM函数说明文档.doc 第5项)
            ScreenPercentage: pMiaokitInfo.canvasTopHeight[1], // 描述:(EAM函数说明文档.doc 第6项)
        },
        pOutModel: { // EAM项目下无作用
            HasOutModel: pMiaokitInfo.hasOutModel, // 是否包含定制的室外模型
            OutModelPath: pMiaokitInfo.outModelPath, // 定制的室外模型路径
            OutModelCount: pMiaokitInfo.outModelCount, // 室外模型数量
            OutModelStartJPG: pMiaokitInfo.outModelStartJPG, // 室外模型JPG贴图起始索引
            OutModelStartPNG: pMiaokitInfo.outModelStartPNG, // 室外模型数量PNG贴图起始索引
        }
    }, function (pError) {
        if (pError) {
            console.error("初始化失败：", pError);
        } else {
            console.info("初始化成功");

            /// 注册窗口缩放响应事件
            window.addEventListener('resize', () => {
                Resize(window.innerWidth, window.innerHeight);
            }, false);
            Start();
        }
    });
}


function Init3D() {
    let m_pConfig3dFileLoaclPath = "./Model/config3d.txt"; // config3d.txt的地址
    /// 初始化config3d。
    InitConfig3d(m_pConfig3dFileLoaclPath, function () {
        let pProjecBaotInfo = g_pConfig3d.m_pProjectBaoInfo;
        /// 初始化projectA包。
        InitProjectLoad(pProjecBaotInfo, function () {
            let pMiaokitInfo = g_pConfig3d.m_pMiaokitInfo;
            /// 初始化miaokit。
            InitMiaokit(pMiaokitInfo);
        });
    });
}


//#endregion 

Init3D();

/// 加载网络数据
function LoadData(pCallback) {
    LoadWorkList(pCallback);
}