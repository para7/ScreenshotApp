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

let doc = path.join(userHome, "Documents/ScreenshotsApp");

if (!fs.existsSync(doc)) {
    console.log("mkdir");
    fs.mkdirSync(doc);
}

// if (typeof ShotJson === 'undefined') {
//     var ShotJson = {};
// }

// // JavaScriptのクラスって意味あるか？
// class ImageData {

//     constructor() {
//         this.text = "";
//         this.tags = [];
//         this.filepath = "";
//     }
// }

// //仮データのセット
// ShotJson.makedata = function() {
//     let imagedata = new ImageData();
//     let tags = [ "ミリシタ", "七尾百合子" ];

//     const basepath = "./data/ミリシタ/"

//     imagedata.text = "いいですか、プロデューサーさん？もし私が何か変なことしてたら注意してくださいね？ねっ？";
//     imagedata.tags = tags;
//     imagedata.filepath = basepath + "写真 2018-12-17 16 28 32.png";
//     ScreenShotApp.screenShotsData.push(imagedata);

//     imagedata = new ImageData();
//     imagedata.text = "きっとこの衣装は、魔法図書館に入る鍵なんです。扉はこのメガネをかけないと見えなくて…！";
//     imagedata.tags = tags;
//     imagedata.filepath = basepath + "写真 2018-12-05 9 23 40.png";
//     ScreenShotApp.screenShotsData.push(imagedata);

//     imagedata = new ImageData();
//     imagedata.text = "本当ですか!?ありがとうございます!これで私の人生に、楽しみがひとつ増えますね♪";
//     imagedata.tags = tags;
//     imagedata.filepath = basepath + "写真 2018-11-03 21 25 29.png";
//     ScreenShotApp.screenShotsData.push(imagedata);
// };

// ShotJson.readjson = function() {
//     const fs = require('fs');

//     fs.readFile(DatabasePath, 'utf-8', (err, json) => {
//         // 失敗した場合
//         if (err) {
//             console.log("読み込み中にエラーが発生しました。" + err)
//             throw err;
//         }
//         // 成功した場合
//         else {
//             ScreenShotApp.screenShotsData = JSON.parse(json);
//         }
//     });
// };

// ShotJson.savejson = function() {
//     const fs = require('fs');

//     var json = JSON.stringify(ScreenShotApp.screenShotsData, null, 2);

//     fs.writeFile("ScreenshotsInfo.json", json, (err) => {
//         // 書き出しに失敗した場合
//         if (err) {
//             console.log("書き込み中にエラーが発生しました。" + err)
//             throw err
//         }
//         // 書き出しに成功した場合
//         else {
//             console.log("ファイルが正常に書き出しされました");
//         }
//     });
// };