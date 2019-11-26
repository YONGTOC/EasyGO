let Img = {
    qsg: null,
    tyc: null,
    yyg: null,
    zxc: null,
    load: false
}

/// 加载指定场景的楼层列表数据
function LoadWorkList(pCallback) {
    let workUrl = "easygojs/Data/WorkList.json";
    AJAX(workUrl, 'get', function (workList) {
        if (workList.response != null) {
            let nWorkCount = workList.response.length;
            let pWorkList = GLOBAL.pWorkList;

            for (let item of workList.response) {
                let pWork = {
                    id: item.ID,
                    icon_url: item.Icon,
                    build_num: item.BuildingNum,
                    build_name: item.Name,
                    layerList: []
                };

                pWorkList.push(pWork);

                LoadLayerList(pWork, function () {
                    if (0 === --nWorkCount) {
                        LoadSiteList(function () {
                            pCallback();
                        });
                    }
                });
            }
        }
    });
}

/**
 * 加载指定场景的楼层列表数据
 * @param {any} pWork 场景
 * @param {any} pCallback
 */
function LoadLayerList(pWork, pCallback) {
    let layerUrl = "easygojs/Data/" + pWork.build_num + ".json";
    AJAX(layerUrl, 'get', function (layerList) {
        let pLayerList = GLOBAL.pLayerList;
        let aResponse = layerList.response ? layerList.response : [];

        for (let item of aResponse) {
            let pLayer = {
                id: item.FloorID,
                b_id: item.FloorID,
                floor_id: item.FloorID,
                icon: item.iconUrl,
                floor_name: item.name,
                is_default: "0",
                detail: item.name,
                build_num: pWork.build_num,
                build_name: pWork.build_name
            };

            pLayerList.push(pLayer);
            pWork.layerList.push(pLayer);
        }

        pCallback();
    });
}

/**
 * 加载位置点列表数据
 * @param {any} pCallback
 */
function LoadSiteList(pCallback) {
    let roomUrl = "easygojs/Data/RoomList.json";
    AJAX(roomUrl, 'get', function (roomList) {
        let pRoomList = GLOBAL.pRoomList;

        for (let item of roomList.response) {
            let pRoom = {
                HyID: parseInt(item.HyID),
                roomID: item.roomID,
                floorID: item.floorID,
                buildingID: "默认值",
                companyName: item.companyName,
                iconUrl: item.iconUrl,
                imgUrl: item.imgUrl
            };

            pRoomList.push(pRoom);
        }
        LoadIcon();
        pCallback();
    });
}

function LoadIcon() {
    let loader = new THREE.TextureLoader();
    loader.load('easygojs/img/qsg.png', function (texture) {
        Img.qsg = texture;
        loader.load('easygojs/img/tyc.png', function (texture) {
            Img.tyc = texture;
            loader.load('easygojs/img/yyg.png', function (texture) {
                Img.yyg = texture;
                loader.load('easygojs/img/zxc.png', function (texture) {
                    Img.zxc = texture;
                    Img.load = true;
                });
            });
        });
    });
}