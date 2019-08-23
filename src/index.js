class ImageData {

    // constructor() {
    //     this.text = "";
    //     this.tags = [];
    //     this.filepath = "";
    // }

    constructor(text, tags, filepath) {
        this.text = text;
        this.tags = tags;
        this.filepath = filepath;
    }
}

let tags = ["七尾百合子", "ミリシタ"];
let data = [new ImageData("いいですか、プロデューサーさん？もし私が何か変なことしてたら注意してくださいね？ねっ？", tags, "./imgs/写真 2018-12-17 16 28 32.png")];

tags = [];
data.push(new ImageData("きっとこの衣装は、魔法図書館に入る鍵なんです。扉はこのメガネをかけないと見えなくて…！", [], "./imgs/写真 2018-12-05 9 23 40.png"));

data.push(new ImageData("本当ですか!?ありがとうございます!これで私の人生に、楽しみがひとつ増えますね♪", [], "./imgs/写真 2018-11-03 21 25 29.png"));

//let data = new ImageData();

// data.text = "いいですか？プロデューサーさん";
// text 
// data.tags = ["七尾百合子", "ミリシタ"];
// tags,"写真 2018-12-17 16 28 32.png")];

// tags = [];
// data.push(new ImageData("きっとこの衣装は、魔法図書館に入る鍵なんです。",[], "写真 2018-12-05 9 23 40.png"));

// 画像クリック時の処理
function SetClipboard() {

    console.log(event.currentTarget);

    // let filepath = event.target.src;

    // let reg = /(.*)(?:\.([^.]+$))/;
    // let extension = filepath.match(reg)[2];

    // const electron = require('electron');
    // const nativeImage = electron.nativeImage;
    // let image = nativeImage.createFromPath(filepath);

    // const clipboard = electron.clipboard;
    // clipboard.writeImage(image);

    // console.log(image);

    // splash('コピーしました');
}

// 検索
let button = document.getElementById("search");

button.addEventListener('click', function() {

    let images = document.getElementById("images");
    let input = document.getElementById("searchinput");

    console.log(input);
    let searchword = input.value;

    //clean result
    //images.textContent = "";

    for (let i = 0, l = data.length; i < l; ++i) {
        if (data[i].text.search(searchword) != -1) {

            let imgbt = document.createElement('img');
            console.log(imgbt);
            imgbt.src = data[i].filepath;
            imgbt.width = 500;

            images.insertAdjacentElement('beforeend', imgbt);
            imgbt.addEventListener('click', SetClipboard(), true);
            console.log(imgbt);
            images.insertAdjacentHTML('beforeend', '<br>');
        }
    }
})