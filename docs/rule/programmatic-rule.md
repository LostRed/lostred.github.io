# 编程式规则 ProgrammaticRule

ProgrammaticRule编程式规则是AbstractRule抽象规则的子类，增加方法入参T泛型类，分别对supports()、getValue()和evaluate()方法增加内部方法，从而转变为对泛型入参T的方法。

```java
public abstract class ProgrammaticRule<T> extends AbstractRule {
    @SuppressWarnings("unchecked")
    @Override
    public boolean supports(Object object) {
        return this.supportsInternal((T) object);
    }

    @SuppressWarnings("unchecked")
    @Override
    public Object getValue(Object object) {
        return this.getValueInternal((T) object);
    }

    @SuppressWarnings("unchecked")
    @Override
    public boolean evaluate(Object object) {
        return this.evaluateInternal((T) object);
    }

    public abstract boolean supportsInternal(T object);

    public abstract Object getValueInternal(T object);

    public abstract boolean evaluateInternal(T object);
}
```
