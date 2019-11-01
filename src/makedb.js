'use strict';

if (typeof makeDB === 'undefined') {
    var makeDB = {};
}

makeDB.screenShotJsonPath = "./ScreenshotsInfo.json";

// https://qiita.com/ginpei/items/9659c5bf4c82f87514de#%E5%85%83%E3%83%8D%E3%82%BF
makeDB.GetCheckedTag = function() {
    var checked = $('[name=tag]:checked').map(function(index, el) { return $(this).val(); });

    return $.makeArray(checked);
};

makeDB.UpdateDisplay = function(tags) {
    const dbtags = document.getElementById('dbtags');
    const children = dbtags.children;

    // イベントの解除
    for (let i = 0, l = children.length; i < l; ++i) {
        children[i].removeEventListener('click', TagDB.DeleteTag);
    }

    // 要素のリセット
    while (dbtags.firstChild) {
        dbtags.removeChild(dbtags.firstChild);
    }

    let form = document.createElement('form');
    form.name = "taglist";
    dbtags.appendChild(form);

    // console.log(TagDB.Tags);

    //タグ一覧の更新
    for (let k = 0, lt = tags.length; k < lt; ++k) {
        //全体のdiv
        let div = document.createElement('div');
        div.className = 'tags';

        //文字
        let span = document.createElement('span');
        const text = document.createTextNode(tags[k]);
        span.appendChild(text);

        //チェックボックス
        let cbox = document.createElement('input');
        cbox.type = 'checkbox';
        cbox.value = tags[k];
        cbox.name = 'tag';

        //チェックボックスを追加
        div.appendChild(cbox);
        //タグの中身を追加
        div.appendChild(span);

        form.appendChild(div);
    }
};

makeDB.tagDelete = function() {
    const checked = makeDB.GetCheckedTag();
    TagDB.DeleteTags(checked)
        .then(x => {
            console.log(x);
            makeDB.UpdateDisplay(x);
        });
};
$('#deletetag').on('click', makeDB.tagDelete);

makeDB.addTag = function() {
    return new Promise((resolve, reject) => {
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

        makeDB.UpdateDisplay(db);

        input.value = '';
    });
};
$('#dbadd').on('click', makeDB.addTag);

//https://qiita.com/tnakagawa/items/68260254045dce44c913

// 初期処理
function init() {
    //読み込みは同期処理
    TagDB.LoadTag()
        .then(x => {
            TagDB.tags = x;
            makeDB.UpdateDisplay(x);
        });

    // ファイルドロップイベント設定
    $("#grideditor").on("dragover", makeDB.eventStop).on("drop", makeDB.filedrop);
}

// ファイルがドラッグされた場合
makeDB.eventStop = function(event) {
    // イベントキャンセル
    event.stopPropagation();
    event.preventDefault();
    // 操作をリンクに変更
    event.originalEvent.dataTransfer.dropEffect = "link";
};

makeDB.addScreenshot = function() {
    var div = $(event.target).parent().parent();

    var output = {};
    output.txt = div.children('textarea').val();
    output.url = div.children('img').attr('src');

    // Utils.SaveJson("test.json", output);
};

// ファイルがドロップされた場合
makeDB.filedrop = function(event) {
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

                let image
                    = $("<img>")
                          .attr('src', blobURL)
                          .attr('class', "editor")
                          .on('load', function() {
                              URL.revokeObjectURL(blobURL);
                              console.log("revoke");
                          });

                let textarea
                    = $('<textarea></textarea>')
                          .attr('class', 'editor');

                let div
                    = $("<div></div>").attr("class", "center");

                let button
                    = $('<a></a>')
                          .attr('href', '#')
                          .attr('class', 'btn-flat-border')
                          .text("登録")
                          .on("click", makeDB.addScreenshot);

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
