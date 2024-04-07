# 其它开发注解

## Rule注解

在类上标记该注解，规则工厂在扫描包时，会将其放入RuleFactory的单例池，统一管理。同时RuleFactory规则工厂提供了动态注册规则的方法registerRuleDefinition，通过该方法可以动态地将声明好的规则定义注册到规则工厂。

::: warning 注意
注册到规则工厂的规则并不会立即被规则引擎所使用，还需要调用RulesEngineFactory规则引擎工厂的reloadRules方法，才能将所有引擎中的方法重新初始化。
:::
## RuleScan注解

在配置类上标记该注解，规则工厂会扫描其value指定的包路径。当使用spring时，需将该配置类注册到spring容器。

## DomainScan注解

在配置类上标记该注解，规则工厂会扫描其value指定的包路径。当使用spring时，需将该配置类注册到spring容器。

```java:line-numbers
@Configuration
@RuleScan("info.lostred.ruler.test.rule")
@DomainScan("info.lostred.ruler.test.domain")
public class RulerConfig {
}
```
