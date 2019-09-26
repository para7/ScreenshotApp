'use strict';

if (typeof TagDB === "undefined") {
    var TagDB = {};
}

//データセット

TagDB.primaryTags = new Array();
TagDB.secondaryTags = new Array();

//データ初期化
(function() {
    console.log("Tag init");


}())

//データ操作メソッド
TagDB.AddTag = function() {
    let id = event.target.id;
    // console.log(id);

    let db, input;

    if (id === "primaryadd") {
        // console.log("primary");
        db = TagDB.primaryTags;
        input = document.getElementById("primaryinput");
    } else if (id === "secondaryadd") {
        // console.log("secondary");
        db = TagDB.secondaryTags;
        input = document.getElementById("secondaryinput");
    } else {
        console.log("AddTag error");
        return;
    }

    let text = input.value;

    if (text === "") {
        console.log("empty");
        return;
    }

    db.push(text);

    TagDB.UpdateDisplay();
}

TagDB.UpdateDisplay = function() {


    console.log(document.getElementById("ptest"));

    let tags = document.getElementById("primarytags");
    console.log(tags);
    let children = tags.children;
    console.log(children);
    console.log(tags.firstChild);

    // イベントの解除
    // for (let i = 0, l = children.length; i < l; ++i) {
    //     children[i].removeEventListener('click', SetClipboard);
    // }

    // 要素のリセット
    while (tags.firstChild) {
        tags.removeChild(tags.firstChild);
    }

    for (let k = 0, lt = TagDB.primaryTags.length; k < lt; ++k) {

        let p = document.createElement('p');
        tags.insertAdjacentElement('beforeend', p);

        const text = document.createTextNode(TagDB.primaryTags[k]);
        p.appendChild(text);
        const button = document.createElement('button');
        const bttext = document.createTextNode('削除');
        button.appendChild(bttext);
        p.appendChild(button);

        tags.insertAdjacentElement('beforeend', p);
    }
}

document.getElementById("primaryadd").addEventListener('click', TagDB.AddTag);
document.getElementById("secondaryadd").addEventListener('click', TagDB.AddTag);