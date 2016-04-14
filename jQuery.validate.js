/**
 * Created by Chen on 16/2/29.
 */
!function ($,win ,undefined) {
    var Validate = function(options){
        this.option =options;
    };
    Validate.prototype = {
        constructor:Validate,
        init:function(){
            var _this=this,_valObj=this.option.valObj;
            $.each(_valObj,function(i , va){
                //$(va.ValidateClass).data("validate",va)
                if(va.isInput) _this.eventVal(va)
            });
        },
        eventVal:function(b){
            $(b.ValidateClass).data("isFcous",true).focus(function(){
                $(this).data("isFcous",true);

                typeof  b.onFocusCall == "function" &&   b.onFocusCall($(this))

            }).blur(function(){

                var _this=this,
                    _mod = typeof b.onBlurMod == "boolean" ? b.onBlurMod=!1 : b.onBlurMod,
                    $this=$(this),
                    _str=$(this).val(),
                    _intBol=  typeof b.isNull == "function" ? b.isNull(_str) : b.isNull;

                if(!(_intBol && $this.data("isFcous"))) {
                    _mod && $.each(_mod, function (i, va) {

                        if(va.isCustom){
                            va.magsCall && va.magsCall($this);
                        }else{
                            $this.data("isFcous", typeof va.regFnc =="function" ? va.regFnc(_str) :va.regFnc);
                            if (!$this.data("isFcous")) {
                                va.magsCall && va.magsCall($this);
                                return $this.data("isFcous");
                            }
                        }

                    });
                }
                if($this.data("isFcous") && !_intBol) b.succeed && b.succeed($this);
                if($this.data("isFcous") && _intBol)  b.initCall && b.initCall($this);
            })


        },
        submitCtrl:function(){
            var _this=this,
                _valObj=this.option.valObj,
                _subClass=this.option.subClass,
                _subSucceedCall = this.option.subSucceedCall,
                _subErrorCall = this.option.subErrorCall;
            $(_subClass).on("click",function(){
                var submitIint=!0,$this=$(this),isCommit=!0;
                $.each(_valObj,function(i , va){
                    var $ValidateClass=$(va.ValidateClass);
                    if(va.isInput){

                        var regFncBol=!1,
                            str=$ValidateClass.val(),
                            _intBol = typeof va.isNull == "function" ? va.isNull(str) : va.isNull,
                            _onBlurMod = typeof  va.onBlurMod == "boolean" ? va.onBlurMod = !1 :va.onBlurMod;
                        console.log(_intBol)

                        if(_intBol){
                            if(va.isRequired){
                                va.isNullCall($ValidateClass);
                                isCommit && (isCommit = !1)
                            }

                        }else{
                            _onBlurMod  && $.each(_onBlurMod, function (key, vaj) {
                                if(!vaj.isCustom){

                                    regFncBol = typeof vaj.regFnc =="function" ? vaj.regFnc(str) :vaj.regFnc;
                                    !regFncBol && typeof vaj.magsCall == "function" && vaj.magsCall($ValidateClass) ;

                                }else{
                                    vaj.magsCall && vaj.magsCall($ValidateClass);
                                }

                                if(isCommit && !regFncBol){
                                    isCommit =!1
                                }

                                return regFncBol;
                            });
                        }
                    }else{
                        //console.log(va.stateCall())
                        //??????
                        if(va.isRequired && !va.state($ValidateClass) ){
                            isCommit =!1,
                                va.stateCall($ValidateClass)
                        }


                    }
                });

                isCommit ? _subSucceedCall(): _subErrorCall && _subErrorCall()
            })
        }

    };
    win.Validate=Validate;
}(jQuery,window)
