/**
 * Created by Chen on 16/2/29.
 *  Omnipotent validation 2.0.x 小而强壮
 */

!function ($,win ,undefined) {
    var Ovd={
        v:"2.0.3"
    };
    //补全custom
    function CompletionAllCustom(cfg) {
        for(var i=0; i< cfg.length; i++){
            if(cfg[i].custom == undefined || cfg[i].custom == false){
                cfg[i]["custom"] = false;
            }
        }
        return cfg
    }

    //error 错误
    function errorinfo(char,error) {
        var errorbol = {
            pass:true
        };
        if(error && error.length > 0 ){
            for(var i=0; i< error.length; i++){
                if(!error[i].level(char)){
                    errorbol.pass= false;
                    errorbol.msg= error[i].msg;
                    break;
                }
            }
        }


        return errorbol

    }
    Ovd.create=function (opts) {
        return new Validation(opts)
    };
    var Validation = function(options){
        this.option =options;
        this.option.vdn="data-vdn";
        this.option.config = CompletionAllCustom(this.option.config);
        this.notempty=/^\S+$/;
        // console.log(this.option.config)

    };
    Validation.prototype = {
        constructor:Validation,
        listen:function(){
            var _this=this,
                _op = this.option,
                Valconfig=this.option.config;


            $.each(Valconfig,function(i , item){
                if(!item.custom){
                    $(item.elem).on("focus",function () {
                        // console.log("focus")
                        _op.init && _op.init($(this));
                        _op.notice && _op.notice($(this),item.notice)

                    }).on("blur",function () {
                        // console.log("blur")
                        var charval = $(this).val(),geterror;

                        if(_this.notempty.test(charval)){
                            geterror=errorinfo(charval,item.error);

                            if(geterror.pass){
                                _op.success && _op.success($(this))
                            }else{
                                (geterror.msg == false || geterror.msg == undefined) ? void(0) : _op.error($(this),geterror.msg)
                            }

                        }else{
                            _op.init &&  _op.init($(this))
                        }


                    })
                }
            });
        },
        commit:function(opt){
            var _this=this,
                _op = this.option,
                Valconfig=this.option.config;
            var canSubmit = true,dataVdn;
            $.each(Valconfig,function (i , item) {
                var itemElem = $(item.elem),
                    charval = itemElem.val(),geterror;

                if(item.required == true || typeof item.required == "string"){

                    if(item.custom){
                        //一些极端的情况
                        dataVdn = itemElem.attr(_op.vdn) == "true" ? true :false;
                        if(typeof item.customcall == "function"){

                            canSubmit =  item.customcall(itemElem,dataVdn);
                        }else{

                            canSubmit=dataVdn
                        }
                        console.log(canSubmit)
                        if(!canSubmit){
                            return false
                        }
                    }else{
                        if(_this.notempty.test(charval)){
                            geterror = errorinfo(charval,item.error);
                            // console.log(geterror)
                            if(geterror.pass){
                                _op.success && _op.success(itemElem)
                            }else{

                                _op.error(itemElem,geterror.msg)
                                canSubmit = false;
                                return false
                            }

                        }else{
                            //您设置了必填选项 这里必须 有required 函数
                            typeof _op.required != "function" ? $.error( item.elem+"元素:设置了required参数=>required方法必须存在") :_op.required(itemElem,item.required)
                            canSubmit = false;
                            return false
                        }

                    }

                }else{
                    if(item.custom){
                        dataVdn = itemElem.attr(_op.vdn) == "true" ? true :false;
                        if(typeof item.customcall == "function"){
                            
                            canSubmit =  item.customcall(itemElem,dataVdn);
                        }else{

                            canSubmit=dataVdn
                        }
                        console.log(canSubmit)
                        if(!canSubmit){
                            return false
                        }

                    }else {
                        if (_this.notempty.test(charval)) {
                            geterror = errorinfo(charval, item.error);
                            if (geterror.pass) {
                                _op.success && _op.success(itemElem)
                            } else {

                                _op.error(itemElem, geterror.msg)
                                canSubmit = false;
                                return false
                            }
                        }
                    }
                }

            });
            // console.log(canSubmit)
            if(canSubmit){
                opt.sbtSucceed && opt.sbtSucceed()
            }else{
                opt.sbtError && opt.sbtError()
            }

        }

    };
    return win.Ovd = Ovd;
}(jQuery,window);
