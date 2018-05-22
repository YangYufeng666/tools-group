/**
 * Created by Administrator on 2016/10/21.
 */
window.onload = function () {
    function $(selecter) {
        var doms = document.querySelectorAll(selecter);
        return doms.length > 1 ? doms : doms[0];
    }

    var wrap = $(".wrap");
    var box = $(".box");
    var magnifier = $(".magnifier");
    var showimg = $(".showbig");
    box.onmousemove = show;
    function show(e) {
        var e = e || window.event;
        var left = e.clientX - wrap.offsetLeft - box.offsetLeft - magnifier.clientWidth / 2;
        var top = e.clientY - wrap.offsetTop - box.offsetTop - magnifier.clientHeight / 2;
        var maxX = box.offsetWidth - magnifier.offsetWidth;
        var maxY = box.offsetHeight - magnifier.offsetHeight;
        //left=Math.min(maxX,Math.max(0,left));
        //top=Math.min(maxY,Math.max(0,top));
        left = left < 0 ? 0 : left > maxX ? maxX : left;
        top = top < 0 ? 0 : top > maxX ? maxX : top;
        magnifier.style.left = left + "px";
        magnifier.style.top = top + "px";
        var scoLeft = left / maxX * 100 + "%";
        var scoTop = top / maxY * 100 + "%";
        var pos = scoLeft + " " + scoTop;
        showimg.style.backgroundPosition = pos;
    }
};
