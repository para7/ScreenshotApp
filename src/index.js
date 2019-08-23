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

console.log(data);

let images = document.getElementById("images");

function SetClipboard(filepath) {

    let reg = /(.*)(?:\.([^.]+$))/;
    let extension = filepath.match(reg)[2];

    const electron = require('electron');
    const nativeImage = electron.nativeImage;
    let image = nativeImage.createFromPath(filepath);

    const clipboard = electron.clipboard;
    clipboard.writeImage(image);

    console.log(image);
}

// 検索
let button = document.getElementById("search");
button.addEventListener('click', function() {

    let input = document.getElementById("searchinput");

    console.log(input);
    let searchword = input.value;

    images.textContent = "";

    for (let i = 0, l = data.length; i < l; ++i) {
        if (data[i].text.indexOf(searchword) != -1) {
            // Image
            let onclick = 'onclick=\"SetClipboard(\'' + data[i].filepath + '\')\"';
            console.log(onclick);
            let hoge = '<img src=\"' + data[i].filepath + '\" ' + onclick + 'width=600 />';
            console.log(hoge);
            images.insertAdjacentHTML('beforeend', hoge);

            // Button
            let bt = '<button id="copy">コピー</button>';
        }
    }
})