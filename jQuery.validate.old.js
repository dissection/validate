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
            var _this=this,_valObj=this.option.config;
            $.each(_valObj,function(i , va){
                if(va.isInput) _this.eventVal(va)
            });
        },
        eventVal:function(b){
            $(b.elem).data("msg",{"isfcous":!0}).focus(function(){
                $(this).data("msg").isfcous=!0;

                typeof  b.onFocusCall == "function" &&   b.onFocusCall($(this))

            }).blur(function(){

                var _this=this,
                    _mod = typeof b.level == "boolean" ? b.level=!1 : b.level,
                    $this=$(this),
                    _str=$(this).val(),
                    _intBol=  typeof b.isNull == "function" ? b.isNull(_str) : b.isNull;

                if(!(_intBol && $(this).data("msg").isfcous)) {
                    _mod && $.each(_mod, function (i, va) {

                        if(va.isCustom){
                            va.verifycall && va.verifycall($this);
                        }else{
                            $this.data("msg").isfcous = typeof va.verify =="function" ? va.verify(_str) :va.verify;
                            //$this.data("isFcous", typeof va.regFnc =="function" ? va.regFnc(_str) :va.regFnc);
                            if (!$this.data("msg").isfcous) {
                                va.verifycall && va.verifycall($this);
                                return $this.data("msg").isfcous
                            }
                        }

                    });
                }
                if($this.data("msg").isfcous && !_intBol) b.succeed && b.succeed($this);
                if($this.data("msg").isfcous && _intBol)  b.initCall && b.initCall($this);
            })


        },
        submitCtrl:function(){
            var _this=this,
                _valObj=this.option.config,
                _subClass=this.option.subClass,
                _subSucceedCall = this.option.subSucceedCall,
                _subErrorCall = this.option.subErrorCall;
            $(_subClass).on("click",function(){
                var submitIint=!0,$this=$(this),isCommit=!0;
                $.each(_valObj,function(i , va){
                    var $ValidateClass=$(va.elem);
                    if( $ValidateClass.length == 0 ) return true;
                    if(va.isInput){

                        var regFncBol=!1,
                            str=$ValidateClass.val(),
                            _intBol = typeof va.isNull == "function" ? va.isNull(str) : va.isNull,
                            _onBlurMod = typeof  va.level == "boolean" ? va.level = !1 :va.level;
                        //console.log(_intBol)

                        if(_intBol){
                            if(va.isRequired){
                                va.isNullCall($ValidateClass);
                                isCommit && (isCommit = !1)
                            }

                        }else{
                            _onBlurMod  && $.each(_onBlurMod, function (key, vaj) {
                                if(!vaj.isCustom){

                                    regFncBol = typeof vaj.verify =="function" ? vaj.verify(str) :vaj.verify;
                                    !regFncBol && typeof vaj.verifycall == "function" && vaj.verifycall($ValidateClass) ;

                                }else{
                                    vaj.verifycall && vaj.verifycall($ValidateClass);
                                }
                                if(isCommit && !regFncBol){
                                    isCommit =!1
                                }
                                return regFncBol;
                            });
                        }
                    }else{
                        
                        if(va.isRequired && !va.condition($ValidateClass)){
                            isCommit =!1
                        }

                    }
                });

                isCommit ? _subSucceedCall(): _subErrorCall && _subErrorCall()
            })
        }

    };
    win.Validate=Validate;
}(jQuery,window);
