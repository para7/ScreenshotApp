'use strict';

if (typeof TagDB === 'undefined') {
    var TagDB = {};
}

//データセット
TagDB.tags = new Array();

TagDB.DeleteTags = function(checked) {
    return new Promise((resolve, reject) => {
        //逐次で配列の削除操作をすると遅いはずなので、まとめてやる
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
                  //まとめてnull要素を消す
                  .filter(v => v);
        resolve(TagDB.tags);
    });
};

TagDB.SaveTag = function() {
    return Utils.SaveJson(ScreenShotApp.path.tagJson, TagDB.tags);
};

TagDB.LoadTag = function() {
    return Utils.LoadJson(ScreenShotApp.path.tagJson);
};