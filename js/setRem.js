// - 设计稿是1920px  
// - PC端适配： 宽度在 1024~1920之间页面元素宽高自适应
//   1. setRem.js 把屏幕分为 18等份（我的屏幕宽1440）
//   2. cssrem 插件的基准值是  80px 
//setRem.js
function setRem() {
    var clientWidht = document.clientWidht || document.body.clientWidth;

    clientWidht = clientWidht > 1920 ? 1920 : clientWidht;
    clientWidht = clientWidht < 1024 ? 1024 : clientWidht;
    // 1920/24=80
    var rem = clientWidht / 24;
    var html = document.getElementsByTagName('html')[0];
    html.style.fontSize = rem + 'px';

}

window.onload = setRem;
window.onresize = setRem;