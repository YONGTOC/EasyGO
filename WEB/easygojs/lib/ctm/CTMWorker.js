/*jslint browser: true*/
/*jslint indent: 4 */
/*jslint todo: true */
/*global CTM,importScripts,self,Uint8Array,Blob, dump*/
"use strict";
importScripts("lzma.js", "ctm.js");

var s3wbMagicNumber = "3MXBO";
var s3wbMagicNumberSize = 5;

self.onmessage = function (event) {
    var squaredX, squaredY, squaredZ, files, fileTypes, fileIDs, stream, fileDataSize, fileData, jsonFileData, nodeIndex, resourceIndex, i, imgByte, iByte, foundNode;

    files = [];
    fileTypes = [];
    fileIDs = [];
    fileData = '';
    stream = new CTM.Stream(event.data.data);
    for (i = 0; i < s3wbMagicNumberSize; i += 1) {
        fileData += String.fromCharCode(stream.data[i]);
    }
    if (s3wbMagicNumber !== fileData) {
        self.postMessage({});
    } else {
        stream.offset += s3wbMagicNumberSize;

        //var fileData = stream.readString();//this is out of memory for very big strings
        //TO DO: this is not very fast. Find a different way?
        fileDataSize = stream.readInt32();
        stream.offset += fileDataSize;
        fileData = '';
        for (i = stream.offset - fileDataSize; i < stream.offset; i += 1) {
            fileData += String.fromCharCode(stream.data[i]);
        }
        jsonFileData = JSON.parse(fileData);

        for (i = 0; i < jsonFileData.resources.length; i += 1) {
            if (jsonFileData.resources[i].type === "geometryBuffer") {
                files[i] = new CTM.File(stream);
                fileTypes[i] = 0;
                fileIDs[i] = jsonFileData.resources[i].id;

                files[i].header.comment = "{";
                if (jsonFileData.resources[i].texture) {
                    files[i].header.comment += "\"texture\":\"" + jsonFileData.resources[i].texture + "\",";
                }
                if (jsonFileData.resources[i].bbMin && jsonFileData.resources[i].bbMax) {
                    files[i].header.comment += "\"sphere_center\":[" + 0.5 * (parseFloat(jsonFileData.resources[i].bbMin[0]) + parseFloat(jsonFileData.resources[i].bbMax[0])) + ",";
                    files[i].header.comment += 0.5 * (parseFloat(jsonFileData.resources[i].bbMin[1]) + parseFloat(jsonFileData.resources[i].bbMax[1])) + ",";
                    files[i].header.comment += 0.5 * (parseFloat(jsonFileData.resources[i].bbMin[2]) + parseFloat(jsonFileData.resources[i].bbMax[2]));
                    files[i].header.comment += "],";

                    squaredX = (parseFloat(jsonFileData.resources[i].bbMax[0]) - parseFloat(jsonFileData.resources[i].bbMin[0]));
                    squaredX = squaredX * squaredX;
                    squaredY = (parseFloat(jsonFileData.resources[i].bbMax[1]) - parseFloat(jsonFileData.resources[i].bbMin[1]));
                    squaredY = squaredY * squaredY;
                    squaredZ = (parseFloat(jsonFileData.resources[i].bbMax[2]) - parseFloat(jsonFileData.resources[i].bbMin[2]));
                    squaredZ = squaredZ * squaredZ;

                    files[i].header.comment += "\"sphere_radius\":\"" + 0.5 * Math.sqrt(squaredX + squaredY + squaredZ) + "\",";
                }
                //search for node
                foundNode = false;
                for (nodeIndex = 0; nodeIndex < jsonFileData.nodes.length; nodeIndex  += 1) {
                    for (resourceIndex = 0; resourceIndex < jsonFileData.nodes[nodeIndex].resources.length; resourceIndex  += 1) {
                        if (jsonFileData.nodes[nodeIndex].resources[resourceIndex] === jsonFileData.resources[i].id) {
                            if (!foundNode) {
                                files[i].header.comment += "\"node\":\"" + jsonFileData.nodes[nodeIndex].id + "\"";
                                foundNode = true;
                                break;
                            }
                        }
                    }
                }
                files[i].header.comment += "}";
            } else if (jsonFileData.resources[i].type === "textureBuffer") {/**image*/
                //stream.offset = offset;
                //offset += jsonFileData.resources[i].size;
                imgByte = new Uint8Array(jsonFileData.resources[i].size);
                for (iByte = 0; iByte < jsonFileData.resources[i].size; iByte += 1) {
                    imgByte[iByte] = stream.readByte();
                }

                files[i] = new Blob([imgByte], {type : 'image/jpeg'});
                fileTypes[i] = 1;
                fileIDs[i] = jsonFileData.resources[i].id;
            }
        }

        self.postMessage({ "files": files, "fileTypes": fileTypes, "fileNames": fileIDs, "nodeData": jsonFileData.nodes });
    }
    //self.close();
};

self.onerror =  function (error) {
    /** 
     * CTMLoader deals with worker error
     */
    dump("Worker error: " + error.message + "\n");
    //self.postMessage({ "error": error.message});
    //throw error;        
};

