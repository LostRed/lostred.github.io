# 可终止规则引擎 TerminableRulesEngine

TerminableRulesEngine是AbstractRulesEngine的子类，该引擎类型在运行规则时，一旦发现超过或与终止等级规则相等的违规，就会直接返回当前的执行结果。

```java
public class TerminableRulesEngine extends AbstractRulesEngine {
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
                    if (this.executeInternal(rootObject, rule, result)) {
                        Grade ruleGrade = rule.getRuleDefinition().getGrade();
                        if (terminationGrade.ordinal() <= ruleGrade.ordinal()) { // [!code focus]
                            return result;
                        }
                    }
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
