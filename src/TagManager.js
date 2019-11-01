'use strict';

if (typeof TagDB === 'undefined') {
    var TagDB = {};
}

//データセット
TagDB.tagJsonPath = "./TagInfo.json";
TagDB.screenShotJsonPath = "./ScreenshotsInfo.json";
TagDB.tags = new Array();

//データ操作メソッド
TagDB.AddTag = function() {
    let id = event.target.id;

    let db, input;

    db = TagDB.tags;
    input = document.getElementById('dbinput');

    let text = input.value;

    if (text === '') {
        console.log('empty');
        return;
    }

    db.push(text);

    TagDB.UpdateDisplay();

    input.value = '';
};

// https://qiita.com/ginpei/items/9659c5bf4c82f87514de#%E5%85%83%E3%83%8D%E3%82%BF
TagDB.GetCheckedTag = function() {
    var checked = $('[name=tag]:checked').map(function(index, el) { return $(this).val(); });

    return $.makeArray(checked);
};

TagDB.DeleteTag = function() {
    const checked = TagDB.GetCheckedTag();

    TagDB.tags = TagDB.tags
                     .map(value => {
                         const del = checked.find(z => z === value);

                         //見つかったら値を返す
                         if (del == null) {
                             return value;
                         }
                         //見つからなかったらnullにする
                         return null;
                     })
                     //null要素を消す
                     .filter(v => v);

    TagDB.UpdateDisplay();
};

TagDB.UpdateDisplay = function() {
    let tags = document.getElementById('dbtags');
    let children = tags.children;

    // イベントの解除
    for (let i = 0, l = children.length; i < l; ++i) {
        children[i].removeEventListener('click', TagDB.DeleteTag);
    }

    // 要素のリセット
    while (tags.firstChild) {
        tags.removeChild(tags.firstChild);
    }

    let form = document.createElement('form');
    form.name = "taglist";
    tags.appendChild(form);

    // console.log(TagDB.Tags);

    //タグ一覧の更新
    for (let k = 0, lt = TagDB.tags.length; k < lt; ++k) {
        //全体のdiv
        let div = document.createElement('div');
        div.className = 'tags';

        //文字
        let span = document.createElement('span');
        const text = document.createTextNode(TagDB.tags[k]);
        span.appendChild(text);

        //チェックボックス
        let cbox = document.createElement('input');
        cbox.type = 'checkbox';
        cbox.value = TagDB.tags[k];
        cbox.name = 'tag';

        //チェックボックスを追加
        div.appendChild(cbox);
        //タグの中身を追加
        div.appendChild(span);

        // console.log(div);

        // form.appendChild(div);
        form.appendChild(div);
    }
    // console.log(form);
};

TagDB.SaveTag = function() {
    const fs = require('fs');

    var json = JSON.stringify(TagDB.tags, null, 2);

    fs.writeFile(TagDB.tagJsonPath, json, (err) => {
        // 書き出しに失敗した場合
        if (err) {
            console.log("書き込み中にエラーが発生しました。" + err)
            throw err;
        }
        // 書き出しに成功した場合
        else {
            console.log("ファイルが正常に書き出しされました");
        }
    });
};

TagDB.LoadTag = function() {
    return new Promise((resolve, reject) => {
        const fs = require('fs');

        fs.readFile(TagDB.tagJsonPath, 'utf-8', (err, json) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(json));
            }
        });
    });
};

$('#dbadd').on('click', TagDB.AddTag);
$('#deletetag').on('click', TagDB.DeleteTag);

/*

TagDB

データ

DOMの情報

メソッド


init
jsonからデータを読み出す
配列を初期化
UpdateDisplayを呼ぶ

AddTag
配列にデータを追加
SaveJSON
UpdateDisplay

SaveJSON
JSONを保存する

ReadJSON
init内で処理を行うので不要

UpdateDisplay
配列の情報をもとに画面を再構築する

*/

//https://qiita.com/tnakagawa/items/68260254045dce44c913

// 初期処理
function init() {
    //読み込みは同期処理
    TagDB.LoadTag()
        .then(x => {
            TagDB.tags = x;
            TagDB.UpdateDisplay();
        });

    // ファイルドロップイベント設定
    $("#grideditor").on("dragover", TagDB.eventStop).on("drop", TagDB.filedrop);
}

// ファイルがドラッグされた場合
TagDB.eventStop = function(event) {
    // イベントキャンセル
    event.stopPropagation();
    event.preventDefault();
    // 操作をリンクに変更
    event.originalEvent.dataTransfer.dropEffect = "link";
};

TagDB.addScreenshot = function() {
    console.log("add screenshot");
};

// ファイルがドロップされた場合
TagDB.filedrop = function(event) {
    try {
        // イベントキャンセル
        event.stopPropagation();
        event.preventDefault();

        // ファイル存在チェック
        if (event.originalEvent.dataTransfer.files) {

            // ファイル取得
            let files = event.originalEvent.dataTransfer.files;

            // ファイル情報を空に設定
            let fileinfo = $("[data-name='fileinfo']");
            fileinfo.empty();

            // ファイル数分ループ
            for (let i = 0; i < files.length; i++) {

                // ファイル取得
                let file = files[i];

                if (!file || file.type.indexOf('image/') < 0) {
                    continue;
                }

                // https://qiita.com/amamamaou/items/1b51c834d62c8567fad4#drop%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88
                let blobURL = URL.createObjectURL(file);

                let image = $("<img>")
                                .attr('src', blobURL)
                                .attr('class', "editor")
                                .on('load', function() {
                                    URL.revokeObjectURL(blobURL);
                                    console.log("revoke");
                                });

                let textarea = $('<textarea></textarea>')
                                   .attr('class', 'editor');

                let div = $("<div></div>").attr("class", "center");

                let button = $('<a></a>')
                                 .attr('href', '#')
                                 .attr('class', 'btn-flat-border')
                                 .text("登録")
                                 .on("click", TagDB.addScreenshot);

                div.append(button);

                // <a href="#" id="dbadd" class="btn-flat-border">追加</a>

                $("[data-name='fileinfo']").append(image).append(textarea).append(div);
                console.log("append");
            }
        }
    } catch (e) {
        // エラーの場合
        alert(e.message);
    }
}
// 初期処理登録
$(init);
