class ATexture {
    constructor(pDesc) {
        this.m_mAttachment = new Handle(Attachment, 0);
        this.m_mOffset = new Vector2(0.0, 0.0);
        this.m_mScale = new Vector2(0.0, 0.0);
        this.m_nRotate = 0;
        this.m_pDesc = null;
        this.m_bUpdated = false;
        this.desc = pDesc;
    }
    get version() {
        return 1000;
    }
    get type() {
        return EntityType.Collection;
    }
    get attachment() {
        return this.m_mAttachment.Object;
    }
    set attachment(pAttachment) {
        this.m_mAttachment.Number = pAttachment.handle.Number;
        this.m_bUpdated = true;
    }
    get displayType() {
        return DisplayType.Normal;
    }
    set displayType(eType) {
    }
    get resource() {
        return this.texture;
    }
    Remap(mHeap) {
        this.m_mAttachment.Heap = mHeap;
    }
    Apply() {
        if (this.m_bUpdated) {
            this.m_bUpdated = false;
        }
    }
    Destroy() {
        this.m_bUpdated = false;
        this.m_pDesc = null;
    }
    Clear() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mAttachment.Number = pReader.ReadUInt32();
        this.m_mOffset.x = pReader.ReadSingle();
        this.m_mOffset.y = pReader.ReadSingle();
        this.m_mScale.x = pReader.ReadSingle();
        this.m_mScale.y = pReader.ReadSingle();
        this.m_nRotate = pReader.ReadSingle();
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("ATexture.UnSerialize(): Bad end!");
        }
        this.m_bUpdated = true;
    }
    get collectionType() {
        return CollectionType.ATexture;
    }
    set desc(pDesc) {
        if (this.m_pDesc == null) {
            this.offset = new Vector2(0.0, 0.0);
            this.scale = new Vector2(1.0, 1.0);
            this.rotate = 0.0;
            this.m_pDesc = pDesc;
            this.m_bUpdated = true;
        }
    }
    Inherit(pSrc) {
        let pSrcTexture = pSrc;
        this.rotate = pSrcTexture.rotate;
        return true;
    }
    get offset() {
        return new Vector2(this.m_mOffset.x, this.m_mOffset.y);
    }
    set offset(mOffset) {
        this.m_mOffset.x = mOffset.x;
        this.m_mOffset.y = mOffset.y;
    }
    get scale() {
        return new Vector2(this.m_mScale.x, this.m_mScale.y);
    }
    set scale(mScale) {
        this.m_mScale.x = mScale.x;
        this.m_mScale.y = mScale.y;
    }
    get rotate() {
        return this.m_nRotate;
    }
    set rotate(nRotate) {
        this.m_nRotate = nRotate;
    }
    get texture() {
        return this.m_pDesc == null ? null : this.m_pDesc.m_pTexture;
    }
    get textureSize() {
        return this.m_pDesc == null ? new Vector2(0.0, 0.0) : new Vector2(this.m_pDesc.m_mSize.x, this.m_pDesc.m_mSize.y);
    }
}
class ATextureDesc {
    constructor() {
        this.m_nID = 0;
        this.m_nCategoryID = 0;
        this.m_pName = null;
        this.m_mSize = new Vector2(0.0, 0.0);
        this.m_pTextureUrl = null;
        this.m_pIconUrl = null;
        this.m_pTexture = null;
        this.m_pModelType = null;
    }
    get version() {
        return 1001;
    }
    Init(jData) {
    }
    Destory() {
        this.m_pTexture = null;
    }
    Load(pProgress, pCallback) {
        if (this.m_pTextureUrl == null || this.m_pTextureUrl.length < 1) {
            pCallback(null);
            return;
        }
        let pThis = this;
        MiaokitDC.DC.m_pAssetsLoader.LoadTexture(this.m_pTextureUrl, function (pTexture) {
            pThis.m_pTexture = pTexture;
            pCallback(null);
        });
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_nID = pReader.ReadInt32();
        this.m_nCategoryID = pReader.ReadInt32();
        this.m_pName = pReader.ReadString();
        this.m_mSize.x = pReader.ReadSingle();
        this.m_mSize.y = pReader.ReadSingle();
        this.m_pTextureUrl = pReader.ReadString();
        this.m_pIconUrl = pReader.ReadString();
        this.m_pModelType = pReader.ReadString();
        if (nVersion > 1000) {
            this.m_pTextureUrl = pReader.ReadString();
        }
        else {
        }
        if (nVersion > 1001) {
            let m_pTextureUrlPC = pReader.ReadString();
        }
        else {
            let m_pTextureUrlPC = "";
        }
        if (nVersion > 1002) {
            let m_pModelNum = pReader.ReadString();
        }
        else {
            let m_pModelNum = "";
        }
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("ATexture.Desc.UnSerialize(): Bad end!");
        }
    }
    get id() {
        return this.m_nID;
    }
    get typeId() {
        return this.m_nCategoryID;
    }
    get name() {
        return this.m_pName;
    }
    get desc() {
        return "";
    }
    get iconUrl() {
        return this.m_pIconUrl;
    }
    get resource() {
        return this.m_pTexture;
    }
}
class AHoleModel {
    constructor(pDesc) {
        this.m_mAttachment = new Handle(Attachment, 0);
        this.m_bEnabled = false;
        this.m_bFlip = false;
        this.m_mOffset = new Vector3(0.0, 0.0, 0.0);
        this.m_mPosition = new Vector3(0.0, 0.0, 0.0);
        this.m_mEulerAngles = new Vector3(0.0, 0.0, 0.0);
        this.m_mLocalScale = new Vector3(0.0, 0.0, 0.0);
        this.m_pModel = null;
        this.m_pPatch = null;
        this.m_pDesc = null;
        this.m_bUpdated = false;
        this.desc = pDesc;
        this.m_bEnabled = true;
        this.m_bFlip = false;
        this.m_mOffset = new Vector3(0.0, this.m_pDesc == null ? 0.0 : this.m_pDesc.m_nDefaultHeight, 0.0);
        this.m_mLocalScale = new Vector3(1.0, 1.0, 1.0);
    }
    get version() {
        return 1000;
    }
    get type() {
        return EntityType.Collection;
    }
    get attachment() {
        return this.m_mAttachment.Object;
    }
    set attachment(pAttachment) {
        this.m_mAttachment.Number = pAttachment.handle.Number;
        this.m_bUpdated = true;
    }
    get displayType() {
        return DisplayType.Normal;
    }
    set displayType(eType) {
    }
    get resource() {
        return this.model;
    }
    Remap(mHeap) {
        this.m_mAttachment.Heap = mHeap;
    }
    Apply() {
        if (this.m_bUpdated) {
            let bActive = this.attachment == null ? false : this.attachment.active;
            if (this.model != null) {
                this.model.SetActive(bActive);
            }
            this.m_bUpdated = false;
        }
    }
    Destroy() {
        this.m_bUpdated = false;
        this.m_pModel = null;
        this.m_pPatch.Destroy();
        this.m_pPatch = null;
    }
    Clear() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mAttachment.Number = pReader.ReadUInt32();
        this.m_bEnabled = pReader.ReadBoolean();
        this.m_bFlip = pReader.ReadBoolean();
        this.m_mOffset.x = pReader.ReadSingle();
        this.m_mOffset.y = pReader.ReadSingle();
        this.m_mOffset.z = pReader.ReadSingle();
        this.m_mPosition.x = pReader.ReadSingle();
        this.m_mPosition.y = pReader.ReadSingle();
        this.m_mPosition.z = pReader.ReadSingle();
        this.m_mEulerAngles.x = pReader.ReadSingle();
        this.m_mEulerAngles.y = pReader.ReadSingle();
        this.m_mEulerAngles.z = pReader.ReadSingle();
        this.m_mLocalScale.x = pReader.ReadSingle();
        this.m_mLocalScale.y = pReader.ReadSingle();
        this.m_mLocalScale.z = pReader.ReadSingle();
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("ATexture.UnSerialize(): Bad end!");
        }
        this.m_bUpdated = true;
    }
    get collectionType() {
        return CollectionType.AHoleModel;
    }
    set desc(pDesc) {
        if (this.m_pDesc == null) {
            this.m_pDesc = pDesc;
            this.m_bUpdated = true;
        }
    }
    Inherit(pSrc) {
        let pSrcHole = pSrc;
        this.enabled = pSrcHole.enabled;
        this.flip = pSrcHole.flip;
        this.size = pSrcHole.size;
        this.offset = pSrcHole.offset;
        this.Apply();
        return true;
    }
    CreateObject(pObjectRoot, pPatchRoot) {
        if (this.m_pModel == null || pObjectRoot != null) {
            this.m_pModel = this.m_pDesc.m_pModel.CloneModel();
            let pHook = this.m_pModel.AddHook();
            pHook.attachment = this.attachment;
            pHook.SetLayer();
            this.attachment.hook = pHook;
        }
        if (this.model != null) {
            this.position = this.position;
            this.eulerAngles = this.eulerAngles;
            if (pObjectRoot != null) {
                this.model.parent = pObjectRoot;
            }
            this.model.SetActive(true);
        }
    }
    get enabled() {
        return this.m_bEnabled;
    }
    set enabled(bEnabled) {
        this.m_bEnabled = bEnabled;
        if (this.model != null) {
            this.model.SetActive(this.m_bEnabled);
        }
        if (this.patch != null) {
            this.patch.SetActive(this.m_bEnabled);
        }
    }
    get flip() {
        return this.m_bFlip;
    }
    set flip(bFlip) {
        this.m_bFlip = bFlip;
        this.eulerAngles = new Vector3(0.0, 57.29578 * (3.14159274 - this.m_mOffset.z) + (this.m_bFlip ? 180.0 : 0.0), 0.0);
    }
    get size() {
        return new Vector3(this.defaultSize.x * this.localScale.x, this.defaultSize.y * this.localScale.y, this.defaultSize.z * this.localScale.z);
    }
    set size(mSize) {
        this.localScale = new Vector3(mSize.x / this.defaultSize.x, mSize.y / this.defaultSize.y, mSize.z / this.defaultSize.z);
    }
    get defaultSize() {
        return this.m_pDesc == null ? new Vector3(1.0, 1.0, 1.0) : this.m_pDesc.m_mSize;
    }
    get offset() {
        return new Vector3(this.m_mOffset.x, this.m_mOffset.y, this.m_mOffset.z);
    }
    set offset(mOffset) {
        this.m_mOffset.x = mOffset.x;
        this.m_mOffset.y = mOffset.y;
        this.m_mOffset.z = mOffset.z;
        this.m_mEulerAngles = new Vector3(0.0, 57.29578 * (3.14159274 - this.m_mOffset.z) + (this.m_bFlip ? 180.0 : 0.0), 0.0);
    }
    get position() {
        return new Vector3(this.m_mPosition.x, this.m_mPosition.y, this.m_mPosition.z);
    }
    set position(mPosition) {
        this.m_mPosition.x = mPosition.x;
        this.m_mPosition.y = mPosition.y;
        this.m_mPosition.z = mPosition.z;
        if (this.model != null) {
            this.model.position = this.m_mPosition;
        }
        this.m_bUpdated = true;
    }
    get eulerAngles() {
        return new Vector3(this.m_mEulerAngles.x, this.m_mEulerAngles.y, this.m_mEulerAngles.z);
    }
    set eulerAngles(mAngles) {
        this.m_mEulerAngles.x = mAngles.x;
        this.m_mEulerAngles.y = mAngles.y;
        this.m_mEulerAngles.z = mAngles.z;
        if (this.model != null) {
            this.model.eulerAngles = this.m_mEulerAngles;
        }
        this.m_bUpdated = true;
    }
    get localScale() {
        return new Vector3(this.m_mLocalScale.x, this.m_mLocalScale.y, this.m_mLocalScale.z);
    }
    set localScale(mScale) {
        this.m_mLocalScale.x = mScale.x;
        this.m_mLocalScale.y = mScale.y;
        this.m_mLocalScale.z = mScale.z;
        if (this.model != null) {
            this.model.localScale = this.m_mLocalScale;
        }
        this.m_bUpdated = true;
    }
    get model() {
        return this.m_pModel;
    }
    get patch() {
        return this.m_pPatch;
    }
    set patch(pPatch) {
        this.m_pPatch = pPatch;
    }
}
class AHoleModelDesc {
    constructor() {
        this.m_nID = 0;
        this.m_nCategoryID = 0;
        this.m_pName = null;
        this.m_nDefaultHeight = 0.0;
        this.m_mSize = new Vector3(0.0, 0.0, 0.0);
        this.m_pModelUrl = null;
        this.m_pIconUrl = null;
        this.m_pModel = null;
        this.m_pModelType = null;
    }
    get version() {
        return 1001;
    }
    Init(jData) {
    }
    Destory() {
        this.m_pModel = null;
    }
    Load(pProgress, pCallback) {
        if (this.m_pModelUrl == null || this.m_pModelUrl.length < 1) {
            console.warn("URL为空，继续加载默认模型！");
        }
        let pThis = this;
        MiaokitDC.DC.m_pAssetsLoader.LoadModel(pThis.m_pModelUrl, function (pObject) {
            pThis.m_pModel = pObject;
            if (pThis.m_pModel != null) {
                pThis.m_pModel.m_pName = pThis.m_pName;
            }
            pCallback();
        });
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_nID = pReader.ReadInt32();
        this.m_nCategoryID = pReader.ReadInt32();
        this.m_pName = pReader.ReadString();
        this.m_nDefaultHeight = pReader.ReadSingle();
        this.m_mSize.x = pReader.ReadSingle();
        this.m_mSize.y = pReader.ReadSingle();
        this.m_mSize.z = pReader.ReadSingle();
        this.m_pModelUrl = pReader.ReadString();
        this.m_pIconUrl = pReader.ReadString();
        this.m_pModelType = pReader.ReadString();
        if (nVersion > 1000) {
            this.m_pModelUrl = pReader.ReadString();
        }
        else {
        }
        if (nVersion > 1001) {
            let m_pModelUrlPC = pReader.ReadString();
        }
        else {
            let m_pModelUrlPC = "";
        }
        if (nVersion > 1002) {
            let m_pModelNum = pReader.ReadString();
        }
        else {
            let m_pModelNum = "";
        }
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("AHoleModel.Desc.UnSerialize(): Bad end!");
        }
    }
    get id() {
        return this.m_nID;
    }
    get typeId() {
        return this.m_nCategoryID;
    }
    get name() {
        return this.m_pName;
    }
    get desc() {
        return "";
    }
    get iconUrl() {
        return this.m_pIconUrl;
    }
    get resource() {
        return this.m_pModel;
    }
}
class AEdgeModel {
    constructor(pDesc) {
        this.m_mAttachment = new Handle(Attachment, 0);
        this.m_pDesc = null;
        this.m_bUpdated = false;
        this.desc = pDesc;
    }
    get version() {
        return 1000;
    }
    get type() {
        return EntityType.Collection;
    }
    get attachment() {
        return this.m_mAttachment.Object;
    }
    set attachment(pAttachment) {
        this.m_mAttachment.Number = pAttachment.handle.Number;
        this.m_bUpdated = true;
    }
    get displayType() {
        return DisplayType.Normal;
    }
    set displayType(eType) {
    }
    get resource() {
        return null;
    }
    Remap(mHeap) {
        this.m_mAttachment.Heap = mHeap;
    }
    Apply() {
        if (this.m_bUpdated) {
            this.m_bUpdated = false;
        }
    }
    Destroy() {
        this.m_bUpdated = false;
        this.m_pDesc = null;
    }
    Clear() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mAttachment.Number = pReader.ReadUInt32();
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("AEdgeModel.UnSerialize(): Bad end!");
        }
        this.m_bUpdated = true;
    }
    get collectionType() {
        return CollectionType.AEdgeModel;
    }
    set desc(pDesc) {
        if (this.m_pDesc == null) {
            this.m_pDesc = pDesc;
            this.m_bUpdated = true;
        }
    }
    Inherit(pSrc) {
        return true;
    }
    PlaceModel1(pEdge, pObject) {
        let pLeft = pEdge.m_mLeftPoint.Object;
        let pRight = pEdge.m_mRightPoint.Object;
        this.PlaceModel_(pLeft.m_mPosition, pRight.m_mPosition, pEdge.m_nAngle, pObject.m_pObject);
    }
    PlaceModel2(pEdge, pHoleList, pObject) {
        let pPoint = [];
        let nCount = 0;
        pPoint[nCount] = Vector3.Clone(pEdge.m_mLeftPoint.Object.m_mPosition);
        nCount++;
        for (let pHole of pHoleList) {
            pPoint[nCount] = Vector3.Scale(0.5, Vector3.Add(pHole.m_aBottom[1], pHole.m_aBottom[5]));
            nCount++;
            pPoint[nCount] = Vector3.Scale(0.5, Vector3.Add(pHole.m_aBottom[2], pHole.m_aBottom[4]));
            nCount++;
        }
        pPoint[nCount] = Vector3.Clone(pEdge.m_mRightPoint.Object.m_mPosition);
        nCount++;
        for (let i = 0; i < nCount; i += 2) {
            this.PlaceModel_(pPoint[i], pPoint[i + 1], pEdge.m_nAngle, pObject.m_pObject);
        }
    }
    PlaceModel_(mLeft, mRight, nAngle, pHead) {
        let mScale = this.m_pDesc.m_mSize;
        let nLength = Vector3.Distance(mRight, mLeft);
        let nRatio = nLength / mScale.x;
        let nStepScale = mScale.x / nLength;
        let nSurplus = nRatio % 1;
        let nUnitHeight = mScale.y / 2.0;
        let nCount = Math.floor(nRatio);
        let mRotation = new Vector3(0.0, (Math.PI - nAngle), 0.0);
        let pHeader = pHead;
        for (let i = 0; i < nCount; i++) {
            let pObject = this.m_pDesc.m_pModel.m_pObject.clone();
            pObject.userData = null;
            if (i == nCount - 1 && nSurplus < 0.125) {
                let nLerp = nStepScale * (i + 0.5 + nSurplus * 0.5);
                let mCenter = Vector3.LerpVectors(mLeft, mRight, nLerp);
                mCenter.y = nUnitHeight;
                pObject.position.set(mCenter.x, mCenter.y, mCenter.z);
                pObject.scale.set((1.0 + nSurplus), 1.0, 1.0);
                pObject.rotation.set(mRotation.x, mRotation.y, mRotation.z);
            }
            else {
                let mCenter = Vector3.LerpVectors(mLeft, mRight, (nStepScale * (i + 0.5)));
                mCenter.y = nUnitHeight;
                pObject.position.set(mCenter.x, mCenter.y, mCenter.z);
                pObject.rotation.set(mRotation.x, mRotation.y, mRotation.z);
            }
            pHeader.add(pObject);
        }
        if (0.125 <= nSurplus) {
            let pObject = this.m_pDesc.m_pModel.m_pObject.clone();
            pObject.userData = null;
            let nLerp = nStepScale * (nCount + nSurplus * 0.5);
            let mCenter = Vector3.LerpVectors(mLeft, mRight, nLerp);
            mCenter.y = nUnitHeight;
            pObject.position.set(mCenter.x, mCenter.y, mCenter.z);
            pObject.scale.set(nSurplus, 1.0, 1.0);
            pObject.rotation.set(mRotation.x, mRotation.y, mRotation.z);
            pHeader.add(pObject);
        }
        return pHeader;
    }
}
class AEdgeModelDesc {
    constructor() {
        this.m_nID = 0;
        this.m_nCategoryID = 0;
        this.m_pName = null;
        this.m_mSize = new Vector3(0.0, 0.0, 0.0);
        this.m_pModelUrl = null;
        this.m_pIconUrl = null;
        this.m_pModel = null;
        this.m_pModelType = null;
    }
    get version() {
        return 1001;
    }
    Init(jData) {
    }
    Destory() {
        this.m_pModel = null;
    }
    Load(pProgress, pCallback) {
        if (this.m_pModelUrl == null || this.m_pModelUrl.length < 1) {
            pCallback(null);
            return;
        }
        let pThis = this;
        MiaokitDC.DC.m_pAssetsLoader.LoadModel(pThis.m_pModelUrl, function (pObject) {
            pThis.m_pModel = pObject;
            pThis.m_pModel.m_pName = pThis.m_pName;
            pCallback();
        });
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_nID = pReader.ReadInt32();
        this.m_nCategoryID = pReader.ReadInt32();
        this.m_pName = pReader.ReadString();
        this.m_mSize.x = pReader.ReadSingle();
        this.m_mSize.y = pReader.ReadSingle();
        this.m_mSize.z = pReader.ReadSingle();
        this.m_pModelUrl = pReader.ReadString();
        this.m_pIconUrl = pReader.ReadString();
        this.m_pModelType = pReader.ReadString();
        if (nVersion > 1000) {
            this.m_pModelUrl = pReader.ReadString();
        }
        else {
        }
        if (nVersion > 1001) {
            let m_pModelUrlPC = pReader.ReadString();
        }
        else {
            let m_pModelUrlPC = "";
        }
        if (nVersion > 1002) {
            let m_pModelNum = pReader.ReadString();
        }
        else {
            let m_pModelNum = "";
        }
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("AHoleModel.Desc.UnSerialize(): Bad end!");
        }
    }
    get id() {
        return this.m_nID;
    }
    get typeId() {
        return this.m_nCategoryID;
    }
    get name() {
        return this.m_pName;
    }
    get desc() {
        return "";
    }
    get iconUrl() {
        return this.m_pIconUrl;
    }
    get resource() {
        return this.m_pModel;
    }
}
class ALinerDC {
    constructor(nIndex, pReader) {
        this.m_pLayerMgr = null;
        this.m_mTempPointHeap = null;
        this.m_mTempAdjoinHeap = null;
        this.m_mTempEdgeHeap = null;
        let pThis = this;
        this.m_pLayerMgr = new ALinerMgr(nIndex);
        this.m_mTempPointHeap = new HeapHandle(APoint, 255);
        this.m_mTempAdjoinHeap = new HeapHandle(AAdjoin, 255);
        this.m_mTempEdgeHeap = new HeapHandle(AEdge, 255);
        this.ResetTempHeap();
        if (pReader != null) {
            let pOldDC = ALinerDC.DC;
            ALinerDC.DC = this;
            this.UnSerialize(pReader);
            ALinerDC.DC = pOldDC;
        }
    }
    Update() {
        if (this.m_pLayerMgr.m_pOutModel) {
            this.m_pLayerMgr.m_pOutModel.Update();
        }
    }
    OnGUI() {
    }
    OnViewModeChange() {
        this.m_pLayerMgr.FitViewMode();
    }
    ActiveLayer(nIndex) {
        this.ResetTempHeap();
        this.m_pLayerMgr.ActiveLayer(nIndex);
    }
    StackUp(bActive) {
        ALinerDC.g_bStackUp = bActive;
        this.ActiveLayer(this.m_pLayerMgr.m_pActiveLayer.m_nIndex);
    }
    version() {
        return 1000;
    }
    Active(bActive) {
        if (bActive) {
            if (this.m_pLayerMgr.m_pSceneRoot == null) {
                this.m_pLayerMgr.BuildScene();
            }
        }
        this.m_pLayerMgr.Active(bActive);
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_pLayerMgr.UnSerialize(pReader);
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("ALinerDC.UnSerialize(): Bad end!");
        }
    }
    ResetTempHeap() {
        this.m_mTempPointHeap.InitHeap(null);
        this.m_mTempAdjoinHeap.InitHeap(null);
        this.m_mTempEdgeHeap.InitHeap(null);
    }
}
ALinerDC.DC = null;
ALinerDC.g_bStackUp = false;
class ALinerMgr {
    constructor(nWork) {
        this.m_nWork = 0;
        this.m_pSceneRoot = null;
        this.m_pLayerList = null;
        this.m_pDelegateList = null;
        this.m_pPlanMgr = null;
        this.m_pOutModel = null;
        this.m_nWork = nWork;
        this.m_pActiveLayer = null;
        this.m_pSceneRoot = null;
        this.m_pLayerList = new Array();
        this.m_pDelegateList = new Array();
    }
    version() {
        return 1000;
    }
    Active(bActive) {
        if (this.m_pSceneRoot != null) {
            this.m_pSceneRoot.SetActive(bActive);
        }
    }
    ActiveLayer(nIndex) {
        this.StackUp(nIndex);
        return;
        let pLayer = this.m_pLayerList[nIndex];
        if (this.m_pActiveLayer != null && this.m_pActiveLayer.m_pLayerRoot != null) {
            this.m_pActiveLayer.m_pLayerRoot.SetActive(false);
        }
        this.m_pActiveLayer = pLayer;
        if (this.m_pSceneRoot != null && this.m_pActiveLayer.m_pLayerRoot != null) {
            this.m_pActiveLayer.m_pLayerRoot.SetActive(true);
            this.FitViewMode();
        }
        if (this.m_pPlanMgr) {
            this.m_pPlanMgr.ActiveLayer(nIndex);
        }
    }
    StackUp(nFocus) {
        let nLength = this.m_pLayerList.length;
        let nIndex = 0;
        for (let i = -nFocus; i < nLength - nFocus; i++) {
            let pLayer = this.m_pLayerList[nIndex++];
            if (pLayer != null) {
                let mPosition = pLayer.m_pLayerRoot.position;
                mPosition.y = 16.0 * i;
                pLayer.m_pLayerRoot.position = mPosition;
                pLayer.m_pLayerRoot.m_pObject.updateMatrixWorld();
                if (0 == i) {
                    if (Engine.g_pInstance.m_pProjectIdent == "EAM") {
                        if (this.m_pActiveLayer != pLayer)
                            pLayer.ActiveScene(1);
                        this.m_pActiveLayer = pLayer;
                        this.FitViewMode();
                    }
                    else {
                        pLayer.ActiveScene(1);
                        this.m_pActiveLayer = pLayer;
                        this.FitViewMode();
                    }
                }
                else {
                    if (!ALinerDC.g_bStackUp) {
                        pLayer.ActiveScene(0);
                    }
                    else {
                        pLayer.ActiveScene(2);
                    }
                }
            }
        }
    }
    GetLayer(nIndex) {
        if (nIndex < this.m_pLayerList.length) {
            return this.m_pLayerList[nIndex];
        }
        return null;
    }
    GetLayersLenth() {
        return this.m_pLayerList.length;
    }
    BuildScene() {
        console.warn("ALinerMgr.BuildScene(): Invalid.");
    }
    FitViewMode() {
        if (this.m_pSceneRoot != null && this.m_pActiveLayer != null) {
            this.m_pActiveLayer.m_pPatchRoot.SetActive(MiaokitDC.DC.viewMode == ViewMode.View2D);
        }
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        this.m_pSceneRoot = new GameObject("-ALiner Root", GameObjectType.Empty);
        this.m_pSceneRoot.parent = MiaokitDC.DC.GetWork(this.m_nWork).m_pWorkRoot;
        let nVersion = pReader.ReadUInt32();
        let nCount = pReader.ReadInt32();
        for (let i = 0; i < nCount; i++) {
            let pLayer = ALiner.Create(pReader);
            pLayer.m_nWork = this.m_nWork;
            pLayer.m_nIndex = i;
            pLayer.BuildScene(this.m_pSceneRoot);
            this.m_pLayerList.push(pLayer);
        }
        if (Engine.g_pInstance.m_pProjectIdent === "EAM") {
        }
        else {
            if (Engine.g_pInstance.m_pExtraConfig.HasOutModel && this.m_nWork == 0) {
                console.error("上海会展项目定制代码：外景模型");
                this.m_pOutModel = new MyModel(this.m_pSceneRoot);
            }
        }
        let pDelegateList = this.m_pDelegateList;
        MiaokitDC.DC.m_pAssetsLoader.PushDelegate(this.m_nWork, function () {
            for (let pDelegate of pDelegateList) {
                pDelegate();
            }
        });
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("ALinerMgr.UnSerialize(): Bad end!");
        }
    }
    LoadExterior() {
        if (Engine.g_pInstance.m_pProjectIdent === "EAM") {
        }
        else {
            if (Engine.g_pInstance.m_pExtraConfig.HasOutModel && this.m_nWork == 0) {
                console.error("上海会展项目定制代码：外景模型");
                this.m_pOutModel = new MyModel(this.m_pSceneRoot);
            }
        }
    }
}
class ALiner {
    constructor() {
        this.m_mPointHeap = new HeapHandle(APoint, 0);
        this.m_mAdjoinHeap = new HeapHandle(AAdjoin, 0);
        this.m_mEdgeHeap = new HeapHandle(AEdge, 0);
        this.m_mMenuItemHeap = new HeapHandle(MenuItem, 0);
        this.m_mAttachmentHeap = new HeapHandle(Attachment, 0);
        this.m_pLabelList = new Array();
        this.m_pLayerRoot = null;
        this.m_pPointRoot = null;
        this.m_pPatchRoot = null;
        this.m_pEdgeRoot = null;
        this.m_pBottomRoot = null;
        this.m_pTopRoot = null;
        this.m_aEdgeMeshData = null;
        this.m_aEdgeMesh = null;
    }
    version() {
        return 1000;
    }
    Rebuild() {
        if (this.m_mMenuItemHeap.Count != 0) {
            for (let pItem of this.m_mMenuItemHeap) {
                if (MiaokitDC.DC.BindMenuType(pItem)) {
                    pItem.type.Add(pItem, this);
                }
                else {
                    pItem.type = MiaokitDC.DC.m_pCategories;
                    pItem.type.Add(pItem, this);
                }
                MiaokitDC.DC.m_pAssetsLoader.PushItem(pItem);
            }
        }
        if (this.m_mAttachmentHeap.Count != 0) {
            for (let pAttachment of this.m_mAttachmentHeap) {
                if (this.Construct(pAttachment) == null) {
                    pAttachment.valid = false;
                    console.warn("ALiner.Rebuild(): Construct(pAttachment) == null");
                }
            }
        }
    }
    Construct(pAttachment) {
        let pItem = pAttachment.menuItem.Object;
        if (pItem != null) {
            let pEntity = pAttachment.entity;
            if (pEntity != null) {
                switch (pEntity.collectionType) {
                    case CollectionType.ATexture:
                    case CollectionType.AHoleModel:
                    case CollectionType.AEdgeModel:
                        pEntity.desc = pItem.collectionDesc;
                        break;
                    default:
                        pAttachment = null;
                        alert("ALiner.Construct(): !pEntity.collectionType.");
                        break;
                }
                if (pAttachment != null) {
                    pItem.refCount++;
                }
                return pAttachment;
            }
            else {
                alert("ALiner.Construct(): pEntity == null.");
            }
        }
        else {
            alert("ALiner.Construct(): pItem == null.");
        }
        return null;
    }
    BuildScene(pSceneRoot) {
        if (pSceneRoot != null) {
            let pThis = this;
            this.m_pLayerRoot = new GameObject("--LayerRoot", GameObjectType.Empty);
            this.m_pPointRoot = new GameObject("--PointRoot", GameObjectType.Empty);
            this.m_pPatchRoot = new GameObject("--PatchRoot", GameObjectType.Empty);
            this.m_pEdgeRoot = new GameObject("---EdgeRoot", GameObjectType.Empty);
            this.m_pBottomRoot = new GameObject("---BottomRoot", GameObjectType.Empty);
            this.m_pTopRoot = new GameObject("---TopRoot", GameObjectType.Empty);
            this.m_pLayerRoot.parent = pSceneRoot;
            this.m_pPointRoot.parent = this.m_pLayerRoot;
            this.m_pPointRoot.position = new Vector3(0.0, 10.0, 0.0);
            this.m_pPatchRoot.parent = this.m_pLayerRoot;
            this.m_pPatchRoot.position = new Vector3(0.0, 10.0, 0.0);
            this.m_pEdgeRoot.parent = this.m_pLayerRoot;
            this.m_pBottomRoot.parent = this.m_pLayerRoot;
            this.m_pTopRoot.parent = this.m_pLayerRoot;
            this.m_pLayerRoot.SetActive(false);
            if (ALiner.g_aMeshBuilder == null) {
                ALiner.g_aMeshBuilder = [null, null, null, null, null];
                for (let i = 0; i < 5; i++) {
                    ALiner.g_aMeshBuilder[i] = new AMeshBuilder();
                }
            }
            for (let i = 0; i < 5; i++) {
                ALiner.g_aMeshBuilder[i].Clear();
            }
            let mEdgeList = this.m_mEdgeHeap.GetDefaultList();
            for (let pEdge of mEdgeList) {
                pEdge.CreateGeometry(this);
                let pModels = pEdge.m_pMesh.m_pModels;
                if (pModels) {
                    pModels.parent = pThis.m_pEdgeRoot;
                }
            }
            this.BuildEdgeMesh();
            for (let pArea of this.m_pLabelList) {
                if (pArea.m_pArea != null && pArea.m_pName != "delete") {
                    pArea.m_pArea.CreateGeometry(this.m_pBottomRoot);
                    pArea.m_pArea.MapTexture(0, pArea.m_mBottomTexture.Object);
                }
            }
            ALinerDC.DC.m_pLayerMgr.m_pDelegateList.push(function () {
                for (let pEdge of mEdgeList) {
                    if (pEdge.m_pMesh != null) {
                        pEdge.m_pMesh.PlaceHole(pThis.m_pEdgeRoot, pThis.m_pPatchRoot);
                    }
                }
            });
        }
    }
    BuildEdgeMesh() {
        if (this.m_aEdgeMeshData != null || this.m_aEdgeMesh != null) {
            alert("ALiner.BuildEdgeMesh(): this.m_aEdgeMeshData != null || this.m_aEdgeSubMesh != null.");
        }
        this.m_aEdgeMeshData = [null, null, null, null, null];
        this.m_aEdgeMesh = [null, null, null, null, null];
        let aMaterialType = [MaterialType.Edge, MaterialType.Edge, MaterialType.Border, MaterialType.Inborder, MaterialType.AreaBottomShadow];
        for (let i = 0; i < 5; i++) {
            this.m_aEdgeMeshData[i] = ALiner.g_aMeshBuilder[i].GetMeshData();
            this.m_aEdgeMesh[i] = new GameObject("Edge: " + i, GameObjectType.Mesh);
            this.m_aEdgeMesh[i].parent = this.m_pEdgeRoot;
            if (this.m_aEdgeMeshData[i] != null) {
                this.m_aEdgeMesh[i].SetGeometry(this.m_aEdgeMeshData[i], new Material(aMaterialType[i]));
                this.m_aEdgeMesh[i].SetActive(true);
            }
            else {
                this.m_aEdgeMesh[i].SetActive(false);
            }
            ALiner.g_aMeshBuilder[i].Clear();
        }
    }
    ActiveScene(nType) {
        if (this.m_pLayerRoot) {
            if (0 == nType) {
                this.m_pLayerRoot.SetActive(false);
            }
            else {
                this.m_pLayerRoot.SetActive(true);
                if (1 == nType) {
                    for (let i = 0; i < 4; i++) {
                        this.m_aEdgeMesh[i].m_pObject.material.opacity = 1;
                        this.m_aEdgeMesh[i].m_pObject.material.transparent = false;
                        this.m_aEdgeMesh[i].m_pObject.material.needsUpdate = true;
                    }
                    for (let pArea of this.m_pLabelList) {
                        if (pArea.m_pArea && pArea.m_pArea.m_pBottomMesh) {
                            pArea.m_pArea.m_pBottomMesh.m_pObject.material.opacity = 1;
                            pArea.m_pArea.m_pBottomMesh.m_pObject.material.transparent = false;
                            pArea.m_pArea.m_pBottomMesh.m_pObject.material.color = new THREE.Color(1.0, 1.0, 1.0, 1.0);
                            pArea.m_pArea.m_pBottomMesh.m_pMaterial.SetTexture(0, pArea.m_pArea.m_pTexture);
                            pArea.m_pArea.m_pBottomMesh.m_pMaterial.m_pMaterial.needsUpdate = true;
                        }
                    }
                }
                else {
                    for (let i = 0; i < 5; i++) {
                        this.m_aEdgeMesh[i].m_pObject.material.opacity = 0.3;
                        this.m_aEdgeMesh[i].m_pObject.material.transparent = true;
                        this.m_aEdgeMesh[i].m_pObject.material.needsUpdate = true;
                    }
                    for (let pArea of this.m_pLabelList) {
                        if (pArea.m_pArea && pArea.m_pArea.m_pBottomMesh) {
                            pArea.m_pArea.m_pBottomMesh.m_pObject.material.opacity = 0.3;
                            pArea.m_pArea.m_pBottomMesh.m_pObject.material.transparent = true;
                            let nGray = Math.random();
                            pArea.m_pArea.m_pBottomMesh.m_pObject.material.color = new THREE.Color(nGray, nGray, nGray, 1.0);
                            pArea.m_pArea.m_pBottomMesh.m_pMaterial.SetTexture(0, null);
                            pArea.m_pArea.m_pBottomMesh.m_pMaterial.m_pMaterial.needsUpdate = true;
                        }
                    }
                }
            }
        }
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mPointHeap.Number = pReader.ReadUInt32();
        this.m_mAdjoinHeap.Number = pReader.ReadUInt32();
        this.m_mEdgeHeap.Number = pReader.ReadUInt32();
        this.m_mMenuItemHeap.Number = pReader.ReadUInt32();
        this.m_mAttachmentHeap.Number = pReader.ReadUInt32();
        this.m_mPointHeap.InitHeap(pReader);
        this.m_mAdjoinHeap.InitHeap(pReader);
        this.m_mEdgeHeap.InitHeap(pReader);
        this.m_mMenuItemHeap.InitHeap(pReader);
        this.m_mAttachmentHeap.InitHeap(pReader);
        let nCount = pReader.ReadInt32();
        if (this.m_pLabelList == null) {
            this.m_pLabelList = new Array();
        }
        for (let i = 0; i < nCount; i++) {
            let pLabel = new AAreaLabel();
            pLabel.UnSerialize(pReader);
            this.m_pLabelList.push(pLabel);
        }
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("ALiner.UnSerialize(): Bad end!");
        }
        this.Rebuild();
    }
    static Create(pReader = null) {
        let pLiner = new ALiner();
        if (pReader != null) {
            pLiner.UnSerialize(pReader);
        }
        else {
            pLiner.m_mPointHeap = new HeapHandle(APoint, 0);
            pLiner.m_mAdjoinHeap = new HeapHandle(AAdjoin, 0);
            pLiner.m_mEdgeHeap = new HeapHandle(AEdge, 0);
            pLiner.m_mMenuItemHeap = new HeapHandle(MenuItem, 0);
            pLiner.m_mAttachmentHeap = new HeapHandle(Attachment, 0);
            pLiner.m_mPointHeap.InitHeap();
            pLiner.m_mAdjoinHeap.InitHeap();
            pLiner.m_mEdgeHeap.InitHeap();
            pLiner.m_mMenuItemHeap.InitHeap();
            pLiner.m_mAttachmentHeap.InitHeap();
        }
        return pLiner;
    }
}
ALiner.g_aMeshBuilder = null;
class APlanMgr {
    constructor() {
        this.m_pObject = null;
        this.m_aPlan = [];
        this.m_pActivePlan = null;
    }
    Init(pFileName, pParent, pCallback) {
        let pThis = this;
        ALinerDC.DC.m_pLayerMgr.m_pDelegateList.push(function () {
            MiaokitDC.DC.m_pAssetsLoader.LoadModel(pFileName, function (pObject) {
                pThis.m_pObject = pObject;
                pThis.m_pObject.SetActive(true);
                pThis.m_pObject.SetParent(pParent, true);
                pThis.m_pObject.m_pObject.scale.z *= -1;
                let pChildren = pThis.m_pObject.m_pObject.children;
                let nCount = pChildren.length;
                for (let i = 0; i < nCount; i++) {
                    if (pChildren[i].name.indexOf('F') > -1) {
                        let pPlan = new APlan(pChildren[i]);
                        pPlan.Active(false);
                        pThis.m_aPlan.push(pPlan);
                    }
                }
                MiaokitDC.g_pScene.updateMatrixWorld(true);
                pCallback();
            });
        });
    }
    ActiveLayer(nIndex) {
        if (this.m_pActivePlan) {
            this.m_pActivePlan.Active(false);
            this.m_pActivePlan = null;
        }
        this.m_pActivePlan = this.m_aPlan[nIndex];
        this.m_pActivePlan.Active(true);
    }
    HighLight(pName) {
        if (this.m_pActivePlan) {
            this.m_pActivePlan.HighLight(pName);
        }
    }
}
APlanMgr.g_pFlushTiles = null;
class APlan {
    constructor(pObject) {
        this.m_pObject = null;
        this.m_aTile = [];
        this.m_aName = [];
        this.m_pActiveTile = null;
        this.m_pObject = pObject;
        let pChildren = pObject.children;
        let nCount = pChildren.length;
        for (let i = 0; i < nCount; i++) {
            this.m_aTile[i] = new ATile(pChildren[i]);
            this.m_aName[i] = this.m_aTile[i].m_nName;
        }
    }
    Active(bActive) {
        this.m_pObject.visible = bActive;
        this.Reset();
        if (bActive) {
            APlanMgr.g_pFlushTiles(this.m_aName);
        }
    }
    Reset() {
        for (let pTile of this.m_aTile) {
            pTile.Show(1);
        }
        this.m_pActiveTile = null;
    }
    HighLight(pName) {
        if (this.m_pActiveTile != null) {
            this.m_pActiveTile.Show(0);
            this.m_pActiveTile = null;
        }
        else {
            for (let pTile of this.m_aTile) {
                pTile.Show(0);
            }
        }
        for (let pTile of this.m_aTile) {
            if (pTile.m_nName == pName) {
                this.m_pActiveTile = pTile;
                this.m_pActiveTile.Show(1);
                break;
            }
        }
    }
}
class ATile {
    constructor(pObject) {
        this.m_pObject = null;
        this.m_nName = "";
        this.m_pObject = pObject;
        this.m_nName = pObject.name;
    }
    Show(nType) {
        if (nType == 0) {
            this.m_pObject.material.color = new THREE.Color(0.5, 0.5, 0.5);
        }
        else {
            this.m_pObject.material.color = new THREE.Color(1.0, 1.0, 1.0);
        }
    }
}
class Handle {
    constructor(CLASS, nDataID) {
        this.m_nDataID = 0;
        this.CLASS = undefined;
        this.m_nDataID = nDataID;
        this.CLASS = CLASS;
    }
    set Heap(pHeap) {
        if (this.m_nDataID != 0) {
            this.m_nDataID = (this.m_nDataID & 0xFFFFFF00) + (pHeap.Number & 0x000000FF);
        }
    }
    Destroy() {
        let pHeap = this.CLASS.g_pContext.GetHeap(this.m_nDataID);
        if (null != pHeap) {
            pHeap.Delete(this.m_nDataID);
        }
    }
    Transfer(pList) {
        let pHeap = this.CLASS.g_pContext.GetHeap(this.m_nDataID);
        if (null != pHeap) {
            return pHeap.Transfer(this.m_nDataID, pList.Number);
        }
        return false;
    }
    get Object() {
        let pHeap = this.CLASS.g_pContext.GetHeap(this.m_nDataID);
        if (null != pHeap) {
            return pHeap.Get(this.m_nDataID);
        }
        return null;
    }
    get Number() {
        return this.m_nDataID;
    }
    set Number(nDataID) {
        this.m_nDataID = nDataID;
    }
    Equals(pHandle) {
        if (pHandle != null) {
            return this.Number == pHandle.Number;
        }
        return null;
    }
}
class ListHandle {
    constructor(CLASS, nListID) {
        this.m_nListID = 0;
        this.CLASS = undefined;
        this.m_nListID = nListID;
        this.CLASS = CLASS;
    }
    set Heap(pHeap) {
        if (this.m_nListID != 0) {
            this.m_nListID = (this.m_nListID & 0xFFFFFF00) + (pHeap.Number & 0x000000FF);
        }
    }
    CreateData(nIndex = 0, pInitData = null) {
        let pHeap = this.CLASS.g_pContext.GetHeap(this.m_nListID);
        let nDataID = 0;
        if (null != pHeap) {
            nDataID = pHeap.CreateData(this.m_nListID, nIndex, pInitData);
        }
        return new Handle(this.CLASS, nDataID);
    }
    get Count() {
        let pHeap = this.CLASS.g_pContext.GetHeap(this.m_nListID);
        if (null != pHeap) {
            return pHeap.Count(this.m_nListID);
        }
        return 0;
    }
    get Valid() {
        let pHeap = this.CLASS.g_pContext.GetHeap(this.m_nListID);
        if (null != pHeap) {
            return pHeap.Valid(this.m_nListID);
        }
        return false;
    }
    Destroy() {
        let pHeap = this.CLASS.g_pContext.GetHeap(this.m_nListID);
        if (null != pHeap && this.m_nListID > 256) {
            pHeap.Delete(this.m_nListID);
        }
    }
    get Number() {
        return this.m_nListID;
    }
    set Number(nListID) {
        this.m_nListID = nListID;
    }
    [Symbol.iterator]() {
        let pHeap = this.CLASS.g_pContext.GetHeap(this.m_nListID);
        const pEntries = pHeap != null ? pHeap.m_aEntries : null;
        let nBegin = pEntries == null ? 0 : pEntries[this.m_nListID >> 8].m_nNext;
        let nIndex = 0;
        return {
            next() {
                if (pEntries != null) {
                    nIndex = nIndex == 0 ? nBegin : pEntries[nIndex].m_nNext;
                    if (nIndex > 0) {
                        return {
                            value: pEntries[nIndex].m_pData,
                            done: false
                        };
                    }
                }
                return {
                    value: undefined,
                    done: true
                };
            }
        };
    }
}
class HeapHandle {
    constructor(CLASS, nHeapID = 0) {
        this.m_nHeapID = 0;
        this.m_pHeap = null;
        this.CLASS = undefined;
        this.m_nHeapID = 0x000000FF & nHeapID;
        this.m_pHeap = null;
        this.CLASS = CLASS;
    }
    InitHeap(pReader = null) {
        if (0 == (this.m_nHeapID >> 8)) {
            this.m_nHeapID = this.CLASS.g_pContext.CreateHeap(this.m_nHeapID);
        }
        if (this.m_nHeapID > 0xFFFFFF00) {
            this.m_pHeap = this.CLASS.g_pContext.InitHeap(this.m_nHeapID, pReader);
            return true;
        }
        return false;
    }
    CreateData(nIndex = 0, pInitData = null) {
        let nDataID = 0;
        if (null != this.m_pHeap) {
            nDataID = this.m_pHeap.CreateData(0, nIndex, pInitData);
        }
        return new Handle(this.CLASS, nDataID);
    }
    CreateList() {
        let nListID = 0;
        if (null != this.m_pHeap) {
            nListID = this.m_pHeap.CreateList();
        }
        return new ListHandle(this.CLASS, nListID);
    }
    GetDefaultList() {
        return new ListHandle(this.CLASS, this.m_nHeapID & 0x000000FF);
    }
    Serialize(pWriter) {
        if (null != this.m_pHeap) {
            this.m_pHeap.Serialize(pWriter);
        }
    }
    Destroy() {
        if (null != this.m_pHeap) {
            this.m_pHeap.Destroy();
            this.m_pHeap = null;
        }
    }
    get Count() {
        if (null != this.m_pHeap) {
            return this.m_pHeap.m_nDataNum;
        }
        return 0;
    }
    get ListCount() {
        if (null != this.m_pHeap) {
            return this.m_pHeap.m_nListNum;
        }
        return 0;
    }
    get Number() {
        return this.m_nHeapID;
    }
    set Number(nHeapID) {
        this.m_nHeapID = 0x000000FF & nHeapID;
        this.m_pHeap = null;
    }
    [Symbol.iterator]() {
        const pEntries = this.m_pHeap != null ? this.m_pHeap.m_aEntries : null;
        let nIndex = 0;
        return {
            next() {
                if (pEntries != null) {
                    nIndex++;
                    while (nIndex < pEntries.length) {
                        if (pEntries[nIndex].m_pData != null) {
                            return {
                                value: pEntries[nIndex].m_pData,
                                done: false
                            };
                        }
                        nIndex++;
                    }
                }
                return {
                    value: undefined,
                    done: true
                };
            }
        };
    }
}
class HeapContext {
    constructor(CLASS) {
        this.m_nHeapNum = 0;
        this.m_aHeap = new Array(256);
        this.CLASS = CLASS;
    }
    CreateHeap(nExpectID) {
        nExpectID &= 0xFF;
        if (255 == this.m_nHeapNum) {
            return 0xFFFFFF00;
        }
        if (0 != nExpectID && null == this.m_aHeap[nExpectID]) {
            this.m_aHeap[nExpectID] = this.NewHeap();
            this.m_nHeapNum++;
            nExpectID |= 0xFFFFFF00;
            return nExpectID >>> 0;
        }
        if (nExpectID > 0) {
            console.warn("HeapContext.CreateHeap(): !nExpectID.", nExpectID);
        }
        for (let i = 1; i < 256; ++i) {
            if (null == this.m_aHeap[i]) {
                this.m_aHeap[i] = this.NewHeap();
                this.m_nHeapNum++;
                return (0xFFFFFF00 + i) >>> 0;
            }
        }
        return 0xFFFFFF00;
    }
    InitHeap(nHeapID, pReader = null) {
        nHeapID &= 0x000000FF;
        let mHeap = this.m_aHeap[nHeapID];
        if (null != mHeap) {
            if (0 == mHeap.m_nHeapID) {
                mHeap.m_nHeapID = nHeapID;
                mHeap.UnSerialize(pReader);
                return mHeap;
            }
            else if (nHeapID == mHeap.m_nHeapID) {
                mHeap.m_nCurID = 1;
                mHeap.m_nCapacity = 1;
                mHeap.m_nDataNum = 0;
                mHeap.m_nListNum = 0;
                mHeap.m_aEntries = null;
                mHeap.UnSerialize(pReader);
                return mHeap;
            }
        }
        return null;
    }
    GetHeap(nHeapID) {
        return this.m_aHeap[nHeapID & 0x000000FF];
    }
    SwitchState(aState) {
        if (aState == null) {
            aState = new Array(256);
        }
        let aOldState = this.m_aHeap;
        this.m_aHeap = aState;
        this.m_nHeapNum = 0;
        for (let i = 0; i < 256; i++) {
            if (this.m_aHeap[i] != null) {
                ++this.m_nHeapNum;
            }
        }
        return aOldState;
    }
    NewObject() {
        return new this.CLASS();
    }
    NewHeap() {
        return new ObjectHeap(this);
    }
}
class ObjectHeap {
    constructor(pContext) {
        this.m_nHeapID = 0;
        this.m_nCurID = 1;
        this.m_nCapacity = 1;
        this.m_nDataNum = 0;
        this.m_nListNum = 1;
        this.m_aEntries = null;
        this.m_pContext = null;
        this.m_pContext = pContext;
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        if (pReader == null) {
            return;
        }
        if (this.m_nHeapID != pReader.ReadUInt32()) {
            console.info("ObjectHeap.UnSerialize(): m_nHeapID != pReader.ReadUInt32()");
        }
        this.m_nCurID = pReader.ReadUInt32();
        this.m_nCapacity = pReader.ReadUInt32();
        this.m_nDataNum = pReader.ReadInt32();
        this.m_nListNum = pReader.ReadInt32();
        if (this.m_nCapacity == 1) {
            if (0xFFFFFFFF != pReader.ReadUInt32()) {
                alert("ObjectHeap.UnSerialize(): 0xFFFFFFFF != pReader.ReadUInt32()");
            }
            return;
        }
        this.m_aEntries = new Array(this.m_nCapacity);
        for (let i = 0; i < this.m_nCapacity; i++) {
            this.m_aEntries[i] = new HeapEntry();
        }
        let nCount = 0;
        let nCurID = pReader.ReadUInt32();
        while (nCurID != 0xFFFFFFFF) {
            this.m_aEntries[nCurID].m_nIndex = pReader.ReadUInt32();
            this.m_aEntries[nCurID].m_nLast = pReader.ReadUInt32();
            this.m_aEntries[nCurID].m_nNext = pReader.ReadUInt32();
            if (this.m_aEntries[nCurID].m_nLast != 0xFFFFFFFF) {
                this.m_aEntries[nCurID].m_pData = this.m_pContext.NewObject();
                this.m_aEntries[nCurID].m_pData.UnSerialize(pReader);
                this.m_aEntries[nCurID].m_pData.OnEmploy(this.m_nHeapID + (nCurID << 8));
            }
            ++nCount;
            nCurID = pReader.ReadUInt32();
        }
        if (nCount != this.m_nDataNum + this.m_nListNum) {
            alert("ObjectHeap.UnSerialize(): nCount != this.m_nDataNum + this.m_nListNum.");
        }
        for (let i = 1; i < this.m_nCapacity; i++) {
            if (this.m_aEntries[i].m_nLast != 0xFFFFFFFF && this.m_aEntries[i].m_pData == null) {
                let nLastID = i;
                this.m_nCurID = i;
                for (let j = i + 1; j < this.m_nCapacity; j++) {
                    if (this.m_aEntries[j].m_nLast != 0xFFFFFFFF && this.m_aEntries[j].m_pData == null) {
                        this.m_aEntries[nLastID].m_nIndex = j;
                        nLastID = j;
                    }
                }
                this.m_aEntries[nLastID].m_nIndex = this.m_nCapacity;
                break;
            }
        }
    }
    Destroy() {
        if (this.m_pContext.m_aHeap[this.m_nHeapID] != this) {
            alert("ObjectHeap.Destroy(): this.m_pContext.m_aHeap[this.m_nHeapID] != this.");
            return;
        }
        this.m_pContext.m_aHeap[this.m_nHeapID] = null;
        this.m_pContext.m_nHeapNum--;
    }
    Get(nID) {
        nID >>= 8;
        if (nID < this.m_nCapacity && 0xFFFFFFFF != this.m_aEntries[nID].m_nLast) {
            return this.m_aEntries[nID].m_pData;
        }
        return null;
    }
    Count(nListID) {
        nListID >>= 8;
        if (nListID < this.m_nCapacity && this.m_aEntries != null && 0xFFFFFFFF == this.m_aEntries[nListID].m_nLast) {
            return this.m_aEntries[nListID].m_nIndex;
        }
        return 0;
    }
    Valid(nListID) {
        nListID >>= 8;
        if (nListID < this.m_nCapacity && 0xFFFFFFFF == this.m_aEntries[nListID].m_nLast) {
            return true;
        }
        return false;
    }
    CreateData(nList, nIndex, pInitData) {
        nList >>= 8;
        if ((nList != 0) && (nList >= this.m_nCapacity || 0xFFFFFFFF != this.m_aEntries[nList].m_nLast)) {
            return 0;
        }
        let nCurID = this.CreateID(nList, nIndex);
        let nDataID = this.m_nHeapID + (nCurID << 8);
        if (null == pInitData) {
            pInitData = this.m_pContext.NewObject();
            pInitData.OnCreate(nDataID);
        }
        this.m_aEntries[nCurID].m_pData = pInitData;
        pInitData.OnEmploy(nDataID);
        this.m_nDataNum++;
        return nDataID;
    }
    CreateList() {
        let nCurID = this.CreateID(0xFFFFFFFF, 0);
        let nDataID = this.m_nHeapID + (nCurID << 8);
        this.m_nListNum++;
        return nDataID;
    }
    Delete(nID) {
        nID >>= 8;
        if (nID < this.m_nCapacity && (null != this.m_aEntries[nID].m_pData || 0xFFFFFFFF == this.m_aEntries[nID].m_nLast)) {
            if (0xFFFFFFFF == this.m_aEntries[nID].m_nLast) {
                let nNext = this.m_aEntries[nID].m_nNext;
                while (0 < nNext) {
                    this.m_aEntries[nNext].m_pData.OnUnemploy();
                    this.DeleteID(nNext);
                    this.m_nDataNum--;
                    nNext = this.m_aEntries[nID].m_nNext;
                }
                this.DeleteID(nID);
                this.m_nListNum--;
            }
            else {
                this.m_aEntries[nID].m_pData.OnUnemploy();
                this.DeleteID(nID);
                this.m_nDataNum--;
            }
        }
    }
    Transfer(nDataID, nListID) {
        if (this.m_nHeapID == (nListID & 0x000000FF)) {
            nListID >>= 8;
            nDataID >>= 8;
            if (nListID < this.m_nCapacity && 0xFFFFFFFF == this.m_aEntries[nListID].m_nLast) {
                if (nDataID < this.m_nCapacity && 0xFFFFFFFF != this.m_aEntries[nDataID].m_nLast) {
                    let nLast = this.m_aEntries[nDataID].m_nLast;
                    let nList = this.m_aEntries[nDataID].m_nIndex;
                    let nNext = this.m_aEntries[nDataID].m_nNext;
                    this.m_aEntries[nLast].m_nNext = nNext;
                    if (nNext > 0) {
                        this.m_aEntries[nNext].m_nLast = nLast;
                    }
                    this.m_aEntries[nList].m_nIndex--;
                    nList = nListID;
                    nLast = nList;
                    nNext = this.m_aEntries[nLast].m_nNext;
                    if (nNext > 0) {
                        this.m_aEntries[nNext].m_nLast = nDataID;
                    }
                    this.m_aEntries[nLast].m_nNext = nDataID;
                    this.m_aEntries[nDataID].m_nIndex = nList;
                    this.m_aEntries[nDataID].m_nLast = nLast;
                    this.m_aEntries[nDataID].m_nNext = nNext;
                    this.m_aEntries[nList].m_nIndex++;
                    return true;
                }
            }
        }
        return false;
    }
    CreateID(nList, nIndex) {
        if (this.m_nCurID == this.m_nCapacity) {
            if (null == this.m_aEntries && 1 == this.m_nCapacity) {
                let pDefaultList = new HeapEntry();
                pDefaultList.m_nIndex = 0;
                pDefaultList.m_nLast = 0xFFFFFFFF;
                pDefaultList.m_nNext = 0;
                this.m_aEntries = new Array();
                this.m_aEntries.push(pDefaultList);
            }
            let pEntry = new HeapEntry();
            pEntry.m_nIndex = this.m_nCapacity + 1;
            this.m_aEntries.push(pEntry);
            this.m_nCapacity++;
        }
        let nCurID = this.m_nCurID;
        this.m_nCurID = this.m_aEntries[nCurID].m_nIndex;
        if (0xFFFFFFFF != nList) {
            let nLast = nList;
            let nNext = this.m_aEntries[nLast].m_nNext;
            let nMoved = 0;
            while (nMoved < nIndex && nNext > 0) {
                nLast = nNext;
                nNext = this.m_aEntries[nLast].m_nNext;
            }
            if (nNext > 0) {
                this.m_aEntries[nNext].m_nLast = nCurID;
            }
            this.m_aEntries[nLast].m_nNext = nCurID;
            this.m_aEntries[nCurID].m_nIndex = nList;
            this.m_aEntries[nCurID].m_nLast = nLast;
            this.m_aEntries[nCurID].m_nNext = nNext;
            this.m_aEntries[nList].m_nIndex++;
        }
        else {
            this.m_aEntries[nCurID].m_nIndex = 0;
            this.m_aEntries[nCurID].m_nLast = 0xFFFFFFFF;
            this.m_aEntries[nCurID].m_nNext = 0;
        }
        return nCurID;
    }
    DeleteID(nID) {
        let nLast = this.m_aEntries[nID].m_nLast;
        if (0xFFFFFFFF != nLast) {
            let nList = this.m_aEntries[nID].m_nIndex;
            let nNext = this.m_aEntries[nID].m_nNext;
            this.m_aEntries[nLast].m_nNext = nNext;
            if (nNext > 0) {
                this.m_aEntries[nNext].m_nLast = nLast;
            }
            this.m_aEntries[nList].m_nIndex--;
        }
        this.m_aEntries[nID].m_pData = null;
        this.m_aEntries[nID].m_nIndex = this.m_nCurID;
        this.m_aEntries[nID].m_nLast = 0;
        this.m_aEntries[nID].m_nNext = 0;
        this.m_nCurID = nID;
    }
}
class HeapEntry {
    constructor() {
        this.m_pData = null;
        this.m_nIndex = 0;
        this.m_nLast = 0;
        this.m_nNext = 0;
    }
}
var AEdgeType;
(function (AEdgeType) {
    AEdgeType[AEdgeType["Default"] = 0] = "Default";
    AEdgeType[AEdgeType["Model"] = 1] = "Model";
    AEdgeType[AEdgeType["Virtual"] = 2] = "Virtual";
})(AEdgeType || (AEdgeType = {}));
class APoint {
    constructor() {
        this.m_mHandle = new Handle(APoint, 0);
        this.m_mAdjoinList = new ListHandle(AAdjoin, 0);
        this.m_mPosition = new Vector3(0.0, 0.0, 0.0);
        this.m_nDegrees = 0;
    }
    get version() {
        return 1000;
    }
    OnCreate(nID) {
    }
    OnEmploy(nID) {
        this.m_mHandle = new Handle(APoint, nID);
    }
    OnUnemploy() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mHandle.Number = pReader.ReadUInt32();
        this.m_mAdjoinList.Number = pReader.ReadUInt32();
        this.m_mPosition.x = pReader.ReadSingle();
        this.m_mPosition.y = pReader.ReadSingle();
        this.m_mPosition.z = pReader.ReadSingle();
        this.m_nDegrees = pReader.ReadInt32();
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("APoint.UnSerialize(): Bad end!");
        }
    }
}
APoint.g_pContext = new HeapContext(APoint);
class AAdjoin {
    constructor() {
        this.m_mHandle = new Handle(AAdjoin, 0);
        this.m_mAdjPoint = new Handle(APoint, 0);
        this.m_mEdge = new Handle(AEdge, 0);
        this.m_mLastAdjoin = new Handle(AAdjoin, 0);
        this.m_mNextAdjoin = new Handle(AAdjoin, 0);
    }
    get version() {
        return 1000;
    }
    OnCreate(nID) {
    }
    OnEmploy(nID) {
        this.m_mHandle = new Handle(AAdjoin, nID);
    }
    OnUnemploy() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mHandle.Number = pReader.ReadUInt32();
        this.m_mAdjPoint.Number = pReader.ReadUInt32();
        this.m_mEdge.Number = pReader.ReadUInt32();
        this.m_mLastAdjoin.Number = pReader.ReadUInt32();
        this.m_mNextAdjoin.Number = pReader.ReadUInt32();
        this.m_nAngle = pReader.ReadSingle();
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("AAdjoin.UnSerialize(): Bad end!");
        }
    }
}
AAdjoin.g_pContext = new HeapContext(AAdjoin);
class AEdge {
    constructor() {
        this.m_mHandle = new Handle(AEdge, 0);
        this.m_eType = AEdgeType.Default;
        this.m_nAngle = 0.0;
        this.m_mScale = new Vector3(0.0, 0.0, 0.0);
        this.m_mCenter = new Vector3(0.0, 0.0, 0.0);
        this.m_mShadeInfo = new Vector4(0.0, 0.0, 0.0, 0.0);
        this.m_mLeftPoint = new Handle(APoint, 0);
        this.m_mRightPoint = new Handle(APoint, 0);
        this.m_aTextures = [new Handle(Attachment, 0), new Handle(Attachment, 0)];
        this.m_mEdgeModel = new Handle(Attachment, 0);
        this.m_mHoleList = new ListHandle(Attachment, 0);
        this.m_pSketch = null;
        this.m_pMesh = null;
    }
    get version() {
        return 1000 + 1;
    }
    OnCreate(nID) {
        this.m_pSketch = new Sketch();
        this.m_pMesh = new AEdgeMesh(this);
    }
    OnEmploy(nID) {
        this.m_mHandle = new Handle(AEdge, nID);
    }
    OnUnemploy() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mHandle.Number = pReader.ReadUInt32();
        this.m_eType = pReader.ReadInt32();
        this.m_nAngle = pReader.ReadSingle();
        this.m_mScale.x = pReader.ReadSingle();
        this.m_mScale.y = pReader.ReadSingle();
        this.m_mScale.z = pReader.ReadSingle();
        this.m_mCenter.x = pReader.ReadSingle();
        this.m_mCenter.y = pReader.ReadSingle();
        this.m_mCenter.z = pReader.ReadSingle();
        this.m_mLeftPoint.Number = pReader.ReadUInt32();
        this.m_mRightPoint.Number = pReader.ReadUInt32();
        this.m_aTextures[0].Number = pReader.ReadUInt32();
        this.m_aTextures[1].Number = pReader.ReadUInt32();
        this.m_mEdgeModel.Number = pReader.ReadUInt32();
        this.m_mHoleList.Number = pReader.ReadUInt32();
        if (true == pReader.ReadBoolean()) {
            this.m_pSketch = new Sketch();
            this.m_pSketch.UnSerialize(pReader);
        }
        this.m_pMesh = new AEdgeMesh(this);
        if (nVersion > 1000) {
            this.m_mShadeInfo.x = pReader.ReadSingle();
            this.m_mShadeInfo.y = pReader.ReadSingle();
            this.m_mShadeInfo.z = pReader.ReadSingle();
            this.m_mShadeInfo.w = pReader.ReadSingle();
        }
        else {
            this.m_mShadeInfo = new Vector4(0.0, 1.0, 0.0, 1.0);
        }
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("AEdge.UnSerialize(): Bad end!");
        }
    }
    CreateGeometry(pLayer, bSetTex = true) {
        this.m_pMesh.CreateGeometry(pLayer, bSetTex);
    }
    ;
}
AEdge.g_pContext = new HeapContext(AEdge);
class Sketch {
    constructor() {
        this.m_aTop = null;
        this.m_aBottom = null;
        this.m_aTop = [null, null, null, null, null, null];
        this.m_aBottom = [null, null, null, null, null, null];
        for (let i = 0; i < 6; i++) {
            this.m_aTop[i] = new Vector3(0.0, 0.0, 0.0);
            this.m_aBottom[i] = new Vector3(0.0, 0.0, 0.0);
        }
    }
    version() {
        return 1000;
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        for (let i = 0; i < 6; i++) {
            this.m_aTop[i].x = pReader.ReadSingle();
            this.m_aTop[i].y = pReader.ReadSingle();
            this.m_aTop[i].z = pReader.ReadSingle();
            this.m_aBottom[i].x = pReader.ReadSingle();
            this.m_aBottom[i].y = pReader.ReadSingle();
            this.m_aBottom[i].z = pReader.ReadSingle();
        }
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("Sketch.UnSerialize(): Bad end!");
        }
    }
}
class AMeshData {
    constructor() {
        this.m_aPosition = null;
        this.m_aNormal = null;
        this.m_aTexUV = null;
        this.m_nCount = 0;
    }
}
class AMeshBuilder {
    constructor() {
        this.m_nSize = 0;
        this.m_nCapacity = 0;
        this.m_aPosition = null;
        this.m_aNormal = null;
        this.m_aTexUV = null;
    }
    Clear() {
        this.m_nSize = 0;
    }
    PushTriangle(aPosition, aNormal, aTexUV) {
        this.Extend();
        for (let i = 0; i < 3; i++) {
            let nOffset = 3 * this.m_nSize;
            this.m_aPosition[nOffset] = aPosition[i].x;
            this.m_aPosition[nOffset + 1] = aPosition[i].y;
            this.m_aPosition[nOffset + 2] = aPosition[i].z;
            this.m_aNormal[nOffset] = aNormal[i].x;
            this.m_aNormal[nOffset + 1] = aNormal[i].y;
            this.m_aNormal[nOffset + 2] = aNormal[i].z;
            nOffset = 2 * this.m_nSize;
            this.m_aTexUV[nOffset] = aTexUV[i].x;
            this.m_aTexUV[nOffset + 1] = aTexUV[i].y;
            this.m_nSize++;
        }
    }
    GetMeshData() {
        let mMeshData = null;
        if (this.m_nSize > 0) {
            mMeshData = new AMeshData();
            mMeshData.m_aPosition = this.m_aPosition.slice(0, this.m_nSize * 3);
            mMeshData.m_aNormal = this.m_aNormal.slice(0, this.m_nSize * 3);
            mMeshData.m_aTexUV = this.m_aTexUV.slice(0, this.m_nSize * 2);
            mMeshData.m_nCount = this.m_nSize;
        }
        return mMeshData;
    }
    Extend() {
        if (this.m_nSize == this.m_nCapacity) {
            let nNewCapacity = this.m_nCapacity + (256 * 3);
            let aNewPosition = new Float32Array(nNewCapacity * 3);
            if (this.m_aPosition != null) {
                aNewPosition.set(this.m_aPosition);
            }
            this.m_aPosition = aNewPosition;
            let aNewNormal = new Float32Array(nNewCapacity * 3);
            if (this.m_aNormal != null) {
                aNewNormal.set(this.m_aNormal);
            }
            this.m_aNormal = aNewNormal;
            let aNewTexUV = new Float32Array(nNewCapacity * 2);
            if (this.m_aTexUV != null) {
                aNewTexUV.set(this.m_aTexUV);
            }
            this.m_aTexUV = aNewTexUV;
            this.m_nCapacity = nNewCapacity;
        }
    }
}
class AEdgeMesh {
    constructor(pEdge) {
        this.m_pEdge = null;
        this.m_aMeshData = [null, null, null, null, null];
        this.m_pModels = null;
        this.m_pMesh = null;
        this.m_pPatchRoot = null;
        this.m_aSubMesh = null;
        this.m_aSubMaterial = [null, null, null, null, null];
        this.m_pEdge = pEdge;
    }
    CreateGeometry(pLayer, bSetTex = true) {
        let pEdge = this.m_pEdge;
        if (pEdge != null) {
            this.m_pPatchRoot = pLayer.m_pPatchRoot;
            let pSketch = pEdge.m_pSketch;
            let nHoleCount = pEdge.m_mHoleList.Count;
            let pHoleList = nHoleCount > 0 ? this.GetHoleSketch(pEdge.m_mHoleList, pEdge.m_nAngle) : null;
            if (pHoleList != null) {
                if (pEdge.m_eType == AEdgeType.Model) {
                }
                else if (pEdge.m_eType == AEdgeType.Default) {
                    this.BuildFrontMesh2(pSketch, pHoleList, ALiner.g_aMeshBuilder[0]);
                    this.BuildBackMesh2(pSketch, pHoleList, ALiner.g_aMeshBuilder[1]);
                    this.BuildBorderMesh(pSketch, ALiner.g_aMeshBuilder[2]);
                    this.BuildInborderMesh(pSketch, pHoleList, ALiner.g_aMeshBuilder[3]);
                    this.BuildShadowMesh(pEdge, ALiner.g_aMeshBuilder[4]);
                }
                let pAttachment = pEdge.m_mEdgeModel.Object;
                if (pAttachment) {
                    let pEdgeModel = pAttachment.entity;
                    if (pEdgeModel) {
                        let pItem = pAttachment.menuItem.Object;
                        if (pItem) {
                            let pModel = new GameObject(pItem.uiName, GameObjectType.Empty);
                            let pHook = pModel.AddHook();
                            pHook.attachment = pAttachment;
                            pHook.SetLayer();
                            pAttachment.hook = pHook;
                            this.m_pModels = pModel;
                            ALinerDC.DC.m_pLayerMgr.m_pDelegateList.push(function () {
                                pItem.LoadAndSet(null, function (pValid) {
                                    pEdgeModel.PlaceModel2(pEdge, pHoleList, pModel);
                                });
                            });
                        }
                    }
                }
            }
            else {
                if (pEdge.m_eType == AEdgeType.Model) {
                    let pAttachment = pEdge.m_mEdgeModel.Object;
                    if (pAttachment) {
                        let pEdgeModel = pAttachment.entity;
                        if (pEdgeModel) {
                            let pItem = pAttachment.menuItem.Object;
                            if (pItem) {
                                let pModel = new GameObject(pItem.uiName, GameObjectType.Empty);
                                let pHook = pModel.AddHook();
                                pHook.attachment = pAttachment;
                                pHook.SetLayer();
                                pAttachment.hook = pHook;
                                this.m_pModels = pModel;
                                ALinerDC.DC.m_pLayerMgr.m_pDelegateList.push(function () {
                                    pItem.LoadAndSet(null, function (pValid) {
                                        pEdgeModel.PlaceModel1(pEdge, pModel);
                                    });
                                });
                            }
                        }
                    }
                }
                else if (pEdge.m_eType == AEdgeType.Default) {
                    this.BuildFrontMesh(pSketch, ALiner.g_aMeshBuilder[0]);
                    this.BuildBackMesh(pSketch, ALiner.g_aMeshBuilder[1]);
                    this.BuildBorderMesh(pSketch, ALiner.g_aMeshBuilder[2]);
                    this.BuildInborderMesh(pSketch, null, ALiner.g_aMeshBuilder[3]);
                    this.BuildShadowMesh(pEdge, ALiner.g_aMeshBuilder[4]);
                }
            }
        }
    }
    PlaceHole(pHoleRoot, pPatchRoot) {
        let pEdge = this.m_pEdge;
        for (let pAttachment of pEdge.m_mHoleList) {
            let pHole = pAttachment.entity;
            if (pHole != null && pHole.enabled) {
                let mOffset = pHole.offset;
                mOffset.z = pEdge.m_nAngle;
                pHole.offset = mOffset;
                let pItem = pAttachment.menuItem.Object;
                if (pItem != null) {
                    pItem.LoadAndSet(null, function (pValid) {
                        pHole.CreateObject(pHoleRoot, pPatchRoot);
                    });
                }
            }
        }
    }
    CreateMeshObject(pLayer) {
        alert("AEdgeMesh.CreateMeshObject(): Discarded.");
        if (this.m_aSubMesh == null) {
            this.m_aSubMesh = [null, null, null, null, null];
            this.m_aSubMaterial[0] = new Material(MaterialType.Edge);
            this.m_aSubMaterial[1] = new Material(MaterialType.Edge);
            this.m_aSubMaterial[2] = new Material(MaterialType.Border);
            this.m_aSubMaterial[3] = new Material(MaterialType.Inborder);
            this.m_aSubMaterial[4] = new Material(MaterialType.AreaBottomShadow);
            this.m_aSubMaterial[0].SetTextureOffset(1, { x: this.m_pEdge.m_mShadeInfo.x, y: 0.0 });
            this.m_aSubMaterial[0].SetTextureScale(1, { x: this.m_pEdge.m_mShadeInfo.y, y: -1.0 });
            this.m_aSubMaterial[1].SetTextureOffset(1, { x: this.m_pEdge.m_mShadeInfo.z, y: 0.0 });
            this.m_aSubMaterial[1].SetTextureScale(1, { x: this.m_pEdge.m_mShadeInfo.w, y: -1.0 });
        }
        if (pLayer != null) {
            this.m_pMesh = new GameObject("----Edge: " + (this.m_pEdge.m_mHandle.Number >> 8), GameObjectType.Empty);
            this.m_pMesh.parent = pLayer.m_pEdgeRoot;
            this.m_aSubMesh[0] = new GameObject("Front", GameObjectType.Mesh);
            this.m_aSubMesh[1] = new GameObject("Back", GameObjectType.Mesh);
            this.m_aSubMesh[2] = new GameObject("Border", GameObjectType.Mesh);
            this.m_aSubMesh[3] = new GameObject("Inborder", GameObjectType.Mesh);
            this.m_aSubMesh[4] = new GameObject("Shadow", GameObjectType.Mesh);
            this.m_aSubMesh[0].parent = this.m_pMesh;
            this.m_aSubMesh[1].parent = this.m_pMesh;
            this.m_aSubMesh[2].parent = this.m_pMesh;
            this.m_aSubMesh[3].parent = this.m_pMesh;
            this.m_aSubMesh[4].parent = this.m_pMesh;
        }
        for (let i = 0; i < 5; i++) {
            if (this.m_aMeshData[i] != null) {
                this.m_aSubMesh[i].SetGeometry(this.m_aMeshData[i], this.m_aSubMaterial[i]);
                this.m_aSubMesh[i].SetActive(true);
            }
            else {
                this.m_aSubMesh[i].SetActive(false);
            }
        }
    }
    GetHoleSketch(mHoleList, nAngle) {
        let mSketchList = new Array();
        let nSin = Mathf.Sin(nAngle);
        let nCos = Mathf.Cos(nAngle);
        for (let pAttachment of mHoleList) {
            let pHole = pAttachment.entity;
            if (pHole != null && pHole.enabled) {
                let mSize = pHole.size;
                let mPosition = pHole.position;
                let mHalf = new Vector3(mSize.x / 2.0, mSize.y / 2.0, mSize.z / 2.0);
                let pSketch = new Sketch();
                pSketch.m_aBottom[1].x = (nCos * -mHalf.x) - (nSin * mHalf.z);
                pSketch.m_aBottom[1].y = -mHalf.y;
                pSketch.m_aBottom[1].z = (nSin * -mHalf.x) + (nCos * mHalf.z);
                pSketch.m_aBottom[1].x += mPosition.x;
                pSketch.m_aBottom[1].y += mPosition.y;
                pSketch.m_aBottom[1].z += mPosition.z;
                pSketch.m_aBottom[2].x = (nCos * mHalf.x) - (nSin * mHalf.z);
                pSketch.m_aBottom[2].y = -mHalf.y;
                pSketch.m_aBottom[2].z = (nSin * mHalf.x) + (nCos * mHalf.z);
                pSketch.m_aBottom[2].x += mPosition.x;
                pSketch.m_aBottom[2].y += mPosition.y;
                pSketch.m_aBottom[2].z += mPosition.z;
                pSketch.m_aBottom[4].x = (nCos * mHalf.x) - (nSin * -mHalf.z);
                pSketch.m_aBottom[4].y = -mHalf.y;
                pSketch.m_aBottom[4].z = (nSin * mHalf.x) + (nCos * -mHalf.z);
                pSketch.m_aBottom[4].x += mPosition.x;
                pSketch.m_aBottom[4].y += mPosition.y;
                pSketch.m_aBottom[4].z += mPosition.z;
                pSketch.m_aBottom[5].x = (nCos * -mHalf.x) - (nSin * -mHalf.z);
                pSketch.m_aBottom[5].y = -mHalf.y;
                pSketch.m_aBottom[5].z = (nSin * -mHalf.x) + (nCos * -mHalf.z);
                pSketch.m_aBottom[5].x += mPosition.x;
                pSketch.m_aBottom[5].y += mPosition.y;
                pSketch.m_aBottom[5].z += mPosition.z;
                pSketch.m_aTop[1] = Vector3.Clone(pSketch.m_aBottom[1]);
                pSketch.m_aTop[1].y += mSize.y;
                pSketch.m_aTop[2] = Vector3.Clone(pSketch.m_aBottom[2]);
                pSketch.m_aTop[2].y += mSize.y;
                pSketch.m_aTop[4] = Vector3.Clone(pSketch.m_aBottom[4]);
                pSketch.m_aTop[4].y += mSize.y;
                pSketch.m_aTop[5] = Vector3.Clone(pSketch.m_aBottom[5]);
                pSketch.m_aTop[5].y += mSize.y;
                mSketchList.push(pSketch);
            }
        }
        if (mSketchList.length > 0) {
            return mSketchList;
        }
        return null;
    }
    BuildFrontMesh(pSketch, pBuilder) {
        let aPosition = [null, null, null];
        let aNormal = [null, null, null];
        let aTexUV = [null, null, null];
        if (pBuilder == null) {
            pBuilder = AEdgeMesh.g_pMeshBuilder;
            pBuilder.Clear();
        }
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[5]);
        aPosition[1] = Vector3.Clone(pSketch.m_aTop[5]);
        aPosition[2] = Vector3.Clone(pSketch.m_aTop[4]);
        aNormal[0] = Vector3.Cross(Vector3.Sub(aPosition[1], aPosition[0]), Vector3.Sub(aPosition[2], aPosition[0]));
        aNormal[1] = Vector3.Clone(aNormal[0]);
        aNormal[2] = Vector3.Clone(aNormal[1]);
        aTexUV[0] = { x: 0.0, y: 1.0 };
        aTexUV[1] = { x: 0.0, y: 0.0 };
        aTexUV[2] = { x: 1.0, y: 0.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[5]);
        aPosition[1] = Vector3.Clone(pSketch.m_aTop[4]);
        aPosition[2] = Vector3.Clone(pSketch.m_aBottom[4]);
        aTexUV[0] = { x: 0.0, y: 1.0 };
        aTexUV[1] = { x: 1.0, y: 0.0 };
        aTexUV[2] = { x: 1.0, y: 1.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        if (pBuilder == AEdgeMesh.g_pMeshBuilder) {
            this.m_aMeshData[0] = pBuilder.GetMeshData();
        }
    }
    BuildFrontMesh2(pSketch, pHoleList, pBuilder) {
        let aPosition = [null, null, null];
        let aNormal = [null, null, null];
        let aTexUV = [null, null, null];
        if (pBuilder == null) {
            pBuilder = AEdgeMesh.g_pMeshBuilder;
            pBuilder.Clear();
        }
        aNormal[0] = Vector3.Cross(Vector3.Sub(pSketch.m_aTop[5], pSketch.m_aBottom[5]), Vector3.Sub(pSketch.m_aTop[4], pSketch.m_aBottom[5]));
        aNormal[1] = Vector3.Clone(aNormal[0]);
        aNormal[2] = Vector3.Clone(aNormal[0]);
        let nEdgeHeight = pSketch.m_aTop[5].y;
        let mLineStart = Vector3.Clone(pSketch.m_aBottom[5]);
        let mLineEnd = Vector3.Clone(pSketch.m_aBottom[4]);
        let nLineSize = Vector3.Distance(mLineEnd, mLineStart);
        let aRectPoint = [null, null, null, null];
        let aRectUV = [null, null, null, null];
        aRectPoint[0] = Vector3.Clone(pSketch.m_aBottom[5]);
        aRectPoint[1] = Vector3.Clone(pSketch.m_aTop[5]);
        aRectUV[0] = { x: 0.0, y: 1.0 };
        aRectUV[1] = { x: 0.0, y: 0.0 };
        for (let i = 0; i < pHoleList.length; i++) {
            let pHole = pHoleList[i];
            let nLeftU = Vector3.Distance(pHole.m_aBottom[5], mLineStart) / nLineSize;
            let nRightU = Vector3.Distance(pHole.m_aBottom[4], mLineStart) / nLineSize;
            let nTopV = 1.0 - pHole.m_aTop[5].y / nEdgeHeight;
            let nBottomV = 1.0 - pHole.m_aBottom[5].y / nEdgeHeight;
            aRectPoint[2] = Vector3.Clone(pHole.m_aBottom[5]);
            aRectPoint[2].y = aRectPoint[1].y;
            aRectPoint[3] = Vector3.Clone(aRectPoint[2]);
            aRectPoint[3].y = 0.0;
            aRectUV[2] = { x: nLeftU, y: 0.0 };
            aRectUV[3] = { x: nLeftU, y: 1.0 };
            aPosition[0] = Vector3.Clone(aRectPoint[0]);
            aPosition[1] = Vector3.Clone(aRectPoint[1]);
            aPosition[2] = Vector3.Clone(aRectPoint[2]);
            aTexUV[0] = Vector2.Clone(aRectUV[0]);
            aTexUV[1] = Vector2.Clone(aRectUV[1]);
            aTexUV[2] = Vector2.Clone(aRectUV[2]);
            pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
            aPosition[0] = Vector3.Clone(aRectPoint[0]);
            aPosition[1] = Vector3.Clone(aRectPoint[2]);
            aPosition[2] = Vector3.Clone(aRectPoint[3]);
            aTexUV[0] = Vector2.Clone(aRectUV[0]);
            aTexUV[1] = Vector2.Clone(aRectUV[2]);
            aTexUV[2] = Vector2.Clone(aRectUV[3]);
            pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
            aRectPoint[0] = Vector3.Clone(pHole.m_aTop[5]);
            aRectPoint[3] = Vector3.Clone(pHole.m_aTop[4]);
            aRectPoint[1] = Vector3.Clone(aRectPoint[0]);
            aRectPoint[1].y = nEdgeHeight;
            aRectPoint[2] = Vector3.Clone(aRectPoint[3]);
            aRectPoint[2].y = nEdgeHeight;
            aRectUV[0] = { x: nLeftU, y: nTopV };
            aRectUV[1] = { x: nLeftU, y: 0.0 };
            aRectUV[2] = { x: nRightU, y: 0.0 };
            aRectUV[3] = { x: nRightU, y: nTopV };
            aPosition[0] = Vector3.Clone(aRectPoint[0]);
            aPosition[1] = Vector3.Clone(aRectPoint[1]);
            aPosition[2] = Vector3.Clone(aRectPoint[2]);
            aTexUV[0] = Vector2.Clone(aRectUV[0]);
            aTexUV[1] = Vector2.Clone(aRectUV[1]);
            aTexUV[2] = Vector2.Clone(aRectUV[2]);
            pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
            aPosition[0] = Vector3.Clone(aRectPoint[0]);
            aPosition[1] = Vector3.Clone(aRectPoint[2]);
            aPosition[2] = Vector3.Clone(aRectPoint[3]);
            aTexUV[0] = Vector2.Clone(aRectUV[0]);
            aTexUV[1] = Vector2.Clone(aRectUV[2]);
            aTexUV[2] = Vector2.Clone(aRectUV[3]);
            pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
            aRectPoint[1] = Vector3.Clone(pHole.m_aBottom[5]);
            aRectPoint[2] = Vector3.Clone(pHole.m_aBottom[4]);
            aRectPoint[0] = Vector3.Clone(aRectPoint[1]);
            aRectPoint[0].y = 0.0;
            aRectPoint[3] = Vector3.Clone(aRectPoint[2]);
            aRectPoint[3].y = 0.0;
            aRectUV[0] = { x: nLeftU, y: 1.0 };
            aRectUV[1] = { x: nLeftU, y: nBottomV };
            aRectUV[2] = { x: nRightU, y: nBottomV };
            aRectUV[3] = { x: nRightU, y: 1.0 };
            aPosition[0] = Vector3.Clone(aRectPoint[0]);
            aPosition[1] = Vector3.Clone(aRectPoint[1]);
            aPosition[2] = Vector3.Clone(aRectPoint[2]);
            aTexUV[0] = Vector2.Clone(aRectUV[0]);
            aTexUV[1] = Vector2.Clone(aRectUV[1]);
            aTexUV[2] = Vector2.Clone(aRectUV[2]);
            pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
            aPosition[0] = Vector3.Clone(aRectPoint[0]);
            aPosition[1] = Vector3.Clone(aRectPoint[2]);
            aPosition[2] = Vector3.Clone(aRectPoint[3]);
            aTexUV[0] = Vector2.Clone(aRectUV[0]);
            aTexUV[1] = Vector2.Clone(aRectUV[2]);
            aTexUV[2] = Vector2.Clone(aRectUV[3]);
            pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
            aRectPoint[0] = Vector3.Clone(aRectPoint[3]);
            aRectPoint[1] = Vector3.Clone(aRectPoint[3]);
            aRectPoint[1].y = nEdgeHeight;
            aRectUV[0] = { x: nRightU, y: 1.0 };
            aRectUV[1] = { x: nRightU, y: 0.0 };
        }
        aRectPoint[2] = pSketch.m_aTop[4];
        aRectPoint[3] = pSketch.m_aBottom[4];
        aRectUV[2] = { x: 1.0, y: 0.0 };
        aRectUV[3] = { x: 1.0, y: 1.0 };
        aPosition[0] = Vector3.Clone(aRectPoint[0]);
        aPosition[1] = Vector3.Clone(aRectPoint[1]);
        aPosition[2] = Vector3.Clone(aRectPoint[2]);
        aTexUV[0] = Vector2.Clone(aRectUV[0]);
        aTexUV[1] = Vector2.Clone(aRectUV[1]);
        aTexUV[2] = Vector2.Clone(aRectUV[2]);
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(aRectPoint[0]);
        aPosition[1] = Vector3.Clone(aRectPoint[2]);
        aPosition[2] = Vector3.Clone(aRectPoint[3]);
        aTexUV[0] = Vector2.Clone(aRectUV[0]);
        aTexUV[1] = Vector2.Clone(aRectUV[2]);
        aTexUV[2] = Vector2.Clone(aRectUV[3]);
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        if (pBuilder == AEdgeMesh.g_pMeshBuilder) {
            this.m_aMeshData[0] = pBuilder.GetMeshData();
        }
    }
    BuildBackMesh(pSketch, pBuilder) {
        let aPosition = [null, null, null];
        let aNormal = [null, null, null];
        let aTexUV = [null, null, null];
        if (pBuilder == null) {
            pBuilder = AEdgeMesh.g_pMeshBuilder;
            pBuilder.Clear();
        }
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[2]);
        aPosition[1] = Vector3.Clone(pSketch.m_aTop[2]);
        aPosition[2] = Vector3.Clone(pSketch.m_aTop[1]);
        aNormal[0] = Vector3.Cross(Vector3.Sub(aPosition[1], aPosition[0]), Vector3.Sub(aPosition[2], aPosition[0]));
        aNormal[1] = Vector3.Clone(aNormal[0]);
        aNormal[2] = Vector3.Clone(aNormal[0]);
        aTexUV[0] = { x: 0.0, y: 1.0 };
        aTexUV[1] = { x: 0.0, y: 0.0 };
        aTexUV[2] = { x: 1.0, y: 0.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[2]);
        aPosition[1] = Vector3.Clone(pSketch.m_aTop[1]);
        aPosition[2] = Vector3.Clone(pSketch.m_aBottom[1]);
        aTexUV[0] = { x: 0.0, y: 1.0 };
        aTexUV[1] = { x: 1.0, y: 0.0 };
        aTexUV[2] = { x: 1.0, y: 1.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        if (pBuilder == AEdgeMesh.g_pMeshBuilder) {
            this.m_aMeshData[1] = pBuilder.GetMeshData();
        }
    }
    BuildBackMesh2(pSketch, pHoleList, pBuilder) {
        let aPosition = [null, null, null];
        let aNormal = [null, null, null];
        let aTexUV = [null, null, null];
        if (pBuilder == null) {
            pBuilder = AEdgeMesh.g_pMeshBuilder;
            pBuilder.Clear();
        }
        aNormal[0] = Vector3.Cross(Vector3.Sub(pSketch.m_aTop[2], pSketch.m_aBottom[2]), Vector3.Sub(pSketch.m_aTop[1], pSketch.m_aBottom[2]));
        aNormal[1] = Vector3.Clone(aNormal[0]);
        aNormal[2] = Vector3.Clone(aNormal[0]);
        let nEdgeHeight = pSketch.m_aTop[2].y;
        let mLineStart = Vector3.Clone(pSketch.m_aBottom[2]);
        let mLineEnd = Vector3.Clone(pSketch.m_aBottom[1]);
        let nLineSize = Vector3.Distance(mLineEnd, mLineStart);
        let aRectPoint = [null, null, null, null];
        let aRectUV = [null, null, null, null];
        aRectPoint[0] = Vector3.Clone(pSketch.m_aBottom[2]);
        aRectPoint[1] = Vector3.Clone(pSketch.m_aTop[2]);
        aRectUV[0] = { x: 0.0, y: 1.0 };
        aRectUV[1] = { x: 0.0, y: 0.0 };
        for (let i = pHoleList.length - 1; i > -1; i--) {
            let pHole = pHoleList[i];
            let nLeftU = Vector3.Distance(pHole.m_aBottom[2], mLineStart) / nLineSize;
            let nRightU = Vector3.Distance(pHole.m_aBottom[1], mLineStart) / nLineSize;
            let nTopV = 1.0 - pHole.m_aTop[2].y / nEdgeHeight;
            let nBottomV = 1.0 - pHole.m_aBottom[2].y / nEdgeHeight;
            aRectPoint[2] = Vector3.Clone(pHole.m_aBottom[2]);
            aRectPoint[2].y = aRectPoint[1].y;
            aRectPoint[3] = Vector3.Clone(aRectPoint[2]);
            aRectPoint[3].y = 0.0;
            aRectUV[2] = { x: nLeftU, y: 0.0 };
            aRectUV[3] = { x: nLeftU, y: 1.0 };
            aPosition[0] = Vector3.Clone(aRectPoint[0]);
            aPosition[1] = Vector3.Clone(aRectPoint[1]);
            aPosition[2] = Vector3.Clone(aRectPoint[2]);
            aTexUV[0] = Vector2.Clone(aRectUV[0]);
            aTexUV[1] = Vector2.Clone(aRectUV[1]);
            aTexUV[2] = Vector2.Clone(aRectUV[2]);
            pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
            aPosition[0] = Vector3.Clone(aRectPoint[0]);
            aPosition[1] = Vector3.Clone(aRectPoint[2]);
            aPosition[2] = Vector3.Clone(aRectPoint[3]);
            aTexUV[0] = Vector2.Clone(aRectUV[0]);
            aTexUV[1] = Vector2.Clone(aRectUV[2]);
            aTexUV[2] = Vector2.Clone(aRectUV[3]);
            pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
            aRectPoint[0] = Vector3.Clone(pHole.m_aTop[2]);
            aRectPoint[3] = Vector3.Clone(pHole.m_aTop[1]);
            aRectPoint[1] = Vector3.Clone(aRectPoint[0]);
            aRectPoint[1].y = nEdgeHeight;
            aRectPoint[2] = Vector3.Clone(aRectPoint[3]);
            aRectPoint[2].y = nEdgeHeight;
            aRectUV[0] = { x: nLeftU, y: nTopV };
            aRectUV[1] = { x: nLeftU, y: 0.0 };
            aRectUV[2] = { x: nRightU, y: 0.0 };
            aRectUV[3] = { x: nRightU, y: nTopV };
            aPosition[0] = Vector3.Clone(aRectPoint[0]);
            aPosition[1] = Vector3.Clone(aRectPoint[1]);
            aPosition[2] = Vector3.Clone(aRectPoint[2]);
            aTexUV[0] = Vector2.Clone(aRectUV[0]);
            aTexUV[1] = Vector2.Clone(aRectUV[1]);
            aTexUV[2] = Vector2.Clone(aRectUV[2]);
            pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
            aPosition[0] = Vector3.Clone(aRectPoint[0]);
            aPosition[1] = Vector3.Clone(aRectPoint[2]);
            aPosition[2] = Vector3.Clone(aRectPoint[3]);
            aTexUV[0] = Vector2.Clone(aRectUV[0]);
            aTexUV[1] = Vector2.Clone(aRectUV[2]);
            aTexUV[2] = Vector2.Clone(aRectUV[3]);
            pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
            aRectPoint[1] = Vector3.Clone(pHole.m_aBottom[2]);
            aRectPoint[2] = Vector3.Clone(pHole.m_aBottom[1]);
            aRectPoint[0] = Vector3.Clone(aRectPoint[1]);
            aRectPoint[0].y = 0.0;
            aRectPoint[3] = Vector3.Clone(aRectPoint[2]);
            aRectPoint[3].y = 0.0;
            aRectUV[0] = { x: nLeftU, y: 1.0 };
            aRectUV[1] = { x: nLeftU, y: nBottomV };
            aRectUV[2] = { x: nRightU, y: nBottomV };
            aRectUV[3] = { x: nRightU, y: 1.0 };
            aPosition[0] = Vector3.Clone(aRectPoint[0]);
            aPosition[1] = Vector3.Clone(aRectPoint[1]);
            aPosition[2] = Vector3.Clone(aRectPoint[2]);
            aTexUV[0] = Vector2.Clone(aRectUV[0]);
            aTexUV[1] = Vector2.Clone(aRectUV[1]);
            aTexUV[2] = Vector2.Clone(aRectUV[2]);
            pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
            aPosition[0] = Vector3.Clone(aRectPoint[0]);
            aPosition[1] = Vector3.Clone(aRectPoint[2]);
            aPosition[2] = Vector3.Clone(aRectPoint[3]);
            aTexUV[0] = Vector2.Clone(aRectUV[0]);
            aTexUV[1] = Vector2.Clone(aRectUV[2]);
            aTexUV[2] = Vector2.Clone(aRectUV[3]);
            pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
            aRectPoint[0] = Vector3.Clone(aRectPoint[3]);
            aRectPoint[1] = Vector3.Clone(aRectPoint[3]);
            aRectPoint[1].y = nEdgeHeight;
            aRectUV[0] = { x: nRightU, y: 1.0 };
            aRectUV[1] = { x: nRightU, y: 0.0 };
        }
        aRectPoint[2] = pSketch.m_aTop[1];
        aRectPoint[3] = pSketch.m_aBottom[1];
        aRectUV[2] = { x: 1.0, y: 0.0 };
        aRectUV[3] = { x: 1.0, y: 1.0 };
        aPosition[0] = Vector3.Clone(aRectPoint[0]);
        aPosition[1] = Vector3.Clone(aRectPoint[1]);
        aPosition[2] = Vector3.Clone(aRectPoint[2]);
        aTexUV[0] = Vector2.Clone(aRectUV[0]);
        aTexUV[1] = Vector2.Clone(aRectUV[1]);
        aTexUV[2] = Vector2.Clone(aRectUV[2]);
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(aRectPoint[0]);
        aPosition[1] = Vector3.Clone(aRectPoint[2]);
        aPosition[2] = Vector3.Clone(aRectPoint[3]);
        aTexUV[0] = Vector2.Clone(aRectUV[0]);
        aTexUV[1] = Vector2.Clone(aRectUV[2]);
        aTexUV[2] = Vector2.Clone(aRectUV[3]);
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        if (pBuilder == AEdgeMesh.g_pMeshBuilder) {
            this.m_aMeshData[1] = pBuilder.GetMeshData();
        }
    }
    BuildBorderMesh(pSketch, pBuilder) {
        let aPosition = [null, null, null];
        let aNormal = [null, null, null];
        let aTexUV = [null, null, null];
        if (pBuilder == null) {
            pBuilder = AEdgeMesh.g_pMeshBuilder;
            pBuilder.Clear();
        }
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[0]);
        aPosition[1] = Vector3.Clone(pSketch.m_aBottom[5]);
        aPosition[2] = Vector3.Clone(pSketch.m_aBottom[4]);
        aNormal[0] = { x: 0.0, y: -1.0, z: 0.0 };
        aNormal[1] = { x: 0.0, y: -1.0, z: 0.0 };
        aNormal[2] = { x: 0.0, y: -1.0, z: 0.0 };
        aTexUV[0] = { x: 0.0, y: 0.5 };
        aTexUV[1] = { x: 0.0, y: 0.0 };
        aTexUV[2] = { x: 1.0, y: 0.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[0]);
        aPosition[1] = Vector3.Clone(pSketch.m_aBottom[4]);
        aPosition[2] = Vector3.Clone(pSketch.m_aBottom[3]);
        aTexUV[0] = { x: 0.0, y: 0.5 };
        aTexUV[1] = { x: 1.0, y: 0.0 };
        aTexUV[2] = { x: 1.0, y: 0.5 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[0]);
        aPosition[1] = Vector3.Clone(pSketch.m_aBottom[3]);
        aPosition[2] = Vector3.Clone(pSketch.m_aBottom[2]);
        aTexUV[0] = { x: 0.0, y: 0.5 };
        aTexUV[1] = { x: 1.0, y: 0.5 };
        aTexUV[2] = { x: 1.0, y: 1.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[0]);
        aPosition[1] = Vector3.Clone(pSketch.m_aBottom[2]);
        aPosition[2] = Vector3.Clone(pSketch.m_aBottom[1]);
        aTexUV[0] = { x: 0.0, y: 0.5 };
        aTexUV[1] = { x: 1.0, y: 1.0 };
        aTexUV[2] = { x: 0.0, y: 1.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aTop[0]);
        aPosition[1] = Vector3.Clone(pSketch.m_aTop[1]);
        aPosition[2] = Vector3.Clone(pSketch.m_aTop[2]);
        aNormal[0] = { x: 0.0, y: 1.0, z: 0.0 };
        aNormal[1] = { x: 0.0, y: 1.0, z: 0.0 };
        aNormal[2] = { x: 0.0, y: 1.0, z: 0.0 };
        aTexUV[0] = { x: 0.0, y: 0.5 };
        aTexUV[1] = { x: 0.0, y: 0.0 };
        aTexUV[2] = { x: 1.0, y: 0.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aTop[0]);
        aPosition[1] = Vector3.Clone(pSketch.m_aTop[2]);
        aPosition[2] = Vector3.Clone(pSketch.m_aTop[3]);
        aTexUV[0] = { x: 0.0, y: 0.5 };
        aTexUV[1] = { x: 1.0, y: 0.0 };
        aTexUV[2] = { x: 1.0, y: 0.5 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aTop[0]);
        aPosition[1] = Vector3.Clone(pSketch.m_aTop[3]);
        aPosition[2] = Vector3.Clone(pSketch.m_aTop[4]);
        aTexUV[0] = { x: 0.0, y: 0.5 };
        aTexUV[1] = { x: 1.0, y: 0.5 };
        aTexUV[2] = { x: 1.0, y: 1.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aTop[0]);
        aPosition[1] = Vector3.Clone(pSketch.m_aTop[4]);
        aPosition[2] = Vector3.Clone(pSketch.m_aTop[5]);
        aTexUV[0] = { x: 0.0, y: 0.5 };
        aTexUV[1] = { x: 1.0, y: 1.0 };
        aTexUV[2] = { x: 0.0, y: 1.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        if (pBuilder == AEdgeMesh.g_pMeshBuilder) {
            this.m_aMeshData[2] = pBuilder.GetMeshData();
        }
    }
    BuildInborderMesh(pSketch, pHoleList, pBuilder) {
        let aPosition = [null, null, null];
        let aNormal = [null, null, null];
        let aTexUV = [null, null, null];
        if (pBuilder == null) {
            pBuilder = AEdgeMesh.g_pMeshBuilder;
            pBuilder.Clear();
        }
        if (pHoleList != null) {
            for (let pHole of pHoleList) {
                aPosition[0] = Vector3.Clone(pHole.m_aBottom[5]);
                aPosition[1] = Vector3.Clone(pHole.m_aTop[5]);
                aPosition[2] = Vector3.Clone(pHole.m_aTop[1]);
                aNormal[0] = Vector3.Cross(Vector3.Sub(aPosition[1], aPosition[0]), Vector3.Sub(aPosition[2], aPosition[0]));
                aNormal[1] = Vector3.Clone(aNormal[0]);
                aNormal[2] = Vector3.Clone(aNormal[0]);
                aTexUV[0] = { x: 0.0, y: 1.0 };
                aTexUV[1] = { x: 0.0, y: 0.0 };
                aTexUV[2] = { x: 1.0, y: 0.0 };
                pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
                aPosition[0] = Vector3.Clone(pHole.m_aBottom[5]);
                aPosition[1] = Vector3.Clone(pHole.m_aTop[1]);
                aPosition[2] = Vector3.Clone(pHole.m_aBottom[1]);
                aNormal[0] = Vector3.Cross(Vector3.Sub(aPosition[1], aPosition[0]), Vector3.Sub(aPosition[2], aPosition[0]));
                aNormal[1] = Vector3.Clone(aNormal[0]);
                aNormal[2] = Vector3.Clone(aNormal[0]);
                aTexUV[0] = { x: 0.0, y: 1.0 };
                aTexUV[1] = { x: 1.0, y: 0.0 };
                aTexUV[2] = { x: 1.0, y: 1.0 };
                ;
                pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
                aPosition[0] = Vector3.Clone(pHole.m_aBottom[2]);
                aPosition[1] = Vector3.Clone(pHole.m_aTop[2]);
                aPosition[2] = Vector3.Clone(pHole.m_aTop[4]);
                aNormal[0] = Vector3.Cross(Vector3.Sub(aPosition[1], aPosition[0]), Vector3.Sub(aPosition[2], aPosition[0]));
                aNormal[1] = Vector3.Clone(aNormal[0]);
                aNormal[2] = Vector3.Clone(aNormal[0]);
                aTexUV[0] = { x: 0.0, y: 1.0 };
                aTexUV[1] = { x: 0.0, y: 0.0 };
                aTexUV[2] = { x: 1.0, y: 0.0 };
                pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
                aPosition[0] = Vector3.Clone(pHole.m_aBottom[2]);
                aPosition[1] = Vector3.Clone(pHole.m_aTop[4]);
                aPosition[2] = Vector3.Clone(pHole.m_aBottom[4]);
                aNormal[0] = Vector3.Cross(Vector3.Sub(aPosition[1], aPosition[0]), Vector3.Sub(aPosition[2], aPosition[0]));
                aNormal[1] = Vector3.Clone(aNormal[0]);
                aNormal[2] = Vector3.Clone(aNormal[0]);
                aTexUV[0] = { x: 0.0, y: 1.0 };
                aTexUV[1] = { x: 1.0, y: 0.0 };
                aTexUV[2] = { x: 1.0, y: 1.0 };
                pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
                aPosition[0] = Vector3.Clone(pHole.m_aBottom[5]);
                aPosition[1] = Vector3.Clone(pHole.m_aBottom[1]);
                aPosition[2] = Vector3.Clone(pHole.m_aBottom[2]);
                aNormal[0] = Vector3.Cross(Vector3.Sub(aPosition[1], aPosition[0]), Vector3.Sub(aPosition[2], aPosition[0]));
                aNormal[1] = Vector3.Clone(aNormal[0]);
                aNormal[2] = Vector3.Clone(aNormal[0]);
                aTexUV[0] = { x: 0.0, y: 0.0 };
                aTexUV[1] = { x: 0.0, y: 0.0 };
                aTexUV[2] = { x: 0.0, y: 0.0 };
                pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
                aPosition[0] = Vector3.Clone(pHole.m_aBottom[5]);
                aPosition[1] = Vector3.Clone(pHole.m_aBottom[2]);
                aPosition[2] = Vector3.Clone(pHole.m_aBottom[4]);
                aNormal[0] = Vector3.Cross(Vector3.Sub(aPosition[1], aPosition[0]), Vector3.Sub(aPosition[2], aPosition[0]));
                aNormal[1] = Vector3.Clone(aNormal[0]);
                aNormal[2] = Vector3.Clone(aNormal[0]);
                aTexUV[0] = { x: 0.0, y: 0.0 };
                aTexUV[1] = { x: 0.0, y: 0.0 };
                aTexUV[2] = { x: 0.0, y: 0.0 };
                pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
                aPosition[0] = Vector3.Clone(pHole.m_aTop[1]);
                aPosition[1] = Vector3.Clone(pHole.m_aTop[5]);
                aPosition[2] = Vector3.Clone(pHole.m_aTop[4]);
                aNormal[0] = Vector3.Cross(Vector3.Sub(aPosition[1], aPosition[0]), Vector3.Sub(aPosition[2], aPosition[0]));
                aNormal[1] = Vector3.Clone(aNormal[0]);
                aNormal[2] = Vector3.Clone(aNormal[0]);
                aTexUV[0] = { x: 1.0, y: 1.0 };
                aTexUV[1] = { x: 1.0, y: 1.0 };
                aTexUV[2] = { x: 1.0, y: 1.0 };
                pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
                aPosition[0] = Vector3.Clone(pHole.m_aTop[1]);
                aPosition[1] = Vector3.Clone(pHole.m_aTop[4]);
                aPosition[2] = Vector3.Clone(pHole.m_aTop[2]);
                aNormal[0] = Vector3.Cross(Vector3.Sub(aPosition[1], aPosition[0]), Vector3.Sub(aPosition[2], aPosition[0]));
                aNormal[1] = Vector3.Clone(aNormal[0]);
                aNormal[2] = Vector3.Clone(aNormal[0]);
                aTexUV[0] = { x: 1.0, y: 1.0 };
                aTexUV[1] = { x: 1.0, y: 1.0 };
                aTexUV[2] = { x: 1.0, y: 1.0 };
                pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
            }
        }
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[0]);
        aPosition[1] = Vector3.Clone(pSketch.m_aBottom[1]);
        aPosition[2] = Vector3.Clone(pSketch.m_aTop[1]);
        aNormal[0] = Vector3.Cross(Vector3.Sub(aPosition[1], aPosition[0]), Vector3.Sub(aPosition[2], aPosition[0]));
        aNormal[1] = Vector3.Clone(aNormal[0]);
        aNormal[2] = Vector3.Clone(aNormal[0]);
        aTexUV[0] = { x: 0.5, y: 1.0 };
        aTexUV[1] = { x: 0.0, y: 1.0 };
        aTexUV[2] = { x: 0.0, y: 0.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[0]);
        aPosition[1] = Vector3.Clone(pSketch.m_aTop[1]);
        aPosition[2] = Vector3.Clone(pSketch.m_aTop[0]);
        aTexUV[0] = { x: 0.5, y: 1.0 };
        aTexUV[1] = { x: 0.0, y: 0.0 };
        aTexUV[2] = { x: 0.5, y: 0.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[0]);
        aPosition[1] = Vector3.Clone(pSketch.m_aTop[0]);
        aPosition[2] = Vector3.Clone(pSketch.m_aTop[5]);
        aTexUV[0] = { x: 0.5, y: 1.0 };
        aTexUV[1] = { x: 0.5, y: 0.0 };
        aTexUV[2] = { x: 1.0, y: 0.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[0]);
        aPosition[1] = Vector3.Clone(pSketch.m_aTop[5]);
        aPosition[2] = Vector3.Clone(pSketch.m_aBottom[5]);
        aTexUV[0] = { x: 0.5, y: 1.0 };
        aTexUV[1] = { x: 1.0, y: 0.0 };
        aTexUV[2] = { x: 1.0, y: 1.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[3]);
        aPosition[1] = Vector3.Clone(pSketch.m_aBottom[4]);
        aPosition[2] = Vector3.Clone(pSketch.m_aTop[4]);
        aNormal[0] = Vector3.Cross(Vector3.Sub(aPosition[1], aPosition[0]), Vector3.Sub(aPosition[2], aPosition[0]));
        aNormal[1] = Vector3.Clone(aNormal[0]);
        aNormal[2] = Vector3.Clone(aNormal[0]);
        aTexUV[0] = { x: 0.5, y: 1.0 };
        aTexUV[1] = { x: 0.0, y: 1.0 };
        aTexUV[2] = { x: 0.0, y: 0.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[3]);
        aPosition[1] = Vector3.Clone(pSketch.m_aTop[4]);
        aPosition[2] = Vector3.Clone(pSketch.m_aTop[3]);
        aTexUV[0] = { x: 0.5, y: 1.0 };
        aTexUV[1] = { x: 0.0, y: 0.0 };
        aTexUV[2] = { x: 0.5, y: 0.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[3]);
        aPosition[1] = Vector3.Clone(pSketch.m_aTop[3]);
        aPosition[2] = Vector3.Clone(pSketch.m_aTop[2]);
        aTexUV[0] = { x: 0.5, y: 1.0 };
        aTexUV[1] = { x: 0.5, y: 0.0 };
        aTexUV[2] = { x: 1.0, y: 0.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(pSketch.m_aBottom[3]);
        aPosition[1] = Vector3.Clone(pSketch.m_aTop[2]);
        aPosition[2] = Vector3.Clone(pSketch.m_aBottom[2]);
        aTexUV[0] = { x: 0.5, y: 1.0 };
        aTexUV[1] = { x: 1.0, y: 0.0 };
        aTexUV[2] = { x: 1.0, y: 1.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        if (pBuilder == AEdgeMesh.g_pMeshBuilder) {
            this.m_aMeshData[3] = pBuilder.GetMeshData();
        }
    }
    BuildShadowMesh(pEdge, pBuilder) {
        let aPosition = [null, null, null];
        let aNormal = [null, null, null];
        let aTexUV = [null, null, null];
        aNormal[0] = { x: 0.0, y: 1.0, z: 0.0 };
        aNormal[1] = { x: 0.0, y: 1.0, z: 0.0 };
        aNormal[2] = { x: 0.0, y: 1.0, z: 0.0 };
        if (pBuilder == null) {
            pBuilder = AEdgeMesh.g_pMeshBuilder;
            pBuilder.Clear();
        }
        let pLeftPoint = pEdge.m_mLeftPoint.Object;
        let pRightPoint = pEdge.m_mRightPoint.Object;
        let mEdgeDir = Vector3.Sub(pRightPoint.m_mPosition, pLeftPoint.m_mPosition);
        let mNormal = Vector3.Cross(mEdgeDir, { x: 0.0, y: 1.0, z: 0.0 });
        let mDir1 = Vector3.Clone(mNormal);
        let mDir2 = Vector3.Clone(mNormal);
        let mDir4 = { x: -mNormal.x, y: -mNormal.y, z: -mNormal.z };
        let mDir5 = { x: -mNormal.x, y: -mNormal.y, z: -mNormal.z };
        let pLeftAdjoin = null;
        let pRightAdjoin = null;
        if (pLeftAdjoin != null) {
            let pLastAdjoin = pLeftAdjoin.m_mLastAdjoin.Object;
            let pNextAdjoin = pLeftAdjoin.m_mNextAdjoin.Object;
            if (pLastAdjoin != null) {
                let pLastAdjPoint = pLastAdjoin.m_mAdjPoint.Object;
                let mDivDir = Vector3.Add(Vector3.Normalize(mEdgeDir), Vector3.Normalize(Vector3.Sub(pLastAdjPoint.m_mPosition, pLeftPoint.m_mPosition)));
                let nLength = Vector3.Length(mDivDir);
                if (nLength != 0.0 && nLength < 1.90) {
                    mDir1 = Vector3.Clone(mDivDir);
                }
            }
            if (pNextAdjoin != null) {
                let pNextAdjPoint = pNextAdjoin.m_mAdjPoint.Object;
                let mDivDir = Vector3.Add(Vector3.Normalize(mEdgeDir), Vector3.Normalize(Vector3.Sub(pNextAdjPoint.m_mPosition, pLeftPoint.m_mPosition)));
                let nLength = Vector3.Length(mDivDir);
                if (nLength != 0.0 && nLength < 1.90) {
                    mDir5 = Vector3.Clone(mDivDir);
                }
            }
        }
        if (pRightAdjoin != null) {
            let pLastAdjoin = pRightAdjoin.m_mLastAdjoin.Object;
            let pNextAdjoin = pRightAdjoin.m_mNextAdjoin.Object;
            if (pLastAdjoin != null) {
                let pLastAdjPoint = pLastAdjoin.m_mAdjPoint.Object;
                let mDivDir = Vector3.Sub(Vector3.Normalize(Vector3.Sub(pLastAdjPoint.m_mPosition, pRightPoint.m_mPosition)), Vector3.Normalize(mEdgeDir));
                let nLength = Vector3.Length(mDivDir);
                if (nLength != 0.0 && nLength < 1.90) {
                    mDir4 = Vector3.Clone(mDivDir);
                }
            }
            if (pNextAdjoin != null) {
                let pNextAdjPoint = pNextAdjoin.m_mAdjPoint.Object;
                let mDivDir = Vector3.Sub(Vector3.Normalize(Vector3.Sub(pNextAdjPoint.m_mPosition, pRightPoint.m_mPosition)), Vector3.Normalize(mEdgeDir));
                let nLength = Vector3.Length(mDivDir);
                if (nLength != 0.0 && nLength < 1.90) {
                    mDir2 = Vector3.Clone(mDivDir);
                }
            }
        }
        let pSketch = pEdge.m_pSketch;
        let mPos1 = new Vector3(pSketch.m_aBottom[1].x, 0.005, pSketch.m_aBottom[1].z);
        let mPos2 = new Vector3(pSketch.m_aBottom[2].x, 0.005, pSketch.m_aBottom[2].z);
        let mPos4 = new Vector3(pSketch.m_aBottom[4].x, 0.005, pSketch.m_aBottom[4].z);
        let mPos5 = new Vector3(pSketch.m_aBottom[5].x, 0.005, pSketch.m_aBottom[5].z);
        let nPrj1 = Vector3.Dot(mNormal, mDir1);
        let nPrj2 = Vector3.Dot(mNormal, mDir2);
        let nPrj4 = Vector3.Dot({ x: -mNormal.x, y: -mNormal.y, z: -mNormal.z }, mDir4);
        let nPrj5 = Vector3.Dot({ x: -mNormal.x, y: -mNormal.y, z: -mNormal.z }, mDir5);
        let nScale1 = nPrj1 == 0 ? 5 : 0.15 / nPrj1;
        let nScale2 = nPrj2 == 0 ? 5 : 0.15 / nPrj2;
        let nScale4 = nPrj4 == 0 ? 5 : 0.15 / nPrj4;
        let nScale5 = nPrj5 == 0 ? 5 : 0.15 / nPrj5;
        let mPos11 = Vector3.Add(mPos1, Vector3.Scale(nScale1, mDir1));
        let mPos22 = Vector3.Add(mPos2, Vector3.Scale(nScale2, mDir2));
        let mPos44 = Vector3.Add(mPos4, Vector3.Scale(nScale4, mDir4));
        let mPos55 = Vector3.Add(mPos5, Vector3.Scale(nScale5, mDir5));
        aPosition[0] = Vector3.Clone(mPos1);
        aPosition[1] = Vector3.Clone(mPos11);
        aPosition[2] = Vector3.Clone(mPos22);
        aTexUV[0] = { x: 0.0, y: 1.0 };
        aTexUV[1] = { x: 0.0, y: 0.0 };
        aTexUV[2] = { x: 1.0, y: 0.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(mPos1);
        aPosition[1] = Vector3.Clone(mPos22);
        aPosition[2] = Vector3.Clone(mPos2);
        aTexUV[0] = { x: 0.0, y: 1.0 };
        aTexUV[1] = { x: 1.0, y: 0.0 };
        aTexUV[2] = { x: 1.0, y: 1.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(mPos55);
        aPosition[1] = Vector3.Clone(mPos5);
        aPosition[2] = Vector3.Clone(mPos4);
        aTexUV[0] = { x: 0.0, y: 0.0 };
        aTexUV[1] = { x: 0.0, y: 1.0 };
        aTexUV[2] = { x: 1.0, y: 1.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        aPosition[0] = Vector3.Clone(mPos55);
        aPosition[1] = Vector3.Clone(mPos4);
        aPosition[2] = Vector3.Clone(mPos44);
        aTexUV[0] = { x: 0.0, y: 0.0 };
        aTexUV[1] = { x: 1.0, y: 1.0 };
        aTexUV[2] = { x: 1.0, y: 0.0 };
        pBuilder.PushTriangle(aPosition, aNormal, aTexUV);
        if (pBuilder == AEdgeMesh.g_pMeshBuilder) {
            this.m_aMeshData[4] = pBuilder.GetMeshData();
        }
    }
    MapTexture(nIndex) {
    }
}
AEdgeMesh.g_pMeshBuilder = null;
class AAreaMesh {
    constructor() {
        this.m_mInnerPoint = new Vector3(0.0, 0.0, 0.0);
        this.m_pBottomData = null;
        this.m_pBottomMesh = null;
        this.m_pTexture = null;
    }
    version() {
        return 1000;
    }
    CreateGeometry(pBottomParent) {
        this.m_pBottomMesh = new GameObject("m_pBottomMesh", GameObjectType.Mesh);
        this.m_pBottomMesh.parent = pBottomParent;
        this.m_pBottomMesh.SetGeometry(this.m_pBottomData, new Material(MaterialType.AreaBottom));
        this.m_pBottomMesh.SetActive(true);
    }
    MapTexture(nIndex, pAttachment) {
        let pThis = this;
        let pMesh = this.m_pBottomMesh;
        if (pAttachment != null) {
            let pTexture = pAttachment.entity;
            let pItem = pAttachment.menuItem.Object;
            if (pTexture != null && pItem != null) {
                ALinerDC.DC.m_pLayerMgr.m_pDelegateList.push(function () {
                    pItem.LoadAndSet(null, function (pValid) {
                        pTexture.scale = new Vector2(-1.0 / pTexture.textureSize.x, 1.0 / pTexture.textureSize.y);
                        if (pTexture.texture) {
                            pTexture.texture.wrapS = THREE.RepeatWrapping;
                            pTexture.texture.wrapT = THREE.RepeatWrapping;
                        }
                        pMesh.m_pMaterial.SetTexture(0, pTexture.texture);
                        pMesh.m_pMaterial.SetTextureOffset(0, new Vector2(0.0, 0.0));
                        pMesh.m_pMaterial.SetTextureScale(0, pTexture.scale);
                        pMesh.m_pMaterial.m_pMaterial.needsUpdate = true;
                        pThis.m_pTexture = pTexture.texture;
                    });
                });
                return;
            }
        }
        pMesh.m_pMaterial.SetTexture(0, null);
    }
    HighLight(bLight) {
        let pMesh = this.m_pBottomMesh;
        if (bLight) {
            pMesh.m_pMaterial.m_pMaterial.color = new THREE.Color(0.91, 0.586, 0.477);
        }
        else {
            pMesh.m_pMaterial.m_pMaterial.color = new THREE.Color(1.0, 1.0, 1.0);
        }
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mInnerPoint.x = pReader.ReadSingle();
        this.m_mInnerPoint.y = pReader.ReadSingle();
        this.m_mInnerPoint.z = pReader.ReadSingle();
        let nCount = pReader.ReadInt32();
        if (nCount > 0) {
            let pMeshData = new AMeshData();
            let pBuffer = null;
            nCount = pReader.ReadInt32();
            pMeshData.m_aPosition = new Float32Array(nCount * 3);
            for (let i = 0; i < nCount * 3; i++) {
                pMeshData.m_aPosition[i] = pReader.ReadSingle();
            }
            nCount = pReader.ReadInt32();
            pMeshData.m_aNormal = new Float32Array(nCount * 3);
            for (let i = 0; i < nCount * 3; i++) {
                pMeshData.m_aNormal[i] = pReader.ReadSingle();
            }
            nCount = pReader.ReadInt32();
            pMeshData.m_aTexUV = new Float32Array(nCount * 2);
            for (let i = 0; i < nCount * 2; i++) {
                pMeshData.m_aTexUV[i] = pReader.ReadSingle();
            }
            this.m_pBottomData = pMeshData;
        }
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("AAreaMesh.UnSerialize(): Bad end!");
        }
    }
    CollideBottom(mPoint) {
        mPoint.y = 0.0;
        let aPosition = [null, null, null];
        let nIndex = 0;
        for (let i = 0; i < this.m_pBottomData.m_aPosition.length / 3; i++) {
            let j = i * 3;
            aPosition[nIndex] = new Vector3(this.m_pBottomData.m_aPosition[j], 0.0, this.m_pBottomData.m_aPosition[j + 2]);
            nIndex++;
            if (3 == nIndex) {
                let s = this.CalTriangleArea(aPosition[0], aPosition[1], aPosition[2]);
                let sa = this.CalTriangleArea(aPosition[0], aPosition[1], mPoint);
                let sb = this.CalTriangleArea(aPosition[1], aPosition[2], mPoint);
                let sc = this.CalTriangleArea(aPosition[2], aPosition[0], mPoint);
                if (Math.abs(s - (sa + sb + sc)) < 0.0001) {
                    return true;
                }
                nIndex = 0;
            }
        }
        return false;
    }
    CalTriangleArea(pa, pb, pc) {
        return Math.abs((pa.x * pb.z + pb.x * pc.z + pc.x * pa.z - pb.x * pa.z - pc.x * pb.z - pa.x * pc.z) / 2.0);
    }
}
class AAreaLabel {
    constructor() {
        this.m_pName = "";
        this.m_mPosition = new Vector3(0.0, 0.0, 0.0);
        this.m_mBottomTexture = new Handle(Attachment, 0);
        this.m_mTopTexture = new Handle(Attachment, 0);
        this.m_pArea = null;
        this.m_mFloor = new Handle(Attachment, 0);
    }
    version() {
        return 1000 + 1;
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_pName = pReader.ReadString();
        this.m_mPosition.x = pReader.ReadSingle();
        this.m_mPosition.y = pReader.ReadSingle();
        this.m_mPosition.z = pReader.ReadSingle();
        this.m_mBottomTexture.Number = pReader.ReadUInt32();
        this.m_mTopTexture.Number = pReader.ReadUInt32();
        if (nVersion > 1000) {
            let nFlag = pReader.ReadInt32();
            if (nFlag > 0) {
                this.m_pArea = new AAreaMesh();
                this.m_pArea.UnSerialize(pReader);
            }
        }
        if (nVersion > 1001) {
            let bHaveSaveViewState = pReader.ReadBoolean();
            if (bHaveSaveViewState) {
                let pViewState = new CameraState();
                pViewState.UnSerialize(pReader);
            }
        }
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("AAreaLabel.UnSerialize(): Bad end!");
        }
    }
}
var EntityType;
(function (EntityType) {
    EntityType[EntityType["Invalid"] = 0] = "Invalid";
    EntityType[EntityType["Group"] = 1] = "Group";
    EntityType[EntityType["Collection"] = 2] = "Collection";
    EntityType[EntityType["Component"] = 3] = "Component";
    EntityType[EntityType["Placeholder"] = 4] = "Placeholder";
})(EntityType || (EntityType = {}));
var CollectionType;
(function (CollectionType) {
    CollectionType[CollectionType["Invalid"] = 0] = "Invalid";
    CollectionType[CollectionType["ProjectFile"] = 1] = "ProjectFile";
    CollectionType[CollectionType["ATexture"] = 101] = "ATexture";
    CollectionType[CollectionType["AHoleModel"] = 102] = "AHoleModel";
    CollectionType[CollectionType["AEdgeModel"] = 103] = "AEdgeModel";
    CollectionType[CollectionType["ETexture"] = 201] = "ETexture";
    CollectionType[CollectionType["EBuildingModel"] = 202] = "EBuildingModel";
    CollectionType[CollectionType["EStoreyModel"] = 203] = "EStoreyModel";
    CollectionType[CollectionType["EFurnitureModel"] = 204] = "EFurnitureModel";
    CollectionType[CollectionType["EAssetsModel"] = 205] = "EAssetsModel";
    CollectionType[CollectionType["EPictureModel"] = 206] = "EPictureModel";
})(CollectionType || (CollectionType = {}));
var ComponentType;
(function (ComponentType) {
    ComponentType[ComponentType["Invalid"] = 0] = "Invalid";
    ComponentType[ComponentType["Panel"] = 1] = "Panel";
    ComponentType[ComponentType["Edge"] = 3] = "Edge";
    ComponentType[ComponentType["AreaBottom"] = 4] = "AreaBottom";
    ComponentType[ComponentType["AreaTop"] = 5] = "AreaTop";
})(ComponentType || (ComponentType = {}));
var DisplayType;
(function (DisplayType) {
    DisplayType[DisplayType["Normal"] = 0] = "Normal";
    DisplayType[DisplayType["Transparent"] = 1] = "Transparent";
    DisplayType[DisplayType["FrameModel"] = 2] = "FrameModel";
    DisplayType[DisplayType["Hide"] = 3] = "Hide";
})(DisplayType || (DisplayType = {}));
var GroupType;
(function (GroupType) {
    GroupType[GroupType["Invalid"] = 0] = "Invalid";
    GroupType[GroupType["Layer"] = 1] = "Layer";
    GroupType[GroupType["Area"] = 2] = "Area";
    GroupType[GroupType["Group"] = 3] = "Group";
})(GroupType || (GroupType = {}));
var ProgressState;
(function (ProgressState) {
    ProgressState[ProgressState["Preparing"] = 0] = "Preparing";
    ProgressState[ProgressState["Loading"] = 1] = "Loading";
    ProgressState[ProgressState["Processing"] = 2] = "Processing";
    ProgressState[ProgressState["Abort"] = 3] = "Abort";
    ProgressState[ProgressState["Exited"] = 4] = "Exited";
})(ProgressState || (ProgressState = {}));
class MenuType {
    constructor() {
        this.m_nID = 0;
        this.m_pName = null;
        this.m_pDesc = null;
        this.m_pIconUrl = null;
        this.m_pIcon = null;
    }
    get uiName() {
        return this.m_pName;
    }
    get uiDesc() {
        return this.m_pDesc;
    }
    get uiSprite() {
        return this.m_pIcon;
    }
    SetParent(pParent) {
        if (this.m_pParent != null) {
            alert("MenuType.SetParent(): m_pParent != null.");
            return;
        }
        this.m_pParent = pParent;
        if (this.m_pParent != null) {
            this.m_pParent.AddChild(this);
        }
    }
    AddChild(pChild) {
        if (pChild == null) {
            return;
        }
        if (this.m_pChildren == null) {
            this.m_pChildren = new Array();
        }
        this.m_pChildren.push(pChild);
    }
    Add(pItem, pHolder) {
        if (this.m_pElements == null) {
            this.m_pElements = new Array();
        }
        pItem.holder = pHolder;
        this.m_pElements.push(pItem);
    }
    Remove(pItem) {
        this.m_pElements.splice(this.m_pElements.indexOf(pItem), 1);
        if (this.m_pElements.length == 0) {
            this.m_pElements = null;
        }
    }
    Search(pItem, pHolder) {
        if (this.m_pElements != null) {
            for (let pCurItem of this.m_pElements) {
                if (pCurItem.id == pItem.id && pCurItem.holder == pHolder) {
                    return pCurItem;
                }
            }
        }
        return null;
    }
    Clear(pHolder) {
        if (this.m_pElements != null) {
            if (pHolder == null) {
                this.m_pElements = null;
            }
            else {
                let nIndex = 0;
                while (nIndex < this.m_pElements.length) {
                    if (this.m_pElements[nIndex].holder == pHolder) {
                        this.m_pElements.splice(nIndex, 1);
                    }
                    else {
                        nIndex++;
                    }
                }
                if (this.m_pElements.length == 0) {
                    this.m_pElements = null;
                }
            }
        }
    }
    get parent() {
        return this.m_pParent;
    }
    get children() {
        return this.m_pChildren;
    }
    get elements() {
        return this.m_pElements;
    }
}
class MenuItem {
    constructor() {
        this.m_mHandle = new Handle(MenuItem, 0);
        this.m_eCollectionType = CollectionType.Invalid;
        this.m_pCollectionDesc = null;
        this.m_pType = null;
        this.m_nLoading = 0;
        this.m_nRefCount = 0;
        this.m_pIcon = null;
        this.m_pAsyncList = null;
        this.m_pHolder = null;
    }
    get uiName() {
        return this.collectionDesc == null ? "未命名" : this.collectionDesc.name;
    }
    get uiDesc() {
        return this.collectionDesc == null ? "" : this.collectionDesc.desc;
    }
    get uiSprite() {
        return this.m_pIcon;
    }
    get version() {
        return 1000;
    }
    OnCreate(nID) {
    }
    OnEmploy(nID) {
        this.m_mHandle = new Handle(MenuItem, nID);
    }
    OnUnemploy() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mHandle.Number = pReader.ReadUInt32();
        this.m_eCollectionType = pReader.ReadInt32();
        let pDesc = MiaokitDC.DC.DescriptorFactory(this.m_eCollectionType);
        pDesc.UnSerialize(pReader);
        this.m_pCollectionDesc = pDesc;
        this.m_pType = null;
        this.m_nLoading = 0;
        this.m_nRefCount = 0;
        this.m_pIcon = null;
        this.m_pAsyncList = null;
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("MenuItem.UnSerialize(): Bad end!");
        }
    }
    Remap(mHeap) {
        this.m_mHandle.Heap = mHeap;
    }
    Init(eType, jData) {
        if (this.m_pCollectionDesc != null) {
            alert("MenuItem.Init(): m_pCollectionDesc != null.");
        }
        this.m_mHandle = new Handle(MenuItem, 0);
        this.m_eCollectionType = eType;
        let pDesc = MiaokitDC.DC.DescriptorFactory(this.m_eCollectionType);
        pDesc.Init(jData);
        this.m_pCollectionDesc = pDesc;
        this.m_pType = null;
        this.m_nLoading = 0;
        this.m_nRefCount = 0;
        this.m_pIcon = null;
        this.m_pAsyncList = null;
    }
    Reinit(pCallback) {
        pCallback(this);
    }
    LoadAndSet(pProgress, pCallback) {
        if (this.collectionDesc != null) {
            if (this.loading == 1) {
                if (pProgress != null) {
                    pProgress.state = ProgressState.Processing;
                }
                pCallback(this);
            }
            else if (this.loading == 0) {
                if (this.m_pAsyncList == null) {
                    if (pProgress != null) {
                        pProgress.state = ProgressState.Loading;
                    }
                    this.m_pAsyncList = new Array();
                    this.m_pAsyncList.push(new Delegate(pProgress, pCallback));
                    this.StartLoad(pProgress);
                }
                else {
                    if (pProgress != null) {
                        pProgress.loader = this.m_pAsyncList[0].m_pProgress.loader;
                        pProgress.state = ProgressState.Loading;
                    }
                    this.m_pAsyncList.push(new Delegate(pProgress, pCallback));
                }
            }
            else {
                if (pProgress != null) {
                    pProgress.state = ProgressState.Abort;
                }
                pCallback(null);
            }
        }
    }
    StartLoad(pProgress) {
        let pThis = this;
        this.collectionDesc.Load(pProgress, function (pError) {
            if (pError == null) {
                pThis.loading = 1;
                if (pThis.m_pAsyncList != null) {
                    for (let pDelegate of pThis.m_pAsyncList) {
                        if (pDelegate.m_pProgress != null) {
                            pDelegate.m_pProgress.state = ProgressState.Processing;
                        }
                        pDelegate.m_pCallback(pThis);
                    }
                }
                pThis.m_pAsyncList = null;
            }
            else {
                console.warn("MenuItem.LoadAndSet(): ", pError);
                pThis.loading = -1;
                if (pThis.m_pAsyncList != null) {
                    for (let pDelegate of pThis.m_pAsyncList) {
                        if (pDelegate.m_pProgress != null) {
                            pDelegate.m_pProgress.state = ProgressState.Abort;
                        }
                        pDelegate.m_pCallback(null);
                    }
                }
                pThis.m_pAsyncList = null;
            }
        });
    }
    Destroy() {
        this.m_mHandle.Destroy();
        if (this.collectionDesc != null) {
            this.collectionDesc.Destory();
        }
        if (this.type != null) {
            this.type.Remove(this);
        }
        this.m_nLoading = 0;
        this.m_nRefCount = 0;
        this.m_pIcon = null;
        this.m_pAsyncList = null;
    }
    get handle() {
        return this.m_mHandle;
    }
    get collectionType() {
        return this.m_eCollectionType;
    }
    get collectionDesc() {
        return this.m_pCollectionDesc;
    }
    get id() {
        return this.collectionDesc == null ? -1 : this.collectionDesc.id;
    }
    get typeId() {
        return this.collectionDesc == null ? -1 : this.collectionDesc.typeId;
    }
    iconUrl() {
        return this.collectionDesc == null ? "" : this.collectionDesc.iconUrl;
    }
    get type() {
        return this.m_pType;
    }
    set type(pType) {
        this.m_pType = pType;
    }
    get loading() {
        return this.m_nLoading;
    }
    set loading(nLoading) {
        this.m_nLoading = nLoading;
    }
    get refCount() {
        return this.m_nRefCount;
    }
    set refCount(nRefCount) {
        this.m_nRefCount = nRefCount;
        if (this.m_nRefCount == 0) {
            this.Destroy();
        }
    }
    get holder() {
        return this.m_pHolder;
    }
    set holder(pHolder) {
        this.m_pHolder = pHolder;
    }
}
MenuItem.g_pContext = new HeapContext(MenuItem);
class Attachment {
    constructor() {
        this.m_mHandle = new Handle(Attachment, 0);
        this.m_mMaster = new Handle(Attachment, 0);
        this.m_mParent = new Handle(Attachment, 0);
        this.m_mMenuItem = new Handle(MenuItem, 0);
        this.m_pEntity = null;
        this.m_pBinding = null;
        this.m_nFlags = 0;
        this.m_pName = null;
        this.m_nUserData = 0;
        this.m_pHook = null;
    }
    get version() {
        return 1000;
    }
    OnCreate(nID) {
    }
    OnEmploy(nID) {
        this.m_mHandle = new Handle(Attachment, nID);
    }
    OnUnemploy() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mHandle.Number = pReader.ReadUInt32();
        this.m_mMaster.Number = pReader.ReadUInt32();
        this.m_mParent.Number = pReader.ReadUInt32();
        this.m_mMenuItem.Number = pReader.ReadUInt32();
        this.m_pBinding = pReader.ReadString();
        this.m_nFlags = pReader.ReadInt32();
        this.m_pName = pReader.ReadString();
        this.m_nUserData = pReader.ReadUInt32();
        this.valid = true;
        let eEntityType = pReader.ReadInt32();
        if (eEntityType == EntityType.Group) {
            let eGroupType = pReader.ReadInt32();
            this.m_pEntity = MiaokitDC.DC.GroupFactory(eGroupType);
            this.m_pEntity.UnSerialize(pReader);
        }
        else if (eEntityType == EntityType.Collection) {
            let eCollectionType = pReader.ReadInt32();
            this.m_pEntity = MiaokitDC.DC.CollectionFactory(eCollectionType, null);
            this.m_pEntity.UnSerialize(pReader);
        }
        else if (eEntityType == EntityType.Component) {
            let eComponentType = pReader.ReadInt32();
            this.m_pEntity = MiaokitDC.DC.ComponentFactory(eComponentType);
            this.m_pEntity.UnSerialize(pReader);
        }
        else {
            pReader.ReadInt32();
            this.m_pEntity = null;
            alert("Attachment.UnSerialize(): Invalid type!" + eEntityType);
        }
        if (pReader.ReadBoolean()) {
            let pCameraState = new CameraState();
            pCameraState.UnSerialize(pReader);
        }
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("Attachment.UnSerialize(): Bad end!");
        }
    }
    get handle() {
        return this.m_mHandle;
    }
    get master() {
        return this.m_mMaster;
    }
    set master(pMaster) {
        this.m_mMaster.Number = pMaster.Number;
    }
    get parent() {
        return this.m_mParent;
    }
    set parent(pParent) {
        this.m_mParent.Number = pParent.Number;
        alert("此处未完全实现");
    }
    get menuItem() {
        return this.m_mMenuItem;
    }
    set menuItem(mMenuItem) {
        this.m_mMenuItem.Number = mMenuItem.Number;
    }
    get entityType() {
        return this.m_pEntity == null ? EntityType.Invalid : this.m_pEntity.type;
    }
    get entity() {
        return this.m_pEntity;
    }
    set entity(pEntity) {
        this.m_pEntity = pEntity;
    }
    get binding() {
        return this.m_pBinding == null ? "" : this.m_pBinding;
    }
    get valid() {
        return (this.m_nFlags & 0x1) > 0;
    }
    set valid(bFlag) {
        if (bFlag) {
            this.m_nFlags |= 0x1;
        }
        else {
            this.m_nFlags &= ~0x1;
        }
    }
    get active() {
        return (this.m_nFlags & 0x2) > 0;
    }
    set active(bFlag) {
        if (bFlag) {
            this.m_nFlags |= 0x2;
        }
        else {
            this.m_nFlags &= ~0x2;
        }
    }
    get enable() {
        return (this.m_nFlags & 0x4) > 0;
    }
    set enable(bFlag) {
        if (bFlag) {
            this.m_nFlags |= 0x4;
        }
        else {
            this.m_nFlags &= ~0x4;
        }
    }
    get builtin() {
        return (this.m_nFlags & 0x8) > 0;
    }
    set builtin(bFlag) {
        if (bFlag) {
            this.m_nFlags |= 0x8;
        }
        else {
            this.m_nFlags &= ~0x8;
        }
    }
    get lockTransform() {
        return (this.m_nFlags & 0x10) > 0;
    }
    set lockTransform(bFlag) {
        if (bFlag) {
            this.m_nFlags |= 0x10;
        }
        else {
            this.m_nFlags &= ~0x10;
        }
    }
    get name() {
        return this.m_pName;
    }
    set name(pName) {
        this.m_pName = pName;
    }
    get userData() {
        return this.m_nUserData;
    }
    set userData(nUserData) {
        this.m_nUserData = nUserData;
    }
    get hook() {
        return this.m_pHook;
    }
    set hook(pHook) {
        this.m_pHook = pHook;
        if (this.m_pHook != null) {
            this.m_pBinding = this.m_pHook.name;
        }
    }
}
Attachment.g_pContext = new HeapContext(Attachment);
class AssetsLoader {
    constructor() {
        this.m_pMenuItemList = null;
        this.m_pDelegateList = null;
        this.m_pCache = null;
        this.m_pZipFile = null;
        this.m_pZipLoader = null;
        this.m_pProgressBar1 = null;
        this.m_pProgressBar2 = null;
        this.m_pProgressBar = null;
        this.m_nFlushRate = 0.0;
        this.m_nFlushScale = 0.0;
        this.m_pMenuItemList = new Array();
        this.m_pDelegateList = new Array();
        this.m_pCache = new Array();
    }
    PushItem(pItem) {
        this.m_pMenuItemList.push(pItem);
    }
    PushDelegate(nWork, pDelegate) {
        this.m_pDelegateList.push({ m_nWork: nWork, m_pDelegate: pDelegate });
    }
    Load(nIndex = 0) {
        let pThis = this;
        let nCount = pThis.m_pMenuItemList.length;
        if (nIndex == nCount) {
            let nCurWork = MiaokitDC.DC.m_nCurWork;
            for (let pDelegate of this.m_pDelegateList) {
                MiaokitDC.DC.SwitchWork(pDelegate.m_nWork);
                pDelegate.m_pDelegate();
            }
            if (Engine.g_pInstance.m_pProjectIdent == "EAM") {
            }
            else {
                Engine.g_pInstance.project.SwitchWorkForIndex(nCurWork);
                Engine.g_pInstance.project.ActiveFloor(ALinerDC.DC.m_pLayerMgr.m_pActiveLayer.m_nIndex);
            }
            pThis.m_pProgressBar = pThis.m_pProgressBar2;
            if (Engine.g_pInstance.m_pProjectEnd)
                Engine.g_pInstance.m_pProjectEnd();
            this.Load2(0);
            return;
        }
        if (nIndex < nCount) {
            pThis.m_pMenuItemList[nIndex].LoadAndSet(null, function (pValid) {
                pThis.Load(nIndex + 1);
            });
        }
    }
    Load2(nIndex = 0) {
        this.Flush(false, 0.0, 0.0);
        if (Engine.g_pInstance.m_pModelEnd)
            Engine.g_pInstance.m_pModelEnd();
        MiaokitDC.g_pScene.updateMatrixWorld(true);
        MiaokitDC.g_pScene.autoUpdate = false;
    }
    LoadModel(pUrl, pCallback) {
        let pThis = this;
        if (pUrl === null || pUrl.length < 1) {
            pUrl = "Model";
        }
        for (let pItem of pThis.m_pCache) {
            if (pUrl == pItem.m_pUrl) {
                pCallback(pItem.m_pObject);
                return;
            }
        }
        let pFile = pThis.m_pZipFile.file(pUrl);
        if (pFile != undefined && pFile != null) {
            pThis.m_pZipFile.file(pUrl).async("string").then(function success(data) {
                new THREE.ObjectLoader().parse(JSON.parse(data), function (pObject) {
                    let pModel = new GameObject("", GameObjectType.Model);
                    pModel.m_pObject = pObject;
                    pThis.m_pCache.push({ m_pUrl: pUrl, m_pObject: pModel });
                    pCallback(pModel);
                });
            }, function error(err) {
                console.warn("AssetsLoader.LoadModel(): error.", pUrl);
                let pModel = new GameObject("error", GameObjectType.Empty);
                pThis.m_pCache.push({ m_pUrl: pUrl, m_pObject: pModel });
                pCallback(pModel);
            });
        }
        else {
            console.warn("AssetsLoader.LoadModel(): pFile == null.", pUrl);
            let pModel = new GameObject("error", GameObjectType.Empty);
            pThis.m_pCache.push({ m_pUrl: pUrl, m_pObject: pModel });
            pCallback(pModel);
        }
    }
    LoadTexture(pUrl, pCallback) {
        let pThis = this;
        for (let pItem of pThis.m_pCache) {
            if (pUrl == pItem.m_pUrl) {
                pCallback(pItem.m_pObject);
                return;
            }
        }
        let pFile = pThis.m_pZipFile.file(pUrl);
        if (pFile != undefined && pFile != null) {
            pFile.async("base64").then(function success(bytes) {
                let pTexture = new THREE.Texture();
                let pImage = new Image();
                let pType = pUrl.substr(pUrl.lastIndexOf(".") + 1);
                pImage.src = "data:image/" + pType + ";base64," + bytes;
                pTexture.image = pImage;
                pTexture.format = (pType === "jpg" || pType === "jpeg") ? THREE.RGBFormat : THREE.RGBAFormat;
                pTexture.wrapS = THREE.RepeatWrapping;
                pTexture.wrapT = THREE.RepeatWrapping;
                pTexture.needsUpdate = true;
                pThis.m_pCache.push({ m_pUrl: pUrl, m_pObject: pTexture });
                pCallback(pTexture);
            }, function error(err) {
                console.info("AssetsLoader.LoadTexture(): error.", pUrl);
                pThis.m_pCache.push({ m_pUrl: pUrl, m_pObject: null });
                pCallback(null);
            });
        }
        else {
            console.info("AssetsLoader.LoadTexture(): pFile == null.", pUrl);
            pThis.m_pCache.push({ m_pUrl: pUrl, m_pObject: null });
            pCallback(null);
        }
    }
    LoadImage(pUrl, pCallback) {
        let pImage = new Image();
        pImage.crossOrigin = "Anonymous";
        pImage.onload = function () {
            let pTexture = new THREE.Texture();
            let pType = pUrl.substr(pUrl.lastIndexOf(".") + 1);
            pTexture.image = pImage;
            pTexture.format = (pType === "jpg" || pType === "jpeg") ? THREE.RGBFormat : THREE.RGBAFormat;
            pTexture.needsUpdate = true;
            pCallback(pTexture);
        };
        pImage.src = pUrl;
    }
    LoadIcon(pUrl, pCallback) {
        let pThis = this;
        for (let pItem of this.m_pCache) {
            if (pUrl == pItem.m_pUrl) {
                pCallback(pItem.m_pObject);
                return;
            }
        }
        if (true) {
            pThis.LoadImage(pUrl, function (pTexture) {
                if (pTexture != null) {
                    let pMaterial = new Material(MaterialType.Point);
                    pMaterial.SetTexture(0, pTexture);
                    pThis.m_pCache.push({ m_pUrl: pUrl, m_pObject: pMaterial });
                    pCallback(pMaterial);
                }
                else {
                    pThis.m_pCache.push({ m_pUrl: pUrl, m_pObject: null });
                    pCallback(null);
                }
            });
        }
        else {
        }
    }
    LoadProject(pUrl, pCallback) {
        let pThis = this;
        pThis.m_pProgressBar = pThis.m_pProgressBar1;
        pThis.LoadResources(function () {
            pThis.Flush(true, 0.4, 0.2);
            pThis.m_pZipFile.file("project.bin").async("arraybuffer").then(function success(data) {
                pThis.Flush(true, 0.45, 1.5);
                pCallback(data);
            }, function error(err) {
                pThis.Flush(true, 0.45, 1.5);
                pCallback(null);
            });
        });
    }
    LoadJson(pUrl, pCallback) {
        let pThis = this;
        let pFile = pThis.m_pZipFile.file(pUrl);
        if (pFile != undefined && pFile != null) {
            pThis.m_pZipFile.file(pUrl).async("string").then(function success(data) {
                pCallback(JSON.parse(data));
            }, function error(err) {
                console.info("AssetsLoader.LoadJson(): error.", pUrl);
                pCallback(null);
            });
        }
        else {
            console.info("AssetsLoader.LoadJson(): pFile == null.", pUrl);
            pCallback(null);
        }
    }
    LoadMinor() {
        this.Flush(false, 0.0, 0.0);
        let pThis = this;
        let pProjectBaoName = "";
        if (Engine.g_pInstance.m_pProjectBaoName)
            pProjectBaoName = Engine.g_pInstance.m_pProjectBaoName;
        pThis.m_pZipLoader(pProjectBaoName, function (pZip) {
            pThis.m_pZipFile = pZip;
            pThis.Load();
        });
    }
    LoadResources(pCallback) {
        let pThis = this;
        pThis.Flush(true, 0.0, 0.3);
        let pProjectBaoName = "";
        if (Engine.g_pInstance.m_aFirstProjectBaoNameList)
            pProjectBaoName = Engine.g_pInstance.m_aFirstProjectBaoNameList[0];
        pThis.m_pZipLoader(pProjectBaoName, function (pZip) {
            pThis.Flush(true, 0.3, 0.05);
            pThis.m_pZipFile = pZip;
            pThis.LoadTexture("lightmap.png", function (pTexture) {
                pThis.Flush(true, 0.35, 0.05);
                pTexture.wrapS = THREE.RepeatWrapping;
                pTexture.wrapT = THREE.RepeatWrapping;
                pTexture.repeat.set(1.0, -1.0);
                Material.g_aMaterial[1] = new THREE.MeshBasicMaterial({ map: pTexture, transparent: false, opacity: 1.0 });
                Material.g_aMaterial[3] = Material.g_aMaterial[1];
                pThis.LoadTexture("shadow.png", function (pTexture) {
                    pTexture.wrapS = THREE.RepeatWrapping;
                    pTexture.wrapT = THREE.RepeatWrapping;
                    pTexture.repeat.set(1.0, 1.0);
                    Material.g_aMaterial[5] = new THREE.MeshBasicMaterial({ map: pTexture, transparent: true, opacity: 1.0 });
                    Material.g_aMaterial[0] = new THREE.MeshBasicMaterial();
                    Material.g_aMaterial[2] = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: false, opacity: 1.0 });
                    Material.g_aMaterial[4] = new THREE.MeshBasicMaterial({ color: 0xFAFAFA, side: THREE.DoubleSide, map: null, transparent: false, opacity: 1.0 });
                    Material.g_aMaterial[6] = new THREE.MeshBasicMaterial({ color: 0x006699, side: THREE.DoubleSide });
                    Material.g_aMaterial[7] = new THREE.PointsMaterial({ size: 16, sizeAttenuation: false, map: null, alphaTest: 0.0, transparent: true });
                    pThis.LoadTexture("poi.png", function (pTexture) {
                        Engine.g_pInstance.m_pImagePOI = pTexture;
                        pThis.LoadTexture("centre.png", function (pTexture) {
                            Engine.g_pInstance.m_pImageCentre = pTexture;
                            pThis.LoadTexture("tack.png", function (pTexture) {
                                Engine.g_pInstance.m_pImageTack = pTexture;
                                pCallback();
                            });
                        });
                    });
                });
            });
        });
    }
    Flush(bShow, nRate, nScale) {
        this.m_nFlushRate = nRate;
        this.m_nFlushScale = nScale;
        this.m_pProgressBar(bShow, nRate);
    }
    FlushRate(pXhr) {
        this.m_pProgressBar(true, this.m_nFlushRate + this.m_nFlushScale * pXhr.loaded / pXhr.total);
    }
}
class Delegate {
    constructor(pProgress, pCallback) {
        this.m_pProgress = null;
        this.m_pCallback = null;
        this.m_pProgress = pProgress;
        this.m_pCallback = pCallback;
    }
}
class CameraState {
    constructor() {
        this.m_mPerspectPos = new Vector3(0.0, 0.0, 0.0);
        this.m_nVRotated = 0.0;
        this.m_nHRotated = 0.0;
        this.m_nForwardMoved = 0.0;
        this.m_mOrthoPos = new Vector3(0.0, 0.0, 0.0);
        this.m_nOrthoScaled = 0.0;
        this.m_nZRotated = 0.0;
    }
    get version() {
        return 1000;
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mPerspectPos.x = pReader.ReadSingle();
        this.m_mPerspectPos.y = pReader.ReadSingle();
        this.m_mPerspectPos.z = pReader.ReadSingle();
        this.m_nVRotated = pReader.ReadSingle();
        this.m_nHRotated = pReader.ReadSingle();
        this.m_mOrthoPos.x = pReader.ReadSingle();
        this.m_mOrthoPos.y = pReader.ReadSingle();
        this.m_mOrthoPos.z = pReader.ReadSingle();
        this.m_nOrthoScaled = pReader.ReadSingle();
        this.m_nZRotated = pReader.ReadSingle();
        this.m_nForwardMoved = pReader.ReadSingle();
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("CameraCtrl.Config.UnSerialize(): Bad end!");
        }
    }
}
class GeospatialDC {
    constructor(pScene, pContext) {
        this.m_aDrawList = [];
        this.m_pRoot = null;
        this.iii = 0;
        let vShader = " \
            uniform vec4 param1; \
            uniform vec4 param2; \
            uniform vec4 param3; \
            varying vec4 color_; \
            void main()	{ \
                uint vertex = uint(gl_VertexID); \
                uint row = vertex / uint(param2.y); \
                uint col = vertex % uint(param2.y) / 6u; \
                uint index = vertex % 6u; \
                float lon = param1.x + param1.z * float(col); \
                float lat = param1.y + param1.w * float(row); \
                const vec2 lut[6] = vec2[6]( \
                    vec2(0.0f, 0.0f), \
                    vec2(1.0f, 1.0f), \
                    vec2(0.0f, 1.0f), \
                    vec2(0.0f, 0.0f), \
                    vec2(1.0f, 0.0f), \
                    vec2(1.0f, 1.0f)); \
                lon += lut[index].x * param1.z; \
                lat += lut[index].y * param1.w; \
                float u = lon * 6378137.0;\
                float v = log(tan(0.7853981633974483 + lat * 0.5)) * 6378137.0;\
                u = (u - param3.x) / param3.z; \
                v = (v - param3.y) / param3.z; \
                float x = param2.x * cos(lat) * cos(lon); \
                float y = param2.x * sin(lat); \
                float z = param2.x * cos(lat) * sin(lon); \
                color_ = vec4(u, v, param2.z * 0.125, param2.w * 0.125); \
                gl_Position = projectionMatrix * modelViewMatrix * vec4(x, y, z, 1.0f); \
            }";
        let pShader = " \
            uniform sampler2D map; \
            varying vec4 color_; \
            void main()	{ \
                vec4 color = texture2D(map, color_.xy); \
                gl_FragColor = color; \
            }";
        let pUniforms = {
            map: { type: 't', value: null },
            param1: { value: new THREE.Vector4(0, 0, 0, 0) },
            param2: { value: new THREE.Vector4(0, 0, 0, 0) },
            param3: { value: new THREE.Vector4(0, 0, 0, 0) }
        };
        let pMaterial = new THREE.ShaderMaterial({
            uniforms: pUniforms,
            vertexShader: vShader,
            fragmentShader: pShader
        });
        let pObject = new THREE.ImmediateRenderObject();
        pObject.material = pMaterial;
        let pThis = this;
        pObject.render = function (pCallback) {
            let pUniformsTool = pMaterial.program.getUniforms();
            pThis.Render(function (nCount) {
                pCallback({ count: nCount });
            }, function (pName, pValue) {
                if (pName == "map") {
                    pUniformsTool.renderer.setTexture2D(pValue, pUniformsTool.map[pName].cache[0]);
                }
                else {
                    pUniformsTool.setValue(pContext, pName, pValue);
                }
            });
        };
        GTile.g_pBlankMap = new THREE.TextureLoader().load("./images/blank.jpg", function (pTexture) {
            pTexture.format = THREE.RGBFormat;
            pTexture.wrapS = THREE.RepeatWrapping;
            pTexture.wrapT = THREE.RepeatWrapping;
            pTexture.magFilter = THREE.NearestFilter;
            pTexture.minFilter = THREE.NearestFilter;
            pTexture.needsUpdate = true;
        });
        pScene.add(pObject);
        this.m_pRoot = new GTile();
        let r = 6378137.0 * Math.cos(25.29 / 180.0 * Math.PI);
        let x = r * Math.cos(110.28 / 180.0 * Math.PI);
        let y = 6378137.0 * Math.sin(25.29 / 180.0 * Math.PI);
        let z = r * Math.sin(110.28 / 180.0 * Math.PI);
        console.log(":::::::::::", x, y, z);
        var cube = new THREE.Mesh(new THREE.CubeGeometry(20, 20, 20), new THREE.MeshBasicMaterial({
            color: 0xff0000
        }));
        cube.position.set(x, y, z);
        pScene.add(cube);
    }
    Update(rLng, rLat, nLevel) {
        GTile.g_nLavel = nLevel;
        let aQueue = [this.m_pRoot];
        let aDrawList = [];
        while (0 < aQueue.length) {
            let pTile = aQueue.shift();
            let aChild = pTile.CheckSpread(rLng, rLat);
            if (aChild) {
                aQueue = aQueue.concat(aChild);
            }
            else {
                aDrawList.push(pTile);
            }
        }
        this.m_aDrawList = aDrawList;
    }
    Update2() {
        if (this.iii++ === 120) {
            if (Engine.g_pInstance.m_pProjectIdent === "EAM") {
            }
            else {
                Engine.g_pInstance.m_pCameraCtrl.mode = 4;
            }
        }
        if (this.iii === 360) {
            let r = 6378137.0 * Math.cos(25.29 / 180.0 * Math.PI);
            let x = r * Math.cos(110.28 / 180.0 * Math.PI);
            let y = 6378137.0 * Math.sin(25.29 / 180.0 * Math.PI);
            let z = r * Math.sin(110.28 / 180.0 * Math.PI);
            MiaokitDC.DC.GetWork(0).m_pWorkRoot.m_pObject.position.set(x, y, z);
            MiaokitDC.g_pScene.updateMatrixWorld(true);
            let pState = new CameraState();
            pState.m_mPerspectPos = new Vector3(0.0, 0.0, 0.0);
            pState.m_nForwardMoved = 6378137.0 + 600;
            pState.m_nVRotated = 25.29;
            pState.m_nHRotated = 110.28 + 90;
            pState.m_mOrthoPos = new Vector3(0.0, 0.0, 0.0);
            pState.m_nOrthoScaled = 100.0;
            pState.m_nZRotated = 0;
            Engine.g_pInstance.m_pCameraCtrl.Flyto(pState);
        }
    }
    Render(pDraw, pSetValue) {
        for (let pTile of this.m_aDrawList) {
            pTile.Draw(pDraw, pSetValue);
        }
    }
}
GeospatialDC.DC = null;
class GTile {
    constructor(pInfo = undefined, pRect = undefined) {
        this.m_nLevel = 0;
        this.m_nCol = 0;
        this.m_nRow = 0;
        this.m_nDivCount = 0;
        this.m_pMap = undefined;
        this.m_aChild = null;
        this.m_nWest = 0;
        this.m_nEast = 0;
        this.m_nSouth = 0;
        this.m_nNorth = 0;
        this.m_rWest = 0;
        this.m_rEast = 0;
        this.m_rSouth = 0;
        this.m_rNorth = 0;
        this.m_rRadius = 0;
        if (!pInfo && !pRect) {
            this.m_nLevel = 0;
            this.m_nCol = 0;
            this.m_nRow = 0;
            this.m_nDivCount = 64;
            this.m_nWest = Math.PI * -6378137;
            this.m_nEast = Math.PI * 6378137;
            this.m_nSouth = Math.PI * -6378137;
            this.m_nNorth = Math.PI * 6378137;
            this.m_rWest = this.m_nWest / 6378137;
            this.m_rEast = this.m_nEast / 6378137;
            this.m_rSouth = 2 * Math.atan(Math.exp(this.m_nSouth / 6378137)) - (Math.PI * 0.5);
            this.m_rNorth = 2 * Math.atan(Math.exp(this.m_nNorth / 6378137)) - (Math.PI * 0.5);
            this.m_rRadius = ((this.m_rEast - this.m_rWest) * (this.m_rEast - this.m_rWest)) + ((this.m_rNorth - this.m_rSouth) * (this.m_rNorth - this.m_rSouth));
        }
        else {
            this.m_nLevel = pInfo.nLevel;
            this.m_nCol = pInfo.nCol;
            this.m_nRow = pInfo.nRow;
            this.m_nDivCount = 64;
            if (pRect) {
                this.m_nWest = pRect.nWest;
                this.m_nEast = pRect.nEast;
                this.m_nSouth = pRect.nSouth;
                this.m_nNorth = pRect.nNorth;
                this.m_rWest = this.m_nWest / 6378137;
                this.m_rEast = this.m_nEast / 6378137;
                this.m_rSouth = 2 * Math.atan(Math.exp(this.m_nSouth / 6378137)) - (Math.PI * 0.5);
                this.m_rNorth = 2 * Math.atan(Math.exp(this.m_nNorth / 6378137)) - (Math.PI * 0.5);
                this.m_rRadius = ((this.m_rEast - this.m_rWest) * (this.m_rEast - this.m_rWest)) + ((this.m_rNorth - this.m_rSouth) * (this.m_rNorth - this.m_rSouth));
            }
        }
    }
    Draw(pDraw, pSetValue) {
        if (undefined === this.m_pMap) {
            this.LoadMap();
        }
        pSetValue("param1", new THREE.Vector4(this.m_rWest, this.m_rSouth, (this.m_rEast - this.m_rWest) / this.m_nDivCount, (this.m_rNorth - this.m_rSouth) / this.m_nDivCount));
        pSetValue("param2", new THREE.Vector4(6378137, 6 * this.m_nDivCount, this.m_nLevel < 9 ? this.m_nLevel : 0, this.m_nLevel < 9 ? 0 : this.m_nLevel));
        pSetValue("param3", new THREE.Vector4(this.m_nWest, this.m_nSouth, (this.m_nEast - this.m_nWest), 0));
        if (!this.m_pMap) {
            pSetValue("map", GTile.g_pBlankMap);
        }
        else {
            pSetValue("map", this.m_pMap);
        }
        pDraw(6 * this.m_nDivCount * this.m_nDivCount);
    }
    Split() {
        let aChild = [];
        let nHalf = (this.m_nEast - this.m_nWest) * 0.5;
        let nCol = 2 * this.m_nCol;
        let nRow = 2 * this.m_nRow;
        let pInfo = {
            nLevel: this.m_nLevel + 1,
            nCol: nCol + 0,
            nRow: nRow + 1
        };
        let pRect = {
            nWest: this.m_nWest,
            nEast: this.m_nWest + nHalf,
            nSouth: this.m_nSouth,
            nNorth: this.m_nSouth + nHalf
        };
        aChild[0] = new GTile(pInfo, pRect);
        pInfo = {
            nLevel: this.m_nLevel + 1,
            nCol: nCol + 1,
            nRow: nRow + 1
        };
        pRect = {
            nWest: this.m_nWest + nHalf,
            nEast: this.m_nEast,
            nSouth: this.m_nSouth,
            nNorth: this.m_nSouth + nHalf
        };
        aChild[1] = new GTile(pInfo, pRect);
        pInfo = {
            nLevel: this.m_nLevel + 1,
            nCol: nCol + 0,
            nRow: nRow + 0
        };
        pRect = {
            nWest: this.m_nWest,
            nEast: this.m_nWest + nHalf,
            nSouth: this.m_nSouth + nHalf,
            nNorth: this.m_nNorth
        };
        aChild[2] = new GTile(pInfo, pRect);
        pInfo = {
            nLevel: this.m_nLevel + 1,
            nCol: nCol + 1,
            nRow: nRow + 0
        };
        pRect = {
            nWest: this.m_nWest + nHalf,
            nEast: this.m_nEast,
            nSouth: this.m_nSouth + nHalf,
            nNorth: this.m_nNorth
        };
        aChild[3] = new GTile(pInfo, pRect);
        return aChild;
    }
    LoadMap() {
        let pParam = "&x=" + this.m_nCol + "&y=" + this.m_nRow + "&l=" + this.m_nLevel;
        let pUrl = "http://t1.tianditu.gov.cn/DataServer?T=img_w&tk=fb14b0853d59b619e18c259898bd0d4d" + pParam;
        let pThis = this;
        pThis.m_pMap = null;
        new THREE.TextureLoader().load(pUrl, function (pTexture) {
            pTexture.format = THREE.RGBFormat;
            pTexture.wrapS = THREE.RepeatWrapping;
            pTexture.wrapT = THREE.RepeatWrapping;
            pTexture.magFilter = THREE.NearestFilter;
            pTexture.minFilter = THREE.NearestFilter;
            pTexture.needsUpdate = true;
            pThis.m_pMap = pTexture;
        });
    }
    CheckSpread(rLng, rLat) {
        if (this.m_nLevel == GTile.g_nLavel) {
            return null;
        }
        let rCenterLng = (this.m_rEast + this.m_rWest) * 0.5;
        let rCenterLat = (this.m_rNorth + this.m_rSouth) * 0.5;
        let rRadius = ((rLng - rCenterLng) * (rLng - rCenterLng)) + ((rLat - rCenterLat) * (rLat - rCenterLat));
        if (rRadius < this.m_rRadius) {
            if (!this.m_aChild) {
                this.m_aChild = this.Split();
            }
            return this.m_aChild;
        }
        return null;
    }
}
GTile.g_pBlankMap = null;
GTile.g_nLavel = 4;
class Hook {
    constructor(pObject) {
        this.m_pObject = null;
        this.m_pAttachment = null;
        this.m_pObject = pObject;
    }
    SetLayer() {
    }
    get name() {
        return this.gameObject.name;
    }
    get gameObject() {
        return this.m_pObject;
    }
    get attachment() {
        return this.m_pAttachment;
    }
    set attachment(pAttachment) {
        this.m_pAttachment = pAttachment;
    }
    static LayerEnumToLayer(eType) {
        return eType - LayerType.Invalid;
    }
    static EntityEnumToLayer(eType) {
        let eLayer = LayerType.Invalid;
        switch (eType) {
            case CollectionType.AHoleModel:
                eLayer = LayerType.AHoleModel;
                break;
            case CollectionType.AEdgeModel:
                eLayer = LayerType.AEdgeModel;
                break;
            case CollectionType.EBuildingModel:
                eLayer = LayerType.EBuildingModel;
                break;
            case CollectionType.EStoreyModel:
                eLayer = LayerType.EStoreyModel;
                break;
            case CollectionType.EFurnitureModel:
                eLayer = LayerType.EFurnitureModel;
                break;
            case CollectionType.EAssetsModel:
                eLayer = LayerType.EAssetsModel;
                break;
            default:
                alert("Hook.EntityEnumToLayer(): !eType " + eType);
                break;
        }
        return this.LayerEnumToLayer(eLayer);
    }
    static EntityEnumToLayer2(eType) {
        let eLayer = LayerType.Invalid;
        switch (eType) {
            case ComponentType.Panel:
                eLayer = LayerType.EPanel;
                break;
            case ComponentType.Edge:
                eLayer = LayerType.AEdge;
                break;
            case ComponentType.AreaBottom:
                eLayer = LayerType.AAreaBottom;
                break;
            case ComponentType.AreaTop:
                eLayer = LayerType.AAreaTop;
                break;
            default:
                alert("Hook.EntityEnumToLayer(): !eType " + eType);
                break;
        }
        return this.LayerEnumToLayer(eLayer);
    }
    static LayerToEntityEnum(nLayer) {
        let eLayer = nLayer + LayerType.Invalid;
        let pOutput = { m_eEntity: 0, m_eType: 0 };
        switch (eLayer) {
            case LayerType.AEdge:
                pOutput.m_eEntity = EntityType.Component;
                pOutput.m_eType = ComponentType.Edge;
                break;
            case LayerType.AAreaBottom:
                pOutput.m_eEntity = EntityType.Component;
                pOutput.m_eType = ComponentType.AreaBottom;
                break;
            case LayerType.AAreaTop:
                pOutput.m_eEntity = EntityType.Component;
                pOutput.m_eType = ComponentType.AreaTop;
                break;
            case LayerType.AHoleModel:
                pOutput.m_eEntity = EntityType.Collection;
                pOutput.m_eType = CollectionType.AHoleModel;
                break;
            case LayerType.AEdgeModel:
                pOutput.m_eEntity = EntityType.Collection;
                pOutput.m_eType = CollectionType.AEdgeModel;
                break;
            case LayerType.EBuildingModel:
                pOutput.m_eEntity = EntityType.Collection;
                pOutput.m_eType = CollectionType.EBuildingModel;
                break;
            case LayerType.EStoreyModel:
                pOutput.m_eEntity = EntityType.Collection;
                pOutput.m_eType = CollectionType.EStoreyModel;
                break;
            case LayerType.EFurnitureModel:
                pOutput.m_eEntity = EntityType.Collection;
                pOutput.m_eType = CollectionType.EFurnitureModel;
                break;
            case LayerType.EAssetsModel:
                pOutput.m_eEntity = EntityType.Collection;
                pOutput.m_eType = CollectionType.EAssetsModel;
                break;
            case LayerType.EPanel:
                pOutput.m_eEntity = EntityType.Component;
                pOutput.m_eType = ComponentType.Panel;
                break;
            case LayerType.EGroup:
                pOutput.m_eEntity = EntityType.Group;
                pOutput.m_eType = GroupType.Group;
                break;
            case LayerType.EPlaceholder:
                pOutput.m_eEntity = EntityType.Placeholder;
                pOutput.m_eType = 0;
                break;
            default:
                break;
        }
        return pOutput;
    }
}
var LayerType;
(function (LayerType) {
    LayerType[LayerType["Invalid"] = -8] = "Invalid";
    LayerType[LayerType["Horizontal"] = 1] = "Horizontal";
    LayerType[LayerType["TransformCtrl"] = 2] = "TransformCtrl";
    LayerType[LayerType["AEdge"] = 3] = "AEdge";
    LayerType[LayerType["AAreaBottom"] = 4] = "AAreaBottom";
    LayerType[LayerType["AAreaTop"] = 5] = "AAreaTop";
    LayerType[LayerType["AHoleModel"] = 6] = "AHoleModel";
    LayerType[LayerType["AEdgeModel"] = 7] = "AEdgeModel";
    LayerType[LayerType["EBuildingModel"] = 8] = "EBuildingModel";
    LayerType[LayerType["EStoreyModel"] = 9] = "EStoreyModel";
    LayerType[LayerType["EFurnitureModel"] = 10] = "EFurnitureModel";
    LayerType[LayerType["EAssetsModel"] = 11] = "EAssetsModel";
    LayerType[LayerType["EPanel"] = 12] = "EPanel";
    LayerType[LayerType["EGroup"] = 13] = "EGroup";
    LayerType[LayerType["EPlaceholder"] = 14] = "EPlaceholder";
    LayerType[LayerType["ELayerBounds"] = 15] = "ELayerBounds";
    LayerType[LayerType["WarningBoard"] = 16] = "WarningBoard";
    LayerType[LayerType["EPictureModel"] = 17] = "EPictureModel";
})(LayerType || (LayerType = {}));
class MiaokitDC {
    constructor() {
        this.DescriptorFactory = null;
        this.GroupFactory = null;
        this.CollectionFactory = null;
        this.ComponentFactory = null;
        this.m_bEnabled = false;
        this.m_eViewMode = ViewMode.Invalid;
        this.m_nCurWork = 0;
        this.m_aWork = null;
        this.m_pWorkArr = [];
        this.m_aWorkData = null;
        this.m_pAssetsLoader = null;
        this.m_pNavigator = null;
        this.m_pCategories = null;
        this.m_pProjectRoot = null;
        this.m_pBaseUrl = "project/";
        this.m_pServerUrl = "http://115.28.168.123:8015/";
        this.m_pCategories = new MenuType();
        this.m_pProjectRoot = new GameObject("MiaokitDC", GameObjectType.Empty);
        this.m_pNavigator = new NNavigator();
        this.m_pAssetsLoader = new AssetsLoader();
        MiaokitDC.g_pScene.add(this.m_pProjectRoot.m_pObject);
    }
    Update() {
        NavChartDC.DC.Update();
        EyejiaDC.DC.Update();
        ALinerDC.DC.Update();
    }
    InitWorks(aWorkData, pCallback) {
        if (this.m_bEnabled) {
            this.Reset();
            this.m_bEnabled = false;
        }
        this.m_aWorkData = aWorkData;
        this.m_aWork = new Array(256);
        for (let i = 0; i < 256; i++) {
            if (this.m_aWorkData[i] != null) {
                this.m_aWork[i] = new Work(i, this.m_aWorkData[i]);
                this.m_pWorkArr.push(this.m_aWork[i]);
            }
        }
        pCallback(null);
    }
    SwitchWork(nIndex) {
        if (Engine.g_pInstance.m_pProjectIdent == "EAM") {
            Engine.g_pInstance.m_bGotoWorkUpdateCameraStateMark = true;
        }
        if (this.m_aWork[nIndex] != null) {
            this.m_aWork[nIndex].Active();
            this.m_nCurWork = nIndex;
            this.m_bEnabled = true;
        }
        else {
            alert("MiaokitDC.SwitchWork(): m_aWork[nIndex] == null.");
        }
    }
    GetWork(nWork) {
        return this.m_aWork[nWork];
    }
    Reset() {
        for (let i = 0; i < 256; i++) {
            if (this.m_aWork[i] != null) {
                this.m_aWork[i].Destroy();
            }
            this.m_aWorkData[i] = null;
        }
        this.m_aWork = new Work[256];
        ALinerDC.DC = null;
        NavChartDC.DC = null;
        APoint.g_pContext.SwitchState(null);
        AAdjoin.g_pContext.SwitchState(null);
        AEdge.g_pContext.SwitchState(null);
        MenuItem.g_pContext.SwitchState(null);
        Attachment.g_pContext.SwitchState(null);
        NPoint.g_pContext.SwitchState(null);
        NAdjoin.g_pContext.SwitchState(null);
        NEdge.g_pContext.SwitchState(null);
        NLandmark.g_pContext.SwitchState(null);
        NavChart.g_pContext.SwitchState(null);
    }
    ActiveLayer(nIndex) {
        ALinerDC.DC.ActiveLayer(nIndex);
        NavChartDC.DC.ActiveLayer(nIndex);
        EyejiaDC.DC.ActiveLayer(nIndex);
    }
    BindMenuType(pItem) {
        return this.BindMenuType2(this.m_pCategories, pItem);
    }
    BindMenuType2(pType, pItem) {
        if (pType != null) {
            if (pItem.typeId == pType.m_nID) {
                pItem.type = pType;
                return true;
            }
            if (pType.children != null) {
                for (let pChild of pType.children) {
                    if (this.BindMenuType2(pChild, pItem)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    get viewMode() {
        return this.m_eViewMode;
    }
    set viewMode(eMode) {
        this.m_eViewMode = eMode;
        switch (eMode) {
            case ViewMode.View2D:
                Engine.g_pInstance.SetViewMode(0);
                break;
            case ViewMode.View3D:
                Engine.g_pInstance.SetViewMode(1);
                break;
        }
    }
}
MiaokitDC.g_pScene = null;
MiaokitDC.DC = null;
class Work {
    constructor(nIndex, aData) {
        this.m_pALinerDC = null;
        this.m_pEyejiaDC = null;
        this.m_pNavChartDC = null;
        this.m_pPointHeapState = null;
        this.m_pAdjoinHeapState = null;
        this.m_pEdgeHeapState = null;
        this.m_pMenuItemHeapState = null;
        this.m_pAttachmentHeapState = null;
        this.m_nIndex = 0;
        this.m_pID = null;
        this.m_aData = null;
        this.m_pWorkRoot = null;
        MiaokitDC.DC.m_aWork[nIndex] = this;
        this.m_pPointHeapState = APoint.g_pContext.SwitchState(null);
        this.m_pAdjoinHeapState = AAdjoin.g_pContext.SwitchState(null);
        this.m_pEdgeHeapState = AEdge.g_pContext.SwitchState(null);
        this.m_pMenuItemHeapState = MenuItem.g_pContext.SwitchState(null);
        this.m_pAttachmentHeapState = Attachment.g_pContext.SwitchState(null);
        this.m_pID = "";
        this.m_nIndex = nIndex;
        this.m_aData = aData;
        this.m_pWorkRoot = new GameObject("Work " + nIndex, GameObjectType.Empty);
        this.m_pWorkRoot.parent = MiaokitDC.DC.m_pProjectRoot;
        if (this.m_aData == null) {
            this.m_pALinerDC = new ALinerDC(this.m_nIndex, null);
            this.m_pEyejiaDC = new EyejiaDC(this.m_nIndex, null);
            this.m_pNavChartDC = new NavChartDC(this.m_nIndex, null);
        }
        else {
            let pReader = new BinaryReader(this.m_aData);
            this.UnSerialize(pReader);
        }
        console.log("为路点绑定房间");
        for (let layer of this.m_pALinerDC.m_pLayerMgr.m_pLayerList) {
            for (let Label of layer.m_pLabelList) {
                for (let Landmark of this.m_pNavChartDC.m_pLayerMgr.GetLayer(layer.m_nIndex).m_mLandmarkList) {
                    if (Label.m_pArea == null || Landmark.m_mPoint == null) {
                        continue;
                    }
                    if (Label.m_pArea.CollideBottom(Landmark.m_mPoint.Object.m_mPosition)) {
                        Landmark.m_pAAreaLabel = Label;
                    }
                }
            }
        }
        this.m_pPointHeapState = APoint.g_pContext.SwitchState(this.m_pPointHeapState);
        this.m_pAdjoinHeapState = AAdjoin.g_pContext.SwitchState(this.m_pAdjoinHeapState);
        this.m_pEdgeHeapState = AEdge.g_pContext.SwitchState(this.m_pEdgeHeapState);
        this.m_pMenuItemHeapState = MenuItem.g_pContext.SwitchState(this.m_pMenuItemHeapState);
        this.m_pAttachmentHeapState = Attachment.g_pContext.SwitchState(this.m_pAttachmentHeapState);
    }
    version() {
        return 1000;
    }
    Update() {
    }
    Active() {
        if (ALinerDC.DC != null) {
            ALinerDC.DC.Active(false);
        }
        if (EyejiaDC.DC != null) {
            EyejiaDC.DC.Active(false);
        }
        if (NavChartDC.DC != null) {
            NavChartDC.DC.Active(false);
        }
        APoint.g_pContext.SwitchState(this.m_pPointHeapState);
        AAdjoin.g_pContext.SwitchState(this.m_pAdjoinHeapState);
        AEdge.g_pContext.SwitchState(this.m_pEdgeHeapState);
        MenuItem.g_pContext.SwitchState(this.m_pMenuItemHeapState);
        Attachment.g_pContext.SwitchState(this.m_pAttachmentHeapState);
        ALinerDC.DC = this.m_pALinerDC;
        EyejiaDC.DC = this.m_pEyejiaDC;
        NavChartDC.DC = this.m_pNavChartDC;
        ALinerDC.DC.Active(true);
        EyejiaDC.DC.Active(true);
        NavChartDC.DC.Active(true);
    }
    Destroy() {
        console.warn("Work.Destroy(): Invalid.");
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_pID = pReader.ReadString();
        while (true) {
            let nIndex = pReader.ReadInt32();
            let nNext = pReader.ReadInt64();
            switch (nIndex) {
                case 0:
                    break;
                case 1:
                    this.m_pALinerDC = new ALinerDC(this.m_nIndex, pReader);
                    break;
                case 2:
                    this.m_pNavChartDC = new NavChartDC(this.m_nIndex, pReader);
                    break;
                case 3:
                    this.m_pEyejiaDC = new EyejiaDC(this.m_nIndex, pReader);
                    break;
                default:
                    alert("Work.UnSerialize(): Invalid module." + nIndex);
                    return;
            }
            if (nIndex == 0 && nNext == 0xFFFFFFFF) {
                break;
            }
        }
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("Work.UnSerialize(): Bad end!");
        }
    }
}
var ViewMode;
(function (ViewMode) {
    ViewMode[ViewMode["Invalid"] = 0] = "Invalid";
    ViewMode[ViewMode["View2D"] = 1] = "View2D";
    ViewMode[ViewMode["View3D"] = 2] = "View3D";
    ViewMode[ViewMode["Fps"] = 3] = "Fps";
})(ViewMode || (ViewMode = {}));
class BinaryWriter {
}
class BinaryReader {
    constructor(pBuffer) {
        this.m_pBuffer = null;
        this.m_pReader = null;
        this.m_nPosition = 0;
        this.m_pBuffer = pBuffer;
        this.m_pReader = new DataView(pBuffer);
        this.m_nPosition = 0;
    }
    set Position(nPosition) {
        this.m_nPosition = nPosition;
    }
    get Position() {
        return this.m_nPosition;
    }
    ReadBoolean() {
        let nValue = this.m_pReader.getInt8(this.m_nPosition);
        this.m_nPosition += 1;
        return nValue > 0;
    }
    ReadInt32() {
        let nValue = this.m_pReader.getInt32(this.m_nPosition, true);
        this.m_nPosition += 4;
        return nValue;
    }
    ReadUInt32() {
        let nValue = this.m_pReader.getUint32(this.m_nPosition, true);
        this.m_nPosition += 4;
        return nValue >>> 0;
    }
    ReadInt64() {
        let nValueL = this.ReadUInt32();
        let nValueH = this.ReadUInt32();
        if (nValueH == 0x7FFFFFFF && nValueL == 0xFFFFFFFF) {
            return 0xFFFFFFFF;
        }
        return (nValueH << 32) + nValueL;
    }
    ReadSingle() {
        let nValue = this.m_pReader.getFloat32(this.m_nPosition, true);
        this.m_nPosition += 4;
        return nValue;
    }
    ReadString() {
        let nCharNum = this.m_pReader.getUint8(this.m_nPosition);
        this.m_nPosition += 1;
        if (nCharNum > 128) {
            var nCharNum2 = this.m_pReader.getUint8(this.m_nPosition);
            this.m_nPosition += 1;
            nCharNum += nCharNum2 * 256;
        }
        var pCharArray = new Int8Array(this.m_pBuffer, this.m_nPosition, nCharNum);
        this.m_nPosition += nCharNum;
        return this.ByteToString(pCharArray);
    }
    ReadString2(nLength) {
        var pCharArray = new Int8Array(this.m_pBuffer, this.m_nPosition, nLength);
        this.m_nPosition += nLength;
        return this.ByteToString(pCharArray);
    }
    ReadBytes(nLength) {
        let pBuffer = this.m_pBuffer.slice(this.m_nPosition, this.m_nPosition + nLength);
        this.m_nPosition += nLength;
        return pBuffer;
    }
    ByteToString(pBytes) {
        let pString = "";
        for (var pos = 0; pos < pBytes.length;) {
            let nFlag = pBytes[pos];
            let nUnicode = 0;
            if ((nFlag >>> 7) === 0) {
                pString += String.fromCharCode(pBytes[pos]);
                pos += 1;
            }
            else if ((nFlag & 0xFC) === 0xFC) {
                nUnicode = (pBytes[pos] & 0x3) << 30;
                nUnicode |= (pBytes[pos + 1] & 0x3F) << 24;
                nUnicode |= (pBytes[pos + 2] & 0x3F) << 18;
                nUnicode |= (pBytes[pos + 3] & 0x3F) << 12;
                nUnicode |= (pBytes[pos + 4] & 0x3F) << 6;
                nUnicode |= (pBytes[pos + 5] & 0x3F);
                pString += String.fromCharCode(nUnicode);
                pos += 6;
            }
            else if ((nFlag & 0xF8) === 0xF8) {
                nUnicode = (pBytes[pos] & 0x7) << 24;
                nUnicode |= (pBytes[pos + 1] & 0x3F) << 18;
                nUnicode |= (pBytes[pos + 2] & 0x3F) << 12;
                nUnicode |= (pBytes[pos + 3] & 0x3F) << 6;
                nUnicode |= (pBytes[pos + 4] & 0x3F);
                pString += String.fromCharCode(nUnicode);
                pos += 5;
            }
            else if ((nFlag & 0xF0) === 0xF0) {
                nUnicode = (pBytes[pos] & 0xF) << 18;
                nUnicode |= (pBytes[pos + 1] & 0x3F) << 12;
                nUnicode |= (pBytes[pos + 2] & 0x3F) << 6;
                nUnicode |= (pBytes[pos + 3] & 0x3F);
                pString += String.fromCharCode(nUnicode);
                pos += 4;
            }
            else if ((nFlag & 0xE0) === 0xE0) {
                nUnicode = (pBytes[pos] & 0x1F) << 12;
                ;
                nUnicode |= (pBytes[pos + 1] & 0x3F) << 6;
                nUnicode |= (pBytes[pos + 2] & 0x3F);
                pString += String.fromCharCode(nUnicode);
                pos += 3;
            }
            else if ((nFlag & 0xC0) === 0xC0) {
                nUnicode = (pBytes[pos] & 0x3F) << 6;
                nUnicode |= (pBytes[pos + 1] & 0x3F);
                pString += String.fromCharCode(nUnicode);
                pos += 2;
            }
            else {
                pString += String.fromCharCode(pBytes[pos]);
                pos += 1;
            }
        }
        return pString;
    }
}
class GameObject {
    constructor(pName, eType) {
        this.m_nLayer = 0;
        this.m_pName = null;
        this.m_eType = GameObjectType.Empty;
        this.m_pObject = null;
        this.m_pMaterial = null;
        this.m_pHook = null;
        this.m_pName = pName;
        this.m_eType = eType;
        switch (eType) {
            case GameObjectType.Empty:
                this.m_pObject = new THREE.Group();
                break;
            case GameObjectType.Mesh:
                this.m_pObject = new THREE.Mesh();
                break;
            case GameObjectType.Model:
                this.m_pObject = null;
                break;
            case GameObjectType.Line:
                this.m_pObject = new THREE.Line();
                break;
            case GameObjectType.Point:
                this.m_pObject = new THREE.Points();
                break;
            default:
                alert("GameObject.constructor(): !eType.");
                break;
        }
        if (this.m_pObject != null) {
            this.m_pObject.name = this.m_pName;
            this.m_pObject.userData = this;
        }
    }
    SetActive(bActive) {
        this.m_pObject.visible = bActive;
    }
    Destroy() {
        if (this.m_pObject.parent != null) {
            return this.m_pObject.parent.remove(this.m_pObject);
        }
        this.m_pObject.userData = null;
        this.m_pObject = null;
        this.m_pMaterial = null;
    }
    SetGeometry(pMeshData, pMaterial) {
        let pGeometry = new THREE.BufferGeometry();
        pGeometry.addAttribute('position', new THREE.BufferAttribute(pMeshData.m_aPosition, 3));
        pGeometry.addAttribute('normal', new THREE.BufferAttribute(pMeshData.m_aNormal, 3));
        pGeometry.addAttribute('uv', new THREE.BufferAttribute(pMeshData.m_aTexUV, 2));
        this.m_pMaterial = pMaterial;
        this.m_pObject.geometry = pGeometry;
        this.m_pObject.material = pMaterial.m_pMaterial;
    }
    SetGeometry2(pGeometry, pMaterial) {
        this.m_pMaterial = pMaterial;
        this.m_pObject.geometry = pGeometry;
        this.m_pObject.material = pMaterial.m_pMaterial;
    }
    SetGeometry3(pGeometry, pMaterial) {
        this.m_pObject = new THREE.Mesh(pGeometry, pMaterial);
        this.m_pMaterial = null;
    }
    SetText(pText, pMaterial) {
        let pBuffer = new THREE.BufferGeometry();
        let pShapes = Material.g_pFont.generateShapes(pText, 0.5, 2);
        let pGeometry = new THREE.ShapeGeometry(pShapes);
        pGeometry.computeBoundingBox();
        let nMid = -0.5 * (pGeometry.boundingBox.max.x - pGeometry.boundingBox.min.x);
        pGeometry.translate(nMid, 0.0, 0.0);
        pBuffer.fromGeometry(pGeometry);
        this.m_pMaterial = pMaterial;
        this.m_pObject.geometry = pGeometry;
        this.m_pObject.material = pMaterial.m_pMaterial;
        this.m_pObject.rotateX(1.5708);
    }
    SetLine(aPoint) {
        let pGeometry = new THREE.Geometry();
        let pPointList = pGeometry.vertices;
        let pColorList = [];
        let pLastPoint = null;
        let pLength = 0.0;
        for (let pPoint of aPoint) {
            let pCurPoint = new THREE.Vector3(pPoint.x, 0.5, pPoint.z);
            if (pLastPoint != null) {
                pLength += pLastPoint.distanceTo(pCurPoint);
            }
            pLastPoint = pCurPoint;
            pPointList.push(pCurPoint);
        }
        for (let pPoint of aPoint) {
            let pColor = new THREE.Color(0xffffff);
            pColor.setHSL(0.3333 * (pLength - pPoint.x) / pLength, 1.0, 0.5);
            pColorList.push(pColor);
        }
        pGeometry.colors = pColorList;
        let pMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 1, linewidth: 20, vertexColors: THREE.VertexColors });
        this.m_pObject.geometry = pGeometry;
        this.m_pObject.material = pMaterial;
    }
    SetPoint(aPoint, pMaterial) {
        let pGeometry = new THREE.Geometry();
        pGeometry.vertices = aPoint;
        this.m_pMaterial = pMaterial;
        this.m_pObject.geometry = pGeometry;
        this.m_pObject.material = pMaterial.m_pMaterial;
        this.m_pObject.renderOrder = 999;
        this.m_pObject.onBeforeRender = function (renderer) { renderer.clearDepth(); };
    }
    AddHook() {
        if (this.m_pHook == null) {
            this.m_pHook = new Hook(this);
        }
        return this.m_pHook;
    }
    FindChild(pName) {
        let pChildren = this.m_pObject.children;
        let nCount = pChildren.length;
        for (let i = 0; i < nCount; i++) {
            let pChild = pChildren[i];
            let pType = typeof (this);
            if (pChild.name === pName) {
                if (pChild.userData == null || pType !== GameObject) {
                    let pObject = new GameObject("pName", GameObjectType.Model);
                    pObject.m_pObject = pChild;
                    pChild.userData = pObject;
                }
                return pChild.userData;
            }
        }
        return null;
    }
    CloneModel() {
        let pObject = new GameObject(this.name, this.m_eType);
        if (this.m_eType != GameObjectType.Model) {
            return pObject;
        }
        pObject.m_pObject = this.m_pObject.clone();
        pObject.m_pObject.name = this.m_pName;
        pObject.m_pObject.userData = pObject;
        pObject.m_pObject.needUpdate = true;
        return pObject;
    }
    SetParent(pParent, bStays) {
        if (pParent != null) {
            pParent.m_pObject.add(this.m_pObject);
        }
        else {
            if (this.m_pObject.parent != null) {
                this.m_pObject.parent.remove(this.m_pObject);
            }
        }
    }
    get name() {
        return this.m_pObject.name;
    }
    get layer() {
        return this.m_nLayer;
    }
    set layer(nLayer) {
        this.m_nLayer = nLayer;
    }
    get parent() {
        if (this.m_pObject.parent != null) {
            return this.m_pObject.parent.userData;
        }
        return null;
    }
    set parent(pParent) {
        if (pParent != null) {
            pParent.m_pObject.add(this.m_pObject);
        }
        else {
            if (this.m_pObject.parent) {
                this.m_pObject.parent.remove(this.m_pObject);
            }
        }
    }
    get position() {
        return new Vector3(this.m_pObject.position.x, this.m_pObject.position.y, this.m_pObject.position.z);
    }
    set position(mPosition) {
        this.m_pObject.position.set(mPosition.x, mPosition.y, mPosition.z);
    }
    get eulerAngles() {
        return new Vector3(this.m_pObject.rotation.x * 57.29578, this.m_pObject.rotation.y * 57.29578, this.m_pObject.rotation.z * 57.29578);
    }
    set eulerAngles(mAngles) {
        this.m_pObject.rotation.set(mAngles.x * 0.0174533, mAngles.y * 0.0174533, mAngles.z * 0.0174533);
    }
    get localScale() {
        return new Vector3(this.m_pObject.scale.x, this.m_pObject.scale.y, this.m_pObject.scale.z);
    }
    set localScale(mScale) {
        this.m_pObject.scale.set(mScale.x, mScale.y, mScale.z);
    }
}
class Material {
    constructor(eType) {
        this.m_pMaterial = null;
        this.m_aTexture = [null, null];
        switch (eType) {
            case MaterialType.Edge:
                this.m_pMaterial = Material.g_aMaterial[1].clone();
                break;
            case MaterialType.Border:
                this.m_pMaterial = Material.g_aMaterial[2].clone();
                break;
            case MaterialType.Inborder:
                this.m_pMaterial = Material.g_aMaterial[1].clone();
                break;
            case MaterialType.AreaBottom:
                this.m_pMaterial = Material.g_aMaterial[4].clone();
                break;
            case MaterialType.AreaBottomShadow:
                this.m_pMaterial = Material.g_aMaterial[5];
                break;
            case MaterialType.Text:
                this.m_pMaterial = Material.g_aMaterial[6];
                break;
            case MaterialType.Point:
                this.m_pMaterial = Material.g_aMaterial[7].clone();
                break;
            default:
                alert("Material.constructor(): !eType.");
                this.m_pMaterial = Material.g_aMaterial[0];
                break;
        }
    }
    SetTexture(nIndex, pTexture) {
        if (nIndex == 0) {
            this.m_aTexture[0] = pTexture;
            this.m_pMaterial.map = pTexture;
        }
        else {
            this.m_aTexture[1] = pTexture;
            this.m_pMaterial.map = pTexture;
        }
    }
    SetTextureOffset(nIndex, mOffset) {
        if (nIndex == 0) {
            if (this.m_aTexture[0] != null) {
                this.m_aTexture[0].offset.set(mOffset.x, mOffset.y);
            }
        }
        else {
            if (this.m_aTexture[1] != null) {
                this.m_aTexture[1].offset.set(mOffset.x, mOffset.y);
            }
        }
    }
    SetTextureScale(nIndex, mScale) {
        if (nIndex == 0) {
            if (this.m_aTexture[0] != null) {
                this.m_aTexture[0].repeat.set(mScale.x, mScale.y);
            }
        }
        else {
            if (this.m_aTexture[1] != null) {
                this.m_aTexture[1].repeat.set(mScale.x, mScale.y);
            }
        }
    }
}
Material.g_aMaterial = [null, null, null, null, null, null, null, null];
Material.g_pFont = null;
var GameObjectType;
(function (GameObjectType) {
    GameObjectType[GameObjectType["Empty"] = 0] = "Empty";
    GameObjectType[GameObjectType["Mesh"] = 1] = "Mesh";
    GameObjectType[GameObjectType["Model"] = 2] = "Model";
    GameObjectType[GameObjectType["Line"] = 3] = "Line";
    GameObjectType[GameObjectType["Point"] = 4] = "Point";
})(GameObjectType || (GameObjectType = {}));
var MaterialType;
(function (MaterialType) {
    MaterialType[MaterialType["Default"] = 0] = "Default";
    MaterialType[MaterialType["Edge"] = 1] = "Edge";
    MaterialType[MaterialType["Border"] = 2] = "Border";
    MaterialType[MaterialType["Inborder"] = 3] = "Inborder";
    MaterialType[MaterialType["AreaBottom"] = 4] = "AreaBottom";
    MaterialType[MaterialType["AreaBottomShadow"] = 5] = "AreaBottomShadow";
    MaterialType[MaterialType["Text"] = 6] = "Text";
    MaterialType[MaterialType["Point"] = 7] = "Point";
})(MaterialType || (MaterialType = {}));
class Vector4 {
    constructor(x, y, z, w) {
        this.x = 0.0;
        this.y = 0.0;
        this.z = 0.0;
        this.w = 0.0;
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
}
class Vector3 {
    constructor(x, y, z) {
        this.x = 0.0;
        this.y = 0.0;
        this.z = 0.0;
        this.x = x;
        this.y = y;
        this.z = z;
    }
    static Cross(a, b) {
        let a_ = new THREE.Vector3(a.x, a.y, a.z);
        let b_ = new THREE.Vector3(b.x, b.y, b.z);
        let c_ = a_.cross(b_).normalize();
        return { x: c_.x, y: c_.y, z: c_.z };
    }
    static Dot(a, b) {
        let a_ = new THREE.Vector3(a.x, a.y, a.z);
        let b_ = new THREE.Vector3(b.x, b.y, b.z);
        return a_.dot(b_);
    }
    static Sub(a, b) {
        return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
    }
    static Add(a, b) {
        return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
    }
    static Scale(s, a) {
        return { x: a.x * s, y: a.y * s, z: a.z * s };
    }
    static Distance(a, b) {
        return (new THREE.Vector3(a.x, a.y, a.z)).distanceTo(new THREE.Vector3(b.x, b.y, b.z));
    }
    static DistanceToLine(a, b, c) {
        let vLine = Vector3.Normalize(Vector3.Sub(c, b));
        let vLineP = Vector3.Sub(a, b);
        let nLenC = Vector3.Length(vLineP);
        nLenC *= nLenC;
        let nLenA = Vector3.Dot(vLineP, vLine);
        nLenA *= nLenA;
        let nDis = Math.sqrt(nLenC - nLenA);
        return nDis;
    }
    static Normalize(a) {
        let v = (new THREE.Vector3(a.x, a.y, a.z)).normalize();
        return { x: v.x, y: v.y, z: v.z };
    }
    static Length(a) {
        return (new THREE.Vector3(a.x, a.y, a.z)).length();
    }
    static Clone(a) {
        return { x: a.x, y: a.y, z: a.z };
    }
    static LerpVectors(a, b, lerp) {
        let v = new THREE.Vector3().lerpVectors(new THREE.Vector3(a.x, a.y, a.z), new THREE.Vector3(b.x, b.y, b.z), lerp);
        return { x: v.x, y: v.y, z: v.z };
    }
    static AngleTo(a, b) {
        let a_ = new THREE.Vector3(a.x, a.y, a.z);
        let b_ = new THREE.Vector3(b.x, b.y, b.z);
        return a_.angleTo(b_);
    }
}
class Vector2 {
    constructor(x, y) {
        this.x = 0.0;
        this.y = 0.0;
        this.x = x;
        this.y = y;
    }
    static Clone(a) {
        return { x: a.x, y: a.y };
    }
    static Sub(a, b) {
        return { x: a.x - b.x, y: a.y - b.y };
    }
    static AngleTo(a, b) {
        var x1 = a.x;
        var x2 = b.x;
        var y1 = a.y;
        var y2 = b.y;
        var epsilon = 1.0e-6;
        var nyPI = Math.acos(-1.0);
        var dist, dot, degree, angle;
        dist = Math.sqrt(x1 * x1 + y1 * y1);
        x1 /= dist;
        y1 /= dist;
        dist = Math.sqrt(x2 * x2 + y2 * y2);
        x2 /= dist;
        y2 /= dist;
        dot = x1 * x2 + y1 * y2;
        if (Math.abs(dot - 1.0) <= epsilon)
            angle = 0.0;
        else if (Math.abs(dot + 1.0) <= epsilon)
            angle = nyPI;
        else {
            var cross;
            angle = Math.acos(dot);
            cross = x1 * y2 - x2 * y1;
            if (cross < 0) {
                angle = 2 * nyPI - angle;
            }
        }
        degree = angle * 180.0 / nyPI;
        return degree;
    }
}
class Rect {
    constructor(x, y, width, height) {
        this.x = 0.0;
        this.y = 0.0;
        this.width = 0.0;
        this.height = 0.0;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    static CrossArea(a, b) {
        if (a.x > b.x + b.width) {
            return 0.0;
        }
        if (a.x + a.width < b.x) {
            return 0.0;
        }
        if (a.y - a.height > b.y) {
            return 0.0;
        }
        if (a.y < b.y - b.height) {
            return 0.0;
        }
        let colInt = Math.abs(Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x));
        let rowInt = Math.abs(Math.min(a.y, b.y) - Math.max(a.y - a.height, b.y - b.height));
        return (colInt * rowInt);
    }
    static Clone(a) {
        return { x: a.x, y: a.y, width: a.width, height: a.height };
    }
}
class Mathf {
    static Sin(x) {
        return Math.sin(x);
    }
    static Cos(x) {
        return Math.cos(x);
    }
    static Lerp(a, b, t) {
        return THREE.Math.lerp(a, b, t);
    }
    static Clamp(v, min, max) {
        if (v > max) {
            return max;
        }
        if (v < min) {
            return min;
        }
        return v;
    }
}
class InitData {
}
class Engine {
    constructor() {
        this.m_pCameraCtrl = null;
        this.m_bActive = false;
        this.m_pRenderer = null;
        this.m_pScene = null;
        this.m_pStats = null;
        this.m_pProject = null;
        this.m_nCavasScale = null;
        this.m_pOnClick = null;
        this.m_pOnSetPos = null;
        this.m_nWorkType = null;
        this.m_pProjectIdent = null;
        this.m_bGotoWorkUpdateCameraStateMark = false;
        this.m_bNeedCollideCheckStateMark = false;
        this.m_aCollideHidePoiList = [];
        this.m_pDrawPOIAtEAM = null;
        this.m_bTestPOIMode = false;
        this.m_pProjectAEnd = null;
        this.m_pModelEnd = null;
        this.m_pProjectEnd = null;
        this.m_publicSetSelf = false;
        this.m_aFirstProjectBaoNameList = [];
        this.m_pProjectBaoName = null;
        this.m_nFlowTick = 0;
        this.m_screenPos = null;
        this.m_pImageCentre = null;
        this.m_pImageTack = null;
        this.m_pImageEnd = null;
        this.m_pTackEnd = false;
        this.m_pTackArea = null;
        this.m_pLocateFilter = null;
        this.m_pExtraConfig = null;
        this.pPath = [];
        this.pTouchNavPoint = null;
        this.m_pBluePos = null;
        this.m_mPrimitivePos = null;
        this.m_bPoiFilter = false;
        this.m_mPoiCenter = new Vector3(0, 0, 0);
        this.m_nPoiRadius = 1000;
        this.m_aFilterType = null;
        this.m_pIconDict = [];
        this.m_pImagePOI = null;
        this.m_pDrawPOI = null;
        this.m_bMobile = false;
        this.m_nCanvasLeftWidth = null;
        this.m_nCanvasTopHeight = null;
        this.m_pUpdate = null;
        if (Engine.g_pInstance != null) {
            alert("Engine.constructor(): Engine.g_pInstance != null.");
            return;
        }
        Engine.g_pInstance = this;
    }
    Init(pData) {
        this.m_pProjectIdent = pData.pProjectIdent;
        this.m_pExtraConfig = pData.pOutModel;
        this.m_pExtraConfig.CompassCorrect = pData.nCompassBias;
        this.m_pScene = new THREE.Scene();
        this.m_pScene.scale.z = -this.m_pScene.scale.z;
        if (pData.LselfSet) {
            this.m_publicSetSelf = pData.LselfSet;
        }
        let pLight = new THREE.DirectionalLight(0xffffff, 0.5);
        pLight.position.set(-1.0, -1.0, 1.0);
        this.m_pScene.add(pLight);
        this.m_pScene.add(new THREE.AmbientLight(0xFFFFFF, 1.5));
        let pContainer = document.getElementById("webgl_container");
        if (pData.bWebGL2) {
            let pCanvas = document.createElement('canvas');
            pContainer.appendChild(pCanvas);
            let pContext = pCanvas.getContext('webgl2');
            if (pData.Transparent) {
                this.m_pRenderer = new THREE.WebGLRenderer({ antialias: true, canvas: pCanvas, context: pContext, alpha: true });
                this.m_pRenderer.setClearAlpha(0.0);
            }
            else {
                this.m_pScene.background = new THREE.Color(pData.mBackground.r, pData.mBackground.g, pData.mBackground.b);
                this.m_pRenderer = new THREE.WebGLRenderer({ antialias: true, canvas: pCanvas, context: pContext });
            }
            GeospatialDC.DC = new GeospatialDC(this.m_pScene, pContext);
        }
        else {
            if (pData.Transparent) {
                this.m_pRenderer = new THREE.WebGLRenderer({ alpha: true });
                this.m_pRenderer.setClearAlpha(0.0);
            }
            else {
                this.m_pScene.background = new THREE.Color(pData.mBackground.r, pData.mBackground.g, pData.mBackground.b);
                this.m_pRenderer = new THREE.WebGLRenderer();
            }
        }
        if (this.m_pProjectIdent === "EAM") {
            this.m_pRenderer.setPixelRatio(2);
            this.m_nCanvasLeftWidth = pData.mCanvasLeftWidth;
            this.m_nCanvasTopHeight = pData.mCanvasTopHeight;
        }
        else {
            this.m_pRenderer.setPixelRatio(window.devicePixelRatio);
        }
        this.m_pRenderer.setSize(pData.nWidth, pData.nHeight);
        this.m_pRenderer.setFaceCulling(THREE.CullFaceFront, THREE.FrontFaceDirectionCCW);
        this.m_pRenderer.domElement.id = "Scene";
        this.m_pRenderer.domElement.style.top = "0rem";
        this.m_pRenderer.domElement.style.bottom = "0rem";
        this.m_pRenderer.domElement.style.left = "0rem";
        this.m_pRenderer.domElement.style.right = "0rem";
        this.m_pRenderer.domElement.style.width = pData.nWidth;
        this.m_pRenderer.domElement.style.height = pData.nHeight;
        this.m_pRenderer.domElement.style.position = "absolute";
        pContainer.appendChild(this.m_pRenderer.domElement);
        this.m_nCavasScale = new Vector2(Number.parseFloat(this.m_pRenderer.domElement.style.width.replace("px", "")) / this.m_pRenderer.domElement.width, Number.parseFloat(this.m_pRenderer.domElement.style.height.replace("px", "")) / this.m_pRenderer.domElement.height);
        this.m_pTextCanvas = document.createElement("canvas");
        this.m_pTextCanvas.height = this.m_pRenderer.domElement.height;
        this.m_pTextCanvas.width = this.m_pRenderer.domElement.width;
        this.m_pTextCanvas.style.height = this.m_pRenderer.domElement.style.height;
        this.m_pTextCanvas.style.width = this.m_pRenderer.domElement.style.width;
        this.m_pTextCanvas.style.top = "0rem";
        this.m_pTextCanvas.style.bottom = "0rem";
        this.m_pTextCanvas.style.left = "0rem";
        this.m_pTextCanvas.style.right = "0rem";
        this.m_pTextCanvas.style.width = pData.nWidth;
        this.m_pTextCanvas.style.height = pData.nHeight;
        this.m_pTextCanvas.style.position = "absolute";
        this.m_pTextCanvas.style.zIndex = "1";
        pContainer.appendChild(this.m_pTextCanvas);
        this.m_pCanvasContext = this.m_pTextCanvas.getContext('2d');
        this.m_pCanvasContext.font = "30px Arial";
        if (pData.pStats != null) {
            this.m_pStats = pData.pStats;
            this.m_pStats.dom.style.top = "2rem";
            this.m_pStats.dom.style.left = "2rem";
            this.m_pStats.dom.style.position = "absolute";
            pContainer.appendChild(this.m_pStats.dom);
        }
        MiaokitDC.g_pScene = this.m_pScene;
        this.m_pCameraCtrl = new CameraCtrl(this.m_pTextCanvas, this.m_pTextCanvas.width, this.m_pTextCanvas.height, 10000.0);
        this.m_pLocateFilter = new LocateFilter();
        this.m_pProject = new Project();
        this.m_pProject.m_pFloorData = pData.pFloorData;
        MiaokitDC.DC.m_pNavigator.m_pSiteData = pData.pSiteData;
        MiaokitDC.DC.m_pAssetsLoader.m_pZipLoader = pData.pZipLoader;
        MiaokitDC.DC.m_pAssetsLoader.m_pProgressBar1 = pData.pUpdate1;
        MiaokitDC.DC.m_pAssetsLoader.m_pProgressBar2 = pData.pUpdate2;
        this.m_pLayerUpdate = pData.pLayerUpdate;
        this.m_pNavBack = pData.pNavBack;
        this.m_pOutWorkBack = pData.pOutWorkBack;
        this.m_pSwichViweModelBack = pData.pSwichViweModelBack;
        this.m_pChooseLayer = pData.pChooseLayer;
        this.m_pNoFindPath = pData.pNoFindPath;
        this.m_pCompass = pData.pCompass;
        this.m_pSetNavPoint = pData.pSetNavPoint;
        this.m_pChickTouchMove = pData.pChickTouchMove;
        this.m_pVoicePost = pData.pVoicePost;
        this.m_pMoviePost = pData.pMovie;
        this.m_pShowActiveLayer = pData.pShowActiveLayer;
        this.m_pDrawPOI = pData.pDrawPOI;
        this.m_pOnClick = pData.pOnClick;
        this.m_bMobile = pData.bMobile;
        this.m_pOnSetPos = pData.pOnSetPos;
        this.m_nCanvasLeftWidth = pData.mCanvasLeftWidth;
        this.m_nCanvasTopHeight = pData.mCanvasTopHeight;
        this.m_pUpdate = pData.pUpdate;
        this.m_pProjectAEnd = pData.pProjectAEnd;
        this.m_pModelEnd = pData.pModelEnd;
        this.m_pProjectEnd = pData.pProjectEnd;
        this.m_aFirstProjectBaoNameList = pData.aFirstProjectBaoNameList;
        this.m_pProjectBaoName = pData.pProjectBaoName;
        let pThis = this;
        pThis.m_nRealCompass = 0;
        this.m_pTextCanvas.addEventListener("mousedown", function (e) {
            if (pThis.m_pProjectIdent === "EAM") {
                let left = pThis.m_nCanvasLeftWidth.Lenght + Math.floor(pThis.m_nCanvasLeftWidth.ScreenPercentage * window.innerWidth);
                let top = pThis.m_nCanvasTopHeight.Lenght + Math.floor(pThis.m_nCanvasTopHeight.ScreenPercentage * window.innerHeight);
                let x = Math.floor((e.pageX - left) / pThis.m_nCavasScale.x);
                let y = Math.floor((e.pageY - top) / pThis.m_nCavasScale.y);
                pThis.m_pOnClick({ x: x, y: y, z: 1 }, e.button);
            }
            else {
                let x = e.pageX / pThis.m_nCavasScale.x;
                let y = e.pageY / pThis.m_nCavasScale.y;
                pThis.m_pOnClick({ x: x, y: y, z: 1 });
            }
        });
        pThis.m_pProject.InitProject("project/project.bin", function (pError) {
            pData.pCallback(pError);
            if (pData.pPostBlueToothList) {
                pData.pPostBlueToothList(pThis.m_pProject.GetBlueToothList());
            }
        });
        if (Engine.g_pInstance.m_pProjectIdent == "EAM") {
            this.m_pDrawPOIAtEAM = pData.pDrawPOIAtEAM;
            this.m_bTestPOIMode = pData.bTestPOIMode;
            setInterval(function () {
                Engine.g_pInstance.m_bNeedCollideCheckStateMark = true;
            }, 1000);
        }
    }
    Destroy() {
        this.m_pProject.Destroy();
    }
    Start() {
        if (!this.m_bActive) {
            this.m_bActive = true;
            this.m_pProject.Start();
            this.Update();
        }
    }
    Stop() {
        this.m_bActive = false;
        this.m_pProject.Stop();
    }
    Update() {
        let pThis = Engine.g_pInstance;
        if (pThis.m_pStats != null) {
            pThis.m_pStats.begin();
        }
        pThis.m_pCameraCtrl.Update();
        pThis.m_pProject.Update();
        if (GeospatialDC.DC) {
            GeospatialDC.DC.Update2();
        }
        if (4 === pThis.m_pCameraCtrl.mode && GeospatialDC.DC) {
            let mFocus = pThis.m_pCameraCtrl.GetLngLatLevel();
            GeospatialDC.DC.Update(mFocus.x, mFocus.y, mFocus.z);
        }
        pThis.CanvasUpdate();
        pThis.m_pUpdate();
        pThis.m_pRenderer.render(pThis.m_pScene, pThis.m_pCameraCtrl.camera);
        if (Engine.g_pInstance.m_pProjectIdent == "EAM") {
        }
        else {
            switch (pThis.m_pCameraCtrl.m_eViewMode) {
                case 0:
                    pThis.m_pCompass(MiaokitDC.DC.GetWork(MiaokitDC.DC.m_nCurWork).m_pEyejiaDC.m_pLayerMgr.m_pActiveLayer.m_nDirectionHR + pThis.m_pCameraCtrl.m_nHRotated);
                    break;
                case 1:
                    pThis.m_pCompass(MiaokitDC.DC.GetWork(MiaokitDC.DC.m_nCurWork).m_pEyejiaDC.m_pLayerMgr.m_pActiveLayer.m_nDirectionHR + pThis.m_pCameraCtrl.m_nHRotated);
                    break;
            }
        }
        if (pThis.m_pStats != null) {
            pThis.m_pStats.end();
        }
        if (pThis.m_bActive) {
            requestAnimationFrame(pThis.Update);
        }
    }
    Resize(nWidth, nHeight) {
        if (Engine.g_pInstance.m_pProjectIdent === "EAM") {
            this.m_pCameraCtrl.Resize(nWidth / nHeight);
            this.m_pRenderer.setSize(nWidth, nHeight);
            this.m_pRenderer.domElement.style.width = nWidth;
            this.m_pRenderer.domElement.style.height = nHeight;
            this.m_pTextCanvas.height = this.m_pRenderer.domElement.height;
            this.m_pTextCanvas.width = this.m_pRenderer.domElement.width;
            this.m_pTextCanvas.style.height = this.m_pRenderer.domElement.style.height;
            this.m_pTextCanvas.style.width = this.m_pRenderer.domElement.style.width;
        }
        else {
            this.m_pCameraCtrl.Resize(nWidth / nHeight);
            this.m_pRenderer.setSize(nWidth, nHeight);
        }
    }
    get project() {
        return this.m_pProject;
    }
    get domElement() {
        return this.m_pRenderer.domElement;
    }
    SetViewMode(i) {
        this.m_pCameraCtrl.SwitchMode(i);
        this.m_pSwichViweModelBack(i);
    }
    CamTracking(pPos) {
        this.m_pCameraCtrl.Tracking(pPos);
    }
    SetViewState(pCameraState) {
        this.m_pCameraCtrl.SetViewState(pCameraState);
    }
    DrawPath() {
        if (0 < this.pPath.length) {
            let nOffset = (this.m_nFlowTick++ % 50) * 0.8;
            let aChannel = [];
            let aBillboard = [];
            for (let index = 0; index < this.pPath.length; index++) {
                let pPath = this.pPath[index];
                if (pPath.m_nWork == MiaokitDC.DC.m_nCurWork) {
                    let bLight = pPath.m_nLayer == ALinerDC.DC.m_pLayerMgr.m_pActiveLayer.m_nIndex;
                    let nHeight = ALinerDC.DC.m_pLayerMgr.GetLayer(pPath.m_nLayer).m_pLayerRoot.position.y;
                    if (!bLight) {
                        continue;
                    }
                    let pAppend = 0 == index && this.m_pBluePos;
                    let mFirstPos = pAppend ? this.m_pBluePos : pPath.m_aPath[0];
                    let mLastPoint = this.m_pCameraCtrl.WorldToScenePos({ x: mFirstPos.x, y: nHeight, z: mFirstPos.z });
                    aChannel.push(mLastPoint);
                    if (0 === index) {
                        aBillboard.push({ nPath: index, mPosition: new THREE.Vector3(mLastPoint.x, mLastPoint.y, 1.0), nType: 0 });
                    }
                    let aPath = [];
                    aPath.push(mLastPoint);
                    this.m_pCanvasContext.beginPath();
                    this.m_pCanvasContext.moveTo(mLastPoint.x, mLastPoint.y);
                    for (let i = pAppend ? 0 : 1; i < pPath.m_aPath.length; i++) {
                        mLastPoint = this.m_pCameraCtrl.WorldToScenePos({ x: pPath.m_aPath[i].x, y: nHeight, z: pPath.m_aPath[i].z });
                        aPath.push(mLastPoint);
                        this.m_pCanvasContext.lineTo(mLastPoint.x, mLastPoint.y);
                    }
                    aChannel.push(mLastPoint);
                    this.m_pCanvasContext.lineWidth = 20;
                    this.m_pCanvasContext.strokeStyle = bLight ? "#13c768" : "#B0B0B0";
                    this.m_pCanvasContext.stroke();
                    this.m_pCanvasContext.closePath();
                    mLastPoint = aPath[0];
                    for (let i = 1; i < aPath.length; i++) {
                        let mCurPoint = aPath[i];
                        nOffset = this.DrawArrows(new THREE.Vector3(mLastPoint.x, mLastPoint.y, 1.0), new THREE.Vector3(mCurPoint.x, mCurPoint.y, 1.0), nOffset, bLight);
                        mLastPoint = mCurPoint;
                    }
                    aBillboard.push({ nPath: index, mPosition: new THREE.Vector3(mLastPoint.x, mLastPoint.y, 1.0), nType: 1 });
                }
            }
            for (let i = 1; i < aChannel.length - 1; i += 2) {
                let mLastPoint = aChannel[i];
                let mCurPoint = aChannel[i + 1];
                this.m_pCanvasContext.beginPath();
                this.m_pCanvasContext.moveTo(mLastPoint.x, mLastPoint.y);
                this.m_pCanvasContext.lineTo(mCurPoint.x, mCurPoint.y);
                this.m_pCanvasContext.lineWidth = 20;
                this.m_pCanvasContext.strokeStyle = "#B0B0B0";
                this.m_pCanvasContext.stroke();
                this.m_pCanvasContext.closePath();
                nOffset = this.DrawArrows(new THREE.Vector3(mLastPoint.x, mLastPoint.y, 1.0), new THREE.Vector3(mCurPoint.x, mCurPoint.y, 1.0), nOffset, false);
            }
            for (let pBillboard of aBillboard) {
                this.DrawBillboard(pBillboard.nPath, pBillboard.mPosition, pBillboard.nType);
            }
        }
    }
    DrawArrows(mBeg, mEnd, nOffset, bLight) {
        if (0.0 > nOffset) {
            let mExtend = new THREE.Vector3().subVectors(mEnd, mBeg).normalize().multiplyScalar(nOffset);
            mBeg.add(mExtend);
            nOffset = 0;
        }
        let nArrowLength = 20.0;
        let mLine = new THREE.Vector3().subVectors(mEnd, mBeg);
        let nLineLength = mLine.length();
        let nSegCount = (nLineLength - nOffset) / nArrowLength;
        let nCount = Math.floor(nSegCount);
        let mNormal = new THREE.Vector3(0.0, 0.0, 1.0).cross(mLine).normalize().multiplyScalar(10.0);
        let mBeg0 = new THREE.Vector3().addVectors(mBeg, mNormal);
        let mEnd0 = new THREE.Vector3().addVectors(mEnd, mNormal);
        let mBeg1 = new THREE.Vector3().subVectors(mBeg, mNormal);
        let mEnd1 = new THREE.Vector3().subVectors(mEnd, mNormal);
        for (let i = 0; i < nCount; i += 2) {
            let p0 = new THREE.Vector3().lerpVectors(mBeg, mEnd, (nOffset + 10.0) / nLineLength);
            let p1 = new THREE.Vector3().lerpVectors(mBeg0, mEnd0, (nOffset + 0.0) / nLineLength);
            let p2 = new THREE.Vector3().lerpVectors(mBeg0, mEnd0, (nOffset + 20.0) / nLineLength);
            let p3 = new THREE.Vector3().lerpVectors(mBeg, mEnd, (nOffset + 30.0) / nLineLength);
            let p4 = new THREE.Vector3().lerpVectors(mBeg1, mEnd1, (nOffset + 20.0) / nLineLength);
            let p5 = new THREE.Vector3().lerpVectors(mBeg1, mEnd1, (nOffset + 0.0) / nLineLength);
            nOffset += nArrowLength * 2;
            this.m_pCanvasContext.beginPath();
            this.m_pCanvasContext.moveTo(p0.x, p0.y);
            this.m_pCanvasContext.lineTo(p1.x, p1.y);
            this.m_pCanvasContext.lineTo(p2.x, p2.y);
            this.m_pCanvasContext.lineTo(p3.x, p3.y);
            this.m_pCanvasContext.lineTo(p4.x, p4.y);
            this.m_pCanvasContext.lineTo(p5.x, p5.y);
            this.m_pCanvasContext.closePath();
            this.m_pCanvasContext.fillStyle = "#ffffff";
            this.m_pCanvasContext.fill();
        }
        if (0 !== (nCount % 2)) {
            nOffset = (1.0 - (nSegCount - nCount)) * 20.0;
        }
        else {
            nOffset = (nSegCount - nCount) * -20.0;
        }
        return nOffset;
    }
    DrawBillboard(nPath, pPoint, nType) {
        let pPath = this.pPath[nPath];
        let pText = "";
        if (0 === nType) {
            if (0 === nPath) {
                pText = "起点:" + pPath.m_pEndPoint.m_mLandmark.Object.m_pName;
            }
        }
        else {
            if (nPath === this.pPath.length - 1) {
                pText = "到达终点:" + pPath.m_pEndPoint.m_mLandmark.Object.m_pName;
            }
            else {
                let pNextPath = this.pPath[nPath + 1];
                if (0 === pPath.m_nWork && 0 !== pNextPath.m_nWork) {
                    pText = "从这里进入" + (MiaokitDC.DC.GetWork(pNextPath.m_nWork).m_pID);
                }
                if (0 === pNextPath.m_nWork && 0 !== pPath.m_nWork) {
                    pText = "从这里出到" + (MiaokitDC.DC.GetWork(pNextPath.m_nWork).m_pID);
                }
                if (0 !== pNextPath.m_nWork && 0 !== pPath.m_nWork && pNextPath.m_nWork !== pPath.m_nWork) {
                    pText = "从这里进入" + MiaokitDC.DC.GetWork(pNextPath.m_nWork).m_pID + ":" + pNextPath.m_pLayerName;
                }
                else {
                    pText = "从这里到达" + pNextPath.m_pLayerName;
                }
            }
        }
        this.m_pCanvasContext.strokeStyle = '#13C768';
        this.m_pCanvasContext.lineWidth = 2;
        this.m_pCanvasContext.beginPath();
        this.m_pCanvasContext.moveTo(pPoint.x, pPoint.y);
        this.m_pCanvasContext.lineTo(pPoint.x, pPoint.y - 25);
        this.m_pCanvasContext.closePath();
        this.m_pCanvasContext.stroke();
        this.m_pCanvasContext.lineWidth = 1;
        this.m_pCanvasContext.beginPath();
        this.m_pCanvasContext.arc(pPoint.x, pPoint.y, 5, 0, 2 * Math.PI, true);
        this.m_pCanvasContext.closePath();
        this.m_pCanvasContext.fillStyle = "#00bbfa";
        this.m_pCanvasContext.fill();
        this.m_pCanvasContext.stroke();
        this.m_pCanvasContext.font = "28px Arial";
        let nWidth = this.m_pCanvasContext.measureText(pText).width;
        this.m_pCanvasContext.strokeStyle = "#7c6160";
        this.m_pCanvasContext.lineWidth = 1;
        this.m_pCanvasContext.beginPath();
        this.m_pCanvasContext.moveTo(pPoint.x - (nWidth * 0.5 + 5), pPoint.y - (20 + 5));
        this.m_pCanvasContext.lineTo(pPoint.x + (nWidth * 0.5 + 5), pPoint.y - (20 + 5));
        this.m_pCanvasContext.lineTo(pPoint.x + (nWidth * 0.5 + 5), pPoint.y - (70 + 5));
        this.m_pCanvasContext.lineTo(pPoint.x - (nWidth * 0.5 + 5), pPoint.y - (70 + 5));
        this.m_pCanvasContext.lineTo(pPoint.x - (nWidth * 0.5 + 5), pPoint.y - (20 + 5));
        this.m_pCanvasContext.closePath();
        this.m_pCanvasContext.fillStyle = "yellow";
        this.m_pCanvasContext.fill();
        this.m_pCanvasContext.stroke();
        this.m_pCanvasContext.fillStyle = "#7c6160";
        this.m_pCanvasContext.fillText(pText, pPoint.x - nWidth * 0.5, pPoint.y - 40);
        this.m_pCanvasContext.stroke();
    }
    Locate(mPosition) {
        this.m_mPrimitivePos = mPosition;
        this.m_pLocateFilter.Filter(mPosition);
    }
    GetNearestEdge(aPoint, mPosition, nMinDis = 0.5) {
        return null;
    }
    CurPosUpdata() {
        this.m_pBluePos = this.m_pLocateFilter.Step();
        if (this.m_pBluePos != null) {
            let nYawAngle = undefined;
            if (null != this.pPath && 0 < this.pPath.length) {
                if (this.pPath[0].m_aPath && 0 < this.pPath[0].m_aPath.length) {
                    let mVector = Vector3.Sub(this.pPath[0].m_aPath[0], this.m_pBluePos);
                    let mRight = new Vector3(0.0, 0.0, 1.0);
                    let nYaw = Vector3.AngleTo(mVector, mRight);
                    if (Vector3.Cross(mRight, mVector).y > 0.0) {
                        nYaw = -nYaw;
                    }
                    nYawAngle = (nYaw / Math.PI * 180.0);
                }
            }
            if (nYawAngle) {
                let a1 = 0 < this.m_nRealCompass ? this.m_nRealCompass : 360 + this.m_nRealCompass;
                let a2 = 0 < nYawAngle ? nYawAngle : 360 + nYawAngle;
                let nBias = Math.abs(a2 - a1);
                if (120 < nBias) {
                    nYawAngle = a1;
                }
            }
            else {
                nYawAngle = this.m_nRealCompass;
            }
            if (3 == this.m_pCameraCtrl.mode) {
                this.m_pCameraCtrl.ResetCamera({ x: this.m_pBluePos.x, y: 0.0, z: -this.m_pBluePos.z }, 60.0, nYawAngle, 16.0);
            }
            else {
                this.m_pCameraCtrl.ResetCamera({ x: this.m_pBluePos.x, y: 0, z: -this.m_pBluePos.z }, 0.0, nYawAngle, 16.0);
            }
            {
                let rad = 0;
                let x1 = -Math.sin(rad) * 30;
                let y1 = Math.cos(rad) * 30;
                rad += 0.6667 * Math.PI;
                let x2 = -Math.sin(rad) * 30;
                let y2 = Math.cos(rad) * 30;
                rad += 0.6667 * Math.PI;
                let x3 = -Math.sin(rad) * 30;
                let y3 = Math.cos(rad) * 30;
                let centre = this.m_pCameraCtrl.WorldToScenePos(this.m_pBluePos);
                let pos = { x: centre.x, y: centre.y, z: centre.z };
                let pos1 = { x: pos.x + x1, y: pos.y - y1 };
                let pos2 = { x: pos.x + x2, y: pos.y - y2 };
                let pos3 = { x: pos.x + x3, y: pos.y - y3 };
                pos.y += 5.0;
                let outline = this.m_pCameraCtrl.WorldToScenePos(this.m_mPrimitivePos);
                let radius = Vector3.Distance(centre, outline);
                radius = Mathf.Clamp(radius, 32, 128);
                let gradient = this.m_pCanvasContext.createRadialGradient(centre.x, centre.y, 32, centre.x, centre.y, 48);
                gradient.addColorStop(0, 'rgba(41,193,232,0.7)');
                gradient.addColorStop(1, 'rgba(102,211,238,0)');
                this.m_pCanvasContext.beginPath();
                this.m_pCanvasContext.arc(centre.x, centre.y, 48, 0, 2 * Math.PI, true);
                this.m_pCanvasContext.closePath();
                this.m_pCanvasContext.fillStyle = gradient;
                this.m_pCanvasContext.fill();
                this.m_pCanvasContext.beginPath();
                this.m_pCanvasContext.arc(outline.x, outline.y, 4, 0, 2 * Math.PI, true);
                this.m_pCanvasContext.closePath();
                this.m_pCanvasContext.fillStyle = "#ff0000";
                this.m_pCanvasContext.fill();
                this.m_pCanvasContext.beginPath();
                this.m_pCanvasContext.arc(centre.x, centre.y, 32, 0, 2 * Math.PI, true);
                this.m_pCanvasContext.closePath();
                this.m_pCanvasContext.strokeStyle = "#ffffff";
                this.m_pCanvasContext.stroke();
                this.m_pCanvasContext.fillStyle = "#ffffff";
                this.m_pCanvasContext.fill();
                this.m_pCanvasContext.beginPath();
                this.m_pCanvasContext.moveTo(pos1.x, pos1.y);
                this.m_pCanvasContext.lineTo(pos2.x, pos2.y);
                this.m_pCanvasContext.lineTo(pos.x, pos.y);
                this.m_pCanvasContext.lineTo(pos1.x, pos1.y);
                this.m_pCanvasContext.closePath();
                this.m_pCanvasContext.lineWidth = 1;
                this.m_pCanvasContext.fillStyle = "#0080ff";
                this.m_pCanvasContext.fill();
                this.m_pCanvasContext.strokeStyle = '#ffffff';
                this.m_pCanvasContext.stroke();
                this.m_pCanvasContext.beginPath();
                this.m_pCanvasContext.moveTo(pos1.x, pos1.y);
                this.m_pCanvasContext.lineTo(pos.x, pos.y);
                this.m_pCanvasContext.lineTo(pos3.x, pos3.y);
                this.m_pCanvasContext.lineTo(pos1.x, pos1.y);
                this.m_pCanvasContext.closePath();
                this.m_pCanvasContext.lineWidth = 1;
                this.m_pCanvasContext.fillStyle = "#00b0ff";
                this.m_pCanvasContext.fill();
                this.m_pCanvasContext.strokeStyle = '#ffffff';
                this.m_pCanvasContext.stroke();
                this.m_pCanvasContext.beginPath();
                this.m_pCanvasContext.arc(centre.x, centre.y, (radius < 32 ? 32 : radius), 0, 2 * Math.PI, true);
                this.m_pCanvasContext.closePath();
                this.m_pCanvasContext.strokeStyle = "#00e0ff";
                this.m_pCanvasContext.stroke();
                this.project.SetPos(new Vector3(this.m_pBluePos.x, this.m_pBluePos.y, this.m_pBluePos.z), null);
            }
            if (null != this.pPath && 0 < this.pPath.length) {
                this.project.UpdatePath();
            }
        }
    }
    AddIcon(nType, pUrl) {
        if (!this.m_pIconDict[nType]) {
            let pIcon = this.m_pIconDict[nType] = { Url: pUrl.substr(pUrl.lastIndexOf("/") + 1), Image: null };
            MiaokitDC.DC.m_pAssetsLoader.LoadTexture(pIcon.Url, function (pTexture) {
                if (pTexture) {
                    pIcon.Image = pTexture.image;
                }
            });
        }
    }
    CanvasUpdate() {
        this.CanvasClear();
        if (Engine.g_pInstance.m_pProjectIdent === "EAM") {
            this.DrawPoiAtEAM();
        }
        else {
            this.DrawPoi();
        }
        EyejiaDC.DC.OnGUI();
        if (NNavigation.g_pActiveList.length == 0) {
            if (this.pTouchNavPoint) {
                let mTack = this.m_pCameraCtrl.WorldToScenePos(this.pTouchNavPoint);
                if (mTack.z < 1) {
                    if (this.m_pTackEnd) {
                        NNavigation.g_endPosition = {
                            floor: ALinerDC.DC.m_pLayerMgr.m_pActiveLayer,
                            work: MiaokitDC.DC.m_nCurWork,
                            mTack: this.pTouchNavPoint
                        };
                        this.m_pCanvasContext.drawImage(this.m_pImageEnd, mTack.x - 64, mTack.y - 128, 128, 128);
                    }
                    else {
                        this.m_pCanvasContext.drawImage(this.m_pImageTack.image, mTack.x - 64, mTack.y - 128, 128, 128);
                    }
                }
            }
            else if (this.m_pTackEnd && NNavigation.g_endPosition && NNavigation.g_endPosition.floor == ALinerDC.DC.m_pLayerMgr.m_pActiveLayer && NNavigation.g_endPosition.work == MiaokitDC.DC.m_nCurWork) {
                let mTack = this.m_pCameraCtrl.WorldToScenePos(NNavigation.g_endPosition.mTack);
                this.m_pCanvasContext.drawImage(this.m_pImageEnd, mTack.x - 64, mTack.y - 128, 128, 128);
            }
        }
    }
    CanvasClear() {
        this.m_pCanvasContext.clearRect(0, 0, this.m_pTextCanvas.width, this.m_pTextCanvas.height);
    }
    DrawPoi() {
        let pLayer = NavChartDC.DC.m_pLayerMgr.m_pActiveLayer;
        let aSite = [];
        for (let pSite of pLayer.m_mLandmarkList) {
            if (this.FilterPoi(pSite)) {
                if (pSite.m_nIconType < 1) {
                    if (pSite.m_pName != null && pSite.m_pName != "位置点") {
                        aSite.push({ Name: pSite.m_pName, Position: pSite.m_mPoint.Object.m_mPosition, Image: null, Type: 0 });
                    }
                }
                else {
                    let pIcon = this.m_pIconDict[pSite.m_nIconType];
                    aSite.push({ Name: pSite.m_pName, Position: pSite.m_mPoint.Object.m_mPosition, Image: (pIcon ? pIcon.Image : null), Type: pSite.m_nIconType });
                }
            }
        }
        if (0 === MiaokitDC.DC.m_nCurWork) {
            let aBuilding = EyejiaDC.DC.m_pLayerMgr.m_pActiveLayer.m_aBuilding;
            for (let pBuilding of aBuilding) {
                aSite.push({ Name: pBuilding.Name, Position: pBuilding.Position, Image: this.m_pImagePOI.image, Type: -1 });
            }
        }
        this.DrawPoiAlt(aSite);
    }
    DrawPoiAtEAM() {
        let pLayer = NavChartDC.DC.m_pLayerMgr.m_pActiveLayer;
        let aSite = [];
        if (pLayer != null) {
            for (let pSite of pLayer.m_mLandmarkList) {
                if (this.FilterPoi(pSite)) {
                    if (pSite.m_nIconType < 1) {
                        if (pSite.m_pName != null && pSite.m_pName != "位置点") {
                            aSite.push({ Id: pSite.m_pSerial, Name: pSite.m_pName, Position: pSite.m_mPoint.Object.m_mPosition, Image: null, Type: 0 });
                        }
                        else {
                            aSite.push({ Id: pSite.m_pSerial, Name: pSite.m_pSerial, Position: pSite.m_mPoint.Object.m_mPosition, Image: null, Type: 5 });
                        }
                    }
                    else {
                        let pIcon = this.m_pIconDict[pSite.m_nIconType];
                        aSite.push({ Id: pSite.m_pSerial, Name: pSite.m_pName, Position: pSite.m_mPoint.Object.m_mPosition, Image: (pIcon ? pIcon.Image : null), Type: pSite.m_nIconType });
                    }
                }
            }
        }
        if (EyejiaDC.DC.m_pLayerMgr.m_pActiveLayer != null) {
            let aBuilding = EyejiaDC.DC.m_pLayerMgr.m_pActiveLayer.m_aBuilding;
            for (let pBuilding of aBuilding) {
                aSite.push({ Id: pBuilding.Name, Name: pBuilding.Name, Position: pBuilding.Position, Image: this.m_pImagePOI.image, Type: -1 });
            }
        }
        this.DrawPoiAltAtEAM(aSite);
    }
    DrawPoiAlt(aSite) {
        let aCollide = [];
        for (let pPoint of aSite) {
            let nNameWidth = this.m_pCanvasContext.measureText(pPoint.Name).width;
            let mPosition = this.m_pCameraCtrl.WorldToScenePos(pPoint.Position);
            if (mPosition.z >= 1) {
                continue;
            }
            let pRect1 = new Rect(mPosition.x + 20, mPosition.y - 30, nNameWidth, 30);
            let bVisible = true;
            for (let pRect2 of aCollide) {
                let nCross = Rect.CrossArea(pRect1, pRect2);
                if (nCross > 5) {
                    bVisible = false;
                    break;
                }
            }
            if (bVisible) {
                aCollide.push(pRect1);
                pPoint.Position = mPosition;
                this.m_pDrawPOI(this.m_pCanvasContext, pPoint);
            }
        }
    }
    DrawPoiAltAtEAM(aSite) {
        if (Engine.g_pInstance.m_bNeedCollideCheckStateMark) {
            Engine.g_pInstance.m_bNeedCollideCheckStateMark = false;
            this.m_aCollideHidePoiList = [];
            let aCollide = [];
            for (let pPoint of aSite) {
                if (!Engine.g_pInstance.m_bTestPOIMode && pPoint.Type == 5) {
                    continue;
                }
                let nNameWidth = this.m_pCanvasContext.measureText(pPoint.Name).width;
                let mPosition = this.m_pCameraCtrl.WorldToScenePos(pPoint.Position);
                if (mPosition.z >= 1) {
                    continue;
                }
                let pRect1 = new Rect(mPosition.x + 20, mPosition.y - 30, nNameWidth, 30);
                let bVisible = true;
                for (let pRect2 of aCollide) {
                    let nCross = Rect.CrossArea(pRect1, pRect2);
                    if (nCross > 5) {
                        bVisible = false;
                        break;
                    }
                }
                if (bVisible) {
                    aCollide.push(pRect1);
                }
                else {
                    this.m_aCollideHidePoiList.push(pPoint.Name);
                }
                pPoint.Position = mPosition;
                this.m_pDrawPOIAtEAM(this.m_pCanvasContext, pPoint, bVisible);
            }
        }
        else {
            for (let pPoint of aSite) {
                let mPosition = this.m_pCameraCtrl.WorldToScenePos(pPoint.Position);
                if (mPosition.z >= 1) {
                    continue;
                }
                pPoint.Position = mPosition;
                let bVisible = true;
                for (let pName of this.m_aCollideHidePoiList) {
                    if (pName == pPoint.Name) {
                        bVisible = false;
                        break;
                    }
                }
                this.m_pDrawPOIAtEAM(this.m_pCanvasContext, pPoint, bVisible);
            }
        }
    }
    FilterPoi(pSite) {
        if (!this.m_bPoiFilter) {
            return true;
        }
        let nDistance = Vector3.Distance(this.m_mPoiCenter, pSite.m_mPoint.Object.m_mPosition);
        if (nDistance < this.m_nPoiRadius) {
            if (this.m_aFilterType) {
                for (let nType of this.m_aFilterType) {
                    if (pSite.m_nIconType === nType) {
                        return true;
                    }
                }
            }
            else {
                return true;
            }
        }
        return false;
    }
    FilterPOI(bEnable, mCenter, nRadius, aType) {
        this.m_bPoiFilter = bEnable;
        this.m_mPoiCenter = mCenter;
        this.m_nPoiRadius = nRadius;
        this.m_aFilterType = aType;
    }
}
Engine.g_pInstance = null;
class CameraCtrl {
    constructor(pCavans, nWidth, nHeight, nFar) {
        this.m_eViewMode = 1;
        this.m_nHeightUnit = 0;
        this.m_nWidth = 0;
        this.m_nHeight = 0;
        this.m_nMinDis = 1.0;
        this.m_nMaxDis = 1024.0;
        this.m_nMinVRotate = 5.0;
        this.m_nMaxVRotate = 85.0;
        this.m_nMinOVSize = 6.0;
        this.m_nMaxOVSize = 1000.0;
        this.m_nVRSensit = 2.0;
        this.m_nHRSensit = 2.0;
        this.m_nMoveSensit = 1.0;
        this.m_nZoomSensit = 0.5;
        this.m_nOVScaleSensit = 1.0;
        this.m_nFar = 1000.0;
        this.m_nNear = 1.0;
        this.m_pPersCamera = null;
        this.m_pOrthCamera = null;
        this.m_nAspect = 1.0;
        this.m_nMode2 = 3;
        this.m_bEnabled = false;
        this.m_nForwardMove = 20.0;
        this.m_nForwardMoved = 20.0;
        this.m_nRightMove = 0.0;
        this.m_nRightMoved = 0.0;
        this.m_nUpMove = 0.0;
        this.m_nUpMoved = 0.0;
        this.m_nUpMove2 = 0.0;
        this.m_nUpMoved2 = 0.0;
        this.m_nVRotate = 45.0;
        this.m_nVRotated = 40.0;
        this.m_nHRotate = 30.0;
        this.m_nHRotated = 30.0;
        this.m_nZRotated = 0.0;
        this.m_nOrthoScale = 10.0;
        this.m_nOrthoScaled = 10.0;
        this.m_mOVMove = new Vector2(0.0, 0.0);
        this.m_mOVMoved = new Vector2(0.0, 0.0);
        this.m_bAuto = false;
        this.m_nAutoSign = 1.0;
        this.m_pFlyCtrl = null;
        this.setCpoint = null;
        let pThis = this;
        pThis.m_nNear = 1.0;
        pThis.m_nFar = nFar;
        pThis.m_pPersCamera = new THREE.PerspectiveCamera(60, nWidth / nHeight, pThis.m_nNear, pThis.m_nFar);
        pThis.m_pOrthCamera = new THREE.OrthographicCamera(nWidth / -2.0, nWidth / 2.0, nHeight / 2.0, nHeight / -2.0, pThis.m_nNear, pThis.m_nFar);
        pThis.m_nAspect = nWidth / nHeight;
        pThis.m_nHeightUnit = Math.tan(60 * 0.5 / 180.0 * 3.1416) * 1.0 * 2.0;
        pThis.m_nHeight = nHeight;
        pThis.m_nWidth = nWidth;
        pThis.Reset(null);
        let nDrag = -1;
        let nStartTime = new Date().getTime();
        pCavans.addEventListener("mousewheel", function (e) { pThis.DoPinch({ delta: e.deltaY }); }, true);
        pCavans.addEventListener("mousedown", function (e) {
            nDrag = e.button;
            nStartTime = new Date().getTime();
        }, false);
        pCavans.addEventListener("mouseup", function (e) {
            nDrag = -1;
            if (0 == e.button) {
                let nEndTime = new Date().getTime();
                if (nEndTime - nStartTime < 250) {
                    if (Engine.g_pInstance.m_pProjectIdent == "EAM") {
                        pThis.SelectAtEAM(e);
                    }
                    else {
                        pThis.Select(e);
                    }
                }
            }
        }, false);
        pCavans.addEventListener("mouseout", function (e) { nDrag = -1; }, false);
        pCavans.addEventListener("mousemove", function (e) {
            if (0 == nDrag || 2 == nDrag) {
                pThis.DoDrag({ button: nDrag, deltaX: -e.movementX, deltaY: e.movementY });
            }
        }, false);
        let pStartEvent = null;
        pCavans.addEventListener("touchstart", function (e) {
            if (1 == e.touches.length) {
                nDrag = 0;
                pStartEvent = e;
            }
            else if (2 == e.touches.length) {
            }
        }, false);
        pCavans.addEventListener("touchmove", function (e) {
            e.preventDefault();
            if (e.touches == null)
                return;
            if (1 == e.touches.length && 0 == nDrag) {
                let nDeltaX = e.touches[0].clientX - pStartEvent.touches[0].clientX;
                let nDeltaY = e.touches[0].clientY - pStartEvent.touches[0].clientY;
                pStartEvent = e;
                pThis.DoDrag({ button: nDrag, deltaX: nDeltaX * -2, deltaY: nDeltaY * 2 });
            }
            else if (2 == e.touches.length && 2 == pStartEvent.touches.length) {
                let mStartPoint = new THREE.Vector2((pStartEvent.touches[0].clientX + pStartEvent.touches[1].clientX) * 0.5, (pStartEvent.touches[0].clientY + pStartEvent.touches[1].clientY) * 0.5);
                let mCurPoint = new THREE.Vector2((e.touches[0].clientX + e.touches[1].clientX) * 0.5, (e.touches[0].clientY + e.touches[1].clientY) * 0.5);
                let mMoveDelta = mCurPoint.sub(mStartPoint);
                let mStartPoint0 = new THREE.Vector2(pStartEvent.touches[0].clientX, pStartEvent.touches[0].clientY);
                let mStartPoint1 = new THREE.Vector2(pStartEvent.touches[1].clientX, pStartEvent.touches[1].clientY);
                let mCurPoint0 = new THREE.Vector2(e.touches[0].clientX, e.touches[0].clientY);
                let mCurPoint1 = new THREE.Vector2(e.touches[1].clientX, e.touches[1].clientY);
                let nScaleDelta = mCurPoint0.distanceTo(mCurPoint1) - mStartPoint1.distanceTo(mStartPoint0);
                pStartEvent = e;
                pThis.DoDrag({ button: 2, deltaX: mMoveDelta.x * -2, deltaY: mMoveDelta.y * 2 });
                pThis.DoPinch({ delta: nScaleDelta * -10 });
            }
            else {
                pStartEvent = e;
            }
        }, false);
        pCavans.addEventListener("touchend", function (e) { nDrag = -1; pStartEvent = null; }, false);
        this.m_bEnabled = true;
    }
    Update() {
        if (this.m_pFlyCtrl) {
            this.m_pFlyCtrl.Update();
        }
        if (2 == this.mode) {
            let nScaleDelta = (this.m_nOrthoScale - this.m_nOrthoScaled) * 0.5;
            if (nScaleDelta > 0.01 || nScaleDelta < -0.01) {
                this.m_nOrthoScaled += nScaleDelta;
                this.m_pOrthCamera.left = -this.m_nOrthoScaled * 0.5 * this.m_nAspect;
                this.m_pOrthCamera.right = this.m_nOrthoScaled * 0.5 * this.m_nAspect;
                this.m_pOrthCamera.top = this.m_nOrthoScaled * 0.5;
                this.m_pOrthCamera.bottom = -this.m_nOrthoScaled * 0.5;
                this.m_pOrthCamera.updateProjectionMatrix();
            }
            let nDeltaX = (this.m_mOVMove.x - this.m_mOVMoved.x) * 0.5;
            let nDeltaY = (this.m_mOVMove.y - this.m_mOVMoved.y) * 0.5;
            if (nDeltaX > 0.01 || nDeltaX < -0.01 || nDeltaY > 0.01 || nDeltaY < -0.01) {
                this.m_mOVMoved.x += nDeltaX;
                this.m_mOVMoved.y += nDeltaY;
                this.m_pOrthCamera.position.set(this.m_mOVMoved.x, 800.0, this.m_mOVMoved.y);
            }
        }
        else if (3 == this.mode || 4 == this.mode) {
            this.Auto();
            let nSmooth = 0.5;
            let nVRDelta = (this.m_nVRotate - this.m_nVRotated) * nSmooth;
            let nHRDelta = (this.m_nHRotate - this.m_nHRotated) * nSmooth;
            if (nVRDelta > 0.01 || nVRDelta < -0.01) {
                this.m_nVRotated += nVRDelta;
                this.m_pPersCamera.translateZ(-this.m_nForwardMoved);
                let mPosition = this.m_pPersCamera.position.clone();
                this.m_pPersCamera.position.set(0.0, 0.0, 0.0);
                this.m_pPersCamera.rotateOnAxis(new THREE.Vector3(1.0, 0.0, 0.0), THREE.Math.degToRad(-nVRDelta));
                this.m_pPersCamera.position.set(mPosition.x, mPosition.y, mPosition.z);
                this.m_pPersCamera.translateZ(this.m_nForwardMoved);
            }
            if (nHRDelta > 0.01 || nHRDelta < -0.01) {
                this.m_nHRotated += nHRDelta;
                this.m_pPersCamera.translateZ(-this.m_nForwardMoved);
                let mPosition = this.m_pPersCamera.position.clone();
                this.m_pPersCamera.position.set(0.0, 0.0, 0.0);
                this.m_pPersCamera.rotateOnWorldAxis(new THREE.Vector3(0.0, 1.0, 0.0), THREE.Math.degToRad(nHRDelta));
                this.m_pPersCamera.position.set(mPosition.x, mPosition.y, mPosition.z);
                this.m_pPersCamera.translateZ(this.m_nForwardMoved);
            }
            let nForwardDelta = (this.m_nForwardMove - this.m_nForwardMoved) * nSmooth;
            if (nForwardDelta > 0.01 || nForwardDelta < -0.01) {
                this.m_nForwardMoved += nForwardDelta;
                this.m_pPersCamera.translateZ(nForwardDelta);
            }
            let nRightDelta = (this.m_nRightMove - this.m_nRightMoved) * nSmooth;
            if (nRightDelta > 0.01 || nRightDelta < -0.01) {
                this.m_nRightMoved += nRightDelta;
                this.m_pPersCamera.translateX(nRightDelta);
            }
            var nUpDelta = (this.m_nUpMove - this.m_nUpMoved) * nSmooth;
            if (nUpDelta > 0.01 || nUpDelta < -0.01) {
                this.m_nUpMoved += nUpDelta;
                this.m_pPersCamera.translateY(nUpDelta);
            }
            var nUpDelta2 = (this.m_nUpMove2 - this.m_nUpMoved2) * nSmooth;
            if (nUpDelta2 > 0.01 || nUpDelta2 < -0.01) {
                this.m_nUpMoved2 += nUpDelta2;
                this.m_pPersCamera.translateZ(nUpDelta2);
            }
        }
    }
    Resize(nAspect) {
        this.m_nAspect = nAspect;
        this.m_pPersCamera.aspect = nAspect;
        this.m_pOrthCamera.left = -this.m_nOrthoScaled * 0.5 * this.m_nAspect;
        this.m_pOrthCamera.right = this.m_nOrthoScaled * 0.5 * this.m_nAspect;
        this.m_pOrthCamera.top = this.m_nOrthoScaled * 0.5;
        this.m_pOrthCamera.bottom = -this.m_nOrthoScaled * 0.5;
        this.m_pPersCamera.updateProjectionMatrix();
        this.m_pOrthCamera.updateProjectionMatrix();
    }
    Reset(pState = null) {
        if (Engine.g_pInstance.m_pProjectIdent === "EAM") {
            let bHaveForwardMoved = true;
            if (pState) {
                if (pState.m_nZRotated == 0 && pState.m_nHRotated == 0) {
                    pState = null;
                }
            }
            if (!pState) {
                bHaveForwardMoved = false;
                pState = new CameraState();
                pState.m_mPerspectPos = new Vector3(0.0, 0.0, 0.0);
                pState.m_nForwardMoved = 100.0;
                pState.m_nVRotated = 45.0;
                pState.m_nHRotated = 0.0;
                pState.m_mOrthoPos = new Vector3(0.0, 0.0, 0.0);
                pState.m_nOrthoScaled = 100.0;
                pState.m_nZRotated = 0;
            }
            if (bHaveForwardMoved) {
                if (pState.m_nForwardMoved) {
                    if (Engine.g_pInstance.m_nWorkType == 1) {
                        this.m_nForwardMove = pState.m_nForwardMoved;
                        this.m_nForwardMoved = pState.m_nForwardMoved;
                    }
                    else if (Engine.g_pInstance.m_nWorkType == 2) {
                        this.m_nForwardMove = pState.m_nForwardMoved + 100;
                        this.m_nForwardMoved = pState.m_nForwardMoved + 100;
                    }
                }
            }
            else {
                if (pState.m_nForwardMoved) {
                    if (Engine.g_pInstance.m_nWorkType == 1) {
                        this.m_nForwardMove = pState.m_nForwardMoved + 250;
                        this.m_nForwardMoved = pState.m_nForwardMoved + 250;
                    }
                    else if (Engine.g_pInstance.m_nWorkType == 2) {
                        this.m_nForwardMove = pState.m_nForwardMoved + 50;
                        this.m_nForwardMoved = pState.m_nForwardMoved + 50;
                    }
                }
            }
        }
        else {
            if (!pState) {
                pState = new CameraState();
                pState.m_mPerspectPos = new Vector3(0.0, 0.0, 0.0);
                pState.m_nForwardMoved = 100.0;
                pState.m_nVRotated = 45.0;
                pState.m_nHRotated = 0.0;
                pState.m_mOrthoPos = new Vector3(0.0, 0.0, 0.0);
                pState.m_nOrthoScaled = 100.0;
                pState.m_nZRotated = 0;
            }
            if (pState.m_nForwardMoved) {
                this.m_nForwardMove = pState.m_nForwardMoved;
                this.m_nForwardMoved = pState.m_nForwardMoved;
            }
        }
        this.m_nRightMove = 0.0;
        this.m_nRightMoved = 0.0;
        this.m_nUpMove = 0.0;
        this.m_nUpMoved = 0.0;
        if (pState.m_nVRotated) {
            this.m_nVRotate = pState.m_nVRotated;
            this.m_nVRotated = pState.m_nVRotated;
        }
        if (pState.m_nHRotated) {
            this.m_nHRotate = -pState.m_nHRotated;
            this.m_nHRotated = -pState.m_nHRotated;
        }
        if (pState.m_nZRotated) {
            this.m_nZRotated = -pState.m_nZRotated % 360;
        }
        if (pState.m_nOrthoScaled) {
            this.m_nOrthoScale = pState.m_nOrthoScaled * 2.0;
            this.m_nOrthoScaled = pState.m_nOrthoScaled * 2.0;
        }
        this.m_mOVMove = new Vector2(pState.m_mOrthoPos.x, pState.m_mOrthoPos.z);
        this.m_mOVMoved = new Vector2(pState.m_mOrthoPos.x, pState.m_mOrthoPos.z);
        this.m_pPersCamera.position.set(0.0, 0.0, 0.0);
        this.m_pPersCamera.quaternion.setFromAxisAngle(new THREE.Vector3(0.0, 1.0, 0.0), 0.0);
        this.m_pPersCamera.rotateOnAxis(new THREE.Vector3(1.0, 0.0, 0.0), THREE.Math.degToRad(-this.m_nVRotated));
        this.m_pPersCamera.rotateOnWorldAxis(new THREE.Vector3(0.0, 1.0, 0.0), THREE.Math.degToRad(this.m_nHRotated));
        this.m_pPersCamera.position.set(pState.m_mPerspectPos.x, pState.m_mPerspectPos.y, pState.m_mPerspectPos.z);
        this.m_pPersCamera.translateZ(this.m_nForwardMoved);
        this.m_pOrthCamera.position.set(0.0, 0.0, 0.0);
        this.m_pOrthCamera.rotation.set(THREE.Math.degToRad(-90.0), 0.0, THREE.Math.degToRad(this.m_nZRotated));
        this.m_pOrthCamera.position.set(this.m_mOVMoved.x, 800.0, this.m_mOVMoved.y);
        this.m_pOrthCamera.left = -this.m_nOrthoScaled * 0.5 * this.m_nAspect;
        this.m_pOrthCamera.right = this.m_nOrthoScaled * 0.5 * this.m_nAspect;
        this.m_pOrthCamera.top = this.m_nOrthoScaled * 0.5;
        this.m_pOrthCamera.bottom = -this.m_nOrthoScaled * 0.5;
        this.m_pPersCamera.updateProjectionMatrix();
        this.m_pOrthCamera.updateProjectionMatrix();
    }
    Flyto(pState = null) {
        if (!pState) {
            pState = new CameraState();
            if (this.setCpoint) {
                pState.m_mPerspectPos = new Vector3(this.setCpoint.x, 0.0, -this.setCpoint.z);
            }
            else {
                pState.m_mPerspectPos = new Vector3(0.0, 0.0, 0.0);
            }
            pState.m_nForwardMoved = 100.0;
            pState.m_nVRotated = 45.0;
            pState.m_nHRotated = 0.0;
            pState.m_mOrthoPos = new Vector3(0.0, 0.0, 0.0);
            pState.m_nOrthoScaled = 100.0;
            pState.m_nZRotated = 0;
        }
        this.m_nForwardMove = pState.m_nForwardMoved;
        this.m_nRightMove = 0;
        this.m_nRightMoved = 0;
        this.m_nUpMove = 0;
        this.m_nUpMoved = 0;
        this.m_nUpMove2 = 0;
        this.m_nUpMoved2 = 0;
        this.m_nVRotate = pState.m_nVRotated;
        this.m_nHRotate = pState.m_nHRotated;
        this.m_nOrthoScale = pState.m_nOrthoScaled;
        this.m_mOVMove = new Vector2(pState.m_mOrthoPos.x, pState.m_mOrthoPos.z);
        this.m_pPersCamera.translateZ(-this.m_nForwardMoved);
        let mTarget0 = this.m_pPersCamera.position.clone();
        this.m_pPersCamera.translateZ(this.m_nForwardMoved);
        let mTarget1 = Vector3.Clone(pState.m_mPerspectPos);
        let nZRotated = this.m_pOrthCamera.rotation.z;
        let nZRotate = THREE.Math.degToRad(-pState.m_nZRotated);
        let pThis = this;
        pThis.m_pFlyCtrl = {
            Target0: mTarget0,
            Target1: mTarget1,
            ZRotated: nZRotated,
            ZRotate: nZRotate,
            Step: 0,
            StepCount: 30,
            Update: function () {
                if (this.Step++ < this.StepCount) {
                    let mTarget = Vector3.LerpVectors(this.Target0, this.Target1, this.Step / this.StepCount);
                    let zRotated = Mathf.Lerp(this.ZRotated, this.ZRotate, this.Step / this.StepCount);
                    pThis.m_pPersCamera.translateZ(-pThis.m_nForwardMoved);
                    pThis.m_pPersCamera.position.set(mTarget.x, mTarget.y, mTarget.z);
                    pThis.m_pPersCamera.translateZ(pThis.m_nForwardMoved);
                    pThis.m_pOrthCamera.rotation.set(this.XRotated, 0.0, zRotated);
                }
                else {
                    pThis.m_pFlyCtrl = null;
                }
            }
        };
    }
    ResetCamera(mTarget, nPitch, nYaw, nDistance) {
        let pState = new CameraState();
        pState.m_mPerspectPos = mTarget;
        pState.m_nForwardMoved = nDistance;
        pState.m_nVRotated = nPitch;
        pState.m_nHRotated = nYaw;
        pState.m_mOrthoPos = mTarget;
        pState.m_nOrthoScaled = nDistance;
        pState.m_nZRotated = nYaw;
        this.Reset(pState);
    }
    ResetToPoint(mTarget, nPitch, nYaw, nDistance) {
        let pState = new CameraState();
        pState.m_mPerspectPos = mTarget;
        pState.m_nForwardMoved = nDistance;
        pState.m_nVRotated = nPitch;
        pState.m_nHRotated = nYaw;
        pState.m_mOrthoPos = mTarget;
        pState.m_nOrthoScaled = nDistance;
        pState.m_nZRotated = nYaw;
        this.Flyto(pState);
    }
    DoPinch(pEvent) {
        if (this.m_bEnabled) {
            if (2 == this.mode) {
                let nFactor = (this.m_nOrthoScaled - this.m_nMinOVSize) / (this.m_nMaxOVSize - this.m_nMinOVSize);
                nFactor = THREE.Math.clamp(nFactor, 0.05, 1.0);
                nFactor *= this.m_nOVScaleSensit;
                this.m_nOrthoScale += pEvent.delta * nFactor;
                this.m_nOrthoScale = THREE.Math.clamp(this.m_nOrthoScale, this.m_nMinOVSize, this.m_nMaxOVSize);
            }
            else if (3 == this.mode) {
                let nFactor = (this.m_nForwardMoved - this.m_nMinDis) / (this.m_nMaxDis - this.m_nMinDis);
                nFactor = THREE.Math.clamp(nFactor, 0.05, 1.0);
                nFactor *= this.m_nZoomSensit;
                this.m_nForwardMove += pEvent.delta * nFactor;
                this.m_nForwardMove = THREE.Math.clamp(this.m_nForwardMove, this.m_nMinDis, this.m_nMaxDis);
            }
            else if (4 == this.mode) {
                let nFactor = (this.m_nForwardMoved - this.m_nMinDis) / (this.m_nMaxDis - this.m_nMinDis);
                nFactor = THREE.Math.clamp(nFactor, 0.05, 1.0);
                nFactor *= this.m_nZoomSensit;
                console.log("Offset: ", (pEvent.delta / Math.abs(pEvent.delta)) * (this.m_nForwardMoved - this.m_nMinDis) * 0.1);
                this.m_nForwardMove += (pEvent.delta / Math.abs(pEvent.delta)) * (this.m_nForwardMoved - this.m_nMinDis) * 0.1;
                this.m_nForwardMove = THREE.Math.clamp(this.m_nForwardMove, this.m_nMinDis, this.m_nMaxDis);
            }
        }
    }
    DoDrag(pEvent) {
        if (this.m_bEnabled) {
            if (2 == this.mode) {
                if (0 == pEvent.button) {
                    if (Math.abs(this.m_nZRotated) < 90) {
                        this.m_mOVMove.x += (pEvent.deltaX / this.m_nWidth) * this.m_nOrthoScaled * this.m_nAspect;
                        this.m_mOVMove.y -= (pEvent.deltaY / this.m_nHeight) * this.m_nOrthoScaled;
                    }
                    else {
                        this.m_mOVMove.x -= (pEvent.deltaX / this.m_nWidth) * this.m_nOrthoScaled * this.m_nAspect;
                        this.m_mOVMove.y += (pEvent.deltaY / this.m_nHeight) * this.m_nOrthoScaled;
                    }
                }
            }
            else if (3 == this.mode) {
                if (2 == pEvent.button) {
                    this.m_nVRotate += (pEvent.deltaY / this.m_nHeight) * 90 * this.m_nVRSensit;
                    this.m_nHRotate += (pEvent.deltaX / this.m_nWidth) * 180 * this.m_nHRSensit;
                    this.m_nVRotate = this.m_nVRotate % 360.0;
                    this.m_nVRotate = THREE.Math.clamp(this.m_nVRotate, this.m_nMinVRotate, this.m_nMaxVRotate);
                }
                else if (0 == pEvent.button) {
                    let nHeight = this.m_nHeightUnit * this.m_nForwardMoved;
                    let nDPI = nHeight / this.m_nHeight;
                    let nFactor = nDPI * this.m_nMoveSensit;
                    this.m_nRightMove += pEvent.deltaX * nFactor;
                    this.m_nUpMove += pEvent.deltaY * nFactor * Math.sin((this.m_nVRotated / 180) * Math.PI);
                    this.m_nUpMove2 -= pEvent.deltaY * nFactor * Math.cos((this.m_nVRotated / 180) * Math.PI);
                }
            }
            else if (4 == this.mode) {
                if (0 == pEvent.button) {
                    let nFactor = (this.m_nForwardMoved - this.m_nMinDis) / (this.m_nMaxDis - this.m_nMinDis);
                    this.m_nVRotate += (pEvent.deltaY / this.m_nHeight) * 90 * this.m_nVRSensit * nFactor;
                    this.m_nHRotate += (pEvent.deltaX / this.m_nWidth) * 180 * this.m_nHRSensit * nFactor;
                    this.m_nVRotate = this.m_nVRotate % 360.0;
                    this.m_nVRotate = THREE.Math.clamp(this.m_nVRotate, this.m_nMinVRotate, this.m_nMaxVRotate);
                }
            }
        }
    }
    SetAuto(bAuto) {
        this.m_bAuto = bAuto;
        this.m_nAutoSign = 1.0;
    }
    Auto() {
        if (true == this.m_bAuto) {
            if (20.0 > this.m_nVRotate) {
                this.m_nAutoSign = 1.0;
            }
            else if (70.0 < this.m_nVRotate) {
                this.m_nAutoSign = -1.0;
            }
            let nAngle = this.m_nVRotated / 90 * Math.PI;
            let nDeltaY = (1.0 - Math.abs(Math.cos(nAngle))) * this.m_nAutoSign;
            this.DoDrag({ button: 2, deltaX: 0.8, deltaY: nDeltaY * 0.5 });
        }
    }
    LineWidth() {
        let nWidth = 1.0;
        if (2 == this.mode) {
            nWidth = Mathf.Clamp((this.m_nHeight / this.m_nOrthoScaled) * 0.5, 1.0, 18.0);
        }
        else {
            let nHeight = this.m_nHeightUnit * this.m_nForwardMoved;
            nWidth = Mathf.Clamp((this.m_nHeight / nHeight) * 0.5, 1.0, 18.0);
        }
        return Engine.g_pInstance.m_bMobile ? (nWidth * 2) : nWidth;
    }
    WorldToScreen(WorldPos) {
        let mWorldPos = new THREE.Vector3(WorldPos.x, WorldPos.y, -WorldPos.z);
        let mViewPos = this.camera.worldToLocal(mWorldPos);
        if (0 < mViewPos.z) {
            mViewPos.z = -mViewPos.z;
        }
        mViewPos.applyMatrix4(this.camera.projectionMatrix);
        let nHalfWidth = Engine.g_pInstance.m_pTextCanvas.width * 0.5;
        let nHalfHeight = Engine.g_pInstance.m_pTextCanvas.height * 0.5;
        let o = {
            x: Math.round(mViewPos.x * nHalfWidth + nHalfWidth),
            y: Math.round(-mViewPos.y * nHalfHeight + nHalfHeight),
            z: mViewPos.z,
            w: 0
        };
        return o;
    }
    GetLngLatLevel() {
        let nViewSize = ((this.m_nForwardMoved - 6378137.0) * Math.tan(30.0 / 180.0 * Math.PI)) * 2;
        let nTileSize = nViewSize / Engine.g_pInstance.m_pTextCanvas.height * 256;
        if (nTileSize < 256) {
            nTileSize = 256;
        }
        let nTileLavel = Math.log((Math.PI * 2.0 * 6378137.0) / nTileSize) / Math.log(2);
        return {
            x: (this.m_nHRotated - 90.0) / 180.0 * Math.PI,
            y: this.m_nVRotated / 180.0 * Math.PI,
            z: Math.floor(nTileLavel)
        };
    }
    get camera() {
        if (2 == this.mode) {
            return this.m_pOrthCamera;
        }
        else if (3 == this.mode) {
            return this.m_pPersCamera;
        }
        else if (4 == this.mode) {
            return this.m_pPersCamera;
        }
        return null;
    }
    get mode() {
        return this.m_nMode2;
    }
    set mode(nMode) {
        if (nMode !== this.m_nMode2) {
            if (4 === nMode) {
                let pState = new CameraState();
                pState.m_mPerspectPos = new Vector3(0.0, 0.0, 0.0);
                pState.m_nForwardMoved = (6378137.0 * 1.5) / Math.tan(30.0 / 180.0 * Math.PI);
                pState.m_nVRotated = 0;
                pState.m_nHRotated = 0;
                pState.m_mOrthoPos = new Vector3(0.0, 0.0, 0.0);
                pState.m_nOrthoScaled = 6378137.0 * 3.0;
                pState.m_nZRotated = 0;
                this.m_nMinDis = 6378137.0;
                this.m_nMaxDis = pState.m_nForwardMoved;
                this.m_nMinOVSize = 1000.0;
                this.m_nMaxOVSize = 6378137.0 * 3.0;
                this.m_nMinVRotate = -85;
                this.m_nMaxVRotate = 85;
                this.m_nZoomSensit = 5000;
                this.m_pPersCamera.far = pState.m_nForwardMoved;
                this.m_pPersCamera.near = 100.0;
                this.m_pOrthCamera.far = pState.m_nForwardMoved;
                this.m_pOrthCamera.near = 100.0;
                this.m_pPersCamera.updateProjectionMatrix();
                this.m_pOrthCamera.updateProjectionMatrix();
                this.Flyto(pState);
            }
            else if (4 === this.m_nMode2) {
                this.m_nMinDis = 1.0;
                this.m_nMaxDis = 1024.0;
                this.m_nMinOVSize = 6.0;
                this.m_nMaxOVSize = 1000.0;
                this.m_nMinVRotate = 5;
                this.m_nMaxVRotate = 85;
                this.m_nZoomSensit = 0.5;
                this.m_pPersCamera.far = this.m_nFar;
                this.m_pPersCamera.near = this.m_nNear;
                this.m_pOrthCamera.far = this.m_nFar;
                this.m_pOrthCamera.near = this.m_nNear;
                this.m_pPersCamera.updateProjectionMatrix();
                this.m_pOrthCamera.updateProjectionMatrix();
                this.Flyto(null);
            }
            this.m_nMode2 = nMode;
        }
    }
    SetCamDistan(dis) {
    }
    WorldToScenePos(WorldPos) {
        let halfWidth = Engine.g_pInstance.m_pTextCanvas.width * 0.5;
        let halfHeight = Engine.g_pInstance.m_pTextCanvas.height * 0.5;
        let _position = new THREE.Vector3(WorldPos.x, WorldPos.y, -WorldPos.z);
        _position.project(this.camera);
        let result;
        if (_position.z >= 1) {
            result = {
                x: Math.round(_position.x * halfWidth + halfWidth),
                y: Math.round(-_position.y * halfHeight + halfHeight),
                z: _position.z
            };
        }
        else {
            result = {
                x: Math.round(_position.x * halfWidth + halfWidth),
                y: Math.round(-_position.y * halfHeight + halfHeight),
                z: _position.z
            };
        }
        return result;
    }
    SwitchMode(pViewMode) {
        this.m_eViewMode = pViewMode;
        switch (pViewMode) {
            case 0:
                this.mode = 2;
                break;
            case 1:
                this.mode = 3;
                break;
            default:
                break;
        }
        let pWork = MiaokitDC.DC.GetWork(MiaokitDC.DC.m_nCurWork);
        if (pWork && pWork.m_pALinerDC.m_pLayerMgr.m_pActiveLayer) {
            let pLayer = pWork.m_pEyejiaDC.m_pLayerMgr.GetLayer(pWork.m_pALinerDC.m_pLayerMgr.m_pActiveLayer.m_nIndex);
            if (pLayer && pLayer.m_pViewState) {
                this.SetViewState(pLayer.m_pViewState);
            }
        }
    }
    SetViewState(pState = null) {
        this.Reset(pState);
    }
    SelectAtEAM(pPoint) {
        let left = Engine.g_pInstance.m_nCanvasLeftWidth.Lenght + Math.floor(Engine.g_pInstance.m_nCanvasLeftWidth.ScreenPercentage * window.innerWidth);
        let top = Engine.g_pInstance.m_nCanvasTopHeight.Lenght + Math.floor(Engine.g_pInstance.m_nCanvasTopHeight.ScreenPercentage * window.innerHeight);
        let Sx = Math.floor((pPoint.pageX - left) / Engine.g_pInstance.m_nCavasScale.x);
        let Sy = Math.floor((pPoint.pageY - top) / Engine.g_pInstance.m_nCavasScale.y);
        if (this.m_eViewMode == 0) {
            let x = (Sx / Engine.g_pInstance.m_pTextCanvas.width) * 2 - 1;
            let y = -(Sy / Engine.g_pInstance.m_pTextCanvas.height) * 2 + 1;
            let halfW = Math.abs(this.m_pOrthCamera.left);
            let halfH = Math.abs(this.m_pOrthCamera.bottom);
            let mPos = new THREE.Vector3(x, y, -1).unproject(this.m_pOrthCamera);
            mPos.z = -mPos.z;
            Engine.g_pInstance.project.SetPos(mPos, pPoint);
        }
        else {
            let x = (Sx / Engine.g_pInstance.m_pTextCanvas.width) * 2 - 1;
            let y = -(Sy / Engine.g_pInstance.m_pTextCanvas.height) * 2 + 1;
            let standardVector = new THREE.Vector3(x, y, 0.5);
            let worldVector = standardVector.unproject(this.m_pPersCamera);
            worldVector.z = -worldVector.z;
            let cont = new THREE.Vector3();
            let py = (0 - worldVector.y) / (this.m_pPersCamera.position.y - worldVector.y);
            let x1 = (this.m_pPersCamera.position.x - worldVector.x) * py + worldVector.x;
            let z1 = (-this.m_pPersCamera.position.z - worldVector.z) * py + worldVector.z;
            Engine.g_pInstance.project.SetPos(new Vector3(x1, 0, z1), pPoint);
        }
    }
    Select(pPoint) {
        let Sx = pPoint.pageX / Engine.g_pInstance.m_nCavasScale.x;
        let Sy = pPoint.pageY / Engine.g_pInstance.m_nCavasScale.y;
        if (this.m_eViewMode == 0) {
            let x = (Sx / Engine.g_pInstance.m_pTextCanvas.width) * 2 - 1;
            let y = -(Sy / Engine.g_pInstance.m_pTextCanvas.height) * 2 + 1;
            let halfW = Math.abs(this.m_pOrthCamera.left);
            let halfH = Math.abs(this.m_pOrthCamera.bottom);
            let mPos = new THREE.Vector3(x, y, -1).unproject(this.m_pOrthCamera);
            mPos.z = -mPos.z;
            Engine.g_pInstance.project.SetPos(mPos, pPoint);
        }
        else {
            let x = (Sx / Engine.g_pInstance.m_pTextCanvas.width) * 2 - 1;
            let y = -(Sy / Engine.g_pInstance.m_pTextCanvas.height) * 2 + 1;
            let standardVector = new THREE.Vector3(x, y, 0.5);
            let worldVector = standardVector.unproject(this.m_pPersCamera);
            worldVector.z = -worldVector.z;
            let cont = new THREE.Vector3();
            let py = (0 - worldVector.y) / (this.m_pPersCamera.position.y - worldVector.y);
            let x1 = (this.m_pPersCamera.position.x - worldVector.x) * py + worldVector.x;
            let z1 = (-this.m_pPersCamera.position.z - worldVector.z) * py + worldVector.z;
            Engine.g_pInstance.project.SetPos(new Vector3(x1, 0, z1), pPoint);
        }
    }
    Tracking(pPos) {
    }
    get m_nDistance() {
        return this.m_nForwardMoved;
    }
    TouchPoint(pPoint) {
        let nCavansX = pPoint.pageX / Engine.g_pInstance.m_nCavasScale.x;
        let nCavansY = pPoint.pageY / Engine.g_pInstance.m_nCavasScale.y;
        if (true) {
            let nX = (nCavansX / Engine.g_pInstance.m_pTextCanvas.width) * 2 - 1;
            let nY = -(nCavansY / Engine.g_pInstance.m_pTextCanvas.height) * 2 + 1;
            let mRay = new THREE.Vector3(nX, nY, 1.0);
            let mWorldRay = mRay.unproject(this.m_pPersCamera);
            mWorldRay.z = -mWorldRay.z;
            mWorldRay.normalize();
            let mStart = this.m_pPersCamera.position.clone();
            let mEnd = mWorldRay.clone();
            mEnd.multiplyScalar(10000.0);
            mEnd.add(mStart);
            let pPlane = new THREE.Plane(new THREE.Vector3(0.0, 1.0, 0.0), 0.0);
            let pLine = new THREE.Line3(mStart, mEnd);
            let mPoint = new THREE.Vector3(0.0, 0.0, 0.0);
            mPoint = pPlane.intersectLine(pLine, mPoint);
            return mPoint ? mPoint.clone() : null;
        }
    }
}
class Project {
    constructor() {
        this.m_aWorkData = null;
        this.m_pNPaths = [];
        this.m_nMotion = 0;
        this.m_nSample = 0.1;
        this.m_nSampleFactor = 1;
        this.m_nSampleLength = 0;
        this.m_nNpointIndex = 0;
        this.m_bWaitVoice = false;
        this.m_pVoiceEnd = true;
        this.m_bWaitTime = false;
        this.m_nVoiceSpeed = 400;
        this.m_bRealTimeNavi = false;
        this.m_nRealTimeTab = 0;
        this.m_bAutoMotion = false;
        this.m_pFloorData = null;
        this.m_pBluePos = null;
        MiaokitDC.DC = new MiaokitDC();
        MiaokitDC.DC.DescriptorFactory = this.DescriptorFactory;
        MiaokitDC.DC.GroupFactory = this.GroupFactory;
        MiaokitDC.DC.CollectionFactory = this.CollectionFactory;
        MiaokitDC.DC.ComponentFactory = this.ComponentFactory;
    }
    version() {
        return 1000;
    }
    InitProject(pUrl, pCallback) {
        let pThis = this;
        MiaokitDC.DC.m_pAssetsLoader.LoadProject(pUrl, function (pBuffer) {
            if (pBuffer != null) {
                let pReader = new BinaryReader(pBuffer);
                pThis.m_aWorkData = new Array(256);
                pThis.UnSerialize(pReader);
                MiaokitDC.DC.InitWorks(pThis.m_aWorkData, function (pError) {
                    MiaokitDC.DC.SwitchWork(0);
                    MiaokitDC.DC.ActiveLayer(0);
                    if (Engine.g_pInstance.m_pProjectAEnd)
                        Engine.g_pInstance.m_pProjectAEnd();
                    if (Engine.g_pInstance.m_pProjectIdent == "EAM") {
                    }
                    else {
                        MiaokitDC.DC.m_pAssetsLoader.LoadMinor();
                    }
                    pCallback(pError);
                });
            }
            else {
                pCallback("Project.InitProject(): pBuffer != null.");
            }
        });
    }
    Start() { }
    Stop() { }
    Update() {
        MiaokitDC.DC.Update();
    }
    Destroy() {
        console.info("Project.Destroy():...");
    }
    ActiveLayer(nIndex) {
        console.log("切换楼层-------弃用的方法");
    }
    DescriptorFactory(eType) {
        let pDesc = null;
        switch (eType) {
            case CollectionType.ATexture:
                pDesc = new ATextureDesc();
                break;
            case CollectionType.AHoleModel:
                pDesc = new AHoleModelDesc();
                break;
            case CollectionType.AEdgeModel:
                pDesc = new AEdgeModelDesc();
                break;
            case CollectionType.EFurnitureModel:
                pDesc = new EFurnitureModelDesc();
                break;
            case CollectionType.EBuildingModel:
                pDesc = new EBuildingModelDesc();
                break;
            case CollectionType.EPictureModel:
                pDesc = new EPictureModelDesc();
                break;
            default:
                alert("Project.DescriptorFactory(): !eType, " + eType);
                break;
        }
        return pDesc;
    }
    GroupFactory(eType) {
        return new ECollectionGroup(eType);
    }
    CollectionFactory(eType, pDesc) {
        let pCollection = null;
        switch (eType) {
            case CollectionType.ATexture:
                pCollection = new ATexture(pDesc);
                break;
            case CollectionType.AHoleModel:
                pCollection = new AHoleModel(pDesc);
                break;
            case CollectionType.AEdgeModel:
                pCollection = new AEdgeModel(pDesc);
                break;
            case CollectionType.EFurnitureModel:
                pCollection = new EFurnitureModel(pDesc);
                break;
            case CollectionType.EBuildingModel:
                pCollection = new EBuildingModel(pDesc);
                break;
            case CollectionType.EPictureModel:
                pCollection = new EPictureModel(pDesc);
                break;
            default:
                alert("Project.CollectionFactory(): !eType, " + eType);
                break;
        }
        return pCollection;
    }
    ComponentFactory(eType) {
        switch (eType) {
            case ComponentType.Panel:
            case ComponentType.Edge:
            case ComponentType.AreaBottom:
            case ComponentType.AreaTop:
            default:
                alert("Project.ComponentFactory(): !eType, " + eType);
                break;
        }
        return null;
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        let nIndex = pReader.ReadInt32();
        while (nIndex > -1) {
            let nLength = pReader.ReadInt32();
            this.m_aWorkData[nIndex] = pReader.ReadBytes(nLength);
            let nDataEnd = pReader.ReadInt32();
            if (nDataEnd != 19890430) {
                alert("Project.UnSerialize(): nDataEnd != 19890430.");
            }
            nIndex = pReader.ReadInt32();
        }
        if (nVersion > 1000) {
            let lightMode = pReader.ReadInt32();
        }
        else {
            let lightMode = 0;
        }
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("Project.UnSerialize(): Bad end!");
        }
    }
    GetFloorCount() {
        return MiaokitDC.DC.GetWork(MiaokitDC.DC.m_nCurWork).m_pALinerDC.m_pLayerMgr.GetLayersLenth();
    }
    ActiveFloor(nFloorIndex, i) {
        Engine.g_pInstance.pTouchNavPoint = null;
        MiaokitDC.DC.ActiveLayer(nFloorIndex);
        Engine.g_pInstance.m_pChooseLayer(nFloorIndex);
        let pLayerName = "";
        if (this.m_pFloorData != null) {
            let pWork = MiaokitDC.DC.GetWork(MiaokitDC.DC.m_nCurWork);
            let pLayerID = pWork.m_pEyejiaDC.m_pLayerMgr.GetLayer(nFloorIndex).name;
            for (let pFloor of this.m_pFloorData) {
                if (pWork.m_pID == pFloor.build_num && pLayerID == pFloor.floor_name) {
                    pLayerName = pFloor.floor_name;
                    break;
                }
            }
        }
        let pNavBackData = new NavBackData(MiaokitDC.DC.m_nCurWork, MiaokitDC.DC.GetWork(MiaokitDC.DC.m_nCurWork).m_pID, nFloorIndex, pLayerName);
        console.log("Active:" + pNavBackData.PId);
        Engine.g_pInstance.m_pShowActiveLayer(pNavBackData, i);
        if (Engine.g_pInstance.m_pProjectIdent == "EAM") {
            if (Engine.g_pInstance.m_bGotoWorkUpdateCameraStateMark) {
                Engine.g_pInstance.m_bGotoWorkUpdateCameraStateMark = false;
                let pViewState = MiaokitDC.DC.GetWork(MiaokitDC.DC.m_nCurWork).m_pEyejiaDC.m_pLayerMgr.GetLayer(nFloorIndex).m_pViewState;
                if (pViewState != null) {
                    Engine.g_pInstance.SetViewState(pViewState);
                }
            }
        }
        else {
            let pViewState = Object.assign({}, MiaokitDC.DC.GetWork(MiaokitDC.DC.m_nCurWork).m_pEyejiaDC.m_pLayerMgr.GetLayer(nFloorIndex).m_pViewState);
            if (pViewState != null) {
                if (pViewState.m_mPerspectPos.z < 0) {
                    pViewState.m_mPerspectPos.z = -pViewState.m_mPerspectPos.z;
                }
                if (NNavigation.g_pActiveList.length > 0) {
                    pViewState.m_nForwardMoved = undefined;
                    pViewState.m_nOrthoScaled = undefined;
                }
                Engine.g_pInstance.SetViewState(pViewState);
            }
        }
    }
    SwitchViewMode(eMode) {
        switch (MiaokitDC.DC.viewMode) {
            case ViewMode.Invalid:
                MiaokitDC.DC.viewMode = ViewMode.View2D;
                break;
            case ViewMode.View2D:
                MiaokitDC.DC.viewMode = ViewMode.View3D;
                break;
            case ViewMode.View3D:
                MiaokitDC.DC.viewMode = ViewMode.View2D;
                break;
        }
    }
    Navigate(pBegin, nEnd, nType) {
        NNavigation.hasReport = [];
        console.log("起点编号", pBegin, "终点编号", nEnd, "优先通道类型", nType);
        Engine.g_pInstance.pTouchNavPoint = null;
        if (typeof pBegin != 'string')
            this.m_pNPaths = MiaokitDC.DC.m_pNavigator.FindPathFromPos(pBegin, nEnd, nType);
        else {
            console.error("Nav: ", pBegin, nEnd);
            this.m_pNPaths = MiaokitDC.DC.m_pNavigator.FindPath(pBegin, nEnd, nType);
        }
        console.log("pNavBack", this.m_pNPaths);
        if (this.m_pNPaths != null) {
            if (this.m_pNPaths.length == 0) {
                console.log("找不到路线");
                Engine.g_pInstance.m_pNoFindPath();
                return;
            }
            else {
                let nIndex = 0;
                while (nIndex < this.m_pNPaths.length) {
                    if (this.m_pNPaths[nIndex].m_aPath.length <= 1) {
                        this.m_pNPaths.splice(nIndex, 1);
                        nIndex--;
                    }
                    nIndex++;
                }
                console.log("线路数量", this.m_pNPaths.length);
                if (this.m_pNPaths != null && this.m_pFloorData != null) {
                    for (let pPath of this.m_pNPaths) {
                        let pWork = MiaokitDC.DC.GetWork(pPath.m_nWork);
                        let pLayerID = pWork.m_pEyejiaDC.m_pLayerMgr.GetLayer(pPath.m_nLayer)
                            .name;
                        for (let pFloor of this.m_pFloorData) {
                            if (pWork.m_pID == pFloor.build_num &&
                                pLayerID == pFloor.floor_name) {
                                pPath.m_pLayerName = pFloor.floor_name;
                                break;
                            }
                        }
                    }
                }
                this.NavigateEnd();
            }
        }
        else {
            this.m_pNPaths = [];
            console.log("找不到路线");
            Engine.g_pInstance.m_pNoFindPath();
        }
        Engine.g_pInstance.pPath = this.m_pNPaths;
        NNavigation.g_pActiveList = [];
        if (this.m_pNPaths.length > 0) {
            NNavigation.g_pActiveList.push(NNavigation.CreateNavigation(this.m_pNPaths));
        }
    }
    UpdatePath() {
        let pArea = null;
        let pStart = null;
        let pEnd = Engine.g_pInstance.pPath[Engine.g_pInstance.pPath.length - 1].m_pEndPoint;
        let mPos = Engine.g_pInstance.m_pBluePos;
        let pPointList = NavChartDC.DC.m_pLayerMgr.m_pActiveLayer.m_mPointList;
        let pLabelList = ALinerDC.DC.m_pLayerMgr.m_pActiveLayer.m_pLabelList;
        for (let pAAreaLabel of pLabelList) {
            if (null != pAAreaLabel.m_pArea) {
                if (pAAreaLabel.m_pArea.CollideBottom(mPos)) {
                    pArea = pAAreaLabel;
                    break;
                }
            }
        }
        if (null != pArea) {
            for (let pPoint of pPointList) {
                if (pArea.m_pArea.CollideBottom(pPoint.m_mPosition)) {
                    if (pStart == null)
                        pStart = pPoint;
                    pStart = this.GetNearestPoint(mPos, pStart, pPoint);
                }
            }
        }
        if (pStart != null) {
            let pPath = MiaokitDC.DC.m_pNavigator.FindPathDirect(pStart, pEnd, 0);
            if (null != pPath && 0 < pPath.length) {
                let nIndex = 0;
                while (nIndex < pPath.length) {
                    if (pPath[nIndex].m_aPath.length <= 1) {
                        pPath.splice(nIndex, 1);
                        nIndex--;
                    }
                    nIndex++;
                }
                if (this.m_pFloorData != null) {
                    for (let pCurPath of pPath) {
                        let pWork = MiaokitDC.DC.GetWork(pCurPath.m_nWork);
                        let pLayerID = pWork.m_pEyejiaDC.m_pLayerMgr.GetLayer(pCurPath.m_nLayer).name;
                        for (let pFloor of this.m_pFloorData) {
                            if (pWork.m_pID == pFloor.build_num &&
                                pLayerID == pFloor.floor_name) {
                                pCurPath.m_pLayerName = pFloor.floor_name;
                                break;
                            }
                        }
                    }
                }
                if (0 < pPath.length && 1 < pPath[0].m_aPath.length) {
                    if (Vector3.Distance(mPos, pPath[0].m_aPath[1]) <
                        Vector3.Distance(pPath[0].m_aPath[0], pPath[0].m_aPath[1])) {
                        pPath[0].m_aPath[0] = mPos;
                    }
                }
                this.m_pNPaths = pPath;
                Engine.g_pInstance.pPath = this.m_pNPaths;
            }
        }
    }
    BounceIcon(pBegin, nEndType, nGateType) {
        NavChartDC.DC.BounceIcon(nEndType);
        if (nEndType > 0) {
            return MiaokitDC.DC.m_pNavigator.FindNearest(pBegin, nEndType, nGateType);
        }
        return null;
    }
    FindNearestList(pStartSerial, pEndType, nGateType) {
        return MiaokitDC.DC.m_pNavigator.FindNearestList(pStartSerial, pEndType, nGateType);
    }
    StackUp(bActive) {
        MiaokitDC.DC.GetWork(MiaokitDC.DC.m_nCurWork).m_pALinerDC.StackUp(bActive);
    }
    NavigateEnd() {
        let NavBackDatas = [];
        for (let i = 0; i < this.m_pNPaths.length; i++) {
            if (this.m_pNPaths[i].m_aPath.length > 1) {
                NavBackDatas.push(new NavBackData(this.m_pNPaths[i].m_nWork, MiaokitDC.DC.GetWork(this.m_pNPaths[i].m_nWork).m_pID, this.m_pNPaths[i].m_nLayer, this.m_pNPaths[i].m_pLayerName));
            }
        }
        Engine.g_pInstance.m_pNavBack(NavBackDatas);
        if (Engine.g_pInstance.m_pProjectIdent == "EAM" || !Engine.g_pInstance.m_publicSetSelf) {
            this.SwitchWorkForIndex(NavBackDatas[0].HousId);
            this.ActiveFloor(NavBackDatas[0].LayerId);
        }
        this.m_bAutoMotion = true;
        this.m_nMotion = 0;
    }
    NavBack(pNavBackData, i) {
        console.log(pNavBackData.HousId + "回看" + pNavBackData.LayerId);
        if (i) {
            MiaokitDC.DC.m_pNavigator.m_aCurPath[i].m_aPath = this.m_pNPaths[i].m_aPath;
        }
        else {
            MiaokitDC.DC.m_pNavigator.m_aCurPath[0].m_aPath = this.m_pNPaths[0].m_aPath;
        }
        this.m_bAutoMotion = false;
        if (pNavBackData.HousId != MiaokitDC.DC.m_nCurWork) {
            this.SwitchWorkForIndex(pNavBackData.HousId);
        }
        this.ActiveFloor(pNavBackData.LayerId, i);
        this.m_nMotion = 0;
    }
    CloseNavBack() {
        NNavigation.ClearAllPath();
        console.log("退出回放.");
        this.m_pNPaths = [];
        Engine.g_pInstance.pPath = [];
        this.m_bAutoMotion = false;
        Engine.g_pInstance.m_pTackEnd = false;
    }
    SwitchWork(pId) {
        console.log("场景编辑编号" + pId);
        for (let pWork of MiaokitDC.DC.m_aWork) {
            if (pWork != null) {
                console.log("遍历场景" + pWork.m_pID);
                if (pWork.m_pID == pId) {
                    console.log("找到对应场景");
                    if (pWork.m_nIndex != MiaokitDC.DC.m_nCurWork) {
                        MiaokitDC.DC.SwitchWork(pWork.m_nIndex);
                    }
                    this.ActiveFloor(0);
                    let nLayerCount = MiaokitDC.DC.GetWork(MiaokitDC.DC.m_nCurWork).m_pALinerDC.m_pLayerMgr.GetLayersLenth();
                    console.log("返回当前楼层数：" + nLayerCount + "Work.m_nIndex" + pWork.m_nIndex);
                    Engine.g_pInstance.m_pLayerUpdate(nLayerCount, pWork.m_nIndex);
                    if (pWork.m_nIndex == 0 && MiaokitDC.DC.m_pWorkArr.length > 1) {
                        console.log("通知H5是外景");
                        Engine.g_pInstance.m_pOutWorkBack(true);
                    }
                    else {
                        console.log("通知H5不是外景");
                        Engine.g_pInstance.m_pOutWorkBack(false);
                    }
                }
            }
        }
    }
    SwitchWorkForIndex(pWorkIndex) {
        if (pWorkIndex != MiaokitDC.DC.m_nCurWork) {
            MiaokitDC.DC.SwitchWork(pWorkIndex);
        }
        let nLayerCount = MiaokitDC.DC.GetWork(MiaokitDC.DC.m_nCurWork).m_pALinerDC.m_pLayerMgr.GetLayersLenth();
        console.log("返回当前楼层数：" + nLayerCount + "Work.m_nIndex" + pWorkIndex);
        Engine.g_pInstance.m_pLayerUpdate(nLayerCount, pWorkIndex);
        console.log("Work数量：" + MiaokitDC.DC.m_pWorkArr.length);
        if (pWorkIndex == 0 && MiaokitDC.DC.m_pWorkArr.length > 1) {
            console.log("通知H5是外景");
            Engine.g_pInstance.m_pOutWorkBack(true);
        }
        else {
            console.log("通知H5不是外景");
            Engine.g_pInstance.m_pOutWorkBack(false);
        }
    }
    GoOutWork() {
        console.log("切换到外景");
        this.SwitchWorkForIndex(0);
        this.ActiveFloor(0);
    }
    Reset() {
        Engine.g_pInstance.m_pCameraCtrl.Reset();
        Engine.g_pInstance.pTouchNavPoint = null;
    }
    SetPos(pWordPos, pScenePos) {
        Engine.g_pInstance.m_pTackEnd = false;
        Engine.g_pInstance.m_screenPos = new Vector3(pWordPos.x, pWordPos.y, -pWordPos.z);
        let pArea = null;
        let pLandmarkList = NavChartDC.DC.m_pLayerMgr.m_pActiveLayer.m_mLandmarkList;
        let pLabelList = ALinerDC.DC.m_pLayerMgr.m_pActiveLayer.m_pLabelList;
        for (let pAAreaLabel of pLabelList) {
            if (pAAreaLabel.m_pArea != null) {
                if (pAAreaLabel.m_pArea.CollideBottom(pWordPos)) {
                    pArea = pAAreaLabel;
                }
            }
        }
        let pNaerLandmark = null;
        if (pArea) {
            for (let pNLandmark of pLandmarkList) {
                if (pNLandmark.m_pAAreaLabel != null && pNLandmark.m_pName != null) {
                    if (pArea == pNLandmark.m_pAAreaLabel) {
                        if (pNaerLandmark == null) {
                            pNaerLandmark = pNLandmark;
                        }
                        else {
                            pNaerLandmark = this.GetNearest(pWordPos, pNaerLandmark, pNLandmark);
                        }
                    }
                }
            }
        }
        if (Engine.g_pInstance.m_pProjectIdent == "EAM") {
            Engine.g_pInstance.m_pOnSetPos(pArea, pNaerLandmark, pWordPos, { x: pScenePos.pageX, y: pScenePos.pageY });
        }
        else {
            if (pNaerLandmark != null) {
                if (Engine.g_pInstance.m_pSetNavPoint != null) {
                    Engine.g_pInstance.pTouchNavPoint = pWordPos;
                    Engine.g_pInstance.m_pSetNavPoint(pNaerLandmark.m_pSerial, pNaerLandmark.m_pName, pScenePos);
                    if (Engine.g_pInstance.m_pTackArea) {
                        Engine.g_pInstance.m_pTackArea.m_pArea.HighLight(false);
                    }
                    Engine.g_pInstance.m_pTackArea = pArea;
                    if (Engine.g_pInstance.m_pTackArea) {
                        Engine.g_pInstance.m_pTackArea.m_pArea.HighLight(true);
                    }
                }
            }
            else {
                Engine.g_pInstance.pTouchNavPoint = null;
            }
        }
    }
    GetNearest(pPosition, pNLandmark1, pNLandmark2) {
        if (Vector3.Distance(pPosition, pNLandmark1.m_mPoint.Object.m_mPosition) <
            Vector3.Distance(pPosition, pNLandmark2.m_mPoint.Object.m_mPosition)) {
            return pNLandmark1;
        }
        else {
            return pNLandmark2;
        }
    }
    GetNearestPoint(pPosition, pPoint1, pPoint2) {
        if (Vector3.Distance(pPosition, pPoint1.m_mPosition) <
            Vector3.Distance(pPosition, pPoint2.m_mPosition)) {
            return pPoint1;
        }
        else {
            return pPoint2;
        }
    }
    GetBlueToothList() {
        let pBlueToothList = new Array();
        for (let pWork of MiaokitDC.DC.m_aWork) {
            if (pWork != null) {
                for (let pLayer of pWork.m_pEyejiaDC.m_pLayerMgr.m_pLayerList) {
                    pBlueToothList = pBlueToothList.concat(pLayer.GetBlueToothStation());
                }
            }
        }
        for (let blu of pBlueToothList) {
            console.log(blu.m_pMajorid, "蓝牙:", blu.m_pPosition.x, blu.m_pPosition.y, blu.m_pPosition.z);
        }
        return pBlueToothList;
    }
    CurrentPosition(nWorkID, nLayerID, pPosition) {
        Engine.g_pInstance.m_nBlueWorkID = nWorkID;
        Engine.g_pInstance.m_nBlueLayerID = nLayerID;
        Engine.g_pInstance.m_pBluePos = new Vector3(pPosition.x, 1.5, pPosition.y);
        this.m_pBluePos = new Vector3(pPosition.x, 1.5, pPosition.y);
        this.TestText("X" +
            pPosition.x.toFixed(3) +
            ",Y" +
            pPosition.y.toFixed(3) +
            ",Z" +
            pPosition.z.toFixed(3));
    }
    TestText(pText) {
    }
    TestText2(aStation) {
        let sArr = [];
        let i = 0;
        for (let p of aStation) {
            sArr[i] =
                "Rssi:" +
                    p.m_nRssi +
                    "Position:" +
                    p.m_mPosition.x.toFixed(2) +
                    "," +
                    p.m_mPosition.y.toFixed(2) +
                    "," +
                    p.m_mPosition.z.toFixed(2);
            i++;
        }
    }
    VoiceNavi() {
        if (this.m_bRealTimeNavi)
            return;
        let nCurrLayer = EyejiaDC.DC.m_pLayerMgr.m_pActiveLayer.m_nIndex;
        let nCurrWork = MiaokitDC.DC.m_nCurWork;
        if (this.m_pNPaths != null) {
            if (this.m_pNPaths.length == 0)
                return;
            if (this.m_pNPaths[0].m_nWork == nCurrWork &&
                this.m_pNPaths[0].m_nLayer == nCurrLayer) {
                if (this.m_pNPaths.length == 1) {
                    if (this.m_nMotion < 1) {
                        this.m_nMotion++;
                        this.VoicePost([
                            "从",
                            this.m_pNPaths[0].m_pStartPoint.m_mLandmark.Object.m_pName,
                            "出发"
                        ]);
                        Engine.g_pInstance.CamTracking(this.m_pNPaths[0].m_pStartPoint.m_mPosition);
                        let min = new Vector2(this.m_pNPaths[0].m_pStartPoint.m_mPosition.x, this.m_pNPaths[0].m_pStartPoint.m_mPosition.z);
                        let max = new Vector2(this.m_pNPaths[0].m_pStartPoint.m_mPosition.x, this.m_pNPaths[0].m_pStartPoint.m_mPosition.z);
                        for (let p of this.m_pNPaths[0].m_aPath) {
                            if (p.x < min.x) {
                                min.x = p.x;
                            }
                            if (p.z < min.y) {
                                min.y = p.z;
                            }
                            if (p.x > max.x) {
                                max.x = p.x;
                            }
                            if (p.z > max.y) {
                                max.y = p.z;
                            }
                        }
                        if (max.x - min.x > max.y - min.y) {
                            Engine.g_pInstance.m_pCameraCtrl.SetCamDistan((max.x - min.x) * 5);
                        }
                        else {
                            Engine.g_pInstance.m_pCameraCtrl.SetCamDistan((max.y - min.y) * 5);
                        }
                    }
                    if (this.m_nMotion < 2 && this.m_pVoiceEnd) {
                        this.m_nMotion++;
                    }
                    if (this.m_nMotion >= 2) {
                        if (this.m_nMotion < 3) {
                            this.m_nMotion++;
                            this.VoicePost([
                                "沿着标识路线行走",
                                this.m_pNPaths[0].m_nDistance.toFixed(0).toString(),
                                "米"
                            ]);
                            this.m_nNpointIndex = 0;
                            this.m_nSample =
                                this.m_pNPaths[0].m_nDistance /
                                    ((this.m_nVoiceSpeed *
                                        (9 + this.m_pNPaths[0].m_nDistance.toFixed(0).length)) /
                                        1000) /
                                    45;
                            this.m_nSampleFactor = 1;
                            this.m_nSampleLength = 0;
                            console.log("采样", this.m_nSample);
                        }
                        if (!this.m_bWaitVoice && this.m_nMotion < 4) {
                            this.m_nMotion++;
                        }
                        if (this.m_nMotion >= 5) {
                            if (this.m_nMotion < 6) {
                                this.m_nMotion++;
                                this.VoicePost([
                                    "到达目的地",
                                    this.m_pNPaths[0].m_pEndPoint.m_mLandmark.Object.m_pName
                                ]);
                            }
                        }
                        else if (this.m_nMotion == 4) {
                            if (this.m_nNpointIndex == 0) {
                                this.m_nNpointIndex++;
                            }
                            if (this.m_nNpointIndex < this.m_pNPaths[0].m_aPath.length) {
                                let pWatchPos;
                                let nCutDis = this.m_nSample * this.m_nSampleFactor;
                                this.m_nSampleFactor++;
                                while (this.m_nSampleLength < nCutDis) {
                                    this.m_nNpointIndex++;
                                    if (this.m_nNpointIndex >= this.m_pNPaths[0].m_aPath.length) {
                                        nCutDis = this.m_nSampleLength;
                                        Engine.g_pInstance.CamTracking(this.m_pNPaths[0].m_pEndPoint.m_mPosition);
                                        break;
                                    }
                                    this.m_nSampleLength += Vector3.Distance(this.m_pNPaths[0].m_aPath[this.m_nNpointIndex - 1], this.m_pNPaths[0].m_aPath[this.m_nNpointIndex]);
                                }
                                if (this.m_nNpointIndex < this.m_pNPaths[0].m_aPath.length) {
                                    let nDis = Vector3.Distance(this.m_pNPaths[0].m_aPath[this.m_nNpointIndex - 1], this.m_pNPaths[0].m_aPath[this.m_nNpointIndex]);
                                    let nRatio = (nDis - (this.m_nSampleLength - nCutDis)) / nDis;
                                    pWatchPos = Vector3.LerpVectors(this.m_pNPaths[0].m_aPath[this.m_nNpointIndex - 1], this.m_pNPaths[0].m_aPath[this.m_nNpointIndex], nRatio);
                                    Engine.g_pInstance.CamTracking(pWatchPos);
                                }
                            }
                            else {
                                if (this.m_pVoiceEnd) {
                                    console.log("第二段语音读完");
                                    this.m_nMotion++;
                                }
                            }
                        }
                    }
                }
                else {
                    if (this.m_nMotion < 1) {
                        this.m_nMotion++;
                        this.VoicePost([
                            "从",
                            this.m_pNPaths[0].m_pStartPoint.m_mLandmark.Object.m_pName,
                            "出发"
                        ]);
                        Engine.g_pInstance.CamTracking(this.m_pNPaths[0].m_pStartPoint.m_mPosition);
                        let min = new Vector2(this.m_pNPaths[0].m_pStartPoint.m_mPosition.x, this.m_pNPaths[0].m_pStartPoint.m_mPosition.z);
                        let max = new Vector2(this.m_pNPaths[0].m_pStartPoint.m_mPosition.x, this.m_pNPaths[0].m_pStartPoint.m_mPosition.z);
                        for (let p of this.m_pNPaths[0].m_aPath) {
                            if (p.x < min.x) {
                                min.x = p.x;
                            }
                            if (p.z < min.y) {
                                min.y = p.z;
                            }
                            if (p.x > max.x) {
                                max.x = p.x;
                            }
                            if (p.z > max.y) {
                                max.y = p.z;
                            }
                        }
                        if (max.x - min.x > max.y - min.y) {
                            Engine.g_pInstance.m_pCameraCtrl.SetCamDistan((max.x - min.x) * 5);
                        }
                        else {
                            Engine.g_pInstance.m_pCameraCtrl.SetCamDistan((max.y - min.y) * 5);
                        }
                    }
                    if (this.m_nMotion < 2 && this.m_pVoiceEnd) {
                        this.m_nMotion++;
                    }
                    if (this.m_nMotion >= 2) {
                        if (this.m_nMotion < 3) {
                            this.m_nMotion++;
                            this.VoicePost([
                                "沿着标识路线行走",
                                this.m_pNPaths[0].m_nDistance.toFixed(0),
                                "米"
                            ]);
                            this.m_nNpointIndex = 0;
                            this.m_nSample =
                                this.m_pNPaths[0].m_nDistance /
                                    ((this.m_nVoiceSpeed *
                                        (9 + this.m_pNPaths[0].m_nDistance.toFixed(0).length)) /
                                        1000) /
                                    45;
                            this.m_nSampleFactor = 1;
                            this.m_nSampleLength = 0;
                            console.log("采样", this.m_nSample);
                        }
                        if (!this.m_bWaitVoice && this.m_nMotion < 4) {
                            this.m_nMotion++;
                        }
                        if (this.m_nMotion >= 5) {
                            if (this.m_nMotion < 6) {
                                this.m_nMotion++;
                                if (this.m_pNPaths[0].m_nWork == 0) {
                                    if (this.m_pNPaths[0].m_nWork == this.m_pNPaths[1].m_nWork) {
                                        this.VoicePost([
                                            "从",
                                            this.m_pNPaths[0].m_pEndPoint.m_mLandmark.Object.TypeName(),
                                            "到达",
                                            this.m_pNPaths[1].m_pLayerName
                                        ]);
                                    }
                                    else if (this.m_pNPaths[1].m_nWork != 0) {
                                        this.VoicePost([
                                            "从",
                                            this.m_pNPaths[0].m_pEndPoint.m_mLandmark.Object.TypeName(),
                                            "进入",
                                            MiaokitDC.DC.GetWork(this.m_pNPaths[1].m_nWork).m_pID +
                                                this.m_pNPaths[1].m_pLayerName
                                        ]);
                                    }
                                    else {
                                        this.VoicePost([
                                            "从",
                                            this.m_pNPaths[0].m_pEndPoint.m_mLandmark.Object.TypeName(),
                                            "到达",
                                            MiaokitDC.DC.GetWork(this.m_pNPaths[1].m_nWork).m_pID +
                                                this.m_pNPaths[1].m_pLayerName
                                        ]);
                                    }
                                }
                                else {
                                    if (this.m_pNPaths[0].m_nWork == this.m_pNPaths[1].m_nWork) {
                                        this.VoicePost([
                                            "从",
                                            this.m_pNPaths[0].m_pEndPoint.m_mLandmark.Object.TypeName(),
                                            "到达",
                                            this.m_pNPaths[1].m_pLayerName
                                        ]);
                                    }
                                    else if (this.m_pNPaths[1].m_nWork != 0) {
                                        this.VoicePost([
                                            "从",
                                            this.m_pNPaths[0].m_pEndPoint.m_mLandmark.Object.TypeName(),
                                            "到达",
                                            MiaokitDC.DC.GetWork(this.m_pNPaths[1].m_nWork).m_pID +
                                                this.m_pNPaths[1].m_pLayerName
                                        ]);
                                    }
                                    else {
                                        this.VoicePost([
                                            "从",
                                            this.m_pNPaths[0].m_pEndPoint.m_mLandmark.Object.TypeName(),
                                            "出到",
                                            MiaokitDC.DC.GetWork(this.m_pNPaths[1].m_nWork).m_pID
                                        ]);
                                    }
                                }
                                console.log("动画类型:", this.m_pNPaths[0].m_pEndPoint.m_mLandmark.Object.m_nType);
                                switch (this.m_pNPaths[0].m_pEndPoint.m_mLandmark.Object.m_nType) {
                                    case 0:
                                        console.log("无设置动画，默认调用上楼梯");
                                        this.MoveClip(0);
                                        break;
                                    case 1:
                                        if (this.m_pNPaths[0].m_nLayer < this.m_pNPaths[1].m_nLayer) {
                                            this.MoveClip(0);
                                        }
                                        else {
                                            this.MoveClip(1);
                                        }
                                        break;
                                    case 2:
                                        if (this.m_pNPaths[0].m_nLayer < this.m_pNPaths[1].m_nLayer) {
                                            this.MoveClip(6);
                                        }
                                        else {
                                            this.MoveClip(7);
                                        }
                                        break;
                                    case 3:
                                        if (this.m_pNPaths[0].m_nLayer < this.m_pNPaths[1].m_nLayer) {
                                            this.MoveClip(4);
                                        }
                                        else {
                                            this.MoveClip(5);
                                        }
                                        break;
                                    case 5:
                                        this.MoveClip(3);
                                        break;
                                    case 6:
                                        this.MoveClip(2);
                                        break;
                                    case 7:
                                        break;
                                    default:
                                        break;
                                }
                                this.m_nStarTime = new Date().getTime() + 4000;
                            }
                            else if (this.m_bAutoMotion) {
                                if (this.m_pVoiceEnd &&
                                    new Date().getTime() > this.m_nStarTime) {
                                    if (this.m_pNPaths[1].m_nWork != MiaokitDC.DC.m_nCurWork) {
                                        this.SwitchWorkForIndex(this.m_pNPaths[1].m_nWork);
                                    }
                                    this.ActiveFloor(this.m_pNPaths[1].m_nLayer);
                                    this.m_nMotion = 0;
                                }
                            }
                        }
                        else if (this.m_nMotion == 4) {
                            if (this.m_nNpointIndex == 0) {
                                this.m_nNpointIndex++;
                            }
                            if (this.m_nNpointIndex < this.m_pNPaths[0].m_aPath.length) {
                                let pWatchPos;
                                let nCutDis = this.m_nSample * this.m_nSampleFactor;
                                this.m_nSampleFactor++;
                                while (this.m_nSampleLength < nCutDis) {
                                    this.m_nNpointIndex++;
                                    if (this.m_nNpointIndex >= this.m_pNPaths[0].m_aPath.length) {
                                        nCutDis = this.m_nSampleLength;
                                        Engine.g_pInstance.CamTracking(this.m_pNPaths[0].m_pEndPoint.m_mPosition);
                                        break;
                                    }
                                    this.m_nSampleLength += Vector3.Distance(this.m_pNPaths[0].m_aPath[this.m_nNpointIndex - 1], this.m_pNPaths[0].m_aPath[this.m_nNpointIndex]);
                                }
                                if (this.m_nNpointIndex < this.m_pNPaths[0].m_aPath.length) {
                                    let nDis = Vector3.Distance(this.m_pNPaths[0].m_aPath[this.m_nNpointIndex - 1], this.m_pNPaths[0].m_aPath[this.m_nNpointIndex]);
                                    let nRatio = (nDis - (this.m_nSampleLength - nCutDis)) / nDis;
                                    pWatchPos = Vector3.LerpVectors(this.m_pNPaths[0].m_aPath[this.m_nNpointIndex - 1], this.m_pNPaths[0].m_aPath[this.m_nNpointIndex], nRatio);
                                    Engine.g_pInstance.CamTracking(pWatchPos);
                                }
                            }
                            else {
                                if (this.m_pVoiceEnd) {
                                    this.m_nMotion++;
                                }
                            }
                        }
                    }
                }
            }
            else if (this.m_pNPaths[this.m_pNPaths.length - 1].m_nWork == nCurrWork &&
                this.m_pNPaths[this.m_pNPaths.length - 1].m_nLayer == nCurrLayer) {
                let pPaths = this.m_pNPaths[this.m_pNPaths.length - 1];
                if (this.m_nMotion < 1) {
                    this.m_nMotion++;
                    this.VoicePost([
                        "从",
                        pPaths.m_pStartPoint.m_mLandmark.Object.m_pName,
                        "出发"
                    ]);
                    Engine.g_pInstance.CamTracking(pPaths.m_pStartPoint.m_mPosition);
                    let min = new Vector2(pPaths.m_pStartPoint.m_mPosition.x, pPaths.m_pStartPoint.m_mPosition.z);
                    let max = new Vector2(pPaths.m_pStartPoint.m_mPosition.x, pPaths.m_pStartPoint.m_mPosition.z);
                    for (let p of pPaths.m_aPath) {
                        if (p.x < min.x) {
                            min.x = p.x;
                        }
                        if (p.z < min.y) {
                            min.y = p.z;
                        }
                        if (p.x > max.x) {
                            max.x = p.x;
                        }
                        if (p.z > max.y) {
                            max.y = p.z;
                        }
                    }
                    if (max.x - min.x > max.y - min.y) {
                        Engine.g_pInstance.m_pCameraCtrl.SetCamDistan((max.x - min.x) * 5);
                    }
                    else {
                        Engine.g_pInstance.m_pCameraCtrl.SetCamDistan((max.y - min.y) * 5);
                    }
                }
                if (this.m_nMotion < 2 && this.m_pVoiceEnd) {
                    this.m_nMotion++;
                }
                if (this.m_nMotion >= 2) {
                    if (this.m_nMotion < 3) {
                        this.m_nMotion++;
                        this.VoicePost([
                            "沿着标识路线行走",
                            pPaths.m_nDistance.toFixed(0),
                            "米"
                        ]);
                        this.m_nNpointIndex = 0;
                        this.m_nSample =
                            pPaths.m_nDistance /
                                ((this.m_nVoiceSpeed *
                                    (9 + pPaths.m_nDistance.toFixed(0).length)) /
                                    1000) /
                                45;
                        this.m_nSampleFactor = 1;
                        this.m_nSampleLength = 0;
                        console.log("采样", this.m_nSample);
                    }
                    if (!this.m_bWaitVoice && this.m_nMotion < 4) {
                        this.m_nMotion++;
                    }
                    if (this.m_nMotion >= 5) {
                        if (this.m_nMotion < 6) {
                            this.m_nMotion++;
                            this.VoicePost([
                                "到达目的地",
                                pPaths.m_pEndPoint.m_mLandmark.Object.m_pName
                            ]);
                        }
                    }
                    else if (this.m_nMotion == 4) {
                        if (this.m_nNpointIndex == 0) {
                            this.m_nNpointIndex++;
                        }
                        if (this.m_nNpointIndex < pPaths.m_aPath.length) {
                            let pWatchPos;
                            let nCutDis = this.m_nSample * this.m_nSampleFactor;
                            this.m_nSampleFactor++;
                            while (this.m_nSampleLength < nCutDis) {
                                this.m_nNpointIndex++;
                                if (this.m_nNpointIndex >= pPaths.m_aPath.length) {
                                    nCutDis = this.m_nSampleLength;
                                    Engine.g_pInstance.CamTracking(pPaths.m_pEndPoint.m_mPosition);
                                    break;
                                }
                                this.m_nSampleLength += Vector3.Distance(pPaths.m_aPath[this.m_nNpointIndex - 1], pPaths.m_aPath[this.m_nNpointIndex]);
                            }
                            if (this.m_nNpointIndex < pPaths.m_aPath.length) {
                                let nDis = Vector3.Distance(pPaths.m_aPath[this.m_nNpointIndex - 1], pPaths.m_aPath[this.m_nNpointIndex]);
                                let nRatio = (nDis - (this.m_nSampleLength - nCutDis)) / nDis;
                                pWatchPos = Vector3.LerpVectors(pPaths.m_aPath[this.m_nNpointIndex - 1], pPaths.m_aPath[this.m_nNpointIndex], nRatio);
                                Engine.g_pInstance.CamTracking(pWatchPos);
                            }
                        }
                        else {
                            if (this.m_pVoiceEnd) {
                                this.m_nMotion++;
                            }
                        }
                    }
                }
            }
            else {
                let nPathIndex = 0;
                for (let pPath of this.m_pNPaths) {
                    if (pPath.m_nWork == nCurrWork && pPath.m_nLayer == nCurrLayer) {
                        let pNextPath = this.m_pNPaths[nPathIndex + 1];
                        if (this.m_nMotion < 1) {
                            this.m_nMotion++;
                            this.VoicePost([
                                "从",
                                pPath.m_pStartPoint.m_mLandmark.Object.m_pName,
                                "出发"
                            ]);
                            Engine.g_pInstance.CamTracking(pPath.m_pStartPoint.m_mPosition);
                            let min = new Vector2(pPath.m_pStartPoint.m_mPosition.x, pPath.m_pStartPoint.m_mPosition.z);
                            let max = new Vector2(pPath.m_pStartPoint.m_mPosition.x, pPath.m_pStartPoint.m_mPosition.z);
                            for (let p of pPath.m_aPath) {
                                if (p.x < min.x) {
                                    min.x = p.x;
                                }
                                if (p.z < min.y) {
                                    min.y = p.z;
                                }
                                if (p.x > max.x) {
                                    max.x = p.x;
                                }
                                if (p.z > max.y) {
                                    max.y = p.z;
                                }
                            }
                            if (max.x - min.x > max.y - min.y) {
                                Engine.g_pInstance.m_pCameraCtrl.SetCamDistan((max.x - min.x) * 5);
                            }
                            else {
                                Engine.g_pInstance.m_pCameraCtrl.SetCamDistan((max.y - min.y) * 5);
                            }
                        }
                        if (this.m_nMotion < 2 && this.m_pVoiceEnd) {
                            this.m_nMotion++;
                        }
                        if (this.m_nMotion >= 2) {
                            if (this.m_nMotion < 3) {
                                this.m_nMotion++;
                                this.VoicePost([
                                    "沿着标识路线行走",
                                    pPath.m_nDistance.toFixed(0),
                                    "米"
                                ]);
                                this.m_nNpointIndex = 0;
                                this.m_nSample =
                                    pPath.m_nDistance /
                                        ((this.m_nVoiceSpeed *
                                            (9 + pPath.m_nDistance.toFixed(0).length)) /
                                            1000) /
                                        45;
                                this.m_nSampleFactor = 1;
                                this.m_nSampleLength = 0;
                                console.log("采样", this.m_nSample);
                            }
                            if (!this.m_bWaitVoice && this.m_nMotion < 4) {
                                this.m_nMotion++;
                            }
                            if (this.m_nMotion >= 5) {
                                if (this.m_nMotion < 6) {
                                    this.m_nMotion++;
                                    if (pPath.m_nWork == 0) {
                                        if (pPath.m_nWork == pNextPath.m_nWork) {
                                            this.VoicePost([
                                                "从",
                                                pPath.m_pEndPoint.m_mLandmark.Object.TypeName(),
                                                "到达",
                                                pNextPath.m_pLayerName
                                            ]);
                                        }
                                        else if (pNextPath.m_nWork != 0) {
                                            this.VoicePost([
                                                "从",
                                                pPath.m_pEndPoint.m_mLandmark.Object.TypeName(),
                                                "进入",
                                                MiaokitDC.DC.GetWork(pNextPath.m_nWork).m_pID +
                                                    pNextPath.m_pLayerName
                                            ]);
                                        }
                                        else {
                                            this.VoicePost([
                                                "从",
                                                pPath.m_pEndPoint.m_mLandmark.Object.TypeName(),
                                                "到达",
                                                MiaokitDC.DC.GetWork(pNextPath.m_nWork).m_pID +
                                                    pNextPath.m_pLayerName
                                            ]);
                                        }
                                    }
                                    else {
                                        if (pPath.m_nWork == pNextPath.m_nWork) {
                                            this.VoicePost([
                                                "从",
                                                pPath.m_pEndPoint.m_mLandmark.Object.TypeName(),
                                                "到达",
                                                pNextPath.m_pLayerName
                                            ]);
                                        }
                                        else if (pNextPath.m_nWork != 0) {
                                            this.VoicePost([
                                                "从",
                                                pPath.m_pEndPoint.m_mLandmark.Object.TypeName(),
                                                "到达",
                                                MiaokitDC.DC.GetWork(pNextPath.m_nWork).m_pID +
                                                    pNextPath.m_pLayerName
                                            ]);
                                        }
                                        else {
                                            this.VoicePost([
                                                "从",
                                                pPath.m_pEndPoint.m_mLandmark.Object.TypeName(),
                                                "出到",
                                                MiaokitDC.DC.GetWork(pNextPath.m_nWork).m_pID
                                            ]);
                                        }
                                    }
                                    console.log("动画类型:", pPath.m_pEndPoint.m_mLandmark.Object.m_nType);
                                    switch (pPath.m_pEndPoint.m_mLandmark.Object.m_nType) {
                                        case 0:
                                            console.log("无设置动画，默认调用上楼梯");
                                            this.MoveClip(0);
                                            break;
                                        case 1:
                                            if (pPath.m_nLayer < pNextPath.m_nLayer) {
                                                this.MoveClip(0);
                                            }
                                            else {
                                                this.MoveClip(1);
                                            }
                                            break;
                                        case 2:
                                            if (pPath.m_nLayer < pNextPath.m_nLayer) {
                                                this.MoveClip(6);
                                            }
                                            else {
                                                this.MoveClip(7);
                                            }
                                            break;
                                        case 3:
                                            if (pPath.m_nLayer < pNextPath.m_nLayer) {
                                                this.MoveClip(4);
                                            }
                                            else {
                                                this.MoveClip(5);
                                            }
                                            break;
                                        case 5:
                                            this.MoveClip(3);
                                            break;
                                        case 6:
                                            this.MoveClip(2);
                                            break;
                                        case 7:
                                            break;
                                        default:
                                            break;
                                    }
                                    this.m_nStarTime = new Date().getTime() + 4000;
                                }
                                else if (this.m_bAutoMotion) {
                                    if (this.m_pVoiceEnd &&
                                        new Date().getTime() > this.m_nStarTime) {
                                        if (pNextPath.m_nWork != MiaokitDC.DC.m_nCurWork) {
                                            this.SwitchWorkForIndex(pNextPath.m_nWork);
                                        }
                                        this.ActiveFloor(pNextPath.m_nLayer);
                                        this.m_nMotion = 0;
                                    }
                                }
                            }
                            else if (this.m_nMotion == 4) {
                                if (this.m_nNpointIndex == 0) {
                                    this.m_nNpointIndex++;
                                }
                                if (this.m_nNpointIndex < pPath.m_aPath.length) {
                                    let pWatchPos;
                                    let nCutDis = this.m_nSample * this.m_nSampleFactor;
                                    this.m_nSampleFactor++;
                                    while (this.m_nSampleLength < nCutDis) {
                                        this.m_nNpointIndex++;
                                        if (this.m_nNpointIndex >= pPath.m_aPath.length) {
                                            nCutDis = this.m_nSampleLength;
                                            Engine.g_pInstance.CamTracking(pPath.m_pEndPoint.m_mPosition);
                                            break;
                                        }
                                        this.m_nSampleLength += Vector3.Distance(pPath.m_aPath[this.m_nNpointIndex - 1], pPath.m_aPath[this.m_nNpointIndex]);
                                    }
                                    if (this.m_nNpointIndex < pPath.m_aPath.length) {
                                        let nDis = Vector3.Distance(pPath.m_aPath[this.m_nNpointIndex - 1], pPath.m_aPath[this.m_nNpointIndex]);
                                        let nRatio = (nDis - (this.m_nSampleLength - nCutDis)) / nDis;
                                        pWatchPos = Vector3.LerpVectors(pPath.m_aPath[this.m_nNpointIndex - 1], pPath.m_aPath[this.m_nNpointIndex], nRatio);
                                        Engine.g_pInstance.CamTracking(pWatchPos);
                                    }
                                }
                                else {
                                    if (this.m_pVoiceEnd) {
                                        this.m_nMotion++;
                                    }
                                }
                            }
                        }
                    }
                    nPathIndex++;
                }
            }
        }
    }
    RealTimeVoiceNavi() {
        if (!this.m_bRealTimeNavi)
            return;
        let nCurrLayer = EyejiaDC.DC.m_pLayerMgr.m_pActiveLayer.m_nIndex;
        let nCurrWork = MiaokitDC.DC.m_nCurWork;
        if (Engine.g_pInstance.m_nBlueWorkID == nCurrWork &&
            Engine.g_pInstance.m_nBlueLayerID == nCurrLayer) {
            if (this.m_pNPaths != []) {
                for (let pPath of this.m_pNPaths) {
                    if (pPath.m_nWork == nCurrWork && pPath.m_nLayer == nCurrLayer) {
                        let pNearPassage = null;
                        let nNearPassIndex = 0;
                        for (let pPathPassage of pPath.m_pPathPassage) {
                            if (pNearPassage == null) {
                                pNearPassage = pPathPassage;
                            }
                            else {
                                pNearPassage = this.NearPathPassage(this.m_pBluePos, pNearPassage, pPathPassage);
                            }
                            nNearPassIndex++;
                        }
                        if (5 < this.DisPathPassage(this.m_pBluePos, pNearPassage)) {
                            if (this.m_nRealTimeTab != 0) {
                                this.m_nRealTimeTab = 0;
                                this.VoicePost(["您已经偏离航线"]);
                            }
                            else {
                                if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                    this.m_nStarTime =
                                        new Date().getTime() + this.m_nVoiceSpeed * 7 + 4000;
                                    this.m_bWaitTime = true;
                                }
                                if (this.m_bWaitTime &&
                                    new Date().getTime() > this.m_nStarTime) {
                                    this.VoicePost(["您已经偏离航线"]);
                                    this.m_bWaitTime = false;
                                }
                            }
                        }
                        else {
                            let frontDis = Vector3.Distance(this.m_pBluePos, pNearPassage.m_pEndPos);
                            let backDis = Vector3.Distance(this.m_pBluePos, pNearPassage.m_pStarPos);
                            if (backDis < 2) {
                                if (frontDis < 2) {
                                    let lastAngle = pNearPassage.m_pNextAngle;
                                    if (lastAngle < 110) {
                                        if (this.m_nRealTimeTab != 1) {
                                            this.m_nRealTimeTab = 1;
                                            this.VoicePost(["向左方行走"]);
                                        }
                                        else {
                                            if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                this.m_nStarTime =
                                                    new Date().getTime() + this.m_nVoiceSpeed * 5 + 4000;
                                                this.m_bWaitTime = true;
                                            }
                                            if (this.m_bWaitTime &&
                                                new Date().getTime() > this.m_nStarTime) {
                                                this.VoicePost(["向左方行走"]);
                                                this.m_bWaitTime = false;
                                            }
                                        }
                                    }
                                    else if (lastAngle < 150) {
                                        if (this.m_nRealTimeTab != 2) {
                                            this.m_nRealTimeTab = 2;
                                            this.VoicePost(["向左前方行走"]);
                                        }
                                        else {
                                            if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                this.m_nStarTime =
                                                    new Date().getTime() + this.m_nVoiceSpeed * 6 + 4000;
                                                this.m_bWaitTime = true;
                                            }
                                            if (this.m_bWaitTime &&
                                                new Date().getTime() > this.m_nStarTime) {
                                                this.VoicePost(["向左前方行走"]);
                                                this.m_bWaitTime = false;
                                            }
                                        }
                                    }
                                    else if (lastAngle < 210) {
                                        if (this.m_nRealTimeTab != 3) {
                                            this.m_nRealTimeTab = 3;
                                            this.VoicePost(["向右前方行走"]);
                                        }
                                        else {
                                            if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                this.m_nStarTime =
                                                    new Date().getTime() + this.m_nVoiceSpeed * 6 + 4000;
                                                this.m_bWaitTime = true;
                                            }
                                            if (this.m_bWaitTime &&
                                                new Date().getTime() > this.m_nStarTime) {
                                                this.VoicePost(["向右前方行走"]);
                                                this.m_bWaitTime = false;
                                            }
                                        }
                                    }
                                    else if (lastAngle < 250) {
                                        if (this.m_nRealTimeTab != 4) {
                                            this.m_nRealTimeTab = 4;
                                            this.VoicePost(["向右方行走"]);
                                        }
                                        else {
                                            if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                this.m_nStarTime =
                                                    new Date().getTime() + this.m_nVoiceSpeed * 5 + 4000;
                                                this.m_bWaitTime = true;
                                            }
                                            if (this.m_bWaitTime &&
                                                new Date().getTime() > this.m_nStarTime) {
                                                this.VoicePost(["向右方行走"]);
                                                this.m_bWaitTime = false;
                                            }
                                        }
                                    }
                                }
                                else {
                                    if (nNearPassIndex > 0) {
                                        let lastAngle = pPath.m_pPathPassage[nNearPassIndex - 1].m_pNextAngle;
                                        if (lastAngle < 110) {
                                            if (this.m_nRealTimeTab != 5) {
                                                this.m_nRealTimeTab = 5;
                                                this.VoicePost(["向左方行走"]);
                                            }
                                            else {
                                                if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                    this.m_nStarTime =
                                                        new Date().getTime() +
                                                            this.m_nVoiceSpeed * 5 +
                                                            4000;
                                                    this.m_bWaitTime = true;
                                                }
                                                if (this.m_bWaitTime &&
                                                    new Date().getTime() > this.m_nStarTime) {
                                                    this.VoicePost(["向左方行走"]);
                                                    this.m_bWaitTime = false;
                                                }
                                            }
                                        }
                                        else if (lastAngle < 150) {
                                            if (this.m_nRealTimeTab != 6) {
                                                this.m_nRealTimeTab = 6;
                                                this.VoicePost(["向左前方行走"]);
                                            }
                                            else {
                                                if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                    this.m_nStarTime =
                                                        new Date().getTime() +
                                                            this.m_nVoiceSpeed * 6 +
                                                            4000;
                                                    this.m_bWaitTime = true;
                                                }
                                                if (this.m_bWaitTime &&
                                                    new Date().getTime() > this.m_nStarTime) {
                                                    this.VoicePost(["向左前方行走"]);
                                                    this.m_bWaitTime = false;
                                                }
                                            }
                                        }
                                        else if (lastAngle < 210) {
                                            if (this.m_nRealTimeTab != 7) {
                                                this.m_nRealTimeTab = 7;
                                                this.VoicePost(["向右前方行走"]);
                                            }
                                            else {
                                                if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                    this.m_nStarTime =
                                                        new Date().getTime() +
                                                            this.m_nVoiceSpeed * 6 +
                                                            4000;
                                                    this.m_bWaitTime = true;
                                                }
                                                if (this.m_bWaitTime &&
                                                    new Date().getTime() > this.m_nStarTime) {
                                                    this.VoicePost(["向右前方行走"]);
                                                    this.m_bWaitTime = false;
                                                }
                                            }
                                        }
                                        else if (lastAngle < 250) {
                                            if (this.m_nRealTimeTab != 8) {
                                                this.m_nRealTimeTab = 8;
                                                this.VoicePost(["向右方行走"]);
                                            }
                                            else {
                                                if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                    this.m_nStarTime =
                                                        new Date().getTime() +
                                                            this.m_nVoiceSpeed * 5 +
                                                            4000;
                                                    this.m_bWaitTime = true;
                                                }
                                                if (this.m_bWaitTime &&
                                                    new Date().getTime() > this.m_nStarTime) {
                                                    this.VoicePost(["向右方行走"]);
                                                    this.m_bWaitTime = false;
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        if (frontDis < 10) {
                                            let nextAngle = pNearPassage.m_pNextAngle;
                                            if (nextAngle == 0) {
                                                if (this.m_nRealTimeTab != 9) {
                                                    this.m_nRealTimeTab = 9;
                                                    this.VoicePost([
                                                        "前方行走",
                                                        frontDis.toString(),
                                                        "米",
                                                        "到达目的地"
                                                    ]);
                                                }
                                                else {
                                                    if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                        this.m_nStarTime =
                                                            new Date().getTime() +
                                                                this.m_nVoiceSpeed * 11 +
                                                                4000;
                                                        this.m_bWaitTime = true;
                                                    }
                                                    if (this.m_bWaitTime &&
                                                        new Date().getTime() > this.m_nStarTime) {
                                                        this.VoicePost([
                                                            "前方行走",
                                                            frontDis.toString(),
                                                            "米",
                                                            "到达目的地"
                                                        ]);
                                                        this.m_bWaitTime = false;
                                                    }
                                                }
                                            }
                                            else if (nextAngle < 110) {
                                                if (this.m_nRealTimeTab != 10) {
                                                    this.m_nRealTimeTab = 10;
                                                    this.VoicePost([
                                                        "前方",
                                                        frontDis.toString(),
                                                        "米",
                                                        "向左行走"
                                                    ]);
                                                }
                                                else {
                                                    if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                        this.m_nStarTime =
                                                            new Date().getTime() +
                                                                this.m_nVoiceSpeed * 8 +
                                                                4000;
                                                        this.m_bWaitTime = true;
                                                    }
                                                    if (this.m_bWaitTime &&
                                                        new Date().getTime() > this.m_nStarTime) {
                                                        this.VoicePost([
                                                            "前方",
                                                            frontDis.toString(),
                                                            "米",
                                                            "向左行走"
                                                        ]);
                                                        this.m_bWaitTime = false;
                                                    }
                                                }
                                            }
                                            else if (nextAngle < 150) {
                                                if (this.m_nRealTimeTab != 11) {
                                                    this.m_nRealTimeTab = 11;
                                                    this.VoicePost([
                                                        "前方",
                                                        frontDis.toString(),
                                                        "米",
                                                        "向左前方行走"
                                                    ]);
                                                }
                                                else {
                                                    if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                        this.m_nStarTime =
                                                            new Date().getTime() +
                                                                this.m_nVoiceSpeed * 10 +
                                                                4000;
                                                        this.m_bWaitTime = true;
                                                    }
                                                    if (this.m_bWaitTime &&
                                                        new Date().getTime() > this.m_nStarTime) {
                                                        this.VoicePost([
                                                            "前方",
                                                            frontDis.toString(),
                                                            "米",
                                                            "向左前方行走"
                                                        ]);
                                                        this.m_bWaitTime = false;
                                                    }
                                                }
                                            }
                                            else if (nextAngle < 210) {
                                                if (this.m_nRealTimeTab != 12) {
                                                    this.m_nRealTimeTab = 12;
                                                    this.VoicePost([
                                                        "前方",
                                                        frontDis.toString(),
                                                        "米",
                                                        "向右前方行走"
                                                    ]);
                                                }
                                                else {
                                                    if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                        this.m_nStarTime =
                                                            new Date().getTime() +
                                                                this.m_nVoiceSpeed * 10 +
                                                                4000;
                                                        this.m_bWaitTime = true;
                                                    }
                                                    if (this.m_bWaitTime &&
                                                        new Date().getTime() > this.m_nStarTime) {
                                                        this.VoicePost([
                                                            "前方",
                                                            frontDis.toString(),
                                                            "米",
                                                            "向右前方行走"
                                                        ]);
                                                        this.m_bWaitTime = false;
                                                    }
                                                }
                                            }
                                            else if (nextAngle < 250) {
                                                if (this.m_nRealTimeTab != 13) {
                                                    this.m_nRealTimeTab = 13;
                                                    this.VoicePost([
                                                        "前方",
                                                        frontDis.toString(),
                                                        "米",
                                                        "向右行走"
                                                    ]);
                                                }
                                                else {
                                                    if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                        this.m_nStarTime =
                                                            new Date().getTime() +
                                                                this.m_nVoiceSpeed * 8 +
                                                                4000;
                                                        this.m_bWaitTime = true;
                                                    }
                                                    if (this.m_bWaitTime &&
                                                        new Date().getTime() > this.m_nStarTime) {
                                                        this.VoicePost([
                                                            "前方",
                                                            frontDis.toString(),
                                                            "米",
                                                            "向右行走"
                                                        ]);
                                                        this.m_bWaitTime = false;
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            if (this.m_nRealTimeTab != 14) {
                                                this.m_nRealTimeTab = 14;
                                                this.VoicePost(["沿着当前路线直行"]);
                                            }
                                            else {
                                                if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                    this.m_nStarTime =
                                                        new Date().getTime() +
                                                            this.m_nVoiceSpeed * 8 +
                                                            4000;
                                                    this.m_bWaitTime = true;
                                                }
                                                if (this.m_bWaitTime &&
                                                    new Date().getTime() > this.m_nStarTime) {
                                                    this.VoicePost(["沿着当前路线直行"]);
                                                    this.m_bWaitTime = false;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                if (frontDis > 10) {
                                    if (this.m_nRealTimeTab != 15) {
                                        this.m_nRealTimeTab = 15;
                                        this.VoicePost(["沿着当前路线直行"]);
                                    }
                                    else {
                                        if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                            this.m_nStarTime =
                                                new Date().getTime() + this.m_nVoiceSpeed * 8 + 4000;
                                            this.m_bWaitTime = true;
                                        }
                                        if (this.m_bWaitTime &&
                                            new Date().getTime() > this.m_nStarTime) {
                                            this.VoicePost(["沿着当前路线直行"]);
                                            this.m_bWaitTime = false;
                                        }
                                    }
                                }
                                else {
                                    let nextAngle = pNearPassage.m_pNextAngle;
                                    if (nextAngle == 0) {
                                        if (this.m_nRealTimeTab != 16) {
                                            this.m_nRealTimeTab = 16;
                                            this.VoicePost([
                                                "前方直行",
                                                frontDis.toString(),
                                                "米",
                                                "到达目的地"
                                            ]);
                                        }
                                        else {
                                            if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                this.m_nStarTime =
                                                    new Date().getTime() + this.m_nVoiceSpeed * 11 + 4000;
                                                this.m_bWaitTime = true;
                                            }
                                            if (this.m_bWaitTime &&
                                                new Date().getTime() > this.m_nStarTime) {
                                                this.VoicePost([
                                                    "前方直行",
                                                    frontDis.toString(),
                                                    "米",
                                                    "到达目的地"
                                                ]);
                                                this.m_bWaitTime = false;
                                            }
                                        }
                                    }
                                    else if (nextAngle < 110) {
                                        if (this.m_nRealTimeTab != 17) {
                                            this.m_nRealTimeTab = 17;
                                            this.VoicePost([
                                                "前方",
                                                frontDis.toString(),
                                                "米",
                                                "向左行走"
                                            ]);
                                        }
                                        else {
                                            if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                this.m_nStarTime =
                                                    new Date().getTime() + this.m_nVoiceSpeed * 8 + 4000;
                                                this.m_bWaitTime = true;
                                            }
                                            if (this.m_bWaitTime &&
                                                new Date().getTime() > this.m_nStarTime) {
                                                this.VoicePost([
                                                    "前方",
                                                    frontDis.toString(),
                                                    "米",
                                                    "向左行走"
                                                ]);
                                                this.m_bWaitTime = false;
                                            }
                                        }
                                    }
                                    else if (nextAngle < 150) {
                                        if (this.m_nRealTimeTab != 18) {
                                            this.m_nRealTimeTab = 18;
                                            this.VoicePost([
                                                "前方",
                                                frontDis.toString(),
                                                "米",
                                                "向左前方行走"
                                            ]);
                                        }
                                        else {
                                            if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                this.m_nStarTime =
                                                    new Date().getTime() + this.m_nVoiceSpeed * 10 + 4000;
                                                this.m_bWaitTime = true;
                                            }
                                            if (this.m_bWaitTime &&
                                                new Date().getTime() > this.m_nStarTime) {
                                                this.VoicePost([
                                                    "前方",
                                                    frontDis.toString(),
                                                    "米",
                                                    "向左前方行走"
                                                ]);
                                                this.m_bWaitTime = false;
                                            }
                                        }
                                    }
                                    else if (nextAngle < 210) {
                                        if (this.m_nRealTimeTab != 19) {
                                            this.m_nRealTimeTab = 19;
                                            this.VoicePost([
                                                "前方",
                                                frontDis.toString(),
                                                "米",
                                                "向右前方行走"
                                            ]);
                                        }
                                        else {
                                            if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                this.m_nStarTime =
                                                    new Date().getTime() + this.m_nVoiceSpeed * 10 + 4000;
                                                this.m_bWaitTime = true;
                                            }
                                            if (this.m_bWaitTime &&
                                                new Date().getTime() > this.m_nStarTime) {
                                                this.VoicePost([
                                                    "前方",
                                                    frontDis.toString(),
                                                    "米",
                                                    "向右前方行走"
                                                ]);
                                                this.m_bWaitTime = false;
                                            }
                                        }
                                    }
                                    else if (nextAngle < 250) {
                                        if (this.m_nRealTimeTab != 20) {
                                            this.m_nRealTimeTab = 20;
                                            this.VoicePost([
                                                "前方",
                                                frontDis.toString(),
                                                "米",
                                                "向右行走"
                                            ]);
                                        }
                                        else {
                                            if (!this.m_bWaitVoice && !this.m_bWaitTime) {
                                                this.m_nStarTime =
                                                    new Date().getTime() + this.m_nVoiceSpeed * 8 + 4000;
                                                this.m_bWaitTime = true;
                                            }
                                            if (this.m_bWaitTime &&
                                                new Date().getTime() > this.m_nStarTime) {
                                                this.VoicePost([
                                                    "前方",
                                                    frontDis.toString(),
                                                    "米",
                                                    "向右行走"
                                                ]);
                                                this.m_bWaitTime = false;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    DisPathPassage(pPos, a) {
        return this.PointToSegDist(pPos.x, pPos.z, a.m_pStarPos.x, a.m_pStarPos.z, a.m_pEndPos.x, a.m_pEndPos.z);
    }
    NearPathPassage(pPos, a, b) {
        let aDis = this.PointToSegDist(pPos.x, pPos.z, a.m_pStarPos.x, a.m_pStarPos.z, a.m_pEndPos.x, a.m_pEndPos.z);
        let bDis = this.PointToSegDist(pPos.x, pPos.z, b.m_pStarPos.x, b.m_pStarPos.z, b.m_pEndPos.x, b.m_pEndPos.z);
        if (aDis < bDis) {
            return a;
        }
        else {
            return b;
        }
    }
    PointToSegDist(x, y, x1, y1, x2, y2) {
        let cross = (x2 - x1) * (x - x1) + (y2 - y1) * (y - y1);
        if (cross <= 0)
            return Math.sqrt((x - x1) * (x - x1) + (y - y1) * (y - y1));
        let d2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
        if (cross >= d2)
            return Math.sqrt((x - x2) * (x - x2) + (y - y2) * (y - y2));
        let r = cross / d2;
        let px = x1 + (x2 - x1) * r;
        let py = y1 + (y2 - y1) * r;
        return Math.sqrt((x - px) * (x - px) + (py - y1) * (py - y1));
    }
    VoicePost(Voice) {
        console.log("提交语音--", Voice);
        this.m_bWaitVoice = true;
        this.m_bWaitTime = false;
        this.m_pVoiceEnd = false;
        Engine.g_pInstance.m_pVoicePost(Voice);
    }
    VoicePuse() {
        console.log("终止当前语音播放");
        this.m_bWaitVoice = false;
        this.m_pVoiceEnd = false;
    }
    MoveClip(ClipType) {
        console.log("当前段动画播放:", ClipType);
        Engine.g_pInstance.m_pMoviePost(ClipType);
    }
    VoiceStart() {
        console.log("当前段语音开始播放");
        this.m_bWaitVoice = false;
    }
    VoiceEnd() {
        console.log("当前段语音播放完毕");
        this.m_pVoiceEnd = true;
    }
    StopAutoMotion() {
        this.m_bAutoMotion = false;
        this.m_nMotion = 10;
    }
}
class NavBackData {
    constructor(nHousId, pPId, nLayerId, nLayerName) {
        this.HousId = nHousId;
        this.LayerId = nLayerId;
        this.PId = pPId;
        this.LayerName = nLayerName;
    }
}
class EFurnitureModel {
    constructor(pDesc) {
        this.m_mAttachment = new Handle(Attachment, 0);
        this.m_pModel = null;
        this.m_pDesc = null;
        this.m_bUpdated = false;
        this.m_aInitData = null;
        this.m_pBindAtrri = null;
        this.desc = pDesc;
    }
    get version() {
        return 1000;
    }
    get type() {
        return EntityType.Collection;
    }
    get attachment() {
        return this.m_mAttachment.Object;
    }
    set attachment(pAttachment) {
        this.m_mAttachment.Number = pAttachment.handle.Number;
        this.m_bUpdated = true;
    }
    get displayType() {
        return DisplayType.Normal;
    }
    set displayType(eType) {
    }
    get resource() {
        return this.model;
    }
    Remap(mHeap) {
        this.m_mAttachment.Heap = mHeap;
    }
    Apply() {
        if (this.m_bUpdated) {
            let bActive = this.attachment == null ? false : this.attachment.active;
            if (this.model != null) {
                this.model.SetActive(bActive);
            }
            if (Engine.g_pInstance.m_pProjectIdent == "EAM") {
                if (this.attachment) {
                    this.attachment.hook.gameObject.SetActive(false);
                }
            }
            this.m_bUpdated = false;
        }
    }
    Destroy() {
        this.m_bUpdated = false;
        this.m_pDesc = null;
        this.m_pModel = null;
    }
    Clear() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_aInitData = [new Vector3(0.0, 0.0, 0.0), new Vector3(0.0, 0.0, 0.0), new Vector3(0.0, 0.0, 0.0)];
        this.m_mAttachment.Number = pReader.ReadUInt32();
        this.m_aInitData[0].x = pReader.ReadSingle();
        this.m_aInitData[0].y = pReader.ReadSingle();
        this.m_aInitData[0].z = pReader.ReadSingle();
        this.m_aInitData[1].x = pReader.ReadSingle();
        this.m_aInitData[1].y = pReader.ReadSingle();
        this.m_aInitData[1].z = pReader.ReadSingle();
        this.m_aInitData[2].x = pReader.ReadSingle();
        this.m_aInitData[2].y = pReader.ReadSingle();
        this.m_aInitData[2].z = pReader.ReadSingle();
        let nTargetPos = pReader.ReadInt64();
        let nBindType = pReader.ReadUInt32();
        if (nBindType == 8) {
            pReader.ReadUInt32();
            let pID1 = pReader.ReadString();
            let pID2 = pReader.ReadString();
            let pID3 = pReader.ReadString();
            this.m_pBindAtrri = new EBlueTooth(this.m_aInitData[0], pID1, pID2, pID3);
        }
        pReader.Position = nTargetPos;
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("EFurnitureModel.UnSerialize(): Bad end!");
        }
        this.m_bUpdated = true;
    }
    get collectionType() {
        return CollectionType.EFurnitureModel;
    }
    set desc(pDesc) {
        if (this.m_pDesc == null) {
            this.m_pDesc = pDesc;
            if (this.m_pDesc != null) {
                if (this.m_pDesc.m_pModelUrl != null && this.m_pDesc.m_pModelUrl != "") {
                    this.m_pModel = this.m_pDesc.m_pModel.CloneModel();
                }
                else {
                    console.log(this.m_pDesc.name + "URL为" + this.m_pDesc.m_pModelUrl);
                    alert(this.m_pDesc.name + "URL为" + this.m_pDesc.m_pModelUrl);
                }
                if (this.m_pModel != null && this.m_aInitData != null) {
                    this.position = this.m_aInitData[0];
                    this.eulerAngles = this.m_aInitData[1];
                    this.localScale = this.m_aInitData[2];
                    this.m_aInitData = null;
                }
            }
            this.m_bUpdated = true;
        }
    }
    Inherit(pSrc) {
        return true;
    }
    get position() {
        if (this.m_pModel != null) {
            return this.m_pModel.position;
        }
        else if (this.m_aInitData != null) {
            return Vector3.Clone(this.m_aInitData[0]);
        }
        return new Vector3(0.0, 0.0, 0.0);
    }
    set position(mPosition) {
        if (this.model != null) {
            this.model.position = mPosition;
        }
        this.m_bUpdated = true;
    }
    get eulerAngles() {
        if (this.m_pModel != null) {
            return this.m_pModel.eulerAngles;
        }
        else if (this.m_aInitData != null) {
            return Vector3.Clone(this.m_aInitData[1]);
        }
        return new Vector3(0.0, 0.0, 0.0);
    }
    set eulerAngles(mAngles) {
        if (this.model != null) {
            this.model.eulerAngles = mAngles;
        }
        this.m_bUpdated = true;
    }
    get localScale() {
        if (this.m_pModel != null) {
            return this.m_pModel.localScale;
        }
        else if (this.m_aInitData != null) {
            return Vector3.Clone(this.m_aInitData[2]);
        }
        return new Vector3(0.0, 0.0, 0.0);
    }
    set localScale(mScale) {
        if (this.model != null) {
            this.model.localScale = mScale;
        }
        this.m_bUpdated = true;
    }
    get model() {
        return this.m_pModel;
    }
}
class EFurnitureModelDesc {
    constructor() {
        this.m_nID = 0;
        this.m_nCategoryID = 0;
        this.m_pName = null;
        this.m_nDefaultHeight = 0.0;
        this.m_mSize = new Vector3(0.0, 0.0, 0.0);
        this.m_pDeviceType = null;
        this.m_pModelUrl = null;
        this.m_pModelUrlH5 = null;
        this.m_pIconUrl = null;
        this.m_pModel = null;
        this.m_pModelType = null;
        this.m_bEnableScale = false;
    }
    get version() {
        return 1001;
    }
    Init(jData) {
    }
    Destory() {
        this.m_pModel = null;
    }
    Load(pProgress, pCallback) {
        if (this.m_pModelUrl == null || this.m_pModelUrl.length < 1) {
            pCallback(null);
            return;
        }
        let pThis = this;
        MiaokitDC.DC.m_pAssetsLoader.LoadModel(this.m_pModelUrl, function (pObject) {
            if (pObject != null) {
                pThis.m_pModel = pObject;
                pThis.m_pModel.m_pName = pThis.m_pName;
            }
            else {
                console.log("模型加载失败", pThis.m_pModelUrl);
            }
            pCallback();
        });
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_nID = pReader.ReadInt32();
        this.m_nCategoryID = pReader.ReadInt32();
        this.m_pName = pReader.ReadString();
        this.m_nDefaultHeight = pReader.ReadSingle();
        this.m_mSize.x = pReader.ReadSingle();
        this.m_mSize.y = pReader.ReadSingle();
        this.m_mSize.z = pReader.ReadSingle();
        this.m_pModelUrl = pReader.ReadString();
        this.m_pIconUrl = pReader.ReadString();
        this.m_bEnableScale = pReader.ReadBoolean();
        this.m_pModelType = pReader.ReadString();
        this.m_pDeviceType = pReader.ReadString();
        if (nVersion > 1000) {
            this.m_pModelUrl = pReader.ReadString();
        }
        else {
        }
        if (nVersion > 1001) {
            let m_pModelUrlPC = pReader.ReadString();
        }
        else {
            let m_pModelUrlPC = "";
        }
        if (nVersion > 1002) {
            pReader.ReadString();
        }
        else {
        }
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("AHoleModel.Desc.UnSerialize(): Bad end!");
        }
    }
    get id() {
        return this.m_nID;
    }
    get typeId() {
        return this.m_nCategoryID;
    }
    get name() {
        return this.m_pName;
    }
    get desc() {
        return "";
    }
    get iconUrl() {
        return this.m_pIconUrl;
    }
    get resource() {
        return this.m_pModel;
    }
}
class EBuildingModel {
    constructor(pDesc) {
        this.m_mAttachment = new Handle(Attachment, 0);
        this.m_nWorkID = 0;
        this.m_pModel = null;
        this.m_pDesc = null;
        this.m_bUpdated = false;
        this.m_aInitData = null;
        this.desc = pDesc;
    }
    get version() {
        return 1000;
    }
    get type() {
        return EntityType.Collection;
    }
    get attachment() {
        return this.m_mAttachment.Object;
    }
    set attachment(pAttachment) {
        this.m_mAttachment.Number = pAttachment.handle.Number;
        this.m_bUpdated = true;
    }
    get displayType() {
        return DisplayType.Normal;
    }
    set displayType(eType) {
    }
    get resource() {
        return this.model;
    }
    Remap(mHeap) {
        this.m_mAttachment.Heap = mHeap;
    }
    Apply() {
        if (this.m_bUpdated) {
            let bActive = this.attachment == null ? false : this.attachment.active;
            if (this.model != null) {
                this.model.SetActive(bActive);
                this.model.m_pObject.parent.updateMatrixWorld(true);
            }
            this.m_bUpdated = false;
            let pOutModel = this.attachment;
            while (pOutModel) {
                if (pOutModel.builtin) {
                    pOutModel = this.attachment.parent.Object;
                }
                else {
                    break;
                }
            }
            if (!Engine.g_pInstance.m_pExtraConfig.HasOutModel) {
                pOutModel = null;
            }
            if (pOutModel) {
                console.log("隐藏外景简模。");
                pOutModel.hook.gameObject.SetActive(false);
            }
            let mPosition = this.model.m_pObject.getWorldPosition(this.model.m_pObject.position.clone());
            EyejiaDC.DC.m_pLayerMgr.m_pActiveLayer.m_aBuilding.push({
                Name: this.attachment.name,
                Position: new Vector3(mPosition.x, mPosition.y, -mPosition.z)
            });
        }
    }
    Destroy() {
        this.m_bUpdated = false;
        this.m_pDesc = null;
        this.m_pModel = null;
        this.m_nWorkID = 0;
    }
    Clear() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_aInitData = [new Vector3(0.0, 0.0, 0.0), new Vector3(0.0, 0.0, 0.0), new Vector3(0.0, 0.0, 0.0)];
        this.m_mAttachment.Number = pReader.ReadUInt32();
        this.m_nWorkID = pReader.ReadInt32();
        this.m_aInitData[0].x = pReader.ReadSingle();
        this.m_aInitData[0].y = pReader.ReadSingle();
        this.m_aInitData[0].z = pReader.ReadSingle();
        this.m_aInitData[1].x = pReader.ReadSingle();
        this.m_aInitData[1].y = pReader.ReadSingle();
        this.m_aInitData[1].z = pReader.ReadSingle();
        this.m_aInitData[2].x = pReader.ReadSingle();
        this.m_aInitData[2].y = pReader.ReadSingle();
        this.m_aInitData[2].z = pReader.ReadSingle();
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("EBuildingModel.UnSerialize(): Bad end!");
        }
        this.m_bUpdated = true;
    }
    get collectionType() {
        return CollectionType.EBuildingModel;
    }
    set desc(pDesc) {
        if (this.m_pDesc == null) {
            this.m_pDesc = pDesc;
            if (this.m_pDesc != null) {
                if (this.m_pDesc.m_pModelUrl != null) {
                    this.m_pModel = this.m_pDesc.m_pModel.CloneModel();
                }
                else {
                    this.m_pModel = this.m_pDesc.m_pModel;
                }
                if (this.m_pModel != null && this.m_aInitData != null) {
                    if (Engine.g_pInstance.m_pProjectIdent == "EAM") {
                        this.position = this.m_aInitData[0];
                        this.eulerAngles = this.m_aInitData[1];
                        this.localScale = this.m_aInitData[2];
                    }
                    this.m_aInitData = null;
                }
            }
            this.m_bUpdated = true;
        }
    }
    Inherit(pSrc) {
        return true;
    }
    get workID() {
        return this.m_nWorkID;
    }
    set workID(nWork) {
        this.m_nWorkID = nWork;
    }
    get position() {
        if (this.m_pModel != null) {
            return this.m_pModel.position;
        }
        else if (this.m_aInitData != null) {
            return Vector3.Clone(this.m_aInitData[0]);
        }
        return new Vector3(0.0, 0.0, 0.0);
    }
    set position(mPosition) {
        if (this.model != null) {
            this.model.position = mPosition;
        }
        this.m_bUpdated = true;
    }
    get eulerAngles() {
        if (this.m_pModel != null) {
            return this.m_pModel.eulerAngles;
        }
        else if (this.m_aInitData != null) {
            return Vector3.Clone(this.m_aInitData[1]);
        }
        return new Vector3(0.0, 0.0, 0.0);
    }
    set eulerAngles(mAngles) {
        if (this.model != null) {
            this.model.eulerAngles = mAngles;
        }
        this.m_bUpdated = true;
    }
    get localScale() {
        if (this.m_pModel != null) {
            return this.m_pModel.localScale;
        }
        else if (this.m_aInitData != null) {
            return Vector3.Clone(this.m_aInitData[2]);
        }
        return new Vector3(0.0, 0.0, 0.0);
    }
    set localScale(mScale) {
        if (this.model != null) {
            this.model.localScale = mScale;
        }
        this.m_bUpdated = true;
    }
    get model() {
        return this.m_pModel;
    }
}
class EBuildingModelDesc {
    constructor() {
        this.m_nID = 0;
        this.m_nCategoryID = 0;
        this.m_pName = null;
        this.m_nDefaultHeight = 0.0;
        this.m_mSize = new Vector3(0.0, 0.0, 0.0);
        this.m_pModelUrl = null;
        this.m_pModelUrlH5 = null;
        this.m_pIconUrl = null;
        this.m_pModel = null;
        this.m_pModelType = null;
    }
    get version() {
        return 1001;
    }
    Init(jData) {
    }
    InitByObject(pModel) {
        this.m_nID = -1;
        this.m_nCategoryID = -1;
        this.m_pName = pModel.name;
        this.m_nDefaultHeight = 0.0;
        this.m_mSize = new Vector3(1.0, 1.0, 1.0);
        this.m_pModelUrl = null;
        this.m_pModelUrlH5 = null;
        this.m_pIconUrl = null;
        this.m_pModel = pModel;
        this.m_pModelType = null;
    }
    Destory() {
        this.m_pModel = null;
    }
    Load(pProgress, pCallback) {
        if (this.m_pModelUrl == null || this.m_pModelUrl.length < 1) {
            pCallback(null);
            return;
        }
        let pThis = this;
        MiaokitDC.DC.m_pAssetsLoader.LoadModel(this.m_pModelUrl, function (pObject) {
            pThis.m_pModel = pObject;
            pThis.m_pModel.m_pName = pThis.m_pName;
            pCallback();
        });
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_nID = pReader.ReadInt32();
        this.m_nCategoryID = pReader.ReadInt32();
        this.m_pName = pReader.ReadString();
        this.m_nDefaultHeight = pReader.ReadSingle();
        this.m_mSize.x = pReader.ReadSingle();
        this.m_mSize.y = pReader.ReadSingle();
        this.m_mSize.z = pReader.ReadSingle();
        this.m_pModelUrl = pReader.ReadString();
        this.m_pIconUrl = pReader.ReadString();
        this.m_pModelType = pReader.ReadString();
        if (nVersion > 1000) {
            this.m_pModelUrl = pReader.ReadString();
        }
        else {
        }
        if (nVersion > 1001) {
            let m_pModelUrlPC = pReader.ReadString();
        }
        else {
            let m_pModelUrlPC = "";
        }
        if (nVersion > 1002) {
            pReader.ReadString();
        }
        else {
        }
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("EBuildingModel.Desc.UnSerialize(): Bad end!");
        }
    }
    get id() {
        return this.m_nID;
    }
    get typeId() {
        return this.m_nCategoryID;
    }
    get name() {
        return this.m_pName;
    }
    get desc() {
        return "";
    }
    get iconUrl() {
        return this.m_pIconUrl;
    }
    get resource() {
        return this.m_pModel;
    }
}
class ECollectionGroup {
    constructor(eType) {
        this.m_mAttachment = new Handle(Attachment, 0);
        this.m_pObject = null;
        this.m_mPosition = new Vector3(0.0, 0.0, 0.0);
        this.m_pName = null;
        this.m_eType = GroupType.Invalid;
        this.m_pName = "";
        this.m_eType = eType;
    }
    get version() {
        return 1000;
    }
    get type() {
        return EntityType.Group;
    }
    get attachment() {
        return this.m_mAttachment.Object;
    }
    set attachment(pAttachment) {
        this.m_mAttachment.Number = pAttachment.handle.Number;
    }
    get displayType() {
        return DisplayType.Normal;
    }
    set displayType(eType) {
    }
    get resource() {
        return null;
    }
    Remap(mHeap) {
        this.m_mAttachment.Heap = mHeap;
    }
    Apply() {
    }
    Destroy() {
        this.m_pObject.Destroy();
        this.m_pObject = null;
    }
    Clear() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mAttachment.Number = pReader.ReadUInt32();
        let mPosition = new Vector3(0.0, 0.0, 0.0);
        mPosition.x = pReader.ReadSingle();
        mPosition.y = pReader.ReadSingle();
        mPosition.z = pReader.ReadSingle();
        this.m_pName = pReader.ReadString();
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("ECollectionGroup.UnSerialize(): Bad end!");
        }
        this.position = mPosition;
    }
    get groupType() {
        return this.m_eType;
    }
    get gameObject() {
        if (this.m_pObject == null) {
            this.m_pObject = new GameObject("Group", GameObjectType.Empty);
            this.m_pObject.layer = Hook.LayerEnumToLayer(LayerType.EGroup);
            this.m_pObject.position = this.m_mPosition;
        }
        return this.m_pObject;
    }
    get position() {
        return this.m_pObject == null ? Vector3.Clone(this.m_mPosition) : this.m_pObject.position;
    }
    set position(mPosition) {
        this.m_mPosition.x = mPosition.x;
        this.m_mPosition.y = mPosition.y;
        this.m_mPosition.z = mPosition.z;
        if (this.m_pObject != null) {
            this.m_pObject.position = this.m_mPosition;
        }
    }
}
var BindAttriType;
(function (BindAttriType) {
    BindAttriType[BindAttriType["Normal"] = 0] = "Normal";
    BindAttriType[BindAttriType["EBlueTooth"] = 1] = "EBlueTooth";
})(BindAttriType || (BindAttriType = {}));
class EBlueTooth {
    constructor(pPosition, pUuid, pMajorid, pMinorid) {
        this.m_pPosition = null;
        this.m_pPosition = pPosition;
        this.bindType = BindAttriType.EBlueTooth;
        this.m_pUuid = pUuid;
        this.m_pMajorid = pMajorid;
        this.m_pMinorid = pMinorid;
    }
    SetPosition(pWorkID, pLayerID) {
        this.m_pWorkID = pWorkID;
        this.m_pLayerID = pLayerID;
    }
}
class EPictureModel {
    constructor(pDesc) {
        this.m_mAttachment = new Handle(Attachment, 0);
        this.m_pDesc = null;
        this.m_bUpdated = false;
        this.m_aInitData = null;
        this.m_pController = null;
        this.desc = pDesc;
    }
    get version() {
        return 1000;
    }
    get type() {
        return EntityType.Collection;
    }
    get attachment() {
        return this.m_mAttachment.Object;
    }
    set attachment(pAttachment) {
        this.m_mAttachment.Number = pAttachment.handle.Number;
        this.m_bUpdated = true;
    }
    get displayType() {
        return DisplayType.Normal;
    }
    set displayType(eType) {
    }
    get resource() {
        return this.model;
    }
    Remap(mHeap) {
        this.m_mAttachment.Heap = mHeap;
    }
    Apply() {
        if (this.m_bUpdated) {
            let bActive = this.attachment == null ? false : this.attachment.active;
            if (this.model != null) {
                this.model.SetActive(bActive);
            }
            this.m_bUpdated = false;
        }
    }
    Destroy() {
        this.m_bUpdated = false;
        this.m_pDesc = null;
        this.m_pController.Destroy();
        this.m_pController = null;
    }
    Clear() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_aInitData = [new Vector3(0.0, 0.0, 0.0), new Vector3(0.0, 0.0, 0.0), new Vector3(0.0, 0.0, 0.0)];
        this.m_mAttachment.Number = pReader.ReadUInt32();
        this.m_aInitData[0].x = pReader.ReadSingle();
        this.m_aInitData[0].y = pReader.ReadSingle();
        this.m_aInitData[0].z = pReader.ReadSingle();
        this.m_aInitData[1].x = pReader.ReadSingle();
        this.m_aInitData[1].y = pReader.ReadSingle();
        this.m_aInitData[1].z = pReader.ReadSingle();
        this.m_aInitData[2].x = pReader.ReadSingle();
        this.m_aInitData[2].y = pReader.ReadSingle();
        this.m_aInitData[2].z = pReader.ReadSingle();
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("EPictureModel.UnSerialize(): Bad end!");
        }
        this.m_bUpdated = true;
    }
    get collectionType() {
        return CollectionType.EPictureModel;
    }
    set desc(pDesc) {
        if (this.m_pDesc == null) {
            this.m_pDesc = pDesc;
            if (this.m_pDesc != null) {
                this.m_pController = new PictureModel(this.m_pDesc.m_pAssetsPath, this.m_pDesc.m_pAssetsName);
                if (this.model != null && this.m_aInitData != null) {
                    this.position = this.m_aInitData[0];
                    this.eulerAngles = this.m_aInitData[1];
                    this.localScale = this.m_aInitData[2];
                    this.m_aInitData = null;
                }
            }
            this.m_bUpdated = true;
        }
    }
    Inherit(pSrc) {
        return true;
    }
    get position() {
        if (this.model != null) {
            return this.model.position;
        }
        else if (this.m_aInitData != null) {
            return Vector3.Clone(this.m_aInitData[0]);
        }
        return new Vector3(0.0, 0.0, 0.0);
    }
    set position(mPosition) {
        if (this.model != null) {
            this.model.position = mPosition;
            this.m_bUpdated = true;
        }
    }
    get eulerAngles() {
        if (this.model != null) {
            return this.model.eulerAngles;
        }
        else if (this.m_aInitData != null) {
            return Vector3.Clone(this.m_aInitData[1]);
        }
        return new Vector3(0.0, 0.0, 0.0);
    }
    set eulerAngles(mAngles) {
        if (this.model != null) {
            this.model.eulerAngles = mAngles;
            console.error("mAngles", mAngles.x, mAngles.y, mAngles.z);
            this.m_bUpdated = true;
        }
    }
    get localScale() {
        if (this.model != null) {
            return this.model.localScale;
        }
        else if (this.m_aInitData != null) {
            return Vector3.Clone(this.m_aInitData[2]);
        }
        return new Vector3(0.0, 0.0, 0.0);
    }
    set localScale(mScale) {
        if (this.model != null) {
            this.model.localScale = mScale;
            this.m_bUpdated = true;
        }
    }
    get model() {
        return this.m_pController.m_pRoot;
    }
}
class EPictureModelDesc {
    constructor() {
        this.m_nID = 0;
        this.m_nCategoryID = 0;
        this.m_pName = null;
        this.m_nDefaultHeight = 0.0;
        this.m_mSize = new Vector3(0.0, 0.0, 0.0);
        this.m_pModelUrl = null;
        this.m_pModelUrlH5 = null;
        this.m_pModelUrlPC = null;
        this.m_pIconUrl = null;
        this.m_bIsUserModel = false;
        this.m_pModelNum = null;
        this.m_pAssetsPath = null;
        this.m_pAssetsName = null;
    }
    get version() {
        return 1000;
    }
    Init(jData) {
    }
    Destory() {
    }
    Load(pProgress, pCallback) {
        if (this.m_pModelUrl == null || this.m_pModelUrl.length < 1) {
            pCallback(null);
            return;
        }
        let pThis = this;
        MiaokitDC.DC.m_pAssetsLoader.LoadJson(this.m_pModelUrl, function (pObject) {
            pThis.m_pAssetsPath = pObject.Path;
            pThis.m_pAssetsName = pObject.Name;
            pCallback(null);
        });
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_nID = pReader.ReadInt32();
        this.m_nCategoryID = pReader.ReadInt32();
        this.m_pName = pReader.ReadString();
        this.m_nDefaultHeight = pReader.ReadSingle();
        this.m_mSize.x = pReader.ReadSingle();
        this.m_mSize.y = pReader.ReadSingle();
        this.m_mSize.z = pReader.ReadSingle();
        this.m_pModelUrl = pReader.ReadString();
        this.m_pModelUrlH5 = pReader.ReadString();
        this.m_pModelUrlPC = pReader.ReadString();
        this.m_pIconUrl = pReader.ReadString();
        this.m_bIsUserModel = pReader.ReadBoolean();
        this.m_pModelNum = pReader.ReadString();
        this.m_pAssetsPath = pReader.ReadString();
        this.m_pAssetsName = pReader.ReadString();
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("EPictureModelDesc.Desc.UnSerialize(): Bad end!");
        }
    }
    get id() {
        return this.m_nID;
    }
    get typeId() {
        return this.m_nCategoryID;
    }
    get name() {
        return this.m_pName;
    }
    get desc() {
        return "";
    }
    get iconUrl() {
        return this.m_pIconUrl;
    }
    get resource() {
        return this.m_pAssetsPath + this.m_pAssetsName;
    }
}
class EyejiaDC {
    constructor(nIndex, pReader) {
        this.m_pLayerMgr = null;
        this.m_pLayerMgr = new EyejiaMgr(nIndex);
        if (pReader != null) {
            let pOldDC = EyejiaDC.DC;
            EyejiaDC.DC = this;
            this.UnSerialize(pReader);
            EyejiaDC.DC = pOldDC;
        }
    }
    Update() {
        PictureModel.Update();
    }
    OnGUI() {
        NNavigation.CanvasDraw();
    }
    OnViewModeChange() {
    }
    ActiveLayer(nIndex) {
        this.m_pLayerMgr.ActiveLayer(nIndex);
        NNavigation.SceneLayerAction(this.m_pLayerMgr.m_nWork, nIndex);
    }
    version() {
        return 1000;
    }
    Active(bActive) {
        this.m_pLayerMgr.Active(bActive);
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_pLayerMgr.UnSerialize(pReader);
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("EyejiaDC.UnSerialize(): Bad end!");
        }
    }
}
EyejiaDC.DC = null;
class EyejiaMgr {
    constructor(nWork) {
        this.m_nWork = 0;
        this.m_pActiveLayer = null;
        this.m_pSceneRoot = null;
        this.m_pLayerList = null;
        this.m_nWork = nWork;
        this.m_pActiveLayer = null;
        this.m_pSceneRoot = null;
        this.m_pLayerList = new Array();
    }
    version() {
        return 1000;
    }
    Active(bActive) {
        if (this.m_pSceneRoot != null) {
            this.m_pSceneRoot.SetActive(bActive);
        }
    }
    ActiveLayer(nIndex) {
        let pLayer = this.m_pLayerList[nIndex];
        if (this.m_pActiveLayer != null) {
            this.m_pActiveLayer.root.SetActive(false);
        }
        this.m_pActiveLayer = pLayer;
        if (this.m_pSceneRoot != null) {
            this.m_pActiveLayer.root.SetActive(true);
        }
    }
    GetLayer(nIndex) {
        if (nIndex < this.m_pLayerList.length) {
            return this.m_pLayerList[nIndex];
        }
        return null;
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        this.m_pSceneRoot = new GameObject("-Eyejia Root", GameObjectType.Empty);
        this.m_pSceneRoot.parent = MiaokitDC.DC.GetWork(this.m_nWork).m_pWorkRoot;
        let nVersion = pReader.ReadUInt32();
        let nCount = pReader.ReadInt32();
        for (let i = 0; i < nCount; i++) {
            let pLayer = Eyejia.Create(pReader);
            pLayer.m_nWork = this.m_nWork;
            pLayer.m_nIndex = i;
            pLayer.Rebuild(this.m_pSceneRoot);
            this.m_pLayerList.push(pLayer);
        }
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("EyejiaMgr.UnSerialize(): Bad end!");
        }
    }
}
class Eyejia {
    constructor() {
        this.m_mMenuItemHeap = new HeapHandle(MenuItem, 0);
        this.m_mAttachmentHeap = new HeapHandle(Attachment, 0);
        this.m_mLayerRoot = new Handle(Attachment, 0);
        this.m_aBuilding = [];
        this.m_pViewState = new CameraState();
        this.m_nRefPicID = -1;
        this.m_mRefPicSize = new Vector2(0.0, 0.0);
        this.m_nDirectionHR = 0.0;
        this.m_nWork = 0;
        this.m_nIndex = 0;
    }
    version() {
        return 1000;
    }
    Rebuild(pSceneRoot) {
        let pThis = this;
        pThis.LoadGroup(pThis.m_mLayerRoot.Object);
        pThis.m_pName = pThis.m_mLayerRoot.Object.name;
        let pLayerRoot = pThis.root;
        pLayerRoot.parent = pSceneRoot;
        pLayerRoot.SetActive(false);
        pThis.Rebuild1();
    }
    Rebuild1() {
        let pThis = this;
        for (let pItem of pThis.m_mMenuItemHeap) {
            if (MiaokitDC.DC.BindMenuType(pItem)) {
                pItem.type.Add(pItem, pThis);
            }
            else {
                pItem.type = MiaokitDC.DC.m_pCategories;
                pItem.type.Add(pItem, this);
            }
            MiaokitDC.DC.m_pAssetsLoader.PushItem(pItem);
        }
        if (Engine.g_pInstance.m_pProjectIdent == "EAM") {
            MiaokitDC.DC.m_pAssetsLoader.PushDelegate(pThis.m_nWork, function () {
                let pLastLayer = EyejiaDC.DC.m_pLayerMgr.m_pActiveLayer;
                EyejiaDC.DC.m_pLayerMgr.m_pActiveLayer = pThis;
                pThis.Rebuild2();
                EyejiaDC.DC.m_pLayerMgr.m_pActiveLayer = pLastLayer;
            });
        }
        else {
            MiaokitDC.DC.m_pAssetsLoader.PushDelegate(pThis.m_nWork, function () {
                pThis.Rebuild2();
            });
        }
    }
    Rebuild2() {
        let pThis = this;
        let pAttachmentList = new Array();
        for (let pAttachment of pThis.m_mAttachmentHeap) {
            pAttachmentList.push(pAttachment);
            let pMenuItem = pAttachment.menuItem.Object;
            if (pMenuItem != null) {
                pMenuItem.refCount++;
            }
        }
        if (pAttachmentList.length > 0) {
            pThis.Rebuild3(pAttachmentList);
            pThis.Rebuild5(pAttachmentList);
        }
        else {
            console.info("Eyejia.Rebuild2(): pAttachmentList.Count == 0.");
        }
    }
    Rebuild3(pList) {
        let pThis = this;
        for (let pAttachment of pList) {
            if (pAttachment.hook == null) {
                pThis.Rebuild4(pAttachment);
            }
        }
    }
    Rebuild4(pAttachment) {
        let pThis = this;
        if (pAttachment.hook != null) {
            return true;
        }
        if (pAttachment.builtin) {
            let pParent = pAttachment.parent.Object;
            if (pParent != null) {
                if (pThis.Rebuild4(pParent)) {
                    let pEntity = pParent.hook.gameObject.FindChild(pAttachment.binding);
                    if (pAttachment.entityType == EntityType.Collection) {
                        let pCollection = pAttachment.entity;
                        pCollection.desc = Eyejia.GetDefaultDesc(pCollection.collectionType, pEntity);
                    }
                    let pHook = pEntity.AddHook();
                    pAttachment.hook = pHook;
                    pHook.attachment = pAttachment;
                    pHook.SetLayer();
                    return true;
                }
                else {
                    alert("Eyejia.Rebuild4(): Parent rebuild error: " + pParent.name);
                    return false;
                }
            }
            else {
                alert("Eyejia.Rebuild4(): pParent == null.");
                return false;
            }
        }
        else {
            switch (pAttachment.entityType) {
                case EntityType.Group:
                    pThis.LoadGroup(pAttachment);
                    return true;
                case EntityType.Collection:
                    pThis.LoadCollection(pAttachment);
                    return true;
                default:
                    pAttachment.valid = false;
                    alert("Eyejia.Rebuild4(): Entity type invalid. " + pAttachment.entityType);
                    break;
            }
        }
        return false;
    }
    Rebuild5(pList) {
        for (let pAttachment of pList) {
            if (pAttachment.entityType != EntityType.Component) {
                if (pAttachment.builtin == false) {
                    let pParent = pAttachment.parent.Object;
                    if (pParent != null) {
                        pAttachment.hook.gameObject.parent = pParent.hook.gameObject;
                    }
                }
            }
        }
        for (let pAttachment of pList) {
            if (pAttachment.entity != null) {
                pAttachment.entity.Apply();
            }
        }
    }
    LoadGroup(pAttachment) {
        let pGroup = pAttachment.entity;
        let pHook = pGroup.gameObject.AddHook();
        pAttachment.hook = pHook;
        pHook.attachment = pAttachment;
    }
    LoadCollection(pAttachment) {
        let pThis = this;
        pThis.Init(pAttachment.menuItem.Object, function (pItem) {
            if (pItem == null) {
                pAttachment.valid = false;
                return;
            }
            let pCollection = pAttachment.entity;
            let pHook = null;
            switch (pCollection.collectionType) {
                case CollectionType.ETexture:
                    pCollection.desc = pItem.collectionDesc;
                    break;
                case CollectionType.EFurnitureModel:
                    pCollection.desc = pItem.collectionDesc;
                    let pFurniture = pCollection;
                    let pFurnitureModel = pFurniture.model;
                    if (pFurnitureModel != null) {
                        pHook = pFurnitureModel.AddHook();
                        pFurnitureModel.SetActive(true);
                    }
                    pAttachment.hook = pHook;
                    pHook.attachment = pAttachment;
                    pHook.SetLayer();
                    break;
                case CollectionType.EBuildingModel:
                    pCollection.desc = pItem.collectionDesc;
                    let pBuilding = pCollection;
                    let pBuildingModel = pBuilding.model;
                    if (pBuildingModel != null) {
                        pHook = pBuildingModel.AddHook();
                        pBuildingModel.SetActive(true);
                    }
                    pAttachment.hook = pHook;
                    pHook.attachment = pAttachment;
                    pHook.SetLayer();
                    break;
                case CollectionType.EPictureModel:
                    pCollection.desc = pItem.collectionDesc;
                    let pPicture = pCollection;
                    let pPictureModel = pPicture.model;
                    if (pPictureModel != null) {
                        pHook = pPictureModel.AddHook();
                        pPictureModel.SetActive(true);
                    }
                    pAttachment.hook = pHook;
                    pHook.attachment = pAttachment;
                    pHook.SetLayer();
                    break;
                default:
                    alert("Eyejia.LoadCollection(): Invalid collection type.");
                    break;
            }
        });
    }
    Init(pItem, pCallback) {
        let pThis = this;
        let pType = pItem.type;
        if (pType != null) {
            let pItemValid = pType.Search(pItem, this);
            if (pItemValid == null) {
                pItemValid = pThis.m_mMenuItemHeap.CreateData(0, pItem).Object;
                pType.Add(pItemValid, this);
                pItemValid.LoadAndSet(null, pCallback);
            }
            else {
                pItemValid.LoadAndSet(null, pCallback);
            }
        }
        else {
            alert("Eyejia.Init(): pType == null.");
            pCallback(null);
        }
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mMenuItemHeap.Number = pReader.ReadUInt32();
        this.m_mAttachmentHeap.Number = pReader.ReadUInt32();
        this.m_mLayerRoot.Number = pReader.ReadUInt32();
        this.m_mMenuItemHeap.InitHeap(pReader);
        this.m_mAttachmentHeap.InitHeap(pReader);
        this.m_pViewState.UnSerialize(pReader);
        this.m_nRefPicID = pReader.ReadInt32();
        this.m_mRefPicSize.x = pReader.ReadSingle();
        this.m_mRefPicSize.y = pReader.ReadSingle();
        if (nVersion > 1000) {
            this.m_nDirectionHR = pReader.ReadSingle();
        }
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("Eyejia.UnSerialize(): Bad end!");
        }
    }
    GetBlueToothStation() {
        let pAttachmentList = new Array();
        for (let pAttachment of this.m_mAttachmentHeap) {
            if (pAttachment.entityType == EntityType.Collection) {
                let pCollection = pAttachment.entity;
                if (pCollection.collectionType == CollectionType.EFurnitureModel) {
                    let pEFurnitureModel = pCollection;
                    if (pEFurnitureModel.m_pBindAtrri == null)
                        continue;
                    if (pEFurnitureModel.m_pBindAtrri.bindType == BindAttriType.EBlueTooth) {
                        pEFurnitureModel.m_pBindAtrri.SetPosition(this.m_nWork, this.m_nIndex);
                        pAttachmentList.push(pEFurnitureModel.m_pBindAtrri);
                    }
                }
            }
        }
        return pAttachmentList;
    }
    static Create(pReader = null) {
        let pEyejia = new Eyejia();
        if (pReader != null) {
            pEyejia.UnSerialize(pReader);
        }
        else {
            pEyejia.m_mMenuItemHeap = new HeapHandle(MenuItem, 0);
            pEyejia.m_mAttachmentHeap = new HeapHandle(Attachment, 0);
            pEyejia.m_mMenuItemHeap.InitHeap();
            pEyejia.m_mAttachmentHeap.InitHeap();
        }
        return pEyejia;
    }
    static GetDefaultDesc(eType, pObject) {
        switch (eType) {
            case CollectionType.EBuildingModel:
                let pBuildingDesc = new EBuildingModelDesc();
                pBuildingDesc.InitByObject(pObject);
                return pBuildingDesc;
            default:
                alert("Eyejia.GetDefaultDesc(): Invalid type.");
                break;
        }
        return null;
    }
    get root() {
        return this.m_mLayerRoot.Object.hook.gameObject;
    }
    get name() {
        return this.m_pName;
    }
}
class MyModel {
    constructor(pParent) {
        this.m_pObject = null;
        this.m_nCount = 0;
        this.m_pQueue = null;
        this.m_bDoing = false;
        this.m_pCallback = null;
        this.m_aMaterial = null;
        if (Engine.g_pInstance.m_pProjectIdent == "EAM") {
        }
        else {
            console.error("导入路径：" + "./Model/");
        }
        this.m_pObject = new GameObject("OutModel", GameObjectType.Empty);
        this.m_pObject.parent = pParent;
        this.m_aMaterial = this.CreateMaterial();
        if (Engine.g_pInstance.m_pProjectIdent == "EAM") {
        }
        else {
            this.StartLoad(Engine.g_pInstance.m_pExtraConfig.OutModelPath, Engine.g_pInstance.m_pExtraConfig.OutModelCount, Engine.g_pInstance.m_pExtraConfig.OutModelStartJPG, Engine.g_pInstance.m_pExtraConfig.OutModelStartPNG, null);
        }
    }
    Update() {
        let pThis = this;
        if (0 < pThis.m_pQueue.length) {
            let pItem = pThis.m_pQueue.pop();
            pThis.Dispose2(pItem.m_nIndex, pItem.m_aData, pItem.m_pTexture);
            MiaokitDC.g_pScene.updateMatrixWorld(true);
            if (0 == --pThis.m_nCount) {
                if (null != pThis.m_pCallback) {
                    pThis.m_pCallback();
                }
                console.log("处理完成");
            }
        }
    }
    StartLoadData(nCount, pItemQueue, pCallback) {
        let pThis = this;
        pThis.m_nCount = nCount;
        pThis.m_pQueue = pItemQueue;
        pThis.m_pCallback = pCallback;
    }
    StartLoad(pPath, nCount, nStartJPG, nStartPNG, pCallback) {
        let pThis = this;
        pThis.m_pQueue = new Array();
        pThis.m_nCount = nCount;
        pThis.m_pCallback = pCallback;
        for (let i = 0; i < nCount; i++) {
            let pItem = new Item();
            pItem.m_nIndex = i;
            pThis.LoadAsyn(pPath + "Mesh" + pItem.m_nIndex + ".bin", function (aData) {
                pItem.m_aData = aData;
                if (pItem.m_nIndex < nStartJPG) {
                    pItem.m_pTexture = null;
                }
                else if (pItem.m_nIndex < nStartPNG) {
                    pItem.m_pTexture = new THREE.TextureLoader().load(pPath + "Image" + pItem.m_nIndex + ".jpg", function (texture) {
                        texture.format = THREE.RGBFormat;
                        texture.wrapS = THREE.RepeatWrapping;
                        texture.wrapT = THREE.RepeatWrapping;
                        texture.magFilter = THREE.NearestFilter;
                        texture.minFilter = THREE.NearestFilter;
                        texture.needsUpdate = true;
                    });
                }
                else {
                    pItem.m_pTexture = new THREE.TextureLoader().load(pPath + "Image" + pItem.m_nIndex + ".png", function (texture) {
                        texture.format = THREE.RGBAFormat;
                        texture.wrapS = THREE.RepeatWrapping;
                        texture.wrapT = THREE.RepeatWrapping;
                        texture.magFilter = THREE.NearestFilter;
                        texture.minFilter = THREE.NearestFilter;
                        texture.needsUpdate = true;
                    });
                }
                pThis.m_pQueue.push(pItem);
            });
        }
    }
    Dispose2(nGroup, aData, pTexture) {
        let pReader = new BinaryReader(aData);
        let nVertexCount = pReader.ReadInt32();
        let pVertexData = pReader.ReadBytes(6 * nVertexCount);
        let aVertex = new Int16Array(pVertexData);
        let nNormalCount = pReader.ReadInt32();
        let pNormalData = null;
        let aNormal = null;
        if (0 < nNormalCount) {
            pNormalData = pReader.ReadBytes(6 * nNormalCount);
            aNormal = new Int16Array(pNormalData);
        }
        let nUVCount = pReader.ReadInt32();
        let pUVData = null;
        let aUV = null;
        if (0 < nUVCount) {
            pUVData = pReader.ReadBytes(8 * nUVCount);
            aUV = new Float32Array(pUVData);
        }
        let nMaterialCount = pReader.ReadInt32();
        let aMaterial = [];
        for (let i = 0; i < nMaterialCount; i++) {
            let pMaterial = aMaterial[i] = new CMaterial();
            pMaterial.m_nVertexOffset = pReader.ReadInt32();
            pMaterial.m_nVertexCount = pReader.ReadInt32();
            pMaterial.m_nTexture = pReader.ReadInt32();
            pMaterial.m_nOpacity = pReader.ReadSingle();
            pMaterial.m_mColor.r = pReader.ReadSingle();
            pMaterial.m_mColor.g = pReader.ReadSingle();
            pMaterial.m_mColor.b = pReader.ReadSingle();
            pMaterial.m_mColor.a = pReader.ReadSingle();
            pMaterial.m_mTexTrans.x = pReader.ReadSingle();
            pMaterial.m_mTexTrans.y = pReader.ReadSingle();
            pMaterial.m_mTexTrans.z = pReader.ReadSingle();
            pMaterial.m_mTexTrans.w = pReader.ReadSingle();
        }
        let aColor = [];
        let aTexTrans = [];
        for (let pMaterial of aMaterial) {
            let nOffset = pMaterial.m_nVertexOffset;
            let nCount = pMaterial.m_nVertexCount;
            let mColor = pMaterial.m_mColor;
            let mTexTrans = pMaterial.m_mTexTrans;
            for (let j = 0; j < nCount; j++) {
                let index = 4 * (nOffset + j);
                aColor[index] = mColor.r;
                aColor[index + 1] = mColor.g;
                aColor[index + 2] = mColor.b;
                aColor[index + 3] = mColor.a;
                aTexTrans[index] = mTexTrans.x;
                aTexTrans[index + 1] = mTexTrans.y;
                aTexTrans[index + 2] = mTexTrans.z;
                aTexTrans[index + 3] = mTexTrans.w;
            }
        }
        let nSubCount = pReader.ReadInt32();
        let nSubIndex = 0;
        for (let i = 0; i < 4; i++) {
            let nIndexCount = pReader.ReadInt32();
            if (0 < nIndexCount) {
                let pIndexData = pReader.ReadBytes(2 * nIndexCount);
                let aIndex = new Uint16Array(pIndexData);
                let pMaterial = this.m_aMaterial[i].clone();
                if (0 == i || 1 == i) {
                    pMaterial.uniforms.texture1.value = pTexture;
                }
                let pMesh = this.CreateMesh({
                    aVertex: aVertex,
                    aNormal: aNormal,
                    aUV0: aUV,
                    aColor: aColor,
                    aTexTrans: aTexTrans,
                    aIndex: aIndex,
                });
                let pObject = new GameObject("", GameObjectType.Model);
                pObject.SetGeometry3(pMesh, pMaterial);
                pObject.SetActive(true);
                pObject.parent = this.m_pObject;
                pObject.m_pObject.position.set(0.0, 0.0, 0.0);
                pObject.m_pObject.frustumCulled = false;
            }
        }
    }
    CreateMesh(pData) {
        let Model = function () {
            THREE.BufferGeometry.call(this);
            function disposeArray() { this.array = null; }
            this.addAttribute('position', new THREE.BufferAttribute(pData.aVertex, 3, true).onUpload(disposeArray));
            if (null != pData.aNormal) {
                this.addAttribute('normal', new THREE.BufferAttribute(pData.aNormal, 3, true).onUpload(disposeArray));
            }
            if (null != pData.aUV0) {
                this.addAttribute('uv', new THREE.BufferAttribute(pData.aUV0, 2, false).onUpload(disposeArray));
            }
            if (null != pData.aTexTrans) {
                this.addAttribute('tangent', new THREE.Float32BufferAttribute(pData.aTexTrans, 4, false).onUpload(disposeArray));
            }
            this.addAttribute('color', new THREE.Float32BufferAttribute(pData.aColor, 4, false).onUpload(disposeArray));
            this.setIndex(new THREE.BufferAttribute(pData.aIndex, 1));
        };
        Model.prototype = Object.create(THREE.BufferGeometry.prototype);
        Model.prototype.constructor = Model;
        return new Model();
    }
    CreateMaterial() {
        let vShader = " \
            attribute vec4 color; \
            attribute vec4 tangent; \
            varying vec2 _uv; \
            varying vec4 _color; \
            varying vec4 _tangent; \
            void main()	{ \
                _uv = uv; \
                _color = color; \
                _tangent = tangent; \
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position * 1024.0, 1.0); \
            }";
        let vShader2 = " \
            attribute vec4 color; \
            attribute vec4 tangent; \
            varying vec4 _color; \
            varying vec4 _tangent; \
            void main()	{ \
                _color = color; \
                _tangent = tangent; \
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position * 1024.0, 1.0); \
            }";
        let pShader = " \
            uniform sampler2D texture1; \
            varying vec2 _uv; \
            varying vec4 _color; \
            varying vec4 _tangent; \
            void main()	{ \
                vec2 uv = _uv; \
                uv.x = fract(uv.x) * _tangent.z + _tangent.x; \
                uv.y = fract(uv.y) * _tangent.w + _tangent.y; \
                vec4 color = texture2D( texture1, uv ); \
                color.rgb = color.rgb * _color.rgb * 1.0; \
                gl_FragColor = color; \
            }";
        let pShader2 = " \
            varying vec4 _color; \
            varying vec4 _tangent; \
            void main()	{ \
                vec4 color = _color; \
                gl_FragColor = color; \
            }";
        let pUniforms = {
            texture1: { type: 't', value: null }
        };
        let pMaterial = new THREE.ShaderMaterial({
            uniforms: pUniforms,
            vertexShader: vShader,
            fragmentShader: pShader,
        });
        let pMaterial1 = new THREE.ShaderMaterial({
            uniforms: pUniforms,
            vertexShader: vShader,
            fragmentShader: pShader,
        });
        let pMaterial2 = new THREE.ShaderMaterial({
            vertexShader: vShader2,
            fragmentShader: pShader2,
        });
        let pMaterial3 = new THREE.ShaderMaterial({
            vertexShader: vShader2,
            fragmentShader: pShader2,
        });
        pMaterial.transparent = true;
        let aMaterial = [];
        aMaterial[0] = pMaterial;
        aMaterial[1] = pMaterial1;
        aMaterial[2] = pMaterial2;
        aMaterial[3] = pMaterial3;
        return aMaterial;
    }
    LoadAsyn(pUrl, pCallback) {
        var pRequest = new XMLHttpRequest();
        pRequest.open("GET", pUrl, true);
        pRequest.responseType = "arraybuffer";
        pRequest.onload = function (e) {
            if (pRequest.status == 200) {
                pCallback(pRequest.response);
            }
            else {
                pCallback(null);
            }
        };
        pRequest.send(null);
    }
}
class Item {
    constructor() {
        this.m_nIndex = 0;
        this.m_aData = null;
        this.m_pTexture = null;
    }
}
class CMaterial {
    constructor() {
        this.m_nVertexOffset = 0;
        this.m_nVertexCount = 0;
        this.m_nTexture = 0;
        this.m_nOpacity = 0;
        this.m_mColor = new THREE.Color();
        this.m_mTexTrans = new THREE.Vector4();
    }
}
class PictureModel {
    constructor(pPath, pName) {
        this.m_pRoot = null;
        this.m_pCollider = null;
        this.m_pFilePath = null;
        this.m_pFileName = null;
        this.m_pSceneRoot = null;
        this.m_aFrustum = null;
        this.m_pFlushList = null;
        this.m_pUnfoldQueue = null;
        this.m_bFlush = true;
        this.m_bFlushing = false;
        this.m_nLoading = 0;
        this.m_nTick = 0;
        this.m_bLived = false;
        console.log("PictureModel: " + pPath + pName);
        let pThis = this;
        pThis.m_pFilePath = pPath;
        pThis.m_pFileName = pName;
        pThis.m_pRoot = new GameObject("PictureModel: " + pName, GameObjectType.Empty);
        pThis.LoadScene(function (pScene) {
            if (null !== pScene) {
                pThis.m_pSceneRoot = pThis.LoadMeshPyramid(pScene.m_aLayer);
                pThis.m_pFlushList = new Array();
                pThis.m_pUnfoldQueue = new Array();
                pThis.m_nLoading = 0;
                pThis.m_nTick = 0;
            }
        });
        PictureModel.g_pList.push(this);
        pThis.m_bLived = true;
    }
    Destroy() {
        let pThis = this;
        PictureModel.g_pList.splice(PictureModel.g_pList.indexOf(pThis), 1);
        pThis.m_bLived = false;
        if (0 == pThis.m_nLoading && !pThis.m_bFlushing) {
            pThis.m_pRoot.Destroy();
            pThis.m_pRoot = null;
        }
    }
    Flush() {
        let pThis = this;
        if (null !== pThis.m_pSceneRoot) {
            if (0 == pThis.m_nLoading && 0 < pThis.m_pUnfoldQueue.length) {
                let nCount = Mathf.Clamp(pThis.m_pUnfoldQueue.length, 1, 8);
                pThis.m_nLoading = nCount;
                for (let i = 0; i < nCount; i++) {
                    let pItem = pThis.m_pUnfoldQueue.shift();
                    pThis.Unfold(pItem, function () {
                        pItem.m_bUnfolding = false;
                        if (0 == --pThis.m_nLoading) {
                            pThis.m_bFlush = true;
                            if (!pThis.m_bLived && !pThis.m_bFlushing) {
                                pThis.m_pRoot.Destroy();
                                pThis.m_pRoot = null;
                            }
                        }
                    });
                }
            }
            if (0 == pThis.m_nTick++ % 10) {
                pThis.m_bFlush = true;
            }
            if (!pThis.m_bFlushing && pThis.m_bFlush) {
                pThis.m_bFlushing = true;
                pThis.Flush2(pThis.m_pSceneRoot, function () {
                    pThis.m_bFlush = false;
                    pThis.m_bFlushing = false;
                    pThis.m_pRoot.m_pObject.updateMatrixWorld();
                    if (!pThis.m_bLived && !pThis.m_bFlushing) {
                        pThis.m_pRoot.Destroy();
                        pThis.m_pRoot = null;
                    }
                });
            }
        }
    }
    Flush2(pRoot, pCallback) {
        let pThis = this;
        pThis.m_pFlushList = new Array();
        pThis.m_pFlushList.push(pRoot);
        let nIndex = 0;
        while (nIndex < pThis.m_pFlushList.length) {
            let pNode = pThis.m_pFlushList[nIndex];
            let nOrder = pThis.Check(pNode);
            if (2 == nOrder) {
                if (!pNode.m_bChildValid) {
                    if (!pNode.m_bUnfolding) {
                        pThis.m_pUnfoldQueue.push(pNode);
                        pNode.m_bUnfolding = true;
                    }
                    nOrder = 1;
                }
                else {
                    for (let pChild of pNode.m_pChildren) {
                        pThis.m_pFlushList.push(pChild);
                    }
                }
            }
            pNode.m_nOrder = nOrder;
            nIndex++;
        }
        while (-1 < --nIndex) {
            let pNode = pThis.m_pFlushList[nIndex];
            if (pNode.m_nShowType != pNode.m_nOrder) {
                if (0 == pNode.m_nOrder) {
                    pNode.m_pObject.SetActive(false);
                    pNode.m_nShowType = pNode.m_nOrder;
                }
                else if (1 == pNode.m_nOrder) {
                    pNode.m_pObject.SetActive(true);
                    pNode.m_pMesh.SetActive(true);
                    pNode.m_nShowType = pNode.m_nOrder;
                    for (let pChild of pNode.m_pChildren) {
                        pChild.m_pObject.SetActive(false);
                        pChild.m_nShowType = 0;
                    }
                }
                else {
                    pNode.m_pObject.SetActive(true);
                    pNode.m_pMesh.SetActive(false);
                    pNode.m_nShowType = pNode.m_nOrder;
                }
            }
            if (0 < pNode.m_nOrder) {
                pNode.m_nTimestamp = pThis.m_nTick;
            }
        }
        pCallback();
    }
    Check(pNode) {
        let nShowType = pNode.m_nLevel < 5 ? 2 : 1;
        if (1 == nShowType) {
            if (pNode.m_aResId == null || pNode.m_aResId.length < 1) {
                if (pNode.m_aChildGroup.length > 0) {
                    nShowType = 2;
                }
            }
        }
        else {
            if (pNode.m_aChildGroup.length == 0) {
                nShowType = 1;
            }
        }
        return nShowType;
    }
    LoadScene(pCallback) {
        this.LoadTextAsyn(this.m_pFilePath + this.m_pFileName, function (pData) {
            let jLayers = pData.layers;
            let pScene = new Scene();
            pScene.m_nVersion = pData["3mxVersion"];
            pScene.m_pName = pData.name;
            pScene.m_pDesc = pData.description;
            pScene.m_pLogo = pData.logo;
            pScene.m_pOptions = pData.sceneOptions;
            pScene.m_aLayer = new Array(jLayers.length);
            for (let i = 0; i < jLayers.length; i++) {
                let jLayer = jLayers[i];
                let pLayer = pScene.m_aLayer[i] = new Layer();
                pLayer.m_pType = jLayer.type;
                pLayer.m_pID = jLayer.id;
                pLayer.m_pName = jLayer.name;
                pLayer.m_pDesc = jLayer.description;
                pLayer.m_pSRS = jLayer.SRS;
                pLayer.m_pSRSOrigin = jLayer.SRSOrigin;
                pLayer.m_pRoot = jLayer.root;
            }
            pCallback(pScene);
        });
    }
    LoadMeshPyramid(aLayer) {
        let pNode = new SNode(0, null, null);
        pNode.m_pPath = this.m_pFilePath;
        pNode.m_pID = "Root";
        pNode.m_aChildGroup = new Array(aLayer.length);
        for (let i = 0; i < aLayer.length; i++) {
            pNode.m_aChildGroup[i] = new Group(pNode, aLayer[i].m_pRoot, i);
        }
        return pNode;
    }
    Unfold(pNode, pCallback) {
        let pThis = this;
        let nCount = pNode.m_aChildGroup.length;
        let nIndex = nCount;
        for (let i = 0; i < nCount; i++) {
            pThis.Construct(pNode.m_aChildGroup[i], function (nType) {
                if (--nIndex == 0) {
                    if (0 == nType) {
                        if (pNode.m_pParent == null) {
                            let mPosition = pThis.m_pRoot.position;
                            let mEulerAngles = pThis.m_pRoot.eulerAngles;
                            pThis.m_pRoot.position = new Vector3(0.0, 0.0, 0.0);
                            pThis.m_pRoot.eulerAngles = new Vector3(0.0, 0.0, 0.0);
                            pThis.EncapsBounds(pNode);
                            let mCenter = Vector3.Scale(0.5, Vector3.Add(pNode.m_mBBMin, pNode.m_mBBMax));
                            let mSize = Vector3.Sub(pNode.m_mBBMax, pNode.m_mBBMin);
                            let pTrans = pNode.m_pMesh;
                            pTrans.parent = null;
                            pTrans.position = mCenter;
                            pTrans.SetParent(pNode.m_pObject, false);
                            pNode.m_pObject.SetParent(pThis.m_pRoot, false);
                            pNode.m_pObject.position = Vector3.Sub(new Vector3(0.0, mSize.y * 0.5, 0.0), mCenter);
                            pThis.m_pRoot.position = mPosition;
                            pThis.m_pRoot.eulerAngles = mEulerAngles;
                            pThis.m_pRoot.m_pObject.updateMatrixWorld();
                            let mPosition3 = pTrans.m_pObject.getWorldPosition();
                            let mEulerAngles3 = pTrans.m_pObject.getWorldRotation();
                            console.error("mPosition3: ", mPosition3);
                            console.error("mEulerAngles3: ", mEulerAngles3.y * 57.29578);
                        }
                    }
                    pNode.m_bChildValid = true;
                    pCallback();
                }
            });
        }
    }
    Construct(pGroup, pCallback) {
        if (pGroup.m_nBufferAddr > 0) {
            if (!pGroup.m_bCreated) {
                this.LoadAsyn(pGroup.m_pPath + pGroup.m_pFile, function (aData) {
                    if (aData) {
                        pGroup.Create(aData, function () {
                            pCallback(1);
                        });
                    }
                    else {
                        pCallback(1);
                    }
                });
            }
            else {
                pCallback(2);
            }
        }
        else {
            this.LoadAsyn(pGroup.m_pPath + pGroup.m_pFile, function (aData) {
                if (aData) {
                    pGroup.Init(aData, function () {
                        pCallback(0);
                    });
                }
                else {
                    pCallback(0);
                }
            });
        }
    }
    EncapsBounds(pNode) {
        let mBBMin = new Vector3(0.0, 0.0, 0.0);
        let mBBMax = new Vector3(0.0, 0.0, 0.0);
        for (let i = 0; i < pNode.m_pChildren.length; i++) {
            let pChild = pNode.m_pChildren[i];
            if (i == 0) {
                mBBMin = pChild.m_mBBMin;
                mBBMax = pChild.m_mBBMax;
            }
            else {
                mBBMin.x = Math.min(mBBMin.x, pChild.m_mBBMin.x);
                mBBMin.y = Math.min(mBBMin.y, pChild.m_mBBMin.y);
                mBBMin.z = Math.min(mBBMin.z, pChild.m_mBBMin.z);
                mBBMax.x = Math.max(mBBMax.x, pChild.m_mBBMax.x);
                mBBMax.y = Math.max(mBBMax.y, pChild.m_mBBMax.y);
                mBBMax.z = Math.max(mBBMax.z, pChild.m_mBBMax.z);
            }
        }
        pNode.m_mBBMin = mBBMin;
        pNode.m_mBBMax = mBBMax;
        let mSize = Vector3.Sub(mBBMax, mBBMin);
        pNode.m_nMaxDiameter = Math.max(mSize.x, Math.max(mSize.y, mSize.z));
    }
    LoadTextAsyn(pUrl, pCallback) {
        var pRequest = new XMLHttpRequest();
        pRequest.open("GET", pUrl, true);
        pRequest.responseType = "json";
        pRequest.onload = function (e) {
            if (pRequest.status == 200) {
                pCallback(pRequest.response);
            }
            else {
                pCallback(null);
            }
        };
        pRequest.send(null);
    }
    LoadAsyn(pUrl, pCallback) {
        var pRequest = new XMLHttpRequest();
        pRequest.open("GET", pUrl, true);
        pRequest.responseType = "arraybuffer";
        pRequest.onload = function (e) {
            if (pRequest.status == 200) {
                pCallback(pRequest.response);
            }
            else {
                pCallback(null);
            }
        };
        pRequest.send(null);
    }
    static Update() {
        for (let pModel of PictureModel.g_pList) {
            pModel.Flush();
        }
    }
}
PictureModel.g_pList = new Array();
class Scene {
    constructor() {
        this.m_nVersion = 0;
        this.m_pName = null;
        this.m_pDesc = null;
        this.m_pLogo = null;
        this.m_pOptions = null;
        this.m_aLayer = null;
    }
}
class Layer {
    constructor() {
        this.m_pType = null;
        this.m_pID = null;
        this.m_pName = null;
        this.m_pDesc = null;
        this.m_pSRS = null;
        this.m_pSRSOrigin = null;
        this.m_pRoot = null;
    }
}
class SNode {
    constructor(nIndex, pParent, pGroup) {
        this.m_nLevel = 0;
        this.m_nIndex = 0;
        this.m_pPath = "";
        this.m_pID = "";
        this.m_mBBMin = new Vector3(0.0, 0.0, 0.0);
        this.m_mBBMax = new Vector3(0.0, 0.0, 0.0);
        this.m_nMaxDiameter = 0.0;
        this.m_pParent = null;
        this.m_pGroup = null;
        this.m_aResId = null;
        this.m_aResource = null;
        this.m_aChildGroup = null;
        this.m_pChildren = new Array();
        this.m_bChildValid = false;
        this.m_nOrder = 0;
        this.m_nShowType = 0;
        this.m_nTimestamp = 0;
        this.m_bUnfolding = false;
        this.m_pObject = null;
        this.m_pMesh = null;
        this.m_pLast = null;
        this.m_pNext = null;
        this.m_nLevel = pParent != null ? pParent.m_nLevel + 1 : 0;
        this.m_nIndex = nIndex;
        this.m_pParent = pParent;
        this.m_pGroup = pGroup;
        let pName = "Level: " + this.m_nLevel + "-" + (this.m_pGroup ? this.m_pGroup.m_nIndex : "0") + "-" + this.m_nIndex;
        this.m_pObject = new GameObject(pName, GameObjectType.Empty);
        if (this.m_pParent != null) {
            this.m_pObject.SetParent(this.m_pParent.m_pObject, false);
        }
        this.m_pMesh = new GameObject("Mesh", GameObjectType.Mesh);
        this.m_pMesh.SetParent(this.m_pObject, false);
    }
    Free() {
        for (let pGroup of this.m_aChildGroup) {
            pGroup.Free();
        }
        this.m_bChildValid = false;
    }
}
class Group {
    constructor(pNode, pFile, nIndex) {
        this.m_pNode = null;
        this.m_pPath = null;
        this.m_pFile = null;
        this.m_nIndex = 0;
        this.m_nVersion = 0;
        this.m_aNode = null;
        this.m_aResource = null;
        this.m_nBufferAddr = 0;
        this.m_bCreated = false;
        this.m_pNode = pNode;
        this.m_pPath = pNode.m_pPath + pFile.substr(0, pFile.lastIndexOf("/") + 1);
        this.m_pFile = pFile.substr(pFile.lastIndexOf("/") + 1);
        this.m_nIndex = nIndex;
    }
    Init(aData, pCallback) {
        let pReader = new BinaryReader(aData);
        let pMagicNum = pReader.ReadString2(5);
        if ("3MXBO" == pMagicNum) {
            let nHeaderSize = pReader.ReadUInt32();
            let pHeader = pReader.ReadString2(nHeaderSize);
            let jHeader = JSON.parse(pHeader);
            let jNodes = jHeader.nodes;
            let jResources = jHeader.resources;
            this.m_nVersion = jHeader.version;
            this.m_aNode = new Array(jNodes.length);
            this.m_aResource = new Array(jResources.length);
            this.m_nBufferAddr = pReader.Position;
            for (let i = 0; i < this.m_aResource.length; i++) {
                let jResource = jResources[i];
                let pType = jResource.type;
                if (pType == "textureBuffer") {
                    let pResource = new TextureBuffer();
                    pResource.m_pType = pType;
                    pResource.m_pID = jResource.id;
                    pResource.m_pFormat = jResource.format;
                    pResource.m_nSize = jResource.size;
                    this.m_aResource[i] = pResource;
                }
                else if (pType == "geometryBuffer") {
                    let pResource = new GeometryBuffer();
                    pResource.m_pType = pType;
                    pResource.m_pID = jResource.id;
                    pResource.m_pFormat = jResource.format;
                    pResource.m_nSize = jResource.size;
                    pResource.m_mBBMin.x = jResource.bbMin[0];
                    pResource.m_mBBMin.y = jResource.bbMin[1];
                    pResource.m_mBBMin.z = jResource.bbMin[2];
                    pResource.m_mBBMax.x = jResource.bbMax[0];
                    pResource.m_mBBMax.y = jResource.bbMax[1];
                    pResource.m_mBBMax.z = jResource.bbMax[2];
                    pResource.m_pTextureID = jResource["texture"] != null ? jResource.texture : null;
                    let mBBmax = new Vector3(-pResource.m_mBBMin.x, pResource.m_mBBMax.z, -pResource.m_mBBMin.y);
                    let mBBMin = new Vector3(-pResource.m_mBBMax.x, pResource.m_mBBMin.z, -pResource.m_mBBMax.y);
                    pResource.m_mBBMin = mBBMin;
                    pResource.m_mBBMax = mBBmax;
                    this.m_aResource[i] = pResource;
                    if (pResource.m_pTextureID != null) {
                        for (let j = 0; j < i; j++) {
                            if (this.m_aResource[j].m_pID == pResource.m_pTextureID) {
                                pResource.m_pTexture = this.m_aResource[j];
                                break;
                            }
                        }
                    }
                }
                else if (pType == "textureFile") {
                    let pResource = new TextureFile();
                    pResource.m_pType = pType;
                    pResource.m_pID = jResource.id;
                    pResource.m_pFormat = jResource.format;
                    pResource.m_pFileName = jResource.file;
                    this.m_aResource[i] = pResource;
                }
                else if (pType == "geometryFile") {
                    let pResource = new GeometryFile();
                    pResource.m_pType = pType;
                    pResource.m_pID = jResource.id;
                    pResource.m_pFormat = jResource.format;
                    pResource.m_pFileName = jResource.file;
                    pResource.m_pTextureID = jResource.texture != null ? jResource.texture : null;
                    this.m_aResource[i] = pResource;
                    if (pResource.m_pTextureID != null) {
                        for (let j = 0; j < i; j++) {
                            if (this.m_aResource[j].m_pID == pResource.m_pTextureID) {
                                pResource.m_pTexture = this.m_aResource[j];
                                break;
                            }
                        }
                    }
                }
            }
            for (let i = 0; i < this.m_aNode.length; i++) {
                let jNode = jNodes[i];
                let pNode = this.m_aNode[i] = new SNode(i, this.m_pNode, this);
                pNode.m_pPath = this.m_pPath;
                pNode.m_pID = jNode.id;
                pNode.m_mBBMin.x = jNode.bbMin[0];
                pNode.m_mBBMin.y = jNode.bbMin[1];
                pNode.m_mBBMin.z = jNode.bbMin[2];
                pNode.m_mBBMax.x = jNode.bbMax[0];
                pNode.m_mBBMax.y = jNode.bbMax[1];
                pNode.m_mBBMax.z = jNode.bbMax[2];
                pNode.m_nMaxDiameter = jNode.maxScreenDiameter;
                let mBBMax = new Vector3(-pNode.m_mBBMin.x, pNode.m_mBBMax.z, -pNode.m_mBBMin.y);
                let mBBMin = new Vector3(-pNode.m_mBBMax.x, pNode.m_mBBMin.z, -pNode.m_mBBMax.y);
                pNode.m_mBBMin = mBBMin;
                pNode.m_mBBMax = mBBMax;
                let mSize = Vector3.Sub(mBBMax, mBBMin);
                pNode.m_nMaxDiameter = Math.max(mSize.x, Math.max(mSize.y, mSize.z));
                let jChildren = jNode.children;
                let jResIds = jNode.resources;
                pNode.m_aChildGroup = new Array(jChildren.length);
                pNode.m_aResId = new Array(jResIds.length);
                pNode.m_aResource = new Array(jResIds.length);
                for (let j = 0; j < pNode.m_aChildGroup.length; j++) {
                    pNode.m_aChildGroup[j] = new Group(pNode, jChildren[j], j);
                }
                for (let j = 0; j < pNode.m_aResId.length; j++) {
                    pNode.m_aResId[j] = jResIds[j];
                    for (let pRes of this.m_aResource) {
                        if (pNode.m_aResId[j] == pRes.m_pID) {
                            pNode.m_aResource[j] = pRes;
                            break;
                        }
                    }
                }
                this.m_pNode.m_pChildren.push(pNode);
            }
        }
        this.Create2(pReader, function () {
            pCallback();
        });
    }
    Create(aData, pCallback) {
        let pReader = new BinaryReader(aData);
        this.Create2(pReader, function () {
            pCallback();
        });
    }
    Create2(pReader, pCallback) {
        pReader.Position = this.m_nBufferAddr;
        for (let pRes of this.m_aResource) {
            pRes.Create(pReader);
        }
        for (let pNode of this.m_aNode) {
            let pTrans = pNode.m_pMesh;
            let mPosition = Vector3.Scale(0.5, Vector3.Add(pNode.m_mBBMin, pNode.m_mBBMax));
            pTrans.position = mPosition;
            for (let pRes of pNode.m_aResource) {
                if (pRes.m_pType == "geometryBuffer") {
                    let pObject = pRes.m_pObject;
                    pObject.parent = pTrans;
                    pObject.position = Vector3.Scale(-1.0, mPosition);
                    pObject.SetActive(true);
                }
                else if (pRes.m_pType == "geometryFile") {
                }
            }
            pTrans.parent = pNode.m_pObject;
            pTrans.SetParent(pNode.m_pObject, false);
        }
        this.m_bCreated = true;
        pCallback();
    }
    Free() {
        for (let pRes of this.m_aResource) {
            pRes.Free();
        }
        this.m_bCreated = false;
    }
}
class TextureBuffer {
    constructor() {
        this.m_pType = null;
        this.m_pID = null;
        this.m_pFormat = null;
        this.m_nSize = null;
        this.m_pTexture = null;
    }
    Create(pReader) {
        let pData = pReader.ReadBytes(this.m_nSize);
        let pBlob = new Blob([pData]);
        let pImage = new Image();
        let pTexture = new THREE.Texture();
        pTexture.image = pImage;
        pTexture.format = THREE.RGBFormat;
        pImage.src = window.URL.createObjectURL(pBlob);
        pImage.onload = function (e) {
            pTexture.needsUpdate = true;
            window.URL.revokeObjectURL(this.src);
        };
        this.m_pTexture = pTexture;
    }
    Free() {
        this.m_pTexture = null;
    }
}
class GeometryBuffer {
    constructor() {
        this.m_pType = null;
        this.m_pID = null;
        this.m_pFormat = null;
        this.m_nSize = 0;
        this.m_mBBMin = new Vector3(0.0, 0.0, 0.0);
        this.m_mBBMax = new Vector3(0.0, 0.0, 0.0);
        this.m_pTextureID = null;
        this.m_pTexture = null;
        this.m_pObject = null;
    }
    Create(pReader) {
        let pData = pReader.ReadBytes(this.m_nSize);
        let pTexture = null;
        if (this.m_pTexture && this.m_pTexture.m_pType == "textureBuffer") {
            pTexture = this.m_pTexture.m_pTexture;
        }
        else if (this.m_pTexture && this.m_pTexture.m_pType == "textureFile") {
            pTexture = this.m_pTexture.m_pTexture;
        }
        let pMesh = this.CreateMesh(pData);
        let pMaterial = new Material(MaterialType.AreaBottom);
        let pObject = new GameObject(this.m_pID, GameObjectType.Mesh);
        pMaterial.SetTexture(0, pTexture);
        pObject.SetGeometry2(pMesh, pMaterial);
        pObject.SetActive(false);
        this.m_pObject = pObject;
    }
    Free() {
        this.m_pObject.Destroy();
        this.m_pObject = null;
    }
    CreateMesh(aData) {
        var pData = new Uint8Array(aData);
        let pStream = new CTM.Stream(pData);
        let pFile = new CTM.File(pStream);
        return this.CreateGeometry(pFile);
    }
    CreateGeometry(pFile) {
        let Model = function () {
            THREE.BufferGeometry.call(this);
            this.materials = [];
            let indices = pFile.body.indices;
            let positions = pFile.body.vertices;
            let normals = pFile.body.normals;
            let uvs;
            let colors;
            let uvMaps = pFile.body.uvMaps;
            if (uvMaps !== undefined && uvMaps.length > 0) {
                uvs = uvMaps[0].uv;
            }
            let attrMaps = pFile.body.attrMaps;
            if (attrMaps !== undefined && attrMaps.length > 0 && attrMaps[0].name === 'Color') {
                colors = attrMaps[0].attr;
            }
            {
                let new_indices = new Uint32Array(indices.length);
                let tri_count = new_indices.length / 3;
                for (let i = 0; i < tri_count; i++) {
                    let i0 = i * 3;
                    let i1 = i0 + 1;
                    let i2 = i1 + 1;
                    new_indices[i0] = indices[i0];
                    new_indices[i1] = indices[i2];
                    new_indices[i2] = indices[i1];
                }
                this.setIndex(new THREE.BufferAttribute(new_indices, 1));
            }
            if (positions !== undefined) {
                let new_positions = new Float32Array(positions.length);
                let count = positions.length / 3;
                let index = 0;
                for (let i = 0; i < count; i++) {
                    new_positions[index++] = -positions[(i * 3)];
                    new_positions[index++] = positions[(i * 3) + 2];
                    new_positions[index++] = -positions[(i * 3) + 1];
                }
                this.addAttribute('position', new THREE.BufferAttribute(new_positions, 3));
            }
            if (normals !== undefined) {
                this.addAttribute('normal', new THREE.BufferAttribute(normals, 3));
            }
            if (uvs !== undefined) {
                this.addAttribute('uv', new THREE.BufferAttribute(uvs, 2));
            }
            if (colors !== undefined) {
                this.addAttribute('color', new THREE.BufferAttribute(colors, 4));
            }
        };
        Model.prototype = Object.create(THREE.BufferGeometry.prototype);
        Model.prototype.constructor = Model;
        var geometry = new Model();
        if (geometry.attributes.normal === undefined) {
            geometry.computeVertexNormals();
        }
        return geometry;
    }
}
class TextureFile {
    constructor() {
        this.m_pType = null;
        this.m_pID = null;
        this.m_pFormat = null;
        this.m_pFileName = null;
        this.m_pTexture = null;
    }
    Create(pReader) {
    }
    Free() {
        this.m_pTexture = null;
    }
}
class GeometryFile {
    constructor() {
        this.m_pType = null;
        this.m_pID = null;
        this.m_pFormat = null;
        this.m_pFileName = null;
        this.m_pTextureID = null;
        this.m_pTexture = null;
        this.m_pObject = null;
    }
    Create(pReader) {
    }
    Free() {
        this.m_pObject.Destroy();
        this.m_pObject = null;
    }
}
class NavChartDC {
    constructor(nIndex, pReader) {
        this.m_pLayerMgr = null;
        this.m_nBounceType = 4;
        this.m_nBounceStep = 0;
        this.m_nBounceSign = 1;
        this.m_pLayerMgr = new NavChartMgr(nIndex);
        if (pReader != null) {
            let pOldDC = NavChartDC.DC;
            NavChartDC.DC = this;
            this.UnSerialize(pReader);
            NavChartDC.DC = pOldDC;
        }
    }
    Update() {
    }
    OnGUI() {
    }
    ActiveLayer(nIndex) {
        this.BounceIcon(this.m_nBounceType);
        this.m_pLayerMgr.ActiveLayer(nIndex);
    }
    BounceIcon(nType) {
        this.m_nBounceStep = 0;
        this.m_nBounceSign = 1;
        this.m_nBounceType = nType;
    }
    version() {
        return 1000;
    }
    Active(bActive) {
        this.m_pLayerMgr.Active(bActive);
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_pLayerMgr.UnSerialize(pReader);
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("NavChartDC.UnSerialize(): Bad end!");
        }
    }
}
NavChartDC.DC = null;
class NavChartMgr {
    constructor(nWork) {
        this.m_nWork = 0;
        this.m_mPointHeap = null;
        this.m_mAdjoinHeap = null;
        this.m_mEdgeHeap = null;
        this.m_mLandmarkHeap = null;
        this.m_mLayerHeap = null;
        this.m_pActiveLayer = null;
        this.m_pSceneRoot = null;
        this.m_pLayerList = null;
        this.m_aTempAdjoin = null;
        let nHeapID = ((nWork + 1) | 0xFFFFFF00) >>> 0;
        this.m_nWork = nWork;
        this.m_mPointHeap = new HeapHandle(NPoint, nHeapID);
        this.m_mAdjoinHeap = new HeapHandle(NAdjoin, nHeapID);
        this.m_mEdgeHeap = new HeapHandle(NEdge, nHeapID);
        this.m_mLandmarkHeap = new HeapHandle(NLandmark, nHeapID);
        this.m_mLayerHeap = new HeapHandle(NavChart, nHeapID);
        this.m_mPointHeap.InitHeap();
        this.m_mAdjoinHeap.InitHeap();
        this.m_mEdgeHeap.InitHeap();
        this.m_mLandmarkHeap.InitHeap();
        this.m_mLayerHeap.InitHeap();
        this.m_pActiveLayer = null;
        this.m_pSceneRoot = null;
        this.m_pLayerList = new Array();
        this.m_aTempAdjoin = [null, null];
    }
    version() {
        return 1000;
    }
    Active(bActive) {
        if (this.m_pSceneRoot != null) {
            this.m_pSceneRoot.SetActive(bActive);
        }
    }
    ActiveLayer(nIndex) {
        let pLayer = this.m_pLayerList[nIndex];
        if (this.m_pActiveLayer != null && this.m_pActiveLayer.m_pLayerRoot != null) {
            this.m_pActiveLayer.m_pLayerRoot.SetActive(false);
        }
        this.m_pActiveLayer = pLayer;
        if (this.m_pSceneRoot != null && this.m_pActiveLayer.m_pLayerRoot != null) {
            this.m_pActiveLayer.m_pLayerRoot.SetActive(true);
        }
    }
    GetLayer(nIndex) {
        return this.m_pLayerList[nIndex];
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        this.m_pSceneRoot = new GameObject("-NavChart Root", GameObjectType.Empty);
        this.m_pSceneRoot.parent = MiaokitDC.DC.GetWork(this.m_nWork).m_pWorkRoot;
        let nVersion = pReader.ReadUInt32();
        let nWork = pReader.ReadInt32();
        pReader.ReadUInt32();
        pReader.ReadUInt32();
        pReader.ReadUInt32();
        pReader.ReadUInt32();
        pReader.ReadUInt32();
        this.m_mPointHeap.InitHeap(pReader);
        this.m_mAdjoinHeap.InitHeap(pReader);
        this.m_mEdgeHeap.InitHeap(pReader);
        this.m_mLandmarkHeap.InitHeap(pReader);
        this.m_mLayerHeap.InitHeap(pReader);
        if (nWork != this.m_nWork) {
            for (let pPoint of this.m_mPointHeap) {
                pPoint.m_mHandle.Heap = this.m_mPointHeap;
                pPoint.m_mLayer.Heap = this.m_mLayerHeap;
                pPoint.m_mAdjoinList.Heap = this.m_mAdjoinHeap;
                pPoint.m_mLandmark.Heap = this.m_mLandmarkHeap;
            }
            for (let pAdjoin of this.m_mAdjoinHeap) {
                pAdjoin.m_mHandle.Heap = this.m_mAdjoinHeap;
                pAdjoin.m_mAdjPoint.Heap = this.m_mPointHeap;
                pAdjoin.m_mEdge.Heap = this.m_mEdgeHeap;
            }
            for (let pEdge of this.m_mEdgeHeap) {
                pEdge.m_mHandle.Heap = this.m_mEdgeHeap;
                pEdge.m_mLeftPoint.Heap = this.m_mPointHeap;
                pEdge.m_mRightPoint.Heap = this.m_mPointHeap;
            }
            for (let pLandmark of this.m_mLandmarkHeap) {
                pLandmark.m_mHandle.Heap = this.m_mLandmarkHeap;
                pLandmark.m_mPoint.Heap = this.m_mPointHeap;
            }
            for (let pLayer of this.m_mLayerHeap) {
                pLayer.m_mHandle.Heap = this.m_mLayerHeap;
                pLayer.m_mPointList.Heap = this.m_mPointHeap;
                pLayer.m_mEdgeList.Heap = this.m_mEdgeHeap;
                pLayer.m_mLandmarkList.Heap = this.m_mLandmarkHeap;
                pLayer.m_mAdjoinHeap = this.m_mAdjoinHeap;
            }
        }
        for (let pLayer of this.m_mLayerHeap.GetDefaultList()) {
            pLayer.m_mAdjoinHeap = this.m_mAdjoinHeap;
            pLayer.m_nWork = this.m_nWork;
            pLayer.BuildScene(this.m_pSceneRoot);
            this.m_pLayerList.push(pLayer);
        }
        this.m_pLayerList.sort(function (a, b) {
            if (a.m_nIndex < b.m_nIndex) {
                return -1;
            }
            else if (a.m_nIndex > b.m_nIndex) {
                return 1;
            }
            else {
                return 0;
            }
        });
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("NavChartMgr.UnSerialize(): Bad end!");
        }
    }
    LinkLayers(eUsage, pGateList, pSiteList) {
        let pAdjoinList = this.m_aTempAdjoin[eUsage];
        if (pAdjoinList != null) {
            console.error("NavChartMgr.LinkLayers(): pAdjoinList != null.");
            return;
        }
        pAdjoinList = new Array();
        this.m_aTempAdjoin[eUsage] = pAdjoinList;
        let pWellholeList = new Array();
        let aWellholeIndex = new Array(this.m_pLayerList.length);
        for (let i = 0; i < aWellholeIndex.length; i++) {
            aWellholeIndex[i] = 0;
        }
        for (let pLandmark of this.m_mLandmarkHeap) {
            let pPoint = pLandmark.m_mPoint.Object;
            if (pPoint.m_eUsage == eUsage) {
                if (pLandmark.m_nType > 0 && pLandmark.m_nType < 4) {
                    let pLayer = pPoint.m_mLayer.Object;
                    let nLayer = pLayer.m_nIndex;
                    let nIndex = nLayer * 1024 + (++aWellholeIndex[nLayer]);
                    pWellholeList.push({ m_nIndex: nIndex, m_pWellhole: pLandmark });
                }
                if (pLandmark.m_nType > 4 && pLandmark.m_nType < 8) {
                    pGateList.push(pLandmark);
                }
                pSiteList.push(pLandmark);
            }
        }
        pWellholeList.sort(function (a, b) {
            if (a.m_nIndex < b.m_nIndex) {
                return -1;
            }
            else if (a.m_nIndex > b.m_nIndex) {
                return 1;
            }
            else {
                return 0;
            }
        });
        for (let i = 0; i < pWellholeList.length; i++) {
            let pLandmark = pWellholeList[i].m_pWellhole;
            for (let j = i + 1; j < pWellholeList.length; j++) {
                let pNextLandmark = pWellholeList[j].m_pWellhole;
                if (pLandmark.m_nType == pNextLandmark.m_nType && pLandmark.m_nNumber == pNextLandmark.m_nNumber) {
                    let pPoint0 = pLandmark.m_mPoint.Object;
                    let pPoint1 = pNextLandmark.m_mPoint.Object;
                    let pAdjoin0 = pPoint0.m_mAdjoinList.CreateData().Object;
                    let pAdjoin1 = pPoint1.m_mAdjoinList.CreateData().Object;
                    pAdjoinList.push(pAdjoin0);
                    pAdjoinList.push(pAdjoin1);
                    pAdjoin0.m_mAdjPoint.Number = pPoint1.m_mHandle.Number;
                    pAdjoin0.m_nLength = -1.0;
                    pAdjoin0.m_mEdge.Number = 0;
                    pAdjoin1.m_mAdjPoint.Number = pPoint0.m_mHandle.Number;
                    pAdjoin1.m_nLength = -1.0;
                    pAdjoin1.m_mEdge.Number = 0;
                    break;
                }
            }
        }
    }
    DelinkLayers(eUsage) {
        let pAdjoinList = this.m_aTempAdjoin[eUsage];
        if (pAdjoinList != null) {
            for (let pAdjoin of pAdjoinList) {
                pAdjoin.m_mHandle.Destroy();
            }
            this.m_aTempAdjoin[eUsage] = null;
        }
    }
    CollectPoint(eUsage, pPointList) {
        for (let pPoint of this.m_mPointHeap) {
            if (pPoint.m_eUsage == eUsage) {
                for (let pAdjoin of pPoint.m_mAdjoinList) {
                    if (pAdjoin.m_nLength >= 0.0) {
                        pAdjoin.m_nLength = pAdjoin.m_mEdge.Object.m_nLength;
                    }
                    else if (pAdjoin.m_nLength < -1.0) {
                        pAdjoin.m_nLength = -pAdjoin.m_nLength;
                    }
                }
                pPoint.m_nIndex = pPointList.length;
                pPointList.push(pPoint);
            }
        }
    }
}
class NavChart {
    constructor() {
        this.m_mHandle = new Handle(NavChart, 0);
        this.m_mPointList = new ListHandle(NPoint, 0);
        this.m_mEdgeList = new ListHandle(NEdge, 0);
        this.m_mLandmarkList = new ListHandle(NLandmark, 0);
        this.m_nIndex = 0;
        this.m_nWork = 0;
        this.m_mAdjoinHeap = null;
        this.m_pLayerRoot = null;
    }
    get version() {
        return 1000;
    }
    OnCreate(nID) {
    }
    OnEmploy(nID) {
        this.m_mHandle = new Handle(NavChart, nID);
    }
    OnUnemploy() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mHandle.Number = pReader.ReadUInt32();
        this.m_mPointList.Number = pReader.ReadUInt32();
        this.m_mEdgeList.Number = pReader.ReadUInt32();
        this.m_mLandmarkList.Number = pReader.ReadUInt32();
        this.m_nIndex = pReader.ReadInt32();
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("NLayer.UnSerialize(): Bad end!");
        }
    }
    BuildScene(pSceneRoot) {
        if (pSceneRoot != null) {
            this.m_pLayerRoot = new GameObject("NavChartLayer", GameObjectType.Empty);
            this.m_pLayerRoot.parent = pSceneRoot;
            for (let pLandmark of this.m_mLandmarkList) {
                pLandmark.CreateObject(this.m_pLayerRoot, null);
            }
            this.m_pLayerRoot.SetActive(false);
        }
    }
    GetNearestEdge(mPosition, nMinDis = 0.5) {
        let pNearestEdge = null;
        let nOffset = 0.0;
        let mVector = null;
        for (let pEdge of this.m_mEdgeList) {
            if (pEdge.m_eUsage == NUsageType.Navigation) {
                let pPoint0 = pEdge.m_mLeftPoint.Object;
                let pPoint1 = pEdge.m_mRightPoint.Object;
                let vLine = Vector3.Normalize(Vector3.Sub(pPoint1.m_mPosition, pPoint0.m_mPosition));
                let vLineP = Vector3.Sub(mPosition, pPoint0.m_mPosition);
                let nLenC = Vector3.Length(vLineP);
                nLenC *= nLenC;
                let nLenA = Vector3.Dot(vLineP, vLine);
                nLenA *= nLenA;
                let nDis = Math.sqrt(nLenC - nLenA);
                if (nDis < nMinDis) {
                    let nCurOffset = Vector3.Dot(vLine, vLineP);
                    if (nCurOffset > -nDis && nCurOffset < (pEdge.m_nLength + nDis)) {
                        nMinDis = nDis;
                        pNearestEdge = pEdge;
                        nOffset = nCurOffset;
                        mVector = vLine;
                    }
                }
            }
        }
        return null == pNearestEdge ? null : { Edge: pNearestEdge, Vector: mVector, Distance: nMinDis, Offset0: nOffset, Offset1: (nOffset - pNearestEdge.m_nLength) };
    }
}
NavChart.g_pContext = new HeapContext(NavChart);
var NUsageType;
(function (NUsageType) {
    NUsageType[NUsageType["Navigation"] = 0] = "Navigation";
    NUsageType[NUsageType["Routing"] = 1] = "Routing";
})(NUsageType || (NUsageType = {}));
class NPoint {
    constructor() {
        this.m_mHandle = new Handle(NPoint, 0);
        this.m_mLayer = new Handle(NavChart, 0);
        this.m_mAdjoinList = new ListHandle(NAdjoin, 0);
        this.m_mLandmark = new Handle(NLandmark, 0);
        this.m_mPosition = new Vector3(0.0, 0.0, 0.0);
        this.m_nDegrees = 0;
        this.m_eUsage = NUsageType.Navigation;
        this.m_nIndex = 0;
        this.m_mClone = null;
    }
    get version() {
        return 1000;
    }
    OnCreate(nID) {
    }
    OnEmploy(nID) {
        this.m_mHandle = new Handle(NPoint, nID);
    }
    OnUnemploy() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mHandle.Number = pReader.ReadUInt32();
        this.m_mLayer.Number = pReader.ReadUInt32();
        this.m_mAdjoinList.Number = pReader.ReadUInt32();
        this.m_mLandmark.Number = pReader.ReadUInt32();
        this.m_mPosition.x = pReader.ReadSingle();
        this.m_mPosition.y = pReader.ReadSingle();
        this.m_mPosition.z = pReader.ReadSingle();
        this.m_nDegrees = pReader.ReadInt32();
        this.m_eUsage = pReader.ReadInt32();
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("NPoint.UnSerialize(): Bad end!");
        }
    }
}
NPoint.g_pContext = new HeapContext(NPoint);
class NAdjoin {
    constructor() {
        this.m_mHandle = new Handle(NAdjoin, 0);
        this.m_mAdjPoint = new Handle(NPoint, 0);
        this.m_mEdge = new Handle(NEdge, 0);
        this.m_nLength = 0;
    }
    get version() {
        return 1000;
    }
    OnCreate(nID) {
    }
    OnEmploy(nID) {
        this.m_mHandle = new Handle(NAdjoin, nID);
    }
    OnUnemploy() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mHandle.Number = pReader.ReadUInt32();
        this.m_mAdjPoint.Number = pReader.ReadUInt32();
        this.m_mEdge.Number = pReader.ReadUInt32();
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("NAdjoin.UnSerialize(): Bad end!");
        }
    }
}
NAdjoin.g_pContext = new HeapContext(NAdjoin);
class NEdge {
    constructor() {
        this.m_mHandle = new Handle(NEdge, 0);
        this.m_mLeftPoint = new Handle(NPoint, 0);
        this.m_mRightPoint = new Handle(NPoint, 0);
        this.m_nLength = 0.0;
        this.m_eUsage = NUsageType.Navigation;
    }
    get version() {
        return 1000;
    }
    OnCreate(nID) {
    }
    OnEmploy(nID) {
        this.m_mHandle = new Handle(NEdge, nID);
    }
    OnUnemploy() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mHandle.Number = pReader.ReadUInt32();
        this.m_mLeftPoint.Number = pReader.ReadUInt32();
        this.m_mRightPoint.Number = pReader.ReadUInt32();
        this.m_nLength = pReader.ReadSingle();
        this.m_eUsage = pReader.ReadInt32();
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("NEdge.UnSerialize(): Bad end!");
        }
    }
}
NEdge.g_pContext = new HeapContext(NEdge);
class NLandmark {
    constructor() {
        this.m_mHandle = new Handle(NLandmark, 0);
        this.m_mPoint = new Handle(NPoint, 0);
        this.m_pObject = null;
        this.m_pName = "位置点";
        this.m_pIconUrl = null;
        this.m_nIconType = 0;
        this.m_pAAreaLabel = null;
    }
    get version() {
        return 1000;
    }
    OnCreate(nID) {
    }
    OnEmploy(nID) {
        this.m_mHandle = new Handle(NLandmark, nID);
    }
    OnUnemploy() {
    }
    Serialize(pWriter) {
    }
    UnSerialize(pReader) {
        let nVersion = pReader.ReadUInt32();
        this.m_mHandle.Number = pReader.ReadUInt32();
        this.m_mPoint.Number = pReader.ReadUInt32();
        this.m_pSerial = pReader.ReadString();
        this.m_nType = pReader.ReadInt32();
        this.m_nNumber = pReader.ReadInt32();
        let nEnd = pReader.ReadInt32();
        if (nEnd != 501347081) {
            alert("NLandmark.UnSerialize(): Bad end!");
        }
    }
    CreateObject(pParent, pIconMgr) {
        if (pParent != null) {
            if (MiaokitDC.DC.m_pNavigator.BindSiteData(this)) {
                if (this.m_nIconType > 1) {
                    Engine.g_pInstance.AddIcon(this.m_nIconType, this.m_pIconUrl);
                }
            }
        }
    }
    TypeName() {
        let pTypeName = "";
        switch (this.m_nType) {
            case 1:
                pTypeName = "楼梯";
                break;
            case 2:
                pTypeName = "电梯";
                break;
            case 3:
                pTypeName = "手扶梯";
                break;
            case 5:
                pTypeName = "出口";
            case 6:
                pTypeName = "入口";
                break;
            case 7:
                pTypeName = "出入口";
                break;
            default:
                break;
        }
        return pTypeName;
    }
}
NLandmark.g_pContext = new HeapContext(NLandmark);
class NNavigator {
    constructor() {
        this.m_eUsage = NUsageType.Navigation;
        this.m_bLinked = false;
        this.m_bFixedStart = false;
        this.m_pStart = null;
        this.m_aRouting = null;
        this.m_aRoutingDist = null;
        this.m_aPoint = null;
        this.m_aGateType = null;
        this.m_pSiteList = null;
        this.m_pGateList = null;
        this.m_pTempAdjoin = null;
        this.m_pSiteData = null;
        this.m_aCurPath = null;
    }
    FindPath(pStartSerial, pEndSerial, nGateType) {
        if (this.m_aCurPath != null) {
            this.m_aCurPath = null;
        }
        this.InitPath(pStartSerial, false, nGateType);
        if (this.m_pStart == null || this.m_pStart.m_mLandmark.Object.m_pSerial != pStartSerial) {
            return null;
        }
        let pEndPoint = null;
        for (let pLandmark of this.m_pSiteList) {
            if (pEndSerial == pLandmark.m_pSerial) {
                pEndPoint = pLandmark.m_mPoint.Object;
                if (pEndPoint != null) {
                    break;
                }
            }
        }
        if (pEndPoint != null) {
            if (nGateType == 0) {
                nGateType = this.m_aGateType[pEndPoint.m_nIndex];
            }
            this.m_aCurPath = this.FindPath2(pEndPoint.m_nIndex, nGateType);
            if (this.m_aCurPath == null)
                return null;
            for (let i = 0; i < this.m_aCurPath.length; i++) {
                let pPath = this.m_aCurPath[i];
                let pPathPassage1 = null;
                for (let j = 0; j < pPath.m_aPath.length - 1; j++) {
                    let pPathPassage2 = new PathPassage();
                    pPathPassage2.m_pStarPos = pPath.m_aPath[j];
                    pPathPassage2.m_pEndPos = pPath.m_aPath[j + 1];
                    pPathPassage2.m_pV3Lines = Vector3.Sub(pPathPassage2.m_pEndPos, pPathPassage2.m_pStarPos);
                    pPathPassage2.m_pV2Lines = Vector2.Sub(new Vector2(pPathPassage2.m_pEndPos.x, pPathPassage2.m_pEndPos.z), new Vector2(pPathPassage2.m_pStarPos.x, pPathPassage2.m_pStarPos.z));
                    pPathPassage2.m_nDistan = Vector3.Distance(pPathPassage2.m_pEndPos, pPathPassage2.m_pStarPos);
                    if (pPathPassage1 != null) {
                        let Ang = Vector2.AngleTo(pPathPassage1.m_pV2Lines, pPathPassage2.m_pV2Lines);
                        if (Ang < 10 || Ang > 350) {
                            pPathPassage2.m_pStarPos = pPathPassage1.m_pStarPos;
                            pPathPassage2.m_pV3Lines = Vector3.Sub(pPathPassage2.m_pEndPos, pPathPassage2.m_pStarPos);
                            pPathPassage2.m_pV2Lines = Vector2.Sub(new Vector2(pPathPassage2.m_pEndPos.x, pPathPassage2.m_pEndPos.z), new Vector2(pPathPassage2.m_pStarPos.x, pPathPassage2.m_pStarPos.z));
                            pPathPassage2.m_nDistan = Vector3.Distance(pPathPassage2.m_pEndPos, pPathPassage2.m_pStarPos);
                        }
                        else {
                            pPathPassage1.m_pNextAngle = Ang;
                            pPath.m_nDistance += pPathPassage1.m_nDistan;
                            pPath.m_pPathPassage.push(pPathPassage1);
                        }
                    }
                    pPathPassage1 = pPathPassage2;
                    if (j + 1 == pPath.m_aPath.length - 1) {
                        pPath.m_nDistance += pPathPassage1.m_nDistan;
                        pPath.m_pPathPassage.push(pPathPassage1);
                    }
                }
            }
            return this.m_aCurPath;
        }
        return null;
    }
    FindPathDirect(pStart, pEndPoint, nGateType) {
        if (this.m_aCurPath != null) {
            this.m_aCurPath = null;
        }
        this.InitPathDirect(pStart, false, nGateType);
        if (pEndPoint != null) {
            if (nGateType == 0) {
                nGateType = this.m_aGateType[pEndPoint.m_nIndex];
            }
            this.m_aCurPath = this.FindPath2(pEndPoint.m_nIndex, nGateType);
            if (this.m_aCurPath == null)
                return null;
            for (let i = 0; i < this.m_aCurPath.length; i++) {
                let pPath = this.m_aCurPath[i];
                let pPathPassage1 = null;
                for (let j = 0; j < pPath.m_aPath.length - 1; j++) {
                    let pPathPassage2 = new PathPassage();
                    pPathPassage2.m_pStarPos = pPath.m_aPath[j];
                    pPathPassage2.m_pEndPos = pPath.m_aPath[j + 1];
                    pPathPassage2.m_pV3Lines = Vector3.Sub(pPathPassage2.m_pEndPos, pPathPassage2.m_pStarPos);
                    pPathPassage2.m_pV2Lines = Vector2.Sub(new Vector2(pPathPassage2.m_pEndPos.x, pPathPassage2.m_pEndPos.z), new Vector2(pPathPassage2.m_pStarPos.x, pPathPassage2.m_pStarPos.z));
                    pPathPassage2.m_nDistan = Vector3.Distance(pPathPassage2.m_pEndPos, pPathPassage2.m_pStarPos);
                    if (pPathPassage1 != null) {
                        let Ang = Vector2.AngleTo(pPathPassage1.m_pV2Lines, pPathPassage2.m_pV2Lines);
                        if (Ang < 10 || Ang > 350) {
                            pPathPassage2.m_pStarPos = pPathPassage1.m_pStarPos;
                            pPathPassage2.m_pV3Lines = Vector3.Sub(pPathPassage2.m_pEndPos, pPathPassage2.m_pStarPos);
                            pPathPassage2.m_pV2Lines = Vector2.Sub(new Vector2(pPathPassage2.m_pEndPos.x, pPathPassage2.m_pEndPos.z), new Vector2(pPathPassage2.m_pStarPos.x, pPathPassage2.m_pStarPos.z));
                            pPathPassage2.m_nDistan = Vector3.Distance(pPathPassage2.m_pEndPos, pPathPassage2.m_pStarPos);
                        }
                        else {
                            pPathPassage1.m_pNextAngle = Ang;
                            pPath.m_nDistance += pPathPassage1.m_nDistan;
                            pPath.m_pPathPassage.push(pPathPassage1);
                        }
                    }
                    pPathPassage1 = pPathPassage2;
                    if (j + 1 == pPath.m_aPath.length - 1) {
                        pPath.m_nDistance += pPathPassage1.m_nDistan;
                        pPath.m_pPathPassage.push(pPathPassage1);
                    }
                }
            }
            return this.m_aCurPath;
        }
        return null;
    }
    FindPathFromPos(pStartLocation, pEndSerial, nGateType) {
        let pStartPoint = null;
        let pEndPoint = null;
        {
            let pLayer = MiaokitDC.DC.GetWork(pStartLocation.Work).m_pNavChartDC.m_pLayerMgr.GetLayer(pStartLocation.Layer);
            let nMinDis = 100;
            let pAreaLayer = MiaokitDC.DC.GetWork(pStartLocation.Work).m_pALinerDC.m_pLayerMgr.GetLayer(pStartLocation.Layer);
            let pArea = null;
            for (let pLabel of pAreaLayer.m_pLabelList) {
                if (pLabel.m_pArea.CollideBottom(pStartLocation.Position)) {
                    pArea = pLabel;
                    break;
                }
            }
            for (let pPoint of this.m_aPoint) {
                if (pLayer === pPoint.m_mLayer.Object) {
                    let pCurArea = null;
                    if (null != pArea) {
                        for (let pLabel of pAreaLayer.m_pLabelList) {
                            if (pLabel.m_pArea.CollideBottom(pPoint.m_mPosition)) {
                                pCurArea = pLabel;
                                break;
                            }
                        }
                    }
                    let nDis = Vector3.Distance(pStartLocation.Position, pPoint.m_mPosition);
                    if (nDis < nMinDis && pCurArea == pArea) {
                        pStartPoint = pPoint;
                        nMinDis = nDis;
                    }
                }
            }
            if (null == pStartPoint) {
                console.error("搜索不到起点位置！");
                return null;
            }
        }
        for (let pLandmark of this.m_pSiteList) {
            if (pEndSerial == pLandmark.m_pSerial) {
                pEndPoint = pLandmark.m_mPoint.Object;
                if (pEndPoint != null) {
                    break;
                }
            }
        }
        return this.FindPathDirect(pStartPoint, pEndPoint, nGateType);
    }
    FindPathFromPos2(pStartLocation, pEndPoint, nGateType) {
        let pStartPoint = null;
        let pLayer = MiaokitDC.DC.GetWork(pStartLocation.Work).m_pNavChartDC.m_pLayerMgr.GetLayer(pStartLocation.Layer);
        let nMinDis = 100;
        for (let pPoint of this.m_aPoint) {
            if (pLayer === pPoint.m_mLayer.Object) {
                let nDis = Vector3.Distance(pStartLocation.Position, pPoint.m_mPosition);
                if (nDis < nMinDis) {
                    pStartPoint = pPoint;
                    nMinDis = nDis;
                }
            }
        }
        return this.FindPathDirect(pStartPoint, pEndPoint, nGateType);
    }
    FindNearest(pStartSerial, pEndType, nGateType) {
        this.InitPath(pStartSerial, false, nGateType);
        if (this.m_pStart == null || this.m_pStart.m_mLandmark.Object.m_pSerial != pStartSerial) {
            return null;
        }
        if (this.m_aRouting[nGateType] == null) {
            if (this.m_aRouting[0] == null) {
                return null;
            }
            nGateType = 0;
        }
        let pEndPointID = null;
        let pEndPointName = null;
        let nEndDist = 0.0;
        for (let pLandmark of this.m_pSiteList) {
            if (pEndType == pLandmark.m_nIconType) {
                let pPoint = pLandmark.m_mPoint.Object;
                let nDist = this.m_aRoutingDist[nGateType][pPoint.m_nIndex];
                if (pEndPointID == null || nEndDist > nDist) {
                    pEndPointID = pLandmark.m_pSerial;
                    pEndPointName = pLandmark.m_pName;
                    nEndDist = nDist;
                }
            }
        }
        return { Name: pEndPointName, ID: pEndPointID };
    }
    FindNearestList(pStartSerial, pEndType, nGateType) {
        this.InitPath(pStartSerial, false, nGateType);
        if (this.m_pStart == null || this.m_pStart.m_mLandmark.Object.m_pSerial != pStartSerial) {
            return null;
        }
        if (this.m_aRouting[nGateType] == null) {
            if (this.m_aRouting[0] == null) {
                return null;
            }
            nGateType = 0;
        }
        let aEndList = [];
        for (let pLandmark of this.m_pSiteList) {
            if (pEndType == pLandmark.m_nIconType) {
                let pPoint = pLandmark.m_mPoint.Object;
                let nDist = this.m_aRoutingDist[nGateType][pPoint.m_nIndex];
                aEndList.push({
                    Name: pLandmark.m_pName,
                    ID: pLandmark.m_pSerial,
                    Dist: nDist
                });
            }
        }
        aEndList.sort(function (a, b) {
            if (a.Dist < b.Dist) {
                return -1;
            }
            else if (a.Dist > b.Dist) {
                return 1;
            }
            else {
                return 0;
            }
        });
        return aEndList;
    }
    FindPath2(nEndPoint, nGateType) {
        if (this.m_aPoint == null || this.m_aRouting == null) {
            return null;
        }
        if (this.m_aRouting[nGateType] == null) {
            if (this.m_aRouting[0] == null) {
                return null;
            }
            nGateType = 0;
        }
        let aRoute = this.m_aRouting[nGateType];
        if (aRoute[nEndPoint] >= 0x0FFFFFFF) {
            return null;
        }
        let nStartPoint = this.m_pStart.m_nIndex;
        let pStack = new Array();
        while (nEndPoint != nStartPoint) {
            pStack.push(this.m_aPoint[nEndPoint]);
            nEndPoint = aRoute[nEndPoint];
        }
        pStack.push(this.m_aPoint[nStartPoint]);
        let pNavPath = new Array();
        let pCurPoints = null;
        let pCurPath = null;
        let nLayerIndex = -1;
        let nSceneIndex = 0;
        let nPathLen = pStack.length;
        for (let i = 0; i < nPathLen; i++) {
            let pPoint = pStack.pop();
            let nCurLayerIndex = pPoint.m_mLayer.Object.m_nIndex;
            let nCurSceneIndex = pPoint.m_mLayer.Object.m_nWork;
            if (nCurSceneIndex != nSceneIndex || nCurLayerIndex != nLayerIndex) {
                if (pCurPath != null && pCurPoints != null) {
                    pCurPath.m_aPath = pCurPoints;
                }
                nLayerIndex = nCurLayerIndex;
                nSceneIndex = nCurSceneIndex;
                pCurPath = new NPath();
                pCurPoints = new Array();
                pNavPath.push(pCurPath);
                pCurPath.m_nWork = nCurSceneIndex;
                pCurPath.m_nLayer = nLayerIndex;
                pCurPath.m_pStartPoint = pPoint;
            }
            pCurPoints.push(Vector3.Clone(pPoint.m_mPosition));
            pCurPath.m_pEndPoint = pPoint;
        }
        if (pCurPath != null && pCurPoints != null) {
            pCurPath.m_aPath = pCurPoints;
        }
        return pNavPath;
    }
    InitPath(pStartSerial, bRelink, nGateType) {
        if (pStartSerial == null) {
            console.error("NNavigator.InitPath(): pStartSerial == null.");
            return;
        }
        if (!this.m_bLinked || bRelink) {
            this.Delink();
            this.Link();
            this.m_pStart = null;
            this.m_aRouting = null;
            this.m_bLinked = true;
        }
        if (!this.m_bFixedStart || this.m_pStart == null) {
            this.m_pStart = null;
            this.m_aRouting = null;
            for (let pLandmark of this.m_pSiteList) {
                if (pLandmark.m_pSerial == pStartSerial) {
                    this.m_pStart = pLandmark.m_mPoint.Object;
                    break;
                }
            }
            if (this.m_pStart != null) {
                let nStartIndex = this.m_pStart.m_nIndex;
                if (this.m_eUsage == NUsageType.Navigation) {
                    this.m_aRouting = [null, null, null, null];
                    this.m_aRoutingDist = [null, null, null, null];
                    let pRouting = this.InitPath2(nStartIndex, 0);
                    this.m_aRouting[0] = pRouting.Path;
                    this.m_aRoutingDist[0] = pRouting.Dist;
                    if (nGateType != 0) {
                        let pRouting = this.InitPath2(nStartIndex, nGateType);
                        this.m_aRouting[nGateType] = pRouting.Path;
                        this.m_aRoutingDist[nGateType] = pRouting.Dist;
                    }
                }
                else {
                    this.m_aRouting = [null];
                    let pRouting = this.InitPath2(nStartIndex, 0);
                    this.m_aRouting[0] = pRouting.Path;
                    this.m_aRoutingDist[0] = pRouting.Dist;
                }
            }
        }
        if (this.m_bFixedStart) {
            this.Delink();
        }
    }
    InitPathDirect(pStart, bRelink, nGateType) {
        if (pStart == null) {
            console.error("NNavigator.InitPath(): pStart == null.");
            return;
        }
        if (!this.m_bLinked || bRelink) {
            this.Delink();
            this.Link();
            this.m_pStart = null;
            this.m_aRouting = null;
            this.m_bLinked = true;
        }
        if (!this.m_bFixedStart || this.m_pStart == null) {
            this.m_pStart = pStart;
            this.m_aRouting = null;
            if (this.m_pStart != null) {
                let nStartIndex = this.m_pStart.m_nIndex;
                if (this.m_eUsage == NUsageType.Navigation) {
                    this.m_aRouting = [null, null, null, null];
                    this.m_aRoutingDist = [null, null, null, null];
                    let pRouting = this.InitPath2(nStartIndex, 0);
                    this.m_aRouting[0] = pRouting.Path;
                    this.m_aRoutingDist[0] = pRouting.Dist;
                    if (nGateType != 0) {
                        let pRouting = this.InitPath2(nStartIndex, nGateType);
                        this.m_aRouting[nGateType] = pRouting.Path;
                        this.m_aRoutingDist[nGateType] = pRouting.Dist;
                    }
                }
                else {
                    this.m_aRouting = [null];
                    let pRouting = this.InitPath2(nStartIndex, 0);
                    this.m_aRouting[0] = pRouting.Path;
                    this.m_aRoutingDist[0] = pRouting.Dist;
                }
            }
        }
        if (this.m_bFixedStart) {
            this.Delink();
        }
    }
    InitPath2(nBegin, nFirstGateType) {
        let nPointCount = this.m_aPoint.length;
        let aPath = new Array(nPointCount);
        let aGateType = new Array(nPointCount);
        let aGateNum = new Array(nPointCount);
        let aVisited = new Array(nPointCount);
        let aLength = new Array(nPointCount);
        if (nFirstGateType == 0) {
            this.m_aGateType = aGateType;
        }
        for (let i = 0; i < nPointCount; i++) {
            aLength[i] = 0xFFFFFFFF;
            aPath[i] = 0x0FFFFFFF;
            aVisited[i] = false;
            aGateType[i] = 0;
            aGateNum[i] = 0;
        }
        aVisited[nBegin] = true;
        aLength[nBegin] = 0.0;
        aPath[nBegin] = nBegin;
        aGateType[nBegin] = nFirstGateType;
        aGateNum[nBegin] = 0x0FFFFFFF;
        {
            let pPoint = this.m_aPoint[nBegin];
            for (let pAdjoin of pPoint.m_mAdjoinList) {
                let nLength = pAdjoin.m_nLength;
                let nGateType = aGateType[nBegin];
                let nGateNum = aGateNum[nBegin];
                if (nLength < 0.0) {
                    let pLandmark = pPoint.m_mLandmark.Object;
                    if (nGateType == 0) {
                        nLength = 1000.0;
                    }
                    else if (pLandmark.m_nType == nGateType) {
                        nLength = 1000.0;
                        if (pLandmark.m_nNumber != nGateNum) {
                            nLength += 100.0;
                        }
                    }
                    else {
                        nLength = 10000.0;
                    }
                    nGateType = pLandmark.m_nType;
                    nGateNum = pLandmark.m_nNumber;
                }
                let pAdjPoint = pAdjoin.m_mAdjPoint.Object;
                aLength[pAdjPoint.m_nIndex] = nLength;
                aPath[pAdjPoint.m_nIndex] = nBegin;
                aGateType[pAdjPoint.m_nIndex] = nGateType;
                aGateNum[pAdjPoint.m_nIndex] = nGateNum;
            }
        }
        for (let i = 1; i < nPointCount; i++) {
            let nCurLength = 0xFFFFFFFF;
            let nCurIndex = 0;
            for (let j = 0; j < nPointCount; j++) {
                if (aVisited[j] == false && aLength[j] <= nCurLength) {
                    nCurLength = aLength[j];
                    nCurIndex = j;
                }
            }
            aVisited[nCurIndex] = true;
            let pPoint = this.m_aPoint[nCurIndex];
            for (let pAdjoin of pPoint.m_mAdjoinList) {
                let nLength = pAdjoin.m_nLength;
                let nGateType = aGateType[nCurIndex];
                let nGateNum = aGateNum[nCurIndex];
                if (nLength < 0.0) {
                    let pLandmark = pPoint.m_mLandmark.Object;
                    if (nGateType == 0) {
                        nLength = 1000.0;
                    }
                    else if (pLandmark.m_nType == nGateType) {
                        nLength = 1000.0;
                        if (pLandmark.m_nNumber != nGateNum) {
                            nLength += 100.0;
                        }
                    }
                    else {
                        nLength = 10000.0;
                    }
                    nGateType = pLandmark.m_nType;
                    nGateNum = pLandmark.m_nNumber;
                }
                let pAdjPoint = pAdjoin.m_mAdjPoint.Object;
                nLength += nCurLength;
                if (aVisited[pAdjPoint.m_nIndex] == false && aLength[pAdjPoint.m_nIndex] > nLength) {
                    aLength[pAdjPoint.m_nIndex] = nLength;
                    aPath[pAdjPoint.m_nIndex] = nCurIndex;
                    aGateType[pAdjPoint.m_nIndex] = nGateType;
                    aGateNum[pAdjPoint.m_nIndex] = nGateNum;
                }
            }
        }
        return { Path: aPath, Dist: aLength };
    }
    Link() {
        this.m_pSiteList = new Array();
        this.m_pGateList = new Array();
        let pPointList = new Array();
        for (let pWork of MiaokitDC.DC.m_aWork) {
            if (pWork != null) {
                pWork.m_pNavChartDC.m_pLayerMgr.LinkLayers(this.m_eUsage, this.m_pGateList, this.m_pSiteList);
                pWork.m_pNavChartDC.m_pLayerMgr.CollectPoint(this.m_eUsage, pPointList);
            }
        }
        this.m_aPoint = pPointList;
        this.LinkWorks();
    }
    Delink() {
        for (let pWork of MiaokitDC.DC.m_aWork) {
            if (pWork != null) {
                pWork.m_pNavChartDC.m_pLayerMgr.DelinkLayers(this.m_eUsage);
            }
        }
        this.DelinkWorks();
    }
    LinkWorks() {
        this.m_pTempAdjoin = new Array();
        for (let i = 0; i < this.m_pGateList.length; i++) {
            let pLandmark = this.m_pGateList[i];
            for (let j = i + 1; j < this.m_pGateList.length; j++) {
                let pNextLandmark = this.m_pGateList[j];
                if (pLandmark.m_nNumber == pNextLandmark.m_nNumber) {
                    let nLength0 = 1.0;
                    let nLength1 = 1.0;
                    if (pLandmark.m_nType == 7 && pNextLandmark.m_nType == 7) {
                        nLength0 = -1000.0;
                        nLength1 = -1000.0;
                    }
                    else if (pLandmark.m_nType == 5 && pNextLandmark.m_nType == 6) {
                        nLength0 = -1000.0;
                        nLength1 = -100000.0;
                    }
                    else if (pLandmark.m_nType == 6 && pNextLandmark.m_nType == 5) {
                        nLength0 = -100000.0;
                        nLength1 = -1000.0;
                    }
                    if (nLength0 < 0.0 && nLength1 < 0.0) {
                        let pPoint0 = pLandmark.m_mPoint.Object;
                        let pPoint1 = pNextLandmark.m_mPoint.Object;
                        let pAdjoin0 = pPoint0.m_mAdjoinList.CreateData().Object;
                        let pAdjoin1 = pPoint1.m_mAdjoinList.CreateData().Object;
                        this.m_pTempAdjoin.push(pAdjoin0);
                        this.m_pTempAdjoin.push(pAdjoin1);
                        pAdjoin0.m_mAdjPoint = pPoint1.m_mHandle;
                        pAdjoin0.m_nLength = nLength0;
                        pAdjoin0.m_mEdge.Number = 0;
                        pAdjoin1.m_mAdjPoint = pPoint0.m_mHandle;
                        pAdjoin1.m_nLength = nLength1;
                        pAdjoin1.m_mEdge.Number = 0;
                    }
                    break;
                }
            }
        }
    }
    DelinkWorks() {
        if (this.m_pTempAdjoin != null) {
            for (let pAdjoin of this.m_pTempAdjoin) {
                pAdjoin.m_mHandle.Destroy();
            }
            this.m_pTempAdjoin = null;
        }
    }
    BindSiteData(pSite) {
        if (this.m_pSiteData != null) {
            for (let pData of this.m_pSiteData) {
                if (pData.roomID == pSite.m_pSerial) {
                    pSite.m_pName = pData.companyName;
                    pSite.m_pIconUrl = pData.iconUrl;
                    pSite.m_nIconType = pData.HyID;
                    return true;
                }
            }
        }
        return false;
    }
}
class LocateFilter {
    constructor() {
        this.m_mLastPos = null;
        this.m_mNextPos = null;
        this.m_nStep = 0;
        this.m_nStepCount = 90;
    }
    Filter(mPosition) {
        let pLayer = MiaokitDC.DC.GetWork(MiaokitDC.DC.m_nCurWork).m_pNavChartDC.m_pLayerMgr.m_pActiveLayer;
        let pNearEdge = pLayer.GetNearestEdge(mPosition, 10.0);
        let mCurPos = null;
        if (null != pNearEdge) {
            if (pNearEdge.Distance < Math.abs(pNearEdge.Offset0) && pNearEdge.Distance < Math.abs(pNearEdge.Offset1)) {
                mCurPos = Vector3.Add(pNearEdge.Edge.m_mLeftPoint.Object.m_mPosition, Vector3.Scale(pNearEdge.Offset0, pNearEdge.Vector));
            }
            else {
                if (Math.abs(pNearEdge.Offset0) < Math.abs(pNearEdge.Offset1)) {
                    mCurPos = Vector3.Add(mPosition, Vector3.Scale(-pNearEdge.Offset0, pNearEdge.Vector));
                }
                else {
                    mCurPos = Vector3.Add(mPosition, Vector3.Scale(-pNearEdge.Offset1, pNearEdge.Vector));
                }
            }
        }
        else {
            mCurPos = mPosition;
        }
        if (null == this.m_mLastPos && null == this.m_mNextPos) {
            this.m_mLastPos = mCurPos;
            this.m_mNextPos = mCurPos;
            this.m_nStep = 0;
        }
        else {
            this.m_mLastPos = Vector3.LerpVectors(this.m_mLastPos, this.m_mNextPos, 0.66);
            this.m_mNextPos = mCurPos;
            this.m_nStep = 0;
        }
    }
    Step() {
        if (null == this.m_mLastPos && null == this.m_mNextPos) {
            return null;
        }
        if (++this.m_nStep > this.m_nStepCount) {
            this.m_nStep = this.m_nStepCount;
        }
        return Vector3.LerpVectors(this.m_mLastPos, this.m_mNextPos, this.m_nStep / this.m_nStepCount);
    }
}
class NNavigation {
    constructor(aPath) {
        this.m_aPath = null;
        this.m_nCurPath = -1;
        this.m_nWayStart = 0;
        this.m_nWayEnd = 0;
        this.m_nWayStep = 0;
        this.m_nWayStepCount = 0;
        this.m_nStepSpeed = 20;
        this.m_nBackMark = 0;
        this.m_nFollowPathMark = 0;
        this.m_aPath = aPath;
        this.m_nCurPath = 0;
        this.m_nWayStart = 0;
        this.m_nWayEnd = 1;
        this.m_nWayStep = 0;
        this.m_nWayStepCount = 200;
    }
    Update() {
        let pLocation = null;
        if (NNavigation.g_pLocate) {
            pLocation = NNavigation.g_pLocate();
            for (let i = 0; i < this.m_aPath.length; i++) {
                if (pLocation.Work === this.m_aPath[i].m_nWork && pLocation.Layer === this.m_aPath[i].m_nLayer) {
                    pLocation.Path = i;
                    break;
                }
            }
            if (undefined === pLocation.Path) {
                NNavigation.ReNavigate();
                return;
            }
        }
        if (NNavigation.g_bLockPath) {
            if (pLocation) {
                if (-1 < pLocation.Path && pLocation.Path !== this.m_nCurPath) {
                    let pPath = this.m_aPath[pLocation.Path];
                    let pActiveLayer = ALinerDC.DC.m_pLayerMgr.m_pActiveLayer;
                    if (!(pActiveLayer.m_nWork === pPath.m_nWork && pActiveLayer.m_nIndex === pPath.m_nLayer)) {
                        this.ActiveSceneLayer(pLocation.Path);
                    }
                }
            }
            else {
                if (0 === this.m_nWayStart && 0 === this.m_nWayEnd) {
                    let nCurPath = this.m_nCurPath + 1;
                    if (-1 < nCurPath && this.m_aPath.length > nCurPath) {
                        NNavigation.g_nActiveLayerPath = nCurPath;
                        NNavigation.ng_nActiveLayerPath = NNavigation.g_nActiveLayerPath;
                        this.ActiveSceneLayer(nCurPath);
                    }
                    else {
                        return;
                    }
                }
            }
        }
        else {
            if (0 === this.m_nWayStart && 0 === this.m_nWayEnd) {
                let nCurPath = this.m_nCurPath + 1;
                if (-1 < nCurPath && this.m_aPath.length > nCurPath) {
                    NNavigation.g_nActiveLayerPath = nCurPath;
                    NNavigation.ng_nActiveLayerPath = NNavigation.g_nActiveLayerPath;
                    this.ActiveSceneLayer(nCurPath);
                }
                else {
                    return;
                }
            }
        }
        if (pLocation) {
            let pInfo = this.ProjectRealtimePos(pLocation);
            if ((pInfo.CurPath < this.m_nCurPath) || (pInfo.WayStart < this.m_nWayStart) || (pInfo.WayStep < this.m_nWayStep)) {
                this.m_nBackMark++;
            }
            else {
                this.m_nBackMark = 0;
            }
            if (this.m_nBackMark > 180 || this.m_nBackMark === 0) {
                this.m_nCurPath = pInfo.CurPath;
                this.m_nWayStart = pInfo.WayStart;
                this.m_nWayEnd = pInfo.WayEnd;
                this.m_nWayStep = pInfo.WayStep;
                this.m_nWayStepCount = pInfo.WayStepCount;
            }
            if (!this.CheckFollowPath(this.m_aPath[this.m_nCurPath].m_aPath, pLocation.Position, 3)) {
                console.info("重新规划路线");
                NNavigation.ReNavigate();
                return;
            }
        }
        if (0 > this.m_nCurPath || ((this.m_nCurPath != this.m_aPath.length - 1) && (0 === this.m_nWayStart && 0 === this.m_nWayEnd))) {
            return;
        }
        let pPath = this.m_aPath[this.m_nCurPath];
        let mCurPos = pPath.m_aPath[0];
        let pTipMessage = null;
        if (NNavigation.g_pLocate) {
            let nRate = this.m_nWayStepCount > 0 ? this.m_nWayStep / this.m_nWayStepCount : 0;
            mCurPos = Vector3.LerpVectors(pPath.m_aPath[this.m_nWayStart], pPath.m_aPath[this.m_nWayEnd], nRate);
            pTipMessage = this.TipMessageBuild(mCurPos, pPath);
        }
        else {
            let nRate = this.m_nWayStep++ / this.m_nWayStepCount;
            mCurPos = Vector3.LerpVectors(pPath.m_aPath[this.m_nWayStart], pPath.m_aPath[this.m_nWayEnd], nRate);
            pTipMessage = this.TipMessageBuild(mCurPos, pPath);
            if (this.m_nWayStep > this.m_nWayStepCount) {
                this.m_nWayStart++;
                this.m_nWayEnd++;
                if (NNavigation.m_goNext != null) {
                    NNavigation.m_goNext();
                }
                if (this.m_nWayEnd < pPath.m_aPath.length) {
                    this.m_nWayStep = 0;
                    this.m_nWayStepCount = Vector3.Distance(pPath.m_aPath[this.m_nWayStart], pPath.m_aPath[this.m_nWayEnd]) * this.m_nStepSpeed;
                }
                else {
                    if (NNavigation.g_bLockPath) {
                        if (this.m_nCurPath === this.m_aPath.length - 1) {
                            if (NNavigation.NavigateCancel) {
                                NNavigation.NavigateCancel();
                            }
                            if (MiaokitDC.DC.viewMode == 1) {
                                NNavigation.g_p2DmodelTo3D.status = true;
                            }
                            Engine.g_pInstance.FilterPOI(false, null, 0, null);
                            this.m_nWayStart = 0;
                            this.m_nWayEnd = 1;
                            this.m_nWayStep = 0;
                            this.m_nWayStepCount = Vector3.Distance(pPath.m_aPath[this.m_nWayStart], pPath.m_aPath[this.m_nWayEnd]) * this.m_nStepSpeed;
                        }
                        else {
                            this.m_nWayStart = 0;
                            this.m_nWayEnd = 0;
                            this.m_nWayStep = 0;
                            this.m_nWayStepCount = 0;
                        }
                    }
                    else {
                        this.m_nWayStart = 0;
                        this.m_nWayEnd = 1;
                        this.m_nWayStep = 0;
                        this.m_nWayStepCount = Vector3.Distance(pPath.m_aPath[this.m_nWayStart], pPath.m_aPath[this.m_nWayEnd]) * this.m_nStepSpeed;
                    }
                }
            }
        }
        let nLineWidth = Engine.g_pInstance.m_pCameraCtrl.LineWidth() * 0.5;
        let pConverter = function (mTarget) {
            return Engine.g_pInstance.m_pCameraCtrl.WorldToScreen(mTarget);
        };
        let pCanvas = Engine.g_pInstance.m_pCanvasContext;
        let mAnchor = null;
        if (this.m_nWayStart === 0 && this.m_nWayEnd === 0) {
            if (NNavigation.m_goNext != null) {
                NNavigation.m_goNext();
            }
            let nIndex = pPath.m_aPath.length - 2;
            mAnchor = this.ConvertAnchor(pPath.m_aPath, mCurPos, nIndex, nIndex + 1);
        }
        else {
            mAnchor = this.ConvertAnchor(pPath.m_aPath, mCurPos, this.m_nWayStart, this.m_nWayEnd);
        }
        this.Draw({
            Position: { x: mAnchor.x, y: mAnchor.y, z: mAnchor.z },
            Location: mCurPos,
            Angle: mAnchor.w
        }, nLineWidth, pConverter, pCanvas);
        if (NNavigation.g_bLockPath) {
            Engine.g_pInstance.FilterPOI(true, { x: mAnchor.x, y: mAnchor.y, z: mAnchor.z }, 10, null);
            Engine.g_pInstance.m_pCameraCtrl.ResetCamera({ x: mAnchor.x, y: 1.7, z: -mAnchor.z }, undefined, (-mAnchor.w / Math.PI * 180.0), undefined);
        }
    }
    CheckFollowPath(aPath, mPosition, nThreshold) {
        let bFollow = false;
        let mLastPos = aPath[0];
        for (let i = 1; i < aPath.length; i++) {
            let mCurPos = aPath[i];
            let vLine = Vector3.Normalize(Vector3.Sub(mCurPos, mLastPos));
            let vLineP = Vector3.Sub(mPosition, mLastPos);
            let nLenC = Vector3.Length(vLineP);
            nLenC *= nLenC;
            let nLenA = Vector3.Dot(vLineP, vLine);
            nLenA *= nLenA;
            let nDis = Math.sqrt(nLenC - nLenA);
            if (nDis < nThreshold) {
                let nOffset = Vector3.Dot(vLine, vLineP);
                if (nOffset > -nThreshold && nOffset < (Vector3.Distance(mLastPos, mCurPos) + nThreshold)) {
                    bFollow = true;
                    break;
                }
            }
            mLastPos = mCurPos;
        }
        if (bFollow) {
            this.m_nFollowPathMark = 0;
        }
        else {
            this.m_nFollowPathMark++;
        }
        if (this.m_nFollowPathMark > 180) {
            this.m_nFollowPathMark = 0;
            return false;
        }
        return true;
    }
    TipMessageBuild(mCurPos, pPath) {
        let cross = null;
        let distance = 0;
        let tipMessage = [];
        let voiceMessage = [];
        distance = Math.round(Vector3.Distance(mCurPos, pPath.m_aPath[this.m_nWayEnd]));
        let distanceDes = distance > 0 ? distance + "米" : "";
        if (this.m_nWayEnd < pPath.m_aPath.length - 1) {
            cross = Vector3.Cross(Vector3.Sub(pPath.m_aPath[this.m_nWayEnd], pPath.m_aPath[this.m_nWayEnd + 1]), Vector3.Sub(pPath.m_aPath[this.m_nWayStart], pPath.m_aPath[this.m_nWayEnd]));
            if (cross.y <= 0) {
                tipMessage = ["前方", distanceDes, "右转"];
            }
            else {
                tipMessage = ["前方", distanceDes, "左转"];
            }
        }
        else {
            if (this.m_nWayEnd == pPath.m_aPath.length - 1) {
                if (this.m_nCurPath < this.m_aPath.length - 1) {
                    var crossName = pPath.m_pEndPoint.m_mLandmark.Object.TypeName();
                    if (this.m_aPath[this.m_nCurPath + 1].m_nLayer == 0) {
                        tipMessage = [distanceDes, "从", crossName, "进入", "负1" + "层"];
                    }
                    else {
                        tipMessage = [distanceDes, "从", crossName, "进入", this.m_aPath[this.m_nCurPath + 1].m_nLayer.toString() + "层"];
                    }
                    if (NNavigation.hasReport.indexOf(pPath.m_aPath[this.m_nWayEnd]) === -1 && distance < 1.35 && NNavigation.TipVoice != null) {
                        console.log("动画类型:", pPath.m_pEndPoint.m_mLandmark.Object.m_nType);
                        switch (pPath.m_pEndPoint.m_mLandmark.Object.m_nType) {
                            case 0:
                                console.log("无设置动画，默认调用上楼梯");
                                Engine.g_pInstance.m_pMoviePost(0);
                                break;
                            case 1:
                                if (this.m_aPath[0].m_nLayer < this.m_aPath[1].m_nLayer) {
                                    Engine.g_pInstance.m_pMoviePost(0);
                                }
                                else {
                                    Engine.g_pInstance.m_pMoviePost(1);
                                }
                                break;
                            case 2:
                                if (this.m_aPath[0].m_nLayer < this.m_aPath[1].m_nLayer) {
                                    Engine.g_pInstance.m_pMoviePost(6);
                                }
                                else {
                                    Engine.g_pInstance.m_pMoviePost(7);
                                }
                                break;
                            case 3:
                                if (this.m_aPath[0].m_nLayer < this.m_aPath[1].m_nLayer) {
                                    Engine.g_pInstance.m_pMoviePost(4);
                                }
                                else {
                                    Engine.g_pInstance.m_pMoviePost(5);
                                }
                                break;
                            case 5:
                                Engine.g_pInstance.m_pMoviePost(3);
                                break;
                            case 6:
                                Engine.g_pInstance.m_pMoviePost(2);
                                break;
                            case 7:
                                break;
                            default:
                                break;
                        }
                    }
                }
                else
                    tipMessage = ["前方", distanceDes, "抵达终点"];
            }
        }
        if (NNavigation.hasReport.indexOf(pPath.m_aPath[this.m_nWayEnd]) === -1) {
            if (distance < 1.35) {
                NNavigation.hasReport.push(pPath.m_aPath[this.m_nWayEnd]);
                if (tipMessage[2] != "左转" && tipMessage[2] != "右转") {
                    voiceMessage = tipMessage.slice(-3);
                }
                else {
                    voiceMessage[0] = tipMessage[2];
                }
            }
        }
        if (NNavigation.TipMessage != null && tipMessage.length > 0) {
            NNavigation.TipMessage(tipMessage);
        }
        if (NNavigation.TipVoice != null && voiceMessage.length > 0) {
            NNavigation.TipVoice(voiceMessage);
        }
        return tipMessage;
    }
    NavigateEnd() {
        if (NNavigation.g_bLockPath) {
            this.FreeLock();
        }
        Engine.g_pInstance.FilterPOI(false, { x: 0, y: 0, z: 0 }, 1000, null);
        if (NNavigation.NavigateCancel != null) {
            NNavigation.NavigateCancel();
        }
        console.log("导航结束");
    }
    FreeLock() {
        let pView = MiaokitDC.DC.GetWork(MiaokitDC.DC.m_nCurWork).m_pEyejiaDC.m_pLayerMgr.m_pActiveLayer.m_pViewState;
        Engine.g_pInstance.m_pCameraCtrl.Flyto(pView);
    }
    ActiveSceneLayer(nPath) {
        let pPath = this.m_aPath[nPath];
        Engine.g_pInstance.project.SwitchWorkForIndex(pPath.m_nWork);
        Engine.g_pInstance.project.ActiveFloor(pPath.m_nLayer);
    }
    OnSceneLayerActive(nWork, nLayer) {
        for (let i = 0; i < this.m_aPath.length; i++) {
            let pPath = this.m_aPath[i];
            if (pPath.m_nWork === nWork && pPath.m_nLayer === Number(nLayer)) {
                if ((NNavigation.g_nActiveLayerPath === undefined || (NNavigation.g_nActiveLayerPath === i)) && this.m_nCurPath !== i) {
                    this.m_nCurPath = i;
                    this.m_nWayStart = 0;
                    this.m_nWayEnd = 0;
                    this.m_nWayStep = 0;
                    this.m_nWayStepCount = 0;
                    if (!NNavigation.g_pLocate) {
                        this.m_nWayEnd = pPath.m_aPath.length > 1 ? 1 : 0;
                        this.m_nWayStepCount = Vector3.Distance(pPath.m_aPath[this.m_nWayStart], pPath.m_aPath[this.m_nWayEnd]) * this.m_nStepSpeed;
                    }
                    NNavigation.g_nActiveLayerPath = undefined;
                    break;
                }
            }
        }
    }
    ConvertAnchor(aPoint, mWayPos, nWayStart, nWayEnd) {
        let mWayVector = Vector3.Sub(aPoint[nWayEnd], aPoint[nWayStart]);
        let mWayPassVector = Vector3.Sub(mWayPos, aPoint[nWayStart]);
        let nWayLength = Vector3.Length(mWayVector);
        let nWayPassLength = Vector3.Length(mWayPassVector);
        let nLeftOffset = 0.5;
        let nRightOffset = 0.5;
        let nPassOffset = Mathf.Clamp(nWayPassLength / nWayLength, 0.0, 1.0);
        if (2.2 < nWayLength) {
            nLeftOffset = 1 / nWayLength;
            nRightOffset = 1 - nLeftOffset;
        }
        if (0 === nWayStart) {
            nLeftOffset = 0;
        }
        if ((aPoint.length - 1) === nWayEnd) {
            nRightOffset = 1;
        }
        let mPosition = Vector3.Clone(mWayPos);
        let mDirection = Vector3.Normalize(mWayVector);
        let nFactor = 0.5;
        let aCtrlPoint = [];
        if (nPassOffset < nLeftOffset) {
            let mLastWayVector = Vector3.Sub(aPoint[nWayStart], aPoint[nWayStart - 1]);
            let nLastWayLength = Vector3.Length(mLastWayVector);
            let nLastCurveLength = nLastWayLength * 0.5;
            if (2.2 < nLastWayLength) {
                nLastCurveLength = 1.0;
            }
            let nTotalCurveLength = nLeftOffset * nWayLength + nLastCurveLength;
            let mCtrl0 = Vector3.Add(aPoint[nWayStart], Vector3.Scale(-nLastCurveLength, Vector3.Normalize(mLastWayVector)));
            let mCtrl2 = Vector3.LerpVectors(aPoint[nWayStart], aPoint[nWayEnd], nLeftOffset);
            nFactor = (nLastCurveLength + nWayPassLength) / nTotalCurveLength;
            aCtrlPoint.push(mCtrl0);
            aCtrlPoint.push(aPoint[nWayStart]);
            aCtrlPoint.push(mCtrl2);
        }
        else if (nPassOffset > nRightOffset) {
            let mNextWayVector = Vector3.Sub(aPoint[nWayEnd + 1], aPoint[nWayEnd]);
            let nNextWayLength = Vector3.Length(mNextWayVector);
            let nNextCurveLength = nNextWayLength * 0.5;
            if (2.2 < nNextWayLength) {
                nNextCurveLength = 1.0;
            }
            let nTotalCurveLength = (1.0 - nRightOffset) * nWayLength + nNextCurveLength;
            let mCtrl0 = Vector3.LerpVectors(aPoint[nWayStart], aPoint[nWayEnd], nRightOffset);
            let mCtrl2 = Vector3.Add(aPoint[nWayEnd], Vector3.Scale(nNextCurveLength, Vector3.Normalize(mNextWayVector)));
            nFactor = (nPassOffset - nRightOffset) * nWayLength / nTotalCurveLength;
            aCtrlPoint.push(mCtrl0);
            aCtrlPoint.push(aPoint[nWayEnd]);
            aCtrlPoint.push(mCtrl2);
        }
        if (0 < aCtrlPoint.length) {
            let t = nFactor;
            let nt = 1.0 - t;
            let f0 = nt * nt;
            let f1 = 2.0 * t * nt;
            let f2 = t * t;
            mPosition.x = (f0 * aCtrlPoint[0].x) + (f1 * aCtrlPoint[1].x) + (f2 * aCtrlPoint[2].x);
            mPosition.z = (f0 * aCtrlPoint[0].z) + (f1 * aCtrlPoint[1].z) + (f2 * aCtrlPoint[2].z);
            let mDirection0 = Vector3.Normalize(Vector3.Sub(aCtrlPoint[1], aCtrlPoint[0]));
            let mDirection2 = Vector3.Normalize(Vector3.Sub(aCtrlPoint[2], aCtrlPoint[1]));
            mDirection = Vector3.Normalize(Vector3.LerpVectors(mDirection0, mDirection2, t));
        }
        let mRight = new Vector3(0.0, 0.0, 1.0);
        let nYaw = Vector3.AngleTo(mDirection, mRight);
        if (Vector3.Cross(mRight, mDirection).y > 0.0) {
            nYaw = -nYaw;
        }
        return new Vector4(mPosition.x, mPosition.y, mPosition.z, nYaw);
    }
    Draw(pLocation, nLineWidth, pConverter, pCanvas) {
        let pActivePath = this.m_aPath[this.m_nCurPath];
        let mLastPos = null;
        for (let nPath = 0; nPath < this.m_aPath.length; nPath++) {
            let pPath = this.m_aPath[nPath];
            if (pPath.m_nWork == pActivePath.m_nWork && 1 < pPath.m_aPath.length) {
                if (nPath == this.m_nCurPath) {
                    if (pActivePath.m_nLayer == ALinerDC.DC.m_pLayerMgr.m_pActiveLayer.m_nIndex) {
                        mLastPos = this.DrawPath(mLastPos, pPath.m_aPath, nLineWidth, pConverter, pCanvas);
                    }
                }
                else {
                    if (ALinerDC.g_bStackUp) {
                        let nHeight = ALinerDC.DC.m_pLayerMgr.GetLayer(pPath.m_nLayer).m_pLayerRoot.position.y;
                        let pNewConverter = function (mPos) {
                            return pConverter({ x: mPos.x, y: nHeight, z: mPos.z });
                        };
                        mLastPos = this.DrawPath(mLastPos, pPath.m_aPath, nLineWidth, pNewConverter, pCanvas);
                    }
                }
            }
        }
        if (pActivePath.m_nLayer == ALinerDC.DC.m_pLayerMgr.m_pActiveLayer.m_nIndex) {
            if (NNavigation.g_bLockPath) {
                NNavigation.DrawAnchor(pLocation.Position, pLocation.Location, nLineWidth, 0, pConverter, pCanvas);
            }
            else {
                NNavigation.DrawAnchor(pLocation.Position, pLocation.Location, nLineWidth, pLocation.Angle, pConverter, pCanvas);
            }
        }
    }
    DrawPath(mLastPoint, aPoint, nLineWidth, pConverter, pCanvas) {
        let nPointIndex = 0;
        let nPointCount = aPoint.length;
        let nCurveCount = nPointCount - 2;
        let mScreenPos = pConverter(aPoint[0]);
        let aPath = [];
        pCanvas.beginPath();
        if (mLastPoint) {
            pCanvas.moveTo(mLastPoint.x, mLastPoint.y);
            pCanvas.lineTo(mLastPoint.x, mLastPoint.y);
            aPath.push(mLastPoint);
            pCanvas.lineTo(mScreenPos.x, mScreenPos.y);
            aPath.push(mScreenPos);
        }
        else {
            pCanvas.moveTo(mScreenPos.x, mScreenPos.y);
        }
        if (2 === nPointCount) {
            mScreenPos = pConverter(aPoint[1]);
            pCanvas.lineTo(mScreenPos.x, mScreenPos.y);
            aPath.push(mScreenPos);
        }
        while (nPointIndex < nCurveCount) {
            let mPoint0 = aPoint[nPointIndex];
            let mPoint1 = aPoint[nPointIndex + 1];
            let mPoint2 = aPoint[nPointIndex + 2];
            let mVector0 = Vector3.Sub(mPoint1, mPoint0);
            let mVector2 = Vector3.Sub(mPoint2, mPoint1);
            let mCtrl0 = Vector3.LerpVectors(mPoint0, mPoint1, 0.5);
            let mCtrl1 = Vector3.Clone(mPoint1);
            let mCtrl2 = Vector3.LerpVectors(mPoint1, mPoint2, 0.5);
            let nLength0 = Vector3.Length(mVector0);
            let nLength2 = Vector3.Length(mVector2);
            if (2.2 < nLength0) {
                mCtrl0 = Vector3.LerpVectors(mPoint1, mPoint0, 1 / nLength0);
            }
            if (2.2 < nLength2) {
                mCtrl2 = Vector3.LerpVectors(mPoint1, mPoint2, 1 / nLength2);
            }
            let aSurplus0 = [];
            let aSurplus2 = [];
            if (0 == nPointIndex || 2.2 < nLength0) {
                if (0 == nPointIndex) {
                    aSurplus0.push(mPoint0);
                    aSurplus0.push(mCtrl0);
                }
                else {
                    aSurplus0.push(Vector3.LerpVectors(mPoint0, mPoint1, 1 / nLength0));
                    aSurplus0.push(mCtrl0);
                }
            }
            if ((nCurveCount - 1) == nPointIndex || 2.2 < nLength2) {
                if ((nCurveCount - 1) == nPointIndex) {
                    aSurplus2.push(mCtrl2);
                    aSurplus2.push(mPoint2);
                }
            }
            if (2 === aSurplus0.length) {
                mScreenPos = pConverter(aSurplus0[0]);
                aPath.push(mScreenPos);
                pCanvas.lineTo(mScreenPos.x, mScreenPos.y);
                mScreenPos = pConverter(aSurplus0[1]);
                aPath.push(mScreenPos);
                pCanvas.lineTo(mScreenPos.x, mScreenPos.y);
            }
            let t = 0.0;
            while (t <= 1.0) {
                let nt = 1.0 - t;
                let f0 = nt * nt;
                let f1 = 2.0 * t * nt;
                let f2 = t * t;
                let x = (f0 * mCtrl0.x) + (f1 * mCtrl1.x) + (f2 * mCtrl2.x);
                let z = (f0 * mCtrl0.z) + (f1 * mCtrl1.z) + (f2 * mCtrl2.z);
                mScreenPos = pConverter({ x: x, y: mCtrl1.y, z: z });
                aPath.push(mScreenPos);
                pCanvas.lineTo(mScreenPos.x, mScreenPos.y);
                t += 0.2;
            }
            if (2 === aSurplus2.length) {
                mScreenPos = pConverter(aSurplus2[0]);
                aPath.push(mScreenPos);
                pCanvas.lineTo(mScreenPos.x, mScreenPos.y);
                mScreenPos = pConverter(aSurplus2[1]);
                aPath.push(mScreenPos);
                pCanvas.lineTo(mScreenPos.x, mScreenPos.y);
            }
            nPointIndex++;
        }
        pCanvas.lineWidth = nLineWidth;
        pCanvas.strokeStyle = "#13C768";
        pCanvas.stroke();
        pCanvas.closePath();
        let mLastPos = aPath[0];
        let nOffset = 0;
        for (let i = 1; i < aPath.length; i++) {
            let mCurPos = aPath[i];
            mLastPos = mCurPos;
        }
        return mLastPos;
    }
    DrawArrows(mBeg, mEnd, nOffset, nLineWidth, pCanvas) {
        if (0.0 > nOffset) {
            let mExtend = new THREE.Vector3().subVectors(mEnd, mBeg).normalize().multiplyScalar(nOffset);
            mBeg.add(mExtend);
            nOffset = 0;
        }
        let nArrowLength = nLineWidth;
        let nHalfLength = nLineWidth * 0.5;
        let mLine = new THREE.Vector3().subVectors(mEnd, mBeg);
        let nLineLength = mLine.length();
        let nSegCount = (nLineLength - nOffset) / nArrowLength;
        let nCount = Math.floor(nSegCount);
        let mNormal = new THREE.Vector3(0.0, 0.0, 1.0).cross(mLine).normalize().multiplyScalar(nHalfLength);
        let mBeg0 = new THREE.Vector3().addVectors(mBeg, mNormal);
        let mEnd0 = new THREE.Vector3().addVectors(mEnd, mNormal);
        let mBeg1 = new THREE.Vector3().subVectors(mBeg, mNormal);
        let mEnd1 = new THREE.Vector3().subVectors(mEnd, mNormal);
        for (let i = 0; i < nCount; i += 2) {
            let p0 = new THREE.Vector3().lerpVectors(mBeg, mEnd, (nOffset + nHalfLength) / nLineLength);
            let p1 = new THREE.Vector3().lerpVectors(mBeg0, mEnd0, (nOffset + 0.0) / nLineLength);
            let p2 = new THREE.Vector3().lerpVectors(mBeg0, mEnd0, (nOffset + nArrowLength) / nLineLength);
            let p3 = new THREE.Vector3().lerpVectors(mBeg, mEnd, (nOffset + nArrowLength + nHalfLength) / nLineLength);
            let p4 = new THREE.Vector3().lerpVectors(mBeg1, mEnd1, (nOffset + nArrowLength) / nLineLength);
            let p5 = new THREE.Vector3().lerpVectors(mBeg1, mEnd1, (nOffset + 0.0) / nLineLength);
            nOffset += nArrowLength * 2;
            pCanvas.beginPath();
            pCanvas.moveTo(p0.x, p0.y);
            pCanvas.lineTo(p1.x, p1.y);
            pCanvas.lineTo(p2.x, p2.y);
            pCanvas.lineTo(p3.x, p3.y);
            pCanvas.lineTo(p4.x, p4.y);
            pCanvas.lineTo(p5.x, p5.y);
            pCanvas.closePath();
            pCanvas.fillStyle = "#ffffff";
            pCanvas.fill();
        }
        if (0 !== (nCount % 2)) {
            nOffset = (1.0 - (nSegCount - nCount)) * nArrowLength;
        }
        else {
            nOffset = (nSegCount - nCount) * -nArrowLength;
        }
        return nOffset;
    }
    static DrawAnchor(mPosition, mBiasPosition, nRadius, nAngle, pConverter, pCanvas) {
        let radius0 = nRadius;
        let radius1 = nRadius + 2;
        let radius2 = nRadius + 16;
        let rad = nAngle;
        let cutRad = 0;
        if (!NNavigation.g_bLockPath) {
            let nHRotated = Engine.g_pInstance.m_pCameraCtrl.m_nHRotate;
            cutRad = nHRotated * Math.PI / 180;
        }
        rad -= cutRad;
        let x1 = -Math.sin(rad) * radius0;
        let y1 = Math.cos(rad) * radius0;
        rad += 0.6667 * Math.PI;
        let x2 = -Math.sin(rad) * radius0;
        let y2 = Math.cos(rad) * radius0;
        rad += 0.6667 * Math.PI;
        let x3 = -Math.sin(rad) * radius0;
        let y3 = Math.cos(rad) * radius0;
        let centre = pConverter(mPosition);
        let pos = { x: centre.x, y: centre.y, z: centre.z };
        let pos1 = { x: pos.x + x1, y: pos.y - y1 };
        let pos2 = { x: pos.x + x2, y: pos.y - y2 };
        let pos3 = { x: pos.x + x3, y: pos.y - y3 };
        pos.y -= nRadius * 0.2;
        let outline = pConverter(mBiasPosition);
        let radius = Vector3.Distance(centre, outline);
        radius = Mathf.Clamp(radius, radius1, 128);
        let gradient = pCanvas.createRadialGradient(centre.x, centre.y, radius1, centre.x, centre.y, radius2);
        gradient.addColorStop(0, 'rgba(41,193,232,0.7)');
        gradient.addColorStop(1, 'rgba(102,211,238,0)');
        pCanvas.beginPath();
        pCanvas.arc(centre.x, centre.y, radius2, 0, 2 * Math.PI, true);
        pCanvas.closePath();
        pCanvas.fillStyle = gradient;
        pCanvas.fill();
        pCanvas.beginPath();
        pCanvas.arc(outline.x, outline.y, 4, 0, 2 * Math.PI, true);
        pCanvas.closePath();
        pCanvas.fillStyle = "#ff0000";
        pCanvas.fill();
        pCanvas.beginPath();
        pCanvas.arc(centre.x, centre.y, radius1, 0, 2 * Math.PI, true);
        pCanvas.closePath();
        pCanvas.fillStyle = "#ffffff";
        pCanvas.fill();
        pCanvas.beginPath();
        pCanvas.moveTo(pos.x, pos.y);
        pCanvas.lineTo(pos1.x, pos1.y);
        pCanvas.lineTo(pos3.x, pos3.y);
        pCanvas.lineTo(pos.x, pos.y);
        pCanvas.closePath();
        pCanvas.lineWidth = 1;
        pCanvas.fillStyle = "#0080ff";
        pCanvas.fill();
        pCanvas.strokeStyle = '#ffffff';
        pCanvas.stroke();
        pCanvas.beginPath();
        pCanvas.moveTo(pos.x, pos.y);
        pCanvas.lineTo(pos1.x, pos1.y);
        pCanvas.lineTo(pos2.x, pos2.y);
        pCanvas.lineTo(pos.x, pos.y);
        pCanvas.closePath();
        pCanvas.lineWidth = 1;
        pCanvas.fillStyle = "#00b0ff";
        pCanvas.fill();
        pCanvas.strokeStyle = '#ffffff';
        pCanvas.stroke();
        pCanvas.beginPath();
        pCanvas.arc(centre.x, centre.y, (radius < radius1 ? radius1 : radius), 0, 2 * Math.PI, true);
        pCanvas.closePath();
        pCanvas.strokeStyle = "#00e0ff";
        pCanvas.stroke();
    }
    ProjectRealtimePos(pLocation) {
        let nCurPath = pLocation.Path > -1 ? pLocation.Path : -1;
        let nWayStart = 0;
        let nWayEnd = 0;
        let nWayStep = 0;
        let nWayStepCount = 0;
        if (-1 < nCurPath) {
            {
                let outline = Engine.g_pInstance.m_pCameraCtrl.WorldToScenePos(pLocation.Position);
                Engine.g_pInstance.m_pCanvasContext.beginPath();
                Engine.g_pInstance.m_pCanvasContext.arc(outline.x, outline.y, 24, 0, 2 * Math.PI, true);
                Engine.g_pInstance.m_pCanvasContext.closePath();
                Engine.g_pInstance.m_pCanvasContext.fillStyle = "#ff0000";
                Engine.g_pInstance.m_pCanvasContext.fill();
            }
            let aPoint = this.m_aPath[nCurPath].m_aPath;
            let nMinDis = 3.0;
            let nMinProj = 0;
            let mLeft = aPoint[0];
            for (let i = 1; i < aPoint.length; i++) {
                let mRight = aPoint[i];
                let vLine = Vector3.Normalize(Vector3.Sub(mRight, mLeft));
                let vLineP = Vector3.Sub(pLocation.Position, mLeft);
                let nLenC = Vector3.Length(vLineP);
                nLenC *= nLenC;
                let nLenA = Vector3.Dot(vLineP, vLine);
                nLenA *= nLenA;
                let nDis = Math.sqrt(nLenC - nLenA);
                if (nDis < 0.001) {
                    nDis = 0.001;
                }
                if (nDis < nMinDis) {
                    let nProj = Vector3.Dot(vLine, vLineP);
                    if (nProj > -nDis && nProj < (Vector3.Distance(mLeft, mRight) + nDis)) {
                        nMinDis = nDis;
                        nWayStart = i - 1;
                        nWayEnd = i;
                        nMinProj = nProj;
                    }
                }
                mLeft = mRight;
            }
            if (nWayEnd > 0) {
                let nLength = Vector3.Distance(aPoint[nWayStart], aPoint[nWayEnd]);
                nWayStepCount = nLength * this.m_nStepSpeed;
                nWayStep = Mathf.Clamp(nMinProj / nLength, 0, 1) * nWayStepCount;
            }
        }
        return {
            CurPath: nCurPath,
            WayStart: nWayStart,
            WayEnd: nWayEnd,
            WayStep: nWayStep,
            WayStepCount: nWayStepCount
        };
    }
    static CreateNavigation(aPath) {
        if (null != aPath && 0 < aPath.length) {
            let aNewPath = [];
            if (NNavigation.g_pCurLocation != null) {
                aPath[0].m_aPath.unshift(NNavigation.g_pCurLocation.Position);
            }
            for (var item of aPath) {
                let temp = new NPath();
                temp.m_nDistance = item.m_nDistance;
                temp.m_nLayer = item.m_nLayer;
                temp.m_nWork = item.m_nWork;
                temp.m_pEndPoint = item.m_pEndPoint;
                temp.m_pLayerName = item.m_pLayerName;
                temp.m_pPathPassage = item.m_pPathPassage;
                temp.m_pStartPoint = item.m_pStartPoint;
                temp.m_aPath = [];
                for (var i = 0; i < item.m_aPath.length; i++) {
                    if (i === 0 || i === item.m_aPath.length - 1)
                        temp.m_aPath.push(item.m_aPath[i]);
                    if (i < item.m_aPath.length - 2) {
                        if (Math.abs(Vector3.AngleTo(Vector3.Sub(item.m_aPath[i], item.m_aPath[i + 1]), Vector3.Sub(item.m_aPath[i + 1], item.m_aPath[i + 2]))) > 0.1) {
                            if (Vector3.Cross(Vector3.Sub(item.m_aPath[i], item.m_aPath[i + 1]), Vector3.Sub(item.m_aPath[i + 1], item.m_aPath[i + 2])).y === 0)
                                continue;
                            else {
                                temp.m_aPath.push(item.m_aPath[i + 1]);
                            }
                        }
                    }
                }
                aNewPath.push(temp);
            }
            return new NNavigation(aNewPath);
        }
        return null;
    }
    static CanvasDraw() {
        for (let pNavigation of NNavigation.g_pActiveList) {
            pNavigation.Update();
        }
        if (NNavigation.g_pActiveList.length < 1 && NNavigation.g_pLocate && NNavigation.g_bLockPath) {
            let pLocation = NNavigation.g_pLocate();
            let pActiveLayer = ALinerDC.DC.m_pLayerMgr.m_pActiveLayer;
            if (pLocation && pActiveLayer) {
                if (!(pActiveLayer.m_nWork === pLocation.Work && pActiveLayer.m_nIndex === pLocation.Layer)) {
                    Engine.g_pInstance.project.SwitchWorkForIndex(pLocation.Work);
                    Engine.g_pInstance.project.ActiveFloor(pLocation.Layer);
                }
                Engine.g_pInstance.m_pCameraCtrl.ResetCamera({ x: pLocation.Position.x, y: 0, z: -pLocation.Position.z }, undefined, Engine.g_pInstance.m_nRealCompass, undefined);
                let pConverter = function (mTarget) {
                    return Engine.g_pInstance.m_pCameraCtrl.WorldToScenePos(mTarget);
                };
                NNavigation.DrawAnchor(pLocation.Position, pLocation.Position, Engine.g_pInstance.m_pCameraCtrl.LineWidth() * 0.5, 0, pConverter, Engine.g_pInstance.m_pCanvasContext);
            }
        }
    }
    static SceneLayerAction(nWork, nLayer) {
        for (let pNavigation of NNavigation.g_pActiveList) {
            pNavigation.OnSceneLayerActive(nWork, nLayer);
        }
    }
    static ClearAllPath() {
        for (let pNavigation of NNavigation.g_pActiveList) {
            pNavigation.NavigateEnd();
        }
        if (MiaokitDC.DC.viewMode == 1) {
            NNavigation.g_p2DmodelTo3D.status = true;
        }
        NNavigation.g_pActiveList = [];
    }
    static UpdateLocation(nWork, nLayer, mPosition) {
        NNavigation.g_pCurLocation = {
            Work: nWork,
            Layer: nLayer,
            Position: mPosition,
        };
        NNavigation.g_pFilter.Filter(NNavigation.g_pCurLocation.Position);
    }
    static EnableLocate(bEnable) {
        if (bEnable) {
            NNavigation.g_pLocate = function () {
                if (NNavigation.g_pCurLocation != null) {
                    NNavigation.g_pCurLocation.Position = NNavigation.g_pFilter.Step();
                }
                return NNavigation.g_pCurLocation;
            };
        }
        else {
            NNavigation.g_pLocate = null;
            NNavigation.g_pCurLocation = null;
        }
    }
    static LockCameraToPath(bLock) {
        if (NNavigation.g_bLockPath !== bLock) {
            NNavigation.g_bLockPath = bLock;
            if (!bLock && MiaokitDC.DC.viewMode != 1) {
                Engine.g_pInstance.m_pCameraCtrl.Flyto(null);
            }
        }
    }
}
NNavigation.hasReport = [];
NNavigation.g_pActiveList = [];
NNavigation.g_pLocate = null;
NNavigation.NavigateCancel = null;
NNavigation.ReNavigate = null;
NNavigation.TipMessage = null;
NNavigation.TipVoice = null;
NNavigation.g_pFilter = new LocateFilter();
NNavigation.g_bLockPath = true;
NNavigation.g_pCurLocation = null;
NNavigation.g_endPosition = null;
NNavigation.g_nActiveLayerPath = undefined;
NNavigation.ng_nActiveLayerPath = undefined;
NNavigation.m_goNext = null;
NNavigation.g_p2DmodelTo3D = {
    status: false,
    count: 0
};
class NPath {
    constructor() {
        this.m_aPath = null;
        this.m_pStartPoint = null;
        this.m_pEndPoint = null;
        this.m_nDistance = 0;
        this.m_pPathPassage = [];
    }
}
class PathPassage {
    constructor() {
        this.m_nDistan = 0;
        this.m_pNextAngle = 0;
    }
}
