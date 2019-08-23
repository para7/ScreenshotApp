const imgs = [
    "写真 2018-12-17 16 28 32.png",
    "写真 2018-12-05 9 23 40.png",
    "写真 2018-11-03 21 25 29.png"
];

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

var tags = ["七尾百合子", "ミリシタ"];
var data = [new ImageData("いいですか、プロデューサーさん？もし私が何か変なことしてたら注意してくださいね？ねっ？", tags, "写真 2018-12-17 16 28 32.png")];

tags = [];
data.push(new ImageData("きっとこの衣装は、魔法図書館に入る鍵なんです。扉はこのメガネをかけないと見えなくて…！", [], "写真 2018-12-05 9 23 40.png"));

data.push(new ImageData("本当ですか!?ありがとうございます!これで私の人生に、楽しみがひとつ増えますね♪", [], "写真 2018-11-03 21 25 29.png"));

//var data = new ImageData();

// data.text = "いいですか？プロデューサーさん";
// text 
// data.tags = ["七尾百合子", "ミリシタ"];
// tags,"写真 2018-12-17 16 28 32.png")];

// tags = [];
// data.push(new ImageData("きっとこの衣装は、魔法図書館に入る鍵なんです。",[], "写真 2018-12-05 9 23 40.png"));

console.log(data);

var images = document.getElementById("images");

for (var i = 0, l = imgs.length; i < l; i++) {
    const path = "./imgs/" + imgs[i];
    const hoge = '<img src="' + path + '" width=600 /> <br>'

    //    images.insertAdjacentHTML('beforeend', hoge);
}

var button = document.getElementById("search");


button.addEventListener('click', function() {

    var input = document.getElementById("searchinput");

    console.log(input);
    var searchword = input.value;

    images.textContent = "";

    for (var i = 0, l = data.length; i < l; ++i) {
        if (data[i].text.indexOf(searchword) != -1) {
            const path = "./imgs/" + data[i].filepath;
            const hoge = '<img src="' + path + '" width=600 /> <br>'
            images.insertAdjacentHTML('beforeend', hoge);
        }
    }
})