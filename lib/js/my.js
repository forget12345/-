function getScrollOffsets(_w) {//获取页面的滚动位置
    _w = _w || window;
    //for all and IE9+
    if (_w.pageXOffset != null) return {
        x: _w.pageXOffset,
        y: _w.pageYOffset
    };
    //for IE678
    var _d = _w.document;
    if (document.compatMode == "CSS1Compat") return { //for IE678
        x: _d.documentElement.scrollLeft,
        y: _d.documentElement.scrollTop
    };
    //for other mode
    return {
        x: _d.body.scrollLeft,
        y: _d.body.scrpllTop
    };
}
 
function getViewPortSize(_w) {//获取页面的窗口大小
    _w = _w || window;
    //for all and IE9+
    if (_w.innerWidth != null) return {
        x: _w.innerWidth,
        y: _w.innerHeight
    };
    //for IE678
    var _d = _w.document;
    if (document.compatMode == "CSS1Compat") return { //for IE678
        x: _d.documentElement.clientWidth,
        y: _d.documentElement.clientHeight
    };
    //for other mode
    return {
        x: _d.body.clientWidth,
        y: _d.body.clientHeight
    };
}
function scrollPosition(_obj) {//参数_obj可以是任何页面上存在的元素的id，或者是指定元素本身
    var targetX, targetY;
    if (!_obj) { //如果不指定锚点元素，就跳到页面顶端0，0位置
        targetX = 0;
        targetY = 0;
    } else {
        if (typeof (_obj) == "string") {
            _obj = document.getElementById(_obj);
        } else {
            _obj = _obj
        }
        targetX = _obj.getBoundingClientRect().left + getScrollOffsets().x;
        targetY = _obj.getBoundingClientRect().top + getScrollOffsets().y; 
    }
 
    //如果目标元素的位置在最后一屏，那就指定目标位置为页面底部
    //如果目标元素的位置为负数，就指定目标位置为页面顶部
    var maxTargetX=document.body.scrollWidth-getViewPortSize().x;
    if(targetX>=maxTargetX) targetX=maxTargetX;
    if(targetX<0) targetX=0;
    var maxTargetY=document.body.scrollHeight-getViewPortSize().y;
    if(targetY>=maxTargetY) targetY=maxTargetY;
    if(targetY<0) targetY=0;
 
    var tempTimer = setInterval(function () {
        var currentY = getScrollOffsets().y;
        var currentX = getScrollOffsets().x;
        //跳转位置的缓冲公式
        var tempTargetY = currentY - (currentY - targetY) / 10;
        var tempTargetX = currentX - (currentX - targetX) / 10;
        //由于缓冲公式会生成小数，而scrollTo函数会省略小数点后面的数字，所以要对跳转的坐标做一些微调
        if (Math.abs(tempTargetY - currentY) < 1) {
            tempTargetY - currentY > 0 ? tempTargetY++ : tempTargetY--;
        }
        if (Math.abs(tempTargetX - currentX) < 1) {
            tempTargetX - currentX > 0 ? tempTargetX++ : tempTargetX--;
        }
        //页面跳转
        window.scrollTo(tempTargetX, tempTargetY);
        //到达指定位置后清除一下Interval
        if ( Math.abs(getScrollOffsets().y - targetY) <= 2 && Math.abs(getScrollOffsets().x - targetX) <= 2  ) {
            clearInterval(tempTimer);
            window.scrollTo(targetX, targetY);
            //console.log("done");
        }
    }, 10);
}
//获取浏览器窗口width\height
function getBrowWandH() {
    // 获取窗口宽度
    if (window.innerWidth)
    winWidth = window.innerWidth;
    else if ((document.body) && (document.body.clientWidth))
    winWidth = document.body.clientWidth;
    // 获取窗口高度
    if (window.innerHeight)
    winHeight = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
    winHeight = document.body.clientHeight;
    // 通过深入 Document 内部对 body 进行检测，获取窗口大小
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
    {
    winHeight = document.documentElement.clientHeight;
    winWidth = document.documentElement.clientWidth;
    }
}

function autoImgheight() {
getBrowWandH();
//获取headerimgdiv
var headerimg=document.getElementById('headerimg');
headerimg.style.height=winHeight+"px";
//make down's tap margin-bottom 20px
var down=document.getElementById('down');
down.style.top=winHeight-240+"px";
}

//当tap为1时候点击显示，为0的时候点击隐藏
var menukeytap=1;
function menukey() {
    var menu=document.getElementById('menu');
    if (menukeytap==1) {
        menu.style.display="block";
        menukeytap=0;
    }
    else{
        menu.style.display="none";
        menukeytap=1;
    }
   
}
//浮动导航
// var menufloatkeytap=1;
// function menufloatkey() {
//     var menufloat=document.getElementById('menufloat');
//     if (menufloatkeytap==1) {
//         menufloat.style.display="block";
//         menufloatkeytap=0;
//     }
//     else{
//         menufloat.style.display="none";
//         menufloatkeytap=1;
//     }
   
// }

//获取元素距离顶端距离
function getScrollTop(){    
    var scrollTop=0;    
    if(document.documentElement&&document.documentElement.scrollTop){    
        scrollTop=document.documentElement.scrollTop;    
    }else if(document.body){    
        scrollTop=document.body.scrollTop;    
    }    
    return scrollTop;    
} 

function showDetiles(name) {
    if (name=="nianshao")
     {
        // 显示弹出层
        var showsTable=document.getElementById("showsTable");
        showsTable.style.display="block";
        // 遮罩层打开
        var fullScreenShade=document.getElementById("fullScreenShade");
        fullScreenShade.style.display="block";
        // 禁止屏幕滚动
        document.body.style.overflow = "hidden";
    }else if(name=="qiuxue"){
         // 显示弹出层
        document.getElementById("showsTabledaxue").style.display="block";
        // 遮罩层打开
        var fullScreenShade=document.getElementById("fullScreenShade");
        fullScreenShade.style.display="block";
        // 禁止屏幕滚动
        document.body.style.overflow = "hidden";
    }else if(name=="weilai"){
         // 显示弹出层
        document.getElementById("showsTableweilai").style.display="block";
        // 遮罩层打开
        var fullScreenShade=document.getElementById("fullScreenShade");
        fullScreenShade.style.display="block";
        // 禁止屏幕滚动
        document.body.style.overflow = "hidden";
    }
}

function closeDetiles(name) {
    if (name=="nianshao") {
        // 关闭弹出层
        var showsTable=document.getElementById("showsTable");
        showsTable.style.display="none";
        // 遮罩层关闭
        var fullScreenShade=document.getElementById("fullScreenShade");
        fullScreenShade.style.display="none";
        // 关闭屏幕滚动
        document.body.style.overflow = "auto";
    }else if(name=="qiuxue"){
         // 关闭弹出层
        var showsTable=document.getElementById("showsTabledaxue");
        showsTabledaxue.style.display="none";
        // 遮罩层关闭
        var fullScreenShade=document.getElementById("fullScreenShade");
        fullScreenShade.style.display="none";
        // 关闭屏幕滚动
        document.body.style.overflow = "auto";
    }else if(name=="weilai"){
         // 关闭弹出层
        document.getElementById("showsTableweilai").style.display="none";
        // 遮罩层关闭
        var fullScreenShade=document.getElementById("fullScreenShade");
        fullScreenShade.style.display="none";
        // 关闭屏幕滚动
        document.body.style.overflow = "auto";
    }
}
function liuyan(argument) {
    alert("由于谷歌留言器不兼容本地读取xml，所以此功能后续增加")
}