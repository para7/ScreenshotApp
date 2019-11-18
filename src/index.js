'use strict';

if (typeof ScreenShotApp === "undefined") {
    var ScreenShotApp = {};
}

ScreenShotApp.screenShotsData = new Array();

(function() {
Utils.LoadJson(ScreenShotApp.path.screenshotsJson).then(x => {
    ScreenShotApp.screenShotsData = x;
});
})()

// 画像クリック時の処理
function SetClipboard() {

    let filepath = decodeURI(event.target.src);
    filepath = filepath.substr(7);
    console.log(filepath);

    const electron = require('electron');
    const nativeImage = electron.nativeImage;
    let image = nativeImage.createFromPath(filepath);

    const clipboard = electron.clipboard;
    clipboard.writeImage(image);

    splash('コピーしました');
}

// 検索
let button = document.getElementById("search");

// イベントリスナーへの登録

function searchEvent() {

    let input = document.getElementById("searchinput");
    let searchword = input.value;
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
    for (let i = 0, l = ScreenShotApp.screenShotsData.length; i < l; ++i) {

        //全文検索
        let result = ScreenShotApp.screenShotsData[i].text.search(searchword) != -1;

        //タグ検索
        if (!result) {

            for (let k = 0, lt = ScreenShotApp.screenShotsData[i].tags.length; k < lt; ++k) {
                console.log(ScreenShotApp.screenShotsData[i].tags[k])

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
            div.append($("<button></button>").text("詳細").attr("class", "detail"));
            images.append(div);
        }
    }

    if (empty) {
        images.insertAdjacentHTML("afterbegin", "<div class='red'>該当する画像がありませんでした<br></div>");
    }
}

function onKeyPress(e) {
    if (e.keyCode == 13) {
        searchEvent();
    }
}

// 検索動作
button.addEventListener('click', searchEvent);
document.getElementById("searchinput").addEventListener('keypress', onKeyPress)

    // ShotJson.setdata();
    // ShotJson.readjson();
    // ShotJson.savejson();