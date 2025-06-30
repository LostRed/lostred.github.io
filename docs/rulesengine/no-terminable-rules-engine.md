# 不可终止规则引擎 NoTerminableRulesEngine

NoTerminableRulesEngine是AbstractRulesEngine的子类，该引擎类型会完全执行完所有规则，并返回详细结果。

```java
public class NoTerminableRulesEngine extends AbstractRulesEngine {
    @Override
    public Result executeWithRules(Object rootObject, List<String> ruleCodes) {
        try {
            this.initContext(rootObject);
            Result result = Result.newInstance();
            RuleFactory ruleFactory = this.getRuleFactory();
            for (String ruleCode : ruleCodes) { // [!code focus]
                AbstractRule rule = ruleFactory.getRule(ruleCode);
                if (rule == null) {
                    Logger logger = Logger.getLogger(this.getClass().getName());
                    logger.warning("rule[" + ruleCode + "] not found in ruleFactory");
                    continue;
                }
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
