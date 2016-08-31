/**
 * Created by Chen on 16/2/29.
 *  Omnipotent validation 3.0.x 小而强壮str
 */




    !function ($,win ,undefined) {
        var Ovd={
            v:"3.0.0",
            reg:{
                empty: "^\\s{0}$"
            }

        };
        /*
         * 补全*/
        function makeQueue (cfg) {

            for(var i=0; i< cfg.length; i++){

                    //添加自定义
                    if(cfg[i].required == undefined){
                        cfg[i].$required =false;
                        cfg[i].$state =true;
                    }

                    if(cfg[i].required) {
                        cfg[i].$required = true;
                        cfg[i].$state = false;
                    }else{
                        cfg[i].$required =false;
                        cfg[i].$state =true;
                    }

                    if(!cfg[i].custom){
                        cfg[i].custom = false
                    }


            }
            return cfg
        };
        function dtd(fnDtd) {
            var ded;
            if(typeof fnDtd == 'boolean'){
                ded=$.Deferred();

                if(fnDtd){
                    ded.resolve()
                }else {
                    ded.reject()
                }
                return ded.promise()
            }else {
                return fnDtd
            }
        }

        Ovd.create =function (opts) {
                opts.config = makeQueue(opts.config)


            return new Validate(opts,Ovd.reg)
        };

        var Validate = function(opts){
            console.log(opts)

            this.opts =opts;
        };

        Validate.prototype.listen=function () {
            var _this=this,
                _opts = this.opts,
                _cfg=_opts.config;

            $.each(_cfg,function(i , item){
                if(!item.custom){

                    $(item.elem).on("focus",function () {
                        //还原装填值
                        item.$state = !item.$required;
                        _opts.init && _opts.init($(this));
                        _opts.notice && _opts.notice($(this),item.notice)

                    }).on("blur",function () {
                        if(new RegExp(Ovd.reg.empty).test($(this).val())){
                            //还原装填值
                            item.$state = !item.$required;
                            _opts.init && _opts.init($(this))
                        }else {
                            _this.parsers(item,$(this).val(),0);

                        }

                    })
                }
            });


            console.log(_cfg)
        };
        Validate.prototype.commit =function (param) {
            var _this=this,_opts = this.opts,
            _cfg=_opts.config;


            $.each(_cfg,function(i , item){
                var itemElem = $(item.elem),
                    charval = itemElem.val();
                if(!item.custom){
                    if(item.$required){
                        if(new RegExp(Ovd.reg.empty).test(charval)){
                            item.$state = !item.$required;
                            _opts.error && _opts.error(itemElem,item.required)
                        }else {
                            _this.parsers(item,$(this).val(),0);
                        }
                    }


                }


            });




            for(var i=0; i<_cfg.length; i++){

                if(!_cfg[i].$state){
                    param.sbtError && param.sbtError()
                    return
                }

            }

            param.sbtSucceed && param.sbtSucceed()
        };


        Validate.prototype.parsers =function (item,char,increase) {
            var _this=this;
            var _opts = this.opts;
            var itemErr;

            if(item.error){
                itemErr = item.error;

                if(increase > itemErr.length-1){
                    item.$state = true;
                    _opts.success && _opts.success($(item.elem))
                }
                if(itemErr[increase]){

                    dtd(itemErr[increase].level(char))
                    .done(function () {
                        _this.parsers(item,char,++increase)
                    }).fail(function () {
                        if(item.$state){
                            item.$state =false;
                            _opts.error && _opts.error($(item.elem),itemErr[increase].msg)
                        }
                    })

                }
            }


        };

        return win.Ovd = Ovd;
    }(jQuery , window);





    // parsers(arrError[i++])
