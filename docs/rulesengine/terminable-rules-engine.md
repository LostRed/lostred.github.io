# 可终止规则引擎 TerminableRulesEngine

TerminableRulesEngine是AbstractRulesEngine的子类，该引擎类型在运行规则时，一旦发现超过或与终止等级规则相等的违规，就会直接返回当前的执行结果。

```java
public class TerminableRulesEngine extends AbstractRulesEngine {
    @Override
    public Result execute(Object rootObject) {
        try {
            this.initContext(rootObject);
            Result result = Result.newInstance();
            for (AbstractRule rule : rules) {
                try {
                    if (this.executeInternal(rootObject, rule, result)) { // [!code focus]
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

    @Override
    public Result executeWithRules(Object rootObject, Set<String> ruleCodes) {
        try {
            this.initContext(rootObject);
            Result result = Result.newInstance();
            RuleFactory ruleFactory = this.getRuleFactory();
            for (String ruleCode : ruleCodes) {
                AbstractRule rule = ruleFactory.getRule(ruleCode);
                try {
                    if (this.executeInternal(rootObject, rule, result)) {
                        return result;
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
