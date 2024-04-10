# Ruler是什么？

Ruler是一套通用的规则引擎框架，最新版本基于spEL，支持程序在运行状态下动态增加规则，方便开发人员根据业务流程需求进行二次开发。

## 特性

- 框架侵入性低，可扩展性强
- 一处配置，处处使用
- 可根据需求配置不同的引擎类型(incomplete, complete)

## 核心概念

### 领域模型工厂 DomainFactory

- 根据配置解析规则引擎需要校验类的属性
- 统一管理这些需要校验的类
- 在动态生成规则时能够更好地提供表达式片段的支持

### 规则引擎工厂 RulesEngineFactory

- 根据配置构建规则引擎
- 统一管理不同业务类型的规则引擎

### 规则工厂 RuleFactory

- 根据配置构建规则
- 统一管理规则

### 规则引擎接口 RulesEngine

- terminable类型的实现类会输出报告，当违反指定等级以上的规则时，会停止执行，返回结果
- no_terminable类型的实现类会输出报告，并且会执行完所有的规则

::: danger 注意
3.x版本移除了原本的simple类型的实现类  
3.3.x版本incomplete类型更名为terminable类型，complete类型更名为no_terminable类型
:::

### 抽象规则 AbstractRule

基于spring的spEL表达式实现主要逻辑功能，定义了规则的主要方法，开发者可扩展该类，实现其他特殊的规则。

## 核心接口关系

- Domain通常为RulesEngine中execute方法的入参，通过RulesEngine中所有Rule规则执行后得到一个对应的Result结果。
- Rule统一由RuleFactory管理，这些规则与规则引擎之间依靠businessType属性联系

<img src="https://cdn.jsdelivr.net/gh/LostRed/pic-repository@master/ruler-project.72lfu3ibjfg0.webp" alt="">
