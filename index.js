
const imgs = ["写真 2018-12-17 16 28 32.png", "写真 2018-12-05 9 23 40.png", "写真 2018-11-03 21 25 29.png"];

var images = document.getElementById("images");

for(var i = 0, l = imgs.length; i < l; i++)
{
    const path = "./imgs/" + imgs[i];
    const hoge = '<img src="'+ path +'" width=600 /> <br>'
    
    images.insertAdjacentHTML('beforeend', hoge);
}

var button = document.getElementById("clear");

button.addEventListener('click', function(){
    images.textContent = null;
})

