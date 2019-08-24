class ImageData {

    constructor() {
        this.text = "";
        this.tags = [];
        this.filepath = "";
    }

    // constructor(text, tags, filepath) {
    //     this.text = text;
    //     this.tags = tags;
    //     this.filepath = filepath;
    // }
}

//let data;

let data = new Array();

// let tags = ["七尾百合子", "ミリシタ"];
// let data = [new ImageData("いいですか、プロデューサーさん？もし私が何か変なことしてたら注意してくださいね？ねっ？", tags, "./imgs/写真 2018-12-17 16 28 32.png")];

// tags = [];
// data.push(new ImageData("きっとこの衣装は、魔法図書館に入る鍵なんです。扉はこのメガネをかけないと見えなくて…！", [], "./imgs/写真 2018-12-05 9 23 40.png"));

// data.push(new ImageData("本当ですか!?ありがとうございます!これで私の人生に、楽しみがひとつ増えますね♪", [], "./imgs/写真 2018-11-03 21 25 29.png"));

// 画像クリック時の処理
function SetClipboard() {

    let filepath = decodeURI(event.target.src);
    filepath = filepath.substr(7);
    console.log(filepath);

    const electron = require('electron');
    const nativeImage = electron.nativeImage;
    let image = nativeImage.createFromPath(filepath);

    const clipboard = electron.clipboard;
    clipboard.writeImage(image);

    splash('コピーしました');
}

// 検索
let button = document.getElementById("search");

// イベントリスナーへの登録

function searchEvent() {

    let input = document.getElementById("searchinput");
    let searchword = input.value;
    let images = document.getElementById("images");

    // エラーの挿入
    if (!searchword) {
        images.insertAdjacentHTML("afterbegin", "<p class='red'>検索する文字を入力してください<br><\p>");
        return;
    }


    let children = images.children;
    // イベントの解除
    for (let i = 0, l = children.length; i < l; ++i) {
        children[i].removeEventListener('click', SetClipboard);
    }

    // 要素のリセット
    images.textContent = "";

    let empty = true;
    for (let i = 0, l = data.length; i < l; ++i) {

        //ここLINQみたいにかきたかったなぁ
        if (data[i].text.search(searchword) != -1) {
            empty = false;
            let imgbt = document.createElement('img');
            imgbt.src = data[i].filepath;
            imgbt.width = 500;
            imgbt.addEventListener('click', SetClipboard);

            images.insertAdjacentElement('beforeend', imgbt);
            images.insertAdjacentHTML('beforeend', '<br>');
        }
    }

    images.insertAdjacentHTML("afterbegin", "<p class='red'>該当する画像がありませんでした<br><\p>");

}

function onKeyPress(e) {
    if (e.keyCode == 13) {
        searchEvent();
    }
}

// 検索動作
button.addEventListener('click', searchEvent);
document.getElementById("searchinput").addEventListener('keypress', onKeyPress)

function setdata() {

    let imagedata = new ImageData();
    let tags = ["七尾百合子", "ミリシタ"];

    imagedata.text = "いいですか、プロデューサーさん？もし私が何か変なことしてたら注意してくださいね？ねっ？";
    imagedata.tags = tags;
    imagedata.filepath = "./imgs/写真 2018-12-17 16 28 32.png";
    data.push(imagedata);

    imagedata = new ImageData();
    tags = [];
    imagedata.text = "きっとこの衣装は、魔法図書館に入る鍵なんです。扉はこのメガネをかけないと見えなくて…！";
    imagedata.tags = tags;
    imagedata.filepath = "./imgs/写真 2018-12-05 9 23 40.png";
    data.push(imagedata);

    imagedata = new ImageData();
    imagedata.text = "本当ですか!?ありがとうございます!これで私の人生に、楽しみがひとつ増えますね♪";
    imagedata.tags = tags;
    imagedata.filepath = "./imgs/写真 2018-11-03 21 25 29.png";
    data.push(imagedata);
}

function readjson() {
    const fs = require('fs');

    fs.readFile("ScreenshotsInfo.json", 'utf-8', (err, json) => {
        // 失敗した場合
        if (err) {
            console.log("読み込み中にエラーが発生しました。" + err)
            throw err
        }
        // 成功した場合
        else {
            data = JSON.parse(json);
        }
    });
};


function savejson() {

    const fs = require('fs');

    var json = JSON.stringify(data, null);

    fs.writeFile("ScreenshotsInfo.json", json, (err) => {
        // 書き出しに失敗した場合
        if (err) {
            console.log("書き込み中にエラーが発生しました。" + err)
            throw err
        }
        // 書き出しに成功した場合
        else {
            // console.log("ファイルが正常に書き出しされました")
        }
    });
}

//setdata();
readjson();
//savejson();