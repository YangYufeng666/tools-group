/**
 * Created by Administrator on 2016/11/14.
 */
(function (root, factory, plug) {
    //root代表作用域
    //factory工厂函数
    //plug代表生产插件的名字
    factory(root, plug);
})(window, function (window, plug) {
    /*
     data-my-required="true" 是否必填
     data-my-required-message="The username is required and cannot be empty" 必填项错误提示信息

     data-my-regexp="^[a-zA-Z0-9]+$" 正则表达验证
     data-my-regexp-message="The username can only consist of alphabetical, number" 正则验证错误提示信息

     data-my-equals="JQuery Selecter" 目标选择器
     data-my-equals-message="" 错误提示

     data-my-email="true" 邮箱的格式
     data-my-email-message="The input is a valid email address" 错误提示


     data-my-integer="true" 填写整数
     data-my-integer-message="The input is a valid integer" 错误提示


     data-my-greaterthan="10" 大于多少
     data-my-greaterthan-message="The input must be greater than or equal to 10" 错误提示


     data-my-lessthan="100" 小于多少
     data-my-lessthan-message="The input must be less than 100" 错误提示

     */
    //验证规则引擎
    var __RULES__ = {
        "required": function () {
            return this.val() != "";
        },
        "regexp": function () {
            var value = this.val();
            var regexp = new RegExp(this.data("my-regexp"));
            return regexp.test(value);
        },
        "equals": function () {
            return $(this.data("my-equals")).val() == this.val();
        },
        "email": function () {
            return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(this.val());
        },
        "integer": function () {
            return !isNaN(this.val());
        },
        "telnumber":function(){
            return /^0?1[3|4|5|8][0-9]\d{8}$/.test(this.val());
        },
        "greaterthan": function () {
            return Number(this.val()) > Number(this.data("my-greaterthan"));
        },
        "lessthan": function () {
            return Number(this.val()) < Number(this.data("my-lessthan"));
        }
    };
    var __PROTOTYPE__ = {
        submit: function () {
            var errors = this.$fileds.trigger(this.trigger).filter(".has-error").length;
            if (errors == 0) {
                //this.submitType=="normal"&&this.get(0).submit();
                if (this.submitType == "normal") {
                    this.get(0).submit();
                } else if (this.submitType == "ajax") {
                    this._ajaxSubmit();
                }
            }
        },
        _ajaxSubmit: function () {
        alert("ajax提交");
        }
    };
    //plug默认参数
    var __DEFAULTS__ = {
        trigger: "keyup",
        errorMessge: "invalid value",
        submitType: "normal"
    };
    //插件的扩展
    $.fn[plug] = function (options) {
        //jquery功能扩展 继承
        $.extend(this, __DEFAULTS__, options,__PROTOTYPE__);
        this.$fileds = this.find("input,select,textarea").not('[type=button],[type=submit],[type=reset]');
        var _this = this;
        this.$fileds.on(this.trigger, function () {
            var $this = $(this).removeClass("has-error has-success");
            //首先移出下一个节点
            $this.next().remove();
            var result = true;
            $.each(__RULES__, function (rules, fuc) {
                //判断input有没有某个验证引擎
                if ($this.data("my-" + rules)) {
                    result = fuc.call($this);
                    if (!result) {
                        $this.after("<p class='error'>" + ($this.data("my-" + rules + "-message") || _this.errorMessge) + "</p>");
                    }
                    return result;
                }
            });
            $this.addClass(result ? "has-success" : "has-error");
        });
        this.find("[data-my-submit=true]").on("click", function () {
            _this.submit();
        });
    }
}, "MyValider");