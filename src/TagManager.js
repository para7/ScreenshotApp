'use strict';

if (typeof TagDB === 'undefined') {
    var TagDB = {};
}

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

    //タグ一覧の更新
    for (let k = 0, lt = TagDB.Tags.length; k < lt; ++k) {
        //全体のdiv
        let div = document.createElement('div');

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

//データセット
TagDB.Tags = new Array();

//データ初期化
(function() {
console.log('Tag init');
TagDB.Tags = new Array("ミリシタ", "七尾百合子", "高山紗代子");
TagDB.UpdateDisplay();
}())

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