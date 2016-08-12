# validate

### 参数格式 和 关键字 [`关键字会以这样的形式`]

    validator=[
            {
                elem:       [string]                        :元素 class id
                custom:     [Boolean,undefined]             :是否为自定义  
                required:   [string,Boolean,undefined]      :如果是必填 为空时候所显示的信息
                notice:     [string]                        :焦点时候提示信息
                error: [                                    :一开焦点时候的验证
                   {
                    level:  [function]                      :验证关卡判断函数 [note:必须返回一个 布尔值 Boolean ]
                      msg:  [string,undefined]              :如果你需要msg 返回信息那就可以不写 
                   }
                   
                ]
            },
            {
                elem:,
                custom:true
                customcall: [function(bol)]                 :自定义函 更具形参 判断 通过或者不通过 
            }
            
        
     ]  
     
     
     new validation({
          config:validator,                                  :配置 json
          init:                     [function]               :初始化验证
          required:                 [function]               :必填
          notice:                   [function]               :提示
          success:                  [function]               :成功
          error:                    [function]               :失败
          sbtBtn:"#ve_01_btn"                                :提交按钮
          sbtSucceed:               [function]               :全部通过
          sbtError:                 [function]               :未通过
    
      });
### 1.0.0
解决 大部分 验证表单
思路： 只是针对当前这一个验证函 执行结果的布尔值 来判断 是否执行 对应的回调函数 仅此而已

### 2.0.0
重构 优化思路 精简暴露操作