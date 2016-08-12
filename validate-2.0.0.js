/**
 * Created by Chen on 16/2/29.
 *  Validation 2.0 小而强壮
 */
!function ($,win ,undefined) {
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
        for(var i=0; i< error.length; i++){
            if(!error[i].level(char)){
                errorbol.pass= false;
                errorbol.msg= error[i].msg;
                break;
            }
        }

        return errorbol

    }
    
    var Validation = function(options){
        this.option =options;
        this.option.vdn="vdn-pass";
        this.option.config = CompletionAllCustom(this.option.config);
        this.notempty=/^\S+$/;
        console.log(this.option.config)

    };
    Validation.prototype = {
        constructor:Validation,
        init:function(){
            var _this=this,
                _op = this.option,
                Valconfig=this.option.config;


            $.each(Valconfig,function(i , item){
                if(!item.custom){
                    $(item.elem).on("focus",function () {
                        _op.init($(this));
                        _op.notice($(this),item.notice)

                    }).on("blur",function () {
                        var charval = $(this).val(),geterror;

                            if(_this.notempty.test(charval)){
                                geterror=errorinfo(charval,item.error);

                                    if(geterror.pass){
                                        _op.success($(this))
                                    }else{
                                        (geterror.msg == false || geterror.msg == undefined) ? void(0) : _op.error($(this),geterror.msg)
                                    }

                            }else{
                                _op.init($(this))
                            }


                    })
                }
            });
        },
        commit:function(){
            var _this=this,
                _op = this.option,
                Valconfig=this.option.config;
            $(_op.sbtBtn).on("click",function () {
                var canSubmit = true;
                $.each(Valconfig,function (i , item) {
                    var itemElem = $(item.elem),
                    charval = itemElem.val(),geterror;

                    if(item.required == true || typeof item.required == "string"){

                        if(item.custom){
                            if($(item.elem).attr(_op.vdn) != "true"){
                                canSubmit = false;
                                item.customcall(itemElem,false)
                            }else{
                                item.customcall(itemElem,true)
                            }
                        }else{
                            if(_this.notempty.test(charval)){
                                geterror = errorinfo(charval,item.error);
                                if(geterror.pass){
                                    _op.success(itemElem)
                                }else{


                                    canSubmit = false;
                                    _op.error(itemElem,geterror.msg)
                                }

                            }else{


                                canSubmit = false;
                                _op.required(itemElem,item.required)
                            }

                        }

                    }else{
                        if(item.custom){
                            if($(item.elem).attr(_op.vdn) != "true"){
                                canSubmit = false;
                                item.customcall(itemElem,false)
                            }else{
                                item.customcall(itemElem,true)
                            }
                        }else {
                            if (_this.notempty.test(charval)) {
                                geterror = errorinfo(charval, item.error);
                                if (geterror.pass) {
                                    _op.success(itemElem)
                                } else {

                                    _op.error(itemElem, geterror.msg)
                                    canSubmit = false;
                                }
                            }
                        }
                    }

                });
                console.log(canSubmit)
                if(canSubmit){
                    _op.sbtSucceed()
                }else{
                    _op.sbtError()
                }
            });

        }

    };
    win.validation=Validation;
}(jQuery,window);
