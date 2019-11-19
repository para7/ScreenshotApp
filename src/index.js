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
ScreenShotApp.SetClipboard = function() {
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
};

//検索ロジック
// ScreenShotApp.searchlogic = function(txt) {
//     //テキスト検索
//     let ret = false;

//     searchwords.some(searchword => txt.text.search(searchword) != -1);

//     //タグ
//     ret = ret || searchwords.some(searchword => txt.tags.includes(searchword));
//     return ret;
// };

//検索
ScreenShotApp.searchEvent = function() {
    let input = document.getElementById("searchinput");
    const searchwords = input.value.split(/[ 　]/).filter(v => v);
    const images = $("#images");

    // エラーの挿入
    if (searchwords.length === 0) {
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
    const searchlogic = function(txt) {
        //textに部分一致、またはtagsに完全一致で含まれている
        //すべてのsearchwordに対して、それが正しい
        return searchwords.every(searchword => {
            const textresult = txt.text.search(searchword) != -1;
            const tagresult = txt.tags.includes(searchword);
            return textresult || tagresult;
        });
    };

    const result = ScreenShotApp.screenShotsData.filter(searchlogic);

    //結果が空なら
    if (result.length == 0) {
        images.prepend($("<div></div>").attr("class", "red").text("該当する画像がありませんでした"));
        return;
    }

    result.forEach(function(x) {
        const div = $("<div></div>");
        div.append($("<img>").attr("src", x.filepath).attr("class", "imgbt").on("click", ScreenShotApp.SetClipboard));
        div.append($("<button></button>").text("詳細").attr("data-number", x.number).attr("class", "detail").on("click", ScreenShotApp.showDetail));
        images.append(div);
    });
};

//詳細ボタンの動作
ScreenShotApp.showDetail = function() {
    const target = $(event.target);
    const imgdata = ScreenShotApp.screenShotsData[target.attr("data-number")];

    const filepath = $("<div></div>").text("ファイル:  " + imgdata.filepath);
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
};

//検索をエンターキーで可能にする
ScreenShotApp.onKeyPress = function(e) {
    if (e.keyCode == 13) {
        ScreenShotApp.searchEvent();
    }
};

// 検索ボタン
document.getElementById("search").addEventListener('click', ScreenShotApp.searchEvent);
document.getElementById("searchinput").addEventListener('keypress', ScreenShotApp.onKeyPress)