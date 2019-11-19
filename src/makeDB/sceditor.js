'use strict';

if (typeof scEditor === 'undefined') {
    var scEditor = {};
}

scEditor.screenshotsInfo = "";

// 初期処理
scEditor.init = function() {
    Utils.LoadJson(ScreenShotApp.path.screenshotsJson).then(x => {
        scEditor.screenshotsInfo = x;

        $("#grideditor").prepend($("<div></div>").text("ここにファイルをドロップして下さい。"));

        var droparea = $("#droparea");
        droparea.text("");
        const div = $("<div></div>").attr('data-name', "fileinfo");
        droparea.append(div);

        // ファイルドロップイベント設定
        $("#grideditor").on("dragover", scEditor.eventStop).on("drop", scEditor.filedrop);

        //編集データ飛んできてたら
        if (("edit" in Utils.getUrlVars())) {
            scEditor.showScreenshotEdit(Utils.getUrlVars().edit);
        }
    });
};

/* ドラッグドロップ処理関数 */

// ファイルがドラッグされた場合
scEditor.eventStop = function(event) {
    // イベントキャンセル
    event.stopPropagation();
    event.preventDefault();
    // 操作をリンクに変更
    event.originalEvent.dataTransfer.dropEffect = "link";
};

// ファイルがドロップされた場合
scEditor.filedrop = function(event) {
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

            const pathlist = scEditor.screenshotsInfo.map(x => x.filepath);

            // ファイル数分ループ
            for (let i = 0; i < files.length; i++) {
                // ファイル取得
                let file = files[i];

                //画像じゃなかったらさようなら
                if (!file || file.type.indexOf('image/') < 0) {
                    continue;
                }

                // console.log(file.path);
                // console.log(makeDB.screenshotsInfo);

                //登録済みファイルだったら弾く
                //TODO: Editモードにする
                if (pathlist.indexOf(file.path) >= 0) {
                    const txt = $("<div></div>").text("登録済みファイルです").attr("class", "red");
                    $("[data-name='fileinfo']").append(txt);
                    continue;
                }

                scEditor.showScreenshotRegister(file.path);
            }
        }
    } catch (e) {
        // エラーの場合
        alert(e.message);
    }
};

/* スクショデータ操作表示関数 */

//スクリーンショットの追加
scEditor.addScreenshot = function() {
    var div = $(event.target).parent().parent();

    //データ取得
    var output = {};
    output.text = div.children('textarea').val();
    output.tags = makeDB.GetCheckedTag();
    output.filepath = div.children('img').attr('src');

    //配列に追加
    scEditor.screenshotsInfo.push(output);

    //JSONと同期
    Utils.SaveJson(ScreenShotApp.path.screenshotsJson, scEditor.screenshotsInfo);

    div.remove();
};

scEditor.editScreenshot = function() {
    var div = $(event.target).parent().parent();

    //データ取得
    var data = {};
    data.text = div.children('textarea').val();
    data.tags = makeDB.GetCheckedTag();
    data.filepath = div.children('img').attr('src');

    //ユニークになるファイルパスを使ってインデックスを検索
    const index = scEditor.screenshotsInfo.findIndex((x) => x.filepath === data.filepath);
    //なぜかなかったらエラー
    if (index === -1) {
        console.log("outofrange error.");
        return;
    }

    //データを更新
    scEditor.screenshotsInfo[index].text = data.text;
    scEditor.screenshotsInfo[index].tags = data.tags;
    console.log(scEditor.screenshotsInfo);

    //JSONと同期
    //HACK: 上の代入が遅れた場合、非同期の保存バグを起こす可能性あり。
    Utils.SaveJson(ScreenShotApp.path.screenshotsJson, scEditor.screenshotsInfo);

    div.remove();
};

scEditor.deleteScreenshot = function() {
    var div = $(event.target).parent().parent();

    const filepath = div.children('img').attr('src');

    //ユニークになるファイルパスを使ってインデックスを検索
    const index = scEditor.screenshotsInfo.findIndex((x) => x.filepath === filepath);
    //なぜかなかったらエラー
    if (index === -1) {
        console.log("outofrange error.");
        return;
    }
    scEditor.screenshotsInfo.splice(index, 1);

    Utils.SaveJson(ScreenShotApp.path.screenshotsJson, scEditor.screenshotsInfo);

    div.remove();
};

/* スクショデータ操作表示関数 */

//スクショ情報編集
scEditor.showScreenshotEdit = function(number) {
    const scdata = scEditor.screenshotsInfo[number];

    const image
        = $("<img>")
              .attr('src', scdata.filepath)
              .attr('class', "editor");

    const textarea
        = $('<textarea></textarea>')
              .attr('class', 'editor')
              .text(scdata.text);

    //centerをかけたいので、ボタン2個divに突っ込む
    const btdiv
        = $("<div></div>").attr("class", "center");

    const savebt
        = $('<a></a>')
              .attr('href', '#')
              .attr('class', 'btn-flat-border')
              .text("保存")
              .on("click", scEditor.editScreenshot);

    const deletebt
        = $('<a></a>')
              .attr('href', '#')
              .attr('class', 'btn-flat-border')
              .text("削除")
              .on("click", scEditor.deleteScreenshot);

    btdiv.append(savebt).append(deletebt);

    makeDB.setTagCheck(scdata.tags);

    $("[data-name='fileinfo']").append(image).append(textarea).append(btdiv);
};

//スクショ新規登録
scEditor.showScreenshotRegister = function(path) {
    let image
        = $("<img>")
              .attr('src', path)
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
              .on("click", scEditor.addScreenshot);

    div.append(button);

    // <a href="#" id="dbadd" class="btn-flat-border">追加</a>

    $("[data-name='fileinfo']").append(image).append(textarea).append(div);
};

$(scEditor.init);