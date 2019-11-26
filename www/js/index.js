
class Webgl extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: null,
            isindex: true,
            isTwothree: false,
            isFloorbox: false,
            isShowend: false,
            isSearch: false,
            ispageEnd: false,
            isNaviga: false,
            isFloor: true,
            isNavigaover: false,
            isAlert: false,

            value: undefined,
            startId: undefined,
            startName: "点此输入起点",
            endId: null,
            endName: "点此输入终点",
            path: 0,
            floorList: [],
            floorRooms: [],
            msg: '父类的消息',

            startBuildId: null,
            endBuildId: null,
            startBuildname: null,
            endBuildname: null,
            now: '实时导航文字提示',
            pul: [],
            pL: [],
            work: [],
            roomList: [],
            rbtn: "two_d_btn r_btn",
            r_btn3: "reset r_btn3",
            r_btn2: "select-add r_btn2",
            path1: "path actived",
            path2: "path",
            path3: "path",
            floorStart: "floorIn",
            floorEnd: "floorUn",
            alert: null,
        };

        this.changD = this.changD.bind(this);
        this.selectadd = this.selectadd.bind(this);
        this.showSearch = this.showSearch.bind(this);
        this.reset = this.reset.bind(this);

        this.onChangeStart = this.onChangeStart.bind(this);
        this.onChangeEnd = this.onChangeEnd.bind(this);
        this.searchGo = this.searchGo.bind(this);
        this.hideSearch = this.hideSearch.bind(this);
        this.showList = this.showList.bind(this);
        this.cLpEnd = this.cLpEnd.bind(this);
        this.spStart = this.spStart.bind(this);
        this.spEnd = this.spEnd.bind(this);
        this.replan = this.replan.bind(this);
        //this.over = this.over.bind(this);
        this.getroom = this.getroom.bind(this);
        this.navAgain = this.navAgain.bind(this);
        this.navOver = this.navOver.bind(this);
        this.finishNav = this.finishNav.bind(this);
        this.closeEnd = this.closeEnd.bind(this);
        this.goFloorS = this.goFloorS.bind(this);
        this.goFloorE = this.goFloorE.bind(this);
        this.getFloorS = this.getFloorS.bind(this);
        this.getFloorE = this.getFloorE.bind(this);


        Webgl.sw = this.sw.bind(this);
        Webgl.hidePage = this.hidePage.bind(this);
        Webgl.now = this.now.bind(this);
        Webgl.showEnd = this.showEnd.bind(this);
        Webgl.finishNav = this.finishNav;
    }

    getRoomlist() {
        $.ajax({
            url: '../WEB/easygojs/Data/RoomList.json',
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log('getRoomlist', data)
                this.setState({ roomlist: data.response });
            }.bind(this),
            error: function (xhr, status, err) {
                //  console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    getRoomdata() {
        $.ajax({
            url: '../WEB/easygojs/Data/roomData.json',
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log('roomData', data)
                this.setState({ pL: data.response });
            }.bind(this),
            error: function (xhr, status, err) {
                //  console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    floorList() {
        $.ajax({
            url: '../WEB/easygojs/Data/TYC.json',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ floorList: data.response });   // 注意这里
                console.log('floorList', data)
            }.bind(this),
            error: function (xhr, status, err) {
                // console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    componentDidMount() {
        this.getRoomlist();
        this.getRoomdata()
        this.floorList();

        // 获取楼层列表
        this.setState({
            work: [
                {
                    "ID": "2",
                    "BuildingNum": "TYC",
                    "Icon": "",
                    "Name": "体育场"
                }
            ]
        })

    }

    // 显示首页，供外部js调用的方法
    sw() {
        console.log('sw');
        this.hideList();
    }

    // 室内外切换
    selectadd() {
        if (!this.state.isFloorbox) {
            // 到室内
            this.setState({
                isFloorbox: true,
            })
            SwitchScene("体育场");
            console.log("室内")
            // this.floorList();
        } else {
            // 到室外
            this.setState({
                isFloorbox: false,
            })
            SwitchScene();
            console.log("室外")
        }
    };

    // 2/3D
    changD() {
        if (!this.state.isTwothree) {
            this.setState({
                isTwothree: true,
            })
            SwitchView(2)
        } else {
            this.setState({
                isTwothree: false,
            })
            SwitchView(3)
        }
    }

    // 复位
    reset() {
        console.log("reset");
    }

    showEnd(id, name) {
        console.log("showEnd", id, name)
        // 
        this.setState({
            isShowend: true,
            endId: id,
            endName: name,
            rbtn: "two_d_btn r_btn_mid",
            r_btn3: "reset  r_btn3_mid",
            r_btn2: "select-add r_btn2_mid",
        })
    }
    closeEnd() {
        this.setState({
            isShowend: false,
            rbtn: "two_d_btn r_btn",
            r_btn3: "reset  r_btn3",
            r_btn2: "select-add r_btn2",
        })
    }
    // 显示底部搜索框
    showSearch() {
        console.log("this.state.isSearch; true")
        this.setState({
            isSearch: true,
            rbtn: "two_d_btn r_btn_up",
            r_btn3: "reset  r_btn3_up",
            r_btn2: "select-add r_btn2_up",
            isShowend: false,
        })
        this.hideList();
    }

    // 隐藏底部搜索框
    hideSearch() {
        console.log("this.state.isSearch;  false")
        this.setState({
            isSearch: false,
            rbtn: "two_d_btn r_btn",
            r_btn3: "reset  r_btn3",
            r_btn2: "select-add r_btn2",
        })
    }

    // 获取开始地址并赋值
    onChangeStart = (value, id) => {
        console.log(value, id);
        this.setState({ startId: value, startName: id });
    };

    // 获取结束地址并赋值
    onChangeEnd = (value, id) => {
        console.log(value, id);
        this.setState({ endId: value, endName: id });
    };

    // 推荐路线
    searchPath = (a) => {
        console.log(a);
        if (a == 1) {
            //  优先楼梯
            this.setState({
                path1: "path",
                path2: "path actived",
                path3: "path",
            })
        } else if (a == 2) {
            // 优先电梯
            this.setState({
                path1: "path",
                path2: "path",
                path3: "path actived",
            })
        } else {
            // 推荐路线
            this.setState({
                path1: "path actived",
                path2: "path",
                path3: "path",
            })
        }
        this.setState({
            path: a,
        })
    }

    // 点击开始导航
    searchGo() {
        console.log('start', this.state.startId, 'end', this.state.endId, 'path', this.state.path);
        if (this.state.startId == this.state.endId) {
            console.log("起点和终点相同 ！");
            this.showALert("起点和终点相同 ！");
            this.hideAlert()
        } else if (this.state.startId == undefined) {
            console.log("起点为空 ！");
            this.showALert("请设置起点 ！");
            this.hideAlert()
        } else {
            //隐藏 搜索框，显示 导航框
            this.setState({
                isSearch: false,
                isNaviga: true,
                rbtn: "two_d_btn r_btn_mid",
                r_btn3: "reset  r_btn3_mid",
                r_btn2: "select-add r_btn2_mid",
            })
            // (pStartID, pEndID, nType = 0
            Navigate(this.state.startId, this.state.endId, this.state.path)
        }
    }

    showALert(a) {
        this.setState({
            isAlert: true,
            alert: a,
        })
    }

    hideAlert() {
        setTimeout(() => {
            this.setState({
                isAlert: false,
                alert: null,
            });
        }, 2000);
    }

    // 切换楼层
    fkey = (a) => {
        console.log(a.FloorID, a.name);
        SwitchLayer(a.name)
    };

    // 地址列表页，获取结束地址
    endtree = (value, id) => {
        console.log(value, id);
        this.setState({ endId: value, endName: id });
        this.showSearch();
        this.hideList();
    }

    // 点击'位置列表'按钮，显示相关页面
    showList() {
        //this.sd();
        console.log('showList');
        this.setState({
            isindex: false,
        })
        Router.route('/page-index-new', function () {
            console.log('/page-index-new');
            $('#pageA').hide();
            $('#pageB').hide();
            $('#pageC').hide();
            $('#pageD').hide();
        })
        $.ajax({
            url: '../WEB/easygojs/Data/roomData.json',
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log('roomData', data)
                this.setState({ pL: data.response });
            }.bind(this),
            error: function (xhr, status, err) {
                //  console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    // 回到首页
    hideList() {
        this.setState({
            isindex: true,
        })
        Router.route('/#', function () {
            console.log('/#');
        })
    }

    // 供子组件Endtree，调用的方法，显示位置点列表页面
    showPage = (msg) => {
        this.floorList();
        this.setState({
            ispageEnd: true,
        })
        console.log(this.state.ispageEnd);
        Router.route('/page-index-new', function () {
            console.log('/pop-input-start');
        })
    }

    // 隐藏位置点列表页面，显示首页
    hidePage() {
        console.log('hidePage,index')
        this.setState({
            ispageEnd: false,
            ispageStart: false,
        })
        Router.route('/#', function () {
            console.log('/#');
        })
    }

    //  供子组件ListpageEnd ，调用的方法，获取结束点信息
    cLpEnd = (id, name) => {
        console.log('cLpEnd', id, name)
        this.hidePage();
        this.showSearch();
        this.onChangeEnd(id, name)
        // ajax 获取建筑名称 和 floor
        this.setState({
            endBuildname: name,
            endBuildId: 'theendBuildId',
        })
    }

    //  显示 开始地址点的页面，获取结束点信息
    cLpStart = (id, name) => {
        console.log('cLpStart', id, name)
        this.hidePage();
        this.showSearch();
        this.onChangeStart(id, name)

        // ajax 获取建筑名称 和 floor
        this.setState({
            startBuildname: name,
            startBuildId: 'thestartBuildId',
        })

    };

    // 显示开始页面
    spStart() {
        console.log('start'),
            this.setState({
                ispageStart: true,
                ispageEnd: false,
            })
    }
    // 显示结束页面
    spEnd() {
        console.log('End')
        this.setState({
            ispageStart: false,
            ispageEnd: true,
        })
    }

    // 获取楼层列表，供unity切换显示
    goFloorS(event) {
        console.log('goFloorS')
        const id = event.target.getAttribute("data-id");
        this.setState({
            floorStart: "floorIn",
            floorEnd: "floorUn",
        })
        //  SwitchLayer(id)
    }
    goFloorE(event) {
        console.log('goFloorE')
        const id = event.target.getAttribute("data-id");
        this.setState({
            floorStart: "floorUn",
            floorEnd: "floorIn",
        })
        //  SwitchLayer(id)
    }

    getFloorS(a) {
        console.log('goFloorS', a)
        this.setState({
            floorStart: "floorIn",
            floorEnd: "floorUn",
        })
        //  SwitchLayer(id)
    }
    getFloorE(a) {
        console.log('goFloorE', a)
        this.setState({
            floorStart: "floorUn",
            floorEnd: "floorIn",
        })
        //  SwitchLayer(id)
    }

    // 显示路线导航实时数据，供外部js调用
    now(a) {
        // console.log(a);
        this.setState({
            now: a
        })
    }

    //  重新规划路线
    replan() {
        console.log('replan');
        this.navOver();
        this.setState({
            isNaviga: false,
            isSearch: true,
            rbtn: "two_d_btn r_btn_up",
            r_btn3: "reset  r_btn3_up",
            r_btn2: "select-add r_btn2_up",
        });
    }

    // 再次导航
    navAgain() {
        console.log('navAgain');
        this.setState({
            isNavigaover: false,
            isNaviga: true,
        })
        this.searchGo();
    }

    // 手动结束导航
    navOver() {
        console.log('navOver');
        NNavigation.ClearAllPath();   // 结束导航
        this.setState({
            isNavigaover: false,
            rbtn: "two_d_btn r_btn",
            r_btn3: "reset  r_btn3",
            r_btn2: "select-add r_btn2",
        })
    }

    //完成导航后，调用方法
    finishNav() {
        console.log('finishNav');
        this.setState({
            isNavigaover: true,
            isNaviga: false,
        })
    }

    // 获取房间位置点信息
    getroom = (e) => {
        const id = e.roomID;
        const name = e.companyName;
        this.showSearch();
        this.setState({
            endName: name,
            endId: id,
        })

        // ajax 获取建筑物名称 和floor
        this.setState({
            endBuildname: name,
            endBuildId: id,
        })
    }


    render() {
        return (
            <div className="indexpage">
                {this.state.ispageEnd ?
                    <div>
                        <ListpageEnd cLpEnd={this.cLpEnd} roomlist={this.state.roomlist} />
                    </div>
                    : null
                }
                {this.state.ispageStart ?
                    <div>
                        <ListpageStart cLpStart={this.cLpStart} roomlist={this.state.roomlist} />
                    </div>
                    : null
                }
                {this.state.isNaviga ?
                    <div className="navBox">
                        <div className="InfoToastBox">{this.state.now}</div>
                        <div className="searchDirection">
                            < NavigaContainer startBuildname={this.state.startBuildname} endBuildname={this.state.endBuildname} startBuildId={this.state.startBuildId} endBuildId={this.state.endBuildId}
                                replan={this.replan} navOver={this.navOver} finishNav={this.finishNav} getFloorS={this.getFloorS} getFloorE={this.getFloorE} />
                        </div>
                    </div>
                    : null
                }
                {this.state.isNavigaover ?
                    <div className="navBox">
                        <div className="searchDirection">
                            < NavigaOver startBuildname={this.state.startBuildname} endBuildname={this.state.endBuildname} startBuildId={this.state.startBuildId} endBuildId={this.state.endBuildId}
                                navAgain={this.navAgain} navOver={this.navOver} getFloorS={this.getFloorS} goFloorE={this.goFloorE} />
                        </div>
                    </div>
                    :
                    null
                }
                {this.state.isindex ?
                    <div className="webglEle" >
                        <div className="index-serch">
                            <Endtree endtree={this.endtree} showPage={this.showPage} />
                            <a href="#/page-index-new" onClick={this.showList}  >
                                <antd.Button type="primary" onClick={this.showList} className="topSearchBtn">位置列表</antd.Button>
                            </a>
                        </div>
                        {this.state.isTwothree ?
                            <div className={this.state.rbtn} onClick={this.changD}>3D</div>
                            :
                            <div className={this.state.rbtn} onClick={this.changD}> 2D </div>
                        }
                        {this.state.isFloorbox ?
                            <div className={this.state.r_btn2} onClick={this.selectadd}>返回室外</div>
                            :
                            <div className={this.state.r_btn2} onClick={this.selectadd}>进入室内</div>
                        }
                        <div className={this.state.r_btn3} onClick={this.reset}>
                            <antd.Icon type="cloud-sync" />
                        </div>
                        {this.state.isFloorbox ?
                            <div className="floor_box">
                                <ul className="uiF">
                                    {this.state.floorList.map((i, index) => {
                                        return (
                                            <li key={i.FloorID} onClick={this.fkey.bind(this, i)}>
                                                {i.name}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            : null
                        }
                        {this.state.isShowend ?
                            <div className="choose-set-point">
                                <div className="post">
                                    <span className="text">{this.state.endName}</span>
                                    <span className="post-text">
                                        <antd.Icon type="environment" className="search-ul-environment" />
                                        choose-set-point{this.state.endBuildname}
                                    </span>
                                </div>
                                <div className="choose-right">
                                    <div className="end-icon" onClick={this.showSearch}>
                                        <antd.Icon type="right" />到这去
                                    </div>
                                    <div className="close-choose" onClick={this.closeEnd}>
                                        <antd.Icon type="close" />
                                    </div>
                                </div>
                            </div>
                            :
                            null
                        }
                        {this.state.isAlert ?
                            <div className="alert">{this.state.alert}</div>
                            :
                            null
                        }
                        {this.state.isSearch ?
                            <div className="search_box" >
                                <div className="search_con_box">
                                    <ul className="search-dot-list">
                                        <li className="search-dot"></li>
                                        <li className="search-dot"></li>
                                        <li className="search-dot"></li>
                                        <li className="search-dot"></li>
                                        <li className="search-dot"></li>
                                    </ul>
                                    <a href="#/page-index-start" onClick={this.spStart}>
                                        <div className="start_input">
                                            <span className="tL">{this.state.startName}</span>
                                            <span className="tR">{this.state.startBuildname}</span>

                                        </div>
                                    </a>
                                    <a href="#/page-index-end" onClick={this.spEnd}>
                                        <div className="end_input">
                                            <span className="tL">{this.state.endName}</span>
                                            <span className="tR">{this.state.endBuildname}</span>
                                        </div>
                                    </a>
                                </div>
                                <ul className="search-path ">
                                    <li className={this.state.path1} onClick={this.searchPath.bind(this, 0)}>推荐路线</li>
                                    <li className={this.state.path2} onClick={this.searchPath.bind(this, 1)}>优先楼梯</li>
                                    <li className={this.state.path3} onClick={this.searchPath.bind(this, 2)}>优先电梯</li>
                                </ul>
                                <ul className="search-path-floor">
                                    <li className={this.state.floorStart} data-id={this.state.startBuildId} onClick={this.goFloorS} > {this.state.startBuildname} </li>
                                    <li className={this.state.floorEnd} data-id={this.state.endBuildId} onClick={this.goFloorE} > {this.state.endBuildname}</li>
                                </ul>
                                <div className="nav-bottom">
                                    <a href="#/">
                                        <span className="search_cancel  " onClick={this.hideSearch}>取消</span>
                                    </a>
                                    <a href="#/">
                                        <antd.Button type="primary" className="search-go search_sbtn" onClick={this.searchGo}>开始导航</antd.Button>
                                    </a>
                                </div>
                            </div>
                            : null
                        }
                    </div>
                    :
                    <div className="listEle">
                        <div className="top-slide">
                            <div className="topbox">
                                <div className="gohistroy">
                                    <a href="#/"><antd.Icon type="left" /></a>
                                </div>
                                <div className="box"></div>
                                <Endtree endtree={this.endtree} showPage={this.showPage} />
                            </div>
                        </div>
                        <div className="index-new-centre-navbtn">
                            <ul>
                                <li>
                                    <a href="https://www.baidu.com/" ><span>站外链接A</span></a>
                                </li>
                                <li>
                                    <a href="https://hao.360.com/?src=se_newtab"><span>站外链接B</span></a>
                                </li>
                                <li>
                                    <a href="#/pageC"><span>站内信息C</span></a>
                                </li>
                                <li>
                                    <a href="#/pageD"><span>站内信息D</span></a>
                                </li>
                            </ul>
                        </div>
                        <div className="left-slide-new">
                            <ul>
                                {this.state.work.map((i, index) => {
                                    return (
                                        <li className="work">{i.Name}</li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className="room-list">
                            <antd.Collapse accordion bordered={false} >
                                {this.state.pL.map((i, index) => {
                                    return (
                                        <Panel header={i.tit} key={index}>
                                            {i.txt.map((it, index) => {
                                                return (
                                                    <antd.Collapse accordion bordered={false} >
                                                        <Panel header={it.txtt} key={index}>
                                                            {it.rooms.map((item, index) => {
                                                                return (
                                                                    <a href="#/">
                                                                        <span className="rooms" onClick={this.getroom.bind(this, item)}  >{item.companyName} </span>
                                                                    </a>
                                                                )
                                                            })}
                                                        </Panel>
                                                    </antd.Collapse>
                                                )
                                            })}
                                        </Panel>
                                    )
                                })}
                            </antd.Collapse>
                        </div>
                    </div>
                }
            </div>

        );
    }
}


class Endtree extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 'Andy',
            value: "来自子类的消息",
            endId: undefined,
            endName: undefined,
            msg: "来自子类的msg",
        }
    }

    ck = () => {
        console.log(2222);
        this.props.showPage(this.state.msg);
    }

    render() {
        return (
            <a href="#/page-index-end" onClick={this.ck}>
                <Search className="ui-input-search" placeholder="请输入查询信息" />
            </a>
        )
    }
}



class ListpageStart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearch: true,
            pul: null,
            sinpv: null,
            pL: [],
            floorRooms: [],
            roomlist: [],
            findA: "findline",
            findB: null,
            findC: null,
        }

        this.findA = this.findA.bind(this);
        this.findB = this.findB.bind(this);
        this.findC = this.findC.bind(this);
        this.shouInput = this.shouInput.bind(this);
    }

    roomList() {
        $.ajax({
            url: '../WEB/easygojs/Data/RoomList.json',
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log('RoomListSSSSSS', data)
                this.setState({ pul: data.response });
            }.bind(this),
            error: function (xhr, status, err) {
                //  console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    floorList() {
        $.ajax({
            url: '../WEB/easygojs/Data/floorList.json',
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log('floorListSSSSS', data);
                if (data.response.length > 16) {
                    this.setState({
                        height: "pop-input-long"
                    })
                } else {
                    this.setState({
                        height: "pop-input-short"
                    })
                }
                this.setState({ pL: data.response });
            }.bind(this),
            error: function (xhr, status, err) {
                //  console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }


    componentDidMount() {
        this.setState({
            roomlist: this.props.roomlist
        })
        this.floorList();
        this.roomList();
        console.log(this.state)

        $.ajax({
            url: '../WEB/easygojs/Data/floorList.json',
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log('floorListSSSS', data)
                this.setState({ pL: data.response });
                console.log(this.state);
                if (data.response.length > 16) {
                    this.setState({
                        height: "pop-input-long"
                    })
                } else {
                    this.setState({
                        height: "pop-input-short"
                    })
                }
            }.bind(this),
            error: function (xhr, status, err) {
                //  console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

        this.setState({
            pL: []
        })
    }

    findA() {
        console.log("sssssAAAAAAA");
        this.setState({
            isSearch: false,
            pul: this.state.pul,
            findA: "findline",
            findB: null,
            findC: null,
        })
        this.popHight();
    }

    findB() {
        console.log("sssssssBBBBBBBB")
        this.setState({
            isSearch: false,
            pul: [],
            findA: null,
            findB: "findline",
            findC: null,
        })
    }

    findC() {
        console.log("sssssssCCCCCCC")
        this.setState({
            isSearch: false,
            pul: this.state.pul,
            findA: null,
            findB: null,
            findC: "findline",
        })
        this.popHight();
    }

    popHight() {
        if (this.state.pul.length > 16) {
            this.setState({
                height: "pop-input-long"
            })
        } else {
            this.setState({
                height: "pop-input-short"
            })
        }
    }

    shouInput = (value) => {
        console.log(value)
        changeBgColor(value)
        this.setState({
            isSearch: false,
            pul: [
                {
                    "roomID": "XLYF",
                    "floorID": "1F",
                    "companyName": "训练用房",
                    "HyID": "6",
                    "iconUrl": "",
                    "imgUrl": ""
                },
                {
                    "roomID": "MT",
                    "floorID": "1F",
                    "companyName": "门厅",
                    "HyID": "6",
                    "iconUrl": "",
                    "imgUrl": ""
                },
                {
                    "roomID": "XLYF2",
                    "floorID": "1F",
                    "companyName": "训练用房",
                    "HyID": "6",
                    "iconUrl": "",
                    "imgUrl": ""
                }
            ]
        });
    }

    cv() {
        $('.ant-input').val('');
        console.log($('.ant-input').val())
    }

    sliStart = (e) => {
        console.log(e.roomID, e.companyName);
        const id = e.roomID;
        const name = e.companyName;
        this.props.cLpStart(id, name)
    }

    render() {
        return (
            <div id="pop-input" className={this.state.height} >
                <a href="#/">
                    <div className="gohistroy"> <antd.Icon type="left" /> </div>
                </a>
                <div className="select-type">
                    <ul>
                        <li className={this.state.findA} onClick={this.findA}>位置点</li>
                        <li className={this.state.findB} onClick={this.findB}>图书</li>
                        <li className={this.state.findC} onClick={this.findC}>座位</li>
                    </ul>
                </div>
                <div className="input-head">
                    <div className="visual-input">
                        <Search className="searchinp" placeholder="请输入查询信息" onSearch={this.shouInput} style={{ width: 280 }} />
                        <span onClick={this.cv} className="inputClose"><antd.Icon type="close" /> </span>
                    </div>
                    {this.state.isSearch ?
                        <div className="search-panel">
                            <antd.Collapse accordion bordered={false} >
                                {this.state.pL.map((i, index) => {
                                    return (
                                        <Panel header={i.companyName} key={index} >
                                            {i.roomList.map((it, index) => {
                                                return (
                                                    <span onClick={this.sliStart.bind(this, it)}  >{it.companyName} </span>
                                                )
                                            })}
                                        </Panel>
                                    )
                                })}
                            </antd.Collapse>
                        </div>
                        :
                        <div className="search-ul">
                            <ul>
                                {this.state.pul.map((i, index) => {
                                    return (
                                        <li onClick={this.sliStart.bind(this, i)}  >
                                            <antd.Icon type="environment" className="search-ul-environment" />
                                            <span className="tL">{i.companyName}</span>
                                            <span className="tR">{i.floorID}</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    }
                </div>
            </div>
        )
    }

}



const { Search } = antd.Input;
const { Panel } = antd.Collapse;

class ListpageEnd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearch: true,
            pul: null,
            sinpv: null,
            pL: [],
            floorRooms: [],
            roomlist: [],
            findA: "findline",
            findB: null,
            findC: null,
        }
        this.findA = this.findA.bind(this);
        this.findB = this.findB.bind(this);
        this.findC = this.findC.bind(this);
        this.shouInput = this.shouInput.bind(this);
        this.cv = this.cv.bind(this);
        this.popHight = this.popHight.bind(this);

    }

    roomList() {
        $.ajax({
            url: '../WEB/easygojs/Data/RoomList.json',
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log('RoomListEEEE', data)
                this.setState({ pul: data.response });
            }.bind(this),
            error: function (xhr, status, err) {
                //  console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    floorList() {
        $.ajax({
            url: '../WEB/easygojs/Data/floorList.json',
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log('floorListEEEE', data);
                if (data.response.length > 16) {
                    this.setState({
                        height: "pop-input-long"
                    })
                } else {
                    this.setState({
                        height: "pop-input-short"
                    })
                }
                this.setState({ pL: data.response });
            }.bind(this),
            error: function (xhr, status, err) {
                //  console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }


    componentDidMount() {

        this.setState({
            roomlist: this.props.roomlist
        })
        this.floorList();
        this.roomList();
        console.log(this.state)
   
        $.ajax({
            url: '../WEB/easygojs/Data/floorList.json',
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log('floorListEEEE', data)
                this.setState({ pL: data.response });
                console.log(this.state);
                if (data.response.length > 16) {
                    this.setState({
                        height: "pop-input-long"
                    })
                } else {
                    this.setState({
                        height: "pop-input-short"
                    })
                }
            }.bind(this),
            error: function (xhr, status, err) {
                //  console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

        this.setState({
            pL: []
        })
    }

    findA() {
        console.log("eeeeeAAAAAAA")
        this.setState({
            isSearch: false,
            pul: this.state.pul,
            findA: "findline",
            findB: null,
            findC: null,
        })
        this.popHight();
    }

    findB() {
        console.log("eeeeeBBBBBBBB")
        this.setState({
            isSearch: false,
            // pul: [],
            findA: null,
            findB: "findline",
            findC: null,
        })
    }

    findC() {
        console.log("eeeeeCCCCCCC");
        this.setState({
            isSearch: false,
            pul: this.state.pul,
            findA: null,
            findB: null,
            findC: "findline",
        })
        this.popHight();
    }

    popHight() {
        if (this.state.pul.length > 16) {
            this.setState({
                height: "pop-input-long"
            })
        } else {
            this.setState({
                height: "pop-input-short"
            })
        }
    }

    // 获取输入框内的内容
    shouInput = (value) => {
        console.log(value)
        changeBgColor(value)
        // 可加入刷新pul数据
        this.setState({
            isSearch: false,
            pul: [
                {
                    "roomID": "XLYF",
                    "floorID": "1F",
                    "companyName": "训练用房",
                    "HyID": "6",
                    "iconUrl": "",
                    "imgUrl": ""
                },
                {
                    "roomID": "MT",
                    "floorID": "1F",
                    "companyName": "门厅",
                    "HyID": "6",
                    "iconUrl": "",
                    "imgUrl": ""
                },
                {
                    "roomID": "XLYF2",
                    "floorID": "1F",
                    "companyName": "训练用房",
                    "HyID": "6",
                    "iconUrl": "",
                    "imgUrl": ""
                }
            ]
        });

    }

    // 清空输入框内的内容
    cv() {
        $('.ant-input').val('');
        console.log($('.ant-input').val());
        console.log(this.state);
        this.setState({
            pul: this.state.roomlist,
        })
    }

    sliEnd = (e) => {
        console.log(e);
        const id = e.roomID;
        const name = e.companyName;
        this.props.cLpEnd(id, name)
    }

    render() {
        return (
            <div id="pop-input" className={this.state.height} >
                <a href="#/">
                    <div className="gohistroy"> <antd.Icon type="left" /> </div>
                </a>
                <div className="select-type">
                    <ul>
                        <li className={this.state.findA} onClick={this.findA}>位置点</li>
                        <li className={this.state.findB} onClick={this.findB}>图书</li>
                        <li className={this.state.findC} onClick={this.findC}>座位</li>
                    </ul>
                </div>
                <div className="input-head">
                    <div className="visual-input">
                        <Search className="searchinp" placeholder="请输入查询信息" onSearch={this.shouInput} style={{ width: 280 }} />
                        <span onClick={this.cv} className="inputClose"><antd.Icon type="close" /> </span>
                    </div>
                    {this.state.isSearch ?
                        <div className="search-panel">
                            <antd.Collapse accordion bordered={false} >
                                {this.state.pL.map((i, index) => {
                                    return (
                                        <Panel header={i.companyName} key={index} >
                                            {i.roomList.map((it, index) => {
                                                return (
                                                    <span onClick={this.sliEnd.bind(this, it)}  >{it.companyName} </span>
                                                )
                                            })}
                                        </Panel>
                                    )
                                })}
                            </antd.Collapse>
                        </div>
                        :
                        <div className="search-ul">
                            <ul>
                                {this.state.pul.map((i, index) => {
                                    return (
                                        <li onClick={this.sliEnd.bind(this, i)}   >
                                            <antd.Icon type="environment" className="search-ul-environment" />
                                            <span className="tL">{i.companyName}</span>
                                            <span className="tR">{i.floorID}</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    }
                </div>
            </div>
        )
    }

}


class NavigaContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            floorStart: "floorIn",
            floorEnd: "floorUn",
        }
        this.replan = this.replan.bind(this);
        this.navOver = this.navOver.bind(this);
        this.finishNav = this.finishNav.bind(this);
        this.getFloorS = this.getFloorS.bind(this);
        this.getFloorE = this.getFloorE.bind(this);
    }

    replan() {
        console.log('replan')
        this.props.replan();
    }

    navOver() {
        console.log('over')
        this.props.navOver();
    }

    finishNav() {
        console.log('finishNav')
        this.props.finishNav();
    }

    getFloorS(event) {
        console.log('goFloorSccccc', event)
        const id = event.target.getAttribute("data-id");
        this.props.getFloorS(id);
        this.setState({
            floorStart: "floorIn",
            floorEnd: "floorUn",
        })
    }

    getFloorE(event) {
        console.log('goFloorEccccc', event)
        const id = event.target.getAttribute("data-id");
        this.props.getFloorE(id);
        this.setState({
            floorStart: "floorUn",
            floorEnd: "floorIn",
        })
    }

    render() {

        return (
            <div className="search-container " >
                <div className="history-rollback-wrapper">
                    <ul className="search-path-floor">
                        <li className={this.state.floorStart} data-id={this.props.startBuildId} onClick={this.getFloorS} >{this.props.startBuildname}</li>
                        <li className={this.state.floorEnd} data-id={this.props.endBuildId} onClick={this.getFloorE} >{this.props.endBuildname}</li>
                    </ul>
                </div>
                <div className="navigating-btn Naviga_Con">
                    <antd.Button type="primary" className="replanning" onClick={this.replan} >重新规划</antd.Button>
                    <antd.Button type="primary" className="over" onClick={this.navOver}>结束导航</antd.Button>
                </div>
            </div>
        )
    }
}


class NavigaOver extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            floorStart: "floorIn",
            floorEnd: "floorUn",
        }

        this.navOver = this.navOver.bind(this);
        this.navAgain = this.navAgain.bind(this);
        this.goFloorS = this.goFloorS.bind(this);
        this.goFloorE = this.goFloorE.bind(this);
    }

    navOver() {
        console.log('navOver')
        this.props.navOver();
    }

    navAgain() {
        console.log('navAgain')
        this.props.navAgain();
    }

    goFloorS(event) {
        console.log('goFloorSwwww')
        this.props.goFloorS(event);
    }

    goFloorE(event) {
        console.log('goFloorEwwwww')
        this.props.goFloorE(event);
    }

    render() {
        return (
            <div className="search-container " >
                <div className="history-rollback-wrapper">
                    <ul className="search-path-floor">
                        <li className={this.state.floorStart} data-id={this.props.startBuildId} onClick={this.goFloorS} >{this.props.startBuildname}</li>
                        <li className={this.state.floorEnd} data-id={this.props.endBuildId} onClick={this.goFloorE} >{this.props.endBuildname}</li>
                    </ul>
                </div>
                <div className="navigating-btn Naviga_Over">
                    <a href="#/">
                        <span className="search_cancel search_sbtn" onClick={this.navOver}>取消</span>
                    </a>
                    <antd.Button type="primary" className="again" onClick={this.navAgain} >再次导航</antd.Button>
                </div>
            </div>
        )
    }
}
