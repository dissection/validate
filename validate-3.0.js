/**
 * Created by Chen on 16/2/29.
 *  Omnipotent validation 3.0.x 小而强壮
 */

!function (win,$,undefined) {

    var Ovd={
        v:"3.0.0",
        reg:{
            notempty: "^\\S+$"
        }

    };

    function createObject( proto ) {
        var f;

        if ( Object.create ) {
            return Object.create( proto );
        } else {
            f = function() {};
            f.prototype = proto;
            return new f();
        }
    }

    //转换符合函数
    function SubItem(opt) {
        var f = createObject( proto )

        return
    }
    
    /*
    * 补全*/
    Ovd.MakeQueue =function(opts) {

        var cfg = opts.config;

        for(var i=0; i< cfg.length; i++){
            //添加自定义
            if(cfg[i].custom == undefined){
                cfg[i].$custom =false
            }

            if(typeof cfg[i].required == "string"){
                cfg[i].requiredfn = {
                    level:function (char) {
                        return new RegExp(Ovd.reg.notempty).test(char)
                    },
                    msg:cfg[i].required
                };
                cfg[i].$required = true

            }else{
                cfg[i].$required = false
            }


            if(typeof cfg[i].notice == "string"){
                cfg[i].$notice = true
            }else {
                cfg[i].$notice = false
            }

            if(cfg[i].error == undefined){
                cfg[i].$error = true
            }

            if(cfg[i].init == undefined){
                 cfg[i].$init = true
            }

            if( cfg[i].success == undefined){
                cfg[i].$success = true
            }

            if(cfg[i].error == undefined){
                cfg[i].$error = false
            }else {
                cfg[i].$error = true
            }

        }

        return opts
    };

    // function MakerequiredFn(mess) {
    //         var mes =mess
    //     return function (b) {
    //         var dtd = $.Deferred();
    //         var mess=mes
    //         console.log(dtd)
    //         if(b){
    //             dtd.resolve();
    //         }else{
    //             dtd.reject();
    //         }
    //         return dtd.promise();
    //     }
    // }


    Ovd.create =function (opts) {
           var opts = Ovd.MakeQueue(opts)


            console.log(opts)
        return new Validate(opts)
    };



    var Validate = function(opts){
        var _this =this;
        var _cfg=opts.config;
        this.opts = opts;
        this.topics = {};
    console.log(_cfg)

        this.Topic = function( id ) {
            var callbacks,
                method,
                topic = id && _this.topics[ id ];

            if ( !topic ) {
                callbacks = $.Callbacks();
                topic = {
                    publish: callbacks.fire,
                    subscribe: callbacks.add,
                    unsubscribe: callbacks.remove
                };
                if ( id ) {
                    _this.topics[ id ] = topic;
                }
            }
            return topic;
        };
        this.DeferredFactory=function (fn) {

            var dtd=$.Deferred();

            if(fn()){
                dtd.resolve();
            }else {
                dtd.reject();
            }
            return dtd.promise();

        }

        //判断添加应该存在的函数
        for(var i=0; i<_cfg.length; i++){

            if(_cfg[i].$init && opts.init){
                this.Topic(_cfg[i].elem).subscribe( opts.init )
            }

        }
        console.log( this.topics )

    };

    Validate.prototype.listen=function () {
        var _this =this,_opts=this.opts,_cfg=_opts.config

        for(var i=0; i<_cfg.length; i++){

            _this.Topic(_cfg[i].elem).publish("12123")

        }


    };

    return win.Ovd = Ovd;

}(window,jQuery)