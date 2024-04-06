# 规则开发

继承AbstractRule，并在类上添加@Rule注解。当使用spring-boot-starter启动场景下，标注该注解的规则将会交予Spring托管，成为Spring容器中的组件。以下提供了开发规则的两种方式。

## 继承DeclarativeRule

采用声明式开发，使用注解直接配置表达式

```java:line-numbers {1}
@Rule(ruleCode = "身份证号码长度",
        businessType = "person",
        description = "身份证号码长度必须为18位",
        parameterExp = "certNo",
        conditionExp = "certNo!=null",
        predicateExp = "certNo.length()!=18")
public class CertNoLengthRule extends DeclarativeRule {
    public CertNoLengthRule(RuleDefinition ruleDefinition) {
        super(ruleDefinition);
    }
}
```

## 继承ProgrammaticRule或SimpleRule <Badge type="tip">推荐</Badge>

采用编程式开发，重写ProgrammaticRule的方法

```java:line-numbers {1}
@Rule(ruleCode = "联系方式",
        businessType = "person",
        description = "联系方式密码不能为1234")
public class ContactRule extends ProgrammaticRule<Person> {
    @Override
    public void init() {

    }

    @Override
    public Object getValueInternal(Person person) {
        return person.getContacts().stream()
                .map(Contact::getPassword)
                .filter("1234"::equals)
                .collect(Collectors.toList());
    }

    @Override
    public boolean supportsInternal(Person person) {
        return !ObjectUtils.isEmpty(person.getContacts());
    }

    @Override
    public boolean evaluateInternal(Person person) {
        return person.getContacts().stream()
                .map(Contact::getPassword)
                .anyMatch("1234"::equals);
    }
}
```
