'use strict';

if (typeof TagDB === "undefined") {
    var TagDB = {};
}

//データセット

TagDB.primaryTags = new Array();
TagDB.secondaryTags = new Array();

//データ初期化

function AddTag() {
    let id = event.target.id;
    console.log(id);

    let db;

    if (id === "primaryadd") {
        console.log("primary");
        db = TagDB.primaryTags;
    } else if (id === "secondaryadd") {
        console.log("secondary");
    } else {
        console.log("error");
        return;
    }
}


document.getElementById("primaryadd").addEventListener('click', AddTag);
document.getElementById("secondaryadd").addEventListener('click', AddTag);