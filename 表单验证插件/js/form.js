/**
 * Created by Administrator on 2016/10/24.
 */
//jquerry插件规范
//匿名函数调用时传入参数创建闭包
(function(root,factory,plug){
    //调用闭包，传入参数（jQuery，插件名字）
    factory(root.jQuery,plug);
})(window,function($,plug){
    var _RULES_={
        "notempty":function(rules){
            var val=this.val();
            if(val===""){
                return false;
            }
            return true;
        },
        "regex":function(rules){
            var reg=new RegExp(rules);
            var val=this.val();
            return reg.test(val);
        },
        "equalto":function(rules){
            var val=this.val();
            var confirVal=$(rules).val();
            return val===confirVal;
        }
    };
    //通过JQuery插件规范fn接口创建名为plug的插件
    $.fn[plug]=function(){
        //获取所有的表单中的
       this.$fileds=this.find("input,select,textarea").not("[type=button],[type=reset],[type=submit]");
        this.$fileds.on("focus",function(){
            $(this).next().remove();
        }).on("blur",function(){
            $(this).next().remove();
        }).on("keyup",function(){
           var $filed=$(this);
            var valid=true;
            $.each(_RULES_,function(key,func){
               var value=$filed.data(key);
                if(value){
                    valid=func.call($filed,value);
                    var $p=$filed.next();
                    //验证结果为假
                    if(!valid){
                        $filed.removeClass("error success").addClass("error");
                        $filed.after('<p class="error-message">'+$filed.data(key+"-message")+'</p>');
                        return false;
                    }else {
                        $filed.removeClass("error success").addClass("success");
                        $filed.next().remove();
                    }

                }
            });
        })
    }
},"formValidator");