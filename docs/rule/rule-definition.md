# 规则定义 RuleDefinition

RuleDefinition规则定义是作为规则注册到RuleFactory中的定义类。类中记录了规则一些初始化必要的属性，以及spEL表达式。

```java
public class RuleDefinition implements Serializable {
    /**
     * 规则编号
     */
    private String ruleCode;
    /**
     * 业务类型
     */
    private String businessType;
    /**
     * 规则类型
     */
    private String ruleType;
    /**
     * 严重等级
     */
    private Grade grade;
    /**
     * 规则描述
     */
    private String description;
    /**
     * 规则执行的顺序号
     * <p>规则在规则引擎中先后执行的顺序，数值越小的优先会被执行</p>
     */
    private Integer order;
    /**
     * 是否强制使用
     * <p>强制使用的规则无法在规则引擎中禁用</p>
     */
    private boolean required;
    /**
     * 是否启用
     */
    private boolean enabled;
    /**
     * 规则类型
     */
    private Class<? extends AbstractRule> ruleClass;
    /**
     * 参数表达式
     * <p>定义入参的取值字段</p>
     */
    private String parameterExp;
    /**
     * 条件表达式
     * <p>定义规则生效的条件，期望返回一个布尔值，值为true时规则才会生效</p>
     */
    private String conditionExp;
    /**
     * 断定表达式
     * <p>定义规则的运行逻辑，期望返回一个布尔值，值为true时表示参数不符合要求</p>
     */
    private String predicateExp;
```

## 参数表达式

parameterExp为参数表达式，本质为spEL，解析后能得到对应的值，用于判断规则是否生效。

## 条件表达式

conditionExp为条件表达式，本质为spEL，解析后能得到一个boolean类型的值，用于入参的记录异常值。

## 断定表达式

predicateExp为条件表达式，本质为spEL，解析后能得到一个boolean类型的值，用于判断入参是否违规。
