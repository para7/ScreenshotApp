'use strict';

if (typeof makeDB === 'undefined') {
    var makeDB = {};
}

makeDB.screenshotsInfo = "";

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
            Utils.SaveJson(ScreenShotApp.path.tagJson, x);
            makeDB.UpdateDisplay(x);
        });
};
$('#deletetag').on('click', makeDB.tagDelete);

makeDB.addTag = function() {
    return new Promise((resolve, reject) => {
        let id = event.target.id;

        let input;

        input = document.getElementById('dbinput');

        let text = input.value;

        if (text === '') {
            console.log('empty');
            return;
        }

        TagDB.tags.push(text);

        makeDB.UpdateDisplay(TagDB.tags);
        Utils.SaveJson(ScreenShotApp.path.tagJson, TagDB.tags);

        input.value = '';
    });
};
$('#dbadd').on('click', makeDB.addTag);

//https://qiita.com/tnakagawa/items/68260254045dce44c913

// 初期処理
makeDB.init = function() {
    TagDB.LoadTag()
        .then(x => {
            TagDB.tags = x;
            makeDB.UpdateDisplay(x);
        });

    Utils.LoadJson(ScreenShotApp.path.screenshotsJson).then(x => {
        makeDB.screenshotsInfo = x;

        var droparea = $("#droparea");
        droparea.text("ここにファイルをドロップして下さい。");
        const div = $("<div></div>").attr('data-name', "fileinfo");
        droparea.append(div);
    });

    // ファイルドロップイベント設定
    $("#grideditor").on("dragover", makeDB.eventStop).on("drop", makeDB.filedrop);
};

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
    output.text = div.children('textarea').val();
    output.tags = makeDB.GetCheckedTag();
    output.filepath = div.children('img').attr('src');

    // console.log(output);
    // console.log(makeDB.screenshotsInfo);
    makeDB.screenshotsInfo.push(output);
    // console.log(makeDB.screenshotsInfo);

    Utils.SaveJson("ScreenshotsInfo.json", makeDB.screenshotsInfo);

    div.remove();
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

            const pathlist = makeDB.screenshotsInfo.map(x => x.filepath);

            // ファイル数分ループ
            for (let i = 0; i < files.length; i++) {
                // ファイル取得
                let file = files[i];

                //画像じゃなかったらさようなら
                if (!file || file.type.indexOf('image/') < 0) {
                    continue;
                }

                console.log(file.path);
                console.log(makeDB.screenshotsInfo);

                //登録済みファイルだったら弾く
                if (pathlist.indexOf(file.path) >= 0) {
                    const txt = $("<div></div>").text("登録済みファイルです").attr("class", "red");
                    $("[data-name='fileinfo']").append(txt);
                    continue;
                }

                let image
                    = $("<img>")
                          .attr('src', file.path)
                          .attr('class', "editor");

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
            }
        }
    } catch (e) {
        // エラーの場合
        alert(e.message);
    }
}
// 初期処理登録
$(makeDB.init);
