# 完全规则引擎 CompleteRulesEngine

CompleteRulesEngine是AbstractRulesEngine的子类，该引擎类型会完全执行完所有规则，并返回详细结果。

```java
public class CompleteRulesEngine extends AbstractRulesEngine {
    @Override
    public Result execute(Object rootObject) {
        try {
            this.initContext(rootObject);
            Result result = Result.newInstance();
            for (AbstractRule rule : rules) { // [!code focus]
                try {
                    this.executeInternal(rootObject, rule, result);
                } catch (Exception e) {
                    String message = this.getExceptionMessage(rule, e);
                    throw new RulesEnginesException(message, e, this.getBusinessType(), this.getClass());
                }
            }
            return result;
        } finally {
            this.destroyContext();
        }
    }

    @Override
    public Result executeWithRules(Object rootObject, Set<String> ruleCodes) {
        try {
            this.initContext(rootObject);
            Result result = Result.newInstance();
            RuleFactory ruleFactory = this.getRuleFactory();
            for (String ruleCode : ruleCodes) {
                AbstractRule rule = ruleFactory.getRule(ruleCode);
                try {
                    this.executeInternal(rootObject, rule, result);
                } catch (Exception e) {
                    String message = this.getExceptionMessage(rule, e);
                    throw new RulesEnginesException(message, e, this.getBusinessType(), this.getClass());
                }
            }
            return result;
        } finally {
            this.destroyContext();
        }
    }
}
```
