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
};

TagDB.LoadTag = function() {
    return Utils.LoadJson(TagDB.tagJsonPath);
};