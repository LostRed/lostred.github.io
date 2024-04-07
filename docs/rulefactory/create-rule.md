# 使用spEL动态创建规则

以下案例通过前端页面表单传入规则定义RuleDefinition，组装规则后在规则工厂RuleFactory中注册规则定义，最后加入对应的规则引擎RulesEngine，即可让规则在规则引擎中生效。

```java
@RestController
public class TestController {
    private final RuleFactory ruleFactory;
    private final RulesEngine rulesEngine;

    public TestController(RuleFactory ruleFactory, RulesEngine rulesEngine) {
        this.ruleFactory = ruleFactory;
        this.rulesEngine = rulesEngine;
    }

    @PostMapping("/execute")
    public Result execute(@RequestBody Person person) {
        return rulesEngine.execute(person);
    }

    @PostMapping("/addRule")
    public String addRule(@RequestBody RuleDefinition ruleDefinition) {
        if (ruleDefinition.getRuleClass() == null) {
            ruleDefinition.setRuleClass(DeclarativeRule.class);
        }
        ruleFactory.registerRuleDefinition(ruleDefinition);
        rulesEngine.addRule(ruleDefinition.getRuleCode());
        return "ok";
    }
}
```

:::warning 注意
通过spEL定义的规则都需要在规则定义中声明ruleClass为DeclarativeRule。
:::
