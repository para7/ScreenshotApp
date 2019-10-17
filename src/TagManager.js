'use strict';

if (typeof TagDB === 'undefined') {
  var TagDB = {};
}

//データセット

TagDB.Tags = new Array();

//データ初期化
(function() { console.log('Tag init'); }())

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
  let current = event.currentTarget.parentNode;

  let text = current.firstChild.textContent;

  let db = TagDB.Tags;

  //消す
  const index = db.findIndex((v) => v === text);
  db.splice(index, 1);

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

  //タグ一覧の更新
  for (let k = 0, lt = TagDB.Tags.length; k < lt; ++k) {
    //全体のdiv
    let div = document.createElement('div');

    let cbox = document.createElement('input');
    cbox.type = 'checkbox';

    //文字
    let span
      = document.createElement('span');
    const text = document.createTextNode(TagDB.Tags[k]);
    span.appendChild(text);

    //大本のdivにセット
    div.appendChild(span);
    const button = document.createElement('button');
    const bttext = document.createTextNode('削 除');
    //ボタンに削除という名前をセット
    button.appendChild(bttext);
    //ボタンにイベントをセット
    button.addEventListener('click', TagDB.DeleteTag);
    // Pタグ内にボタンを追加
    div.appendChild(button);

    tags.insertAdjacentElement('beforeend', div);
  }
};

document.getElementById('dbadd')
  .addEventListener('click', TagDB.AddTag);

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