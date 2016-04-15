# validate

### 参数格式 和 关键字 [`关键字会以这样的形式`]

        config:  {
            demo1:{
                ['elem']:                       ['string']          "class 或者 id"
                ['isInput']:                    ['Boole']           "是否是 input"
                ['isRequired']:                 ['Boole']           "是否必填",    
                ['isNull']:                     ['function']        "判断是否为空"
                ['isNullCall']:                 ['function']        "isNullCall： 如果 isNull() == true {执行 的 回掉函数}"        
                ['onFocusCall']:                ['function']         当前为 焦点的时候 所执行的回调函数 [一般 为 input]
                ['level']:                      ['object','Boole']   如果是Boolean ,只会是 false ,表示验证不再有 验证关卡列
                                                {
                                                    line1：{
                                                         ['isCustom']:!1,       ['Boole']   是否 自定义
                                                         ['verify']:            ['function'] 对应正则 的函数（）
                                                         ['verifycall']:        ['function'] 当 verify = !1   对应当前 regFnc 所回应的函数
                                        
                                                    },
                                              
                                                    line2：{
                                                         ['isCustom']:!0,       ['Boole']   是否 自定义
                                                         ['verifycall']:        ['function']    当 isCustom = !0, verifycall 直接回调 处理业务关系
                                        
                                                    }
                                                }
                ['succeed']:                    ['function']    当验证 全部通过的时候 触发
                ['initCall']:                   ['function']    还原到到初始状态 触发条件是 : val() 值为空 且离开
               
            }
           demo2:{
                ['elem']:                       ['string']          "class 或者 id"
                ['isInput']:                    ['Boole']           "是否是 input"
                ['isRequired']:                 ['Boole']           "是否必填",    
                
                ['condition']:                  ['function']    isInput == false :当验证的列不是 input的时候 **注** 这个函数 必须返回 return false 或者 true 来表示 这一个次 验证的结果是否 通过

           }
            
         }   
         
### 1.0.0
解决 大部分 验证表单
思路： 只是针对当前这一个验证函 执行结果的布尔值 来判断 是否执行 对应的回调函数 仅此而已