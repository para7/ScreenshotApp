'use strict';

if (typeof ScreenShotApp === "undefined") {
    var ScreenShotApp = {};
}

if (typeof ScreenShotApp.path === "undefined") {
    ScreenShotApp.path = {};
}

const path = require("path");
const fs = require('fs');

// https://qiita.com/potato4d/items/7131028497de53ceb48e
const userHome = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];

ScreenShotApp.path.screenshotsJson = path.join(userHome, "Documents/ScreenshotsApp/ScreenshotsInfo.json");
ScreenShotApp.path.tagJson = path.join(userHome, "Documents/ScreenshotsApp/TagInfo.json");

let doc = path.join(userHome, "Documents/ScreenshotsApp");

if (!fs.existsSync(doc)) {
    fs.mkdirSync(doc);
}

//スクショJSON初期化
if (!fs.existsSync(ScreenShotApp.path.screenshotsJson)) {
    const ar = new Array();
    Utils.SaveJson(ScreenShotApp.path.screenshotsJson, ar);
}

//タグJSON初期化
if (!fs.existsSync(ScreenShotApp.path.tagJson)) {
    const ar = new Array();
    Utils.SaveJson(ScreenShotApp.path.tagJson, ar);
}