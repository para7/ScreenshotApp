'use strict';

if (typeof ScreenShotApp === "undefined") {
    var ScreenShotApp = {};
}

ScreenShotApp.screenShotsData = new Array();

(function() {
Utils.LoadJson(ScreenShotApp.path.screenshotsJson).then(x => {
    ScreenShotApp.screenShotsData = x;

    //要素にインデックスを追加（ごり押し）
    const length = ScreenShotApp.screenShotsData.length;
    for (let i = 0; i < length; i++) {
        //numberプロパティが増える
        ScreenShotApp.screenShotsData[i].number = i;
    }
});
})()

// 画像クリック時の処理
function SetClipboard() {

    let filepath = decodeURI(event.target.src);
    //http://をカット
    filepath = filepath.substr(7);
    console.log(filepath);

    const electron = require('electron');
    const nativeImage = electron.nativeImage;
    let image = nativeImage.createFromPath(filepath);

    const clipboard = electron.clipboard;
    clipboard.writeImage(image);

    splash('コピーしました');
}

function searchEvent() {

    let input = document.getElementById("searchinput");
    const searchword = input.value;
    const images = $("#images");

    // エラーの挿入
    if (!searchword) {
        images.prepend($("<div></div>").attr("class", "red").text("検索する文字を入力してください"));
        // "<div class='red'>検索する文字を入力してください<br></div>"
        return;
    }

    // 要素のリセット
    // while (images.firstChild) {
    //     images.removeChild(images.firstChild);
    // }
    images.empty();

    let empty = true;

    const te = ScreenShotApp.screenShotsData.filter(x => x.text.search(searchword) != -1);
    console.log(te);

    for (let i = 0, l = ScreenShotApp.screenShotsData.length; i < l; ++i) {

        //全文検索
        let result = ScreenShotApp.screenShotsData[i].text.search(searchword) != -1;

        //タグ検索
        if (!result) {
            for (let k = 0, lt = ScreenShotApp.screenShotsData[i].tags.length; k < lt; ++k) {

                if (ScreenShotApp.screenShotsData[i].tags[k] == searchword) {
                    result = true;
                    break;
                }
            }
        }

        if (result) {
            empty = false;
            const div = $("<div></div>");
            div.append($("<img>").attr("src", ScreenShotApp.screenShotsData[i].filepath).attr("class", "imgbt").on("click", SetClipboard));
            div.append($("<button></button>").text("詳細").attr("class", "detail").on("click", showDetail));
            images.append(div);
        }
    }

    if (empty) {
        images.prepend($("<div></div>").attr("class", "red").text("該当する画像がありませんでした"));
    }
}

function showDetail() {
    console.log($(event.target)[0]);
}

function onKeyPress(e) {
    if (e.keyCode == 13) {
        searchEvent();
    }
}

// 検索ボタン
document.getElementById("search").addEventListener('click', searchEvent);
document.getElementById("searchinput").addEventListener('keypress', onKeyPress)

    // ShotJson.setdata();
    // ShotJson.readjson();
    // ShotJson.savejson();