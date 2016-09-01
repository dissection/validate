/**
 * Created by Chen on 16/2/29.
 *  Omnipotent validation 3.0.x 小而强壮str
 */

!function ($, win, undefined) {
    var Ovd = {
        v: "3.0.0",
        reg: {
            decmal: "^([+-]?)\\d*\\.\\d+$",
            // 浮点数
            decmal1: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*$",
            // 正浮点数
            decmal2: "^-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$",
            // 负浮点数
            decmal3: "^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$",
            // 浮点数
            decmal4: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$",
            // 非负浮点数（正浮点数 + 0）
            decmal5: "^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$",
            // 非正浮点数（负浮点数 +
            // 0）
            intege: "^-?[1-9]\\d*$",
            // 整数
            intege1: "^[1-9]\\d*$",
            // 正整数
            intege2: "^-[1-9]\\d*$",
            // 负整数
            num: "^([+-]?)\\d*\\.?\\d+$",
            // 数字
            num1: "^[1-9]\\d*|0$",
            // 正数（正整数 + 0）
            num2: "^-[1-9]\\d*|0$",
            // 负数（负整数 + 0）
            ascii: "^[\\x00-\\xFF]+$",
            // 仅ACSII字符
            chinese: "^[\\u4e00-\\u9fa5]+$",
            // 仅中文
            color: "^[a-fA-F0-9]{6}$",
            // 颜色
            date: "^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$",
            // 日期
            email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$",
            // 邮件
            idcard: "^[1-9]([0-9]{14}|[0-9]{17})$",
            // 身份证
            ip4: "^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$",
            // ip地址
            letter: "^[A-Za-z]+$",
            // 字母
            letter_l: "^[a-z]+$",
            // 小写字母
            letter_u: "^[A-Z]+$",
            // 大写字母
            mobile: "^0?(13|15|18|14|17)[0-9]{9}$",
            // 手机
            empty: "^\\s{0}$",
            // 非空
            notempty: "^\\S+$",
            // 非空
            password: "^.*[A-Za-z0-9\\w_-]+.*$",
            // 密码
            fullNumber: "^[0-9]+$",
            // 数字
            picture: "(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$",
            // 图片
            qq: "^[1-9]*[1-9][0-9]*$",
            // QQ号码
            rar: "(.*)\\.(rar|zip|7zip|tgz)$",
            // 压缩文件
            tel: "^[0-9\-()（）]{7,18}$",
            // 电话号码的函数(包括验证国内区号,国际区号,分机号)
            url: "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$",
            // url
            username: "^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+$",
            // 户名
            deptname: "^[A-Za-z0-9_()（）\\-\\u4e00-\\u9fa5]+$",
            // 单位名
            zipcode: "^\\d{6}$",
            // 邮编
            realname: "^[A-Za-z\\u4e00-\\u9fa5]+$",
            // 真实姓名
            companyname: "^[A-Za-z0-9_()（）\\-\\u4e00-\\u9fa5]+$",
            companyaddr: "^[A-Za-z0-9_()（）\\#\\-\\u4e00-\\u9fa5]+$",
            companysite: "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&#=]*)?$"
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
            } else {
                cfg[i].$cerr = 0
            }


        }
        return cfg
    }

    /**
     * 延迟对象转换
     * @param fnDtd
     * @returns {*}
     */
    function dtd(fnDtd) {
        var ded;
        if (typeof fnDtd == 'boolean') {
            ded = $.Deferred();

            if (fnDtd) {
                ded.resolve()
            } else {
                ded.reject()
            }
            return ded.promise()
        } else {
            return fnDtd
        }
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
                        _this.parsers(item, $(this).val(), 0);

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

                    _this.parsers(item, itemElem.val(), 0);
                }

            } else {
                if (item.$state) {
                    _opts.success && _opts.success(itemElem)

                } else {
                    if (item.$cerr > -1) {
                        _opts.error && _opts.error(itemElem, item.error[item.$cerr].msg)
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


    Validate.prototype.parsers = function (item, char, increase) {
        var _this = this;
        var _opts = this.opts;
        var itemErr;

        if (item.error) {
            itemErr = item.error;

            if (increase > itemErr.length - 1) {
                item.$state = true;
                _opts.success && _opts.success($(item.elem))
            }
            if (itemErr[increase]) {

                dtd(itemErr[increase].level(char))
                    .done(function () {
                        _this.parsers(item, char, ++increase)
                    }).fail(function () {
                    if (item.$state) {
                        item.$state = false;
                    }
                    _opts.error && _opts.error($(item.elem), itemErr[increase].msg)
                })

            }
        }


    };

    /**
     * 设置验证列状态 *一般操作 自定义验证的状态*
     * @param elem
     * @param state
     */
    Validate.prototype.setState = function (elem, state, cerr) {
        var _cfg = this.opts.config;
        var cerr = cerr || -1
        for (var i = 0; i < _cfg.length; i++) {
            if (_cfg[i].elem == elem) {

                _cfg[i].$state = state

                if (_cfg[i].custom) {
                    _cfg[i].$cerr = cerr
                } else {
                    $.error("指定报错项,必须是自定义列")
                }

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

