'use strict';

if (typeof ScreenShotApp === "undefined") {
    var ScreenShotApp = {};
}

ScreenShotApp.screenShotsData = new Array();

(function() {
Utils.LoadJson(ScreenShotApp.path.screenshotsJson).then(x => {
    ScreenShotApp.screenShotsData = x;
    ScreenShotApp.screenShotsData.forEach

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

//検索
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

    //検索ロジック
    const result = ScreenShotApp.screenShotsData.filter(function(x) { return (x.text.search(searchword) != -1) || (x.tags.includes(searchword)); });

    //結果が空なら
    if (result.length == 0) {
        images.prepend($("<div></div>").attr("class", "red").text("該当する画像がありませんでした"));
        return;
    }

    result.forEach(function(x) {
        const div = $("<div></div>");
        div.append($("<img>").attr("src", x.filepath).attr("class", "imgbt").on("click", SetClipboard));
        div.append($("<button></button>").text("詳細").attr("data-number", x.number).attr("class", "detail").on("click", showDetail));
        images.append(div);
    });
}

//詳細ボタンの動作
function showDetail() {
    const target = $(event.target);
    const imgdata = ScreenShotApp.screenShotsData[target.attr("data-number")];

    const filepath = $("<div></div>").text("ファイル:  " + imgdata.filepath);
    console.log(imgdata)
    const tags = $("<div></div>").text("タグ:  " + imgdata.tags.reduce((result, value) => result + ", " + value, ""));

    const text = $("<div></div>").text("テキスト:  " + imgdata.text);

    target.parent().append($("<br>"));
    target.parent()
        .append($("<div></div>")
                    .attr("class", "detail")
                    .append(filepath)
                    .append(tags)
                    .append(text))
        .append($("<a></a>").attr("href", "./makeDB/mkdb.html?edit=" + imgdata.number).text("編集"))
        .append($("<br>"))
        .append($("<br>"));
}

//検索をエンターキーで可能にする
function onKeyPress(e) {
    if (e.keyCode == 13) {
        searchEvent();
    }
}

// 検索ボタン
document.getElementById("search").addEventListener('click', searchEvent);
document.getElementById("searchinput").addEventListener('keypress', onKeyPress)