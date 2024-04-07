# 抽象规则 AbstractRule

AbstractRule抽象规则中，有四个重要的方法，分别是init()、supports()、getValue()，还有父级接口Evaluator的evaluate()方法。

AbstractRule抽象类：

```java:line-numbers
public abstract class AbstractRule implements Evaluator {
    private RuleDefinition ruleDefinition;

    public RuleDefinition getRuleDefinition() {
        return ruleDefinition;
    }

    public void setRuleDefinition(RuleDefinition ruleDefinition) {
        this.ruleDefinition = ruleDefinition;
    }

    public void init() {
    }

    public abstract boolean supports(Object object);

    public abstract Object getValue(Object object);
}
```

Evaluator接口：

```java:line-numbers
public interface Evaluator {
    boolean evaluate(Object object);
}
```

## init()方法

在AbstractRuleFactory创建规则时会调用的初始化方法，重写改方法能够在AbstractRule的创建生命周期加入自定的执行逻辑。

::: code-group

```java:line-numbers [DefaultRuleFactory]
public class DefaultRuleFactory extends AbstractRuleFactory {
    protected AbstractRule createRule(String ruleCode, RuleDefinition ruleDefinition) {
        Class<? extends AbstractRule> ruleClass = ruleDefinition.getRuleClass();
        try {
            Constructor<? extends AbstractRule> constructor = ruleClass.getDeclaredConstructor();
            AbstractRule abstractRule = constructor.newInstance();
            abstractRule.setRuleDefinition(ruleDefinition);
            if (abstractRule instanceof DeclarativeRule) {
                ((DeclarativeRule) abstractRule).setExpressionParser(EXPRESSION_PARSER);
            }
            abstractRule.init(); // [!code focus]
            return abstractRule;
        } catch (NoSuchMethodException e) {
            throw new RulesException("Please provide a no argument constructor in " + ruleClass.getName() +
                    ", override 'init()' method to initialize its member parameters.", e, ruleDefinition);
        } catch (InvocationTargetException | InstantiationException | IllegalAccessException e) {
            throw new RulesException("Internal error: " + ruleClass.getName() +
                    " cannot be instantiated.", e, ruleDefinition);
        }
    }
}
```

```java:line-numbers [SpringRuleFactory]
public class SpringRuleFactory extends AbstractRuleFactory implements ApplicationContextAware {
    @Override
    protected AbstractRule createRule(String ruleCode, RuleDefinition ruleDefinition) {
        Class<? extends AbstractRule> ruleClass = ruleDefinition.getRuleClass();
        AbstractRule abstractRule = beanFactory.createBean(ruleClass);
        abstractRule.setRuleDefinition(ruleDefinition);
        if (abstractRule instanceof DeclarativeRule) {
            beanFactory.autowireBeanProperties(abstractRule, AutowireCapableBeanFactory.AUTOWIRE_BY_TYPE, false);
        }
        abstractRule.init(); // [!code focus]
        return abstractRule;
    }
}
```

:::

## supports()方法

supports()方法会在规则引擎执行时，率先根据入参判断是否符合规则生效条件，进而决定当前规则是否需要被执行。

```java:line-numbers
public abstract class AbstractRulesEngine implements RulesEngine {
    protected boolean executeInternal(Object rootObject, AbstractRule rule, Result result) {
        RuleDefinition ruleDefinition = rule.getRuleDefinition();
        Logger logger = Logger.getLogger(rule.getClass().getName());
        if (rule.supports(rootObject)) { // [!code focus]
            if (rule instanceof SimpleRule) {
                Object value = rule.getValue(rootObject);
                if (value != null) {
                    result.addReport(rule.getRuleDefinition(), value);
                    logger.config("[" + ruleDefinition.getRuleCode() + " " + ruleDefinition.getGrade() + "]" +
                            "returnValue=" + value + ", description=" + ruleDefinition.getDescription());
                    return true;
                }
            } else {
                boolean flag = rule.evaluate(rootObject);
                if (flag) {
                    Object value = rule.getValue(rootObject);
                    result.addReport(rule.getRuleDefinition(), value);
                    logger.config("[" + ruleDefinition.getRuleCode() + " " + ruleDefinition.getGrade() + "]" +
                            "returnValue=" + value + ", description=" + ruleDefinition.getDescription());
                }
                return flag;
            }
        }
        return false;
    }
}
```

## getValue()方法

getValue()方法根据入参转换对应值，一般为需要记录的异常值。

```java:line-numbers
public abstract class AbstractRulesEngine implements RulesEngine {
    protected boolean executeInternal(Object rootObject, AbstractRule rule, Result result) {
        RuleDefinition ruleDefinition = rule.getRuleDefinition();
        Logger logger = Logger.getLogger(rule.getClass().getName());
        if (rule.supports(rootObject)) {
            if (rule instanceof SimpleRule) {
                Object value = rule.getValue(rootObject); // [!code focus]
                if (value != null) {
                    result.addReport(rule.getRuleDefinition(), value);
                    logger.config("[" + ruleDefinition.getRuleCode() + " " + ruleDefinition.getGrade() + "]" +
                            "returnValue=" + value + ", description=" + ruleDefinition.getDescription());
                    return true;
                }
            } else {
                boolean flag = rule.evaluate(rootObject);
                if (flag) {
                    Object value = rule.getValue(rootObject); // [!code focus]
                    result.addReport(rule.getRuleDefinition(), value);
                    logger.config("[" + ruleDefinition.getRuleCode() + " " + ruleDefinition.getGrade() + "]" +
                            "returnValue=" + value + ", description=" + ruleDefinition.getDescription());
                }
                return flag;
            }
        }
        return false;
    }
}
```

## evaluate()方法

evaluate()方法根据入参判断该入参是否违反规则逻辑，仅在当前规则为非SimpleRule时，才会调用该方法。

```java:line-numbers
public abstract class AbstractRulesEngine implements RulesEngine {
    protected boolean executeInternal(Object rootObject, AbstractRule rule, Result result) {
        RuleDefinition ruleDefinition = rule.getRuleDefinition();
        Logger logger = Logger.getLogger(rule.getClass().getName());
        if (rule.supports(rootObject)) {
            if (rule instanceof SimpleRule) {
                Object value = rule.getValue(rootObject);
                if (value != null) {
                    result.addReport(rule.getRuleDefinition(), value);
                    logger.config("[" + ruleDefinition.getRuleCode() + " " + ruleDefinition.getGrade() + "]" +
                            "returnValue=" + value + ", description=" + ruleDefinition.getDescription());
                    return true;
                }
            } else {
                boolean flag = rule.evaluate(rootObject); // [!code focus]
                if (flag) {
                    Object value = rule.getValue(rootObject);
                    result.addReport(rule.getRuleDefinition(), value);
                    logger.config("[" + ruleDefinition.getRuleCode() + " " + ruleDefinition.getGrade() + "]" +
                            "returnValue=" + value + ", description=" + ruleDefinition.getDescription());
                }
                return flag;
            }
        }
        return false;
    }
}
```
