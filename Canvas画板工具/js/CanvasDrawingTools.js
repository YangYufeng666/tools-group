/**
 * Created by Administrator on 2016/11/4.
 */
window.onload = function () {
    document.onselectstart = function () {
        return false;
    };
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    //标记鼠标未按下
    var flag = false;
    var pen = true;
    ctx.lineWidth = 4;
    function drawText() {
        ctx.beginPath();
        //设置颜色
        ctx.strokeStyle = "rgba(0,0,0,0.5)";
        ctx.font = "30px 华文楷体";
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        //设置渐变色
        gradient.addColorStop("0", "red");
        gradient.addColorStop("0.5", "black");
        gradient.addColorStop("1", "#dddeee");
        ctx.fillStyle = gradient;
        ctx.fillText("Canvas画板工具", 250, 200);
    }

    drawText();
    /*
     * mousedown
     * mousemove
     * mouseup
     * */

    canvas.onmousedown = function (e) {
        if (!flag) {
            var e = e || window.event;
            //获取canvas内的坐标
            var StartX = e.clientX - canvas.offsetLeft;
            var StartY = e.clientY - canvas.offsetTop;
            //alert("x:"+x+" y:"+y);
            if (pen) {
                //画笔
                ctx.moveTo(StartX, StartY);
            } else {
                //橡皮擦
                ctx.clearRect(StartX, StartY, 16, 16);

                drawText();
            }

        }
        //鼠标已经按下
        flag = true;
    };
    canvas.onmousemove = function (e) {
        if (flag) {
            var e = e || window.event;
            var MoveX = e.clientX - canvas.offsetLeft;
            var MoveY = e.clientY - canvas.offsetTop;
            if (pen) {
                ctx.lineTo(MoveX, MoveY);
                ctx.stroke();
            } else {
                //橡皮擦
                ctx.clearRect(MoveX, MoveY, 16, 16);
                drawText();
            }

        }
    };
    canvas.onmouseup = function () {
        //鼠标未按下
        flag = false;
    };
    /*
     * 工具（颜色，粗细，画，擦，清）
     * */
    //颜色
    var colorTag = document.getElementsByClassName("color");
    for (var i = 0; i < colorTag.length; i++) {
        colorTag[i].onclick = function () {
            var chooseTag=document.getElementsByClassName("color active")[0];
            chooseTag.className=chooseTag.className.replace("active","");
            this.className+=" active";
            ctx.beginPath();
            ctx.strokeStyle = this.getAttribute("data-color");
        }
    }
    ;
    //粗细
    var boldTag = document.getElementsByClassName("bold");
    for (var i = 0; i < boldTag.length; i++) {
        boldTag[i].onclick = function () {
            var chooseTag=document.getElementsByClassName("bold active")[0];
            chooseTag.className=chooseTag.className.replace("active","");
            this.className+=" active";
            //结束上面的绘画
            ctx.beginPath();
            ctx.lineWidth = this.getAttribute("data-bold");

        }
    }
    //(操作)
    // 画
    // 擦--
    // 清--直接清空整个画布
    var penTag = document.getElementsByClassName("pen")[0];
    var eraserTag = document.getElementsByClassName("eraser")[0];
    penTag.onclick = function () {
        ctx.beginPath();
        eraserTag.className = eraserTag.className.replace("active", "");
        this.className += " active";
        pen = true;
    };
    eraserTag.onclick = function () {
        ctx.beginPath();
        penTag.className = penTag.className.replace("active", "");
        this.className += " active";
        pen = false;
    };
    document.getElementsByClassName("empty")[0].onclick = function () {
        if (confirm("你确定清空画布吗？")) {
            ctx.beginPath();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawText();
        }
    };
};