# 声明式规则 DeclarativeRule

DeclarativeRule声明式规则是AbstractRule抽象规则的子类，需要定义parameterExp参数表达式，conditionExp条件表达式和predicateExp断定表达式，规则引擎根据规则的这三个表达式执行判断。

```java
public class DeclarativeRule extends AbstractRule implements Evaluator {
    private ExpressionParser expressionParser;

    @Override
    public boolean supports(Object object) {
        String conditionExp = this.getRuleDefinition().getConditionExp();
        Boolean flag = this.getExpressionParser()
                .parseExpression(conditionExp)
                .getValue(ExecutionContextHolder.getContext(), Boolean.class);
        return Boolean.TRUE.equals(flag);
    }

    @Override
    public Object getValue(Object object) {
        String parameterExp = this.getRuleDefinition().getParameterExp();
        return this.getExpressionParser()
                .parseExpression(parameterExp)
                .getValue(ExecutionContextHolder.getContext());
    }

    @Override
    public boolean evaluate(Object object) {
        String predicateExp = this.getRuleDefinition().getPredicateExp();
        Boolean flag = this.getExpressionParser()
                .parseExpression(predicateExp)
                .getValue(ExecutionContextHolder.getContext(), Boolean.class);
        return Boolean.TRUE.equals(flag);
    }

    public ExpressionParser getExpressionParser() {
        return expressionParser;
    }

    public void setExpressionParser(ExpressionParser expressionParser) {
        this.expressionParser = expressionParser;
    }
}

```
