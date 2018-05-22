/**
 * Created by Administrator on 2016/10/16.
 */
window.onload = function () {
    var time=25;
    var initDeg = 1000;//面对观众的距离
    var imgLen = 12;//展品个数{0-12}
    var imgobj = "", timer;
    var myplatform = document.getElementById("platform");
    myplatform.style.transform = "perspective(" + initDeg + "px) rotateY(0deg) rotateX(0deg)";
    for (var i = 0; i < imgLen; i++) {
        imgobj += '<img src="img/b' + i + '.jpg">';
    }
    myplatform.innerHTML = imgobj;
    var imgItems = myplatform.getElementsByTagName("img");
    var _x, _y, x, y, _offsetX, _offsetY, _rotX = 0, _rotY = 0;
    var Deg = 360 / imgItems.length;
    for (var i = 0; i < imgItems.length; i++) {
        imgItems[i].style.transform = 'rotateY(' + Deg * i + 'deg) translateZ(350px)';
        //禁止拖拽图片
        imgItems[i].ondragstart = function () {
            return false;
        };
        imgItems[i].onmouseover = function () {
            this.style['transform'] = this.style['-webkit-transform'] += 'scale(2)';
            clearInterval(timer);
        };
        imgItems[i].onmouseout = function () {
            this.style['transform'] = this.style['-webkit-transform'].replace('scale(2)', "");
            autoPlay();
        }
    }
    document.onmousedown = function (event) {
        event = event || window.event;
        //鼠标按下的鼠标坐标
        _x = event.clientX;
        _y = event.clientY;
        this.onmousemove = function (event) {
            //清除浏览器默认的文本内容选中事件 -webkit or -ms
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            event = event || window.event;
            //鼠标移动的鼠标坐标
            x = event.clientX;
            y = event.clientY;
            //计算位移偏移量
            _offsetX = x - _x;
            _offsetY = y - _y;
            //旋转家角度变换
            _rotX -= _offsetY * 0.2;
            _rotY += _offsetX * 0.2;
            myplatform.style.transform = "perspective(" + initDeg + "px) rotateY(" + _rotY + "deg) rotateX(" + _rotX + "deg)";
            _x = event.clientX;
            _y = event.clientY;
        };
        this.onmouseup = function () {
            this.onmousemove = null;
        };
    };
    function autoPlay() {
        //清除定时器在新建（鼠标时释放是也会调用 如果不清除就会有两个定时器）
        clearInterval(timer);
        timer = window.setInterval(function () {
            _rotY += 0.1;
            myplatform.style.transform = "perspective(" + initDeg + "px) rotateY(" + _rotY + "deg) rotateX(" + _rotX + "deg)";
        }, time);
    }

    autoPlay();
};
