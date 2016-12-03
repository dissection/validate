/**
 * Created by Chen on 16/2/29.
 *  Omnipotent validation 3.0.x 小而强壮str
 */




!function ($, win, undefined) {
    var Ovd = {
        v: "3.0.0",
        reg: {
            empty: "^\\s{0}$"
        }
    };

    /**
     * 补全参数
     * @param cfg
     * @returns {*}
     */
    function makeQueue(cfg) {

        for (var i = 0; i < cfg.length; i++) {

            //添加自定义
            if (cfg[i].required == undefined) {
                cfg[i].$required = false;
                cfg[i].$state = true;
            }

            if (cfg[i].required) {
                cfg[i].$required = true;
                cfg[i].$state = false;
            } else {
                cfg[i].$required = false;
                cfg[i].$state = true;
            }

            if (!cfg[i].custom) {
                cfg[i].custom = false
            }


        }
        return cfg
    }


    /**
     * 创建实体类
     * @param opts
     * @returns {Validate}
     */
    Ovd.create = function (opts) {

        opts.config = makeQueue(opts.config)
        return new Validate(opts)
    };

    var Validate = function (opts) {
        console.log(opts)

        this.opts = opts;
    };

    Validate.prototype.listen = function () {
        var _this = this,
            _opts = this.opts,
            _cfg = _opts.config;

        $.each(_cfg, function (i, item) {
            if (!item.custom) {

                $(item.elem).on("focus", function () {
                    //还原装填值
                    item.$state = !item.$required;
                    _opts.init && _opts.init($(this));
                    _opts.notice && _opts.notice($(this), item.notice)

                }).on("blur", function () {
                    if (new RegExp(Ovd.reg.empty).test($(this).val())) {
                        //还原装填值
                        item.$state = !item.$required;
                        _opts.init && _opts.init($(this))
                    } else {
                        _this.parsers(item, $(this).val());

                    }
                })
            }
        });

    };
    Validate.prototype.commit = function (param) {
        var _this = this, _opts = this.opts,
            _cfg = _opts.config;

        $.each(_cfg, function (i, item) {
            var itemElem = $(item.elem),
                charval = itemElem.val();
            if (!item.custom) {

                if (new RegExp(Ovd.reg.empty).test(charval)) {
                    item.$state = !item.$required;
                    _opts.init && _opts.init(itemElem);
                    if (item.$required) {
                        _opts.error && _opts.error(itemElem, item.required)
                    }

                } else {

                    _this.parsers(item, itemElem.val());
                }

            } else {
                if (item.$state) {
                    _opts.success && _opts.success(itemElem)

                } else {
                    if (item.cerror) {
                        _opts.error && _opts.error(itemElem, item.cerror)
                    } else {
                        $.error('请设置报错项')
                    }
                }
            }
        });


        for (var i = 0; i < _cfg.length; i++) {

            if (!_cfg[i].$state) {
                param.sbtError && param.sbtError()
                return
            }
        }

        param.sbtSucceed && param.sbtSucceed()
    };


    Validate.prototype.parsers = function (item, char) {
        var _this = this;
        var _opts = this.opts;
        var itemErr=item.error;

        if (itemErr) {

            for ( var i= 0; i< itemErr.length; i++){
                if(itemErr[i].level(char)){
                    item.$state = true;
                    _opts.success && _opts.success($(item.elem))
                }else {
                    item.$state = false;
                    _opts.error && _opts.error($(item.elem), itemErr[i].msg)
                }
            }

        }


    };

    /**
     * 设置验证列状态 *只能操作 自定义验证的状态*
     * @param elem
     * @param state
     */
    Validate.prototype.setState = function (elem, state, cerr) {
        var _cfg = this.opts.config;

        for (var i = 0; i < _cfg.length; i++) {
            if (_cfg[i].elem == elem) {

                if (_cfg[i].custom) {

                    _cfg[i].$state = state;
                    if(!state){
                        if(typeof cerr == "string"){
                            _cfg[i].cerror = cerr
                        }else {
                            $.error("请填写正确的报错项")
                        }

                    }

                }else {
                    $.error("设置指定的报错项,必须是自定义列")
                }

                break
            }
        }

    };

    /**
     * 获取验证列状态
     * @param elem
     * @param state
     * @returns {boolean|*}
     */
    Validate.prototype.getState = function (elem, state) {
        var _cfg = this.opts.config;

        for (var i = 0; i < _cfg.length; i++) {
            if (_cfg[i].elem == elem) {
                return _cfg[i].$state
            }
        }

    };

    win.Ovd = Ovd;
}(jQuery, window);

