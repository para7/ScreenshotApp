'use strict';

if (typeof TagDB === 'undefined') {
    var TagDB = {};
}

//データセット
TagDB.tagJsonPath = "./TagInfo.json";
TagDB.tags = new Array();

TagDB.DeleteTags = function(checked) {
    return new Promise((resolve, reject) => {
        TagDB.tags
            = TagDB.tags
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
        resolve(TagDB.tags);
    });
};

TagDB.SaveTag = function() {
    return Utils.SaveJson(TagDB.tagJsonPath, TagDB.tags);

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
    return Utils.LoadJson(TagDB.tagJsonPath);

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