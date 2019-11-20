'use strict';

if (typeof makeDB === 'undefined') {
    var makeDB = {};
}

// https://qiita.com/ginpei/items/9659c5bf4c82f87514de#%E5%85%83%E3%83%8D%E3%82%BF
makeDB.GetCheckedTag = function() {
    var checked = $('input[name=tag]:checked').map(function(index, el) { return $(this).val(); });

    return $.makeArray(checked);
};

makeDB.setTagCheck = function(tags) {
    $($('input[name=tag]').get().filter(x => tags.includes(x.getAttribute("value")))).attr("checked", "true");
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

        const text = input.value;

        if (text === '') {
            return;
        }

        //入力値チェック
        if (text.indexOf(" ") !== -1 || text.indexOf("　") !== -1) {
            $("#tagerror").text("タグに空白は含めないでください");
            return;
        };
        $("#tagerror").text("");

        TagDB.tags.push(text);

        makeDB.UpdateDisplay(TagDB.tags);
        Utils.SaveJson(ScreenShotApp.path.tagJson, TagDB.tags);

        input.value = '';
    });
};
$('#dbadd').on('click', makeDB.addTag);

makeDB.init = function() {
    TagDB.LoadTag().then(x => {
        TagDB.tags = x;
        makeDB.UpdateDisplay(x);
    });
};

// 初期処理登録
$(makeDB.init);
