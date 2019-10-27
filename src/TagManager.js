'use strict';

if (typeof TagDB === 'undefined') {
    var TagDB = {};
}

//データセット
TagDB.tagJsonPath = "./TagInfo.json";
TagDB.Tags = new Array();

//データ操作メソッド
TagDB.AddTag = function() {
    let id = event.target.id;

    let db, input;

    db = TagDB.Tags;
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

TagDB.DeleteTag = function() {
    const tags = document.taglist.tag;

    for (let i = 0; i < tags.length; i++) {
        if (tags[i].checked) { //(color1[i].checked === true)と同じ
            const index = TagDB.Tags.findIndex((v) => v === tags[i].value);
            TagDB.Tags.splice(index, 1);
        }
    }
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

    console.log(TagDB.Tags);

    //タグ一覧の更新
    for (let k = 0, lt = TagDB.Tags.length; k < lt; ++k) {
        //全体のdiv
        let div = document.createElement('div');
        div.className = 'tags';

        //文字
        let span = document.createElement('span');
        const text = document.createTextNode(TagDB.Tags[k]);
        span.appendChild(text);

        //チェックボックス
        let cbox = document.createElement('input');
        cbox.type = 'checkbox';
        cbox.value = TagDB.Tags[k];
        cbox.name = 'tag';

        //チェックボックスを追加
        div.appendChild(cbox);
        //タグの中身を追加
        div.appendChild(span);

        console.log(div);

        // form.appendChild(div);
        form.appendChild(div);
    }
    console.log(form);
};

TagDB.SaveTag = function() {
    const fs = require('fs');

    var json = JSON.stringify(TagDB.Tags, null, 2);

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

//データ初期化
(function() {
console.log('Tag init');

//読み込みは同期処理
TagDB.LoadTag()
    .then(x => {
        TagDB.Tags = x;
        TagDB.UpdateDisplay();
    });
})()

document.getElementById('dbadd').addEventListener('click', TagDB.AddTag);

document.getElementById('deletetag').addEventListener('click', TagDB.DeleteTag);

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

var $ = require('jQuery');

// 初期処理
function init()
{
    // ファイルドロップイベント設定
    $("#filedrop").on("dragover", eventStop).on("drop", filedrop);
}
// ファイルがドラッグされた場合
function eventStop(event)
{
    // イベントキャンセル
    event.stopPropagation();
    event.preventDefault();
    // 操作をリンクに変更
    event.originalEvent.dataTransfer.dropEffect = "link";
}
// ファイルがドロップされた場合
function filedrop(event)
{
    try {
        // イベントキャンセル
        event.stopPropagation();
        event.preventDefault();
        // ファイル存在チェック
        if (event.originalEvent.dataTransfer.files) {
            // ファイル取得
            var files = event.originalEvent.dataTransfer.files;
            // ファイル情報を空に設定
            $("[data-name='fileinfo']").empty();
            // ファイル数分ループ
            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                if (!file || file.type.indexOf('image/') < 0) {
                    continue;
                }

                // https://qiita.com/amamamaou/items/1b51c834d62c8567fad4#drop%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88

                // ファイル取得
                var file = files[i];
                console.log(file.path);

                // 画像要素の生成

                var image = new Image(), blobURL = URL.createObjectURL(file);

                // src にURLを入れる
                image.src = blobURL;

                // 画像読み込み完了後
                image.addEventListener('load', function() {
                    // File/BlobオブジェクトにアクセスできるURLを開放
                    URL.revokeObjectURL(blobURL);

                    // #output へ出力
                    $("[data-name='fileinfo']").append(image);
                });
            }
        }
    } catch (e) {
        // エラーの場合
        alert(e.message);
    }
}
// 初期処理登録
$(init);
