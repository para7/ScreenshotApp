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
  let current = event.currentTarget;

  current.removeEventListener('click', TagDB.DeleteTag);
  current.parentNode.removeChild(current);
};

//再構築する
TagDB.UpdateTagArray = function() {};

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

  //タグ一覧の更新
  for (let k = 0, lt = TagDB.Tags.length; k < lt; ++k) {
    let div = document.createElement('div');

    tags.insertAdjacentElement('beforeend', div);

    const text = document.createTextNode(TagDB.Tags[k]);
    // Pタグに文字をセット
    div.appendChild(text);
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